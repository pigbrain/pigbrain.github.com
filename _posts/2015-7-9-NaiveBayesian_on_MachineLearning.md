---
layout: post
category: MachineLearning
title: 나이브 베이스 분류(Naive Bayesian Classification)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

**-특성들 사이의 독립을 가정하는 베이즈 정리를 적용한 확률 분류의 일종**  
  
* 장점
	* 소량의 데이터를 가지고 작업이 이루어지며, 여러 개의 분류 항목을 다룰 수 있다
* 단점
	* 훈련 데이터에 민감하게 작용한다

* 배경 지식
	* [조건부 확률](http://pigbrain.github.io/math/2015/07/04/ConditionalProbability_on_Math/)
	* [베이스 정리](http://pigbrain.github.io/math/2015/07/05/Bayes_on_Math/)

* 분류 방법
 	* 속성(x, y)가 있다. 이 속성이 분류1에 속할 확률을**P1**, 분류2에 속할 확률을**P2** 라고 한다
	* P1(x, y) > P2(x, y) 이면 속성(x, y)는 분류항목1에 속한다
	* P1(x, y) < P2(x, y) 이면 속성(x, y)는 분류항목2에 속한다
	


* 참고 
	* http://bcho.tistory.com/1010