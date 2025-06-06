---
layout: post
category: OpenSource    
title: Debezium
tagline: by Pigbrain  
tags: [OpenSource]  
---

<!--more-->


### Intro
데이터는 현대 애플리케이션의 핵심이며, 데이터의 변경 사항을 실시간으로 감지하고 이에 반응하는 능력은 여러 비즈니스 시나리오에서 매우 중요합니다.  

예를 들어, 데이터베이스 업데이트를 기반으로 캐시를 무효화하거나,   
검색 인덱스를 업데이트하거나,   
다른 시스템으로 데이터를 복제해야 하는 경우 등이 있습니다. 
  
이러한 요구사항을 충족하기 위해 등장한 것이 바로 Debezium입니다.
  
<br>

### Debezium이란 무엇인가?
Debezium은 다양한 데이터베이스의 변경 사항을 캡처하여 스트리밍 플랫폼(예: Apache Kafka)으로 전송하는 오픈 소스 분산 플랫폼입니다.  
즉, 데이터베이스에서 발생하는 모든 삽입(INSERT), 업데이트(UPDATE), 삭제(DELETE)와 같은 데이터 변경 이벤트를 실시간으로 읽어와 메시지 형태로 발행하는 Change Data Capture (CDC) 솔루션입니다.  

<br>

### Debezium을 왜 사용하는가?
* 실시간 데이터 통합
  * 데이터베이스 변경 사항을 즉시 다른 시스템으로 전파하여 실시간 데이터 동기화 및 통합을 가능하게 합니다.
  
* 데이터 무결성 유지
  * 트랜잭션 로그를 기반으로 변경 사항을 포착하므로, 데이터베이스에 직접적인 쿼리를 날리는 방식보다 데이터 일관성과 무결성을 유지하는 데 유리합니다.
  
* 데이터베이스 부하 감소
  * 애플리케이션이 직접 데이터베이스를 폴링하여 변경 사항을 확인하는 방식보다 데이터베이스에 가해지는 부하를 크게 줄일 수 있습니다. 
  * Debezium은 데이터베이스의 내부 트랜잭션 로그를 사용하므로, 데이터베이스   성능에 미치는 영향이 최소화됩니다.
  
* 마이크로서비스 아키텍처 지원
  * 각 마이크로서비스가 독립적으로 데이터베이스를 사용하는 경우, Debezium을 통해 데이터 변경 이벤트를 공유하여 서비스 간의 느슨한 결합을 유지하면서 데이터 일관성을 확보할 수 있습니다.
  
* 이벤트 소싱 구현
  * 데이터베이스의 모든 변경 사항을 이벤트 스트림으로 발행하여, 이벤트 소싱 아키텍처를 구현하는 데 핵심적인 역할을 합니다.
  
* 다양한 사용 사례 
  * 캐시 무효화, 검색 인덱스 업데이트, 데이터 웨어하우스로의 ETL, 실시간 분석 등 다양한 실시간 데이터 처리 시나리오에 활용될 수 있습니다.

<br>
  

### Debezium의 아키텍처
Debezium은 Apache Kafka와 Kafka Connect를 기반으로 동작합니다.   
  
핵심 아키텍처는 다음과 같습니다.
  
* 데이터베이스 (Source Database)
  * Debezium이 변경 사항을 캡처할 대상 데이터베이스입니다. MySQL, PostgreSQL, SQL Server, MongoDB, Oracle, Db2 등 다양한 데이터베이스를 지원합니다.  

* Debezium Connector 
  * 각 데이터베이스 유형에 맞는 Debezium Connector는 Kafka Connect 프레임워크 위에서 실행됩니다. 이 커넥터는 대상 데이터베이스의 트랜잭션 로그(예: MySQL의 이진 로그, PostgreSQL의 WAL)를 읽어 데이터 변경 이벤트를 포착합니다.

* Kafka Connect
  * Kafka Connect는 Apache Kafka의 분산 데이터 스트리밍 프레임워크입니다.  
  * Debezium Connector는 Kafka Connect 플러그인으로 동작하며, 데이터베이스에서 읽은 변경 이벤트를 Kafka 토픽으로 발행하는 역할을 합니다. 
  * Kafka Connect는 스케일 아웃, 장애 복구 등의 기능을 제공하여 안정적인 데이터 파이프라인을 구축할 수 있도록 돕습니다.  

* Apache Kafka
  * Debezium Connector가 발행한 변경 이벤트 메시지가 저장되는 분산 스트리밍 플랫폼입니다.  
  * 각 데이터베이스 테이블의 변경 이벤트는 일반적으로 별도의 Kafka 토픽에 저장됩니다.  
  * Kafka는 대용량의 이벤트를 안정적으로 저장하고, 여러 컨슈머가 동시에 이벤트를 소비할 수 있도록 합니다.

* 컨슈머 애플리케이션 (Consumer Applications)
  * Kafka 토픽에 저장된 변경 이벤트 메시지를 구독하여 필요한 비즈니스 로직을 수행하는 애플리케이션입니다. 
    * 예를 들어, 다른 데이터베이스로 데이터를 복제하거나, 검색 엔진을 업데이트하거나, 알림을 보내는 등의 작업을 수행할 수 있습니다.

<br>


<img src="/assets/themes/Snail/img/OpenSource/Debezium/Introduce/debezium-architecture.png" alt="">    
  

<br>

### Debezium 동작 방식 
* Debezium Connector는 처음 시작할 때 대상 데이터베이스의 스냅샷을 찍어 Kafka 토픽에 발행합니다.  
* 이후에는 데이터베이스의 트랜잭션 로그를 지속적으로 모니터링하면서 발생하는 모든 변경 이벤트를 실시간으로 캡처하여 Kafka 토픽에 발행합니다.  
* 이 이벤트들은 스키마 변경도 포함하며, 각 이벤트에는 변경된 데이터의 이전 값과 새로운 값이 포함될 수 있습니다.


### 참고  
* https://prolinuxhub.com/changing-name-of-salt-minion-centsos-7
