---
layout: post
category: Bash
title: Brace Expansion
tagline: by Pigbrain
tags: [Bash]
---

<!--more-->

# Brace Expansion  
* 문자열을 생성하기 위해 사용한다  
  
# Example  
	
	prompt>  echo hi{DDD,BBB,CCC,AAA}there
	hiDDDthere hiBBBthere hiCCCthere hiAAAthere
	
	prompt>  mv info{,.old}   -> mv info info.old
	
	prompt>  echo 1 to 10 is {1..10}
	1 to 10 is 1 2 3 4 5 6 7 8 9 10
	
	prompt> echo a{A{1,2},B{3,4}}b
	aA1b aA2b aB3b aB4b 
	
	prompt> mkdir {2007..2009}-0{1..9} {2007..2009}-{10..12}
	prompt> ls
	2007-01 2007-07 2008-01 2008-07 2009-01 2009-07
	2007-02 2007-08 2008-02 2008-08 2009-02 2009-08
	2007-03 2007-09 2008-03 2008-09 2009-03 2009-09
	2007-04 2007-10 2008-04 2008-10 2009-04 2009-10
	2007-05 2007-11 2008-05 2008-11 2009-05 2009-11
	2007-06 2007-12 2008-06 2008-12 2009-06 2009-12
	
	prompt> echo {Z..A}  
	Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
  
<br>  
  
# 참고
* [Bash Pocket Reference](http://www.amazon.com/bash-Pocket-Reference-OReilly/dp/1449387888)  
* http://linuxcommand.org/lc3_lts0080.php