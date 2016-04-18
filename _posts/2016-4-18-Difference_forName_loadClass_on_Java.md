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
  
# Class initialization errors are tricky 
* 성공적으로 로딩된 class에서 더 이상 문제가 발생하지 않는다고는 장담 할 수 없다  
* static initializer 코드가 다시 실행되게 되면 문제가 발생 할 수 있다  
* 해당 문제는 **java.lang.ExceptionInInitializerError**으로 wrapping 되어 나온다  
* ExceptionInInitializerError 오류를 처리하고 다시 초기화를 시키도록 시도하더라도 정상적으로 동작하지 않을 것이다  
		
		public class Main {
			public static void main (String [] args) throws Exception {
				
				for (int repeat = 0; repeat < 3; ++ repeat) {
					try {
						// "Real" name for X is outer class name+$+nested class name:
						Class.forName ("Main$X");
					} catch (Throwable t) {
						System.out.println ("load attempt #" + repeat + ":");
						t.printStackTrace (System.out);
					}
				}
			}
			
			private static class X {
				static {
					if (++ s_count == 1)
						throw new RuntimeException ("failing static initializer...");
				}
			} // End of nested class
				
			private static int s_count;

		} // End of class
	
* 위 코드는 3번 예외가 발생한다  
* X의 static initializer는 모두 실패처리가 되었다  
		
		>java Main
			load attempt #0:
			java.lang.ExceptionInInitializerError
				at java.lang.Class.forName0(Native Method)
				at java.lang.Class.forName(Class.java:140)
				at Main.main(Main.java:17)
			Caused by: java.lang.RuntimeException: failing static initializer...
				at Main$X.(Main.java:40)
				... 3 more
			
			load attempt #1:
			java.lang.NoClassDefFoundError
				at java.lang.Class.forName0(Native Method)
				at java.lang.Class.forName(Class.java:140)
				at Main.main(Main.java:17)

			load attempt #2:
			java.lang.NoClassDefFoundError
				at java.lang.Class.forName0(Native Method)
				at java.lang.Class.forName(Class.java:140)
				at Main.main(Main.java:17)
	
	* 2번째 forName()과정 부터는 NoClassDefFoundError 예외가 발생했다  
		* JVM은 이미 X class에 대한 정보를 알고있다  
		* 현재 ClassLoader가 GC에 의하여 사라지기전에는 X class에 대한 정보는 언로드 되지 않는다  
		* JVM은 Class.forName()이 반복적으로 호출 되었을때 initialization 과정을 반복하지 않고 NoClassDefFoundError 에외를 발생시킨다  
	* class를 다시 로드하기 위한 방법은 기존 ClassLoader 인스턴스를 삭제하고 새로 생성한다  
  
<br>  
  
# 원문  
* http://www.javaworld.com/article/2077332/core-java/get-a-load-of-that-name.html  
  

