---
layout: post
category: Erlang
title: 블록 식(Block Expressions), epp
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#블록 식(Block Expressions)#  
* 연속된 식을 묶을 때 사용   
* begin...end 블록의 리턴 값은 블록에서 마지막 식(ExprN)의 값이다  
			
			begin
				Expr1,
				Expr2,
				..... ,
				ExprN
			end  
<br>

#epp#  
* 얼랭 모듈은 컴파일되기 전에 자동으로 전처리기인 epp에 의해 처리된다  

* 전처리기의 역할  
	* 소스 파일에 들어 있을 수도 있는 모든 매크로를 확장  
	* 필요한 모든 include 파일을 삽입  
<br>
* 디버깅 등의 목적으로 전처리기의 처리 결과를 저장하고 싶을 경우  
	* complie:file(M, ['P']) 명령은 전처리기의 처리 결과를 파일로 저장하도록 한다  
		* M.erl 파일에 있는 코드를 모두 컴파일하고 M.P 파일에 결과를 생성한다  
		* 이 파일에는 모든 매크로가 확장되고 필요한 include 파일이 모두 포함된다  
 