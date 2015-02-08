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

* Sentinel 에 필요한 .c파일들이 어떤 것들인지 Makefile 을 통하여 확인하자.

# redis-sentinel
$(REDIS_SENTINEL_NAME): $(REDIS_SERVER_NAME)
	$(REDIS_INSTALL) $(REDIS_SERVER_NAME) $(REDIS_SENTINEL_NAME)
