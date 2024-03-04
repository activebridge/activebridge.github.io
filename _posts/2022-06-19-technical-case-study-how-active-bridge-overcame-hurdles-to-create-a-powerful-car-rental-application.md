---
author: Alex Motuzko
author-position: Ruby on Rails developer
background: technical-case-study-how-active-bridge-overcame-hurdles-to-create-a-powerful-car-rental-application-back
category: engineering
date: "2022-06-19"
description: "Technical Case Study: Reaching the Max Limit for Ids in Postgres"
layout: post
post-id: technical-case-study-how-active-bridge-overcame-hurdles-to-create-a-powerful-car-rental-application
title: "Technical Case Study: How Active Bridge Overcame Hurdles To Create a Powerful Car Rental Application"
time-to-read: 4 min
scripts: [post]
---

Sometimes, the best way to see what a technical solution can do for you is to understand how it worked for others. At ActiveBridge, we're always happy to share our technical solutions with our readers. And that's why today, we'll dive into the issues we faced developing a car rental application for one of our customers. 

## Overview
The customer wanted to build a car rental platform that would allow users to book transport facilities online. So we worked hard to deliver a fast-loading, simple, and intuitive solution - and we were successful. 

We developed the website structure according to the service specialization. Below are the main features we created for the car rental system.

### Booking Engine
You can't have a car rental system without a booking engine. It's essential to understand how a system like this works - it's a specific algorithm of sequences (a chain of automated actions). This algorithm is use case agnostic and can be applied to all reservation systems, regardless of industry. The main elements of the algorithm are scheduling, transactions, confirmation and notifications. All entered data is sent to an internal server, where administrators view and manage all reservations.

### Content Management System (CMS)
A CMS is a critical component of a car rental system. It enables admins to add and edit site content around vehicles, available services, locations and discounts.

### Customer Relationship Management (CRM) System
The function of CRM is to store and organize customer information and manage interactions with existing and potential customers. For example, when a user registers themselves in the car rental system, their details are sent to the database and displayed in the CRM. In addition, the system helps company managers contact customers, create customer profiles, identify returning customers, and more. For example, employees can use the CRM system to offer bonuses and special offers to customers, as well as block scammers. 

### Financial Management System
ActiveBridge, along with the customer's development team, implemented an automatic billing system. This is crucial because the owner of a car rental site needs a complete view of all transactions, payments, taxes, refunds, fees and other accounting details from one centralized location.

### Reporting System
We also implemented a reporting system that has improved management and made marketing much more effortless. These real-time analytics help the company make informed business decisions to increase revenue.

## Solution - A Little Bit About the Technical Part of Car Rental Site

The website where users book their orders is the only part of the service's structure visible to end users. But, of course, company employees also have access to the backend with tools for managing orders and finances, the CRM system, and analytics. 

A critical moment in the development of the car rental site was planning the database's structure, the service, and the description of user interaction scenarios within it. As for the specific technologies used, we recommended PostgreSQL for databases and Ruby on Rails for the backend. It is used by Airbnb, GitHub, Shopify, and other large sites.

Developing an API was also a crucial first task. Without the API, it would take considerably more time and resources to expand the service and create applications for different platforms.

Car rental sites need to be customized for heavy loads during peak periods, for example, on conference days or mass events when the number of people needing cars can increase dramatically. So anyone looking to develop a booking site should discuss these factors with an IT vendor before starting the development project. 

## Hurdles - The Problem We Encountered During the Implementation of This Complex System and Its Solution

The project's primary complexity lay in the financial transactions. Once the transactions were no longer being created on the production line, all the functionality associated with car rental bookings and payments ceased working. Airbrake (a frictionless error monitoring application) received thousands of errors stating "Reaching the Max Limit for Ids in Postgres". The source of these errors was the Quote table. As it turns out, the maximum available id number limit within the Quote table had been reached. The id column type is an integer.

![`Reaching the Max Limit for Ids in Postgres | Active Bridge`](https://i.imgur.com/URc26kX.png)

Since we were working with a production application and the site had stopped functioning, we needed to come up with a quick solution to minimize user disruption and financial losses. We quickly looked at several options to overcome this database engineering challenge, eventually deciding to change the id column type for Quote to bigint, where the limits are much higher. Here's what we did:

```ruby

class ChangeIdToBeBigintInQuotes < ActiveRecord::Migration[5.0]
  disable_ddl_transaction!
  def up
    safety_assured do
      change_column :quotes, :id, :bigint
    end
  end

  def down
    safety_assured do
      change_column :quotes, :id, :integer
    end
  end
end
```

Unfortunately, the migration failed the first time. We quickly realized this was because this migration needs twice as much space in the database as the size of the table we were changing. And since there was not enough space on the PG server, this led to a lot of "dead" records in the database, leaving even less space.

To combat this, we decided to delete the old data in the database. However, this didn't work because, at this point, the table size was too big - 149 GB. Even deleting millions of records didn't make a measurable difference to the size of the table. 

With so many entries in the database, our engineers had to query the database to exclude "where" from the query and use limits and offsets. The queries especially were time-consuming. So next, we decided to increase the size of the PG database to allow the migration to run as intended.

Once we increased the size, voila! The migration ran, and everything worked as expected.

And crucially, after all the manipulations and cleanup, we managed to free more than 100 GB of space in the database. As a result, the new table size was 43 GB.

## Wrapping Up

Embarking on a car rental software project or any other software project often comes with challenges. Things come up, whether it's Postgres database limits or something else entirely. However, how you respond to these challenges makes the difference between a clunky app or failed project and a powerful new application. At ActiveBridge, our team of expert developers know how to overcome even the most complex challenges in application and website design. If you want to learn how we can help you with your next software project, get in touch today. 
