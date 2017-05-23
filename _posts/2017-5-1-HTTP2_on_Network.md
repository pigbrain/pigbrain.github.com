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
* The string `
* ` identifies the protocol where HTTP/2 uses **Transport Layer Security** (TLS)  
* The string `h2c` identifies the protocol where HTTP/2 is run over cleartext TCP  
  
  
### 3.2 Starting HTTP/2 for "http" URIs  
* A client that makes a request for an `http` URI without prior knowledge about support for HTTP/2  
* The client does so by making an HTTP/1.1 request that includes an Upgrade header field with the `h2c` token  
* A request that upgrades from HTTP/1.1 to HTTP/2 include exactly one HTTP2-Settings header field  
	* A server not upgrade the connection to HTTP/2 if this header field is not present or if more than one is present  
	
  
  
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
	* After the empty line that terminates the 101 response, the server can begin sending HTTP/2 frames  
	* These frames include a response to the request that initiated the upgrade  

	```
	HTTP/1.1 101 Switching Protocols
	Connection: Upgrade
	Upgrade: h2c
	
	[ HTTP/2 connection ...

	```
	* The first HTTP/2 frame sent by the server be a server connection preface consisting of a SETTINGS frame   
	* The HTTP/1.1 request that is sent prior to upgrade is assigned a stream identifier of 1 with default priority values  
		* Stream 1 is implicitly `half-closed` from the client toward the server since the request is completed as an HTTP/1.1 request
	* After commencing the HTTP/2 connection, stream 1 is used for the response  

	
### 3.3 Starting HTTP/2 for "https" URIs  
* A client that makes a request to an "https" URI uses TLS with the application-layer protocol negotiation (ALPN) extension [TLS-ALPN]  	
* HTTP/2 over TLS uses the `h2` protocol identifier  
* **The `h2c` protocol identifier must not be sent by a client. It is selected by a server**  
  
