---
layout: post
category: Network
title: HTTP/2 4.HTTP Frames
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 4. HTTP Frames
* HTTP/2 연결이 이루어지면 클라이언트, 서버는 프레임을 교환하기 시작한다  

## 4.1 Frame Format  
* 프레임 = 헤더(72 bytes) + 가변 길이 payload  

	```
	 +-----------------------------------------------+
	 ⎢                 Length (24)                   ⎢
	 +---------------+---------------+---------------+
	 ⎢   Type (8)    ⎢   Flags (8)   ⎢
	 +-+-------------+---------------+-------------------------------+
	 ⎢R⎢                 Stream Identifier (31)                      ⎢
	 +=+=============================================================+
	 ⎢                   Frame Payload (0...)                      ...
	 +---------------------------------------------------------------+
	```
	
#### Length 
* 프레임 payload의 길이는 unsigned 24 bit Integer로 표현된다  
* 수신측에서 2^14(16,384) 보다 큰 값을 `SETTINGS_MAX_FRAME_SIZE`으로 지정하지 않는다면 2^14보다 긴 프레임은 전송되지 않는다   

#### Type  
* 프레임의 포맷이나 구문(semantic)을 결정한다  

#### Stream Identifier  
* stream identifier는 31 bit Integer로 표현된다  
* stream identifier 0x0은 개별 stream이 아닌 전체적으로 연결과 연관된 프레임에 대해 사용되도록 지정되어 있다  

## 4.2 Frame Size
* 수신측이 `SETTINGS_MAX_FRAME_SIZE`을 지정하는 것에 따라 프레임 payload의 최대 사이즈가 정해진다  
* 최대 사이즈의 범위는 2^14(16,384) ~ 2^24 - 1(16,777,215) 이다  
  
## 4.3 Header Compression and Decompression  
* HTTP/1처럼 HTTP/2의 헤더 필드는 하나 혹은 그 이상의 값을 갖는 이름이다  
* 헤더 필드는 요청/응답 메세지 뿐만 아니라 서버 푸쉬 메세지에도 포함된다  
* 헤더 리스트는 헤더 필드들의 집합이다  
* 전송 과정에서 헤더 리스트는 압축(compression)되어 헤더 블럭(block)으로 시리얼라이즈 된다   
* 수신측에서는 헤더 리스트를 다시 구성하기 위하여 헤더 블럭들을 이어 붙이고 압축을 푼다 

	
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview