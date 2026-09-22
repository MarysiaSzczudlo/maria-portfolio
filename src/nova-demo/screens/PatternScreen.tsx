import React, { useState } from 'react';
import {
  Card, AgentBadge, Tag, Notice, ActivityItem, PlanStep,
  Button, EvidenceItem, KnowledgeEntry, SectionLabel, Divider,
  AuthorityTag, ActorTag, DecisionOutcome, T,
} from '../components/NovaUI';
import NovaCoreOrb from '../components/NovaCoreOrb';
import type { NovaCoreState } from '../components/NovaCoreOrb';

// ─── Documentation anatomy ──────────────────────────────────────────────────

function PatternDoc({
  index,
  name,
  problem,
  when,
  children,
  variants,
}: {
  index: number;
  name: string;
  problem: string;
  when: string;
  children: React.ReactNode;
  variants?: { label: string; node: React.ReactNode }[];
}) {
  return (
    <section className="py-12 border-b border-border last:border-0" aria-labelledby={`p-${index}`}>
      <div className="grid grid-cols-12 gap-4">
        {/* Left: metadata */}
        <div className="col-span-4">
          <p className="font-mono text-[13px] text-ink3 mb-2">{String(index).padStart(2, '0')}</p>
          <h2 id={`p-${index}`} className="text-xl font-semibold text-ink mb-5">{name}</h2>

          <div className="space-y-3">
            <div>
              <p className={T.overline + ' mb-1'}>Problem</p>
              <p className="text-sm text-ink2 leading-relaxed">{problem}</p>
            </div>
            <div>
              <p className={T.overline + ' mb-1'}>When to use</p>
              <p className="text-sm text-ink2 leading-relaxed">{when}</p>
            </div>
          </div>
        </div>

        {/* Right: example + variants */}
        <div className="col-span-8">
          <p className={T.overline + ' mb-3'}>Component example</p>
          {children}

          {variants && variants.length > 0 && (
            <div className="mt-6">
              <p className={T.overline + ' mb-3'}>States / variants</p>
              <div className="space-y-3">
                {variants.map((v) => (
                  <div key={v.label}>
                    <p className="text-[13px] font-medium text-ink3 mb-2">{v.label}</p>
                    {v.node}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Pattern Screen ─────────────────────────────────────────────────────────

export default function PatternScreen() {
  return (
    <div className="min-h-screen bg-bg nova-fadein">
      <div className="max-w-5xl mx-auto px-8 pt-8 pb-12">

        {/* Header */}
        <div className="mb-12 pb-10 border-b border-border">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border"
            style={{ background: 'var(--color-primarysurface)', color: 'var(--color-primary)', borderColor: 'var(--color-primaryborder)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
            Design System · v3
          </div>
          <h1 className={T.pageTitle + ' mb-3'}>NOVA — Agentic Interaction System</h1>
          <p className="text-base text-ink2 leading-relaxed max-w-2xl">
            Reusable patterns for safe delegation, autonomous execution, human intervention and recovery.
            Each pattern entry documents the problem it solves, when to use it, a live component example, and its states or variants.
          </p>

          {/* Three principles callout */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Permission ≠ Delegation Boundary', desc: 'A permission is a persistent rule. A delegation boundary is goal-scoped.' },
              { label: 'Delegation Boundary ≠ Approval', desc: 'A boundary defines scope. An approval authorizes one specific action.' },
              { label: 'Memory ≠ Authority', desc: 'Nova knowing something does not give it permission to act on it.' },
            ].map(({ label, desc }) => (
              <div key={label} className="p-4 rounded-xl border border-border" style={{ background: 'var(--color-surface)' }}>
                <p className="text-sm font-semibold text-ink mb-1">{label}</p>
                <p className="text-[13px] text-ink2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PRIMARY PATTERNS ── */}
        <div className="mb-4">
          <SectionLabel>Primary patterns</SectionLabel>
          <p className="text-sm text-ink2 mt-1 mb-0">The six core interaction patterns every NOVA workflow relies on.</p>
        </div>

        {/* 01 Agent Plan */}
        <PatternDoc
          index={1}
          name="Agent Plan"
          problem="Before Nova starts, the user doesn't know what actions it will take or which ones require approval — making blind delegation feel unsafe."
          when="Before any multi-step delegation. Always show the plan when steps include external actions or manual-approval steps."
          variants={[
            { label: 'Automatic step', node: <PlanStep number={1} text="Check whether final brand assets have arrived by 11:00." mode="auto" /> },
            { label: 'Approval-required step', node: <PlanStep number={2} text="Ask Maria before changing the client-facing delivery deadline." mode="manual" /> },
          ]}
        >
          <Card>
            <div className="p-4">
              <PlanStep number={1} text="Check whether brand assets arrived by 11:00." mode="auto" />
              <PlanStep number={2} text="If missing, follow up with the existing client contact." mode="auto" />
              <PlanStep number={3} text="Adjust internal review schedule by up to 2 hours if needed." mode="auto" />
              <PlanStep number={4} text="If client requests a deadline change, ask Maria before committing." mode="manual" />
            </div>
          </Card>
        </PatternDoc>

        {/* 02 Delegation Boundary */}
        <PatternDoc
          index={2}
          name="Delegation Boundary"
          problem="Users need to understand the scope of a specific delegated goal — what Nova can and cannot do while pursuing it — without consulting persistent permissions."
          when="Shown at the point of delegation, scoped to the current goal. Always pair with the Agent Plan. Never substitute for persistent Permissions."
        >
          <Card>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <SectionLabel className="mb-0">Delegation boundary</SectionLabel>
                <Tag variant="primary">This goal only</Tag>
              </div>
              <p className="text-[13px] text-ink2 leading-relaxed mb-2.5">
                For Orion tomorrow, Nova may coordinate internal scheduling but may not change client-facing commitments.
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-success)' }}>Nova can act</p>
                  <div className="text-[13px] text-ink2 space-y-0.5 pl-3">
                    <p>Request assets from existing client contact</p>
                    <p>Send internal reminders</p>
                    <p>Move meetings by up to 2 hours</p>
                  </div>
                </div>
                <Divider />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--color-attention)' }}>Nova must ask</p>
                  <div className="text-[13px] text-ink2 space-y-0.5 pl-3">
                    <p>Change the client-facing deadline</p>
                    <p>Create a new external commitment</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </PatternDoc>

        {/* 03 Permission */}
        <PatternDoc
          index={3}
          name="Permission"
          problem="Users need to see and understand Nova's persistent authority rules — what it can always do vs. what it always needs to ask before doing."
          when="On the Knowledge / Permissions screen. Not during individual workflows. Permissions persist across all goals and are not goal-scoped."
          variants={[
            { label: 'Automatic', node: (
              <div className="flex items-start gap-3 px-4 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <span className="font-semibold text-sm mt-0.5" style={{ color: 'var(--color-success)' }}>✓</span>
                <span className="text-ink">Send internal project reminders</span>
                <span className="ml-auto"><AuthorityTag mode="automatic" /></span>
              </div>
            )},
            { label: 'Requires approval', node: (
              <div className="flex items-start gap-3 px-4 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <span className="font-semibold text-sm mt-0.5" style={{ color: 'var(--color-attention)' }}>◆</span>
                <span className="text-ink">Changing a client-facing deadline</span>
                <span className="ml-auto"><AuthorityTag mode="requires-approval" /></span>
              </div>
            )},
          ]}
        >
          <Card>
            <div className="p-4 space-y-2">
              {[
                { text: 'Send internal project reminders', auto: true },
                { text: 'Request missing files from existing clients', auto: true },
                { text: 'Move internal meetings by up to 2 hours', auto: true },
                { text: 'Change a client-facing deadline', auto: false },
                { text: 'Create a new external commitment', auto: false },
              ].map((p) => (
                <div key={p.text} className="flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <span className="font-semibold" style={{ color: p.auto ? 'var(--color-success)' : 'var(--color-attention)' }}>
                    {p.auto ? '✓' : '◆'}
                  </span>
                  <span className="text-ink flex-1">{p.text}</span>
                  <AuthorityTag mode={p.auto ? 'automatic' : 'requires-approval'} />
                </div>
              ))}
            </div>
          </Card>
        </PatternDoc>

        {/* 04 Human Approval */}
        <PatternDoc
          index={4}
          name="Human Approval"
          problem="Nova encounters an action that exceeds its delegation boundary or permission. It must stop and surface a clear, evidence-backed decision to the user — without making the decision itself."
          when="When a specific consequential action is outside Nova's current authority. Always show: why Nova stopped, evidence, potential benefit and risk, Nova's view, and the user's options."
        >
          <HumanApprovalExample />
        </PatternDoc>

        {/* 05 Agent State */}
        <PatternDoc
          index={5}
          name="Agent State"
          problem="Users need to understand Nova's current operational status across four distinct dimensions: workflow state, execution result, authority mode, and actor — which are often confused."
          when="Anywhere Nova's status is displayed: activity feed, project cards, summary screens. Use the appropriate dimension; never mix categories."
          variants={[
            { label: 'All dimensions', node: (
              <div className="rounded-xl border border-border overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                {([
                  { label: 'Workflow states', chips: (
                    <div className="flex flex-wrap gap-2">
                      {(['planned','working','waiting','attention','paused','blocked','completed'] as const).map((s) => <AgentBadge key={s} state={s} />)}
                    </div>
                  )},
                  { label: 'Execution results', chips: (
                    <div className="flex flex-wrap gap-2">
                      {(['succeeded','partial','failed-safe'] as const).map((s) => <AgentBadge key={s} state={s} />)}
                    </div>
                  )},
                  { label: 'Authority mode', chips: (
                    <div className="flex flex-wrap gap-2">
                      <AuthorityTag mode="automatic" />
                      <AuthorityTag mode="requires-approval" />
                    </div>
                  )},
                  { label: 'Actor', chips: (
                    <div className="flex flex-wrap gap-2">
                      <ActorTag actor="nova" />
                      <ActorTag actor="human" />
                    </div>
                  )},
                ]).map((row, i, arr) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-4 px-5 py-3.5"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : undefined }}
                  >
                    <p className="text-[12px] font-semibold text-ink2 w-36 flex-shrink-0">{row.label}</p>
                    {row.chips}
                  </div>
                ))}
              </div>
            )},
          ]}
        >
          <Card>
            <div className="p-4">
              <p className="text-sm text-ink2 leading-relaxed mb-2.5">
                A workflow may simultaneously be in multiple states — for example: Working + Automatic (Nova is executing automatically), or Completed + Human decision (a person made the final call).
              </p>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-ink3 mb-1">Workflow state</p>
                  <AgentBadge state="working" />
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-ink3 mb-1">Authority mode</p>
                  <AuthorityTag mode="automatic" />
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-ink3 mb-1">Execution result</p>
                  <AgentBadge state="partial" />
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-ink3 mb-1">Actor</p>
                  <ActorTag actor="human" />
                </div>
              </div>
            </div>
          </Card>
        </PatternDoc>

        {/* 06 Recovery */}
        <PatternDoc
          index={6}
          name="Recovery"
          problem="When Nova partially fails, users see a confusing inconsistent state. A generic error gives no guidance. They need to know exactly what succeeded, what failed, what risk now exists, and the safest next action."
          when="Whenever an action group partially completes. Always separate succeeded from failed. Never re-run actions that already succeeded. Offer a manual fallback."
        >
          <Card>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)' }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-success)', color: 'white' }}>✓</span>
                <div>
                  <p className="text-sm font-semibold text-ink">Completed</p>
                  <p className="text-[13px] text-ink2">Design team was notified about the new review time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--color-errorsurface)', border: '1px solid var(--color-errorborder)' }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-error)', color: 'white' }}>△</span>
                <div>
                  <p className="text-sm font-semibold text-ink">Not completed</p>
                  <p className="text-[13px] text-ink2">Calendar event was not updated. API request failed (503).</p>
                </div>
              </div>
              <Notice type="caution" title="Risk">
                Your team may currently see two different review times.
              </Notice>
              <div>
                <p className="text-[13px] font-semibold text-ink mb-1">Safe next action</p>
                <p className="text-[13px] text-ink2 mb-3">Retry the calendar update. Nova will not resend the team notification — that action already succeeded.</p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">Retry calendar update</Button>
                  <Button variant="secondary" size="sm">Handle manually</Button>
                </div>
              </div>
            </div>
          </Card>
        </PatternDoc>

        {/* ── SECONDARY PATTERNS ── */}
        <div className="mt-16 mb-4 pt-8 border-t border-border">
          <SectionLabel>Secondary patterns</SectionLabel>
          <p className="text-sm text-ink2 mt-1 mb-0">Supporting patterns used throughout the product.</p>
        </div>

        {/* 07–14 condensed */}
        <div className="space-y-0">
          <SecondaryPattern number={7} name="Activity Item" purpose="Observable, human-readable record of what Nova did. Shows timestamp, action, outcome, and actor. Never exposes chain-of-thought or internal reasoning.">
            <div>
              <ActivityItem time="11:02" title="Requested missing assets from Orion client" detail="Email sent to James at Orion Systems." type="default" actor="nova" />
              <ActivityItem time="11:42" title="Brand assets received" detail="Final asset pack delivered." type="success" actor="nova" />
              <ActivityItem time="14:23" title="Delivery date change approved" detail="Maria accepted Monday delivery." type="default" actor="human" isLast />
            </div>
          </SecondaryPattern>

          <SecondaryPattern number={8} name="Attention Required" purpose="Surfaces situations that need human awareness without necessarily requiring an immediate decision. Softer urgency than Human Approval.">
            <div className="space-y-2">
              <Notice type="attention" title="Your attention is needed">Orion is at risk of missing the internal review window. Nova can handle this if you delegate.</Notice>
              <Notice type="caution" title="Potential schedule conflict">Moving the review conflicts with the Meridian catch-up.</Notice>
            </div>
          </SecondaryPattern>

          <SecondaryPattern number={9} name="Evidence" purpose="Specific, attributable facts Nova used to make a recommendation. Supports informed human decisions without burying the user in detail.">
            <Card>
              <div className="p-4">
                <p className={T.overline + ' mb-3'}>Evidence</p>
                <div className="space-y-2">
                  <EvidenceItem>Assets arrived 42 minutes late</EvidenceItem>
                  <EvidenceItem>QA currently has limited buffer time</EvidenceItem>
                  <EvidenceItem>Client explicitly requested the change</EvidenceItem>
                </div>
              </div>
            </Card>
          </SecondaryPattern>

          <SecondaryPattern number={10} name="Pause / Stop" purpose="Clear human override controls. Pause preserves state and allows resumption. Stop ends the workflow entirely. The difference must be explained before confirmation.">
            <Card>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Button variant="secondary">Pause Nova</Button>
                  <Button variant="ghost">Stop workflow</Button>
                </div>
                <div className="space-y-2 text-[13px] text-ink2">
                  <p><strong className="text-ink">Pause</strong> — suspends new actions. Context preserved. Nova can resume.</p>
                  <p><strong className="text-ink">Stop</strong> — ends the workflow. No further actions execute. Already-completed actions are not reversed.</p>
                  <p><strong className="text-ink">Cancel action</strong> — cancels one specific pending action, if cancellation is still possible.</p>
                </div>
              </div>
            </Card>
          </SecondaryPattern>

          <SecondaryPattern number={11} name="Decision Transition" purpose="After the user makes a decision, shows 'Decision received' then 'Nova resumed' — explicitly communicating the handoff from human authority back to agent execution.">
            <DecisionTransitionExample />
          </SecondaryPattern>

          <SecondaryPattern number={12} name="Knowledge Entry" purpose="Displays a single item of context Nova holds about the business. Shows type (Fact / Preference / Rule / Permission), source, scope, and freshness. Memory ≠ authority.">
            <Card>
              <div className="p-4">
                <KnowledgeEntry label="Preferred internal review time" value="Afternoons" type="preference" source="Maria" scope="All projects" freshness="Updated 1 month ago" />
                <KnowledgeEntry label="Orion communication channel" value="Email" type="fact" source="Orion project" scope="Orion only" freshness="Set at project start" />
                <KnowledgeEntry label="Working hours" value="Mon–Fri, 09:00–17:00" type="rule" source="You" scope="All projects" freshness="Updated 2 weeks ago" />
              </div>
            </Card>
          </SecondaryPattern>

          <SecondaryPattern number={13} name="Uncertainty" purpose="Communicates when Nova lacks sufficient confidence or information. Surfaces uncertainty explicitly rather than acting on incomplete information.">
            <Notice type="info" title="Uncertain">
              I cannot confirm whether James is still the current Orion contact. Please verify before I send an external message.
            </Notice>
          </SecondaryPattern>

          <SecondaryPattern number={14} name="Autonomy Upgrade" purpose="Recommends expanding Nova's permissions based on observed patterns. Requires explicit confirmation. Never silently converts observed behavior into new authority.">
            <AutonomyUpgradeExample />
          </SecondaryPattern>
        </div>

        {/* Principles footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <SectionLabel>Design principles</SectionLabel>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { p: 'Capability ≠ Permission', d: 'Nova may be technically able to perform an action without being authorized to do so.' },
              { p: 'Memory ≠ Authority', d: "Knowing something about Maria does not give Nova permission to act on it." },
              { p: 'Recommendation ≠ Decision', d: 'For consequential actions, Nova recommends. Maria decides.' },
              { p: 'Permission ≠ Delegation Boundary ≠ Approval', d: 'Three distinct concepts, three distinct UI patterns.' },
              { p: 'Conversation for intent', d: 'Use conversation to capture goals. Use structured UI for state, plans, and decisions.' },
              { p: 'Failure is a normal product state', d: 'Nova shows exactly what succeeded and what failed. Never a generic error.' },
            ].map(({ p, d }) => (
              <div key={p} className="p-4 rounded-xl border border-border" style={{ background: 'var(--color-surface)' }}>
                <p className="text-sm font-semibold text-ink mb-1">{p}</p>
                <p className="text-[13px] text-ink2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── NOVA CORE ── */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="mb-5">
            <SectionLabel>Nova Core</SectionLabel>
            <p className="text-sm text-ink2 mt-1">
              Nova's visual identity component. Communicates Nova's current state through color and animation — always paired with a text label.
            </p>
          </div>
          <NovaCoreSection />
        </div>

      </div>
    </div>
  );
}

