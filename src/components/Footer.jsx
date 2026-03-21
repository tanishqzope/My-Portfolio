export default function Footer() {
  return (
    <footer className="w-full bg-cyber-base border-t border-cyber-cyan/30 mt-auto py-12 relative overflow-hidden z-20 group">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-cyan-purple shadow-[0_0_15px_#00f0ff]"></div>
      <div className="text-center text-cyber-textSecondary font-mono text-sm max-w-7xl mx-auto px-4">
        <p>© 2025 Tanishq Zope. All rights reserved.</p>
        <p className="mt-2 text-cyber-textPrimary opacity-50 relative inline-block">
          Secured with 🔒
          <button 
            className="absolute top-0 right-[-30px] w-4 h-4 opacity-0 hover:opacity-100 bg-red-600 rounded-sm text-[8px] text-cyber-textPrimary flex items-center justify-center font-bold cursor-pointer transition-opacity"
            onClick={() => alert('WARNING: CRITICAL SYSTEM COMPROMISED. JUST KIDDING. Thanks for exploring the portfolio so thoroughly! - Tanishq')}
            title="DO NOT PRESS"
          >
            !
          </button>
        </p>
      </div>
    </footer>
  );
}
