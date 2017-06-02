---
layout: post
category: Go
title: Don’t use Go’s default HTTP client (in production)  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->
  
# Don’t use Go’s default HTTP client  

Go의 http 패키지에는 기본으로 **timeout** 값을 지정하지 않고 있으며 커스텀하게 http.Client를 재정의하여 사용할 수 있도록 하고 있다.   
  
  
## The Problem by Example 

Go를 이용하여 K라는 API를 호출하여 결과를 웹 페이지로 보여주는 프로그램을 만들었고 서비스에 반영하였다. 서비스에서 K API는 정상적으로 호출되고 있으며 아무런 문제가 없었다. 그런데 어느날 웹 페이지에 아무것도 노출이 되지 않아 로그, CPU, 메모리, I/O 등을 살펴보았으나 아무런 문제가 없었으며 K API를 실제 테스트로 호출하였는데 정상적으로 응답을 받았다. 결과적으로 웹 페에지에 아무것도 노출되지 않았을 때 K API를 제공하는 서버에서 정전이 있었고 Go 프로그램은 이 API의 응답 결과가 올때까지 대기하고 있었던 것이다.  


문제 상황 재현을 위한 코드이며 1시간 동안 응답을 기다리고 있을 것이다. 

```
package main

import (
	"fmt"
	"net/http"
	"time"
	"net/http/httptest"
)

func main() {

	fmt.Println("hello");

	svr := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(time.Hour)
	}))
	
	defer svr.Close()
	
	http.Get(svr.URL)
	
	fmt.Println("finished request")
}
```
 
## The Solution  
**timeout** 설정을 포함하는 http.Client를 정의하여 사용해야 한다.    

```
package main

import (
	"fmt"
	"net/http"
	"time"
	"net/http/httptest"
	"net"
)

func main() {

	fmt.Println("hello");

	svr := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(time.Hour)
	}))

	defer svr.Close()

	var netTransport = &http.Transport{
		Dial: (&net.Dialer{
			Timeout: 5 * time.Second,
		}).Dial,
		TLSHandshakeTimeout: 5 * time.Second,
	}
	var netClient = &http.Client{
		Timeout: time.Second * 10,
		Transport: netTransport,
	}
	response, _ := netClient.Get(svr.URL)
	_ = response

	fmt.Println("finished request")
}

```

위 코드는 TCP 연결과 TLS 핸드쉐이크에 대한 timeout 뿐만 아니라 요청에 대한 timeout도 지정하고 있다. 
상황에 따라 keep-alive와 같은 것들에 대한 timeout도 지정할 수 있다. 

# 원문   
* https://medium.com/@nate510/don-t-use-go-s-default-http-client-4804cb19f779