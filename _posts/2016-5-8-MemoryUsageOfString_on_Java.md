---
layout: post
category: Java
title: Memory usage of Java Strings and string-related objects  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* 자바의 오브젝트들은 최소한 8바이트의 헤더 정보를 갖는다  
	* 배열은 12바이트의 헤더 정보를 갖는다  
	* 32비트 환경에서 8바이트 기준으로 패딩된다  
* 자바의 **String** 은 하나 이상의 오브젝트들로 구성된다  
* 자바의 char는 2바이트다  
	* 자바는 유니코드를 사용한다  

  
  
# How to calculate String memory usage  
  
### Understanding String memory usage
* String은 다음과 같이 구성된다  
	* char 배열  
		* 실제 데이터들을 담는다  
	* int - offset  
		* 사용되는 데이터의 첫번째 인덱스를 가르킨다  
	* int - length  
		* 문자열의 길이  
	* int - cached hash code  
		* hash code값을 저장해 놓는다  
* String에 아무런 문자가 저장되지 않더라도 40바이트를 소비한다  
	* 오브젝트 헤더 : 8바이트  
	* char 배열의 reference : 4바이트  
	* 3개의 int 필드 : 3 * 4바이트 => 12바이트  
	* char 배열의 헤더 : 12바이트 + 패딩(4바이트) => 16바이트  
	* 8바이트 + 4바이트 + 12바이트 + 16바이트 = 40바이트  
* String에 17개의 문자들이 저장되어 있을 경우 72바이트를 소비한다  
	* 오브젝트 헤더 : 8바이트  
	* char 배열의 reference : 4바이트  
	* 3개의 int 필드 : 3 * 4바이트 => 12바이트  
	* char 배열의 헤더 : 12바이트 + 패딩(4바이트) => 16바이트  
	* char 배열의 데이터 : 17 * 2바이트 = 34바이트  
	* 8바이트 + 4바이트 + 12바이트 + 16바이트 + 34바이트 = 72바이트  
  
### Memory usage of substrings  
* String 오브젝트가 offset을 저장하는 int와 length를 왜 저장하는 것일까 ?  
* char 배열이 String 오브젝트의 전체 데이터이지 않는가 ?  
* 이미 존재하는 String 오브젝트에에서 substring을 통하여 새로운 String 오브젝트를 만들경우 내부 char 배열은 공유한다  
	* String 오브젝트를 유지하는 상태에서 substring으로 새로운 오브젝트를 만들 경우 메모리가 절약된다  
	* String 오브젝트를 유지하지 않는 상태에서 substring으로 새로운 오브젝트를 만들 경우 메모리가 낭비된다  
##### Example-1  
  
	String str = "Some longish string...";
	str = str.substring(5, 4);
  
* 대부분의 사람들은 substring 호출 후의 str에는 4개의 char가 저장될 것이라 생각하지만 실제는 "Some longish string..."이 전체 복사된다  
* 메모리 낭비가 문제가 된다면 Example-2의 방법을 따른다  
  
##### Example-2  
  
	String str = "Some longish string...";
	str = new String(str.substring(5, 4));
	


 
# 원문  
* http://www.javamex.com/tutorials/memory/string_memory_usage.shtml  
  

