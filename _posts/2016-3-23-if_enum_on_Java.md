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
		
		public enum TempEnum implements Closeable{
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
		
	public enum TempEnum implements Closeable{
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

# 참고 *
* http://www.journaldev.com/716/java-enum-examples-with-benefits-and-class-usage
* http://stackoverflow.com/questions/9969690/whats-the-advantage-of-a-java-enum-versus-a-class-with-public-static-final-fiel
