import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AskNovaPanel from './components/AskNovaPanel';
import HomeScreen from './screens/HomeScreen';
import WorkScreen from './screens/WorkScreen';
import ActivityScreen from './screens/ActivityScreen';
import KnowledgeScreen from './screens/KnowledgeScreen';
import PatternScreen from './screens/PatternScreen';
import SettingsScreen from './screens/SettingsScreen';

export type NavSection = 'home' | 'work' | 'activity' | 'knowledge' | 'settings' | 'patterns';

// The Orion demo lifecycle — these are product states, not portfolio navigation
export type DemoPhase =
  | 'idle'        // Orion at risk, not yet delegated
  | 'composing'   // Maria expressing a goal
  | 'planning'    // Reviewing Nova's proposed plan
  | 'delegating'  // Brief delegation confirmation
  | 'working'     // Nova executing autonomously
  | 'attention'   // Client request — decision needed
  | 'deciding'    // Maria reviewing decision options
  | 'resuming'    // After Maria's decision, Nova resuming
  | 'partial'     // Calendar event update failed
  | 'complete';   // Workflow done

export interface ActivityEvent {
  time: string;
  actor: 'nova' | 'human' | 'external';
  title: string;
  detail: string;
  type: 'default' | 'success' | 'error' | 'attention';
}

// Activity steps that appear automatically when Nova is working
const WORKING_STEPS: { delay: number; event: ActivityEvent }[] = [
  { delay: 1500,  event: { time: '09:03', actor: 'nova',     title: 'Checked project dependencies',          detail: 'Brand assets not received. Review schedule dependency identified.', type: 'default' } },
  { delay: 4000,  event: { time: '11:02', actor: 'nova',     title: 'Requested missing brand assets',         detail: 'Email sent to James at Orion Systems. Deadline of 12:00 communicated.', type: 'default' } },
  { delay: 7500,  event: { time: '11:42', actor: 'external', title: 'Brand assets received',                  detail: 'Final asset pack delivered by the Orion client.', type: 'success' } },
  { delay: 10000, event: { time: '11:44', actor: 'nova',     title: 'Internal review schedule updated',       detail: 'Moved from 13:00 to 14:30 within the 2-hour automatic permission. No client commitments changed.', type: 'success' } },
  { delay: 11000, event: { time: '11:44', actor: 'nova',     title: 'Plan adapted',                           detail: 'Step 3 updated: review window adjusted from 13:00 to 14:30 due to late asset delivery. Action remains within delegated authority — no approval required.', type: 'default' } },
  { delay: 12000, event: { time: '11:45', actor: 'nova',     title: 'Design team notified',                   detail: 'Team informed of the new 14:30 review start time.', type: 'success' } },
  { delay: 14500, event: { time: '14:10', actor: 'external', title: 'Client requested delivery-date change',  detail: 'Orion client requested moving delivery from Friday 18 Sep to Monday 21 Sep.', type: 'attention' } },
];

export default function PrototypeApp() {
  const [section, setSection] = useState<NavSection>('home');
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [askNovaOpen, setAskNovaOpen] = useState(false);

  function nav(s: NavSection) { setSection(s); }

  // Auto-progress activity steps when Nova is working
  useEffect(() => {
    if (phase !== 'working') return;
    const timers = WORKING_STEPS.map(({ delay, event }, i) =>
      setTimeout(() => {
        setEvents(prev => [...prev, event]);
        if (i === WORKING_STEPS.length - 1) setPhase('attention');
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Start delegation: confirm briefly, then start Nova working
  function handleDelegate() {
    const delegationEvent: ActivityEvent = {
      time: '08:47', actor: 'human',
      title: 'Goal delegated to Nova',
      detail: 'Orion Website Redesign: Keep project on schedule while Maria is away. Monitor dependencies, coordinate internal changes, escalate external commitments.',
      type: 'default',
    };
    setEvents([delegationEvent]);
    setPhase('delegating');
    setTimeout(() => setPhase('working'), 2000);
  }

  // After Maria makes her decision, show transition then partial failure
  function handleApproveDecision() {
    setEvents(prev => [
      ...prev,
      { time: '14:23', actor: 'human', title: 'Monday delivery approved', detail: 'Maria approved moving the Orion delivery date from Friday 18 Sep to Monday 21 Sep.', type: 'default' },
    ]);
    setPhase('resuming');
    setTimeout(() => {
      setPhase('partial');
      setEvents(prev => [
        ...prev,
        { time: '14:24', actor: 'nova', title: 'Calendar event update failed', detail: 'API returned 503. The team notification sent earlier was not retried — it already succeeded.', type: 'error' },
      ]);
    }, 2800);
  }

  // Retry the calendar update
  function handleRetry() {
    setEvents(prev => [
      ...prev,
      { time: '14:26', actor: 'nova', title: 'Calendar event updated successfully', detail: 'Retry succeeded. Schedule is now consistent across calendar and team notifications.', type: 'success' },
      { time: '14:26', actor: 'nova', title: 'Orion workflow completed', detail: 'Goal achieved. Delivery plan updated, team synchronized. No repeated actions.', type: 'success' },
    ]);
    setPhase('complete');
  }

  const showWorkAttention = section !== 'work' && phase === 'attention';

  function startComposing() {
    setSection('work');
    setPhase('composing');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar
        active={section}
        onNav={nav}
        workAttention={showWorkAttention}
        onAskNova={() => setAskNovaOpen(true)}
        phase={phase}
      />
      <main className="flex-1 overflow-y-auto min-w-0">
        {section === 'home' && (
          <HomeScreen
            phase={phase}
            onDelegate={startComposing}
            onViewWork={() => { setSection('work'); setPhase('idle'); }}
            onReviewDecision={() => { setSection('work'); setPhase('deciding'); }}
          />
        )}
        {section === 'work' && (
          <WorkScreen
            phase={phase}
            events={events}
            onReviewPlan={() => setPhase('planning')}
            onDelegate={handleDelegate}
            onReviewDecision={() => setPhase('deciding')}
            onApproveDecision={handleApproveDecision}
            onKeepFriday={() => setPhase('complete')}
            onRetry={handleRetry}
            onViewActivity={() => setSection('activity')}
            onBack={phase === 'composing' ? () => setPhase('idle') : undefined}
          />
        )}
        {section === 'activity' && <ActivityScreen events={events} phase={phase} />}
        {section === 'knowledge' && <KnowledgeScreen onViewWork={() => setSection('work')} />}
        {section === 'settings' && <SettingsScreen />}
        {section === 'patterns' && <PatternScreen />}
      </main>

      <AskNovaPanel
        open={askNovaOpen}
        onClose={() => setAskNovaOpen(false)}
        onDelegateGoal={startComposing}
      />
    </div>
  );
}
