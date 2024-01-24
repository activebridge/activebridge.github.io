---
autor: Dasha
autor-position: marketing director
background: heroku-vs-aws-which-cloud-service-is-best-for-your-healthcare-project-back
category: engineering
date: "2022-04-19"
description: Cloud Hosting Service for a Healthcare Project. Heroku or AWS?
layout: post
post-id: heroku-vs-aws-which-cloud-service-is-best-for-your-healthcare-project
title: "Heroku vs AWS: Which Cloud Service Is Best for Your Healthcare Project?"
time-to-read: 4 min
scripts: [post]
---

The healthcare cloud computing market was valued at an impressive $23,749.33 million in 2020 but is expected to soar to an eye-watering [$52,303.35 million by 2026](https://www.businesswire.com/news/home/20220131005627/en/The-Global-Healthcare-Cloud-Computing-Market-is-Projected-to-Reach-52303.35-Million-by-2026-at-a-CAGR-of-14.12---ResearchAndMarkets.com). Today, cloud services are in high demand, but with so many options on the market, healthcare providers often struggle to find the one that best suits their needs. With this in mind, today, we will compare two popular cloud services, Heroku and Amazon Web Services (AWS). We'll dive into their pros and cons, use cases, and more, so you can choose a solution that best fits your healthcare project. Let's get started!

## What Healthcare Businesses Should Pay Attention to When Choosing a Hosting Provider in 2022

![`hosting provider security checklist | Active Bridge`](https://i.imgur.com/Hpr83qd.png)

**1. Are They HIPAA and PCI Compliant?**
All companies dealing with protected health information (PHI) must have the IT infrastructure to ensure HIPAA compliance. Likewise, any healthcare companies that take credit card payments must adhere to the PCI Data Security Standard requirements. With this in mind, the most critical question you need to ask is, "is my hosting provider HIPAA and PCI compliant?".

**Here are the most critical features to look for when selecting HIPAA compliant hosting environment:**

* Strong encryption for data at rest.
* Encrypted VPNs to facilitate secure access to PHI.
* A robust and comprehensive firewall and intrusion prevention system.
* Robust authentication, including multi-factor authentication (MFA).
* Event logs for auditor-based compliance.
* Reliable data backup/restoration, including data recovery assistance and offsite backup storage.
* 100% server availability and high server uptime.
* HIPAA compliant data centers.

**2. Stable Server Performance (Uptime)**
Server uptime is the total duration for which a server is fully functioning and running. Therefore, the server uptime can tell you how stable and reliable a hosting provider is (the number and duration of outages) and how fast they are at maintenance work. 

Ideally, you want to pick a provider whose uptime is as close to 100% as possible. However, it's crucial to understand that true 100% uptime isn't possible. All server hardware will need to be checked and serviced at some point, and during these times, your project data may be unavailable. 

**3. Technical Parameters**
Typically, speed will be adequate if you have suitable hardware (SSD) and software (Apache and Nginx). You can use WEBO Pulsar to check the speed. Good hosting must be able to support the ten most popular CRM and other technologies (Perl, Python, Ruby, and others). The best (not just good) hosting providers also offer many databases, sites, and FTP accounts. As a general rule, these quantitative characteristics depend on your plan.

**4. Server Location**
The location of your server will impact the loading speed of your site (faster response times/data transfer rate for closer server locations). Slow loading speeds cause frustration and can hinder your project. 

**5. Data Backup**
It's critical to ask your web hosting provider where your data is backed up - on the server with your site files or on some other machine. Why? In the event of unexpected changes to your site during the upgrade process, site data stored separately (on another machine) is easily restorable. Additionally, determine whether your files are saved on a hard drive separate from where your site is located. Asking these questions will save time and shield you from problems in the future. 

**6. Scalability**
Beyond high speed, some companies need hosting capable of instantly scaling performance on-demand and reducing it when demand decreases. Unfortunately, during COVID-19, many hosting providers couldn't handle the extra load, and business owners got downed sites instead of additional profits. This is why it's crucial to determine how good your hosting provider is at scaling performance as needed. 

**7. Availability of High-Quality Technical Support**
Technical support should be non-stop (around the clock), responsive and timely. You should clarify the quality of technical support you'll receive since this can be critical in an unexpected incident (an Act of God - something not in your control). 

**8. Longevity of Provider (How Well Established They Are)**
The longer the company has been operating, the more trustworthy it is. Pay attention to the start date of the server provider, the age of the domain, and other relevant details. It's also a good idea to read reviews about your provider to get a broad view of how they've improved over time and meet customer needs. You can also look up the market share they hold or use statistical data to estimate the market share. While market share isn't everything, it will tell you how popular your provider is today and whether their popularity is increasing or waning. 

## The Heroku Cloud Platform

### How Heroku Works

Heroku is a multilingual cloud Platform-as-a-Service (PaaS) based on a managed container system, with integrated data services and a mature ecosystem for deploying and running applications. As a PaaS platform, Heroku provides users with specific functions and features and access to systems and software. At the same time, its infrastructure is completely hidden. The service employees take care of everything, and many processes are automated. The platform specialists are responsible for the server's security, architecture, and configuration.

![`How Heroku works | Active Bridge`](https://i.imgur.com/YEZmNdC.png)

### Things You Need to Know

**Dynos**
Applications running in Heroku run in isolation - they are enclosed in special containers called dynos (dyno, dynos). Dynos allow you to create a lightweight, independent environment and deploy an application in that environment so that its settings do not conflict with others. One application can be used by several dynos, and the project is easily scalable to the developer's tasks.

**Process Types**
Dynos have templates - prototypes used to create a container (almost like a blueprint). It is thanks to them that applications in Heroku are easy to scale.

Each process type is responsible for its own part of the work and does not affect other modules. This helps parallelism. Processes are separated, and tasks are not mixed up, thereby avoiding conflicts. 

Dynos are also easy to scale. For example, if the program requires more resources, you can increase the working capacity in a few clicks. To do this, you need to add the necessary number of new dynos with the same types of processes as the previous ones.

**Heroku Add-Ons**
The adaptability of a platform is tied mainly to the libraries or services available at the click of a mouse or with a simple command-line statement. Currently, Heroku includes over 175 add-on products in 24 different add-on categories. 

**Heroku Buttons**
Heroku Buttons are a straightforward way to get an app up and running quickly on the platform. Put simply, they are pointers to source code repositories that have been extended with a small file that determines how the code should be deployed and configured. You can initiate app deployment, configuration, and delivery by clicking a Heroku Button. 

**Heroku Buildpacks**
Heroku Buildpacks transform deployed code into a slug, which can be executed on a dyno. They are composed of a set of scripts and will retrieve necessary dependencies, output assets, compiled code, and more based on the programming language. 

### Heroku Features

* **Multi-language:** Heroku supports Ruby, Python, PHP, Node.js, Java, Go, Scala, and Clojure. The Heroku platform itself runs on Debian and Ubuntu Linux distributions. It was initially created to work with Ruby on Rails, so references to this are common in older documentation. 

* **Additional features:** Heroku includes its own SQL database as a service, software for connecting the development team, automation services for programs in different languages, and much more. The platform also works with NoSQL solutions. In addition, you can use the tools in conjunction with the central cloud service.

* **Integration with services:** Heroku supports Docker and Git out-of-the-box in the basic package. You can also use the third-party add-ons to get access to additional capabilities.

* **Quick deployment and easy scalability:** You can add, deploy, and run an application with just a few commands in the console. The same is true for increasing the number of dynos. No lengthy preparation or pre-configuration is required (it's novice-friendly).

* **Compliance and security:** Heroku offers robust authentication, and its features adhere to HIPAA, SOC, PCI compliance, GDPR, SSL, and other standards. The Heroku Shield service also introduces new security capabilities to Dynos, Postgres databases, and more, to further support compliance for healthcare apps.

## The AWS Cloud Platform

### How AWS Works

Amazon Web Services (AWS) is the largest cloud hosting provider and has a whopping 33% market share. Shared cloud services include storage, processing power, databases, analytics, security, monitoring, developer tools, and networks. In addition, AWS offers a broad range of cloud services that you can use in conjunction to meet your business needs. 

![`AWS main services | Active Bridge`](https://i.imgur.com/NQ7tOd5.png)

### Key Amazon Services

**S3 (Simple Storage Service)** is an object storage service that offers automatic scalability (it's built to store and retrieve any amount of data from anywhere). S3 stores copies of data on different physical devices, allowing for high availability and reliability. 

It also has a versioning feature that allows you to return to and restore previous versions of files, should you need to. Files can also be archived using the S3 glacier service. For example, if you're legally required to keep data for at least three years, this service is just what you need. 

**CloudFront** is essentially a Content Delivery Network - a system of servers worldwide that caches static content. The system directs a user who wants static content to the nearest server that will deliver the data promptly. Such servers are called edge locations. Their system exists independently of regions and availability zones.

**EC2 (Elastic Computer Cloud)** is a service that allows you to create virtual machines with different operating systems and install software on them. EC2 offers different types and configurations of servers. For example, you can customize it with powerful processors for specific computing tasks. Another option is optimized servers for working with large amounts of data.

**Auto Scaling** is a service that allows you to create groups of servers and automatically manage their number. It enables you to scale manually or configure by events. Scalability by schedule is also available.

**RDS (Relational Database Service)**, as the name would imply, is a relational database service from Amazon. It supports several engines, including MySQL, MariaDB, PostgreSQL, Oracle, and Microsoft SQL. RDS provides Multi-Availability Zones functionality for disaster recovery. For example, you can create a copy of your database on a separate server in a different availability zone. This database will constantly be in sync with the primary instance. When the primary server goes down, RDS will automatically switch all requests to the copy located in the other zone. And critically, the application's performance will not be affected. 

**Amazon Aurora** is a managed relational database engine compatible with PostgreSQL and MySQL that offers automatic scaling. Amazon claims that its performance is five times that of MySQL and three times that of PostgreSQL. All your data is stored by default as six copies, two each, in three availability zones for high availability and persistence. If there is a fire in any of the data centers, Aurora will continue to operate.

**IAM (Identity Access Management)** is a service no AWS team can work without. It allows you to create and manage user access levels. For example, you can organize them into separate groups - admins, testers, developers. You can then create policies that define access and permissions within your account. For example, you can create a policy that allows you to read and modify all resources and pass this policy to the Administrators group. Or you can allow all resources to be read but forbid them to be modified and assign this policy to the testers group.

### AWS Features

**1. Operational Excellence**.
Human error is a significant cause of errors and operational incidents. Therefore, AWS automates as many operations as possible to reduce the possibility and impact of human error. There are two critical concepts in this area:

* Infrastructure as a Code (ex. CloudFormation. CDK): This enables you to write code to deploy AWS services via YAML/JSON (CloudFormation) files or in your preferred language (Cloud Development Kit).
* Observability (Analytics, Metrics, Actions): This allows you to view your infrastructure, collect various metrics, and set up actions in AWS for unexpected events (either good or bad). 

**2. Security**.
Focuses on how to protect your infrastructure while using the cloud. Three critical concepts related to security in the cloud are:

* Identity and Access Management (IAM): An essential AWS service that allows you to create users, roles, groups, policies.
* Network Security: You can configure what traffic can and cannot move around your network in the cloud.
* Data Encryption: Scalable and efficient encryption features for data at rest in the cloud.

**3. Performance Efficiency**.
This is about how you can run services in the cloud efficiently and scalably. While the cloud gives you the ability to handle any amount of traffic, scalability comes from how you select and configure your chosen services. 

The two basic concepts at play here are:

* Selection: The selection of services that meet your business needs.
* Scaling: This allows you to increase the performance of your application through vertical or horizontal scaling.

**4. Shared Responsibility Model**.
This model demonstrates who is responsible for what in AWS. Customer responsibility is determined by the AWS cloud services you choose to use. What does this mean? Well, if a nuclear bomb falls on an AWS data center, they take responsibility for the incident. And they will make reparations and reimburse you for the damage. However, if you don't encrypt the data when transmitting it and the data is intercepted and stolen, that's your problem.

**5. Cost Optimization**.
Cost optimization is about helping you achieve your business goals while minimizing costs. AWS's Pay-as-you-go model helps achieve cost optimization by allowing you to pay for only what you use. Amazon estimates that you can save up to 72% over equivalent on-demand capacity services by choosing AWS. You read more about AWS cost optimization and [pricing models here](https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/aws-cost-optimization.html). 

**6. HIPAA Compliance**
AWS itself doesn't guarantee HIPAA compliance, but it offers services that pave the way for it. Essentially, Amazon enables HIPAA compliance if you use its services effectively. You can use its services to create a solution that will maintain, manage, and transfer confidential PHI securely. 

However, simply using AWS isn't enough to ensure compliance. Essentially it's about how you apply your knowledge of AWS technologies that makes or breaks your HIPAA compliance. For more information about using AWS to process and store medical information, [read this white paper](https://docs.aws.amazon.com/whitepapers/latest/architecting-hipaa-security-and-compliance-on-aws/welcome.html) which includes a list of AWS' HIPAA-eligible' cloud services that you could use with PHI. 

If you want to read more about AWS features, we have good news. AWS engineers have written documentation with basic practices for proper and painless cloud hosting. You can [find it here](https://activebridge.org/blog/compatible-hosting-services-for-ruby-on-rails-apps-in-depth-review). 

## Heroku vs. Amazon: The Verdict

[Gartner predicts](https://www.gartner.com/en/newsroom/press-releases/2020-11-17-gartner-forecasts-worldwide-public-cloud-end-user-spending-to-grow-18-percent-in-2021) that 70% of organizations are increasing their cloud spending in the wake of COVID-19. The message is clear: cloud-based solutions are the future for security and productivity-minded companies. But the question still remains, based on what you've read today, which is the best cloud service for your healthcare project?

Both Heroku and AWS are cloud platform providers, but they're not direct competitors. Instead, they offer different services tailored for different results. So choosing the best option for your company is more about discovering their strengths and weaknesses and applying them to your unique situation. 

For example, if you wanted to choose a provider based on market share alone, Amazon would be the clear winner. However, despite its modest market share, Heroku is right up there is Amazon when it comes to cloud providers used by high-traffic sites. In other words, it's valued highly for its performance and expansive features. 

**To illustrate the differences more clearly, let's look at some direct comparisons:**

* **Primary offering:** Heroku offers web applications and managed open-source databases, while AWS provides computing, networking, storage, analytics, dev tools, application services, and more.

* **Ease of use and control:** Heroku is an excellent choice for small businesses looking to build web apps fast by using a simpler platform. AWS is better suited to large teams who want extensive access to cloud services and want to maintain firm control over their infrastructure.

* **Programming languages:** Heroku supports Ruby, Java, PHP, Python, Node, Go, Scala, and Clojure. AWS supports Java, JavaScript, C#, PHP, Python, Ruby, Go, Scala, Node, Clojure, C++, etc.

* **Heroku and AWS both allow multi-cloud integration.**

![`Heroku vs AWS | Active Bridge`](https://i.imgur.com/UEbPFGQ.png)

Heroku and AWS were born with the fundamentally same objective, helping companies efficiently manage their IT infrastructure while reducing costs.

## Final Thoughts

If you want to quickly prototype your healthcare web application with limited developer resources, Heroku may be the best choice. However, since AWS has a much broader cloud ecosystem, you may want to migrate your resources from AWS to Heroku in the future.  

Our experts have been working with these cloud solutions for almost ten years. If you still have doubts about which platform to use, how to integrate cloud services, and how to migrate from one platform to another, our team can help answer your questions.

If you are wondering what hosting providers are popular in 2022 - you can[ read about them here](https://activebridge.org/blog/compatible-hosting-services-for-ruby-on-rails-apps-in-depth-review). 
