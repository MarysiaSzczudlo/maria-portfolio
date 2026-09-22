import { useState } from 'react';
import { Card, SectionLabel, Button, KnowledgeEntry, Permission, Divider, Tag, T, Notice } from '../components/NovaUI';

interface KnowledgeScreenProps {
  onViewWork: () => void;
}

export default function KnowledgeScreen({ onViewWork: _onViewWork }: KnowledgeScreenProps) {
  const [autonomyChoice, setAutonomyChoice] = useState<string | null>(null);
  const [showAutonomyReason, setShowAutonomyReason] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editNotice, setEditNotice] = useState<string | null>(null);

  function handleEdit(label: string) {
    setEditingEntry(label);
    setEditNotice(`Editing "${label}" — in a full product this would open an inline editor.`);
    setTimeout(() => { setEditingEntry(null); setEditNotice(null); }, 3000);
  }

  function handleManagePermissions() {
    setEditNotice('Permission management panel — grant, narrow, or revoke permissions. Changes affect future Nova actions.');
    setTimeout(() => setEditNotice(null), 4000);
  }

  function handleManageKnowledge() {
    setEditNotice('Knowledge management — add, edit, or remove rules, preferences, and facts Nova uses when making decisions.');
    setTimeout(() => setEditNotice(null), 4000);
  }

  return (
    <div className="min-h-screen bg-bg nova-fadein">
      <div className="max-w-3xl mx-auto px-8 pt-8 pb-12 nova-sectioned-page">

        <div className="mb-5">
          <SectionLabel>Knowledge</SectionLabel>
          <h1 className={T.pageTitle}>How Nova works for you</h1>
          <p className={T.pageDesc}>What Nova is permitted to do, and what context it uses to make decisions.</p>
        </div>

        {/* ── Screen 9: Autonomy recommendation ── */}
        {!autonomyChoice && (
          <div
            className="rounded-xl p-5 mb-6 border"
            style={{ background: 'var(--color-primarysurface)', borderColor: 'var(--color-primaryborder)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Tag variant="primary">Autonomy recommendation</Tag>
                </div>
                <p className="text-sm font-semibold text-ink mb-1.5">
                  You approved 11 internal meeting changes under 2 hours.
                </p>
                <p className="text-sm text-ink2 leading-relaxed mb-0">
                  Would you like Nova to handle these automatically in the future?
                </p>

                <div
                  className="rounded-lg p-4 mb-5 mt-6 text-xs"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                >
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <p className="font-semibold text-ink3 uppercase tracking-wide text-xs mb-4">Current rule</p>
                      <p className="text-ink2">Ask before changing internal meetings.</p>
                    </div>
                    <div className="w-px bg-border flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-ink3 uppercase tracking-wide text-xs mb-4">Suggested rule</p>
                      <p className="text-ink2">
                        Nova may move internal meetings by up to 2 hours when there is no external
                        participant.
                      </p>
                    </div>
                  </div>
                  <p className="text-ink3 mt-4 pt-3 border-t border-border">
                    Scope: All internal projects
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setAutonomyChoice('allow')}
                  >
                    Allow automatically
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setAutonomyChoice('keep')}
                  >
                    Keep asking me
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAutonomyChoice('custom')}
                  >
                    Customize rule
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-primaryborder">
              <button
                onClick={() => setShowAutonomyReason(!showAutonomyReason)}
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                <span
                  className="inline-block transition-transform duration-150"
                  style={{ transform: showAutonomyReason ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ›
                </span>
                Why am I seeing this?
              </button>
              {showAutonomyReason && (
                <p className="text-xs text-ink2 leading-relaxed mt-4 pl-4">
                  You approved similar changes 11 times without modification. Nova observed this pattern
                  and is recommending a rule change. Nova will not apply this permission unless you
                  explicitly confirm it here.
                </p>
              )}
            </div>
          </div>
        )}

        {autonomyChoice && (
          <div
            className="rounded-xl p-4 mb-5"
            style={{ background: 'var(--color-successsurface)', border: '1px solid var(--color-successborder)' }}
          >
            <p className="text-sm font-semibold text-success mb-0.5">
              {autonomyChoice === 'allow'
                ? 'Permission updated: Nova may now move internal meetings by up to 2 hours automatically.'
                : autonomyChoice === 'keep'
                ? "Preference saved: Nova will continue to ask before changing internal meetings."
                : "Customization saved. You can refine this rule at any time."}
            </p>
            <p className="text-xs text-ink2">
              This change applies to all internal projects. You can modify it below at any time.
            </p>
          </div>
        )}

        {/* Edit notice */}
        {editNotice && (
          <div className="mb-4 nova-fadein">
            <Notice type="info">{editNotice}</Notice>
          </div>
        )}

        {/* ── Screen 8: Permissions ── */}
        <section className="mb-5" aria-labelledby="auto-heading">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-successborder)' }}>
            <div className="px-4 py-2.5 flex items-center justify-between gap-2" style={{ background: '#F0F9F4', borderBottom: '1px solid var(--color-successborder)' }}>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm" style={{ color: 'var(--color-success)' }}>✓</span>
                <SectionLabel className="mb-0">
                  <span id="auto-heading">Nova can do without asking</span>
                </SectionLabel>
              </div>
              <button
                onClick={handleManagePermissions}
                className="text-[12px] font-medium flex-shrink-0 transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                Edit permissions
              </button>
            </div>
            <div className="px-4 bg-surface">
              <Permission text="Send internal project reminders" mode="auto" />
              <Permission text="Request missing files from existing clients" mode="auto" />
              <Permission
                text={
                  autonomyChoice === 'allow'
                    ? 'Move internal meetings by up to 2 hours (updated)'
                    : 'Move internal meetings by up to 2 hours'
                }
                mode="auto"
              />
              <Permission text="Update internal project status" mode="auto" />
            </div>
          </div>
        </section>

        <section className="mb-5" aria-labelledby="manual-heading">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-attentionborder)' }}>
            <div className="px-4 py-2.5 flex items-center justify-between gap-2" style={{ background: 'var(--color-attentionsurface)', borderBottom: '1px solid var(--color-attentionborder)' }}>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm" style={{ color: 'var(--color-attention)' }}>◆</span>
                <SectionLabel className="mb-0">
                  <span id="manual-heading">Nova must ask before</span>
                </SectionLabel>
              </div>
              <button
                onClick={handleManagePermissions}
                className="text-[12px] font-medium flex-shrink-0 transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                Edit permissions
              </button>
            </div>
            <div className="px-4 bg-surface">
              <Permission text="Changing a client-facing deadline" mode="manual" />
              <Permission text="Creating a new external commitment" mode="manual" />
              <Permission text="Spending money" mode="manual" />
              <Permission text="Contacting a new client" mode="manual" />
            </div>
          </div>
        </section>

        {/* ── Context Nova uses ── */}
        <section className="mt-2" aria-labelledby="context-heading">
          <div className="flex items-center justify-between mb-1">
            <SectionLabel className="mb-0">
              <span id="context-heading">What Nova knows about your business</span>
            </SectionLabel>
            <button
              onClick={handleManageKnowledge}
              className="text-[12px] font-medium flex-shrink-0 transition-colors mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Manage knowledge
            </button>
          </div>
          <p className="text-xs text-ink3 mb-4 mt-1">
            Context Nova uses when making decisions. Memory is context, not authority.
          </p>

          <div className="mt-3">
          <Card>
            <div className="px-5">
              <KnowledgeEntry
                label="Working hours"
                value="Mon–Fri, 09:00–17:00"
                type="rule"
                source="You"
                scope="All projects"
                freshness="Updated 2 weeks ago"
                onEdit={() => handleEdit('Working hours')}
                separator
              />
              <KnowledgeEntry
                label="Preferred internal review time"
                value="Afternoons"
                type="preference"
                source="Maria"
                scope="All projects"
                freshness="Updated 1 month ago"
                onEdit={() => handleEdit('Preferred internal review time')}
                separator
              />
              <KnowledgeEntry
                label="Orion communication channel"
                value="Email"
                type="fact"
                source="Orion project"
                scope="Orion only"
                freshness="Set at project start"
                onEdit={() => handleEdit('Orion communication channel')}
                separator
              />
              <KnowledgeEntry
                label="Internal meeting buffer"
                value="Minimum 30 minutes before external calls"
                type="rule"
                source="You"
                scope="All projects"
                freshness="Updated 3 months ago"
                onEdit={() => handleEdit('Internal meeting buffer')}
              />
            </div>
          </Card>
          </div>

          <div
            className="mt-4 px-4 py-3 rounded-lg text-sm text-ink2 leading-relaxed"
            style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}
          >
            <strong className="font-semibold text-ink">Memory ≠ authority.</strong>{' '}
            Nova uses this context to make decisions that fit your working style.
            Context informs recommendations — it does not automatically grant permission for new actions.
          </div>
        </section>

      </div>
    </div>
  );
}
