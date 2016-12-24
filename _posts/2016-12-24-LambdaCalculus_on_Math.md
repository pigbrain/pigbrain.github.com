---
layout: post
category: Math
title: Lambda Calculus
tagline: by Pigbrain
tags: [Math]
---

<!--more-->


## λ-calculus (lambda calculus)
* 논리학자 Alonzo Church가 개념을 정의한 수학적 모델  
	* 수학적인 함수의 속성들을 연구하기 위해 고안되었지만, 현대 한수형 언어들의 이론적인 근간이 되었다  
* John McCarthy는 λ-calculus에서 영감을 받아 LISP를 만들었다고 한다  
  
  
## Definition  
* λ-calculus의 중심이 되는 개념은 표현(expression)이다  
* variable이라고도 불리는 name은 a, b, c.. 등과 같은 문자로 쓰여지는 식별자다   
  
```  
<expression> := <name> | <function> | <application>  
<function> := λ <name>.<expression>  
<application> := <expression><expression>  

```
  
  
# 참고
* http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf  
* http://initnirvana.tumblr.com/post/143004374592/lambdacalculus