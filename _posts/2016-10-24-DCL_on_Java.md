---
layout: post
category: Java
title: Double checked locking Clever, but broken  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->
  
### Do you know what synchronized really means?
  
# Double-checked locking can be hazardous to your code!  
  
## What is DCL(Double-Checked Locking)?  
DCL은 Lazy Initialization을 구현하기 위해 사용된다.  
Lazy Initialization은 실제 객체가 필요해질때까지 initialization을 미루는 것을 의미한다.  
  
{% highlight java %}  
class SomeClass {
	private Resource resource = null;

	public Resource getResource() {
		if (resource == null)
			resource = new Resource();

		return resource;
	}
}
{% endhighlight %}  
  
왜 initialization을 늦추려 하는건가? 아마도 `Resource`를 생성하는 것이 비용이 많이드는 동작일 것이고  `SomeClass`의 사용자들이 `getResource()`를 호출하지 않기 때문일 것이다. `SomeClass`는 객체가 생성되는 시점에 `Resource`를 생성하지 않는다면 더 빠르게 생성될 것이다. 실제 사용자가 필요할때까지 initializatoin 동작을 미루는 것은 프로그램을 더욱 빠르게 실행시키는데 많은 도움을 준다.  
  
<br>  
  
만약 `SomeClass`를 멀티쓰레드 어플리케이션에서 사용하려한다면 어떻게 될까?  
경쟁 조건(race condition)을 야기시킬 것이다. 두 쓰레드는 동시에 `resource`가 null인지 체크할 수 있고 그 결과 `resource`를 2번 initialization할 것이다. 멀티 쓰레드 환경에서는 `getResource()`에 `synchronized`가 추가되어야 한다.  
  
불행히도 `syncrhonized`가 설정된 메소드는 `synchronized`가 붙지 않은 메소드보다 100배 이상 느려진다.Lazy Initialization을 택하는 이유는 효율성이다. 프로그램이 빠르게 시작될 수 있지만 실행시점에 느려질 수 있다. 이것은 결코 좋은 trade-off가 아니다.  
  
<br>  
  
DCL은 위에서 언급한 문제점들에 대하여 나름 괜찮은 해결책을 제시한다.  
  
{% highlight java %}  
class SomeClass {
	private Resource resource = null;

	public Resource getResource() {
		if (resource == null) {
			synchronized {
				if (resource == null) 
					resource = new Resource();
			}
		}

		return resource;
	}
}
{% endhighlight %}  
  
`getResource()`를 한번 호출한 후에는 `resource`가 initialize되었기 때문에 synchronize가 실행되지 않을 것이다. 또한 DCL은 synchronize 블럭에서 `resource`를 2번 체크하므로 경쟁 조건(race condition)을 피할 수 있다. 즉 멀티 쓰레드 환경에서 오직 한 쓰레드만이 `resource`를 initializtion하는 것을 보장해준다. DCL은 똑똑한 방법같지만 **잘 동작하지 않는다.**  
  
## Meet the Java Memory Model  
DCL는 위에서 언급한 상황에대해 모든 것을 보장해주지 않는다. 왜 그런지 이해하기 위해서는 JVM과 그것이 실행되는 컴퓨터 환경과의 관계를 확인할 필요가 있다.  
  
대부분의 언어들과 달리 자바는 `Write Once, Run Anywhere`라는 철학을 가능하게 하기 위해 모든 자바 플랫폼에서 정형화된 메모리 모델을 통하여 하드웨어와의 관계를 정의한다. C와 C++같은 언어들은 정형화된 메모리모델이 존재하지 않기 때문에 그런 언어들로 만든 프로그램은 실행되는 환경의 하드웨어 플랫폼의 메모리모델에 귀속된다.    
싱글 쓰레드 환경에서 실행되는 경우, 프로그램과 메모리의 상호작용(interaction)은 매우 심플하다. 프로그램은 메모리에 item을 저장하고 그 item들은 항상 그 위치에 있을 것이라고 생각한다.  

컴파일러, JVM 그리고 하드웨어가 복잡한 상황을 가리고 있지만 사실은 조금 다르다.  
프로그램이 순차적으로(프로그램 코드 순서대로..) 실행된다고 생각 할 수도 있지만 항상 그렇지는 않다.
  
  
<br>  
  
# 원문  
* http://www.javaworld.com/article/2074979/java-concurrency/double-checked-locking--clever--but-broken.html  
