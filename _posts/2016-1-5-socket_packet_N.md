---
layout: post
category: Erlang
title: Erlang socket setopts(Socket, {packeet, PacketType})
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#intet:setopts(Socket, Options)#  
* 하나 이상의 소켓 옵션을 설정한다  
* 리턴 값 : ok │ {error, posix()}  
  
<br>  
  
#{packet, PacketType}#  
* 패킷 타입을 지정  
* PacketType의 종류   
	* raw │ 0  
		* 수신 버퍼에 데이터가 있다면 바로 읽는다  
	* 1 │ 2 │ 4  
		* 1, 2, 4 바이트의 헤더를 가지고 있는 패킷을 처리한다  
		* 헤더에는 패킷의 길이가 담겨져있어야 한다  
		* 내부적으로 수신 과정에서 지정된 크기만큼의 헤더를 생성하여 붙여준다  
		* 현재는 4바이트의 헤더일 경우 패킷의 크기는 2GB까지 허용 된다  
	* asn1 │ cdr │ sunrm │ fcgi │ tpkt │ line  
		* 이 타입들은 rcv 과정에서만 처리된다  
		* 송신 과정에서는 어플리케이션에서 직접 적절한 헤더를 생성하여 붙여줘야 한다  
			* asn1 - ASN.1 BER  
			* sunrm - Sun's RPC encoding  
			* cdr - CORBA (GIOP 1.1)  
			* fcgi - Fast CGI  
			* tpkt - TPKT format [RFC1006]  
			* line - Line mode  
				* 패킷은 new line에 해당하는 표시로 끝나야한다  
				* 수신 버퍼보다 line의 길이가 길다면 패킷은 짤리게 된다  
	* http │ http_bin  
		* http 프로토콜 처리    

<br>  

#원문#  
* http://www.erlang.org/doc/man/inet.html


