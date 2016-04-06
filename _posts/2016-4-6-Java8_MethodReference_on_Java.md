---
layout: post
category: Java
title: Java8 Method Reference  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# 메서드 레퍼런스(Method Reference) ?
* 메서드를 참조하는 람다를 편리하게 표현할 수 있는 문법  
* 메서드 정의를 재활용하여 람다처럼 메서드 인자값으로 전달 가능하다  

### Example 
	
	// 람다를 이용한 코드  
	inventory.sort((Apple a1, Apple a2) ->
						a1.getWeight().compareTo(a2.getWeight());
	
	// 메서드 레퍼런스로 변경한 코드  
	inventory.sort(Comparator.comparing(Apple::getWeight));
  
# 메서드 레퍼런스를 만드는 방법  
### static 메서드 레퍼런스  
* Integer의 parseInt메서드는 Integer::parseInt로 표현 가능  
### 인스턴스 메서드 레퍼런스  
* String 변수의 length 메서드는 String::length로 표현 가능  
### 객체 인스턴스 메서드 레퍼런스  
* Transaction 객체의 인스턴스인 t라는 변수가 있고 Transaction 객체에는 getValue메서드가 있다면 t::getValue라고 표현 가능  
  
# 생성자 레퍼런스(Constructor Reference)  
* ClassName::new 처럼 클래스명과 new 키워드를 이용하여 생성자 레퍼런스를 만들 수 있다  
  
### Example  

	// Apple() 생성자 레퍼런스  
	Supplier<Apple> s1 = Apple::new; 
	
	// Supplier의 get 메서드를 호출해서 객체 생성 가능  
	Apple a1 = s1.get(); 
	
	// Apple(Integer weight)의 생성자 레퍼런스  
	Function<Integer, Apple> s2 = Apple::new;
		
	// Function의 apply 메서드를 호출하여 객체 생성 가능  
	Apple a2 = s2.apply(10);  
  
<br>  
  

# 참고   
* [Java8 in Action](http://book.naver.com/bookdb/book_detail.nhn?bid=8883567)  
