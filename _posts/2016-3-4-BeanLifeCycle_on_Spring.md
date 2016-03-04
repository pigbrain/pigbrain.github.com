---
layout: post
category: Spring
title: Spring Bean Life Cycle
tagline: by Pigbrain
tags: [Spring]
---

<!--more-->

# Overview of Spring Bean Life Cycle  

* Java Object  
	* new operator를 호출함으로써 객체가 생성된다  
	* gc에 의하여 finalize()가 호출되고 사라진다
  
* Spring Bean
	* InitializingBean, DisposableBean
		* Bean 생성 / 삭제시 호출되는 콜백 인터페이스
	* BeanNameAware, BeanFactoryAware, ApplicationContextAware Interface    
		* 특수한 작업을 위한 인터페이스
	* configuration file  
		*  custom init(), destroy()    
	* Annotation
		* @PostConstruct, @PreDestroy  
<br>  
		
* Bean의 초기화부터 사용 전까지의 과정    
  
<img src="/assets/themes/Snail/img/Spring/BeanLifeCycle/init.png" alt="">     
  
* Bean의 삭제 과정  

<img src="/assets/themes/Snail/img/Spring/BeanLifeCycle/destroy.png" alt="">  
  
<br>  
  
# InitializingBean and DisposbleBean callback interfaces  

* org.springframework.beans.factory.**InitalizingBean**   
	* void afterPropertiesSet() throws Exception;
* org.springframework.beans.factory.**DisposableBean**   
	* void destroy() throws Exception;  

### Example 

	import org.springframework.beans.factory.DisposableBean;
	import org.springframework.beans.factory.InitializingBean;

	public class PersonBean implements InitializingBean,DisposableBean{
	 
		private String name;

		public PersonBean() {
			System.out.println("Constructor of person bean is called !! ");
		}
		
		@Override
		public void destroy() throws Exception {
			System.out.println("destroy method of person bean is called !! ");
		}

		@Override
		public void afterPropertiesSet() throws Exception {
			System.out.println("afterPropertiesSet method of person bean is called !! ");
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}  
  
  
<img src="/assets/themes/Snail/img/Spring/BeanLifeCycle/result1.png" alt="">  
  
<br>    
  
# Bean Name, Factory, Application context Aware interfaces  
* org.springframework.beans.factory.**BeanFactoryAware**   
	* void setBeanFactory(BeanFactory beanFactory) throws BeansException;
* org.springframework.beans.factory.**BeanNameAware**   
	* void setBeanName(String name);
* org.springframework.context.**ApplicationContextAware**  
	* void setApplicationContext(ApplicationContext applicationContext) throws BeansException;  

### Example 

	import java.util.Arrays;
	import org.springframework.beans.BeansException;
	import org.springframework.beans.factory.BeanFactory;
	import org.springframework.beans.factory.BeanFactoryAware;
	import org.springframework.beans.factory.BeanNameAware;
	import org.springframework.context.ApplicationContext;
	import org.springframework.context.ApplicationContextAware;
	 
	public class AwareBean implements ApplicationContextAware,BeanNameAware,BeanFactoryAware {
		
		@Override
		public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
			System.out.println("setBeanFactory method of Aware bean is called");
			System.out.println("setBeanFactory:: Aware bean singleton="                + beanFactory.isSingleton("awareBean"));
		}
	
		@Override
		public void setBeanName(String beanName) {
			System.out.println("setBeanName method of Aware bean is called");
			System.out.println("setBeanName:: Bean Name defined in context=" +  beanName);
		}

		@Override
		public void setApplicationContext(ApplicationContext applicationContext)   throws BeansException {
			System.out.println("setApplicationContext method of Aware bean is called");
			System.out.println("setApplicationContext:: Bean Definition Names=" 		+ Arrays.toString(applicationContext.getBeanDefinitionNames()));
		}
	}  
  
  
<img src="/assets/themes/Snail/img/Spring/BeanLifeCycle/result2.png" alt="">  
  
<br>    
  
# Custom init() and destroy() methods in bean configuration file  
  
* Attribute  
	* init-method
	* destroy-method

### Example 

	<bean id="customLifeCycleMethodBean" class="CustomLifeCycleMethodBean"
		init-method="customInit" 
		destroy-method="customDestroy">
		<property name="name" value="custom methods bean" ></property>
	</bean>

	-----------------------------------------------------------------------

	public class CustomLifeCycleMethodBean {
		private String name;
	     
	    public CustomLifeCycleMethodBean() {
			System.out.println("Constructor of  bean is called !! ");
	    }
	     
	    public void customDestroy() throws Exception {
			System.out.println("custom destroy method of  bean is called !! ");
	    }
	 
	    public void customInit() throws Exception {
			System.out.println("custom Init  method of  bean is called !! ");
	    }
	 
	    public String getName() {
			return name;
	    }
	 
	    public void setName(String name) {
			this.name = name;
	    }
	}  
  
  
<img src="/assets/themes/Snail/img/Spring/BeanLifeCycle/result3.png" alt="">  
  
<br>    

# 원문  
* http://www.wideskills.com/spring/spring-bean-lifecycle


