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
  
왜 initialization을 늦추려 하는건가? 아마도 `Resource`를 생성하는 것이 비용이 많이드는 동작이거나  `SomeClass`의 사용자들이 `getResource()`를 호출하지 않기 때문일 것이다. `SomeClass`는 객체가 생성되는 시점에 `Resource`를 생성하지 않는다면 더 빠르게 생성될 것이다. 실제 사용자가 필요할때까지 initializatoin 동작을 미루는 것은 프로그램을 더욱 빠르게 실행시키는데 많은 도움을 준다.  
  
<br>  
  
만약 `SomeClass`를 멀티쓰레드 어플리케이션에서 사용하려한다면 어떻게 될까?  
경쟁 조건(race condition)을 야기시킬 것이다. 두 쓰레드는 동시에 `resource`가 null인지 체크할 수 있고 그 결과 `resource`를 2번 initialization할 것이다. 멀티 쓰레드 환경에서는 `getResource()`에 `synchronized`가 추가되어야 한다.  
  
불행히도 `syncrhonized`가 설정된 메소드는 `synchronized`가 붙지 않은 메소드보다 100배 이상 느려진다. Lazy Initialization을 택하는 이유는 효율성이다. 프로그램이 빠르게 시작될 수 있지만 실행시점에 느려질 수 있다. 이것은 결코 좋은 trade-off가 아니다.  
  
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
  
## Meet the Java Memory Model(JMM)  
DCL는 위에서 언급한 상황에대해 모든 것을 보장해주지 않는다. 왜 그런지 이해하기 위해서는 JVM과 그것이 실행되는 컴퓨터 환경과의 관계를 확인할 필요가 있다.  
  
대부분의 언어들과 달리 자바는 `Write Once, Run Anywhere`라는 철학을 가능하게 하기 위해 모든 자바 플랫폼에서 정형화된 메모리 모델을 통하여 하드웨어와의 관계를 정의한다. C와 C++같은 언어들은 정형화된 메모리모델이 존재하지 않기 때문에 그런 언어들로 만든 프로그램은 실행되는 환경의 하드웨어 플랫폼의 메모리모델에 귀속된다.    
싱글 쓰레드 환경에서 실행되는 경우, 프로그램과 메모리의 상호작용(interaction)은 매우 심플하다. 프로그램은 메모리에 item을 저장하고 그 item들은 항상 그 위치에 있을 것이라고 생각한다.  

컴파일러, JVM 그리고 하드웨어가 복잡한 상황을 가리고 있지만 사실은 완전히 다르다.  
  
프로그램이 순차적으로(프로그램 코드 순서대로..) 실행된다고 생각 할 수도 있지만 항상 그렇지는 않다. 컴파일러, 프로세서 및 캐쉬는 계산의 결과에 영향을 미치지 않는 한 프로그램 및 데이터를 자유롭게 재정렬 한다. 예를 들어 컴파일러는 프로그램과는 다른 순서로 instructions을 만들어 낼 수 있고 메모리대신 레지스터에 변수를 저장 할 수 있다; 프로세서는 명령(instruction)을 병렬 혹은 다른 순서로 실행한다; 그리고 캐쉬는 메인메모리에 commit하는 순서를 변경 할 수 있다. JMM은 이러한 모든 것(instruction의 순서를 바꾸고 최적화하는 것)들을 순차적으로 실행 되었을때와 동일한 결과가 나오는한 허용한다고 한다.   
  
컴파일러, 프로세서 및 캐쉬는 성능 향상을 위해 프로그램의 실행 순서를 변경한다. 최근 몇 년 동안 컴퓨터 성능이 엄청나게 향상되는 것을 보았다. 향상된 프로세서의 클럭 속도가 더 높은 성능에 실질적으로 기여하는 동안 향상된 병렬처리(pipeline, superscalar execution unit, dynamic instruction scheduling, speculative execution, sophisticated multilevel memory cahche) 역시 성능 향상에 기여하였다. 동시에 컴파일러는 이러한 복잡한 것들을 프로그래머로부터 감추기 위해 더욱 더 복잡해 졌다. 
  
