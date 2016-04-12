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
* 각각 node들을 실행 시킨다  

		rabbit1$ rabbitmq-server -detached  
		rabbit2$ rabbitmq-server -detached  
		rabbit3$ rabbitmq-server -detached  
	
* 세개의 독립적인 RabbitMQ Broker가 실행되었다  
* 각 node에서 **cluster_status** 명령으를 통하여 상태를 확인 가능하다  
		
		rabbit1$ rabbitmqctl cluster_status  
		  Cluster status of node rabbit@rabbit1 ...  
		  [{nodes,[{disc,[rabbit@rabbit1]}]},{running_nodes,[rabbit@rabbit1]}]  
		  ...done.  
		
		
		rabbit2$ rabbitmqctl cluster_status  
		  Cluster status of node rabbit@rabbit2 ...  
		  [{nodes,[{disc,[rabbit@rabbit2]}]},{running_nodes,[rabbit@rabbit2]}]  
		  ...done.  
		
		
		rabbit3$ rabbitmqctl cluster_status  
		  Cluster status of node rabbit@rabbit3 ...  
		  [{nodes,[{disc,[rabbit@rabbit3]}]},{running_nodes,[rabbit@rabbit3]}]  
		  ...done.  
  
* rabbitmq-server 스크립트로 실행된 RabbitMQ Broker의 node이름은 rabbit@shorthostname 형태를 갖는다  
* Window에서 rabbitmq-srever.bat으로 실행할 경우 rabbit@SHORTHOSTNAME(대문자) 형태를 갖는다  
* node 이름은 정확히 일치해야 하기때문에 대소문자에 주의해야한다  
  
### Creating the cluster  
* 세 node로 Clustering을 구성하기 위해 다음과 같은 작업을 한다  
	* rabbit@rabbit2가 rabbit@rabbit1에 join 하도록 한다  
	* rabbit@rabbit3가 rabbit@rabbit1에 join 하도록 한다  
  
<br>  
  
* rabbit@rabbit2에서 RabbitMQ 어플리케이션을 정지시키고 rabbit@rabbit1 에 join 시킨다  
	* 어플리케이션을 정지 시킬때 **rabbitmqctl stop_app**명령으로 정지시켜야 한다  
		* stop_app 은 RabbitMQ Application만 종료시킨다  
	*  **rabbitmqctl stop**명령은 Erlang node 자체를 종료시킨다  
* Cluster에 join 시키는 것은 node를 reset 시키는것과 동일하다. Clustering 하기 전에 관리되던 모든 데이터는 삭제 된다  
		
		rabbit2$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit2 ...done.
		
		rabbit2$ rabbitmqctl join_cluster rabbit@rabbit1
		  Clustering node rabbit@rabbit2 with [rabbit@rabbit1] ...done.
		
		rabbit2$ rabbitmqctl start_app
		  Starting node rabbit@rabbit2 ...done.  
  
* cluster_status 명령어로 cluster 상태를 확인한다  
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit1,rabbit@rabbit2]}]
		  ...done.
	
* rabbit@rabbit1과 rabbit@rabbit2가 join된 것을 확인 할 수 있다  
* rabbit@rabbit3도 동일하게 cluster에 join 시킨다  
		
		rabbit3$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit3 ...done.
		
		rabbit3$ rabbitmqctl join_cluster rabbit@rabbit2
		  Clustering node rabbit@rabbit3 with rabbit@rabbit2 ...done.
		
		rabbit3$ rabbitmqctl start_app
		  Starting node rabbit@rabbit3 ...done.  

