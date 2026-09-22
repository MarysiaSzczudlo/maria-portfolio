import React from 'react';
import { Card, SectionLabel, AgentBadge, T } from '../components/NovaUI';
import type { DemoPhase, ActivityEvent } from '../PrototypeApp';

interface ActivityScreenProps {
  events: ActivityEvent[];
  phase: DemoPhase;
}

export default function ActivityScreen({ events, phase }: ActivityScreenProps) {
  const hasEvents = events.length > 0;

  return (
    <div className="min-h-screen bg-bg nova-fadein">
      <div className="max-w-3xl mx-auto px-8 pt-8 pb-12 nova-sectioned-page">

        <div className="mb-5">
          <SectionLabel>Activity</SectionLabel>
          <h1 className={T.pageTitle}>What Nova has done</h1>
          <p className={T.pageDesc}>Human-readable record of actions Nova took on your behalf.</p>
        </div>

        {hasEvents && (
          <section className="mb-5" aria-labelledby="orion-heading">
            <div className="flex items-baseline justify-between mb-2">
              <SectionLabel className="mb-0">
                <span id="orion-heading">Orion Website Redesign</span>
              </SectionLabel>
              {phase === 'complete' && (
                <button className="text-[12px] font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>
                  View full history →
                </button>
              )}
            </div>
            <Card>
              <div className="px-5 py-2">
                <div className="flex items-center gap-3 py-3 mb-1">
                  <p className="text-sm font-semibold text-ink">Orion Website Redesign</p>
                  <AgentBadge state={phase === 'complete' ? 'completed' : phase === 'attention' ? 'attention' : 'working'} />
                </div>
                {[...events].reverse().map((ev, i) => (
                  <ActivityRow key={i} event={ev} isLast={i === events.length - 1} />
                ))}
              </div>
            </Card>
          </section>
        )}

        {!hasEvents && (
          <div className="px-5 py-6 rounded-xl border border-dashed border-border text-center" style={{ background: 'var(--color-surface)' }}>
            <p className="text-[13px] text-ink3">No activity yet. Activity will appear here as Nova works.</p>
          </div>
        )}

        {/* Static historical section */}
        <section aria-labelledby="yesterday-heading">
          <div className="flex items-baseline justify-between mb-2">
            <SectionLabel className="mb-0"><span id="yesterday-heading">Yesterday — Wed 16 Sep</span></SectionLabel>
            <button className="text-[12px] font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>
              View details →
            </button>
          </div>
          <Card>
            <div className="px-5 py-2">
              <div className="flex items-center gap-3 py-3 mb-1">
                <p className="text-sm font-semibold text-ink">Meridian Brand Refresh</p>
                <AgentBadge state="working" />
              </div>
              <ActivityRow event={{ time: '16:30', actor: 'nova', title: 'Final review package prepared', detail: 'All deliverables packaged for Thursday review. Design team notified.', type: 'success' }} />
              <ActivityRow event={{ time: '09:15', actor: 'nova', title: 'Checked Meridian milestone status', detail: 'All assets on schedule. No blockers identified.', type: 'default' }} isLast />
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}

// ─── Activity row — renders an ActivityEvent without importing ActivityItem ─

const DOT_COLOR: Record<string, string> = {
  default:   'var(--color-ink3)',
  success:   'var(--color-success)',
  error:     'var(--color-error)',
  attention: 'var(--color-attention)',
};

const ACTOR_LABEL: Record<string, string> = {
  nova:     'Nova',
  human:    'Maria',
  external: 'External',
};

const ACTOR_STYLE: Record<string, React.CSSProperties> = {
  nova:     { background: 'var(--color-primarysurface)', color: 'var(--color-primary)',  borderColor: 'var(--color-primaryborder)' },
  human:    { background: 'var(--color-surface2)',        color: 'var(--color-ink2)',     borderColor: 'var(--color-border)' },
  external: { background: 'var(--color-cautionsurface)',  color: 'var(--color-caution)',  borderColor: 'var(--color-cautionborder)' },
};

function ActivityRow({ event, isLast = false }: { event: ActivityEvent; isLast?: boolean }) {
  return (
    <div className="flex gap-4 relative">
      {!isLast && (
        <div className="absolute" style={{ left: '5px', top: '18px', bottom: 0, width: '1px', background: 'var(--color-border)' }} />
      )}
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: DOT_COLOR[event.type] ?? DOT_COLOR.default, outline: '2.5px solid var(--color-bg)' }}
          aria-hidden="true"
        />
      </div>
      <div className="pb-5 min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <p className="font-mono text-[13px] text-ink3 tabular-nums">{event.time}</p>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
            style={ACTOR_STYLE[event.actor] ?? ACTOR_STYLE.nova}
          >
            {ACTOR_LABEL[event.actor] ?? event.actor}
          </span>
        </div>
        <p className="text-sm font-medium text-ink">{event.title}</p>
        {event.detail && <p className="text-[13px] text-ink2 mt-0.5 leading-relaxed">{event.detail}</p>}
      </div>
    </div>
  );
}
