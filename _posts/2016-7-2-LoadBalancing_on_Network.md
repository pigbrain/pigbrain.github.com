---
layout: post
category: Network
title: Load Balancing  
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# Load Balancing  
  
## Server health checking  
서버 health checking이란 Load Balancer가 각 서버들이 서비스를 제공할 수 있는지 여부를 결정하기 위해 테스트를 해보는 것이다  
  
* **Ping**  
	* 가장 간단한 방법이다  
	* 서버는 살아 있지만 어플리케이션이 다운되어 있을 수 있기 때문에 신뢰할 수 없다  
  
* **TCP Connect**  
	* 80포트로 웹 서비스를 하고 있는지 어플리케이션이 실행 중인지 등을 확인 할 수 있는 방법이다  
		* 서버에 지정된 포트로 연결하여 확인한다  
  
* **HTTP Get Header**  
	* 웹 서버에서 헤더에 200과 같은 OK 응답 코드를 주는지 확인하기 위해 Get 요청을 보낸다  
  
* **Http Get Contents**  
	* Http Get 요청을 보내고 응답의 Content Body를 확인한다  
	* 예로 데이터베이스 쿼리 결과가 유효해야지만 OK(200) 응답 코드를 주는 동적인 웹 페이지를 확인 할 때 유용하다  
  
  
## Layer-2 Load Balancing  
**Layer-2 load balancing**(link aggregation, port aggregation, channel/gigabit ether channel port bundling..)는 2개 이상의 link를 더 높은 대역폭을 갖도록 하나의 link를 합치는 것이다. 만약 각각의 aggregated link가 물리적인 다른 경로를 갖는다면는 redundancy와 fault tolerance를 제공할 수 있게된다.  
  
## Layer-4 Load Balancing  
**Layer-4 load balancing**은 TCP, UDP, SCTP와 같은 전송 프로토콜을 사용하는 전송 계층(Transport layer)에서 서버로 들어온 request를 분산한다. 일반적으로 네트워크 라우터는 들어온 패킷을 알맞은 IP주소로 보내주는 역할을 하지만 전송계층에 속하는 Layer-4 라우터는 실제 패킷을 수신하여 처리 해야하는 서버들 중 어떤 서버로 패킷을 보낼지 결정한다.  
  
  
Layer-4 라우터는 받은 패킷을 하나 또는 그 이상의 서버들로 전달한다. 라우터와 각 서버들은 연결이 유지되고 있기 때문에 패킷을 각 서버들로 전달하기 전에 load balancer는 항상 패킷의 body 내용과 상관없이 한 서버를 고른다. 만약 한 서버가 다운되어 있다면 다른 서버로 패킷을 전달한다.  
  
  
## Layer-7 Load Balancing  
어플리케이션 레벨의 load balancing이라고 알려져있는 **Layer-7 load balancing**은 컨텐츠의 다양성을 제공하고 전체 클러스터의 성능을 향상시키기 위해 어플리케이션 계층에서 패킷을 파싱하고 요청된 패킷의 타입에 따라 각 서버로 분산한다. 어플리케이션 계층에서  패킷을 파싱하는데 소요되는 부하는 매우 크다. 그래서 Layer-4 load balancing과 비교하였을대 확장성이 제한된다.  
  
  
  
# 원문   
* http://networksandservers.blogspot.kr/2011/03/balancing-iii.html  