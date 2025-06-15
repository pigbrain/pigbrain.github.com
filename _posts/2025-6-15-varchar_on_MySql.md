---
layout: post
category: MySql
title: MySQL 컬럼 변경, 과연 안전할까요?
tagline: by Pigbrain
tags: [MySql]
---
  
<!--more-->
  

데이터베이스 스키마는 한 번 만들면 끝이 아니라, 비즈니스 요구사항에 따라 끊임없이 변화합니다.  
  
컬럼 이름을 바꾸거나, 데이터 타입을 변경하고, VARCHAR 컬럼의 사이즈를 조정하는 일은 종종 발생합니다.  
  
그런데 이때 `ALTER TABLE` 문을 무심코 실행했다가는 서비스가 멈추는 불상사가 발생할 수 있다는 사실, 알고 계셨나요?

  
# 컬럼명 변경 시 락 발생! 😱 
결론부터 말씀드리면, 네, `MySQL`에서 `ALTER TABLE`문을 사용하여 컬럼명을 변경할 때 일반적으로 해당 테이블에 락이 발생합니다.  
   
<br>

이 락은 작업이 진행되는 동안 다른 세션이 해당 테이블에 접근하는 것을 제한할 수 있습니다.  
락의 종류와 수준은 MySQL 버전, 스토리지 엔진(주로 InnoDB), 그리고 `ALTER TABLE` 작업의 특성에 따라 달라지는데요.

<br>

* **MySQL 5.5 이하** : 이 시절의 MySQL은 대부분의 ALTER TABLE 작업 시 테이블 전체에 WRITE 락을 걸어, 작업 시간 동안 모든 읽기 및 쓰기 작업을 차단했습니다. 대용량 테이블이라면 서비스 중단은 피할 수 없었죠.  
  

* **MySQL 5.6 이후** (Online DDL 도입): 상황이 많이 개선되었습니다! "Online DDL" 기능이 도입되면서 `ALGORITHM=INPLACE`나 `ALGORITHM=INSTANT`와 같은 옵션을 사용하여 락을 최소화하고, 심지어 작업 중에도 읽기/쓰기 작업을 허용하는 경우가 많아졌습니다.  

* **MySQL 8.0** : Atomic DDL 작업이 도입되어 `ALTER TABLE` 문의 블로킹(blocking)이 더욱 줄어들었습니다.
    
<br> 
  
특히 `RENAME COLUMN` 같은 작업은 메타데이터만 변경하는 작업이라 최신 MySQL에서는 `ALGORITHM=INSTANT`나 `INPLACE`를 통해 빠르게 완료될 수 있습니다. 하지만 여전히 **메타데이터 락(Metadata Lock)** 은 발생하여 다른 DDL 작업과 충돌을 막습니다.
  
# 컬럼 사이즈 조정, 더 조심해야 합니다! ⚠️
컬럼 사이즈, 특히 `VARCHAR` 컬럼의 길이를 조정할 때도 락이 발생합니다.  
여기서는 `VARCHAR`의 내부 동작을 이해하는 것이 중요해요.  

MySQL은 VARCHAR 값을 저장할 때 실제 데이터 앞에 **길이를 나타내는 접두사(length prefix)** 를 함께 저장합니다.
  
* **1바이트 접두사** : 저장될 문자열의 바이트 길이가 255바이트 이하인 경우 (0~255 값 표현 가능) 
  
* **2바이트 접두사** : 저장될 문자열의 바이트 길이가 255바이트를 초과하는 경우 (0~65535 값 표현 가능) 

<br>  

이 접두사 덕분에 MySQL은 가변 길이 문자열의 끝을 효율적으로 식별하고 공간을 절약할 수 있습니다.


`!` 문제는 `VARCHAR(N)` **(N이 255 이하)** 에서 `VARCHAR(M)` **(M이 256 이상)** 으로 변경하는 경우입니다.  
  
이 시나리오에서는 필요한 접두사 바이트 수가 1바이트에서 2바이트로 변경되므로, MySQL은 일반적으로 **테이블을 복사(ALGORITHM=COPY)** 해야 합니다.   
`COPY` 알고리즘은 테이블 전체를 새로 만들고 데이터를 복사하는 과정이 포함되므로, 작업 시간 동안 테이블에 **강력한 락(Exclusive DML Lock)** 이 걸려 모든 DML(INSERT, UPDATE, DELETE) 작업이 차단됩니다.  
  
컬럼 사이즈를 줄이는 경우나 다른 데이터 타입으로 변경하는 경우도 대부분 `ALGORITHM=COPY`가 사용되어 락이 발생합니다.  
  
<br>  
  
# 락을 최소화하는 현명한 전략 💡 
그렇다면 서비스 중단 없이 컬럼 변경을 안전하게 수행하려면 어떻게 해야 할까요?  

* **MySQL 버전 업그레이드** : 가장 확실한 방법입니다. MySQL 8.0과 같은 최신 버전은 Online DDL 기능이 강화되어 락을 최소화할 수 있는 시나리오가 많습니다.  

* **ALGORITHM 및 LOCK 옵션 활용** : 가능하다면 `ALTER TABLE` 문에 `ALGORITHM=INPLACE` 또는 `ALGORITHM=INSTANT`와 `LOCK=NONE`을 명시하여 락을 최소화하도록 시도하세요.  
   
  
```SQL
ALTER TABLE your_table RENAME COLUMN old_column TO new_column, ALGORITHM=INPLACE, LOCK=NONE;

ALTER TABLE your_table MODIFY COLUMN your_column VARCHAR(NEW_SIZE) ALGORITHM=INPLACE, LOCK=NONE;
```

하지만 MySQL이 이 알고리즘을 지원하지 않는다고 판단하면 에러를 반환하고 COPY 알고리즘을 사용하라고 권고할 수 있습니다.

  
* **트래픽이 적은 시간대에 작업 수행** : `ALGORITHM=COPY`가 불가피하다면, 서비스에 미치는 영향을 최소화하기 위해 트래픽이 거의 없는 시간(예: 새벽)을 선택하여 작업을 수행해야 합니다.  

* `pt-online-schema-change` **와 같은 외부 툴 사용** : 테이블 크기가 매우 크거나 장시간의 락을 허용할 수 없는 미션 크리티컬한 시스템에서는 Percona Toolkit의 `pt-online-schema-change`와 같은 툴을 고려해보세요. 이 툴은 원본 테이블에 트리거를 설정하고 새로운 테이블을 생성하여 데이터를 복사하는 방식으로 작동하므로 서비스 중단을 최소화할 수 있습니다.  
  
* **사전 테스트 및** `EXPLAIN ALTER TABLE` : 운영 환경에 적용하기 전에는 반드시 개발/스테이징 환경에서 충분히 테스트하고, `EXPLAIN ALTER TABLE` 문을 사용하여 해당 작업이 어떤 락을 유발하며 얼마나 시간이 소요될지 예측하는 것이 중요합니다.  
  
--- 

데이터베이스 스키마 변경은 항상 신중해야 하는 작업입니다. 오늘 알아본 내용들을 바탕으로 더욱 안전하고 효율적인 데이터베이스 운영을 하시길 바랍니다!


# 참고   
* https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl.html 
* https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html   
* https://www.percona.com/blog/2014/01/02/online-schema-changes-for-mysql/ . 
* https://mariadb.com/kb/en/alter-table/