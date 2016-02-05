---
layout: post
category: Java
title: Does Java pass by reference or pass by value?
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
 
# tricky()        

	public void tricky(Point arg1, Point arg2) {
		arg1.x = 100;
		arg1.y = 100;
		Point temp = arg1;
		arg1 = arg2;
		arg2 = temp;
	}

	public static void main(String [] args)	{  
		Point pnt1 = new Point(0,0);
		Point pnt2 = new Point(0,0);
		System.out.println("X: " + pnt1.x + " Y: " +pnt1.y); 
		System.out.println("X: " + pnt2.x + " Y: " +pnt2.y);
		System.out.println(" ");
		tricky(pnt1,pnt2);
		System.out.println("X: " + pnt1.x + " Y:" + pnt1.y); 
		System.out.println("X: " + pnt2.x + " Y: " +pnt2.y);  
	}

* 실행 결과  

	`X: 0 Y: 0`  
	`X: 0 Y: 0`   
	`X: 100 Y: 100`  
	`X: 0 Y: 0`  

* tricky() 실행 결과로 pnt1의 값은 성공적으로 변경되었다  
* pnt1와 pnt2를 swap하는 것은 **실패**하였다    

---

### tricky() 메소드가 호출 될때 자바는 orginal refencece의 복사본을 만들어 파라미터로 넣어준다  
  
<img src="/assets/themes/Snail/img/Java/PassByValue/passByValue.png" alt="">  
  
* reference의 복사본도 original object를 가리키고 있기 때문에 object의 값은 변경에 성공했다  
* 메소드에 넘어간 reference는 복사본이기 때문에 swap이 실패한다   

### before tricky()  
  
  <img src="/assets/themes/Snail/img/Java/PassByValue/beforeTricky.png" alt="">  

### after tricky()  
   
  <img src="/assets/themes/Snail/img/Java/PassByValue/afterTricky.png" alt="">  

<br>  

# 자바 object는 reference로 조작된다  
# 그러나 메소드에는 reference가 복사된 사본이 넘겨진다 (by value)    
# 결과적으로 swap메소드를 통한 object 교환은 실패한다  



<br>  

# 원문  
* http://www.javaworld.com/article/2077424/learn-java/does-java-pass-by-reference-or-pass-by-value.html  


