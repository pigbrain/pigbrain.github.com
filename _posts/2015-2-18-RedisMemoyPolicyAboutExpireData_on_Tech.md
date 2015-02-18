---
layout: post
category: Linux
title: Redis는 Expire를 어떻게 처리할까?
tagline: by Pigbrain
tags: [Tech]
---
Redis는 키를 저장할때 expire를 설정할 수 있다.<br>
expire시간이 만료되면 어떠한 방법으로 데이터를 삭제할까?<br>

<!--more-->

redis에는 수많은 기능이 존재한다.  
그 중 set한 데이터에 대하여 expire를 설정할 수 있다.  
다음은 redis에서 expire를 설정하는 command 예제이다. TTL은 남은 expire시간을 나타낸다.
<img src="/assets/themes/Snail/img/RedisMemoryPolicyAboutExpire/redis-expire.png" alt="">
출처 : http://redis.io/commands/expire  

redis에서는 expire를 처리하기 위해 어떠한 방식의 로직을 구현하고 있을까?  
하나의 쓰레드를 타이머로 이용해서? 아니면 signal을 이용해서?  
이제부터 expire를 처리하는 로직에 대하여 살펴보도록 하겠다.

첫번쨰 가장 단순한 방법 이다.  
사용자가 저장한 키값에 대하여 get을 요청할 때 expire처리한다. 즉 get할때 expire시간이 초과했다면 데이터를 삭제하고 사용자에게는 널값을 보낸다.
get 명령어를 처리하는 함수부터 확인해보자.
{% highlight c %}
// t_string.c

void getCommand(redisClient *c) {
	getGenericCommand(c);
}

int getGenericCommand(redisClient *c) {
	robj *o;

	if ((o = lookupKeyReadOrReply(c,c->argv[1],shared.nullbulk)) == NULL)
		return REDIS_OK;

	if (o->type != REDIS_STRING) {
		addReply(c,shared.wrongtypeerr);
		return REDIS_ERR;
	} else {
		addReplyBulk(c,o);
		return REDIS_OK;
	}
}
{% endhighlight %}
getGenericCommand(..)을 보면 lookupKeyReadOrReply(..)이라는 함수를 호출 한다. 이 함수에서 expire를 처리하거나 expire대상이 아니라면 데이터 오브젝트를 리턴한다.  

{% highlight c %}
// db.c
robj *lookupKeyRead(redisDb *db, robj *key) {
	robj *val;

	expireIfNeeded(db,key);
	val = lookupKey(db,key);
	if (val == NULL)
		server.stat_keyspace_misses++;
	else
		server.stat_keyspace_hits++;
	return val;
}
{% endhighlight %}

expireIfNeeded(..) 함수가 실질적으로 expire 시간을 체크하여 데이터를 삭제하는 곳이다.
expireIfNeeded(..)의 구현부도 확인해보자.  

{% highlight c %}
// db.c
int expireIfNeeded(redisDb *db, robj *key) {
	mstime_t when = getExpire(db,key);
	...
	if (now <= when) return 0;

	propagateExpire(db,key);
	return dbDelete(db,key);
}

int dbDelete(redisDb *db, robj *key) {
    if (dictSize(db->expires) > 0) dictDelete(db->expires,key->ptr);
    if (dictDelete(db->dict,key->ptr) == DICT_OK) {
        return 1;
    } else {
        return 0;
    }
}
{% endhighlight %}
expire로 지정된 시간과 now 시간을 비교하여 dbDelete(..)를 호출한다.  
dbDelete를 보면 db->expires에서 데이터를 삭제하고  db->dict에서도 데이터를 삭제한다.
실제 redis에서 set명령을 처리할때 expire가 설정된다면 db->dict외에 db->expires에도 동일한 키를 저장해 놓는다.  

사용자가 get을 할때 expire를 처리하는 것은 매우 쉬워 보인다. Memcached에서도 expire는 이와 동일하게 처리하는 것으로 알고있다.
하지만 사용자가 get을 하지 않으면 redis는 expire된 키를 계속 가지고 있을까? 굉장한 메모리 낭비 일 것이다. 그래서 redis에서는 이 방식 외에도
다른 두가지 방식을 이용하여 expire데이터를 관리하고 있다.  

두번째 방법 부터는 조금 복잡한 것 같다.  
sentinel#2를 포스팅 하면서 redis나 sentinel이나 일정 주기로 처리되야 하는 로직을 정의 한 곳이 serverCron(..)이라고 했다. 
serverCron(..)의 구현부를 잘 살펴 보면 아래처럼 databaseCron(); 이라는 것이 있다.
{% highlight c %}
// redis.c
int serverCron(struct aeEventLoop *eventLoop, long long id, void *clientData) {
	...
	databasesCron();
	...
}

