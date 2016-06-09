---
layout: post
category: OpenSource  
title: Thrift Server Architecture 
tagline: by Pigbrain  
tags: [Thrift]
---

<!--more-->
  
# Thrift Server Architecture
  
<img src="/assets/themes/Snail/img/OpenSource/Thrift/Server/server.png" alt="">  
  
## TSimpleServer  
  
	try {
		serverTransport_.listen();
	} catch (TTransportException ttx) {
		return;
	}
	
	...

	while (!stopped_) {
		...

		try {
			client = serverTransport_.accept();

			if (client != null) {
				processor = processorFactory_.getProcessor(client);
				inputTransport = inputTransportFactory_.getTransport(client);
				outputTransport = outputTransportFactory_.getTransport(client);
				inputProtocol = inputProtocolFactory_.getProtocol(inputTransport);
				outputProtocol = outputProtocolFactory_.getProtocol(outputTransport);

				...
				while (true) {
					if (eventHandler_ != null) {
						eventHandler_.processContext(connectionContext, inputTransport, outputTransport);
					}
				
					if(!processor.process(inputProtocol, outputProtocol)) {
						break;
					}
				}
			}
		} catch (...) {
			...
		}
	}
  
* 블록킹(Blocking)  
* 싱글 쓰레드  
* 주로 테스트 용도로 사용한다.  
* 클라이언트가 접속하면 접속이 끊기기 전까지는 다른 클라이언트와 연결을 하지 않는다. 접속 중인 클라이언트와 연결이 끊어지면 다른 클라이언트의 접속을 대기한다.  
  
### Example  
  
	int port = 7911;
	TServerSocket serverTransport = new TServerSocket(port);
	TServer server = new TSimpleServer(new TSimpleServer.Args(serverTransport).processor(processor));
	server.serve();
  
## TThreadPoolServer  
	
	try {
		serverTransport_.listen();
	} catch (TTransportException ttx) {
		return;
	}
	
	...	
	
	while (!stopped_) {
		try {
			TTransport client = serverTransport_.accept();
			WorkerProcess wp = new WorkerProcess(client);
			...
			while(true) {
				try {
					executorService_.execute(wp);
					break;
				} catch(Throwable t) {
					...
				}
			}
		} catch (...) {
			...
		}
	}
	
* 블록킹(Blocking)  
* 멀티 쓰레드  
* 클라이언트 당 하나의 쓰레드를 할당한다. 별다른 설정이 없다면 ExecutorService 객체를 생성할때 쓰레드의 최소 개수는 5개, 최대 개수는 Integer.MAX_VALUE 값으로 설정된다.
  
### Example  
  
	int port = 7911;
	TServerSocket serverTransport = new TServerSocket(port);
	TServer server = new TThreadPoolServer(new TThreadPoolServer.Args(serverTransport).processor(processor));
	server.serve();
  
## TNonblockingServer  
	
	// Accept, Read, Write 처리를 위한 쓰레드를 생성한다  
	selectAcceptThread_ = new SelectAcceptThread((TNonblockingServerTransport)serverTransport_);
	selectAcceptThread_.start();
	
	// SelectAcceptThread.run()
	public void run() {
		try {
			...
			while (!stopped_) {
				select();
				processInterestChanges();
			}
			...
		} catch (Throwable t) { 
			...
		} finally {
			...
		}	
	}
	
	private void select() {
		try {
			// wait for io events.
			selector.select();
			
			Iterator<SelectionKey> selectedKeys = selector.selectedKeys().iterator();
			while (!stopped_ && selectedKeys.hasNext()) {
				SelectionKey key = selectedKeys.next();
				selectedKeys.remove();
				
				// skip if not valid
				if (!key.isValid()) {
					cleanupSelectionKey(key);
					continue;
				}
				if (key.isAcceptable()) {
					handleAccept();
				} else if (key.isReadable()) {
					// deal with reads
					handleRead(key);
				} else if (key.isWritable()) {
					// deal with writes
					handleWrite(key);
				} else {
					LOGGER.warn("Unexpected state in select! " + key.interestOps());
				}
			}
		} catch (...) {
			...
		}
	}
	
* 논블록킹(Non-Blocking)  
* 멀티 쓰레드  
* NIO 채널을 이용하여 구현  
* TFramedTransport를 이용해야 한다  
* Accept, Read, Write 처리를 하기 위한 쓰레드를 생성하고 Selector를 이용하여 IO를 관리한다  
  
### Example  
  
	int port = 7911;
	TNonblockingServerSocket serverSocket = new TNonblockingServerSocket(port);
	TServer server = new TNonblockingServer(new TNonblockingServer.Args(serverSocket).processor(processor));
	server.serve();
    
## THsHaServer  
  
	// 기본적인 구현은 TNonblockingServer과 동일하다
	// 데이터 수신이 완료 되었을때 다른 쓰레드를 통하여 처리한다 
	protected void handleRead(SelectionKey key) {
		FrameBuffer buffer = (FrameBuffer) key.attachment();
		if (!buffer.read()) {
			cleanupSelectionKey(key);
			return;
		}	

		// if the buffer's frame read is complete, invoke the method.
		if (buffer.isFrameFullyRead()) {
			if (!requestInvoke(buffer)) {
				cleanupSelectionKey(key);
			}
		}
	}
	...
	@Override
	protected boolean requestInvoke(FrameBuffer frameBuffer) {
		// invoker는 ExecutorService 인스턴스다 
		try {
			Runnable invocation = getRunnable(frameBuffer);
			invoker.execute(invocation);
			return true;
		} catch (RejectedExecutionException rx) {
			LOGGER.warn("ExecutorService rejected execution!", rx);
			return false;
		}
	}
  

* TNonblockingServer를 상속받아 구현  
* Half-Sync/Half-Async 방식으로 쓰레드 관리  
  
### Example  
  
	int port = 7911;
	TNonblockingServerSocket serverSocket = new TNonblockingServerSocket(port);
	TServer server = new THsHaServer(new THsHaServer.Args(serverSocket).processor(processor));
	server.serve();
    
## TThreadedSelectorServer  
  
### Example  
    
# Thrift Source Code
* https://github.com/apache/thrift 

  
  


