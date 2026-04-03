import { useState, useEffect } from 'react';
import casualPhoto from "@/assets/322f5fffb8a42f0aa6026c0c68a371379392491d.png";
import profileImage from "@/assets/3ad57231056fffeb711fad4301cd4d587aeecfeb.png";
import bankingProject from "@/assets/4fbffc1a4fb396420140dcda2109f43cd1a8686c.png";
import eGroceryProject from "@/assets/8f1cdc86c47eb107b1f81ddb72687c404863dcf8.png";
import financialProject from "@/assets/2c875fdc0701588c7acbaf11d3005df2226db81d.png";
import bookingProject from "@/assets/9545140fd42a129fed6468ba209257a83e39693c.png";
import consultingImage from "@/assets/79904796ceb66d79eadd2e02864b17eebfd4742b.png";
import musicProject from "@/assets/75b6326fe54814dec8be3c5881d3fb008505b23c.png";

export default function AppVariant1() {
  const [scrollY, setScrollY] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 text-slate-900 overflow-x-hidden">
      {/* Minimalist Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        ></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * -0.08}px)`
          }}
        ></div>

        {/* Minimal grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection scrollY={scrollY} />
        <ProjectsSection onImageClick={setZoomedImage} scrollY={scrollY} />
        <AboutSection scrollY={scrollY} />
        <ContactSection />
        <Footer />
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-label="Zoomed project image"
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-emerald-400 transition-colors"
            onClick={() => setZoomedImage(null)}
            aria-label="Close zoom"
          >
            ×
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed project"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function HeroSection({ scrollY }: { scrollY: number }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-50 px-5 py-3 rounded-full border border-emerald-200">
            <span className="text-emerald-700" style={{ fontFamily: 'Inter, sans-serif' }}>Product Designer</span>
            <span className="text-slate-400">•</span>
            <span className="text-teal-700" style={{ fontFamily: 'Inter, sans-serif' }}>UX Designer</span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>GenAI & AI Flow</span>
          </div>

          <h1 className="text-7xl lg:text-8xl tracking-tight leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="block text-slate-900">MARIA</span>
            <span className="block text-emerald-600">
              SZCZUDŁO
            </span>
          </h1>

          <p className="text-2xl text-slate-700 leading-relaxed max-w-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Empathy drives my design,<br/>innovation shapes my vision.
          </p>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 inline-block">
            <p className="text-sm text-emerald-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              Conversational & AI Designer specializing in GenAI integration
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl transition-all hover:scale-105 transform duration-300"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View My Work
            </a>
            <a
              href="#about"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-slate-200 hover:scale-105 transform duration-300"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              About Me
            </a>
            <a
              href="#contact"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-slate-200 hover:scale-105 transform duration-300"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative inline-block">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden relative z-10 shadow-xl">
              <img
                src={casualPhoto}
                alt="Maria Szczudło - Product & UX Designer"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onImageClick, scrollY }: { onImageClick: (image: string) => void; scrollY: number }) {
  const projects = [
    {
      image: bankingProject,
      title: "FINANCIAL SERVICES & GENAI",
      when: "Oct 2025 - Feb 2026",
      scope: [
        "UX/UI Design",
        "User Flows",
        "Usability Tests",
        "High-Fidelity Prototype",
        "Conversational Design",
        "Interactions"
      ],
      description: "Large-scale redesign of a global mobile banking application aimed at improving usability, adding missing functionalities, and introducing innovative GenAI-powered features. The goal is to enhance user experience, increase user-friendliness, and deliver intelligent solutions such as conversational interfaces and personalized interactions. The project involves collaboration with Accenture teams in London and Warsaw, working with the bank's existing design system while creating new components where necessary."
    },
    {
      image: eGroceryProject,
      title: "E-GROCERY & GENAI",
      when: "Mar 2025 - Jul 2025",
      scope: [
        "UX/UI Design",
        "User Flows",
        "Usability Tests",
        "High-Fidelity Prototype",
        "Conversational Design"
      ],
      description: "The project for the key e-Grocery retailer in Poland involved redesigning the entire application, and proposing + implementing new functionality based on GenAI chatbot, which, by offering personalized recipes, also composed a shopping list of products for users or recommended products, directing the user to product pages or directly to the cart. My task primarily involved preparing High-Fidelity mockups based on Low-Fidelity mockups, refining functionalities, creating new screens, and assisting in the refinement of User Flow."
    },
    {
      image: financialProject,
      title: "FINANCIAL SERVICE",
      when: "Mar 2024 - May 2025",
      scope: [
        "Design System",
        "Animation",
        "UX Copywriting",
        "High-Fidelity Prototype"
      ],
      description: "A project being developed by an extensive team of designers from Accenture involves the design, implementation, and development of a banking application. It utilizes modern and useful functionalities that help users manage their budgets effectively, easily, and quickly, and better plan for the future. A project for a banking app required me to transform existing low-fidelity mockups into interactive, high-fidelity mockups. Additionally, I created an animation for the landing page using the advanced features of Figma."
    },
    {
      image: bookingProject,
      title: "BOOKING PLATFORM",
      when: "Aug 2023 - Nov 2023",
      scope: [
        "UX Design",
        "Qualitative Research",
        "Ideation Workshops",
        "Wireframes"
      ],
      description: "As a lead designer for Senioring, a comprehensive search engine for premium retirement houses and senior centers, I played a pivotal role in shaping a user-centric and detail-oriented experience. This commercial project, executed during my work at my previous company, aimed to provide users with an in-depth view of retirement housing options. I was responsible for facilitating workshops with clients, gathering business requirements, conducting qualitative user research, preparing a competitor analysis, mapping user journeys, creating a style guide, preparing lo-fi wireframes and high-fidelity prototypes for a happy path."
    },
    {
      image: consultingImage,
      title: "CONSULTING",
      when: "Jun 2022 - Dec 2023",
      scope: [
        "UX/UI Design",
        "Research",
        "User Flows",
        "Personas",
        "Audits",
        "Usability Tests",
        "Low-Fidelity Prototype",
        "High-Fidelity Prototype"
      ],
      description: "At Lizard Media Software House, we focused on conducting audits and implementing new functionalities or a complete redesign of online stores in Polish market. Our task was to properly research the market, novelties in the world of e-Commerce, the needs of our clients and users of their stores, and then properly implement the best possible solutions. I was responsible for proposing a product vision based on user research, conducting workshops with clients and their website's audits, creating personas, creating testing personas, preparing competitor analysis, mapping user journeys, creating a style guide, preparing lo-fi wireframes and high-fidelity prototypes for a happy path."
    },
    {
      image: musicProject,
      title: "IOS MUSIC APP",
      when: "Jan 2024 - Feb 2024",
      scope: [
        "UX Design",
        "UI Design",
        "Animations",
        "Usability Tests",
        "Product Vision"
      ],
      description: "AudioWave is a conceptual iOS music app designed to showcase my ability to adapt to Apple's design standards while creating an intuitive and visually appealing user experience. The app offers a seamless way to explore, stream, and personalize music, featuring a clean UI, smooth interactions, and an iOS-native feel. The project demonstrates my end-to-end UX/UI process, from research and wireframing to prototyping and high-fidelity design, aligning with Apple's Human Interface Guidelines."
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl lg:text-7xl mb-4 text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Portfolio
          </h2>
          <div className="h-1 w-32 mx-auto bg-emerald-600"></div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onImageClick
}: {
  project: any;
  index: number;
  onImageClick: (image: string) => void;
}) {
  const isReverse = index % 2 === 1;

  return (
    <div className={`grid lg:grid-cols-2 gap-12 items-stretch ${isReverse ? 'lg:grid-flow-dense' : ''}`}>
      <div className={`${isReverse ? 'lg:col-start-2' : ''} relative group`}>
        <div
          className="relative h-full overflow-hidden rounded-2xl cursor-zoom-in bg-white border border-slate-200 shadow-lg"
          onClick={() => onImageClick(project.image)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="bg-white/90 px-6 py-3 rounded-full border border-emerald-200 text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
              Click to zoom
            </span>
          </div>
        </div>
      </div>

      <div className={`${isReverse ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-6 flex flex-col justify-center`}>
        <div className="inline-block bg-emerald-100 px-4 py-2 rounded-full text-sm border border-emerald-200 w-fit" style={{ fontFamily: 'Inter, sans-serif' }}>
          Project {index + 1}
        </div>

        <h3 className="text-4xl lg:text-5xl tracking-tight text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
          {project.title}
        </h3>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-emerald-700 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>When?</p>
          <p className="text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>{project.when}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-emerald-700 text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Scope:</p>
          <div className="flex flex-wrap gap-2">
            {project.scope.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="bg-emerald-50 px-3 py-1 rounded-full text-sm border border-emerald-200 hover:bg-emerald-100 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <p className="text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl lg:text-7xl mb-4 text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            About Me
          </h2>
          <div className="h-1 w-32 mx-auto bg-emerald-600"></div>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-16">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-slate-200 relative z-10 shadow-xl bg-white">
                <img
                  src={profileImage}
                  alt="Maria Szczudło"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-4xl mb-2 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Maria Szczudło</h3>
              <p className="text-xl text-emerald-700 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Product Designer</p>
              <p className="text-lg text-teal-700" style={{ fontFamily: 'Inter, sans-serif' }}>UX Designer with GenAI</p>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              I am a Product Designer with over 4.5 years of experience in UX/UI design, user research, usability testing, and digital marketing. My expertise spans the entire product design process—from discovery and analysis to prototyping, testing, and delivering user-centered solutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>🌍 English (C1)</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>🌍 Spanish (B2)</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>🌍 Polish (native)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-lg">
          <h3 className="text-2xl mb-6 text-emerald-700" style={{ fontFamily: 'Inter, sans-serif' }}>Industry Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {['Finance', 'e-Gaming', 'Fashion', 'e-Commerce', 'Consulting', 'Data + GenAI', 'Social Media'].map((industry) => (
              <span
                key={industry}
                className="bg-emerald-50 px-4 py-2 rounded-lg text-sm border border-emerald-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Professional Background */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
            <h3 className="text-2xl mb-4 text-emerald-700" style={{ fontFamily: 'Inter, sans-serif' }}>Focus Areas</h3>
            <div className="space-y-3 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
              <p className="leading-relaxed">
                ✦ Conversational design and chatbot flows
              </p>
              <p className="leading-relaxed">
                ✦ Generative AI & Large Language Models integration
              </p>
              <p className="leading-relaxed">
                ✦ AI-driven solutions and innovation
              </p>
              <p className="leading-relaxed">
                ✦ Motion design and engaging interactions
              </p>
              <p className="leading-relaxed">
                ✦ Banking, e-commerce, and e-gaming platforms
              </p>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
            <h3 className="text-2xl mb-4 text-teal-700" style={{ fontFamily: 'Inter, sans-serif' }}>Recent Experience</h3>
            <div className="space-y-4">
              <ExperienceItem
                title="Global Banking Application"
                company="Accenture, Warsaw"
                period="Sep 2025 - Feb 2026"
              />
              <ExperienceItem
                title="E-Grocery Retailer"
                company="Accenture, Warsaw"
                period="Mar 2025 - Oct 2025"
              />
              <ExperienceItem
                title="Financial Services"
                company="Accenture, Warsaw"
                period="Mar 2024 - May 2025"
              />
              <ExperienceItem
                title="E-Commerce"
                company="Lizard Media"
                period="Jun 2022 - Dec 2023"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
          <h3 className="text-3xl mb-8 text-center text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>Skills & Tools</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg mb-4 text-emerald-700" style={{ fontFamily: 'Inter, sans-serif' }}>Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['UX/UI', 'Research', 'User Flows', 'Conversational Flow', 'Prototyping', 'Testing', 'Workshops', 'Design Strategy', 'Data + GenAI', 'Animations', 'Information Architecture'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-emerald-50 px-3 py-1.5 rounded-lg text-sm border border-emerald-100"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4 text-teal-700" style={{ fontFamily: 'Inter, sans-serif' }}>Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Adobe XD', 'Sketch', 'Miro', 'InVision', 'Hotjar', 'Maze', 'Principle', 'Adobe After Effects', 'Python', 'HTML & CSS', 'AI centered tools'].map((tool) => (
                  <span
                    key={tool}
                    className="bg-emerald-50 px-3 py-1.5 rounded-lg text-sm border border-emerald-100"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4 text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>Process</h4>
              <div className="flex flex-wrap gap-2">
                {['Design Thinking', 'Agile', 'Lean UX', 'Human-Centered Design', 'A/B Testing'].map((process) => (
                  <span
                    key={process}
                    className="bg-emerald-50 px-3 py-1.5 rounded-lg text-sm border border-emerald-100"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {process}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ title, company, period }: {
  title: string;
  company: string;
  period: string;
}) {
  return (
    <div className="p-3 rounded-lg hover:bg-emerald-50 transition-colors border-l-2 border-emerald-500">
      <h5 className="mb-1 text-sm text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h5>
      <p className="text-xs text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>{company}</p>
      <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{period}</p>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl mb-6 pb-2 text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let's Create Together
            </h2>
            <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Interested in working together? Let's connect and discuss your next project.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="mailto:maria@example.com"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl transition-all hover:scale-105 transform duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Email Me
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-slate-200 hover:scale-105 transform duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/3a8d5ecf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-slate-200 hover:scale-105 transform duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Behance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
          <p style={{ fontFamily: 'Inter, sans-serif' }}>© 2026 Maria Szczudło. All rights reserved.</p>
          <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Product Designer • UX Designer • GenAI Specialist • Conversational & AI Designer
          </p>
        </div>
      </div>
    </footer>
  );
}
