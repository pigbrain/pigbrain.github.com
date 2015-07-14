---
layout: post
category: Erlang
title: 변수, 튜플, 리스트
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#변수#
* 모든 변수명은 대문자로 시작해야 한다
* 다른 언어와 다르게 한번 변수에 값을 할당하면 변경 할 수 없다
* 모든 명령의 마지막은 마침표(.)를 찍어야 한다
<img src="/assets/themes/Snail/img/Erlang/Var_Tuple_List/var.png" alt="">  
	* 이미 값이 할당된 X에 Y의 값을 대입하려 하니 오류가 발생  

#튜플#
* 튜플은 c의 구조체와 유사하다
* 튜플은 선언할 때 자동으로 생성되고 더 이상 사용되지 않을 때 제거된다 
* Erlang은 GC(Garbage Collector)를 사용한다
<img src="/assets/themes/Snail/img/Erlang/Var_Tuple_List/tuple-1.png" alt="">  
	* 만약 정의되지 않은 변수로 데이터 구조를 생성하면 오류가 발생한다
<br>
* 튜플에서 값을 추출하기 위해서는 다음과 같이 한다  
<img src="/assets/themes/Snail/img/Erlang/Var_Tuple_List/tuple-2.png" alt="">  

#리스트#
* 가변적인 무언가를 저장할 때는 리스트를 사용한다
* 리스트의 첫째 요소를 헤드(Head)라고 부르고, 헤드를 제거 했을 때, 남은 부분은 테일(Tail)이라 부른다. 
	* Ex ) 리스트[1,2,3,4,5]
		* Head는 정수 1 
		* Tail은 [2,3,4,5] 이다.
<br>
<img src="/assets/themes/Snail/img/Erlang/Var_Tuple_List/list-1.png" alt="">  
	* 리스트에 새로운 값을 추가하기 위해서는 3행 처럼 한다  
<br>
* *리스트의 값을 출력할 때는 리스트를 문자열로 출력한다
	* 모든 정수가 출력 가능한 문자들을 나타내는 경우에 한하여 적용된다
<img src="/assets/themes/Snail/img/Erlang/Var_Tuple_List/list-2.png" alt="">  

