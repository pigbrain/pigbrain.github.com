---
layout: post
category: Erlang
title: Registered Process
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

* 어떤 프로세스로 메시지를 보내려면 그 프로세스의 PID를 알아야 한다  
	* 그 프로세스와 통신하고자 하는 모든 프로세스로 PID를 보내야 하기 때문에 번거로울 수 있다   
* 얼랭에서는 프로세스 식별자를 공개함으로써 시스템에 있는 어떤 프로세스라도 이 공개된 프로세스와 통신할 수 있는 방법을 제공한다  
	* 식별자가 공개된 프로세스를 가리켜 Registered Process라 부른다  
	* Registered Process를 관리하는 BIF가 4개 있다  

<br>
<br>

* **register(AnAtom, Pid)**  
	* 프로세스 Pid를 AnAtom이라는 이름으로 등록한다  
	* AnAtom이 프로세스를 등록하는데 이미 사용되고 있다면 등록은 실패한다  

* **unregister(AnAtom)**  
	* AnAtm과 연관된 모든 등록을 제거한다  

* **whereis(AnAtom) -> Pid │ undefined**
	* AnAtom이 등록되었는지 조사한다  
		* 이것은 프로세스 식별자인 Pid를 반환허가나 AnAtom과 연결된 프로세스가 없는 경우 atom인 undefined를 반환한다  
* **registered() -> [AnAtom::atom()]**
	* 시스템에 있는 모든 등록된  프로세스들의 목록을 반환한다  
<br>
<br>
<img src="/assets/themes/Snail/img/Erlang/RegisteredProcess/rp-1.png" alt="">  
<br>
<img src="/assets/themes/Snail/img/Erlang/RegisteredProcess/rp-2.png" alt="">  
