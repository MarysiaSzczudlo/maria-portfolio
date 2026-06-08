import { Outlet, Link, useLocation } from 'react-router';
import { Linkedin, ArrowUp } from 'lucide-react';
import { CursorFollower } from './CursorFollower';
import { useState, useEffect } from 'react';

export function Layout() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

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

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--portfolio-bg)' }}>
      <CursorFollower />

      {/* Top Navigation with Enhanced Frosted Glass Effect */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="w-full mx-auto px-4 md:px-6 py-2 md:py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Name with Title */}
            <Link
              to="/"
              className="flex items-center gap-3 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <h1
                className="font-normal tracking-tight"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                Maria Szczudło
              </h1>
              <span
                style={{
                  width: '1px',
                  height: '14px',
                  backgroundColor: 'var(--portfolio-text-tertiary)',
                  opacity: 0.5,
                }}
              />
              <p
                className="font-normal"
                style={{
                  fontSize: '13px',
                  color: 'var(--portfolio-text-secondary)',
                }}
              >
                UX/UI x GenAI Designer
              </p>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-4 md:gap-6" aria-label="Main navigation">
              {navItems.map((item) => {
                const isHovered = hoveredNav === item.path;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="font-normal transition-all duration-300 relative"
                    style={{
                      fontSize: '15px',
                      color: active || isHovered
                        ? 'var(--portfolio-text-primary)'
                        : 'var(--portfolio-text-secondary)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredNav(item.path)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {item.label}
                    {/* Underline on hover/active */}
                    <span
                      className="absolute left-0 right-0 h-[2px] rounded-full transition-all duration-300"
                      style={{
                        bottom: '-6px',
                        backgroundColor: 'var(--portfolio-accent)',
                        transform: (active || isHovered) ? 'scaleX(1)' : 'scaleX(0)',
                        opacity: (active || isHovered) ? 1 : 0,
                      }}
                    />
                  </Link>
                );
              })}

              {/* Social Icons */}
              <div className="flex items-center gap-3 md:ml-4">
                <a
                  href="https://www.linkedin.com/in/maria-szczudlo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="transition-all duration-300"
                  style={{ color: 'var(--portfolio-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.1)';
                    e.currentTarget.style.color = 'var(--portfolio-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.color = 'var(--portfolio-text-secondary)';
                  }}
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className={isHomePage ? '' : 'pt-16 md:pt-20'}>
        <Outlet />
      </main>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
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

      {/* Footer - hidden on Home page */}
      {!isHomePage && (
        <footer className="py-10 md:py-16">
          <div className="max-w-[1400px] mx-auto px-5 md:px-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 justify-between">
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
      )}
    </div>
  );
}
