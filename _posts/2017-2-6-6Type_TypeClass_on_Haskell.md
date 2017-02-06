---
layout: post
category: Haskell
title: Haskell 타입과 타입클래스  
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# 데이터 타입 정의하기    
* `data`키워드를 사용하여 새로운 데이터 타입을 정의할 수 있다   
* 표준 라이브러리에 있는 `Bool`타입은 다음과 같이 정의되어 있다   
	* Bool 타입은 True 또는 False의 값을 가질 수 있다    
  
```  
data Bool = False | True  
```   
  
* `Int`타입은 다음과 같이 정의될 수 있다  
	* 첫 번쨰와 마지막 값은 Int가 가질 수 잇는 최솟값, 최대값이다   
  
```  
data Int = -2147483648 | -2147483647 | ... | -1 | 0 | 1 | ... | 2147483647 | 2147483648 
```    
  
# 데이터 타입 구체화하기  
* 도형은 원이 될 수도 있고, 직사각형이 될 수도 있다고 하자  
  
```
data Shape = Circle Float Float Float | Rectangle Float Float Float Float  
```  
* Circle 값 생성자는 실수를 취하는 세 개의 필드를 갖는다  
	* 값 생성자를 작성할 떄 선택적으로 몇 가지 타입들을 추가할 수 있다  
	* 값 생성자는 데이터 타입의 값을 반환하는 함수다   
   
```
ghc> :t Circle
Circle :: Float -> Float -> Float -> Shape

ghc> :t Rectangle
Rectangle :: Float -> Float -> Float -> Float -> Shape
```  
  
* Shape를 받아서 Float를 반환하는 함수를 만들자  
  
```
# area.hs  
area :: Shape -> Float
area (Circle _ _ r) = pi * r ^ 2
area (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)  
   
ghc> area $ Circle 1 2 3
28.274334

ghc> area $ Rectangle 0 0 10 100
1000.0
```  
  
* 프롬프트에서 `Circle 10 20 5`를 출력하고자 하면 오류가 발생한다  
	* 하스켈이 문자열 처럼 데이터 타입을 어떻게 표시하는지 알지 못하기 떄문이다  
	* 값을 나타내는 문자열을 얻기 위해  `Show`함수를 적용한다    
	* `deriving (Show)`를 추가하면 하스켈이 자동으로 `Show`타입 클래스의 타입 선언을 만든다  
  
```  
data Shape = Circle Float Float Float | Rectangle Float Float Float Float deriving (Show)

ghc> Circle 10 20 5
Circle 10.0 20.0 5.0
```
  
# 모듈에 있는 데이터 타입 export  
* 주어진 타입에 대한 모든 값 생성자를 익스포트하려면 두개의 점(..)을 쓴다  
  
``` 
module Shapes
( Point(..)
, Shape(..)
, area
, nudge
, baseCircle
) where
```    
  
* Shape타입에 있는 Rectangle, Circle만 익스포트한다면 `Shape(Rectangle, Circle)`이라고 선언한다  
  
# 레코드 구문  
* 하스켈은 레코드라는 데이터 타입을 작성하는 구문을 제공한다  
  
```
data Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     } deriving (Show)
```   
  
* 필드 타입을 명명하고 공백으로 구별하는 대신에 중괄호를 사용한다    
* 필드에 대한 이름을 쓰고 두 개의 콜론(::) 다음에 타입을 쓴다    
* 레코드의 주된 장점은 데이터 타입에 있는 필드를 찾는 함수를 생성한다는 것이다  
* 하스켈은 자동으로 함수들(firstName, lastName, age, height)을 만든다  
    
```
ghc> :t firstName
firstName :: Person -> String

ghc> :t age
age :: Person -> Int
```

* 다음과 같이 레코드를 이용하여 인스턴스를 생성할 수 있다  
  
```
ghc> Person {firstName="PigBrain", lastName="Lee", age=1, height=10.0}
Person {firstName = "PigBrain", lastName = "Lee", age = 1, height = 10.0}
```  
  
# 타입 매개변수  
* 타입 생성자는 새로운 타입을 생성하기 위해 매개변수로 타입을 받는다  
  
```
data Maybe a = Nothing | Just a
```  
  
* `a`는  타입 매개변수다  
* `Maybe`는  타입 매개변수를 포함하고 있기 떄문에 타입 생성자(type constructor)라고 부른다  
* 데이터 타입이 Nothing이 아닐 때에는 다음과 같은 타입을 생성하도록 할 수 있다  
	* Maybe Int  
	* Maybe String  
	* Maybe Person  
* 대부분의 경우 매개변수로 타입을 타입 생성자에 명시적으로 전달하지 않는다  
	* 하스켈의 타입 추론(type inference)기능으로 타입 추론이 충분하기 떄문이다  

```
ghc> data Maybe a = Nothing | Just a deriving (Show)

ghc> Just 3 :: Maybe Int
Just 3
```  
  
 

  
  
       
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  