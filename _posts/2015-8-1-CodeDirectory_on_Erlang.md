---
layout: post
category: Erlang
title: 디렉토리 구조로 코드 관리하기
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->
  
* 어플리케이션이 점점 복잡해진다면 ?
	* 코드를 관리할 수 있는 단위로 구분지어 상이한 디렉터리에 두게 될 것이다  
	* 다른 프로젝트의 코드를 포함시킨다면, 이 코드들은 그만의 디렉토리 구조를 가지고 있을것이다  

<br>

* 얼랭 런타임 시스템은 코드 자동 로드 매커니즘을 사용한다  
	* 코드의 정확한 버전을 찾을 수 있도록 일련의 검색 경로를 설정해야 한다  	

<br>  

* 코드 자동 로드 매커니즘
	* 코드 로딩 매커니즘은 얼랭으로 구현되어 있다  
	* 코드 로딩은 '요청이 있는 경우'에 수행된다
		* 시스템이 만약 로드되지 않은 어떤 모듈에 있는 함수를 호출하면, 예외가 발생하고 시스템은 그 모듈의 Object 코드 파일을 찾는다  
		* 만약 맨 처음 일치하는 파일을 찾으면 검색은 중단되고 그 파일의 오브젝트 코드가 시스템으로 로드된다  
<br>
* 얼랭 쉘에서 code:get_path()명령을 통하여 현재 로드 경로의 값을 확인 가능  
<img src="/assets/themes/Snail/img/Erlang/CodeDirectory/codeDirectory-1.png" alt="">  
<br>

* 로드 경로를 추가하기 위해서는 다음 2가지 함수를 가장 흔하게 사용  
	* **code:add_patha(Dir)** : Dir을 로드 경로의 앞에 추가한다  
	* **code:add_pathz(Dir)** : Dir을 로드 경로의 끝에 추가한다  
<br>  
	
	* 어느 함수를 사용하든 상관없지만 두 함수가 서로 다른 결과를 만들어 내는지는 유심히 확인해야 한다  
		* 뭔가 잘못된 모듈이 로드되었다는 의심이 들면 다음과 같은 방법으로 확인 한다  
		* **code:all_loaded()** (이 함수는 모든 로드된 모듈의 리스트를 보여준다)  
		* **code:clash()**를 호출하면 무었이 잘못되었는지 확인 가능  
<br>  

	* Erlang 쉘을 시작할때 > erl -pa Dir1 -pa Dir2 ... -pz DirK1 -pz DirK2 같은 명령으로 실행 가능
		* **-pa Dir** 플래그는 코드 검색 경로의 앞에 Dir을 추가  
		* **-pz Dir**은 코드 경로의 끝에 추가  
<br>  

* 얼랭에서 판단하는 홈 디렉터리를 알기 위해서는 다음과 같이 한다  

<img src="/assets/themes/Snail/img/Erlang/CodeDirectory/codeDirectory-2.png" alt="">  



