import { type ReactNode, useState } from 'react';

// ─── Typography constants ───────────────────────────────────────────────────
// Applied consistently across all screens per the NOVA type scale:
//   Page title:      32px / semibold / high-contrast
//   Page desc:       16px / regular  / ink2
//   Section heading: 20px / semibold
//   Card title:      16px / semibold
//   Body:            14–16px / regular
//   Label:           14px / medium
//   Metadata:        13px  / regular / ink3 (WCAG AA #64748B)

export const T = {
  pageTitle:      'text-[32px] font-semibold leading-tight text-navy tracking-tight',
  pageSerif:      'text-[36px] font-serif leading-[1.12] text-navy tracking-[0.045em]' ,
  pageDesc:       'text-base text-ink2 leading-relaxed mt-2',
  sectionHeading: 'text-xl font-semibold text-ink',
  cardTitle:      'text-base font-semibold text-ink',
  body:           'text-sm text-ink leading-relaxed',
  bodyLg:         'text-base text-ink leading-relaxed',
  label:          'text-sm font-medium text-ink2',
  meta:           'text-[13px] text-ink3',
  overline:       'text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3',
  mono:           'font-mono text-[13px] text-ink3 tabular-nums',
};

// ─── Button ────────────────────────────────────────────────────────────────
// MD3 shape: full pill. State layers via .md3-state (index.css).

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'tonal';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const BTN_BASE =
  'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-100 cursor-pointer select-none md3-state whitespace-nowrap';

const BTN_SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 min-h-[36px] h-[36px]',
  md: 'px-5 py-2.5 text-sm gap-2 min-h-[40px] h-[40px]',
  lg: 'px-7 py-3 text-base gap-2 min-h-[44px] h-[44px]',
};

interface BtnStyle extends React.CSSProperties { border?: string; }

