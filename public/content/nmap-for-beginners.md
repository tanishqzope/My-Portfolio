---
title: "Nmap for Beginners: How to Scan Your First Target"
date: "2024-03-06"
summary: "Explaining host discovery, port scanning, and reading the output."
tags: ["Nmap", "Tools", "Reconnaissance"]
---

# Nmap for Beginners: How to Scan Your First Target

Nmap (Network Mapper) is an open-source tool used by network administrators and security professionals to discover hosts and services on a computer network. Often considered the foundational tool of ethical hacking, it is heavily used during the reconnaissance phase of a penetration test.

## Key Concepts

*   **Host Discovery:** Determining which computers are "alive" or active on the network. For example, sending a ping request to every IP address in a subnet range like `192.168.1.0/24`.
*   **Port Scanning:** Once a host is found to be alive, checking which of its 65,535 ports are open, closed, or filtered by a firewall.
*   **Service Enumeration:** Identifying the specific application (and its version) listening on an open port. For instance, knowing that port 80 is running an outdated, vulnerable version of Apache rather than just knowing "HTTP is open."

## Basic Commands

*   `nmap 192.168.1.1` : Scans the top 1,000 most common ports on a single target.
*   `nmap -sV 192.168.1.1` : Probes open ports to determine service and version info.
*   `nmap -A 192.168.1.1` : Enables OS detection, version detection, script scanning, and traceroute. It's noisy, but highly informative on a CTF environment.

Before scanning, ensure you have explicit, written permission to test a target, or practice safely in a documented, isolated lab like HackTheBox!
