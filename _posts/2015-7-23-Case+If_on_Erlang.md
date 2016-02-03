---
layout: post
category: Erlang
title: case 구문, if 구문
tagline: by Pigbrain
tags: [Erlang]
---

<!--more-->

# case 구문    

	case Expression of  
	    Pattern1 [when Guard1] -> Expr_seq1;  
	    Pattern2 [when Guard2] -> Expr_seq2;  
	    ....  
	end  

* ﻿가장 먼저 Expression을 평가
	* Pattern1, Pattern2 등과 매치가 일어날 떄까지 차례로 진행  
	* 매치가 일어나면 대응되는 Expr_seq가 실행  
	* 아무 매치가 일어나지 않으면 예외가 발생  

<br>

# filter(P, L)  

    filter(P, [H|T])          ->  filter1(P(H), H, P, T);  
	filter(P, [])             -> [];  
    filter1(true, H, P, T)    -> [H|filter(P, T)];  
    filter1(false, H, P, T)   -> filter(P, T).  

* filter(P, L)는 L에서 P(X)가 true인 요소 X를 반환하는 기능을 수행


# case 예제 - filter(P, L)  

	filter(P, [H|T])    ->  
	    case P(H) of  
	        true   -> [H|filter(P, T)];  
	        false -> filter(P, T)  
	    end;  
	filter(P, []) -> [].   
  

# if 구문  

	if 
		Guard1 -> Expr_seq1;
		Guard2 -> Expr_seq2;
		....
	end  

* 가장 먼저  Guard1이 평가된다
	* Guard1이 true로 평가되면 if의 값은 Expr_seq1이 실행된 값이 된다
	* 만약 Guard1이 fail이면 Guard2가 평가되고 가드가 성공할 떄까지 평가가 이어진다 
	* if 식에 들어있는 가드 중 적어도 하나는 true로 평가되어야 한다  
	* true로 평가되는 식이 없을 경우 오류가 발생할 것이다  
  
* if 식의 마지막 가드가 애텀(atom) true인 경우가 있다 
	* 다른 모든 가드가 실패한 경우에는 식의 마지막 유형이 평가됨을 보장  

  
 