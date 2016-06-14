---
layout: post
category: Java
title: Java's serialization algorithm  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

## Serialization algorithm  
* 클래스의 메타 데이터를 출력한다  
* **java.lang.object**를 찾을때 까지 부모클래스를 재귀적으로 따라가면서 부모 클래스의 정보(메타데이터)를 출력한다  
* 메타데이터 출력을 마치면 실제 데이터를 출력하기 시작한다  
	* 이 단계에서 최상위 부모 클래스의 데이터 부터 출력하면서 자식 클래스로 내려온다  

## Sample serialized object  
	class parent implements Serializable {
		int parentVersion = 10;
	}
	
	class contain implements Serializable{
		int containVersion = 11;
	}

	public class SerialTest extends parent implements Serializable {
		int version = 66;
		contain con = new contain();
	
		public int getVersion() {
			return version;
		}

		public static void main(String args[]) throws IOException {
			FileOutputStream fos = new FileOutputStream("temp.out");
			ObjectOutputStream oos = new ObjectOutputStream(fos);
			SerialTest st = new SerialTest();
			oos.writeObject(st);
			oos.flush();
			oos.close();
		}
	}
  
## Serialized form of sample object  
  
<img src="/assets/themes/Snail/img/Java/SerializationAlogorithm/memory.png" alt="">  
  
## An outline of the serialization algorithm  
  
<img src="/assets/themes/Snail/img/Java/SerializationAlogorithm/outline.png" alt="">  
  
# 원문  
* http://www.javaworld.com/article/2072752/the-java-serialization-algorithm-revealed.html  
