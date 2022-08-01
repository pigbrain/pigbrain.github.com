---
layout: post
category: Spring
title: Health Indicator in Spring Boot 
tagline: by Pigbrain
tags: [Spring]
---
  
<!--more-->  
  
* 스프링 부트에서는 어플리케이션의 헬스체크를 위해 `HealthIndicator`라는 것을 제공한다  
* 어플리케이션을 K8S에서 배포하였고 `livenessProbe`의 엔드포인트로 `/actuator/health`(HealthIndicator 에서 사용하는 엔드포인트)를 등록하였다  
* `/actuator/health` 호출시 응답시간이 오래 걸리는 현상이 있었고 아래와 같이 수정하였다 


# HealthIndicator ?
* 스프링 Actuator의 Health 기능이 활성화 되어 있다면 `org.springframework.boot.actuate.health.HealthIndicator`를 상속 받은 컴포넌트들이 로드되며 `/actuator/health`가 호출됬을때 이 컴포넌트들을 통해 어플리케이션의 Health Check를 진행한다 

* Helath Check에는 여러가지 방식이 있는데, 만약 레디스 관련 의존성을 가지고 있다면 `org.springframework.boot.actuate.redis.RedisHealthIndicator`가 자동으로 생성되고, DB 관련 의존성을 가지고 있다면 `org.springframework.boot.actuate.jdbc.DataSourceHealthIndicator` 가 자동으로 생성된다 

* 이외에도 카산드라, SMTP, InfluxDB, RabbitMQ, ElasitcSearch 등 다양한 서비스에 대에 Helath Check를 진행하기 위한 Health Indicator가 구현되어 있다

* 기본적으로 디스크 공간을 체크하는 `org.springframework.boot.actuate.system.DiskSpaceHealthIndicator` 와 어플리케이션이 구동되었는지 확인하기 위한 단순한 핑 역할의 `org.springframework.boot.actuate.health.PingHealthIndicator`가 기본적으로 로드되는 것 같다

* 개발중인 어플리케이션에는 SMTP, DB, Redis에 대한 의존성이 있었으며 이에 따라 `MailHealthIndicator`, `DataSourceHealthIndicator`, `RedisHealthIndicator` 가 활성화 되었다. 

<br>

# 문제 발생 
* 당연히 Health Check는 빠르게 응답이 와야될 것 같은데 2~3s씩 걸리는 현상을 발견했다 (인프라 환경에 따라 다르겠지만..)

<br>

# 해결 
* 각 서비스별 HelathIndicator의 구현체를 살펴보니 아래와 같이 구현이 되어 있었다
    * `RedisHealthIndicator`는 매 Health Check마다 레디스에 연결을 시도하며 연결이 정상적으로 이루어질 경우 서버 info를 조회하도록 되어 있다 
    * `MailHealthIndicator`는 매 Health Check마다 메일 서버에 연결을 시도하도록 되어 있다 

* 매 Health Check마다 새로운 연결을 시도하지 않고 기존 생성된 커넥션 풀을 사용하도록 Health Indicator를 새로 추가하였고 그 후로는 빠른 응답을 받을 수 있었다

* `!` https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-actuator-autoconfigure/src/main/java/org/springframework/boot/actuate/autoconfigure/jdbc/DataSourceHealthContributorAutoConfiguration.java#L85
 에 따르면 `dbHealthIndicator`, `dbHealthContributor` 이름의 빈이 없을 경우 `DataSourceHealthIndicator`를 생성하게 될꺼라 디비 헬스 체크를 하는 Health Indicator를 만들 경우 빈 이름을 주의해야할 것 같다


# 참고 
* https://www.baeldung.com/spring-boot-health-indicators