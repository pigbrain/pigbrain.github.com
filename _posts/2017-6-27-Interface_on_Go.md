---
layout: post
category: Go
title: Go Data Structures: Interfaces  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->

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

 

    
# 원문   
* https://research.swtch.com/interfaces