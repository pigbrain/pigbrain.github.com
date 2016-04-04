---
layout: post
category: Java
title: Java8 8가지 특징  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Lambda expressions  
* 람다 표현식은 Anonymous Function라고 할 수 있다  
* 람다를 이용하여 코드를 간결하게 할 수 있다  

### Example  
	
	// Before
	Runnable oldRunner = new Runnable(){
		public void run(){
			System.out.println("I am running");
		}
	};

	// After
	Runnable java8Runner = () -> {
		System.out.println("I am running");
	};

# Method Reference  
* 특정 람다 표현식을 축약한 것으로 볼 수 있다  
* 메서드 정의를 활용하여 람다처럼 사용 가능하다  

### Example  
  
	// Before  
	inventory.sort((Apple a1, Apple a2) -> 
						a1.getWeight().compareTo(a2.getWeight()));

	// After
	inventory.sort(comparing(Apple::getWeight));

	/*
		Lamda                       ->             Method Reference
		(Apple a) -> a.getWeight                   Apple::getWeight
		() -> Thread.currentThread().dumpStack()   Thread.currentThread()::dumpStack
	*/
  
# Stream  
* 간결하게 컬렉션의 데이터를 처리하는 기능  

### Example  
	
	// Before 
	List<Shape> list = new ArrayList<Shape>();
	for (Shape s : shapes) {
		if (s.getColor() == RED) {
			list.add(s);
		}
	}
	
	// After
	shapes.stream().filter(s -> s.getColor() == Red).collect(toList());

# Parallel Stream  
* 위 Stream을 병렬로 처리가능하도록 하는 기능  
* 여러 쓰레드에서 처리할 수 있도록 분할한 Stream 이다  
  
### Example  
	shapes.parallelStream().forEach(s -> doSomething());
  
# Default Method 
* 인터페이스의 구현체를 인터페이스 자체에서 기본으로 제공 가능하다  
*  구현 클래스에서 인터페이스를 구현하지 않아도 된다  
  
### Example  
	
	public interface Sized {
		int size();
	
		default boolean isEmpty() {  // Default Method
			return size() == 0;
		}
	}
  
# Optional  
* 값을 Optional<T\>로 캡슐화하여 NullPointerException을 막는다  
* 값이 존재한다면 Optional 클래스는 값을 감싼다  
* 값이 없다면 Optional.empty메서드로 Optional을 리턴한다  
  
# CompletaleFuture  
* Future의 기능을 확장시켜준다  
	* 두 개의 비동기 계산 결과를 하나로 합친다  
		*  각 계산 결과는 독립적이거나 종속적일 수 있다  
	* Future 집합이 실행하는 모든 태스크의 완료를 기다린다  
	* Future 집합에서 가장 빨리 완료되는 태스크를 기다렸다가 결과를 얻는다  
	* Future가 완료되면 추가 작업을 수행 할 수 있다  
  
# New date / time APIs  
* Joda-Time의 많은 기능을 java.time 패키지로 추가했다  
	* LocalDate, LocalTime, Instant, Duration, Period ... 
  
<br>  
  
# 참고   
* [Java8 in Action](http://book.naver.com/bookdb/book_detail.nhn?bid=8883567)  
* https://www.javacodegeeks.com/2014/03/8-new-features-for-java-8.html  
* http://www.drdobbs.com/jvm/lambdas-and-streams-in-java-8-libraries/240166818  
