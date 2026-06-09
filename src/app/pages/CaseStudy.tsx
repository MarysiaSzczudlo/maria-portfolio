import { useParams, Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ZoomableImage } from '../components/ZoomableImage';
import { DesignProcessTimeline } from '../components/DesignProcessTimeline';
import { QuickSummaryCard } from '../components/QuickSummaryCard';

import hyundaiHero from '../../imports/Hyundai_Tucson.png';
import hyundaiDesignSystem from '../../imports/1.10_Design_System.png';
import hyundaiGallery from '../../imports/1.16_Gallery.png';
import hyundaiImage from '../../imports/Hyundai.png';
import hsbcHero from '../../imports/hsbc_04.png';
import hsbc1 from '../../imports/hsbc_1.png';
import hsbc2 from '../../imports/hsbc_2.png';
import hsbc3 from '../../imports/hsbc_3.png';
import hsbcBeforeFlow from '../../imports/Zrzut_ekranu_2026-06-7_o_19.33.43.png';
import hsbcAfterFlow from '../../imports/1111.png';
import friscoHero from '../../imports/Frisco.png';
import friscoGuardrial from '../../imports/GUARDRIAL_MESSAGES.png';
import friscoDetail from '../../imports/friscooo.png';
import friscoMockups from '../../imports/frisco_mockups.png';
import acnHero from '../../imports/ACN_Bank.png';
import senioringHero from '../../imports/Booking_platfrom_Senioring.png';
import senioring1 from '../../imports/Zrzut_ekranu_2026-05-19_o_20.55.17.png';
import senioring2 from '../../imports/Zrzut_ekranu_2026-05-19_o_20.55.30.png';
import senioringDetail from '../../imports/senioring.png';

// Section wrapper — every other section gets a subtle tinted bg
function SectionBlock({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <section
      style={{
        backgroundColor: alt ? 'rgba(0,0,0,0.015)' : 'transparent',
        borderRadius: alt ? '16px' : '0',
        padding: alt ? '40px 36px' : '0',
        marginLeft: alt ? '-36px' : '0',
        marginRight: alt ? '-36px' : '0',
      }}
      className="mb-12 md:mb-16"
    >
      {children}
    </section>
  );
}

const projectOrder = ['hyundai-tucson', 'hsbc-banking', 'frisco-ach', 'acn-bank', 'senioring'];

