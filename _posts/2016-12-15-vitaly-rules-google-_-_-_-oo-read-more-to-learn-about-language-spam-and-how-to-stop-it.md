---
autor: Dasha
autor-position: marketing director
background: vitaly-rules-google-oo-read-more-to-learn-about-language-spam-and-how-to-stop-it-back
category: business_growth
date: "2016-12-15"
description: What is this Vitaly Rules Google stuff?
layout: post
post-id: vitaly-rules-google-oo-read-more-to-learn-about-language-spam-and-how-to-stop-it
title: Read more to learn about language spam and how to stop it
time-to-read: 3 min
scripts: [post]
---

## Vitaly rules google - Google Analytics Spam
Does **"Vitaly rules google ☆*:｡゜ﾟ･*ヽ(^ᴗ^)ﾉ*･゜ﾟ｡:*☆ ¯\_(ツ)_/¯(ಠ益ಠ)(ಥ‿ಥ)(ʘ‿ʘ)ლ(ಠ_ಠლ)( ͡° ͜ʖ ͡°)ヽ(ﾟДﾟ)ﾉʕ•̫͡•ʔᶘ ᵒᴥᵒᶅ(=^ ^=)oO"** appear in your Google Analytics language reports? .

Hi, everyone and who’s faced with this  "Vitaly rules google ☆*:｡゜ﾟ･*ヽ(^ᴗ^)ﾉ*･゜ﾟ｡:*☆ ¯\_(ツ)_/¯(ಠ益ಠ)(ಥ‿ಥ)(ʘ‿ʘ)ლ(ಠ_ಠლ)( ͡° ͜ʖ ͡°)ヽ(ﾟДﾟ)ﾉʕ•̫͡•ʔᶘ ᵒᴥᵒᶅ(=^ ^=)oO" language spam.

![Vitaly rules google - Google Analytics Spam](https://i.imgur.com/Y7Ip9ke.jpg)

Google Trands Statistic. Increasing of interrogation rate "Vitaly rules google ☆*:｡゜ﾟ･*ヽ(^ᴗ^)ﾉ*･゜ﾟ｡:*☆ ¯\_(ツ)_/¯(ಠ益ಠ)(ಥ‿ಥ)(ʘ‿ʘ)ლ(ಠ_ಠლ)( ͡° ͜ʖ ͡°)ヽ(ﾟДﾟ)ﾉʕ•̫͡•ʔᶘ ᵒᴥᵒᶅ(=^ ^=)oO "

![Google Trands](https://i.imgur.com/nLpGCDY.jpg)


## What is this Vitaly Rules Google stuff?

Vitaly rules google ☆*:｡゜ﾟ･*ヽ(^ᴗ^)ﾉ*･゜ﾟ｡:*☆ ¯\_(ツ)_/¯(ಠ益ಠ)(ಥ‿ಥ)(ʘ‿ʘ)ლ(ಠ_ಠლ)( ͡° ͜ʖ ͡°)ヽ(ﾟДﾟ)ﾉʕ•̫͡•ʔᶘ ᵒᴥᵒᶅ(=^ ^=)oO is a new generation of Google Analytics spam. Previously spammers would mostly pollute the source/medium dimension in GA, but recently they spilled over to other dimensions. If you're checking sessions with that browser language, be sure, your analytics account has been a victim of spammers.
Have I scared you? I’m sorry, but you should understand there is nothing you can do with your site or server (.htaccess rules, WP plugins, firewalls, etc.) as it’s a ghost traffic bypassing your server and targets Google Analytics directly using "Measurement Protocol". Unlike regular bot spam, ghost traffic appears only in your GA reports.

## Can traffic from language spam hurt your site?

Traffic, registering session with language "Vitaly rules google ☆*:｡゜ﾟ･*ヽ(^ᴗ^)ﾉ*･゜ﾟ｡:*☆ ¯\_(ツ)_/¯(ಠ益ಠ)(ಥ‿ಥ)(ʘ‿ʘ)ლ(ಠ_ಠლ)( ͡° ͜ʖ ͡°)ヽ(ﾟДﾟ)ﾉʕ•̫͡•ʔᶘ ᵒᴥᵒᶅ(=^ ^=)oO"in your language reports poses doesn’t harm your site directly. Otherwise, there is the indirect harm caused by the data pollution, as a result, it’s hard to estimate important data with your GA account. Sometimes it’s dangerous for smaller sites, as it represents a higher percentage of their overall traffic and leads to a misunderstanding statistic reports. 

## How can I stop or block language spam?

As I understand the recommended way is to setup view filters in Google Analytics. Where you include only the valid hostnames of your web resource and exclude the Language dimension, filtering out invalid language strings. This is the easiest and most scalable solution (scalable to an extent). 

## How to Remove Google Analytics Language Spam?

Block Spam with a View-level Filter
Setting up a view-level filters is fairly simple, but it should be noted that this is a permanent change going forward, so do be careful when using it, especially if you have little prior experience with view filters. The filter I propose will filter out any traffic (hits) where the language dimension contains 15 or more symbols. Since most legitimate language settings sent by browsers are 5-6 symbols and rarely is there traffic with 8-9 symbols in this field, it should only filter out language spam.
Regular expression we’ll use looks like this:

> .{15,}|\s[^\s]*\s|\.|,|\!|\/

Follow this algorithm to remove GA Spam

![Add filter to view](https://i.imgur.com/iXZgwz9.jpg)

Make sure to filter to the “Language Settings” dimension. You need “Edit” access at the “Account” level in Google Analytics in order to set up new filters, so make sure you have that, or you won’t even see the setup.
You can use the “Verify Filter” option to see how it would affect data from the last few days.
