---
layout: post
category: Spring
title: Exception Handling in Spring MVC
tagline: by Pigbrain
tags: [Spring]
---

<!--more-->

# Using HTTP Status Codes
  
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

# Controller Based Exception Handling  

### Using @ExceptionHandler     
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
  
  
### Exceptions and Views  	
* Model에 예외를 담을때에는 사용자에게 stack-trace 같은 내용이 노출되지 않도록 주의해야한다  
* JSP를 사용한다면 다음과 같은 방법으로 예외를 출력할 수 있다  
  
<img src="/assets/themes/Snail/img/Spring/ExceptionHandler/support-page-example.png" alt="">   
    
<br>  
    
# Global Exception Handling  

### Using @ControllerAdvice Classes  
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
  
# Going Deeper  

### HandlerExceptionResolver  
* **HandlerExceptionResolver** 인터페이스를 구현한 빈(bean)은 스프링 내에서 발생하는 예외들을 처리할 수 있다  

		public interface HandlerExceptionResolver {
			ModelAndView resolveException(HttpServletRequest request, 
					HttpServletResponse response, Object handler, Exception ex);
		}  
  
* 3가지 타입의 Resolver가 있다  
	* **ExceptionHandlerExceptionResolver**  
		* @ExceptionHandler로 지정된 메소드에서 catch되지 않은 예외를 처리할 수 있다  
	* **ResponseStatusExceptionResolver**  
		* @ResponseStatus로 지정된 예외를 처리할 수 있다  
	* **DefaultHandlerExceptionResolver**  
		* 예외를 처리할 수 있고 HTTP 응답 코드를 지정할 수 있는 HandlerExceptionResolver의 기본 구현체이다  
	* 이 Resolver들은 체인처럼 리스트로 연결되어 있고 스프링 내부에 있는 **HandlerExceptionResolverComposite**빈에 의하여 처리된다  
		* ExceptionHandlerExceptionResolver, ResponseStatusExceptionResolver에 의하여 처리되지 않으면 마지막으로 DefaultHandlerExceptionResolver에 의하여 처리된다  
	* **AnnotationMethodHandlerExceptionResolver** 는 **Deprecated**되었다  
		* @ExceptionHandler로 지정된 예외를 처리 할 수 있다  
	* Resolver들은 WebMvcConfigurationSupport.java에서 생성된다  
		* WebMvcConfigurationSupport는 Java Config의 @EnableWebMvc이나 xml Config의 ＜mvc:annotation-driven /＞ 선언을 통하여 초기화 된다  
  
<img src="/assets/themes/Snail/img/Spring/ExceptionHandler/WebMvcConfigurationSupport.png" alt="">  
  
  
### SimpleMappingExceptionResolver  
* 스프링은 오래전부터 HandlerExceptionResolver를 구현한 **SimpleMappingExceptionResolver**를 제공하고 있다  
* 아래와 같은 옵션을 제공한다  
	* 에외 클래스 이름을 view 이름에 맵핑시킨다  
		* 패키지 이름을 제외한 클래스 이름만 쓰면 된다  
	* 처리되지 않은 예외에 대한 기본 오류 페이지를 지정할 수 있다  
	* 로그를 남길수 있다 
		* 기본은 비활성화 상태이다  
	* JSP와 같은 뷰에서 사용하기 위해 Model에 exception의 이름을 넣는다  
		* 기본적으로 attribute의 이름은 exception 이다  
		* 비활성화 시키고자 한다면 null로 설정하면 된다  
	* @ExceptionHandler에 의하여 리턴된 view는 excpetion에 접근이 불가능하지만 SimpleMappingExceptionResolver에 정의된 view 는 접근이 가능하다  
  
  
* XML을 이용한 설정

		<bean id="simpleMappingExceptionResolver"
			class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
			<property name="exceptionMappings">
				<map>
					<entry key="DatabaseException" value="databaseError"/>
					<entry key="InvalidCreditCardException" value="creditCardError"/>
				</map>
			</property>
			<!-- See note below on how this interacts with Spring Boot -->
			<property name="defaultErrorView" value="error"/>
			<property name="exceptionAttribute" value="ex"/>
	
			<!-- Name of logger to use to log exceptions. Unset by default, so logging disabled -->
			<property name="warnLogCategory" value="example.MvcLogger"/>
		</bean>
  
