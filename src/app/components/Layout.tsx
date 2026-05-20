import { Outlet, Link, useLocation } from 'react-router';
import { Linkedin, ArrowUp } from 'lucide-react';
import { CursorFollower } from './CursorFollower';
import { useState, useEffect } from 'react';

export function Layout() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navItems = [
    { path: '/', label: 'Projects' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/project/');
    }
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--portfolio-bg)' }}>
      <CursorFollower />

      {/* Top Navigation with Glassmorphism */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-12 py-8">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <Link to="/" className="flex items-center">
              <h1
                className="font-normal tracking-tight"
                style={{
                  fontSize: '20px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                Maria Szczudło
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-normal transition-colors duration-200"
                  style={{
                    fontSize: '16px',
                    color: isActive(item.path)
                      ? 'var(--portfolio-text-primary)'
                      : 'var(--portfolio-text-secondary)',
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Social Icons */}
              <div className="flex items-center gap-4 ml-4">
                <a
                  href="https://www.linkedin.com/in/maria-szczudlo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-60"
                  style={{ color: 'var(--portfolio-text-secondary)' }}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <Outlet />
      </main>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 transition-all duration-300 cursor-pointer"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = showScrollTop ? 'translateY(-4px)' : 'translateY(20px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = showScrollTop ? 'translateY(0)' : 'translateY(20px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }}
      >
        <ArrowUp size={20} style={{ color: 'var(--portfolio-text-primary)' }} />
      </button>

      {/* Footer */}
      <footer className="py-16">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="flex items-center justify-between">
            <p
              className="font-normal"
              style={{
                fontSize: '14px',
                color: 'var(--portfolio-text-tertiary)',
              }}
            >
              © 2026 Maria Szczudło
            </p>
            <a
              href="mailto:marysia.szczudlo1994@gmail.com"
              className="font-normal transition-opacity hover:opacity-60"
              style={{
                fontSize: '14px',
                color: 'var(--portfolio-text-secondary)',
              }}
            >
              marysia.szczudlo1994@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
