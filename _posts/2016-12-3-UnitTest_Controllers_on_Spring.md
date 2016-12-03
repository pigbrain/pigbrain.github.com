---
layout: post
category: Spring
title: Unit Test Controllers with Spring MVC Test  
tagline: by Pigbrain
tags: [Spring]
---
  
<!--more-->  
  
* 스프링 MVC Test 프로젝트는 컨트롤러를 테스트 할 수 있는 기능을 제공한다  
<br>  

# Getting Ready  
### Application Setup  
* `pom.xml`에 디펜던시를 추가한다  

{% highlight xml %}  
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>3.2.3.RELEASE</version>
</dependency>
 
<!-- This is for mocking the service -->
 
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-all</artifactId>
    <version>1.9.5</version>
    <scope>test</scope>
</dependency>
 
<!-- Optional -->
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-core</artifactId>
    <version>1.3</version>
    <scope>test</scope>
</dependency>
 
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-library</artifactId>
    <version>1.3</version>
    <scope>test</scope>
</dependency>
{% endhighlight %}  
  
# Reference Class  
* 컨트롤러 테스트를 위하여 아래의 IndexController를 생성하였다  

{% highlight java %}  
@Controller
public class IndexController {
 
    public static final String PAGE_INDEX = "index";
    public static final String PAGE_SHOW = "show";
 
    @Autowired
    SampleService sampleService;
 
 
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView index() {
        return new ModelAndView(PAGE_INDEX, "signupForm", new SignupForm());
    }
 
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String create(Model model, @Valid SignupForm signupForm, BindingResult result) {
 
        String returnPage = PAGE_INDEX;
 
        if (!result.hasErrors()) {
            try {
                model.addAttribute("signupForm", sampleService.saveFrom(signupForm));
                returnPage = PAGE_SHOW;
            } catch (InvalidUserException e) {
                model.addAttribute("page_error", e.getMessage());
            }
        }
        return returnPage;
    }
 
    @RequestMapping(value = "/security-error", method = RequestMethod.GET)
    public String securityError(RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("page_error", "You do have have permission to do that!");
        return "redirect:/";
    }
}
{% endhighlight %}  
  
  
# 원문  
* https://www.luckyryan.com/2013/08/24/unit-test-controllers-spring-mvc-test/  

