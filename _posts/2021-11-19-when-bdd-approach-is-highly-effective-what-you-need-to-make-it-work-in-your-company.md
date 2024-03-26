---
author: Dasha
author-position: marketing director
background: when-bdd-approach-is-highly-effective-what-you-need-to-make-it-work-in-your-company-back
category: engineering
date: "2021-11-19"
layout: post
post-id: when-bdd-approach-is-highly-effective-what-you-need-to-make-it-work-in-your-company
post-title: "When BDD Approach is Highly Effective. What you need to make it Work in Your Company"
time-to-read: 4 min
scripts: [post]

author-url: ""
article-body: ""
date-modified: "2021-11-19"
description: "Why? Because software development is often plagued by overwork and wasted time and resources"
title: "What Is BDD? And in What Situations Is It Highly Effective?"
---

It should come as no surprise that the overarching goal of development methodologies is to make the development process smoother and produce products that add value to the business. However, it doesn't always work out this way in practice. Why? Because software development is often plagued by overwork and wasted time and resources. Communication between software engineers and business professionals is often strained, with technical teams misunderstanding what the business truly needs and the business side misinterpreting the capabilities of the engineers. As Dan North, the originator of Behavior Driven Development (BDD), outlines, the result is often a frustrated 

> I got what I asked for but not what I want.
( Dan North )

It's out of this exact problem that BBD was born. In this post, we're going to dive into the BDD approach and discuss the places where it really works. What is BDD? What problems does it solve? And why should you use BDD in Agile? Let's take a look. 

## What Is BDD? And How Did It Come About?

Before BDD, there was Test-Driven Development (TDD) and Acceptance Test-Driven Development (ATDD). While TDD and ATDD have their strengths, they were much more concerned with development and programmers. In other words, it was all about code, unit tests, and the nitty-gritty technical details of the development. For example, TDD advocates writing tests before the basic functionality is implemented. 

The problem with this approach is that it becomes one-sided in the early stages of a project. As a result, other vital project contributors like project analysts, business development managers, and testers are left at a significant disadvantage. Rarely can they understand what the programmer wrote, which features they covered, and critically, what is missing. Put simply, before BDD, technical teams and business teams were often not speaking the same language and the project suffered as a result.

**BDD was invented as a way to bridge this communication gap and create a shared understanding of requirements between the business and agile development teams.**

