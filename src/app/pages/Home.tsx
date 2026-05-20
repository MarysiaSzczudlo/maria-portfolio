import { ProjectCard } from '../components/ProjectCard';
import { ScrollVideo } from '../components/ScrollVideo';
import { MovingMotto } from '../components/MovingMotto';

import hyundaiCover from '../../imports/Hyundai_Tucson.jpg';
import hsbcCover from '../../imports/HSBC.png';
import friscoCover from '../../imports/Frisco.jpg';
import acnCover from '../../imports/Banking_app_Accenture.jpg';
import senioringCover from '../../imports/Booking_Platform.jpg';

export function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-12 pb-24">
      {/* Hero Section */}
      <div className="mb-20">
        <h1
          className="font-normal mb-4"
          style={{
            fontSize: '48px',
            color: 'var(--portfolio-text-primary)',
            lineHeight: '1.2',
            letterSpacing: '-0.01em',
          }}
        >
          UX/UI Product Designer with GenAI Experience
        </h1>
        <p
          className="font-normal max-w-2xl"
          style={{
            fontSize: '20px',
            color: 'var(--portfolio-text-secondary)',
            lineHeight: '1.6',
          }}
        >
          I design digital products with precision, empathy, and systemic thinking.
          Currently focused on automotive HMI, fintech, and AI-driven experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-24">
        {/* Project 1: Hyundai Tucson NX4 */}
        <ProjectCard
          id="hyundai-tucson"
          title="Hyundai Tucson NX4"
          subtitle="Cockpit Redesign"
          description="End-to-end UX redesign of the infotainment system. Research-driven, solving 22 identified pain points across 345 NHTSA complaints."
          tags={['Automotive', 'HMI', 'UX Research', 'Interaction Design']}
          year="2026"
          coverImage={hyundaiCover}
        />

        {/* Project 2: HSBC Banking */}
        <ProjectCard
          id="hsbc-banking"
          title="HSBC"
          subtitle="Mobile Banking Redesign"
          description="Redesigning the core banking experience. Nominated for iF Design Award 2026."
          tags={['Fintech', 'Mobile', 'Visual Design', 'Design System']}
          year="2025"
          badge="iF Design Award 2026 Nominee"
          coverImage={hsbcCover}
        />
      </div>

      {/* Moving Motto */}
      <MovingMotto />

      {/* Scroll Video Section */}
      <div className="my-24">
        <ScrollVideo />
      </div>

      {/* Continue Projects Grid */}
      <div className="grid grid-cols-1 gap-24">
        {/* Project 3: FriscoAch */}
        <ProjectCard
          id="frisco-ach"
          title="FriscoAch"
          subtitle="AI Culinary Assistant"
          description="Conversational AI assistant for meal planning, integrated into Frisco's grocery ecosystem. LLM-powered recipe generation."
          tags={['AI/LLM', 'Mobile', 'Conversational UI', 'E-commerce']}
          year="2025"
          coverImage={friscoCover}
        />

        {/* Project 4: ACN Bank */}
        <ProjectCard
          id="acn-bank"
          title="ACN Bank"
          subtitle="Internal Banking Platform"
          description="Enterprise banking application for Accenture. Identity verification flows and secure transaction management."
          tags={['Enterprise', 'Fintech', 'Mobile', 'Security UX']}
          year="2025"
          coverImage={acnCover}
        />

        {/* Project 5: Senioring */}
        <ProjectCard
          id="senioring"
          title="Senioring"
          subtitle="Booking Platform for Seniors"
          description="Accessible travel booking platform designed for elderly users. Lizard Media Software House collaboration."
          tags={['Accessibility', 'Web', 'Booking', 'UX Research']}
          year="2023"
          coverImage={senioringCover}
        />
      </div>
    </div>
  );
}
