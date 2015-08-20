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
	* 모든 입력과 출력이 0 또는 1이 되어야 한다  
	* Local Minimum에 빠지기 쉽다  


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
	* 초록색 뉴런은 입력을 받는다  
	* 초록색 뉴런은 입력 값에 가중치를 포함하여 파란색 뉴런으로 데이터를 전달 한다  
	* 파란색 뉴런은 입력 된 값들을 연산하여 노란색으로 데이터를 전달 한다  
	* 노란색 뉴런은 입력 된 값들을 연산하여 결과 값을 출력한다  
	* 각각의 뉴런은 0또는 1의 출력 값을 가져야 하기 때문에 시그모이드 함수와 같은 것들을 이용한다  

<br>  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuralNetwork_sample.png" alt="">  

* 위 그림에서 Wαβ은 α에서 β로 이동할때 곱해지는 가중치를 의미한다  
  
#뉴럴 네트워크 예#  
* AND 연산을 하는 뉴럴 네트워크  
	* 0 또는 1을 입력으로 받는다  
	* g(Χ)의 함수는 [시그모이드 함수](http://pigbrain.github.io/math/2015/07/10/SigmoidFunction_on_Math/)를 이용  
<img src="/assets/themes/Snail/img/MachineLearning/NeuralNetwork/neuralNetwork_and.png" alt="">  
<br>  

#비용 함수(Cost Function)#
  
  
#역 전파(Back Propagation)#
  
  
#참고#
* https://share.coursera.org/wiki/index.php/ML:Neural_Networks:_Representation  
* https://share.coursera.org/wiki/index.php/ML:Neural_Networks:_Learning
* http://chocbar.tistory.com/51  
* http://no-smok.net/nsmk/NeuralNetwork#s-4
* http://blog.secmem.org/197
