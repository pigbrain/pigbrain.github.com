---
layout: post
category: Erlang
title: Arity, Fun
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

# Arity    
* 함수가 가지는 인수의 수  
* Erlang에서 동일한 모듈에서 이름은 같고 Arity가 다른 함수 두개는 전적으로 다른 함수를 의미  
* sum/2라는 것은 인수 2개를 갖는 sum 함수를 의미  
  
  
# Fun  
* Fun은 익명(Anonymous)함수이다  
* 인수의 수가 틀리다면 7행과 같은 오류가 발생  
<img src="/assets/themes/Snail/img/Erlang/Fun_Arity/fun-1.png" alt="">  
<br>  
<br>  
* Fun은 여러개의 절을 가질 수 있다 
<img src="/assets/themes/Snail/img/Erlang/Fun_Arity/fun-2.png" alt="">  
<br>  
* Fun은 함수의 인수가 될 수 있다  
	* 표준 라이브러리인 lists 모듈은 인수가 펀인 함수를 여러개 export 하고 있다  
	* lists:map(F, L)은 리스트 L의 모든 요소에 Fun F를 적용하고 그 결과로 만들어진 리스트를 반환  
	* lists:filter(P, L)은 리스트 L에서 P(E)가 true인 모든 항목을 리스트로 반환 
<img src="/assets/themes/Snail/img/Erlang/Fun_Arity/fun-3.png" alt="">  
<br>  
<br>  
* 함수의 리턴 값이 Fun이 될 수 있다  
	* lists:member(X, L)은 X가 리스트 L의 멤버이면 true를, 그렇지 않으면 false를 반환
<img src="/assets/themes/Snail/img/Erlang/Fun_Arity/fun-4.png" alt="">    

