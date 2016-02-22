---
layout: post
category: Algorithm
title: Adler-32
tagline: by Pigbrain
tags: [Algorithm]
---

<!--more-->

# Adler-32  
* Mark Adler에 의하여 1995년에 개발된 체크섬 알고리즘  
* CRC에 비해 빠른 속도를 보인다  
* Adler-32는 Fletcher-16보다 안정적이지만 Fletcher-32보다는 안정적이지 못하다  

# Algorithm  
* Adler-32는 두개의 16비트 체크섬 A, B를 가지고 만들어진다  
* A, B는 32비트 Integer로 합쳐진다  
* A는 1로 초기화, B는 0으로 초기화  
* A = 모든 바이트의 합 + 1     
* B = A의 모든 값들에 대한 합  
* A, B의 최종값에 **65521**로 modulo 연산을 한다  
* B의 값을 16bit left shift 시킨 후 A와 더하여 Adler-32 값을 구한다   
  
  
		A = 1 + D1 + D2 + ... + Dn (mod 65521)  
		B = (1 + D1) + (1 + D1 + D2) + ... + (1 + D1 + D2 + ... + Dn) (mod 65521)  
		  = n×D1 + (n−1)×D2 + (n−2)×D3 + ... + Dn + n (mod 65521)  		         
     	Adler-32(D) = B × 65536 + A  
  

<br>  

# Example  
* "Wikipedia"    
   
<img src="/assets/themes/Snail/img/Algorithm/Adler32/example.png" alt="">  
   
<br>  
  
# 참고
* https://en.wikipedia.org/wiki/Adler-32     