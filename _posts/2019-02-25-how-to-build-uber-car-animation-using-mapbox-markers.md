---
autor: Max Serebryansky
autor-position: Ruby on Rails developer
background: how-to-build-uber-car-animation-using-mapbox-markers-back
category: engineering
date: "2019-02-25"
description: Tips to Build Uber Car Animation Features in Your App
layout: post
post-id: how-to-build-uber-car-animation-using-mapbox-markers
title: How to Build Uber Car Animation Using Mapbox Markers
time-to-read: 2 min
scripts: [post]
---

As a full-stack developer, every time I see state-of-the-art features in mobile applications, I always try to figure out their core and implement in my work. On-demand mobile applications are currently attracting a lot of interest at both the customers and developers levels. Nowadays Uber app is one of the most popular mobile applications, that’s gained more attention. Because of its user experience and development solutions.  Every local business wants an Uber-like taxi app or its clone.  

Coincidentally, my current project is a local Ukranian startup CabLook Taxi. The team has developed an Uber-like application based on local audience needs. Here are a lot of unique features and solutions in this app, but some Uber-like features also exist. 

In this article, I’m going to share how we designed Uber car animation in our taxi app with mapbox markers.

The basic mapbox API is enough for a simple user view, but our team aimed to develop top-view smoothly car moving shown on users' screens. Unfortunately, the mapbox does not provide proper API to solve such issues. That is why I designed a few solutions to help us achieve Uber like car animation using mapbox markers.

The first step is replacing the marker icon with your own. Fortunately, there are no issues to implement it. We can pass an HTML element to a **new Marker ()**  which will be a new icon.

```
{
var el = document.createElement('div');
el.className = 'car_marker';
var marker = new mapboxgl.Marker(el);
}
```

Now we should teach our icon "smoothly moving". To set up marker's moving from point to point, we use a **setLngLat() function** that takes the marker's new coordinates as parameters. 

```
{
marker.setLngLat([-74.50, 40.00]);
marker.addTo(map);
}
```

However, the method brings a challenge. A car moving is rapid, we jokingly name this effect - a teleport. In order to avoid the "teleport" effect, we designed the following algorithm. Calculate the difference between the new coordinates and marker's current position, then divide the result by the conditional delta.

```
{
var numDeltas = 200;
document.getElementById('drive').addEventListener('click', function () {
  steps = 0;
  position = [marker.getLngLat().lng, marker.getLngLat().lat];
  var lng = newLocation[0] - marker.getLngLat().lng;
  var lat = newLocation[1] - marker.getLngLat().lat;
  deltaLng = lng / numDeltas;
  deltaLat = lat / numDeltas;
}
```

Thus we get a value added to marker's current position and updated on the map. We have achieved the marker's smooth moving. I'm not arguing the method doesn't require improvements. For example, we can round coordinates, change our delta, etc. But for this example, let's leave our values.

Now we would like to turn the marker in the direction that it is moving. For that purpose we use turf library, helping to determine the angle between two points. To get the angle, we transform our coordinates into points using the function turf.point(), then get the angle between these two points using the function **turf.rhumbBearing**.

```
{
angle = turf.rhumbBearing(turf.point(newLocation), turf.point([marker.getLngLat().lng, marker.getLngLat().lat])) + 180;
}
```

Practically, including of the full library isn't necessary. There are enough  2 separate modules - **@turf/rhumb-bearing and @turf/helpers**.

We got an angle, what next? How to turn the marker? I offer using CSS transform and rotate properties. Unfortunately, there are no other methods for markers for now. Notice, the transform is written in marker's div element, and it is updated every time the render events are triggered on the map. Therefore we re-assign the angle values each time using our small function. The reason is after the render, transform property of the marker is completely overwritten and the rotate is removed. In addition, to correct the angle value when the camera rotates, subtract the angle of map rotation from the angle, that is gotten using the getBearing() function.

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="maximsilver" data-slug-hash="WqMBLZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="WqMBLZ">
  <span>See the Pen <a href="https://codepen.io/maximsilver/pen/WqMBLZ/">
  WqMBLZ</a> by Maxim Serebryansky (<a href="https://codepen.io/maximsilver">@maximsilver</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

To improve UX, we provide top-view smooth moving taxi-cars on the map. Our animation provides a detailed view of moving cars based on real-time tracking.
