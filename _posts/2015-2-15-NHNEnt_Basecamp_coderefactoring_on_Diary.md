---
layout: post
category: Diary
title: NHN Ent 기술교육 - Refactoring 전과 후 
tagline: by Seㅈoong
tags: [Diary]
---
NHN Ent 기술교육 - 코드 리팩토링 전과 후를 비교해보자

<!--more-->

# 1월 26일 vs 2월 2일 프로젝트 Status<br>
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/status.PNG" alt="">


#Loc 비교<br>
- Total Loc 6548 -> 6332 [216 line 감소]<br>
- Code Loc  4840 -> 4769 [71 line 감소]<br>


#Total Loc
- 감소 이유<br>
1. 불필요한 주석 제거


#Code Loc
- 감소 이유
1. 불필요한 클래스 삭제<br>
해당 클래스를 통한 기능 구현이 더이상 필요하지 않을 경우 클래스를 제거 하였다.
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/common.PNG" alt="">
<Spring sessionAttribute 사용으로 HttpUtil, 프로젝트 기능변화로 ExcelTest 등  불필요 클래스 제거><br>
2. 중복코드 메소드 추출<br>
메소드별로 중복되는 코드 라인을 다른 메소드로 추출해 사용 하였다.
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/method_.PNG" alt="">
\<중복되는 리소스 반환 코드 메소드 추출\><br>

- 증가 이유
1. 기능 추가<br>
프로젝트 새로운 기능 추가로 코드라인 수 증가.
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/p.PNG" alt="">
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/pp.PNG" alt="">
<url주소로 썸네일 만드는 기능 추가><br>

2. 검증 코드 추가<br>
검증없이 사용하던 파라메터값의 유효성을 체크해 코드라인이 증가 하였다.
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/check_1.26.PNG" alt="">
<img src="/assets/themes/Snail/img/NHNEnt_coderefactoring/check_2.2.PNG" alt="">
<로그인시 사용자에게 받은 아이디, 패스워드 유효성 검사><br>


#결론
불필요한 클래스, 중복되는 기능을 제거 하며 많은 코드를 리펙토링 했지만 code loc만 본다면 71line으로 코드의 큰 감소는 보이지 않는다.<br> 
하지만 프로젝트의 새로운 기능의 추가로 200라인 이상이 추가 되었고 리펙토링 전 부실했던 검증 코드를 구현해 증가한 라인을 감안 한다면 더많은 양의 코드가 줄었다고 생각된다.<br>




#뭔가 이상한데,,