### 3.4 Starting HTTP/2 with Prior Knowledge  
* A client can learn that a particular server supports HTTP/2  
	*  [ALT-SVC](https://tools.ietf.org/html/draft-ietf-httpbis-alt-svc-06) describes a mechanism for advertising this capability.
* A client send the connection preface and immediately send HTTP/2 frames to such a server. Likewise, the server MUST send a connection preface  
	* This only affects the establishment of HTTP/2 connections over cleartext TCP  
	* Implementations that support HTTP/2 over TLS must use protocol negotiation in TLS [TLS-ALPN]  
  
### 3.5 HTTP/2 Connection Preface 	 
* Each endpoint is required to send a connection preface as a final confirmation of the protocol in use and to establish the initial settings for the HTTP/2 connection  
	* The client and server each send a different connection preface
* The client connection preface starts with a sequence of 24 octets  
	
	```
	0x505249202a20485454502f322e300d0a0d0a534d0d0a0d0a  
	```
* The client sends the client connection preface immediately upon receipt of a 101 (Switching Protocols) response (indicating a successful upgrade) or as the first application data octets of a TLS connection  
* If starting an HTTP/2 connection with prior knowledge of server support for the protocol, the client connection preface is sent upon connection establishment   
* To avoid unnecessary latency, clients are permitted to send additional frames to the server immediately after sending the client connection preface, without waiting to receive the server connection preface  
* Clients and servers treat an invalid connection preface as a connection error of type `PROTOCOL_ERROR`  
	* A `GOAWAY` frame may be omitted in this case since an invalid preface indicates that the peer is not using HTTP/2  
  
## 4. HTTP Frames  
* Once the HTTP/2 connection is established, endpoints can begin exchanging frames  
  
### 4.1 Frame Format  
* frame =  header(72 bytes) + variable-length payload  

	```
	 +-----------------------------------------------+
	 ⎢                 Length (24)                   ⎢
	 +---------------+---------------+---------------+
	 ⎢   Type (8)    ⎢   Flags (8)   ⎢
	 +-+-------------+---------------+-------------------------------+
	 ⎢R⎢                 Stream Identifier (31)                      ⎢
	 +=+=============================================================+
	 ⎢                   Frame Payload (0...)                      ...
	 +---------------------------------------------------------------+
	```
  
* Length 
	* **The length of the frame payload** expressed as an unsigned 24-bit integer
	* Values greater than 2^14 (16,384) must not be sent unless the receiver has set a larger value for `SETTINGS_MAX_FRAME_SIZE`  
* Type  
	* The frame type determines the format and semantics of the frame  
	* Implementations must ignore and discard any frame that has a type that is unknown  
	* The structure and content of the frame payload is dependent entirely on the frame type
* Flags  
	* Flags are assigned semantics specific to the indicated frame type  
	* Flags that have no defined semantics for a particular frame type must be ignored  
* R
	* reserved 1-bit field  
	* undefined	  
		* Bit must remain unset (0x0) when sending and must be ignored when receiving  
* Stream Identifier  
	* The value 0x0 is reserved for frames that are associated with the connection as a whole as opposed to an individual stream  
  
### 4.2 Frame Size  
* The size of a frame payload is limited by the maximum size that a receiver advertises in the `SETTINGS_MAX_FRAME_SIZE` setting  
* `SETTINGS_MAX_FRAME_SIZE` setting can have any value between 2^14 (16,384) and 2^24-1 (16,777,215)  
* All implementations must be capable of receiving and minimally processing frames up to 2^14 in length, plus the frame header(72 bytes)  
	* The size of the frame header is not included when describing frame sizes  
	* Certain frame types, such as `PING`, impose additional limits on the amount of payload data allowed  
  
### 4.3 Header Compression and Decompression  
* Just as in HTTP/1, a header field in HTTP/2 is a name with one or more associated values  
* Header fields are used within HTTP request and response messages as well as in server push operations  
* When transmitted over a connection, a header list is serialized into a header block using HTTP header compression  
* The serialized header block is divided into one or more octet sequences, called header block fragments, and transmitted within the payload of `HEADERS`, `PUSH_PROMISE`, or `CONTINUATION` frames  
	* These frames carry data that can modify the compression context maintained by a receiver    
* A receiving endpoint reassembles the header block by concatenating its fragments and then decompresses the block to reconstruct the header list  
* A decoding error in a header block MUST be treated as a connection error of type `COMPRESSION_ERROR`
   
## 5. Streams and Multiplexing
* A `stream` is an independent, bidirectional sequence of frames exchanged between the client and server within an HTTP/2 connection  
	* A single HTTP/2 connection can contain multiple concurrently open streams   
	* Streams can be established and used unilaterally or shared by either the client or server  
	* Streams can be closed by either endpoint  
	* The order in which frames are sent on a stream is significant  
		* Recipients process frames in the order they are received   
	* Streams are identified by an integer. Stream identifiers are assigned to streams by the endpoint initiating the stream   
   
### 5.1 Stream States

```
                             +--------+
                     send PP ⎢        ⎢ recv PP
                    ,--------⎢  idle  ⎢--------.
                   /         ⎢        ⎢         \
                  v          +--------+          v
           +----------+          ⎢           +----------+
           ⎢          ⎢          ⎢ send H /  ⎢          ⎢
    ,------⎢ reserved ⎢          ⎢ recv H    ⎢ reserved ⎢------.
    ⎢      ⎢ (local)  ⎢          ⎢           ⎢ (remote) ⎢      ⎢
    ⎢      +----------+          v           +----------+      ⎢
    ⎢          ⎢             +--------+             ⎢          ⎢
    ⎢          ⎢     recv ES ⎢        ⎢ send ES     ⎢          ⎢
    ⎢   send H ⎢     ,-------⎢  open  ⎢-------.     ⎢ recv H   ⎢
    ⎢          ⎢    /        ⎢        ⎢        \    ⎢          ⎢
    ⎢          v   v         +--------+         v   v          ⎢
    ⎢      +----------+          ⎢           +----------+      ⎢
    ⎢      ⎢   half   ⎢          ⎢           ⎢   half   ⎢      ⎢
    ⎢      ⎢  closed  ⎢          ⎢ send R /  ⎢  closed  ⎢      ⎢
    ⎢      ⎢ (remote) ⎢          ⎢ recv R    ⎢ (local)  ⎢      ⎢
    ⎢      +----------+          ⎢           +----------+      ⎢
    ⎢           ⎢                ⎢                 ⎢           ⎢
    ⎢           ⎢ send ES /      ⎢       recv ES / ⎢           ⎢
    ⎢           ⎢ send R /       v        send R / ⎢           ⎢
    ⎢           ⎢ recv R     +--------+   recv R   ⎢           ⎢
    ⎢ send R /  `----------->⎢        ⎢<-----------'  send R / ⎢
    ⎢ recv R                 ⎢ closed ⎢               recv R   ⎢
    `----------------------->⎢        ⎢<----------------------'
                             +--------+
                             
send:   endpoint sends this frame
recv:   endpoint receives this frame

H : HEADERS frame (with implied CONTINUATIONs)
PP: PUSH_PROMISE frame (with implied CONTINUATIONs)
ES: END_STREAM flag
R : RST_STREAM frame
```

* This diagram shows stream state transitions and the frames and flags that affect those transitions only
* `CONTINUATION` frames do not result in state transitions  
	* They are part of the `HEADERS` or `PUSH_PROMISE` that they follow 	
* **idle**  
	* All streams start in the **idle** state   
	* Sending or receiving a `HEADERS` frame causes the stream to become **open**  
	* Sending a `PUSH_PROMISE` frame on another stream reserves the idle stream that is identified for later use  
	* Receiving a `PUSH_PROMISE` frame on another stream reserves an idle stream that is identified for later use
	* Receiving any frame other than `HEADERS` or `PRIORITY` on a stream in this state must be treated as a connection error  
* **reserved (local)**  
	* This state is one that has been promised by sending a `PUSH_PROMISE` frame  
	* The endpoint can send a `HEADERS` frame. This causes the stream to open in a **half-closed (remote)** state.
	* Either endpoint can send a RST_STREAM frame to cause the stream to become **closed**. This releases the stream reservation 	 	
* **reserved (remote)**
	* This state has been reserved by a remote peer  
	* Receiving a `HEADERS` frame causes the stream to transition to **half-closed (local)**  
	* Either endpoint can send a `RST_STREAM` frame to cause the stream to become **closed**. This releases the stream reservation  
* **open**  
	* This state may be used by both peers to send frames of any type  
	* stream-level flow-control limits 
	* Either endpoint can send a frame with an `END_STREAM` flag set, which causes the stream to transition into one of the **half-closed** states   
  		* An endpoint sending an `END_STREAM` flag causes the stream state to become **half-closed (local)**  
  		* An endpoint receiving an `END_STREAM` flag causes the stream state to become **half-closed (remote)**    
	* Either endpoint can send a `RST_STREAM` frame from this state, causing it to transition immediately to **closed**   
* **half-closed (local)**  
	* This state cannot be used for sending frames other than `WINDOW_UPDATE`, `PRIORITY`, and `RST_STREAM`  
	* A stream transitions from this state to **closed** when a frame that contains an `END_STREAM` flag is received or when either peer sends a `RST_STREAM` frame  
* **half-closed (remote)**  
	* This is no longer being used by the peer to send frames   
	* A stream can transition from this state to **closed** by sending a frame that contains an `END_STREAM` flag or when either peer sends a `RST_STREAM` frame   
* **closed**  
	* This is the terminal state    
	* An endpoint must not send frames other than `PRIORITY` on a closed stream  
		* `PRIORITY` frames can be sent on closed streams to prioritize streams that are dependent on the closed stream  

* `PRIORITY` can be sent and received in any stream state  
* Frames of unknown types are ignored  

### 5.1.1 Stream Identifiers
* Streams are identified with an unsigned 31-bit integer   
* Streams initiated by a client must use odd-numbered stream identifiers  
* Streams initiated by the server must use even-numbered stream identifiers  
 * A stream identifier of zero (0x0) is used for connection control messages   
 * HTTP/1.1 requests that are upgraded to HTTP/2 are responded to with a stream identifier of one (0x1)   
	* After the upgrade completes, stream 0x1 is **half-closed (local)** to the client  
* The identifier of a newly established stream must be numerically greater than all streams  
* The first use of a new stream identifier implicitly closes all streams in the **idle** state that might have been initiated by that peer with a lower-valued stream identifier  
* Stream identifiers cannot be reused  
* A server that is unable to establish a new stream identifier can send a `GOAWAY` frame so that the client is forced to open a new connection for new streams  
	* Long-lived connections can result in an endpoint exhausting the available range of stream identifiers   
 
### 5.1.2 Stream Concurrency
* A peer can limit the number of concurrently active streams using the `SETTINGS_MAX_CONCURRENT_STREAMS` parameter within a `SETTINGS` frame     
* Streams that are in the **open** state or in either of the **half-closed** states count toward the maximum number of streams that an endpoint is permitted to open  
* Streams in either of the **reserved** states do not count toward the stream limit  
  

  
 
 
 
 
 
 
  
  
# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview