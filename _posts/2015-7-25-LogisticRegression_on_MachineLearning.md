---
layout: post
category: MachineLearning
title: 로지스틱 회귀(Logistic Regression)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

#회귀 ?#
* 두 변수 x와 y와의 관계에 적합한 선
* 회귀가 직선인 경우에는 회귀 직선이라 한다
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/regression.png" alt="">  

#로지스틱 회귀#   
**-종속변수가 이항형 문제(유효한 범주의 개수가 두개인 경우)를 분류할 때 사용**

* 장점
	* 계산 비용이 적고 구현이 쉽다
	* 결과 해석을 위한 표현이 쉽다
* 단점
	* 언더피팅(Underfitting)경향이 있어 정확도가 낮게 나올 수 있다 

#배경지식#
* [시그모이드 함수](http://pigbrain.github.io/math/2015/07/10/SigmoidFunction_on_Math/)  
* [기울기 하강을 이용한 탐색](http://pigbrain.github.io/machinelearning/2015/07/19/GradientDescent_on_MachineLearning/)  

  
#분류방법#
* 예측 함수(Hypothesis Function)는 0과 1사이의 값을 갖는다  
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/hypohesisFunction_range.png" alt="">    
    
* 함수 g(z)는 0과 1사이의 값을 갖는다  
	* 시그모이드 함수 이용 (로지스틱 함수라고 부르기도 한다)   
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/hypohesisFunction_Representation.png" alt="">   
  
* 예측 함수를 이용하여 아래와 같은 확률을 유추 가능  
	* h(x)=0.7 이라면 1이 될 확률은 70%라는 것을 의미  
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/hypohesisFunction_Probability.png" alt="">  
  
* h(x)의 결과 값에 따라 0과 1로 분류  
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/decisionBoundary_definition.png" alt="">
  
* 위 시그모이드 함수 그래프에서 다음과 같은 성질을 확인 가능
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/decisionBoundary_features.png" alt="">  
  



#용어#
* 오버피팅(Overfitting)과 언더피팅(Underfitting)
	* 훈련 데이터 집합에만 과하게 적합되어 검증 데이터 집합이나 다른 입력에 대해 부정확한 결과를 내는 것을 오버피팅이라 한다
	* 위와 반대로 모호한 결과를 내는 것을 언더피팅이라 한다.
<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/overfitting_underfitting.png" alt="">

* [기울기 하강](https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%82%AC_%ED%95%98%EA%B0%95%EB%B2%95)

#참고#
* http://terms.naver.com/entry.nhn?docId=2323285&cid=42419&categoryId=42419
* http://blog.secmem.org/647
* https://people.cs.pitt.edu/~milos/courses/cs2710/lectures/Class22.pdf