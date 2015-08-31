---
layout: post
category: MachineLearning
title: 예측함수 평가(Evaluating a Hypothesis)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

* 예측함수(hypothesis)는 훈련 데이터에 대해서는 낮은 오류율을 보인다  
* 과적합(Overfitting)과 같은 문제로 실제 데이터에 대해서는 부정확 할 수 있다  
<br>  

#예측함수(Hypothesis) 평가 방법#

* 훈련 데이터를 다음 두 가지로 분류한다
	* 훈련 데이터 (80%)  
	* 테스트 데이터 (20%)  
<br>  

* 훈련 데이터를 이용하여 Θ를 계산한다 (예측 함수 모델링)  
* 테스트 데이터를 이용하여 J(Θ)를 구한다  

<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/errRate.png" alt="">  
<br>  

* 만약 로지스틱 함수를 이용하여 데이터를 분류하는 경우 다음과 같이 오류를 판단한다  
<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/errFunction.png" alt="">  
<br>  

* 테스트 데이터들을 이용하여 다음과 같이 오류의 평균을 구할 수 있다  
	* 평균은 데이터가 오분류된 비율을 나타낸다  
  
<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/avgErr.png" alt="">  


#참고#
* https://share.coursera.org/wiki/index.php/ML:Advice_for_Applying_Machine_Learning