---
title: "How to Build Your First Cybersecurity Home Lab on a Budget"
date: "2024-02-28"
summary: "A guide to setting up VirtualBox, Kali Linux, and a vulnerable target machine like Metasploitable."
tags: ["Home Lab", "Setup", "Beginner"]
---

# How to Build Your First Cybersecurity Home Lab on a Budget

A home lab is a safe, controlled environment where you can practice hacking techniques, test malware, and configure networks without breaking real systems or violating any laws. Best of all, you can build a highly effective lab completely for free!

## Step 1: The Hypervisor (VirtualBox)

A hypervisor is software that lets you run multiple operating systems ("Virtual Machines" or VMs) simultaneously on your physical computer ("Host").
*   Download and install **Oracle VirtualBox**. It's open-source, free, and runs on Windows, macOS, and Linux.

## Step 2: The Attacker Machine (Kali Linux)

Kali Linux is a Debian-based Linux distribution packed with hundreds of pre-installed penetration testing tools.
*   Head to the Kali Linux website and download the pre-built VirtualBox image (a `.ova` file).
*   Import it into VirtualBox. This will be the machine you use to launch your attacks.

## Step 3: The Target Machine (Metasploitable)

Metasploitable is an intentionally vulnerable Ubuntu Linux VM created for testing security tools and practicing common exploits.
*   Download Metasploitable (usually from SourceForge) and extract the `.vmdk` hard drive file.
*   Create a new VM in VirtualBox, and attach the extracted Metasploitable hard drive to it.

## Step 4: The Network

Crucially, **do not connect your target machine directly to the internet!**
*   In VirtualBox settings, configure the network adapters for *both* Kali and Metasploitable to use a **"Host-Only Adapter"** or an **"Internal Network"**.
*   This ensures they can talk to each other, but the vulnerable Metasploitable machine is completely isolated from your home router and the rest of the world.

Start both VMs, find the IP address of Metasploitable, and start scanning from Kali!
