---
author: Viktor Shmigol
author-position: Lead Ruby on Rails developer
background: how-easily-integrate-rails-actioncable-into-your-angular2-ionic2-application-back
category: engineering
date: "2016-12-01"
description: Guide to Integrate Rails' Actionable into your Angular2
layout: post
post-id: how-easily-integrate-rails-actioncable-into-your-angular2-ionic2-application
title: How easily integrate Rails' ActionCable into your Angular2/ionic2 application
time-to-read: 9 min
scripts: [post]
---

**ActionСable** is easily integrated WebSockets with the Rails application parts. It allows you to write real-time functionality with Ruby style according to the rest Rails application functionality, at the same time being productive and scalable. It is a full stack, including the client framework in JavaScript and server-side framework in Ruby. You get access to the models, written with Active Record or other ORM.
So what’s the point of this post? I am gonna create a chat application on base Rails+Ionic2, note for angular2 it's same. And tell how easily integrate Rails ActionCable into your Angular2/ionic2 application.
The Ionic Framework enables the creation of cross-platform mobile applications with HTML, CSS, and JavaScript(Angular). Ionic 1 was built withAngular 1.*, and with Angular 2 recently released, the second major version of Ionic is also imminent.
Ionic 2 has just hit Release Candidate stage, and if you are looking to build cross-platform apps quickly, and you already know Angular 2 or JavaScript, this guide will get you up to speed.

So, first of all, let’s initialize a new rails application:

**rails new chat --api -d postgresql
rails db:create**

Well done, now we should add gemfiles. A Gemfile is a file we create which is used for describing gem dependencies for Ruby programs. Your Gemfile should always be in the root of your project directory, this is where Bundler expects it to be and it is the standard place for any package manager style files to live. It is useful to note that your Gemfile is evaluated as Ruby code. When it is evaluated by Bundler the context it is in allows us access to certain methods that we will use to explain our gem requirements.

>  2. Gemfile

```ruby
  source 'https://rubygems.org'
  ruby '2.3.1'


  gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
  gem 'pg', '~> 0.18'
  gem 'puma', '~> 3.0'
  gem 'active_model_serializers'
  gem 'decent_exposure', '~> 3.0.0'
  gem 'kaminari'
  gem 'redis'
  gem 'rack-cors', require: 'rack/cors'

  group :development, :test do
    gem 'pry'
    gem 'rspec-rails', '~> 3.5'
    gem 'rspec-collection_matchers'
    gem 'factory_girl_rails'
    gem 'rubocop'
    gem 'simplecov', require: false
    gem 'database_cleaner'
    gem 'shoulda-matchers'
    gem 'faker'
  end

  group :development do
    gem 'listen', '~> 3.0.5'
    gem 'spring'
    gem 'spring-watcher-listen', '~> 2.0.0'
    gem 'rubocop'
  end

  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```


The next step of our development is including AbstractController.

> 3. AbstractController::Helpers to application_controller.rb it needs for gem 'decent_exposure'

```ruby
   controllers/application_controller.rb:

      #frozen_string_literal: true
    class ApplicationController < ActionController::API
      include AbstractController::Helpers
    end
```

After that to create V1::Base controller


> 4. V1::Base controller

 ```ruby
	controllers/v1/base_controller.rb:

     #frozen_string_literal: true
    class V1::BaseController < ApplicationController
      private

      def render_api(object, status = :ok)
        if object.respond_to?(:errors) && object.errors.present?
          render json: { message: object.errors.full_messages.to_sentence }, status: :unprocessable_entity
        else
          render json: object, status: status
        end
      end
    end
```



> 5. Now create a new chat channel

```ruby
  channels/chat_channel.rb:

  #frozen_string_literal: true
  class ChatChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'chat'
    end
  end
```


> 6. Create a message model:
  rails g model message body:text sender:string

```ruby
    models/message.rb:

    #frozen_string_literal: true
    class Message < ApplicationRecord
      validates :body, :sender, presence: true

      after_create :broadcast

      private

      def broadcast
        ActionCable.server.broadcast('chat', as_json.merge(action: 'CreateMessage'))
      end
    end
```


> 7. Run rails db:migrate


> 8. Create a messages controller:

```ruby
    controllers/v1/messages_controller.rb:

    #frozen_string_literal: true
    class V1::MessagesController < V1::BaseController
      expose :message
      expose :messages, -> { Message.order(created_at: :desc).page(params[:page]).per(15) }


      def index
        render_api(messages)
      end


      def create
        message.save
        render_api(message, :created)
      end


      private


      def message_params
        params.require(:message).permit(:body, :sender)
      end
    end
```


> 9. Create a message serializer
  rails g serializer message

```ruby
   serializers/message_serializer.rb

    #frozen_string_literal: true
    class MessageSerializer < ActiveModel::Serializer
      attributes :id, :body, :sender, :created_at, :updated_at
    end
```


> 10. Add routes

 ```ruby
 config/routes.rb:

 #frozen_string_literal: true
  Rails.application.routes.draw do
    mount ActionCable.server => '/cable'
    scope 'api' do
      namespace :v1 do
        resources :messages, only: [:index, :create]
      end
    end
  end
```


> 11. Initialize gem 'rack-cors'

 ```ruby
   config/application.rb:

    #frozen_string_literal: true
    require_relative 'boot'


    require 'rails'
    #Pick the frameworks you want:
    require 'active_model/railtie'
    require 'active_job/railtie'
    require 'active_record/railtie'
    require 'action_controller/railtie'
    require 'action_mailer/railtie'
    require 'action_view/railtie'
    require 'action_cable/engine'
    # require "sprockets/railtie"
    require 'rails/test_unit/railtie'


    # Require the gems listed in Gemfile, including any gems
    # you've limited to :test, :development, or :production.
    Bundler.require(*Rails.groups)


    module Ng2CableExample
      class Application < Rails::Application
        config.api_only = true


        # Enable CORS
        config.middleware.use Rack::Cors do
          allow do
            origins '*'
            resource '*', headers: :any, methods: [:get, :post, :options, :put, :patch, :delete]
          end
        end
      end
    end
```

> Disable protection and allow requests from any origin:

```ruby
  config/initializers/action_cable.rb

   #frozen_string_literal: true
  Rails.application.config.action_cable.disable_request_forgery_protection = true
```

> 12. Initialize rspec in rails app:
  rails generate rspec:install

```ruby
  spec/rails_helper.rb:

  #frozen_string_literal: true
  ENV['RAILS_ENV'] ||= 'test'
  require File.expand_path('../../config/environment', __FILE__)
  #Prevent database truncation if the environment is production
  abort('The Rails environment is running in production mode!') if Rails.env.production?
  require 'spec_helper'
  require 'rspec/rails'
  require 'database_cleaner'
  require 'simplecov'
  require 'rspec/collection_matchers'


  ActiveRecord::Migration.maintain_test_schema!
  SimpleCov.start


  RSpec.configure do |config|
    Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
    config.fixture_path = "#{::Rails.root}/spec/fixtures"
    config.include FactoryGirl::Syntax::Methods
    config.include Requests::JsonHelpers, type: :controller
    config.use_transactional_fixtures = true
    config.infer_spec_type_from_file_location!
    config.filter_rails_from_backtrace!


    config.before(:suite) do
      DatabaseCleaner.clean_with(:truncation)
    end


    config.before(:each) do
      DatabaseCleaner.strategy = :transaction
    end
  end


  Shoulda::Matchers.configure do |config|
    config.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
```


> 14. Add json helper

```ruby
  spec/support/request_helpers.rb:

  #frozen_string_literal: true
  module Requests
    module JsonHelpers
      def json
        @json ||= JSON.parse(response.body)
      end
    end
  end
```


> 15. Create a message factory

```ruby
  spec/factories/messages.rb:

  #frozen_string_literal: true
  FactoryGirl.define do
    factory :message do
      body { Faker::Lorem.sentence }
      sender { Faker::Name.name }
    end
  end
```




