import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to cyber (dark) mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'cyber';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old classes
    root.classList.remove('theme-cyber', 'theme-corporate');
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'cyber' ? 'corporate' : 'cyber');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
