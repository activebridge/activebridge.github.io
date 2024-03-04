---
author: Andriy Pedan
author-position: Ruby on Rails developer
background: telegram-case-study-how-to-create-a-taxi-booking-telegram-bot-with-ruby-on-rails-back
category: engineering
date: "2022-02-09"
description: "Telegram Bot With Ruby on Rails: Taxi Booking Case"
layout: post
post-id: telegram-case-study-how-to-create-a-taxi-booking-telegram-bot-with-ruby-on-rails
title: Telegram Case Study - How To Create a Taxi Booking Telegram Bot With Ruby on Rails
time-to-read: 6 min
scripts: [post]
---

Telegram occupies a unique place in the social media landscape. It's famous for its robust privacy and security, message delivery speed, and rich communication features. However, we're not here to advertise Telegram but rather to highlight a case study of how the platform supports engaging chatbots. 

In recent years, this privacy-focused messaging platform has attracted the attention of all kinds of businesses looking to offer chatbots to their customers. Today, we're going to be looking at one such company. We were approached by a Taxi company looking to provide their customers with an online cab booking service. Our developers chose Telegram for the cab booking chatbot because the Taxi company's target audience actively uses this messenger platform (it's one of the top three most used applications in the country!). 

With this in mind, let's dive into why Telegram is a popular choice for chatbot-seeking companies and how we combined Telegram with Ruby on Rails to help a Taxi company achieve its goals.

## Why is Telegram Becoming More and More Popular?

Telegram is now the 10th most used social media platform worldwide and appears to be snowballing in popularity every year. In January 2021, the platform had passed the 500 million monthly active users (MAU) milestone, and this figure is expected to reach a whopping [1 billion in 2022](https://cybercrew.uk/blog/telegram-statistics/ ). But why is Telegram managing to attract so many new users? 

![`monthly active users Telegram | Active Bridge`](https://i.imgur.com/TfUHUyc.png)

A lot was going on in the world when Telegram surpassed 500 MAU, and analysts believe several key events played a role in the app's user boost. Essentially, the unique social, political, and economic landscape of the last few years has contributed to Telegram's success.

In a world thrown into social isolation due to the COVID-19 pandemic, people were forced to shift the majority of their communication online. And while the messaging giants Facebook and WhatsApp might seem like the obvious choice for this predicament, user sentiment towards these companies is trending downwards. The major social networks and messengers have been accused of non-transparent policies or have been the focus of high-profile data breaches. In other words, users no longer trust Facebook and Twitter. 

Around this time, WhatsApp received massive public backlash for its controversial privacy policy update. This update forced users to agree to share their personal data, including phone numbers, transaction data, and logs of how they interact with the app with Facebook or lose access to the app. 

Privacy rights were also a hot topic during this time for several reasons. Then sitting President Trump was banned from Twitter, and Apple removed right-wing focused social media app Parler from the App Store. These two events happened shortly after the Capitol riot on January 6, 2021, and Telegram gained 25 million new users in [72 hours](https://www.telegraph.co.uk/technology/2021/01/11/trump-supporters-flock-messaging-app-telegram-parler-goes-offline/ ). If that wasn't enough, a total of 169.28 million people joined Telegram in [the first quarter of 2021](https://www.statista.com/statistics/1260684/telegram-global-downloads-by-region/ ). 

More recently, Telegram announced they added 70 million new users during the recent [Facebook outage in October](https://www.theverge.com/2021/10/6/22712191/telegram-70-million-new-users-facebook-outage-surge-whatsapp ). 

## Why Do People Like Telegram?

So far, we've discussed the climate that led so many users to download Telegram, but what keeps them around? What specific features do users like?

### Performance Speed

Telegram allows vast amounts of data and files to be stored on a special server, essentially becoming a free cloud storage service for many users. Additionally, users can access their account from any connected device, making the app more multi-platform friendly than, for example, Whatsapp. Lastly, the app functions well on any device, even those with weak internet connections. 

### Accessibility

It's free, and we mean totally free. Users can download various materials, use additional features like secret messages, stickers, and file storage, without spending a penny.

### Small but Mighty

Telegram built the app according to Material Design principles. This minimalistic design approach focuses on being bold, descriptive, and purposeful while eliminating clutter. The app has a simple user interface that allows users to solve issues quickly and with the minimum number of clicks. Another huge plus is the size of the application - it's considerably smaller than competitors like WhatsApp and Viber. 

### Security

Telegram supports heavily encrypted conversations and has done so since its launch. Voice calls and group chats are end-to-end encrypted, and the app offers extra privacy measures like time-based self-destructive messages, files, and photos. In addition, they offer real-time secure and distributed cloud storage, login passwords, and two-factor authentication.

### Bots

People can use bots to enhance the functionality of Telegram and offer different user experiences. Third-party developers create bots using a dedicated API, and these bots can be programmed to respond to specific commands in personal and group chats. The bots can also leverage the internet or perform particular tasks. Telegram bots typically fall into two categories - entertainment or business. Entertainment bots can do things like help users search lyrics, download music, or play games with friends. And business bots can be varied in their purpose. For example, you can get project management bots, time-management bots, customer service bots, and of course, bots with a specific use case like the cab booking chatbot we'll be looking at in the next section.

![`Telegram features users like | Active Bridge`](https://i.imgur.com/k8NBDnM.png)

## Active Bridge Case Study – Telegram Bot for Taxi Booking Service

We received a request from the client, a local electric taxi company operating in one of Ukraine's cities. The company already had a website and mobile app for booking cabs. However, after conducting research, they felt that launching a Telegram bot would help increase the number of orders and make life easier for their customers. There were two main reasons behind this belief:

1. Chatbots have become more popular in recent years for several reasons, but one of the primary reasons is that users are getting tired of apps. People don't want to clog up their devices with several 10s or even 100s of apps for every service they use, and it becomes even more frustrating when users feel they need to download an app for one-time use. In addition, downloading a new app takes time and effort. Chatbots solve this problem and provide convenience because they can function on different planes and channels.

2. Businesses need a reliable customer service function in today's highly competitive business environment. By introducing efficient chatbots, companies can handle vast numbers of customer requests all in one channel. 

Interestingly, today, 41.3% of consumers use conversational marketing tools (chatbots) for purchases, and this figure is up 17.1% since 2019. This upwards trend suggests that chatbots aren't just useful for customer service but can deliver in other areas like sales. Additionally, research shows that a significant 33% of consumers would like to use chatbots for reservations. In other words, a chatbot seemed like the obvious solution to the company's problem. Next, we just had to decide which communication platform and technology stack to use. 

We decided to create a Telegram chatbot because Telegram was the most popular messenger among the users of this taxi service. We also decided to use the Ruby on Rails programming language due to its many benefits - it's cost-effective, improves productivity, is easy to maintain, and is safe and secure. 

### The Task

1. Develop a Telegram chatbot with Ruby on Rails, allowing users to book a cab.
2. Ensure that the chatbot has the same functionality as the application. For example, the users must be able to order a cab from point A to point B, add waypoints (additional stops) between the departure point and destination. In addition, users must be able to leave a comment and offer tips.
3. Create an opportunity for new users to register via the Telegram bot.

### The Solution

1) Taxi booking Telegram Bot was added to an already existing taxi booking project implemented on Rails. The technology stack used was

* Ruby 2.4.1
* Rails 2.2.2
* PostgreSQL

2) To implement the Telegram bot, we used the telegram-bot gem, which you can [find here](https://github.com/telegram-bot-rb/telegram-bot).

3) To communicate with our backend, we implemented a controller named Api::WebhooksController that accepts webhooks from the Telegram bot. Events::Bot::Reply service handles accepted parameters. Events::Bot::Reply service parses commands sent by the user to the Telegram bot and provides responses using the TelegramOrder service.

Api::WebhooksController that accepts webhooks from telegram bot.

```
module Api
  class WebhooksController < ApiApplicationController
    def update
      Events::Bot::Reply.(params['message'].merge(cards_url: new_card_url) || params['callback_query'])
      head 200
    end
  end
end
```

Events::Bot::Reply service parses commands sent by user to telegram bot and provides some response using TelegramOrder service:

```
module Events
  module Bot
    class Reply < BaseEvent
      COMMANDS =  { start: 'start',
                    U0001F696: 'book',
                    U0001F44C: 'correct',
                    U0001F6AB: 'cancel',
                    U0001F197: 'go',
                    U0001F504: 'try_again',
                    U0001F44D: 'yes',
                    U0001F44E: 'no' }.freeze
      COMMANDLESS_STEPS = %w[waypoints_confirmation comment_confirmation comment rate_trip tips trips_payment].freeze
      CONFIRMATION_COMMANDS = %w[yes no].freeze

      private

      def parse_command(text)
        return unless text
        key = text.eql?("/start") ? "start" : text[0].to_yaml.gsub!(/[^0-9A-Za-z]/, '')
        COMMANDS[key.to_sym] if COMMANDS.keys.include?(key.to_sym)
      end

      def request_departure_address
        process_address(@text, 'departure')
      end

      def request_destination_address
        process_address(@text, 'destination')
      end

      def waypoints_confirmation
        @command == 'yes' ? telegram_order.confirm_waypoints : telegram_order.update_step(:comment_confirmation)
      end

      def telegram_order
        @telegram_order ||= TelegramOrder.new(current_user)
      end
```

TelegramOrder service provides responses to chat:

```
class TelegramOrder
  UPDATABLE_STEPS = { request_departure_address: :request_destination_address,
                      request_destination_address: :waypoints_confirmation,
                      waypoint: :waypoints_confirmation }.freeze
  METERS_IN_KILOMETERS = 1000

  attr_reader :user

  def initialize(user)
    @user = user
  end

  def perform(command)
    send(command)
  end

  def start
    return send_message(:request_contact) unless @user.persisted?
    return send_message(:start) unless unpaid_trips?
    self.step = :trips_payment
    send_message(:unpaid_trips)
  end

  def send_message(action)
    reply(:send_message, action)
  end

  def reply(action, message, args = {})
    @user.reply(action, message, args)
  end

  def book
    self.trip = { telegram_trip: true }
    update_step(:request_departure_address)
  end

  def confirm_waypoints
    send_message(:request_waypoint_address)
    self.step = :initial_waypoint
  end
```

Temporary data stores on Redis:

```
def trip
    JSON.parse(Redis.current.get("trip_#{@user.id}") || '{}', symbolize_names: true)
  end

  def trip=(attrs)
    Redis.current.set("trip_#{@user.id}", attrs.to_json)
  end

  def feedback
    JSON.parse(Redis.current.get("feedback_#{@user.id}") || '{}', symbolize_names: true)
  end

  def feedback=(attrs)
    Redis.current.set("feedback_#{@user.id}", attrs.to_json)
  end
```

4) Registration is required to use the Taxi booking service via the Telegram bot. We designed the bot to ask users for their phone number and credit card to facilitate this. If the user is registered, they can log in by using their phone number. However, if they are unregistered, the bot will send a link so the user can complete the registration form.

5) The user flow of the chatbot looks like this:

* Specify departure address.
* Specify waypoints between departure and destination.
* Specify destination address.
* Leave a comment for the driver.
* Leave feedback on the service.
* Leave a tip.

### Outcomes

1. We made a user-friendly interface for ordering a cab and got closer to the target audience of the company - it's much faster and more convenient to go into your messenger than searching for the site, downloading the app, or searching for it on your phone.
2. We reduced the average order time - it can be done in only a few clicks and takes under one minute.
3. The number of orders increased by ~10% during the 2-week test period of the bot.

## Final Thoughts

If your company is interested in developing a taxi booking app or any other chatbot to serve your customers better, you can check out some ways to do that[ here](https://activebridge.org/blog/how-to-build-uber-car-animation-using-mapbox-markers-76a9aa42-82b5-4a3d-bd65-c96cf2b9d0cf). Alternatively, you can email us for more information on chatbot solutions. Our dedicated specialists are always ready to help!
