---
layout: post
category: Math
title: Lambda Calculus
tagline: by Pigbrain
tags: [Math]
---

<!--more-->


# λ-calculus (lambda calculus)
* 논리학자 Alonzo Church가 개념을 정의한 수학적 모델  
	* 수학적인 함수의 속성들을 연구하기 위해 고안되었지만, 현대 한수형 언어들의 이론적인 근간이 되었다  
* John McCarthy는 λ-calculus에서 영감을 받아 LISP를 만들었다고 한다  
  
  
# Definition  
* λ-calculus의 중심이 되는 개념은 expression이다  
* variable이라고도 불리는 name은 a, b, c.. 등과 같은 문자로 쓰여지는 식별자다   
  
```  
<expression> := <name> | <function> | <application>  
<function> := λ <name>.<expression>  
<application> := <expression><expression>  
```
	
* expression은 괄호로 감싸서 쓸 수 있다  
	* **E**가 expression이라면 **(E)**는 동일한 expression이다  
* λ-calculus에서 사용되는 유일한 keyword는 **λ**(lambda)와 **.**(dot)이다  
* `λx.x`
	* **λ**뒤에 위치한 x는 name(variable)이다  
	* **.**뒤에는 function 정의에 대한 body부분이 위치한다  
  
### Example1  

```
  (λx.x)y       // function에 y를 적용 
= [y/x]x        // [y/x]는 정의역 x에 대해 y로 치환되는 것을 나타내기 위해 사용한다  
= y
```   
  
### Example2
  
```
(λz.z) ≡ (λy.y) ≡ (λt.t) ≡ (λu.u) // ≡은 동의어임을 표시하기 위해 사용한다  
```  
  
## Free and bound variables  
* λ-calculus에서 모든 name(variable)들은 지역 변수로 정의된다  
	* `λx.x`에서 x는 bound 되었다고 한다  
	* `λx.xy`에서 x는 bound 변수이고 y는 free 변수이다  
	* `(λx.x)(λy.yx)`의 첫번째 expression에서 x는 bound되었고 두번째 expression에서 y도 bound 되었지만 x는 free 변수 이다  
* 다음의 경우 name(variable)은 free변수라고 판단한다  
  
```
 - <name>은 <name> expression에서 free 변수이다  
 - 만약 <name> ≠ <name1>이면 λ<name1>에서 <name>은 free 변수이다  
 - 만약 A, B에서 <name>이 free라면 <name>은 A.B에서 free이다  
```
  
* 다음의 경우 name(variable)은 bound변수라고 판단한다  
  
```
 - 만약 <name> = <name1>이면 λ<name1>에서 <name>은 bound 변수이다  
 - 만약 A나 B에서 <name>이 bound라면 <name>은 A.B에서 bound이다  
```  
  
* `(λx.xy)(λy.y)`의 첫번째 expression에서 y는 free변수이고 두번째 expression에서 y는 bound 변수이다  
  
  
  
# 참고
* http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf  
* http://initnirvana.tumblr.com/post/143004374592/lambdacalculus