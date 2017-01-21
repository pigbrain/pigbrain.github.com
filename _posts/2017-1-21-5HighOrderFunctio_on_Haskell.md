---
layout: post
category: Haskell
title: Haskell 고차원 함수    
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# 고차원 함수(High Order Function)  
* 하스켈 함수는 매개변수처럼 함수를 받을 수 있다  
* 반환값처럼 함수를 반환할 수 있다  
  
# Curried Function  
* 하스켈의 모든 함수는 공식적으로 하나의 매개변수만 받는다  
* 여러 매개변수를 받았던 모든 함수들은 커리(Curry)된 함수다  
* Curried Function는 항상 하나의 매개변수를 받는 함수다  
  
```
max 4 5  = (max 4) 5 

1. max는 값 4를 적용한다  
2. 4를 적용하면 5를 적용하기 위한 또 다른 함수가 반환값이 된다  
3. 반환됨 함수에 5를 적용한다  
```  

* 매개변수를 가지고 함수가 호출되면 다음 매개변수를 받는 함수를 반환한다  
    
```
# multThree.hs 

multThree :: Int -> (Int -> (Int -> Int))
multThree x y z = x * y * z

ghc> multThree 3 2 4
24
ghc> let multTwoWithNine = multThree 9
ghc> multTwoWithNine 2 3
54
```  
* 적은 매개변수로 함수를 호출하여 새로운 함수를 생성할 수 있다  
  
# 섹션 (Section)  
* 하스켈에서 중위 연산자에 인자를 부분적으로 적용하는 것을 섹션이라고 한다  
	* 중위 함수는 섹션을 사용하여 부분적으로 적용될 수 있다  
* 중위 함수에 섹션을 사용하기 위해 괄호로 감싸고 한쪽에만 매개변수를 제공한다  
  
```
# divideByTen.hs  
divideByTen :: (Floating a) => a -> a
divideByTen = (/10)
  
ghc> divideByTen 200
20.0

# isUpperAlphanum.hs
isUpperAlphanum :: Char -> Bool
isUpperAlphanum = (`elem` ['A'..'Z'])

ghc> isUpperAlphanum 'C'
True
ghc> isUpperAlphanum 'z'
False
```  
  
* 매개변수로 받은 숫자에서 n을 빼는 함수를 만들고 싶다면 -n이 아닌  `(subtract n)`처럼 `subtract`함수를 사용해야 한다   
  
# High Order Function  
* 하스켈에서 함수는 매개변수로 다른 함수를 받을 수 있따  
* 반환값으로 함수를 반환할 수도 있다  
  
```
# applyTwice.hs  
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

ghc> applyTwice (+3) 10
16
ghc> applyTwice (++ " HaHa") "Hey"
"Hey HaHa HaHa"
ghc> applyTwice (3:) [1]
[3,3,1]
```  
* 첫 번째 매개변수가 하나의 매개변수를 받고 같은 타입 (a -> a)의 값을 반환하는 함수임을 나타낸다  
  
## zipWith  
  
```
# zipWith.hs
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys
  
ghc> zipWith' (+) [4, 2, 5, 6] [2, 6, 2, 3]
[6,8,7,9]
ghc> zipWith' max [6, 3, 2, 1] [7, 3, 1, 5]
[7,3,2,5]
ghc> zipWith' (++) ["foo", "bar"] [" fighters", " hoppers"]
["foo fighters","bar hoppers"]
ghc> zipWith' (zipWith' (*)) [[1,2,3], [3,5,6], [2,3,4]] [[3,2,2], [3,4,5], [5,4,3]]
[[3,4,6],[9,20,30],[10,12,12]]  
```  
  
  
## flip  
  

  
  
  
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  