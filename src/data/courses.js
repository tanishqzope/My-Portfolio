export const courses = [
  {
    id: 1,
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "January 2025",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Matrix style code
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1510511459019-5d657d0af8b7?q=80&w=2070&auto=format&fit=crop"
    ], // Valid direct image links
    credentialId: "ECC123456",
    verifyUrl: "https://aspen.eccouncil.org/verify",
    description: "Covers ethical hacking methodologies, tools, and techniques for penetration testing.",
    skills: ["Penetration Testing", "Network Security", "Vulnerability Assessment"],
    category: "Cybersecurity"
  },
  {
    id: 2,
    name: "Offensive Security Certified Professional (OSCP)",
    issuer: "OffSec",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=2069&auto=format&fit=crop", // Cyber security hacker
    images: [
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=2069&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop"
    ], // Valid direct image links
    credentialId: "OSCP-1234",
    verifyUrl: "#",
    description: "Advanced penetration testing certification requiring a 24-hour practical exam.",
    skills: ["Exploit Development", "Privilege Escalation", "Active Directory"],
    category: "Cybersecurity"
  }
];
