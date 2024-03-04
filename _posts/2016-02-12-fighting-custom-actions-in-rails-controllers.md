---
author: Eugene Korpan
author-position:
background: fighting-custom-actions-in-rails-controllers-back
category: engineering
date: "2016-02-12"
description: FIGHTING CUSTOM ACTIONS IN RAILS CONTROLLERS
layout: post
post-id: fighting-custom-actions-in-rails-controllers
title: FIGHTING CUSTOM ACTIONS IN RAILS CONTROLLERS
time-to-read: 4 min
scripts: [post]
---

By now I have never seen a rails project which doesn't have custom actions in rails controllers. And that makes me upset.
Here I'm going to describe my thoughts about custom actions, why people use them, why I hate them and how to deal with them.
Let's say we want to build a simple posting system. We have already created a model Post and need to add a controller. Everybody knows about REST and we obviously want to build a RESTful application. So we create a controller:

```ruby
class PostsController < ApplicationController
  def index
     ...
  end
  def show
    ...
  end
    ...
  def destroy
    ..
  end
end
```

Also, add to routes.rb
  resources :posts
We can make it even easier and faster using rails generators: rails g scaffold Post title:string description:text
As a result, we have a RESTful controller with seven common actions. Since now users can add a new post, review existing, etc.Later on, we want users to be able to like posts. We find a great gem called acts_as_votable, follow the instruction and add the gem to the project.Now we think: "ok, there is already a PostsController and user can like a Post. It's just another action that user can perform on a Post so it makes sense to keep all actions related to the Post within PostsController" and add a custom action.

```ruby
class PostsController < ApplicationController
  ...
	def like
	  @post = Post.find(params[:id])
	  @post.liked_by current_user
	end
end
```

And add to routes.rb
resources :posts do  member do    post :like  endend
Great, it's a tiny nice action and now the user is able to like posts.Cool? NO!
We do like a post which seems like performing an action on a post but in fact, we create another resource - like.It's not so obvious right now but later on, when we'll need to add other actions (e.g. dislike, get all likes, etc) it will become much easier to see.And we'll see that all of those actions are RESTful actions with like resource. So the right approach would be to create a separate RESTful controller - LikesController. It makes, even more, sense to make it a nested resource of a post.

```ruby
class LikesController < ApplicationController
  ...
  def create
    @post = Post.find(params[:id])
    @post.liked_by current_user
  end
  def index
    @likes = @post.get_likes
  end
...
private
  def find_post
    @post = Post.find(params[:post_id])
  end
end
```
In routes.rb
resources :posts do  resources :likesend
As a result, we have two resources, two RESTful controllers and no custom actions.
I found that this mistake is usually made by new RoR developers and this one is far not the only case.Let's take a look at another example.
Let's say we are building an API for an events management system.We have a controller that is very like a PostsController.

```ruby
class EventsController < ApplicationController
  def index
    ...
  end
  def show
    ...
  end
    ...
  def destroy
    ...
  end
end
```
Also, add to routes.rb
resources :events
And we use ActiveModelSerializers to generate JSON objects.
The API works on behalf of a user and now we need to generate JSON of events that belong only to a user.This time, we think: "ok, last time we had a totally different resource 'like' but now we work exactly with events so it definitely must be in EventsController"

```ruby
class EventsController < ApplicationController
  ...
  def my_events
    json = ActiveModel::ArraySerializer.new( current_user.events,
    each_serializer: MyEventSerializer, root: nil)
    render json: json, status: :ok
  end
end
class MyEventSerializer < ActiveModel::Serializer
    attributes :id, :title, :descriptionend In routes.rb
    resources :events do
    collection do
    get :my_events
    end
end
```
Cool? NO!
Think!If "my events" JSON is just the same as "all events" JSON then it's worth thinking about some sort of filtering ability to the events_controller#index action.In our case, we added a separate serializer which means that "my events" JSON is different from "all events" JSON. I can bet that later MyEventsSerializer will change so often that "my event" object will be very different from "event" object, though they are both stored in one DB table. Later we'll also need to delete own events, etc.This is often happening as usually user has more permissions with his own events.It's not so obvious at first but event and my_event are separate resources. Even if they are both use the same model we have no idea how they are used by mobile apps or web-app. It's very likely that mobile app has different classes to wrap those jsons and it doesn't matter if they use inheritance they are instances of different classes.So it makes much more sense to simply create a separate controller in our rails API and extract all stuff related to "my event" into that controller.

```ruby
class MyEventsController < ApplicationController
  def index
    json = ActiveModel::ArraySerializer.new( current_user.events,
    each_serializer: MyEventSerializer, root: nil)
  render json: json, status: :ok
  end
  def show
    render json: MyEventSerializer.new(@event), status: :ok
  end
    ...
end
```
Our routes.rb
resources :eventsresources :my_events, only: [:index, :destroy, :show]
There are many cases when developers add custom actions to rails controllers and more application grow bigger controllers become. A lot of stuff begin to happen in a controller and you think "why is it here??? Why do we create books in AuthenticationController???..."I made a simple rule for myself: there shouldn't be custom actions in the RESTful application. Any custom action in one controller is a RESTful action in another.
When you are adding the eighth action to your controller think to yourself "maybe it makes more sense just to extract it to a separate controller"? Don't be lazy to create additional controllers! Don't overload controllers! Every controller should manage only it's own resource!
