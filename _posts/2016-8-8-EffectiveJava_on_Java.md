---
layout: post
category: Java
title: Effective Java  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

# 객체의 생성과 삭제  
  
### 규칙1 생성자 대신 정적 팩터리 메서드를 사용할 수 없는지 생각해 보라  
	public static Boolean valueOf(boolean b) {
		return b ? Boolean.TRUE : Boolean:FALSE;
	}

* 클래스에 public으로 선언된 정적 팩터리 메서드를 추가하여 객체를 생성하는데는 다음과 같은 장점이 있다  
	* 생성자와는 달리 정적 팩터리 메서드에는 이름이 있다  
	* 생성자와는 달리 호출할 대마다 새로운 객체를 생성할 필요는 없다  
	* 생성자와는 달리 리턴 자료형의 하위 자료형 객체를 반환할 수 있다  
	* 형인자 자료형(parameterized type)객체를 만들때 편리하다   
		* 정적 팩터리 메서드를 사용하면 컴파일러가 형인자를 스스로 알아내도록 할 수 있다  
  
	<img src="/assets/themes/Snail/img/Java/EffectiveJava/rule1_1.png" alt="">  
  
* 정적팩터리 메서드만 있는 클래스를 만들게 되면 다음과 같인 문제가 발생한다  
	* public이나 protected로 선언된 생성자가 없으므로 하위 클래스를 만들 수 없다  
	* 정적 팩터리 메서드가 다른 정적 메서드와 확연히 구분되지 않는다  
		* API문서를 보면 생성자는 다른 메서드와 뚜렷이 구별되지만 정적 팩터리 메서드는 그렇지 않다  
		* Example
			* valueOf : 인자로 주어진 값과 같은 값을 갖는 객체를 반환한다  
			* of : valueOf를 간단하게 쓴 것  
			* getInstance : 인자에 기술된 객체를 리턴하지만 인자와 같은 값을 갖지 않을 수도 있다  
			* newInstance: getInstance와 동일하지만 호출할 때마다 다른 객체를 반환한다  
			* getType : getInstance와 같지만 반환될 객체의 클래스와 다른 클래스에 팩터리 메서드가 있을때 사용한다. Type은 팩터리 메서드가 반환할 객체의 자료형이다  
			* newType : newInstance와 같지만 반활된 객체의 클래스와 다른 클래스에 팩터리 메서드가 있을 때 사용한다. Type은 팩터리 메서드가 반환할 객체의 자료형이다  
  

### 규칙2 생성자 인자가 많을 대는 Builder 패턴 적용을 고려하라  
  
### 규칙3 private 생성자나 enum 자료형은 싱글턴 패턴을 따르도록 설계하라  
### 규칙4 객체 생성을 막을 때는 private 생성자를 사용하라  
### 규칙5 불필요한 객체는 만들지 말라  
### 규칙6 유효기간이 지난 객체 참조는 페기하라  
### 규칙7 종료자 사용을 피하라  
  
<br>  
  
# 모든 객체의 공통 메서드  
### 규칙8 equals를 재정의할 때는 일반 규약을 따르라  
### 규칙9 equals를 재정의할 때는 반드시 hashCode도 재정의하라  
### 규칙10 toString은 항상 재정의하라  
### 규칙11 clone을 재정의할 때는 신중하라  
### 규칙12 Comparable 구현을 고려하라  


# 책  
* http://book.naver.com/bookdb/book_detail.nhn?bid=8064518  
