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
* mirroring 설정을 하기 위해서는 policy를 생성해야 한다  
	* ha-mode를 지정해야 한다  
	* ha-params는 선택적으로 지정해야 한다  
  
<table>
<tr>
<td>ha-mode&nbsp;</td><td>ha-params&nbsp;&nbsp;&nbsp;</td><td>Result</td>
</tr>
<tr>
<td>all</td><td>(absent)</td><td>모든 node들이 mirroring된다. Cluster에 새로운 node가 추가되더라도 즉시 mirroring 된다</td>
</tr>
<tr>
<td>exactly&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>count&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>count 수 만큼만 mirroring 된다. node의 수가 count보다 적다면 모든 node들이 mirroring된다. node의 수가 count보다 많은 경우 mirroring된 node하나가 죽을 경우 새로운 node를 mirroring 시킨다</td>
</tr>
<tr>
<td>nodes</td><td>node names</td><td>node name으로 지정된 node들이 mirroring된다</td>
</tr>
</table>
  
* policy가 변경될 경우 새로운 policy대로 동작하기 위한 준비가 될때까지 기존 policy를 유지한다  
  
# Queue Master Location  
* RabbitMQ의 모든 Queue는 home node를 가지고 있다  
	* 이 home node를 Queue master라고 부른다  
* 모든 Queue의 동작은 master에서 우선 처리되고 slave에서 처리된다  
	* 이러한 과정으로 인하여 FIFO 방식을 보장할 수 있다  
* master는 몇가지 전략에 의해서 node들 사이에 분산될 수 있다  
	* **x-queue-master-locator** 값 사용(Queue선언할때 argument로 등록 가능)  
	* **queue-master-locator** policy 사용  
	* [configuration](https://www.rabbitmq.com/configure.html#configuration-file)에 있는 **queue_master_locator** 키값 사용  
  
# "nodes" policy and migrating masters  
* 새로운 policy를 지정할때 타겟 node에 현재 master가 속해있지 않을 경우 현재 master가 종료될 수 있다  
	* 이 과정에서 메세지 유실을 방지하기 위해 최소 하나의 slave와 동기화가 완료 될때까지 기존 master는 종료되지 않는다  
	* 기존 master의 동기화 작업이 완료된 경우 master가 종료되기 때문에 consumer들은 연결이 한번 끊어진다  
  
# Exclusive queues  
* Exclusive Queues는 Queue를 생성한 클라이언트와의 연결이 끊어질 경우 삭제된다  
* 연결이 끊어질때마다 Queue가 삭제되므로 Exclusive Queue는 mirroring 하기에 적합하지 않다  
* 위와 같은 이유로 Exclusive Queue는 mirroring 되지 않는다    
	* policy에 해당하더라도  mirroring 되지 않는다    
  
# Some examples  
* "ha."로 시작하는 이름을 가진 Queue들을 모든 node에 mirroring 한다  
  
<table>
<tr>
<td>rabbitmqctl</td><td>rabbitmqctl set_policy ha-all "^ha\." '{"ha-mode":"all"}'</td>
</tr>
<tr>
<td>HTTP API</td><td>PUT /api/policies/%2f/ha-all {"pattern":"^ha\.", "definition":{"ha-mode":"all"}}</td>
</tr>
</table>
  
<br>  
  
* "two."로 시작하는 이름을 가진 Queue들을 Cluster내에 2개의 node에 mirroring한다  
	* automatic synchronisation도 활성화 한다  
  
<table>
<tr>
<td>rabbitmqctl</td><td>rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'</td>
</tr>
<tr>
<td>HTTP API</td><td>PUT /api/policies/%2f/ha-two
{"pattern":"^two\.", "definition":{"ha-mode":"exactly", "ha-params":2,"ha-sync-mode":"automatic"}}
</td>
</tr>
</table>
  
<br>  
  
* "nodes."로 시작하는 이름을 가진 Queue들을 Cluster내에 특정 node와 mirroring 한다  
  
<table>
<tr>
<td>rabbitmqctl</td><td>rabbitmqctl set_policy ha-nodes "^nodes\." '{"ha-mode":"nodes","ha-params":["rabbit@nodeA", "rabbit@nodeB"]}'</td>
</tr>
<tr>
<td>HTTP API</td><td>PUT /api/policies/%2f/ha-nodes {"pattern":"^nodes\.", "definition":{"ha-mode":"nodes", "ha-params":["rabbit@nodeA", "rabbit@nodeB"]}</td>
</tr>
</table>
  
<br>  
  
# 원문   
* http://next.rabbitmq.com/ha.html#cluster-shutdown  
