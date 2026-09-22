import {useState} from 'react';
import NovaCoreOrb from '../nova/NovaCoreOrb';
import './nova-case-study.css';

const PASSWORD='AgenticnovA26!';
export function NovaCaseStudy(){
 const base=import.meta.env.BASE_URL; const demoUrl=`${base}nova-demo/`; 
 const [open,setOpen]=useState(sessionStorage.getItem('nova-case')==='1'); const [pw,setPw]=useState(''); const [err,setErr]=useState(false);
 if(!open) return <div className="case-gate"><div className="gate-orb"><NovaCoreOrb state="ready" px={118}/></div><div className="gate-box"><p className="kicker">PROTECTED CASE STUDY</p><h1>NOVA</h1><p className="gate-sub">Agentic Operations Assistant</p><form onSubmit={e=>{e.preventDefault(); if(pw===PASSWORD){sessionStorage.setItem('nova-case','1');setOpen(true)}else setErr(true)}}><label>Password</label><div className="gate-row"><input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false)}} autoFocus/><button>View case study →</button></div>{err&&<p className="gate-error">Incorrect password</p>}</form></div></div>;
 return <div className="case-page"><header className="case-nav"><a href={base} className="case-brand" aria-label="Back to portfolio"><NovaCoreOrb state="ready" px={24}/><span>NOVA</span></a><nav><a href={base}>Portfolio</a><a href="#prototype">Prototype</a><a href="#system">System</a><a href="#reflection">Reflection</a></nav></header>
 <main id="top">
  <section className="case-hero"><div><p className="kicker">AGENTIC AI · CONCEPT PROJECT</p><h1>NOVA</h1><h2>Agentic Operations Assistant</h2><p className="hero-lede">Designing how people delegate work to AI — with clear authority, human checkpoints and safe recovery.</p><div className="chips"><span>Product Design</span><span>Agentic AI</span><span>Human–AI Interaction</span></div><div className="meta"><span><b>ROLE</b>Product Designer</span><span><b>SCOPE</b>UX Strategy · Interaction Design · Prototyping</span><span><b>YEAR</b>2026</span></div></div><div className="hero-orb"><div className="orb-aura"></div><NovaCoreOrb state="ready" px={260}/><p>NOVA CORE<br/><span>One identity · state-aware behavior</span></p></div></section>

  <section className="case-section problem"><p className="kicker">THE PROBLEM</p><h2>AI assistants answer questions.<br/><em>Agents act.</em></h2><div className="short-copy"><p>Once AI can coordinate work, change schedules or create commitments, the design problem shifts from conversation to <b>delegated authority.</b></p><p>NOVA explores how to make autonomy understandable, bounded and recoverable.</p></div><div className="logic"><span>GOAL</span><i>→</i><span>PLAN</span><i>→</i><strong>AUTHORITY</strong><i>→</i><span>ACT</span><i>→</i><span>OBSERVE</span><i>→</i><span>ADAPT</span></div><p className="principle">Capability <em>≠</em> permission.</p></section>

  <section id="prototype" className="prototype-section"><div className="case-section proto-head"><div><p className="kicker">INTERACTIVE PROTOTYPE</p><h2>Don't just view it.<br/><em>Use NOVA.</em></h2></div><div><p>This is the actual frozen NOVA prototype — not a recreated portfolio mockup. Delegate the Orion goal and follow the flow through planning, execution, approval and recovery.</p><a className="proto-cta" href={demoUrl} target="_blank">Open full prototype ↗</a></div></div><div className="live-frame"><div className="live-bar"><span>● ● ●</span><b>LIVE NOVA PROTOTYPE</b><a href={demoUrl} target="_blank">Open full prototype ↗</a></div><iframe title="Interactive NOVA prototype" src={demoUrl}/></div><p className="live-note">Interactive · Click directly inside the prototype</p></section>

  <section className="case-section challenge"><p className="kicker">DESIGNING THE SYSTEM</p><h2>Four questions shaped<br/><em>every interaction.</em></h2><div className="four"><article><b>01</b><h3>Delegation</h3><p>What outcome is the user handing over?</p></article><article><b>02</b><h3>Authority</h3><p>What can NOVA do without asking?</p></article><article><b>03</b><h3>Transparency</h3><p>How does the user understand what is happening?</p></article><article><b>04</b><h3>Recovery</h3><p>What happens when only part of a workflow succeeds?</p></article></div></section>

  <section id="system" className="case-section system"><div className="system-copy"><p className="kicker">01 / DELEGATION</p><h2>Autonomy starts with<br/><em>a clear boundary.</em></h2><p>Before NOVA acts, the user sees the goal, proposed plan and delegation boundary. Low-consequence actions can proceed; external commitments require approval.</p></div><div className="system-map"><div><small>NOVA CAN ACT</small><b>Request assets</b><b>Send reminders</b><b>Move internal meetings ≤2h</b></div><div><small>NOVA MUST ASK</small><b>Change client deadline</b><b>Create external commitment</b></div></div></section>

  <section className="case-section control"><p className="kicker">02 / HUMAN CONTROL</p><h2>Friction follows<br/><em>consequence.</em></h2><div className="scale"><span>NOVA ACTS</span><i></i><span>INFORMS</span><i></i><span>PAUSES</span><i></i><strong>HUMAN DECIDES</strong></div><div className="orb-state-row"><div><NovaCoreOrb state="working" px={82}/><b>Working</b><span>Within delegated authority</span></div><div><NovaCoreOrb state="needs-approval" px={82}/><b>Decision required</b><span>Authority boundary reached</span></div><div><NovaCoreOrb state="paused" px={82}/><b>Paused</b><span>Partial failure</span></div><div><NovaCoreOrb state="completed" px={82}/><b>Completed</b><span>Goal finished</span></div></div></section>

  <section className="dark-section">
    <div className="case-section recovery">
      <p className="kicker">03 / RECOVERY</p>
      <h2>Failure isn't binary.</h2>
      <div className="recovery-layout">
        <div className="recovery-flow">
          <span>ACTION A <b>✓</b></span><i>→</i>
          <span>ACTION B <b>✓</b></span><i>→</i>
          <span>ACTION C <em>×</em></span><i>→</i>
          <strong>RETRY C</strong>
        </div>
        <div>
          <h3>Preserve successful state.<br/>Retry only what failed.</h3>
          <p>NOVA makes partial success visible and provides a safe next action instead of repeating the entire workflow.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="case-section memory"><p className="kicker">04 / MEMORY</p><h2>Memory <em>≠ authority.</em></h2><div className="memory-layout"><div className="memory-lines"><p><span>Working hours</span><b>Mon–Fri, 09:00–17:00</b></p><p><span>Preferred review time</span><b>Afternoons</b></p><p><span>Communication channel</span><b>Email</b></p></div><div><p className="memory-big">Context can improve NOVA's decisions. It cannot silently expand NOVA's permissions.</p><p>NOVA may suggest a broader rule after repeated approvals, but only the user can grant additional autonomy.</p></div></div></section>

  <section className="patterns"><div className="case-section"><p className="kicker">FROM FLOW TO SYSTEM</p><h2>Reusable patterns for<br/><em>agentic interaction.</em></h2><div className="pattern-row"><span>Delegation Contract</span><span>Plan Preview</span><span>Authority Boundary</span><span>Decision Support</span><span>Partial Failure</span><span>Progressive Autonomy</span></div><p className="hypothesis">Trust isn't created by making AI look more intelligent.<br/><b>It's created by making autonomy understandable, bounded and recoverable.</b></p><p className="disclaimer">Concept project · Product hypotheses and validation criteria, not measured product outcomes.</p></div></section>

  <section id="reflection" className="case-section reflection"><p className="kicker">REFLECTION</p><h2>Designing behavior,<br/><em>not just conversation.</em></h2><p>Designing NOVA shifted the focus from what AI should <b>say</b> to what AI should be allowed to <b>do</b>.</p><blockquote>Good agentic UX isn't about removing the human from the loop.<br/><b>It's about designing the right loop.</b></blockquote><a href="#top">↑ Back to top</a></section>
 </main></div>
}