> 16. Create

```ruby
  spec/controller/v1/messages_controller_spec.rb:

  #frozen_string_literal: true
  require 'rails_helper'


  RSpec.describe V1::MessagesController, type: :controller do
    let!(:message) { create(:message) }
    let(:message_params) { attributes_for(:message) }


    describe '#index' do
      it do
        get :index
        expect(json).not_to be_empty
      end
    end


    describe '#create' do
      it 'successfully create' do
        post :create, params: { message: message_params }
        expect(response).to be_success
      end


      it 'validation failed' do
        post :create, params: { message: { body: '' } }
        expect(response).to have_http_status(422)
      end
    end
  end
```


> 16. To make sure that it runs:
  rspec spec


So for back-end it's all. Let's start to build frontend

Ionic CLI and Cordova
To create Ionic 2 projects, you’ll need to install the latest version of the CLI and Cordova. Before you do that, you’ll need a recent version of Node.js. Download the installer for Node.js 6 or greater and then proceed to install the Ionic CLI and Cordova for native app development:
  npm install -g ionic cordova

Once that’s done, create your first Ionic app:
  ionic start chat --v2
  cd chat

Create chat page
  ionic g page chat

Add ng2-cable(https://github.com/victir/ng2-cable) to our project:
  npm install ng2-cable --save
  ionic serve

Add providers(Ng2Cable, Broadcaster)

```javascript
  src/app/app.module.ts:

  import { NgModule, ErrorHandler } from '@angular/core';
  import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
  import { FormsModule } from '@angular/forms';
  import { MyApp } from './app.component';
  import { AboutPage } from '../pages/about/about';
  import { ContactPage } from '../pages/contact/contact';
  import { HomePage } from '../pages/home/home';
  import { TabsPage } from '../pages/tabs/tabs';
  import { ChatPage } from '../pages/chat/chat';
  import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';


  @NgModule({
    declarations: [
      MyApp,
      AboutPage,
      ContactPage,
      HomePage,
      TabsPage,
      ChatPage
    ],
    imports: [
      IonicModule.forRoot(MyApp), FormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp,
      AboutPage,
      ContactPage,
      HomePage,
      TabsPage,
      ChatPage
    ],
    providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Ng2Cable,
      Broadcaster
    ]
  })
  export class AppModule {}
```

Subscribe to channel

```javascript
  src/app/app.component.ts:

  import { Component } from '@angular/core';
  import { Platform } from 'ionic-angular';
  import { StatusBar, Splashscreen } from 'ionic-native';
  import { Ng2Cable } from 'ng2-cable/js/index';
  import { TabsPage } from '../pages/tabs/tabs';


  @Component({
     template: '<ion-nav [root]="rootPage"></ion-nav>'
   })

  export class MyApp {
    rootPage = TabsPage;

    constructor(platform: Platform, private ng2cable: Ng2Cable) {
      platform.ready().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();
      });


      this.ng2cable.subscribe('https://ng2-cable-example.herokuapp.com/cable', 'ChatChannel');
      //By default event name is 'channel name'. But you can pass from backend field { action: 'MyEventName'}
    }
  }
```

Set chat page to main tab

```javascript
    src/pages/tabs.ts:

    import { Component } from '@angular/core';

    import { ChatPage } from '../chat/chat';
    import { AboutPage } from '../about/about';
    import { ContactPage } from '../contact/contact';


    @Component({
      templateUrl: 'tabs.html'
    })

    export class TabsPage {
      // this tells the tabs component which Pages
      // should be each tab's root Page
      tab1Root: any = ChatPage;
      tab2Root: any = AboutPage;
      tab3Root: any = ContactPage;

      constructor() { }
    }
```

Create messageService

```javascript

    src/services/message.ts:

    import { Injectable } from '@angular/core';
    import { Http } from '@angular/http';


    @Injectable()
    export class MessageService {
      public apiUrl = 'https://ng2-cable-example.herokuapp.com';

      constructor(private http: Http) {
      }

      query(page:any) {
        return this.http.get(`${this.apiUrl}/api/v1/messages?page=${page}`).map(res => {
          return res.json();
        });
      }

      create(message:any) {
        return this.http.post(`${this.apiUrl}/api/v1/messages`, message).map(res => {
          return res.json();
        });
      }
    }
```

Build Chat component

```javascript
  src/pages/chat.ts:

  import { Component, ViewChild } from '@angular/core';
  import { NavController, Content } from 'ionic-angular';
  import { MessageService } from '../../services';
  import { Broadcaster } from 'ng2-cable/js/index';

  @Component({
    selector: 'page-messages',
    templateUrl: 'chat.html',
    providers: [MessageService]
  })

  export class ChatPage {
    @ViewChild(Content) content: Content;
    public messages: any[] = [];
    public page: number = 1;
    public currentSender: any;
    public message: any = {};

    constructor(private messageService: MessageService,
                private broadcaster: Broadcaster,
                public navCtrl: NavController) {}

    ionViewDidLoad() {
      this.checkUser();
      this.loadMessages();
      this.content.scrollToBottom();

      // init listener
      this.broadcaster.on<string>('CreateMessage').subscribe(
        message => {
          this.messages.push(message);
          this.content.scrollToBottom();
          console.log(message);
        }
      );
    }

    loadMessages() {
      this.messageService.query(this.page).subscribe(
        (messages) => {
          this.messages = messages.reverse().concat(this.messages);
        }
      );
    }

    createMessage() {
      this.message['sender'] = this.currentSender;
      this.messageService.create({message: this.message}).subscribe(
        ()=> {
          this.message = {};
        }
      );
    }

    checkUser() {
      if (this.getCurrentSender()) {
        this.currentSender = this.getCurrentSender();
      } else {
        this.currentSender = prompt('Please enter your nickname', 'Active user');
        if (this.currentSender) {
          localStorage.setItem('currentSender', this.currentSender);
        }
      }
    }

    getCurrentSender() {
      return localStorage.getItem('currentSender');
    }
  }
```

Build html template

```html

  src/pages/chat.html:

  <ion-header>
    <ion-navbar>
      <ion-title>Chat</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content  padding>
    <div class="nano has-scrollbar">
      <div #scrollContainer class="nano-content pad-all" >
        <ul class="list-unstyled media-block">
          <li class="mar-btm" *ngFor="let message of messages">
            <div class="media-left" [ngClass]="{'media-left': message.sender != currentSender, 'media-right': message.sender == currentSender}">
              <img [src]="message.sender == currentSender ? 'assets/img/avatar2.png': 'assets/img/avatar1.png'" class="img-circle img-sm" alt="Profile Picture">
            </div>
            <div class="media-body pad-hor" [ngClass]="{'speech-right': message.sender == currentSender}">
              <div class="speech">
                <a href="#" class="media-heading">{{message.sender}}</a>
                <p>{{message.body}}</p>
                <p class="speech-time">
                  <i class="fa fa-clock-o fa-fw"></i>
                  {{message.created_at | date: 'shortTime'}}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <form name="sendMessageForm" (submit)="createMessage()">
      <ion-grid>
        <ion-row>
          <ion-col width-90>
            <ion-item>
              <ion-label color="primary" floating>Enter your text</ion-label>
              <ion-input [(ngModel)]="message.body" name="body"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col width-10>
            <button [disabled]="!message.body" ion-button icon-right>Send</button>
          </ion-col>
        </ion-row>
      </ion-grid>
      </form>
    </ion-toolbar>
  </ion-footer>
```
If you have any questions, feedback or corrections for this article, please do get in touch with myself or the Active Bridge team.
Angular2+rails Demo: https://ng2-cable-example.herokuapp.com

If you have a GitHub profile please leave a star on these repositories:
   ng2-cable: https://github.com/viktor-shmigol/ng2-cable
   Ionic2 example github: https://github.com/viktor-shmigol/ng2-cable-ionic2-example
   Rails + Angular2 example github:  https://github.com/viktor-shmigol/ng2-cable-example
