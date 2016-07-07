---
layout: post
category: Network
title: TCP Connection Termination   
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# Normal Connection Termination  
일반적인 상황에서 클라이언트, 서버 각각은 **FIN**(finish) bit를 세팅한 특별한 메세지를 전송함으로써 연결을 종료한다. 이 메세지는 **FIN**이라고 부른다. **FIN**을 수신한 측은 FIN에 대한 ACK를 전송한다. 클라이언트, 서버 모두 **FIN**을 보내고 **ACK**를 수신하는 종료 과정을 거치지 않으면 연결은 종료되었다고 간주되지 않는다.  
  
그래서 종료 과정은 연결 과정과 다르게 **3-way-handshake**가 아닌 **2-way-handshake**이다. 
  
  
# TCP Connection Termination Procedure  
  
<img src="/assets/themes/Snail/img/Network/TCPConnectionTermination/termination_table.png" alt="">  
  
  
<img src="/assets/themes/Snail/img/Network/TCPConnectionTermination/termination_flow.png" alt="">  
  
# The TIME-WAIT State  
최초 FIN을 수신한 측은 어플리케이션의 종료 처리를 기다려야하기 때문에 **CLOSE-WAIT**상태에서 꽤 많은 시간을 기다려야한다.
TCP는 이 과정(어플리케이션이 종료 처리를 준비하는 과정)이 얼마나 오래걸릴지 예측 할 수 없다. 이 과정에서 최초 FIN을 수신한 측이 서버라고 가정하면 서버는 데이터를 송신할 수 있고 클라이언트는 수신할 것이다. 그러나 클라이언트는 데이터를 송신 할 수 없다.
  
클라이언트에서 최초 FIN을 전송했다고 가정하자. 이 경우 연결을 종료하기 위해 서버에서도 먼저 FIN을 보내는 단계가 있는데 클라이언트는 이 FIN을 받고 ACK를 전송할 것이다.
그러나 클라이언트는 ACK 전송 후 즉시 **CLOSED**상태로 변경하지 않는다. ACK가 서버까지 완전히 도착하기를 기다린다. 일반적으로 이 과정은 매우 빠르지만 네트워크 지연으로 인해 ACK가 늦게 도착하는 경우도 있다.
  
**TIME-WAIT**단계는 2가지 중요한 이유로 필요하다. 
첫번째는 반대측에서 ACK를 정상적으로 수신하기위한 충분한 시간을 기다리는 것과 만약 ACK가 유실되면 재전송해야 하기 때문이
두번째는 연결의 종료와 그 다음 처리 사이에 "buffering period"를 두기위해서이다.
만약 이 시간을 넣지 않을 경우 다른 연결로 부터 수신한 패킷과 섞여서 혼동될 수 있다.
  
표준 스펙에서 클라이언트는 연결 종료 전에 MSL(Maximum Segment Lifetime)의 2배 가량의 시간을 기다려야 한다고 되어있다.
TCP 표준은 MSL은 120초(2분)으로 지정하고 있다.  
현대 네트워크에서는 120초라는 시간이 매우 길다고 생각하고있다. 그래서 더 나은 성능을 위해 이 시간을 줄이는 것을 허가하고 있다.
  
  
# 원문   
* http://www.tcpipguide.com/free/t_TCPConnectionTermination-2.htm  