* JAVA를 이용한 설정  

		@Configuration
		@EnableWebMvc // Optionally setup Spring MVC defaults if you aren’t doing so elsewhere
		public class MvcConfiguration extends WebMvcConfigurerAdapter {
			
			@Bean(name=“simpleMappingExceptionResolver”)
			public SimpleMappingExceptionResolver createSimpleMappingExceptionResolver() {
				SimpleMappingExceptionResolver r = new SimpleMappingExceptionResolver();

				Properties mappings = new Properties();
				mappings.setProperty("DatabaseException", "databaseError");
				mappings.setProperty("InvalidCreditCardException", "creditCardError");
				
				r.setExceptionMappings(mappings);  // None by default
				r.setDefaultErrorView("error");    // No default
				r.setExceptionAttribute("ex");     // Default is "exception"
				r.setWarnLogCategory("example.MvcLogger");     // No default
				return r;
			}  
			
			...
		}
  
### Extending SimpleMappingExceptionResolver  
* properties들을 직접 설정하기 위한 생성자 제공  
* **buildLogMessage**를 로깅하는 기능을 오버라이딩할 수 있다  
	* 기본으로 구현된 로깅 기능은 다음과 같은 고정된 문자열을 출력해준다  
		* ＜ul style="margin-left: 2em"＞＜i＞Handler execution resulted in exception＜/i＞＜/ul＞
* **doResolveException**를 오버라이딩 하여 error view에 추가적인 정보를 담을 수 있다  


		public class MyMappingExceptionResolver extends SimpleMappingExceptionResolver {
			public MyMappingExceptionResolver() {
				// Enable logging by providing the name of the logger to use
				setWarnLogCategory(MyMappingExceptionResolver.class.getName());
			}

			@Override
			public String buildLogMessage(Exception e, HttpServletRequest req) {
				return "MVC exception: " + e.getLocalizedMessage();
			}

			@Override
			protected ModelAndView doResolveException(HttpServletRequest request,
				HttpServletResponse response, Object handler, Exception exception) {
				// Call super method to get the ModelAndView
				ModelAndView mav = super.doResolveException(request, response, handler, exception);
				
				// Make the full URL available to the view - note ModelAndView uses addObject()
				// but Model uses addAttribute(). They work the same. 
				mav.addObject("url", request.getRequestURL());
				return mav;
			}
		}
  
### Extending ExceptionHandlerExceptionResolver
* ExceptionHandlerExceptionResolver를 상속하여 **doResolveHandlerMethodException**를 오버라이딩 할 수 있다  
* 사용할때 order property를 지정해줘야하는데 MAX_INT보다 작게 설정해야한다  

		public class ExampleExceptionHandlerExceptionResolver extends ExceptionHandlerExceptionResolver {
		
			/**
			 * The default <tt>ExceptionHandlerExceptionResolver</tt> has order MAX_INT
			 * (lowest priority - see {@link Ordered#LOWEST_PRECEDENCE). The constructor
			 * gves this slightly higher precedence so it runs first. Also enable
			 * logging to this classe's logger by default.
			 */
			public ExampleExceptionHandlerExceptionResolver() {
				// Turn logging on by default
				setWarnLogCategory(getClass().getName());
				
				// Make sure this handler runs before the default
				// ExceptionHandlerExceptionResolver
				setOrder(LOWEST_PRECEDENCE - 1);
			}
		
			/**
			 * Override the default to generate a log message with dynamic content.
			 */
			@Override
			public String buildLogMessage(Exception e, HttpServletRequest req) {
				return "MVC exception: " + e.getLocalizedMessage();
			}
		
			/**
			 * This method uses the newee API and gets passed the handler-method
			 * (typically the method on the <tt>@Controller</tt>) that generated the
			 * exception.
			 */
			@Override
			protected ModelAndView doResolveHandlerMethodException(
					HttpServletRequest request, HttpServletResponse response,
					HandlerMethod handlerMethod, Exception exception) {
		
				// Get the ModelAndView to use
				ModelAndView mav = super.doResolveHandlerMethodException(request,
						response, handlerMethod, exception);
		
				// Make more information available to the view
				mav.addObject("exception", exception);
				mav.addObject("url", request.getRequestURL());
				mav.addObject("timestamp", new Date());
				mav.addObject("status", 500);
				return mav;
			}
		}

### Errors and REST
* Restful Get 요청도 예외를 발생시킨다  
* 이 과정에서 발생한 오류 정보에 대해 리턴하고자한다면 다음처럼 한다  

		public class ErrorInfo {
			public final String url;
			public final String ex;
			
			public ErrorInfo(String url, Exception ex) {
				this.url = url;
				this.ex = ex.getLocalizedMessage();
			}
		}
			
		....
			
		@ResponseStatus(HttpStatus.BAD_REQUEST)
		@ExceptionHandler(MyBadDataException.class)
		@ResponseBody 
		ErrorInfo handleBadRequest(HttpServletRequest req, Exception ex) {
			return new ErrorInfo(req.getRequestURL(), ex);
		}


#원문  
* https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc  


