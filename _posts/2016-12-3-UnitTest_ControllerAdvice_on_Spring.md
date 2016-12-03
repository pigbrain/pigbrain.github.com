---
layout: post
category: Spring
title: Spring MVC Controllers Unit Test calling @ControllerAdvice
tagline: by Pigbrain
tags: [Spring]
---
  
<!--more-->  
  
### 문제  
몇 개의 컨트롤러 클래스와 `@ControllerAdvice`로 표시된 클래스가 있다. `Spring MVC 3.2`을 사용하고 있다. 톰캣을 실행시키고 브라우저를 통하여 리퀘스트를 보내면 @ControllerAdvice가 정상적으로 동작하지만 유닛테스트에서는 동작하지 않는다.  
  
### 해결  
`@ControllerAdvice`가 표시된 클래스가 `MyControllerAdvice`라고 가정하자. 그리고 MockMvc에 아래와 같이 ExceptionResolver를 등록하면 된다.  
  
  
{% highlight java %}  
@Before
public void beforeTest() {
    MockMvc mockMvc = standaloneSetup(myControllers)
        .setHandlerExceptionResolvers(createExceptionResolver())
        .build();
}

private ExceptionHandlerExceptionResolver createExceptionResolver() {
    ExceptionHandlerExceptionResolver exceptionResolver = new ExceptionHandlerExceptionResolver() {
        protected ServletInvocableHandlerMethod getExceptionHandlerMethod(HandlerMethod handlerMethod, Exception exception) {
            Method method = new ExceptionHandlerMethodResolver(MyControllerAdvice.class).resolveMethod(exception);
            return new ServletInvocableHandlerMethod(new MyControllerAdvice(), method);
        }
    };
    exceptionResolver.afterPropertiesSet();
    return exceptionResolver;
}
{% endhighlight %}  
  
  
# 원문  
* http://stackoverflow.com/questions/15302243/spring-mvc-controllers-unit-test-not-calling-controlleradvice  