const BTN_VARIANTS: Record<ButtonVariant, BtnStyle> = {
  primary: { background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none' },
  secondary: { background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-outline)' },
  ghost: { background: 'transparent', color: 'var(--color-primary)', border: 'none' },
  danger: { background: 'var(--color-errorsurface)', color: 'var(--color-error)', border: '1px solid var(--color-errorborder)' },
  tonal: { background: 'var(--color-primarysurface)', color: 'var(--color-primary)', border: 'none' },
};

export function Button({ variant = 'primary', size = 'md', children, onClick, className = '', disabled, icon }: ButtonProps) {
  const { border, ...styleRest } = BTN_VARIANTS[variant];
  return (
    <button
      className={`${BTN_BASE} ${BTN_SIZES[size]} ${className}`}
      style={{ ...styleRest, border: border ?? 'none', opacity: disabled ? 0.38 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

// ─── Agent State Badge ──────────────────────────────────────────────────────
// Taxonomy separation: workflow state, execution result, authority, actor
// Each badge uses ICON + TEXT + COLOR — never color alone.

export type WorkflowState = 'planned' | 'working' | 'waiting' | 'attention' | 'paused' | 'blocked' | 'completed';
export type ExecutionResult = 'succeeded' | 'partial' | 'failed-safe';
export type AgentState = WorkflowState | ExecutionResult;

interface StateConfig {
  label: string;
  icon: string;          // text symbol for non-color communication
  bg: string;
  text: string;
  border: string;
  pulse?: boolean;
}

const STATE_CONFIG: Record<AgentState, StateConfig> = {
  // ── Workflow states ──────────────────────────────────────────────────
  planned:      { label: 'Planned',           icon: '○', bg: 'var(--color-surface2)',        text: 'var(--color-ink2)',      border: 'var(--color-border)',        pulse: false },
  working:      { label: 'Working',           icon: '◉', bg: 'var(--color-primarysurface)',   text: 'var(--color-primary)',   border: 'var(--color-primaryborder)', pulse: true  },
  waiting:      { label: 'Waiting',           icon: '◷', bg: 'var(--color-cautionsurface)',   text: 'var(--color-caution)',   border: 'var(--color-cautionborder)', pulse: false },
  attention:    { label: 'Needs attention',   icon: '◆', bg: 'var(--color-attentionsurface)', text: 'var(--color-attention)', border: 'var(--color-attentionborder)', pulse: false },
  paused:       { label: 'Paused',            icon: '⏸', bg: 'var(--color-surface2)',        text: 'var(--color-ink2)',      border: 'var(--color-border)',        pulse: false },
  blocked:      { label: 'Blocked',           icon: '✕', bg: 'var(--color-errorsurface)',     text: 'var(--color-error)',     border: 'var(--color-errorborder)',   pulse: false },
  completed:    { label: 'Completed',         icon: '✓', bg: 'var(--color-successsurface)',   text: 'var(--color-success)',   border: 'var(--color-successborder)', pulse: false },
  // ── Execution results ────────────────────────────────────────────────
  succeeded:    { label: 'Succeeded',         icon: '✓', bg: 'var(--color-successsurface)',   text: 'var(--color-success)',   border: 'var(--color-successborder)', pulse: false },
  partial:      { label: 'Partially completed', icon: '◑', bg: 'var(--color-risksurface)',   text: 'var(--color-risk)',      border: 'var(--color-riskborder)',    pulse: false },
  'failed-safe': { label: 'Failed safely',    icon: '△', bg: 'var(--color-errorsurface)',     text: 'var(--color-error)',     border: 'var(--color-errorborder)',   pulse: false },
};

export function AgentBadge({ state }: { state: AgentState }) {
  const c = STATE_CONFIG[state];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 rounded-full text-xs font-medium border whitespace-nowrap"
      style={{ height: '28px', background: c.bg, color: c.text, borderColor: c.border }}
      role="status"
      aria-label={c.label}
    >
      <span
        className={`flex-shrink-0 text-[10px] leading-none ${c.pulse ? 'nova-pulse' : ''}`}
        aria-hidden="true"
      >
        {c.icon}
      </span>
      {c.label}
    </span>
  );
}

// ─── Authority tag ─────────────────────────────────────────────────────────
// Separate from workflow state — represents who authorized an action

export function AuthorityTag({ mode }: { mode: 'automatic' | 'requires-approval' }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 rounded-full text-xs font-medium border whitespace-nowrap"
      style={{ height: '24px', ...(mode === 'automatic'
        ? { background: 'var(--color-successsurface)', color: 'var(--color-success)', borderColor: 'var(--color-successborder)' }
        : { background: 'var(--color-attentionsurface)', color: 'var(--color-attention)', borderColor: 'var(--color-attentionborder)' }
      )}}
    >
      {mode === 'automatic' ? '✓' : '◆'}
      {' '}
      {mode === 'automatic' ? 'Automatic' : 'Requires approval'}
    </span>
  );
}

// ─── Actor tag ─────────────────────────────────────────────────────────────
// Separate from state — represents who performed an action

export function ActorTag({ actor }: { actor: 'nova' | 'human' | 'external' }) {
  const styles = {
    nova:     { background: 'var(--color-primarysurface)', color: 'var(--color-primary)',  borderColor: 'var(--color-primaryborder)' },
    human:    { background: 'var(--color-surface2)',        color: 'var(--color-ink2)',     borderColor: 'var(--color-border)' },
    external: { background: 'var(--color-cautionsurface)',  color: 'var(--color-caution)',  borderColor: 'var(--color-cautionborder)' },
  };
  const labels = { nova: 'Nova action', human: 'Human decision', external: 'External event' };
  return (
    <span className="inline-flex items-center gap-1 px-2.5 rounded-full text-xs font-medium border whitespace-nowrap" style={{ height: '22px', ...styles[actor] }}>
      {labels[actor]}
    </span>
  );
}

// ─── Status chip (project risk level) ─────────────────────────────────────

const RISK_CHIP: Record<string, { bg: string; text: string; border: string; label: string; icon: string }> = {
  'at-risk':   { bg: 'var(--color-risksurface)',      text: 'var(--color-risk)',      border: 'var(--color-riskborder)',      label: 'At risk',         icon: '△' },
  'on-track':  { bg: 'var(--color-successsurface)',   text: 'var(--color-success)',   border: 'var(--color-successborder)',   label: 'On track',        icon: '✓' },
  'attention': { bg: 'var(--color-attentionsurface)', text: 'var(--color-attention)', border: 'var(--color-attentionborder)', label: 'Needs attention', icon: '◆' },
  'completed': { bg: 'var(--color-successsurface)',   text: 'var(--color-success)',   border: 'var(--color-successborder)',   label: 'Completed',       icon: '✓' },
};

export function StatusChip({ status }: { status: keyof typeof RISK_CHIP }) {
  const c = RISK_CHIP[status] ?? RISK_CHIP['on-track'];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 rounded-full text-xs font-medium border whitespace-nowrap"
      style={{ height: '28px', background: c.bg, color: c.text, borderColor: c.border }}
    >
      <span className="text-[10px]" aria-hidden="true">{c.icon}</span>
      {c.label}
    </span>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────

type CardVariant = 'default' | 'attention' | 'decision' | 'success' | 'error' | 'partial';

const CARD_VARIANT_STYLES: Record<CardVariant, React.CSSProperties> = {
  default:   { borderColor: 'var(--color-border)' },
  attention: { borderColor: 'var(--color-attentionborder)', borderLeftWidth: '3px', borderLeftColor: 'var(--color-attention)' },
  decision:  { borderColor: 'var(--color-attentionborder)' },
  success:   { borderColor: 'var(--color-successborder)' },
  error:     { borderColor: 'var(--color-errorborder)', borderLeftWidth: '3px', borderLeftColor: 'var(--color-error)' },
  partial:   { borderColor: 'var(--color-riskborder)', borderLeftWidth: '3px', borderLeftColor: 'var(--color-risk)' },
};

export function Card({ children, className = '', style, variant = 'default' }: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: CardVariant;
}) {
  return (
    <div
      className={`bg-surface border rounded-xl ${className}`}
      style={{ boxShadow: 'var(--elev-1)', ...CARD_VARIANT_STYLES[variant], ...style }}
    >
      {children}
    </div>
  );
}

// ─── Section overline label ────────────────────────────────────────────────

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.1em] text-ink2 mb-2 ${className}`}>
      {children}
    </p>
  );
}

// ─── Section heading (20px) ────────────────────────────────────────────────

export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-xl font-semibold text-ink mb-1 ${className}`}>{children}</h2>
  );
}

