---
title: "CSRF vs. XSS: Understanding the Difference"
date: "2024-03-22"
summary: "Beginners often confuse Cross-Site Request Forgery with Cross-Site Scripting. This makes for a great comparative guide."
tags: ["CSRF", "XSS", "Web Security"]
---

# CSRF vs. XSS: Understanding the Difference

Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) are two major web security vulnerabilities, but they function very differently. Understanding these differences is crucial for any budding ethical hacker or developer.

## Cross-Site Scripting (XSS)

XSS occurs when an attacker injects malicious JavaScript into a website that victims view. The script executes within the victim's browser, typically stealing session cookies or redirecting them to a malicious site.

**The core issue:** The web application trusts the data it receives and renders it without proper encoding or sanitization.

*   *Analogy:* Putting a deceptive poster on a public noticeboard that everyone reads.

## Cross-Site Request Forgery (CSRF)

CSRF is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated. Instead of injecting a script, the attacker relies on the victim visiting a malicious link or site while logged into the vulnerable application. The browser automatically sends the victim's session cookies with the request.

**The core issue:** The web application trusts the *browser's* request simply because it contains valid session credentials.

*   *Analogy:* Tricking someone into signing a document they haven't read.

## Summary

*   **XSS:** The site trusts the data blindly. The attacker targets the *user*.
*   **CSRF:** The site trusts the browser blindly. The attacker targets the *actions the user can perform*.
