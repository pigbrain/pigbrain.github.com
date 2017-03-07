---
layout: post
category: Java
title: Set vs Set〈?〉  
tagline: by Pigbrain
tags: [Java]
---

<!--more-->

* Set<?>은 다양한 타입의 값을 가리킬 수 있다.
* Set역시 다양한 타입의 값을 가리킬 수 있다.  

# Two facts about Set<?> 
* `?`은 다양한 타입을 의미한다. 즉 Set<?>은 다양한 타입의 값을 가리킬 수 있다  

{% highlight java %}  
public static void main(String[] args) {
    HashSet<Integer> s1 = new HashSet<Integer>(Arrays.asList(1, 2, 3));
    printSet(s1);
 
    HashSet<String> s2 = new HashSet<String>(Arrays.asList("a", "b", "c"));
    printSet(s2);
}
 
public static void printSet(Set<?> s) {
    for (Object o : s) {
        System.out.println(o);
    }
}
  
{% endhighlight %}  
    
* `?`가 정확히 어떠한 타입을 나타내는 것인지 알 수 없기 때문에 Set<?>에는 null외의 값을 넣을 수 없다  
  
  
{% highlight java %}  
public static void printSet(Set<?> s) {
    s.add(10); // this line is illegal 
    for (Object o : s) {
        System.out.println(o);
    }
} 

{% endhighlight %}  
  
* 위와 같은 이유로 `?`를 이용하여 객체를 생성할 수 없다   
  
{% highlight java %}  
// Illegal Code
Set<?> set = new HashSet<?>();
{% endhighlight %}  
    
# Set vs. Set<?>
    
* 아래 코드는 컴파일 오류가 발생하지 않는다  
* Set에 아무런 타입 제한이 없기 떄문에 값을 넣을 수 있다  
* 타입 제한이 없기 때문에 아무런 값을 넣을 수 있으나 컬렉션을 망가뜨릴 수 있다         
  
{% highlight java %}  
public static void printSet(Set s) {
    s.add("2");
    for (Object o : s) {
        System.out.println(o);
    }
}
{% endhighlight %}  

  
# When Set<?> is useful?  
* 제네릭(generic)타입을 사용하길 원하지만 실제 타입을 모르거나 어떤 타입이여도 상관이 없을 경우 <?>를 사용한다    
* <?>는 오직 메서드의 파라미터로 사용할 수 있다   
  
{% highlight java %}  
public static void main(String[] args) {
    HashSet<Integer> s1 = new HashSet<Integer>(Arrays.asList(1,2,3));
    HashSet<Integer> s2 = new HashSet<Integer>(Arrays.asList(4,2,3));
 
    System.out.println(getUnion(s1, s2));
}
 
public static int getUnion(Set<?> s1, Set<?> s2){
    int count = s1.size();
    for(Object o : s2) {
        if(!s1.contains(o)) {
            count++;
        }
    }
    return count;
}
{% endhighlight %}  
  

# 원문  
* http://www.programcreek.com/2013/12/raw-type-set-vs-unbounded-wildcard-set/