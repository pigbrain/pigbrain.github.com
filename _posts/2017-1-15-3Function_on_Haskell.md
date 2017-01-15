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
    
    
# 참고 
* http://www.yes24.com/24/Goods/12155304?Acode=101  