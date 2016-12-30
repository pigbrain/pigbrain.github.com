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
  
## Substitution  
  
* (λx.x)는 항등 함수이며 I로 표현할 수 있다
```
I ≡ (λx.x)  
II ≡ (λx.x)(λz.z)    
[λz.z/x]x = λz.z ≡ I  
```

* name이 동일할 때 free변수와 bound 변수의 혼동을 막기 위해 다른 name을 사용할 수 있다  
  
```
(λx.(λy.xy))y  
= (λx.(λt.xt))y  
= (λt.yt)  
```  
  
# Arithmetic  
* λ-calculus에서 숫자는 0부터 시작하고 다음 수를 가르키는 **s**(succesor) 함수를 이용하여 다음과 같이 표시된다  
  
```
0 = zero ≡ λs.(λz.z) = λsz.z
1 = suc(zero) ≡ λsz.s(z)
2 = suc(suc(zero)) ≡ λsz.s(s(z))
```
  
* succesor(**S**) 함수는 아래와 같이 정의한다  
  
```
S ≡ λwyx.y(wyx)
```
  
* S0 즉 1을 구하기 위해서 **S**함수에 zero를 적용한다  
  
```
S0 ≡ (λwyx.y(wyx))(λsz.z)       // w에 λsz.z 대입  
   = λyx.y((λsz.z)yx)           // s, z에 y, x를 대입 
   = λyx.y(x)  
   ≡ 1
```
  
  
  
## Addition  
  
* 2 + 3을 계산하고자 한다면 3에 successor 함수를 2번 적용하면 된다  

``` 
2S3 ≡ (λsz.s(sz))(λwyx.y(wyx))(λuv.u(u(uv)))
    = (λwyx.y(wyx))((λwyx.y(wyx))(λuv.u(u(uv))))
    = (λwyx.y(wyx))(λyx.y((λuv.u(u(uv)))yx))
    = (λwyx.y(wyx))(λyx.y(y(y(yx))))
    = λyx.y((λyx.y(y(y(yx))))(yx))
    = λyx.y(y(y(yy(yx))))
    ≡ 5
    
```  

## Multiplication  
  
* x와 y를 곱하는 것은 다음 함수를 이용한다  
  
```
λxyz.x(yz)

2 * 2 ≡ (λxyz.x(yz))22
      = λz.2(2z)
      = λz.2(2z)
      = λz.(λuv.u(uv))(λuv.u(uv))z
      = λz.(λuv.u(uv))(λv.z(zv))
      = λz.(λv.(λv.z(zv))((λv.z(zv))v)
      = λz.(λv.(λv.z(zv))(z(zv))
      = λz.(λv.z(z(z(zv))))
      = λzv.z(z(z(zv))))
      ≡ 4
```  
  
# Conditionals  
* true를 나타내는 **T** 그리고 false를 나타내는 **F**는 다음과 같이 정의한다  

```
T ≡ λxy.x 
F ≡ λxy.y 
```
  
  
## Logical operations  
* **AND(∧)**
  
```
∧ ≡ λxy.xy(λuv.v) ≡ λxy.x(F)
```  
  
* **OR(∨)**
  
```
∨ ≡ λxy.xy(λuv.u)y ≡ λxy.xTy
```  
  
* **NOT(ㄱ)**
  
```
ㄱ ≡ λx.x(λuv.v)(λab.a) ≡ λx.xFT

ㄱT ≡ λx.x(λuv.v)(λab.a)(λcd.c)
    = (λcd.c)(λuv.v)(λab.a)
    = λuv.v
    ≡ F
```    
  
## A conditional test  
  
## The predecessor function  
  
## Equality and inequalities  
  
# Recursion    
  
# 참고
* http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf  
* http://initnirvana.tumblr.com/post/143004374592/lambdacalculus