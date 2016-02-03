---
layout: post
category: Erlang
title: Bit Syntax
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

**-바이너리 데이터에 들어 있는 개별 비트 혹은 연속한 비트들을 추출하고 묶는 데 사용하는 패턴 매칭의 확장판**  
**-프로토콜 프로그래밍용으로 개발되어 프로토콜 데이터를 묶고 푸는 데 있어 매우 효율적인 코드를 만들수 있다**  
  
<img src="/assets/themes/Snail/img/Erlang/BitSyntax/BitSyntax-1.png" alt="">  

*  Red의 5비트, Green의 6비트, Blue의 5비트를 받아 Mem을 생성하였다  

<br>

# Bit Syntax의 형태  

	<< >>
	<<E1, E, ...., En>> 
		% 각 요소 Ei는 바이너리에서 하나의 세그먼트를 가리킨다
		% 요소 Ei는 다음 네가지 형태 가운데 하나가 될 수 있다.
   
	Ei = Value 
		 Value:Size
		 Value/TypeSpecifierList
		 Value:Size/TypeSpecifierList  

* 어떤 형태로 사용하건, **바이너리의 전체 비트 수는 8로 나누어 떨어져야 한다**  
	* 바이너리는 각각 8비트를 차지하는 바이트들을 담고 있다  
	* 길이가 8의 배수가 아닌 비트 시퀀스를 표시할 방법이 없다  

* Value는 바운드 변수거나 문자열, 정수, 부동현, 바이너리로 평가되는 식이어야 한다  
* Size는 정수로 평가되는 식이어야 한다. 언바인드 변수일 수 없다  
* TypeSpecifierList는 End-Sign-Type-Unit의 형태를 갖는 항목들을 하이픈으로 구분한 명시자 리스트이다
	* 명시자 리스트에 있는 항목은 다음의 값을 가질 수 있다  
		* End = big │ little │ native (Default : big)  
		* Sign = signed │ unsigned (Default : unsigned)  
		* Type = integer │ float │ binary (Default : integer)  
		* Unit = 1 │ 2 │ ... 255 ( Unit의 Default 값은 Type에 따라 다르며 Type이 정수거나 부동형이면 1, 바이너리이면 8)  

<img src="/assets/themes/Snail/img/Erlang/BitSyntax/BitSyntax-2.png" alt="">  


