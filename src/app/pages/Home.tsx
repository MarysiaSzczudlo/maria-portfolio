import { useState, useEffect } from 'react';
import { Link } from 'react-router';

// Desktop and Mobile backgrounds
import desktopBg from '../../imports/Desktop/278a41b3679425556268866a9b0a95c2bf5eb525.png';
import mobileBg from '../../imports/Mobile/e1aa24ad07528e3bceb3e487fcaf30ef63672f40.png';

// SVG paths for clickable areas
import desktopSvgPaths from '../../imports/Desktop/svg-jj0jyqf7xc';
import mobileSvgPaths from '../../imports/Mobile/svg-4wmxkncz1h';

// Colorful project images for hover states
import hyundaiImg from '../../imports/Hyundai_Tucson.png';
import hsbcImg from '../../imports/HSBC.png';
import friscoImg from '../../imports/Frisco.png';
import acnImg from '../../imports/Banking_app_Accenture.jpg';
import senioringImg from '../../imports/Booking_platfrom_Senioring.png';

// Desktop project areas (1919×1080 canvas)
const desktopProjects = [
  {
    id: 'hyundai-tucson',
    title: 'Hyundai Tucson NX4',
    image: hyundaiImg,
    area: {
      left: 179.35,
      top: 186.02,
      width: 344.218,
      height: 298.983,
      rotation: 0.3,
      svgPath: desktopSvgPaths.p3ed04c80,
      viewBox: '0 0 342.646 297.148',
    },
  },
  {
    id: 'hsbc-banking',
    title: 'HSBC',
    image: hsbcImg,
    area: {
      left: 909.07,
      top: 113.42,
      width: 211.733,
      height: 359.624,
      rotation: 0.3,
      svgPath: desktopSvgPaths.p357c8670,
      viewBox: '0 0 209.819 358.48',
    },
  },
  {
    id: 'senioring',
    title: 'Senioring',
    image: senioringImg,
    area: {
      left: 1314.45,
      top: 226.02,
      width: 331.052,
      height: 297.456,
      rotation: 0.71,
      svgPath: desktopSvgPaths.p339c3f00,
      viewBox: '0 0 327.379 293.375',
    },
  },
  {
    id: 'acn-bank',
    title: 'ACN Bank',
    image: acnImg,
    area: {
      left: 427.75,
      top: 503.58,
      width: 348.09,
      height: 354.418,
      rotation: 0.71,
      svgPath: desktopSvgPaths.p1b7ae500,
      viewBox: '0 0 343.775 350.183',
    },
  },
  {
    id: 'frisco-ach',
    title: 'FrisCoach',
    image: friscoImg,
    area: {
      left: 1363.76,
      top: 560,
      width: 351.057,
      height: 312,
      rotation: 0.71,
      svgPath: desktopSvgPaths.pda6e200,
      viewBox: '0 0 347.269 307.719',
    },
  },
];

// Mobile project areas (390×844 canvas)
const mobileProjects = [
  {
    id: 'hyundai-tucson',
    title: 'Hyundai Tucson NX4',
    image: hyundaiImg,
    area: {
      left: 34,
      top: 222,
      width: 114.326,
      height: 114,
      rotation: 0.3,
      svgPath: mobileSvgPaths.p353e8680,
      viewBox: '0 0 113.7 117.147',
    },
  },
  {
    id: 'hsbc-banking',
    title: 'HSBC',
    image: hsbcImg,
    area: {
      left: 178,
      top: 188,
      width: 80,
      height: 148,
      rotation: 0.3,
      svgPath: 'M0 0L82.373 0L82.373 158.351L0 158.351Z',
      viewBox: '0 0 82.373 158.351',
    },
  },
  {
    id: 'senioring',
    title: 'Senioring',
    image: senioringImg,
    area: {
      left: 250,
      top: 348,
      width: 130,
      height: 120,
      rotation: 0.71,
      svgPath: 'M0 0L134.468 0L134.468 124.811L0 124.811Z',
      viewBox: '0 0 134.468 124.811',
    },
  },
  {
    id: 'acn-bank',
    title: 'ACN Bank',
    image: acnImg,
    area: {
      left: 30,
      top: 430,
      width: 136,
      height: 135,
      rotation: 0.71,
      svgPath: mobileSvgPaths.p254e3fc0,
      viewBox: '0 0 138.349 141.796',
    },
  },
  {
    id: 'frisco-ach',
    title: 'FrisCoach',
    image: friscoImg,
    area: {
      left: 238,
      top: 532,
      width: 124,
      height: 122,
      rotation: 0.71,
      svgPath: mobileSvgPaths.p13cfacf0,
      viewBox: '0 0 124.949 126.899',
    },
  },
];

