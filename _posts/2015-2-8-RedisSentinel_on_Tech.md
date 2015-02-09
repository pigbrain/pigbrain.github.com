---
layout: post
category: Linux
title: Redis Sentinel#1
tagline: by Pigbrain
tags: [Tech]
---
Redis Sentinel은 redis 관리를 돕도록 디자인된 시스템이다. <br>
이제 부터 Sentinel 소스를 열어봐야겠다..

<!--more-->

Sentinel 에 필요한 .c파일들이 어떤 것들인지 Makefile 을 통하여 확인하자. <br>
Makefile에서 redis-sentinel 을 생성하는 스크립트는 아래와 같다. <br> 
{% highlight c %}
# redis-server 
$(REDIS_SERVER_NAME): $(REDIS_SERVER_OBJ) 
$(REDIS_LD) -o $@ $^ ../deps/hiredis/libhiredis.a ../deps/lua/src/liblua.a $(FINAL_LIBS) 

# redis-sentinel
$(REDIS_SENTINEL_NAME): $(REDIS_SERVER_NAME) <br> 
$(REDIS_INSTALL) $(REDIS_SERVER_NAME) 
$(REDIS_SENTINEL_NAME) 
{% endhighlight %}	

redis-server도 같이 넣어놓은 이유는 redis-sentinel이 redis를 빌드할때와 동일한 소스를 사용하기 때문이다. 
즉, redis를 실행할때 입력 매개변수를 통하여 sentinel로 실행할 수도 있고 그냥 redis-sentinel을 실행해도 되고 뭐 이런게 아닐까?

실제 redis.c 파일을보면 아래 처럼 sentinel_mode가 true일 경우에만 매 tick 마다 sentinel 로직을 처리하게 된다. <br> 

{% highlight c %}
run_with_period(100) {  
	// run_with_period(100)은 100ms 주기로 실행하도록 하는 MACRO이다. 
	if (server.sentinel_mode)  
		sentinelTimer();
}
{% endhighlight %}	



각각의 변수들의 의미는다음과 같다. 
{% highlight c %}
REDIS_SENTINEL_NAME=redis-sentinel 
REDIS_INSTALL=$(QUIET_INSTALL)$(INSTALL) 
QUIET_INSTALL = @printf '%b %b\n' $(LINKCOLOR)INSTALL$(ENDCOLOR) $(BINCOLOR)$@$(ENDCOLOR) 1>\&2; 
INSTALL=install 
REDIS_SERVER_OBJ=REDIS_SERVER_OBJ=adlist.o ae.o anet.o dict.o redis.o sds.o zmalloc.o lzf_c.o lzf_d.o pqsort.o zipmap.o sha1.o ziplist.o release.o networking.o util.o object.o db.o replication.o rdb.o t_string.o t_list.o t_set.o t_zset.o t_hash.o config.o aof.o pubsub.o multi.o debug.o sort.o intset.o syncio.o migrate.o endianconv.o slowlog.o scripting.o bio.o rio.o rand.o memtest.o crc64.o bitops.o sentinel.o notify.o setproctitle.o hyperloglog.o latency.o sparkline.o

{% endhighlight %}	

이 수 많은 소스들 중에 이전 버전 Redis에는 존재 하지 않던 sentinel.o가 생겨있다. sentinel.c 를 열어보니,, 뭐 주석 빼고 이러면 3500라인 정도 될것 같다..
함수 prototype만 봐도 이 파일에 모든 기능이 있는 것 같다.

{% highlight c %}
void sentinelLinkEstablishedCallback(const redisAsyncContext *c, int status);
void sentinelDisconnectCallback(const redisAsyncContext *c, int status);
void sentinelReceiveHelloMessages(redisAsyncContext *c, void *reply, void *privdata);
sentinelRedisInstance *sentinelGetMasterByName(char *name);
char *sentinelGetSubjectiveLeader(sentinelRedisInstance *master);
char *sentinelGetObjectiveLeader(sentinelRedisInstance *master);
...
{% endhighlight %}

위에서 언급한 sentinelTimer() 함수에서 호출되는 함수들을 따라가다보면 redis instance의 상태에 따라 어떠한 로직을 실행 할지 결정하는
void sentinelFailoverStateMachine(sentinelRedisInstance *ri) 함수를 만날 수 있다. 그 중 Master에 failover가 발생 했을때 새로운 
Master를 선출하기 위해 투표를 진행하는데 이 부분을 중점으로 보려고 한다. 
