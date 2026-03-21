import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/glitch.css';

export default function About() {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedTerminal, setTypedTerminal] = useState('');
  const [photoClicks, setPhotoClicks] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Decrypt animation for title
  useEffect(() => {
    const target = "ABOUT ME";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let iterations = 0;

    const interval = setInterval(() => {
      setTypedTitle(target.split("").map((char, index) => {
        if (index < iterations) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iterations >= target.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Typewriter for terminal
  useEffect(() => {
    const terminalText = "$ whoami\n> Tanishq Zope\n$ cat interests.txt\n> Cybersecurity | Ethical Hacking | CTFs\n$ cat status.txt\n> Currently learning and building...";
    let i = 0;
    const interval = setInterval(() => {
      setTypedTerminal(terminalText.substring(0, i));
      i++;
      if (i > terminalText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = () => {
    if (isGlitching) return;

    const newClicks = photoClicks + 1;
    setPhotoClicks(newClicks);

    if (newClicks >= 5) {
      setIsGlitching(true);
      setPhotoClicks(0);

      // Stop glitching after 3 seconds
      setTimeout(() => {
        setIsGlitching(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full flex flex-col xl:pt-[50px]">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan h-12">
        {typedTitle}
      </h1>

      {/* Animated Divider */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-12"
      />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6 font-mono text-cyber-textPrimary text-base md:text-lg leading-relaxed">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Hello! I am Tanishq Zope, a Cybersecurity professional and Information Technology student at Government Polytechnic Mumbai (Class of 2026), dedicated to mastering the art of both offensive and defensive security. My journey is defined by a "build-to-understand" philosophy, where I bridge the gap between theoretical vulnerabilities and real-world system hardening.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            Through my roles as a Cybersecurity Intern at Yhills, Nullclass, and The Drop Organization, I have developed a rigorous approach to identifying and mitigating digital threats. My expertise includes:

            <br />Web Application Security: Conducting deep-dive penetration tests focusing on the OWASP Top 10, leveraging tools like Burp Suite and sqlmap to exploit and remediate vulnerabilities like SQL Injection and XSS.

            <br />Infrastructure & OSINT: Performing reconnaissance and attack surface mapping on live corporate domains to identify subdomains and security gaps.

            <br />System Hardening: Leading initiatives to implement CIS-benchmarks and hardening protocols, resulting in measurable increases in system compliance.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            I believe the best way to defend a network is to understand how to build one from the ground up. I have engineered custom security environments, including:

            <br />SIEM Home Labs: Deploying Wazuh for real-time monitoring and threat detection.

            <br />Network Defense: Configuring pfSense firewalls and OpenVPN to secure virtualized infrastructures.

            <br />CTF Environments: Architecting Docker-based labs to simulate real-world attack scenarios and capture-the-flag challenges.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            I am proficient in Kali Linux and Parrot OS, with a strong command of scripting in Bash and PowerShell to automate security tasks. My toolkit includes Nmap, Metasploit, Wireshark, Microsoft Sentinel, and Nessus.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            Whether I am documenting complex attack chains for a technical report or competing in official CTF competitions, my goal remains the same: to build a more secure digital future through persistent learning and technical excellence.
          </motion.p>
        </div>

        {/* Right Column: Visuals */}
        <div className="w-full lg:w-2/5 flex flex-col items-center gap-8">
          {/* HUD Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={handlePhotoClick}
            className={`relative w-64 h-64 md:w-80 md:h-80 group cursor-pointer ${isGlitching ? 'animate-[intense-glitch_0.2s_infinite]' : ''}`}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-cyan group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-cyan group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>

            {/* Readouts */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-cyber-green font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {isGlitching ? 'SYSTEM FAILURE' : `ID: VERIFIED [${photoClicks}/5]`}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-cyber-green font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {isGlitching ? 'CORRUPTION DETECTED' : 'STATUS: ACTIVE'}
            </div>

            {/* Photo Container */}
            <div className={`w-full h-full border border-dashed border-cyber-cyan/50 bg-[#080808] flex items-center justify-center overflow-hidden transition-all duration-500 box-glow-cyan filter grayscale group-hover:grayscale-0 ${isGlitching ? 'bg-red-500/20 mix-blend-difference' : ''}`}>
              {/* Replace src with actual photo later */}
              <img src="https://res.cloudinary.com/dx1zgcm3j/image/upload/v1773924135/Tanishq_Pic_ssaqlm.jpg" alt="Tanishq Zope" className={`w-full h-full object-cover transition-opacity ${isGlitching ? 'opacity-100 invert sepia hue-rotate-180' : 'opacity-50 group-hover:opacity-100'}`} />
              <div className={`absolute font-orbitron transition-opacity ${isGlitching ? 'text-red-500 text-2xl animate-ping' : 'text-cyber-cyan opacity-50 group-hover:opacity-0'}`}>
                {isGlitching ? 'ERR_OVERLOAD' : 'PHOTO'}
              </div>
            </div>
          </motion.div>

          {/* Terminal Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full bg-cyber-base border border-cyber-border rounded-md overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            {/* Top Bar */}
            <div className="bg-cyber-surface1 px-4 py-2 flex items-center gap-2 border-b border-cyber-border">
              <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
              <span className="ml-2 font-mono text-xs text-cyber-textSecondary">tanishq@portfolio: ~$</span>
            </div>
            {/* Terminal Body */}
            <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto min-h-[160px]">
              <pre className="whitespace-pre-wrap">
                <span className="text-cyber-green">$ </span>
                <span className="text-cyber-textPrimary">{typedTerminal.split('\n')[0]?.replace('$ ', '')}</span>
                <br />
                <span className="text-cyber-cyan">{typedTerminal.split('\n')[1] || ''}</span>
                {(typedTerminal.split('\n').length > 2) && <br />}
                {typedTerminal.split('\n')[2] && (
                  <>
                    <span className="text-cyber-green">$ </span>
                    <span className="text-cyber-textPrimary">{typedTerminal.split('\n')[2]?.replace('$ ', '')}</span>
                    <br />
                    <span className="text-cyber-cyan">{typedTerminal.split('\n')[3] || ''}</span>
                    <br />
                  </>
                )}
                {typedTerminal.split('\n')[4] && (
                  <>
                    <span className="text-cyber-green">$ </span>
                    <span className="text-cyber-textPrimary">{typedTerminal.split('\n')[4]?.replace('$ ', '')}</span>
                    <br />
                    <span className="text-cyber-cyan">{typedTerminal.split('\n')[5] || ''}</span>
                    <br />
                  </>
                )}
                <span className="inline-block w-2 h-4 bg-white animate-blink align-middle ml-1"></span>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
