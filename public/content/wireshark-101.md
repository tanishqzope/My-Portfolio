---
title: "Wireshark 101: A Beginner's Guide to Sniffing Network Traffic"
date: "2024-03-04"
summary: "How to capture packets and filter for basic protocols like HTTP or DNS."
tags: ["Wireshark", "Tools", "Network Security"]
---

# Wireshark 101: A Beginner's Guide to Sniffing Network Traffic

Wireshark is the world's foremost and widely-used network protocol analyzer (often called a "packet sniffer"). It lets you see what's happening on your network at a microscopic level. It is the de facto standard across many commercial and non-profit enterprises.

## How it Works

Computers communicate over networks by sending data broken down into small chunks called packets. Wireshark places your computer's Network Interface Card (NIC) into "promiscuous mode," allowing it to read every packet it sees on the wire, not just the ones addressed to it.

## Key Features

1.  **Deep Inspection:** Wireshark understands the structure of hundreds of different network protocols (like HTTP, TCP, UDP, DNS, ICMP, etc.) and color-codes them for easy reading.
2.  **Display Filters:** When analyzing traffic on a busy network, you will collect thousands of packets a second. Display filters are essential.
    *   `http` : Shows only unencrypted HTTP traffic (great for spotting cleartext passwords sent during a CTF).
    *   `ip.addr == 192.168.1.5` : Shows only traffic to or from a specific IP address.
    *   `dns` : Shows only Domain Name System queries, revealing which websites a user is trying to visit.

Understanding basic networking concepts like the OSI model, IP addresses, and the TCP 3-way handshake is crucial to making the most of Wireshark!
