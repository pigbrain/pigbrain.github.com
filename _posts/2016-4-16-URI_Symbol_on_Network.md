---
layout: post
category: Network
title: URI
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

# URI
* **U**niform **R**esource **I**dentifier  
* 리소스를 식별하는 ID  
* 웹상에 존재하는 모든 리소스를 동일한 방식으로 보여줄 수 있다  
  
### URI의 구문  
* http://blog.example.com/entries/1
	* URI Scheme : http  
	* Hostname : blog.example.com  
	* Path : /entries/1  
* 유일한 호스트명/경로를 사용함으로써, URI가 중복되지 않는다  * http://xguru:pass@xguru.net:8000/search?q=test&debug=true#n10  
	* URI Scheme : http  
		* 구분자 : **//**  
	* 사용자정보 : id = xguru, pwd = pass  
	* Hostname : xguru.net  
		* 구분자 : **:**  
	* Port : 8000  
		* 생략시 URI Scheme의 기본값으로 사용. http의 기본 포트 번호는 80  
	* Path : /search  
		* 구분자 : **?**  
	* Query parameter : q=test&debug=true  
	* URI Fragment : #n10
  
### URI와 문자  
* URI에 쓸 수 있는 문자  
	* 알파벳 : A-Z a-z  
	* 숫자 : 0-9  
	* 예약문자 : **;**, **/**, **?**, **:**, **@**, **&**, **=**, **+**, **$**, **.**  
	* 비예약문자 : **-**, **_**, **!**, **~**, **\***, **'**, **(**, **)**  
* % 인코딩  
	* 허용하지 않는 문자들을 URI에 사용할때 인코딩하는 방식  
	* % -> %25, Space -> %20  
* URI 길이 제한  
	* 스펙상 제한은 없다  
		* 구현상 제한이 존재  
	* IE는 2038바이트로 제한된다  

# 참고 
* http://www.slideshare.net/guruguru/ss-14241987  