import { useEffect, useState } from 'react';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"]');
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Delayed position for outer ring
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedPosition(position);
    }, 100);

    return () => clearTimeout(timer);
  }, [position]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-opacity duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
          backgroundColor: 'var(--portfolio-accent)',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s',
        }}
      />

      {/* Outer ring with delay */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-300"
        style={{
          left: `${delayedPosition.x}px`,
          top: `${delayedPosition.y}px`,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `1px solid var(--portfolio-accent)`,
          opacity: isVisible ? 0.3 : 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
