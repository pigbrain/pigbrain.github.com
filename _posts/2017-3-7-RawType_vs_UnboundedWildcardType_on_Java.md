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
    
* `?`가 어떠한 타입을 나타내는 것인지 알 수 없기 때문에 Set<?>에는 값을 넣을 수 없다  
  
  
{% highlight java %}  
public static void printSet(Set<?> s) {
    s.add(10); // this line is illegal 
    for (Object o : s) {
        System.out.println(o);
    }
} 

{% endhighlight %}  
         
# 원문  
* http://www.programcreek.com/2013/12/raw-type-set-vs-unbounded-wildcard-set/