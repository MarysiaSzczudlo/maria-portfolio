import { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  maxScale?: number;
}

export function ZoomableImage({ src, alt, className, maxScale = 5 }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isZoomed) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isZoomed]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(maxScale, Math.max(1, scale * delta));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(maxScale, prev + 0.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(1, prev - 0.5));
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

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

      {/* Fullscreen modal with zoom controls */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Close button */}
          <button
            className="absolute top-8 right-8 p-3 rounded-full transition-all duration-200 z-10"
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

          {/* Zoom controls */}
          <div
            className="absolute top-8 left-8 flex flex-col gap-2 z-10"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '8px',
            }}
          >
            <button
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: scale < maxScale ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)',
              }}
              onClick={zoomIn}
              disabled={scale >= maxScale}
              onMouseEnter={(e) => {
                if (scale < maxScale) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scale < maxScale ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)';
              }}
            >
              <ZoomIn size={20} color="#FFFFFF" />
            </button>
            <button
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: scale > 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)',
              }}
              onClick={zoomOut}
              disabled={scale <= 1}
              onMouseEnter={(e) => {
                if (scale > 1) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scale > 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)';
              }}
            >
              <ZoomOut size={20} color="#FFFFFF" />
            </button>
            <button
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: scale > 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)',
              }}
              onClick={resetZoom}
              disabled={scale <= 1}
              onMouseEnter={(e) => {
                if (scale > 1) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scale > 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(128, 128, 128, 0.1)';
              }}
            >
              <Maximize2 size={20} color="#FFFFFF" />
            </button>
          </div>

          {/* Scale indicator */}
          <div
            className="absolute bottom-8 left-8 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            {Math.round(scale * 100)}%
          </div>

          {/* Zoomed image with pan */}
          <div
            className="overflow-hidden"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
            onMouseDown={handleMouseDown}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              style={{
                maxWidth: scale === 1 ? '90%' : 'none',
                maxHeight: scale === 1 ? '90%' : 'none',
                objectFit: 'contain',
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
