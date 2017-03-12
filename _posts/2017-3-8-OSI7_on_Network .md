---
layout: post
category: Network
title: OSI 7계층과 TCP/IP 4계층
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# OSI 7계층 (OSI 7 Layer)
* OSI(Open System Interconnection) 모델은 시스템 상호 연결에 있어 표준 모델을 의미한다  
* 상호 이질적인 네트워크간의 연결에 호환성 결여를 막기위해 ISO(국제 표준화 기구)에서는 OSI모델을 제시하였다  
* 실제 인터넷에서 사용되는 TCP/IP는 OSI모델을 기반으로 상업적이고 실무적으로 이용 가능하도록 단순화된 현실화의 과정에서 채택된 모델이다  
 
# OSI 7계층의 탄생배경  
* 여러 정보 통신 업체 장비들은 자신의 업체 장비 사이에서의 연결만 지원하고 다른 업체 장비와의 호환성은 지원하지 않았다  
* 위 이유로 ISO에서 1984년에 OSI모델을 발표하게 되었다  
* 모든 시스템들의 상호 연결에 있어 문제가 없도록 표준을 만든 것이며 7개의 계층으로 구분이 된다  

# OSI 7계층의 목적  
* 표준과 학습도구  
	* 표준화를 통하여 장비별로 이질적인 포트, 프로토콜의 문제를 해결한다  
	* OSI 계층별 기능과 통신의 과정을 정립하여 교육하기 위한 목적으로 사용된다    
  
# Encapsulation & Decapsulation  
* Encapsulation  
	* 데이터를 전송할 때 각각의 레이어마다 인식할 수 있는 헤더를 붙이는 과정  
	* 2계층(데이터링크계층)에서는 오류제어를 위해 데이터의 뒷부분에도 일부 데이터가 추가된다  
* Decapsulation  
	* 수신된 데이터가 각각의 레이어를 따라 올라가면서 헤더가 벗겨지는 과정  
  
<img src="/assets/themes/Snail/img/Network/OSI7/capsulation.png" alt="">    
  
# OSI 7계층의 계층별 프로토콜과 기능  
* PDU(Process Data Unit)란 각 계층에서 전송되는 단위이다  
* 1계층에서는 PDU가 Bit가 아닌 신호의 흐름으로 생각하는 것이 옳다    
* PDU는 2계층(Frame), 3계층(Packet), 4계층(Segment)에서 유의미하다  
  
<img src="/assets/themes/Snail/img/Network/OSI7/pdu.png" alt="">    
  
  
### 7계층 (Application)  
* 사용자가 네트워크에 접근할 수 있도록 해주는 계층이다  
* 사용자 인터페이스, 전자우편, 데이터베이스 관리 등 서비스를 제공한다  
* 프로토콜  
	* DHCP, DNS, FTP, HTTP...  
### 6계층 (Presentation)  
* 운영체계의 한 부분으로 입력 또는 출력되는 데이터를 하나의 표현 형태로 변환한다  
* 필요한 변환을 수행하여 두 장치가 일관되게 전송 데이터를 서로 이해할 수 있도록 한다  
* 프로토콜  
	* JPEG, MPEG, SMB, AFP...  
### 5계층 (Session)  
* 통신 세션을 구성하는 계층으로 포트(Port)연결이라고도 할 수 있다  
* 통신장치 간의 상호작용을 설정하고 유지하며 동기화 한다  
* 프로토콜  
	* SSH, TLS...  
### 4계층 (Transport)  
* 전체 메시지를 발신지 대 목적지(종단 대 종단)간 제어와 에러를 관리한다  
* 패킷들의 전송이 유효한지 확인하고 실패한 패킷은 다시보내는 등 신뢰성 있는 통신을 보장한다  
* 프로토콜  
	* TCP, UDP, ARP...  
### 3계층 (Network)  
* 다중 네트워크에서 패킷을 발신지로부터 목적지로 전달하는 책임을 갖는다  
* 2계층은 노드대노드 전달을 감독하는 것이고 3계층은 각 패킷이 시작 시점에서 최종 목적지까지 전달되도록한다  
* 프로토콜  
	* IP, ICMP, IGMP...  
### 2계층 (Data Link)  
* 오류없이 한 장치에서 다른 장치로 프레임을 전달하는 역할을 한다  
* 스위치 같은 장비의 경우 MAC주소를 이용하여 전달한다  
* 프로토콜  
	* MAC, PPP...  
### 1계층 (Physical)  
* 프로토콜  
	* Ethernet, RS-232C...  
  
# TCP/IP 4계층  
* TCP/IP 4계층은 인터넷 모델이라고도 한다  
  
<img src="/assets/themes/Snail/img/Network/OSI7/tcpip4.png" alt="">    
  
### 4계층 (Application)  
* TCP/IP 기반의 응용프로그램을 구분할 때 사용한다  
* 프로토콜  
	* HTTP, FTP, Telnet, DNS, SMTP ...  
  
### 3계층 (Transport)  
* 통신 노드 간의 연결을 제어하고 자료의 송수신을 담당한다  
* 프로토콜  
	* TCP, UDP...  
  
### 2계층 (Internet)  
* 통신 노드 간의 IP패킷을 전송하는 기능 및 라우팅 기능을 담당한다  
* 프로토콜  
	* IP, ARP, RARP, ICMP, OSP...

### 1계층 (Network Interface)  
* 프로토콜  
	* Ethernet, Token Ring, PPP...  
  
  
  

# 참고 
* http://blog.naver.com/demonicws/40117378644  
* http://s2ecure.tistory.com/39    