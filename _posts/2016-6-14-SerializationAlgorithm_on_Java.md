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
  
## An outline of the serialization algorithm  
  
<img src="/assets/themes/Snail/img/Java/SerializationAlogorithm/outline.png" alt="">  
  
1. serialization을 위한 데이터를 출력한다  
2. SerialTest 클래스의 메타 데이터를 출력한다  
3. 부모 클래스의 메타 데이터를 출력한다  
4. SerialTest 인스턴스의 데이터들을 출력한다  
5. contain 클래스의 메타 데이터를 출력한다  
6. cotain 인스턴스의 데이터들을 출력한다  
  
## Serialized form of sample object  
  
<img src="/assets/themes/Snail/img/Java/SerializationAlogorithm/memory.png" alt="">  
  
* **AC ED** : (STREAM_MAGIC) serialization 프로토콜을 지정  
* **00 05** : (STREAM_VERSION) serialization 버전  
  
<br>  
  
* **0x73** : (TC_OBJECT) 오브젝트
  
<br>  
  
* **0x72** : (TC_CLASSDESC) 클래스
* **00 0A** : 클래스명 길이  
* **53 65 72 69 61 6c 54 65 73 74** : SerialTest 클래스명  
* **05 52 81 5A AC 66 02 F6** : SerialVersionUID 클래스를 구분하는 버전  
* **0x02** : 플래그 ( 이 값은 serialization를 지원한다는 것을 의미)  
* **00 02** : 클래스의 멤버변수(필드) 개수  
* **0x49** : 필드 타입. (49는 'I'이고 I는 int를 의미한다)  
* **00 07** : 필드명의 길이  
* **76 65 72 73 69 6F 6E** : version (필드명)  
* **0x74** : (TC_STRING) 문자열  
* **00 09** : 문자열의 길이  
* **4C 63 6F 6E 74 61 69 6E 3B** : Lcontain (JVM에서 사용하는 이름)  
* **0x78** : (TC_ENDBLOCKDATA) 데이터 블럭의 끝  
  
<br>  
  
* **0x72** : (TC_CLASSDESC) 클래스  
* **00 06** : 클래스명 길이  
* **70 61 72 65 6E 74** : parent 클래스명  
* **0E DB D2 BD 85 EE 63 7A** : SerialVersionUID 클래스를 구분하는 버전  
* **0x02** : 플래그 ( 이 값은 serialization를 지원한다는 것을 의미)  
* **00 01** : 클래스의 멤버변수(필드) 개수  
* **0x49** : 필드 타입. (49는 'I'이고 I는 int를 의미한다)  
* **00 0D** : 필드명의 길이  
* **70 61 72 65 6E 74 56 65 72 73 69 6F 6E** : parentVersion (필드명)  
* **0x78** : (TC_ENDBLOCKDATA) 데이터 블럭의 끝  
  
<br>  
  
* **0x70** : (TC_NULL) 더 이상 부모 클래스가 없다는 것을 의미한다  
  
<br>  
  
* **00 00 00 0A** : 10 (parentVersion 필드의 값)  
* **00 00 00 42** : 66 (version 필드의 값)  
  
<br>  
  
* contain 인스턴스의 값을 출력해야한다
* 이전 단계에서 contain 클래스에 대한 메타 정보를 출력하지 않았다  
* contain 클래스에 데한 메타정보를 먼저 출력 하고 값을 출력한다  
  
<br>  
  
* **0x73** : (TC_OBJECT) 오브젝트  
* **0x72** : (TC_CLASSDESC) 클래스  
* **00 07** : 클래스명 길이  
* **63 6F 6E 74 61 69 6E** : contain 클래스명  
* **FC BB E6 0E FB CB 60 C7** : SerialVersionUID 클래스를 구분하는 버전  
* **0x02** : 플래그 ( 이 값은 serialization를 지원한다는 것을 의미)  
* **00 01** : 클래스의 멤버변수(필드) 개수  
  
<br>  
  
* **0x49** : 필드 타입. (49는 'I'이고 I는 int를 의미한다)  
* **00 0E** : 필드명의 길이  
* **63 6F 6E 74 61 69 6E 56 65 72 73 69 6F 6E** : containVersion (필드명)  
* **0x78** : (TC_ENDBLOCKDATA) 데이터 블럭의 끝  
  
<br>  
  
* **0x70** : (TC_NULL) 더 이상 부모 클래스가 없다는 것을 의미한다  
  
<br>  
  
* **00 00 00 0B** : 11 (containVersion 필드의 값)  
  
# 원문  
* http://www.javaworld.com/article/2072752/the-java-serialization-algorithm-revealed.html  
