---
layout: post
category: Erlang
title: OTP Supervisor  
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#Supervisor#  
* Supervisor 는 프로세스(worker)를 생성하고 link, process_flag(trap_exit,true)설정을 한다  
* Supervisor는 오류가 발생한 프로세스를 재실행해준다  
  
<br>  
  
#Supervisor Concepts#  
<img src="/assets/themes/Snail/img/Erlang/Supervisor/sup-tree.png" alt="">  
  
* Supervisor는 프로세스(worker)뿐만 아니라 다른 supervisor들도 생성/관리 할 수 있다  
* 어플리케이션이 종료될때 올바른 순서로 프로세스를 종료 시킬 수 있다  
	* 상위 supervisor에게 init:stop/1과 같은 함수로 종료 요청이 들어올 경우 자식 worker, supervisor가 먼저 종료 될 수 있도록 shutdown 요청을 보낸다  
  
<img src="/assets/themes/Snail/img/Erlang/Supervisor/sup-tree-shutdown.png" alt="">  
<br>  

#Using Supervisors#  


* OTP supervisor init/1 콜백 함수의 리턴 형태  
	* \{ok, \{\{**RestartStrategy**, **MaxRestart**, **MaxTime**\},[**ChildSpecs**]\}\}.

			{ok, \{\{one_for_all, 5, 60\},
				[\{fake_id,
				 \{fake_mod, start_link, [SomeArg]\},
				 permanent,
				 5000,
				 worker,
				 [fake_mod]\},
				 \{other_id,
				 \{event_manager_mod, start_link, []\},
				 transient,
				 infinity,
				 worker,
				 dynamic\}]\}\}.  

* ChildSpec은 자식 worker, supervisor의 spec
* RestartStrategy은 자식 worker, superviosr가 죽었을때 재실행 하는 방법을 설정  
	* **one_for_one**  
		* 자식 노드가 종료되면 즉시 종료된 자식노드만 재실행 한다  
<img src="/assets/themes/Snail/img/Erlang/Supervisor/restart-one-for-one.png" alt="">  
<br>  

	* **one_for_all**  
		* 자식 노드가 종료되면 다른 자식 노드들도 종료 시킨후 모두 재시작한다  
<img src="/assets/themes/Snail/img/Erlang/Supervisor/restart-one-for-all.png" alt="">  
<br>  
 
	* **rest_for_one**  
		* 자식 노드를 실행 시킨 순서에 의존한다  
		* A -> B -> C 노드 순서대로 실행 됬을 경우, 만약 A가 종료되었다면 B, C를 종료 시킨후 A, B, C를 재시작한다  
		* A -> B -> C 노드 순서대로 실행 됬을 경우, 만약 B가 종료되었다면 C를 종료 시킨후 B, C를 재시작한다  
		* A -> B -> C 노드 순서대로 실행 됬을 경우, 만약 C가 종료되었다면 C를 재시작한다  
		* 
<img src="/assets/themes/Snail/img/Erlang/Supervisor/restart-rest-for-one.png" alt="">  
<br>  

	* **simple_one_for_one**  
		* 동적으로 자식 노드를 추가하고자 할때 사용된다  
			* one_for_one / one_for_all / rest_for_one 는 초기에 정적으로 자식 노드를 추가하는 방법이다  
		* 한 종류(한 MODULE)에 대한 자식 노드만 생성 가능하다  
  
	* **one_for_one**과 **simple_one_for_one**의 차이점  
		* 정적 노드 추가 vs 동적 노드 추가  
		* one_for_one은 자식 노드를 리스트를 이용하여 관리한다(노드 실행 순서대로 리스트에 들어간다)  
		* simple_one_for_one은 각각의 노드들마다 dict를 이용하여 관리된다  
		* 많은 수의 자식 노드를 실행시킬때는 one_for_one 보다 simple_one_for_one이 더 빠르다  
* Restart limits  
	* **MaxTime(second)**안에 **MaxRestart**값 보다  더 많이 실행 되었다면 supervisor는 해당 노드를 재실행 하는것을 중단한다  
<br>  

#Child Specifications#
  
<br>  

#원문#  
* http://learnyousomeerlang.com/supervisors  



