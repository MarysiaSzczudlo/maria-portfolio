import profileImage from '../../imports/maria.png';

export function About() {
  const languages = [
    { name: 'English', level: 'C1' },
    { name: 'Spanish', level: 'B2' },
    { name: 'Polish', level: 'Native' },
  ];

  const industryExpertise = [
    'Finance',
    'e-Gaming',
    'Fashion',
    'e-Commerce',
    'Consulting',
    'Data + GenAI',
    'Social Media',
  ];

  const focusAreas = [
    'Conversational design and chatbot flows',
    'Generative AI & Large Language Models integration',
    'AI-driven solutions and innovation',
    'Motion design and engaging interactions',
    'Banking, e-commerce, and e-gaming platforms',
  ];

  const recentExperience = [
    {
      title: 'Global Banking Application',
      company: 'Accenture, HSBC',
      period: 'Sept 2025 - Feb 2026',
      roleLabel: 'Senior UX Designer',
      seniority: 'senior',
    },
    {
      title: 'E-Grocery Retailer',
      company: 'Accenture, Frisco',
      period: 'Mar 2025 - Sep 2025',
      roleLabel: 'Senior UX Designer',
      seniority: 'senior',
    },
    {
      title: 'Financial Services',
      company: 'Accenture, Internal Project',
      period: 'Mar 2025 - Jun 2025',
      roleLabel: 'Senior UX Designer/Support',
      seniority: 'senior',
    },
    {
      title: 'E-Commerce',
      company: 'Lizard Media',
      period: 'Jun 2022 - Dec 2023',
      roleLabel: 'Junior UX Designer',
      seniority: 'junior',
    },
  ];

  const coreSkills = [
    'UX/UI',
    'Research',
    'User Flows',
    'Conversational Flow',
    'Prototyping',
    'Testing',
    'Workshops',
    'Design Strategy',
    'Data + GenAI',
    'Animation',
    'Information Architecture',
  ];

  const tools = [
    'Figma',
    'Adobe XD',
    'Sketch',
    'Miro',
    'InVision',
    'Hotjar',
    'Maze',
    'Principle',
    'Adobe After Effects',
    'Python',
    'HTML & CSS',
    'AI-centered tools',
  ];

  const process = [
    'Design Thinking',
    'Agile',
    'Lean UX',
    'Human-Centered Design',
    'A/B Testing',
  ];

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 md:px-12 py-8 md:py-16">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-16">
            <h1
              className="font-normal mb-2"
              style={{
                fontSize: '48px',
                color: 'var(--portfolio-text-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
              }}
            >
              Maria Szczudło
            </h1>
            <p
              className="font-normal mb-6"
              style={{
                fontSize: '20px',
                color: 'var(--portfolio-text-secondary)',
              }}
            >
              UX/UI x GenAI Designer
            </p>

            <p
              className="font-normal mb-6"
              style={{
                fontSize: '16px',
                color: 'var(--portfolio-text-primary)',
                lineHeight: '1.6',
              }}
            >
              I am a Product Designer, with over 4.5 years of experience in UX/UI design, user
              research, usability testing, and agile marketing. My expertise spans the entire
              product design process—from discovery and analysis to prototyping, testing, and
              delivering user-centered solutions.
            </p>

            {/* Languages */}
            <div className="flex gap-4 flex-wrap">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: '12px',
                    color: 'var(--portfolio-text-secondary)',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid var(--portfolio-border)',
                  }}
                >
                  {lang.name} {lang.level}
                </div>
              ))}
            </div>
          </div>

          {/* Industry Expertise */}
          <div className="mb-16">
            <h2
              className="font-normal mb-6"
              style={{
                fontSize: '24px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              Industry Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {industryExpertise.map((industry, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full"
                  style={{
                    fontSize: '14px',
                    color: 'var(--portfolio-text-primary)',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid var(--portfolio-border)',
                  }}
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="mb-16">
            <h2
              className="font-normal mb-6"
              style={{
                fontSize: '24px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              Focus Areas
            </h2>
            <ul className="space-y-3">
              {focusAreas.map((area, index) => (
                <li
                  key={index}
                  className="font-normal flex gap-3"
                  style={{
                    fontSize: '16px',
                    color: 'var(--portfolio-text-secondary)',
                    lineHeight: '1.6',
                  }}
                >
                  <span style={{ color: 'var(--portfolio-accent)' }}>◆</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Experience — vertical timeline */}
          <div className="mb-16">
            <h2
              className="font-normal mb-8"
              style={{ fontSize: '24px', color: 'var(--portfolio-text-primary)' }}
            >
              Recent Experience
            </h2>
            <div className="relative">
              {/* Vertical connecting line */}
              <div
                className="absolute left-[9px] top-2 bottom-2"
                style={{ width: '1px', backgroundColor: 'var(--portfolio-border)' }}
              />
              <div className="space-y-8">
                {recentExperience.map((exp, index) => {
                  const dotSize = exp.seniority === 'senior' ? 20 : exp.seniority === 'mid' ? 16 : 12;
                  const dotOffset = Math.round((20 - dotSize) / 2);
                  return (
                    <div key={index} className="flex gap-5">
                      {/* Timeline dot */}
                      <div
                        className="flex-shrink-0 rounded-full"
                        style={{
                          width: `${dotSize}px`,
                          height: `${dotSize}px`,
                          marginTop: `${4 + dotOffset}px`,
                          marginLeft: `${dotOffset}px`,
                          backgroundColor: exp.seniority === 'senior'
                            ? 'var(--portfolio-accent)'
                            : exp.seniority === 'mid'
                            ? 'rgba(0,102,255,0.4)'
                            : 'rgba(0,102,255,0.15)',
                          border: exp.seniority === 'senior'
                            ? '2px solid var(--portfolio-accent)'
                            : '2px solid rgba(0,102,255,0.3)',
                          flexShrink: 0,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className="font-normal mb-0.5"
                              style={{ fontSize: '17px', color: 'var(--portfolio-text-primary)' }}
                            >
                              {exp.title}
                            </h3>
                            <p
                              className="font-normal mb-1"
                              style={{ fontSize: '13px', color: 'var(--portfolio-text-secondary)' }}
                            >
                              {exp.company}
                            </p>
                            <span
                              className="inline-block px-2 py-0.5 rounded-full font-normal"
                              style={{
                                fontSize: '11px',
                                letterSpacing: '0.04em',
                                color: exp.seniority === 'senior' ? 'var(--portfolio-accent)' : 'var(--portfolio-text-secondary)',
                                backgroundColor: exp.seniority === 'senior' ? 'rgba(0,102,255,0.06)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${exp.seniority === 'senior' ? 'rgba(0,102,255,0.15)' : 'var(--portfolio-border)'}`,
                              }}
                            >
                              {exp.roleLabel}
                            </span>
                          </div>
                          <p
                            className="font-normal text-right whitespace-nowrap flex-shrink-0"
                            style={{ fontSize: '13px', color: 'var(--portfolio-text-tertiary)' }}
                          >
                            {exp.period}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skills & Tools */}
          <div className="mb-16">
            <h2
              className="font-normal mb-8"
              style={{
                fontSize: '24px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              Skills & Tools
            </h2>

            {/* Core Skills */}
            <div className="mb-8">
              <h3
                className="font-normal mb-4"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-secondary)',
                }}
              >
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg"
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
            </div>

            {/* Tools */}
            <div className="mb-8">
              <h3
                className="font-normal mb-4"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-secondary)',
                }}
              >
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg"
                    style={{
                      fontSize: '14px',
                      color: 'var(--portfolio-text-primary)',
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--portfolio-border)',
                    }}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h3
                className="font-normal mb-4"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-secondary)',
                }}
              >
                Process
              </h3>
              <div className="flex flex-wrap gap-2">
                {process.map((proc, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg"
                    style={{
                      fontSize: '14px',
                      color: 'var(--portfolio-text-primary)',
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--portfolio-border)',
                    }}
                  >
                    {proc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-16">
            <h2
              className="font-normal mb-6"
              style={{
                fontSize: '24px',
                color: 'var(--portfolio-text-primary)',
              }}
            >
              Get in Touch
            </h2>

            <div className="space-y-4">
              <p
                className="font-normal"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                I'm open to new opportunities and collaborations. Feel free to reach out.
              </p>

              <a
                href="mailto:marysia.szczudlo1994@gmail.com"
                className="inline-block font-normal transition-opacity hover:opacity-60"
                style={{
                  fontSize: '16px',
                  color: 'var(--portfolio-accent)',
                }}
              >
                marysia.szczudlo1994@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider — visual cue that left scrolls, right is fixed (desktop only) */}
      <div
        className="hidden md:flex flex-shrink-0 flex-col items-center justify-center"
        style={{ width: '16px' }}
      >
        {/* Thin line top */}
        <div
          style={{
            flex: 1,
            width: '1px',
            backgroundColor: 'var(--portfolio-border)',
          }}
        />

        {/* Pill handle */}
        <div
          style={{
            width: '4px',
            height: '48px',
            borderRadius: '2px',
            backgroundColor: 'var(--portfolio-border)',
            flexShrink: 0,
            margin: '8px 0',
          }}
        />

        {/* Thin line bottom */}
        <div
          style={{
            flex: 1,
            width: '1px',
            backgroundColor: 'var(--portfolio-border)',
          }}
        />
      </div>

      {/* Right Side - Image (Fixed on desktop, full-size on mobile) */}
      <div
        className="w-full md:w-[40%] flex-shrink-0 flex items-center justify-center p-5 md:p-8 md:sticky md:top-0"
        style={{
          height: 'auto',
        }}
      >
        <div
          className="relative overflow-hidden rounded-3xl w-full md:h-screen md:flex md:items-center md:justify-center"
        >
          <div
            className="relative overflow-hidden rounded-3xl w-full"
            style={{
              maxWidth: '500px',
              aspectRatio: '3/4',
              border: '1px solid var(--portfolio-border)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12)',
            }}
          >
            <img
              src={profileImage}
              alt="Maria Szczudło"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
