---
layout: post
category: Math
title: Ackermann Function  
tagline: by Pigbrain
tags: [Math]
---

<!--more-->


# Ackermann Function    
 
* 음이 아닌 정수 m과 n에 대하여 다음과 같이 정의되는 함수이다  
   
```  
Ack(m, m) =>
    n + 1                  if m = 0
    Ack(m-1, 1)            if n = 0
    Ack(m-1, Ack(m, n-1))  otherwise  
```  
  
* 작은 수를 입력해도 기하급수적인 재귀호출을 발생시킨다  
* 위와 같은 이유로 성능측정 등에 사용되는 경우가 있다  
* m이 4를 넘지 않도록 한다  
* 일반적인 시스템과 컴파일러에서는 Ack(4,3)만 넣어도 Stack Overflow를 발생시킬 수 있다  
  
<br>  
  
* 아래와 같은 형태로도 정의한다  
  
```
Ack(m, m) =>  
    2n                     if m = 0
     0                     if m >= 1, n = 0
     2                     if m >= 1, n = 1
    Ack(m-1, Ack(m, n-1))  otherwise m >= 1, n >= 2
```
  
<br>  
  
  
# 참고
* https://en.wikipedia.org/wiki/Ackermann_function  