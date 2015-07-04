---
layout: post
category: MachineLearning
title: K-Neareast Neighbor 알고리즘 (K-NN)
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->
  
**-다른 데이터들(훈련데이터)과 가장 유사한 K개의 데이터를 이용하여 값을 예측하는  알고리즘**   
**-입력 데이터와 훈련 데이터들과의 유사성은 [유클리드거리](https://en.wikipedia.org/wiki/Euclidean_distance)를 이용**

* 장점
	* 높은 정확도
	* 오류 데이터(outlier)에 둔감
	* 데이터에 대한 가정이 필요 없다
* 단점
	* 계산 비용이 높다
	* 많은 메모리 필요 


#예제#
<table>
<tr><td>영화 제목</td><td>발차기 장면 횟수</td><td>키스 장면 횟수</td><td>영화 유형</td></tr>
<tr><td>A</td><td>3</td><td>104</td><td>로맨스</td></tr>
<tr><td>B</td><td>2</td><td>100</td><td>로맨스</td></tr>
<tr><td>C</td><td>1</td><td>81</td><td>로맨스</td></tr>
<tr><td>D</td><td>101</td><td>10</td><td>액션</td></tr>
<tr><td>E</td><td>99</td><td>5</td><td>액션</td></tr>
<tr><td>F</td><td>98</td><td>2</td><td>액션</td></tr>
<tr><td>G</td><td>18</td><td>90</td><td>?</td></tr>
</table>
<br>

**물음표에 해당하는 영화 유형을 찾아보자**  

1. 다른 모든 영화와의 유사도를 계산 한다  
2. 유사도가 가장 가까운(가장 작은) K개의 영화를 찾는다 (K=3으로 가정)  
3. K개중 다수의 영화 유형을 G의 영화 유형으로 예측한다  

<table>
<tr><td>영화 제목</td><td>영화 'G'와의 거리(유사도)</td></tr>
<tr><td>A</td><td><strong>20.5</strong></td></tr>
<tr><td>B</td><td><strong>18.7</strong></td></tr>
<tr><td>C</td><td><strong>19.2</strong></td></tr>
<tr><td>D</td><td>115.3</td></tr>
<tr><td>E</td><td>117.4</td></tr>
<tr><td>F</td><td>118.9</td></tr>
</table>
<br>

영화 G와 유사도가 가장 가까운 영화는 A, B, C 이다.  
A, B, C가 로맨스 이기 때문에 G도 로맨스 이다.  
