import { useParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ZoomableImage } from '../components/ZoomableImage';

import hyundaiHero from '../../imports/Hyundai_Tucson.png';
import hyundaiDesignSystem from '../../imports/1.10_Design_System.png';
import hyundaiGallery from '../../imports/1.16_Gallery.png';
import hyundaiImage from '../../imports/Hyundai.png';
import hsbcHero from '../../imports/hsbc_04.png';
import hsbc1 from '../../imports/hsbc_1.png';
import hsbc2 from '../../imports/hsbc_2.png';
import hsbc3 from '../../imports/hsbc_3.png';
import friscoHero from '../../imports/Frisco.png';
import friscoGuardrial from '../../imports/GUARDRIAL_MESSAGES.png';
import friscoDetail from '../../imports/friscooo.png';
import friscoMockups from '../../imports/frisco_mockups.png';
import acnHero from '../../imports/ACN_Bank.png';
import senioringHero from '../../imports/Booking_platfrom_Senioring.png';
import senioring1 from '../../imports/Zrzut_ekranu_2026-05-19_o_20.55.17.png';
import senioring2 from '../../imports/Zrzut_ekranu_2026-05-19_o_20.55.30.png';
import senioringDetail from '../../imports/senioring.png';

export function CaseStudy() {
  const { projectId } = useParams();

  const projects: Record<string, any> = {
    'hyundai-tucson': {
      title: 'Hyundai Tucson NX4',
      subtitle: 'Cockpit Redesign',
      role: 'Lead UX Designer',
      timeline: 'March - May 2026',
      tools: 'Figma · FigJam · Midjourney · Gamma · Figma Make · DaVinci Resolve',
      scope: '12.3″ HMI Display + Physical Controls',
      heroImage: hyundaiHero,
      figmaLink: 'https://www.figma.com/proto/YEIbjTneX5QaA2lk3ACfDz/Tucson-NX4-Redesign?node-id=80-12405&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=80%3A12405&t=GE4kNmnrHwsp6QZ7-1',
      images: {
        designSystem: hyundaiDesignSystem,
        gallery: hyundaiGallery,
        additional: hyundaiImage,
      },
      overview:
        'This project aimed to redesign the Hyundai Tucson NX4 infotainment system from the ground up. Through extensive analysis of 345 NHTSA complaints and user research, we identified 22 critical pain points affecting driver safety and satisfaction.',
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
        'The redesigned system prioritized essential driving information, simplified navigation to commonly-used features, and introduced adaptive UI that responds to driving context. Post-implementation testing showed significant improvements in task completion time and user satisfaction.',
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
      role: 'Senior UX/UI Designer',
      timeline: 'Sept 2025 - Feb 2026',
      team: '3 designers, 1 product manager',
      client: 'HSBC Global',
      heroImage: hsbcHero,
      awardLink: 'https://ifdesign.com/en/winner-ranking/project/hsbc-banking-app/769705',
      awardText: 'Awarded in iF Design Award 2026',
      images: {
        designSystem: hsbc1,
        gallery: hsbc3,
        additional: hsbc2,
      },
      overview:
        'HSBC\'s Global Banking App reimagines what a global banking experience should be. As the world\'s only international bank, HSBC needed a unified mobile experience matching its scale and ambition. The old app was disjointed, and underperforming. Together we defined and delivered the vision for the "world\'s best banking app" — one platform serving over 50 million customers across 26 markets. The result is a single, intelligent, human-centered app combining personalisation, conversational banking and global consistency. It turns a fragmented legacy system into a fluid, intuitive, and personal experience, a home that feels personal, wherever you are.',
      roleDescription:
        'I am responsible for creating wireframes, high-fidelity prototypes, interactive animations, and service blueprints. My tasks include user research, competitive analysis, and usability testing to ensure solutions meet user needs. I work closely with cross-functional teams, including developers and conversation designers, to build chatbot flows from scratch and define logic for global conversational experiences. Additionally, I design interactions and animations for GenAI features, ensuring seamless integration into the app.',
      skills: ['UX/UI Design', 'User Flows', 'Usability Tests', 'High-Fidelity Prototype', 'Conversational Design', 'Interactions'],
      challenge:
        'The existing app suffered from fragmented user flows, inconsistent design patterns, and poor information hierarchy. Users struggled to complete basic banking tasks, leading to increased support calls and customer frustration.',
      approach: [
        'Analyzed user analytics data from 2M+ monthly active users',
        'Conducted 30+ user interviews across 5 markets',
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
    },
    'frisco-ach': {
      title: 'FriscoAch',
      subtitle: 'AI Culinary Assistant',
      role: 'UX Designer & AI Specialist',
      timeline: 'March 2025 - July 2025',
      team: '2 designers, 3 AI engineers',
      client: 'Frisco',
      heroImage: friscoHero,
      images: {
        designSystem: friscoGuardrial,
        gallery: friscoMockups,
        additional: friscoDetail,
      },
      overview:
        'FriscoAch integrates an LLM-powered conversational assistant into Frisco\'s grocery ecosystem, helping users with meal planning, recipe discovery, and automated shopping list generation.',
      challenge:
        'Designing a conversational AI interface that feels natural and helpful without overpromising capabilities. Users needed clear boundaries of what the AI could do, while maintaining engagement and trust.',
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
      role: 'Lead UX Designer',
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

  const project = projects[projectId || ''] || projects['hyundai-tucson'];

  return (
    <div className="max-w-[1400px] mx-auto px-12 pb-24">
      {/* Back Button with Glassmorphism */}
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
        <span className="font-normal" style={{ fontSize: '16px' }}>
          Back to Projects
        </span>
      </Link>

      {/* Hero */}
      <div className="mb-20">
        <div className="flex items-baseline gap-3 mb-8">
          <h1
            className="font-normal"
            style={{
              fontSize: '48px',
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
              fontSize: '32px',
              color: 'var(--portfolio-text-tertiary)',
            }}
          >
            {project.subtitle}
          </span>
        </div>

        {/* Project Meta - Single Row */}
        <div className="flex flex-wrap gap-12 max-w-5xl">
          <div>
            <p
              className="font-normal mb-2"
              style={{
                fontSize: '12px',
                color: 'var(--portfolio-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Role
            </p>
            <p
              className="font-normal"
              style={{
                fontSize: '16px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              {project.role}
            </p>
          </div>

          <div>
            <p
              className="font-normal mb-2"
              style={{
                fontSize: '12px',
                color: 'var(--portfolio-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Timeline
            </p>
            <p
              className="font-normal"
              style={{
                fontSize: '16px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              {project.timeline}
            </p>
          </div>

          {project.team && (
            <div>
              <p
                className="font-normal mb-2"
                style={{
                  fontSize: '12px',
                  color: 'var(--portfolio-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Team
              </p>
              <p
                className="font-normal"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                {project.team}
              </p>
            </div>
          )}

          {project.client && (
            <div>
              <p
                className="font-normal mb-2"
                style={{
                  fontSize: '12px',
                  color: 'var(--portfolio-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Client
              </p>
              <p
                className="font-normal"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                {project.client}
              </p>
            </div>
          )}

          {project.tools && (
            <div>
              <p
                className="font-normal mb-2"
                style={{
                  fontSize: '12px',
                  color: 'var(--portfolio-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Tools
              </p>
              <p
                className="font-normal"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                {project.tools}
              </p>
            </div>
          )}

          {project.scope && (
            <div>
              <p
                className="font-normal mb-2"
                style={{
                  fontSize: '12px',
                  color: 'var(--portfolio-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Scope
              </p>
              <p
                className="font-normal"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-primary)',
                }}
              >
                {project.scope}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-20">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            border: `1px solid var(--portfolio-border)`,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ZoomableImage
            src={project.heroImage}
            alt={project.title}
          />
        </div>

        {/* Figma Prototype Link for Hyundai */}
        {project.figmaLink && (
          <div className="mt-8 flex justify-center">
            <a
              href={project.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{
                backgroundColor: 'rgba(0, 102, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid var(--portfolio-accent)',
                color: 'var(--portfolio-accent)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--portfolio-accent)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 102, 255, 0.05)';
                e.currentTarget.style.color = 'var(--portfolio-accent)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>
                Check the Detailed Overview
              </span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}

        {/* Award Link (e.g., iF Design Award) */}
        {project.awardLink && (
          <div className="mt-8 flex justify-center">
            <a
              href={project.awardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid #D4AF37',
                color: '#D4AF37',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4AF37';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
                e.currentTarget.style.color = '#D4AF37';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>
                {project.awardText || 'View Award'}
              </span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}

        {/* Miro Link (Design Flow Map, etc.) */}
        {project.miroLink && (
          <div className="mt-8 flex justify-center">
            <a
              href={project.miroLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 group"
              style={{
                backgroundColor: 'rgba(255, 208, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid #FFD000',
                color: '#F5B800',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD000';
                e.currentTarget.style.color = '#1A1A2E';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 208, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 208, 0, 0.05)';
                e.currentTarget.style.color = '#F5B800';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="font-normal" style={{ fontSize: '16px' }}>
                {project.miroText || 'View in Miro'}
              </span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl space-y-16">
        {/* Overview */}
        <section>
          <h2
            className="font-normal mb-6"
            style={{
              fontSize: '24px',
              color: 'var(--portfolio-text-primary)',
            }}
          >
            Overview
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: '18px',
              color: 'var(--portfolio-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {project.overview}
          </p>
        </section>

        {/* Role Description (if available) */}
        {project.roleDescription && (
          <section>
            <h2
              className="font-normal mb-6"
              style={{
                fontSize: '24px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              My Role
            </h2>
            <p
              className="font-normal mb-6"
              style={{
                fontSize: '18px',
                color: 'var(--portfolio-text-secondary)',
                lineHeight: '1.6',
              }}
            >
              {project.roleDescription}
            </p>

            {/* Skills */}
            {project.skills && (
              <div className="flex flex-wrap gap-3 mt-6">
                {project.skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg"
                    style={{
                      fontSize: '14px',
                      color: 'var(--portfolio-text-primary)',
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--portfolio-border)',
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Challenge */}
        <section>
          <h2
            className="font-normal mb-6"
            style={{
              fontSize: '24px',
              color: 'var(--portfolio-text-primary)',
            }}
          >
            Challenge
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: '18px',
              color: 'var(--portfolio-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {project.challenge}
          </p>
        </section>

        {/* Approach */}
        <section>
          <h2
            className="font-normal mb-6"
            style={{
              fontSize: '24px',
              color: 'var(--portfolio-text-primary)',
            }}
          >
            Approach
          </h2>
          <ul className="space-y-3">
            {project.approach.map((item: string, index: number) => (
              <li
                key={index}
                className="font-normal flex gap-3"
                style={{
                  fontSize: '18px',
                  color: 'var(--portfolio-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                <span style={{ color: 'var(--portfolio-accent)' }}>◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Images Grid */}
        {project.images && !project.hideGallery && (
          <>
            <div className="grid grid-cols-2 gap-6">
              {project.images.designSystem && (
                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                  <ZoomableImage src={project.images.designSystem} alt="Design System" />
                </div>
              )}
              {project.images.additional && (
                <div className="rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                  <ZoomableImage src={project.images.additional} alt="Project Detail" />
                </div>
              )}
            </div>

            {/* Gallery - Full Width (Biggest) */}
            {project.images.gallery && (
              <div className="w-full rounded-lg overflow-hidden" style={{ border: `1px solid var(--portfolio-border)` }}>
                <ZoomableImage src={project.images.gallery} alt="Screen Gallery" />
              </div>
            )}
          </>
        )}

        {/* Outcome */}
        <section>
          <h2
            className="font-normal mb-6"
            style={{
              fontSize: '24px',
              color: 'var(--portfolio-text-primary)',
            }}
          >
            Outcome
          </h2>
          <p
            className="font-normal"
            style={{
              fontSize: '18px',
              color: 'var(--portfolio-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {project.outcome}
          </p>
        </section>

        {/* Metrics */}
        <section>
          <h2
            className="font-normal mb-6"
            style={{
              fontSize: '24px',
              color: 'var(--portfolio-text-primary)',
            }}
          >
            Impact
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {project.metrics.map((metric: any, index: number) => (
              <div key={index}>
                <p
                  className="font-normal mb-2"
                  style={{
                    fontSize: '32px',
                    color: 'var(--portfolio-text-primary)',
                  }}
                >
                  {metric.value}
                </p>
                <p
                  className="font-normal"
                  style={{
                    fontSize: '16px',
                    color: 'var(--portfolio-text-secondary)',
                  }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Back to Top */}
      <div className="mt-24 pt-12" style={{ borderTop: `1px solid var(--portfolio-border)` }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 transition-all duration-200 px-4 py-2 rounded-full"
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
          <span className="font-normal" style={{ fontSize: '16px' }}>
            Back to Projects
          </span>
        </Link>
      </div>
    </div>
  );
}
