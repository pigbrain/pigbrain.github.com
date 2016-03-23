---
layout: post
category: Java
title: Enum과 if 
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Enum 클래스 ?   
* 암묵적으로 java.lang.Enum을 상속 받고 있다  
* enum은 예약어이기 때문에 패키지명으로 사용 할 수 없다  
	* com.pigbrain.enum과 같은 형태로 사용 불가  
* 인터페이스를 구현할 수 있다  
		
		public enum TempEnum implements Closeable{
			...
		}  

* 생성자는 항상 private 이다  
* 




# 참고 
* http://www.journaldev.com/716/java-enum-examples-with-benefits-and-class-usage
* http://stackoverflow.com/questions/9969690/whats-the-advantage-of-a-java-enum-versus-a-class-with-public-static-final-fiel
