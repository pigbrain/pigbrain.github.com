---
layout: post
category: Erlang
title: 멀티 프로세스 프로그래밍(Multi Process Programming)
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

* 얼랭에서 프로세스는 운영체제가 아닌 프로그램 범주에 속한다  
* 얼랭 프로세스는 다음과 같은 특성이 있다  
	* 프로세스의 생성과 제거가 매우 빠르다  
	* 프로세스 간 메시지 전송이 매우 빠르다  
	* 모든 운영체제에서 프로세스가 똑같은 방식으로 동작한다  
	* 매우 많은 수의 프로세스를 가질 수 있다  
	* 프로세스는 메모리를 공유하지 않으며 완전히 독립적이다  
	* 프로세스가 상호작용하는 유일한 방법은 메시지 전달 뿐이다  
		* 얼랭은 Pure Message Passing Language 라고도 불린다  
* 얼랭에서 프로세스 프로그래밍은 spawn, send, receive 명령만 있으면 가능

<br>  
<br>  


* **Pid = spawn(Fun)**  
	* Fun을 실행하는 새 프로세스를 생성  
	* 새로 생성된 프로세스는 호출한 프로세스와 병행으로 실행된다  
	* spawn은 Pid를 반환한다(Pid는 프로세스 식별자이며 프로세스로 메시지를 보낼 때 사용된다)  
* **Pid ! Message**
	* 식별자가 Pid인 프로세스로 메시지를 보낸다  
	* 메시지는 비동기로 전송된다  
	* **!**는 send 연산자라 부른다  
	* Pid1 ! Pid2 ! .... ! M 은 Pid1, Pid2...등 모든 프로세스로 메시지 M을 보낸다는 의미

* **receive ... end**  
	* 프로세스로 전송된 메시지를 받기위해 사용된다  
		
			receive
				Pattern1 [when Guard1] -> Expression1;
				Pattern2 [when Guard2] -> Expression2;
				.......
			end  
		*  ﻿첫 번째 패턴이 매치하지 않으면 Pattern2와 매치시키는 식으로 진행된다  
		*  어떠한 패턴과도 매치하지 않으면 메시지는 나중에 처리하기 위해 저장된다  
		*  프로세스는 다음 메시지를 기다린다  
<br>
<img src="/assets/themes/Snail/img/Erlang/MultiprocessProgramming/mp-1.png" alt="">  
<br>
<img src="/assets/themes/Snail/img/Erlang/MultiprocessProgramming/mp-2.png" alt="">  
  
* 위 프로그램은 프로세스에게로 요청을 보내는 예이다  
* 요청을 보낸 프로세스로 응답을 보내기 위해서는 응답할 수 있는 주소를 포함시켜서 요청해야한다  
	* send 요청을 할떄 Pid ! {self(), {rectangle, 6, 10}} 과 같은 형태로 변경해야한다  
<br>
<img src="/assets/themes/Snail/img/Erlang/MultiprocessProgramming/mp-3.png" alt="">  
* rpc 함수는 해당 Pid 프로세스로 요청을 보내고 응답을 기다리는 부분을 캡슐화 한 것이다  
<br>
<img src="/assets/themes/Snail/img/Erlang/MultiprocessProgramming/mp-4.png" alt="">  
* 위 코드의 문제점
	* 프로세스가 여러개 있을때 A라는 프로세스로 요청을 보냈고 응답을 기다리고 있다  
	* 여기서 어떤 응답을 기다리는지는 알 수 없다
	* A로 보낸 요청에 대한 응답이 올때까지 무작정 기다리는 것이다  
	* 다른 프로세스가 보낸 메세지를 A로 부터온 응답으로 오인 할 수도 있다  
	* receive 문을 아래와 같이 변경해야 한다
<br>
<img src="/assets/themes/Snail/img/Erlang/MultiprocessProgramming/mp-5.png" alt="">  
	* rpc 함수로 진입하면 Pid는 어떤 값과 바운드한다  
	* 패턴 {Pid, Response}에서 Pid는 바운드이고 Response는 언바운드이다  
		* 수신된 메세지들 중 첫번쨰 요소가 Pid와 매칭되는 것들만 처리한다  
		* 나머지는 모두 큐에 쌓인다  

