---
layout: post
category: Bash
title: Command Forms
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Command Forms  

<table>  
<tr><td>Form</td><td>Meaning</td></tr>
<tr><td>cmd &</td><td>Execute cmd in background</td></tr>  
<tr><td>cmd1; cmd2</td><td>Execute multiple cmds</td></tr>  
<tr><td>{ cmd1; cmd2; }</td><td>Execute commands as a group in the current shell</td></tr>  
<tr><td>(cmd1; cmd2)</td><td>Execute commands as a group in a subshell</td></tr>  
<tr><td>cmd1 │ cmd2 </td><td>use output from cmd1 as input to cmd2</td></tr>  
<tr><td>cmd1 `cmd2` </td><td>use cmd2 output as arguments to cmd1</td></tr>  
<tr><td>cmd $((expression)) </td><td>Use the result of expression as argument to cmd</td></tr>  
<tr><td>cmd1 && cmd2 </td><td>execute cmd1 and then (if cmd1 succeeds)cmd2</td></tr>  
<tr><td>cmd1 ││ cmd2 </td><td> execute either cmd1 or (if cmd1 fails)cmd2</td></tr>  
<tr><td>!cmd </td><td> execute cmd, and produce a zero exit status if cmd exits with a nonzero status. produce a nonzero status when
cmd exits with a zero status</td></tr>  
</table>  
   
# Example  
	
	prompt> 
	
<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
