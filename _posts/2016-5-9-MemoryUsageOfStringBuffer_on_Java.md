---
layout: post
category: Java
title: Memory usage of Java StringBuilder and StringBuffer  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* 자바에는 String 외에도 문자들을 저장 할 수 있는 방법이 있다  
* **StringBuffer**와 **StringBuilder** 클래스를 이용 할 수 있다  
	* char 배열과 현재 문자열 길이를 저장하기 위한 int형 변수가 포함되어 있다  
	* String 오브젝트처럼 offset이나 hash code를 저장하기 위한 int 변수는 없다  
	* StringBuffer와 StringBuilder는 실제 저장하고자하는 문자열보다 배열을 크게 생성 할 수도 있다  
* 실제 문자열보다 크게 버퍼를 생성하는 것이 문제가 되지 않는다면 **CharSequence**를 이용하여 String, StringBuffer, StringBuilder보다 메모리가 적게 사용되도로고 만들 수 있다  
  
  
# Memory usage of StringBuilder and StringBuffer
* StringBuilder와 StringBuffer는 동일한 방법으로 구현되었다  
* 두 클래스의 차이점은 StringBuffer는 synchronized 된다는 것이다  
* StringBuilder와 StringBuffer의 메모리 사용량 ?  
	* 오브젝트 헤더 : 8바이트  
	* 문자열 길이를 저장하기 위한 int 형 변수 : 4바이트  
	* char 배열 reference : 4바이트  
	* char 배열 : 12바이트
	* 8바이트 + 4바이트 + 4바이트 + 12바이트 + 패딩(4바이트)  = 32바이트  
	* 아무 문자를 저장하지 않아도 초기에 배열을 16칸 할당한다 = (16 * 2) 바이트
		* 28바이트 + 패딩(4바이트) + 32바이트 = 64바이트  
* append() 메소드는 배열의 크기를 동적으로 2배씩 늘린다. 만약 2배로 늘린 크기보다 추가된 전체 문자열의 길이가 더 클 경우 이 길이로 배열을 증가시킨다  
	* 초기 값 없이 StringBuffer 혹은 StringBuilder 오브젝트를 생성후 17개의 문자를 저장하게되면 (32 * 2)바이트가 할당된다  
		* 총 메모리 사용량 : 28바이트 + 패딩(4바이트) + 64바이트 = 96바이트  

 
# 원문  
* http://www.javamex.com/tutorials/memory/string_buffer_memory_usage.shtml  
  

