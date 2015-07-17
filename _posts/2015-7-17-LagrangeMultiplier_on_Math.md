---
layout: post
category: Math
title: 라그랑주 승수(Lagrange Multiplier)
tagline: by Pigbrain
tags: [Math]
---

<!--more-->

**-제약이 있는 최적화 문제를 푸는 방법**  
**-어떤 함수가 주어진 제약식을 만족시키면서, 그 함수가 갖는 최대값 혹은 최소값을 찾고자할 때 사용**
  
#공식#
* L(x,λ) = F(x) + λ*h(x)
	* 변수들에 대해 각각 편미분을 한 식이 0이 되는 값을 구한다
	* 기울기가 같아지는 공통접선을 구하는 것
	* F(x) = F(X)에서 양변에 0에 해당하는 제약식(**0 = h(x)**)을 더해서 F(x) + 0 = F(x) + h(x) 으로 놓고 문제를 푼 것

#증명#
* z = f(x, y)의 최대값과 최소값을 구하기 위해서는 극값과 경계선에서의 함수 값들을 비교하면 된다
	* D = {(x, y} │ 0 <= x <= 1,  0 <= y < 1} 
		* 경계선은 x=0, x=1, y=0, y=1 이므로 경계선에서의 최대값, 최소값을 구할 수 있다

* 만약 아래와 같은 식에서 최대값, 최소값을 구해야 한다면 ?  
<img src="/assets/themes/Snail/img/Math/LagrangeMultiplier/prof1.png" alt="">   
	* 위 식에서 최대값, 최소값을 구하려면 다소 복잡하다 

* 경계선에서의 최대값과 최소값을 쉽게 구할 수 있는 방법은 ?
<img src="/assets/themes/Snail/img/Math/LagrangeMultiplier/prof2.png" alt="">    



#예제#

#참고
* http://economia.tistory.com/2  
* http://zetablog.tistory.com/8  
* http://newsight.tistory.com/96  
* http://blog.naver.com/mindo1103/90154212128  