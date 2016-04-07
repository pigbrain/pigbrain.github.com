---
layout: post
category: OpenSource
title: Introduction and "Hello World!"
tagline: by Pigbrain
tags: [RabbitMQ]
---

<!--more-->

# Introduction
* Rabbit MQ는 메세지 브로커(Message Broker)이다  
* 메세지를 받아서 전달하는 역할을 한다  
* 몇 가지 용어를 사용한다  
	* Producing  
		* 메세지 전송을 의미  
		* 메세지 전송하는 주최를 Producer라고 한다  
		* **P** 로 표시  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/producer.png" alt="">
  
	* Queue  
		* RabbitMQ 내부에 생성되어 관리된다  
		* 메세지는 Queue에 저장된다  
		* Queue에는 한정된 버퍼의 크기까지 메세지를 넣을 수 있다  
		* 아래와 같이 표시  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/queue.png" alt="">
  
	* Consuming  
		* 메시지 수신을 의미  
		* 메세지를 수신하는 주최를 Consumer라고 한다  
		* **C**로 표시  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/consumer.png" alt="">
  
<br>  
  
# "Hello World (using the Java Client)"  

  
<br>  
  
# 참고  
* http://next.rabbitmq.com/tutorials/tutorial-one-java.html  
