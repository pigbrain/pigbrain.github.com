---
layout: post
category: Bash
title: Quoting
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Quoting  
* 특정 기호가 가지는 의미가 변경된다   

<table>  
<tr><td>Character</td><td>Meaning</td></tr>
<tr><td>;</td><td>Command separator</td></tr>  
<tr><td>&</td><td>Background execution</td></tr>  
<tr><td>()</td><td>Command grouping</td></tr>  
<tr><td>│</td><td>Pipe</td></tr>  
<tr><td> < > & </td><td>Redirection symbols</td></tr>  
<tr><td> * ? [ ] ~ + - @ ! </td><td>Filename metacharacters</td></tr>  
<tr><td> " ' / </td><td>Used in quoting other characters</td></tr>  
<tr><td>`</td><td>Command substitution</td></tr>
<tr><td>$</td><td>Variable substitution (or command or arithmetic substitution)</td></tr>
<tr><td>#</td><td>Start a comment that continues to the end of the line</td></tr>
<tr><td>space tab newline</td><td>Word separators</td></tr>  
</table>  
   
* "…"
	* $  
	* `  
	* "  
* '...'  
* \
* $"..."  
* $'...'


# Example  
	
	
<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
