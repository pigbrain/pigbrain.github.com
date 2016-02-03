---
layout: post
category: Erlang
title: BIF(Built-In Function), 바이너리(Binary)
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

# BIT(Built-In Function)   
* BIF는 Erlang 언어의 일부라고 볼 수 있다
	* Erlang으로 작성된 것처럼 보이지만, 실제로는 Erlang 가상 머신에서 원시 연산으로 구현한 것이다
		* 리스트를 튜플로 변환하거나 또는 현재 시간과 날짜를 알아내는 것등이 BIF에 해당한다  
<br>
* BIF의 전체 목록은 Erlang 배포판의 메뉴얼 페이지나 http://www.erlang.org/doc/man/erlang.html에서 확인 가능  
<br>
<img src="/assets/themes/Snail/img/Erlang/BIT/bit-1.png" alt="">  
<br>  

* tuple_to_list/1 (BIF)은 튜플을 리스트로 변환한다  
* time/0 (BIF)는 오늘 현재 시간을 시, 분, 초로 반환한다  
<br>  
<br>

# 바이너리(Binary)   
* 원시 데이터를 대량 저장할 경우에는 바이너리(Binary)라는 데이터 구조를 사용하여 저장하는 것이 효율적이다  
* 바이너리는 공간면에서 리스트나 튜플보다 훨씬 효율적인 방식으로 데이터를 저장한다  
* 런타임 시스템은 바이너리를 효율적으로 입출력하도록 최적화 되어있다
<br>  
<img src="/assets/themes/Snail/img/Erlang/BIT/bit-2.png" alt="">  
<br>

* 바이너리는 <<와 >>로 둘러쌓인 일련의 정수 또는 문자열로 작성되고 출력된다
<br>  

# 바이너리를 다루는 BIF  
<img src="/assets/themes/Snail/img/Erlang/BIT/bit-3.png" alt="">  
<br>

* list_to_binary(IoList) : IoList 속에 든 정수와 바이너리로부터 만들어진 바이너리를 반환  
* split_binary(Bin, Pos) : 바이너리 Bin을 Pos 위치에서 두 부분으로 나눈다
* term_to_binary(Term) : Term을 바이너리로 변환
	* 복잡한 데이터  구조를 파일로 저장하거나 복잡한 데이터 구조를 원격 머신으로 보낼 떄 아주 유용하다.
* binary_to_term(Bin) : 위 함수의 역  
* size(Bin) : 바이너리의 바이트 수를 반환