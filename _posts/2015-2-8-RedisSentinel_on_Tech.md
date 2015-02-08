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

* Sentinel 에 필요한 .c파일들이 어떤 것들인지 Makefile 을 통하여 확인하자. <br>

\# redis-server <br>
$(REDIS_SERVER_NAME): $(REDIS_SERVER_OBJ) <br> 
$(REDIS_LD) -o $@ $^ ../deps/hiredis/libhiredis.a ../deps/lua/src/liblua.a $(FINAL_LIBS) <br> 
	
\#redis-sentinel <br>
$(REDIS_SENTINEL_NAME): $(REDIS_SERVER_NAME) <br> 
$(REDIS_INSTALL) $(REDIS_SERVER_NAME) $(REDIS_SENTINEL_NAME) <br> 

Makefile에서 redis-sentinel 을 생성하는 스크립트는 위와 같다. <br> 
redis-server도 같이 넣어놓은 이유는 redis-sentinel이 redis를 빌드할때와 동일한 소스를 <br> 
사용하기 때문이다. 즉, redis를 실행할때 입력 매개변수를 통하여 sentinel로 실행할 수도 <br> 
있고 그냥 redis-sentinel을 실행해도 되고 뭐 이런게 아닐까? <br><br>

각각의 변수들의 의미는다음과 같다. 
REDIS_SENTINEL_NAME=redis-sentinel <br> 
REDIS_INSTALL=$(QUIET_INSTALL)$(INSTALL) <br> 
QUIET_INSTALL = @printf '%b %b\n' $(LINKCOLOR)INSTALL$(ENDCOLOR) $(BINCOLOR)$@$(ENDCOLOR) 1>\&2; <br> 
INSTALL=install <br> 


REDIS_SERVER_OBJ=REDIS_SERVER_OBJ=adlist.o ae.o anet.o dict.o redis.o sds.o zmalloc.o lzf_c.o lzf_d.o pqsort.o zipmap.o sha1.o ziplist.o release.o networking.o util.o object.o db.o replication.o rdb.o t_string.o t_list.o t_set.o t_zset.o t_hash.o config.o aof.o pubsub.o multi.o debug.o sort.o intset.o syncio.o migrate.o endianconv.o slowlog.o scripting.o bio.o rio.o rand.o memtest.o crc64.o bitops.o sentinel.o notify.o setproctitle.o hyperloglog.o latency.o sparkline.o


이 수 많은 소스들 중에 이전 버전 Redis에는 존재 하지 않던 sentinel.o가 생긴 것을 볼 수 있다. <br>
sentinel.c 를 열어보니,, 뭐 주석 빼고 이러면 3500라인 정도 될것 같다.. <br>
함수 prototype만 봐도 이 파일에 모든 기능이 있는 것 같다.


void sentinelLinkEstablishedCallback(const redisAsyncContext *c, int status); <br> 
void sentinelDisconnectCallback(const redisAsyncContext *c, int status); <br> 
void sentinelReceiveHelloMessages(redisAsyncContext *c, void *reply, void *privdata); <br> 
sentinelRedisInstance *sentinelGetMasterByName(char *name); <br> 
char *sentinelGetSubjectiveLeader(sentinelRedisInstance *master); <br> 
char *sentinelGetObjectiveLeader(sentinelRedisInstance *master); <br> 
등등...

많은 함수들 중 아래 세 함수를 중심으로 보면 Sentiel 에서 failover상황에서 어떻게 처리하는지 알 수 있다.
void sentinelReceiveIsMasterDownReply(redisAsyncContext *c, void *reply, void *privdata) <br> 
void sentinelAskMasterStateToOtherSentinels(sentinelRedisInstance *master, int flags) <br> 
char *sentinelVoteLeader(sentinelRedisInstance *master, uint64_t req_epoch, char *req_runid, uint64_t *leader_epoch) <br> 
