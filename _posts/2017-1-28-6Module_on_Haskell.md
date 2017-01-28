---
layout: post
category: Haskell
title: Haskell 모듈   
tagline: by Pigbrain
tags: [Haskell]
---

<!--more-->


# 모듈(Module)  
* 하스켈 모듈은 기본적으로 함수, 타입, 타임 클래스를 정의한 파일이다  
* 하스켈 프로그램은 모듈들의 집합이다  
* 모듈 내의 기능들을 외부에  기능을 제공하기 위해서는 익스포트(export)를 해야한다  
* 일반적인 함수와 타입, 타입 클래스는  **Prelude**모듈의 일부이며 기본적으로 임포트(import)된다  
  
# 모듈 import하기     
  
```
import Data.List  -- 모듈 임포트

numUniques :: (Eq a) => [a] -> Int
numUniques = length . nub

ghci> numUniques [1, 2, 3, 1, 2, 1,  1]
3
```  

* `nub`함수는 리스트에서 중복된 요소를 제거한다  
* GHCi를 사용할 경우 아래와 같이 모듈을 임포트한다    

```
ghci> :m + Data.List
ghci> :m +  Data.List Data.Map Data.Set -- 여러 개의 모듈들을 한 번에 임포트  
``` 

* 모듈에서 몇몇 함수들만 필요한 경우 그 함수들만 선택적으로 임포트할 수 있다  
  
```
import Data.List (nub, sort)
```
  
* 모듈에서 몇몇 함수들만 제외하고 모듈에 있는 함수들을 임포트할 수 있다   
  
```
import Data.List hiding (nub)
```    
  
* 모듈을 임포트할 때 기존에 만들어진 함수와 이름이 충돌하는 것을 해결하기 위해 `qualified import`를 한다  
  
```
import qualified Data.Map as M

M.filter ...
```

# 모듈 함수 사용하기    
  
## 단어 카운팅   

```
# wordNum.hs
import Data.List

wordNum :: String -> [(String, Int)]
wordNum = map (\ws -> (head ws, length ws)) . group . sort . words

-- wordNum xs = map (\ws -> (head ws, length ws)) (group (sort (words xs)))
  
ghci> wordNum "wa wa wee wa"
[("wa",3),("wee",1)] 
```
 
# 모듈 만들기  
* 어떤 모듈을 임포트하면 모듈이 익스포트하는 함수들을 사용할 수 있다  
* 모듈은 내부적으로 사용하는 함수를 정의할 수도 있지만 모듈이 익스포트하는 거슬만 볼 수 있고 사용할 수 있다  

## Geometry 모듈  
* 모듈의 시작 부분에 모듈명을 지정한다  
* 파일명이 Test.hs라면 모듈명도 Test여야 한다  
* 익스포트될 함수를 지정한 다음에 함수들을 추가할 수 있다  
  
```
# Geometry.hs 

module Geometry
( sphereVolume
, sphereArea
, cubeVolume
, cubeArea
) where

sphereVolume :: Float -> Float
sphereVolume radius = (4.0 / 3.0) * pi * (radius ^ 3)

sphereArea :: Float -> Float
sphereArea radius = 4 * pi * (radius ^ 2)

cubeVolume :: Float -> Float
cubeVolume side = rectArea side side * side

cubeArea :: Float -> Float
cubeArea side = rectArea side side * 6

rectArea :: Float -> Float -> Float
rectArea a b = a * b
```  
  
  
* 모듈은 계층적인 구조를 가질 수 있다  
* 모듈은 수많은 하위 모듈을 가질 수 있다  
* Geometry 폴더 하위에 Sphere.hs, Cube.hs를 생성한다  
  
```
# Sphere.hs  

module Geometry.Sphere
( volume
, area
) where

volume :: Float -> Float
volume radius = (4.0 / 3.0) * pi * (radius ^ 3)

area :: Float -> Float
area radius = 4 * pi * (radius ^ 2)
  
# Cube.hs 

module Geometry.Cube
( volume
, area
) where

volume :: Float -> Float
volume side = side * side * side

area :: Float -> Float
area side = side * side * 6


# Test.hs (Sphere와 Cube를 import하여 사용) 
module Test
(
) where

import qualified Geometry.Sphere as S
import qualified Geometry.Cube as CC

```



       
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  