// ─── Tag / Chip ────────────────────────────────────────────────────────────

type TagVariant = 'default' | 'auto' | 'manual' | 'success' | 'caution' | 'error' | 'primary'
  | 'fact' | 'preference' | 'rule' | 'permission';

const TAG_STYLES: Record<TagVariant, React.CSSProperties> = {
  default:    { background: 'var(--color-surface2)',         color: 'var(--color-ink2)',       borderColor: 'var(--color-border)' },
  auto:       { background: 'var(--color-successsurface)',   color: 'var(--color-success)',    borderColor: 'var(--color-successborder)' },
  manual:     { background: 'var(--color-attentionsurface)', color: 'var(--color-attention)',  borderColor: 'var(--color-attentionborder)' },
  success:    { background: 'var(--color-successsurface)',   color: 'var(--color-success)',    borderColor: 'var(--color-successborder)' },
  caution:    { background: 'var(--color-cautionsurface)',   color: 'var(--color-caution)',    borderColor: 'var(--color-cautionborder)' },
  error:      { background: 'var(--color-errorsurface)',     color: 'var(--color-error)',      borderColor: 'var(--color-errorborder)' },
  primary:    { background: 'var(--color-primarysurface)',   color: 'var(--color-primary)',    borderColor: 'var(--color-primaryborder)' },
  // Knowledge types
  fact:       { background: 'var(--color-fact-surface)',       color: 'var(--color-fact-text)',       borderColor: 'var(--color-fact-border)' },
  preference: { background: 'var(--color-preference-surface)', color: 'var(--color-preference-text)', borderColor: 'var(--color-preference-border)' },
  rule:       { background: 'var(--color-rule-surface)',        color: 'var(--color-rule-text)',        borderColor: 'var(--color-rule-border)' },
  permission: { background: 'var(--color-primarysurface)',     color: 'var(--color-primary)',          borderColor: 'var(--color-primaryborder)' },
};

export function Tag({ children, variant = 'default' }: { children: ReactNode; variant?: TagVariant }) {
  return (
    <span
      className="inline-flex items-center px-2.5 rounded-full text-xs font-medium border whitespace-nowrap"
      style={{ height: '24px', ...TAG_STYLES[variant] }}
    >
      {children}
    </span>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`border-t border-border ${className}`} />;
}

// ─── Scope badge ───────────────────────────────────────────────────────────
// Read-only metadata; visually distinct from clickable elements.
// Square corners + neutral palette signal non-interactive state.

export function ScopeBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 text-[11px] font-medium whitespace-nowrap"
      style={{ height: '24px', borderRadius: '6px', background: 'var(--color-primarysurface)', color: 'var(--color-primary)', border: '1px solid var(--color-primaryborder)', fontWeight: 600 }}
      aria-label={`Scope: ${typeof children === 'string' ? children : ''}`}
    >
      {children}
    </span>
  );
}

// ─── Recommendation badge ──────────────────────────────────────────────────
// AI suggestion indicator — very subtle, non-coercive.

export function RecommendedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 text-[11px] font-semibold whitespace-nowrap"
      style={{ height: '24px', borderRadius: '6px', background: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-primaryborder)' }}
    >
      ✓ Recommended
    </span>
  );
}

