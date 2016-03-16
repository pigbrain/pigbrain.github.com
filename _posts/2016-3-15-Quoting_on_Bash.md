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
   
* "…" : 아래 문자를 제외한 "와 "안에 있는 모든 것은 문자로 취급된다    
	* $ : 변수에 할당된 값을 출력     
	* ` : 명령어의 결과 값을 출력 
	* " : - 
* '...' : '와 '안에 있는 모든 것은 문자로 취급되며 중간에 '를 포함할 수 없다        
* \ : \다음에 나오는 기호는 문자로 취급된다  
* $'...' : '...'와 비슷하지만 Escape Sequences가 처리된다  

# Escape Sequences
  
<table>  
<tr><td>Sequence</td><td>Availability</td><td>Value</td></tr>
<tr><td>\a </td><td>All </td><td>ASCII BEL (visual or audible alert)</td></tr>
<tr><td>\b </td><td>All </td><td>Backspace </td></tr>
<tr><td>\e </td><td>All </td><td>Escape </td></tr>
<tr><td>\E </td><td>All </td><td>Escape </td></tr>
<tr><td>\f </td><td>All </td><td>Formfeed </td></tr>
<tr><td>\n </td><td>All </td><td>Newline </td></tr>
<tr><td>\r </td><td>All </td><td>Carriage return </td></tr>
<tr><td>\t </td><td>All </td><td>Tab</td></tr>
<tr><td>\uHHHH </td><td>All </td><td>Unicode character HHHH</td></tr>
<tr><td>\v </td><td>All </td><td>Vertical tab</td></tr>
<tr><td>\xHH</td><td>All </td><td>Hexadecimal value HH</td></tr>
<tr><td>\` </td><td>$'...' </td><td>Single quote </td></tr>
<tr><td>\" </td><td>$'...' </td><td>Double quote </td></tr>
<tr><td>\? </td><td>$'...' </td><td>Question mark </td></tr>
<tr><td>\\ </td><td>$'...' </td><td>Backslash </td></tr>
</table>
  
  
  
# Example  
	
	prompt> echo 'Single quotes "protect" double quotes'
	Single quotes "protect" double quotes
	
	prompt> echo "Well, isn’t that \"special\"?"
	Well, isn’t that "special"?
	
	prompt> echo "You have `ls | wc -l` files in `pwd`"
	You have 43 files in /home/bob	
	
	prompt> echo "The value of \$x is $x"
	The value of $x is 100	
	
	prompt> echo $'A\tB'
	A	B
	
<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
