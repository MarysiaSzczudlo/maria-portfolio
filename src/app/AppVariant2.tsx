import { useState, useEffect } from 'react';
import casualPhoto from "@/assets/322f5fffb8a42f0aa6026c0c68a371379392491d.png";
import profileImage from "@/assets/3ad57231056fffeb711fad4301cd4d587aeecfeb.png";
import bankingProject from "@/assets/4fbffc1a4fb396420140dcda2109f43cd1a8686c.png";
import eGroceryProject from "@/assets/8f1cdc86c47eb107b1f81ddb72687c404863dcf8.png";
import financialProject from "@/assets/2c875fdc0701588c7acbaf11d3005df2226db81d.png";
import bookingProject from "@/assets/9545140fd42a129fed6468ba209257a83e39693c.png";
import consultingImage from "@/assets/79904796ceb66d79eadd2e02864b17eebfd4742b.png";
import musicProject from "@/assets/75b6326fe54814dec8be3c5881d3fb008505b23c.png";

export default function AppVariant2() {
  const [scrollY, setScrollY] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-slate-900 overflow-x-hidden">
      {/* Warm Sunset Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"
          style={{
            animationDuration: '8s',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-3xl"
          style={{
            animationDuration: '10s',
            animationDelay: '2s',
            transform: `translateY(${scrollY * -0.08}px)`
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-300/15 to-orange-300/15 rounded-full blur-3xl"
          style={{
            animationDuration: '12s',
            animationDelay: '4s',
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        ></div>

        {/* Flowing curves */}
        <svg className="absolute inset-0 w-full h-full opacity-30" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <defs>
            <linearGradient id="warm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M 0 150 Q 300 250 600 150 T 1200 150" stroke="url(#warm-gradient)" strokeWidth="3" fill="none" />
          <path d="M 100 350 Q 450 450 800 350 T 1600 350" stroke="url(#warm-gradient)" strokeWidth="2" fill="none" />
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
            className="absolute top-6 right-6 text-white text-4xl hover:text-orange-400 transition-colors"
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
          <div className="inline-flex flex-wrap items-center gap-2 backdrop-blur-sm bg-white/60 px-5 py-3 rounded-full border border-orange-200/50 shadow-sm">
            <span className="text-orange-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Product Designer</span>
            <span className="text-orange-400">•</span>
            <span className="text-rose-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>UX Designer</span>
            <span className="text-orange-400">•</span>
            <span className="text-amber-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>GenAI & AI Flow</span>
          </div>

          <h1 className="text-7xl lg:text-8xl tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="block text-slate-900">MARIA</span>
            <span className="block bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              SZCZUDŁO
            </span>
          </h1>

          <p className="text-2xl text-slate-700 leading-relaxed max-w-lg">
            Empathy drives my design,<br/>innovation shapes my vision.
          </p>

          <div className="backdrop-blur-sm bg-white/60 p-4 rounded-2xl border border-orange-200/50 inline-block shadow-sm">
            <p className="text-sm text-orange-800" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Conversational & AI Designer specializing in GenAI integration
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-10 py-4 rounded-2xl transition-all hover:scale-105 transform duration-300 shadow-lg"
            >
              View My Work
            </a>
            <a
              href="#about"
              className="backdrop-blur-sm bg-white/60 hover:bg-white/80 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-orange-200/50 hover:scale-105 transform duration-300"
            >
              About Me
            </a>
            <a
              href="#contact"
              className="backdrop-blur-sm bg-white/60 hover:bg-white/80 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-orange-200/50 hover:scale-105 transform duration-300"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative inline-block">
            <div className="backdrop-blur-md bg-white/70 rounded-3xl border border-orange-200/50 overflow-hidden relative z-10 shadow-2xl">
              <img
                src={casualPhoto}
                alt="Maria Szczudło - Product & UX Designer"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-orange-500/30 to-rose-500/30 rounded-3xl blur-xl"></div>
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
          <h2 className="text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Portfolio
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500"></div>
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
          className="relative h-full overflow-hidden rounded-3xl cursor-zoom-in backdrop-blur-md bg-white/70 border border-orange-200/50 shadow-xl"
          onClick={() => onImageClick(project.image)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="backdrop-blur-md bg-white/90 px-6 py-3 rounded-full border border-orange-200 text-sm">
              Click to zoom
            </span>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-3xl blur-xl -z-10"></div>
      </div>

      <div className={`${isReverse ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-6 flex flex-col justify-center`}>
        <div className="inline-block bg-gradient-to-r from-orange-100 to-rose-100 px-4 py-2 rounded-full text-sm border border-orange-200/50 w-fit" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Project {index + 1}
        </div>

        <h3 className="text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.title}
        </h3>

        <div className="backdrop-blur-md bg-white/70 p-4 rounded-xl border border-orange-200/50">
          <p className="text-orange-700 text-sm mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>When?</p>
          <p className="text-slate-900">{project.when}</p>
        </div>

        <div className="backdrop-blur-md bg-white/70 p-4 rounded-xl border border-orange-200/50">
          <p className="text-orange-700 text-sm mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Scope:</p>
          <div className="flex flex-wrap gap-2">
            {project.scope.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 rounded-full text-sm border border-orange-200/50 hover:from-orange-200 hover:to-amber-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/70 p-6 rounded-xl border border-orange-200/50">
          <p className="text-slate-700 leading-relaxed">
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
          <h2 className="text-6xl lg:text-7xl mb-4 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            About Me
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500"></div>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-16">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-orange-200/50 backdrop-blur-xl relative z-10 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Maria Szczudło"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-orange-500/30 to-rose-500/30 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-4xl mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Maria Szczudło</h3>
              <p className="text-xl text-orange-700 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Product Designer</p>
              <p className="text-lg text-rose-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>UX Designer with GenAI</p>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed">
              I am a Product Designer with over 4.5 years of experience in UX/UI design, user research, usability testing, and digital marketing. My expertise spans the entire product design process—from discovery and analysis to prototyping, testing, and delivering user-centered solutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="backdrop-blur-md bg-white/70 px-4 py-2 rounded-lg border border-orange-200/50">
                <p className="text-sm text-slate-700">🌍 English (C1)</p>
              </div>
              <div className="backdrop-blur-md bg-white/70 px-4 py-2 rounded-lg border border-orange-200/50">
                <p className="text-sm text-slate-700">🌍 Spanish (B2)</p>
              </div>
              <div className="backdrop-blur-md bg-white/70 px-4 py-2 rounded-lg border border-orange-200/50">
                <p className="text-sm text-slate-700">🌍 Polish (native)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-orange-200/50 p-8 mb-12 shadow-lg">
          <h3 className="text-2xl mb-6 text-orange-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Industry Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {['Finance', 'e-Gaming', 'Fashion', 'e-Commerce', 'Consulting', 'Data + GenAI', 'Social Media'].map((industry) => (
              <span
                key={industry}
                className="bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-lg text-sm border border-orange-200/50"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Professional Background */}
          <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-orange-200/50 p-8 shadow-lg">
            <h3 className="text-2xl mb-4 text-orange-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Focus Areas</h3>
            <div className="space-y-3 text-slate-700">
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
          <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-orange-200/50 p-8 shadow-lg">
            <h3 className="text-2xl mb-4 text-rose-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Recent Experience</h3>
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
        <div className="backdrop-blur-md bg-white/70 rounded-2xl border border-orange-200/50 p-8 shadow-lg">
          <h3 className="text-3xl mb-8 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Skills & Tools</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg mb-4 text-orange-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['UX/UI', 'Research', 'User Flows', 'Conversational Flow', 'Prototyping', 'Testing', 'Workshops', 'Design Strategy', 'Data + GenAI', 'Animations', 'Information Architecture'].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-lg text-sm border border-orange-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4 text-rose-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Adobe XD', 'Sketch', 'Miro', 'InVision', 'Hotjar', 'Maze', 'Principle', 'Adobe After Effects', 'Python', 'HTML & CSS', 'AI centered tools'].map((tool) => (
                  <span
                    key={tool}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-lg text-sm border border-orange-100"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-4 text-amber-700" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Process</h4>
              <div className="flex flex-wrap gap-2">
                {['Design Thinking', 'Agile', 'Lean UX', 'Human-Centered Design', 'A/B Testing'].map((process) => (
                  <span
                    key={process}
                    className="bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-lg text-sm border border-orange-100"
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
    <div className="p-3 rounded-lg hover:bg-orange-50/50 transition-colors border-l-2 border-orange-500">
      <h5 className="mb-1 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h5>
      <p className="text-xs text-slate-600">{company}</p>
      <p className="text-xs text-slate-500 mt-1">{period}</p>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md bg-white/70 rounded-3xl border border-orange-200/50 p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl mb-6 pb-2 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Let's Create Together
            </h2>
            <p className="text-xl text-slate-700 mb-12 max-w-2xl mx-auto">
              Interested in working together? Let's connect and discuss your next project.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="mailto:maria@example.com"
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-10 py-4 rounded-2xl transition-all hover:scale-105 transform duration-300 shadow-lg"
              >
                Email Me
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-sm bg-white/60 hover:bg-white/80 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-orange-200/50 hover:scale-105 transform duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/3a8d5ecf"
                target="_blank"
                rel="noopener noreferrer"
                className="backdrop-blur-sm bg-white/60 hover:bg-white/80 text-slate-900 px-10 py-4 rounded-2xl transition-all border border-orange-200/50 hover:scale-105 transform duration-300"
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
    <footer className="py-12 px-6 border-t border-orange-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600">
          <p>© 2026 Maria Szczudło. All rights reserved.</p>
          <p className="text-sm">
            Product Designer • UX Designer • GenAI Specialist • Conversational & AI Designer
          </p>
        </div>
      </div>
    </footer>
  );
}
