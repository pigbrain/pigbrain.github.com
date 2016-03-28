---
layout: post
category: Java
title: Fork and Join
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Concurrent Programming in Java Plain Old Threads  
* 일반적으로 자바에서의 Concurrent programming은 **java.lang.Thread**와 **java.lang.Runnabl**를 이용한다  
* Dead lock이 발생되지 않도록 하면서 잘못된 read/write가 발생하지 않도록 하기 위해 공유자원을 잘 관리해야한다  
* 기본적인 쓰레드 관련 코드는 아래에 있다  

		Thread thread = new Thread() { 
			@Override public void run() {
				System.out.println(">>> I am running in a separate thread!");
			}
		};

		thread.start();
		thread.join();
  
	* 메인쓰레드는 **join()**을 호출하여 생성된 쓰레드가 종료되길 기다리고 있는다  
		* 다른 쓰레드의 작업이 완료되는 것을 기다리고 있는다  
	* producer/consumer 패턴은 이와 비슷한 형태를 가지고 있다  
		* queue에 Task가 가득차 있드면 producer는 queue에 빈 공간이 생길때까지 대기해야한다  
		* consumer는 queue에 Task가 없다면 대기해야한다  
	* 동기화하여 Task를 처리하는 것은 Thread-safe 하지만 성능에 문제를 가져온다  
  
# Rich Primitives with the java.util.concurrent Packages  
* **java.util.concurrent**는 Java SE 5에서 처음 소개되었고 Java SE6에서 많은 부분이 개선되었다  


		import java.util.*;
		import java.util.concurrent.*;
		import static java.util.Arrays.asList;
		
		public class Sums {
		
			static class Sum implements Callable<Long> {
				private final long from;
				private final long to;
				Sum(long from, long to) {
					this.from = from;
					this.to = to;
				}
				
				@Override
				public Long call() {
					long acc = 0;
					for (long i = from; i <= to; i++) {
						acc = acc + i;
					}
					return acc;
				}
			}
			
			public static void main(String[] args) throws Exception {
				
				ExecutorService executor = Executors.newFixedThreadPool(2);
				List <Future<Long>> results = executor.invokeAll(asList(
					new Sum(0, 10), new Sum(100, 1_000), new Sum(10_000, 1_000_000)
				));
				
				executor.shutdown();
				
				for (Future<Long> result : results) {
					ystem.out.println(result.get());
				}                
			}    
		}

	* 2개의 쓰레드를 이용하는 executor를 이용한다  
	* **ExecutorService.invokeAll()**는 **Callable**인스턴스의 Collection을 받으며 그것들의 모든 작업이 처리될때까지 대기한다  
	* ExecutorService.invokeAll()는 **Future** 오브젝트들을 리스트 형태로 리턴한다  
		* Future 객체를 통하여 작업 완료 여부를 알 수 있다  
	


# 참고  
* http://www.oracle.com/technetwork/articles/java/fork-join-422606.html  
* 
