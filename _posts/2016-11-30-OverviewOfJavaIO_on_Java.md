---
layout: post
category: Java
title: Overview of java.io's Input and Output Streams
tagline: by Pigbrain
tags: [Java]
---

<!--more-->


# Input/Output
  
## Representing File Paths  
* `java.io.File`는 파일의 paths를 관리하기 위한 클래스이다  
	* path는 실제 디스크의 파일 혹은 디렉토리를 가르킬 수도 있고 가르키지 않을 수도 있다  
	* File 클래스의 메서드들을 통하여 path를 다루고 파일 시스템의 작업을 수행할 수 있다  
	* File 클래스는 실제 파일의 데이터를 읽거나 쓰는데 사용되진 않는다  
  
* File 클래스의 생성자는 오버로드 되어 있기 때문에 다음 형태로 객체를 생성할 수 있다  
	* path를 나타내는 문자열 
	* 상위 디렉토리를 나타내는 문자열 혹은 File 객체 그리고 하위 디렉토리를 나타내는 문자열 혹은 File 객체  
  
* File 객체를 생성하기 위하여 사용되는 path는 절대 경로와 상대 경로 모든 형태로 나타낼 수 있다  
  
* String 객체처럼 File 객체 또한 변경할 수 없다. (불변)
	* 한번 객체를 생성하면 path를 변경 할 수 없다  
  
* 자바는 어떻게 플랫폼마다 다른 디렉토리 구분자를 다룰까 ? 
	* 기본 구분자는 `file.separator`라는 시스템 속성에 의하여 정의된다  
	* 위 속성에 의하여 정의된 구분자는 File 클래스의 public static 타입인 `separator`와 `separatorChar`를 통하여 사용 가능하다  
  
{% highlight java %}  
// WinNTFileSystem.class
class WinNTFileSystem extends FileSystem {
	
	private final char slash;
	private final char altSlash;
	private final char semicolon;

	public WinNTFileSystem() {
		slash = AccessController.doPrivileged(new GetPropertyAction("file.separator")).charAt(0);
		
		semicolon = AccessController.doPrivileged(new GetPropertyAction("path.separator")).charAt(0);

		altSlash = (this.slash == '\\') ? '/' : '\\';
	}
	// 생략
}
{% endhighlight %}  
  
  
## Managing File Paths  
* File객체는 파일 시스템 작업을 수행하고 조회하기 위한 메서드들을 제공한다  
	* 파일 시스템을 조회하기 위한 메서드들..
		* canRead(),canWrite(), exists(), isDirectory(), isFile(), isHidden(), getAbsolutePath(), lastModified(), length(), listFiles(), listRoots()  
	* 파일 시스템을 변경하기 위한 메서드들..  
		* createNewFile(), mkdir(), renameTo(), delete(), deleteOnExit(), setReadOnly(), setLastModified()  
  
  
{% highlight java %}  
package io;

import java.io.File;

public class Remove {
	public static void main(String[] args) {
		if (args.length == 0) {
			System.err.println("Usage: Remove <file|directory>...");
		}
		for (int i = 0; i < args.length; i++) {
			remove(new File(args[i]));
		}
	}

	private static void remove(File file) {  
		if (!file.exists()) {  
			System.err.println("No such file or directory: " +  file.getAbsolutePath());
		} else if (file.isDirectory() && file.list().length > 0) {
			System.err.println("Directory contains files: " + file.getAbsolutePath());
		} else if (!file.delete()) {
			System.err.println("Could not remove: " + file.getAbsolutePath());
		}
	}
}
{% endhighlight %}  
  
  
## Input/Output Class Hierarchy  
* `java.io`패키지는 입력(input)과 출력(output)을 위한 많은 클래스들을 포함하고 있다  
	* 4개의 추상클래스(InputStream, OutputStream, Reader, Writer)가 대부분의 주요한 기능을 제공하고 있다  
		* **Byte**(8bit) 형태의 데이터 처리를 위한 `InputStream` 그리고 `OutputStream`  
		* **Character**(16bit) 형태의 데이터 처리를 위한 `Reader` 그리고 `Writer`  
	* 데이터를 읽기위한 InputStream과 Reader의 메서드들은 매우 유사하고 데이터를 쓰기 위한 OutputStream 그리고 Writer의 메서드들 또한 매우 유사하다  
	* 많은 I/O 클래스들은 클래스에 동적으로 추가적인 역할을 부여하기 위하여 **Decorator Pattern** 형태로 디자인 되었다  
		* 대부분의 I/O 클래스들은 Reader, Writer 혹은 InputStream, OutputStream을 파라미터로 받는 생성자를 가지고 있다  
		* 각각의 클래스들은 buffering, compression.. 등과 같은 추가적인 기능들을 제공한다  
		* I/O 클래스 계층에서 Decorator Pattern의 중요한 점은 다형성(polymorphism)이다  
			* FileReader **is-a** Reader  
			* BufferedReader **is-a** Reader  
			* LineNumberReader **is-a** Reader  
  
  
## Byte Streams  
* InputStream - byte를 읽기 위한 추상 클래스  
	* read()  
		* 1바이트를 읽거나 바이트 배열로 복사한다  
	* skip()  
	* mark(), reset()  
	* close() 
		* finally 블럭 내에서 처리 해야 한다  
* OutputStream - byte를 쓰기 위한 추상 클래스  
	* write()  
		* 1바이트를 출력하거나 바이트 배열을 출력한다  
	* flush()  
	* close()  
* 아무 파라미터가 없는 `InputStream.read()` 메서드는 int 값(읽은 바이트의 수)을 리턴한다. 만약 스트림의 끝에 다다르면 -1을 리턴한다  
* 한번에 한 바이트씩 읽고 쓰려면 다음과 형태로 작성해야 한다 
  
{% highlight java %}  
int b = 0;
while ((b == fis.read()) != -1) {
	System.out.write(b);
}
{% endhighlight %}  
  
* 위와는 다르게 바이트 배열을 이용하여 버퍼 형태로 사용하는 것이 훨씬 효율적이다  
  
{% highlight java %}  
private static void read(File file) {
	try {
		FileInputStream fis = new FileInputStream(file);
		try {
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > 0) {
				System.out.write(buffer, 0, len);
			}
		} finally {
			fis.close();
		}
	} catch (FileNotFoundException e) {
		System.err.println("No such file exists: " + file.getAbsolutePath());
	} catch (IOException e) {
		System.err.println("Cannot read file: " + file.getAbsolutePath() + ": " + e.getMessage());
	}
}
{% endhighlight %}  
  
## Character Streams
  
  
# 참고   
* https://newcircle.com/bookshelf/java_fundamentals_tutorial/input_output  