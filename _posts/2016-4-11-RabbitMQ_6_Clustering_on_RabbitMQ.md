---
layout: post
category: OpenSource
title: RabbitMQ Clustering
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Clustering Guide  

## Overview
* RabbitMQ Broker는 하나 이상의 Erlnag node들, RabbitMQ application, users, vhosts, queues, exchange 실행 파라미터 등등으로 논리적으로 그룹화되어 있다  
* node들의 컬렉션을 **Cluster**라고 부른다  
  
  
### What is Replicated?  
* RabbitMQ Broker의 동작에 관여된 모든 data / state는 다른 node들에 복제된다  
* Queue의 데이터들을 복제하기 위해서는 HA(High Availability) 구성을해야 한다  
	* HA 구성을 하기전에 Clustering 구성이 선행되어야 한다  
  
  
### Hostname Resolution Requirements  
* RabbitMQ node들은 domain name 혹은 FQDNs를 이용하여 서로 연결된다  
	* 각 node에서 서로의 host name으로 접근 가능한 상태여야 한다  
* OS에서 제공하는 방식으로 host name을 식별 할 수 있다  
	* DNS records  
	* Local host files(e.g. /etc/hosts)  
* 일부 환경에서는 DNS record나 hosts file 수정이 불가능 할 수 있다  
	* Erlang의 [Inet Configuration](http://erlang.org/doc/apps/erts/inet_cfg.html)를 이용하여 해결 가능 하다  
		* Inet Configuration은 DNS, hosts 수정 대신 사용가능 하다  
* FQDNs를 사용하기 위해서는 [Configuration](http://next.rabbitmq.com/configure.html#define-environment-variables)에 RABBITMQ_USE_LONGNAME 설정을 확인해야한다  

### Cluster Formation  
* 4가지 방법을 이용하여 Cluster를 구성할 수 있다  
	* **rabbitmqctl**를 이용하여 Cluster 구성  
	* config 파일에 Cluster node들을 선언하여 Cluster 구성  
	* [rabbitmq-autocluster](https://github.com/aweber/rabbitmq-autocluster/)(plugin)을 이용하여 Cluster 구성  
	* [rabbitmq-clusterer](https://github.com/rabbitmq/rabbitmq-clusterer)(plugin)을 이용하여 Cluster 구성  
* Cluster 구성은 동적으로 변경할 수 있다  
	* RabbitMQ Broker들은 single node로 실행된다  
	* 실행 후 각각의 node들을 Cluster로 구성할수 있다  
	* Cluster에서 node를 분리하여 single node로 실행되도록 할 수 있다  
  
  
### Failure Handling  

### Disk and RAM Nodes  
  
<br>  
  

# 원문   
* http://next.rabbitmq.com/clustering.html
