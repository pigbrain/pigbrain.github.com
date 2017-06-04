---
layout: post
category: Go
title: The Go Memory Model  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->
  
# Introduction
Go의 메모리 모델은 서로 다른 고루틴(goroutine)에서 동일하 변수에 대해 쓰거나 읽을 경우, 쓰기가 먼저 선행된 후에 읽을 수 있도록 보장하는 조건들을 지정하고 있다  
  
# Advice 
여러 고루틴에 의하여  어느 한 데이터를 동시에 수정해야 하는 프로그램은 반드시 데이터에 대한 접근을 동기화해야 한다   
접근을 동기화하기 위해서 **channel** 혹은 **sync**, **sync/atomic**패키지에 있는 동기화 도구들을 이용하여 데이터를 보호해야 한다  


# Happens Before
하나의 고루틴에서는 읽기/쓰기 동작은 프로그램에서 지정한 순서대로 동작해야한다 .  
즉, 컴파일러와 프로세서는 재정렬이 언어에서 정의된 대로 해당 고루틴 내의 동작을 변경하지 않는 경우에만 고루틴 내에서 실행되는 읽기 및 쓰기의 순서를 변경할 수 있다 .
이러한 재정렬 때문에, 어느 한 고루틴에서의 실행 순서는 다른 고루틴에서의 실행 순서와 다를 수 있다.  예를 들어, 어느 한 고루틴에서 a = 1; b = 2; 를 실행했더라도 다른 고루틴에서는 a에 값이 업데이트 되기 전에 b의 값이 먼저 업데이트 된 것처럼 보일 수 있다  

읽기와 쓰기의 요구 사항을 명시하기 위해 `happens before`라는 것을 정의해야 한다. `happens before`는 Go 프로그램에서 실행하는 메모리 동작들의 부분적인 순서라고 볼 수 있다. 

만약 이벤트 e1이 이벤트 e2 이전에 발생했다면, e2는 e1 뒤에 발생했다고 말할 수 있다. 또한 e1이 e2전에 발생하지 않고 e2 이후에 발생하지 않았다면 e1과 e2는 동시에 발생했다고 할 수 있다.

하나의 고루틴에서는 `happens before` 순서가 프로그램에서 작성한 순서와 동일하다.  

만약 다음 두 조건을 만족한다면 변수 v 에 대한 읽기(r)연산이 v에 대한 쓰기(w)연산의 결과를 볼 수 있다.  
1 r은 w이전에 발생하지 않았다.  
2. w 외에 다른 w'연산은 w이후가 r이전에 존재하지 않는다.  

변수 v에 대한 읽기(r)연산이 v에 대한 특별한 쓰기(w)연산의 결과를 볼 수 있도록 보장하기 위해서는 r이 확인 할 수 있는 유일한 쓰기연산이 w인지  확인해야 한다.  
만약 다음 두 조건을 만족한다면 r은 w의 결과를 확인하는 것을 보장 받을 수 있다   
1. w는 r 이전에 발생한다.  
2. 공유 변수 v에 대한 다른 쓰기 연산들은 w 이전 혹은 r 이후에 발생한다    (w나 r이 발생하는 동시에 다른 쓰기연산은 발생하지 않는다)  

하나의 고루틴에는 동시성이 존재 하지 않는다. 그래서 v변수에 대한 읽기(r)연산은 가장 최근에 발생한 쓰기(w)연산의 값을 보게 된다  

여러 개의 고루틴이 공유 변수(v)에 접근할 때는 읽기 연산에서 기대하는 값을 읽을 수 있도록 반드시 `happens-before`조건을 보장할 수 있는 동기화를 해야한다  


# Synchronization  

## Initialization 
프로그램 초기화는 하나의 고루틴에서 실행 되지만 고루틴은 다른 고루틴으로 생성될 수 있고 다른 고루틴과 동시에 생성될 수도 있다  

만약 패키지 p가 다른 패키지 q를 import하고 있다면 q의 초기화 함수는 p와 관련된 어떤 작업들이 행해지기 전에 초기화된다. 

main.main 함수는 모든 초기화 함수들이 호출된 이후에 호출된다  

## Goroutine creation  
`go` 키워드는 고루틴이 포함하는 코드들을 실행하기 전에 새로운 고루틴을 시작한다  

```
var a string

func f() {
	print(a)
}

func hello() {
	a = "hello, world"
	go f()
}
```

hello함수를 호출하면 어느 시점에 "hello, world"가 출력될 것이다.
(아마 hello함수가 리턴된 이후에 출력될 것이다)


## Goroutine destruction
프로그램 내에서 어떤 이벤트가 발생하기 전에 고루틴이 종료되도록 하는 것은 보장할 수 없다  

```
var a string

func hello() {
	go func() { a = "hello" }()
	print(a)
}
```

어떠한 동기화도 없이 a 변수에 값을 할당하도록 되어 있다 . 그래서 다른 고루틴이 a의 값("hello")을 읽을 수 있는지는 보장할 수 없다. 컴파일러 성향에 따라 go 구문을 모두 삭제해버릴 수도 있다   

만약 다른 고루틴에서 a의 값이 정상적으로 보여야 한다면  `lock`, `channel communication`과 같은 동기화 메커니즘을 사용해야 한다  

## Channel communication 
채널(Channel) 커뮤니테이션은 고루틴 사이에서 동기화를 위한 주된 방법이다.  채널에 데이터를 전송하는 것과 채널에서 데이터를 수신하는 것이 매칭되어야 하며 이 과정은 보통 서로 다른 고루틴에서 행해진다. 

채널에 데이터를 전송하는 것은 채널에서 데이터를 수신하기 이전에 이루어진다.(`happens before`)  