싱글 쓰레드 프로그램을 만들때는 instruction, memory 동작들의 순서가 변경되는 것을 걱정할 필요가 없다. 그러나 멀티 쓰레드 프로그램을 만드는 경우라면 상황은 다르다. 어떤 쓰레드가 쓰기 작업을 한 메모리 영역을 다른 쓰레드가 읽을 수 있다. 만약 A라는 쓰레드에서 synchronization 없이 어떤 순서로 변수의 값을 변경 했다면 B라는 쓰레드는 그 변수의 값을 변경된 순서로 값을 관찰하지 못할 수도 있고 전혀 그 문제에 관해서는 보지 못할 수도 있다. 이러한 현상은 여러가지 이유로 발생할 수 있는데 먼저 컴파일러가 instruction의 순서를 변경했거나 일시적으로 변수의 값을 레지스터에 저장하고 나중에 메모리에 쓴 결과일 수 있고, 프로세서가 컴파일러가 지정한 instruction의 순서가 아닌 다른순서로 실행 했거나 병렬로 실행 했을 수도 있다. 또한 instruction들이 메모리의 다른 영역에 위치해있고 캐쉬가 instruction에 상응하는 메모리 영역을  쓰여진 순서와는 다른 순서로 갱신했기 때문일 수도 있다. 어떤 환경에서건 멀티 쓰레드 프로그램은 synchronization을 통하여 명시적으로 쓰레드들이 메모리를 일관되게 볼 수 있도록 하지 않는 한 어떻게 동작할지 알 수 없다.  
  
  
## What does synchronized really mean?  
자바는 쓰레드를 자기 소유의 메모리(로컬 메모리)를 가지고 자기 소유의 프로세서에서 실행되도록 다루고 공유 메모리를 통하여 얘기하고 동기화된다. 이것은 싱글 프로세서에서도 시스템에서도 메모리 캐쉬와 변수를 저장하기위해 프로세서 레지스터를 사용하는 것 때문에 적용된다. 쓰레드가 로컬 메모리에서의 위치를 변경하면 그것은 메인 메모리에 반영된다. JMM은 로컬 메모리와 메인 메모리 사이에서 데이터를 전송해야하는 경우에 대한 규칙을 정의하고있다. 자바 아키텍트는 엄격하게 메모리 모델을 제한하는 것이 프로그램 성능을 저하시킨다는 것을 깨달았다. 그래서 쓰레드가 예측 가능한 방식으로 상호작용 하는 것에 대한 보증을 제공하면서 현대 컴퓨터 하드웨어에서 프로그램이 잘 동작하도록 메모리 모델을 만들기 시도했다.
  
예측가능하도록 쓰레드들 사이에서 상호작용하게 하기 위한 자바의 주요 도구는 `synchronized` 키워드이다. 많은 프로그래머들은 `synchronized`를 하나 이상의 쓰레드가 동시에 임계영역(critical section)을 실행하는 것을 방지하기 위한 상호 배제 세마포어(mutual exclusion semaphore)(mutex)로 생각한다. 불행히도 이것은 `syncrhonized`를 완벽히 설명하지 못한다. 
  
`synchronized`는 세마포어의 상태에 기초하여 실행시점에 상호 배제가 가능하도록 하는 것도 있지만 메인 메모리와 쓰레드들의 상호작용을 동기화하는 것에 대한 역할도 가지고 있다. 특히 락을 얻거나 놓아주는 것은 메모리 barrier(쓰레드의 로컬 메모리와 메인 메모리 사이에서 강제된 동기화)를 야기시킨다. (몇몇 프로세서들은 메모리 barrier를 수행하기 위한 명시적은 instruction을 가지고 있다.) 쓰레드가 `synchronized`블럭을 나올떄 write barrier를 수행한다. write barrier는 락을 놓기 전에 `synchronized`블럭 안에서 수정한 변수들을 메인 메모리에 반영시킨다. 이와 비슷하게 `synchronized`블럭에 진입할때는 read barrier를 수행한다. read barrier는 로컬 메모리가 무효화된 것과 동일한데 `syncrhonized`블럭 안에서 참조하는 변수들의 값을 메인 메모리에서 가져온다.
  
  
동기화의 적절한 사용은 하나의 쓰레드가 예측 가능한 방식으로 다른 쓰레드의 영향을 볼 수 있도록 보장한다. 쓰레드 A와 B가 동일한 오브젝트에 대하여 동기화 했을때 JMM은 쓰레드 B가 쓰레드 A에 의하여 변경된 것들을 볼 수 있도록 보증하고 `synchronized`블럭 내에서 쓰레드 A에 의하여 변경된 것들은 원자적으로(atomically) 쓰레드 B에 나타난다.(블럭 내에서 전체 실행되거나 되지 않거나한 결과) 게다가 JMM은 동일한 오브젝트에서 동기화한 `synchronized` 블럭이 프로그램을 작성한 순서와 동일한 순서로 실행되도록 보장한다.
  
  
## So what's broken about DCL?  
DCL은 `resource`필드를 사용하기 위해 동기화되지 않은채로 접근한다. 그것은 무해해 보일지 모르나 사실은 그렇지 않다. 쓰레드 B가 `getResource()`에 진입하는 동안에 쓰레드 A가 `synchronized`블럭 안에서 `resource = new Resource();`를 실행한다고 생각해보자. 메모리 초기화에 대한 영향을 생각해야한다. 새로운 `Resource` 오브젝트에 대한 메모리는 할당될 것이고 `Resource`에 대한 생성자도 호출될 것이며 멤머변수들의 초기화가 이루어질 것이다. 그리고 `SomeClass`의 `resource`필드에 새로 생성된 오브젝트에 대한 레퍼런스가 할당된다.  
  
