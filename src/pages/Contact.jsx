import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Copy, Github, Linkedin, Twitter, Rss, X } from 'lucide-react';
import DecryptText from '../components/DecryptText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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JjfT
-----END PGP PUBLIC KEY BLOCK-----
`;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (field) => {
    const val = formData[field];
    if (!val) return null;
    if (field === 'email') return isValidEmail(val);
    return val.trim().length > 0;
  };

  const getBorderColor = (field) => {
    if (focusedField === field) return 'border-cyber-cyan box-glow-cyan';
    const isValid = validateField(field);
    if (isValid === true) return 'border-cyber-green box-glow-green';
    if (isValid === false) return 'border-cyber-red animate-shake';
    return 'border-cyber-border';
  };

  const getPromptColor = (field) => {
    if (focusedField === field) return 'text-cyber-cyan';
    if (validateField(field) === true) return 'text-cyber-green';
    return 'text-cyber-green';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateField('name') || !validateField('email') || !validateField('message')) {
      setFormStatus('error');
      setErrorMessage('Missing or invalid fields!');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    setFormStatus('sending');

    try {
      const access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!access_key) {
        setFormStatus('error');
        setErrorMessage("VITE_WEB3FORMS_ACCESS_KEY missing in .env");
        setTimeout(() => setFormStatus('idle'), 3000);
        return;
      }

      // Web3Forms safely integrates with Client Side. Backend calls blocked on free tier by Cloudflare.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: access_key,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Message from Portfolio",
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
        setErrorMessage(result.message || 'Server rejected submission');
        console.error("Form submission failed:", result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus('error');
      setErrorMessage('Network error (Serverless API not running locally)');
    }

    setTimeout(() => setFormStatus('idle'), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyKey = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col pt-12 min-h-screen relative">
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-2 tracking-wider text-glow-cyan uppercase">
        <DecryptText delay={200}>CONTACT ME</DecryptText>
      </h1>
      <p className="font-mono text-cyber-textSecondary mb-4">Got a question or want to work together? Let's connect.</p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-12"
      />

      <div className="flex flex-col lg:flex-row gap-12 pb-20">
        {/* Left: TERMINAL FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-3/5 bg-cyber-base border border-cyber-border rounded-md overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          <div className="bg-cyber-surface1 px-4 py-2 flex items-center justify-between border-b border-cyber-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
              <span className="ml-2 font-mono text-xs text-cyber-textSecondary">secure_message@tanishq:~$</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 font-mono text-sm">
            {['name', 'email', 'subject', 'message'].map((field) => (
              <div key={field} className="mb-6 flex flex-col items-start w-full relative group">
                <div className="flex w-full mb-1">
                  <span className={`${getPromptColor(field)} transition-colors whitespace-nowrap mr-2 top-0 capitalize`}>&gt; {field === 'message' ? 'Message:' : `Enter your ${field}:`}</span>
                  {validateField(field) === true && <CheckCircle size={14} className="text-cyber-green mt-1 absolute right-2" />}
                </div>
                {field === 'message' ? (
                  <textarea
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    rows="5"
                    className={`w-full bg-transparent border-b ${getBorderColor(field)} text-cyber-textPrimary py-2 focus:outline-none transition-all duration-300 resize-none font-mono`}
                    placeholder={`Type your ${field}...`}
                  ></textarea>
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-transparent border-b ${getBorderColor(field)} text-cyber-textPrimary py-2 focus:outline-none transition-all duration-300 font-mono`}
                    placeholder={`Type your ${field}...`}
                  />
                )}
              </div>
            ))}

            <div className="mt-8 flex items-center">
              <span className="text-cyber-green mr-2">&gt;</span>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`relative px-8 py-3 bg-transparent border-2 border-cyber-cyan font-orbitron uppercase tracking-wider overflow-hidden hover:text-black transition-colors duration-300 group ${formStatus === 'sending' ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <div className={`absolute inset-0 bg-cyber-cyan z-[-1] transition-all duration-300 ease-out ${formStatus === 'success' ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                <span className="flex items-center gap-2 relative z-10 font-bold">
                  {formStatus === 'idle' || formStatus === 'error' ? (
                    <><span className={formStatus === 'error' ? 'text-cyber-red' : 'text-cyber-cyan group-hover:text-black transition-colors'}>SEND_MESSAGE</span> <Send size={16} className={formStatus === 'error' ? 'text-cyber-red' : 'text-cyber-cyan group-hover:text-black transition-colors'} /></>
                  ) : formStatus === 'sending' ? (
                    <><span className="text-cyber-cyan">ENCRYPTING...</span> <div className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div></>
                  ) : (
                    <><span className="text-black">MESSAGE SENT ✓</span></>
                  )}
                </span>
              </button>
              {formStatus === 'error' && <span className="text-cyber-red ml-4 font-mono text-xs animate-pulse">{errorMessage}</span>}
            </div>
          </form>
        </motion.div>

        {/* Right Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-2/5 flex flex-col"
        >
          <h2 className="font-rajdhani font-bold text-2xl text-cyber-cyan mb-6 tracking-widest uppercase">DIRECT CHANNELS</h2>

          <div className="flex flex-col gap-6 mb-12">
            <a href="mailto:tanishqzope5@gmail.com" className="flex items-center gap-4 text-cyber-textPrimary hover:text-cyber-cyan transition-colors group">
              <div className="w-12 h-12 bg-cyber-surface1 border border-cyber-border flex items-center justify-center rounded group-hover:border-cyber-cyan group-hover:box-glow-cyan transition-all">
                <Mail className="text-cyber-cyan group-hover:animate-pulse" />
              </div>
              <span className="font-mono text-sm md:text-base">tanishqzope5@gmail.com</span>
            </a>

            <div className="flex items-center gap-4 text-cyber-textPrimary group">
              <div className="w-12 h-12 bg-cyber-surface1 border border-cyber-border flex items-center justify-center rounded">
                <MapPin className="text-cyber-cyan" />
              </div>
              <span className="font-mono text-sm md:text-base">Mumbai, India</span>
            </div>
          </div>

          <h2 className="font-rajdhani font-bold text-lg text-cyber-textSecondary mb-4 tracking-widest uppercase">SOCIAL LINKS</h2>
          <div className="flex flex-wrap gap-4 mb-12">
            {[
              { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/tanishqzope' },
              { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/tanishqzope' },
              { name: 'X', icon: <X size={20} />, url: 'https://x.com/tanishqzope' },
            ].map(platform => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" title={platform.name} className="w-12 h-12 bg-cyber-surface1 border border-cyber-border flex items-center justify-center rounded hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all text-cyber-textPrimary hover:text-cyber-cyan hover:-translate-y-1">
                {platform.icon}
              </a>
            ))}
          </div>

          {/* PGP Box */}
          <div className="mt-auto border border-cyber-border bg-cyber-charcoal rounded overflow-hidden">
            <div className="bg-cyber-surface1 p-3 border-b border-cyber-border flex items-center justify-between">
              <span className="font-mono text-cyber-cyan text-sm flex items-center gap-2">🔐 PGP Public Key</span>
              <button onClick={copyKey} className="text-cyber-textSecondary hover:text-cyber-textPrimary transition-colors" title="Copy PGP Key">
                {copied ? <CheckCircle size={16} className="text-cyber-green" /> : <Copy size={16} />}
              </button>
            </div>
            <div className="p-3 bg-black flex overflow-hidden">
              <pre className="font-mono text-[10px] text-cyber-green opacity-70 whitespace-pre overflow-x-auto w-full">
                {pgpKey}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {formStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 50 }}
            className="fixed top-24 right-6 bg-cyber-base border border-cyber-green box-glow-green p-4 rounded z-[100] flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <CheckCircle className="text-cyber-green" />
            <span className="font-mono text-sm text-cyber-textPrimary">Message transmitted securely!<br /><span className="text-cyber-textSecondary text-xs">I'll respond soon.</span></span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
