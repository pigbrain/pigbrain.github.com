---
layout: post
category: MachineLearning
title: 의사결정트리(Decision Tree)
tagline: by Pigbrain
tags: [MachineLearning]
---
의사결정트리(Decision Tree)를 만들고 데이터를 분류하는 방법에 대해 알아보자

<!--more-->

#의사결정트리(Decision Tree)#
**-분류 기술 중 가장 일반적으로 사용되는 방법**  
**-과거에 수집된 데이터를 분석하여 속성의 조합으로 나타내는 분류모형을 트리 형태로 만드는 것**  
**-만들어진 분류 모형(트리)은 새로운 데이터를 분류하고 해당 값을 예측하는데 사용**  

* 장점
	* 계산 비용이 적다
	* 학습된 결과를 사람이 이해하기 쉽다
	* 누락된 값(missiong value)이 있어도 처리할 수 있다.
* 단점
	* 과적합(overfitting)되기 쉽다


#용어#  
  
* Overfitting ?
	* 훈련집합(Training Set)에 맞춰서 생성되다 보니 테스트 집합이나 실제 분류되지 않은 데이터에 대해서는 큰 에러가 발생하는 문제