그러나 쓰레드 B가 `synchronized`블럭 안에서 실행되지 않았기 때문에 쓰레드 A가 수행됬던 instruction 순서와 다른 순서로 동작들이 수행되는 것 처럼 볼 수 있다.  쓰레드 B는 메모리를 할당하고, `resource`에 레퍼런스를 지정한 후 생성자를 호출하는 식의 순서로 동작하는 것 처럼 볼 수 있다.(컴파일러 역시 이 처럼 instruction 순서를 재정렬 할 수 있다)  만약 쓰레드 B가 메모리가 할당되고 생성자가 호출되지 않은 상태에서 `resource`필드에 레퍼런스가 셋팅된 시점에 들어왔다고 가정해보자. `resource`는 `null`이 아니기 때문에 `synchronized`블럭을 넘어갈 것이고 부분적으로 생성된 `Resource`객체를 리턴하게된다.
  
이러한 예제를 설명할 때 많은 사람들은 처음에 회의적인 반응을 보인다.DCL은 일부 JVM 버전에서 정상 동작할 수 있다. 그러나 세부 구현에 의지하여 프로그램이 정상 동작하는 것을 원하지는 않을 것이다.  
  
다른 동시성 문제는 DCL내부에 숨어있다. 쓰레드 B가 `getResource()`에 진입할 때 쓰레드 A가 `Resource`의 초기화를 완료하고 `synchronized`블럭을 나온다고 가정해보자. `Resource`는 초기화가 완료되었고 쓰레드 A는 로컬 메모리의 정보를 메인 메모리에 반영하려한다. `resource`필드는 메인 메모리에 반영되기 전에 어딘가 로컬 메모리에 저장되어 있는 오브젝트를 참조하고 있을 것이다. 쓰레드 B가 새로 생성된 객체에대해 유효한 참조를 가질지 모르지만 read barrier를 실행하지 않았기 때문에 `resource`의 멤버 필드들들은 유효하지 않은 상태일 수 있다.
  
<img src="/assets/themes/Snail/img/Java/DCL/broken.png" alt="">  
  
<br>  
  
## Volatile doesn't mean what you think, either  

### (과거 얘기인 듯...)  
  
A commonly suggested nonfix is to declare the resource field of SomeClass as volatile. However, while the JMM prevents writes to volatile variables from being reordered with respect to one another and ensures that they are flushed to main memory immediately, it still permits reads and writes of volatile variables to be reordered with respect to nonvolatile reads and writes. That means -- unless all Resource fields are volatile as well -- thread B can still perceive the constructor's effect as happening after resource is set to reference the newly created Resource.  
  
## Alternatives to DCL  
DCL 문제를 해결하기 위한 가장 좋은 방법은 그것을 사용하지 않는 것이다. 가장 간단히 문제를 해결하는 방법은 동기화를 통하여 사용하는 것이다. 한 쓰레드에서 쓰여지는 변수를 다른 쓰레드가 읽을때마다 항상 변경 된 값을 참조할 수 있도록 동기화를 해줘야한다.  
  
DCL 문제를 피하는 다른 방법은 Lazy Initialization을 하지 않고 Eager Initialization을 하는 것이다. `resource`가 사용될때까지 초기화를 늦추는 대신 객체가 생성되는 시점에 초기화를 하는 것이다.  
클래스 로더는 클래스의 `Class`오브젝트를 동기화하여 클래스 초기화 시점에 static initalizeration 블럭을 실행한다.  
즉 static initializer는 자동적으로 클래스 로딩 시점에 동기화되어 실행된다는 것을 의미한다.  
  
static singleton은 동기화 없이 실행되는 Lazy Initialization의 특별한 경우이다. 초기화되는 오브젝트가 다른 메소드나 필드에서 사용되지 않는 클래스의 static 필드일때 JVM은 자동적으로 Lazy Initialization을 수행한다.
아래 예에서 `resource`필드가 다른 클래스에 의하여 처음 참조될때까지 `Resource`객체를 생성하지 않을 것이다. 그리고 `resource` 초기화 과정에서 메모리에 씌여진 정보들은 모든 쓰레드에 동기화 되어 보이게된다.
  
{% highlight java %}  
class MySingleton {
	public static Resource resource = new Resource();
}
{% endhighlight %}  
  
JVM이 이 클래스를 초기화 할때 `MySingleton`은 어떤 필드나 메소드를 가지고 있지 않기 때문에 처음 `resource`가 참조될때 클래스 초기화를 진행한다.
  

# 원문  
* http://www.javaworld.com/article/2074979/java-concurrency/double-checked-locking--clever--but-broken.html  
