---
layout: post
category: Bash
title: Variable Substitution
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Variable Substitution  
* 아래 표현식들에는 공백(space)를 포함해선 안된다  
*  콜론(:)은 옵션으로 쓰이며 만약 콜론이 있을 경우 값은 null이 나오지 않는다  


<table>  
<tr><td>Form</td><td>Meaning</td></tr>
<tr><td>var=value </td><td>Set each variable var to a value</td></tr>  
<tr><td>${var} </td><td>Use value of var</td></tr>  
<tr><td>${var:-value} </td><td>Use var if set; otherwise, use value</td></tr>
<tr><td>${var:=value} </td><td>Use var if set; otherwise, use value and assign
value to var</td></tr>  
<tr><td>${var:=value} </td><td>Use var if set; otherwise, use value and assign
value to var</td></tr> 
<tr><td>${#var} </td><td> Use the length of var</td></tr> 
<tr><td>${#*} </td><td> Use the number of positional parameters</td></tr> 
<tr><td>${#@} </td><td> Use the number of positional parameters</td></tr> 
<tr><td>${var:pos} </td><td> Starting at position pos (0-based) in variable</td></tr> 
<tr><td>${var:pos:len} </td><td> var, extract len characters, or extract rest of string</td></tr> 
<tr><td>${var/pat/repl} </td><td> Use value of var, with first match of pat replaced with repl </td></tr>
<tr><td>${var/pat} </td><td> Use value of var, with first match of pat deleted</td></tr>
<tr><td>${var/pat/repl} </td><td> Use value of var, with first match of pat replaced with repl </td></tr>
</table>  
	
  
# Example  
	
	prompt> var1=apple var2=banana
	prompt> echo ${var1} ${var2}
	apple banana

	prompt> echo ${var1:-none} ${var3:-none}
	apple none
	
	prompt> echo ${var3}
	  
	prompt> echo ${var3:=computer}
	computer  
	prompt> echo ${var3}
	computer  
	
	prompt> echo ${#var3}
	8  
	
	prompt> cat test.sh
	echo ${#*}
	echo ${#@}
	prompt> ./test.sh a b c d 
	4
	4
	
	prompt> echo ${var3:3}
	puter
	prompt> echo ${var3:3:2}
	pu
	
	prompt> echo ${var3/com/moc}
	mocputer
	prompt> echo ${var3/com}
	puter
	
	prompt> var4=apple1apple2apple3
	prompt> echo ${var4/apple/banana}
	banana1apple2apple3
	prompt> echo ${var4//apple/banana}
	banana1banana2banana3



<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
