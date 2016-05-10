---
layout: post
category: Java
title: How to save memory occupied by Java strings StringBuffer  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* 프로그램내에서 String 오브젝트 사용에 대한 최적화가 필요하다면 String 대신 CharSequence를 사용하는 것을 고려해 볼 수 있다  
* 다음과 같은 상황에서는 String을 사용할 필요가 없다  
	* 단순히 문자열을 메모리에 저장해 놓을때,,   
	* 문자열을 화면 혹은 스트림을 통하여 출력하고자 할때,, 
	* 문자열의 각각의 문자들에 대해 접근하거나 substring 처리를 할때,,  
	* 정규표현식과 같은 작업을 통하여 문자열 매칭등을 할때,,  
* 상황에 따라서는 CharSequence를 활용하여 String 대신 문자열을 처리하게되면 메모리를 절약할 수 있다  
  
# If you don't need a String  
* 굳이 String 오브젝트에 문자열을 저장할 필요가 없다면 다른 방법으로 문자열을 관리하며 메모리를 절약 할 수 있다  
	* StringBuilder와 StringBuffer의 메소드 중 trimToSize()를 이용하면 버퍼의 크기를 문자열 길이에 맞출수 있으며 이 경우 String 오브젝트보다 8바이트를 절약 할 수 있다  
	* ASCII 혹은 ISO-8859-1 문자만 사용할 경우 한 문자당 1바이트만 필요하다. 이 경우에는 char배열 대신 byte배열을 사용하는 것이 효율 적이다  
  
# If you really need instances of String  
* substring을 통하여 새로운 문자열을 생성할때 원본 객체를 제거하게 되면 메모리를 낭비하게 된다  
* 동일한 문자열에 대해서 String 오브젝트르 여러개 생성해야 한다면 enum으로 관리하거나 canonicalising을 고려해야한다  
 
# String Canonicalisation  
* Canonicalisation은 주어진 컨텐츠를 가지고 있는 실 객체는 오직 하나인 것을 보장하는 기술이다  
	* 동일한 컨텐츠에 대해 매번 객체를 새로 생성하지 않고 컨텐츠를 가지고 있는 객체는 한개 뿐이며 reference만 생성하여 실 객체를 참조하도록 한다  
  
### Canonicalisation with String.intern()  
* JVM내에는 string pool이 존재한다  
	* string pool은 클래스내에 하드코딩된 문자열이나 클래스 혹은 메소드 이름을 관리하는 용도로 쓰여진다  
	* String의 intern()메소드를 통하여 JVM에게 동일한 문자열을 가지고 있는지 물어볼 수 있다  
			
			ResultSet rs = retrieveEmployeesFromDatabase();
			while (rs.next()) {
				int employeeId = rs.getInt(1);
				String employeeStatus = rs.getString(2);
				employeeStatus = employeeStatus.intern();
				... construct entity ...
			}  
* intern()을 이용하면 String을 equal이 아닌 ==로 비교 가능하게되어 비교 연산시 성능 향상을 꾀할 수 있다  
	* 그러나 intern() 메소드를 호출하였을때 내부에서 string pool에 등록되어있는 모든 문자열들과 일치여부를 검사하기 때문에 문자열을 찾아오는 과정이 오래걸릴 수 있다  
* intern()을 호출헀을 때 찾으려는 문자열이 존재하지 않는다면 string pool에 해당 문자열을 새로 등록한다  
* 최초 intern()이 호출되어 string pool에 등록된 문자열은 반대로 삭제하는 기능이 없다(de-intern이 불가능)  
	* 메모리 릭으로 연결될 수 있다  
* 다른 문자열들을 계속해서 intern() 한다면 OutOfMemoryError가 발생하게된다 

# 원문  
* http://www.javamex.com/tutorials/memory/string_saving_memory.shtml  
