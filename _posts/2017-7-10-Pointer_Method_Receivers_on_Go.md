---
layout: post
category: Go
title: what’s the difference between pointer and non-pointer method receivers?  
tagline: by Pigbrain
tags: [Go]
---
  
<!--more-->

리시버(Receiver)는 메소드에 전달되는 인수인 것처럼 처리 될 수 있으며 Call-By-Value와 Call-By-Reference 각각의 방법으로 전달하려는 이유가 모두 적용된다. 
Call-By-Value가 아닌 Call-By-Reference로 전달하려는 이유는 다음과 같을 것이다.
    
* 실제 전달되는 값을 수정하고자 한다 .   
* `struct`는 값을 복사하기에 비용이 비싸다.  
* 일관성 : 구조체에 있는 몇몇 메서드들이 포인터 형태의 리시버를 받도록 되어 있따면 나머지 메서드들도 동일한 형태를 지녀야 한다.

만약 위 특성들을 만족한다면  포인터 형태의 리시버를 사용해야 한다.  
  
  
```
package main

import "fmt"

type Mutatable struct {
    a int
    b int
}

func (m Mutatable) StayTheSame() {
    m.a = 5
    m.b = 7
}

func (m *Mutatable) Mutate() {
    m.a = 5
    m.b = 7
}

func main() {
    m := &Mutatable{0, 0}
    fmt.Println(m)
    m.StayTheSame()
    fmt.Println(m)
    m.Mutate()
    fmt.Println(m)
}
```
  
`StayTheSame`와 `Mutate` 메서드는 동일한 동작을 한다.
`StayTheSame`은 포인터가 아닌 리시버로 정의되었으며 메서드가 호출되었을 당시의 구조체가 가진 값을 변경하지 않는다.  
`Mutate`는 포인터 형태의 리시버로 정의되었다. 그래서 호출 당시의 구조체의 값이 변경된다.
  
```
&{0 0}
&{0 0}
&{5 7}
``` 

 
# 원문   
* https://nathanleclaire.com/blog/2014/08/09/dont-get-bitten-by-pointer-vs-non-pointer-method-receivers-in-golang/