// ─── Risky badge ───────────────────────────────────────────────────────────
// Caution indicator for options with meaningful risk.

export function RiskyBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 text-[11px] font-semibold whitespace-nowrap"
      style={{ height: '24px', borderRadius: '6px', background: 'var(--color-surface)', color: 'var(--color-risk)', border: '1px solid var(--color-riskborder)' }}
    >
      △ Higher risk
    </span>
  );
}

// ─── Notice banner ─────────────────────────────────────────────────────────

type NoticeType = 'info' | 'success' | 'caution' | 'error' | 'attention' | 'quiet';

const NOTICE_CFG: Record<NoticeType, { bg: string; border: string; icon: string; iconColor: string }> = {
  info:      { bg: 'var(--color-primarysurface)',   border: 'var(--color-primaryborder)',   icon: 'ℹ', iconColor: 'var(--color-primary)' },
  success:   { bg: 'var(--color-successsurface)',   border: 'var(--color-successborder)',   icon: '✓', iconColor: 'var(--color-success)' },
  caution:   { bg: 'var(--color-cautionsurface)',   border: 'var(--color-cautionborder)',   icon: '△', iconColor: 'var(--color-caution)' },
  error:     { bg: 'var(--color-errorsurface)',     border: 'var(--color-errorborder)',     icon: '✕', iconColor: 'var(--color-error)' },
  attention: { bg: 'var(--color-attentionsurface)', border: 'var(--color-attentionborder)', icon: '◆', iconColor: 'var(--color-attention)' },
  quiet:     { bg: 'var(--color-surface2)',         border: 'var(--color-border)',          icon: '·', iconColor: 'var(--color-ink3)' },
};

export function Notice({ type = 'info', title, children, showIcon = true }: {
  type?: NoticeType; title?: string; children: ReactNode; showIcon?: boolean;
}) {
  const s = NOTICE_CFG[type];
  return (
    <div className="rounded-lg p-3 border" style={{ background: s.bg, borderColor: s.border }} role="status">
      <div className="flex gap-3">
        {showIcon && (
          <span className="flex-shrink-0 text-sm font-bold leading-snug mt-0.5" style={{ color: s.iconColor }} aria-hidden="true">
            {s.icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {title && <p className="text-sm font-semibold mb-1" style={{ color: s.iconColor }}>{title}</p>}
          <div className="text-sm text-ink2 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Activity timeline item ─────────────────────────────────────────────────
// Includes actor tag to distinguish Nova action from human decision

type ActivityType = 'default' | 'success' | 'caution' | 'error' | 'attention';

const ACT_DOT: Record<ActivityType, string> = {
  default:   'var(--color-border2)',
  success:   'var(--color-success)',
  caution:   'var(--color-caution)',
  error:     'var(--color-error)',
  attention: 'var(--color-attention)',
};

const ACT_ICON: Record<ActivityType, string> = {
  default:   '·',
  success:   '✓',
  caution:   '△',
  error:     '✕',
  attention: '◆',
};

export function ActivityItem({ time, title, detail, type = 'default', actor, isLast }: {
  time: string; title: string; detail?: string; type?: ActivityType;
  actor?: 'nova' | 'human' | 'external'; isLast?: boolean;
}) {
  return (
    <div className="flex gap-3 relative">
      {!isLast && (
        <div className="absolute" style={{ left: '5px', top: '18px', bottom: 0, width: '1px', background: 'var(--color-border)' }} />
      )}
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
          style={{ background: ACT_DOT[type], outline: '2.5px solid var(--color-bg)' }}
          aria-hidden="true"
        />
      </div>
      <div className="pb-3 min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-mono text-[13px] text-ink3 tabular-nums">{time}</p>
          {actor && <ActorTag actor={actor} />}
        </div>
        <p className="text-sm font-medium text-ink">{title}</p>
        {detail && <p className="text-[13px] text-ink2 mt-0.5 leading-relaxed">{detail}</p>}
      </div>
    </div>
  );
}

// ─── Plan step ─────────────────────────────────────────────────────────────

export function PlanStep({ number, text, mode }: { number: number; text: string; mode: 'auto' | 'manual' }) {
  return (
    <div className="flex items-center gap-3 min-h-[46px] border-b border-border last:border-0 py-1">
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-surface2)', border: '1px solid var(--color-border)', fontSize: '11px', fontWeight: 600, color: 'var(--color-ink2)' }}
      >
        {number}
      </div>
      <p className="flex-1 text-sm text-ink">{text}</p>
      <AuthorityTag mode={mode === 'auto' ? 'automatic' : 'requires-approval'} />
    </div>
  );
}

// ─── Permission entry ──────────────────────────────────────────────────────

export function Permission({ text, mode }: { text: string; mode: 'auto' | 'manual' }) {
  return (
    <div className="flex items-center gap-3 min-h-[44px] border-b border-border last:border-0 py-1">
      <span
        className="flex-shrink-0 w-4 text-center font-semibold text-sm leading-none"
        style={{ color: mode === 'auto' ? 'var(--color-success)' : 'var(--color-attention)' }}
        aria-hidden="true"
      >
        {mode === 'auto' ? '✓' : '◆'}
      </span>
      <span className="text-sm text-ink">{text}</span>
    </div>
  );
}

// ─── Knowledge entry ───────────────────────────────────────────────────────
// type explicitly distinguished: Fact | Preference | Rule | Permission

type KnowledgeType = 'fact' | 'preference' | 'rule' | 'permission';

const KNOWLEDGE_TYPE_LABELS: Record<KnowledgeType, string> = {
  fact:       'Fact',
  preference: 'Preference',
  rule:       'Rule',
  permission: 'Permission',
};

export function KnowledgeEntry({ label, value, type, source, scope, freshness, onEdit, separator = false }: {
  label: string; value: string; type?: KnowledgeType;
  source: string; scope?: string; freshness: string; onEdit?: () => void; separator?: boolean;
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        paddingTop: 10,
        paddingBottom: separator ? 24 : 14,
        rowGap: 10,
        borderBottom: separator ? '1px solid var(--color-border)' : undefined,
      }}
    >
      {/* Row 1: label + tag (left) · freshness + edit (right) */}
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[13px] font-medium text-ink2">{label}</p>
          {type && <Tag variant={type}>{KNOWLEDGE_TYPE_LABELS[type]}</Tag>}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[12px] text-ink3">{freshness}</span>
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[12px] font-medium transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      {/* Row 2: saved value — strongest visual element */}
      <p className="text-[15px] font-semibold text-ink leading-snug text-left">{value}</p>
      {/* Row 3: source + scope metadata pills — equal rhythm around the saved value */}
      <div className="flex items-center justify-start gap-2 flex-wrap">
        <Tag>Source: {source}</Tag>
        {scope && <Tag>Scope: {scope}</Tag>}
      </div>
    </div>
  );
}

// ─── Stat box ──────────────────────────────────────────────────────────────

export function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[28px] font-semibold text-ink tabular-nums leading-none">{value}</span>
      <span className="text-[13px] text-ink3 leading-snug">{label}</span>
    </div>
  );
}

