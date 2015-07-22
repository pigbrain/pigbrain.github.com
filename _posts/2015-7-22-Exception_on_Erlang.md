---
layout: post
category: Erlang
title: 예외(Exception)
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

* 얼랭에서 예외를 만들어내는 방법은 다음과 같이 세가지가 존재한다  
	* exit(Why)  
		* 현재 프로세스를 종료하고자 할 경우에 사용  
		* 이 오류를 잡지 않을 경우 {'EXIT', Pid, Why} 메시지가 현재 프로세스와 연결된 모든 프로세스로 브로드케스트 된다  
	* throw(Why)  
		* 예외를 던지는데 사용  
		* 이 함수를 사용하는 사용자는 통상적인 경우만 처리  
			* 예외는 무시하거나 try...catch식으로 감싸서 오류를 처리
	* erlang:error(Why)  
		* Crashing Error 를 표시하는데 사용

#예외 처리 구문#  

	try FuncOrExpressionSequence of  
	    Pattern1 [when Guard1] -> Expression1;  
	    Pattern2 [when Guard2] -> Expression2;    
	    ...  

	catch   
	    ExceptionType: ExPattern1 [when ExGuard1] -> ExExpression1;  
	    ExceptionType: ExPattern2 [when ExGuard2] -> ExExpression2;    
	    ...   

	after    
	    AfterExpressions    
	end    

<br>  


* FuncOrExpressionSequence 내에서 예외를 발생시키지 않고 완료될 경우
	* 함수의 반환 값은 Pattern1, Pattern2, 등에 대해 매치가 일어날 때까지 비교된다  
	* 만약 매치가 일어나면 매치하는 패턴에 뒤따르는 식을 실행  
	
* FuncOrExpressionSequence 내에서 예외가 발생할 경우  
	*  catch절에 있는 ExPattern1 등과 매치된다
	*  
* ExceptionType은 예외가 어떻게 생성되었는지를 알려주는 atom 이다  
	* atom의 값은 throw, exit, error 중 하나 이다
	* 만약 ExceptionType을 생략하면 throw가 기본값이 된다

  
#예제#

<img src="/assets/themes/Snail/img/Erlang/Exception/exception1-1.png" alt="">  
<br>
<img src="/assets/themes/Snail/img/Erlang/Exception/exception1-2.png" alt="">  
<br>

* 예외를 잡는 다른 방법으로는 catch 기본명령(primitive)이 있다  
<img src="/assets/themes/Snail/img/Erlang/Exception/exception2-1.png" alt="">  
<br>
<img src="/assets/themes/Snail/img/Erlang/Exception/exception2-2.png" alt="">  
<br> 

* 얼랭에서 스택 추적하기  
	*  erlang:get_stacktrace()를 사용  
<img src="/assets/themes/Snail/img/Erlang/Exception/exception3-1.png" alt="">  
<br>
<img src="/assets/themes/Snail/img/Erlang/Exception/exception3-2.png" alt="">  
<br> 