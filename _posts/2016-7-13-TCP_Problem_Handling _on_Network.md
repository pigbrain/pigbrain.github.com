---
layout: post
category: Network
title: TCP Connection Problem Handling, the Connection Reset  
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
양쪽의 디바이스에서 TCP연결이 맺어지고 **ESTABLISHED** 상태가 되면 TCP 어플리케이션은 일반적인 동작을 하게 된다. 데이터들은 세그먼트 형태로 패키징되어 전송된다. 슬라이딩 윈도우 메커니즘에 따라 세그먼트의 크기, 흐름제어, 필요에 따라 재전송등이 된다.  
  
TCP 연결이 맺어진 상태의 두 디바이스는 무기한으로 이 상태를 유지할 수 있다. 몇몇 TCP 연결들은 굉장히 오랜 시간동안 연결되어 있을 수 있다. 예를들어 몇몇 사용자는 Telnet 세션들과 같은 특별한 용도의 연결들을 몇 시간이건 몇 일이건 유지하곤 한다. 연결이 **ESTABLISHED** 상태에서 나오는 2가지 상황이 있다.  
  
* **Connection Termination** : 양측의 두 디바이스가 연결을 종료하기로 결정하고 종료처리를 위한 절차를 수행한다.  
* **Connection Disruption** : 어떤 문제가 발생하여 TCP연결이 인터럽트(중단)된다.  
  
### The TCP Reset Function  
TCP가 신뢰적이고 튼튼한 프로토콜이 되기 위해서 연결이 되어있는 동안에 다양한 문제들을 발견하고 대응할 수 있도록 하는 것을 가지고있다. 가장 일반적인 것은 **half-open connection** 이다. 이 상황은 한쪽 디바이스에서 어떠한 문제로 인하여 상대방에게 통보없이 연결을 닫거나 중단했을때 발생한다.  
즉, 한쪽 디바이스는 **ESTABLISHED** 상태이지만 다른 디바이스는 **CLOSED**상태이거나 일시적인 상태로 있다는 것을 의미한다. 예를들어, 한쪽 디바이스의 소프트웨어가 TCP 연결되어 있는 상태에서 크래쉬되어 재시작되었거나 사소한 문제가 발생하여 두 디바이스 사이에 동기화가 되지 않은 경우에 발생한다.  

  
# 원문   
* http://www.tcpipguide.com/free/t_TCPConnectionManagementandProblemHandlingtheConnec.htm  