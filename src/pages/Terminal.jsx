import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon } from 'lucide-react';

const INITIAL_HISTORY = [
  { 
    type: 'system', 
    text: 'T-OS [Version 2.4.9]' 
  },
  { 
    type: 'system', 
    text: '(c) Zope Corporation. All rights reserved.' 
  },
  { 
    type: 'system', 
    text: 'Type "help" for a list of available commands.' 
  }
];

export default function Terminal() {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input anywhere on click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(' ');
    const base = args[0].toLowerCase();

    let output = '';

    switch (base) {
      case 'help':
        output = `
Available commands:
  whoami    - Display user information
  ls        - List accessible directories / pages
  cd <dir>  - Navigate to a directory (e.g., cd projects)
  cat <src> - Read a file (try: cat resume)
  clear     - Clear terminal history
  exit      - Return to main GUI
  sudo      - Execute command with elevated privileges
`;
        break;
      case 'whoami':
        output = 'tanishq_zope\nCybersecurity Enthusiast | Ethical Hacker | Threat Hunter.\nWorking to secure the digital frontier.';
        break;
      case 'ls':
        output = 'about/  skills/  projects/  education/  experience/  blog/  contact/';
        break;
      case 'cd':
        if (!args[1]) {
          output = 'cd: missing operand';
        } else {
          const target = args[1].toLowerCase().replace('/', '');
          const routes = ['about', 'skills', 'projects', 'education', 'experience', 'blog', 'contact', '~'];
          if (routes.includes(target)) {
            if (target === '~') navigate('/');
            else navigate(`/${target}`);
            return; // Navigation handled
          } else if (target === '..') {
            navigate('/');
            return;
          } else {
            output = `cd: ${args[1]}: No such file or directory`;
          }
        }
        break;
      case 'cat':
        if (args[1] === 'resume' || args[1] === 'resume.pdf') {
          output = 'Initializing download protocol... (Check your browser downloads)';
          setTimeout(() => {
             const link = document.createElement('a');
             link.href = '/resume.pdf';
             link.target = '_blank';
             link.click();
          }, 1000);
        } else {
          output = `cat: ${args[1] || ''}: No such file or directory`;
        }
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        navigate('/');
        return;
      case 'sudo':
        output = 'tanishq_zope is not in the sudoers file. This incident will be reported.';
        break;
      case '':
        break; // Empty command
      default:
        output = `command not found: ${base}`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: `guest@tanishq:~$ ${cmd}` },
      ...(output ? [{ type: 'output', text: output }] : [])
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black z-[100] font-mono p-4 md:p-8 flex items-center justify-center overflow-hidden scanlines"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-full max-w-5xl h-full border border-cyber-border bg-[#0a0a0a99] backdrop-blur-md rounded shadow-[0_0_50px_rgba(0,240,255,0.1)] flex flex-col relative overflow-hidden group">
        
        {/* CRT Scanline / Glow Effects */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[rgba(0,240,255,0.02)] to-transparent animate-[scan_6s_linear_infinite] z-10" />
        
        {/* Header bar */}
        <div className="h-8 bg-cyber-surface2 border-b border-cyber-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-cyber-textSecondary" />
            <span className="text-xs text-cyber-textSecondary tracking-widest">root@t-os:~</span>
          </div>
          <button onClick={() => navigate('/')} className="w-3 h-3 rounded-full bg-cyber-red hover:box-glow-purple transition-all" />
        </div>

        {/* Content area */}
        <div className="flex-grow p-4 overflow-y-auto text-cyber-cyan/90 text-sm md:text-base leading-relaxed scrollbar-hide perspective-1000 relative z-20">
          {history.map((entry, idx) => (
            <div key={idx} className={`mb-2 ${entry.type === 'system' ? 'opacity-70' : ''}`}>
              {entry.type === 'input' ? (
                <span className="text-cyber-green">{entry.text}</span>
              ) : (
                <pre className="whitespace-pre-wrap font-mono m-0 font-normal">{entry.text}</pre>
              )}
            </div>
          ))}

          {/* Active input line */}
          <div className="flex items-center mt-2">
            <span className="text-cyber-green mr-2 whitespace-nowrap">guest@tanishq:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-none outline-none text-cyber-cyan shadow-none font-mono focus:ring-0"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </motion.div>
  );
}
