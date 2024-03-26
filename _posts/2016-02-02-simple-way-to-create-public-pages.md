---
author: Alex Galushka
author-position: "CEO / Tech lead and backend developer"
background: simple-way-to-create-public-pages-back
category: engineering
date: "2016-02-02"
layout: post
post-id: simple-way-to-create-public-pages
post-title: "Simple way to create public pages"
time-to-read: 2 min
scripts: [post]
hidden: true

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "So, it's generally understood, they are used when there is no need for dynamic info or pulling from the
              database"
title: "How to Create Public Pages. Ruby"
---

Have you ever heard about public pages in Ruby? And what does it mean? So, it's generally understood, they are used when there is no need for dynamic info or pulling from the database.  
As usual Ruby on Rails developers implement some pre-built gems. But I would like to show you another way to create public pages in your rails apps such as About and FAQ. By this means, if your public page doesn't have anything similar in your app layout you can put simple HTML page to your public folder. There is such way:

```ruby
class PagesController < ApplicationController
  def about
  end

  def faq
  end
end
```
However, I guess this kind of implementation is very complicated because we need to add many actions and routes to achieve the result. Nevertheless, one should not forget that the main REST principle says that everything is a resource. So let's look at this pages as resources.
`routes.rb:
get ':page', to: 'pages#show', as: :page
pages_controller.rb:`

```ruby
class PagesController < ApplicationController
  def show
    render params[:page]
  end
end
```
Then, you should use path helper to get these pages:
`page_path(:about), page_path(:faq)`
But there is the possibility that user can pass the invalid value as page parameter and template missing exception resides with status 500 that is not good. To avoid that we will add constraints to our route.
`routes.rb:
 get ':page', to: 'pages#show', as: :page, constraints: { page: /(howitworks|careers|about|faq)/ }`
If you want to add a new public page you just need to create a view for it in ‘views/pages’ folder and add the constraint to routes.
I think, this method will be ease to implement and achieve good results for building an app with public pages.
