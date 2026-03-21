import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import HackerTyper from './components/HackerTyper';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Courses from './pages/Courses';
import Workshops from './pages/Workshops';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import Terminal from './pages/Terminal';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="certifications" element={<Navigate to="/certification/courses" replace />} />
          <Route path="certification/courses" element={<Courses />} />
          <Route path="certification/workshops" element={<Workshops />} />
          <Route path="projects" element={<Projects />} />
          <Route path="education" element={<Education />} />
          <Route path="experience" element={<Navigate to="/experience/industry" replace />} />
          <Route path="experience/industry" element={<Experience />} />
          <Route path="experience/internships" element={<Internships />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('portfolio_loaded');
  });
  const [showHackerTyper, setShowHackerTyper] = useState(false);

  useEffect(() => {
    let keySequence = '';
    const secretCode = 'hack';

    const handleKeyDown = (e) => {
      // Ignore if typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (showHackerTyper) return; // don't track if already active

      keySequence += e.key.toLowerCase();
      
      // keep only the last N characters
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.slice(-secretCode.length);
      }

      if (keySequence === secretCode) {
        setShowHackerTyper(true);
        keySequence = ''; // reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHackerTyper]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('portfolio_loaded', 'true');
    setLoading(false);
  };

  return (
    <Router>
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <AnimatedRoutes />
          {showHackerTyper && <HackerTyper onClose={() => setShowHackerTyper(false)} />}
        </>
      )}
    </Router>
  );
}

export default App;
