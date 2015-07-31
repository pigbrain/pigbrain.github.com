---
layout: post
category: Erlang
title: 함수 참조, 리스트 연산++/--, 매크
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#함수 참조#  
* 현재 모듈 또는 어떤 외부 모듈에서 정의한 함수를 참조하고 싶을 때 다음과 같이 사용  
	* **fun LocalFunc/Arity**  
		* 현재 모듈에서 인수를 Arity개 가진 LocalFunc라는 로컬 함수를 참조  
	* **fun Mod:RemoteFunc/Arity**
		* 모듈 Mod에 있는 인수 Arity개를 가진 RemoteFunc라는 외부 함수를 참조

				square(X) -> X * X.  
				double(L) -> lists:map(fun square/1, L).  
    
<br>  
<br>  
#리스트 연산 ++/--#  
* 리스트에서 ++와 --는 더하기, 빼기 연산자이다  
	* A ++ B는 A와 B를 더한다(추가한다)  
	* A -- B는 A에서 B요소들을 뺀다  

			[1, 2, 3] ++ [4, 5, 6].                결과 > [1,2,3,4,5,6]  
			[a, b, c, 1, d, e, 1, x, 1] -- [1].    결과 > [a,b,c,d,e,1,x,1]  
			[a, b, c, 1, d, e, 1, x, 1] -- [1, 1]. 결과 > [a,b,c,d,e,x,1]  

<br>
#매크로#  
* 매크로는 다음과 같은 형태로 작성한다
		
		-define(Constant, Replacement).
		-define(Func(Var1, Var2, ...., VarN), Replacement).

* -define(macro1(X, Y), {a, X, Y}).  
	* foo(A) -> ?macro1(A+10, b) 이것은 다음과 같이 치환 된다  
		* foo(A) -> {a, A+10, b).  
<br>  
<br>  
* ﻿매크로는 ?MacroName 형태의 식을 만나면 전처리기 epp에 의해 치환된다  
* 매크로 정의에 나오는 변수들은 매크로 호출과 대응되는 곳에 있는 완전한 형태와 매치한다  
	* **?FILE** : 현재 파일 이름으로 확장  
	* **?MODULE** : 현재 모듈 이름으로 확장  
	* **?LINE** : 현재 줄 번호로 확장  
	* **-undef(Macro).** : 매크로 정의를 해제. 이후로 이 매크로는 호출 할 수 없다  
	* **-ifdef(Macro).** : Macro가 정의된 경우에만 이어지는 줄을 실행한다  
	* **-ifndef(Macro).** : Macro가 정의되지 않은 경우에만 이어지는 줄을 실행한다  
	* **-else** : ifdef, ifndef 문 뒤에 나온다. 조건이 거짓이면 else 뒤에 오는 줄이 실행된다  
	* **-endif** : ifdef, ifndef 문의 끝을 표시  
<br>
<br>
<img src="/assets/themes/Snail/img/Erlang/Macro/macro-1.png" alt=""> 
<br>
<img src="/assets/themes/Snail/img/Erlang/Macro/macro-2.png" alt="">  
