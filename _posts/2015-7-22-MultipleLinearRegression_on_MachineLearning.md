---
layout: post
category: MachineLearning
title: 다중 선형 회귀(Multiple Linear Regression)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

#다중 선형 회귀#   
`선형 회귀에 대해 먼저 이해해야 한다`  

**-여러개의 입력 값(독립 변수)을 가지고 출력 값(종속 변수)을 예측하고 싶을 때 사용**  
<img src="/assets/themes/Snail/img/MachineLearning/MultipleLinearRegression/multipleLinearRegression.png" alt="">  


#배경지식#
* [최소제곱법](http://pigbrain.github.io/math/2015/07/19/MethodOfLeastSquares_on_Math/)
* [기울기 하강을 이용한 탐색](http://pigbrain.github.io/machinelearning/2015/07/19/GradientDescent_on_MachineLearning/)
* [선형 회귀](http://pigbrain.github.io/machinelearning/2015/07/20/LinearRegression_on_MachineLearning/)

#예측 방법#
* 예측 함수(Hypothesis Function)은 다음과 같은 형태를 갖는다  

<img src="/assets/themes/Snail/img/MachineLearning/MultipleLinearRegression/hypothesisFunction.png" alt="">  

* θ0, θ1, ... θn 의 최소값을 찾기위해 **최소 제곱법**, **기울기 하강을 이용한 탐색** 등을 수행한다  
	* 선형회귀에서의 계산 법과 동일하다

* 비용 함수 (Cost Function)
<img src="/assets/themes/Snail/img/MachineLearning/MultipleLinearRegression/costFunction.png" alt="">  

* 비용 함수(Cost Function)을 계산하기 위해서는 θ0, θ1, ... θn 값이 필요
	* θ0, θ1, ... θn을 구하기 위해서는 [기울기 하강을 이용한 탐색](http://pigbrain.github.io/machinelearning/2015/07/19/GradientDescent_on_MachineLearning/)기법을 사용
	* **θ0, θ1, ... θn은 동시에 업데이트하여 적용해야 한다**  
<img src="/assets/themes/Snail/img/MachineLearning/MultipleLinearRegression/gradient_descent.png" alt="">  

* 최적의 θ0, θ1, ... θn을 찾아 h(x) 예측 함수를 완성 할 수 있다

#참고#
* http://blog.naver.com/libido1014/120122338861  
* http://egloos.zum.com/canoas27/v/2110434