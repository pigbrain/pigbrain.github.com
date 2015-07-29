---
layout: post
category: MachineLearning
title: 과적합(Overfitting)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->
  
**-과적합(Overfitting)이란 훈련 데이터에만 적합한 모델을 만들었을때 발생**  
**-훈련데이터에 대해서는 정확한 결과를 얻을 수 있다**  
**-새로운 입력 데이터에 대해서는 정확한 결과를 얻지 못한다**  

<img src="/assets/themes/Snail/img/MachineLearning/LogisticRegression/overfitting_underfitting.png" alt="">  
  
#과적합(Overfitting)이 발생하는 이유#  
* 예측 함수(hypothesis function)를 훈련 데이터에 완벽하게 일치하도록 만들기 위하여 복잡하게 만들었을때 발생
* 주어진 훈련 데이터에 비해 높은 복잡도(높은 지수)를 가지는 에측 함수를 만들었을때 발생  
  
#과적합(Overfitting)을 방지하기 위한 방법#  
* 속성의 수를 줄인다  
	* 유지하고자 하는 속성만 선택  
	* Model Selection 알고리즘 이용  
* 정형화(Regularization)  
	* 모든 속성을 유지하되 θ의 값을 줄인다 


#참고#
* http://sanghyukchun.github.io/59/  
* http://ibis.tistory.com/33  
* https://share.coursera.org/wiki/index.php/ML:Regularization