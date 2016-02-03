---
layout: post
category: DataStructure
title: 스킵리스트(Skip List)
tagline: by Pigbrain
tags: [DataStructure]
---

<!--more-->

**-Log시간에 검색/추가/제거를 수행할 수 있는 정렬된 자료구조**  

**-이진검색트리 대체 가능**  

# 연결리스트와의 차이점  
* 연결리스트는 하나의 'next' 포인터만 갖는다 
* 스킵리스트는 다수의 'next' 포인터를 갖는다 (Foward 포인터라 불린다)
	* Forward 포인터를 이용하여 빠르게 탐색 가능
	* 최상의 경우 입력 값들이 랜덤인 경우 O(log n)의 효율을 갖는다
	* 최악의 경우 정렬된 데이터들이 입력된다면 O(n)의 복잡도를 가질 수 있다

<img src="/assets/themes/Snail/img/DataStructure/SkipList/simple_skiplist.png" alt="">

# 구조
<img src="/assets/themes/Snail/img/DataStructure/SkipList/explain.png" alt="">

# 검색  
* 가장 상위의 리스트 부터 검색을 시작
* 현재 위치(**p**)의 값을 x, 다음 노드의 값을 y라고 가정
	* x == y이면 다음 노드를 반환
	* x > y 이면 다음 노드로 이동
	* x < y 이면 아래 리스트로 이동
	
* Ex) 78을 검색  
<img src="/assets/themes/Snail/img/DataStructure/SkipList/search.png" alt="">
  
  

# 삽입  
* Ex) 15를 삽입
	* 15를 검색한다
	* 15보다 작은 수에서 검색이 종료된다
	* 검색 종료 된 위치를 Predecessor Key라고 지칭하며 이 다음 위치에 15를 삽입한다
		* 삽입할때 확률로 노드의 크기를 정하여 삽입한다 
<img src="/assets/themes/Snail/img/DataStructure/SkipList/insert.png" alt="">
  

# 삭제  
* Ex) 34를 삭제 
	* 상위 리스트의 값부터 삭제하며 아래로 이동한다
<img src="/assets/themes/Snail/img/DataStructure/SkipList/delete.png" alt="">


# 참고
* https://en.wikipedia.org/wiki/Skip_list
* http://www.slideshare.net/jongwookkim/skip-list
* http://sweeper.egloos.com/m/867460
* http://www.slideshare.net/AndresMendezVazquez/analysis-of-algorithms-13-skip-lists?related=1