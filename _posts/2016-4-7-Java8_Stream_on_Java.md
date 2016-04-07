---
layout: post
category: Java
title: Java8 Stream  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# 스트림(Stream) ?
* 간결하게 컬렉션을 처리하는 기능  
	* 데이터를 처리하는 반복문, 임시 코드 대신 질의로 표현 가능  

### Example 
	
	// Java7
	List<Dish> lowCaloricDishes = new ArrayList<>();	
	for (Dish d : menu) {
		// 400 칼로리 미만인 음식만 리스트에 넣는다  
		if (d.getCalories() < 400) {
			lowCaloricDishes.add(d);
		}
	}
	
	//Java8 스트림 이용 
	List<Dish> lowCaloricDishes = menu.stream()
	                                .fileter(d -> d.getCalories() < 400)  
	                                .collect(Collectors.toList());
  
# 스트림의 장점  
* **선언형**으로 코드를 구현 가능  
	* 반복문, if문 등의 제어문을 이용할 필요가 없다  
* filter, sorted, map, collect 같은 다양한 연산을 연결해서 데이터 처리 파이프라인을 만들 수 있다  
	* 여러 파이프라인을 연결해도 가독성과 명확성이 유지된다  
	* 여러 파이프라인을 연결 가능하므로 유연성이 좋아진다  
  
<img src="/assets/themes/Snail/img/Java/Stream/pipeline.png" alt="">  
  
* 병렬화가 가능하여 성능을 향상 시킬 수 있다  
  
# 스트림 vs 컬렉션  
* 데이터를 계산하는 시점에 서로 다르다  
	* 컬렉션은 현재 자료구조가 포함하는 모든 값을 메모리에 저장한다  
		* 컬렉션에서 요소를 추가하거나 삭제할 수 있다  
	* 스트림은 요청이 있을때만 계산을 하는 자료구조 이다  
		* 스트림에서 요소를 추가하거자 삭제할 수 없다  
* 스트림은 단 한번만 탐색 할 수 있다  
	
		List<String> title = Arrays.asList("Java8", "In", "Action");
		
		Stream<String> s = title.stream();
		s.forEach(System.out::println);	// title이ㅡ 각 단어 출력 
		
		s.forEach(System.out::println);	
		// java.lang.IllegalStateException 발생 
		// 첫 forEach에서 스트림이 이미 사용되었다 
		// forEach를 다시한번 실행하기 위해서는 스트림을 새로 생성해야 한다  
  
* 컬렉션은 외부에서 사용자가 명시적으로 데이터를 하나씩 가져와서 처리한다 (External Iteration)  
* 스트림은 내부에서 알아서 처리해주기때문에 사용자가 명시적으로 코드를 작성할 필요가 없다 (Internal Iteration)  
		
		// External Iteration  
		List<String> names = new ArrayList<>();  
		for (Dish d : menu) {  
			naems.add(d.getName());  
		}  
		
		// Internal Iteration  
		List<String> names = menu.stream()
		                       .map(Dish::getName())
		                       .collect(Collectors.toList());
  
# 스트림 연산  

	List<String> names = menu.stream()
	                      // 중간 연산
	                      .filter(d -> d.getCalories() > 300)  
	                      // 중간 연산  
	                      .map(Dish::getName)  
	                      // 중간 연산
	                      .limit(3) 
	                      // 최종 연산(스트림 -> 리스트 변환)  
	                      .collect(Collectors.toList());  
  
* filter, sort와 같은 중간 연산자들은 스트림을 리턴한다  
	* 여러 연산자를 연결해서 질의를 생성 가능 하다  
* 최종 연산에 의해 보통 List, Integer, Void 등 스트림 이외의 결과가 리턴된다  
	
### 중간 연산  
* **filter**  
	* Stream<T\> filter(Predicate<? super T\> predicate);
* **map**  
	* Stream<R\> map(Function<T, R\> mapper);
* **limit**  
	* Stream<T\> limit(long maxSize);
* **sorted**  
	*  Stream<T\> sorted();
* **distinct**  
	* Stream<T\> distinct();
* 등등.. 

### 최종 연산  
* **forEach**  
	* void forEach(Consumer<T\> action);  
* **count**  
	* long count();  
* **collect**  
	* R collect(Collector<T, A, R\> collector);
* 등등..  

<br>  
  

# 참고   
* [Java8 in Action](http://book.naver.com/bookdb/book_detail.nhn?bid=8883567)  
* http://www.oracle.com/technetwork/articles/java/ma14-java-se-8-streams-2177646.html  
