---
layout: post
category: Linux
title: Redis Sentinel#3
tagline: by Pigbrain
tags: [Tech]
---
Redis Sentinel#3! <br>
sentinel.conf는 어떻게 처리될까

<!--more-->

sentinel.conf에는 반드시 설정해야 하는 가장 중요한 것이 있다. <br>
Master역할을 하는 redis들의 정보를 넣어줘야 한다.
{% highlight c %}
# 아래와 같은 형태로 적어야 한다.
# sentinel monitor <name> <host> <port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 2

... 

// Jedis - SentinelPoll 생성자
public JedisSentinelPool(String masterName, Set<String> sentinels);
{% endhighlight %}	

sentinel.conf에서 설정한 <name>은 아래 masterName에 동일하게 넣어 줘야 한다. name은 redis들의 그룹을 지정하는 정도로 볼 수 있다.

\<quorum\>과 관련된 것이 sentinel 소스에서 가장 어려운 부분이 되지 않을까 필자는 생각한다.<br>
sentinel은 redis인스턴스가 다운되었을때 두 가지 상태로 관리한다. <br>
하나는 SDOWN(Subjectively Down)이고 다른 하나는 ODOWN(Objectively Down)이다. <br>
먼저 SDOWN은 sentinel이 redis 인스턴스가 다운됬다는것을 감지했을떄 변경하는 상태이다. 즉 sentinel이 독립적으로 redis 인스턴스가 다운됬다고 판단하는 것이다.
다음 ODOWN은 SDOWN인 상태에 있는 redis 인스턴스를 failover 처리하기위한 상태인데,  ODOWN 상태로 넘어가기 위해서는 위 conf에서 설정한 \<quorum\> 
수 만큼의 sentinel들이 이 redis 인스턴스가 다운됬다고 동의해야 한다. 자세한건 이 후 코드를 살펴보면서 확인하도록 하겠다.<br><br>

{% highlight c %}
// config.c
// sentinel의 설정은 sentinel \<option1\> \<option2\> ... 와 같은 형태로 되어 있다.
// sentinel로 시작하는 설정들에 한하여 sentinelHandleConfiguration(..)를 호출 한다.
} else if (!strcasecmp(argv[0],"sentinel")) {
	if (argc != 1) {
		if (!server.sentinel_mode) {
			err = "sentinel directive while not in sentinel mode";
			goto loaderr;
		}
		err = sentinelHandleConfiguration(argv+1,argc-1);
		if (err) goto loaderr;
	}
}
{% endhighlight %}	
sentinelHandleConfiguration(..)에서 가장 중요한 부분은 redis 인스턴스를 생성하는 부분 일 것이다. <br>
이 외에 다른 부분은 타임아웃 값을 설정하는 것이 대다수이다.
{% highlight c %}
// config.c
// monitor할 redis의 인스턴스를 생성하는 부분이다.
if (!strcasecmp(argv[0],"monitor") && argc == 5) {
	int quorum = atoi(argv[4]);
	if (quorum <= 0) return "Quorum must be 1 or greater.";
	if (createSentinelRedisInstance(argv[1],SRI_MASTER,argv[2],
					atoi(argv[3]),quorum,NULL) == NULL) {
		switch(errno) {
		case EBUSY: return "Duplicated master name.";
		case ENOENT: return "Can't resolve master instance hostname.";
		case EINVAL: return "Invalid port number";
		}
	}
}
{% endhighlight %} 
createSentinelRedisInstance(..) 에서는 Master, Slave, Sentinel 여부에 따라 각각의 테이블에 등록하게 된다. <br>
{% highlight c %}
if (flags & SRI_MASTER) table = sentinel.masters;
else if (flags & SRI_SLAVE) table = master->slaves;
else if (flags & SRI_SENTINEL) table = master->sentinels;
{% endhighlight %}
한 가지 특이한(?) 것은 redis인스턴스를 생성하는 시점(아직 connect 되지 않은 상태)에 ping 타임아웃 값을 설정한다는 것이다.
이렇게 함으로써 ping을 보내지 않은 상태지만 connect과정에서 타임아웃이 발생했다는 것을 알 수 있다.
{% highlight c %}
sentinelRedisInstance *ri;
ri = zmalloc(sizeof(*ri));
ri->last_ping_time = mstime();
{% endhighlight %}



#To be continue....#
