---
layout: post
category: Haskell
title: Haskell에 대한 소개와 설치 
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# Haskell ?   
* 하스켈은 **순수 함수형** 프로그래밍 언어이다   
* 하스켈은 **정적 타입** 언어이다   
	* 컴파일 시점에 타입이 숫자인지, 문자열인지 정해진다  
* 하스켈은 type inference를 가지고 있는 타입 시스템을 사용한다  
	* 모든 코드마다 타입을 명확하게 지정할 필요가 없다  
	* `a = 5 + 4`라고 할 때 a가 숫자라고 명시적으로 지정할 필요가 없다 
* 하스켈은 높은 수준의 추상화 개념을 많이 사용한다   
	* 프로그램을 더 짧고 간결하게 작성 할 수 있다  
* 하스켈은 Lazy하게 동작한다  
	* 함수의 결과를 표시할 필요가 있을 떄까지 함수를 실행하지 않는다   	
  
# Haskell 설치 
* Mac (https://www.haskell.org/platform/#osx-homebrewcask)  

```
$ brew cask install haskell-platform
```

### Haskell-Platform
* 하스켈 플랫폼에는 GHC(Glasgow Haskell Compiler)컴파일러뿐만 아니라 수 많은 하스켈 라이브러리들을 포함하고 있다  
	* GHC는 하스켈 스크립트(*.hs)를 컴파일 할 수 있다   
	* GHC는 하스켈을 interactive모드로 실행 할 수 있다     
* 하스켈 플램폼은 Cabal이라는 빌드, 패키지 관리 시스템을 포함하고 있다  

# IntelliJ에 Haskell 설정  
## Haskell 플러그인 설치  
 * Configure > Plugins > Browse Repositories 에서 `haskell` 검색
 * JetBrains에서 개발한 `Haskell` 플러그인 설치 
  
## Haskell SDK 설정 
* Project Structure > Add New SDK > `GHC`
* GHC home path 입력 
	* /Library/Frameworks/GHC.framework/Versions/...

# 참고 
* https://www.haskell.org/platform/#osx-homebrewcask  
* https://www.haskell.org/cabal/  