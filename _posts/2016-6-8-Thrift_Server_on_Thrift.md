---
layout: post
category: OpenSource  
title: Thrift Server Architecture 
tagline: by Pigbrain  
tags: [Thrift]
---

<!--more-->
  
# Thrift Server Architecture
  
<img src="/assets/themes/Snail/img/OpenSource/Thrift/Server/server.png" alt="">  
  
## TSimpleServer  
* 블록킹(Blocking)  
* 싱글 쓰레드  
* 주로 테스트 용도로 사용한다  
  
### Example
  
## TThreadPoolServer  
* 블록킹(Blocking)  
* 멀티 쓰레드  
  
### Example  
  
## TNonblockingServer  
* 논블록킹(Non-Blocking)  
* 멀티 쓰레드  
* NIO 채널을 이용하여 구현  
* TFramedTransport를 이용해야 한다 
  
### Example  
    
## THsHaServer  
* TNonblockingServer를 상속받아 구현  
* Half-Sync/Half-Async 방식으로 쓰레드 관리  
  
### Example  
    
## TThreadedSelectorServer  
  
### Example  
    
# Thrift Source Code
* https://github.com/apache/thrift 

  
  


