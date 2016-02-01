---
layout: post
category: Spring
title: Exception Handling in Spring MVC
tagline: by Pigbrain
tags: [Spring]
---

<!--more-->

#Using HTTP Status Codes#  
* 일반적으로 예기치 않은 예외를 처리할때 HTTP 500 응답코드가 리턴된다  
* @ResponseStatus 어노테이션으로 지정된 예외가 발생하면 HTTP 응답코드를 지정하여 처리할 수 있다      

		@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="No such Order")  // 404  
		public class OrderNotFoundException extends RuntimeException {  
			// ...
			}


		...

		@RequestMapping(value="/orders/{id}", method=GET)
		public String showOrder(@PathVariable("id") long id, Model model) {
			Order order = orderRepository.findOrderById(id);
			
			if (order == null) throw new OrderNotFoundException(id);
			
			model.addAttribute(order);
			return "orderDetail";
		}
  
	* OrderNotFoundException 예외가 발생하면 HTTP 404 응답코드가 리턴된다  
  
<br>  

#Controller Based Exception Handling#  

###Using @ExceptionHandler###     
* 컨트롤러 내에서 발생한 오류는 @ExceptionHandler로 지정한 메소드를 통하여 별도로 처리 가능하다  
	* @ResponseStatus 어노테이션 없이 예외를 처리 할 수 있다    
	* 오류페이지로 리다이렉트 시킬 수 있다    
	* HTTP응답코드를 지정 할 수 있다    
  
  
			＠Controller
			public class ExceptionHandlingController {
			
				// @RequestHandler methods
				...
				
				// Exception handling methods
				
				// Convert a predefined exception to an HTTP Status code
			  	@ResponseStatus(value=HttpStatus.CONFLICT, reason="Data integrity violation")  // 409
			  	@ExceptionHandler(DataIntegrityViolationException.class)
				public void conflict() {
					// Nothing to do
			  	}
			  
				// Specify the name of a specific view that will be used to display the error:
				@ExceptionHandler({SQLException.class,DataAccessException.class})
				public String databaseError() {
				    // Nothing to do.  Returns the logical view name of an error page, passed to
				    // the view-resolver(s) in usual way.
				    // Note that the exception is _not_ available to this view (it is not added to
				    // the model) but see "Extending ExceptionHandlerExceptionResolver" below.
			    	
					return "databaseError";
			  	}
			
				// Total control - setup a model and return the view name yourself. Or consider
				// subclassing ExceptionHandlerExceptionResolver (see below).
				@ExceptionHandler(Exception.class)
				public ModelAndView handleError(HttpServletRequest req, Exception exception) {
					logger.error("Request: " + req.getRequestURL() + " raised " + exception);
				
				    ModelAndView mav = new ModelAndView();
				    mav.addObject("exception", exception);
				    mav.addObject("url", req.getRequestURL());
				    mav.setViewName("error");
				    return mav;
				}
			}
  
	* @ExceptionHandler 메소드들은 servlet과 관련된 오브젝트들을 파라미터로 받을 수 있다  
		* HttpServletRequest  
		* HttpServletResponse    
		* HttpSession  
	* @ExceptionHandler 메소드에서 Model은 파라미터로 받을 수 없다  
		* handleError()처럼 메소드 내부에서 ModelAndView 객체를 생성해야한다 
  
  
###Exceptions and Views###  	
* Model에 예외를 담을때에는 사용자에게 stack-trace 같은 내용이 노출되지 않도록 주의해야한다  
* JSP를 사용한다면 다음과 같은 방법으로 예외를 출력할 수 있다  
  
<img src="/assets/themes/Snail/img/Spring/ExceptionHandler/support-page-example.png" alt="">   
    
<br>  
    
#Global Exception Handling#  

###Using @ControllerAdvice Classes###  
* @ControllerAdvice 어노테이션을 이용하여 개별 컨트롤러가 아닌 전체 어플리케이션에서 발생하는 예외를 처리 할 수 있다  
* @ControllerAdvice 어노테이션으로 지정한 클래스는 controller-advice 가 된다  
* @ControllerAdvice 어노테이션으로 지정한 클래스는 다음과 같은 기능을 제공 가능하다    
	* @ExceptionHandler  
	* @ModelAttribute  
	* @InitBinder  


			＠ControllerAdvice
			class GlobalControllerExceptionHandler {
				@ResponseStatus(HttpStatus.CONFLICT)  // 409
				@ExceptionHandler(DataIntegrityViolationException.class)
				public void handleConflict() {
					// Nothing to do
				}
			}  

	* 어떠한 예외도 처리 가능한 default handler가 필요하다면 다음과 같이 할 수 있다  

			＠ControllerAdvice
			class GlobalDefaultExceptionHandler {
				public static final String DEFAULT_ERROR_VIEW = "error";
			
				@ExceptionHandler(value = Exception.class)
				public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
					// If the exception is annotated with @ResponseStatus rethrow it and let
					// the framework handle it - like the OrderNotFoundException example
					// at the start of this post.
					// AnnotationUtils is a Spring Framework utility class.
					if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null)
					    throw e;
					
					// Otherwise setup and send the user to a default error-view.
					ModelAndView mav = new ModelAndView();
					mav.addObject("exception", e);
					mav.addObject("url", req.getRequestURL());
					mav.setViewName(DEFAULT_ERROR_VIEW);
					return mav;
				}
			}


<br>  
  
#Going Deeper#  

###HandlerExceptionResolver###  
* **HandlerExceptionResolver** 인터페이스를 구현한 빈(bean)은 스프링 내에서 발생하는 예외들을 처리할 수 있다  

		public interface HandlerExceptionResolver {
			ModelAndView resolveException(HttpServletRequest request, 
					HttpServletResponse response, Object handler, Exception ex);
		}  
  
* 3가지 타입의 Resolver가 있다  
	* **ExceptionHandlerExceptionResolver**  
		* @ExceptionHandler로 지정된 메소드에서 처리되지 않은 예외를 처리할 수 있다  
	* **ResponseStatusExceptionResolver**  
		* @ResponseStatus로 지정된 예외를 처리할 수 있다  
	* **DefaultHandlerExceptionResolver**  
		* 예외를 처리할 수 있고 HTTP 응답 코드를 지정할 수 있는 HandlerExceptionResolver의 기본 구현체이다  
	* 이 Resolver들은 체인처럼 리스트로 연결되어 있고 스프링 내부의 **HandlerExceptionResolverComposite**빈에 의하여 처리된다  

#원문#  
* https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc  


