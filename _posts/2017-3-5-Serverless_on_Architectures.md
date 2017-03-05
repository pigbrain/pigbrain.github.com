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
  
* FaaS는 자체 서버 시스템이나 어플리케이션을 관리하지 않고 백엔드 코드를 실행하는 것에 관한 것이다
	* 이것은 Paas나 Container와 같은 기술과의 주요한 차이점이다  
* FaaS는 특정한 프레임워크나 라이브러리에 코딩을 할 필요가 없다
	* FaaS에서 특별하게 필요한 코드는 **main method**와 **startup**코드가  전부이며 나머지는 기존 어플리케이션들과 동일하다  
* 배포 해야하는 서버 어플리케이션이 없다  
	* FaaS Provider에 코드를 업로드하는 것이 전부이다  
* 수평적인 *scaling*은 아무런 설정 없이 Provider에 의하여 자동으로 적용된다  
* FaaS에 정의된 함수는 이벤트가 발생할때 호출된다  
* 대부분의 Provider들은 일종의 API Gateway에서 HTTP request로 함수를  호출할 수 있는 기능을 제공한다  
	* AWS API Gateway  
	* Webtask  

### state  
* FaaS는 **statelss**하게 만들어야 한다  
  
### Execution Duration  
* FaaS는 실행시간이 긴 어플리케이션을 제한한다  
	* AWS Lambda는 5분 이상 실행되는 어플리케이션은 강제로 종료시킨다  
  
### Startup Latency  
* FaaS 함수가 request부터  response까지 걸리는 시간은 많은 요인에 따라 달라지지만 10ms부터 2분 정도까지 소요될 수 있다  
  
* 함수가 JVM에서 구현되었다면 JVM이 실행되는 시간이 포함되어 response까지 10초 이상이 걸릴 수 있다    
	* 이것은 다음과 같은 상황에서 두드러지게 발생한다   
		* 10분 이상의 간격으로 드물게 함수가 호출되는 경우  
		* 갑자기 트래픽이 증가하는 경우   		 		
	
### API Gateway  
* API Gateway는 FaaS 함수와 연관된 라우팅 정보가 있는 HTTP 서버이다  

<img src="/assets/themes/Snail/img/Architectures/serverless/serverless_5.png" alt=""> 
  


  
# 원문   
* https://martinfowler.com/articles/serverless.html  