import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Card, SectionLabel, Notice, AgentBadge, StatusChip,
  PlanStep, ActivityItem, EvidenceItem, Divider, T,
  DecisionOutcome, AuthorityTag, ScopeBadge, RecommendedBadge, RiskyBadge,
} from '../components/NovaUI';
import type { DemoPhase, ActivityEvent } from '../PrototypeApp';
import NovaCoreOrb from '../components/NovaCoreOrb';

interface WorkScreenProps {
  phase: DemoPhase;
  events: ActivityEvent[];
  onReviewPlan: () => void;
  onDelegate: () => void;
  onReviewDecision: () => void;
  onApproveDecision: () => void;
  onKeepFriday: () => void;
  onRetry: () => void;
  onViewActivity: () => void;
  onBack?: () => void;
}

export default function WorkScreen(props: WorkScreenProps) {
  const { phase, onViewActivity } = props;
  void onViewActivity; // referenced in sub-components via props spread

  return (
    <div className="min-h-screen bg-bg nova-fadein">
      {phase === 'idle' && <WorkOverview {...props} />}
      {phase === 'composing' && <Composing {...props} />}
      {phase === 'planning' && <PlanReview {...props} />}
      {phase === 'delegating' && <Delegating />}
      {['working', 'attention', 'deciding', 'resuming', 'partial', 'complete'].includes(phase) && (
        <ActiveWorkflow {...props} />
      )}
    </div>
  );
}

// ─── Idle: project list ────────────────────────────────────────────────────

