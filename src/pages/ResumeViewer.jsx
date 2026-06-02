import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Eye, ShieldCheck, TerminalSquare } from 'lucide-react';
import DecryptText from '../components/DecryptText';

export default function ResumeViewer() {
  const metadata = [
    { label: "FILENAME", value: "resume.pdf" },
    { label: "FILETYPE", value: "application/pdf" },
    { label: "SIZE", value: "102 KB" },
    { label: "ACCESS_LEVEL", value: "UNCLASSIFIED / PUBLIC" },
    { label: "INTEGRITY", value: "VERIFIED (SHA-256 SECURE)" }
  ];

  return (
    <div className="w-full flex justify-center py-12 min-h-screen">
      <div className="w-full max-w-5xl flex flex-col px-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan">
            <DecryptText delay={200}>RESUME VIEWER</DecryptText>
          </h1>
          
          <div className="flex justify-center mb-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 0.5 }}
              className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff]"
            />
          </div>
          
          <p className="font-mono text-cyber-textSecondary max-w-md mx-auto text-sm">
            🔒 SECURE DOCUMENT READER v1.0.4 // STATUS: DECRYPTED
          </p>
        </div>

        {/* Metadata & Actions Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Metadata Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-cyber-charcoal border border-cyber-border rounded-xl p-5 font-mono text-xs flex flex-col justify-between relative group hover:border-cyber-cyan transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan shadow-[0_0_10px_#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyber-cyan font-bold font-orbitron tracking-wider">
                <TerminalSquare size={16} /> SYSTEM_METADATA_DECRYPTED
              </div>
              <div className="space-y-2">
                {metadata.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-cyber-border/30 pb-1">
                    <span className="text-cyber-textSecondary font-semibold">{item.label}:</span>
                    <span className="text-cyber-textPrimary font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-cyber-green mt-4 text-[11px]">
              <ShieldCheck size={14} className="animate-pulse" />
              <span>SSL Connection secured. Anti-tamper layers active.</span>
            </div>
          </motion.div>

          {/* Action Buttons Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-cyber-charcoal border border-cyber-border rounded-xl p-5 flex flex-col justify-center gap-4 relative group hover:border-cyber-purple transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-purple shadow-[0_0_10px_#bf00ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 text-cyber-purple font-bold font-orbitron tracking-wider text-xs mb-2">
              <Eye size={16} /> DOCUMENT_ACTIONS
            </div>
            
            <a 
              href="/resume.pdf"
              download="Tanishq_Zope_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 font-orbitron uppercase text-xs py-3 px-4 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all shadow-[0_0_5px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <Download size={14} /> Download PDF
            </a>
            
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 font-orbitron uppercase text-xs py-3 px-4 bg-cyber-purple/10 border border-cyber-purple text-cyber-textPrimary hover:bg-cyber-purple hover:text-white transition-all shadow-[0_0_5px_rgba(191,0,255,0.1)] hover:shadow-[0_0_15px_rgba(191,0,255,0.4)]"
            >
              <ExternalLink size={14} /> Open in New Tab
            </a>
          </motion.div>
        </div>

        {/* PDF Frame Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-cyber-charcoal border border-cyber-border rounded-xl p-2 relative group hover:border-cyber-cyan transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        >
          {/* Header element of file reader */}
          <div className="flex items-center justify-between border-b border-cyber-border pb-2 mb-2 px-2 text-xs font-mono text-cyber-textSecondary">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-cyber-cyan" />
              <span>PREVIEW_CONTAINER_ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/80 animate-pulse"></span>
            </div>
          </div>

          {/* PDF Object/Iframe */}
          <div className="w-full rounded-lg overflow-hidden border border-cyber-border bg-[#151515] relative min-h-[70vh]">
            <iframe 
              src="/resume.pdf#toolbar=0&navpanes=0" 
              title="Tanishq Zope Resume"
              className="w-full min-h-[70vh] border-0"
              style={{ display: 'block' }}
            />
          </div>

          {/* Bottom scan line effect */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-30"></div>
        </motion.div>
      </div>
    </div>
  );
}
