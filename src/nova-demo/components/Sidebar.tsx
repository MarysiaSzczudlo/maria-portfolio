import type { NavSection, DemoPhase } from '../PrototypeApp';
import NovaCoreOrb, { phaseToNovaCoreState } from './NovaCoreOrb';

interface SidebarProps {
  active: NavSection;
  onNav: (s: NavSection) => void;
  workAttention?: boolean;
  onAskNova?: () => void;
  phase: DemoPhase;
}

export default function Sidebar({ active, onNav, workAttention, onAskNova, phase }: SidebarProps) {
  const novaState = phaseToNovaCoreState(phase);
  const primaryNav: { id: NavSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'activity', label: 'Activity' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <nav
      className="flex flex-col border-r border-border bg-surface"
      style={{ width: '232px', flexShrink: 0 }}
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <NovaCoreOrb state={novaState} px={32} />
          <span
            className="font-semibold tracking-wider text-sm"
            style={{ color: 'var(--color-navy)', letterSpacing: '0.08em' }}
          >
            NOVA
          </span>
        </div>
        <p className="text-xs text-ink3 mt-1.5 leading-none">Operations Assistant</p>
      </div>

      {/* Primary nav — MD3 Navigation Rail style: indicator pill behind active item */}
      <div className="flex-1 px-3 py-3 space-y-0.5">
        {primaryNav.map((item) => {
          const isActive = active === item.id;
          const hasAttention = item.id === 'work' && workAttention;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              // md3-state provides the hover/pressed state layer overlay
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-full text-sm font-medium transition-colors duration-100 md3-state"
              style={{
                // MD3 Navigation Rail: active indicator uses primary-container color
                background: isActive ? 'var(--color-primarysurface)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              }}
            >
              <div className="flex items-center gap-3">
                <NavIcon name={item.id} active={isActive} />
                {item.label}
              </div>
              {hasAttention && (
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full nova-pulse"
                  style={{ background: 'var(--color-attention)' }}
                  aria-label="Needs attention"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Pattern Library */}
      <div className="px-3 py-2 border-t border-border">
        <button
          onClick={() => onNav('patterns')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors duration-100 md3-state"
          style={{
            background: active === 'patterns' ? 'var(--color-primarysurface)' : 'transparent',
            color: active === 'patterns' ? 'var(--color-primary)' : 'var(--color-ink3)',
          }}
        >
          <NavIcon name="patterns" active={active === 'patterns'} />
          Interaction System
        </button>
      </div>

      {/* Ask Nova */}
      {onAskNova && (
        <div className="px-3 pb-2.5 border-t border-border pt-2.5">
          <button
            onClick={onAskNova}
            className="w-full h-10 flex items-center gap-2.5 px-3 py-0 rounded-full text-sm font-medium transition-colors duration-100 md3-state"
            style={{ background: 'var(--color-primarysurface)', color: 'var(--color-primary)' }}
          >
            <NovaCoreOrb state={novaState} px={18} />
            Ask Nova
          </button>
        </div>
      )}

      {/* User */}
      <div className="px-4 py-4 border-t border-border flex items-center gap-3">
        <div
          className="flex items-center justify-center flex-shrink-0 text-xs font-semibold"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--color-surface2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-ink2)',
          }}
        >
          M
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink truncate">Maria Silva</p>
          <p className="text-xs text-ink3 truncate">Owner · Studio</p>
        </div>
      </div>
    </nav>
  );
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? 'var(--color-primary)' : 'var(--color-ink3)';
  const props = {
    width: '16',
    height: '16',
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: color,
    strokeWidth: '1.5',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { flexShrink: 0 },
  };

  switch (name) {
    case 'home':
      return (
        <svg {...props}>
          <path d="M2 6.8L8 2l6 4.8V13.5a.5.5 0 01-.5.5h-4V10h-3v4H3.5a.5.5 0 01-.5-.5V6.8z" />
        </svg>
      );
    case 'work':
      return (
        <svg {...props}>
          <rect x="1.5" y="5.5" width="13" height="8.5" rx="1.5" />
          <path d="M5.5 5.5V4A1.5 1.5 0 017 2.5h2A1.5 1.5 0 0110.5 4v1.5" />
          <path d="M1.5 9.5h13" />
        </svg>
      );
    case 'activity':
      return (
        <svg {...props}>
          <polyline points="1,9 4,6 6.5,10 9,4 11.5,7.5 14,6" />
        </svg>
      );
    case 'knowledge':
      return (
        <svg {...props}>
          <ellipse cx="8" cy="4.5" rx="5.5" ry="2" />
          <path d="M2.5 4.5v3.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V4.5" />
          <path d="M2.5 8v3.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V8" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="2.5" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" />
        </svg>
      );
    case 'patterns':
      return (
        <svg {...props}>
          <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
          <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
          <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
          <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
        </svg>
      );
    default:
      return <span style={{ width: 16, height: 16, flexShrink: 0 }} />;
  }
}