// ─── Collapsible ───────────────────────────────────────────────────────────

export function Collapsible({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-ink2 hover:text-ink transition-colors md3-state rounded"
        aria-expanded={open}
      >
        <span className="inline-block transition-transform duration-150" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          ›
        </span>
        {label}
      </button>
      {open && (
        <div className="mt-2 text-[13px] text-ink2 leading-relaxed p-3 rounded-lg" style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Page header ───────────────────────────────────────────────────────────

export function PageHeader({ eyebrow, title, subtitle, serif, actions }: {
  eyebrow?: string; title: ReactNode; subtitle?: string; serif?: boolean; actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div className="min-w-0">
        {eyebrow && <p className={`${T.overline} mb-2`}>{eyebrow}</p>}
        <h1 className={serif ? T.pageSerif : T.pageTitle}>{title}</h1>
        {subtitle && <p className={T.pageDesc}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0 mt-1">{actions}</div>}
    </div>
  );
}

// ─── Evidence item ─────────────────────────────────────────────────────────

export function EvidenceItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-ink2">
      <span className="flex-shrink-0 mt-0.5 text-ink3" aria-hidden="true">–</span>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}

// ─── Decision outcome ──────────────────────────────────────────────────────
// "Decision received → Nova resumed" transition

export function DecisionOutcome({ outcome }: { outcome: 'received' | 'resumed' }) {
  if (outcome === 'received') {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium animate-pulse"
        style={{ background: 'var(--color-attentionsurface)', color: 'var(--color-attention)', border: '1px solid var(--color-attentionborder)' }}
      >
        <span>◆</span> Decision applied — Monday 21 Sep is now the approved external commitment.
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium nova-fadein"
      style={{ background: 'var(--color-primarysurface)', color: 'var(--color-primary)', border: '1px solid var(--color-primaryborder)' }}
    >
      <span className="nova-pulse">◉</span> Nova resumed — updating the internal schedule and continuing Orion coordination.
    </div>
  );
}
