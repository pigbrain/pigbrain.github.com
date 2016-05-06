---
layout: post
category: Java
title: sun.misc.Unsafe
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

# sun.misc.Unsafe  
* 자바는 메모리 관리와 관련된 프로그래머의 실수를 막아주는 매우 안전한 프로그래밍 언어이다  
* 자바에서 **Unsafe**를 이용하여 고의적으로 메모리와 관련된 문제를 발생시킬 수 있다  

# Unsafe instantiation  
1. Unsafe Object를 생성해야한다  
	* Unsafe 클래스는 private 생성자를 가지고 있다  
		* Unsafe unsafe = new Unsafe();와 같이 간단하게 생성할 수 없다  
	* Unsafe 클래스는 getUnsafe() 메소드를 가지고 있다  
		* 만약 Unsafe.getUnsafe()를 바로 호출하려 한다면  SecurityException이 발생한다  
		* getUnsafe()메소드는 신뢰 가능한  코드에서만 호출이 가능하다  
		
### Unsafe.getUnsafe()
	
	public static Unsafe getUnsafe() {
		Class cc = sun.reflect.Reflection.getCallerClass(2);
		if (cc.getClassLoader() != null)
			throw new SecurityException("Unsafe");
	
		return theUnsafe;
	}
	
* 자바에서 어떻게 코드를 신뢰하는지 보여준다  
	* 단순히 코드가 ClassLoader에 의하여 로드 되었는지 확인한다  
* 프로그램 실행시 **bootclasspath** 옵션을 이용하여 코드를 신뢰하도록 할 수 있지만 너무 복잡하다    
		
		java -Xbootclasspath:/usr/jdk1.7.0/jre/lib/rt.jar:. com.mishadoff.magic.UnsafeClient  
  
* Unsafe 클래스는 **theUnsafe**라는 자신의  private 인스턴스를 가지고 있다  
	* reflection을 이용하여 theUnsafe 인스턴스를 꺼낼 수 있다  
  
# Unsafe API  
* Unsafe 클래스는 105개의 메소드를 가지고 있다  
* 다양한 객체들을 조작하기 위한 몇가지 중요한 메소드들의 그룹은 다음과 같다  

### Info 
* low-level 메모리 정보를 리턴한다  
* 메소드  
	* **addressSize**  
	* **pageSize**  
  
### Objects  
* 오브젝트와 그 오브젝트에 해당하는 필드를 조작하기 위한 메소드를 제공한다  
* 메소드  
	* **allocateInstance**  
	* **objectFieldOffset**  
  
### Arrays  
* 배열 조작을 위한 메소드를 제공한다  
* 메소드  
	* **arrayBaseOffset**  
	* **arrayIndexScale**  
  
### Synchronization  
* 동기화를 위한 low-level의 단계를 제공한다  
* 메소드  
	* **monitorEnter**  
	* **tryMonitorEnter**  
	* **monitorExit**  
	* **compareAndSwapInt**  
	* **putOrderedInt**  
  
### Memory  
* 메모리에 직접 접근할 수 있는 메소드를 제공한다  
* 메소드  
	* **allocateMemory**  
	* **copyMemory**  
	* **freeMemory**  
	* **getAddress**  
	* **getInt**  
	* **putInt**  
  
# Interesting use cases  

### Avoid initialization  
	
	class A {
		private long a;
		
		public A() {
			this.a = 1;
		}
		
		public long a() { return this.a; }
	}
	
	//------------------------------------------------------

	A o1 = new A(); // constructor
	o1.a(); // prints 1
	
	A o2 = A.class.newInstance(); // reflection
	o2.a(); // prints 1
	
	A o3 = (A) unsafe.allocateInstance(A.class); // unsafe
	o3.a(); // prints 0
  
* 객체 초기화 단계를 건너뛰거나 생성자에서 보안관련 체크를 하는 것을 우회하고 싶을때 또는 public 생성자가 없는 클래스를 생성하고 싶을때 유용하다  
  
