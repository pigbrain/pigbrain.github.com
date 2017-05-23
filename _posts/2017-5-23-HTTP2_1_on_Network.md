---
layout: post
category: Network
title: HTTP/2 1. Introduction
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 1. Introduction
* HTTP/1.1는 매우 훌륭한 프로토콜이지만 어플리케이션 성능에 부정적인 영향을 미치는 몇가지 특징을 가지고 있다  
	* HTTP/1.0은  TCP connection당 하나의 요청만 보낼수 있도록 되어 있다  
	* HTTP/1.1에서는 요청을 파이프라이닝할 수 있는 기능이 추가되었지만 동시적인 요청에 대하여 일부분만 고려되었으며  `head-of-line blocking`문제를 해결하지 못하였다  
	* HTTP/1.0과 HTTP/1.1은 다수의 요청을 보내기 위해서는 여러개의 connection을 생성하여 latency를 줄여야 한다   
	* HTTP헤더에 속한 필드들은 반복적으로 장황하게 선언되는데 이러한 것들은 불필요한 네트워크 트래픽을 발생시킨다  
* HTTP/2는 HTTP/1.1이 지닌 문제들을 해결하기 위하여 HTTP의 구조를 최적화하였다  
	* 동일한 connection에서 요청과 응답의 interleaving이 가능해졌다  
	* 불필요하게 컸던 HTTP헤더를 압축할 수 있다  
	* 요청들의 우선순위를 매김으로써 중요한 요청이 더 빠르게 처리될 수 있도록 한다   
	* HTTP/2는 HTTP/1.1에 비해 적은 수의 connection을 사용하기 때문에 네트워크 자원을 효율적으로 사용할 수 있다   
	* 바이너리 메시지 프레임을  사용하여 효율적인 메시지 처리가 가능하다   
  
  
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview