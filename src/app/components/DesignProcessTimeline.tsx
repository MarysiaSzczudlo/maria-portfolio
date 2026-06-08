interface Phase {
  name: string;
  duration: string;
  weeks: number;
  role: 'Owner' | 'Core contributor' | 'Support';
  contributions: string[];
  tools: string[];
}

interface DesignProcessProps {
  teamContext: string;
  phases: Phase[];
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  Owner: { bg: 'rgba(0, 102, 255, 0.06)', text: 'var(--portfolio-accent)', border: 'rgba(0, 102, 255, 0.18)' },
  'Core contributor': { bg: 'rgba(0, 160, 120, 0.06)', text: '#00A07A', border: 'rgba(0, 160, 120, 0.2)' },
  Support: { bg: 'rgba(0, 0, 0, 0.04)', text: 'var(--portfolio-text-secondary)', border: 'var(--portfolio-border)' },
};

const phaseColors = [
  '#0066FF',
  '#3385FF',
  '#66A3FF',
  '#99C2FF',
  '#CCE0FF',
];

export function DesignProcessTimeline({ teamContext, phases }: DesignProcessProps) {
  const totalWeeks = phases.reduce((sum, p) => sum + p.weeks, 0);

  return (
    <section>
      <h2
        className="font-normal mb-3"
        style={{ fontSize: '24px', color: 'var(--portfolio-text-primary)' }}
      >
        Design Process
      </h2>

      <p
        className="font-normal mb-5"
        style={{ fontSize: '14px', color: 'var(--portfolio-text-tertiary)', fontStyle: 'italic' }}
      >
        {teamContext}
      </p>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex rounded-full overflow-hidden h-1.5 mb-2">
          {phases.map((phase, i) => (
            <div
              key={i}
              title={`${phase.name} — ${phase.duration}`}
              style={{
                width: `${(phase.weeks / totalWeeks) * 100}%`,
                backgroundColor: phaseColors[i % phaseColors.length],
                height: '100%',
              }}
            />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap">
          {phases.map((phase, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: phaseColors[i % phaseColors.length],
                }}
              />
              <span
                className="font-normal"
                style={{ fontSize: '11px', color: 'var(--portfolio-text-tertiary)', letterSpacing: '0.04em' }}
              >
                {phase.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute left-[11px] top-3 bottom-3"
          style={{ width: '1px', backgroundColor: 'rgba(0, 102, 255, 0.2)' }}
        />

        <div className="space-y-8">
          {phases.map((phase, index) => {
            const roleStyle = roleColors[phase.role] ?? roleColors['Support'];
            return (
              <div key={index} className="flex gap-6">
                {/* Node dot */}
                <div className="relative flex-shrink-0 mt-[14px]">
                  <div
                    className="w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--portfolio-bg, #fff)',
                      border: '1.5px solid var(--portfolio-accent)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div
                      className="w-[9px] h-[9px] rounded-full"
                      style={{ backgroundColor: 'var(--portfolio-accent)' }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-xl p-5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid var(--portfolio-border)',
                  }}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="font-normal"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.07em',
                        color: 'var(--portfolio-accent)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {phase.name}
                    </span>

                    {/* Duration badge */}
                    <span
                      className="px-2 py-0.5 rounded-full font-normal"
                      style={{
                        fontSize: '12px',
                        backgroundColor: 'rgba(0,102,255,0.08)',
                        color: 'var(--portfolio-accent)',
                        border: '1px solid rgba(0,102,255,0.15)',
                      }}
                    >
                      {phase.duration}
                    </span>

                    {/* Role tag */}
                    <span
                      className="px-2 py-0.5 rounded-full font-normal ml-auto"
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        backgroundColor: roleStyle.bg,
                        color: roleStyle.text,
                        border: `1px solid ${roleStyle.border}`,
                      }}
                    >
                      {phase.role}
                    </span>
                  </div>

                  {/* Contributions */}
                  <ul className="space-y-1.5 mb-4">
                    {phase.contributions.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 font-normal"
                        style={{ fontSize: '15px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.5' }}
                      >
                        <span style={{ color: 'var(--portfolio-accent)', marginTop: '1px', flexShrink: 0 }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools row */}
                  <div className="flex flex-wrap gap-2">
                    {phase.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full font-normal"
                        style={{
                          fontSize: '12px',
                          color: 'var(--portfolio-text-secondary)',
                          backgroundColor: 'rgba(0,0,0,0.03)',
                          border: '1px solid var(--portfolio-border)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
