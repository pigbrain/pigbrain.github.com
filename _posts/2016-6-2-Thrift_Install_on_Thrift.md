---
layout: post
category: OpenSource
title: Install Thrift IDL on CentOS 6.5
tagline: by Pigbrain
tags: [RabbitMQ]
---

<!--more-->

# Building Apache Thrift on CentOS 6.5
아래 단계들은 Centos 6.5에서 빌드하기 위해 필요한 최소 설치이다.  
여기서는 master 브랜치에 있는 소스를 빌드하여 설치한다.
  
  
### Update the System  
  
	sudo yum -y update
  
### Install the Platform Development Tools  
  
	sudo yum -y groupinstall "Development Tools"
  
### Upgrade autoconf/automake/bison  
  
	sudo yum install -y wget
  
  
##### Upgrade autoconf  
  
	wget http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz
	tar xvf autoconf-2.69.tar.gz
	cd autoconf-2.69
	./configure --prefix=/usr
	make
	sudo make install
	cd ..
  
  
##### Upgrade automake  
  
	wget http://ftp.gnu.org/gnu/automake/automake-1.14.tar.gz
	tar xvf automake-1.14.tar.gz
	cd automake-1.14
	./configure --prefix=/usr
	make
	sudo make install
	cd ..
  
##### Upgrade bison  
  
	wget http://ftp.gnu.org/gnu/bison/bison-2.5.1.tar.gz
	tar xvf bison-2.5.1.tar.gz
	cd bison-2.5.1
	./configure --prefix=/usr
	make
	sudo make install
	cd ..
  
# Build and Install the Apache Thrift IDL Compiler  
  
	git clone https://git-wip-us.apache.org/repos/asf/thrift.git
	cd thrift
	./bootstrap.sh
	./configure --with-lua=no --with-php=no
	make
	sudo make install
  
컴파일러(thrift/compiler/cpp/thrift --version)와 언어 라이브러리들을 빌드한다.  
make는 컴파일러를 /usr/local/bin/thrift 경로에 설치한다.  
언어 라이브러리 빌드 없이 컴파일러만 설치하고자 한다면 ./configure --enable-libs=no 설정을 한다.  
  
<br>  
  
  
# Test - Java
  
##### hello.thrift
  
	namespace java co.kr.jaso.hello.thrift.generated
	
	service HelloService {
	        string greeting(1:string name, 2:i32 age)
	}
	
  
##### run thrift 
  
	thrift --gen java hello.thrift  
  
  
  
<br>  
  
# 참고  
* https://thrift.apache.org/docs/install/centos  


