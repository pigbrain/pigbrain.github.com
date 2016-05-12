---
layout: post
category: OpenSource
title: Atomikos ?
tagline: by Pigbrain
tags: [Atomikos]
---

<!--more-->

# Atomikos

### Waht is JTA  
	* Java Transaction API  
	* 플랫폼마다 서로 다른 트랜잭션 매니저들과 어플리케이션들이 상호 작용할 수 있는 인터페이스를 정의  
	* JTA 구현체를 오픈소스로 제공 - Atomikos  
	* JTA 구현체를 어플리케이션 서버의 일부분으로 제공 - IBM  
	* [JTA Spec](http://www.oracle.com/technetwork/java/javaee/jta/index.html)  


### Waht is XA  
	* eXtended Architecture  
	* 하나의 Global Transaction으로 여러개의 데이터베이스에 접근하기 위한 X/Open 그룹 표준  
	* [XA Spec](http://pubs.opengroup.org/onlinepubs/009680699/toc.pdf)  
		* Atomikos와 같은 트랜잭션매니저는 어떤 작업이 어떤 트랜잭션의 한 부분으로 실행되고 있는지를 데이터베이스에 알릴 수 있어야 한다  
		* 트랜잭션의 종료 시점에 2PC를 통하여 커밋이 가능해야 한다  
		* 데이터베이스에서 지연되고 있는 트랜잭션을 복구(처리?)가 가능해야 한다  
	- 

### What is 2PC
* 2 Pase Commit  
				  
				Coordinator                            Cohort  
                           
                            ------Query to commit----->  

                           <------Vote Yes or No------  

                      commit/abort

                            ----Commit or Rollback---->

                                                commit/abort

                           <----------ack--------------
                      end  
                           

* 2PC로 구현된 OpenSource
	* ZooKeeper  

### How to Use  
 * com.atomikos.icatch.jta.UserTransactionManager 빈 생성  
	* Atomikos가 트랜잭션을 처리하기 위해 필요한 객체들 생성/초기화  
	* Transaction begin, commit, rollback 을 실행할 경우 UserTransactionImp를 참조  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToUse1.png" alt="">  
  
* com.atomikos.icatch.jta.UserTransactionImp 빈 생성  
	* Transaction begin, commit, rollback 을 하는 javax.transaction.UserTransaction 인터페이스 구현체  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToUse2.png" alt="">  
  
	
* 스프링 JtaTransactionManager 등록  
	* Jta 트랜잭션을 스프링이 이용 가능하도록 하기 위한 추상화 클래스  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToUse3.png" alt="">  
  
* XA DataSource 등록
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToUse4.png" alt="">    
  
* Atomikos 트랜잭션 선언 및 사용은 일반 트랜잭션과 동일하다  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToUse5.png" alt="">  
  


### Hwo to Commit (Atomikos - com.atomikos.icatch.imp.ActiveStateHandler.java)  
* Atomikos 소스는 오픈소스이다 (https://github.com/atomikos/transactions-essentials)  
* 2PC 방식에 따라 commit 진행  
* commit()  
	* prepare() : commit을 진행해도 되는지 투표하는 과정  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToCommit1.png" alt="">  
  
	* waitForReplies() : 투표 응답(commit 가능/불가능) 대기  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToCommit2.png" alt="">  
  
	* commitWithAfterCompletionNotification()  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToCommit3.png" alt="">  
  
	* rollbackWithAfterCompletionNotification()  
  
<img src="/assets/themes/Snail/img/OpenSource/Atomikos/HowToCommit4.png" alt="">  
  

# Reference
* http://www.atomikos.com/Documentation/  
* https://en.wikipedia.org/wiki/Two-phase_commit_protocol  
* http://springsource.tistory.com/138  