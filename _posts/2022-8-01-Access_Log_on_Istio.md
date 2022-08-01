---
layout: post
category: Istio
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
* https://github.com/previousdeveloper/als-collector 에 매우 쉽게 구현되어 있어서 참고하면 좋을 것 같음 

### Java (Spring Boot)
* `io.envoyproxy.controlplane:server` 라이브러리를 활용하여 아래와 같이 구현 가능 

```java
...
import io.envoyproxy.envoy.data.accesslog.v3.HTTPAccessLogEntry;
import io.envoyproxy.envoy.service.accesslog.v3.AccessLogServiceGrpc;
import io.envoyproxy.envoy.service.accesslog.v3.StreamAccessLogsMessage;
import io.envoyproxy.envoy.service.accesslog.v3.StreamAccessLogsResponse;
import io.grpc.stub.StreamObserver;
...

@Slf4j
@AllArgsConstructor
@GrpcService
public class IstioAccessLogService extends AccessLogServiceGrpc.AccessLogServiceImplBase {

    @Override
    public StreamObserver<StreamAccessLogsMessage> streamAccessLogs(
            StreamObserver<StreamAccessLogsResponse> responseObserver) {
        return new StreamObserver<>() {
            private volatile boolean ingressEnvoy = false;

            @Override
            public void onNext(StreamAccessLogsMessage message) {
                List<HTTPAccessLogEntry> logEntries = message.getHttpLogs().getLogEntryList();
                for (HTTPAccessLogEntry logEntry : logEntries) {
                    
                    ...
                }
            }

            @Override
            public void onError(Throwable t) {
                responseObserver.onError(t);
            }

            @Override
            public void onCompleted() {
                responseObserver.onCompleted();
            }
        };
    }
}

```

<br>

# Access Log가 n번 수집되는 현상 ?
* Ingress Gateway 내에서 Envoy가 들어있고 배포되는 Pod들에도 Envoy가 붙어 있다 
* Ingress Gateway로 트래픽이 들어올 경우 타겟이 되는 Pod까지 가기 위해 여러 Envoy를 거치게 된다 
* Envoy를 거칠때마다 Access Log를 위에서 지정한 `endpoint`로 전송하게 된다 
  * 각 Envoy가 전송하게 됨 
* Grpc로 전달되는 message 내용 중 어떤 Envoy가 전송한 것인지 힌트가 될 수 있는 정보가 있다 
```java
StreamAccessLogsMessage.getIdentifier().getNode().getCluster();
```
* 위 정보를 이용하여 `istio-system` 네임스페이스에서 전달된 것만 수집해도 충분하지 않을까 싶다


# 참고 
* https://istio.io/latest/docs/tasks/observability/logs/access-log/
* https://www.envoyproxy.io/docs/envoy/latest/configuration/observability/access_log/usage