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
* 메세지 하나를 보내는 Producer와 그것을 받아서 출력하는 Consumer를 만든다  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/python-one.png" alt="">  
  
* 여러 언어에 대한 클라이언트 라이브러리는 [이곳](http://www.rabbitmq.com/devtools.html)에서 다운로드 가능하다  
  
### Sending  

	...  
	import com.rabbitmq.client.ConnectionFactory;
	import com.rabbitmq.client.Connection;
	import com.rabbitmq.client.Channel;
	...
	public class Send {  

		private final static String QUEUE_NAME = "hello";
		
		public static void main(String[] argv) throws java.io.IOException {
			
			// RabbitMQ 커넥션 생성
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost"); // 서버 호스트 입력 
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			
			// 메세지를 전송하기 위해 큐를 선언한다  
			// 큐는 멱등성을 갖는다  
			// 큐가 존재하지 않으면 생성한다  
			channel.queueDeclare(QUEUE_NAME, false, false, false, null);
			
			// 메세지 전송
			String message = "Hello World!";
			channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
			
			System.out.println(" [x] Sent '" + message + "'");
			
			// 채널과 커넥션을 종료한다   
			channel.close();
    		connection.close();
		}
	}
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/sending.png" alt="">  
  
* Sender는 RabbitMQ에 메세지를 하나 보내고 종료한다  
* 메세지 전송 과정에서 오류가 발생한다면 디스크 용량을 확인해본다  
	* 최소 1Gb가 필요하도록 기본 설정으로 된다  
	* 설정 정보는 [이곳](http://www.rabbitmq.com/configure.html#config-items)에서 확인 가능하다  
* 
### Receiving  
	
	...
	import com.rabbitmq.client.ConnectionFactory;
	import com.rabbitmq.client.Connection;
	import com.rabbitmq.client.Channel;
	import com.rabbitmq.client.Consumer;
	import com.rabbitmq.client.DefaultConsumer;
	
	public class Recv {

		private final static String QUEUE_NAME = "hello";
		
		public static void main(String[] argv)
				throws java.io.IOException, java.lang.InterruptedException {	
		
		// RabbitMQ 커넥션 생성
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		
		// 메세지를 전송하기 위해 큐를 선언한다  
		// 큐는 멱등성을 갖는다  
		// 큐가 존재하지 않으면 생성한다  
		channel.queueDeclare(QUEUE_NAME, false, false, false, null);
		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
		
		// 큐에 메세지가 들어올 경우 handleDelivery가 호출된다  
		Consumer consumer = new DefaultConsumer(channel) {
				@Override
				public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
								throws IOException {
					String message = new String(body, "UTF-8");
					System.out.println(" [x] Received '" + message + "'");
				}
		};
		
		channel.basicConsume(QUEUE_NAME, true, consumer);
	}
  
<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/IntroductionAndHelloWorld/receiving.png" alt="">  
  
* Sender의 큐 이름과 동일하게 해야한다  
* Consumer는 큐에 데이터가 들어올 경우 비동기로 데이터를 수신하기 위해 사용한다    
  
<br>  
  
# 참고  
* http://next.rabbitmq.com/tutorials/tutorial-one-java.html  
