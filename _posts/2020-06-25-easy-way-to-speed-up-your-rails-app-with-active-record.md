---
autor: Sergiy Naumenko
autor-position: Ruby on Rails engineer
background: easy-way-to-speed-up-your-rails-app-with-active-record-back
category: engineering
date: "2020-06-25"
description: How to Optimize Performance in Rails. Active Record Tips
layout: post
post-id: easy-way-to-speed-up-your-rails-app-with-active-record
title: Easy Way to Speed Up Your Rails App with Active Record
time-to-read: 5 min
scripts: [post]
---

The technology I work with is **Ruby on Rails**. It allows us to create scalable and highly performance applications. This technology has many advantages, you can see more[ here](https://activebridge.org/blog/node-js-vs-ruby-on-rails). However, in the Ruby community developers share different performance issues. Some programmers refer to slow Rails performance. I wouldn't agree. There are many factors affecting the performance of your web application. Some are environmental, some are related with your code, while some others are related with your skills.

One possible reason for slow performance may be due to Active Record. **That’s why you have to understand how Active Record works to prevent calling unneeded queries, and don't waste memory for storing unnecessary information.** In this post we are going to look into pretty simple script examples to speed up queries and save time.

## ... when a page with simple content takes a second or more to come back from the server

So, **Active Record is Rails’ default Object Relational Mapper (ORM).** It is used to interact with a database of applications by generating and executing Structured Query Language (SQL). Active Record is much more powerful than just simple CRUD actions on individual records.

	Querying with ActiveRecord (where, save, etc...) is easy and fast enough. However we can meet the case when a page with simple content takes a second or more to come back from the server. And it's getting complicated with Timeout errors coming back from nginx.

Developers can fix the issues using caching. Although that adds some troubles: expiration, nesting partials, and bugs that only reproduce in production. It seems you don’t need this headache, right?

## Load only the Data you need!
If you are using find, where, etc. methods Active Record will generate SQL like** SELECT** models." **WHERE** (condition). In most cases this is bearable but if you select a lot of records and don’t need all fields this will load a lot of unneeded data into the memory. Eventually, this results in a longer DB time and, moreover, wastes a lot of memory. You can use at least the pluck and select method to increase the performance.

### pluck
Use the pluck method to choose one or more properties without stacking a full bunch of records and get the traits you need. It allows you to fetch data directly into an array, bypassing heavy ActiveRecord objects.

```rails
User.all.pluck(:id)
   (2.6ms)  SELECT "users"."id" FROM "users"
 => [166, 178, 210, 204]
```

Starting with Rails 4: pluck has become smarter and allows you to take more complex parameters:

```rails
User.all.pluck(:id, :created_at)
   (1.7ms)  SELECT "users"."id", "users"."created_at" FROM "users"
 => [[166, Mon, 07 Mar 2016 12:34:32 GMT +00:00], [178, Wed, 03 Aug 2016 14:02:43 BST +01:00], [210, Sun, 05 Mar 2017 18:08:25 GMT +00:00], [204, Tue, 07 Feb 2017 08:46:46 GMT +00:00], [159, Sun, 21 Feb 2016 19:46:18 GMT +00:00]]
 ```

 The documentation does not say that pluck can also accept SQL. This will allow you to use it in more complex cases, when, for example, you need to select a value from 2 tables. In principle pluck and so it is able, but only if the column having unique for 2 columns the name is chosen. Moreover, there probably will be necessary to carry out any transformations in the course of sampling and we can make them with SQL:

```rails
User.pluck(<<-PLUCK)
UPPER(first_name)
PLUCK
(3.2ms)  SELECT UPPER(first_name) FROM "users"
 => ["OLIVIER", "VDFVFD", "DANIEL", "ANNA", "SDGDSZG"]
 ```

**What do you need to remember when using a pluck:**

*  pluck will return an array instead of ActiveRecord :: Relation, it should be last in a chain.

*  You always need to remember which operations are performed by the database and which - by ruby code.

```ruby
User.distinct.pluck (:first_name)
```

faster than
```ruby User.pluck(:first_name).uniq.
```

*  For simple transformations or to resolve a conflict in a column name - you can pass the request by string:

```ruby
User.joins(:projects).pluck('projects.created_at')
```

### select

The select Method is another way to limit the attributes selected from your database. The main difference to pluck is that select creates an ActiveRecord object, instead of returning an array of the selected fields. This allows you to call methods on this object.

```rails
User.select(:id, :created_at)
User Load (2.7ms)  SELECT "users"."id", "users"."created_at" FROM "users"
 => #<ActiveRecord::Relation [#<User id: 166, created_at: "2016-03-07 12:34:32">, #<User id: 178, created_at: "2016-08-03 13:02:43">, …]
 ```

## Grab all the data at once in ActiveRecord

If you look at the logs in an unoptimized app, they’ll probably look like this:

```rails
Processing by UsersController#index as HTML
  User Load (1.6ms)  SELECT `users`.* FROM `users`
  Profile Load (1.3ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 1 LIMIT 1
  Profile Load (1.2ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 2 LIMIT 1
  Profile Load (1.1ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 3 LIMIT 1
  Profile Load (1.5ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 4 LIMIT 1
  Profile Load (1.0ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 5 LIMIT 1
```

You’re trying to find 5 users along with their profiles, and you’re doing 6 SQL calls! This is called the “N+1 query problem”: you’re doing one query for the users data, plus one query for each of their associated profiles. You can probably imagine how bad it becomes the deeper you go. You’ll run into this problem when you loop over a list of objects and try to query their associations:

```rails
<% @users.each do |user| %>
  <tr>
    <td><%= user.name %></td>
    <td><%= user.profile.age %></td>
		```
You don’t need to hit the database N+1 times. You want to hit it at most twice: once for the users you’re trying to find, and once for all of the profiles associated with all of those users. This is called “eager loading” and you can do it really easily with .includes:

```ruby
@users = User.all.includes(:profile)
```
You have to specify the associations you want to preload, using that array and hash syntax. Rails will do the best it can at consolidating down those calls:

```rails
User Load (1.2ms)  SELECT `users`.* FROM `users`
Profile Load (3.0ms)  SELECT `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
```

The N+1 problem is easy to fix, and it’s pretty easy to avoid once you know the pattern. But it’s also easy to miss, especially if your code is spread out across a number of partials.

## Use indexes

Ever added a belongs_to or has_many to a model in Rails or if you find that a SQL query is causing a performance problem and it contains a where clause or a join then adding an index will greatly speed it up.
	Let’s say you are routinely querying your users table.

```ruby
User.where(email: user.email)
```
Rails always automatically adds an index to an ID field, but in this case we try to find a string based on another field. If you do this often enough, you should almost certainly add an index of this data.

```rails
class AddEmailIndexToUsers < ActiveRecord::Migration
  def change
    add_index :users, :email, unique: true
  end
end
```
Another classic example of the need to add an index to increase performance is when you join database tables on two nested rows. For instance: all users joined by email address to a table of profiles.

```rails
class User < ActiveRecord::Base
  has_many :profiles, foreign_key: 'email', primary_key: 'email'
end
```
If either the Users or Profiles table has a large number of rows this query will not perform well because the database is having to scan every record in the profiles table to check for a match against the email from the users table. This is easily fixed by adding an index to the email column on the profiles table. Now, instead of having to go through every row in the profiles table, the database can just look up the email in the index and go right to the row we care about.

If you think to add an index to every database table column, don’t do that. There is a performance hit with indexes. Although select queries can be significantly faster, inserts and updates are marginally slower because there is overhead in maintaining the index. However the small impact (milliseconds) during an insert is usually better for what could be seconds (or even minutes) saved on certain queries.

## Let's sum up Active Record Tips

When your app grows in size and complexity, and you ignore unnecessary SQL, it can become a real problem on your application’s performance. Each SQL query includes a round-trip back to the database, which involves, as a rule, at slightest a millisecond, and in some cases much more for complex WHERE clauses. One extra check isn’t a big deal. But if it suddenly happens in every row of a table or a partial in a collection, you’ve got a big issue.

ActiveRecord is a powerful tool, but we need to be aware of how it works internally to avoid database access in unnecessary cases.

**If you have any questions about increasing Rails application performance or you are interested in developing your own highly-scalable app** - [contact us.](https://activebridge.org/contact)
