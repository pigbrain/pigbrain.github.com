---
layout: post
category: Go
title: Introducing HTTP Tracing  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->

# Introduction  
Go 1.7에서 HTTP 클라이언트 요청의 라이프 사이클 전반에 걸쳐 세밀한 정보를 수집하는 트레이싱(tracing) 기능이 추가되었다.  
HTTP 트레이싱은 `net/http/httptrace` 패키지에서 제공된다.  
트레이싱을 통하여 수집된 정보들은 디버깅, 서비스 모니터링 등으로 사용할 수 있다.  

# HTTP events  
`htptrace`패키지는 정보를 수집하기 위하여 다양한 훅(hook)을 제공한다  

* Connection creation
* Connection reuse
* DNS lookups
* Writing the request to the wire
* Reading the response
  
# Tracing events  
훅을 포함한 `*httptrace.ClientTrace`을 HTTP 요청을 위한 `context.Context`에  넣게되면 HTTP 트레이싱 기능이 활성화 된다.  
  
다양한 `http.RoundTripper` 구현체들은 컨텍스트에 `*httptrace.ClientTrace`가 있다면 이곳에 있는 훅들을 호출하여 내부 이벤트를 추적한다.  
    
  
트레이싱 기능은 매 요청에만 유효하기 때문에 다음 요청시에는 새로운 `*httptrace.ClientTrace`를 생성하여 넣어줘야 한다.  

   
```
req, _ := http.NewRequest("GET", "http://google.com", nil)
trace := &httptrace.ClientTrace{
    DNSDone: func(dnsInfo httptrace.DNSDoneInfo) {
        fmt.Printf("DNS Info: %+v\n", dnsInfo)
    },
    GotConn: func(connInfo httptrace.GotConnInfo) {
        fmt.Printf("Got Conn: %+v\n", connInfo)
    },
}
req = req.WithContext(httptrace.WithClientTrace(req.Context(), trace))
if _, err := http.DefaultTransport.RoundTrip(req); err != nil {
    log.Fatal(err)
}
```

`http.DefaultTransport`는 각 이벤트가 발생할 때마다 훅을 호출하게 된다. 위 프로그램은 DNS 검색이 완료되자마자 DNS정보를 출력한다. 또한 연결이 완료되지 마자 해당 정보도 출력한다.  
  
# Tracing with http.Client 
트레이싱 기능은 하나의 `http.Transport.RoundTrip`내에서 동작하도록 디자인되었다. 그러나 어떤 클라이언트는 하나의 HTTP 요청을 완료하기 위해 여러번 통신을 해야 할 수도 있다.  
예를 들어, URL 리다이렉트의 경우 등록되어있는 훅은 요청이 발생할 때마다 여러번 호출 될 것이다. 
  
아래 프로그램은 `http.RoundTripper`를 래핑하여 현재 요청에 대한 것을 구분할 수 있도록 하였다.  

```
package main

import (
    "fmt"
    "log"
    "net/http"
    "net/http/httptrace"
)

// transport is an http.RoundTripper that keeps track of the in-flight
// request and implements hooks to report HTTP tracing events.
type transport struct {
    current *http.Request
}

// RoundTrip wraps http.DefaultTransport.RoundTrip to keep track
// of the current request.
func (t *transport) RoundTrip(req *http.Request) (*http.Response, error) {
    t.current = req
    return http.DefaultTransport.RoundTrip(req)
}

// GotConn prints whether the connection has been used previously
// for the current request.
func (t *transport) GotConn(info httptrace.GotConnInfo) {
    fmt.Printf("Connection reused for %v? %v\n", t.current.URL, info.Reused)
}

func main() {
    t := &transport{}

    req, _ := http.NewRequest("GET", "https://google.com", nil)
    trace := &httptrace.ClientTrace{
        GotConn: t.GotConn,
    }
    req = req.WithContext(httptrace.WithClientTrace(req.Context(), trace))

    client := &http.Client{Transport: t}
    if _, err := client.Do(req); err != nil {
        log.Fatal(err)
    }
}
```

google.com이 www.google.com으로 리다이렉트 되기 때문에 아래와 같이 프로그램이 출력될 것이다. 
  
```
Connection reused for https://google.com? false
Connection reused for https://www.google.com/? false
```  
  
`net/http`패키지에 있는 Transport는 HTTP/1과 HTTP/2 모두 트레이싱 가능하도록 지원하고 있다.  

만약 커스텀한 `http.RoundTripper` 구현체를 사용하고 있다면, `
*httptest.ClientTrace`에 대한 요청 컨텍스트를 확인하고 이벤트가 발생할 때 관련 훅을 호출하여 트레이싱을 가능하도록 할 수 있다.   
  


    
# 원문   
* https://blog.golang.org/http-tracing  