// ─── Nova Core section ────────────────────────────────────────────────────────

const NOVA_CORE_STATES: Array<{
  state: NovaCoreState;
  label: string;
  description: string;
  context: string;
}> = [
  { state: 'ready',          label: 'Nova is ready',          description: 'Idle, waiting for instruction.',          context: 'Home greeting, sidebar, Ask Nova panel' },
  { state: 'understanding',  label: 'Understanding your goal', description: 'Parsing and interpreting user input.',     context: 'After goal is submitted' },
  { state: 'planning',       label: 'Building a plan',         description: 'Generating a structured execution plan.', context: 'Between goal submission and plan preview' },
  { state: 'working',        label: 'Nova is working',         description: 'Actively executing delegated workflow.',  context: 'Work screen, home active card' },
  { state: 'waiting',        label: 'Waiting for a response',  description: 'Blocked on an external dependency.',      context: 'Waiting for client or third party' },
  { state: 'needs-approval', label: 'Your decision is needed', description: 'A decision outside Nova\'s boundary.',    context: 'Attention banner, home urgent card' },
  { state: 'completed',      label: 'Goal completed',          description: 'Workflow finished successfully.',         context: 'Completion summary, home complete card' },
  { state: 'paused',         label: 'Workflow paused',         description: 'Halted due to a blocker or conflict.',   context: 'Partial completion or unresolvable error' },
];

