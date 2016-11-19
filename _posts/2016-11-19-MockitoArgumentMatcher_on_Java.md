---
layout: post
category: Java
title: Mockito and Argument mathcers
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Argument matchers  
  
* Mockito는 기본적으로 Object의 `equals()`메서드를 이용하여 argument 값을 확인한다  
* argument mathcher를 이용하면 custom하게 argument 값을 확인할 수도 있다  
	* 어떤 메서드의 argument가 특정 값일 때만 평가되도록 하기 위해서는 argument matcher를 사용해야한다  
	* anyXXX()와 같은 함수로 argument를 비교하게되면 argument에 어떠한 값이 들어오더라도 전부다 실행된다  
  
  
{% highlight java %}  
// 아무런 int값이 가능하다면 anyInt를 사용하면 된다
when(mockedList.get(anyInt())).thenReturn("element");
  
// custom한 argument matcher는 아래와 같이 호출한다  
when(mockedList.contains(argThat([ArgumentMatcher<T>]))).thenReturn("element");
  
// 자바8의 람다를 이용하면 다음 처럼 argument matcher를 작성 할 수 있다  
verify(mockedList).add(argThat(someString -> someString.length() > 5));

{% endhighlight %}  
  
# Interface ArgumentMatcher<T>  
  
* `ArgumentMatcher` 인터페이스의 `matches` 메소드를 통하여 argument를 비교한다  

  
{% highlight java %}  
class ListOfTwoElements implements ArgumentMatcher<List> {
	public boolean matches(List list) {
		return list.size() == 2;
	}
	public String toString() {
		return "[list of 2 elements]";
	}
}  
  
List mock = mock(List.class);  
  
// addAll 메서드의 argument(List)의 size()가 2인 경우에만 실행된다  
when(mock.addAll(argThat(new ListOfTwoElements))).thenReturn(true);  
  
mock.addAll(Arrays.asList("one", "two"));  
  
verify(mock).addAll(argThat(new ListOfTwoElements()));  

{% endhighlight %}  
  
# 참고   
* http://static.javadoc.io/org.mockito/mockito-core/2.2.21/org/mockito/Mockito.html  
* http://static.javadoc.io/org.mockito/mockito-core/2.2.21/org/mockito/ArgumentMatcher.html  