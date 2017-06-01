---
layout: post
category: Network
title: $GOPATH and workspace  
tagline: by Pigbrain
tags: [Go]
---

<!--more-->
  
# \$GOPATH  
Go는 코드들을 관리하기 위한 유일한 방법을 제공하고 있으며 코드들은 $GOPATH라는 곳에 존재하게 된다.  

$GOPATH는 $GOROOT라는 환경변수와는 별개의 것이며 $GOROOT는 Go가 컴퓨터의 설치된 위치를 가르키고 있다. 

개발에 앞서 $GOPATH를 설정해야 한다.  
$GOPATH는 모호성 없이 어느 순간에도 어떤 Go 코드에 링크 할 수 있도록 해주는 컨셉을 지니고 있다. 
Go 1.8버전 부터는 $GOPATH 환경변수가 정의되어 있지 않을 경우. `$HOME/go`를 기본값으로 사용한다.  

유닉스 시스템에서는 다음 처럼 $GOPATH를 지정해줘야 한다. 

```
export GOPATH=${HOME}/mygo
```

$GOPATH에 여러개의 경로를 지정하는 것도 가능하다. 단 여러개의 경로를 붙일때는 `:`(윈도우는 `;`)를 구분자로 사용해야 한다. 

`go get` 명령은 $GOPATH에 첫번째에 해당하는 경로에 컨텐츠를 다운받아서 저장한다. 

$GOPATH에는 여러개의 버전을 사용하지 않는 것을 권장하며 $GOPATH 내에 프로젝트 이름으로 폴더를 생성하는 것은 매우 좋지 않다. 왜냐하면 $GOPATH 내에 폴더를 직접 생성하여 직접 패키지를 참조하게 되면 `go get`은 해당 패키지를 찾을 수 없게 되는 문제가 발생한다. 

그래서 $GOPATH는 다음과 같이 3개의 폴더를 생성하여 사용 해야하며 각 폴더마다 다음과 같은 규칙을 정하고 있다. 

* **src** 
	* 소스파일
	* suffix : .go, .c, .g, .s.
* **pkg** 
	* 컴파일된 파일
	* suffix :  is .a.
* **bin** 
	* 실행 가능한 파일 

# Package directory
$GOPATH/src/mymath/sqrt.go 처럼 패키지와 소스파일, 폴더를 생성한다. (mymath는 패키지 이름이다)


패키지를 새로 생성할 때마다 src 폴더에 새로운 패키지 폴더를 생성해야 한다. 폴더 이름은 일반적으로 패키지명과 동일하게 한다. 
필요에 따라 여러 계층의 폴더를 생성해도 무방하다. 예를 들어 $GOPATH/src/github.com/astaxie/beedb 이러한 구조로 폴더를 생성했다면 패키지 경로는 github.com/astaxie/beedb이 된다. 

그리고 패키지명은 경로의 가장 마지막 이름(beedb)가 된다. 

다음 예제를 실행한다. 

```
cd $GOPATH/src
mkdir mymath
```

sqrt.go 파일을 생성하고 다음 코드들을 작성한다.

```
// Source code of $GOPATH/src/mymath/sqrt.go
package mymath

func Sqrt(x float64) float64 {
    z := 0.0
    for i := 0; i < 1000; i++ {
        z -= (z*z - x) / (2 * x)
    }
    return z
}
```

폴더명과 패키지명은 동일하게 하는 것을 추천한다. 


# Compile packages 

패키지 폴더에서 `go install` 명령어를 실행한다. (`go install mymath`에서 파일명을 제외하고 실행) 
컴파일 후에 cd $GOPATH/pkg/${GOOS}_${GOARCH}폴더에 mymath.a라는 파일이 생성되는 것을 확인할 수 있다. .a 파일은 패키지의 바이너리 파일이다. 이것을 이용하여 어플리케이션(mathapp)을 만들기 위해서는 mathapp 패키지를 생성하고 다음과 같이 main.go 코드를 작성한다. 

```
//$GOPATH/src/mathapp/main.go source code.
package main

import (
    "mymath"
    "fmt"
)

func main() {
    fmt.Printf("Hello, world. Sqrt(2) = %v\n", mymath.Sqrt(2))
}
```

$GOPATH/src/mathapp로 이동하여 컴파일(go install)하게 되면 $GOPATH/bin/에 mathapp이라는 실행 가능한 파일이 생성되었을 것이다.  
`./mathapp`을 실행하면 다음과 같은 결과가 출력된다. 

```
Hello world. Sqrt(2) = 1.414213562373095
```

# Install remote packages 
Go는 `go get` 명령을 이용하여 원격에서 패키지를 가져올 수 있는 기능을 제공한다. 

Github, Google Code, BitBucket, Launchpad 등을 포함한 여러 유명한 오픈소스 커뮤니티로부터 패키지를 가져올 수 있다. 
  
```
go get github.com/astaxie/beedb
```
  
`go get -u …`를 이용하면 원격에서 받아온 패키지를 업데이트하고 패키지에 의존성을 가지고 있는 것들을 설치(go install)해준다.   

위 명령어를 실행하고나면 폴더 구조는 다음과 같이 생성될 것이다. 

```
$GOPATH
    src
     |-github.com
          |-astaxie
               |-beedb
    pkg
     |--${GOOS}_${GOARCH}
          |-github.com
               |-astaxie
                    |-beedb.a
```
  
실제 `go get`은 원격 저장소에서 코드를 $GOPATH/src에 복제(clone)하고 `go install`을 수행하는 것과 동일하다. 


원격 패키지를 로컬에 있는 패키지들에서 사용하기 위해서는 다음과 같이 import하면 된다. 

```
import "github.com/astaxie/beedb"
```


# Directory complete structure
위 과정을 모두 거쳤다면 폴더 구조는 다음과 같을 것이다. 

```
bin/
    mathapp
pkg/
    ${GOOS}_${GOARCH}, such as darwin_amd64, linux_amd64
  mymath.a
  github.com/
    astaxie/
      beedb.a
src/
    mathapp
        main.go
    mymath/
        sqrt.go
    github.com/
        astaxie/
            beedb/
                beedb.go
                util.go
``` 


# 원문   
* https://astaxie.gitbooks.io/build-web-application-with-golang/en/01.2.html