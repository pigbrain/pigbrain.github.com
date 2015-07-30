---
layout: post
category: Erlang
title: apply, 속성(Proeprty)
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#apply#  

* BIF의 한 종류  
* apply는 인수를 전달하여 모듈에 있는 함수를 호출하도록 해준다  
* 함수를 직접 호출하는 것과 apply의 차이점 : 모듈 이름 및 함수 이름이 동적으로 계산될 수 있다  
* 
* appy(Mod, Func, [Arg1, Arg2, ..., ArgN])  
	* 모듈 Mod의  함수 Func를 인수 Arg1, Arg2, ... ArgN에 적용  
* **apply를 사용하는 것은 가능한 한 피해야 한다**
	* apply를 사용하여 함수 호출을 만들면 많은 분석 도구에서 뭐가 일어났는지 파악할 수 없다  
	* 컴파일러 최적화도 일부 수행되지 않는다  
<br>
* ex) apply(erlang, atom_to_list, [hello]).


#속성#  
* 파일의 특정한 속성을 정의하는데 사용  
* 사전 정의된 속성과 사용자 정의 속성 두가지 유형이 있다  
<br>  
* 사전 정의된 속성  
	* 미리 정해진 의미가 있으며 어떠한 함수 정의보다도 앞서 나와야한다  
  	
	* module(modname). 
		* 모듈 선언  
		* modname 은 atom이어야 한다  
		* 이 속성은 파일의 첫 번째 속성이어야 한다  
		* 관례적으로 modname의 코드는 modname.erl이라는 파일에 저장된다  
		* modname.erl로 저장하지 않을 경우 자동 코드 로딩이 제대로v동작하지 않을 수 있다  

	* import(Mod, [Name1/Arity1, Name2/Arity2...]).  
		* Arity1 개의 인수를 가지는 함수 Name1이 모듈 Mod로 부터 improt될 것임을 지정  
		* 모듈로부터 함수가 import되면 그 함수는 모듈 이름을 지정하지 않고도 호출할 수 있다  

				-module(abc).  
				-import(lists, [map/2]).  

				f(L) ->  
					L1 = map(fun(X) -> 2*X end, L),  
					lists:sum(L1)  
  
		* export([Name1/Arity1, Name2/Arity2...]).  
			* 함수 Name1/Arity1, Name2/Arity2... 등을 현재의 모듈에서 export 한다 
			* export된 함수만이 모듈 밖에서 호출될 수 있다  
  
		* compile(Options).  
			* 컴파일러 옵션 목록에 Options를 추가  
			* Options는 단일한 컴파일 옵션 또는 컴파일러 옵션들의 리스트이다  
			* 컴파일러 옵션인 -compile(export_all).은 종종 프로그램을 디버깅할 때 사용  
				* 이렇게 하면 명시적으로 -export라고 표기하지 않아도 모듈의 모든 함수를 export한다.
  ﻿
		* vsn(Version).  
			* 모듈의 버전을 지정  
			* Version은 어떠한 문자열도 가능  
			* Version은 아무런 구문이나 의미를 가지지 않는다  
			* 분석 프로그램에서나 또는 문서화 목적으로 사용  
<br>  
  
* 사용자 정의 속성  
	* -SomeTag(Value). 와 같은 형태로 정의  
		* SomeTag는 atom 이여야 한다  

				-module(attrs).
				-vsn(1234).

				-author({joe, armstrong}).  
				-purpose("example of attributes").     