```
var c = make(chan int, 10)
var a string

func f() {
	a = "hello, world"
	c <- 0
}

func main() {
	go f()
	<-c
	print(a)
}
```
위 프로그램은 "hello, world"가 출력되는 것을 보장한다. a에 데이터를 쓰는 것이 c에 데이터를 전송하기 전에 실행되며 print를 하기 전에 c에서 데이터를 수신해야 하기 때문에 happens before 관계가 보장된다.   

채널이 닫히게 되면 채널에서는 0을 리턴한다. 
위 프로그램에서 `c <- 0` 대신 `close(c)`로 변경하더라도 happens before 동작을 보장할 수 있다. 


```
var c = make(chan int)
var a string

func f() {
	a = "hello, world"
	<-c
}
func main() {
	go f()
	c <- 0
	print(a)
}
```
이 프로그램 역시 "hello, world"가 출력되는 것을 보장한다. a 변수에 데이터를 쓰는 것이 c에서 수신하는 것보다 우선시 되며 c에 전송한 것에 부합하는 동작(수신)이 a에 데이터를 쓰는 작업 이후에 행해진다. 

만약 채널이 버퍼링 되어 있다면 (`c = make(chan int, 1)`) 이 프로그램은 "hello, world"가 출력되는 것을 보장하지 못한다. 아마 빈 문자열이 출력되거나 프로그램 오류가 발생할 것이다. 

용량(capacity)이 C채널에서 k번째 값을 수신하는 것은 k + C번째 전송이 완료되기 전에 발생한다.  
이 규칙은 이전 채널(버퍼링되지 않은)의 규칙을 버퍼링 된 채널로 일반화한다. 카운팅 세마포어를 버퍼링 된 채널로 모델링 할 수 있다. 채널의 데이터 수는 활성회된 수에 해당하고 채널 용량은 최대 동시 사용 수에 해당하며 데이터 전송은 세마포어를 가져온다. 데이터를 수신하면 세마포어가 해제된다.  

아래 프로그램은 작업 목록(work)의 모든 항목에 대해 고루틴을 시작하지만 고루틴은 한 번에 최대 3개 작업만 실행하도록 제한한다. 

```
var limit = make(chan int, 3)

func main() {
	for _, w := range work {
		go func(w func()) {
			limit <- 1
			w()
			<-limit
		}(w)
	}
	select{}
}
```

## Locks  
sync패키지는 `sync.Mutex`, `sync.RWMutex` 2가지의 락이 구현되어 있다. 

```
var l sync.Mutex
var a string

func f() {
	a = "hello, world"
	l.Unlock()
}

func main() {
	l.Lock()
	go f()
	l.Lock()
	print(a)
}
```
이 프로그램은 "hello, world"가 출력되는 것을 보장한다. f 함수내에 있는 l.Unlock()은 main함수 내에 있는 두번째 l.Lock()이 호출되기 이전에 실행된다. 즉 print가 호출되기 이전에 실행된다. 


## Once  
sync 패키지에는 `Once`라는 것을 이용하여 여러 고루틴에서 안전하게 초기화 할 수 있는 메커니즘을 제공한다. 여러 쓰레드에서 어떤 함수 f에 대해 `once.Do(f)`를 실행할 수 있지만 f()는 오직 한번만 실행되며 f()가 완료 될 때까지 다른 쓰레드들은 모두 블럭된다. 

```
var a string
var once sync.Once

func setup() {
	a = "hello, world"
}

func doprint() {
	once.Do(setup)
	print(a)
}

func twoprint() {
	go doprint()
	go doprint()
}
```
이 프로그램은 "hello, world"를 2번 출력하지만 첫번째로 호출된 doprint에서 setup이 한번만 호출된다.

## Incorrect synchronization
 
읽기(r)연산은 동시에 발생하는 쓰기(w)연산에 의해 쓰여진 값을 볼 수 있지만 r이 w 이전에 쓰여진 값을 확인 한 후에 읽는 것을 의미하지는 않는다. 
 
```
var a, b int

func f() {
	a = 1
	b = 2
}

func g() {
	print(b)
	print(a)
}

func main() {
	go f()
	g()
}
```
위 프로그램에서 g함수의 출력 결과는 2, 1이 아닌 2, 0 혹은 0, 0이 될 수 있다  

<br>

DCL(Double-Checked Locking)은 동기화(synchronization)의 오버헤드를 줄이고자 나온 방법이다. 

아래 twoprint 프로그램은 잘못된 방법으로 DCL을 하고 있다  

```
var a string
var done bool

func setup() {
	a = "hello, world"
	done = true
}

func doprint() {
	if !done {
		once.Do(setup)
	}
	print(a)
}

func twoprint() {
	go doprint()
	go doprint()
}
```
doprint에서  done 변수에 값을 쓰는 것이 a변수에 값을 썼다는 것을 보장하지 않는다. 이 프로그램은 "hello, wordl" 대신 빈 문자열이 출력될 수 있다. 

<br> 

또 다른 예로 busy-waiting이 있다. 

```
var a string
var done bool

func setup() {
	a = "hello, world"
	done = true
}

func main() {
	go setup()
	for !done {
	}
	print(a)
}
```

이전과 마찬가지로 done 변수에 값을 쓰는 것이 a에 값을 썼다는 것을 보장하진 않는다. 그래서 이 프로그램 역시 "hello, world" 대신 빈 문자열을 출력할 수 있다. 더 나쁜 상황으로는 두 쓰레드에 동기화(synchronization)가 존재하지 않기 때문에 main에서 done에 씌여진 값을 확인하지 못할 수도 있다. 즉 for 루프가 종료되는 것을 보장하지 못한다. 


# 원문   
* https://golang.org/ref/mem  