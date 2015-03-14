---
layout: post
category: Linux
title: Jetty 그리고 Tomcat
tagline: by Pigbrain
tags: [Tech]
---
Jetty란 무엇인가..  
그리고 Tomcat과의 차이를 알아보자

<!--more-->

이번 글에서는 Jetty와 Tomcat에 대하여 다음과 같은 순서로 알아보도록 하겠다.  
 
 * Jetty ?
 * Jetty 구조
 * Jetty와 Tomcat의 차이점    
 * Jetty와 Tomcat의 성능 비교  
 * Jetty를 이용한 Embedded 웹 서버 만들기  
 * Embedded된 Jetty와 Spring  

---

**1. Jetty ?**  
 
 * 자바 기반의 오픈소스 웹 서버
 * (비동기)HTTP 서버, (비동기)HTTP 클라이언트, 웹소켓, OSGi, JNDI, JMX 등을 지원 
 * Jetty는 다음과 같은 방법으로 실행 가능하다.  
    * Tomcat 처럼 독립적으로 실행 
    * 자바 어플리케이션에 Jetty를 내장하여 실행
 * 소스코드는 http://git.eclipse.org/c/jetty/org.eclipse.jetty.project.git/ 에서 다운로드 받을 수 있다. 

**2. Jetty 구조**  
Jetty의 구조는 아래 그림과 같다.  
Server는 Jetty의 메인 클래스로서  HTTP커넥션을 관리하는 Connector와 쓰레드풀에서 쓰레드를 얻어와 request를 처리하고 response를 제공하는 Handler와 함께 전체적인 구성을 이루고 있다. 
<img src="/assets/themes/Snail/img/JettyTomcat/view20000Jetty.PNG" alt="">

**3. Jetty와 Tomcat의 차이점**    

**4. Jetty와 Tomcat의 성능 비교**  

**5. Jetty를 이용한 Embedded 웹 서버 만들기**  

**6. Embedded된 Jetty와 Spring**  


**\[참고자료\]**

 * http://www.eclipse.org/jetty/documentation/



#The End
