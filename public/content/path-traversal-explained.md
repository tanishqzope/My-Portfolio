---
title: "Path Traversal: How Attackers Access Restricted Files"
date: "2024-03-18"
summary: "A simple explanation of how manipulating file paths can lead to data breaches."
tags: ["Path Traversal", "LFI", "Web Security"]
---

# Path Traversal: How Attackers Access Restricted Files

Path Traversal (also known as Directory Traversal or Local File Inclusion) is an attack that allows an attacker to read arbitrary files on the server that is running an application.

## The Mechanism

Imagine an application that loads images via a URL parameter:

```
https://example.com/loadImage?filename=logo.png
```

Behind the scenes, the server might append this filename to a base directory:
`/var/www/html/images/` + `logo.png`

## The Exploit

An attacker can manipulate the `filename` parameter using `../` (dot-dot-slash) sequences to step out of the base directory and access sensitive files like `/etc/passwd` (on Linux systems) or `C:\Windows\win.ini` (on Windows).

```
https://example.com/loadImage?filename=../../../etc/passwd
```

The resulting path processed by the server becomes:
`/var/www/html/images/../../../etc/passwd` which resolves to `/etc/passwd`.

## Real-world Impact

Path traversal vulnerabilities can lead to full system compromise if attackers can access configuration files exposing database credentials or application source code. Always validate and sanitize file paths!
