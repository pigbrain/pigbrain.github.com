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
  
  
# 원문   
* http://www.tcpipguide.com/free/t_TCPConnectionTermination-2.htm  