* 각 node에서 cluster_status  명령어로 join 상태를 확인한다  
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit3,rabbit@rabbit2,rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit3,rabbit@rabbit1,rabbit@rabbit2]}]
		  ...done.
		
		rabbit3$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit3 ...
		  [{nodes,[{disc,[rabbit@rabbit3,rabbit@rabbit2,rabbit@rabbit1]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1,rabbit@rabbit3]}]
		  ...done.
	
  
### Restarting cluster nodes  
* Clustering된 일부 node들에서 문제가 발생하여 종료되더라도 전체 Cluster에는 아무런 영향을 미치지 않는다  
* 문제가 발생하여 종료된 node가 재실행 될때 다른 node들은 자동으로 이를 감지하여 다시 Cluster를 구성한다  
* rabbit@rabbit1와 rabbit@rabbit3을 종료 시키고 cluster 상태를 확인한다  
		
		rabbit1$ rabbitmqctl stop
		  Stopping and halting node rabbit@rabbit1 ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit3,rabbit@rabbit2]}]
		  ...done.
		
		rabbit3$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit3 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit3]}]
		  ...done.
		
		rabbit3$ rabbitmqctl stop
		  Stopping and halting node rabbit@rabbit3 ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit2]}]
		  ...done. 
  
* rabbit@rabbit1을 다시 실행시킨 후 status 를 확인한다  
		
		rabbit1$ rabbitmq-server -detached

		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit1,rabbit@rabbit2]}]
		  ...done.
		
		rabbit3$ rabbitmq-server -detached
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1,rabbit@rabbit3]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]
		  ...done.
		
		rabbit3$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit3 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2,rabbit@rabbit3]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1,rabbit@rabbit3]}]
		  ...done.  

### Breaking up a cluster  
* Clustring된 node들 중 cluster에서 빠져나오고 싶은 경우 reset 명령을 실행한다  
* rabbit@rabbit3을 cluster에서 제거할 것이다  
		
		rabbit3$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit3 ...done.
		
		rabbit3$ rabbitmqctl reset
		  Resetting node rabbit@rabbit3 ...done.
		
		rabbit3$ rabbitmqctl start_app
		  Starting node rabbit@rabbit3 ...done.
		
* 각 node에서 status를 확인한다  
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1,rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit1,rabbit@rabbit2]}]
		  ...done.
		
		rabbit3$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit3 ...
		  [{nodes,[{disc,[rabbit@rabbit3]}]},{running_nodes,[rabbit@rabbit3]}]
		  ...done.

* rabbit@rabbit3가 Cluster에서 빠진것을 확인 할 수 있다  
* **forget_cluster_node** 명령을 이용하여 특정 node를 Cluster에서 제거할 수 있다  
* forget_cluster_nodes는 특정 node가 반응이 없는 경우에 유용하게 사용할 수 있다  
		
		rabbit1$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit1 ...done.
		
		rabbit2$ rabbitmqctl forget_cluster_node rabbit@rabbit1
		  Removing node rabbit@rabbit1 from cluster ...
		  ...done.
  
* rabbit@rabbit2에서 rabbit@rabbit1를 Cluster에서 제거하였지만 rabbit@rabbit1은 rabbit2와 여전히 Cluster상태라고 생각할 것이다  
* rabbit@rabbit1을 재시작하면 오류가 발생하며 reset을 해줘야한다  
  
		rabbit1$ rabbitmqctl start_app
		  Starting node rabbit@rabbit1 ...
		  Error: inconsistent_cluster: Node rabbit@rabbit1 thinks it\'s clustered with node rabbit@rabbit2, but rabbit@rabbit2 disagrees
		
		rabbit1$ rabbitmqctl reset
		  Resetting node rabbit@rabbit1 ...done.
		
		rabbit1$ rabbitmqctl start_app
		  Starting node rabbit@mcnulty ...
		  ...done.
		
		------------------------ status ----------------------------
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1]}]},{running_nodes,[rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit2]}]},{running_nodes,[rabbit@rabbit2]}]
		  ...done.
		
		rabbit3$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit3 ...
		  [{nodes,[{disc,[rabbit@rabbit3]}]},{running_nodes,[rabbit@rabbit3]}]
		  ...done.
  
  
