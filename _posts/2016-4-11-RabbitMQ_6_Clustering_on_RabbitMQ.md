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
* RabbitMQ Broker들은 개별 node에 문제가 생겨도 전체 기능에 장애를 일이키지 않는다  
* node들은 즉시 시작시키거나 종료시킬 수 있다  
* RabbitMQ Clustering은 [network partitions](http://next.rabbitmq.com/partitions.html) 문제를 다루기 위한 모드가 있다  
* Clustering은 LAN에서 구성할 것을 권장하며 WAN에서의 구성은 권장하지 않는다  
	* [Shovel](http://next.rabbitmq.com/shovel.html)과 [Federation](http://next.rabbitmq.com/federation.html) plugin들이 WAN에서 구성하기 위한 좋은 솔루션이 될 것이다  
	* Shovel과 Federation은 실질적으로 Clustering과 동일하지는 않다  
  
### Disk and RAM Nodes  
* node는 **disk node** 혹은 **RAM node**로 설정할 수 있다  
	* 일반적으로 dist node를 많이 사용한다  
	* RAM node는 성능을 향상시키기위해 사용한다  
  
<br>  
  
# Clustering Transcript
* rabbit1, rabbit2, rabbit3 이 세 머신에서 Cluster를 구성하는 방법을 설명한다  
* 가정  
	* user는 세 머신에 각각 로그인 되어있다  
	* 세 머신에 RabbitMQ가 설치되어 있다  
	* rabbitmq-server와 rabbitmqctl 스크립트가 실행 가능하다  
  
### How Nodes (and CLI tools) Authenticate to Each Other: the Erlang Cookie  
* RabbitMQ node들과 CLI tool(e.g. rabbitmqctl)은 서로 통신하기위해 cookie를 사용한다  
	* 두 개의 node가 서로 통신하게 위해서는 Erlang cookie라고 불리는 동일한 비밀키를 가지고 있어야 한다  
	* cookie는 단순히 알파벳으로 이루어진 문자열이다  
	* 모든 Cluster node들은 동일한 cookie값을 갖고있어야 한다  
* RabbitMQ 서버가 실행될때 Erlang VM은 자동으로 cookie 파일을 생성한다  
	* 일반적으로 Unix 환경에서 cookie는 /var/lib/rabbitmq/.erlang.cookie 혹은 $HOME/.erlang.cookie에 위치한다  
	* Windows에서는 C:\\Users\\Current User\\.erlang.cookie, C:\\Documents and Settings\\Current User\\.erlang.cookie 혹은 C:\\Windows\\.erlang.cookie에 존재한다  
* rabbitmq-server, rabbitmqctl 스크립트에서 "-setcookie cookie" 옵션을 추가하여 cookie값을 설정할 수 있다  
	* cookie 파일에 있는 값이 아닌 입력된 cookie값을 사용하게 된다  
* cookie값이 서로 일치하지 않다면 "Could not auto-cluster"과 같은 오류 로그가 남는다  
  
### Starting independent nodes 
  
### Creating the cluster
  
### Restarting cluster nodes  
  
### Breaking up a cluster  
  
  
<br>  
  
# 원문   
* http://next.rabbitmq.com/clustering.html