function NovaCoreSection() {
  return (
    <div className="space-y-8">
      {/* States table */}
      <div className="rounded-xl border border-border overflow-hidden" style={{ background: 'var(--color-surface)' }}>
        {/* Column headers */}
        <div className="grid border-b border-border px-5 py-2.5" style={{ gridTemplateColumns: '1fr 1fr 2fr 2fr' }}>
          {['State', 'Label', 'Description', 'Typical context'].map(h => (
            <p key={h} className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3">{h}</p>
          ))}
        </div>
        {NOVA_CORE_STATES.map(({ state, label, description, context }) => (
          <div
            key={state}
            className="grid items-center px-5 py-3.5 border-b border-border last:border-0"
            style={{ gridTemplateColumns: '1fr 1fr 2fr 2fr' }}
          >
            <div className="flex items-center gap-2.5">
              <NovaCoreOrbPattern state={state} />
              <span className="font-mono text-[12px] text-ink3">{state}</span>
            </div>
            <p className="text-[13px] font-medium text-ink">{label}</p>
            <p className="text-[13px] text-ink2 pr-4">{description}</p>
            <p className="text-[13px] text-ink3">{context}</p>
          </div>
        ))}
      </div>

      {/* Size variants */}
      <div>
        <p className={T.overline + ' mb-4'}>Size variants</p>
        <div className="flex items-end gap-4">
          {([
            { label: 'S — 28px', px: 28, usage: 'Inline, sidebar, button' },
            { label: 'M — 40px', px: 40, usage: 'Status button, card header' },
            { label: 'L — 100px', px: 100, usage: 'Ask Nova panel, plan generation' },
          ] as const).map(({ label, px, usage }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center">
              <NovaCoreOrbPattern state="ready" px={px} />
              <div>
                <p className="text-[13px] font-semibold text-ink">{label}</p>
                <p className="text-[12px] text-ink3 mt-0.5">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility note */}
      <div className="px-4 py-3 rounded-xl border border-border text-[13px] text-ink2 leading-relaxed" style={{ background: 'var(--color-surface2)' }}>
        <strong className="font-semibold text-ink">Accessibility: </strong>
        Every Nova Core orb carries <code className="font-mono text-[12px] bg-border px-1 rounded">aria-hidden="true"</code> — the state is communicated through the adjacent text label, never through animation or color alone.
        Animations respect <code className="font-mono text-[12px] bg-border px-1 rounded">prefers-reduced-motion</code> and are disabled statically under that preference.
      </div>
    </div>
  );
}

function NovaCoreOrbPattern({ state, px }: { state: NovaCoreState; px?: number }) {
  return <NovaCoreOrb state={state} px={px ?? 28} />;
}

// ─── Secondary pattern wrapper ────────────────────────────────────────────────

function SecondaryPattern({ number, name, purpose, children }: { number: number; name: string; purpose: string; children: React.ReactNode }) {
  return (
    <section className="py-6 border-b border-border last:border-0" aria-labelledby={`sp-${number}`}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <p className="font-mono text-[13px] text-ink3 mb-1">{String(number).padStart(2, '0')}</p>
          <h3 id={`sp-${number}`} className="text-base font-semibold text-ink mb-3">{name}</h3>
          <p className="text-[13px] text-ink2 leading-relaxed">{purpose}</p>
        </div>
        <div className="col-span-8">{children}</div>
      </div>
    </section>
  );
}

// ─── Interactive examples ─────────────────────────────────────────────────────

function HumanApprovalExample() {
  const [decided, setDecided] = useState<string | null>(null);

  return (
    <Card>
      <div className="p-4">
        <div className="p-4 rounded-xl border mb-5" style={{ background: 'var(--color-attentionsurface)', borderColor: 'var(--color-attentionborder)' }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: 'var(--color-attention)' }}>◆</span>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-attention)' }}>Your decision is required</p>
          </div>
          <p className="text-[13px] text-ink2">This changes an external commitment and is outside Nova's current delegation boundary.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className={T.overline + ' mb-2'}>Why Nova stopped</p>
            <p className="text-[13px] text-ink2 leading-relaxed">Client requested moving delivery from Friday to Monday — a new external commitment requiring approval.</p>
          </div>
          <div>
            <p className={T.overline + ' mb-2'}>Evidence</p>
            <div className="space-y-1.5">
              <EvidenceItem>Assets arrived 42 min late</EvidenceItem>
              <EvidenceItem>QA buffer is limited</EvidenceItem>
              <EvidenceItem>Client requested directly</EvidenceItem>
            </div>
          </div>
        </div>

        <p className={T.overline + ' mb-2'}>Options</p>
        <div className="space-y-2 mb-4">
          {[
            { id: 'monday', label: 'Accept Monday delivery' },
            { id: 'friday', label: 'Keep Friday delivery' },
          ].map((opt) => (
            <button
              key={opt.id}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: decided === opt.id ? 'var(--color-primarysurface)' : 'var(--color-surface)',
                borderColor: decided === opt.id ? 'var(--color-primaryborder)' : 'var(--color-border)',
                color: decided === opt.id ? 'var(--color-primary)' : 'var(--color-ink)',
              }}
              onClick={() => setDecided(opt.id)}
              aria-pressed={decided === opt.id}
            >
              {opt.label}
              {decided === opt.id && <span className="ml-2 text-xs">✓ Selected</span>}
            </button>
          ))}
        </div>

        {decided && (
          <DecisionOutcome outcome="resumed" />
        )}
      </div>
    </Card>
  );
}

