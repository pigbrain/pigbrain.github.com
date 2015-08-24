---
layout: post
category: MachineLearning
title: 뉴럴 네트워크(Neural Network)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->
  
**-인공지능 분야에 속하는 기술**
**-신경세포(뉴런)를 모방하여 만들어진 인공지능 알고리즘**  
<br>  
  
* 장점  
	* 광범위한 문제영역을 다룰 수 있다  
	* 복잡한 계산과정에서도 좋은 결과를 도출해 낼 수 있다  
	* 한번 학습된 알고리즘은 빠른 시간 내에 결과를 도출하기 때문에 실시간 시스템 구현에 용이하다  
	* 올바르게 설계되고 학습된 경우 새로운 입력값에 대해 일반화 성능을 보인다  
* 단점
	* Local Minimum에 빠지기 쉽다  
	* 초기 가중치의 선택이 학습성능에 영향을 끼친다  


#뉴런 (Neuron)#  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuron.png" alt="">
<br>  

* 뉴런의 동작  
	* 수상돌기는 다른 여러개의 뉴런으로 부터 **입력**을 받는다  
	* 각 연결부의 신호의 강도는 다르다  
	* 입력받은 신호의 강도의 합이 일정값 이상이 되면 축색돌기로 신호를 전달한다  
	* 축색돌기의 신호가 다른 뉴런들에게 전달(**출력**)된다  


#뉴럴 네트워크(Neural Network)#  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuralNetwork.png" alt="">  
<br>  

* 뉴럴 네트워크의 동작  
	* 각각의 동그라미는 하나의 뉴런을 의미 한다  
	* 각각의 뉴런은 함수(Activation 이라 칭함)를 통하여 출력 값을 만들어 낸다  
	* 초록색 뉴런은 입력을 받는다  
	* 초록색 뉴런은 입력 값에 가중치를 곱하여 파란색 뉴런으로 데이터를 전달 한다  
	* 파란색 뉴런은 입력 된 값들로 연산(Activation 수행)하여 노란색으로 데이터를 전달 한다  
	* 노란색 뉴런은 입력 된 값들을 연산(Activation 수행)하여 결과 값을 출력한다  

<br>  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuralNetwork_sample.png" alt="">  

* 위 그림에서 Wαβ은 α에서 β로 이동할때 곱해지는 가중치를 의미한다  
  
#뉴럴 네트워크 예#  
* AND 연산을 하는 뉴럴 네트워크  
	* 0 또는 1을 입력으로 받는다  
	* g(Χ)의 함수(Activation)는 [시그모이드 함수](http://pigbrain.github.io/math/2015/07/10/SigmoidFunction_on_Math/)를 이용  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuralNetwork_and.png" alt="">  
<br>  

#비용 함수(Cost Function)#
* Activation 함수로 [로지스틱 회귀](http://pigbrain.github.io/machinelearning/2015/07/25/LogisticRegression_on_MachineLearning/)를 사용할 경우 비용 함수는 다음과 같다  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/costFunction.png" alt="">  
	* L : 레이어의 총 개수  
	* Sι : 레이어 l에서의 노드 개수 
	* K : 출력 노드 개수


  
#역 전파(Back Propagation)#
 * 역 전파 기법은 뉴럴네트워크에서 비용 함수를 최소화 하는 방법이다  
 * 선형회귀, 로지스틱 회귀에서와 마찬가지로 [기울기 하강 탐색 방법](http://pigbrain.github.io/machinelearning/2015/07/19/GradientDescent_on_MachineLearning/)을 사용한다  
  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/backPropagation.png" alt="">  

#참고#
* https://share.coursera.org/wiki/index.php/ML:Neural_Networks:_Representation  
* https://share.coursera.org/wiki/index.php/ML:Neural_Networks:_Learning
* http://chocbar.tistory.com/51  
* http://no-smok.net/nsmk/NeuralNetwork#s-4
* http://blog.secmem.org/197
