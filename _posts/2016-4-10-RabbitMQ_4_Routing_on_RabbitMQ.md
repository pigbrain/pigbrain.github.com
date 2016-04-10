---
layout: post
category: OpenSource
title: RabbitMQ Routing
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Routing (using the Java Client)  
* [Publish/Subscribe](http://pigbrain.github.io/opensource/2016/04/09/RabbitMQ_3_Publish_Subscribe_on_RabbitMQ)에서는 모든 메세지를 수신했다  
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
  
* exchange X에 두개의 Queue(Q1, Q2)가 Binding 되어 있다  
	* 첫 번째 Queue의 routingKey는 orage이다  
	* 두 번째 Queue의 routingKeys느 black, green이다   
* routingKey를 orage로 설정하고 메세지를 publish 하면 Q1에 들어가진다  
* routingKey를 black 혹은 green으로 설정한 메세지는 Q2에 들어가지낟  
  
# Multiple bindings  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/Routing/direct-exchange-multiple.png" alt="">  
  
* 동일한 routingKey(black)로 두개의 Queue(Q1, Q2)에 Binding 하였다  
* routingKey가 black으로 설정된 메세지를 publish하면 fanout처럼 동작한다  
	* Q1,Q2에 메세지가 모두 전달 된다  
  
# Putting it all together  
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/Routing/python-four.png" alt="">  
  
### EmitLogDirect.java (Sending)  
	
	public class EmitLogDirect {

		private static final String EXCHANGE_NAME = "direct_logs";
		
		// argv -> info warning error .... 

		public static void main(String[] argv) throws java.io.IOException {
		
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			
			channel.exchangeDeclare(EXCHANGE_NAME, "direct");
			
			String severity = getSeverity(argv);
			String message = getMessage(argv);
			
			channel.basicPublish(EXCHANGE_NAME, 
			                       severity, 
			                       null, 
			                       message.getBytes());
			System.out.println(" [x] Sent '" + severity + "':'" + message + "'");
			
			channel.close();
			connection.close();
		}
		//..
	}  
  
### ReceiveLogsDirect.java (Receiving)
	
	import com.rabbitmq.client.*;

	import java.io.IOException;
	
	public class ReceiveLogsDirect {
	
		private static final String EXCHANGE_NAME = "direct_logs";
		
		public static void main(String[] argv) throws Exception {
		
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			
			channel.exchangeDeclare(EXCHANGE_NAME, "direct");
			String queueName = channel.queueDeclare().getQueue();
			
			if (argv.length < 1){
				System.err.println("Usage: ReceiveLogsDirect [info] [warning] [error]");
				System.exit(1);
			}
			
			for(String severity : argv){
				channel.queueBind(queueName, EXCHANGE_NAME, severity);
			}

			System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			
			Consumer consumer = new DefaultConsumer(channel) {
				@Override
				public void handleDelivery(String consumerTag, Envelope envelope,
				                     AMQP.BasicProperties properties, 
				                     byte[] body) throws IOException {
	
					String message = new String(body, "UTF-8");
					System.out.println(" [x] Received '" + envelope.getRoutingKey() + "':'" + message + "'");
				}
			};
			
			channel.basicConsume(queueName, true, consumer);
		}
	}  
	
	
<br>  
  

# 원문   
* http://next.rabbitmq.com/tutorials/tutorial-four-java.html
