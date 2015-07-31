---
layout: post
category: Erlang
title: 얼랭 쉘 중지하는 방법
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->
* 시스템을 중단하는 가장 쉬운 방법은 Ctrl+C를 누르고 a를 누르는 것이다  
<img src="/assets/themes/Snail/img/Erlang/Shell/stop-1.png" alt="">  
<br>
<br>
* 쉘에서 **erlang:halt()**를 통해서도 종료가 가능하다  
	* erlang:halt()는 시스템을 즉각 중단시키는 BIF이다  
	* 이 방식을 사용하면 약간의 문제가 발생 할 수 있다  
		* Ex) 데이터베이스 어플리케이션을 가동하는 도중에 단순히 그 시스템을 정지시키면 다음번 시스템을 시작할 때에 오류 복구 절차를 거쳐야만 한다. 따라서 이런 경우에는 통제된 방식으로 시스템을 중단시켜야 한다  
* 통제된 방식으로 중단하려면 **q().** 를 실행하면 된다  

<img src="/assets/themes/Snail/img/Erlang/Shell/stop-2.png" alt=""> 
