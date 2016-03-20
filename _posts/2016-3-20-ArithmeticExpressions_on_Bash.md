---
layout: post
category: Bash
title: Arithmetic Expressions
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Arithmetic Expressions  
* Bash는 다음 2가지 방법으로 산술 연산을 제한하고 있다  
	* $((expr))
	* let expressions
  
<br>  
  
<table>  
<tr><td>Operator</td><td>Description</td></tr>
<tr><td>++ -- </td><td>Auto-increment and auto-decrement, both prefix and postfix </td></tr>  
<tr><td>+ - </td><td>Unary plus and minus </td></tr>  
<tr><td>! ~ </td><td>Logical negation and binary inversion (one’s complement) </td></tr>  
<tr><td>** </td><td>Exponentiation </td></tr>  
<tr><td>* / % </td><td>Multiplication, division, modulus </td></tr>  
<tr><td><< >> </td><td>Bitwise left shift, bitwise right shift </td></tr>  
<tr><td>== != </td><td>Equality, inequality </td></tr>  
<tr><td>& </td><td>Bitwise AND </td></tr>  
<tr><td>^ </td><td>Bitwise exclusive OR </td></tr>  
<tr><td>│ </td><td>Bitwise OR </td></tr>  
<tr><td>&& </td><td>Logical AND (short circuit) </td></tr>  
<tr><td>││ </td><td>Logical OR (short circuit) </td></tr>  
<tr><td>?: </td><td>Inline conditional evaluation </td></tr>  
<tr><td>, </td><td>Sequential expression evaluation </td></tr>
</table>  
  
<br>  
  
# Example  
	
	prompt> let "i = 10 + 2"
	prompt> echo $i
	12
	
	prompt> echo $((2 ** 4))
	16  
	

<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
