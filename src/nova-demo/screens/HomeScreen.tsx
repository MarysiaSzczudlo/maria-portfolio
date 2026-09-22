import { useState, useRef, useEffect } from 'react';
import { Button, Card, StatBox, SectionLabel, AgentBadge, StatusChip, T } from '../components/NovaUI';
import NovaCoreOrb, { phaseToNovaCoreState, NOVA_STATE_LABEL } from '../components/NovaCoreOrb';
import type { DemoPhase } from '../PrototypeApp';

interface HomeScreenProps {
  phase: DemoPhase;
  onDelegate: () => void;
  onViewWork: () => void;
  onReviewDecision: () => void;
}

export default function HomeScreen({ phase, onDelegate, onViewWork, onReviewDecision }: HomeScreenProps) {
  const isComplete  = phase === 'complete';
  const isAttention = phase === 'attention';
  const isWorking   = ['working', 'delegating', 'resuming', 'partial'].includes(phase);
  const isActive    = phase !== 'idle' && phase !== 'composing' && phase !== 'planning';
  const [composerValue, setComposerValue] = useState('');
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!statusOpen) return;
    function handler(e: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setStatusOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [statusOpen]);

  const novaState = phaseToNovaCoreState(phase);
  const novaLabel = NOVA_STATE_LABEL[novaState];

  return (
    <div className="min-h-screen bg-bg nova-fadein">
      <div className="max-w-[1120px] mx-auto px-8 pt-6 pb-10 nova-sectioned-page">

        {/* Greeting */}
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <p className={T.overline + ' mb-2'}>Thursday, 17 September 2026</p>
            <h1 className={T.pageSerif}>Good morning, Maria.</h1>
          </div>
          {/* Nova status button + popover */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setStatusOpen(v => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors md3-state"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-ink2)' }}
              aria-expanded={statusOpen}
              aria-haspopup="true"
            >
              <NovaCoreOrb state={novaState} px={20} />
              <span className="text-[13px] font-medium">{novaLabel}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                style={{ opacity: 0.5, transform: statusOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s' }}>
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            {statusOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-64 rounded-xl border border-border bg-surface nova-fadein z-30"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                role="dialog"
                aria-label="Nova status"
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border">
                  <NovaCoreOrb state={novaState} px={36} />
                  <div>
                    <p className="text-sm font-semibold text-ink">Nova</p>
                    <p className="text-[12px] font-medium" style={{ color: 'var(--color-primary)' }}>{novaLabel}</p>
                  </div>
                </div>
                {/* Status rows */}
                <div className="px-4 py-3 text-[13px] border-b border-border">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-ink3">Active workflows</span>
                    <span className="font-medium text-ink">{isComplete ? '0 active' : '3'}</span>
                  </div>
                  <div className="mx-2 border-t border-border/70" aria-hidden="true" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-ink3">Decisions pending</span>
                    <span className="font-medium text-ink">{isAttention ? '1' : '0'}</span>
                  </div>
                  <div className="mx-2 border-t border-border/70" aria-hidden="true" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-ink3">Systems</span>
                    <span className="font-medium" style={{ color: 'var(--color-success)' }}>Operational</span>
                  </div>
                </div>
                {/* CTA */}
                <div className="px-4 py-3">
                  <button
                    onClick={() => setStatusOpen(false)}
                    className="w-full text-center text-[13px] font-medium py-2 rounded-full transition-colors md3-state"
                    style={{ background: 'var(--color-primarysurface)', color: 'var(--color-primary)' }}
                  >
                    Ask Nova →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Goal composer — primary entry point */}
        {phase === 'idle' && (
          <div className="mb-4 rounded-xl border border-border p-4" style={{ background: 'var(--color-surface)' }}>
            <p className="text-sm font-semibold text-ink" style={{ marginBottom: '16px' }}>What would you like Nova to handle?</p>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={composerValue}
                onChange={e => setComposerValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onDelegate()}
                placeholder="Describe a goal, problem or outcome…"
                className="flex-1 min-w-0 px-4 py-3.5 rounded-xl text-sm border outline-none transition-colors"
                style={{ background: 'var(--color-surface2)', borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
              />
              <Button variant="primary" size="md" onClick={onDelegate}>
                Delegate to Nova →
              </Button>
            </div>
            <p className="text-[12px] text-ink3 leading-relaxed" style={{ marginTop: '16px' }}>
              Nova will propose a plan before acting and ask when a decision falls outside your permissions.
            </p>
          </div>
        )}

        {/* ── Attention section — shown when decision is needed ── */}
        {isAttention && (
          <section className="mb-4" aria-labelledby="attention-heading">
            <SectionLabel><span id="attention-heading">Your attention</span></SectionLabel>

            <div className="rounded-xl p-4 border" style={{ background: 'var(--color-attentionsurface)', borderColor: 'var(--color-attentionborder)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-attention)', fontSize: '14px' }}>◆</span>
                    <p className="text-base font-semibold text-ink">Decision required — Orion delivery date</p>
                  </div>
                  <p className="text-[13px] text-ink2 leading-relaxed">
                    The Orion client requested moving delivery from Friday 18 Sep to Monday 21 Sep.
                    This changes an external commitment and requires your approval before Nova can proceed.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="primary" size="sm" onClick={onReviewDecision}>Review decision</Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Quiet attention when nothing urgent ── */}
        {!isAttention && !isComplete && (
          <section className="mb-4" aria-labelledby="attention-heading">
            <SectionLabel><span id="attention-heading">Your attention</span></SectionLabel>
            <div className="px-4 py-2 rounded-lg border border-border text-[13px] text-ink3" style={{ background: 'var(--color-surface)' }}>
              {isWorking ? 'Nova is handling Orion. No action needed from you.' : 'No urgent decisions right now.'}
            </div>
          </section>
        )}

        {/* ── Active work ── */}
        <section className="mb-5" aria-labelledby="active-work-heading">
          <SectionLabel><span id="active-work-heading">Active work</span></SectionLabel>

          {isComplete ? (
            /* Completed state */
            <Card variant="success">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h2 className={T.cardTitle}>Orion Website Redesign</h2>
                      <StatusChip status="on-track" />
                    </div>
                    <p className="text-sm text-ink2">Nova completed coordination. Delivery updated to Monday 21 Sep.</p>
                  </div>
                  <button onClick={onViewWork} className="text-xs text-ink3 hover:text-ink transition-colors flex-shrink-0">View work →</button>
                </div>
                <div className="px-4 py-3 rounded-lg text-sm leading-relaxed" style={{ background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)', color: 'var(--color-success)' }}>
                  Nova completed routine coordination and involved you only when a client commitment required your decision.
                </div>
              </div>
            </Card>
          ) : isActive ? (
            /* Active/working state */
            <Card variant={isAttention ? 'attention' : 'default'}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h2 className={T.cardTitle}>Orion Website Redesign</h2>
                      <AgentBadge state={isAttention ? 'attention' : isWorking ? 'working' : 'working'} />
                    </div>
                    <p className="text-sm text-ink2">
                      {isAttention ? 'Nova paused: client requested a delivery date change.' : 'Nova is coordinating the Orion project within approved boundaries.'}
                    </p>
                  </div>
                  <button onClick={onViewWork} className="text-xs text-ink3 hover:text-ink transition-colors flex-shrink-0">View work →</button>
                </div>
                <div className="text-[13px] text-ink3">Goal: Keep Orion on schedule · Boundary: Routine coordination only</div>
              </div>
            </Card>
          ) : (
            /* Idle: Orion at risk */
            <Card variant="attention">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h2 className={T.cardTitle}>Orion Website Redesign</h2>
                      <StatusChip status="at-risk" />
                    </div>
                    <p className="text-sm text-ink2">
                      Missing client assets may delay internal review.
                    </p>
                  </div>
                  <button onClick={onViewWork} className="text-xs text-ink3 hover:text-ink transition-colors flex-shrink-0">View work →</button>
                </div>

                {/* Nova insight */}
                <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-surface3)', border: '1px solid var(--color-border)', borderLeft: '3px solid var(--color-primary)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-2">Nova insight</p>
                  <p className="text-sm text-ink2 leading-relaxed">
                    Orion is waiting for final brand assets from the client. If they arrive after 11:00
                    tomorrow, your internal review may need to move. The design team has a hard commitment
                    at 15:00 that cannot shift.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="primary" onClick={onDelegate}>Delegate a goal</Button>
                  <Button variant="ghost" size="md" onClick={onViewWork}>View project</Button>
                </div>
              </div>
            </Card>
          )}
        </section>

        {/* Other active workflows (compact) */}
        <section className="mb-5" aria-labelledby="other-work-heading">
          <SectionLabel><span id="other-work-heading">Also active</span></SectionLabel>
          <div className="space-y-px">
            {[
              { name: 'Meridian Brand Refresh', state: 'working' as const, next: 'Final review Thursday' },
              { name: 'Axis Quarterly Report',  state: 'waiting' as const, next: 'Awaiting client sign-off' },
            ].map((wf) => (
              <div key={wf.name} className="flex items-center justify-between py-3 px-1 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <AgentBadge state={wf.state} />
                  <span className="text-sm font-medium text-ink">{wf.name}</span>
                </div>
                <span className="text-xs text-ink3">{wf.next}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly summary */}
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl mb-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <span className="text-base" aria-hidden="true" style={{ color: 'var(--color-ink3)' }}>◈</span>
          <p className="text-sm text-ink2 leading-relaxed">
            This week Nova handled <strong className="text-ink font-semibold">
              {isComplete ? '9' : '8'} routine coordination actions.
            </strong>{' '}
            You were involved in <strong className="text-ink font-semibold">
              {isComplete ? '3' : '2'} decisions.
            </strong>
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-border"
          style={{ background: 'var(--color-border)' }}
          aria-label="Summary statistics"
        >
          {/* Active workflows — clickable, shows ring when working */}
          <button
            className="flex flex-col items-center justify-center py-6 bg-surface gap-1 transition-all hover:bg-[#F8F9FB] cursor-pointer group"
            onClick={onViewWork}
            title={isWorking ? 'Nova is currently working' : undefined}
            aria-label="View active workflows"
          >
            <div className="flex items-center gap-2">
              <span className="text-[28px] font-semibold text-ink tabular-nums leading-none">3</span>
              {isWorking && (
                <span
                  className="nova-ring w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ color: 'var(--color-primary)', background: 'var(--color-primary)' }}
                  aria-label="Nova is currently working"
                />
              )}
            </div>
            <span className="text-[13px] text-ink3 leading-snug group-hover:text-ink2 transition-colors">Active workflows</span>
          </button>

          <div className="flex items-center justify-center py-6 bg-surface">
            <StatBox value={isComplete ? '0' : '1'} label="Upcoming deadlines" />
          </div>
          <div className="flex items-center justify-center py-6 bg-surface">
            <StatBox value={isAttention ? '1' : '0'} label="Urgent decisions" />
          </div>
        </div>

      </div>
    </div>
  );
}
