---
layout: post
category: Java
title: StackWalker
tagline: by Pigbrain
tags: [Java]
---
  
<!--more-->  

* 자바에서 Exception이 발생하면 Exception 내에 스택 프레임이 정보들 담기게 된다. 
* 스택 프레임 정보를 생성하는 과정은 상대적으로 매우 비싼 연산이기도 하다. 

### 왜 StackWalker를 찾게 됬는지 ?
* 서비스를 개발하면서 오류 처리를 위해 수 많은 Exception이 발생시키게 된다.
* Exception이 발생할 때 마다 스택 프레임이 채워지는 것은 낭비라고 생각되었으며, Exception이 발생하는 시점에 원인 파악이 가능한 로그, 메세지, 코드등이 기록된다면 스택 프레임은 굳이 필요가 없을 것 같았다.
* 그런데 매번 Exception을 발생시킬 때 마다 로그나 메세지를 기록하는 것도 너무 귀찮았고, 매번 다른 코드를 매핑하는 것도 너무 귀찮았다.
* Exception에 로그, 메세지, 코드등이 있는 경우에는 이 정보를 쓰도록 하고 아무 것도 지정하지 않은 경우에만 상위 n개의 스택 프레임을 로그로 남기고 싶었다. 

### StackWalker ?
* Thread-Safe 하다 
* 최상단에 위치한 스택 프레임부터 하위로 가면서 프레임 정보를 찾을 수 있으며 기존 Exception의 스택 프레임을 가져오는 것 보다 훨씬 가볍다 

### StackWalker를 Exception에 적용
* 만약 메세지가 있다면 해당 메세지를 사용하고 그렇지 않다면 StackWalker를 통해 조회된 스택 프레임 정보를 메세지로 사용하도록 하였다 

```java
public abstract class ApplicationException extends RuntimeException {

    private static final int STACK_WALKER_DEPTH = 12;

    public <E extends Enum<E>> ApplicationException() {
        super(StackWalker.getInstance(EnumSet.noneOf(Option.class), STACK_WALKER_DEPTH)
                .walk(
                        s -> s.limit(STACK_WALKER_DEPTH).collect(Collectors.toList())
                )
                .stream()
                .map(StackFrame::toString)
                .collect(Collectors.joining("\n")));
    }

    public <E extends Enum<E>> ApplicationException(String message) {
        super(message);
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
}
```


# 참고 
* https://docs.oracle.com/javase/9/docs/api/java/lang/StackWalker.html