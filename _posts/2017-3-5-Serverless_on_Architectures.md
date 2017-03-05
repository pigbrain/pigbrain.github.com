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
### UI-driven applications (ecommerce app)
* 전통적인 아키텍처  
	* 서버는 Java로 구현되었고 클라이언트는 HTML, JS로 구현되었다고 가정한다   
	* 이 아키텍처에서는 인증, 페이징, 검색 등이 모두 서버에서 구현되어야 한다  
  
<img src="/assets/themes/Snail/img/Architectures/serverless/serverless_1.png" alt="">  
  
* Serverless 아키텍쳐  
	1. 인증 관련 코드를 서버에서 제거하고 BaaS로 대체한다  
	2. 클라이언트가 데이터베이스의 일부 데이터(상품리스트..)에 직접 접근하는 것을 허용한다   
		* AWS Dynamo  
	3. 서버에 있던 페이징과 같은 일부 기능들을 클라이언트로 옮겨옴으로써 클라이언트는 [SPA](https://en.wikipedia.org/wiki/Single-page_application)가 된다  
	4. 검색 관련 기능은 서버에 FaaS로 구현하고 **API Gateway**를 통한 HTTP request로 해당 기능을 사용할 수 있다  
	5. 구매 기능도 서버에 FaaS로 구현하고 HTTP request로 해당 기능을 사용할 수 있다  
  
<img src="/assets/themes/Snail/img/Architectures/serverless/serverless_2.png" alt="">  
      
### Message-driven applications (ad server)
  
* 전통적인 아키텍처  
	* Ad 서버는 사용자가 광고를 클릭할 경우 리다이렉트를 위한 응답을 보내준다  
	* Ad 서버는 사용자의 클릭 정보를 channel을 통하여 전송하여 Click Processor가 데이터를 처리할 수 있도록 한다   
  
<img src="/assets/themes/Snail/img/Architectures/serverless/serverless_3.png" alt="">  
  
* Serverless 아키텍쳐 
	* 항상 실행되고 있어야 하는 어플리케이션(Click Processor)를 **event**가 발생했을떄 실행되는 FaaS형태의 어플리케이션으로 대체한다  
	
<img src="/assets/themes/Snail/img/Architectures/serverless/serverless_4.png" alt="">    
  
## Unpacking ‘Function as a Service’  
ㅁㅁㅁ
   
  
      





  
# 원문   
* https://martinfowler.com/articles/serverless.html  