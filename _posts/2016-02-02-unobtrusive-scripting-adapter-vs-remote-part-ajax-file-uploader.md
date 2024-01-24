---
autor: Alex Galushka
autor-position: CEO / Tech lead and backend developer
background: simple-way-to-create-public-pages-back
category: engineering
date: "2016-02-02"
description: A definitive guide to Rails’ unobtrusive JavaScript adapter
layout: post
post-id: unobtrusive-scripting-adapter-vs-remote-part-ajax-file-uploader
title: Unobtrusive scripting adapter vs Remotipart
time-to-read: 2 min
scripts: [post]
---

In this short instruction, I would like to share how to use AJAX file upload in Ruby on Rails. Many of web applications require an easy and common way to upload different type data. To solve this issue, Rails has nice Unobtrusive scripting adapter. It takes care of remote forms and links to your application. But in fact, I actually think, there is one point it can not handle: the AJAX file upload. It is the provide the routes.rb:

> get ':page', to: 'pages#show', as: :page
pages_controller.rb:

```ruby
class PagesController<Application Controller
def show
render params[:page]
end
end
```

ability to handle that to other libs by adding the custom event called`ajax: aborted: file`.


I've made some experiments with deep insight of this method.  I’ve found there is only one lib uses this event and provides the ability to upload files with remote forms. It's named the remote part. The remote part uses the iframe workaround. But there should be the other way to do it.
Firstly, I am thinking about the formData interface but it is not supported in by Internet Explorer. So there is only one alternative left - base64.

Let’s code some coffee:

```javascript
$(document).on 'ajax:aborted:file', 'form', (e, inputs) ->
j = 1
form = $(@
$.map inputs, (input, i) ->
fr = new FileReader()
fr.readAsDataURL(input.files[0])
fr.onload = ->
form.append("<input type='hidden' name='#{input.name}' value='#{fr.result}' />")
$.rails.handleRemote(form) if (inputs.length == j)
j++
return false
```


In such a way the files will be sending as base64 strings under same names. Next step is decoding the files on the server. We were using the carrier wave for file uploading and I've found the carrierwave-base64 gem that is doing exactly what I need.
Just add it to your Gemfile, and mount the uploader mount_base64_uploader :image, ImageUploader.
Also, it is one more additional step is to add the parameter filter to keep your logs clean.

> config.filter_parameters += [:image]

All browser is supported except IE9 and lower. In case IE9, the form will be submitted to regular HTML type.
I have extracted the javascript to separate rails gem. Also, it would be nice to have the rack middleware to encode the base64 string on middleware level.
