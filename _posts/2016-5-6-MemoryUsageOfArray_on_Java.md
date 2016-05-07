---
layout: post
category: Java
title: How to calculate the memory usage of a Java array  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* 자바에서 배열은 특별한 타입에 속한다  
* 다차원 배열은 배열들의 배열일 뿐이다  
	* 2차원 배열에서 행들은 각각의 배열을 갖는다  
  
  
# Memory usage of a single-dimension array  
* 1차원 배열은 하나의 오브젝트이다  
* 배열은 12바이트의 헤더정보를 갖는다  
	* 일반 오브젝트에 비해 배열 길이를 나타내기 위한 4바이트가 더해졌다  
* 실제 배열의 크기는 배열의 타입에 따라 달라진다  
* 총 배열의 크기가 8의 배수가 되지 않는다면 padding이 더해진다  
  
# Memory usage of a two-dimensional array  
* C언어에서 2차원 배열은 포인터가 가르키는 지점만 달라질뿐 1차원 배열과 동일하다  
* 자바에서 고차원 배열은 실제 여러개의 배열로 이루어져있다  
	* 각각의 행은 서로 다른 배열 객체로 구성된다  
* Example : 10행 10열의 int 타입 배열의 크기  
	* 전체 배열에 대한 헤더와 각 행을 가리키는 Reference 포인터의 크기 : 56바이트  
		* 전체 배열에 대한 헤더 : 12바이트
		* 각 행을 가리키는 Reference 포인터 4바이트(in 32비트 환경) * 10 = 40바이트  
		* 52바이트 + 4바이트(padding) = 56바이트  
	* 각 행의 크기 : 56 바이트 
		* 헤더 : 12바이트  
		* int 타입 배열 10칸 : 4바이트 * 10바이트 = 40바이트  
		* 52바이트 + 4바이트(padding) = 56바이트 
	* 56 + (56 * 10) = **616바이트**
  
 
# 원문  
* http://www.javamex.com/tutorials/memory/array_memory_usage.shtml  
  

