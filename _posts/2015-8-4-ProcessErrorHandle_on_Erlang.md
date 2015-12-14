---
layout: post
category: Erlang
title: 프로세스 오류 처리
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

# 프로세스 연결하기  #
* 한 프로세스가 다른 프로세스에 의존할 경우, 자신이 의존하는 다른 프로세스의 상태를 모니터링 해야 한다  
* BIF인 **link**를 사용
<br>

#시스템 프로세스(System Process)#  
* 프로세스 종료 신호를 수신한 프로세스가 별다른 조치를 취하지 않으면, 그 신호를 받은 프로세스 역시 종료 할 것이다  
* 시스템 프로세스는 종료 신호들을 잡을 수 있다  
	* 시스템 프로세스와 연결된 프로세스가 어떤 사유로 종료하면, 시스템 프로세스는 자동으로 종료되지 않는다  
	* 시스템 프로세스는 종료 신호를 받아, 그 신호를 잡아서 처리 할 수 있다  
	* 시스템 프로세스인 경우, 프로세스 Pid로부터 종료 신호 Why를 받으면 그 종료 신호는 메시지 {'EXIT', Pid, Why}로 변환되어 시스템 프로세스의 메일박스에 추가된다  
* BIF 함수인 **process_flag(trap_exit, true)**를 호출하면 일반 프로세스가 종료를 잡을 수 있는 시스템 프로세스로 전환된다  
<br>
<img src="/assets/themes/Snail/img/Erlang/ProcessErrorHandle/errorHandle-1.png" alt="">  
<br>
	* Pid가 Why라는 사유로 죽으면 Fun(Why)가 실행된다  
	* **process_flag(trap_exit, true)**는 프로세스를 시스템 프로세스로 전환한다는 의미  
	* **link(Pid)**는 새로 실행된 프로세스를 Pid와 연결한다  
  
<br>  
<img src="/assets/themes/Snail/img/Erlang/ProcessErrorHandle/errorHandle-2.png" alt="">  
<br>  

* Pid에 atom을 보내면 프로세스는 종료되고 on_exit 핸들러가 호출될 것이다  
	* 리스트가 아닌 것에 대해 list_to_atom을 실행하려 했기 때문에 프로세스가 종료 된다   
* 프로세스가 죽을 때 호출되는 함수는 어떠한 계산이든 수행할 수 있다  
	* 오류를 무시할 수도 있고, 오류 로그를 남기거나 또는 어플리케이션을 재시작할 수도 있다  
<br>  
<br>  
<table>
<tr><td>trap_exit</td><td>종료신호</td><td>동작</td></tr>
<tr><td>true</td><td>kill</td><td>죽는다: 종료 신호 killed를 link집합으로 동보한다</td></tr>
<tr><td>true</td><td>X</td><td>메일 박스에 {'EXIT, Pid, X}를 추가한다</td></tr>
<tr><td>false</td><td>normal</td><td>계산한다: 아무 것도 하지 않고 신호가 사라진다.</td></tr>
<tr><td>false</td><td>kill</td><td>죽는다: 종료 신호 killed를 link집합으로 동보한다.</td></tr>
<tr><td>false</td><td>X</td><td>죽는다: 종료 신호 X를 link집합으로 동보한다</td></tr>  
</table>  
<br>  

#오류 처리 명령어#  
* spawn_link(Fun) -> Pid
	* spawn(Fun)과 동일  
	* 프로세스를 생성 후 link를 생성한다  
	* spawn_link는 atomic 연산으로 spawn을 하고 link를 하는 것과 동일하지 않다  
		* spawn하고 link를 하는 경우는 link하는 도중에 프로세스가 죽을수도 있다  

* process_flag(trap_exit, true)  
	* 현재 프로세스를 시스템프로세스로 만든다  
  
* link(Pid) -> true  
	* 프로세스 Pid로 link가 존재하지 않을 경우 link를 생성한다  
	* 만약 프로세스 Pid가 존재하지 않으면 noproc 종료 예외가 발생한다  
	* 만약 이미 link가 존재하면 호출은 무시된다  

* unlink(Pid) -> true  
	* 프로세스 Pid와의 모든 link를 제거한다  

* exit(Why) -> none()  
	* 현재 프로세스를 Why라는 이유로 종료시킨다  
	* 이 코드를 수행하는 절이 catch문의 범위에만 있지 않으면 현재 프로세스는 종료신호를 Why와 함께 현재 이 프로세스에 link된 모든 프로세스로 동보할 것이다  

* exit(Pid, Why) -> none()
	* 종료 신호를 사유 Why와 함께 프로세스 Pid로 보낸다  

* erlang:monitor(process, Item) -> MonitorRef
	* 모니터를 설정한다  
	* Item은 Pid 이거나 또는 프로세스의 등록된 이름이다  
<br>

#모니터(Monitor)#  
* link는 대칭적이다  
	* 프로세스 A가 죽으면 프로세스 B는 종료 신호를 받을 것이고, 그 반대도 동일하다  
* 프로세스가 죽지 않으려면 그 프로세스를 시스템 프로세스로 만들면 되지만, 그러고 싶지 않을 경우 모니터를 사용한다  
* 모니터는 비대칭적인 link이다  
* 프로세스 A가 프로세스 B를 모니터하고 B가 죽으면 A는 종료 신호를 받을 것이다.  그러나 만약 A가 죽으면 B는 신호를 받지 않는다  
<br>

#종료되도 다시 실행되는 프로세스 코드#
	keep_alive(Name, Fun) ->
		register(Name, Pid = spawn(Fun)),
		on_exit:on_exit(Pid, fun(_Why) -> keep_alive(Name, Fun) end).
 
