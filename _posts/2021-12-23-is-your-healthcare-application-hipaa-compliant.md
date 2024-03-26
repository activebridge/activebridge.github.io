---
author: Dasha
author-position: marketing director
background: is-your-healthcare-application-hipaa-compliant-back
category: engineering
date: "2021-12-23"
layout: post
permalink: blog/:title
post-id: is-your-healthcare-application-hipaa-compliant
post-title: "Why is it important to comply with HIPAA? HIPAA-compliant application features"
time-to-read: 5 min
scripts: [post]

author-url: ""
article-body: ""
date-modified: "2021-12-23"
description: "Nearly 30 years later, HIPAA compliance is still a top priority for healthcare providers, and with good reason"
title: "What features are required to a HIPAA-compliant application?"
---

The Health Insurance Portability and Accountability Act (HIPAA) was enacted in 1996 and outlines **a set of standards for protecting certain health information**. Nearly 30 years later, HIPAA compliance is still a top priority for healthcare providers, and with good reason. Not only does HIPAA compliance protect the provider from hefty fines, but it also ensures that patient privacy, a top concern for many people today, is maintained to a high standard and that excellent patient care is always at the forefront. 

Despite HIPAA's crucial role in protecting patient data, many providers are still confused about where to start with HIPAA compliance. Specifically, they are unsure how to develop HIPAA-compliant web applications. And that's what this article aims to clear up!

We'll discuss everything you need to know about healthcare application development with HIPAA compliance in mind. Topics include what applications need to follow the HIPAA standards, what these standards are, and what penalties are incurred by application owners who don't follow them. Let's get started. 

## What Is HIPAA in Relation to Healthcare? Understanding HIPAA

Although no healthcare provider can guarantee a data leak will never happen, HIPAA compliance dramatically reduces the likelihood. **HIPAA's Security Rule offers specific administrative, physical, and technical safeguards** that medical providers must adhere to. We can break down these safeguards further. 

Administrative safeguards focus on internal organization, policies, procedures, and the management of security measures. Examples of administrative safeguards include security management processes, the hiring of privacy officers, HIPAA security training, contingency plans, and more. Essentially, administrative safeguards aim to establish the organization's security program and ensure it is robust and secure enough to protect the entire system. 

Technical safeguards are concerned with how entities implement reasonable and appropriate technology. These safeguards address access controls, data in motion, and data at rest requirements. They're also concerned with transmission security and data integrity (ensuring patient data isn't altered or destroyed in an unauthorized manner). 

"Reasonable and appropriate" is key here - it doesn't mean that healthcare providers need always to implement the most advanced technology, just those that adequately protect patient data. In other words, the healthcare organization must establish a balance between the risks and vulnerabilities to the Electronic Protected Health Information (ePHI), the cost of protective measures, the complexity of the system, and so on. 

We'll dive further into the technical safeguards later since these are paramount for healthcare application security.

Physical safeguards are the actual physical protections implemented to protect patient data, electronic systems, and equipment. They cover protection from natural and environmental hazards, as well as unauthorized intrusion. Some examples of physical safeguards include building access control (swipe card systems), ensuring computer screens displaying PHI are out of view, shredding unneeded documents, and locking offices.

## When It Is Necessary To Follow HIPPA Rules When Developing a Healthcare Application?

All applications in the medical sector need to be HIPAA compliant. This includes healthcare providers, business associates, clearinghouses, and plan providers covered by HIPAA. Essentially, **any organization that collects or stores ePHI must be HIPAA compliant**.

