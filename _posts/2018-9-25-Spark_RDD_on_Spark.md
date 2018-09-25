---
layout: post
category: OpenSource    
title: Resilient Distributed Datasets A Fault-Tolerant Abstraction for In-Memory Cluster 
tagline: by Pigbrain  
tags: [OpenSource]  
---

<!--more-->
  
# Abstract
* RDD
	* **R**esilient **D**istributed **D**atasets
		* in a `fault-toleran`t manner
		* in-memory computations `on large clusters`
* RDDs are motivated by  
	* iterative algorithms 
	* interactive data mining tools
	* `keeping data in memory
can improve performance by an order of magnitude`
  	
<br> 
  
# 1. Introduction
* Current frameworks provide numerous abstractions
for accessing a cluster’s computational resources, they lack abstractions for leveraging distributed memory  
* This makes them `inefficient` for an important class of emerging applications
	* reuse `intermediate` results across multiple computations
	* `interactive` data mining, where a user runs multiple adhoc queries on the same subset of the data
* RDD enables efficient data reuse in a broad range of applications 	
	* `fault-tolerant`  
	* `parallel data structures` that let users explicitly persist intermediate results in memory, control their partitioning to optimize data placement, and manipulate them using a rich set of operators  
* Existing abstractions for in-memory storage on clusters, such as distributed shared memory, keyvalue
stores, databases, and Piccolo, offer an
interface based on fine-grained updates to mutable state
(cells in a table)
	* With this interface, the only ways to provide fault tolerance are to replicate the data across machines or to log updates across machines  
	*  Both approaches are expensive for data-intensive workloads  
* RDDs provide an interface based on coarse-grained transformations (map, filter and join) that apply the same operation to many data items  
	* This allows them to efficiently provide `fault
tolerance by logging the transformations` used to build a dataset (its lineage) rather than the actual data  
* We have implemented RDDs in a system called Spark  
*  Spark is up to 20× faster than Hadoop for iterative applications  
  
<br>  
  
# 2. Resilient Distributed Datasets (RDDs)
* define RDDs  
* introduce their programming interface in Spark  
* compare RDDs with fine-grained shared memory abstractions  
* discuss limitations of the RDD model  
  
## 2.1 RDD Abstraction
* RDD is a `read-only`, `partitioned collection of records`  
* RDDs can `only be created` through deterministic operations on either data in stable storage or other RDDs  
* We call these operations `transformations`  
	* transformations include map, filter, and join  
* RDDs do not need to be materialized at all times  
* RDD has enough information about how it was derived from other datasets (its lineage) to compute its
partitions from data in stable storage  
	* program cannot reference an RDD that it cannot reconstruct after a failure 
* users can control two other aspects of RDDs: `persistence` and `partitioning`  
	* Users can indicate which RDDs they will reuse and choose a storage strategy for them    
	* They can also ask that an RDD’s elements be partitioned across machines based on a key in each record  
	* This is useful for placement optimizations, such as ensuring that two datasets that will be joined together are hash-partitioned in the same way  
	 
## 2.2 Spark Programming Interface  
* Programmers start by defining one or more RDDs through transformations on data in stable storage  
* Programmers can then use these RDDs in `actions`, which are operations that return a value to the application or export data to a storage system  
* Programmers can call a `persist` method to indicate which RDDs they want to reuse in future operations  
	* Spark keeps persistent RDDs in memory by default,
but `it can spill them to disk if there is not enough
RAM`  
	* Users can also request other persistence strategies, such as storing the RDD only on disk or replicating it across machines, through flags to persist  
	* Users can set a persistence priority on each RDD to specify which in-memory data should spill to disk first 
  
## 2.3 Advantages of the RDD Model  
  
<img src="/assets/themes/Snail/img/OpenSource/Spark/RDD/comparison_of_RDDs.png" alt="">    
  
* In DSM(distributed shared memory) systems, applications read and write to arbitrary locations in a global address space   
* DSM is a very general abstraction, but this generality makes it harder to implement in an efficient and fault=tolerant manner on commodity clusters  
* The main difference between RDDs and DSM 
	* RDDs can only be created through coarse-grained transformations  
	* DSM allows reads and writes to each memory location
* This restricts RDDs to applications that perform bulk writes, but allows for more efficient fault tolerance  
* RDDs do not need to incur the overhead of check pointing, as they can be recovered using lineage  
* only the lost partitions of an RDD need to be recomputed upon failure, and they can be recomputed in parallel on different nodes, without having to roll back the whole program  
* immutable nature lets a system mitigate slow nodes (stragglers) by running backup copies of slow tasks as in MapReduce  
* in bulk operations on RDDs, a runtime can schedule tasks based on `data locality to improve performance`    
* `RDDs degrade gracefully when there is not
enough memory to store them`, as long as they are only
being used in scan-based operations  
* Partitions that do not fit in RAM can be stored on disk and will provide similar performance to current data-parallel systems  

## 2.4 Applications Not Suitable for RDDs  
* RDDs are best suited for batch applications that apply the same operation to all elements of a dataset 
	* RDDs can efficiently remember each transformation as one step in a lineage graph and can recover lost partitions without having to log large amounts of data   
* RDDs would be less suitable for applications that make asynchronous fine-grained updates to shared state, such as a storage system for a web application or an incremental web crawler  
	* it is more efficient to use systems that perform traditional update logging and data checkpointing, such as databases  
* Our goal is to provide an efficient programming model for batch analytics and leave these asynchronous applications to specialized systems  
  
<br>  
      
# 3. Spark Programming Interface  
* We chose Scala due to its combination of conciseness (which is convenient for interactive use) and efficiency (due to static typing)  
* nothing about the RDD abstraction requires a functional language
* To use Spark, developers write a `driver` program that connects to a cluster of workers     
  
<img src="/assets/themes/Snail/img/OpenSource/Spark/RDD/driver.png" alt="">      
  
* The driver defines one or more RDDs and invokes actions on them. Spark code on the driver also tracks the RDDs' `lineage`  
* The workers are long-lived processes that can store RDD partitions in RAM across operations  
* Scala represents each closure as a Java object, and these objects can be `serialized` and `loaded on another node` to pass the closure `across the network`  
  
## 3.1 RDD Operations in Spark
* `transformations are lazy operations` that define a new RDD, while `actions launch a computation to return a value` to the program or write data to external storage  
* some operations, such as join, are only available on RDDs of key-value pairs  
  
<img src="/assets/themes/Snail/img/OpenSource/Spark/RDD/interface.png" alt="">      
  
    
# 참고  
* https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf  