### Memory corruption  
	
	public class Guard {
		private int ACCESS_ALLOWED = 1;
	
		public boolean giveAccess() {
			return 42 == ACCESS_ALLOWED;
		}
	}
	
	//------------------------------------------------------

	Guard guard = new Guard();
	guard.giveAccess();   // false, no access

	Field f = guard.getClass().getDeclaredField("ACCESS_ALLOWED");
	unsafe.putInt(guard, unsafe.objectFieldOffset(f), 42); // memory corruption
	
	guard.giveAccess(); // true, access granted  
  
* reflection 역시 ACCESS_ALLOWED 값을 수정 할 수 있다  
* 메모리에 guard 인스턴스 다음에 또 다른 Guard 오브젝트가 있을 경우 다음과 같은 코드를 이용하여 ACCESS_ALLOWED값을 변경 할 수 있다  
	
		unsafe.putInt(guard, 16 + unsafe.objectFieldOffset(f), 42); // memory corruption  
  
	* 16은 32비트 아키텍쳐에서 Guard오브젝트의 크기다  
	* sizeOf 메소드를 이용하여 오브젝트의 크기를 계산 할 수 있다  
  
### sizeOf  
	
	public static long sizeOf(Object o) throws Exception {
		Field unsafeField = Unsafe.class.getDeclaredField("theUnsafe");
		unsafeField.setAccessible(true);
		Unsafe unsafe = (Unsafe) unsafeField.get(null);
		
		HashSet<Field> fields = new HashSet<Field>();
		Class c = o.getClass();

		while (c != Object.class) {
			for (Field f : c.getDeclaredFields()) {
				if ((f.getModifiers() & Modifier.STATIC) == 0) {
					fields.add(f);
				}
			}
			c = c.getSuperclass();
		}
		
		// get offset
		long maxSize = 0;
		for (Field f : fields) {
			long offset = unsafe.objectFieldOffset(f);
			if (offset > maxSize) {
				maxSize = offset;
			}
		}
		
		return ((maxSize/8) + 1) * 8;   // padding
	}

* 부모클래스를 포함하여 static이 아닌 모든 필드들을 찾는다  
* 각 필드들의 오프셋을 조사하여 가장 큰 오프셋을 구한후 패딩을 더한다  

### Hide Password  
	
	static long toAddress(Object obj) throws Exception {
		Field f = Unsafe.class.getDeclaredField("theUnsafe");
		f.setAccessible(true);
		Unsafe unsafe = (Unsafe) f.get(null);
		
		
	    Object[] array = new Object[] {obj};
	    long baseOffset = unsafe.arrayBaseOffset(Object[].class);
	    return normalize(unsafe.getInt(array, baseOffset));
	}
	
	//------------------------------------------------------

	String password = new String("l00k@myHor$e");
	String fake = new String(password.replaceAll(".", "?"));
	System.out.println(password); // l00k@myHor$e
	System.out.println(fake); // ????????????
	
	unsafe.copyMemory(fake, 0L, null, toAddress(password), sizeOf(password));
	
	System.out.println(password); // ????????????
	System.out.println(fake); // ????????????

* copyMmeory 메소드를 통하여 바이트 배열을 순회하지 않고 데이터를 복사 할 수 있다  
  
### Concurrency  
	
	interface Counter {
		void increment();
		long getCounter();
	}
	
	//------------------------------------------------------
	
	class CASCounter implements Counter {
		private volatile long counter = 0;
		private Unsafe unsafe;
		private long offset;
		
		public CASCounter() throws Exception {
			unsafe = getUnsafe();
			offset = unsafe.objectFieldOffset(CASCounter.class.getDeclaredField("counter"));
		}
		
		@Override
		public void increment() {
			long before = counter;
			while (!unsafe.compareAndSwapLong(this, offset, before, before + 1)) {
				before = counter;
			}
		}
		
		@Override
		public long getCounter() {
			return counter;
		}
	}  
  
* compareAndSwapLong 메소드를 이용하여 lock-free 구조를 만들 수 있다  
* Atomic 관련 클래스들은 내부에서 Unsafe를 사용하고 있다  


# 원문  
* http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe  
* http://www.docjar.com/docs/api/sun/misc/Unsafe.html
  

