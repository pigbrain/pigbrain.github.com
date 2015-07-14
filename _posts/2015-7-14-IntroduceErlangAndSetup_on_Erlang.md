---
layout: post
category: Erlang
title: 얼랭(Erlang)에 대한 소개와 설치
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

#얼랭(Erlang)이란 ?#
* 병령 프로그래밍 언어
* 함수형 언어
* 가상머신(VM) 위에서 실행
* 대용량 실시간 시스템을 개발하는데 사용
 
# 얼랭 설치 및 시작#
* 설치
	* 리눅스
		* 데비안 기반 리눅스는 Erlang 패키지를 통하여 설치가 가능  
			1. apt-get install erlang
		* 소스를 이용하여 설치
			1. wget http://www.erlang.org/download/otp_src_17.1.tar.gz  
				
				// http://www.erlang.org/download.html 에서 소스 파일을 다운로드  
			2. tar -xzf otp_src_17.1.tar.gz
			3. ./configure
			4. make
			5. sudo make install
	* 윈도우
		1. http://www.erlang.org/download.html  에서 윈도우 바이너리 링크를 통하여 다운로드 받고 설치
* 실행
	* 리눅스
		* 쉘에 erl 명령어 실행
	* 윈도우
		* CMD에서 erl 명령어 실행   

#참고
* http://www.erlang.org/
