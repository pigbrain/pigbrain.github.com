---
layout: post
category: OpenSource
title: RabbitMQ 설치
tagline: by Pigbrain
tags: [RabbitMQ]
---

<!--more-->

# 얼랭 설치
* [설치방법](http://pigbrain.github.io/erlang/2015/07/14/IntroduceErlangAndSetup_on_Erlang)
  
# RabbitMQ 다운로드 및 설치
* 윈도우  
	* https://www.rabbitmq.com/install-windows.html 에서 윈도우 바이너리 링크를 통하여 다운로드 받고 설치  
	
* 리눅스  
	* http://www.rabbitmq.com/releases에서 rabbitmq-server를 다운로드  
	
		1. wget http://www.rabbitmq.com/releases/rabbitmq-server/v3.0.4/rabbitmq-server-generic-unix-3.0.4.tar.gz  
		2. tar -xvf rabbitmq-server-generic-unix-3.0.4.tar.gz  
		3. cd rabbitmq_server-3.0.4/  
		4. sbin/rabbitmq-server **-detached**
			* 실행  
		5. sbin/rabbitmqctl **status** 
			* 실행중인 RabbitMQ 의 Attribute 정보를 볼 수 있다  
		6. sbin/rabbitmqctl **stop** 
			* 종료
  
<br>  

# RabbitMQ Management 플러그인 설치  

* 리눅스  
	* Management 플러그인 설치 방법
		1. cd rabbitmq_server-3.0.4/  
		2. sbin/rabbitmqctl **stop** 
			* 실행되어 있다면 종료시킨다 
		3. sbin/rabbitmq-plugins **enable rabbitmq_management**
		4. sbin/rabbitmq-server **-detached** 
			* 실행  
	* Management 접속 
		* 웹브라우저에서 http://**hostname:15672**으로 접속  
		* RabbitMQ는 기본적으로 id:guest, pwd:guest 계정을 제공한다  
	* 계정 생성 및 관리자 설정  
		* sbin/rabbitmqctl add_user admin admin123  
		* sbin/rabbitmqctl set_user_tags admin administrator  
  
<br>  
  
# vhost 추가  

* 리눅스 
	* vhost 생성 
		1. cd rabbitmq_server-3.0.4/  
		2. sbin/rabbitmqctl **_add\_vhost_ dev-vhost**  
			* dev-vhost 라는 vhost를 생성한다  
		3. sbin/rabbitmqctl **_set\_permissions_ -p dev-vhost admin** ".\*" ".\*" ".\*"
 			* dev-vhost의 모든 권한을 admin에 부여한다  
	 			* ".\*" ".\*" ".\*"는 설정, 쓰기, 읽기에 대한 권한을 의미한다  
	 			* ".\*"를 통해 각 권한에 대한 모든 자원을 허용한다  
  
<br>  
  
# 참고  
* https://www.rabbitmq.com/  
* http://www.thegeekstuff.com/2013/04/install-rabbitmq-server/
* http://www.rabbitmq.com/access-control.html
* [RabbitMQ 따라잡기](http://book.naver.com/bookdb/book_detail.nhn?bid=8882078)


