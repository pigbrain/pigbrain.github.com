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
-- zipWith' :: (a -> a -> a) -> [a] -> [a] -> [a] 
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
* flip함수는 함수를 받아서 인자들을 뒤바꾼 원본 함수와 같은 함수를 반환한다   

```
# flip.hs  
flip' :: (a -> b -> c) -> (b -> a -> c)
flip' f x y = f y x
{-
flip' f = g
    where g x y = f y x
-}  

ghc> flip' zip [1, 2, 3, 4, 5] "Hello"
[('H',1),('e',2),('l',3),('l',4),('o',5)]  
ghc> zipWith (flip' div) [2, 2..] [10, 8, 6, 4, 2]
[5,4,3,2,1]
```  
  
## map  
* map함수는 함수와 리스틀 받아서 새로운 리스틀 생성하기 위해 리스트에 있는 모든 요소에 그 함수를 적용한다  
  
```
# map.hs  
map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs

ghc> map' (+3) [1, 5, 3, 1, 6]
[4,8,6,4,9]
ghc> map' (++ "!") ["BIFF", "BANG", "POW"]
["BIFF!","BANG!","POW!"]
```
  
## filter  
* filter함수는 조건과 리스트를 받아서 그 조건에 만족하는 요소들의 리스트를 반환한다  
* 조건(predicate)은 참인지, 거짓인지(Boolean)를 알려주는 함수다  
  
```
# filter.hs  
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' f (x:xs)
        | f x = x : filter' f xs
        | otherwise = filter' f xs
  
ghc> filter (> 3) [1, 5, 3, 2, 1, 6, 4, 3, 2, 1]
[5,6,4]
ghc> filter (== 3) [1, 5, 3, 2, 1, 6, 4, 3, 2, 1]
[3,3]
```  
  
## map & filter  
  
```
ghc> sum (takeWhile (< 10000) (filter odd (map (^2) [1..])))
166650

ghc> let listOfFuns = map (*) [0..]
ghc> (listOfFuns !! 4) 5   -- 리스트에서 4번쨰 요소를 꺼낸다 
20
```

# 람다 (Lambda)  
* 람다는 함수가 단 한 번만 필요할 떄 사용하는 익명 함수다    
* 람다를 선언하기 위해 \를 사용한다    
	* 그리스 문자 (λ)와 빗스해 보이기 떄문에 \를 사용한다   
  
```
ghc> map (+3) [1, 6, 3, 2]
[4,9,6,5]
ghc> map (\x -> x + 3) [1, 6, 3, 2]
[4,9,6,5]
ghc> map (\(a,b) -> a + b) [(1,2), (6,3)]
[3,9]
```
  
* 람다에서 패턴 매칭이 실패하면 런타임 에러가 발생한다   

```
# addThree.hs
addThree :: Int -> Int -> Int -> Int
addThree x y z = x + y + z

addThree' :: Int -> Int -> Int -> Int
addThree' = \x -> \y -> \z -> x + y + z

ghc> addThree 2 3 5
10
ghc> addThree' 2 3 5
10
```  
* 함수들은 기본적으로 커리되기 때문에 위 두 함수는 동일하다  
  
```  
# flip.hs 
flip' :: (a -> b -> c) -> (b -> a-> c)
flip' f = \x y -> f y x

ghc> map (flip' subtract 20) [1, 2, 3, 4]
[19,18,17,16]
```   
  

 
  

  
  
  
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  