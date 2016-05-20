---
layout: post
category: Network
title: 301 vs 302 Redirect  
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
* 301 permanent redirect  
	* 301은 요청한 정보가 새로운 주소로 영구적으로 옮겨갔다는 것을 의미  
* 302 temporary redirect  
	* 302는 일시적으로 옮겨갔다는 것을 의미
* 301과 302는 사용자가 브라우저를 통해 웹서버에 요청했을때 돌려받는 웹서버의 상태코드  
  
# 301 permanent redirect  
* 요청한 정보(사이트나 페이지)가 영구적으로 옮겼다는 것을 의미한다  
	* aaa.com을 소유했던 사람이 bbb.com으로 사이트 주소를 옮겼을때 301 redirect를 해준다면 크롤러가 aaa.com에 접속했을때 aaa.com에서 인덱스한 내용의 주소가 bbb.com으로 바뀌었다는것을 감지하고 인덱스된 aaa.com의 주소를 자동으로 bbb.com으로 변경시켜 준다  
	* 검색시 'aaa'라는 키워드로 aaa.com이 검색결과에 나오던것이 bbb.com으로 나오게 된다  
	* 사이트 관리자는 손쉽게 검색엔진에 변경된 사항을 적용할수 있게되고 검색엔진을 통해 유입되는 트래픽을 잃지 않게 된다  
  
# 302 temporary redirect
* 현재 페이지나 사이트를 일시적으로만 옮겼다는 것을 의미한다  
	* aaa.com 소유자가 bbb.com으로 사이트를 옮겼는데 잘모르고 302 redirect를 해주게 되는경우 사용자는 자동으로 옮겨가게 되지만, 크롤러는 사이트가 옮겨갔다는것을 감지하더라도 일시적으로만 옮겨간것으로 간주하기 때문에 검색결과에 아무런 변화를 주지 않게 된다  
	* 특정 키워드로 검색을 했을때 aaa.com이 나오던것이 bbb.com으로 업데이트되지 않게 된다  
* 대부분 자바스크립트를 이용한 redirect, 메타태그(< meta http-equiv="refresh" content="0;url=http://새로운주소.com" />)를 이용한 redirect 또는 각각의 프로그래밍 언어를 사용한 단순 redirect가 이에 포함된다  
  
<br>  
  
### 대부분의 경우 302 보다 301 redirect를 사용하는 것을 추천 
  
<br>  
  
### 페이지 리디렉트와 검색엔진 최적화 301 redirect는 영구적으로 옮겼을때 302 redirect는 일시적으로 옮겼을때 사용  
  
<br>  
  
# 출처 
* http://www.seo-korea.com/301-vs-302-redirect/  