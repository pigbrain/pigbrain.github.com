---
layout: post
category: Network
title: HTTP/2 5.1 Stream States 
tagline: by Pigbrain
tags: [Network]
---

<!--more-->
  
# 5.1 Stream States 

* 아래 다이어그램은 스트림의 상태 변화와 상태 변화에 영향을 끼치는 프레임과 플래그들을 보여준다  

	
```
                             +--------+
                     send PP ⎢        ⎢ recv PP
                    ,--------⎢  idle  ⎢--------.
                   /         ⎢        ⎢         \
                  v          +--------+          v
           +----------+          ⎢           +----------+
           ⎢          ⎢          ⎢ send H /  ⎢          ⎢
    ,------⎢ reserved ⎢          ⎢ recv H    ⎢ reserved ⎢------.
    ⎢      ⎢ (local)  ⎢          ⎢           ⎢ (remote) ⎢      ⎢
    ⎢      +----------+          v           +----------+      ⎢
    ⎢          ⎢             +--------+             ⎢          ⎢
    ⎢          ⎢     recv ES ⎢        ⎢ send ES     ⎢          ⎢
    ⎢   send H ⎢     ,-------⎢  open  ⎢-------.     ⎢ recv H   ⎢
    ⎢          ⎢    /        ⎢        ⎢        \    ⎢          ⎢
    ⎢          v   v         +--------+         v   v          ⎢
    ⎢      +----------+          ⎢           +----------+      ⎢
    ⎢      ⎢   half   ⎢          ⎢           ⎢   half   ⎢      ⎢
    ⎢      ⎢  closed  ⎢          ⎢ send R /  ⎢  closed  ⎢      ⎢
    ⎢      ⎢ (remote) ⎢          ⎢ recv R    ⎢ (local)  ⎢      ⎢
    ⎢      +----------+          ⎢           +----------+      ⎢
    ⎢           ⎢                ⎢                 ⎢           ⎢
    ⎢           ⎢ send ES /      ⎢       recv ES / ⎢           ⎢
    ⎢           ⎢ send R /       v        send R / ⎢           ⎢
    ⎢           ⎢ recv R     +--------+   recv R   ⎢           ⎢
    ⎢ send R /  `----------->⎢        ⎢<-----------'  send R / ⎢
    ⎢ recv R                 ⎢ closed ⎢               recv R   ⎢
    `----------------------->⎢        ⎢<----------------------'
                             +--------+
                             
send:   endpoint sends this frame
recv:   endpoint receives this frame

H : HEADERS frame (with implied CONTINUATIONs)
PP: PUSH_PROMISE frame (with implied CONTINUATIONs)
ES: END_STREAM flag
R : RST_STREAM frame
```

* `CONTINUATION` 프레임은 스트림의 상태에 아무런 영향을 끼치지 않는다. 
* `END_STREAM` 플래그를 포함하는 프레임에 대하여 별도의 처리를 하고자 스트림의 상태를 관리한다  
	* `END_STREAM` 플래그를 포함하는 `HEADERS` 프레임은 2가지의 상태로 변화 시킬 수 있다   	 
* 각 엔드포인트는 프레임이 전송되는 과정에서 서로 다른 스트림의 상태를 가질 수 있다 
* 각 엔드포인트는 독립적으로 스트림을 생성한다  
* 각 엔드포인트의 스트림의 상태가 일치하지 않는 경우 `RST_STREAM`을 전송하고 스트림의 상태를 `closed`로 변경할 수 있다 






# 원문   
* http://httpwg.org/specs/rfc7540.html#Overview