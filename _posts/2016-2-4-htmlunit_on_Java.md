---
layout: post
category: Java
title: HtmlUnit
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

# HtmlUnit  
* 자바코드로 웹페이지를 시뮬레이션할 수 있는 라이브러리  
	* 링크 클릭, 폼 데이터 입력 / submit 등을 브라우저에서 하는 것과 동일하게 처리할 수 있다  
 
# Features  
* HTTP, HTTPS 프로토콜 지원  
* 쿠키 지원  
* 응답 결과가 성공인지 실패인지 확인 가능  
* POST, GET, HEAD, DELETE 등의 submit 기능 제공  
* Request Header 변경 가능  
* HTML Response 처리 가능  
* HTML에 포함된 데이터에 쉽게 접근하기 위해 Wrapping
* form sbumit 지원  
* 링크 클릭 지원  
* HTML 문서의 DOM 객체 접근 가능  
* 프록시 지원  
* 일반 혹은 NTLM 인증 제공  
* 자바스크립트 지원  

# Installation  
* maven  
	
		<dependency>
		    <groupId>net.sourceforge.htmlunit</groupId>
		    <artifactId>htmlunit</artifactId>
		    <version>2.19</version>
		</dependency>

# JavaScript Support  
* Rhino JavaScript 엔진을 사용한다  
* 자바스크립트 처리를 비활성화 하려면 아래 메소드를 호출한다  
	* webClient.getOptions().setJavaScriptEnabled(false)  
* 자바스크립트 코드를 주입하여 실행 할 수 있는 기능을 제공한다  
	* HtmlPage.executeJavascript(String yourJsCode) 

# Test code
* [Code](https://github.com/pigbrain/HelloJava/blob/master/src/main/java/htmlunit/HtmlUnit.java)

		try (final WebClient webClient = new WebClient()) {
			final HtmlPage htmlPage = webClient.getPage("http://www.google.com");
			Assert.assertEquals("Google", htmlPage.getTitleText());

			Assert.assertTrue(htmlPage.asText().contains("Google+"));
			
			final HtmlForm searchForm = htmlPage.getFormByName("f");
			final HtmlTextInput textField = searchForm.getInputByName("q");
			textField.setValueAttribute("google");

			final HtmlSubmitInput submitButton = searchForm.getInputByName("btnG");
			final HtmlPage searchPage = submitButton.click();
		    
			Assert.assertTrue(searchPage.asText().contains("Search Options"));
		}

<br>  

# 원문  
* http://htmlunit.sourceforge.net/  