export function CaseStudy() {
  const { projectId } = useParams();

  // Scroll to top when projectId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const projects: Record<string, any> = {
    'hyundai-tucson': {
      title: 'Hyundai Tucson NX4',
      subtitle: 'Cockpit Redesign · Concept Project',
      role: 'UX/UI Designer',
      timeline: 'March - May 2026',
      tools: 'Figma · FigJam · Midjourney · Gamma · Figma Make · DaVinci Resolve',
      scope: '12.3″ HMI Display + Physical Controls',
      heroImage: hyundaiHero,
      figmaLink: 'https://www.figma.com/proto/YEIbjTneX5QaA2lk3ACfDz/Tucson-NX4-Redesign?node-id=80-12405&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=80%3A12405&t=GE4kNmnrHwsp6QZ7-1',
      prototypeVideo: {
        url: 'https://player.vimeo.com/video/1199401747',
        caption: 'Full prototype Walkthrough — 12.3″ HMI Display redesign',
      },
      images: {
        designSystem: hyundaiDesignSystem,
        gallery: hyundaiGallery,
        additional: hyundaiImage,
      },
      overview:
        'This is a self-initiated concept project exploring a redesign of the Hyundai Tucson NX4 infotainment system from the ground up. Through extensive analysis of 345 NHTSA complaints and user research, I identified 22 critical pain points affecting driver safety and satisfaction.',
      challenge:
        'The existing infotainment system received numerous complaints about confusing navigation, buried features, and distracting interfaces that competed for driver attention. Our goal was to simplify complex interactions while maintaining feature richness.',
      approach: [
        'Conducted comprehensive analysis of 345 NHTSA complaints to identify patterns',
        'Performed competitive analysis of 8 automotive HMI systems',
        'Led 48 user testing sessions with Tucson owners across demographics',
        'Created journey maps for 12 critical driving scenarios',
        'Developed and tested 3 design directions through iterative prototyping',
      ],
      outcome:
        'The redesigned system prioritized essential driving information, simplified navigation to commonly-used features, and introduced adaptive UI that responds to driving context. Prototype testing showed significant improvements in task completion time and user satisfaction.',
      metrics: [
        { label: 'NHTSA Complaints Analyzed', value: '345' },
        { label: 'Pain Points Identified', value: '22' },
        { label: 'User Testing Sessions', value: '48' },
        { label: 'Research & Design Artifacts Created', value: '15' },
      ],
    },
    'hsbc-banking': {
      title: 'HSBC',
      subtitle: 'Mobile Banking Redesign',
      role: 'UX/UI Designer & AI Specialist',
      timeline: 'Sept 2025 - Feb 2026',
      team: '10+ designers & researchers',
      client: 'HSBC Global · Accenture Song',
      heroImage: hsbcHero,
      awardLink: 'https://ifdesign.com/en/winner-ranking/project/hsbc-banking-app/769705',
      awardText: 'iF Design Award 2026 Winner',
      images: {
        designSystem: hsbc1,
        gallery: hsbc3,
        additional: hsbc2,
      },
      quickSummary: {
        problem: 'Fragmented legacy banking app underperforming across 26 markets',
        solution: 'Unified, intelligent, human-centered mobile experience for 50M+ customers',
        role: 'UX/UI Designer & AI Specialist',
        keyResult: 'iF Design Award 2026 Winner',
      },
      overview:
        'HSBC\'s Global Banking App reimagines what a global banking experience should be. As the world\'s only international bank, HSBC needed a unified mobile experience matching its scale and ambition. The old app was disjointed, and underperforming. Together we defined and delivered the vision for the "world\'s best banking app" — one platform serving over 50 million customers across 26 markets. The result is a single, intelligent, human-centered app combining personalisation, conversational banking and global consistency. It turns a fragmented legacy system into a fluid, intuitive, and personal experience, a home that feels personal, wherever you are.',
      roleDescription:
        'I was responsible for creating wireframes, high-fidelity prototypes, interactive animations, and service blueprints. My tasks included user research, competitive analysis, and usability testing to ensure solutions met user needs. I worked closely with cross-functional teams, including developers and conversation designers, to build chatbot flows from scratch and define logic for global conversational experiences. Additionally, I designed interactions and animations for GenAI features, ensuring seamless integration into the app.',
      skills: ['UX/UI Design', 'User Flows', 'Usability Tests', 'High-Fidelity Prototype', 'Conversational Design', 'Interactions'],
      challenge:
        'The existing app suffered from fragmented user flows, inconsistent design patterns, and poor information hierarchy. Users struggled to complete basic banking tasks, leading to increased support calls and customer frustration.',
      designProcess: {
        teamContext: 'Team of 10+ people · My role: UX/UI Designer & AI Specialist · HSBC CCT UK Project · Accenture Song',
        phases: [
          {
            name: 'Research & Analysis',
            duration: '5 weeks',
            weeks: 5,
            role: 'Core contributor',
            contributions: [
              'Created synthetic user personas based on data analysis',
              'Conducted competitors analysis across global banking apps',
              'Led forums research to identify user pain points',
              'Supported partial user interviews',
              'Prepared research reports and synthesis documents',
            ],
            tools: ['Miro', 'Mobbin', 'FigJam', 'Notion'],
          },
          {
            name: 'Define & Strategy',
            duration: '3 weeks',
            weeks: 3,
            role: 'Support',
            contributions: [
              'Contributed to journey mapping and problem framing',
              'Helped translate research insights into design requirements',
            ],
            tools: ['FigJam', 'Miro', 'Notion'],
          },
          {
            name: 'Design & Prototyping',
            duration: '8 weeks',
            weeks: 8,
            role: 'Core contributor',
            contributions: [
              'Created high-fidelity interactive prototypes',
              'Designed animations and motion design for key interactions',
              'Designed GenAI feature interactions and micro-animations',
              'Built and adapted design system components for proposed changes',
            ],
            tools: ['Figma', 'Midjourney', 'After Effects'],
          },
          {
            name: 'Design System',
            duration: '2 weeks',
            weeks: 2,
            role: 'Core contributor',
            contributions: [
              'Contributed to the Conversational Experience Design System',
              'Created components and usage patterns',
              'Applied existing foundations while identifying opportunities for improvement',
            ],
            tools: ['Figma'],
          },
          {
            name: 'Test & Iterate',
            duration: '3 weeks',
            weeks: 3,
            role: 'Support',
            contributions: [
              'Supported usability testing sessions',
              'Iterated on prototypes based on test findings',
            ],
            tools: ['Maze', 'Figma'],
          },
        ],
      },
      beforeAfter: {
        before: hsbcBeforeFlow,
        after: hsbcAfterFlow,
        title: 'Downloading statements journey - Before and after',
        caption: 'One of many redesigned application flows. By implementing intuitive navigation and adding numerous new features, such as setting custom statement dates, switching to a paperless option, selecting a specific account, and much more, we have given users more control and options.',
      },
      approach: [
        'Analyzed user analytics data from 2M+ monthly active users',
        'Conducted 30+ user interviews across 26 markets',
        'Created a unified design system with 80+ reusable components',
        'Redesigned 15 core user flows based on task analysis',
        'Collaborated with security team to maintain compliance while improving UX',
      ],
      outcome:
        'The redesign introduced a clean, card-based interface with improved navigation and visual hierarchy. Transaction history became scannable, account switching seamless, and frequently-used features accessible within two taps.',
      metrics: [
        { label: 'Task Completion Time', value: '-40%' },
        { label: 'User Satisfaction', value: '+65%' },
        { label: 'Support Tickets', value: '-35%' },
        { label: 'Markets Launched', value: '26' },
      ],
      testimonial: {
        quote: 'Maria consistently demonstrated a positive attitude and brought strong creative energy to her work. Her UI craft was of high standard, showing excellent attention to detail, refinement, and consistency. She contributed meaningfully to the Conversational Experience Design System, creating components and usage patterns. Maria was notably proactive, often taking initiative and progressing work with minimal guidance. She showed strong potential, combining strong visual craft, growing systems thinking, and a collaborative mindset that elevated the team\'s work.',
        author: 'Joana Couto',
        role: 'Design & Digital Products Lead, Accenture Song',
      },
    },
    'frisco-ach': {
      title: 'FrisCoach',
      subtitle: 'AI Culinary Assistant',
      role: 'UX/UI Designer & AI Specialist',
      timeline: 'March 2025 - September 2025',
      team: '2 designers, 3 AI engineers',
      client: 'Frisco',
      heroImage: friscoHero,
      images: {
        designSystem: friscoGuardrial,
        gallery: friscoMockups,
        additional: friscoDetail,
      },
      quickSummary: {
        problem: 'Users needed help with meal planning but existing solutions felt robotic',
        solution: 'LLM-powered conversational assistant integrated into grocery ecosystem',
        role: 'UX/UI Designer & AI Specialist',
        keyResult: '15K+ active users, 68% conversion to purchase',
      },
      overview:
        'FrisCoach integrates an LLM-powered conversational assistant into Frisco\'s grocery ecosystem, helping users with meal planning, recipe discovery, and automated shopping list generation.',
      challenge:
        'Designing a conversational AI interface that feels natural and helpful without overpromising capabilities. Users needed clear boundaries of what the AI could do, while maintaining engagement and trust.',
      designProcess: {
        teamContext: 'FrisCoach stream · My role: UX/UI Designer & AI Specialist · Separate Lead above',
        phases: [
          {
            name: 'Discover',
            duration: '3 weeks',
            weeks: 3,
            role: 'Owner',
            contributions: [
              'User research on cooking habits and grocery shopping behavior',
              'Tested existing chatbot solutions with 200+ users',
              'Benchmarked AI assistant experiences (ChatGPT, Google Bard, Alexa)',
            ],
            tools: ['Maze', 'Google Forms', 'Miro'],
          },
          {
            name: 'Define',
            duration: '2 weeks',
            weeks: 2,
            role: 'Owner',
            contributions: [
              'Defined conversational design principles and guardrails',
              'Created user scenarios for different cooking skill levels',
              'Mapped LLM capabilities vs user expectations',
            ],
            tools: ['FigJam', 'Notion', 'Miro'],
          },
          {
            name: 'Design',
            duration: '6 weeks',
            weeks: 6,
            role: 'Owner',
            contributions: [
              'Designed full conversational UI patterns and response formats',
              'Created prompt engineering guidelines for recipe generation',
              'Designed fallback patterns for out-of-scope requests',
              'Built high-fidelity prototypes of conversation flows',
            ],
            tools: ['Figma', 'Voiceflow', 'FigJam'],
          },
          {
            name: 'Test',
            duration: '3 weeks',
            weeks: 3,
            role: 'Owner',
            contributions: [
              'Tested with 200+ users across cooking skill levels',
              'Iterated on tone, personality, and response formats',
              'Validated guardrail messages and edge cases',
            ],
            tools: ['Maze', 'Lookback', 'Dovetail'],
          },
          {
            name: 'Deliver',
            duration: '2 weeks',
            weeks: 2,
            role: 'Core contributor',
            contributions: [
              'Collaborated with AI engineers on implementation',
              'Defined logic for conversational flows',
              'QA of AI responses vs design intent',
            ],
            tools: ['Figma', 'Jira', 'Confluence'],
          },
        ],
      },
      approach: [
        'Developed conversational design principles and guardrails',
        'Created prompt engineering guidelines for recipe generation',
        'Designed fallback patterns for ambiguous or out-of-scope requests',
        'Tested with 200+ users across different cooking skill levels',
        'Iterated on tone, personality, and response formats',
      ],
      outcome:
        'The assistant successfully guides users from recipe inspiration to checkout. It adapts responses based on dietary preferences, suggests alternatives for missing ingredients, and learns from user feedback to improve recommendations.',
      metrics: [
        { label: 'Active Users', value: '15K+' },
        { label: 'Recipes Generated', value: '50K+' },
        { label: 'Engagement Rate', value: '+120%' },
        { label: 'Conversion to Purchase', value: '68%' },
      ],
    },
    'acn-bank': {
      title: 'ACN Bank',
      subtitle: 'Internal Banking Platform',
      role: 'Senior UX Designer',
      timeline: 'March - June 2025',
      team: '4 designers, 2 security experts',
      client: 'Accenture',
      heroImage: acnHero,
      hideGallery: true,
      overview:
        'Accenture required a secure, enterprise-grade banking platform for internal financial operations, with stringent security requirements and complex identity verification flows.',
      challenge:
        'Balancing security requirements with usability. The verification process needed to meet enterprise compliance standards while remaining accessible for employees with varying technical proficiency.',
      approach: [
        'Mapped all security touchpoints in the user journey',
        'Created progressive verification system with clear feedback',
        'Designed error states that guide rather than block',
        'Tested with 50+ employees across departments',
        'Worked closely with security team to validate compliance',
      ],
      outcome:
        'The platform introduced a stepped verification process with clear visual progress, helpful error messages, and smart defaults. Security was maintained while dramatically reducing friction and user error.',
      metrics: [
        { label: 'Verification Time', value: '-60%' },
        { label: 'Security Compliance', value: '100%' },
        { label: 'User Error Rate', value: '-75%' },
        { label: 'Employee Satisfaction', value: '4.6/5' },
      ],
    },
    'senioring': {
      title: 'Senioring',
      subtitle: 'Booking Platform for Seniors',
      role: 'UX Designer',
      timeline: 'Nov 2022 - Feb 2023',
      team: '2 designers, 1 Product Owner',
      client: 'Lizard Media Software House',
      heroImage: senioringHero,
      miroLink: 'https://miro.com/app/board/uXjVMfygy7E=/?share_link_id=4187454633',
      miroText: 'View Design Flow Map',
      images: {
        designSystem: senioring1,
        gallery: senioring2,
        additional: senioringDetail,
      },
      overview:
        'Senioring is a travel booking platform designed specifically for senior citizens, prioritizing accessibility, clarity, and ease of use for elderly users navigating digital interfaces.',
      challenge:
        'Existing booking platforms overwhelm elderly users with dense information, small touch targets, and complex multi-step flows. We needed to simplify without patronizing or removing necessary functionality.',
      approach: [
        'Conducted in-depth research with 40+ users aged 65-85',
        'Observed booking behaviors and identified friction points',
        'Applied WCAG AAA accessibility standards throughout',
        'Designed with large touch targets (minimum 48px) and clear typography',
        'Created step-by-step flows with progress indicators and easy backtracking',
      ],
      outcome:
        'The platform features generous spacing, high contrast, clear labeling, and forgiving interaction patterns. Complex forms are broken into digestible steps, and help is contextual and non-intrusive.',
      metrics: [
        { label: 'Accessibility Score', value: 'AAA' },
        { label: 'Task Success Rate', value: '94%' },
        { label: 'Customer Satisfaction', value: '4.8/5' },
        { label: 'Completion Rate', value: '+85%' },
      ],
    },
  };

  // Hero images keyed by project id for the Next Project card
  const heroImages: Record<string, string> = {
    'hyundai-tucson': hyundaiHero,
    'hsbc-banking': hsbcHero,
    'frisco-ach': friscoHero,
    'acn-bank': acnHero,
    'senioring': senioringHero,
  };

  const currentId = projectId || 'hyundai-tucson';
  const project = projects[currentId] || projects['hyundai-tucson'];

  const currentIndex = projectOrder.indexOf(currentId);
  const nextId = projectOrder[(currentIndex + 1) % projectOrder.length];
  const nextProject = projects[nextId];

  const sectionHeading = (text: string) => (
    <h2
      className="font-normal mb-6"
      style={{ fontSize: '24px', color: 'var(--portfolio-text-primary)' }}
    >
      {text}
    </h2>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 pb-16 md:pb-24">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-12 transition-all duration-200 px-4 py-2 rounded-full"
        style={{
          color: 'var(--portfolio-text-secondary)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'translateX(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={18} />
        <span className="font-normal" style={{ fontSize: '16px' }}>Back to Projects</span>
      </Link>

      {/* Hero */}
      <div className="mb-20">
        <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-8">
          <h1
            className="font-normal"
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              color: 'var(--portfolio-text-primary)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h1>
          <span
            className="font-normal"
            style={{
              fontSize: 'clamp(20px, 3.5vw, 32px)',
              color: 'var(--portfolio-text-tertiary)',
            }}
          >
            {project.subtitle}
          </span>
        </div>

        {/* Project Meta */}
        <div className="flex flex-wrap gap-6 md:gap-12 max-w-5xl">
          <div>
            <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</p>
            <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.role}</p>
          </div>
          <div>
            <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timeline</p>
            <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.timeline}</p>
          </div>
          {project.team && (
            <div>
              <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team</p>
              <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.team}</p>
            </div>
          )}
          {project.client && (
            <div>
              <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</p>
              <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.client}</p>
            </div>
          )}
          {project.tools && (
            <div>
              <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</p>
              <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.tools}</p>
            </div>
          )}
          {project.scope && (
            <div>
              <p className="font-normal mb-2" style={{ fontSize: '12px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scope</p>
              <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>{project.scope}</p>
            </div>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-8">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{ border: `1px solid var(--portfolio-border)`, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}
        >
          <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {project.figmaLink && (
          <div className="mt-8 flex justify-center">
            <a href={project.figmaLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{ backgroundColor: 'rgba(0, 102, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid var(--portfolio-accent)', color: 'var(--portfolio-accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--portfolio-accent)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 102, 255, 0.05)'; e.currentTarget.style.color = 'var(--portfolio-accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>Check the Detailed Overview</span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}
        {project.awardLink && (
          <div className="mt-8 flex justify-center">
            <a href={project.awardLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid #D4AF37', color: '#D4AF37' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)'; e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>{project.awardText || 'View Award'}</span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}
        {project.miroLink && (
          <div className="mt-8 flex justify-center">
            <a href={project.miroLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{ backgroundColor: 'rgba(255, 208, 0, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid #FFD000', color: '#F5B800' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFD000'; e.currentTarget.style.color = '#1A1A2E'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 208, 0, 0.05)'; e.currentTarget.style.color = '#F5B800'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>{project.miroText || 'View in Miro'}</span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Quick Summary Card */}
      {project.quickSummary && (
        <QuickSummaryCard
          problem={project.quickSummary.problem}
          solution={project.quickSummary.solution}
          role={project.quickSummary.role}
          keyResult={project.quickSummary.keyResult}
        />
      )}

      {/* Content — max-w-3xl with alternating section backgrounds */}
      <div className="max-w-3xl">

        {/* Overview */}
        <SectionBlock>
          {sectionHeading('Overview')}
          <p className="font-normal" style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
            {project.overview}
          </p>
        </SectionBlock>

        {/* My Role */}
        {project.roleDescription && (
          <SectionBlock alt>
            {sectionHeading('My Role')}
            <p className="font-normal mb-6" style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
              {project.roleDescription}
            </p>
            {project.skills && (
              <div className="flex flex-wrap gap-3 mt-6">
                {project.skills.map((skill: string, index: number) => (
                  <div key={index} className="px-4 py-2 rounded-lg" style={{ fontSize: '14px', color: 'var(--portfolio-text-primary)', backgroundColor: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--portfolio-border)' }}>
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </SectionBlock>
        )}

        {/* Challenge */}
        <SectionBlock alt={!project.roleDescription}>
          {sectionHeading('Challenge')}
          <p className="font-normal" style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
            {project.challenge}
          </p>
        </SectionBlock>

        {/* Design Process */}
        {project.designProcess && (
          <SectionBlock alt={!!project.roleDescription}>
            <DesignProcessTimeline
              teamContext={project.designProcess.teamContext}
              phases={project.designProcess.phases}
            />
          </SectionBlock>
        )}

        {/* Before & After — HSBC specific */}
        {project.beforeAfter && (
          <SectionBlock alt={!project.roleDescription}>
            {sectionHeading(project.beforeAfter.title || 'Before & After')}

            {/* New Before/After Layout */}
            {project.beforeAfter.before && project.beforeAfter.after ? (
              <div className="space-y-6 mb-4">
                {/* Before Section */}
                <div>
                  <h3 className="font-normal mb-3" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)', fontWeight: '600' }}>
                    Before
                  </h3>
                  <div
                    className="w-full rounded-2xl overflow-hidden"
                    style={{ border: `1px solid var(--portfolio-border)`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
                  >
                    <ZoomableImage src={project.beforeAfter.before} alt="Before - Downloading statements journey" maxScale={5} />
                  </div>
                </div>

                {/* After Section */}
                <div>
                  <h3 className="font-normal mb-3" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)', fontWeight: '600' }}>
                    After
                  </h3>
                  <div
                    className="w-full rounded-2xl overflow-hidden"
                    style={{ border: `1px solid var(--portfolio-border)`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
                  >
                    <ZoomableImage src={project.beforeAfter.after} alt="After - Downloading statements journey" maxScale={5} />
                  </div>
                </div>
              </div>
            ) : project.beforeAfter.images ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {project.beforeAfter.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-full rounded-2xl overflow-hidden"
                    style={{ border: `1px solid var(--portfolio-border)`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
                  >
                    <ZoomableImage src={img} alt={`Before and After comparison ${idx + 1}`} maxScale={5} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="w-full rounded-2xl overflow-hidden mb-4"
                style={{ border: `1px solid var(--portfolio-border)`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}
              >
                <ZoomableImage src={project.beforeAfter.image} alt="Before and After comparison" maxScale={5} />
              </div>
            )}

            <p className="font-normal" style={{ fontSize: '15px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
              {project.beforeAfter.caption}
            </p>
          </SectionBlock>
        )}

        {/* Approach */}
        <SectionBlock>
          {sectionHeading('Approach')}
          <ul className="space-y-3">
            {project.approach.map((item: string, index: number) => (
              <li key={index} className="font-normal flex gap-3" style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
                <span style={{ color: 'var(--portfolio-accent)' }}>◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>

        {/* Images Grid */}
        {project.images && !project.hideGallery && (
          <SectionBlock alt>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              {project.images.designSystem && (
                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                  <ZoomableImage src={project.images.designSystem} alt="Design System" maxScale={5} />
                </div>
              )}
              {project.images.additional && (
                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                  <ZoomableImage src={project.images.additional} alt="Project Detail" maxScale={5} />
                </div>
              )}
            </div>
            {project.images.gallery && (
              <div className="w-full rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                <ZoomableImage src={project.images.gallery} alt="Screen Gallery" maxScale={5} />
              </div>
            )}
          </SectionBlock>
        )}

        {/* Prototype Walkthrough Video */}
        {project.prototypeVideo && (
          <SectionBlock>
            {sectionHeading('Prototype Walkthrough')}
            <div
              className="w-full rounded-2xl overflow-hidden mb-4 relative"
              style={{
                border: '1px solid var(--portfolio-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                aspectRatio: '16/9',
              }}
            >
              <iframe
                src={`${project.prototypeVideo.url}?autoplay=1&loop=1&muted=1&controls=1&autopause=0&background=1`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Prototype Walkthrough"
              />
            </div>
            <p className="font-normal" style={{ fontSize: '15px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
              {project.prototypeVideo.caption}
            </p>
          </SectionBlock>
        )}

        {/* Outcome */}
        <SectionBlock>
          {sectionHeading('Outcome')}
          <p className="font-normal" style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.6' }}>
            {project.outcome}
          </p>
        </SectionBlock>

        {/* Metrics */}
        <SectionBlock alt>
          {sectionHeading('Impact')}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {project.metrics.map((metric: any, index: number) => (
              <div key={index}>
                <p className="font-normal mb-2" style={{ fontSize: '32px', color: 'var(--portfolio-text-primary)' }}>
                  {metric.value}
                </p>
                <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-secondary)' }}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Testimonial — HSBC specific */}
        {project.testimonial && (
          <SectionBlock>
            <div
              className="rounded-xl p-8 relative"
              style={{
                borderLeft: '3px solid var(--portfolio-accent)',
                backgroundColor: 'rgba(0,102,255,0.02)',
                border: '1px solid var(--portfolio-border)',
                borderLeftWidth: '3px',
                borderLeftColor: 'var(--portfolio-accent)',
              }}
            >
              <span
                style={{
                  fontSize: '72px',
                  color: 'var(--portfolio-accent)',
                  opacity: 0.2,
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '-16px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                "
              </span>
              <p
                className="font-normal mb-6"
                style={{ fontSize: '18px', color: 'var(--portfolio-text-secondary)', lineHeight: '1.7', fontStyle: 'italic' }}
              >
                {project.testimonial.quote}
              </p>
              <div>
                <p className="font-normal" style={{ fontSize: '16px', color: 'var(--portfolio-text-primary)' }}>
                  — {project.testimonial.author}
                </p>
                <p className="font-normal" style={{ fontSize: '14px', color: 'var(--portfolio-text-tertiary)' }}>
                  {project.testimonial.role}
                </p>
              </div>
            </div>
          </SectionBlock>
        )}
      </div>

      {/* Bottom: Next Project + Let's Talk CTA */}
      <div className="mt-20 pt-12 max-w-3xl" style={{ borderTop: `1px solid var(--portfolio-border)` }}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Next Project card */}
          <Link
            to={`/project/${nextId}`}
            className="flex-1 group rounded-xl overflow-hidden transition-all duration-300"
            style={{
              border: '1px solid var(--portfolio-border)',
              backgroundColor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Thumbnail */}
            <div className="w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
              <img
                src={heroImages[nextId]}
                alt={nextProject.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="font-normal mb-1" style={{ fontSize: '11px', color: 'var(--portfolio-accent)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Next Project →
              </p>
              <p className="font-normal" style={{ fontSize: '18px', color: 'var(--portfolio-text-primary)' }}>
                {nextProject.title}
              </p>
              <p className="font-normal" style={{ fontSize: '14px', color: 'var(--portfolio-text-secondary)' }}>
                {nextProject.subtitle}
              </p>
            </div>
          </Link>

          {/* Let's Talk CTA */}
          <div
            className="flex flex-col items-center justify-center rounded-xl p-8 text-center"
            style={{
              border: '1px solid var(--portfolio-border)',
              backgroundColor: 'rgba(0,102,255,0.02)',
              minWidth: '220px',
            }}
          >
            <p className="font-normal mb-2" style={{ fontSize: '18px', color: 'var(--portfolio-text-primary)', lineHeight: '1.4' }}>
              Interested in working together?
            </p>
            <p className="font-normal mb-6" style={{ fontSize: '14px', color: 'var(--portfolio-text-secondary)' }}>
              I'm open to new opportunities.
            </p>
            <a
              href="mailto:marysia.szczudlo1994@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 font-normal"
              style={{ fontSize: '15px', color: 'var(--portfolio-accent)', border: '1px solid var(--portfolio-accent)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--portfolio-accent)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--portfolio-accent)'; }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
