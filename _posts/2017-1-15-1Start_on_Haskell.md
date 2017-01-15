---
layout: post
category: Haskell
title: Haskell 시작하기  
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# GHCi
```
$ ghci
GHCi, version 8.0.1: http://www.haskell.org/ghc/  :? for help
Prelude>
Prelude> :set prompt "ghci>"
ghci>
ghci>
``` 
* ghci 명령어를 통하여 GHC Interactive모드를 실행한다  
* 기본 프롬프느는 `Prelude>`이지만  `:set prompt "ghci>"` 명령을 통하여 `ghci>`로 변경 가능하다  

# 간단한 연산  
```
ghci>2 + 15
17
ghci>49 * 100
4900
ghci>1892 - 1123
769
ghci>5 / 2
2.5

ghci>True && False
False
ghci>True && True
True
ghci>False || True
True
ghci>not False
True
ghci>not (True && True)
False

ghci>5 == 5
True
ghci>5 /= 5
False
ghci>5 /= 4
True
```

# 함수 호출하기  
```
ghci>succ 8
9
ghci>min 9 10
9
ghci>9 `min` 10
9
ghci>9 * 10 
90
``` 

* 하스켈에서 **\***는 두 개의 숫자를 입력 받아서 곱하는 함수다  
* * 처럼 매개변수 사이에 함수가 위치하게 되는 경우 이 함수를 infix function이라고 한다  
* 하스켈에서 대부분의 함수는 prefix function이다  
	* 함수의 이름이 앞에 오고 그 다음으로 공백, 그리고 매개변수들(공백으로 구분)이 온다  
* 하스켈에서 역 따옴표(**`**)로 함수 이름을 감쌀 경우 infix function처럼 호출 가능하다  

# 함수   
```
ghci>doubleUs 1 2
6
ghci>doubleUs 1 2 + doubleUs 3 4
20
ghci>doubleSmallNumber x = if x > 100 then x else x * 2
ghci>doubleSmallNumber 100
200
ghci>doubleSmallNumber 101
101
ghci>doubleSmallNumber` x = (if x > 100 then x else x * 2) + 1

```

* 파일명.hs 파일에 함수를 작성하고 `:l 파일명` 명령을 통하여 함수를 로드할 수 있다   
* **`**는 함수 이름에 유효한 문자이다  
	* **`**는 정적인 함수(Lazy하지 않은..) 혹은 비슷한 이름을 가지고 있는 함수의 약간 다른 버전임을 의미한다  
  
# 리스트 
```
ghci>lostNumbers = [4, 8, 15, 16, 23, 42]
ghci>lostNumbers
[4,8,15,16,23,42]
ghci>[1, 2, 3, 4] ++ [9, 10, 11, 12]
[1,2,3,4,9,10,11,12]
ghci>
ghci>"hello" ++ " " ++ "world"
"hello world"
```
* 하스켈에서 문자열은 문자들의 리스트이다  
* 두 개의 리스트를 합치려고 할 경우, 하스켈은 첫 번째 리스트(++의 왼쪽) 전체를 읽어야 하기 때문에 주의해야한다  
  
```
ghci>'A':" SMALL CAT"
"A SMALL CAT"
ghci>5:[1,2,3,4,5]
[5,1,2,3,4,5]
```
  
* **:**(cons 연산자)는 리스트의 시작 부분에 추가할 수 있도록 해준다  
  
```
ghci>1:2:3:[]
[1,2,3]
ghci>[1,2,3]
[1,2,3]
```
* `[1,2,3]`와 `1:2:3:[]`은 문법적으로 동일하다  

```
ghci>"Steve Buscemi" !! 6
'B'
ghci>[1, 2, 3, 4, 5] !! 2
3
```
* 리스트에 접근하기 위해서는 **!!**연산자를 이용해야 한다    
  
```
ghci>head [5, 4, 3, 2, 1]
5
ghci>tail [5, 4, 3, 2, 1]
[4,3,2,1]
ghci>last [5, 4, 3, 2, 1]
1
ghci>init [5, 4, 3, 2, 1]
[5,4,3,2]
ghci>head []
*** Exception: Prelude.head: empty list
ghci>length [5, 4, 3, 2, 1]
5
ghci>null []
True
ghci>null [1, 2, 3]
False
ghci>reverse [5, 4, 3, 2, 1]
[1,2,3,4,5]
```  
* **null**은 리스트가 비어있는지 검사한다  
  
# 범위  
 
```
ghci>[1..10]
[1,2,3,4,5,6,7,8,9,10]

ghci>[2,4..20]
[2,4,6,8,10,12,14,16,18,20]

ghci>take 10 (cycle [1,2,3])
[1,2,3,1,2,3,1,2,3,1]
```
* *..*를 이용하여 범위의 값을 열거할 수 있다  
* 첫 번쨰, 두 번째 값을 지정하면 이 두 값의 차이(간격)에 따라 값을 열거한다  
* **cycle**은 리스트를 받아서 무한 리스트를 만들기 위해서 항목들을 무한히 복제한다  
	* **take** 없이 실행할 경우 출력이 멈추지 않는다  

# 리스트 Comprehension  
```
ghci>[x * 2 | x <- [1..10]]
[2,4,6,8,10,12,14,16,18,20]

ghci>[x * 2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]

ghci>[x * 2 | x <- [1..10], x `mod` 7 == 3]
[6,20]

ghci>[x * 2 | x <- [1..10], odd x]
[2,6,10,14,18]

ghci>[x * 2 | x <- [1..10], x /= 2, x /= 3, x /= 4]
[2,10,12,14,16,18,20]

ghci>[x + y | x <- [1,2,3], y <- [10, 100, 1000]]
[11,101,1001,12,102,1002,13,103,1003]
``` 
* 리스트 Comprehension은 리스트를 검색하고, 결합하기 위한 방법이다  

# 튜플  
```
ghci>(1, 3)
(1,3)
ghci>(3, 'a', "hello")
(3,'a',"hello")
ghci>
ghci>fst (8, 11)
8
ghci>snd (8, 11)
11
```
* 튜플은 여러 타입의 항목들을 하나의 값처럼 저장하기 위하여 사용한다  
* 튜플은 고정된 크기를 갖는다  
* `fst`, `snt` 함수는 2개의 값을 갖는 튜플에만 사용가능하다  
 
  
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  