---
layout: post
category: Java
title: Memory usage of Java objects  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* 일반적으로 오브젝트들은 힙 메모리에 관리된다   
* JVM은 작은Thread-Local 오브젝트들은 힙이 아닌 스택 혹은 레지스터에 관리한다  
  
  
# General formula for calculating memory usage  
* 오브젝트 정보(housekeeping)가 관리되는 헤더는 소수의 바이트로 구성된다  
* primitive 타입의 필드들은 아래에 명시된 크기로 할당된다  
* reference 타입의 필드들은 다음과 같이 할당된다  
	* 4바이트 in 32bit  
	* 8바이트 in 64bit  
* padding  
	* 오브젝트의 데이터들 뒤에 붙는 사용되지 않는 바이트들이다  
	* 오브젝트의 메모리주소를 특정 바이트의 배수로 시작하게하고 오브젝트의 포인터들을 표현하기 위해 필요한 부가적인 비트들을 필요 없도록 해준다  
  
### Sizes of primitive types  
* 1 바이트  
	* boolean  
	* byte  
* 2 바이트  
	* char  
	* short  
* 4 바이트  
	* int  
	* float  
* 8 바이트  
	* long  
	* double  
  
# Object overhead for "housekeeping" information  
* 오브젝트들은 실제 자신이 가진 필드들만큼의 메모리 공간을 갖지 않는다  
* 필드들이 차지하는 메모리외에 오브젝트의 클래스 정보, ID, 오브젝트에 접근 할 수 있는지에 대한 플래그 등등을 보관하는 정보를 추가적으로 필요로 한다  
	* 일반적인 오브젝트들은 8bytes의 헤더 공간(housekeeping)을 갖는다  
	* 배열은 12bytes의 헤더 공간(housekeeping)을 갖는다  
		* 일반 오브젝트에 비해 배열의 길이를 표현하기 위한 4bytes의 추가 공간을 갖는 것이다 
  
# Object size granularity  
* 모든 오브젝트는 8바이트 단위로 할당된다  
* 오브젝트의 헤더와 필드들의 메모리 공간이 8의 배수가 되지 않는다면 padding을 더하여 8의 배수로 맞춘다  
* Example  
	* 아무런 필드가 없는 오브젝트는 8바이트다  
	* 하나의 boolean 변수를 갖는 오브젝트는 16바이트다  
		* 헤더(8바이트) + boolean(1바이트) + padding(7바이트)  
	* 8개의 boolean 변수를 갖는 오브젝트는 16바이트다  
		* 헤더(8바이트) + boolean*8(8바이트)  
	* 2개의 long 변수, 3개의 int 변수, 1개의 boolean 변수를 갖는 오브젝트는 40바이트다  
		* 헤더(8바이트) + long*2(16바이트) + int*3(12바이트) + boolean(1바이트) + padding(3바이트)  
  

# 원문  
* http://www.javamex.com/tutorials/memory/object_memory_usage.shtml
  

