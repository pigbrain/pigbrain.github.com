---
layout: post
category: MachineLearning
title: K-Neareast Neighbor 알고리즘 (K-NN)
tagline: by Pigbrain
tags: [MachineLearning]
---
지도학습(Supervised Learning) 중 K-NN에 대하여 알아보자 

<!--more-->
  
* K-NN ?
	* 다른 데이터들(훈련데이터)과의 유사성을 기준으로 분류하는 알고리즘
	* 입력 데이터와 훈련 데이터들과의 유사성은 [유클리드거리](https://en.wikipedia.org/wiki/Euclidean_distance)를 이용
* 장점
	* 높은 정확도
	* 오류 데이터(outlier)에 둔감
	* 데이터에 대한 가정이 필요 없다
* 단점
	* 계산 비용이 높다
	* 많은 메모리 필요 

<br>
**분류(classification) 하고자 하는 클래스의 종류에 대해서는 알고 있지만 샘플들 각각에 대한 확률밀도함수 (probability density function) 을 알지 못하는 상태에서 사용한다.**  

