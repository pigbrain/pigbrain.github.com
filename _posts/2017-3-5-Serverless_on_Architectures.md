---
layout: post
category: Architectures
title: Serverless Architectures
tagline: by Pigbrain
tags: [Architectures]
---

<!--more-->  

# What is Serverless?  
* **BaaS** (Backend As A Service)
	*  3rd party applications에서 server-side logic과 state를  전적으로 관리하는 것 
* **FaaS** (Function As A Service)  
	* 3rd party applications에 의하여 **event-triggered**방식으로 **stateless**하게 코드가 일회성으로 호출되는 것  
  
<br>  
  
> 이 글에서는 FaaS를 중점적으로 다룬다  
> Faas는 BaaS보다 더 새로운 기술이고 기존 아키텍쳐에 비해 중요한 차이점들이 있다
  
<br>  
  
## A couple of examples
### UI-driven applications
* 전통적인 아키텍처  
	* 서버는 Java로 구현되었고 클라이언트는 HTML, JS로 구현되었다고 가정한다   
	* 이 아키텍처에서는 인증, 페이징, 검색 등이 모두 서버에서 구현되어야 한다  
  
<img src="/assets/themes/Snail/img/Architectures/gfs/serverless_1.png" alt="">  
  
* Serverless 아키텍쳐  
  
<img src="/assets/themes/Snail/img/Architectures/gfs/serverless_2.png" alt="">  
    
  
      





  
# 원문   
* https://martinfowler.com/articles/serverless.html  