---
layout: post
category: Haskell
title: Haskell 재귀    
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# maximum  
  
```
# maximum.hs
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list!"
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)  
  
ghci> maximum' [1, 3, 2, 7, 4]
7  
```  
  
# replicate  
* replicate는 Int와 값을 받아서 그 값을 몇 번 반복한 리스트를 리턴한다  
  
```  
# replicate.hs
replicate' :: Int -> a -> [a]
replicate' n x
          | n <= 0 = []
          | otherwise = x : replicate' (n-1) x  
  
ghci> replicate' 3 'k'
"kkk"
```  
  
# take  
* 지정된 리스트에서 지정된 개수의 요소를 반환한다  
  
```  
#take.hs  
take' ::(Num i, Ord i) => i -> [a] -> [a]
take' n _
     | n <= 0 = []
take' _ [] = []
take' n (x:xs) = x : take' (n-1) xs  
  
ghci> take' 3 "Hello"
"Hel"
```  
  
# reverse  
  
```  
# reverse.hs
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]
  
ghci> reverse' "HelloWorld"
"dlroWolleH"
```  
  
# repeat  
* repeat 함수는 요소를 받아서 그 요소로 구성된 무한의 리스트를 반환한다  
  
```  
# repeat.hs
repeat' :: [a] -> [a]  
repeat' x = x : repeat' x
```  
  
# zip  
* zip 함수는 두 개의 리스트를 받아서 하나의 리스트로 합친다  
* 두 개의 리스트 길이가 다를 경우에 긴 리스트 쪽을 잘라낸다    
* zip [1,2,3] [7,8]은 [(1,7), (2,8)]을 반환한다  
  
```
# zip.hs  
zip' :: [a] -> [b] -> [(a, b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x, y):zip' xs ys  
  
ghci> zip' [1, 2, 3] [4, 5]
[(1,4),(2,5)]
```  
  
# elem  
* elem 함수는 값과 리스트를 받아서 그 값이 리스트의 멤버인지를 검사한다  
  
```  
# elem.hs  
elem' :: (Eq a) => a -> [a] -> Bool
elem' _ [] = False
elem' a (x:xs)
        | a == x = True
        | otherwise = a `elem'` xs  
  
ghci> elem' 'e' "Hello World"
True
ghci> elem' 'z' "Hello World"
False  
```  
  
# quicksort  
  
```
# quicksort.hs
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
        let smallerOrEqual = [a | a <- xs, a <= x]; larger = [a | a <- xs, a > x]
        in quicksort smallerOrEqual ++ [x] ++ quicksort larger  
  
ghci> quicksort [1, 3, 2, 9, 7, 10, 13]
[1,2,3,7,9,10,13]
```  
  
  
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  