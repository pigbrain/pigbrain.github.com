---
layout: post
category: MachineLearning
title: Evaluating a Hypothesis Function
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

* Hypothesis Function은 Training Data에 대해서는 낮은 오류율을 보인다  
* Overfitting과 같은 문제로 실제 데이터에 대해서는 부정확 할 수 있다  
<br>  

#Hypothesis Function을 평가하는 방법#

* Training set을 다음 두 가지로 분류한다
	* Training set (80%)  
	* Test set (20%)  
<br>  

* Training set을 이용하여 Θ를 계산한다 (Hypothesis 모델링)  
* Test set을 이용하여 J(Θ)를 구한다  

<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/errRate.png" alt="">  
<br>  

* 만약 로지스틱 함수를 이용하여 데이터를 분류하는 경우 다음과 같이 오류를 판단한다  
<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/errFunction.png" alt="">  
<br>  

* Test set을 이용하여 다음과 같이 오류의 평균을 구할 수 있다  
	* 평균은 데이터가 오분류된 비율을 나타낸다  
  
<img src="/assets/themes/Snail/img/MachineLearning/EvaluatingHypothesis/avgErr.png" alt="">  

#Cross Validation Set#

* Training set만 가지고 만든 알고리즘은 Training set에 대해서는 잘 동작하지만 좋은 Hypothesis Function으로 판단하기는 어렵다  
* Training set에 대해서는 낮은 오류율을 보이지만 다른 데이터들에 대해서는 높은 오류율을 보일 수 있다  
* 위 문제를 해결하기 위해 전체 훈련 데이터 중 일부를 Cross Validation Set 으로 사용 한다  
	* Training set  (60%)  
	* Cross Validation Set (20%)
	* Test set (20%)  

* Training set을 이용하여 Θ를 계산한다 (Hypothesis 모델링)  
* Cross Validation Set을 이용하여 오류가 가장 낮은 차수의 Hypothesis를 찾는다 
* Test set을 이용하여 J(Θ)를 구하여 평가한다  
<br>  

* Training Set만 이용하여 Hypothesis Function을 결정하지 않고 Cross Validation Set을 이용함으로써 오류율을 줄일 수 있다  
<br>


#참고#
* https://share.coursera.org/wiki/index.php/ML:Advice_for_Applying_Machine_Learning