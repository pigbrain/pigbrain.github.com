---
layout: post
category: Bash
title: Arrays
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Indexed arrays  
* 1차원 배열  
* 첫번째 요소의 인덱스는 0이다  
* 배열 요소의 개수 제한은 없다  
  

<table>  
<tr><td>Form</td><td>Meaning</td></tr>
<tr><td>${name[i]}</td><td>Use element i of array name. i can be any arithmetic expression</td></tr>  
<tr><td>${name}</td><td>Use element 0 of array name</td></tr>  
<tr><td>${name[*]}</td><td>Use all elements of array name</td></tr>  
<tr><td>${name[@]}</td><td>Use all elements of array name</td></tr>  
<tr><td>${#name[*]} </td><td>Use the number of elements in array name</td></tr>  
<tr><td>${#name[@]}</td><td>Use the number of elements in array name</td></tr>  
</table>
  
# Example  

	prompt> message=(hi there how are you today)
	-----------------------------------------------
	아래와 같은 형태로도 초기화 가능  
			message[0]=hi This is the hard way
			message[1]=there
			message[2]=how
			message[3]=are
			message[4]=you
			message[5]=today
	-----------------------------------------------
	
	prompt> echo ${message[1]}
	there
	
	prompt> echo ${message}
	hi
	
	prompt> echo ${message[*]}
	hi there how are you today
	
	prompt> echo ${message[@]}
	hi there how are you today
	
	prompt> echo ${#message[*]} 
	6

	prompt> echo ${#message[@]} 
	6
  
<br>  
  
# Associative arrays  
* Bash version 4 부터 지원  

# Example  
	
	prompt> data=([joe]=30 [mary]=25) 
	
	prompt> echo ${data[joe]}
	30
	
	prompt> echo ${data[mary]}
	25
  
<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
