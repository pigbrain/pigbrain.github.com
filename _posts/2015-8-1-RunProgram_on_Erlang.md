---
layout: post
category: Erlang
title: 프로그램 실행 방법
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->
  
<img src="/assets/themes/Snail/img/Erlang/RunProgram/runProgram-1.png" alt="">  

* io와 io_lib 모듈에서 **~n**은 줄바꿈을 의미  

<br>  

* 얼랭 쉘에서 컴파일하고 실행하기  

<img src="/assets/themes/Snail/img/Erlang/RunProgram/runProgram-2.png" alt="">  

<br>

* 명령 프롬프트에서 컴파일하고 실행하기  
 
<img src="/assets/themes/Snail/img/Erlang/RunProgram/runProgram-3.png" alt="">  

* -noshell : 쉘 없이 Erlang을 시작한다  
* -s hello start : hello:start() 함수를 실행한다  
* -s Mod ... 옵션을 사용할 때 Mod는 컴파일되어 있어야 한다
* -s init stop : apply(hello, start, [])가 완료되면 시스템은 init:stop() 함수를 수행한다
* -s ... 명령은 apply문과 함께 수행되며 완료되면 그 다음 명령이 수행된다



