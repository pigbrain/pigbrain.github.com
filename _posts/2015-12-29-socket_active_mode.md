---
layout: post
category: Erlang
title: Erlang socket setopts(Socket, {active, xxxx})
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#intet:setopts(Socket, Options)#  
* 하나 이상의 소켓 옵션을 설정한다  
* 리턴 값 : ok | {error, posix()}  
  
<br>  
  
#{active, true | false | once | N}#  
* active 속성의 기본값은 true이다  
<br>  
* active 속성이 true일 경우 
	* active mode라고 한다  
	* 모든 수신된 메세지는 메세지 형태로 프로세스로 전달 된다  
<br>  
* active 속성이 false일 경우  
	* passive mode라고 한다  
	* **gen_tcp:recv/2,3**, **gen_udp:recv/2,3**, **gen_sctp:recv/1,2**과 같은 함수를 명시적으로 호출하여 소켓으로 부터 데이터를 직접 수신해야한다  
<br>  
* active 속성이 once일 경우  
	* 최초 한번 {active, true}와 동일하게 소켓으로 부터 수신된 데이터가 메세지 형태로 프로세스로 전달된다  
	* 최초 한번만 진행되기 때문에 두 번째 수신된 메세지를 받기 위해서는 **setopts{active, once}**를 다시 호출해줘야한다  
<br>  
* active 속성이 N(정수)일 경우  
	* N 값의 범위 : -32768 ~ 32767  
	* N 값이 설정되게 되면 소켓으로 부터 수신된 데이터를 제어 프로세스로 보낼때 소켓의 메세지 Count에 이 값을 더해서 보낸다  
	* 소켓의 메세지 Count 기본값은 0이다  
	* N이 음수이고 현재 소켓의 메세지 count와 같거나 더 크다면 소켓의 메세지 Count는 0으로 설정된다  
	* 소켓의 메세지 Count가 0에 다다르게되면 소켓이 passive mode로 변경될꺼라는 메세지를 받게 된다  
		* passive mode로 변경되면 **setopts/2**를 통하여 다시 소켓 옵션을 변경해줘야 active 모드로 변경된다  

<br>  
<br>  

#Note#  
* {active, true} 모드는 flow control을 제공하지 않는다  
	* sender 가 빠르게 메세지를 보낼 수록 receiver는 수시된 메세지들로부터 오버플로우 될 수 있다  
	* {active, N} 모드 중 N이 0보다 클 때에도 {active, true}와 동일한 형태로 동작한다  
* active mode는 어플리케이션 레벨에서 flow control을 관리하고 고수준의 프로토콜을 제공하고자 할때 사용해야 한다  
	* 수신된 메세지에 ack를 보내는 경우  
	* 작은 사이즈의 데이터를 보내는 경우  
* {active, false}, {active, once}, {active, N} 모드는 flow control을 제공한다 
	* {active, N}인 경우 N은 적당한 값으로 설정되어 있어야 한다  
	* 수신측에서 데이터를 읽는 속도보다 빠르게 데이터 전송이 불가능하다  
	* 소켓에서 데이터를 수신할때마다 소켓의 처리 방법(behaviour)이 자동으로 변경된다  
  
  
#원문#  
* http://www.erlang.org/doc/man/inet.html


