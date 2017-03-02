---
layout: post
category: Network
title: replace http:// with //
tagline: by Pigbrain
tags: [Network]
---

<!--more-->

```
<img src="//domain.com/img/logo.png"/>
```

* 위와 같이 스키마(http, https)를 생략하고 쓸 경우 다음과 같은 장점을 갖는다  
 	* 브라우저가 HTTPS를 통하여 페이지를 다운 받았다면 위 URL은 HTTPS로 요청한다   
	* 브라우저가 HTTP를 통하여 페이지를 다운 받았다면 위 URL은 HTTP로 요청한다   
	* IE에서 "페이지에 안전하지 않은 컨텐츠가 있습니다"라는 오류 메시지가 표시되지 않는다     

* Warning  
	* IE7과 IE8에서 `<link>` 혹은 css의 `@import`를 스키마를 생략하고 쓴다면 [컨텐츠를 두번 다운로드하는 버그](http://www.stevesouders.com/blog/2010/02/10/5a-missing-schema-double-download/)가 있다  
	
	


  
# 참고 
* http://stackoverflow.com/questions/550038/is-it-valid-to-replace-http-with-in-a-script-src-http