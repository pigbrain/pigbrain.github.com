---
layout: post
category: Diary
title: Redis Sentinel 삽질
tagline: by Pigbrain
tags: [Diary]
---
NHN Ent 베이스 캠프 4주차 과제... <br>
웹 서버 2대의 세션을 Redis를 통하여 자체 관리하도록 하는... <br>

<!--more-->
이 과제를 하기 위해서는 Jedis(자바 Redis라이브러리)를 사용해야 한다. <br>
그리고 Redis 2대를 설치하여 Master/Slave로 구성하고 세션을 잘~ 관리하도록 해야한다 <br>
Master/Slave로 구성 할떄 Master에서 fail over가 발생하면  Jedis 내부에서 알아서 Slave로 연결하여 클라이언트의 요청을 처리 할 줄 알았으나,,, 괜한 기대였다.

Redis 2.8 부터 Redis와 함꼐 배포되는 Sentinel.. 이름 부터 그냥 멋있다. 그래서 이것을 사용해보기로 했다. <br>
Sentinel은 감시병 이란 뜻이다. 뜻 그대로 Redis 의 Master/Slave들을 감시하고 있으며 Master에 장애가 발생하면 적당한 Slave를 골라서 Master로 승격시키는 역할을 해준다. 물론 Jedis를 사용하는 클라이언트는 Redis들의 장애 여부 상관없이 Sentinel에게만 요청을 보내면 Sentinel이 현재 Master에게 요청을 전달하여 알아서 잘 처리해준다.

Sentinel 에서 적당한 Slave를 골라서 Master로 지정하는 부분은 소스를 직접 까서 봐야겠다.
Sentinel 처럼 프로세스들을 감시하는 녀석이 있어서 Master를 고르는건 뭐 간단해 보이지만,, 이런 감시 프로세스 없이
프로세스들끼리 통신하여 Master를 뽑는 Election Algorithm을 사용하는 것이 더 멋있는 것 같은데 왜 이렇게 하지 않을까?
Sentinel을 여러대 두지 않는 이상 Sentinel이 SPOF가 될텐데 만들기 쉬운 장점 외에 다른 장점이 있는지는 잘 모르겠다. 

뭐 아무튼! Sentinel을 적용하기에 앞서 각각의 서버 2대에 Redis를 설치하고 Master/Slave로 동작시킨다.
Master에 Write를 하면 Slave에도 잘 동기화가 된다. <br>
이제 Sentinel을 적용한다. sentinel.conf는 뭐 어려운 부분이 없으니 주석만 보고도 설정을 쉽게 할 수 있다. 
'./redis-sentinel sentinel.conf' 를 실행하니 뭐 Master, Slave들을 찾아서 모니터링 시작한다는 것 같은 로그가 막 출력된다.
Jedis를 사용하고 있는 클라이언트 소스를 수정하여 테스트 해보니 잘 된다.

끝난 줄 알았다.

Sentinel 기능을 테스트해보고 싶어 Slave를 Kill 하고 Master로 설정을 바꾸어 실행을 해보았다.<br>
잘 돌아가던 Sentinel 이 정신을 못차리기 시작하드라... 그래서 다시 Slave로 설정을 바꾸어 실행을 했으나.. 여전히 제정신이 아닌 것 같다. 그래서 Sentinel과 Redis 2대를 모두 Kill 하고 Sentinel, Redis 순으로 프로세스를 실행 시켰다.
그런데 처음에는 잘 동작했던 것들이 이상하게 모니터링 한다는 로그도 안나오고 뭔가 이상하다. 이쯤에서 Sentinel을 버리고 
zookeeper를 이용하여 Redis들의 세션을 관리하게 해야 할까 라는 생각도 들었지만 하기 귀찮아서 조금더 Sentinel을 
붙잡고 있었다. Redis를 Kill하고 실행하고, Sentinel을 Kill하고 실행하고,, 를 수차례 반복하면서 깨달음을 얻었다.

필자의 테스트 환경에서만 발생하는 현상인 건지 아니면 원래 이런건지는 잘 모르겠으나..

#Sentinel이 구동 중에 Redis들의 설정을 변경하게 되면,, Sentinel이 정상적으로 모니터링을 하지 못한다. <br><br> 모든 Redis의 설정을 마치고 실행한 후에 Sentinel을 실행 할 경우에는 잘 되드라..#