function DecisionTransitionExample() {
  const [phase, setPhase] = useState<'idle' | 'received' | 'resumed'>('idle');

  function trigger() {
    if (phase !== 'idle') { setPhase('idle'); return; }
    setPhase('received');
    setTimeout(() => setPhase('resumed'), 1400);
    setTimeout(() => setPhase('idle'), 3000);
  }

  return (
    <div className="space-y-2">
      <div className="min-h-[60px]">
        {phase !== 'idle' && <DecisionOutcome outcome={phase === 'resumed' ? 'resumed' : 'received'} />}
        {phase === 'idle' && (
          <div className="px-4 py-3 rounded-xl border border-border text-[13px] text-ink3 text-center" style={{ background: 'var(--color-surface2)' }}>
            Click below to see the transition →
          </div>
        )}
      </div>
      <Button variant="secondary" size="sm" onClick={trigger}>
        {phase === 'idle' ? 'Trigger transition' : 'Reset'}
      </Button>
    </div>
  );
}

function AutonomyUpgradeExample() {
  const [choice, setChoice] = useState<string | null>(null);
  const [showReason, setShowReason] = useState(false);

  return (
    <div className="rounded-xl p-4 border" style={{ background: 'var(--color-primarysurface)', borderColor: 'var(--color-primaryborder)' }}>
      <Tag variant="primary">Autonomy recommendation</Tag>
      <p className="text-sm font-semibold text-ink mt-3 mb-1">You approved 11 internal meeting changes under 2 hours.</p>
      <p className="text-[13px] text-ink2 leading-relaxed mb-2.5">Would you like Nova to handle these automatically in the future?</p>

      <div className="rounded-lg p-3 mb-4 grid grid-cols-2 gap-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1">Current permission</p>
          <p className="text-[13px] text-ink2">Ask before changing internal meetings.</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-1">Suggested permission</p>
          <p className="text-[13px] text-ink2">Nova may move internal meetings ≤ 2 hours (no external participants).</p>
        </div>
      </div>

      {!choice ? (
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="primary" size="sm" onClick={() => setChoice('allow')}>Allow automatically</Button>
          <Button variant="secondary" size="sm" onClick={() => setChoice('keep')}>Keep asking me</Button>
          <Button variant="ghost" size="sm" onClick={() => setChoice('custom')}>Customize rule</Button>
        </div>
      ) : (
        <div className="px-4 py-2.5 rounded-lg text-sm font-medium" style={{ background: 'var(--color-successsurface)', color: 'var(--color-success)', border: '1px solid var(--color-successborder)' }}>
          ✓ Preference saved. Permission updated only because you confirmed it explicitly.
        </div>
      )}

      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-primaryborder)' }}>
        <button onClick={() => setShowReason(!showReason)} className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--color-primary)' }}>
          <span style={{ transform: showReason ? 'rotate(90deg)' : '', display: 'inline-block', transition: 'transform 0.15s' }}>›</span>
          Why am I seeing this?
        </button>
        {showReason && (
          <p className="text-[13px] text-ink2 leading-relaxed mt-2 pl-4">
            You approved similar changes 11 times. Nova will not change this permission unless you explicitly confirm it here. Observation does not grant authority.
          </p>
        )}
      </div>
    </div>
  );
}
