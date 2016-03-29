---
layout: post
category: Java
title: Mockito and Dependency Injection
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# The Mockito way  
	
	@RunWith(MockitoJUnitRunner.class)
	public class ExampleTest {
	
		@Mock
		Delegate delegateMock;
		
		@InjectMocks
		Example example;
		
		/*
		@Before
		public void initMocks(){
			MockitoAnnotations.initMocks(this);
		}
		*/

		@Test
		public void testDoIt() {
			example.doIt();
	
			verify(delegateMock).execute();
		}
	}

* 자바 유닛 테스트를 작성할때 클래스의 Dependency들을 Inject할 수 있는 방법이 필요하다  
* Mockitosms **@InjectMocks**를 이용하여 이런 기능을 지원한다  
  
<br>  
  
* applicatoin context 파일 또는 new Example(), mock(..)과 같은 코드를 사용하지 않고 Example 클래스를 생성하였고 테스트도 통과한다  
* Example 클래스 생성 과정 
	* **MockitoJUnitRunner**가 실행되면 Mockito는 @Mock, @Spy으로 선언된 객체들을 생성한다  
	* @InjectMocks으로 선언된 객체를 생성하고 Mockito는 @Mock, @Spy로 선언되어 생성된 객체들을 주입한다  
* **@RunWith(MockitoJUnitRunner.class)**을 사용하지 않고 @Before 메소드에  **MockitoAnnotations.initMocks(this)** 를 사용해도 동일하다  
  
<br>  
  
# Limitations 
* Dependency Injection은 다음과 같은 순서로 실행된다  
	1. 생성자를 통한 Injection
	2. setter 메소드를 통한 Injection
	3. 필드(멤버변수) Injection
* 하나의 Dependency Injection 방법을 찾게 되면 모든 테스트 케이스에 대해 동일한 방법이 적용된다  
	* 모든 필드를 Inject할 수 있는 생성자를 찾으면 setter 메소드를 통한 Inject, 필드 Inject는 실행되지 않는다  
* Mockito는 Inject 과정에서 오류가 발생하거나 실패해도 사용자에게 알려주지 않는다  
* 가장 큰 생성자(Denpency를 포함한 Argument들을 모두 받는 생성자)를 발견할 경우 남은 필드에는 null을 채워서 실행한다  
* Inject되어야 하는 필드를 final, static으로 선언해선 안된다  

# Dependency
* Mockito 1.9.0 이상
* 1.9.0 하위 버전을 사용할 경우 @InjectMocks으로 지정한 객체는 초기에 null로 지정할 수 없다  
	
		@InjectMocks
		Example example = new Example();
  
  
  
# 참고   
* http://www.jayway.com/2012/02/25/mockito-and-dependency-injection/  
* https://lkrnac.net/blog/2014/01/mock-autowired-fields/  