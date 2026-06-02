import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Copy, Github, Linkedin,Instagram, Twitter, Rss, X } from 'lucide-react';
import DecryptText from '../components/DecryptText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const pgpKey = `### 🔐 PGP Public Key

I support secure communication and responsible disclosure.

If you need to share sensitive information (e.g., vulnerability reports), you can use my PGP public key to encrypt messages.

* **Name:** Tanishq Zope
* **Email:** [tanishqzope5@gmail.com](mailto:tanishqzope5@gmail.com)
* **Key Type:** OpenPGP
* **Key Tool:** Keybase / GnuPG

**Fingerprint:**
D7A0 029E D727 8260@pgp

**Public Key:**
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: https://keybase.io/download
Version: Keybase Go 6.6.2 (windows)

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
FrAZeFwrv7FH5F6hVUO0r8AWJQzlEyofz18=
=H5fO
-----END PGP PUBLIC KEY BLOCK-----

You can also find my key on Keybase for verification.
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
              { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/tanishqzope' },
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