So, while TDD and BDD have many similarities in their testing styles (designing tests that fail because the feature doesn't exist and then writing the simplest code possible to pass the test), they differ fundamentally in scope. In TDD, developers write the tests with little input from the business due to communication barriers. In BDD, tests are created by users and testers, with developers wiring them to the code. Essentially, TDD is a development practice, while BBD is a team methodology. BBD is an evolution of, and improvement on, TDD. 

## Understanding BDD From a Business Perspective

At its core, BDD is defined by business value and centered around the user's point of view.

In developing any business solution and navigating quality management, the cost of fixing bugs in requirements engineering and analysis grows exponentially. Therefore, any steps that can be taken to detect problems early and reduce or eliminate redesigns in iterative development will significantly reduce development costs. With BDD, iterative development issues drop dramatically. Being able to get around issues is an essential part of quality assurance.

As discussed above, BDD agile methodology's main strength is its bridge communication gaps in development. Technical teams, business teams, and everyone in between each have a different way of thinking about a product:

> **Business stakeholder:** What problem do we want to solve?
**Developer:** How do we build a solution that solves this problem?
**Test Manager:** What could happen that prevents this?

However, through continuous communication between developers and non-technical members, it's possible to create valuable, working software quickly.

## When is BDD Highly Effective?

Okay, now you know what the BDD development methodology is, but when does it really work? **What elements need to be in place to support effective behavior-driven development?**

Firstly, it's essential to have **a complete development cycle**. By this, we mean an analyst who describes the top-level scenario (user flow), a tester, and a developer. Working together, these members describe the scenario that is to be implemented and tested. Critically, the approach can only be successful if everyone is actively engaged and understands their role. Implementing BDD challenges everyone involved in the development but particularly the analysts. 

Secondly, **developing a generally accepted structure** (the rules of writing scenarios) is necessary to avoid confusion throughout the project. This is where the Gherkin language in the Cucumber BDD approach shines (more on Cucumber in the next section!). The Gherkin language extends the Given-When-Then template with additional keywords and makes it a complete means of describing scenarios while keeping it concise. Many BDD applications, like Cucumber, allow you to include tables in the description, making scenarios more concise, structured, and easier to read. Additionally, tests should contain all the steps necessary for the scenario to be reproducible at any time and automated. 

Lastly, if you're striving for an effective BDD approach to software development, there's one main takeaway you should leave having cemented in your mind. John Smart, one of the creators and active promoters of BDD, argues that **communication is the lifeblood of BDD**. Without communication, there is no BDD. With this in mind, your top priority should be promoting effective communication and collaboration between team members. 

![`when bdd really works | Active Bridge`](https://i.imgur.com/5RbPryn.png)

## Advantages of Behavior Driven Development

* **Ubiquitous language** - There is a unified language and a common rule for the team, which facilitates better test creation.

* **Collaborative approach** - With BDD, any team member, such as analyst, business user, developer, and tester, can join the tests at any stage. The tests are clear and easily readable to all participants in the process.

* **Ease of programming** - In BDD, a specification is a test scenario. The testers don't need to undertake the time-consuming task of writing separate test documentation because the analyst has already done it for them, writing the specification in a way that is readable and understandable to every team member. By having a structure and a common vocabulary of terms, you can quickly create a set of scenarios.

* **High visibility** - By opting for a unified language understood by all, visibility and transparency of the project's progress are increased.

* **Design translates to value** - By setting such high importance on the business value and needs, BDD empowers developers to create better products because they have a strong understanding of what the business wants.

* **Developer confidence** - As a general rule, agile BDD teams are more confident in the code and can make better predictions.

* **Up to date information** - When we work according to BDD methodology, auto testing and specifying accompany each stage of the software development cycle, ensuring that autotests and documentation are always up-to-date.

* **Lower costs** - With BDD, you improve the quality of the code, which in turn reduces project risks and costs associated with rework and maintenance.

## The Tools We Use (BDD Tools Recommended by the Active Bridge Team)

* [**RSpec**](https://rspec.info/about/) - Described as "making TDD productive and fun," RSpec is a BDD tool for Ruby. The simplicity of the RSpec syntax makes it one of the popular testing tools for Ruby applications.

* [**Cucumber**](https://cucumber.io/tools/cucumber-open/) - Cucumber is a BBD framework that businesses can use to write acceptance tests for web applications. It's a tool to write human-readable tests that are mapped into code. The easily readable format of functional validation features and the robust logical language (Gherkin) makes it highly usable for developers, testers, and business analysts.

* [**Capybara**](https://rubydoc.info/github/teamcapybara/capybara) - Capybara is a BDD tool that interacts with a website much like a human would. For example, the tool could visit a URL, click a link, and type and submit text in a text form. It's primarily used to mimic a user's flow through a website.

* **Selenium** - Selenium is a functional testing automation tool for web-based applications. It supports different languages, including Ruby, Python, C#, etc.

You can use these tools in isolation or in conjunction with each other. For instance, a business might use Capybara to test a website and Cucumber to share those tests with the business team (the non-developers). Similarly, companies might use [Selenium for functional testing ](https://www.guru99.com/using-cucumber-selenium.html)but integrate it with Cucumber to make the tests easy [to read and understand the application flow](https://stackoverflow.com/questions/15004918/cucumber-vs-capybara).

## Final Thoughts

By finishing this article, you should now have a solid understanding of what BDD is and what you need to do to make it work in your company. You should also have a clear idea of the benefits of BDD for business and which tools you can implement to aid software development in Rails apps. 

If you'd like to learn how to build sustainable Rails apps and ship more often, then we've got you covered. We recently published an article titled, ["What Ruby and Rails are used for. Tips from full-stack developers to non-programmers"]({% post_url 2021-10-15-what-ruby-and-rails-are-used-for-tips-from-full-stack-developers-to-non-programmers %}), which you can read to strengthen your knowledge in this area.  Lastly, if you want to get started with BDD, contact us to get a consultation on the BDD approach to building Rails applications from RoR experts. We’re looking forward to hearing from you!
