---
layout: post
category: OpenSource
title: RabbitMQ Work Queues
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Work Queues (using the Java Client)  

<img src="/assets/themes/Snail/img/OpenSource/RabbitMQ/WorkQueues/python-two.png" alt="">  
  
* 여러 클라이언트들(Workers)간에 시간 소모가 큰 작업을 분배하기 위해 **Work Queue**를 생성한다  
* **Work Queue**는 리소스가 많이 소모되는 작업을 실행하고 완료될때까지 기다리는 것을 피하기위해 사용한다  
	* 나중에 수행되어야 할 작업들을 위해 스케쥴링 되어야 한다  
* Task를 메세지 형태로 감싸서 큐에 넣어야 한다  
* Work Queue는 특별한 타입의 Queue가 아니며 단지 Task를 분배하기 위한 용도로 쓰기때문에 Work Queue라고 부른다  
  
  
# Preparation  
  
### Sender  
  
	...
	String message = getMessage(argv);

	channel.basicPublish("", "hello", null, message.getBytes());
	
	System.out.println(" [x] Sent '" + message + "'");
	
	private static String getMessage(String[] strings){
		if (strings.length < 1)
			return "Hello World!";
		return joinStrings(strings, " ");
	}

	private static String joinStrings(String[] strings, String delimiter) {
		int length = strings.length;
		
		if (length == 0) return "";
		StringBuilder words = new StringBuilder(strings[0]);

		for (int i = 1; i < length; i++) {
			words.append(delimiter).append(strings[i]);
		}

		return words.toString();
	}
	...
  
* "Hello..." 처럼 "."을 붙여서 메세지를 Publish 한다  
	* Consumer에서는 **.(Dot)**의 수만큼 sleep을 한다  
		* "Hello..."은 3초를 sleep한게 된다  
  
### Worker  
  
	... 
	final Consumer consumer = new DefaultConsumer(channel) {
		
		@Override
		public void handleDelivery(String consumerTag, 
		                                Envelope envelope, 
		                                AMQP.BasicProperties properties, 
		                                byte[] body) throws IOException {  
			
			String message = new String(body, "UTF-8");

			System.out.println(" [x] Received '" + message + "'");
			try {
				doWork(message);
			} finally {
				System.out.println(" [x] Done");
			}
		}
	};

	channel.basicConsume(TASK_QUEUE_NAME, true, consumer);
	
	...  
	
	private static void doWork(String task) throws InterruptedException {
		for (char ch: task.toCharArray()) {
			if (ch == '.') Thread.sleep(1000);
		}
	}  
  
* 메세지를 꺼내와 "."수만큼 Sleep을 한다   
  
  
# Round-robin dispatching  
* Work Queue를 운영하는 것은 Task 처리를 쉽게 병렬화 할 수 있는 장점이 있다  
* 확장을 하기 위해서는 Worker들을 추가하기만 하면된다  
* 기본적으로 RabbitMQ는 각각의 메세지를 순차적으로 돌아가면서 consumer에게 전달한다  
* 평균적으로 모든 Consumer는 동일한 수의 메세지를 받게 된다  
  
# Message acknowledgment  
* Consumer가 Task를 일부만 처리하고 죽을 수도 있다  
	* Task를 Queue에서 꺼내갔으나 처리를 완료하지 못했다  
* RabbitMQ는 Queue에서 꺼내준 메세지는 메모리에서 삭제할 것이다  
* Consumer에서 처리되지 못한 메세지는 복구가 불가능하게 된다  
  
<br>  
  
* RabbitMQ는 메세지 유실을 방지하기 위해 **ack(acknowledgments)** 기능을 제공한다  
* RabbitMQ가 Consumer로 부터 ack를 받을 때만 메세지를 삭제(메모리 해제)한다  
* ack를 보내지 않고 Consumer가 종료되거나(채널이 닫히거나, 연결이 끊기거나)하면 RabbitMQ는 해당 메세지를 다시 Queue에 넣는다  
* RabbitMQ는 ack 수신에 대한 Timeout 기능을 제공하지는 않는다  
	* Task처리에 매우 오랜 시간이 걸리더라도 문제되지 않는다  
	* Consumer가 죽는 상황에서만 다른 Worker에게 재전송을 시도한다  
* 기본으로 메세지 ack설정은 true이다  
* **channel.basicAck**을 호출하여 ack설정을 명시적으로 변경 할 수 있다  
		
		final Consumer consumer = new DefaultConsumer(channel) {
			@Override
			public void handleDelivery(String consumerTag, 
									Envelope envelope, 
									AMQP.BasicProperties properties, 
									byte[] body) throws IOException {
				String message = new String(body, "UTF-8");

				System.out.println(" [x] Received '" + message + "'");
				try {
					doWork(message);
				} finally {
					System.out.println(" [x] Done");
					channel.basicAck(envelope.getDeliveryTag(), true);
				}
			}
		};
  
* finally 부분에 channel.basicAck를 추가했다  
	* true일 경우 ack를 전송한다  
* ack를 수신하지 못한 메세지들에 대한 상태를 조회하기 위해서는 아래와 같은 명령어로 확인 가능하다  
		
		./rabbitmqctl list_queues name messages_ready messages_unacknowledged  
  
