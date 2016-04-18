---
layout: post
category: Java
title: Difference between Class.forName() and ClassLoader.loadClass()
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

# Class.forName() and ClassLoader.loadClass()
* 두 메소드 모두 java.lang.Class 오브젝트를 동적으로 로딩하는데 사용된다  
* String 파라미터 1개를 받는 형태의 forName() 메서드는 항상 caller의 ClassLoader를 사용한다  
	* 이 ClassLoader는 forName() 메소드를 실행한다  
* ClassLoader.loadClass()는 인스턴스 메서드다  
	* 사용자가 어떤 class의 ClassLoader를 사용할지 선택해야 한다  
* ClassLoader.loadClass() 혹은 3개의 파라미터를 갖는 forName() 메소드를 사용해야한다  
	* Class.forName(String, boolean, ClassLoader)  
* Class.forName()은 일반적으로 로딩된 class의 static 필드를 초기화하고 static initializer를 실행해준다  
* ClassLoader.loadClass()는 초기화를 실제 class가 사용되는 시점에 초기화한다  
* 3개의 파라미터를 갖는 Class.forName(String, boolean, ClassLoader)는 가장 일반적인 형태이다  
	* 초기화 시점을 2번째 boolean 파라미터를 통해 지정할 수 있다  
	* 항상 이 메소드를 사용하길 권장한다  
  
# 원문  
* http://www.javaworld.com/article/2077332/core-java/get-a-load-of-that-name.html  
  

