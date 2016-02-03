---
layout: post
category: MachineLearning
title: Naive Bayesian Classification
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

**-특성들 사이의 독립을 가정하는 베이즈 정리를 적용한 확률 분류의 일종**  
  
* 장점
	* 소량의 데이터를 가지고 작업이 이루어지며, 여러 개의 분류 항목을 다룰 수 있다
* 단점
	* 훈련 데이터에 민감하게 작용한다


# 배경지식  
* [조건부 확률](http://pigbrain.github.io/math/2015/07/04/ConditionalProbability_on_Math/)
* [베이스 정리](http://pigbrain.github.io/math/2015/07/05/Bayes_on_Math/)
   
#분류방법  
* 속성(x, y)가 있다. 이 속성이 분류1에 속할 확률을**P1**, 분류2에 속할 확률을**P2** 라고 한다
* P1(x, y) > P2(x, y) 이면 속성(x, y)는 분류항목1에 속한다
* P1(x, y) < P2(x, y) 이면 속성(x, y)는 분류항목2에 속한다

# 예제   
  
<table>
<tr><td>영화</td><td>단어</td><td>분류</td></tr>
<tr><td>1</td><td>fun,couple,love,love</td><td>Comedy</td></tr>
<tr><td>2</td><td>fast,furious,shoot</td><td>Action</td></tr>
<tr><td>3</td><td>Couple,fly,fast,fun,fun</td><td>Comedy</td></tr>
<tr><td>4</td><td>Furious,shoot,shoot,fun</td><td>Action</td></tr>
<tr><td>5</td><td>Fly,fast,shoot,love</td><td>Action</td></tr>
</table>
  
<br>
  
**어떤 문서에 “fun,furious,fast” 라는 3개의 단어만 있을 때, 이 문서는 Comedy인가? Action인가 ?**  
  
  
* 영화가 Comedy일 확률  
	* P(Comedy │ Words) = P(Words │ Comedy) * P(Comedy) / P(Words) -> **A**  
* 영화가 Comedy일 확률  
	* P(Action │ Words) = P(Words │ Action) * P(Action) / P(Words) -> **B**  

* A > B라면 Comedy로 분류하고, A < B라면 Action으로 분류한다.
* A, B 확률을 구할때 분모에 P(Words)가 들어가는데 A, B의대소만 비교 하기 때문에 굳이 P(Words)로 나눌 필요가 없다
	* A = P(Words │ Comedy) * P(Comedy)
	* B =  P(Words │ Action) * P(Action)
* 각 단어의 빈도 수
	* Count (fast,comedy) = 1 (Comedy 중 fast 라는 단어가 나오는 횟수)
	* Count(furious,comedy) = 0
	* Count(fun,comedy) = 3
	* Count(fast,action)= 2
	* Count(furious,action)=2
	* Count(furious,action) = 1
* P(Words │ Comedy)는 Comedy 영화 중, 지정한 단어가 나타나는 확률
	* P(fast,furious,fun │ Comedy)로 표현 가능 
	* P(fast │ Comedy) * P(furious │ Comedy) * P(fun │ Comedy)로 표현 가능
	* Comedy 영화에 나오는 총 단어의 개수 : 9 
	* P(fast │ Comedy) * P(furious │ Comedy) * P(fun │ Comedy) = (1/9) * (0/9) * (3/9)
	* 전체 영화 5편중에서 2편이 Comedy이기때문에, P(Comedy) = 2/5

* A = P(Comedy | Words) = ((1/9) * (0/9) * (3/9)) * 2/5 = 0
* B = P(Action | Words) = ((2/11) * (2/11)*(1/11)) * 3/5 = 0.0018 (동일한 방법으로 계산)
* **A < B 이기 때문에 해당 문서는 Action으로 분류**
  
#Laplace Smoothing을 이용한 예외 처리 ##
* 나이브베이시안의 단점 중 하나는 Training Data에 없는 새로운 단어가 나왔을 때 확률이 0이 되는 문제가 있다
* 위 현상을 방지하기 위해 Laplace(add-1) Smoothing이란 방법을 사용
* 빈도수에 +1을 해줌으로써 확률이 0이 되는 것을 방지
  

#참고#
* https://en.wikipedia.org/wiki/Naive_Bayes_classifier
* http://bcho.tistory.com/1010
* http://www.leesanghyun.co.kr/Naive_Bayesian_Classifier