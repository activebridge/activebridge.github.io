---
author: Viktor Shmigol
author-position: Lead Ruby on Rails developer
background: solid-principles-in-ruby-back
category: engineering
date: "2016-02-28"
layout: post
permalink: blog/:title
post-id: solid-principles-in-ruby
post-title: "SOLID Principles in Ruby"
time-to-read: 5 min
scripts: [post]
hidden: true

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "So there is the decision of its issue. SOLID principles are a godsend for ruby on rails developers"
title: "What are Solid Principals in Ruby"
---

Every developer would like to write an awesome application, find easy and perfect ways to create clean and useful code. Anyway, everyone's convinced it’s not easy. So there is the decision of its issue. SOLID principles are a godsend for ruby on rails developers. SOLID means five principles applied correctly help you to apply the right code.
One of the most well-known sets of OO design principles is known by an acronym, SOLID. It stands for:

* Single responsibility principle (SRP)
* Open/closed principle (OCP)
* Liskov substitution principle (LSP)
* Interface segregation principle (ISP)
* Dependency inversion principle (DIP)

So, guys let’s take a look at each of these principles.
First, Single responsibility principle (SRP). As I think, it’s the simplest principle I’ve seen and you should try to adhere to most of the time.
Let's say you have this code:

```ruby
class AuthenticatesUser
  def authenticate(email, password)
    if matches?(email, password)
      do_some_authentication
    else
      raise NotAllowedError
    end
end

private
  def matches?(email, password)
    user = find_from_db(:user, email)
    user.encrypted_password == encrypt(password)
  end
end
```

The AuthenticatesUser class is responsible for authenticating the user as well as knowing if the email and password match the ones in the database. It has two responsibilities, and according to the principle, it should only have one. Let's extract one:

```ruby
class AuthenticatesUser
  def authenticate(email, password)
    if MatchesPasswords.new(email, password).matches?
      do_some_authentication
    else
      raise NotAllowedError
     end
  end
end

class MatchesPasswords
  def initialize(email, password)
    @email = email
    @password = password
  end
  def matches?
    user = find_from_db(:user, @email)
    user.encrypted_password == encrypt(@password)
  end
end
```

The second, Open closed Principle can be defined as one software entity must be open for extension but closed for modification.

```ruby
class Purchase
  def initialize(payment_process)
    @payment_process = payment_process
  end
  def charge_user!
     @payment_process.charge(user: user, amount: amount)
  end
end
```

The system could use any of the payment gateways. While writing a code we should be careful on designing our class in a way that we don't have to modify it. For example, below we have three payment gateways. Stripe and paypal have charge function so our above class work with any problem. However, matchday has charge_amount as a payment function. The solution, in this case, could be the use of adapter class as shown below.

```ruby
class Stripe
  def charge(user,amount)
  end
end
class Paypal
  def charge(user,amount)
  end
end
class MachPay
  def charge_amount(amount,user)
  end
end

class MachPayAdapter
  def charge(user,amount)
     MachPay.charge_amount(amount,user)
   end
end
```

Purchase.new(MachPayAdapter).charge_user!
The third, Liskov Substitution Principle. It can be determined:  If S is a subtype of T, then objects of type T may be replaced with objects of type S (i.e., objects of type S may substitute objects of type T) without altering any of the desirable properties of that program (correctness, task performed, etc.).

```ruby
class Animal
  def walk
  do_some_walkin
  end
end

class Cat < Animal
  def run
  run_like_a_cat
  end
end
```

This principle applies only to inheritance. In order to comply with the Liskov Substitution Principle, Subtypes must be substitutable for their base types.
Well, so they must have the same interface. Since ruby does not have abstract methods, we can do it like this:

```ruby
class Animal
  def walk
  do_some_walkin
  end
  def run
    raise NotImplementedError
  end
end

class Cat < Animal
  def run
  run_like_a_cat
  end
end
```

The fourth, Interface segregation principle. It means that no client should be forced to depend on methods it doesn’t use.
This one is simpler to demonstrate if you have a class that has two clients (objects using it):

```ruby
class Car
  def open
  end
  def start_engine
  end
  def change_engine
  end
end

class Driver
  def drive
  @car.open
  @car.start_engine
  end
end

class Mechanic
  def do_stuff
  @car.change_engine
  end
end
```

As you can see, our Car class has an interface that's used partially by both the Driver and the Mechanic. We can improve our interface like so:

```ruby
class Car
  def open
  end
  def start_engine
  end
end

class CarInternals
  def change_engine
  end
end

class Driver
  def drive
  @car.open
  @car.start_engine
  end
end

class Mechanic
  def do_stuff
  @car_internals.change_engine
  end
end
```

By splitting the interface into two, we can comply to the ISP.
And the last principle is Dependency Inversion Principle. It based on two main factors: high-level modules shouldn’t depend on low-level modules. Both should depend on abstractions; abstractions shouldn’t depend upon details.
This can be achieved with duck typing and the Dependency Inversion Principle. Often this pattern is used to achieve the Open/Closed Principle that we discussed above. In fact, we can even reuse that same example as a demonstration of this principle. Let’s take a look:

```ruby
class UsageFileParser
  def initialize(client, parser)
    @client = client
    @parser = parser
  end
  def parse(usage_file)
    parser.parse(usage_file)
    @client.last_parse = Time.now
    @client.save!
  end
end

class XmlParser
  def parse(usage_file)
    # parse xml
  end
end

class CsvParser
  def parse(usage_file)
    # parse csv
  end
end
```

As you can see, our high-level object, the file parser, does not depend directly on an implementation of a lower-level object, XML and CSV parsers. The only thing that is required for an object to be used by our high-level class is that it responds to the parsed message.
As a developer, I always follow these five OO design principles to create awesome code. It’s  much easier than you think.
