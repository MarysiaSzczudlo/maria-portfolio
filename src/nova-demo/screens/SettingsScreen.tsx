import { useState } from 'react';
import { Card, SectionLabel, Button, Divider, Tag, T } from '../components/NovaUI';

type ToggleProps = { label: string; description?: string; defaultOn?: boolean };

function Toggle({ label, description, defaultOn = false }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3 min-h-[52px]">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-[13px] text-ink3 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className="flex-shrink-0 w-10 h-6 rounded-full relative transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{ background: on ? 'var(--color-primary)' : 'var(--color-border2)' }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-150"
          style={{ left: '2px', transform: on ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

type IntegrationStatus = 'connected' | 'disconnected' | 'error';

function Integration({ name, description, status }: { name: string; description: string; status: IntegrationStatus }) {
  const statusCfg: Record<IntegrationStatus, { label: string; variant: 'default' | 'success' | 'error' | 'caution' }> = {
    connected:    { label: 'Connected',    variant: 'success' },
    disconnected: { label: 'Not connected', variant: 'default' },
    error:        { label: 'Error',         variant: 'error' },
  };
  const cfg = statusCfg[status];

  return (
    <div className="flex items-center gap-4 py-3 min-h-[52px]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-medium text-ink">{name}</p>
          <Tag variant={cfg.variant}>{cfg.label}</Tag>
        </div>
        <p className="text-[13px] text-ink3 leading-relaxed">{description}</p>
      </div>
      <Button variant="secondary" size="sm">
        {status === 'connected' ? 'Manage' : 'Connect'}
      </Button>
    </div>
  );
}

function ResetContextRow() {
  const [state, setState] = useState<'default' | 'confirm' | 'done'>('default');

  if (state === 'done') {
    return (
      <div className="py-1">
        <div className="px-4 py-3 rounded-lg text-sm font-medium" style={{ background: 'var(--color-successsurface)', color: 'var(--color-success)', border: '1px solid var(--color-successborder)' }}>
          ✓ Nova's context has been reset. Permissions remain unchanged.
        </div>
      </div>
    );
  }

  if (state === 'confirm') {
    return (
      <div className="rounded-xl border border-border p-4 space-y-3" style={{ background: 'var(--color-surface2)' }}>
        <div>
          <p className="text-sm font-semibold text-ink mb-1">Reset Nova's context?</p>
          <p className="text-[13px] text-ink2 leading-relaxed">
            This clears inferred preferences and working context Nova has learned. Permissions will not be changed.
          </p>
          <p className="text-[13px] font-medium mt-2" style={{ color: 'var(--color-primary)' }}>Context ≠ Permission</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="danger" size="sm" onClick={() => setState('done')}>Reset context</Button>
          <Button variant="ghost" size="sm" onClick={() => setState('default')}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-ink">Reset Nova's context</p>
        <p className="text-[13px] text-ink3">Clears inferred preferences and working context. Does not change permissions.</p>
      </div>
      <Button variant="secondary" size="sm" onClick={() => setState('confirm')}>Reset context</Button>
    </div>
  );
}

export default function SettingsScreen() {
  return (
    <div className="min-h-screen bg-bg nova-fadein">
      <div className="max-w-3xl mx-auto px-8 pt-6 pb-10 nova-sectioned-page">

        <div className="mb-5">
          <SectionLabel>Settings</SectionLabel>
          <h1 className={T.pageTitle}>Workspace settings</h1>
          <p className={T.pageDesc}>Manage your profile, integrations, and how Nova behaves.</p>
        </div>

        {/* Profile */}
        <section className="mb-5" aria-labelledby="profile-heading">
          <SectionLabel><span id="profile-heading">Profile</span></SectionLabel>
          <Card>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="flex items-center justify-center flex-shrink-0 text-lg font-semibold"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-surface2)', border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
                >
                  M
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Maria Silva</p>
                  <p className="text-[13px] text-ink3">maria@studio.co · Owner</p>
                </div>
                <Button variant="secondary" size="sm" className="ml-auto">Edit profile</Button>
              </div>
              <Divider className="mb-3" />
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
                <div>
                  <p className="text-ink3 mb-0.5">Workspace</p>
                  <p className="font-medium text-ink">Studio</p>
                </div>
                <div>
                  <p className="text-ink3 mb-0.5">Plan</p>
                  <p className="font-medium text-ink">Professional</p>
                </div>
                <div>
                  <p className="text-ink3 mb-0.5">Time zone</p>
                  <p className="font-medium text-ink">Europe / Lisbon (UTC+1)</p>
                </div>
                <div>
                  <p className="text-ink3 mb-0.5">Working hours</p>
                  <p className="font-medium text-ink">Mon–Fri, 09:00–17:00</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Integrations */}
        <section className="mb-5" aria-labelledby="integrations-heading">
          <SectionLabel><span id="integrations-heading">Integrations</span></SectionLabel>
          <p className="text-[13px] text-ink2 mb-3 -mt-1">
            Nova uses these connections to take actions on your behalf. Only connect services you want Nova to access.
          </p>
          <Card>
            <div className="px-5 divide-y divide-border">
              <Integration name="Google Calendar" description="Nova can read and update your calendar within your permitted window." status="connected" />
              <Integration name="Gmail" description="Nova can read project-related emails and send on your behalf, within permissions." status="connected" />
              <Integration name="Notion" description="Nova can reference and update linked Notion project documents." status="disconnected" />
              <Integration name="Slack" description="Nova can send notifications to specified channels." status="error" />
            </div>
          </Card>
        </section>

        {/* Nova behaviour */}
        <section className="mb-5" aria-labelledby="nova-heading">
          <SectionLabel><span id="nova-heading">Nova behaviour</span></SectionLabel>
          <p className="text-[13px] text-ink2 mb-3 -mt-1">
            These preferences affect how Nova communicates, not what it is permitted to do. Permission rules are managed in the Knowledge section.
          </p>
          <Card>
            <div className="px-5 divide-y divide-border">
              <Toggle
                label="Activity summary notifications"
                description="Nova sends a summary when it completes a significant action or when you return after being away."
                defaultOn={true}
              />
              <Toggle
                label="Proactive risk alerts"
                description="Nova alerts you when it detects a project risk, even if no decision is required yet."
                defaultOn={true}
              />
              <Toggle
                label="Autonomy upgrade recommendations"
                description="Nova may suggest expanding its permissions based on patterns it observes."
                defaultOn={true}
              />
              <Toggle
                label="Daily briefing"
                description="Receive a morning summary of active workflows and any upcoming deadlines."
                defaultOn={false}
              />
            </div>
          </Card>
        </section>

        {/* Notification preferences */}
        <section className="mb-5" aria-labelledby="notif-heading">
          <SectionLabel><span id="notif-heading">Notifications</span></SectionLabel>
          <Card>
            <div className="px-5 divide-y divide-border">
              <Toggle label="Decision required — immediate" description="Notify immediately when Nova needs your input to proceed." defaultOn={true} />
              <Toggle label="Project risk — immediate" description="Notify immediately if a project status changes to at-risk." defaultOn={true} />
              <Toggle label="Workflow completed — digest" description="Receive a summary of completed workflows once per day." defaultOn={false} />
              <Toggle label="Autonomy suggestion — in-app only" description="Show in-app only; do not send email or push notifications." defaultOn={true} />
            </div>
          </Card>
        </section>

        {/* Account zone */}
        <section aria-labelledby="account-heading">
          <SectionLabel><span id="account-heading">Account</span></SectionLabel>
          <Card>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">Export your data</p>
                  <p className="text-[13px] text-ink3">Download a copy of your knowledge entries, permissions, and activity history.</p>
                </div>
                <Button variant="secondary" size="sm">Export</Button>
              </div>
              <Divider />
              <ResetContextRow />
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}
