---
layout: post
category: Java
title: Java8 Lambda Expressions
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# 람다(Lamda) ?  
* 메서드로 전달할 수 있는 익명 함수를 단순화한 것  

# 람다의 특징  
* 익명(Anonymous)
	* 일반 메서드와 달리 이름이 없다  
* 함수  
	* 일반 메서드처럼 특정 클래스에 종속되지 않으므로 함수라고 부른다  
	* 메서드처럼 파라미터, 리턴 형식, 예외등을 포함한다  
* 전달 가능  
	* 메서드의 인수로 람다를 전달 할 수 있다  
* 간결성  
	* 코드를 간결하게 할 수 있다  
* 람다 표현식은 파라미터, 화살표, 바디로 이루어진다  
	
		(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight);
		  └ 람다 파라미터            └  바디  
  
# Java8에서 지원하는 람다의 형식  

### Example 1
	(String s) -> s.length()  
  
* String 형식의 파라미터 하나를 갖는다  
* int를 리턴한다  
* 람다 표현식에 return이 함축되어 있으므로 return을 생략 가능하다  
  
### Example 2	
	(Apple a) -> a.getWeight() > 150  
  
* Apple 형식의 파라미터 하나를 갖는다  
* boolean을 리턴한다  
  
### Example 3	
	(int x, int y) -> {
		System.out.println("Result : ");
		System.out.println(x + y);
	}  
  
* int 타입의 파라미터 두개를 갖는다  
* 리턴값이 없다(void)  
* 람다 표현식은 여러 행의 문장을 포함 할 수 있다  

### Example 4	
	() -> 42  
  
* 파라미터가 없다  
* int를 리턴한다  

### Example 5	
	(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight())
  
* Apple 형식의 파라미터 두개를 갖는다  
* int를 리턴한다(무게 비교 결과)  
  
# 람다 사용 예 

	Runnable r1 = () -> System.out.println("Hello World 1"); // 람다 사용  

	Runnable r2 = new Runnable() { // 익명 클래스 사용  
		public void run() {
			System.out.println("Hello World 2");
		}
	}  
	
	// -----------------------------------------------------------------
	public static void process(Runnable r) {
		r.run();
	}
	// -----------------------------------------------------------------
	
	process(r1);	// Hello World 1 출력
	process(r2);	// Hello World 2 출력
	process(() -> System.out.println("Hello World 3"));	// Hello World 3 출력
  
  
# 람다는 어디에 사용할 수 있는가 ? 
* 람다는 함수형 인터페이스에 람다를 사용 가능하다  

# 함수형 인터페이스 ?
* 추상 메서드가 한개만 있는 인터페이스  
* 디폴트 메서드(Default Method)의 구현 개수는 상관 없다  
* **@FunctionalInterface** 어노테이션으로 함수형 인터페이스임을 가리킬 수 있다  
	* 어노테이션을 선언했지만 함수형 인터페이스가 아닐 경우 컴파일 오류가 발생한다  

			// 함수형 인터페이스 O
			public interface Adder {
				int add(int a, int b);
			}
			
			
			// 함수형 인터페이스 X
			public interface SmartAdder extends Adder {
				int add(double a, double b);
			}	
			
			// 함수형 인터페이스 X  
			public interface Nothing {
			}
			

# 함수형 인터페이스 종류    

### Predicate<T\>  
	Predicate<String> stringPreidacte = (String s) -> !s.isEmpty();  

* T -> boolean  
* 기본형  
	* IntPredicate  
	* LongPredicate  
	* DoublePredicate  
  
### Consumer<T\>  
	Consumer<Apple> appleConsumer = (Apple a) -> System.out.println(a.getWeight());
  
* T -> void  
* 기본형  
	* IntConsumer  
	* LongConsumer  
	* DoubleConsumer  
  
### Function<T, R\>  
	Function<String, Integer> stringFunction = (String s) -> s.length();
  
* T, R -> R  
* 기본형  
	* IntFunction<R\>  
	* LongFunction<R\>
	* DoubleFunction<R\>  
	* IntToDoubleFunction  
	* IntToLongFunction    
	* LongToDoubleFunction  
	* LongToIntFunction  
	* ToIntFunction<T\>  
	* ToDoubleFunction<T\>  
	* ToLongFunction <T\>
  
### Supplier<T\>  
	() -> new Apple(); 
  
* () -> T
* 기본형  
	* BooleanSupplier  
	* IntSupplier  
	* LongSupplier  
	* DoubleSupplier  
  
### UnaryOperator<T\>  
* T -> T
* 기본형  
	* IntUnaryOperator  
	* LongUnaryOperator  
	* DoubleUnaryOperator  
  
### BinaryOperator<T\>  
* (T, T) -> T  
* 기본형  
	* IntBinaryOperator  
	* LongBinaryOperator  
	* DoubleBinaryOperator   
  
### BiPredicate<L, R\>  
* (L, R) -> boolean  
  
### BiConsumer<T, U\>  
* (T, U) -> void  
* 기본형  
	* ObjIntConsumer<T\>  
	* ObjLongConsumer<T\>  
	* ObjDoubleConsumer<T\>  
  
### BiFunction<T, U, R\>  
* (T, U) -> R  
* 기본형  
	* ToIntBiFunction<T, \U>  
	* ToLongBiFunction<T, \U>  
	* ToDoubleBiFunction<T, \U>  
  
# 참고   
* [Java8 in Action](http://book.naver.com/bookdb/book_detail.nhn?bid=8883567)  
