---
layout: post
category: Math
title: 조건부확률(Conditional Probability)
tagline: by Pigbrain
tags: [Math]
---

<!--more-->

**-사건 A가 일어났다는 가정하에 사건 B가 일어나는 확률**   
**-A·B가 동시에 일어나는 확률을 A가 일어나는 확률로 나눈 것과 같다**  
  
# 공식  
<img src="/assets/themes/Snail/img/Math\ConditionalProbability/formula.png" alt="">  

* P(A)는 사건 A가 일어날 확률 
* P(A ∩ B)는 사건 A와 사건 B가동시에 일어날 확률 
* P(A \| B)는 사건 A가 일어났을 때 사건 B가 일어날 확률  

# 증명
<img src="/assets/themes/Snail/img/Math\ConditionalProbability/proof.png" alt="">

* 포본공간은 **n**개의 원소로 구성되어 있다고 가정  
* A와 B의 교집합은 **c**개의 원소를 가진다고 가정

# 예제
 **문제 >** _주사위 한개를 연속으로 두 번 던진다. 첫 번째 던진 주사위의 눈이 두 번째 던진 주사위의 눈보다 작을 때 첫 번째와 두 번째 던진 주사위의 눈의 합이 9가 될 확률을 구하라._
 
1. 첫 번째 던진 주사위의 눈이 두 번째 던진 주사위의 눈 보다 작을확률 : A  

2. 두 주사위의 합이 9일 확률 : B  

3. 표본공간 Ω = [(1,1), (1,2) ... (6,5)(6,6)] 원소는 36개
4. A={(A1, A2) | A1 < A2} = {(1,2)(1,3)...(5,6)} 원소는 15개 -> P(A) = **15/36**  

5. B={(A1, A2) | A1 + A2 = 9} = {(3,6)(4,5)(5,4)(6,3)} 원소는 4개 -> P(B) = **4/36**  

6. A ∩ B = {(A1, A2) | A1 < A2, A1 + A2 = 9} = {(3,6)(4,5)} 원소는 2개 -> P(A ∩ B) = **2/36** 
 
7. P(B \| A) = **2/15** 
  
 
#참고
* http://terms.naver.com/entry.nhn?docId=1994937&cid=50315&categoryId=50315
* http://blog.naver.com/lucifer246/188508097