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
  
	
	
	 
  
# 참고  
* https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf  
