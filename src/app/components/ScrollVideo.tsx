export function ScrollVideo() {
  return (
    <div className="w-full py-16">
      <div className="max-w-4xl mx-auto">
        {/* Title and Description */}
        <div className="mb-8 text-center">
          <h2
            className="font-normal mb-3"
            style={{
              fontSize: '32px',
              color: 'var(--portfolio-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            WelaOnt Ceramic Studio
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: '16px',
              color: 'var(--portfolio-text-secondary)',
            }}
          >
            A short social media animation for WelaOnt - ceramic studio.
          </p>
        </div>

        {/* Vimeo Video Embed */}
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden mx-auto relative"
            style={{
              border: '2px solid var(--portfolio-text-primary)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              maxWidth: '600px',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
            }}
          >
            {/* Pencil draft border effect */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
              }}
            >
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                fill="none"
                stroke="var(--portfolio-text-primary)"
                strokeWidth="1.5"
                strokeDasharray="8,4"
                opacity="0.3"
                rx="16"
              />
            </svg>

            <div style={{ padding: '100.37% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/1193673497?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="welaont"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
