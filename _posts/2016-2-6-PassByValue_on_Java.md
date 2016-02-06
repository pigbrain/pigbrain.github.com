---
layout: post
category: Java
title: Does Java pass by reference or pass by value
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

#### Q: pass-by reference ? 자바에서 swap 함수가 제대로 동작하지 않는 이유는..?  

#### A: 자바에서 모든 Objcet는 reference로 조작된다. 모든 오브젝트 변수는 reference이다. 자바는 메소드 argument에 reference를 넘기지 않는다  

<br>  

# badSwap()  

	public void badSwap(int var1, int var2) {
		int temp = var1;
		var1 = var2;
		var2 = temp;
	}

* badSwap()메소드가 리턴 되었을때 argument로 들어갔던 var1, var2는 변경된 값이 아닌 원래 값을 가지고 있다  
* argument 타입을 Object로 바꾼더라도 결과는 동일하다 
	* var1, var2의 값은 변경되지 않는다  
<br>  
<br>  

# 원문  
* http://www.javaworld.com/article/2077424/learn-java/does-java-pass-by-reference-or-pass-by-value.html  


