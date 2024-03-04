---
author: Alex Galushka
author-position: CEO / Tech lead and backend developer
background: image-zoom-on-pure-css-back
category: engineering
date: "2016-12-21"
description: Image Zoom on Pure CSS
layout: post
post-id: image-zoom-on-pure-css
title: How to zoom image with pure JavaScript
time-to-read: 3 min
scripts: [post]
---

When you are building an e-commerce website, especially a showcase, a website gallery, a template selling website ..., you always need many good images for using and giving your visitors/customers the detailed view of your images (or your product).
I believe that every shopping website has ability zoom the product image. All of them are using jQuery plugins  such as [jQuery Zoom](http://www.jacklmoore.com/zoom/) or [EasyZoom](https://i-like-robots.github.io/EasyZoom/)
After I think how would I implements this plugin I realized that we do not need jQuery for that. So let us go step by step and implement image zoom without jQuery.

We will have next html template:

```html
<figure class='zoom' style="background: image.jpg" onmousemove="zoom(event)">
    <img src="image.jpg">
</figure>
```

We will display a small image and set the background for figure element with the same image but without scaling. We are going to fade out the image and change background position of figure element based on cursor coordinates. 

Let us add some CSS first:

```css
figure.zoom {
  position: relative;
  width: 500px;
  overflow: hidden;
	cursor: zoom-in;
}
figure.zoom img {
  transition: opacity .5s;
  display: block;
	width: 100%;
}
figure.zoom img:hover { opacity: 0; }
```

Now let us implement `zoom` function to handle mousemove for our `figure` element:

```javascript
function zoom(event){
  var zoomer = event.currentTarget;
  x = event.offsetX/zoomer.offsetWidth*100
  y = event.offsetY/zoomer.offsetHeight*100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
```

It works fine on desktop but what about mobile let us add touch devices support.
We trigger our function on touchmove as well:

```html
<figure class='zoom' style="background: image.jpg" onmousemove="zoom(event)" ontouchmove="zoom(event)">
	<img src="image.jpg">
</figure>
```

We will change our js a bit to get right coordinates of touch:

```javascript
function zoom(e){
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX/zoomer.offsetWidth*100
  y = offsetY/zoomer.offsetHeight*100
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}
```

Now we got fully working image zoomer without jQuery or any additional plugins.
But wait, the post title is about pure CSS image zoom. Well, in is not actually true, but we can get rid of some javascript using the power of `CSS variables`.
At the moment of writing this post, css variables are supported in all browsers except Edge that currently is working in it's implementation.
![cssvars](https://s3.amazonaws.com/upload.screenshot.co/e46efc1725)

At this moment you can use the polyfill if you care about Edge.
Let us change our CSS a bit:

```css
figure.zoom {
  --bg-x: 50%;
	--bg-y: 50%;
	background-position: var(--bg-x) var(--bg-y);
  position: relative;
  width: 500px;
  overflow: hidden;
  cursor: zoom-in;
}
figure.zoom img {
  transition: opacity .5s;
  display: block;
	width: 100%;
}
figure.zoom img:hover { opacity: 0; }
```

In the JavaScript, we will set the value of variables instead of controlling background position.
JavaScript:

```javascript
function zoom(e){
  var zoomer = e.currentTarget;
  e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
  e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
  x = offsetX/zoomer.offsetWidth*100
  y = offsetY/zoomer.offsetHeight*100
  zoomer.style.setProperty('--bg-x', x + '%');
  zoomer.style.setProperty('--bg-y', y + '%');
}
```

If you need deep browser support you can stay on first variant of the code. The point of this post is to prompt developers to think twice before connecting heavy javascript libs from dinosaurs age because sometimes simple function is enough  
Here is the working example:

<iframe height='384' scrolling='no' title='Pure CSS image zoom' src='//codepen.io/galulex/embed/eNZRVq/?height=384&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
</iframe>
