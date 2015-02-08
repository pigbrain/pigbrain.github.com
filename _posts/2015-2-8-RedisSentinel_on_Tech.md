---
layout: post
category: linux
title: Redis Sentinel#1
tagline: by Pigbrain
tags: [Tech]
---
Redis Sentinel은 redis 관리를 돕도록 디자인된 시스템이다. <br>
이제 부터 Sentinel 소스를 열어봐야겠다..

<!--more-->

* Sentinel 에 필요한 .c파일들이 어떤 것들인지 Makefile 을 통하여 확인하자. <br>
\# redis-server
$(REDIS_SERVER_NAME): $(REDIS_SERVER_OBJ)
$(REDIS_LD) -o $@ $^ ../deps/hiredis/libhiredis.a ../deps/lua/src/liblua.a $(FINAL_LIBS)
	
\#redis-sentinel <br>
$(REDIS_SENTINEL_NAME): $(REDIS_SERVER_NAME) <br> 
$(REDIS_INSTALL) $(REDIS_SERVER_NAME) $(REDIS_SENTINEL_NAME) <br> 

Makefile에서 redis-sentinel 을 생성하는 스크립트는 위와 같다. <br> 
redis-server도 같이 넣어놓은 이유는 redis-sentinel이 redis를 빌드할때와 동일한 소스를 사용하기 때문이다. <br>
즉, redis를 실행할때 입력 매개변수를 통하여 sentinel로 실행할 수도 있고 그냥 redis-sentinel을 실행해도 되고 뭐 이런게 아닐까? <br> 
각각의 변수들의 의미는다음과 같다. 
REDIS_SENTINEL_NAME=redis-sentinel
REDIS_INSTALL=$(QUIET_INSTALL)$(INSTALL)
QUIET_INSTALL = @printf '    %b %b\n' $(LINKCOLOR)INSTALL$(ENDCOLOR) $(BINCOLOR)$@$(ENDCOLOR) 1>&2;
INSTALL=install
