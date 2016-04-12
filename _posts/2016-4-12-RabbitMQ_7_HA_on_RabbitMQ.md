---
layout: post
category: OpenSource
title: RabbitMQ Highly Available Queues
tagline: by Pigbrain
tags: [RabbitMQ]
---
  
<!--more-->  
  
# Highly Available Queues
* 기본적으로 Clustering 환경에서 Queue의 정보는 exchange, binding 정보와 다르게 오직 한 노드에만 존재한다  
	* exchange, binding 등에 대한 정보는 여러 node에 동일하게 복제되어 관리된다  
* Queue는 선택적으로 여러 node에 mirroring 되도록 설정 할 수 있다  
* 각각의 mirroring된 Queue들은 하나의 master와 하나 이상의 slave로 구성된다  
	* master가 죽을 경우 가장 오래 실행된 slave가 master로 승격된다   
* mirroring된 Queue에 메세지가 publish 될 경우 이 메세지는 모든 slave들에 복제된다  
* mirroring된 Queue는 가용성(availability)을 향상시키지만 부하를 분산 시키지는 않는다  
	* 모든 node에서 동일한 작업을 한다  
  
# Configuring Mirroring  
* Queue의 mirroring기능은 policy 설정을 통하여 활성화 시킬 수 있다  
* policy는 언제든지 변경 가능하다  
* mirroring 설정 되지 않은 Queue와 mirroring 설정 되었지만 slave가 없는 Queue는 다음과 같은 차이가 있다  
	* mirroring 설정 되지 않은 Queue는 mirroring을 위한 컴포넌트들이 로딩되지 않았기 때문에 실행속도가 더 빠르다  

  
  
  
<br>  
  
# 원문   
* http://next.rabbitmq.com/ha.html#cluster-shutdown  
