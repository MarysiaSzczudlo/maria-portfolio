import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      {/* Image with zoom cursor */}
      <div
        className={`relative cursor-zoom-in group ${className}`}
        onClick={() => setIsZoomed(true)}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />

        {/* Zoom icon overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ZoomIn size={18} style={{ color: 'var(--portfolio-text-primary)' }} />
            <span
              className="font-normal"
              style={{
                fontSize: '14px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              Click to zoom
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={() => setIsZoomed(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-8 right-8 p-3 rounded-full transition-all duration-200"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            onClick={() => setIsZoomed(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <X size={24} color="#FFFFFF" />
          </button>

          {/* Zoomed image */}
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            style={{ cursor: 'zoom-out' }}
          />
        </div>
      )}
    </>
  );
}
