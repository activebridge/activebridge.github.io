---
author: Sergiy Naumenko
author-position: Ruby on Rails engineer
background: add-ssl-certificate-with-letsencrypt-back
category: engineering
date: "2016-02-25"
layout: post
post-id: add-ssl-certificate-with-letsencrypt
post-title: "Add ssl certificate with letsencrypt"
time-to-read: 2 min
scripts: [post]
hidden: true

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "I am facing with secure data transaction settings. Often, it connects with new web and search engines issues"
title: "Guide to Add SSL Certificate with Letsencrypt"
---

What do you know about SSL? As a web developer, I am facing with secure data transaction settings. Often, it connects with new web and search engines issues.

Secure Socket Layer (SSL) secures data communication at the expense of authentication and crypto operations. The server must have the install digital certificate to implement SSl connection. Digital certificate is the file, what identifies users and servers. In a way it is the digital passport, conducting server authentication before the establishment of SSL connection session. As a rule, the digital certificate is signed and certified by the third party. SSL protocol transfers secured data by means nonclassified channel and secure the exchange between operating remotely applications. 
Thereby SSl protocol's received wide acceptance on the Internet due to a high level of transfer security.
So, I would like to introduce some algorithm to implement Secure Socket Layer in your web application.
Let's go!

1. Connect to your server by ssh: `ssh user@your-domain.com`
2. `git clone https://github.com/letsencrypt/letsencrypt`
3. Stop nginx: `sudo /opt/nginx/sbin/nginx -s stop`
4. Generate ssl certificate: `sudo ./letsencrypt-auto certonly --standalone -d your-domain.com`
5. Change nginx configs:  `sudo nano /opt/nginx/conf/nginx.conf`

 Add to server block next lines:

> server_name  your-domain.com;
    listen 443 ssl;

		ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
		ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

		if ($scheme = http) {
		 return 301 https://$server_name$request_uri;
		}

Start nginx: `sudo /opt/nginx/sbin/nginx`

Get easy way to install Secure Socket Layer (SSL).