So, where does that leave fitness apps? The data collected by fitness apps like Fitbit, Nike FuelBand, and others aren't considered PHI. Instead, this data falls into the category of Consumer Health Information (CHI). So, if you're building a fitness device or app that collects health information, but you don't intend to share that data with a HIPAA-covered entity, then you don't need[ to be compliant](https://www.truevault.com/resources/compliance/what-is-the-difference-between-protected-health-information-and-consumer-health-information).

Development teams must be familiar with HIPAA regulations and rules and understand how to implement adequate privacy and security measures when building HIPAA compliant mobile apps or web systems.

![`HIPAA explanations for application developers | Active Bridge`](https://i.imgur.com/2xYqiMB.png)

## What Are the Requirements for Building HIPAA-Compliant Applications?

Now let's dive into HIPAA application security requirements.

### Access Control

HIPAA was created to ensure that patient health data isn't disclosed without the patient's consent. Access control plays a critical role in meeting this aim by limiting access to authorized users and ensuring people can't access data beyond their privilege level. Crucially, robust access control measures are instrumental in preventing costly and reputationally harmful data breaches.

The five main types of access control are:

* **Mandatory (MAC)**: The strictest of all levels. It takes a hierarchical approach to control access, and the system administrator defines the rules. For example, a protected object (like a file) will have an assigned security label, and users will have a security classification. The classification of the user and the object's security need to align for the user to be granted access.

* **Discretionary (DAC)**: This is typically the default security level on most desktop operating systems. Instead of a security label assigned to each object (as in MAC), there is an Access Control List (ACL). Users or groups of users can be granted access to certain resources.

* **Role-Based (RBAC)**: Considered a more "real-world" approach, RBAC assigns permissions based on the user's role within the company. For example, a software engineer might be assigned the "developer" role privilege. RBAC differs from DAC because, in DAC, users can be members of multiple groups.

* **Rule-Based**: Users are granted access to objects based on rules defined by the system administrator. For example, someone may be given access to a file at certain times of the month.

* **Attribute-Based (ABAC)**: Granting access based on combined characteristics involved in the access event. For example, characteristics could include security clearance, seniority, role, what the user is likely to do with the object (read/write), time of day, etc. ABAC is focused on who the user is rather than what they do.

### Person or Entity Authentication

Multi Factor authentication (MFA) requires the user to provide two or more verification credentials. These credentials can fall into three categories: what you know (knowledge), what you have (possession), and what you are (possession).

'What you know' includes **passwords, PINs, and security questions** like your mother's maiden name, the street you grew up on, and so on. Today knowledge-based authentication (KBA) is becoming more dynamic in nature. For example, the app could generate new questions that only apply to the user but that the user hasn't memorized. A common example of this is when banks ask you to name the shop where you spent X money three days ago. 'What you have' is something you possess, like a **key fob, mobile phone, bracelet**, etc. A typical example of this is receiving a text message with a code that grants you access to an application. And 'what you are' is something integral to your person like your **fingerprint, retinal pattern, face, or voice**.

### Transmission Security

Transmission security addresses how to protect data, including voice and video, that is transmitted anywhere an unauthorized person might be able to overhear.

Several technologies are utilized to meet these goals. For example, **SSH and SSL/TLS** apply asymmetric cryptography security protocols to keep personal information private during data transmission and communication. These can be used for both browser and VPN connections that allow users to connect to the office.

There's also **IPSec** a network layer protocol that provides encrypted connections between devices, thereby securing the data transmitted over public networks.

### Encryption and Decryption

We encrypt backend data using Lockbox, a modern encryption tool for Ruby and Rails. Lockbox uses a generated master_key for encryption and decryption. It also has many advantages, including zero dependencies and many integrations, and is easy to use. In addition, it works with database fields, files, and strings and maximizes compatibility with existing code.

### Data Backup and Storage

You mustn't send push notifications containing PHI or store PHI in backups in vulnerable places, like SD cards on Android devices.

PHI needs to be safeguarded, and the good news is AWS has several mechanisms to facilitate this. Some robust and secure backup features include **EC2 AMI Creation, Snapshotting, and Amazon S3**. Amazon S3 supports both client-side and server-side encryptions and is the best option for data in transmission using Secure Socket Layer (SSL).

### Extra Security for Mobile Apps

There are some additional technical security measures you can take when building HIPAA compliant healthcare apps:

* **Session termination**: Any system containing PHI should be designed to terminate a session after a set period of inactivity. The user has to re-authenticate to start a new session.
* **Code Obfuscation**: This involves converting programming code into a format that is difficult for hackers to understand. Examples include encrypting the code, renaming classes so they can't be guessed, or removing metadata that involves critical information about APIs or libraries.

![`requirements for building HIPAA compliant Applications | Active Bridge`](https://i.imgur.com/WhHE5tE.png)

## HIPAA Violations and Penalties

Most HIPAA violations are unintentional, but that doesn't mean you are off the hook when it comes to penalties.

There are four categories of violations and a corresponding [penalty structure](https://www.hipaajournal.com/what-are-the-penalties-for-hipaa-violations-7096/):

* Tier 1: The entity was unaware of the violation, and a reasonable amount of care was paid to following HIPAA rules. Fines from $100 to $50,000.
* Tier 2: The entity should have been aware of the violation, but they couldn't have reasonably avoided it. Fines from $1000 to $50,000
* Tier 3: The violation was considered "willful neglect," but an attempt was made to correct the violation. Fines from $10,000 to $50,000
* Tier 4: It was willfully neglectful, and no attempt was made to correct the violation. Minimum fine of $50,000.


## QuickFire FAQS For Healthcare Application Development

### What is the minimum list of required features to be HIPAA compliant?

Access control, person or entity authentication, transmission security, encryption/decryption.

### What's the ideal tech stack?

This really depends on the requirements and complexity of the application. With that said, most HIPAA compliant MVP healthcare apps follow this stack:

Hosting Provider - AWS
Database - MySQL, PostgreSQL
Backend - Ruby, Ruby on Rails
Frontend - React.js, Vue.js
Mobile development - Flutter, React Native

If you want any further details on the typical stack, please don't hesitate to get in touch.

### How much does it cost to build a HIPAA-compliant application?

Generally speaking, the cost of development will depend on several factors, including app functionality, number of medical app developers involved in the project, level of design complexity, and so on.

With that said, here are some general guidelines for a mid-range application so you can get an understanding of typical costs:

* For UX/UI Design from $5.000 to $10.000
* Custom Development (front-end, back-end, database development) - $25.000 - $50.000
* Quality Assurance (manual, automation) - $5.000 - $10.000
* Project Management - $3.000 - $7.000

The timeline to create a custom medical application runs from around 5 months to launch an MVP to approximately 10-12 months for full product release.

Note: the prices are based on the average hourly rate of medical software developers in Ukraine.
