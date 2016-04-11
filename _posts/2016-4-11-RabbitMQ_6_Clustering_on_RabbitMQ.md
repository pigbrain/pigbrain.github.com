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


### Cluster Formation  
	
### Failure Handling  

### Disk and RAM Nodes  
  
<br>  
  

# 원문   
* http://next.rabbitmq.com/clustering.html
