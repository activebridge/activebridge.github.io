---
author: Oleg Voloshyn
author-position: Ruby on Rails engineer
background: how-to-implement-nice-image-uploader-to-tinymce-back
category: engineering
date: "2016-06-21"
layout: post
post-id: how-to-implement-nice-image-uploader-to-tinymce
post-title: "How to implement nice image uploader to TinyMCE"
time-to-read: 2 min
scripts: [post]
hidden: true

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "The text editor has earned its popularity due to the following factors"
title: "Implement Nice Image Uploader to Tinymce"
---

Nowadays, TinyMCE is considered to be one of the most popular text editors for HTML.
The text editor has earned its popularity due to the following factors:
1.      easy to install
2.      comprehensive and clear [documentation](https://www.tinymce.com/docs/)
3.      quite a large amount of [plugins](https://www.tinymce.com/docs/plugins/)


***TinyMCE + Rails 4***


To work with TinyMCE in Rails application we recommend using gem tinymce-rails.
All the instruction for the installation of the gem is greatly described in the [ReadMe](https://github.com/spohlenz/tinymce-rails):
However, we will pay our attention to the main points. Below is an example of the script `tinyMCE.init`



``` coffee
$(document).on 'page:load ready', ->
  tinyMCE.init
    plugins: ['image textcolor colorpicker codesample']
    toolbar: 'forecolor backcolor | image | codesample'
    selector: 'textarea.tinymce'
  return
```



Where:
`plugins` - list of included [plugins](https://www.tinymce.com/docs/plugins/)
`toolbar` - list and order of tools
`selector` - HTML element, to which TinyMCE will be linked up

***Ttypical mistake:*** *if you’re using `tinyMCE.init`, there is no need to create `tinymce.yml` file.*

***TinyMCE has an image uploader which is not very convenient***

![](https://storage7.static.itmages.com/i/16/0621/h_1466517221_7744747_0ea8984f1d.png)

We believe that one of the best solutions for this issue is a gem called [tinymce-rails-imageupload](https://github.com/PerfectlyNormal/tinymce-rails-imageupload).
Add to `Gemfile`



```ruby
gem 'tinymce-rails-imageupload', github: 'PerfectlyNormal/tinymce-rails-imageupload'
```



now we have to replace plugin from `image` to `uploadimage`, this also applies to the toolbar.
So far, our script looks like:



```coffee
$(document).on 'page:load ready', ->
  tinyMCE.init
    plugins: ['textcolor colorpicker codesample uploadimage']
    toolbar: 'forecolor backcolor | uploadimage | codesample'
    selector: 'textarea.tinymce'
  return
```



The next step is to create an action for uploading images



```ruby
  def upload_image
    upload = Cloudinary::Uploader.upload(params['file'])
    render json: { image: { url: upload['url'] } }, content_type: 'text/html'
  end
```



In this example, we’re using [Cloudinary](https://cloudinary.com/) for uploading, but you’re free to use whatever technology you prefer. And don’t forget about router!



```ruby
post '/tinymce_assets' => 'your_controller#upload_image'
```



*Image uploader window:*
![](https://storage6.static.itmages.com/i/16/0621/h_1466518387_8313748_5f45986a14.png)

*Results:*
![](https://storage4.static.itmages.com/i/16/0621/h_1466519010_9176819_73b4ae3e2f.png)
