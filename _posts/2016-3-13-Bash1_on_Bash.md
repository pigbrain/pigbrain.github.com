---
layout: post
category: Bash
title: Arguments & Command Exit Status
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Arguments
* parameter는 순서대로 $1, $2.. 에 할당 된다    
* $0에는 스크립트명이 들어간다  

# Example  
	
	test.sh
	-----------------------------
		echo $0
		echo $1
		echo $2

	prompt> ./test.sh apple banana
			parameter0 : ./test.sh
			parameter1 : apple
			parameter2 : banana


# Command Exit Status 
* 명령어 실행이 종료되면 숫자형태의 exit status를 반환한다  
* exit status의 값
	* **0** : true / success  
	* **0 외의 수** : false / failure  
  
<table>
<tr><td>Numeric value</td><td>Meaning</td><td></tr>
<tr><td>0</td><td>success</td></tr>
<tr><td>2</td><td>Returned by built-in commands to indicate usage errors</td></tr>
<tr><td>126</td><td>Command was found but was not executable</td></tr>
<tr><td>127</td><td>Command not found</td></tr>
<tr><td>128 + N</td><td>Command died due to receiving signal number N</td></tr>
</table>
  
# Example

	prompt> testcommand
	-bash: testcommand: command not found
	prompt> echo $?
	127

<br>  

# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
