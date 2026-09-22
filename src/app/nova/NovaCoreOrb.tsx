import { useId } from 'react';

export type NovaCoreState = 'ready'|'understanding'|'planning'|'working'|'waiting'|'needs-approval'|'completed'|'paused';

type Cfg = { a:string; b:string; rim:string; speed:number; amplitude:number; glow:number };
const CFG:Record<NovaCoreState,Cfg> = {
  ready:{a:'#2f7cff',b:'#a855f7',rim:'#6d8cff',speed:9,amplitude:7,glow:.65},
  understanding:{a:'#19d9ff',b:'#73f3ff',rim:'#37d9ff',speed:4.8,amplitude:10,glow:.8},
  planning:{a:'#7c3cff',b:'#d15cff',rim:'#9b5cff',speed:4.2,amplitude:13,glow:.82},
  working:{a:'#0b6cff',b:'#57d9ff',rim:'#2e7dff',speed:2.6,amplitude:15,glow:.95},
  waiting:{a:'#ffb45e',b:'#ffd59a',rim:'#eaa35e',speed:12,amplitude:5,glow:.55},
  'needs-approval':{a:'#ff4fd8',b:'#b34cff',rim:'#e45bff',speed:18,amplitude:3,glow:.9},
  completed:{a:'#39d98a',b:'#8af0b5',rim:'#49d990',speed:14,amplitude:5,glow:.62},
  paused:{a:'#f59e0b',b:'#fb923c',rim:'#f97316',speed:16,amplitude:2,glow:.42},
};

export const NOVA_STATE_LABEL:Record<NovaCoreState,string>={ready:'Nova is ready',understanding:'Understanding your goal',planning:'Building a plan',working:'Nova is working',waiting:'Waiting for a response','needs-approval':'Your decision is needed',completed:'Goal completed',paused:'Workflow paused'};

interface Props { state?:NovaCoreState; size?:'sm'|'md'|'lg'; px?:number; className?:string }
const SIZE_PX={sm:28,md:40,lg:100} as const;

export default function NovaCoreOrb({state='ready',size='md',px,className=''}:Props){
  const uid=useId().replace(/[^a-zA-Z0-9]/g,'_'); const baseN=px??SIZE_PX[size]; const n=Math.round(baseN*1.4); const c=CFG[state];
  const big=n>=64;
  const y=50, a=c.amplitude;
  const p1=`M 8 ${y} C 25 ${y-a}, 34 ${y-a}, 50 ${y} S 75 ${y+a}, 92 ${y}`;
  const p2=`M 8 ${y} C 25 ${y+a}, 34 ${y+a}, 50 ${y} S 75 ${y-a}, 92 ${y}`;
  const p1b=`M 8 ${y} C 25 ${y+a}, 34 ${y+a}, 50 ${y} S 75 ${y-a}, 92 ${y}`;
  const p2b=`M 8 ${y} C 25 ${y-a}, 34 ${y-a}, 50 ${y} S 75 ${y+a}, 92 ${y}`;
  const dur=`${c.speed}s`;
  return <span className={`nova-core-wrap ${className}`} style={{width:n,height:n,display:'inline-flex',position:'relative',flexShrink:0}} aria-hidden="true">
    {big && <span className="nova-core-floor" style={{'--nova-rim':c.rim} as any}/>} 
    <svg width={n} height={n} viewBox="0 0 100 100" className={`nova-core-svg nc-${state}`} style={{overflow:'visible',position:'relative',zIndex:2}}>
      <defs>
        <radialGradient id={`${uid}base`} cx="35%" cy="28%" r="75%"><stop offset="0" stopColor="#18366e"/><stop offset=".42" stopColor="#091936"/><stop offset="1" stopColor="#020713"/></radialGradient>
        <radialGradient id={`${uid}glass`} cx="28%" cy="20%" r="48%"><stop offset="0" stopColor="#fff" stopOpacity=".22"/><stop offset=".35" stopColor={c.a} stopOpacity=".08"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
        <linearGradient id={`${uid}line`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={c.a} stopOpacity=".2"/><stop offset=".32" stopColor={c.a}/><stop offset=".52" stopColor="#fff"/><stop offset=".72" stopColor={c.b}/><stop offset="1" stopColor={c.b} stopOpacity=".2"/></linearGradient>
        <filter id={`${uid}shadow`} x="-70%" y="-70%" width="240%" height="240%"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={c.rim} floodOpacity={c.glow}/></filter>
        <filter id={`${uid}soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.1"/></filter>
        <clipPath id={`${uid}clip`}><circle cx="50" cy="50" r="45.5"/></clipPath>
      </defs>
      <g filter={`url(#${uid}shadow)`}>
        <circle cx="50" cy="50" r="46" fill={`url(#${uid}base)`}/>
        <circle cx="50" cy="50" r="45.5" fill={`url(#${uid}glass)`}/>
        <g clipPath={`url(#${uid}clip)`} className="nova-dna">
          <path d={p1} fill="none" stroke={c.a} strokeWidth="7" opacity=".12" filter={`url(#${uid}soft)`}/>
          {[ -4,-2,0,2,4 ].map((off,i)=><path key={`a${i}`} d={p1} transform={`translate(0 ${off})`} fill="none" stroke={`url(#${uid}line)`} strokeWidth=".72" opacity={.62+i*.07}>
            <animate attributeName="d" values={`${p1};${p1b};${p1}`} dur={dur} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".4 0 .2 1;.4 0 .2 1"/>
          </path>)}
          {[ -4,-2,0,2,4 ].map((off,i)=><path key={`b${i}`} d={p2} transform={`translate(0 ${off})`} fill="none" stroke={`url(#${uid}line)`} strokeWidth=".72" opacity={.48+i*.06}>
            <animate attributeName="d" values={`${p2};${p2b};${p2}`} dur={`${c.speed*1.08}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".4 0 .2 1;.4 0 .2 1"/>
          </path>)}
        </g>
        <circle cx="50" cy="50" r="46" fill="none" stroke={c.rim} strokeWidth="1.15" opacity=".82"/>
        <circle cx="50" cy="50" r="43.8" fill="none" stroke="#fff" strokeWidth=".42" opacity=".22"/>
      </g>
      {state==='needs-approval' && <g className="nova-approval-signal"><circle cx="50" cy="50" r="37" fill="none" stroke={c.rim} strokeWidth="1.2" opacity=".5"/><path d="M50 35v17" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/><circle cx="50" cy="59" r="1.7" fill="#fff"/></g>}
    </svg>
  </span>;
}
