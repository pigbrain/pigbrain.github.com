---
layout: post
category: Network
title: Path of a packet in the Linux Kernel Stack  
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 1 INTRODUCTION  
리눅스 커널 스택을 따라 움직이는 패킷의 흐름은 꽤 흥미로우며 성능 향상을 위한 연구 주제가 되어왔다.  
이 문서는 2.6.11 버전의 리눅스 커널에 있는 TCP/IP 프로토콜 스택을 기반으로 하고 있다.  
이 문서의 목표는 독자들이 커널내의 네트워크 패킷 흐름에 대해 익히도록 하는 것이다.(LXR을 통해 실제 커널내에서 기능을 수행하는 함수들을 살펴본다)  
  
 * Linux Cross-Reference (LXR)는 Hypertext Cross-referencing Tool로서 Function declarations, Data
(type) definitions 그리고 Preprocessor macros를 쉽게 찾아갈 수 있게 도와주므로 대규모 Source Code를 분석하는데 많은 도움을 준다  
  
<br>  
  
이 문서는 네트워크 스택을 이해하기 위한 색인을 제공한다. 그리고 이것은 KURT DSKI를 포함한다. KURT DSKI는 커널내에서 패킷을 모니터링하는데 매우 유용하다  
  
* KURT : Kansas University Real-Time project  
* DSKI : Data Stream Kernel Interface  
  
<br>  
  
이 문서는 데이터를 소켓으로 전송하고 생성된 패킷의 경로가 코드를 통하여 추적되는 시나리오를 기반으로 한다.  
  
# 2 TCP/IP - Overview  
TCP/IP는 가장 흔한 네트워크 프로토콜이다. 이 프로토콜은 ISO의 OSI 표준이 수립되기 전 70년대부터 근간을 두고 있다. TCP/IP 프로토콜에서는 7개의 레이어 아키텍쳐를 감싸고 있는 4개의 레이어가 있다.  
  
<br>  
  
TCP/IP를 OSI 모델과 비교했을때 - TCP/IP의 어플리케이션 레이어는 OSI모델의 어플리케이션(Application), 프리젠테이션(Presentation), 세션(Session) 레이어로 구성된다.  
  
<br>  
  
**소켓** 레이어는 어플리케이션 레이어와 전송(Transport)레이어와의 사이에서 인터페이스 역할을 한다. 이 레이어를 **전송계층인터페이스(Transport Layer Interface)**라고 부른다. 이 레이어에는 두가지 종류의 소켓이 있다고 언급할 가치가 있는데 그 중 하나는 연결 지향형 소켓(streaming socket)이고 다른 하나는 비연결형(datagram socket)이다.  
  
<br>  
  
다음 레이어는 TCP와 UDP를 기능적으로 포함하고 있는 전송(Transport) 레이어이다. 이 레이어는 커널에서 TCP/IP스택의 4번째 계층을 형성한다. TCP/IP의 네트워크(Network)레이어는 IP 레이어라고도 부른다. 이 계층은 네트워크 토폴리지에 대한 정보를 담고 있으며 TCP/IP스택의 3번째 계층을 형성하며 주소 체계 및 라우팅 프로토콜에 대한 정보를 알고있다.  
  
<br>  
  
링크(Link) 레이어는 2번째 계층을 형성하고 오류 검출에 대한 처리를 한다. 오류 검출을 함으로써 신뢰있는 데이터 전송을 보장한다.  
  
<br>  
  
마지막 레이어는 물리(Physical)레이어이다. 여기서는 데이터 통신을 위한 다양한 전기 신호를 처리하는 책임을 가지고 있다.  
  
# 3 When Data is sent through socket  
리눅스 커널 내에서 네트워크 스택의 동작을 시각화 하기위해 TCP 소켓을 통해 패킷의 흐름을 살펴보자  
  
### 3.1 Application Layer  
네트워크 패킷은 사용자 프로그램에서 소켓에 데이터를 쓰게되는 어플리케이션 레이어에서 시작한다. 사용자 프로그램은 대부분 소켓 API를 사용한다. 소켓 API는 사용자가 소켓에 read, write를 하기 위한 시스템 콜을 제공한다. 소켓의 대부분 조작은 일반적인 파일과 비슷하다. 모든 주요 기능은 커널에서 추상화되어있다.  
  
<br>  
  
API는 사용자가 네트워크가 교류하기 위한 다양한 기능을 제공한다. 공통적인 몇가지 API로는 send, sendto, sendmsg, write, writev이 있다. 이들 중에서 send, write 그리고 writev는 함수를 호출 할때 목적지의 주소를 명시하는 부분이 없기 때문에 연결 지향형 소켓에서만 동작한다. write 시스템 콜은 3개의 인자를 갖는다.  

	write(socket, buffer, length);
  
writev는 write와 동일하게 동작하지만 어플리케이션이 메세지를 연속적인 메모리 공간에 복사할 필요 없이 여러개의 데이터를 묶어서 보낼 수 있도록 한다  
  
	writev(socket, iovector, vectorlen);
  
iovector는 메세지를 형성하는 여러 바이트들의 블록에 대한 포인터들의 시퀀스를 포함하는 iovec 타입의 배열 주소를 제공한다.  
  
<br>  
  
send, write..등등 메세지 전송 호출이 발생하면 net/socket.c에 있는 **sock_sendmsg**시스템 콜로 제어권이 넘어간다. 여기서 사용자의 버퍼를 읽을 수 있는지 체크하고 만약 읽을 수 있다면, 시스템 콜이 호출된 사용자 레벨 프로그램에서 사용할 소켓 디스크립터를 이용하여 소켓의 구조체를 가져온다. 그 다음 전송하기 위한 메세지와 프로세스의 UID, PID, GID에 대한 정보를 가지고 있는 소켓 제어 메세지를 기반으로하여 메시지 헤더를 생성한다. 이러한 모든 동작은 프로세스 컨텍스트 내에서 실행된다.  
  
<br>  
  
그 다음 어떠한 프로토콜에 맞는 sendmsg 함수를 호출할지 결정하는 **\_\_sock\_sendmsg**를 호출한다. **proto\_ops** 구조체의 sendmsg 필드에서 프로토콜 옵션을 볼 수 있으며 프로토콜에 맞는 함수가 호출된다. 만약 TCP 소켓이라면  **tcp\_sendmsg** 함수가 호출되고 만약 UDP 소켓이라면 **udp\_sendmsg**함수가 호출된다. 이러한 결정은 제어권이 Transport Layer Interface로 넘어간 이후에 정해지고 이 과정에서 프로토콜 별로 호출하기 위한 함수를 결정한다.  
  
<br>  
  
**tcp_sendmsg**함수는 linux/net/ipv4/tcp.c에 정의되어 있고 사용자 프로그램에서 SOCK_STREAM 타입의 소켓을 이용하여 메세지를 전송할 때마다 호출된다.  
  
  
# 원문  
* http://www.hsnlab.hu/twiki/pub/Targyak/Mar11Cikkek/Network_stack.pdf   
  
# 참고  
* [LXR](http://www-users.cs.umn.edu/~jjeong/publications/white-paper/lxr-guide-korean.pdf) 