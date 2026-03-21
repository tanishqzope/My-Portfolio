---
title: "Burp Suite Basics: Setting Up Your First Web Proxy"
date: "2024-03-08"
summary: "How to intercept web traffic, which is essential for finding XSS and SQLi."
tags: ["Burp Suite", "Tools", "Web Security"]
---

# Burp Suite Basics: Setting Up Your First Web Proxy

Burp Suite is the undisputed champion of web application security testing. Whether you are a bug bounty hunter, a penetration tester, or a CTF player, Burp Suite is the cornerstone of your toolkit.

## What is a Web Proxy?

Normally, when you click a link or submit a form, your browser sends an HTTP request directly to the web server.

Burp Suite acts as an intercepting proxy. It sits exactly in the middle:
`Your Browser` --> **`Burp Suite`** --> `Web Server`

This allows you to pause, inspect, and modify every single request *before* it reaches the server, and every response *before* it reaches your browser.

## Key Features for Beginners

The free Burp Suite Community Edition has several critical components:

1.  **The Proxy (Intercept):** This is where the magic happens. You can intercept a login request, manually change the username to an SQL injection payload (`' OR '1'='1`), and send it to the server to see what happens.
2.  **The Repeater:** Sometimes you want to send the exact same request ten times with tiny variations without having to use the web browser. The Repeater lets you manually craft and resend HTTP requests over and over.
3.  **The Intruder:** Used for automating customized attacks. You can use it to fuzz an input field with thousands of common passwords or XSS payloads automatically.

Setting up Burp Suite initially involves configuring your browser (often via a tool like FoxyProxy) to route its traffic through Burp's local port (usually `127.0.0.1:8080`) and installing Burp's CA certificate so it can intercept encrypted HTTPS traffic.
