import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { skills } from '../data/skills';
import DecryptText from '../components/DecryptText';

function Dodecahedron() {
  return (
    <mesh>
      <dodecahedronGeometry args={[2, 0]} />
      <meshBasicMaterial color="#bf00ff" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

import { 
  Network, Lock, ShieldAlert, Activity, 
  TerminalSquare, Code, Server, Flame, 
  Cpu, FileWarning, Eye, Globe, Database, 
  Shield, ShieldCheck, Zap, Map, Bug,
  Crosshair, Search, Radar, BrickWall
} from 'lucide-react';
import { 
  SiPython, SiGnubash, SiCplusplus, SiReact, 
  SiKalilinux, SiWireshark, SiOwasp,
  SiJavascript,
  SiOpenvpn, SiParrotsecurity, SiPfsense
} from 'react-icons/si';
import { FaMicrosoft } from 'react-icons/fa';

// Helper to get an icon based on skill name
const getSkillIcon = (name) => {
  const iconProps = { className: "w-8 h-8 md:w-10 md:h-10 text-cyber-cyan group-hover:text-cyber-textPrimary transition-colors duration-300 drop-shadow-[0_0_8px_currentColor] group-hover:drop-shadow-[0_0_10px_#bf00ff]" };
  
  switch(name.toLowerCase()) {
    case 'python': return <SiPython {...iconProps} />;
    case 'bash': return <SiGnubash {...iconProps} />;
    case 'c/c++': return <SiCplusplus {...iconProps} />;
    case 'react': return <SiReact {...iconProps} />;
    case 'nmap': return <Globe {...iconProps} />;
    case 'burp suite': return <Flame {...iconProps} />;
    case 'wireshark': return <SiWireshark {...iconProps} />;
    case 'metasploit': return <SiKalilinux {...iconProps} />;
    case 'network security': return <Network {...iconProps} />;
    case 'cryptography': return <Lock {...iconProps} />;
    case 'owasp top 10': return <SiOwasp {...iconProps} />;
    case 'incident response': return <Activity {...iconProps} />;
    
    // Additional requested icons
    case 'sqlmap': return <Database {...iconProps} />;
    case 'microsoft sentinel': return <FaMicrosoft {...iconProps} />;
    case 'nessus': return <Radar {...iconProps} />;
    case 'wazuh': return <ShieldCheck {...iconProps} />;
    case 'pfsense': return <SiPfsense {...iconProps} />;
    case 'openvpn': return <SiOpenvpn {...iconProps} />;
    case 'kali linux': return <SiKalilinux {...iconProps} />;
    case 'parrot os': return <SiParrotsecurity {...iconProps} />;
    case 'beef xss': return <Bug {...iconProps} />;
    case 'zaproxy': return <Zap {...iconProps} />;
    case 'zenmap': return <Map {...iconProps} />;
    case 'javascript': return <SiJavascript {...iconProps} />;
    case 'powershell': return <TerminalSquare {...iconProps} />;
    case 'penetration testing': return <Crosshair {...iconProps} />;
    case 'vulnerability assessment': return <Search {...iconProps} />;
    case 'siem': return <Activity {...iconProps} />;
    case 'osint': return <Globe {...iconProps} />;
    case 'firewall/nsg configuration': return <BrickWall {...iconProps} />;
    case 'microsoft defender for endpoint': return <Shield {...iconProps} />;
    case 'vulnerability scanning': return <Radar {...iconProps} />;
    
    default: return <Cpu {...iconProps} />;
  }
};

export default function Skills() {
  return (
    <div className="w-full flex flex-col pt-12 relative min-h-[80vh]">
      {/* 3D Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 z-[-1] opacity-50 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <Dodecahedron />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary tracking-wider text-glow-cyan h-12 flex items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <DecryptText delay={300}>SKILL SET</DecryptText>
          </motion.span>
        </h1>
      </div>

      {/* Animated Divider */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-12"
      />

      {/* SKILLS HEX GRID */}
      <div className="mb-20">
        <h2 className="font-rajdhani text-3xl text-cyber-textPrimary mb-8 flex items-center gap-3">
          <span className="text-cyber-green">&gt;</span> TECHNICAL ARSENAL
        </h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-12"
        >
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-rajdhani text-2xl text-cyber-cyan mb-8 text-center">{category}</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {items.map((skill, i) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      damping: 12, 
                      stiffness: 100,
                      delay: i * 0.05 
                    }}
                    className="relative w-28 h-32 md:w-32 md:h-36 group"
                  >
                    <div 
                      className="absolute inset-0 bg-cyber-charcoal transition-colors duration-300 group-hover:bg-cyber-surface1 flex flex-col items-center justify-center cursor-pointer gap-2"
                      style={{ 
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        boxShadow: "inset 0 0 0 2px rgba(0,240,255,0.5)"
                      }}
                    >
                      {/* Render Icon instead of % */}
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {getSkillIcon(skill.name)}
                      </div>
                      <span className="font-mono text-cyber-textPrimary text-xs text-center px-2 group-hover:text-cyber-cyan transition-colors">{skill.name}</span>
                    </div>
                    {/* Pseudo borders for hexagon via clip-path background */}
                    <div className="absolute inset-0 bg-cyber-cyan opacity-50 group-hover:opacity-100 group-hover:box-glow-purple transition-all z-[-1] group-hover:bg-cyber-purple" 
                         style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", transform: 'scale(1.05)' }}>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* WHAT I DO SECTION */}
      <div>
        <h2 className="font-rajdhani text-3xl text-cyber-textPrimary mb-8 flex items-center gap-3">
          <span className="text-cyber-green">&gt;</span> WHAT I DO
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Ethical Hacking & Pen Testing",
              icon: <TerminalSquare className="w-8 h-8 text-cyber-cyan mb-4 group-hover:text-cyber-purple transition-colors" />,
              desc: "Proactively identifying and exploiting vulnerabilities in web applications, networks, and systems before malicious actors can."
            },
            {
              title: "Security Architecture",
              icon: <ShieldAlert className="w-8 h-8 text-cyber-cyan mb-4 group-hover:text-cyber-purple transition-colors" />,
              desc: "Designing and implementing robust security frameworks and zero-trust architectures to safeguard critical infrastructure."
            },
            {
              title: "Incident Response",
              icon: <Activity className="w-8 h-8 text-cyber-cyan mb-4 group-hover:text-cyber-purple transition-colors" />,
              desc: "Rapidly investigating, containing, and remediating security breaches, analyzing malware, and performing digital forensics."
            },
            {
              title: "Network Security",
              icon: <Network className="w-8 h-8 text-cyber-cyan mb-4 group-hover:text-cyber-purple transition-colors" />,
              desc: "Securing network infrastructures, analyzing traffic, and configuring firewalls to prevent unauthorized access and data breaches."
            },
            {
              title: "Vulnerability Assessment & Scanning",
              icon: <Search className="w-8 h-8 text-cyber-cyan mb-4 group-hover:text-cyber-purple transition-colors" />,
              desc: "Regularly scanning systems and applications for security flaws, analyzing risks, and providing actionable remediation strategies."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: i * 0.15 
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: i % 2 === 0 ? 5 : -5,
                rotateX: 5,
                translateY: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              style={{ perspective: 1000 }}
              className="bg-cyber-charcoal border border-cyber-border p-6 rounded group hover:border-cyber-cyan hover:box-glow-cyan transition-all relative overflow-hidden flex flex-col items-start cursor-pointer z-10"
            >
              {/* Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              
              <div className="relative z-10 transform-gpu transition-transform duration-300 group-hover:translate-z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-orbitron font-bold text-lg text-cyber-textPrimary mb-3 tracking-wide group-hover:text-cyber-cyan transition-colors">{item.title}</h3>
                <p className="font-mono text-sm text-cyber-textSecondary leading-relaxed group-hover:text-gray-200 transition-colors">
                  {item.desc}
                </p>
              </div>
              
              {/* Tech corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-cyber-purple animate-ping"></div>
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff]"></div>
                <div className="absolute top-4 right-8 w-6 h-[2px] bg-cyber-cyan"></div>
                <div className="absolute top-8 right-4 w-[2px] h-6 bg-cyber-cyan"></div>
              </div>

              {/* Decorative scan line */}
              <div className="absolute inset-0 h-[2px] w-full bg-cyber-cyan/50 shadow-[0_0_10px_#00f0ff] opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
