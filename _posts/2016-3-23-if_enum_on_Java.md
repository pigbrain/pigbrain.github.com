---
layout: post
category: Java
title: Enum과 if 
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Enum 특징  
* 암묵적으로 java.lang.Enum을 상속 받고 있다  
* enum은 예약어이기 때문에 패키지명으로 사용 할 수 없다  
	* com.pigbrain.enum과 같은 형태로 사용 불가  
* 인터페이스를 구현할 수 있다  
		
		public enum TempEnum implements Closeable{
			...
		}  

* 생성자는 항상 private 이다  
	* enum 객체는 new를 통하여 생성할 수 없다  
* abstract 메소드를 가질수 있지만 각각의 enum 필드에서 구현해줘야 한다  
		
		public enum TempEnum {
			START(1){
		        @Override
		        public String getDetail() {
		            return "START";
		        }
		    },
		    RUNNING(2){
		        @Override
		        public String getDetail() {
		            return "RUNNING";
		        }
		    };
			...
			public abstract String getDetail();
		}  

* enum 필드에서 메소드를 override 할 수 있다  
		
		public enum TempEnum {
			START(1){
		        @Override
		        public String toString(){
		            return "START";
		        }
		    },
		    RUNNING(2);
			...
			@Override
		    public String toString(){
		        return "toString";
		    }
		}  

* enum 필드는 암묵적으로 static final 이다  
* enum 필드는 final이지만 enum이 가지고 있는 값은 set메소드를 통하여 변경 가능 하다  
* enum 필드는 final이기때문에 ==로 비교해도 안전하다  
  
# Enum의 장점  
* 변수의 타입, 값이 제한적이기 때문에 이상한 값이 들어오는것을 막을 수 있다  
* 싱글톤 형태를 보장한다  
* switch / case문을 명시적으로 사용하지 않고 그와 동일한 효과를 낼 수 있다  
* ordinal() 메소드를 통하여 시퀀스를 생성할 수 있다  
* **EnumMap**, **EnumSet**으로 응용 가능  
  
  
# Enum의 valueOf  
* String으로 입력받은 enum의 이름을 enum 객체로 리턴해준다  
	
		public enum TempEnum {
			START(1), RUNNING(2);
			...
		}  
		...

		TempEnum enumVar1 = TempEnum.valueOf("START");
		TempEnum enumVar2 = TempEnum.valueOf("RUNNING");
  
* 자바의 모든 클래스는 **java.lang.Class**을 상속 받고 있다  
* **java.lang.Class**에는 **enumConstantDirectory**라는 private 메소드가 선언되어있다  
	* enumConstantDirectory 메소드는 enum 필드를 Map<String, Type> 형태로 관리하고있다  
	* valueOf가 최초 호출되었을대 enum 필드들을 Map형태로 만들어 놓는다  

### valueOf  코드  
	
	public static <T extends Enum<T>> TvalueOf(Class<T> enumType, String name) {
		
		T result = enumType.enumConstantDirectory().get(name);

		if (result != null)
			return result;

		if (name == null)
			throw new NullPointerException("Name is null");
		
		throw new IllegalArgumentException("No enum const " + enumType +"." + name);
	}
  
### enumConstantDirectory  코드  
	
	Map<String, T> enumConstantDirectory() {

		if (enumConstantDirectory == null) {
			T[] universe = getEnumConstantsShared();
			if (universe == null)
				throw new IllegalArgumentException(getName() + " is not an enum type");
			
			Map<String, T> m = new HashMap<String, T>(2 * universe.length);
			for (T constant : universe)
				m.put(((Enum)constant).name(), constant);
	
			enumConstantDirectory = m;
		}

		return enumConstantDirectory;
	} 

