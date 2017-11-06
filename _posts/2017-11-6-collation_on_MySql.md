---
layout: post
category: MySql
title: Collation
tagline: by Pigbrain
tags: [MySql]
---
  
<!--more-->
  
  
Collation은 대조, 분석과 같은 뜻을 가지고 있다. MySql에서 Collation이란 문자를 비교하는 규칙을 나타낸다.  

<br>
  
Charset으로 UTF-8을 사용한다면 Collation은 기본적으로 `utf8_general_ci`가 된다. 이 Collation을 사용한다면 DB는 영문의 대소문자를 동일하게 취급한다.   
  
  
즉, `A` == `a`이며 
```
SELECT * FROM WHERE NAME = "pigbrain"
```
과
```
SELECT * FROM WHERE NAME = "PIGBRAIN"
```
은 동일하게 취급된다. 이렇게 대소문자를 처리한 후에는 인코딩 타입을 비교하게 된다. 이런 Collation을 `case-insensitive collation`라고 부른다.  

이와 반대로 `binary collation`은 대소문자를 구분한다.  
이 collation은 byte 스트림 값으로 문자를 비교한다. 즉 utf8-general-ci이 아닌 `utf8_bin`을 사용할 수 있다.


이 Collation 정보들은 테이블뿐만 아니라 컬럼 각각에도 설정이 가능하다.
  
  
   
# 참고   
* https://dev.mysql.com/doc/refman/5.7/en/charset-general.html