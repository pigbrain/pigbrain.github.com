---
layout: post
category: Network
title: WebSocket
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# 웹소켓의 장점과 단점  
* 장점  
	* HTTP가 아닌 TCP를 이용하여 통신한다  
	* 양방향 통신을 지원한다  
	* HTTP보다 빠르다  
<br>
* 단점  
	* 브라우저에서 HTML5을 지원해야 한다  
	* 클라이언트와 서버가 통신하기 위해서 특정 프로토콜이 필요하다  
<br>  
<br>

# 웹소켓 프로토콜  
* HTTP handshake  
	* 클라이언트는 서버에게 웹소켓 사용을 위한 HTTP 패킷을 보낸다  
	<img src="/assets/themes/Snail/img/Network/WebSocket/httpHandShake_C2S.png" alt="">  
	* 서버에서 해당 프로토콜을 지원한다면 웹소켓 사용을 위한 응답을 보낸다  
	<img src="/assets/themes/Snail/img/Network/WebSocket/httpHandShake_S2C.png" alt="">  
<BR>
* HTTP handshake가 완료 되면 HTTP Connection을 종료한다
* HTTP Connection 종료 후 웹 소켓 Connection을 위한 TCP Connection을 생성한다
* HTTP와 동일한 포트를 사용  
	* HTTP : 80 포트  
	* HTTPS : 443 포트  
* TCP 통신은 다음과 같은 프로토콜을 사용한다  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocketProtocol.png" alt="">  
<br>  
	* Text, Binary 모두 전송 가능  
	* 패킷은 최소 2bytes로 만들어질 수 있다  
	* Text 전송 프레임은 0x00, 0xFF바이트를 구분자로 사용하여 UTF-8 인코딩을 사용한다  
	* Binary 전송 프레임은 length 필드를 이용한다  
<br>  

# 웹소켓 API
* 웹소켓 생성  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket1.png" alt="">  
<br>  
* 연결 완료 콜백  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket2.png" alt="">  
<br>  

* 메세지 수신 콜백  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket3.png" alt="">  
<br>  

* 연결 종료 콜백  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket4.png" alt="">  
<br>  

* 웹소켓 종료  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket5.png" alt="">  
<br>  

* 메세지 전송  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocket6.png" alt="">  
<br>  

# 웹소켓 지원 서버  
* NC: Native Comet (The WebServer has API for Comet)  
* NWS: Native WebSockets (The WebServer has API for WebSocket)  
* W: WebSockets  
* LP: Long-Polling  
* HS: Http Streaming  
* J: JSONP  
* SSE: Server-Sent Events  
<br>  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocketSupportTable.png" alt="">  
<br>  
<br>  

# 웹소켓 지원 브라우저  
<img src="/assets/themes/Snail/img/Network/WebSocket/webSocketSupportBrowser.png" alt="">  
<br>

#참고#
* https://www.websocket.org/aboutwebsocket.html  
* http://synvistech.com/blogs/advantages-disadvantages-of-websocket-api  
* https://github.com/Atmosphere/atmosphere/wiki/Supported-WebServers-and-Browsers  