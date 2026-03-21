import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedCursor from './AnimatedCursor';
import PageTransition from './PageTransition';
import EasterEggs from './EasterEggs';
import Background3D from './Background3D';

export default function Layout() {
  return (
    <>
      <AnimatedCursor />
      <Background3D />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full relative">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <EasterEggs />
      </div>
    </>
  );
}