# A Cluster on a Single Machine  
* 하나의 머신에 RabbitMQ node들을 실행시키기 위해서는 node이름, data 저장 장소, log 파일 위치, port 등을 다르게 지정해줘야 한다  
	* [Configuration guide](http://next.rabbitmq.com/configure.html#define-environment-variables)
		* RABBITMQ_NODENAME  
		* RABBITMQ_NODE_PORT  
		* RABBITMQ_DIST_PORT   
	* [File and Directory Locations guide](http://next.rabbitmq.com/relocate.html)  
		* RABBITMQ_MNESIA_DIR  
		* RABBITMQ_CONFIG_FILE  
		* RABBITMQ_LOG_BASE  
* rabbitmq-server 스크립트를 이용하여8 여러개의 node를 실행시킬 수 있다  
		
		$ RABBITMQ_NODE_PORT=5672 RABBITMQ_NODENAME=rabbit rabbitmq-server -detached  
		$ RABBITMQ_NODE_PORT=5673 RABBITMQ_NODENAME=hare rabbitmq-server -detached  
		$ rabbitmqctl -n hare stop_app  
		$ rabbitmqctl -n hare join_cluster rabbit@`hostname -s`  
		$ rabbitmqctl -n hare start_app  
  
* AMQP 외에 포트가 열려있을 경우 그것들의 정보도 다시 설정해줘야한다  
		
		$ RABBITMQ_NODE_PORT=5672 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15672}]" RABBITMQ_NODENAME=rabbit rabbitmq-server -detached
		$ RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=hare rabbitmq-server -detached
  
  
# Clusters with RAM nodes  
* RAM node는 metadata를 오직 메모리에서만 관리한다  
* RAM node는 디스크에 데이터를 쓰지 않기 때문에 disk 타입의 node보다 성능이 뛰어나다  
	* persistent Queue의 데이터는 디스크에 저장되기 때문에 adding/removing queues, exchange, vhosts와 관련된 작업에만 성능이 향상된다  
		* 메세지 publishing, consuming 속도는 향상되지 않는다  
  
### Creating RAM nodes  
* RAM node로 선언하고 Cluster에 join한다  

		rabbit2$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit2 ...done.
		
		rabbit2$ rabbitmqctl join_cluster --ram rabbit@rabbit1
		  Clustering node rabbit@rabbit2 with [rabbit@rabbit1] ...done.
		
		rabbit2$ rabbitmqctl start_app
		  Starting node rabbit@rabbit2 ...done.
  
* status를 통해 RAM node를 확인 할 수 있다  
		
		rabbit1$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit1 ...
		  [{nodes,[{disc,[rabbit@rabbit1]},{ram,[rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit2,rabbit@rabbit1]}]
		  ...done.
		
		rabbit2$ rabbitmqctl cluster_status
		  Cluster status of node rabbit@rabbit2 ...
		  [{nodes,[{disc,[rabbit@rabbit1]},{ram,[rabbit@rabbit2]}]},
		   {running_nodes,[rabbit@rabbit1,rabbit@rabbit2]}]
		  ...done.
		
### Changing node types  
* change_cluster_node_type 명령을 이용하여 node의 타입을 변경할 수 있다(RAM -> disk, disk -> RAM)  
		
		rabbit2$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit2 ...done.
		
		rabbit2$ rabbitmqctl change_cluster_node_type disc
		  Turning rabbit@rabbit2 into a disc node ...
		  ...done.
		  Starting node rabbit@rabbit2 ...done.
		
		rabbit1$ rabbitmqctl stop_app
		  Stopping node rabbit@rabbit1 ...done.
		
		rabbit1$ rabbitmqctl change_cluster_node_type ram
		  Turning rabbit@rabbit1 into a ram node ...
		
		rabbit1$ rabbitmqctl start_app
		  Starting node rabbit@rabbit1 ...done.
  
  
<br>  
  
# 원문   
* http://next.rabbitmq.com/clustering.html
