---
layout: post
category: OpenSource
title: Work Queues
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Work Queues (using the Java Client)  

<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/WorkQueues/python-two.png" alt="">  
  
* 여러 클라이언트들(Workers)간에 시간 소모가 큰 작업을 분배하는 **Work Queue**를 생성할 것이다  
* **Work Queue**는 리소스가 많이 소모되는 작업을 실행하고 완료될때까지 기다리는 것을 피하는 것을 목표로 한다  
	* 나중에 수행되어야 할 작업들을 위해 스케쥴링 되어야 한다  
* Task를 메세지 형태로 감싸서 큐에 넣어야 한다  

<br>  
  
# 참고  
* http://next.rabbitmq.com/tutorials/tutorial-one-java.html  
