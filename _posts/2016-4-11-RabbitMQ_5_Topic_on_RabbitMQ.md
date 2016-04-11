---
layout: post
category: OpenSource
title: RabbitMQ Topics
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Topics (using the Java Client)  
* fanout 대신 direct를 사용하면 메세지를 선택적으로 수신할 수 있다  
* direct는 정해진 routingKey에 매칭되는 메세지만 수신가능 하다  
	* routingKey를 하나만 지정 가능하다  
* topic은 여러 routingKey 조건을 설정 가능하다  
  
# Topic exchange  
* topic exchange로 publish하고자 하는 메세지의 routingKey는 특정 포맷을 지켜야한다  
	* routingKey는 단어들의 리스트 형태여야 한다  
	* 단어는 **.**으로 구분된다  
	* Example  
		* stock.usd.nyse  
		* nyse.vmw  
		* quick.orange.rabbit  
	* **255bytes**까지 routingKey로 단어들을 등록 가능하다  
* topic exchange는 direcet exchange와 동작 방식이 유사하다  
	* routingKey를 기준으로 매칭되는 Queue에만 메세지를 전송한다  
* topic exchange의 routingKey에 사용되는 2가지 문자는 다음과 같다  
	* **＊(star)** : 한 단어와 매칭된다  
	* **#(hash)** : 공백 혹은 여러개의 단어와 매칭된다  
* routingKey로 **#**만 지정해 놓으면 모든 메세지를 수신한다  
	* fanout과 동일하게 동작한다  
* routingKey로 **＊**, **#** 둘다 지정하지 않으면 특정 메세지만 수신한다  
	* direct와 동일하게 동작한다  

### Example  
* 동물을 묘사한 메세지를 전송하는 것으로 예를 든다  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/Topics/python-five.png" alt="">  

* routingKey는 "<speed>.<colour>.<species>" 형태로 지정한다 
	* Q1에는 *.orange.*로 binding 되어있다  
		* Q1은 orange색의 동물에 대한 메세지만 수신한다  
	* Q2에는 *.*.rabbit과 lazy.# 로 binding 되어 있다  
		* Q2는 rabbit에 관한 모든 메세지를 수신한다  
		* lazy 속성을 갖는 동물에대한 모든 메세지를 수신한다  
* routingKey : quick.orange.rabbit 메세지는 Q1과 Q2에 모두 전달된다  
* routingKey : lazy.orange.elephant 메세지는 Q1과 Q2에 모두 전달된다  
* routingKey : quick.orange.fox 메세지는 Q1에만 전달된다  
* routingKey : lazy.brown.fox 메세지는 Q2에만 전달된다  
* routingKey : quick.brown.fox 메세지는 어떠한 Queue에도 매칭되지 않는다. 이 메세지는 버려진다  
* routingKey : quick.orange.male.rabbit 메세지는 4개의 단어로 구성되어 매칭되지 않는다. 이 메세지는 버려진다  
* routingKey : lazy.orange.male.rabbit 메세지는 4개의 단어로 구성되지만 Q2에 매칭될 수 있다. Q2로 전달된다  
  

# Putting it all together  
  
### EmitLogTopic.java (Sending)  
	
	public class EmitLogTopic {

		private static final String EXCHANGE_NAME = "topic_logs";
		
		// argv -> "kern.critical" "A critical kernel error"
	
		public static void main(String[] argv) throws Exception {
		
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
		
			channel.exchangeDeclare(EXCHANGE_NAME, "topic");
			
			String routingKey = getRouting(argv);
			String message = getMessage(argv);
			
			channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes());
			System.out.println(" [x] Sent '" + routingKey + "':'" + message + "'");
			
			connection.close();
		}
		//...
	}
  
### ReceiveLogsTopic.java (Receiving)
	
	import com.rabbitmq.client.*;
	
	import java.io.IOException;
	
	public class ReceiveLogsTopic {
		
		private static final String EXCHANGE_NAME = "topic_logs";
		
		// argv -> "kern.*" // "*.critical" // "kern.*" "*.critical" // "kern.critical" "A critical kernel error"
		
		public static void main(String[] argv) throws Exception {
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			
			channel.exchangeDeclare(EXCHANGE_NAME, "topic");
			String queueName = channel.queueDeclare().getQueue();
			
			if (argv.length < 1) {
				System.err.println("Usage: ReceiveLogsTopic [binding_key]...");
				System.exit(1);
			}
			
			for (String bindingKey : argv) {
				channel.queueBind(queueName, EXCHANGE_NAME, bindingKey);
			}
			
			System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			
			Consumer consumer = new DefaultConsumer(channel) {
				@Override
				public void handleDelivery(String consumerTag, Envelope envelope,
					AMQP.BasicProperties properties, byte[] body) throws IOException {
					String message = new String(body, "UTF-8");
					System.out.println(" [x] Received '" + envelope.getRoutingKey() + "':'" + message + "'");
				}
			};
	
			channel.basicConsume(queueName, true, consumer);
		
		}
	}
	
<br>  
  

# 원문   
* http://next.rabbitmq.com/tutorials/tutorial-five-java.html  
