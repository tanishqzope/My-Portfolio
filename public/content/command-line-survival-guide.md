---
title: "Command Line Survival Guide for Ethical Hackers"
date: "2024-03-02"
summary: "Essential Linux commands every beginner needs to know before starting a CTF."
tags: ["Linux", "CLI", "Fundamentals"]
---

# Command Line Survival Guide for Ethical Hackers

If you want to be an ethical hacker, you must learn to navigate the command line (Terminal). While graphical interfaces are nice, the command line interface (CLI) is where power users operate. It's faster, scriptable, and often the *only* way to interact with tools on a compromised server (via SSH or a reverse shell).

## Navigation

*   `pwd` (Print Working Directory): Shows exactly where you are in the file system tree.
*   `ls` (List): Shows the files and directories inside your current location. `ls -la` shows hidden files and permissions.
*   `cd` (Change Directory): Moves you around. `cd /var/www/html` moves you to the web root. `cd ..` moves you up one folder.

## File Manipulation

*   `cat filename` (Concatenate): Prints the entire contents of a file to the screen (perfect for reading flags).
*   `grep "search_term" filename`: Searches inside a file for a specific word or pattern. It's indispensable when combing through massive log files.
*   `nano` or `vim`: Terminal-based text editors. You'll need to know how to edit configuration files or write quick python scripts without a mouse.

## Ownership and Permissions

*   `chmod`: Changes file permissions (Read, Write, Execute).
*   `chown`: Changes file ownership.
*   `sudo`: Executes a command with elevated privileges (like an Administrator).
*   `su`: Switches your user entirely (e.g., `su root` attempts to become the root user).

Mastering these commands takes practice. Try the OverTheWire "Bandit" wargame—it's the best way to develop muscle memory in the Linux terminal!
