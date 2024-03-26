---
author: Alex Galushka
author-position: "CEO / Tech lead and backend developer"
background: five-ways-to-keep-your-code-cleen-back
category: engineering
date: "2016-02-02"
layout: post
post-id: five-ways-to-keep-your-code-cleen
post-title: "5 ways to keep your code clean"
time-to-read: 2 min
scripts: [post]
hidden: true

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "Rails community's invented many gems what are constantly analyzing your code and they give you to know about
             stuff what you should improve"
title: "How to Keep Your Code Clean"
---

Do you think your code clean, useful and readable? I’m sure you're wrong!
Rails community's invented many gems what are constantly analyzing your code and they give you to know about stuff what you should improve.
 Let me introduce some of these gems:

`rails_best_practices`

> ’sudo gem install rails_best_practices’

and run rails_best_practices .By the way, there are many configurations, so you should read documentation. Best Practices experience can be found on site


`rubocop`

> sudo gem install rubocop

So you can run rubocop
I have found a lot of tweaks in documentation

`Flay` from Ruby Sadist

> just install sudo gem install flay
and run in command line flay app/models/*.rb

Have you heard about Bullet gem?
Improve your SQL queries with Bullet
The Bullet gem is designed to help you increase your application’s performance by reducing the number of queries it makes. It will watch your queries while you develop your application and notify you when you should add eager loading (N+1 queries). When you’re using eager loading that isn’t necessary and when you should use a counter cache.
add it into a Gemfile

> gem 'bullet', group: 'development'

Append to config/environments/development.rb initializer with the following code:

> config.after_initialize do  Bullet.enable = true  Bullet.alert = true  Bullet.bullet_logger = true  Bullet.console = true  Bullet.growl = trueend

More information you can find on official GitHub page.
    What benefits are from Brakeman gem? Just install gem brakeman and run from app directory brakeman. So, after analyzing it provide information in next categories:

SUMMARY
SECURITY WARNINGS
Controller Warnings
Model Warnings

P.S.
You have to know Ruby Style Guide, Rails Style Guide and Better Specs or Rspec Best Practices. And gems described above should just help you fix missed!
Have clean code!
