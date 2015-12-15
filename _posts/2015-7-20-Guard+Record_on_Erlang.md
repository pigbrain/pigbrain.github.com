---
layout: post
category: Erlang
title: Guard, Record
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#Guard#  
* 패턴 매칭의 능력을 증가시키는 데 사용할 수 있는 구조  
	* X와 Y의 최대값을 계산하는 max(X, Y)를 가드를 이용한 작성 예  
		
			max(X, Y)  when  X > Y  -> X;
			max(X, Y)  -> Y.

* Guard가 식으로 사용될 경우에는 true / false 중 하나로 평가된다


#Guard Sequence#  
* 하나의 Guard 혹은 세미콜론(;), 쉼표(,)로 구분된 인련의 Guard들..﻿  
* Guard Sequence G1;G2;...;Gn은 적어도 가드 G1, G2, ... 중 하나가 true로 평가되어야 true 이다  
* Guard Sequence G1,G2,...,Gn은 G1, G2, ... 모두가 true로 평가되어야 true이다  
* Guard Sequence 예  
	
		f(X, Y) when is_integer(X), X > Y, Y < 6 -> ......  
		
	* "X가 정수이며 X가 Y보다 크고 Y가 6보다 작을 때"라는 의미  
<br>  

#Record#
* Tuple로 프로그래밍할 때, Tuple 요소의 수가 커지는 경우 문제가 생길 수 있다  
* Tuple 안의 어떤 요소가 무엇을 의미하는지 기억하기가 어려워 질 수 있다  
* Record는 Tuple 안의 특정 요소와 이름을 연관 짓는 방법을 제공함으로써 이런 문제를 해결해 준다  
* Record는 아래와 같이 선언한다  
<img src="/assets/themes/Snail/img/Erlang/Guard_Record/record-1.png" alt="">  
<br>  
<img src="/assets/themes/Snail/img/Erlang/Guard_Record/record-2.png" alt="">  
* Record 정의문은 Erlang 소스코드 파일에 포함할 수 있다 
* 확장자가 .hrl인 파일 안에 둘 수도 있으며 이 파일은 소스코드 파일에서 인클루드 해야 한다
	* 라인 1에서 rr("~~~")을 통하여 레코드가 정의된 파일을 인클루드 한다  
		* rr은 read records의 약어 이다  
	* 라인 2와 3에서는 새 래코드를 생성  
	* 라인 4에서는 기존 레코드를 복사하고 status값을 done으로 변경하라는 의미  
<br>

* Record에서 값을 추출하기 위해서는 아래와 같은 방식으로 한다  
<img src="/assets/themes/Snail/img/Erlang/Guard_Record/record-3.png" alt="">  

	* 만약 Record의 한 필드만 필요하다면 라인 8처럼 'dot syntax'르르 사용하여 그 필드를 추출할 수 있다  

<img src="/assets/themes/Snail/img/Erlang/Guard_Record/record-4.png" alt="">  

* Record는 Tuple일 뿐이다
* 위 코드에 라인 9에서 rf를 통하여 todo Record 정의를 잊으라고 명령하였다  
* rf를 수행한 이후  X2를 출력하면 Tuple로 출력한다  
* Record의 내부적으로는 Tuple만 있을 뿐이며 Record는 Tuple 속의 상이한 요소에 이름을 붙일 수 있게 해주는 편리한 구문이다  




