---
author: Dasha
author-position: marketing director
background: mvc-pattern-quick-review-back
category: engineering
date: "2016-05-15"
description: MVC Quick Review
layout: post
post-id: mvc-pattern-quick-review
title: MVC pattern. Quick review
time-to-read: 3 min
scripts: [post]
---

This article I would like devoting to my understanding of architectural pattern for Rails framework. What is Ruby on Rails, answer is clear. A framework based on Ruby realizes **MVC** template. 

Let’s get clear, **Ruby** is simple and clear programming language for meta-programming, blocks, iterators. All of it makes this language awesome base for the framework. So in 2004 this framework was gone out by David Heinemeier Hansson. 
What has been said above, ROR realizes MVC. Model - View - Controller is pattern of application architecture, dividing three main components:

![Imgur](https://i.imgur.com/hiMS9VX.png)

**Model** is the core component of application and responses for the algorithms, the program works internally, provide access to the data warehouse.
**View** is intended for data output vested by Model. This MVC component contact with users.
**Controller** gets user’s data and transfers to Model. Moreover, it gets feedback from Model and transfers it to View.

> In other words, Ruby on Rails is based on three pillars - Active Record, Action View, Action Controller.

**Active Record** means Model. It keeps data and works with a database. Active Records is response for:
* *Data validation*. Data can be validated automatically by means a lot of existence methods, which can be rewritten for your own needs.This process is the first step of project security.
* *Connection to the database*. Active Records has adapters for database connection such as **MySQL, Postgres, SQLite, MS SQLServer, DB2.** The model creates the necessary request to a database engine with this adapters help. You just need to write connection settings in database.yml.
*CRUD operations*. CRUD means “create”, “retrieve”, “update” and “delete” table. To create a new table, you input new class object and fill its instance variables with values.

**Action View** includes logic for Model data input. Action View main functions:
*  *Form helpers.*  Checkboxes, lists are created by means form helpers, using existence gems. Formatting helpers, in turn, format data with that way we need. There are methods for a date, currency, and strings.
* *Templates.* This fails to consist of placeholders, what will be replaced with content. Templates contains HTML-script and Ruby code, built in HTML with embedded Ruby syntax. 
* *Layouts* determine how a project will be placed into the page.

**Action Controller** control logic flows. It intercepts requires through which controller changes the Model objects and calls the View. Action Controllers functions:
* *Sessions support*. The session is a period of time user spent on a site. How long user is exploring site pages you can track by means cookies or object session. Cookie file doesn’t contain objects.
* *Filtering.*  User authentication, logging events and sending a personal response are created before Controller logic implementation. Special filtres help to carry out this process. There are three main filtres: before, after, around.
* *Cashing.*  Cashing is the process including maintaining frequently accessed content in cash. So there is no need to request it again.

![Imgur](https://i.imgur.com/RhzW6Ke.jpg)

To sum up. In Ruby world, everything is deep-laid and incredibly clear. The simple current system of interaction between the main framework components, that guarantees fast productive system of application development, customized approach and great final product.
