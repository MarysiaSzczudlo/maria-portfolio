import { useEffect, useRef } from 'react';

export function MovingMotto() {
  const mottoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!mottoRef.current) return;

      const scrollY = window.scrollY;
      const offset = scrollY * 0.8; // Faster parallax effect

      animationFrameId = requestAnimationFrame(() => {
        if (mottoRef.current) {
          mottoRef.current.style.transform = `translateX(-${offset}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden py-24 select-none">
      <div
        ref={mottoRef}
        className="whitespace-nowrap"
        style={{
          willChange: 'transform',
        }}
      >
        <h2
          className="inline-block"
          style={{
            fontSize: 'clamp(60px, 10vw, 120px)',
            color: 'var(--portfolio-text-primary)',
            opacity: 0.12,
            letterSpacing: '-0.02em',
            userSelect: 'none',
            fontWeight: 700,
          }}
        >
          DESIGNING SYSTEMS THAT FEEL INVISIBLE • PRECISION • EMPATHY • SYSTEMIC THINKING • DESIGNING SYSTEMS THAT FEEL INVISIBLE •{' '}
        </h2>
      </div>
    </div>
  );
}
