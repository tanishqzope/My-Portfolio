---
title: "SQL Injection (SQLi) Explained: How Hackers Speak to Databases"
date: "2024-03-24"
summary: "A breakdown of what SQLi is, how it works, and basic prevention."
tags: ["SQLi", "Web Security", "Beginner"]
---

# SQL Injection (SQLi) Explained: How Hackers Speak to Databases

SQL Injection (SQLi) is one of the most common and dangerous web vulnerabilities. It occurs when untrusted user input is passed directly into a database query without proper sanitization.

## How it Works

Imagine a login form where you input your username and password. The application might construct a query like this:

```sql
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';
```

If a hacker inputs `' OR '1'='1` as the username, the query becomes:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '';
```

Since `'1'='1'` is always true, the database returns a valid result, and the hacker bypasses the login without a password.

## Basic Prevention

The most effective way to prevent SQLi is by using **Prepared Statements (Parameterized Queries)**. These ensure that the database treats user input strictly as data, not as executable code.

*   **Avoid:** String concatenation to build queries.
*   **Use:** Parameterized queries provided by your framework or database driver.
