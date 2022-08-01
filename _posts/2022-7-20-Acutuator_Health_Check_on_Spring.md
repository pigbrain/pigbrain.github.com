---
layout: post
category: Spring
title: Access Log on Istio
tagline: by Pigbrain
tags: [Istio]
---
  
<!--more-->  
  
* Istio에서는 Envoy를 이용하여 Access Log 수집이 가능하다 
* Envoy를 통해 전달되는 트래픽에 대해 Access Log를 특정 endpoint로 전송할 수 있다
* Envoy는 Access Log를 설정된 서버로 `grpc`를 이용하여 전달한다  
  
<br>

# Access Log 설정 
### operator로 설치한 경우 
* `IstioOperator` 리소스에 아래 설정 추가

```yaml
spec:
  meshConfig:
    accessLogFile: /dev/stdout
    accessLogEncoding: JSON
    enableEnvoyAccessLogService: true
    defaultConfig:
      envoyAccessLogService: 
        address: <endpoint> 
```

* `endpoint`에는 access log를 grpc로 전달 받을 서버의 주소를 적는다 

<br>

### istioctl로 설치한 경우 
* `istio` `configmap`에 아래 설정 추가 

```yaml
data:
  ...
  mesh: |-
    accessLogFile: /dev/stdout
    accessLogEncoding: JSON
    enableEnvoyAccessLogService: true
    defaultConfig:
      envoyAccessLogService: 
        address: <endpoint> 
```

* `endpoint`에는 access log를 grpc로 전달 받을 서버의 주소를 적는다 

<br>

# Access Log format
* 기본 포맷에도 어지간한 정보는 다 있는 것 같은데 변경이 필요하면 https://istio.io/latest/docs/tasks/observability/logs/access-log/#default-access-log-format 를 참고


# Access Log 수집을 위한 Grpc 서버 
### Go 


# 참고 
* https://istio.io/latest/docs/tasks/observability/logs/access-log/