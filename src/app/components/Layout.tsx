import { Outlet, Link, useLocation } from 'react-router';
import { Linkedin, ArrowUp, Menu, X } from 'lucide-react';
import { CursorFollower } from './CursorFollower';
import { useState, useEffect } from 'react';

export function Layout() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/#work', label: 'Work' },
    { href: '/#process', label: 'Process' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    }
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--portfolio-bg)' }}>
      <a
        href="#main-content"
        className="fixed left-4 top-2 z-[100] -translate-y-20 rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Skip to main content
      </a>
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
              <span
                className="font-normal tracking-tight"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                Maria Szczudło
              </span>
              <span
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '14px',
                  backgroundColor: 'var(--portfolio-text-tertiary)',
                  opacity: 0.5,
                }}
              />
              <p
                className="hidden sm:block font-normal"
                style={{
                  fontSize: '13px',
                  color: 'var(--portfolio-text-secondary)',
                }}
              >
                Product Designer
              </p>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4 md:gap-6" aria-label="Main navigation">
              {navItems.map((item) => {
                const isHovered = hoveredNav === item.href;
                const active = isHomePage && item.label === 'Work' && window.location.hash === '';

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="font-normal transition-all duration-300 relative inline-flex items-center min-h-8"
                    style={{
                      fontSize: '15px',
                      color: active || isHovered
                        ? 'var(--portfolio-text-primary)'
                        : 'var(--portfolio-text-secondary)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredNav(item.href)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {item.label}
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

              <Link
                to="/#contact"
                className="hidden md:inline-flex items-center px-4 h-9 rounded-md transition-all duration-300"
                style={{
                  border: '1px solid rgba(23,105,255,.35)',
                  color: 'var(--portfolio-accent)',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Let's connect ↗
              </Link>

              {/* Social Icons */}
              <div className="flex items-center gap-3 md:ml-4">
                <a
                  href="https://www.linkedin.com/in/maria-szczudlo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="transition-all duration-300 inline-flex items-center justify-center min-w-8 min-h-8"
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

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center min-w-11 min-h-11 rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              style={{ border: '1px solid var(--portfolio-border)', color: 'var(--portfolio-text-primary)', background: 'rgba(255,255,255,.72)', fontSize: '14px', fontWeight: 600 }}
            >
              {mobileMenuOpen
                ? <X size={24} strokeWidth={2} aria-hidden="true" />
                : <Menu size={26} strokeWidth={2} aria-hidden="true" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-2 rounded-xl p-2 grid gap-1" aria-label="Mobile navigation" style={{ background: 'rgba(255,255,255,.96)', border: '1px solid var(--portfolio-border)', boxShadow: '0 12px 36px rgba(0,0,0,.08)' }}>
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="min-h-11 px-3 rounded-lg flex items-center" style={{ color: 'var(--portfolio-text-primary)', fontSize: '16px' }}>
                  {item.label}
                </Link>
              ))}
              <a href="https://www.linkedin.com/in/maria-szczudlo/" target="_blank" rel="noopener noreferrer" className="min-h-11 px-3 rounded-lg flex items-center gap-2" style={{ color: 'var(--portfolio-accent)', fontSize: '16px' }}>
                <Linkedin size={18} aria-hidden="true" /> LinkedIn
              </a>
            </nav>
          )}
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
              © {new Date().getFullYear()} Maria Szczudło
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
