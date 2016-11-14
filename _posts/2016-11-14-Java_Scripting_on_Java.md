---
layout: post
category: Java
title: Java Scripting  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->
  
## Who is the Java Scripting API For?  
* Scripting language는 다음과 같은 특성을 갖는다  
	* **Convenience**  
		* 대부분의 Scripting language는 동적 타입이다  
		* 변수의 타입을 선언하지 않고 변수를 정의하고 재사용 할 수 있다  
	* **Developing rapid prototypes**  
		* edit-compile-run이 아닌 edit-run 과정으로 빠르게 개발할 수 있다  
	* **Application extension/customization**  
		* 어플리케이션의 일부분(configuration scripts, business logic/rules and math expressions for financial applications)을 외부에서 제어하도록 할 수 있다  
	* **"Command line" shells for applications**   
	
* 자바의 Scripting 기능은 **javax.script** 패키지에 포함되어 있다  
	* **ScriptEngineManager** 인스턴스를 생성하고 여기서 **ScriptEngine**인스턴스를 얻은 후  ScriptEngine의 **eval** 메소드를 통하여 스크립트를 실행한다  
  
<br>  
  
## Examples  
  
### "Hello, World"  
  
{% highlight java %}  
import javax.script.*;
public class EvalScript {
	public static void main(String[] args) throws Exception {
		// ScriptEngineManager 인스턴스 생성
		ScriptEngineManager factory = new ScriptEngineManager();
		
		// JavaScript engine 생성
		ScriptEngine engine = factory.getEngineByName("JavaScript");
		
		// JavaScript 코드를 실행한다  
		engine.eval("print('Hello, World')");
	}
}
{% endhighlight %}  
  
  
### Evaluating a Script File  
  
{% highlight java %}  
import javax.script.*;
public class EvalFile {
	public static void main(String[] args) throws Exception {
		// ScriptEngineManager 인스턴스 생성
		ScriptEngineManager factory = new ScriptEngineManager();

		// JavaScript engine 생성
		ScriptEngine engine = factory.getEngineByName("JavaScript");
		
		// 첫번째 argument로 입력 받은 JavaScript 코드가 담긴 파일을 읽어서 를 실행한다  
		engine.eval(new java.io.FileReader(args[0]));
	}
}
{% endhighlight %}  
  
  
### Script Variables  
  
{% highlight java %}  
import javax.script.*;
public class ScriptVars {
	public static void main(String[] args) throws Exception {
		ScriptEngine engine = manager.getEngineByName("JavaScript");
		
		File f = new File("test.txt");
		// Javascript에서 File 오브젝트를 file변수를 통하여 접근할 수 있다
		engine.put("file", f);
		
		engine.eval("print(file.getAbsolutePath())");
	}
}
{% endhighlight %}  
  

### Invoking Script Functions and Methods
  
{% highlight java %}  
import javax.script.*;
public class InvokeScriptFunction {
	public static void main(String[] args) throws Exception {
		ScriptEngine engine = manager.getEngineByName("JavaScript");
		
		String script = "function hello(name) { print('Hello, ' + name); }";
		// Script를 실행한다. hello 함수가 정의된다  
		engine.eval(script);
		
		// JavaScript engine은 Invocable 인터페이스의 구현체이다  
		// 다른 engine을 사용하려면 Invocable 타입인지 체크를 해야한다  
		Invocable inv = (Invocable) engine;
		
		// "Scripting!!"를 파라미터로 셋팅하여 hello 함수를 실행한다
		inv.invokeFunction("hello", "Scripting!!" );
	}
}
{% endhighlight %}  
  
  
{% highlight java %}  
import javax.script.*;
public class InvokeScriptMethod {
	public static void main(String[] args) throws Exception {
		ScriptEngine engine = manager.getEngineByName("JavaScript");
		
		String script = "var obj = new Object(); obj.hello = function(name) { print('Hello, ' + name); }";
		engine.eval(script);interface.
		Invocable inv = (Invocable) engine;
		
		Object obj = engine.get("obj");
		
		inv.invokeMethod(obj, "hello", "Script Method !!" );
	}
}
{% endhighlight %}  
  
### Importing Java Packages, Classes  
  
{% highlight java %}  
//자바에서 import package.*; 와 같은 형태로 자바 패키지와 클래스들을 import한다  
importPackage(java.awt);
  
// 자바에서 import java.awt.Frame 하는 것과 동일하다  
importClass(java.awt.Frame);  

// 새로운 객체를 생성한다  
var frame = new java.awt.Frame("hello");
// JavaScript에서 Frame 객체의 public 메소드를 실행한다  
frame.setVisible(true);

// 자바 객체의 properties에 접근할 수 있다 
print(frame.title);  
{% endhighlight %}  
  
  
# 원문  
* http://docs.oracle.com/javase/7/docs/technotes/guides/scripting/programmer_guide/
