---
layout: post
category: Erlang
title: Modules & Compilation  
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#Modules#    
 * 모듈은 함수의 집합체이다  
 * 대부분의 얼랭 프로그램은 하나 이상의 모듈로 구성된다  
 * 모듈은 Java의 패키지, C의 헤더파일과 비슷한 의미이다  

#Calling a Function#  
 * 얼랭에서 함수 호출은 다음과 같은 형태를 갖는다  

		%% module_name:function(argument1, argument2, ...)  
		> lists:max([1, 2, 3]).  
	 

#Defining Modules (mlists)#
* mlists.erl 파일을 생성한다  
	* 파일 이름과 모듈 이름은 동일해야 한다  
* 모듈 속성(Attribute)를 정의한다  
	* 속성은 얼랭 컴파일러에게 전달하고자하는 정보이다  
	* 속성은 파일 윗 부분에 **-attribute(attribute_value(s))**와 같이 선언한다  
	* **-module(name)**이라는 속성은 반드시 정의해야 한다  
* **-module(mlists).** 를 정의한다  
* **-export([function1/arity1, function2/arity2, ...]).**    
	* export는 모듈 외부에서 사용하고 하는 함수들을 정의하는 속성이다    
	* 모듈의 모든 함수가 export 될 필요는 없다. 외부에서 사용하고자 하는것만 export한다  
	* Java의 Interface와 동일하다  
* **-compile([...]).**  
	* 컴파일러에게 전달하고자하느 명령어를 적으면 된다  
	* 유용하게 사용하는 것으로 export_all이 있다
		* 모듈의 모든 함수를 export 시킨다  
			
				-compile([export_all]). 

* **=import(module_name, [function1/arity1, function2/arity2]).**  
	* 다른 모듈에 있는 함수를 module_name:function(...)이 아닌 function(...) 형태로 사용하기 위해 선언한다  
	* import를 하면 사용하기에는 편리하지만 가독성이 떨어져 추천하지 않는다  
* 그 외 속성(Attribute)
	* 사용자 정의 속성을 정의할 수 있다  

			-author("V. Trigonakis").
			-date({2011, 03, 11}). 

<br>  
  
#Example#  

	-module(md).
	-export([same/1, double/1]).
	-author("V. Trigonakis").
	-date({2011, 03, 11}).

	same(l) ->
		l.
		
	double(N) ->
		2 * N.
	
	not_exported() ->  
		same(smthing),  
		double(123).


* 위 모듈은 3개의 함수를 가지고 2개의 함수만(same/1, double/1) export 되었다   

<br>  
  
  
#Compiling Modules#  
* Emulator  
	* 얼랭 에뮬레이터에서 코드를 컴파일 하기 위해서는 BIF 중 **c(module_name)**를 사용한다  
	
			1> c(md).  
			 {ok, md}  
  
  
	* 컴파일 과정에서 오류가 발생하지 않았다면 .beam 파일이 생성되었을 것이다  

* Erlang Compiler (erlc)  
	* **c(module_name)** 외에 erlc를 통하여 beam을 생성하는 방법도 있다  
		* **Erl**ang **C**ompiler  

				$ erlc md..erl
				$ ls
			 	 md.beam  md.erl

<br>  

#Loading a Module#  
* 컴파일된 모듈은 다음과 같은 형태로 로딩할 수 있다  
	
		1> l(md).  
		 {module, md}.

<br> 

#Getting the Module's Attributes#  
* 모든 컴파일된 모듈은 module_info/0, module_info/1 함수를 통하여 해당 모듈의 속성을 가져올 수 있다  

		1> erlang:module_loaded(md).
		false
		2> l(md).
		{module,md}
		3> erlang:module_loaded(md).
		true
		4> md:module_info().
		[{exports,[{same,1},
		           {double,1},
		           {module_info,0},
		           {module_info,1}]},
		 {imports,[]},
		 {attributes,[{vsn,[205824271517095806442935620583334286333]},
		              {author,"Vasileios Trigonakis"},
		              {date,[{2011,3,13}]}]},
		 {compile,[{options,[{cwd,"~/Documents/playing/erlang/post_modules"},
		                     {outdir,"~/Documents/playing/erlang/post_modules"}]},
		           {version,"4.6.4"},
		           {time,{2011,3,14,7,54,12}},
		           {source,"~/Documents/playing/erlang/post_modules/md.erl"}]}]
		5> md:module_info(attributes).  
		[{vsn,[205824271517095806442935620583334286333]},
		 {author,"Vasileios Trigonakis"},
		 {date,[{2011,3,13}]}] 

<br>
<br>

#원문#
* http://trigonakis.com/blog/2011/03/14/introduction-to-erlang-modules-compilation/  
