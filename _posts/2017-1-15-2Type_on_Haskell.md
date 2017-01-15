---
layout: post
category: Haskell
title: Haskell 타입  
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# Type
* 하스켈의 최대 강점들 중에 하나는 강력한 타입 시스템이다  
* 하스켈에서 모든 표현식의 타입은 컴파일 타임에 감지된다  
* 자바나 파스칼과는 달리 하스켈은 Type Inference를 한다  
	* 숫자를 쓰면 하스켈에게 그것이 숫자라고 알려줄 필요가 없다  
  
# 명시적 타입 선언  
 
```
ghci>:t 'a'
'a' :: Char
ghci>:t True
True :: Bool
ghci>:t "Hello"
"Hello" :: [Char]
ghci>:t (True, 'a')
(True, 'a') :: (Bool, Char)
ghci>:t 4 == 5
4 == 5 :: Bool
```  
* 표현식들의 타입을 확인하기 위하여 **:t** 명령어를 사용한다  
* **::**는 ~타입을 갖는다는 것을 의미한다  
	* `a`는 Char 타입을 갖는다   
	* True는 Bool 타입을 갖는다   
	* "Hello"는 [Char] 타입을 갖는다  

```
# removeNonUppercase.hs
removeNonUppercase :: [Char] -> [Char]
removeNonUppercase st = [c | c <- st, c `elem` ['A'..'Z']]

ghci>removeNonUppercase "HelloWorld"
"HW"
```    
* removeNonUppercase 함수는 [Char] -> [Char] 타입을 갖는다  
	* 매개변수로 하나의 문자열을 받아서 결과로 다른 문자열을 반환한다  

```
# addThree.hs
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z

ghci>addThree 1 2 3
6
```
* 매개변수 타입은 -> 문자로 구분된다  
* 반환 타입은 항상 선언문의 마지막에 온다  
   
   
# 일반적인 하스켈 타입  
* `Int`는 정수(integer)의 약자다  
	* 64-bit CPU를 사용하고 있다면 Int의 최솟값은 -2^63이고 최댓값은 2^63 - 1 이다   
* `Integer`는 정수를 저장하는데 사용되지만 한계 값이 없다  
	* 정말 큰 수를 표한할떄 이 타입을 사용한다  
* `Float`은 부동소수점을 갖는 타입이다  
* `Double`은 Float보다 정밀도가 2배 가량 높은 부동소수점이다  
	* 두 배의 정밀도 숫자 타입은 숫자를 나타내기 위해 두 배의 비트를 사용한다  
* `Bool`은 True, False 두 값만 가질 수 없다  
* `Char`은 유니코드 문자를 나타낸다  
* 튜플도 타입이지만 요소들의 길이뿐만 아니라 타입에 따라 정의된다  
	* 튜플은 필요 이상인 최대 62개의 요소를 가질 수 있다  
	* 비어있는 튜플 ()도 타입이다  
  
# 타입 변수  
* 어떤 함수들은 여러 가지 타입에서 동작할 수 있다  
 
```
ghci>:t head
head :: [a] -> a
```
* head 함수는 리스트를 받아서 첫 번째 항목을 반환한다  
* 리스트가 숫자나 문자 또는 리스트를 가지고 있든 상관없다       

* **타입의 이름은 대문자로 시작한다**  
* 위에서 a는 타입이 아닌 타입 변수의 예이다. 즉 모든 타입이 될 수 있다는 의미다    
* 타입 변수는 함수가 type-safe 방식으로 다양한 값에서 동작할 수 있도록 해준다  
	* 다른 프로그래미 언어들에 있는 제네릭과 비슷하다  
* 타입 변수를 사용하는 함수를 다형 함수(polymorphic function)라고 부른다  
	* head의 타입 선언은 모든 타입의 리스트를 받아서 그 타입의 첫 번째 항목을 반환한다고 명시되어 있다  
* 타입 변수의 이름으로 한 글자 이상의 이름을 쓸 수 있지만 보통은 a, b, c, d처럼 사용하곤 한다  
  
```
ghci>:t fst
fst :: (a, b) -> a
```
* fst 함수는 튜플을 받아서 첫 번째 항목과 같은 타입 요소를 반환한다  
* a와 b가 서로 다른 타입 변수지만, 반드시 달라야 하는 것은 아니다  
* 첫 번째 항목의 타입과 반환값의 타입이 같을 것이라는 의미이다  
  
# 타입 클래스  
* 타입 클래스는 어떤 동작을 정의하는 인터페이스다  
* 어떤 타입이 타입 클래스의 인스턴스라면 그것은 타입 클래스가 기술한 동작을 지원하며 구현한다  
* 타입 클래스는 많은 함수들을 지정한다  
  
## Eq 타입 클래스 
```
ghci>:t (==)
(==) :: Eq a => a -> a -> Bool
```
* `=>`는 class constraint라고 부른다  
* == 함수는 동일한 타입의 값 두 개를 받아서 Bool을 반환한다  
* 두 값의 타이은 Eq클래스의 인스턴스이어야 한다  
* Eq타입 클래스는 같음을 테스트하기 위한 인터페이스를 제공한다  
* 모든 표준 하스켈 타입(입출려 타입 합수 제외)은 Eq의 인스턴스다   
	
## Ord 타입 클래스  
```
ghci>:t (>)
(>) :: Ord a => a -> a -> Bool
```
* Ord는 타입의 값들을 어떤 순서로 놓을 수 있는 타입들에 대한 타입 클래스다  

```
ghci>:t compare
compare :: Ord a => a -> a -> Ordering

ghci>5 `compare` 3
GT

ghci>"Abcd" `compare` "Bcdef"
LT
```
* `compare`함수는 Ord인스턴스가 타입인 두 개의 값을 받아서 Ordering을 반환한다  
* Ordering은 ~보다 크다인 GT, ~보다 작다인 LT 또는 ~와 같다인 EQ가 될 수 있다  

## Show 타입 클래스  
```
ghci>:t show
show :: Show a => a -> String
ghci>show 3
"3"
ghci>show True
"True"
```
* show 타입 클래스의 인스터스인 값들은 문자열처럼 표시될 수 있다  

## Read 타입 클래스  
```
ghci>:t read
read :: Read a => String -> a
ghci>read "8.2" + 3.8
12.0
ghci>read "5" - 2
3
ghci>read "[1,2,3,4]" ++ [3]
[1,2,3,4,3]
```
* read 함수는 문자열을 받아서 타입이 Read의 인스턴스인 값을 반환한다  

```
ghci>read "4"
*** Exception: Prelude.read: no parse
ghci>read "4" :: Int
4
```
* `read "4"`만 입력한 경우 GHCi는 어떤 타입을 반환 받고 싶어하는지 알지 못하여 오류가 발생한다  
* 타입 어노테이션(type annotation)을 사용하여 문제를 해결 할 수 있다  
* 타입 어노테이션은 하스켈에게 표현식의 타입이 무엇인지 명시적으로 알려주는 방법이다  

## Bounded 타입 클래스
```
ghci>:t minBound
minBound :: Bounded a => a

ghci>minBound :: Int
-9223372036854775808

ghci>maxBound :: Int
9223372036854775807

ghci>minBound :: Bool
False

ghci>maxBound :: Bool
True
```
* Bound타입 클래스의 인스턴스는 minBound 함수와 maxBound 함수를 이용하여 확인할 수 있는 upper bound와 lower bound를 갖는다  

	   
    
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  