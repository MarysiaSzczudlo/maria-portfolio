import { useState } from 'react';
import NovaCoreOrb from './NovaCoreOrb';

interface AskNovaPanelProps {
  open: boolean;
  onClose: () => void;
  onDelegateGoal: () => void;
}

const QUICK_ACTIONS = [
  { label: 'Check project status', response: "Orion is the most active workflow right now. Nova has completed dependency monitoring and asset follow-up. Meridian Brand Refresh is on track for Thursday review." },
  { label: 'Explain a decision', response: "The internal review was moved from 13:00 to 14:30 because brand assets arrived at 11:42 — 42 minutes after the original deadline. Moving by 90 minutes stays within the 2-hour automatic permission. No client commitments were changed." },
  { label: 'Delegate a new goal →', response: null }, // triggers full plan-preview + delegation flow
];

export default function AskNovaPanel({ open, onClose, onDelegateGoal }: AskNovaPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState<{ role: 'user' | 'nova'; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  if (!open) return null;

  function handleQuickAction(action: typeof QUICK_ACTIONS[0]) {
    if (action.response === null) {
      onDelegateGoal();
      onClose();
      return;
    }
    setConversation(prev => [
      ...prev,
      { role: 'user', text: action.label },
    ]);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setConversation(prev => [...prev, { role: 'nova', text: action.response! }]);
    }, 900);
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setConversation(prev => [...prev, { role: 'user', text }]);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setConversation(prev => [
        ...prev,
        { role: 'nova', text: "I can look into that for you. Currently all three active workflows are within expected parameters. Is there a specific project or decision you'd like me to explain?" },
      ]);
    }, 1000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(15, 23, 42, 0.15)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex flex-col bg-surface border-l border-border nova-slide-in"
        style={{ width: '360px', boxShadow: '0 0 40px rgba(0,0,0,0.12)' }}
        role="dialog"
        aria-label="Ask Nova"
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border">
          {/* Nova identity section */}
          <div className="flex flex-col items-center pt-6 pb-5 px-5 gap-3">
            <NovaCoreOrb state="ready" size="lg" />
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink3 mb-0.5">NOVA</p>
              <p className="text-[13px] font-medium" style={{ color: 'var(--color-ink2)' }}>Ready when you are.</p>
            </div>
          </div>
          {/* Title row */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-sm font-semibold text-ink">Ask Nova</p>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
              style={{ color: 'var(--color-ink3)' }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {/* Quick actions — shown when no conversation yet */}
          {conversation.length === 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink3 mb-3">Quick actions</p>
              <div className="space-y-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left px-3.5 py-3 rounded-xl text-sm font-medium border transition-colors"
                    style={{ background: 'var(--color-surface2)', borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
                  >
                    {action.label}
                    <span className="ml-1.5 text-ink3">→</span>
                  </button>
                ))}
              </div>
              <div
                className="mt-4 px-3.5 py-3 rounded-xl text-[13px] text-ink2 leading-relaxed space-y-1.5"
                style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)' }}
              >
                <p><strong className="font-semibold text-ink">Ask Nova</strong> — questions, status, explanations. No actions taken.</p>
                <p><strong className="font-semibold text-ink">Delegate to Nova</strong> — authorize a goal. Nova proposes a plan, you review and approve before any action is taken.</p>
              </div>
            </div>
          )}

          {/* Conversation */}
          {conversation.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'nova' && (
                <div className="flex-shrink-0 mt-0.5">
                  <NovaCoreOrb state="ready" px={24} />
                </div>
              )}
              <div
                className="max-w-[270px] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed"
                style={msg.role === 'user'
                  ? { background: 'var(--color-navy)', color: 'white' }
                  : { background: 'var(--color-surface2)', color: 'var(--color-ink)', border: '1px solid var(--color-border)' }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2.5 items-center">
              <NovaCoreOrb state="understanding" px={24} />
              <div
                className="px-3.5 py-2.5 rounded-xl text-sm text-ink3 border border-border"
                style={{ background: 'var(--color-surface2)' }}
              >
                <span className="nova-pulse">Nova is thinking…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-border">
          <div className="flex gap-2.5">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about a project or decision…"
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl text-sm border border-border outline-none transition-colors"
              style={{ background: 'var(--color-surface2)', color: 'var(--color-ink)' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 px-3.5 h-[40px] rounded-full text-sm font-medium transition-colors"
              style={{
                background: inputValue.trim() ? 'var(--color-primary)' : 'var(--color-surface2)',
                color: inputValue.trim() ? 'white' : 'var(--color-ink3)',
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
