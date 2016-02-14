---
layout: post
category: DataStructure
title: Treap
tagline: by Pigbrain
tags: [DataStructure]
---

<!--more-->

# Treap  
* Tree + Heap = **Treap**  
* BST(Binary Search Tree)의 일종이다
* 정렬된 상태로 BST를 만들게 되면 Liked List와 동일한 형태가되는 문제를 보완한 형태이다        
* 노드에 우선순위(priority)가 정해져 있다      
* 부모 노드는 자식 노드보다 낮은 우선순위(priority) 값을 갖는다 (Heap의 특성)        
	* 삽입/삭제시 우선순위(priority)에 대한 규칙이 어긋나면 회전시킨다    
* Treap은 평균적으로 O(log N)의 시간 복잡도를 가지고 구현하기 쉽다    
	* Red-Black Tree, AVL Tree는 모든 연산에서 O(log N)의 시간 복잡도를 가지지만 구현하기 어렵다  
  

<br>  

# Example  

<img src="/assets/themes/Snail/img/DataStructure/Treap/example1.png" alt="">  
  
<img src="/assets/themes/Snail/img/DataStructure/Treap/example2.png" alt="">  
  

<img src="/assets/themes/Snail/img/DataStructure/Treap/example3.png" alt="">  
  

# Code # 
* [Code](https://github.com/pigbrain/HelloJava/blob/master/src/main/java/io/pigbrain/tree/treap/Treap.java)
  
<br>  

# 참고
* http://www.cs.cornell.edu/courses/cs312/2003sp/lectures/lec26.html  
* http://users.cis.fiu.edu/~weiss/dsaajava/code/DataStructures/Treap.java 
* http://opendatastructures.org/ods-java/7_2_Treap_Randomized_Binary.html   