---
layout: post
category: Linux
title: Redis Sentinel#2
tagline: by Pigbrain
tags: [Tech]
---
Redis Sentinel#2! <br>
Redis?Sentinel? 어떻게 실행되는 걸까

<!--more-->

main.c를 보면 다음과 같은 코드가 있다. <br>
redis로 실행하든 sentinel로 실행하든 모든 기능은 initServer를 통하여 세팅 된다.
{% highlight c %}
// redis.c
if (server.daemonize) 
	daemonize();	
initServer();

{% endhighlight %}	

initServer에서는 프로그램 실행에 필요한 모든 것들을 만들고 초기화 한다. <br>
{% highlight c %}
// redis.c
server.current_client = NULL;
server.clients = listCreate();	// 연결된 client 리스트
server.clients_to_close = listCreate(); 
server.slaves = listCreate(); // slave/monitor들의 리스트
{% endhighlight %}	


 소켓 이벤트 관리를 위해 redis 는 epoll을 최우선으로 사용하고 있으며 epoll 이 해당 시스템에 존재 하지 않을 경우 kqueue를 
 kqueue역시 존재하지 않고 있다면 select를 사용하도록 하고 있다.
 initServer()에서 이벤트루프를 생성하는 부분은 아래와 같이 구현되어 있다.
{% highlight c %}
// redis.c
server.el = aeCreateEventLoop(server.maxclients+REDIS_EVENTLOOP_FDSET_INCR);

...

// ae.c
#ifdef HAVE_EVPORT
#include "ae_evport.c"
#else
    #ifdef HAVE_EPOLL
    #include "ae_epoll.c"
    #else
        #ifdef HAVE_KQUEUE
        #include "ae_kqueue.c"
        #else
        #include "ae_select.c"
        #endif
    #endif
#endif

...

if (aeApiCreate(eventLoop) == -1) goto err;
{% endhighlight %}	

\#1에서 잠깐 언급했지만 아래 코드로 인하여 Sentinel 기능들이 실행된다고 하였다.
{% highlight c %}
run_with_period(100) {  
	// run_with_period(100)은 100ms 주기로 실행하도록 하는 MACRO이다. 
	if (server.sentinel_mode)  
		sentinelTimer();
}
{% endhighlight %}	

어디서부터 시작하여 이 코드가 실행될지 살펴 보면  initServer에서 아래 처럼 serverCron이라는 콜백 함수를 등록하는 부분이 있다.
serverCron 함수는 실질적인 로직을 처리하는 함수들을 일정 시간이 되었을때 호출하도록 정의하는 곳이다.
{% highlight c %}
if(aeCreateTimeEvent(server.el, 1, serverCron, NULL, NULL) == AE_ERR) {
	redisPanic("Can't create the serverCron time event.");
	exit(1);
}
{% endhighlight %}	

<br>
Sentinel을 실행하면 initServer()에서 모든 데이터를 생성하고 초기화하고 이벤트에 대한 콜백함수들을 등록한다. 이떄 가장 중요한 함수가
serverCron이며 이 곳에서는 일정 주기로 실제 로직이 처리되도록 하는 코드들이 있다. redis.c의 가장 마지막 부분 에 있는 aeMain함수에서
루프를 돌면서 이벤트들이 처리된다.
{% highlight c %}
// redis.c
aeSetBeforeSleepProc(server.el,beforeSleep);
aeMain(server.el);
aeDeleteEventLoop(server.el);

...
// ae.c
void aeMain(aeEventLoop *eventLoop) {
	eventLoop->stop = 0;
	while (!eventLoop->stop) {
		if (eventLoop->beforesleep != NULL)
			eventLoop->beforesleep(eventLoop);
			aeProcessEvents(eventLoop, AE_ALL_EVENTS);
		}
	}
}
{% endhighlight %}	
aeMain의 aeProcessEvents에서 실질적인 이벤트 처리가 이루어지며 serverCron역시 이곳에서 호출되게 된다.
{% highlight c %}
numevents = aeApiPoll(eventLoop, tvp);	 // aeApiPoll 안에 epoll_wait가 있다.
for (j = 0; j < numevents; j++) {
	...
}
...
if (flags & AE_TIME_EVENTS) // serverCron 호출
	processed += processTimeEvents(eventLoop);	 
{% endhighlight %}	

redis, sentinel 모두 위와 같은 과정을 거쳐서 실행되게 된다. <br>
다음 \#3에서부터는 sentinel에서만 동작하는 기능들을 하나씩 살펴보도록 하겠다.

#To be continue....#
