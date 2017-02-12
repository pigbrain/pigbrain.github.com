---
layout: post
category: Network
title: Why do UDP packets get dropped?
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# Lost on the way out 
* 데이터를 송신하기 위해서 UDP 소켓 전송 버퍼에 데이터를 넣어야한다  
* 리눅스 커널은 최대한 빠르게 버퍼에 있는 데이터를 전송한다  
* 만약 네트워크 카드의 성능이 굉장히 낮아서 데이터를 전송하는 속도가 소켓 전송 버퍼에 데이터가 들어가는 속도를  따라가지 못한다면 데이터가 유실될 수 있다   
	* UDP 패킷을 전송하기 위해 `sendto`와 같은 API를 호출할때 소켓 전송 버퍼가 꽉차있더라도 블럭되지 않고 패킷이 폐기된다  
  
# Lost on the way in  
* UDP패킷이 컴퓨터에 도착했다면 그 패킷은 소켓의 수신 버퍼에 들어가게 된다  
* 만약 소켓의 수신버퍼가 가득 차있다면 UDP패킷은 폐기된다  
* `netstat -suna`명령을 통해 얼마나 많은 패킷들이 폐기되었는지 확인할 수 있다  
	* 아래에서는 918개의 패킷들이 폐기되었다  
	* `statsd` 툴을 통하여 시스템이 패킷을 폐기하는 속도를 모니터링할 수 있다     
   
```
$ netstat -suna
IcmpMsg:
    InType3: 1072
    OutType3: 522
Udp:
    1828608 packets received
    568 packets to unknown port received.
    918 packet receive errors
    662721 packets sent
    RcvbufErrors: 918
    SndbufErrors: 1031
    IgnoredMulti: 659
```   
  
  
# Buffers everywhere  
* **EVERYTHING IS BUFFERS**   
* 네트워크 카드는 버퍼를 가지고 있고 언제든지 버퍼가 꽉찰 수 있다  
* 네트워크상의 라우터들도 버퍼를 가지고 있고 언제든지 버퍼가 꽉찰 수 있다  
  
  
# 참고 
* https://jvns.ca/blog/2016/08/24/find-out-where-youre-dropping-packets/  
* https://linux-tips.com/t/udp-packet-drops-and-packet-receive-error-difference/237  
* http://developerweb.net/viewtopic.php?id=4053  