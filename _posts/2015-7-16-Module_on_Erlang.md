---
layout: post
category: Erlang
title: 모듈 (Module)
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

# 모듈  
* 모듈은 Erlang에서 코드의 기본 단위
* 사용자가 작성한 모든 함수는 모듈에 담긴다
* 모듈은 확장자가 .erl인 파일에 저장

# 예제-1  
**geometry.erl**
<img src="/assets/themes/Snail/img/Erlang/Module/module-1.png" alt="">  
<br>  

* 각 절(Cluase)은 세미콜론으로 구분  
* 마지막 절은 마침표로 끝난다  
* 함수를 모듈 밖에서 호출하고자 한다면 export 를 꼭 써줘야 한다  
<br>  
<img src="/assets/themes/Snail/img/Erlang/Module/module-2.png" alt="">  
<br>  

# 예제-2  
**shop.erl**
<img src="/assets/themes/Snail/img/Erlang/Module/module-3.png" alt="">  
<br>
**shop1.erl**
<img src="/assets/themes/Snail/img/Erlang/Module/module-4.png" alt="">  
<br>

# 실행  
<img src="/assets/themes/Snail/img/Erlang/Module/module-5.png" alt="">  

