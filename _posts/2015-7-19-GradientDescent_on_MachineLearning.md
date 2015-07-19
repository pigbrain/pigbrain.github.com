---
layout: post
category: MachineLearning
title: 기울기 하강 (Gradient Descent) 탐색 방법
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

* 미분의 개념을 최적화 문제에 적용한 방법 
* 함수의 Local Minimum을 찾는 방법

#기울기 상승(Ascent)과 기울기 하강(Descent)#
* **기울기 상승** : 어떤 함수의 극대점을 찾기 위해 현재 위치에서의 기울기 방향으로 이동해 가는 방법  
* **기울기 하강** : 극소점을 찾기 위해 gradient 반대 방향으로 이동해 가는 방법

# 기울기(Gradient) ?#
* 다변수 함수 f(X1, X2, ... Xn)에 대한 기울기

<img src="/assets/themes/Snail/img/MachineLearning/GradientDescent/gradient.png" alt="">  

# 기울기-예제#
<img src="/assets/themes/Snail/img/MachineLearning/GradientDescent/gradient-example.png" alt="">  

* (1, 1)에서 f값이 최대로 증가하는 방향은 (2, 2), 기울기는 ││(2, 2)││ 
  

# 기울기 하강을 이용한 탐색 방법#  
* 어떤 초기값 X0부터 시작하여 아래 식에 따라 기울기 반대 방향으로 X를 조금씩 이동시키면 f(X)가 극소가 되는 X를 찾을 수 있다  
	* λ는 알고리즘의 수렴속도를 조절하는 파라미터  
		* Step size 또는 Learning rate라 부른다  

<img src="/assets/themes/Snail/img/MachineLearning/GradientDescent/descent-formula.png" alt="">  


* 함수의 극소점이 아니라 극대점을 찾는 것이 목적이 아래 공식 이용
<img src="/assets/themes/Snail/img/MachineLearning/GradientDescent/ascent-formula.png" alt="">  
	

# 기울기 하강의 문제점 #
* Local Minimum에 빠질 수 있다  
* 해에 근접할수록 │∇f│가 0에 가까워지기 때문에 수렴속도가 느려진다


#참고#
* https://en.wikipedia.org/wiki/Gradient_descent
* http://darkpgmr.tistory.com/133