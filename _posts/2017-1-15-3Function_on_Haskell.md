---
layout: post
category: Haskell
title: Haskell 함수    
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# 패턴 매칭  
* 패턴 매칭은 어떤 데이터가 따라야 할 패턴을 지정한다  
* 패턴에 따라 데이터를 분해하기 위하여 사용한다  

```
# lucky.hs
lucky :: Int -> String
lucky 7 = "LUKCY NUMBER SEVEN!"
lucky x = "Sorry"

ghci>lucky 3
"Sorry"
ghci>lucky 7
"LUKCY NUMBER SEVEN!"
```
* lucky를 호출하면 위부터 아래까지 패턴을 검사한다  
  
```
# factorial.hs
factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial(n - 1)

ghci>factorial(3)
6
```  
* 재귀를 이용하여 factorial함수를 정의할 수 있다  

```
# addVectors.hs
addVectors :: (Double, Double) -> (Double, Double) -> (Double, Double)
addVectors a b = (fst a + fst b, snd a + snd b)

ghci>addVectors (1, 3) (2, 4)
(3.0,7.0)
```  
* 튜플을 이용하여 패턴 매칭이 가능하다  

```
# first.hs
first :: (a, b, c) -> a
first (x, _, _) = x

# second.hs
second :: (a, b, c) -> b
second (_, y, _) = y

ghci>first (1, 2, 3)
1
ghci>second (1, 2, 3)
2
```
* **_** 는 리스트 Comprehension에서 작업을 수행하는 것과 같다  
* **_** 부분은 어떠한 값이 들어와도 상관 없다는 것을 의미한다  

```
# head.hs
head' :: [a] -> a
head' [] = error "Can't call head on an empty list"
head' (x:_) = x

ghci>head' [1, 2, 3]
1
```
* 일반적인 리스트도 패턴 매칭에서 사용될 수 있다    
* [1, 2, 3]은 1:2:3:[]에  대한 syntactic sugar이다   
* (x:[])와 (x:y:[])는 [x], [x,y]로 쓸 수 있다  
* **:** 문자를 포함하는 패턴은 하나 이상의 길이인 리스트에 대해서만 매칭된다       

```
# firstLetter.h
firstLetter :: String -> String
firstLetter "" = "Empty string"
firstLetter all@(x:xs) = "The first letther of " ++ all ++ " is " ++ [x]

ghci>firstLetter "Hello World"
"The first letther of Hello World is H"  
```  
* as-패턴은 전체 원본 항목에 대한 참조를 유지한다  
* as-패턴 xs@(x:y:ys)는 x:y:ys와 같은 리스트에 매칭되며 매번 x:y:ys라고 입력하는 대신에 xs를 이용하여 전체 데이터를 사용할 수 있다  
  
  
# 가드(Guard)      
* 가드는 함수에 전달된 값들을 검사하기 위하여 사용한다  

```
# bmiTell.hs
bmiTell :: Double -> String
bmiTell bmi
        | bmi <= 18.5 = "you're underweight"
        | bmi <= 25.0 = "normal"
        | otherwise = "whale"

ghci>bmiTell 18.5
"you're underweight"
ghci>bmiTell 20
"normal"
```
  
* 가드는 파이프 라인(**|**) 다음에 Boolean 표현식을 쓰고 표현식이 True일 경우 사용될 함수의 내용을 작성한다  
* 가드는 적어도 한 칸 이상 들여쓰기가 되어야 한다  
    
# where  
* where 키워드를 사용하여 중간 계산 결과를 저장할 수 있다  
	* 함수의 끝에서 변수와 바인딩 된다   
* where에서 정의한 변수는 가드를 포함한 함수 전체에서 사용 가능하다  

```
# bmiTell.hs
bmiTell :: Double -> Double -> String
bmiTell weight height
        | weight / height ^ 2 <= 18.5 = "you're underweight"
        | weight / height ^ 2 <= 25.0 = "normal"
        | otherwise = "whale"


# bmiTell.hs (using where keyword)        
bmiTell :: Double -> Double ->String
bmiTell weight height
        | bmi <= 18.5 = "you're underweight"
        | bmi <= 25.0 = "normal" 
        | otherwise = "whale" 
        where bmi = weight / height ^ 2
```

* 첫번째 코드는 bmi계산을 반복하고 있지만 두번째 코드는 where 키워드를 이용하여 bmi 변수에 계산 결과를 바인딩한다  

```
calcBmis :: [(Double, Double)] -> [Double]
calcBmis xs = [bmi w h | (w, h) <- xs]
    where bmi weight height = weight / height ^ 2
```  
* where 블럭 속에 함수를 정의할 수 있다  
  
```  
# calcBmis.hs  
calcBmis :: [(Double, Double)] -> [Double]
calcBmis xs = [bmi w h | (w, h) <- xs]
    where bmi weight height = weight / height ^ 2  
  
ghci> calcBmis [(4, 2)]
[1.0]
```  
  
# let  
* let 표현식은 where와 매우 비슷하다   
* let 표현식은 적용 범위가 매우 작아서 가드에서는 보이지 않는다  
* let으로 정의한 변수는 let 표현식 내에서만 보이게 된다  
  
```
# cylinder.hs  
cylinder :: Double -> Double -> Double
cylinder r h =
        let sideArea = 2 * pi * r * h
            topArea = pi * r ^ 2
        in sideArea + 2 * topArea
  
ghci>cylinder 4 5
226.1946710584651  
```    
  
* let 표현식은 로컬 영역의 함수를 실행하기 위하여 사용될 수 있다  
  
```  
ghci> [let square x = x * x in (square 5, square 3, square 2)]  
[(25,9,4)]
```  
  
* let 표현식은 세미콜론으로 구분될 수 있다. 
	* 여러 가지 변수들을 바인딩하고자 할 때 유용하다 
	* 줄을 바꿔서 열에 맞춰 정렬하면 안 된다 
```  
ghci> (let a = 100; b = 200; c = 300 in a * b * c, let foo = "Hey "; bar = "there!" in foo ++ bar)  
(6000000,"Hey there!")  
```  
  
* let 표현식으로 다음과 같이 튜플의 요소들을 해체하고 바인딩하기 위한 패턴 매칭을 할 수 있다  
```  
ghci> (let (a, b, c) = (1, 2, 3) in a + b + c) * 100
600  
```  
  
* let 표현식은 리스트 Comprehension에서도 사용할 수 있다  
```
# calcBmis.hs
calcBmis :: [(Double, Double)] -> [Double]
calcBmis xs = [bmi | (w, h) <- xs, let bmi = w / h ^2]  
```  
  
# case  
* case 표현식은 특정 변수의 특정 값에 대한 코드 블록을 실행할 수 있게 해준다  
  
```  
# head.hs  
head' :: [a] -> a
head' xs = case xs of [] -> error "No head for empty list!"
                      (x:_) -> x

ghci> head' "Hello World"
'H'
```  
  
* 함수 정의부에서의 패턴 매칭은 case 표현식을 사용하는 것과 동일하다  
```
describeList :: [a] -> String
describeList ls = "The list is " ++ what ls
    where what [] = "empty."
          what [x] = "a singleton list."
          what xs = "a longer list."
```  

    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  