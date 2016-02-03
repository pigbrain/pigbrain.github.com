---
layout: post
category: MachineLearning
title: Normal Equation for regression
tagline: by Pigbrain
tags: [MachineLearning]
---

<!--more-->

`Linear Regression에 대해 먼저 이해해야 한다`  
  
**-Cost Function의 최저점 을 찾기 위한 방법**
<img src="/assets/themes/Snail/img/MachineLearning/NormalEquation/optimum.png" alt="">  

**-Gradient Descent 처럼 많은 반복 계산이 필요 없다**  

# 공식  
<img src="/assets/themes/Snail/img/MachineLearning/NormalEquation/normalEquation.png" alt="">
<br>
  
# 증명  
<img src="/assets/themes/Snail/img/MachineLearning/NormalEquation/proof.png" alt="">
<br>

# Gradient Descent와의 비교  
<table>
<tr><td>Gradient Descent/td><td>Normal Equation/td></tr>
<tr><td>최적의 a혹은 λ를 구해야 한다</td><td>a혹은 λ를 구할 필요가 없다</td></tr>
<tr><td>반복적인 계산이 필요하다</td><td>반복적인 계산이 필요없다</td></tr>
<tr><td>계수(n)가 높더라도 잘 동작한</td><td>계수(n)가 높아지면 느려진다</td></tr>
</table>
<br>
 
# 참고   
* https://share.coursera.org/wiki/index.php/ML:Linear_Regression_with_Multiple_Variables  
* http://eli.thegreenplace.net/2014/derivation-of-the-normal-equation-for-linear-regression  
