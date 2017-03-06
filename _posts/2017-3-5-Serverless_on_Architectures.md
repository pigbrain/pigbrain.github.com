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
  
# What isn’t Serverless?  
  
## Comparison with PaaS  
* 만약 PaaS가 0.5초 동안 실행되는 어플리케이션을 효율적으로 20ms초 이내로 실행할 수 있다면 그것은 serverless라고 할 수 있다  
	* https://twitter.com/adrianco/status/736553530689998848?ref_src=twsrc%5Etfw  
	* 대부분의 PaaS 어플리케이션들은 매 request에 대해 어플리케이션을 시작, 종료하지 않는다  
* FaaS와 PaaS는 **scaling** 관점에서도 차이가 있다  
	* PaaS에서 autu-scale을 설정하더라도 각각의 request 수준까지는 scaling이 고려되지 않는다  
* FaaS가 많은 장점이 있지만 PaaS를 사용하는 이유는 다음과 같을 것이다  
	* 다양한 툴  
	* API Gateway의 완성도  
  
## Comparison with containers  
* PaaS는 container(Docker..등)를 내장하고 있고 FaaS 만큼 **scaling**을 세밀하게 지원하지 못한다  
* FaaS는 어플리케이션 별로 event 타입이 많지 않은 **event-driven** 스타일에 적합하다  
* container는 event 타입이 많은 **synchronous-request driven**스타일에 적합하다  
  
  
## NoOps  
* serverless는 No Ops를 의미하지 않는다  
* 모니터링, 배포, 보안, 네트워킹, 디버깅, 시스템 확장등 이러한 문제들은 serverless에도 존재한다  
* 시스템 관리자는 serverless에도 필요하다  
   
## Stored Procedures as a Service  
* FaaS를 Stored Procedures as a Service라고 부르는 것을 잘못된 것이다  
	* 대부분의 FaaS 예제가 코드를 저장해놓고 호출하여 실행하는 것만 보여주기 때문에 이와 같이 생각되는 것 같다  
* stored procedures는 다음과 같은 문제가 있다  
	* Vendor에 종속되어 있다 (Vendor에서 제공하는 프레임워크 혹은 언어)  
	* 데이터베이스에서 실행되기 때문에 테스트해보는 것이 어렵다  
	* 버전 관리가 어렵다  
* FaaS에서는 stored procedures와 같은 문제가 없다  
	* Vendor에 종속되지 않은 다양한 언어를 이용하여 개발할 수 있다  
	* 배포하는 것은 단순한 코드이기 때문에 유닛 테스트등을 통하여 테스트가 쉽다  
  
# Benefits  
## Reduced operational cost  
* servelss는 매우 단순한 아웃소싱 솔루션이다  
* 서버, 데이터베이스, 어플리케이션 로직을 직접 관리하지 않아도 된다  
  
## BaaS - reduced development cost  
* IaaS, PaaS는 상품화된 서버, 운영체제에  기반을 두고 있다  
* serverless는 상품화된 어플리케이션의 컴포넌트 정도로 인식된다  
  
## FaaS - scaling costs  
* `horizontal scaling is completely automatic, elastic, and managed by the provider`  
* 개별 request 수준에서의 scaling이 가능한 만큼 사용된 트래픽만큼만 비용을 지불하면 되기 때문에 매우 절약적이다     

## ‘Greener’ computing?  
  
> 서비스 및 엔터프라이즈 데이터 센터의 일반적인 서버는 컴퓨터의 최대 능력치의  5 ~ 15%만을 사용한다 
  
> -- Forbes
  
* serverless는 실시간으로 request량에 맞는 컴퓨팅 용량을 제공할 수 있다  

  
# Drawbacks  
## Vendor control  
  
## Multitenancy Problems  
  
## Vendor lock-in  
  
## Security concerns  
  
## Repetition of logic across client platforms  
  
## Loss of Server optimizations  
  
## No in-server state for Serverless FaaS
  
# 원문   
* https://martinfowler.com/articles/serverless.html  