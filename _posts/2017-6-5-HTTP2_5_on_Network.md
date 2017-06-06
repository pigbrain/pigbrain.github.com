---
layout: post
category: Network
title: HTTP/2 5. Streams and Multiplexing  
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 5. Streams and Multiplexing
* 스트림(Stream)은 HTTP/2 연결에서 클라이언트와 서버간에 교환되는 독립적인 양방향 프레임 시퀀스이다  
* 스트림 특징  
	 * 	하나의 HTTP/2 연결에서 동시에 여러개의 스트림을 열 수 있으며 여러개의 스트림은 각 엔드포인트(서버, 클라이언트)에서 인터리빙(interleaving) 할 수 있다    
	 * 스트림은 일방적으로 설정 및 사용되거나 클라이언트 또는 서버에 의해 공유하여 사용할 수 있다 
	 * 각 엔드포인트는 스트림을 닫을 수 있다 
	 * 스트림에 데이터를 전송하는 순서대로 수신측에서 수신하여 데이터를 처리하기 때문에 프레임의 순서가 중요하다. 특히, `HEADERS`, `DATA` 프레임의 순서는 프로토콜의 의미론적으로 중요하다  
	 * 스트림은 정수(integer)로 구분된다 
	 * 각 엔드포인트가 스트림을 공유하는 경우, 스트림을 최초 생성하는 엔드포인트에서 스트림에 스트림 식별자(identifier)를 할당한다   



	
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview