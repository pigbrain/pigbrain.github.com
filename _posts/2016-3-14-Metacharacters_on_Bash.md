---
layout: post
category: Bash
title: Filename Metacharacters
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Metacharacters  
  

<table>  
<tr><td>Metacharacter</td><td>Meaning</td></tr>
<tr><td>*</td><td>Match any string of zero or more characters</td></tr>  
<tr><td>?</td><td>Match any single character</td></tr>  
<tr><td>[abc...]</td><td>Match any one of the enclosed characters; a hyphen can
specify a range (e.g., a-z, A-Z, 0–9)</td></tr>  
<tr><td>[!abc...]</td><td>Match any character not enclosed as above</td></tr>  
<tr><td>~</td><td>Home directory of the current user.</td></tr>  
<tr><td>~name</td><td>Home directory of user name</td></tr>  
<tr><td>~+</td><td>Current working directory ($PWD)</td></tr>  
<tr><td>~-</td><td>Previous working directory ($OLDPWD)</td></tr>  
</table>  
  
# Example  
	
	ls
	-----------------------------
  	a  apple  b  banana  c  case  d  duck  

	prompt> ls a*
	a  apple
	
	prompt> ls a????
	apple
	
	prompt> ls [a-c]  
	a  b  c  
	
	prompt> ls [!a-c]  
	d  
	
<br>  
  
* extglob (extended pattern matching) 
  * extglob을 활성화 시키기 위해서는 다음 명령어 실행  
	  * **shopt -s extglob** 

<table>  
<tr><td>option</td><td>Meaning</td></tr>
<tr><td>?(pattern)</td><td>Match zero or one instance of pattern</td></tr>
<tr><td>*(pattern)</td><td>Match zero or more instances of pattern</td></tr>
<tr><td>+(pattern)</td><td>Match one or more instances of pattern</td></tr>
<tr><td>@(pattern)</td><td>Match exactly one instance of pattern</td></tr>
<tr><td>!(pattern)</td><td>Match any strings that don’t match pattern</td></tr>
</table>  


# Example  
	
	prompt> shopt -s extglob  

	ls
	-----------------------------
  	te11te  te12te  te1te  te21te  te22te  te2te
	
	prompt> ls te?(1|2)te
	te1te  te2te
	
	prompt> ls te*(1|2)te
	te11te  te12te  te21te  te22te
	
	prompt> ls te+(1|2)te
	te11te  te12te  te1te  te21te  te22te  te2te
	
	prompt> ls te@(1|2)te
	te1te  te2te
	
	
	
	
	ls
	-----------------------------
  	a  apple  b  banana  c  case  d  duck  
	
	prompt> ls !(apple|b)
	a  banana  c  case  d  duck  touch
	

<br>  

# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