function WorkOverview({ onDelegate }: WorkScreenProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12">
      <div className="mb-4">
        <SectionLabel>Work</SectionLabel>
        <h1 className={T.pageTitle}>Delegated workflows</h1>
        <p className={T.pageDesc}>Active goals Nova is managing on your behalf.</p>
      </div>

      <div className="space-y-3">
        <Card variant="attention">
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <h2 className={T.cardTitle}>Orion Website Redesign</h2>
                  <StatusChip status="at-risk" />
                </div>
                <p className="text-sm text-ink2 leading-relaxed mb-4">
                  Missing client assets may delay internal review. Nova identified a risk to the Thursday 13:00 window.
                </p>
                <div className="flex items-center gap-3 text-[13px] text-ink3">
                  <span>Deadline: Fri 18 Sep</span>
                  <span aria-hidden="true">·</span>
                  <span>Client: Orion Systems</span>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={onDelegate}>
                Delegate a goal
              </Button>
            </div>
          </div>
        </Card>

        {[
          { name: 'Meridian Brand Refresh', state: 'working' as const, deadline: 'Fri 20 Sep', note: 'Final review in progress' },
          { name: 'Axis Quarterly Report',  state: 'waiting' as const, deadline: 'Mon 23 Sep', note: 'Awaiting client sign-off' },
        ].map((p) => (
          <Card key={p.name}>
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <AgentBadge state={p.state} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{p.name}</p>
                  <p className="text-[13px] text-ink3 mt-0.5">{p.note}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[13px] text-ink3">Deadline</p>
                <p className="text-sm font-medium text-ink2">{p.deadline}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Composing: conversational goal entry ──────────────────────────────────

const DEMO_GOAL = "Keep the Orion website project on track while I'm away tomorrow. Monitor dependencies and coordinate routine internal changes. If anything would change a client commitment, ask me first.";

type ComposeState = 'empty' | 'typing' | 'ready' | 'sent';

function Composing(props: WorkScreenProps) {
  const { onReviewPlan } = props;
  const [composeState, setComposeState] = useState<ComposeState>('empty');
  const [typedText, setTypedText]       = useState('');
  const [showNova, setShowNova]         = useState(false);
  const [showPanel, setShowPanel]       = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef    = useRef(0);

  function startTyping() {
    if (composeState !== 'empty') return;
    setComposeState('typing');
    indexRef.current = 0;
    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setTypedText(DEMO_GOAL.slice(0, indexRef.current));
      if (indexRef.current >= DEMO_GOAL.length) {
        clearInterval(intervalRef.current!);
        setComposeState('ready');
      }
    }, 14);
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  function handleSend() {
    if (composeState !== 'ready' && composeState !== 'typing') return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTypedText(DEMO_GOAL);
    setComposeState('sent');
    setTimeout(() => setShowNova(true), 900);
    setTimeout(() => setShowPanel(true), 1800);
  }

  const canSend = composeState === 'ready' || composeState === 'typing';

  return (
    <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12">
      {props.onBack && (
        <button
          onClick={props.onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium mb-4 transition-colors hover:opacity-70"
          style={{ color: 'var(--color-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 2.5L4 7l4.5 4.5" />
          </svg>
          Back
        </button>
      )}
      <div className="mb-4">
        <SectionLabel>Work · Orion Website Redesign</SectionLabel>
        <h1 className={T.pageTitle}>Delegate a goal to Nova</h1>
        <p className={T.pageDesc}>Tell Nova what you want to achieve. It will propose a plan before acting.</p>
      </div>

      <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '62% 1fr' }}>
        {/* Left: conversation */}
        <div className="min-w-0">
          <Card>
            <div className="p-4 space-y-3">
              {/* Sent message */}
              {composeState === 'sent' && (
                <div className="flex gap-3 justify-end nova-fadein">
                  <div className="max-w-xs">
                    <div className="px-4 py-3 rounded-xl rounded-br-sm text-sm leading-relaxed" style={{ background: 'var(--color-navy)', color: 'white' }}>
                      {typedText}
                    </div>
                    <p className="text-[13px] text-ink3 mt-1 text-right">Maria · 08:47</p>
                  </div>
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--color-surface2)', color: 'var(--color-ink2)' }}>M</div>
                </div>
              )}

              {/* Nova thinking */}
              {composeState === 'sent' && !showNova && (
                <div className="flex gap-3 items-center nova-fadein">
                  <NovaCoreOrb state="understanding" px={28} />
                  <div className="px-4 py-3 rounded-xl rounded-bl-sm text-sm text-ink3 border border-border bg-surface">
                    <span className="nova-pulse">Understanding your goal…</span>
                  </div>
                </div>
              )}

              {/* Nova response */}
              {showNova && (
                <div className="flex gap-3 nova-fadein">
                  <NovaCoreOrb state="ready" px={28} />
                  <div className="max-w-xs">
                    <div className="px-4 py-3 rounded-xl rounded-bl-sm text-sm text-ink leading-relaxed border border-border bg-surface">
                      I can handle the routine coordination and only involve you if a decision changes an external commitment.
                    </div>
                    <p className="text-[13px] text-ink3 mt-1">Nova · 08:47</p>
                  </div>
                </div>
              )}

              {showNova && <Divider />}

              {/* Input area */}
              {composeState !== 'sent' ? (
                <div>
                  <div
                    className="w-full min-h-[80px] px-4 py-3 rounded-lg text-sm leading-relaxed border cursor-text transition-colors"
                    style={{ background: composeState === 'empty' ? 'var(--color-surface2)' : 'var(--color-surface)', borderColor: 'var(--color-border2)', color: typedText ? 'var(--color-ink)' : 'var(--color-ink3)' }}
                    onClick={startTyping}
                    role="textbox"
                    aria-label="Tell Nova your goal"
                  >
                    {typedText || 'Tell Nova what you want to achieve…'}
                    {composeState === 'typing' && <span className="animate-pulse">|</span>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-[13px] text-ink3">
                      {composeState === 'empty' ? 'Click to enter your goal' : composeState === 'typing' ? 'Typing…' : 'Ready to send'}
                    </p>
                    <Button variant="primary" size="sm" disabled={!canSend} onClick={handleSend}>Send</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-[13px] text-ink3">Goal received</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: interpretation panel */}
        <div className="min-w-0">
          {!showPanel ? (
            <div className="rounded-xl border border-dashed border-border p-4 flex flex-col items-center justify-center text-center min-h-[200px]" style={{ background: 'var(--color-surface)' }}>
              <p className="text-[13px] text-ink3">Nova will interpret your goal here</p>
            </div>
          ) : (
            <Card className="nova-fadein">
              <div className="px-4 pt-2.5 pb-3">
                <SectionLabel className="mb-1.5">Nova understood</SectionLabel>

                <div className="divide-y divide-border">
                  {[
                    { label: 'Goal',      value: 'Keep Orion on schedule' },
                    { label: 'Timeframe', value: 'Tomorrow, all day' },
                    { label: 'Project',   value: 'Orion Website Redesign' },
                    { label: 'Scope',     value: 'Routine coordination only' },
                  ].map(({ label, value }) => (
                    <div key={label} className="py-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-ink">{value}</p>
                    </div>
                  ))}
                  <div className="py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1">What Nova will do</p>
                    <p className="text-[13px] text-ink2 leading-relaxed">
                      Monitor Orion dependencies, coordinate internally, and escalate decisions that change a client commitment.
                    </p>
                  </div>
                </div>

                <div className="mt-2 rounded-lg px-3 py-2.5" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1">Context used</p>
                  <p className="text-[12px] text-ink2 leading-relaxed">Based on your Orion workspace, project settings, existing client contact and saved preferences.</p>
                </div>

                <div className="pt-3">
                  <Button variant="primary" className="w-full" onClick={onReviewPlan}>Review plan</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Plan review ───────────────────────────────────────────────────────────

function PlanReview({ onDelegate }: WorkScreenProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12">
      <div className="mb-4">
        <SectionLabel>Work · Orion Website Redesign</SectionLabel>
        <h1 className={T.pageTitle}>Nova's proposed plan</h1>
        <p className={T.pageDesc}>Review what Nova will handle automatically and what requires your approval before delegating.</p>
        <div className="mt-3 rounded-lg px-3.5 py-2.5 max-w-[820px]" style={{ background: 'var(--color-primarysurface)', border: '1px solid var(--color-primaryborder)' }}>
          <p className="text-[12px] text-ink2 leading-relaxed"><span className="font-semibold text-ink">Why this plan:</span> The main risk is delayed brand assets affecting tomorrow's internal review, while the client-facing delivery commitment remains protected.</p>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '62% 1fr' }}>
        {/* Left — plan steps + summary */}
        <div className="space-y-3 min-w-0">
          <Card>
            <div className="px-5 pt-2.5 pb-3">
              <SectionLabel className="mb-1.5">Planned actions</SectionLabel>
              <PlanStep number={1} text="Check whether final brand assets have arrived by 11:00." mode="auto" />
              <PlanStep number={2} text="If assets are missing, follow up with the existing Orion client contact." mode="auto" />
              <PlanStep number={3} text="If assets arrive late, adjust the internal review schedule by up to 2 hours." mode="auto" />
              <PlanStep number={4} text="Notify the internal design team of any schedule change." mode="auto" />
              <PlanStep number={5} text="If the client requests a change to the external delivery deadline, ask Maria before committing." mode="manual" />
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-border self-start" style={{ background: 'var(--color-border)' }}>
            <div className="px-4 py-2.5" style={{ background: 'var(--color-successsurface)' }}>
              <p className="text-[26px] font-semibold leading-none" style={{ color: 'var(--color-success)' }}>4</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mt-1.5 mb-1.5" style={{ color: 'var(--color-success)' }}>Actions automatic</p>
              <div className="flex flex-col gap-2.5 mt-3">
                {['Check assets', 'Follow up with client contact', 'Reschedule internally (≤2 h)', 'Notify design team'].map(t => (
                  <div key={t} className="flex items-start gap-2 text-[13px] text-ink2 leading-snug">
                    <span className="flex-shrink-0 font-semibold mt-px" style={{ color: 'var(--color-success)' }}>✓</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-2.5" style={{ background: 'var(--color-attentionsurface)' }}>
              <p className="text-[26px] font-semibold leading-none" style={{ color: 'var(--color-attention)' }}>1</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mt-1.5 mb-1.5" style={{ color: 'var(--color-attention)' }}>Approval checkpoint</p>
              <div className="mt-3">
                <div className="flex items-start gap-2 text-[13px] text-ink2 leading-snug">
                  <span className="flex-shrink-0 font-semibold mt-px" style={{ color: 'var(--color-attention)' }}>◆</span>
                  <span>Change client-facing deadline</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — delegation boundary + actions */}
        <div className="space-y-3 min-w-0">
          <Card>
            <div className="px-5 pt-2.5 pb-3">
              <div className="flex items-center justify-between mb-1.5">
                <SectionLabel className="mb-0">Delegation boundary</SectionLabel>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap" style={{ color: 'var(--color-primary)', background: 'var(--color-primarysurface)', border: '1px solid var(--color-primaryborder)' }}>Scope: This goal only</span>
              </div>
              <p className="text-[13px] text-ink2 leading-relaxed" style={{ marginBottom: '18px' }}>
                For Orion tomorrow, Nova may coordinate internal scheduling but may not change client-facing commitments.
              </p>
              <div className="space-y-2.5">
                <div className="rounded-lg px-4 py-3" style={{ background: '#F0F9F4', border: '1px solid var(--color-successborder)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-success)' }}>Nova can act</p>
                  <div className="flex flex-col gap-2.5 mt-3">
                    {['Request assets from existing Orion contact', 'Send internal reminders', 'Move internal meetings by up to 2 hours'].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[13px] text-ink2 leading-snug">
                        <span className="flex-shrink-0 font-semibold mt-px" style={{ color: 'var(--color-success)' }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg px-4 py-3" style={{ background: 'var(--color-attentionsurface)', border: '1px solid var(--color-attentionborder)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-attention)' }}>Nova must ask</p>
                  <div className="flex flex-col gap-2.5 mt-3">
                    {['Change the client-facing deadline', 'Create a new external commitment'].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[13px] text-ink2 leading-snug">
                        <span className="flex-shrink-0 font-semibold mt-px" style={{ color: 'var(--color-attention)' }}>◆</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-1.5">
            <Button variant="primary" className="w-full" onClick={onDelegate}>Delegate to Nova</Button>
            <Button variant="secondary" className="w-full">Adjust boundaries</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delegating: brief confirmation ───────────────────────────────────────

function Delegating() {
  return (
    <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12 nova-fadein">
      <div className="mb-4">
        <SectionLabel>Work · Orion Website Redesign</SectionLabel>
        <h1 className={T.pageTitle}>Goal delegated</h1>
      </div>
      <div className="rounded-xl p-4 border" style={{ background: 'var(--color-successsurface)', borderColor: 'var(--color-successborder)' }}>
        <div className="flex items-center gap-3 mb-2">
          <span style={{ color: 'var(--color-success)', fontSize: '20px' }}>✓</span>
          <p className="text-base font-semibold text-ink">Nova is now monitoring Orion</p>
        </div>
        <p className="text-sm text-ink2 leading-relaxed">
          Nova will handle routine coordination within the approved boundaries. You'll only be involved if a client commitment needs to change.
        </p>
      </div>
    </div>
  );
}

// ─── Active workflow: working → attention → deciding → resuming → partial → complete ─

function ActiveWorkflow({ phase, events, onReviewDecision, onApproveDecision, onKeepFriday, onRetry, onViewActivity }: WorkScreenProps) {

  // Separate rendering for "deciding" phase — full-width decision interface
  if (phase === 'deciding') {
    return (
      <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12 nova-fadein">
        <div className="mb-4">
          <SectionLabel className="mb-1.5">Decision · Orion Website Redesign</SectionLabel>
          <h1 className={T.pageTitle}>Review delivery date change</h1>
          <p className="text-base text-ink2 leading-relaxed mt-1">
            Nova paused before changing an external commitment. Review the context and choose how to proceed.
          </p>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: '62% 1fr' }}>
          <div className="space-y-3 min-w-0">
            <Card>
              <div className="px-5 pt-4 pb-5">
                <SectionLabel className="mb-3">Client request</SectionLabel>
                <div className="px-4 py-2.5 rounded-lg text-sm text-ink leading-relaxed mb-1.5" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)', borderLeft: '3px solid var(--color-caution)' }}>
                  "Can we move Friday's delivery to Monday?"
                </div>
                <p className="text-[13px] text-ink3">Received directly from the Orion client — this creates a new external commitment.</p>
              </div>
            </Card>

            <Card>
              <div className="px-5 pt-4 pb-5">
                <SectionLabel className="mb-4">Your options</SectionLabel>
                <div className="space-y-3.5" role="group" aria-label="Decision options">

                  {/* Recommended — visually prioritized, decision-support structure */}
                  <button
                    className="w-full text-left rounded-xl border transition-all md3-state overflow-hidden"
                    style={{ background: 'var(--color-primarysurface)', borderColor: 'var(--color-primaryborder)', boxShadow: '0 1px 0 rgba(37,99,235,0.04)' }}
                    onClick={onApproveDecision}
                  >
                    <div className="px-5 pt-4 pb-5">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0 flex-1">
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                            <RecommendedBadge />
                            <h3 className="text-[16px] font-semibold text-ink" style={{ margin: 0 }}>Approve Monday 21 Sep delivery</h3>
                          </div>
                          <p className="text-[14px] text-ink2 leading-relaxed mt-2 max-w-[760px]">
                            Restores the planned QA buffer and keeps delivery achievable without compressing internal review.
                          </p>
                        </div>
                        <span className="flex-shrink-0 inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap" style={{ color: 'var(--color-on-primary)', background: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}>Choose →</span>
                      </div>

                      <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-primaryborder)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <p className="font-semibold text-ink2 uppercase tracking-[0.09em] text-[11px]" style={{ margin: 0 }}>What happens next</p>
                          <div className="grid gap-2.5 text-[13px] text-ink2">
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-primary)' }}>✓</span><span className="font-medium text-ink">External commitment</span><span>Monday 21 Sep</span></div>
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-primary)' }}>✓</span><span className="font-medium text-ink">Internal schedule</span><span>Adjusted to align</span></div>
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-primary)' }}>✓</span><span className="font-medium text-ink">Design team</span><span>Notified of the change</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Higher-risk alternative — same structure, quieter action */}
                  <button
                    className="w-full text-left rounded-xl border transition-all md3-state overflow-hidden"
                    style={{ background: 'var(--color-risksurface)', borderColor: 'var(--color-riskborder)' }}
                    onClick={onKeepFriday}
                  >
                    <div className="px-5 pt-4 pb-5">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0 flex-1">
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                            <RiskyBadge />
                            <h3 className="text-[16px] font-semibold text-ink" style={{ margin: 0 }}>Keep Friday 18 Sep delivery</h3>
                          </div>
                          <p className="text-[14px] text-ink2 leading-relaxed mt-2 max-w-[760px]">
                            Keeps the original commitment, but continues with a limited QA buffer and higher delivery risk.
                          </p>
                        </div>
                        <span className="flex-shrink-0 inline-flex items-center h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap text-ink2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-riskborder)' }}>Choose →</span>
                      </div>

                      <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-riskborder)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <p className="font-semibold text-ink2 uppercase tracking-[0.09em] text-[11px]" style={{ margin: 0 }}>What happens next</p>
                          <div className="grid gap-2.5 text-[13px] text-ink2">
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-risk)' }}>•</span><span className="font-medium text-ink">Client commitment</span><span>Friday 18 Sep</span></div>
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-risk)' }}>•</span><span className="font-medium text-ink">QA buffer risk</span><span>Logged in activity</span></div>
                          <div className="grid grid-cols-[18px_150px_1fr] items-start gap-2"><span className="font-semibold" style={{ color: 'var(--color-risk)' }}>•</span><span className="font-medium text-ink">Further blockers</span><span>Continue to be monitored</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Neutral options */}
                  <button
                    className="w-full min-h-[68px] text-left flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl border transition-all md3-state"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">Propose another date</p>
                      <p className="text-[12px] text-ink3 mt-1">Lets you negotiate a different commitment before Nova responds.</p>
                    </div>
                    <span className="flex-shrink-0 text-[13px] text-ink3 mt-0.5">→</span>
                  </button>
                  <button
                    className="w-full min-h-[68px] text-left flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl border transition-all md3-state"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">Review Nova's reasoning</p>
                      <p className="text-[12px] text-ink3 mt-1">Review the evidence behind Nova's recommendation before deciding.</p>
                    </div>
                    <span className="flex-shrink-0 text-[13px] text-ink3 mt-0.5">→</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-3 min-w-0">
            <Card>
              <div className="px-5 pt-4 pb-5">
                <SectionLabel className="mb-3">Decision context</SectionLabel>
                <div className="rounded-lg overflow-hidden border border-border divide-y divide-border mb-3" style={{ background: 'var(--color-surface3)' }}>
                  <div className="px-3 pt-1.5 pb-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1.5">Current commitment</p>
                    <p className="text-sm font-semibold text-ink">Friday 18 Sep</p>
                  </div>
                  <div className="px-3 pt-1.5 pb-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1.5">Client request</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-attention)' }}>Monday 21 Sep</p>
                  </div>
                </div>
                <div className="rounded-lg px-3 pt-1.5 pb-2.5 border border-border" style={{ background: 'var(--color-surface3)' }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-2">Nova's assessment</p>
                  <p className="text-[13px] text-ink2 leading-relaxed">Moving delivery to Monday would restore the planned QA buffer. This decision is yours.</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="px-5 pt-4 pb-5">
                <SectionLabel className="mb-2.5">Evidence</SectionLabel>
                <div className="space-y-1.5">
                  <EvidenceItem>Brand assets arrived 42 minutes late</EvidenceItem>
                  <EvidenceItem>QA buffer is now limited</EvidenceItem>
                  <EvidenceItem>Client explicitly requested Monday</EvidenceItem>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-12">
      {/* Project header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <SectionLabel>Work · Orion Website Redesign</SectionLabel>
          <div className="flex items-center gap-3 mb-2">
            <h1 className={T.pageTitle}>
              {phase === 'complete' ? 'Workflow completed' : 'Nova is working'}
            </h1>
            <AgentBadgeDisplay demoPhase={phase} />
          </div>
          <p className="text-base text-ink2">
            {phase === 'working'   && 'No action needed from you right now.'}
            {phase === 'attention' && 'A client request requires your input before Nova can continue.'}
            {phase === 'resuming'  && 'Nova is resuming after your decision.'}
            {phase === 'partial'   && 'Nova needs your help to recover from a partial failure.'}
            {phase === 'complete'  && 'Goal achieved. Orion is on track.'}
          </p>
        </div>
        {phase === 'working' && (
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            <Button variant="secondary" size="sm">Pause Nova</Button>
            <Button variant="ghost" size="sm">Stop workflow</Button>
          </div>
        )}
      </div>

      {/* Decision/recovery/resuming banners */}
      {phase === 'resuming' && (
        <div className="mb-4">
          <ResumingBanner />
        </div>
      )}

      {phase === 'attention' && (
        <div className="mb-4 rounded-xl border overflow-hidden" style={{ background: 'var(--color-attentionsurface)', borderColor: 'var(--color-attentionborder)' }}>
          <div className="px-5 py-4 flex items-center justify-between gap-7">
            <div className="min-w-0 flex-1">
              <SectionLabel className="mb-2 text-attention">Decision required · Orion Website Redesign</SectionLabel>
              <div className="flex items-center gap-2.5 mb-2">
                <span style={{ color: 'var(--color-attention)', fontSize: '15px' }}>◆</span>
                <h2 className="text-[24px] font-semibold leading-tight" style={{ color: 'var(--color-attention)' }}>Your decision is required</h2>
              </div>
              <p className="text-sm text-ink2 leading-relaxed mb-1.5 max-w-[820px]">
                Orion client requested moving delivery from <strong className="text-ink">Friday</strong> to <strong className="text-ink">Monday</strong>. This changes an external commitment and is outside Nova's delegated authority.
              </p>
              <p className="text-[13px] text-ink3 mb-3">Nova paused before making the change.</p>
              <Button variant="primary" size="sm" onClick={onReviewDecision}>Review decision →</Button>
            </div>
            <NovaCoreOrb state="needs-approval" size="lg" className="mr-2 opacity-90 flex-shrink-0" />
          </div>
        </div>
      )}

      {phase === 'partial' && (
        <div className="mb-4">
          <PartialFailure onRetry={onRetry} />
        </div>
      )}

      {phase === 'complete' && (
        <div className="mb-4">
          <CompletionSummary />
        </div>
      )}

      <ExecutionPlanBar phase={phase} onViewActivity={onViewActivity} />

      {/* Activity feed */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '62% 1fr' }}>
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-2">
            <SectionLabel className="mb-0">
              {phase === 'complete' ? 'Recent activity' : 'Activity'}
            </SectionLabel>
            {events.length > 0 && (
              <button
                onClick={onViewActivity}
                className="text-[12px] font-medium transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                View workflow history →
              </button>
            )}
          </div>
          <div className="mt-2">
            {events.length === 0 && (
              <div className="flex items-center gap-3 text-[13px] text-ink3 py-2">
                <span className="nova-pulse">◉</span>
                Nova is starting…
              </div>
            )}
            {/* When complete, show only 3 most recent; otherwise show all */}
            {(() => {
              const reversed = [...events].reverse();
              const shown = phase === 'complete' ? reversed.slice(0, 3) : reversed;
              return shown.map((ev, i) => (
                <ActivityItem
                  key={i}
                  time={ev.time}
                  title={ev.title}
                  detail={ev.detail}
                  type={ev.type as any}
                  actor={ev.actor}
                  isLast={i === shown.length - 1}
                />
              ));
            })()}
            {phase === 'complete' && events.length > 3 && (
              <button
                onClick={onViewActivity}
                className="flex items-center gap-1.5 text-[13px] font-medium mt-1 transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                View all activity →
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 min-w-0">
          <Card>
            <div className="px-4 py-3">
              <SectionLabel className="mb-2">Current status</SectionLabel>
              <div className="divide-y divide-border">
                <StatusRow label="Workflow state">
                  <AgentBadgeDisplay demoPhase={phase} />
                </StatusRow>
                <StatusRow label="Authority mode">
                  <AuthorityTag mode={phase === 'attention' ? 'requires-approval' : 'automatic'} />
                </StatusRow>
                <StatusRow label="Goal">
                  <span className="text-[13px] text-ink2 text-right">Keep Orion on schedule</span>
                </StatusRow>
                {phase === 'complete' && (
                  <StatusRow label="Delivery date">
                    <span className="text-[13px] font-medium text-ink">Mon 21 Sep</span>
                  </StatusRow>
                )}
              </div>
            </div>
          </Card>

          {phase === 'working' && (
            <div className="px-4 py-2.5 rounded-xl text-[13px] leading-relaxed text-ink2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span className="nova-pulse" style={{ color: 'var(--color-success)' }}>●</span>
              {' '}Nova is handling Orion. You'll only be notified when a decision is needed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Execution Plan ──────────────────────────────────────────────────────────

type StepState = 'completed' | 'in-progress' | 'pending' | 'approval-needed' | 'failed';

interface PlanStepDef {
  text: string;
  mode: 'auto' | 'manual';
  activityLink?: string;
  adapted?: boolean; // step was adapted during execution within delegated boundary
}

const PLAN_STEPS: PlanStepDef[] = [
  { text: 'Check whether final brand assets have arrived by 11:00.', mode: 'auto', activityLink: 'Brand assets received at 11:42' },
  { text: 'If assets are missing, follow up with the existing Orion client contact.', mode: 'auto', activityLink: 'Asset request sent to Orion client' },
  { text: 'If assets arrive late, adjust the internal review schedule by up to 2 hours.', mode: 'auto', activityLink: 'Internal review moved to 14:30', adapted: true },
  { text: 'Notify the internal design team of any schedule change.', mode: 'auto', activityLink: 'Design team notified at 11:45' },
  { text: 'If the client requests a change to the external delivery deadline, ask Maria before committing.', mode: 'manual' },
];

function getStepStates(phase: DemoPhase): StepState[] {
  switch (phase) {
    case 'working':
      return ['completed', 'completed', 'in-progress', 'pending', 'pending'];
    case 'attention':
    case 'deciding':
      return ['completed', 'completed', 'completed', 'completed', 'approval-needed'];
    case 'resuming':
      return ['completed', 'completed', 'completed', 'completed', 'in-progress'];
    case 'partial':
      return ['completed', 'completed', 'completed', 'completed', 'failed'];
    case 'complete':
      return ['completed', 'completed', 'completed', 'completed', 'completed'];
    default:
      return ['pending', 'pending', 'pending', 'pending', 'pending'];
  }
}

const STEP_ICON: Record<StepState, { symbol: string; color: string }> = {
  completed:       { symbol: '✓', color: 'var(--color-success)' },
  'in-progress':   { symbol: '●', color: 'var(--color-primary)' },
  pending:         { symbol: '○', color: 'var(--color-ink3)' },
  'approval-needed': { symbol: '◆', color: 'var(--color-attention)' },
  failed:          { symbol: '!', color: 'var(--color-error)' },
};

const STEP_STATUS_LABEL: Record<StepState, string | null> = {
  completed:         'Completed',
  'in-progress':     'In progress',
  pending:           null,
  'approval-needed': 'Waiting for your approval',
  failed:            'Failed — recovery in progress',
};

function ExecutionPlanBar({ phase, onViewActivity }: { phase: DemoPhase; onViewActivity: () => void }) {
  const [open, setOpen] = React.useState(false);
  const stepStates = getStepStates(phase);
  const completedCount = stepStates.filter(s => s === 'completed').length;
  const total = PLAN_STEPS.length;
  const isComplete = phase === 'complete';

  return (
    <div className="mb-4">
      {/* Compact summary bar */}
      <div
        className="flex items-center justify-between px-4 h-12 rounded-xl border"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <SectionLabel className="mb-0">Execution plan</SectionLabel>
          <span className="text-[13px] text-ink3">{completedCount} of {total} steps completed</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-[12px] font-medium transition-colors flex-shrink-0"
          style={{ color: 'var(--color-primary)' }}
        >
          {open ? 'Hide plan ↑' : (isComplete ? 'View execution plan →' : 'View plan →')}
        </button>
      </div>

      {/* Expandable plan panel */}
      {open && (
        <div
          className="mt-1 rounded-xl border overflow-hidden nova-fadein"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="px-4 h-11 flex items-center justify-between border-b border-border">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3">Approved steps</p>
            <span className="text-[12px] text-ink3">{completedCount} of {total} completed</span>
          </div>
          <div className="divide-y divide-border">
            {PLAN_STEPS.map((step, i) => {
              const state = stepStates[i];
              const icon = STEP_ICON[state];
              const statusLabel = STEP_STATUS_LABEL[state];
              const isDone = state === 'completed';
              return (
                <div key={i} className="grid grid-cols-[16px_minmax(0,1fr)_320px_92px] items-center gap-x-3 px-4 py-2 execution-step">
                  <span
                    className="flex-shrink-0 w-4 text-center text-sm font-semibold mt-px leading-none"
                    style={{ color: icon.color }}
                    aria-label={state}
                  >
                    {icon.symbol}
                  </span>
                  <div className="min-w-0">
                    <div>
                      <p
                        className="text-[13px] leading-[1.45]"
                        style={{
                          color: isDone ? 'var(--color-ink3)' : state === 'approval-needed' ? 'var(--color-ink)' : 'var(--color-ink2)',
                          textDecoration: undefined,
                          opacity: isDone ? 0.78 : 1,
                        }}
                      >
                        {step.text}
                      </p>

                    </div>
                    {statusLabel && (
                      <p className="text-[11px] mt-1" style={{ color: icon.color }}>{statusLabel}</p>
                    )}
                  </div>
                  <div className="min-w-0 flex items-center justify-start">
                    {isDone && step.activityLink && (
                      <button
                        onClick={onViewActivity}
                        className="text-[11px] font-medium transition-colors text-left whitespace-nowrap w-full"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {step.activityLink} · View activity →
                      </button>
                    )}
                  </div>
                  {isDone && step.adapted ? (
                    <span
                      className="justify-self-end inline-flex items-center justify-center whitespace-nowrap text-[11px] leading-none font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: 'var(--color-primarysurface)', color: 'var(--color-primary)', border: '1px solid var(--color-primaryborder)' }}
                    >
                      Updated
                    </span>
                  ) : <span aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatusRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-[10px]">
      <span className="text-[12px] font-semibold text-ink2 flex-shrink-0">{label}</span>
      <div className="flex items-center justify-end">{children}</div>
    </div>
  );
}

function AgentBadgeDisplay({ demoPhase }: { demoPhase: DemoPhase }) {
  const stateMap: Partial<Record<DemoPhase, any>> = {
    working: 'working', attention: 'attention', deciding: 'waiting',
    resuming: 'working', partial: 'partial', complete: 'completed',
  };
  return <AgentBadge state={stateMap[demoPhase] ?? 'working'} />;
}

function ResumingBanner() {
  const [sub, setSub] = useState<'received' | 'resumed'>('received');
  useEffect(() => {
    const t = setTimeout(() => setSub('resumed'), 1400);
    return () => clearTimeout(t);
  }, []);
  return <DecisionOutcome outcome={sub} />;
}

function PartialFailure({ onRetry }: { onRetry: () => void }) {
  const [retried, setRetried] = useState(false);
  const [showTech, setShowTech] = useState(false);

  function handleRetry() {
    setRetried(true);
    onRetry();
  }

  return (
    <Card variant="partial">
      <div className="p-4">
        {/* Human consequence first */}
        <div className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 inline-flex w-7 h-7 items-center justify-center rounded-full text-[14px] font-bold" style={{ color: 'var(--color-risk)', background: 'var(--color-risksurface)', border: '1px solid var(--color-riskborder)' }}>!</span>
          <div>
            <p className="text-base font-semibold text-ink mb-1">Calendar update didn't complete</p>
            <p className="text-[13px] text-ink2 leading-relaxed">
              Your team was already notified of the new 14:30 review time, but the calendar event still shows the previous time.
            </p>
          </div>
        </div>

        {/* What succeeded / what didn't */}
        <div className="rounded-lg overflow-hidden border border-border divide-y divide-border mb-4" style={{ background: 'var(--color-surface3)' }}>
          <div className="grid grid-cols-[24px_1fr] items-start gap-3 px-3.5 py-2">
            <span className="flex-shrink-0 inline-flex w-6 h-6 items-center justify-center rounded-full text-[13px] font-bold" style={{ color: 'var(--color-success)', background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)' }}>✓</span>
            <div>
              <p className="text-sm font-medium text-ink">Team notification sent</p>
              <p className="text-[12px] text-ink3">Team informed of 14:30 review start time.</p>
            </div>
          </div>
          <div className="grid grid-cols-[24px_1fr] items-start gap-3 px-3.5 py-2">
            <span className="flex-shrink-0 inline-flex w-6 h-6 items-center justify-center rounded-full text-[13px] font-bold" style={{ color: 'var(--color-error)', background: '#FFF1F2', border: '1px solid #FECDD3' }}>!</span>
            <div>
              <p className="text-sm font-medium text-ink">Calendar event not updated</p>
              <p className="text-[12px] text-ink3">Calendar still shows the original review time.</p>
            </div>
          </div>
        </div>

        {/* Risk */}
        <div className="px-3.5 pt-1 pb-2 rounded-lg mb-4 border" style={{ background: 'var(--color-cautionsurface)', borderColor: 'var(--color-cautionborder)' }}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--color-caution)' }}>⚠ Risk</p>
          <p className="text-[13px] text-ink2 leading-relaxed">Until this is fixed, your team may see two different review times.</p>
        </div>

        {/* Safe next action */}
        <div className="mb-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink3 mb-2">Safe next action</p>
          <p className="text-[13px] text-ink2 leading-relaxed">
            Retrying will update only the calendar event. Nova will not resend the team notification because that action already succeeded.
          </p>

          {!retried ? (
            <div className="flex items-center gap-2" style={{ marginTop: '20px' }}>
              <Button variant="primary" size="sm" onClick={handleRetry}>Retry calendar update</Button>
              <Button variant="secondary" size="sm">Handle manually</Button>
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg text-sm font-medium" style={{ background: 'var(--color-successsurface)', color: 'var(--color-success)', border: '1px solid var(--color-successborder)' }}>
              ✓ Calendar updated. Schedule is now consistent.
            </div>
          )}
        </div>

        {/* Technical details — progressive disclosure */}
        <button
          onClick={() => setShowTech(!showTech)}
          className="flex items-center gap-1.5 text-[12px] text-ink3 hover:text-ink2 transition-colors"
          aria-expanded={showTech}
        >
          <span style={{ display: 'inline-block', transition: 'transform 0.15s', transform: showTech ? 'rotate(90deg)' : '' }}>›</span>
          {showTech ? 'Hide technical details' : 'View technical details'}
        </button>
        {showTech && (
          <div className="mt-2 p-3 rounded-lg font-mono text-xs text-ink2 leading-relaxed" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
            <p>PATCH /api/calendar/events/orion-review-sep18</p>
            <p className="mt-1" style={{ color: 'var(--color-error)' }}>503 Service Unavailable</p>
            <p className="text-ink3 mt-1">Attempted at 14:24:11 UTC. Team notification (step 5) not retried — already succeeded.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

const COMPLETION_ITEMS = [
  { text: 'Dependency monitoring completed', meta: null },
  { text: 'Missing asset follow-up sent and fulfilled', meta: null },
  { text: 'Internal review rescheduled', meta: 'Within delegated authority' },
  { text: 'Design team notified of updated time', meta: null },
  { text: 'Delivery date updated to Monday 21 Sep', meta: 'Approved by Maria' },
  { text: 'Calendar sync recovered', meta: 'Recovered after partial failure' },
];

function CompletionSummary() {
  return (
    <Card variant="success">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-base font-semibold text-ink">Orion Website Redesign</p>
            <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-md" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}><span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink3">Goal</span><span className="text-[13px] font-medium text-ink2">Keep Orion on schedule</span></div>
          </div>
          <StatusChip status="on-track" />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="px-3 py-2 rounded-lg text-center" style={{ background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)' }}>
            <p className="text-[22px] font-semibold leading-none mb-0.5" style={{ color: 'var(--color-success)' }}>5</p>
            <p className="text-[14px] font-semibold text-ink">Nova handled</p>
            <p className="text-[11px] text-ink3">automatically</p>
          </div>
          <div className="px-3 py-2 rounded-lg text-center" style={{ background: 'var(--color-attentionsurface)', border: '1px solid var(--color-attentionborder)' }}>
            <p className="text-[22px] font-semibold leading-none mb-0.5" style={{ color: 'var(--color-attention)' }}>1</p>
            <p className="text-[14px] font-semibold text-ink">Maria decided</p>
            <p className="text-[11px] text-ink3">delivery date</p>
          </div>
          <div className="px-3 py-2 rounded-lg text-center" style={{ background: 'var(--color-cautionsurface)', border: '1px solid var(--color-cautionborder)' }}>
            <p className="text-[22px] font-semibold leading-none mb-0.5" style={{ color: 'var(--color-caution)' }}>1</p>
            <p className="text-[14px] font-semibold text-ink">Recovered</p>
            <p className="text-[11px] text-ink3">calendar sync</p>
          </div>
        </div>

        <Divider className="mb-0" />

        <div className="divide-y divide-border">
          {COMPLETION_ITEMS.map(({ text, meta }) => (
            <div key={text} className="grid grid-cols-[16px_minmax(0,1fr)_320px] items-center gap-x-3 py-2">
              <span className="flex-shrink-0 font-semibold text-sm text-center" style={{ color: 'var(--color-success)' }}>✓</span>
              <p className="text-sm text-ink">{text}</p>
              <p className="text-[12px] text-ink3 leading-tight text-left">{meta || ''}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 px-4 pt-2.5 pb-1.5 rounded-lg" style={{ background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>Delivery plan updated. Team synchronized.</p>
          <p className="text-[13px] text-ink2 mt-1.5">No action needed from you. Orion is on track for Monday 21 Sep.</p>
        </div>

        <div className="mt-1.5 px-4 pt-1 pb-2 rounded-lg flex items-start gap-2" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
          <span className="flex-shrink-0 text-[12px] text-ink3 mt-px">◈</span>
          <div>
            <p className="text-[12px] font-medium text-ink2 mb-1.5">Delegated authority expired</p>
            <p className="text-[12px] text-ink3 leading-relaxed">Goal-specific permissions granted for this workflow have expired. Future goals require a new delegation.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
