---
layout: post
category: Go
title: Allocation with new and make  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->

# Allocation
Go는 메모리를 할당하기 위해 `new`, `make`2가지 방법을 제공하고 있지만 이 2개는 동작하는 방식이 다르며 서로 다른 타입에 적용된다. 
  
# Allocation with new
`new`는 메모리를 할당하며 0으로 초기화한다. 즉 `new(T)`는 타입 T에 대하여 0으로 초기화된 메모리 공간의 주소(`*T`)를 리턴한다.  
  
메모리 공간이 0으로 초기화되어 있기 때문에 다른 초기화 과정 없이 바로 사용할 수 있다.  

`sync.Mutex`는 명시적인 생성자나 초기화 메서드가 없다. 대신 sync.Mutex가 0일 경우 락이 해제된 상태로 정의된다. 

<br>

```
type SyncedBuffer struct {
    lock    sync.Mutex
    buffer  bytes.Buffer
}

p := new(SyncedBuffer)  // type *SyncedBuffer
var v SyncedBuffer      // type  SyncedBuffer
```

`SyncedBuffer`타입의 값은 위 2가지 방법으로 선언하고 즉시 사용할 수 있다. (추가적인 초기화 과정은 필요 없다.)



# Allocation with make  
`make`는 `new`와는 다르게 `slice`, `map`, `channel`만 생성 가능하다. 그리고 `make`는 메모리를 할당하고 0으로 초기화 하지 않고 별도의 초기화 과정을 거친 후 `*T`가 아닌 `T`타입의 값을 리턴한다. 이 세 가지 타입(slice, map, channel)은 사용 전에 초기화되어야 하는 데이터 구조에 대한 참조를 하기 때문에 `new`와는 차별을 두고 있다.
  
슬라이스(slice)는 데이터에 대한 포인터, 길이(length), 용량(capacity) 3가지 항목에 대한 값을 가지고 있는 데이터 구조이며 초기화가 완료되기 전에는 이 항목들의 값이 `nil`이다.  
  
즉, 슬라이스, 맵, 채널은 사용하기 전에 초기화되어야 한다. 
 
```
var p *[]int = new([]int)       // 슬라이스를 할당하지만 *p는 nil이다  
var v  []int = make([]int, 100) // int 100칸을 가지는 슬라이스 
```  

아래는 슬라이스를 생성하기 위해 불필요한 작업을 하고 있다  

```
var p *[]int = new([]int)
*p = make([]int, 100, 100)
```
 
# 원문   
* https://golang.org/doc/effective_go.html#allocation_new
* https://golang.org/doc/effective_go.html#allocation_make  