# Enum vs if  
* enum의 valueOf는 String을 입력 받아서 이름이 동일한 enum 객체를 리턴해준다  
* String을 입력받아서 enum의 valueOf로 enum객체를 가져오는 것과 if로 String을 비교하여 enum을 가져오는 것을 비교하면 enum의 valueOf가 더욱 빠른 성능을 보인다  
	
		public enum TestEnum {
			A1("A1"),
			A2("A2"),
			...
			A500("A500");
	
			private String code; 
		
			private Test(String code) {
				this.code = code;
			}
		
			public String getCode() {
				return code;
			}
		}

		---------------------------------------------------

		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 100000000L; i++) {
			Test testEnum = Test.valueOf("A10");
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime - startTime);	 // 261ms

		---------------------------------------------------
		
		String key = "A10";
		long startTime = System.currentTimeMillis();
		for (int i = 0; i < 100000000L; i++) {
			if ("A1".equals(key)) {
				Test testEnum = Test.A1;
			} else if ("A2".equals(key)) {
				Test testEnum = Test.A2;
			} else if ( ... ) {
				...
			} else if ("A10".equals(key)) {
				Test testEnum = Test.A10;
			} 
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime - startTime);	 // 449ms

* enum의 valueOf는 Map에서 enum을 찾지만 if로 할경우 처음부터 순차적으로 찾기때문에 enum의 valueOf가 더 빠른것 같다  
  
# if 대신 Enum.valueOf만 이용하여 코딩 할 수 있을까 ? 

### if, else if만 사용하는 경우  
	
	-전---------------------------------------------------
	private final int TYPE_A = 1;
	private final int TYPE_B = 2;
	private final int TYPE_C = 3;
	...
	private final int TYPE_G = 7;
	
	
	int type= getType(); // 무조건 1~7만 리턴하는 함수
	
	// 각 type 에 맞는 String을 리턴 
	if (type == TYPE_A) {
		return "TYPE_A";
	} else if (type == TYPE_B) {
		return "TYPE_B";
	} else if (...) {
		return "TYPE_...";
	} else if (type == TYPE_G) {
		return "TYPE_G";
	}

	-후---------------------------------------------------
	
	public enum NumberEnum {
		_1("TYPE_A"), _2("TYPE_B"), ... _7("TYPE_G");
		private String type;
	
		private NumberEnum(int type) {
			this.type = type;
		}
		
		public static NumberEnum valueOf(int number) {
			return NumberEnum.valueOf("_" + String.valueOf(number));
		}
	}
	
	int type= getType(); // 무조건 1~7만 리턴하는 함수
	
	// Enum을 이용하면 if 문 없이 한줄로 처리 가능  
	return NumberEnum.valueOf(type);

### if, else if, else를 사용하는 경우  

	-전---------------------------------------------------
	private final int TYPE_A = 1;
	private final int TYPE_B = 2;
	private final int TYPE_C = 3;
	...
	private final int TYPE_G = 7;
	
	
	int type= getType(); // 무조건 1~7만 리턴하는 함수
	
	// 각 type 에 맞는 String을 리턴 
	if (type == TYPE_A) {
		return "TYPE_A";
	} else if (type == TYPE_B) {
		return "TYPE_B";
	} else if (...) {
		return "TYPE_...";
	} else if (type == TYPE_G) {
		return "TYPE_G";
	} else {
		return "NONE";
	}

	-후---------------------------------------------------
	
	public enum NumberEnum {
		_1("TYPE_A"), _2("TYPE_B"), ... _7("TYPE_G");
		private String type;
	
		private NumberEnum(int type) {
			this.type = type;
		}
		
		public static NumberEnum valueOf(int number) {
			return NumberEnum.valueOf("_" + String.valueOf(number));
		}
	}
	
	int type= getType(); // 무조건 1~7만 리턴하는 함수
	
	// valueOf에서 없는 키값을 찾으려하면 IllegalArgumentException이 발생
	try {
		return NumberEnum.valueOf(type);
	} catch (IllegalArgumentException e) {
		return "NONE"
	}


# 참고  
* https://docs.oracle.com/javase/7/docs/api/java/lang/Enum.html
* http://www.journaldev.com/716/java-enum-examples-with-benefits-and-class-usage
* http://stackoverflow.com/questions/9969690/whats-the-advantage-of-a-java-enum-versus-a-class-with-public-static-final-fiel
