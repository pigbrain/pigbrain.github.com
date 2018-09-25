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
* RDD is a read-only, partitioned collection of records
* RDDs can only be created through deterministic operations on either data in stable storage or other RDDs  
* We call these operations transformations  
	* transformations include map, filter, and join  
* RDDs do not need to be materialized at all times  
* RDD has enough information about how it was derived from other datasets (its lineage) to compute its
partitions from data in stable storage  
	* program cannot reference an RDD that it cannot reconstruct after a failure 
* users can control two other aspects of RDDs: `persistence` and `partitioning`  
	* Users can indicate which RDDs they will reuse and choose a storage strategy for them    
	* They can also ask that an RDD’s elements be partitioned across machines based on a key in each record  
	* This is useful for placement optimizations, such as ensuring that two datasets that will be joined together are hash-partitioned in the same way  
	 
  
# 참고  
* https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf  
