---
layout: post
category: Spring
title: 메소드 파라미터(parameter) 및 어노테이션(Annotation) 정리
tagline: by Pigbrain
tags: [Spring]
---
  
<!--more-->  
  
* **HttpServletRequest**, **HttpServletResponse**  
  
<br>  
  
* **HttpSession**  
  
<br>  
  
* **Local**  
	* java.util.Locale 지역 정보  
  
<br>  
  
* **InputStream**, **Reader**  
	* HttpServletRequest의 getInputStream(), Reader  
  
<br>  
  
* **OutputStream**, **Writer**  
	* HttpServletResponse의 getOutputStream(), Writer  
  
<br>  
  
* **@PathVariable**  
	* @RequestMapping의 URL {} 부분의 패스 변수를 받는다  
	* 만약 타입이 다른 값이 들어오면 HTTP 400 - Bad Request 가 전달 된다  
		
			@RequestMapping("/board/{id}")
			public void view( @PathVariable("id") int id ) {...}  
  
<br>  
  
* **@RequestParam**  
	* 스프링 내장 변환기가 다룰 수 있는 모든 타입을 지원한다  
	* 해당 파라미터가 없다면 HTTP 400 - Bad Request 가 전달 된다  
	* 파일의 경우는 <input type="file" name="file" /> 에 매핑 된다  
		
			public String edit( @RequestParam("id") int id, 
			                   @RequestParam("title") String title, 
			                   @RequestParam("file") MultipartFile file ) {...}  
		
	*  맵 형태로 받으면 모든 파라미터 이름은 맵의 키에 파라미터 값은 맵의 값에 담긴다  
		
			public String add( @RequestParam Map<String, String> params ) {...}  
		
	* 파라미터가 필수가 아니라면 required = false 로 지정하면 된다. 이때 파라미터가 없으면 NULL이 들어간다. default 값을 지정 할 수도 있다  
			
			public void view( @RequestParam(value = "id",  
			                      required = false, 
			                      defaultValue = "0" )  int id) {..}  
			
  
<br>  
  
* **@CookieValue**  
	* @RequestParam과 동일 하며 쿠키값을 가져올 때 사용한다  
		
			public String check( @CookieValue("check") String check, 
			                     required = false, defaultValue = "" ) {...}
  
<br>  
  
* **@RequestHeader**  
	* 헤더 정보를 메소드 파라미터에 넣어 준다  
	* Ajax로 처리할때 $.ajax(...) 에서 head에 특정 값을 넣고 여기서 받아서 있으면 ajax이고 없으면 일반페이지라는 식으로 이용하면 된다  
			
			public String header( @RrequestHeader("ajax") String ajax ) {...}  
  
<br>  
  
* **Map**, **Model**, **ModelMap**  
	* view를 String으로 리턴해 주고 Attribute를 Map, Model, ModelMap 에 담을 수 있다  
  
<br>  
  
* **@ModelAttribute**
	* 파라미터를 Object형태로 받을때 사용된다  
	* 일반적인 파라미터 형태로 쓰인 경우 타입이 일치하지 않으면 객체에 매핑 되지 않으며 에러는 발생 시키지 않는다  
	* 자동으로 ModelMap에 담기므로 modelMap.addAttribute를 해 줄 필요가 없다  
				
			public void update( @ModelAttribute("board") Board board) {...}  
		
	* 메소드에도 @ModelAttribute를 설정 할 수 있다. 리턴값이 항상 나머지 컨트롤러에 자동 추가 되며 보통 참조용 데이터 등에 이용된다  
				
			@ModelAttribute("emailList")  
			public Map<String, String> getEmailList() { ... } 
			
  
<br>  
  
* **Errors**, **BindingResult**  
	* 모델의 값을 검정한다  
	* BindingResult나 Errors의 파라미터 값의 위치는 반드시 @ModelAttribute 뒤에 위치해야 한다. 자신의 바로 앞에 있는 @ModelAttribute 파라미터의 검정 작업만 하기 때문이다  
				
			@RequestMapping(value = "/board/add", method = RequestMethod.POST)  
			public String add( @ModelAttribute("board") Board board, BindingResult result ) {...}  
  
<br>  
  
* **SessionStatus** 
	* 모델 오브젝트를 세션에 저장하여 계속 사용한다  
	* 더 이상 모델 오브젝트를 사용하지 않을 때는 세션에서 제거해 줘야 한다  
  
<br>  
  
* **@RequestBody**  
	* HTTP body 부분만 전달 한다  
	*  XML 이나 JSON 으로 출력 할 경우 사용한다  
  
<br>  
  
* **@Value**  
	* 프로퍼티값이나 값을 파라미터에 적용한다  
	* 프로퍼티중 eng.url 의 값을 String engUrl에 매핑 시키고 메소드에서 사용한 케이스이다  
			
			public class BoardController {
				@Value("${eng.url}") 
					String engUrl;
				
				@RequestMapping(..)
				public String gotoEng() {
					return this.engUrl;
				}
			}  
			
	* 파라미터에도 적용 된다  
			
			public String gotoEng( @Value("${eng.url}") String engUrl ) {
				return engUrl;
			}  
  
<br>  
  
* **@Valid**  
	* JSR - 303 검증기를 이용해서 @ModelAttribute를 검정하도록 한다  
			
			public String add( @Valid @ModelAttribute("board") Board board, BindingResult result ) { ...}
  
<br>  
  
# 원문  
* http://warmz.tistory.com/entry/Spring-%EB%A9%94%EC%86%8C%EB%93%9C-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0parameter-%EB%B0%8F-%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98Annotation-%EC%A0%95%EB%A6%AC  