# Message durability  
* Consumer가 죽는 경우에 대해서는 ack 기능을 활용하여 메세지 유실을 막을 수 있었다  
* RabbitMQ서버 자체가 죽는 경우 Queue와 메세지들은 사라지게 될 것이다  
  
<br>  
  
* RabbitMQ서버가 죽을때 Queue가 사라지는 것을 막기 위해 **durable** 속성을 활성화 해야한다  
	* 동일한 이름의 Queue가 생성되어있는 상태에서 **다르게** 파라미터를 넣을 경우 오류가 발생한다  
	
		boolean durable = true;
		channel.queueDeclare(QUEUE_NAME, durable, false, false, null);  
  
* RabbitMQ서버가 죽을때 메세지 유실을 방지하기 위해서는 메세지에 **MessageProperties.PERSISTENT_TEXT_PLAIN** 속성을 줘야한다  
		
		channel.basicPublish("", QUEUE_NAME,
		                         MessageProperties.PERSISTENT_TEXT_PLAIN,
		                         message.getBytes());
  
### Note on message persistence  
* MessageProperties.PERSISTENT_TEXT_PLAIN 속성을 주더라도 메세지의 영속성을 완벽하게 보장하진 못한다  
* RabbitMQ가 메세지를 디스크에 쓰긴 하지만 Producer로 부터 메세지를 받고 저장하기전까지의 짧은 틈이 존재한다  
* RabbitMQ는 모든 메세지를 **fsync**를 이용하여 디스크에 기록하지 않는다  
	* 메세지는 디스크에 바로 기록되는 것이 아닌 캐쉬에 우선 기록 된다  
* 영속성을 더욱 보장하고 싶다면 [Publisher Confirms](https://www.rabbitmq.com/confirms.html)를 고려해볼 수 있다  
  
# Fair dispatch  
* 2개의 Worker가 있다고 가정한다  
* 짝수번째 Task는 처리하는데 오래 걸리고 홀수번째 Task는 처리하는데 짧게 걸린다고 가정한다  
* 하나의 Worker는 매우 바쁘게 Task를 처리해야하고 다른 Worker는 쉬엄쉬엄 일을 처리하게된다  
	* RabbitMQ는 메세지를 순차적으로 나누어주기때문에 위와 같은 현상이 발생하게 된다  
* RabbitMQ는 N번째 메세지는 N번째 Consumer에게 전달한다  
  
<br>  
  
* 위 현상을 해결하기 위해서는 **basicQos**메소드를 이용해야한다  
* **basicQos**에 **1**을 넣게 되면  RabbitMQ는 Worker에게 한번에 하나의 Task만 할당한다  
* Task 처리 후 ack를 보낼때까지 새로운 Task를 할당하지 않는다  
		
		int prefetchCount = 1;
		channel.basicQos(prefetchCount);
		
# Putting it all together  
  
### NewTask.java (Sending)  
  
	import java.io.IOException;
	import com.rabbitmq.client.ConnectionFactory;
	import com.rabbitmq.client.Connection;
	import com.rabbitmq.client.Channel;
	import com.rabbitmq.client.MessageProperties;
	
	public class NewTask {

	private static final String TASK_QUEUE_NAME = "task_queue";
	
		public static void main(String[] argv) throws java.io.IOException {
	
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
	
			channel.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
			
			String message = getMessage(argv);
			
			channel.basicPublish("", TASK_QUEUE_NAME,
			                     MessageProperties.PERSISTENT_TEXT_PLAIN,
			                     message.getBytes());
	
			System.out.println(" [x] Sent '" + message + "'");
	
			channel.close();
			connection.close();
		}      

		//...
	}
  
### Worker.java (Receiving)  
	
	import com.rabbitmq.client.*;
	import java.io.IOException;
	
	public class Worker {
		private static final String TASK_QUEUE_NAME = "task_queue";
	
		public static void main(String[] argv) throws Exception {
			ConnectionFactory factory = new ConnectionFactory();
			factory.setHost("localhost");
			final Connection connection = factory.newConnection();
			final Channel channel = connection.createChannel();

			channel.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
			System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			
			channel.basicQos(1);
			
			final Consumer consumer = new DefaultConsumer(channel) {
				@Override
				public void handleDelivery(String consumerTag, 
				                          Envelope envelope, 
				                          AMQP.BasicProperties properties, 
				                          byte[] body) throws IOException {
				
					String message = new String(body, "UTF-8");

					System.out.println(" [x] Received '" + message + "'");
				
					try {
						doWork(message);
					} finally {
						System.out.println(" [x] Done");
						channel.basicAck(envelope.getDeliveryTag(), false);
					}
				}
			};
			
			channel.basicConsume(TASK_QUEUE_NAME, false, consumer);
		}
		
		private static void doWork(String task) {
			
			for (char ch : task.toCharArray()) {
				if (ch == '.') {
					try {
						Thread.sleep(1000);
					} catch (InterruptedException _ignored) {
						Thread.currentThread().interrupt();
					}
				}
			}
		}
	}  
    
<br>  
  
# 원문   
* http://next.rabbitmq.com/tutorials/tutorial-two-java.html  
