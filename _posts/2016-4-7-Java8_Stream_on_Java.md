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

<br>  
  

# 참고   
* [Java8 in Action](http://book.naver.com/bookdb/book_detail.nhn?bid=8883567)  
