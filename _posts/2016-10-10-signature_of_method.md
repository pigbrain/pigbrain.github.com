---
layout: post
category: Java
title: Determine the signature of a method
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

# signature of a method  
  
* JNI에서 자바 오브젝트의 메소드를 호출하기 전에 메소드의 signature가 필요하다  
* 다음 메소드의 signature는 **(ILJAVA/LANG/STRING;[I)J** 형태로 표현이 된다  
{% highlight java %}  
long myMethod (int n, String s, int[] arr);  
{% endhighlight %}  
  
* signature는 2개의 부분으로 구성된다  
	* 첫번째 부분은 괄호( )로 둘러싸여있고 메소드의 argument를 나타낸다  
	* 두번째 부분은 위 괄호가 끝나는 부분에서 시작하며 메소드의 return 타입을 나타낸다  
* 자바의 타입과 c의 타입은 다음처럼 매핑된다  
{% highlight java %}  
 Type      Chararacter  
 boolean      Z  
 byte         B  
 char         C  
 double       D  
 float        F  
 int          I  
 long         J  
 object       L  
 short        S  
 void         V  
 array        [  
{% endhighlight %}  
  
* 오브젝트임을 명시하기 위해 **L** 다음에 오브젝트의 클래스명이 나오고 세미콜론**(;)** 으로 끝난다  
  
  

# 원문  
* http://www.rgagnon.com/javadetails/java-0286.html  
  

