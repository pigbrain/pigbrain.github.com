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
  


  
# 원문   
* http://www.tcpipguide.com/free/t_TCPConnectionTermination-2.htm  