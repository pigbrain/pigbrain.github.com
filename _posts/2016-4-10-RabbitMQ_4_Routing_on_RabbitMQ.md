---
layout: post
category: OpenSource
title: RabbitMQ Routing
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Routing (using the Java Client)  
* [Publish/Subscribe](http://pigbrain.github.io/opensource/2016/04/08/RabbitMQ_Publish_Subscribe_on_RabbitMQ)에서는 모든 메세지를 수신했다  
* Routing 기능을 이용하여 특정 메세지만 수신가능하도록 변경할 것이다  
  
# Bindings  
	
	channel.queueBind(queueName, EXCHANGE_NAME, "");
  
* Binding은 Exchange와 Queue와의 관계를 설정하는 것이다  
	* Queue는 이 Exchange가 주는 메세지만 수신한다는 것으로 볼 수 있다  
* queueBind 메소드는 routingKey 파라미터를 가질수 있다  

		channel.queueBind(queueName, EXCHANGE_NAME, "black"); // routingKey : "black"  
	
* routingKey는 exchange Type에 영향을 받는다  
	* **fanout으로 설정할 경우 routingKey 설정은 무시된다**  
  
# Direct exchange  
* **direct** exchange의 원리는 단순하다  
	* routingKey와 매칭되는 메세지만 전달한다  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/Routing/direct-exchange.png" alt="">  
  
	* exchange X에 2개의 Queue(Q1, Q2)가 Binding 되어 있다  
		* 첫 번째 Queue의 routingKey는 orage이다  
		* 두 번째 Queue의 routingKeys느 black, green이다   
	* routingKey를 orage로 설정하고 메세지를 publish 하면 Q1에 들어가진다  
	* routingKey를 black 혹은 green으로 설정한 메세지는 Q2에 들어가지낟  
  
<br>  
  

# 원문   
* http://next.rabbitmq.com/tutorials/tutorial-three-java.html  
