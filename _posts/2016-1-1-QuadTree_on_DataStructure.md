---
layout: post
category: DataStructure
title: 쿼드 트리(Quad Tree)
tagline: by Pigbrain
tags: [DataStructure]
---

<!--more-->

**-쿼드 트리는 4개의 자식 노드를 가지는 트리 구조의 자료구조다**  
   
**-쿼드 트리는 2차원의 공간을 4개의 구역(4개의 자식노드)로 재귀적으로 분할한다**    
  
**-쿼드 트리는 거대한 2차원 공간을 빠르게 검색 가능하다**   

#구조  
 * 쿼드트리로 저장하기 위한 지형을 4등분 한다    
 * 분할된 4개의 지역을 자신 노드로 추가한다   
	 * 각 분할된 지역의 범위를 좌표로 기록  
 * 위 과정을 정해진 Depth 만큼 반복한다  
<img src="/assets/themes/Snail/img/DataStructure/QuadTree/quadtree.png" alt="">  
<br>
<br>      
  

# 참고
* https://en.wikipedia.org/wiki/Quadtree  
* http://wonjayk.tistory.com/190  
* http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves  

