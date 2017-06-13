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
  
다양한 `http.RoundTripper` 구현체들은   
  

Various http.RoundTripper implementations report the internal events 

by looking for context's *httptrace.ClientTrace 
and calling the relevant hook functions.
  
  
  
  
 
# 원문   
* https://blog.golang.org/http-tracing  