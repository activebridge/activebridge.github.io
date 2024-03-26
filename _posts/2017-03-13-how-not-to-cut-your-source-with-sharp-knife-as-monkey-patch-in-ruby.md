---
author: Igor Bilan
author-position:
background: how-not-to-cut-your-source-with-sharp-knife-as-monkey-patch-in-ruby-back
category: engineering
date: "2017-03-13"
layout: post
post-id: how-not-to-cut-your-source-with-sharp-knife-as-monkey-patch-in-ruby
post-title: "How not to cut your source with sharp knife as Monkey Patch in Ruby"
time-to-read: 4 min
scripts: [post]

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "It sounds extremely challenging. Being able to change the expected outcome of a method can cause all sorts of
              weird behavior and difficult to track down bugs. Monkey Patch to help."
title: "Monkey Patch a Complete Guide"
---

One of the most powerful Ruby features is the ability to re-open any class and change it’s methods.

Actually, you can reopen any class and change how it works. This includes the default Ruby classes like String, Array or Hash. It sounds extremely challenging. Being able to change the expected outcome of a method can cause all sorts of weird behavior and difficult to track down bugs. Monkey Patch to help. In Ruby, the term monkey patch(MP) mean any dynamic modification to a class and is often used as a synonym for dynamically modifying any class (add new or overwrite existing methods) at runtime.

As you see, Ruby is like a sharp knife, it can be extremely effective, but it’s usually your own fault if you cut yourself. Let me explain. On the one hand, there are some disadvantages working with such sharp knife. 

When you monkey patch a class (disadvantages):

* If two libraries monkey-patch the same method, the first monkey-patch will get overwritten and disappear forever.
* If there’s an error, it’ll look like the error happened inside the class.
* It’s harder to turn off your monkey patches.
* If you, say, forgot to require ‘class’ before running this monkey patch, you’ll accidentally redefine the class instead of patching it.
* Instead, you could put your monkey patches in a module, but both variants have the same problem: the patch is globally and your changes could unexpectedly be overwritten by the third library.

On the other hand, the MP is a pretty powerful instrument in right hands and you are free to use it. Only need to remember that abuse the patching can easy to introduce bugs and make the debugging very difficult.

In case you only need the different behavior in a few specific places and not throughout the whole system, you can use Refinements. Refinements are a mechanism to add new or redefine existing methods the behavior of an object in a limited and controlled way.
How to use Refinements?

```ruby
class C
  def foo
    puts "C#foo"
  end
end
module M
  refine C do
    def foo
      puts "instance method: C.new#foo in M"
    end
  end

  refine C.singleton_class do
    def foo_method_of_a_class
      puts "method of a class: C#foo in M"
    end
  end
end
```

Where can be activated or Using ‘using’?
Since using is a method, refinements are only active when it is called. Here are examples of where a refinement MP is and is not active.

In a file:

```ruby
# not activated here
using M
# activated here
class Foo
  # activated here
  def foo
    # activated here
  end
  # activated here
end
# activated here
```

```ruby
In a class:
# not activated here
class Foo
  # not activated here
  def foo
    # not activated here
  end
  using M
  # activated here
  def bar
    # activated here
  end
  # activated here
end
# not activated here
```

Note that the refinements in M are not activated automatically if the class Foo is reopened later.
In eval:

```ruby
# not activated here
eval <<EOF
  # not activated here
  using M
  # activated here
EOF
# not activated here
```

When not evaluated:

```ruby
# not activated here
if false
  using M
end
# not activated here
```
### Is it ok to Monkey Patch?
Actually, there are some cases where reopening a class does make sense. And there are many cases where it’s fine to Monkey Patch, but it should definitely not be your first weapon of choice.
Monkey patching allows you to come up with a "quick and dirty" solution to a problem, but you should use it very sparingly. Refinements are a way to limit the scope of an extension to a class to only the code we control.
Enjoy your code!

Some useful literature to figure out how you can implement MP:

1. [Refinements](https://docs.ruby-lang.org/en/2.4.0/syntax/refinements_rdoc.html)
2. [VIRTUOUS CODE](https://www.virtuouscode.com/2015/05/20/so-whats-the-deal-with-ruby-refinements-anyway/)
3. [Why is nobody using Refinements](https://interblah.net/why-is-nobody-using-refinements)
4. [3 Ways to Monkey-patch Without Making a Mess](https://www.justinweiss.com/articles/3-ways-to-monkey-patch-without-making-a-mess/)
5. [In Ruby, what is duck-typing and monkey-patching? ](https://www.quora.com/In-Ruby-what-is-duck-typing-and-monkey-patching-What-are-the-technical-and-usage-differences-between-them)
6. [Avoiding Monkey Patching](https://stackoverflow.com/questions/4470108/when-monkey-patching-a-method-can-you-call-the-overridden-method-from-the-new-i?answertab=active#tab-top)
