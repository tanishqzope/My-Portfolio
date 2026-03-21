# The Anatomy of Cross-Site Scripting (XSS)

Despite being known for decades, Cross-Site Scripting (XSS) remains one of the most prevalent vulnerabilities on the web, consistently landing in the OWASP Top 10.

## What is XSS?
At its core, XSS is an injection vulnerability. It occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts in the victim's browser.

![Cross Site Scripting Illustration](https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000)

## The Three Main Types

### 1. Reflected XSS
The malicious script comes from the current HTTP request.
```html
<!-- Example of a vulnerable search page -->
<h1>Search results for: <?php echo $_GET['query']; ?></h1>
```
If a user clicks a link like `http://example.com/search?query=<script>alert(1)</script>`, the script executes.

### 2. Stored XSS
Also known as Persistent XSS. The malicious payload is stored on the target server (e.g., in a database via a comment forum) and served to subsequent users when they view the affected page.

### 3. DOM-based XSS
The vulnerability exists entirely in the client-side code rather than the server-side code.

## Mitigation Strategies

1. **Context-Aware Output Encoding:** The most important defense. Encode data before inserting it into HTML, JavaScript, or CSS contexts.
2. **Use Modern Frameworks:** React, Angular, and Vue automatically escape output by default.
3. **Content Security Policy (CSP):** Implement strict CSP headers to restrict where scripts can be loaded from.

Stay secure!
