---
layout: post
category: OpenSource    
title: Changing name of salt minion
tagline: by Pigbrain  
tags: [OpenSource]  
---

<!--more-->
  
### Stop the Salt-Minion On Salt minion
```
systemctl stop salt-minion
```

### Delete the current key On Salt minion
```
cd /etc/salt/pki/minion/
rm -rf minion.pub minion.pem
```

### Change the minions id in /etc/salt/minion_id On Salt minion
```
vim /etc/salt/minion_id
{{new minion id}}
```

### Delete the key for our salt minion On Salt Master
```
salt-key -d {{old minion id}}
```


### Restart Salt minion service On Salt minion
```
systemctl stop salt-minion
```


### Accept the new salt minion On Salt master 

```
salt-key --accept={{new minion id}}
```


# 참고  
* https://prolinuxhub.com/changing-name-of-salt-minion-centsos-7