void databasesCron(void) {
	...
	if (server.active_expire_enabled && server.masterhost == NULL)
		activeExpireCycle(ACTIVE_EXPIRE_CYCLE_SLOW);
	...
}
{% endhighlight %}
databaseCron(..)을 보면 active_expire_enabled 설정이 true이고 slave모드가 아니라면 activeExpireCycle(..)실행하게 되어 있다.
activeExpireCycle(..)에서는  랜덤 샘플링을 이용하여 키들을 expire시킨다. redis는 싱글 쓰레드 구조로 되어 있기 때문에 하나의 작업을 오래 처리하거나하면 
다른 요청들에 대한 응답이 늦어질 수 밖에 없다. 그래서 모든 expire테이블을 조사 하는 것이 아닌 샘플링을 하는 것으로 보인다.  
{% highlight c %}
// redis.c
void activeExpireCycle(int type) {
	...
	while (num--) {
		dictEntry *de;
		long long ttl;
		
		if ((de = dictGetRandomKey(db->expires)) == NULL) break;
		ttl = dictGetSignedIntegerVal(de)-now;
		if (activeExpireCycleTryExpire(db,de,now)) expired++;
		if (ttl < 0) ttl = 0;
		ttl_sum += ttl;
		ttl_samples++;
	}
	...
	
	if ((iteration & 0xf) == 0) {
		long long elapsed = ustime()-start;

		latencyAddSampleIfNeeded("expire-cycle",elapsed/1000);
		if (elapsed > timelimit) timelimit_exit = 1;
	}
	if (timelimit_exit) return;
	
	...
}
{% endhighlight %}
샘플링을 하여 expire 키를 삭제 하는 코드이다. activeExpireCycleTryExpire(..)에서 dbDelete(..)를 수행한다.  
그러나 여기에 중요한 코드가 하나 더 있다. 현재 쌓여있는 키가 10개일때와 10000개일때 샘플링 횟수를 다르게 해야 할 것이다.
만약 키가 엄~~청 많다면 샘플링 횟수도 더 많아야 할 것이다. 그러나 샘플링하여 키를 삭제하는데 시간이 너무 오래 걸리면 어떻게 될까?
다른 요청에 대한 처리가 지연될 것이다. 그래서 redis에서는 0xf(16)번째 이터레이션에 샘플링하여 expire시킬 수 있는 최대 시간을 초과 하였는지 검사한다.
지정한 최대 시간을 초과 하였을 경우 더 이상 샘플링하지 않고 그대로 루프를 빠져나와 다른 요청들을 처리한다.  

마지막 방법은 메모리 정책에 의한 메모리 정리이다. 패킷을 수신하여 처리 하기 직전에 지정된 메모리 정책에 의하여 메모리를 정리하는 코드가 있다.
패킷을 수신하는 부분부터 확인 해보도록 하겠다.
{% highlight c %}
// networking.c
void readQueryFromClient(aeEventLoop *el, int fd, void *privdata, int mask) {
	redisClient *c = (redisClient*) privdata;
	...
	processInputBuffer(c);
}

void processInputBuffer(redisClient *c) {
	while(sdslen(c->querybuf)) {
		...
		if (processCommand(c) == REDIS_OK)
 			resetClient(c);
		...
	}
}

// redis.c
int processCommand(redisClient *c) {
	...
	if (server.maxmemory) {
		int retval = freeMemoryIfNeeded();
		if ((c->cmd->flags & REDIS_CMD_DENYOOM) && retval == REDIS_ERR) {
			flagTransaction(c);
			addReply(c, shared.oomerr);
			return REDIS_OK;
		}
	}
	...
	// 지정된 콜백 함수 실행
	if (c->flags & REDIS_MULTI &&
			c->cmd->proc != execCommand && c->cmd->proc != discardCommand &&
			c->cmd->proc != multiCommand && c->cmd->proc != watchCommand) {
		queueMultiCommand(c);
		addReply(c,shared.queued);
	} else {
		call(c,REDIS_CALL_FULL);
		if (listLength(server.ready_keys))
			handleClientsBlockedOnLists();
	}
	...
}
{% endhighlight %}
readQueryFromClient(..) 함수는 redis에서 클라이언트로 부터 이벤트가 발생했을때 이벤트 루프에서 호출하는 콜백함수이다. 
즉 클라이언트로 부터 수신된 데이터가 발생하면  readQueryFromClient(..) 함수가 호출된다. processInputBuffer(..)에서 정상적은 패킷인지 검사한 후 
processCommand(..)함수를 호출한다. processCommand(..)를 보면 지정된 패킷의 콜백 함수를 실행 하기전에 redis의 최대 메모리를 지정한 경우 
freeMemoryIfNeeded()함수를 호출 하는 것을 볼 수 있다. 이곳이 expire를 처리하는 마지막 장소이다. freeMemoryIfNeeded()내부를 보면 수많은 if문을 볼 수 있다.
메모리 정책에 따라 어떤 메모리를 해제 할지 정하기 때문이다.
{% highlight c %}
// redis.c
int freeMemoryIfNeeded(void) {
	...
	if (mem_used <= server.maxmemory) return REDIS_OK;
	...
	mem_tofree = mem_used - server.maxmemory;
	mem_freed = 0;
	
	while (mem_freed < mem_tofree) {
		for (j = 0; j < server.dbnum; j++) {
			if (server.maxmemory_policy == REDIS_MAXMEMORY_ALLKEYS_LRU ||
				server.maxmemory_policy == REDIS_MAXMEMORY_ALLKEYS_RANDOM)
			{
				dict = server.db[j].dict;
			} else {
				dict = server.db[j].expires;
			}
			
			if (server.maxmemory_policy == REDIS_MAXMEMORY_ALLKEYS_RANDOM ||
				server.maxmemory_policy == REDIS_MAXMEMORY_VOLATILE_RANDOM)
			{
				de = dictGetRandomKey(dict);
				bestkey = dictGetKey(de);
			}
			else if (server.maxmemory_policy == REDIS_MAXMEMORY_ALLKEYS_LRU ||
				server.maxmemory_policy == REDIS_MAXMEMORY_VOLATILE_LRU)
			{
				...
			}
			else if (server.maxmemory_policy == REDIS_MAXMEMORY_VOLATILE_TTL) {
				...
			}
			...
			if (bestkey) {
				...
				dbDelete(db,keyobj);
				...
			}
		}
	}
	...	
}
{% endhighlight %}
수 많은 메모리 정책이 존재한다. 정책에 따라 메모리를 해제 할 수 있는 최적의 키를 찾아 메모리를 해제 한다.
메모리를 해제할 테이블이 expires일 수도 있고 일반 데이터 테이블 일 수 도있고 이건 사용자가 config를 지정하기 나름이다.

#The End

