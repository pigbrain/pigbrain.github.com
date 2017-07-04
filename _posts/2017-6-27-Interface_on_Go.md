---
layout: post
category: Go
title: Interfaces  
tagline: by Pigbrain
tags: [Go]
---
  
<!--more-->
  
# Go Data Structures: Interfaces    
Go언어의 인터페이스는 정적(static)이고 컴파일 시점에 오류에 대한 체크가 되지만 인터페이스를 호출하는 시점에는 동적(dynamic)으로 이루어진다.  

# Usage 
Go의 인터페이스는 Python과 같은 동적 언어처럼 덕 타이핑(duck typing)이 가능하도록 해준다. 그러나 동적 언어와는 다르게 Go는 컴파일 시점에 실수할 법한 명백한 오류들을 잡아준다. 
   
인터페이스를 사용하기 위해서는 먼저 인터페이스 타입을 선언해야한다. 여기서는 `ReadCloser`를 선언하였다. 

```
type ReadCloser interface {
    Read(b []byte) (n int, err os.Error)
    Close()
}
```

그리고 `ReadCloser`를 받는 함수를 정의한다. 아래 함수는 모든 데이터를 읽을 때까지 반복적으로 `Read` 함수를 호출한다.
    
```
func ReadAndClose(r ReadCloser, buf []byte) (n int, err os.Error) {
    for len(buf) > 0 && err == nil {
        var nr int
        nr, err = r.Read(buf)
        n += nr
        buf = buf[nr:]
    }
    r.Close()
    return
}
```    

`ReadAndClose`를 호출하는 코드는 `Read`와 `Close` 메서드를 가지고 있다면 타입에 상관없이 이 함수를 호출할 수 있다. Python과 같은 언어들과는 다르게 잘못된 타입을 함수에 넣으려고하면 컴파일 타임에 오류가 발생한다. 

인터페이스는 컴파일 타임에 정적으로 검사되는 것 외에 특정 인터페이스에 추가적인 메서드가 있는지 동적으로 검사할 수 있다. 

```
type Stringer interface {
    String() string
}

func ToString(any interface{}) string {
    if v, ok := any.(Stringer); ok {
        return v.String()
    }
    switch v := any.(type) {
    case int:
        return strconv.Itoa(v)
    case float:
        return strconv.Ftoa(v, 'g', -1)
    }
    return "???"
}
```

`any`변수의 타입은 `interface{}`이다. 이것은 아무 타입이나 받을 수 있다는 것을 의마하여 메서드에 대한 아무런 보증을 하지 않는다. `if`문 내에 `.()` 연산은 `any`를 `Stringer`타입으로 변환할 수 있는지(`String`메서드를 가지고 있는지) 확인한다. 만약 변활 할 수 있다면 `String`메서드를 호출하고 문자열을 반환한다. 그렇지 않다면 `switch` 문에서 기본적인 몇가지 타입을 체크하게 된다. 이것은 `fmt`패키지가 하는 기본적인 작업이다.

간단한 예로 값을 출력하는 `String()` 메서드와 `Get()` 메서드를 가지고 있는 64비트 정수 타입(`Binary`)이 있다고 하자.

```
type Binary uint64

func (i Binary) String() string {
    return strconv.Uitob64(i.Get(), 2)
}

func (i Binary) Get() uint64 {
    return uint64(i)
}
```   
  
`Binary` 타입의 값은  `ToString` 메서드에 넣을 수 있다. `Binary`는 `Stringer`를 구현하지 않았지만 `String` 메서드를 이용하여 값이 출력된다.  
런타임에 `Binary`가 `String`메서드를 가지고 있는지 확인할 수 있고, 비록 `Binary`가 `Stringer`를 모르더라도 그것을 구현한 것처럼 처리된다.

컴파일 타임에 모든 암묵적인 변환은 체크하더라도 인터페이스들 사이에 명시적으로 변환되는 것들은 런타임에 판단되는 것을 확인할 수 있다.
  
  
# Interface Values 
일반적으로 정적인 언어들(Java, C++..)은 메서드 호출을  위해 메서드 테이블을 관리하거나 동적인 언어들(Javascript, Python..)은 메서드 호출 때마다 메서드를 검색하여 호출한다.   
Go언어는 이 두 가지 특징들을 조금씩 가지고 있다. 메서드 테이블을 가지고 있지만 실행시에 메서드를 검색한다. 
  
  
`Binary`는 2개의 32비트 워드로 이루어진 62비트 정수이다. 
  
<img src="/assets/themes/Snail/img/Go/Interface/binary_value.PNG" alt="">  
  

인터페이스는 각각 한 워드를 차지하는 타입에 대한 정보를 가리키는 포인터와 값을 가리키는 포인터로 구성된다.  
`b`를 `Stringer` 인터페이스 타입에 셋팅하면 인터페이스 값은 두 워드가 설정된 곳을 가리킨다.

<img src="/assets/themes/Snail/img/Go/Interface/binary_interface.PNG" alt="">  
  
  
인터페이스에서 첫번쨰 워드는 인터페이스 테이블 혹은 I 테이블(itable)이라고 칭하는 테이블을 가리킨다. (C 구현체에서 Itab이라고 네이밍 되어 있다)

인터페이스 테이블은 관련 타입들에 대한 일부 메타 데이터로 시작하고 다음에는 함수 포인터들이 나열된다. 인터페이스 테이블은 동적 타입이 아닌 인터페이스 타입만 해당된다.  
        
위 예에서 `Binary`값이 할당된 `Stringer`에 대한 인터페이스 테이블은  `Stringer`를 만족하는 메서드 리스트를 가지고 있다. 즉 `String` 메서드를 가지고 있고 `Get`메서드는 가지고 있지 않다.
   
인터페이스에서 두번째 워드는 실제 값을 가리킨다. 위 예에서는 `b`의 복사본을 가리키게 된다. `var s Stringer = b`는 `b`의 복사본이 생성된다. 이후 `b`가 변경되게 되더라도 `s`는 원래 값을 가지고 있다.
  
인터페이스에 저장된 값의 크기는 클 수 있지만 인터페이스 구조에서 값을 보유하는데 하나의 워드만 사용되므로 할당시 힙에 메모리 덩어리가 할당되고 포인터가 한 워드 슬롯에 기록된다.  
(값이 한 워드에 들어갈 수 있다면  최적화가 이루어진다.)  


    
# 원문   
* https://research.swtch.com/interfaces