---
layout: post
category: Network
title: HTTP/2 2.Protocol Overview
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 2. Protocol Overview 
* HTTP/2는 HTTP/1.1의 주요 특징들을 모두 지원하지만 더욱 효율적인 처리를 목표로하고 있다  
* HTTP/2에서 기본적인 프로토콜 단위는 프레임(frame)이다  
* 프레임은 여러 타입이 있는데 각 타입마다 서로 다른 목적으로 사용된다  
	* `HEADERS`와 `DATA` 프레임은 기본적인 HTTP 요청/응답을 형성한다  
	* `SETTINGS`, `WINDOW_UPDATE` 그리고 `PUSH_PROMISE`는 HTTP/2의 기능을 지원하기 위하여 사용된다  
* 요청의 멀티플렉싱은 각 HTTP 요청/응답 교환을 스트림과 연관시킴으로써 이루어진다  
* 스트림(stream)들은 독립적이기 때문에 요청/응답 과정에서 블로킹되더라도 다른 스트림에 영향을 끼치지 않는다  
* 흐름제어(flow control)과 우선순위(prioritization)를 통하여 멀티플렉싱된 스트림들은 효율적으로 메시지를 처리한다  
* HTTP/2는 새로운 interaction 모드를 추가하여 서버가 클라이언트에게 응답을 푸쉬 할 수 있다  
	* 서버푸쉬(server push)는  클라이언트가 필요로하는 데이터들을 서버가 먼저  전송 할 수 있도록 함으로써 latency와 네트워크 사용량에 대하여 트레이드 오프 관계에 놓인다   
	* 서버에서 서버푸쉬 기능을 사용하기 위해서는 클라이언트에서 `PUSH_PROMISE`프레임을 보내야 한며 이 프레임을 서버가 수신하면 별도 스트림을 통하여 응답을 전송 할 수 있다  
* HTTP 헤더는 데이터의 큰 부분을 차지하고 있기 때문에 HTTP/2에서는 그것을 압축하여 프레임에 포함되도록 하였으며 그 결과 여러 요청을 하나의 패킷으로 압축할 수 있게 되었다    
	
	
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview