---
layout: post
category: OpenSource  
title: Thrift Server Socket 
tagline: by Pigbrain  
tags: [Thrift]
---

<!--more-->
  
<img src="/assets/themes/Snail/img/OpenSource/Thrift/Server/server_socket.png" alt="">  
  
# TServerTransport  
* Thrift에는 2가지 종류의 서버소켓이 있다  
	* 기본적인 블록킹형태의 **TServerSocket**과 논블록킹 처리를위한 **TNonblockingServerSocket**이 있다  
	* 두 서버소켓 클래스는 추상클래스인 **TServerTransport**를 상속받고 있다  
* TServerTransport 클래스는 **listen**, **acceptImpl**, **close** 메서드를 하위 클래스에서 구현하도록 강제하고있다  

## AbstractServerTransportArgs  
* TServerTransport 클래스 내부에 정의되어있는 추상 클래스  
* **backlog**, **clientTimeout** 값을 셋팅할 수 있다  
	* clientTimeout은 `SO_TIMEOUT` 값으로 사용된다  
  
```
# TServerTransport.java 

public static abstract class AbstractServerTransportArgs<T extends AbstractServerTransportArgs<T>> {
	int backlog = 0; // A value of 0 means the default value will be used (currently set at 50)
	int clientTimeout = 0;
	InetSocketAddress bindAddr;

	public T backlog(int backlog) {
		this.backlog = backlog;
		return (T) this;
	}

	public T clientTimeout(int clientTimeout) {
		this.clientTimeout = clientTimeout;
		return (T) this;
	}
	
	...
}
```
  
# TServerSocket  
* 블록킹(Blocking) 소켓  
* accept를 블록시키기 위해 setSoTimeout에 0을 설정한다  
  
```
public void listen() throws TTransportException {
	if (serverSocket_ != null) {
		try {
			serverSocket_.setSoTimeout(0);
		} catch (SocketException sx) {
			LOGGER.error("Could not set socket timeout.", sx);
		}
	}
}
```  
  
* 블록킹 소켓에서 **SO_TIMEOUT**은 다음 동작들에 대하여 timeout을 셋팅한다  
	* ServerSocket.accept();  
	* SocketInputStream.read();  
	* DatagramSocket.receive();
  
  
# Thrift Source Code
* https://github.com/apache/thrift 

  
  
# 참고  
* http://docs.oracle.com/javase/7/docs/api/java/net/SocketOptions.html#SO_TIMEOUT  
