---
layout: post
category: Network
title: HTTP/2
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# Hypertext Transfer Protocol Version 2 (HTTP/2)
  
## Abstract
* HTTP/2 enables a more efficient use of network resources and a reduced perception of latency 
	* header field compression 
	* multiple concurrent exchanges on the same connection  
* This specification is an alternative the HTTP/1.1 message syntax   
	* HTTP's existing semantics remain unchanged  
  
<br>  
  
## 1. Introduction
### HTTP 1.x
* HTTP/1.0 allowed only one request at a time on a given TCP connection  
* HTTP/1.1 added request pipelining
	* partially addressed request concurrency  
	* **head-of-line blocking**  
* HTTP/1.0 and HTTP/1.1 clients that need to make many requests use multiple connections to a server in order to achieve concurrency and thereby reduce latency  
* HTTP header fields are often repetitive and verbose, causing unnecessary network traffic   

### HTTP/2
* HTTP/2 allows interleaving of **request and response messages on the same connection**    
* HTTP/2 uses an efficient coding for HTTP header fields   
* HTTP/2 allows **prioritization of requests**    
	* letting more important requests complete more quickly, further improving performance   
* HTTP/2 enables more efficient processing of messages through use of **binary message framing**  
  
<br>  

## 2. HTTP/2 Protocol Overview
* HTTP/2 supports all of the core features of HTTP/1.1 but aims to be more efficient in several ways  
* The basic protocol unit is a **frame**     
	* Each frame type serves a different purpose  
		* HEADERS and DATA frames form the basis of HTTP requests and responses  
		* SETTINGS, WINDOW_UPDATE, PUSH_PROMISE are used in support of other HTTP/2 features  
* **Multiplexing of requests** is achieved by having each HTTP request/response exchange associated with its own **stream**  
* **Flow control** and **prioritization** ensure that it is possible to efficiently use multiplexed streams  
	* Flow control helps to ensure that only data that can be used by a receiver is transmitted  
	* Prioritization ensures that limited resources can be directed to the most important streams first  
* Server can push responses to a client  
	* **Server push** allows a server to send data to a client that the server anticipates the client will need 
* HTTP header fields used in a connection can contain large amounts of redundant data  
	* frames contain them that are compressed  
  
<br>  

## 3. Starting HTTP/2  
* HTTP/2 connection is an **application-layer protocol** running **on top of a TCP connection**  
* HTTP/2 uses the same `http` and `https` URI schemes used by HTTP/1.1  
* HTTP/2 shares the same default port numbers: 80 for `http` URIs and 443 for `https` URIs  
  
  
### 3.1 HTTP/2 Version Identification  
* The string `h2` identifies the protocol where HTTP/2 uses **Transport Layer Security** (TLS)  
* The string `h2c` identifies the protocol where HTTP/2 is run over cleartext TCP  
  
  
### 3.2 Starting HTTP/2 for "http" URIs  
* A client that makes a request for an `http` URI without prior knowledge about support for HTTP/2  
* The client does so by making an HTTP/1.1 request that includes an Upgrade header field with the `h2c` token  

	```
	GET / HTTP/1.1
	Host: server.example.com
	Connection: Upgrade, HTTP2-Settings
	Upgrade: h2c
	HTTP2-Settings: <base64url encoding of HTTP/2 SETTINGS payload>
	
	```
* A server that does not support HTTP/2 can respond to the request as though the Upgrade header field were absent   

	```
	HTTP/1.1 200 OK
	Content-Length: 243
	Content-Type: text/html

	...
	```

* A server that supports HTTP/2 accepts the upgrade with a 101 (Switching Protocols) response  

	```
	HTTP/1.1 101 Switching Protocols
	Connection: Upgrade
	Upgrade: h2c
	
	[ HTTP/2 connection ...

	```
	* The HTTP/1.1 request that is sent prior to upgrade is assigned a stream identifier of 1 with default priority values  
	* Stream 1 is implicitly `half-closed` from the client toward the server since the request is completed as an HTTP/1.1 request
	* After commencing the HTTP/2 connection, stream 1 is used for the response  

	

	

 	 



  
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview