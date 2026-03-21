import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const FILE_SYSTEM = {
  '/': { type: 'dir', children: ['home', 'bin', 'etc'] },
  '/home': { type: 'dir', children: ['tanishq'] },
  '/home/tanishq': { type: 'dir', children: ['projects', 'about.txt', 'interests.txt', 'status.txt', 'secrets'] },
  '/home/tanishq/projects': { type: 'dir', children: ['SecureNet_Scanner', 'Zero_Trust_IdP', 'Portfolio_V1'] },
  '/home/tanishq/about.txt': { type: 'file', content: 'Aspiring penetration tester and CTF player. Welcome to my interactive portfolio terminal.' },
  '/home/tanishq/interests.txt': { type: 'file', content: 'Cybersecurity | Ethical Hacking | CTFs' },
  '/home/tanishq/status.txt': { type: 'file', content: 'Currently learning and building...' },
  '/home/tanishq/secrets': { type: 'dir', children: ['.flag.txt', 'recruiter_portal.sh'] },
  '/home/tanishq/secrets/.flag.txt': { type: 'file', content: 'FLAG{7h3_c0r3_1s_n0w_c0mpr0m1s3d} - You found it!' },
  '/home/tanishq/secrets/recruiter_portal.sh': { type: 'file', content: '#!/bin/bash\n# Run "sudo ./recruiter_portal.sh" to execute this script.' }
};

const resolvePath = (current, target) => {
  if (!target) return current;
  if (target === '/') return '/';
  
  const parts = target.split('/').filter(Boolean);
  let resolved = target.startsWith('/') ? [] : current.split('/').filter(Boolean);
  
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(part);
    }
  }
  
  return '/' + resolved.join('/');
};

export default function EasterEggs() {
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [showKonamiMsg, setShowKonamiMsg] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [cwd, setCwd] = useState('/home/tanishq');
  const [termHistory, setTermHistory] = useState([
    { 
      cmd: '', 
      output: `
  ______            _      __         _____                  
 /_  __/___ _____  (_)____/ /_  ____ /__  /  ____  ____  ___ 
  / / / __ \`/ __ \\/ / ___/ __ \\/ __ \`/ / /  / __ \\/ __ \\/ _ \\
 / / / /_/ / / / / (__  ) / / / /_/ / / /__/ /_/ / /_/ /  __/
/_/  \\__,_/_/ /_/_/____/_/ /_/\\__, / /____/\\____/ .___/\\___/ 
                                /_/            /_/           
                                                                 
[System Root]: TanishqZope Terminal v1.0 
Type "help" for a list of available commands.
` 
    }
  ]);
  const [cmdInput, setCmdInput] = useState('');
  
  const navigate = useNavigate();

  // Konami Code & Backtick Hook
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Terminal
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
        return;
      }

      // Konami
      if (e.key.toLowerCase() === KONAMI_CODE[konamiIdx].toLowerCase() || e.key === KONAMI_CODE[konamiIdx]) {
        const nextIdx = konamiIdx + 1;
        if (nextIdx === KONAMI_CODE.length) {
          triggerKonami();
          setKonamiIdx(0);
        } else {
          setKonamiIdx(nextIdx);
        }
      } else {
        setKonamiIdx(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx]);

  const triggerKonami = () => {
    document.documentElement.style.filter = 'invert(1)';
    setShowKonamiMsg(true);
    setTimeout(() => {
      document.documentElement.style.filter = 'none';
      setTimeout(() => setShowKonamiMsg(false), 3000);
    }, 200);
  };

  const showAchievement = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const fullCmd = cmdInput.trim();
    if (!fullCmd) return;
    
    const parts = fullCmd.split(' ').filter(Boolean);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';

    const getPrompt = () => {
      const displayCwd = cwd.replace('/home/tanishq', '~');
      return `tanishq@TanishqZope-terminal:${displayCwd}$ ${fullCmd}`;
    };

    switch(cmd) {
      case 'help': 
        output = 'Available Commands:\\n  ls [dir]     List directory contents\\n  cd [dir]     Change directory\\n  cat [file]   Read file contents\\n  pwd          Print working directory\\n  whoami       Print effective user id\\n  clear        Clear the terminal\\n  exit         Close terminal\\n\\nOther Executables: matrix, hack, rickroll'; 
        break;
      case 'whoami': 
        output = 'tanishq'; 
        break;
      case 'pwd':
        output = cwd;
        break;
      case 'ls': {
        const targetPath = resolvePath(cwd, args[0]);
        const node = FILE_SYSTEM[targetPath];
        if (!node) {
          output = `ls: cannot access '${args[0] || '.'}': No such file or directory`;
        } else if (node.type !== 'dir') {
          output = args[0]; // Is a file
        } else {
          output = node.children.join('  ');
          if (output === '') output = '(empty directory)';
        }
        break;
      }
      case 'cd': {
        if (args.length === 0 || args[0] === '~') {
          setCwd('/home/tanishq');
        } else {
          const targetPath = resolvePath(cwd, args[0]);
          const node = FILE_SYSTEM[targetPath];
          if (!node) {
            output = `cd: ${args[0]}: No such file or directory`;
          } else if (node.type !== 'dir') {
            output = `cd: ${args[0]}: Not a directory`;
          } else {
            setCwd(targetPath);
          }
        }
        break;
      }
      case 'cat': {
        if (args.length === 0) {
          output = 'cat: missing operand';
        } else {
          const targetPath = resolvePath(cwd, args[0]);
          const node = FILE_SYSTEM[targetPath];
          if (!node) {
            output = `cat: ${args[0]}: No such file or directory`;
          } else if (node.type === 'dir') {
            output = `cat: ${args[0]}: Is a directory`;
          } else {
            output = node.content;
            if (targetPath.includes('.flag.txt')) {
              showAchievement('🚩 Achievement Unlocked: Flag Captured!');
            }
          }
        }
        break;
      }
      case 'sudo': {
        if (args[0] === 'hire' && args[1] === 'tanishq') {
          output = 'Permission granted! Redirecting...'; 
          showAchievement('🏆 Achievement Unlocked: The Recruiter');
          setTimeout(() => { setTerminalOpen(false); navigate('/contact'); }, 2000);
        } else if (args[0] === './recruiter_portal.sh' && cwd === '/home/tanishq/secrets') {
          output = 'Executing secure portal access...\\nRedirecting to contact page...';
          showAchievement('🏆 Achievement Unlocked: The Insider');
          setTimeout(() => { setTerminalOpen(false); navigate('/contact'); }, 2000);
        } else {
          output = `tanishq is not in the sudoers file. This incident will be reported.`;
        }
        break;
      }
      case 'clear': 
        setTermHistory([]); 
        setCmdInput(''); 
        return;
      case 'exit': 
        setTerminalOpen(false); 
        setCmdInput(''); 
        return;
      case 'matrix':
        output = 'Wake up, Neo... The Matrix has you. Follow the white rabbit.';
        showAchievement('🐇 Achievement Unlocked: The Chosen One');
        break;
      case 'hack':
        output = 'Initiating brute force protocol...\\n[||||||||||||||||||||] 100% Complete\\nAccess Granted. Root privileges acquired.';
        showAchievement('💻 Achievement Unlocked: Master Hacker');
        break;
      case 'rickroll':
        output = 'Never gonna give you up, never gonna let you down...';
        showAchievement('🎵 Achievement Unlocked: Rickrolled');
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        break;
      default: 
        output = `cyber-terminal: ${cmd}: command not found`;
    }

    setTermHistory(prev => [...prev, { cmd: getPrompt(), output }]);
    setCmdInput('');
  };

  return (
    <>
      <AnimatePresence>
        {showKonamiMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-black/90 px-8 py-4 border-2 border-cyber-green box-glow-green shadow-[0_0_50px_#00ff41] animate-[glitch_0.5s_infinite]">
              <span className="font-mono text-xl md:text-3xl text-cyber-green font-bold">
                🔓 SECRET UNLOCKED: You have elite hacker instincts! 😎
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[9999] bg-[#0a0a0ae6] border border-cyber-green px-6 py-3 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.4)]"
          >
            <span className="font-mono text-cyber-green text-sm font-bold tracking-wider">
              {toastMsg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 w-full h-[33vh] bg-[#0a0a0add] backdrop-blur-md border-t-2 border-cyber-cyan z-[8888] flex flex-col font-mono text-sm shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="bg-cyber-surface1 flex justify-between items-center px-4 py-2 border-b border-cyber-border">
              <span className="text-cyber-textSecondary text-xs">secure_shell - bash - 80x24</span>
              <button onClick={() => setTerminalOpen(false)} className="text-cyber-textSecondary hover:text-cyber-textPrimary">x</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1">
              {termHistory.map((item, i) => (
                <div key={i}>
                  {item.cmd && <div className="text-cyber-textPrimary">{item.cmd}</div>}
                  {item.output && <div className="text-cyber-cyan whitespace-pre-wrap">{item.output}</div>}
                </div>
              ))}
              <form onSubmit={handleTerminalSubmit} className="flex gap-2 mt-2">
                <span className="text-cyber-green">tanishq@TanishqZope-terminal:{cwd.replace('/home/tanishq', '~')}$</span>
                <input 
                  type="text" 
                  value={cmdInput} 
                  autoFocus
                  onChange={(e) => setCmdInput(e.target.value)} 
                  className="flex-1 bg-transparent border-none text-cyber-textPrimary focus:outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
