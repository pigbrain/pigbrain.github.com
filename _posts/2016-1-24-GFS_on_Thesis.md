---
layout: post
category: Thesis
title: The Google File System
tagline: by Pigbrain
tags: [Thesis]
---

<!--more-->

##1 INTRODUCTION##
* 빠르게 증가하는 데이터 처리에 대한 요구를 만족시키기 위해 고안된 시스템    
* 기존의 파일 시스템과의 차별점     
	* 시스템에서는 언제든지 오류가 발생할 수 있다고 생각한다  
		* 모니터링, 오류 검출, Fault Tolerance, 복구 시스템이 갖춰져있다      
	* 파일이 크다  
		* IO 처리, 블럭 크기에 대한 것들이 재검토되었다  
	* 파일에 기존 데이터를 덮어쓰기보다는 새로운 데이터를 추가한다(append)      
		* 새로운 데이터를 추가하여 파일을 수정함으로써 성능과 원자성을 보장할 수 있다  
	* 어플리케이션과 파일시스템 API를 통합 설계하는 것이 유연성을 증가시키면서 시스템 전체적으로 이익을 가져온다  
    
<br>  
    
##2 DESIGN OVERVIEW##  
  
###2.1 Assumtions###  
* 전체 시스템은 종종 오류를 발생 시킬 수 있는 값 싼 시스템들로 구성된다  
	* 모니터링, 오류 검출, Fault Tolerance, 복구 시스템이 갖춰져 있어야 한다  
* 수만개의 파일을 저장한다  
	* 대용량파일을 효율적으로 관리한다  
	* 작은 용량의 파일도 관리가 가능하지만 최적화하진 않는다  
* 큰 범위를 읽기 위한 streaming read 와 작은 범위를 읽기 위한 radmon read를 지원한다    
* 파일에 커다란 데이터를 추가하기 위한 wrtie 기능을 지원한다  
* 여러 클라이언트가 동시에 같은 파일에 데이터를 쓸수있는 방법이 제공되어야 한다  
* 높은 네트워크 대역폭이 있어야 한다      
	  
###2.2 Interface###  
  
###2.3 Architecture###  
  
###2.4 Single Master###  
  
###2.5 Cunk Size###  
  
###2.6 Metadata####  
  
#####2.6.1 In-Memory Data Structures #####
      
#####2.6.2 Chunk Locations #####
    
#####2.6.3 Operation Log #####
    
###2.7 Consistency Model####
    
#####2.7.1 Guarantees by GFS #####  
      
#####2.7.2 iMPLICATIONS FOR aPPLICATIONS #####  
      
    
<br>  
    
##3 SYSTEM INTERACTIONS##  
  
###3.1 Leases and Mutation Order###  
  
###3.2 Data Flow###  
  
###3.3 Atomic Record Appends###  
  
###3.4 Snapshot###  
  
  
<br>  
     
##4 MASTER OPERATION##  
  
###4.1 Namespace Management and Locking###  
  
###4.2 Replica Placement###  
  
###4.3 Creation, Re-replication, Rebalancing###  
  
###4.4 Gabage Collection###  
  
#####4.4.1 Mechanism #####  
  
#####4.4.1 Discussion #####  
  
###4.5 Stale Replica Detection###  
  
       
<br>    
    
##5 FAULT TOLERANCE AND DIAGNOSIS##  
 
###5.1 High Availability ###  
  
#####5.1.1 Fast Recovery#####  
      
#####5.1.2 Chunk Replication#####  
    
#####5.1.3 Master Replication#####  
        
###5.2 Data Integrity ###  
    
###5.3 Diagnostic Tools ###  
    
  
<br>
<br>  
  
#원문#  
* http://static.googleusercontent.com/media/research.google.com/ko//archive/gfs-sosp2003.pdf  
* 
