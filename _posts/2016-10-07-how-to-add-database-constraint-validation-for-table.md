---
author: Vitalii Kovtun
author-position: Full - stack developer
background: how-to-add-database-constraint-validation-for-table-back
category: engineering
date: "2016-10-07"
description: Database Constraint Validation for Table
layout: post
post-id: how-to-add-database-constraint-validation-for-table
title: How to add database constraint validation for table
time-to-read: 5 min
scripts: [post]
---

It is not a secret, that even having validations in **Ruby on Rails application** models through checking the uniqueness, two separate, but identical objects, can be saved to the database. This happens in services within subsequently full of users, which can simultaneously connect to the common database and write two similar records at the same time. Then validation at the application level definitely fails and the creation of the object is successfully performed. When that happens, there are problems persist with core functionality and consequences may summon a disaster.

To avoid such coincidences and to provide yourself with this kind of errors, I decided to look for methods at ruby gems communities. I found several decisions, but even if we can take some of them into our account, it would be much better to set the configuration of the database instead of adding new additional dependencies to the gemfile.

Besides, I did not want to resort to usual model uniqueness validation. After all, it actually asks for the entire database and completely check it in order to establish a uniqueness of an attribute, and only then raises a 
message of produced errors. In this case, the excess request is unnecessary, and the right decision would be possible to get rid of it, turning on only validation at the database level.

For a visual example, we can use the most common database – **PostgreSQL**, but to compare, it is ok to use any other **MySQL**-type base. Let us take a simple association without any validations.

```ruby
class User < ActiveRecord::Base
	has_many :projects
end
class Project < ActiveRecord::Base
	belongs_to :user
end
```

User can have many projects, and the project belongs to user. In this case, the Rails migration will be as follows.

```ruby
  class CreateUser < ActiveRecord::Migration
    def change
      create_table :users do |t|
        t.string :first_name
        t.string :last_name
        t.string :slogan
       end
     end
	  end
  class CreateProject < ActiveRecord::Migration
    def change
      create_table :projects do |t|
        t.string :statement
        t.string :description
        t.string :state
        t.references :user
      end
    end
  end
```

But the final table **:projects**, of course, will be run with certain constraints. This migration creates a table with an additional field type of **:integer – :user_id**, by the value of which every project will be owned to the appropriate user in the table :users. This column is the primary key of the table, and declaring it as such, works as constraint.

We can add more validations to our model.

```ruby
  class User < ActiveRecord::Base
    has_many :projects, dependent: :destroy
    validates :first_name, last_name, :slogan, length: { minimum: 4, maximum: 16 }, presence: true
    validates :first_name, uniqueness: { scope: :last_name }
  end
  class Project < ActiveRecord::Base
    belongs_to :user
    enum state: [ :active, :inactive ]
    validates :statement, :description, :state, :user, presence: true
    validates :statement, uniqueness: { case_sensitive: false }
    validates :state, inclusion: { in: %w(active inactive) }
  end
```
We specify that user must have** :first_name, :last_name and :slogan** filled in, their length can not be less that **4 symbols, more than 16 symbols**, as well as it's named order can not be matched in the database among other users. At the same time, we point out, that the project should have :statement, :description and :state, unique :statement, :user_id, and it's :state must be either 'activated' or' deactivated'. In addition, we set the dependence on the cascade deleting of all the projects with destroying of the parent user, which they depend on.

Migration, in its turn, also offers several optional constraints, that we can use usefully.

```ruby
  class CreateUser < ActiveRecord::Migration
    def change
      create_table :users do |t|
        t.string :first_name, limit: 16, null: false
        t.string :last_name, limit: 16, null: false
        t.string :slogan, null: false
      end
    end
  end
  class CreateProject < ActiveRecord::Migration
    def change
      create_table :projects do |t|
        t.string :statement, null: false
        t.string :description, null: false
        t.string :state, default: 'active', null: false
        t.references :user, null: false
      end
    end
  end
```
Following this migrations, even after removing validations from the models, saving records to the database, by all means, will not be carried out, until all the necessary conditions, set out inside the migration, will be properly performed. But in the end, it does not apply to our main goal – the uniqueness checkup.

So, speaking about indexes. Indexes in the database are not constraints at all. Their base purpose is all about to speed up queries.

```ruby
  class AddProjectIndexes < ActiveRecord::Migration
    def change
      add_index :projects, :user_id
    end
  end
```

Same result will bring to write code through pure SQL commands within execute method.

```ruby
  class AddProjectIndexes < ActiveRecord::Migration
    def up
      execute 'create index user_id_idx on projects (user_id)'
    end
    def down

execute 'drop index user_id_idx'
    end
  end
```
And here is required SQL code to check uniqueness of an object at the database level, we can replace model validation with.

```ruby
  class AddProjectConstraints < ActiveRecord::Migration
    def up
      execute 'alter table projects add constraint unique_statement unique (statement)'
    end
    def down
       execute 'alter table projects drop constraint unique_statement'
    end
  end
```
Typical writing of migration defines the value of the specific column as a unique by automatically adding a unique index. Based on the official **PostgreSQL** documentation, this method is the most suitable and optimal for the realization of the uniqueness validation to prevent duplicating values. So, when the system will try to save a record, identical to already existing one, the system will cause an error and equal record will not be saved again.
