---
layout: post
category: Network
title: HTTP/2 3.Starting HTTP/2
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 3. Starting HTTP/2 
* HTTP/2는 TCP 위에서 동작하는 어플리케이션 레이어 프로토콜이다  
* HTTP/2는 HTTP/1.1에서 사용하는 `http`, `https` scheme을 사용한다  
* HTTP/2는 http로 80포트를, https로 443포트를 사용한다  


## 3.1 HTTP/2 Version Identification
* `h2`는 HTTP/2가  Transport Layer Security(TLS)를 사용하여 데이터를 주고 받는다  
* `h2c`는 HTTP/2가 평문 형태로 데이터를 주고 받는다  
  
## 3.2 Starting HTTP/2 for "http" URIs  
* 클라이언트에서 서버가 HTTP/2를 지원하는지 모른다면 HTTP업그레이드 메커니즘을  진행하기 위하여 HTTP 요청을 보내야 한다  
	* 클라이언트는 `Upgrade`헤더가 포함된 HTTP요청을 보낸다  
	* HTTP요청에는 `HTTP2-Settings` 헤더 필드가 반드시 포함되어있어야 한다
		* `HTTP2-Settings` 필드는 connection-specific한 헤더 필드이며 HTTP/2 연결에서 사용되는 파라미터들을 포함하고 있다   	
	
	```
	GET / HTTP/1.1 to  
	Host: server.example.com
	Connection: Upgrade, HTTP2-Settings
	Upgrade: h2c
	HTTP2-Settings: <base64url encoding of HTTP/2 SETTINGS payload>
	```
* 서버가 HTTP/2를 지원하지 않는다면 `Upgrade`가 제외된 응답을 보낸다  

	```
	HTTP/1.1 200 OK
	Content-Length: 243
	Content-Type: text/html
	...
	```
* 서버가  HTTP/2를 지원한다면 101(Switching Protocols) 응답을 보낸다  
	* 101응답의 빈 줄 다음에는 서버가 최초로 HTTP/2 프레임 데이터를 보낸다  
	* 서버가 보낸 프레임 데이터에는 연결에 대한 preface가 들어있다  
	* 클라이언트는 101응답을 받자마자 `SETTING`프레임을 포함하고 있는 preface를 전송한다  

	```
	HTTP/1.1 101 Switching Protocols
	Connection: Upgrade
	Upgrade: h2c
	
	[ HTTP/2 connection ...

	```    		
* HTTP를 업그레이드 하기 위하여 전송한 HTTP/1.1 요청은 1번 stream identifier로 할당된다  
	* Stream 1은 클라이언트에서 서버로 `half-closed` 상태이다  	   	 
 
  
## 3.3 Starting HTTP/2 for "https" URIs  
* `h2`프로토콜 identifier를 지정한다  
* TLS negotiation이 완료되면 클라이언트와 서버는 preface를 전송한다  
  
## 3.4 Starting HTTP/2 with Prior Knowledge
* 서버가 HTTP/2를 지원하는 것을 알고있다면 클라이언트는 preface를 전송하고 HTTP/2프레임을 전송한다  
	* TLS를 사용하는 경우에는 TLS negotiation이 완료된 후에 prface와 프레임을 전송해야 한다  
* preface를 받은 서버 역시 클라이언트로 preface를 전송한다  


## 3.5 HTTP/2 Connection Preface
* HTTP/2에서 각 엔드포인트(클라이언트, 서버)는 HTTP/2 사용 및 설정에 대한 확인 과정으로 connection preface를 전송한다  
* 클라이언트와 서버는 각각 다른 preface를 전송한다  
* 클라이언트 preface는 다음 24바이트로 시작하며 `PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n`를 나타낸다  

	```
	0x505249202a20485454502f322e300d0a0d0a534d0d0a0d0a
	```


	
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview