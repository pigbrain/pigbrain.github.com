---
layout: post
category: Erlang
title: Supervisor  
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


#원문#  
* http://learnyousomeerlang.com/supervisors  