// Tablet project areas (768-1024px) — uses desktop layout scaled down with adjusted positions
const tabletProjects = [
  {
    id: 'hyundai-tucson',
    title: 'Hyundai Tucson NX4',
    image: hyundaiImg,
    area: {
      left: 90,
      top: 186,
      width: 280,
      height: 243,
      rotation: 0.3,
      svgPath: desktopSvgPaths.p3ed04c80,
      viewBox: '0 0 342.646 297.148',
    },
  },
  {
    id: 'hsbc-banking',
    title: 'HSBC',
    image: hsbcImg,
    area: {
      left: 460,
      top: 113,
      width: 170,
      height: 290,
      rotation: 0.3,
      svgPath: desktopSvgPaths.p357c8670,
      viewBox: '0 0 209.819 358.48',
    },
  },
  {
    id: 'senioring',
    title: 'Senioring',
    image: senioringImg,
    area: {
      left: 670,
      top: 226,
      width: 268,
      height: 241,
      rotation: 0.71,
      svgPath: desktopSvgPaths.p339c3f00,
      viewBox: '0 0 327.379 293.375',
    },
  },
  {
    id: 'acn-bank',
    title: 'ACN Bank',
    image: acnImg,
    area: {
      left: 215,
      top: 490,
      width: 282,
      height: 287,
      rotation: 0.71,
      svgPath: desktopSvgPaths.p1b7ae500,
      viewBox: '0 0 343.775 350.183',
    },
  },
  {
    id: 'frisco-ach',
    title: 'FrisCoach',
    image: friscoImg,
    area: {
      left: 695,
      top: 540,
      width: 284,
      height: 252,
      rotation: 0.71,
      svgPath: desktopSvgPaths.pda6e200,
      viewBox: '0 0 347.269 307.719',
    },
  },
];

type ScreenMode = 'mobile' | 'tablet' | 'desktop';

export function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);
  const [screenMode, setScreenMode] = useState<ScreenMode>('desktop');
  const headerOffset = 50;
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 - headerOffset });

  useEffect(() => {
    const checkScreenMode = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - headerOffset;
      setViewportSize({ width, height });
      if (width < 768) {
        setScreenMode('mobile');
      } else if (width < 1024) {
        setScreenMode('tablet');
      } else {
        setScreenMode('desktop');
      }
    };

    checkScreenMode();
    window.addEventListener('resize', checkScreenMode);
    return () => window.removeEventListener('resize', checkScreenMode);
  }, []);

  const isMobile = screenMode === 'mobile';
  const isTablet = screenMode === 'tablet';

  const projects = isMobile ? mobileProjects : isTablet ? tabletProjects : desktopProjects;
  const bgImage = isMobile ? mobileBg : desktopBg;
  const canvasWidth = isMobile ? 390 : isTablet ? 1024 : 1920;
  const canvasHeight = isMobile ? 844 : isTablet ? 900 : 1080;

  // Calculate object-fit: contain position compensation
  // With contain, the full image is always visible (no cropping)
  const getAdjustedPosition = (left: number, top: number, width: number, height: number) => {
    const canvasAspect = canvasWidth / canvasHeight;
    const viewportAspect = viewportSize.width / viewportSize.height;

    let scale: number;
    let imageStartX = 0;
    let imageStartY = 0;

    if (viewportAspect > canvasAspect) {
      // Viewport is wider — image scaled by height, centered horizontally
      scale = viewportSize.height / canvasHeight;
      imageStartX = (viewportSize.width - canvasWidth * scale) / 2;
    } else {
      // Viewport is taller — image scaled by width, centered vertically
      scale = viewportSize.width / canvasWidth;
      imageStartY = (viewportSize.height - canvasHeight * scale) / 2;
    }

    const pixelLeft = left * scale + imageStartX;
    const pixelTop = top * scale + imageStartY;
    const pixelWidth = width * scale;
    const pixelHeight = height * scale;

    return {
      left: `${(pixelLeft / viewportSize.width) * 100}%`,
      top: `${(pixelTop / viewportSize.height) * 100}%`,
      width: `${(pixelWidth / viewportSize.width) * 100}%`,
      height: `${(pixelHeight / viewportSize.height) * 100}%`,
    };
  };

  // Mobile tap handler with visual feedback
  const handleTap = (projectId: string) => {
    if (isMobile) {
      setTappedId(projectId);
      setTimeout(() => setTappedId(null), 300);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        paddingTop: `${headerOffset}px`,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background image - full screen */}
        <img
          src={bgImage}
          alt="Illustrated landscape with project boards showcasing UX design work: Hyundai Tucson NX4, HSBC Banking, Senioring, ACN Bank, and FrisCoach"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            imageRendering: 'high-quality',
          }}
        />

        {/* Clickable project areas - positioned relative to viewport */}
        {projects.map((project) => {
          const isHovered = hoveredId === project.id && !isMobile;
          const isTapped = tappedId === project.id;
          const isActive = isHovered || isTapped;
          const { left, top, width, height } = project.area;

          // Use cover-aware positioning
          const pos = getAdjustedPosition(left, top, width, height);

          return (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              aria-label={`View project: ${project.title}`}
              onMouseEnter={() => !isMobile && setHoveredId(project.id)}
              onMouseLeave={() => !isMobile && setHoveredId(null)}
              onTouchStart={() => handleTap(project.id)}
              style={{
                position: 'absolute',
                left: pos.left,
                top: pos.top,
                width: pos.width,
                height: pos.height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: isActive ? 20 : 10,
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                filter: isActive
                  ? 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15)) brightness(1.05)'
                  : 'none',
              }}
            >
              {/* Floating project title - appears on hover/tap */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-28px',
                  left: '50%',
                  transform: `translateX(-50%) ${isActive ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.95)'}`,
                  opacity: isActive ? 1 : 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--portfolio-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {project.title}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer at bottom of scene */}
      <footer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          zIndex: 5,
        }}
      >
        <div
          style={{
            maxWidth: '1920px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '8px' : '0',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: 'var(--portfolio-text-tertiary)',
            }}
          >
            © {new Date().getFullYear()} Maria Szczudło
          </p>
          <a
            href="mailto:marysia.szczudlo1994@gmail.com"
            style={{
              fontSize: '12px',
              color: 'var(--portfolio-text-secondary)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            marysia.szczudlo1994@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
