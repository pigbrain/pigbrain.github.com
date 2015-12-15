---
layout: post
category: Erlang
title: Why Erlangs bit syntax is awesome
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#Bit syntax #  
* [Bit syntax](http://pigbrain.github.io/erlang/2015/07/30/BitSyntax_on_Erlang/)
* 바이너리 프로토콜을 처리하는데 효율적이다  
* 프로토콜과 같은 바이너리 데이터들의 스펙을 간단하게 정의 가능하다  
* 얼랭은 패턴매칭 방식을 사용하기 때문에 데이터 유효성 체크도 쉽게 가능하다  
  
<br>  
  
#Bit Syntax 예제#

* Bit 연산
   
		Buffer = <<"123456789A">>,
		Pivot = 5,
		<<A:Pivot/binary, B/Binary>> = Buffer.
  
	* A의 값 : "12345"  
	* B의 값 : "6789A"  
<br>  

* Bit Syntax를 이용한 RTP 헤더 정의  

		<< 2:2, 
		   Padding:1, 
		   Extension:1, 
		   SyncSrcCount:4, 
		   Marker:1, 
		   PayloadType:7, 
		   Sequence:16/big-unsigned-integer, 
		   Timestamp:32/big-unsigned-integer, 
		   SyncSource:32/big-unsigned-integer, 
		   _/binary >>  
  
  
	* 첫 두 비트는 버전을 정의한다 (현재 버전은 2)  
	* 프로토콜 각 자리별로 유의미한 이름과 비트 자리 수를 정의한다 
		* Padding 은 1비트  
		* Extension은 1비트  등등...  
	* 마지막에 있는 **\_/binary** 는 선언된 비트 외에 나머지 비트들을 매칭시킨다  
  
<br>  

* RTP 파싱  

		parse(Packet) when is_binary(Packet) ->
			case Packet of  
				<<2:2, _Padding:1, Extension:1, SyncSrcCount:4, Marker:1,  
					PayloadType:7, Sequence:16/big-unsigned-integer,  
				  	Timestamp:32/big-unsigned-integer,  
				  	SyncSource:32/big-unsigned-integer, _/binary>> ->  
				  
				  	RtpHeaderLen = (12 + (4*SyncSrcCount)),  
				  
				  	ExtensionBytes =  
				  		case Extension of  
				  			1 -> <<_:RtpHeaderLen/binary, _:16/big, 
									Length:16/big, _/binary>> = Packet, 4 + Length;  
				  			0 -> 0  
				  		end, 
				  
				  	StartOfPayload = RtpHeaderLen + ExtensionBytes,
				  
				 	 case Packet of  
				  		<<_:StartOfPayload/binary, Payload/binary>> ->  
				  			ParsedPacket = #rtp_packet{timestamp = Timestamp,  
											sync_src = SyncSource, 
											marker = Marker,  
											payload_type = PayloadType,  
											sequence = Sequence,  
											payload = Payload},  
							{ok, ParsedPacket};  
						_ -> false  
				  	end;  
				 _ -> false  
			end.  
  
  
<br>  
<br>  

#원문#
* https://forfunand.wordpress.com/2011/10/10/why-erlangs-binary-syntax-is-awesome/
