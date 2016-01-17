---
layout: post
category: Erlang
title: JUnit @Rule Annotation
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#@Rule#  
* JUnit 4.7 부터 지원  
* 테스트를 실행할때 부가적인 기능을 제공한다  
* TestRule 인터페이스를 구현한 클래스를 @Rule로 지정가능하다  
	* **ErrorCollector** : 하나의 테스트 메소드에서 발생하는 여러 예외를 체크 가능하다    
	* **ExpectedException** : 발생하는 예외에 대해 부가적인 Assertion이 가능하다    
	* **ExternalResource** : 한 예로 서버를 실행/종료 할 수 있다    
	* **TemporaryFolder** : 파일 / 폴더를 생성하고 삭제 한다    
	* **TestName** : 테스트 메소드가 실행되는 동안 메소드 이름이 저장된다    
	* **TestWatcher** : 테스트 메소드 실행 중 특정 이벤트가 발생하면 추가적인 로직이 실행 되도록 한다  
	* **Timeout** : 테스트 메소드 실행 시간의 타임 아웃 설정이 가능하다    
	* **Verifier** : 오브젝트 상태를 체크하여 테스트의 실패여부를 체크 할 수 있다  
<br>  
#Example - Timeout#  
	@Rule
	public Timeout timeOutRule = new Timeout(2);

	@Test
	public void timeOutTest() throws InterruptedException {
		
		// org.junit.runners.model.TestTimedOutException: test timed out after 2 milliseconds
		
		Thread.sleep(3 * 1000);
	}

	@Test
	public void infiniteLoopTest() {
		
		// org.junit.runners.model.TestTimedOutException: test timed out after 2 milliseconds
	
		while (true) {
			
		}
	}  

<br>  
#Example - TestName#
	@Rule
	public TestName testNameRule = new TestName();

	@Test
	public void testMethod1() {
		Assert.assertEquals("testMethod1", testNameRule.getMethodName());
	}

	@Test
	public void testMethod2() {
		Assert.assertEquals("testMethod2", testNameRule.getMethodName());
	} 
  
<br>  
  
#원문#  
* http://junit.org/apidocs/org/junit/rules/TestRule.html  



A TestRule may add additional checks that cause a test that would otherwise fail to pass, or it may perform necessary setup or cleanup for tests, or it may observe test execution to report it elsewhere.