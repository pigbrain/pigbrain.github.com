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








