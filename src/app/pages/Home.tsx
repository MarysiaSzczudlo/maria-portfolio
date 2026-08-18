import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from 'motion/react';
import { ArrowDown, ArrowUpRight, ArrowRight, Check, Copy, Linkedin, Mail } from 'lucide-react';
import hsbcImage from '../../imports/hsbc_ai_entry.png';
import friscoImage from '../../imports/Frisco.png';
import hyundaiSketch from '../../imports/Hyundai_Tucson.jpg';
import hyundaiFinal from '../../imports/Hyundai_Tucson.png';
import mariaPortrait from '../../imports/About_Portrait.png';
import './home-v2.css';

const Artifact = ({
  className,
  eyebrow,
  children,
  style,
}: {
  className: string;
  eyebrow: string;
  children: ReactNode;
  style?: MotionStyle;
}) => (
  <motion.div className={`cf-artifact ${className}`} style={style}>
    <span className="cf-artifact__eyebrow">{eyebrow}</span>
    {children}
  </motion.div>
);

export function Home() {
  const storyRef = useRef<HTMLDivElement>(null);
  const hyundaiRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [emailCopied, setEmailCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });


  // V2.27 mobile: keep the copy/CTAs as the first clear reading block.
  // The same Clarity Field sits BELOW that block and only travels upward once
  // the copy starts leaving the viewport, so cards can never cover the CTA.
  const mobileHeroX = useTransform(scrollYProgress, [0, 0.15, 0.25], ['0vw', '0vw', '-118vw']);
  const mobileHeroY = useTransform(scrollYProgress, [0, 0.18, 0.28], [0, 0, 0]);
  const mobileHeroOpacity = useTransform(scrollYProgress, [0, 0.16, 0.25, 0.30], [1, 1, 0.25, 0]);
  const mobileFieldOpacity = useTransform(scrollYProgress, [0, 0.22, 0.30, 1], [0, 0, 1, 1]);
  const mobileFieldY = useTransform(scrollYProgress, [0, 0.26, 0.46, 0.72, 1], [24, 24, 4, -6, -8]);
  const mobileFieldScale = useTransform(scrollYProgress, [0, 0.26, 0.50, 0.78, 1], [0.76, 0.76, 0.82, 0.87, 0.89]);

  const mobileResearchX = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [-78, -118, -136, -142, -142]);
  const mobileResearchY = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [-48, -32, -14, -4, 0]);
  const mobileResearchScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [0.72, 0.69, 0.66, 0.63, 0.61]);

  const mobileDataX = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [-28, -54, -68, -74, -74]);
  const mobileDataY = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [40, 26, 10, 2, 0]);
  const mobileDataScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [0.78, 0.77, 0.76, 0.75, 0.74]);

  const mobileAiX = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [30, 16, 6, 0, 0]);
  const mobileAiY = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [-12, -8, -3, 0, 0]);
  const mobileAiScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [0.84, 0.90, 0.95, 0.99, 1.00]);

  const mobileSystemX = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [68, 74, 76, 76, 76]);
  const mobileSystemY = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [36, 24, 8, 2, 0]);
  const mobileSystemScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [0.78, 0.77, 0.76, 0.75, 0.74]);

  const mobileComponentsX = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [110, 124, 136, 144, 144]);
  const mobileComponentsY = useTransform(scrollYProgress, [0, 0.30, 0.52, 0.76, 1], [-46, -30, -12, -3, 0]);
  const mobileComponentsScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [0.72, 0.69, 0.66, 0.63, 0.61]);

  // One continuous scroll story. The SAME artifact components travel from a scattered
  // composition into the final ordered Clarity Field — there is no cross-fade to a
  // second set of cards.
  const heroX = useTransform(scrollYProgress, [0, 0.24, 0.52, 0.78], ['0vw', '0vw', '-24vw', '-92vw']);

  // Move the existing right-side composition into the centre while the atmospheric
  // blue/violet field grows to fill the viewport.
  const fieldX = useTransform(scrollYProgress, [0, 0.30, 0.58, 0.82, 1], ['0vw', '0vw', '-8vw', '-22vw', '-24vw']);
  const fieldScale = useTransform(scrollYProgress, [0, 0.34, 0.60, 0.82, 1], [1, 1.03, 1.10, 1.15, 1.15]);
  const auraScale = useTransform(scrollYProgress, [0, 0.34, 0.68, 0.92], [1, 1.08, 1.38, 1.72]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.46, 0.82, 1], [0.72, 0.82, 0.92, 0.78]);
  const lensScale = useTransform(scrollYProgress, [0, 0.48, 0.76, 0.94], [1, 1.08, 1.28, 1.36]);
  const lensOpacity = useTransform(scrollYProgress, [0, 0.72, 0.94, 1], [1, 0.92, 0.62, 0.42]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.28, 0.64, 0.84, 1], [0.42, 0.82, 0.72, 0.34, 0.16]);

  // Full-screen atmosphere grows behind the SAME cards. It does not replace them.
  const fullscreenFieldOpacity = useTransform(scrollYProgress, [0, 0.30, 0.48, 0.72, 0.94, 1], [0, 0, 0.34, 0.82, 0.88, 0.70]);
  const fullscreenFieldScale = useTransform(scrollYProgress, [0.30, 0.50, 0.74, 0.96], [0.18, 0.36, 0.72, 1]);
  const peripheralBlurOpacity = useTransform(scrollYProgress, [0, 0.54, 0.72, 0.90, 1], [0, 0, 0.26, 0.52, 0.38]);
  const resolutionLineOpacity = useTransform(scrollYProgress, [0, 0.66, 0.80, 0.92], [0, 0, 0.34, 0.92]);
  const resolutionLineScale = useTransform(scrollYProgress, [0.66, 0.92], [0.12, 1]);

  // The SAME five cards converge onto one shared process axis. Their initial scattered
  // positions are expressed as transforms from a common centre anchor; the final state
  // behaves like an auto-layout rail, so all card centres share one horizontal plane.
  const researchX = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-308, -286, -230, -323, -323]);
  const researchY = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-140, -110, -58, 0, 0]);
  const researchScale = useTransform(scrollYProgress, [0, 0.60, 0.82, 1], [1, 0.90, 0.68, 0.68]);
  const researchOpacity = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], [0.72, 0.68, 0.40, 0.40]);
  const researchBlur = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], ['blur(.2px)', 'blur(.5px)', 'blur(2.2px)', 'blur(2.2px)']);

  const dataX = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-248, -218, -190, -180, -180]);
  const dataY = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [149, 112, 58, 0, 0]);
  const dataScale = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], [1, 0.94, 0.84, 0.84]);
  const dataOpacity = useTransform(scrollYProgress, [0, 0.58, 0.82, 1], [1, 0.86, 0.56, 0.56]);
  const dataBlur = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], ['blur(0px)', 'blur(.25px)', 'blur(.9px)', 'blur(.9px)']);

  const aiX = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-90, -56, -20, 0, 0]);
  const aiY = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-226, -170, -88, 0, 0]);
  const aiScale = useTransform(scrollYProgress, [0, 0.58, 0.82, 1], [1, 1.02, 1.00, 1.00]);
  const aiOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 1]);

  const systemX = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [294, 252, 214, 182, 182]);
  const systemY = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [-66, -48, -24, 0, 0]);
  const systemScale = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], [1, 0.94, 0.84, 0.84]);
  const systemOpacity = useTransform(scrollYProgress, [0, 0.58, 0.82, 1], [1, 0.86, 0.56, 0.56]);
  const systemBlur = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], ['blur(0px)', 'blur(.25px)', 'blur(.9px)', 'blur(.9px)']);

  const componentsX = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [320, 328, 334, 340, 340]);
  const componentsY = useTransform(scrollYProgress, [0, 0.38, 0.62, 0.82, 1], [216, 160, 84, 0, 0]);
  const componentsScale = useTransform(scrollYProgress, [0, 0.60, 0.82, 1], [1, 0.90, 0.68, 0.68]);
  const componentsOpacity = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], [0.76, 0.68, 0.40, 0.40]);
  const componentsBlur = useTransform(scrollYProgress, [0, 0.62, 0.82, 1], ['blur(.1px)', 'blur(.5px)', 'blur(2.2px)', 'blur(2.2px)']);

  // A single process axis is drawn left-to-right just before the cards snap onto it.
  const processAxisOpacity = useTransform(scrollYProgress, [0, 0.64, 0.72, 0.82, 1], [0, 0, 0.28, 0.82, 0.82]);
  const processAxisScale = useTransform(scrollYProgress, [0.64, 0.82], [0, 1]);
  const processNodesOpacity = useTransform(scrollYProgress, [0, 0.72, 0.82, 1], [0, 0, 0.76, 0.76]);

  // Context labels disappear as the cards become the clear ordered output.
  const labelOpacity = useTransform(scrollYProgress, [0, 0.54, 0.78, 0.90], [0.68, 0.52, 0.18, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.35, 0]);

  const { scrollYProgress: hyundaiProgress } = useScroll({
    target: hyundaiRef,
    offset: ['start 78%', 'end 32%'],
  });
  const hyundaiSketchOpacity = useTransform(hyundaiProgress, [0, 0.38, 0.68], [1, 1, 0]);
  const hyundaiFinalOpacity = useTransform(hyundaiProgress, [0.18, 0.56, 0.82], [0, 0.35, 1]);
  const hyundaiSketchScale = useTransform(hyundaiProgress, [0, 0.72], [1, 1.018]);
  const hyundaiFinalScale = useTransform(hyundaiProgress, [0.2, 0.82], [1.025, 1]);

  return (
    <div className="home-v2">
      <section ref={storyRef} className="clarity-story" aria-label="From complexity to clarity">
        <div className="clarity-stage">
          <motion.div
            className="hero-copy"
            style={{
              x: reduceMotion ? 0 : (isMobile ? mobileHeroX : heroX),
              y: reduceMotion ? 0 : (isMobile ? mobileHeroY : 0),
              opacity: reduceMotion ? 1 : (isMobile ? mobileHeroOpacity : 1),
            }}
          >
            <p className="hero-eyebrow">PRODUCT DESIGN · AI · SYSTEMS</p>
            <h1 className="hero-title">
              I design thoughtful <span>solutions</span> that connect people, technology and business.
            </h1>
            <p className="hero-subtitle">From complex product problems to intuitive, scalable digital experiences.</p>
            <p className="hero-expertise">Product Design · Human–AI Interaction · Complex UX · Systems</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#work">See how I work <ArrowDown size={17} aria-hidden="true" /></a>
              <Link className="text-cta" to="/about">About me <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className="hero-status">
              <span>CURRENTLY OPEN TO</span>
              <strong>Product Designer opportunities</strong>
            </div>
          </motion.div>

          <motion.div
            className="fullscreen-clarity-field"
            style={{
              opacity: reduceMotion ? 0 : fullscreenFieldOpacity,
              scale: reduceMotion ? 1 : fullscreenFieldScale,
            }}
            aria-hidden="true"
          >
            <div className="fullscreen-clarity-field__halo" />
            <div className="fullscreen-clarity-field__ring fullscreen-clarity-field__ring--1" />
            <div className="fullscreen-clarity-field__ring fullscreen-clarity-field__ring--2" />
            <div className="fullscreen-clarity-field__ring fullscreen-clarity-field__ring--3" />
            <div className="fullscreen-clarity-field__core" />
          </motion.div>

          <motion.div
            className="peripheral-focus-blur"
            style={{ opacity: reduceMotion ? 0 : peripheralBlurOpacity }}
            aria-hidden="true"
          />

          <motion.div
            className="clarity-field-wrap"
            style={{
              x: reduceMotion ? 0 : (isMobile ? 0 : fieldX),
              y: reduceMotion ? 0 : (isMobile ? mobileFieldY : 0),
              scale: reduceMotion ? 1 : (isMobile ? mobileFieldScale : fieldScale),
              opacity: reduceMotion ? 1 : (isMobile ? mobileFieldOpacity : 1),
            }}
            aria-hidden="true"
          >
            <div className="clarity-field">
              <motion.div className="cf-atmosphere" style={{ scale: reduceMotion ? 1 : auraScale, opacity: reduceMotion ? 1 : auraOpacity }}>
                <div className="cf-aura cf-aura--one" />
                <div className="cf-aura cf-aura--two" />
                <div className="cf-grid" />
              </motion.div>

              <motion.svg className="cf-lines" viewBox="0 0 760 620" fill="none" style={{ opacity: reduceMotion ? 0.72 : pathOpacity }}>
                <path d="M56 388C194 292 245 222 364 298C475 369 558 242 704 128" />
                <path d="M42 218C186 205 229 326 358 310C482 295 569 353 725 449" />
                <path d="M142 548C222 429 310 424 391 328C456 250 545 227 661 259" />
                <circle cx="361" cy="309" r="7" />
                <circle cx="244" cy="256" r="3" />
                <circle cx="520" cy="286" r="3" />
                <circle cx="610" cy="183" r="3" />
              </motion.svg>

              <motion.div className="cf-lens" style={{ scale: reduceMotion ? 1 : lensScale, opacity: reduceMotion ? 1 : lensOpacity }}>
                <div className="cf-lens__surface" />
                <div className="cf-lens__ellipse cf-lens__ellipse--a" />
                <div className="cf-lens__ellipse cf-lens__ellipse--b" />
                <div className="cf-lens__focus" />
              </motion.div>

              <motion.div
                className="cf-resolution-line"
                style={{
                  opacity: reduceMotion ? 0 : resolutionLineOpacity,
                  scaleX: reduceMotion ? 0 : resolutionLineScale,
                }}
              ><i/><i/><i/><i/><i/></motion.div>

              <motion.div
                className="clarity-process-axis"
                style={{
                  opacity: reduceMotion ? 0.82 : processAxisOpacity,
                  scaleX: reduceMotion ? 1 : processAxisScale,
                }}
              >
                <motion.span style={{ opacity: reduceMotion ? 0.76 : processNodesOpacity }} />
                <motion.span style={{ opacity: reduceMotion ? 0.76 : processNodesOpacity }} />
                <motion.span style={{ opacity: reduceMotion ? 0.76 : processNodesOpacity }} />
                <motion.span style={{ opacity: reduceMotion ? 0.76 : processNodesOpacity }} />
                <motion.span style={{ opacity: reduceMotion ? 0.76 : processNodesOpacity }} />
              </motion.div>

              <Artifact
                className="cf-research"
                eyebrow="RESEARCH"
                style={{
                  x: reduceMotion ? 0 : (isMobile ? mobileResearchX : researchX),
                  y: reduceMotion ? 0 : (isMobile ? mobileResearchY : researchY),
                  scale: reduceMotion ? 1 : (isMobile ? mobileResearchScale : researchScale),
                  opacity: reduceMotion ? 1 : researchOpacity,
                  filter: reduceMotion ? 'blur(0px)' : researchBlur,
                }}
              >
                <div className="mini-research-detail">
                  <div className="mini-research-detail__dashboard">
                    <svg viewBox="0 0 100 40" fill="none" aria-hidden="true"><path d="M4 32L20 24L36 27L53 14L70 19L95 7"/><circle cx="20" cy="24" r="2"/><circle cx="53" cy="14" r="2"/><circle cx="95" cy="7" r="2"/></svg>
                    <div className="mini-research-detail__metric"><b>68%</b><span>signal</span></div>
                  </div>
                  <div className="mini-research-detail__grid"><i/><i/><i/><i/><i/><i/></div>
                  <div className="mini-research-detail__rows"><i/><i/><i/></div>
                </div>
              </Artifact>

              <Artifact
                className="cf-data"
                eyebrow="DATA / SIGNALS"
                style={{
                  x: reduceMotion ? 0 : (isMobile ? mobileDataX : dataX),
                  y: reduceMotion ? 0 : (isMobile ? mobileDataY : dataY),
                  scale: reduceMotion ? 1 : (isMobile ? mobileDataScale : dataScale),
                  opacity: reduceMotion ? 1 : dataOpacity,
                  filter: reduceMotion ? 'blur(0px)' : dataBlur,
                }}
              >
                <div className="mini-data-detail">
                  <span className="mini-data-detail__caption">BEHAVIOUR SIGNAL</span>
                  <svg viewBox="0 0 120 52" fill="none" aria-hidden="true"><path d="M4 43L26 30L47 36L69 16L92 23L116 8"/><circle cx="26" cy="30" r="2"/><circle cx="69" cy="16" r="2"/><circle cx="116" cy="8" r="2"/></svg>
                  <div className="mini-data-detail__axis"><span>01</span><span>02</span><span>03</span><span>04</span></div>
                  <i/><i/><i/> 
                </div>
              </Artifact>

              <Artifact
                className="cf-ai"
                eyebrow="AI EXPLORATION"
                style={{
                  x: reduceMotion ? 0 : (isMobile ? mobileAiX : aiX),
                  y: reduceMotion ? 0 : (isMobile ? mobileAiY : aiY),
                  scale: reduceMotion ? 1 : (isMobile ? mobileAiScale : aiScale),
                  opacity: reduceMotion ? 1 : aiOpacity,
                }}
              >
                <div className="mini-chat">
                  <div className="mini-chat__prompt">How might we help users feel in control?</div>
                  <div className="mini-chat__row"><b/><i/></div>
                  <div className="mini-chat__row"><b/><i/></div>
                  <div className="mini-chat__input"><span>Ask anything…</span><em>→</em></div>
                  <div className="mini-chat__actions"><i/><i/><span/><span/></div>
                </div>
              </Artifact>

              <Artifact
                className="cf-system"
                eyebrow="SYSTEMS"
                style={{
                  x: reduceMotion ? 0 : (isMobile ? mobileSystemX : systemX),
                  y: reduceMotion ? 0 : (isMobile ? mobileSystemY : systemY),
                  scale: reduceMotion ? 1 : (isMobile ? mobileSystemScale : systemScale),
                  opacity: reduceMotion ? 1 : systemOpacity,
                  filter: reduceMotion ? 'blur(0px)' : systemBlur,
                }}
              >
                <div className="mini-system-detail">
                  <span className="msd-node msd-node--a"/><span className="msd-node msd-node--b"/><span className="msd-node msd-node--c"/><span className="msd-node msd-node--d"/><span className="msd-node msd-node--e"/><span className="msd-node msd-node--f"/><span className="msd-node msd-node--g"/>
                  <i className="msd-line msd-line--v"/><i className="msd-line msd-line--h1"/><i className="msd-line msd-line--h2"/><i className="msd-line msd-line--v2"/>
                </div>
              </Artifact>

              <Artifact
                className="cf-components"
                eyebrow="COMPONENTS"
                style={{
                  x: reduceMotion ? 0 : (isMobile ? mobileComponentsX : componentsX),
                  y: reduceMotion ? 0 : (isMobile ? mobileComponentsY : componentsY),
                  scale: reduceMotion ? 1 : (isMobile ? mobileComponentsScale : componentsScale),
                  opacity: reduceMotion ? 1 : componentsOpacity,
                  filter: reduceMotion ? 'blur(0px)' : componentsBlur,
                }}
              >
                <div className="mini-components-detail"><span>Input</span><span>Button</span><span>State</span><span>Token</span><span>Default</span><span>Hover</span><span>Error</span><span>Focus</span><span>Variant</span><span>Chip</span></div>
              </Artifact>

              <motion.span className="cf-label cf-label--user" style={{ opacity: reduceMotion ? 0.68 : labelOpacity }}>USER NEEDS</motion.span>
              <motion.span className="cf-label cf-label--testing" style={{ opacity: reduceMotion ? 0.68 : labelOpacity }}>VALIDATION</motion.span>
            </div>
          </motion.div>

          <motion.div className="scroll-hint" style={{ opacity: reduceMotion ? 1 : scrollHintOpacity }} aria-hidden="true">
            <span className="scroll-hint__circle"><ArrowDown size={16} /></span>
            <span>SCROLL TO EXPLORE</span>
          </motion.div>

        </div>
      </section>

      <section id="work" className="work-intro">
        <div className="work-intro__copy">
          <span className="section-index">01 / HSBC</span>
          <div className="work-title-row">
            <h2>Mobile Banking Experience</h2>
            <a
              className="award-badge"
              href="https://ifdesign.com/en/winner-ranking/project/hsbc-banking-app/769705"
              target="_blank"
              rel="noreferrer"
              aria-label="HSBC Banking App — iF DESIGN AWARD 2026 winning project"
            >
              <span className="if-award-mark" aria-hidden="true"><b>iF</b></span>
              <span className="award-badge__copy"><small>Award-winning project</small><strong>iF DESIGN AWARD 2026</strong></span>
            </a>
          </div>
          <p className="work-intro__lead">Designing conversational banking experiences inside a complex global product ecosystem.</p>
          <div className="work-meta">
            <div><span>CONTEXT</span><strong>Global banking · 26 markets</strong></div>
            <div><span>FOCUS</span><strong>Conversational UX · AI interaction</strong></div>
          </div>
          <p className="work-intro__support">A flagship commercial project combining enterprise-scale product design, complex flows and contextual AI interaction.</p>
          <Link className="project-cta" to="/project/hsbc-banking">Explore case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="work-intro__visual">
          <div className="hsbc-phone-frame">
            <img src={hsbcImage} alt="HSBC transaction details screen with contextual AI chat entry point" />
          </div>
          <div className="visual-annotation">
            <span />
            <strong>AI ENTRY POINT</strong>
            <small>Contextual access to conversational support</small>
          </div>
        </div>
      </section>

      <section className="project-showcase project-showcase--frisco" aria-labelledby="frisco-title">
        <div className="project-showcase__copy">
          <p className="section-index project-showcase__index project-showcase__index--frisco">02 / FRISCOACH</p>
          <h2 id="frisco-title">AI Culinary Assistant</h2>
          <p className="project-showcase__tags">E-commerce · GenAI / LLM · Conversational UX</p>
          <p className="project-showcase__lead">An LLM-powered culinary experience connecting recipe inspiration, product recommendations and grocery shopping.</p>
          <div className="project-showcase__facts">
            <div><span>ROLE</span><strong>End-to-end product stream</strong></div>
            <div><span>FOCUS</span><strong>Conversational UX · AI interaction</strong></div>
          </div>
          <div className="frisco-flow" aria-label="Friscoach product flow">
            <span>Recipe inspiration</span><i/>
            <span>AI recommendations</span><i/>
            <span>Grocery basket</span>
          </div>
          <Link className="project-cta project-cta--frisco" to="/project/frisco-ach">Explore case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <motion.div
          className="project-showcase__visual frisco-visual"
          initial={reduceMotion ? false : { opacity: 0, y: 26, scale: .985 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: .28 }}
          transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="frisco-visual__frame">
            <img src={friscoImage} alt="Frisco brand campaign visual with mobile shopping, customers and delivery van" />
          </div>
          <span className="frisco-visual__note">LLM-POWERED PRODUCT EXPERIENCE</span>
        </motion.div>
      </section>

      <section ref={hyundaiRef} className="project-showcase project-showcase--hyundai" aria-labelledby="hyundai-title">
        <div className="project-showcase__copy">
          <p className="section-index project-showcase__index">03 / HYUNDAI TUCSON NX4</p>
          <span className="project-status-badge">CONCEPT PROJECT</span>
          <h2 id="hyundai-title">HMI Concept Redesign</h2>
          <p className="project-showcase__tags">Automotive · HMI · Interaction Design</p>
          <p className="project-showcase__lead">Exploring how complex vehicle information can become easier to understand and operate.</p>
          <p className="hyundai-progress-label">
            <span>Extensive research</span><b aria-hidden="true">·</b>
            <span>Sketch</span><b aria-hidden="true">·</b>
            <span>Structure</span><b aria-hidden="true">·</b>
            <span>Interface</span><b aria-hidden="true">·</b>
            <span>User testing</span>
          </p>
          <Link className="project-cta" to="/project/hyundai-tucson">Explore case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="project-showcase__visual hyundai-visual">
          <motion.img
            className="hyundai-visual__layer hyundai-visual__sketch"
            src={hyundaiSketch}
            alt="Sketch-style Hyundai Tucson cockpit exploration"
            style={{ opacity: reduceMotion ? 0 : hyundaiSketchOpacity, scale: reduceMotion ? 1 : hyundaiSketchScale }}
          />
          <motion.img
            className="hyundai-visual__layer hyundai-visual__final"
            src={hyundaiFinal}
            alt="Final dark Hyundai Tucson HMI concept interface"
            style={{ opacity: reduceMotion ? 1 : hyundaiFinalOpacity, scale: reduceMotion ? 1 : hyundaiFinalScale }}
          />
          <div className="hyundai-visual__caption"><span>EXPLORATION</span><span aria-hidden="true">→</span><span>INTERFACE</span></div>
        </div>
      </section>

      <section className="project-showcase project-showcase--ai-system" aria-labelledby="ai-system-title">
        <div className="project-showcase__copy">
          <p className="section-index project-showcase__index">04 / AI DESIGN SYSTEM</p>
          <span className="project-status-badge">CONCEPT / IN PROGRESS</span>
          <h2 id="ai-system-title">Human–AI Interaction System</h2>
          <p className="project-showcase__tags">AI Product Design · Design Systems · Accessibility</p>
          <p className="project-showcase__lead">Exploring scalable interaction patterns for trustworthy AI products — from sources and confidence to confirmation, regeneration and recovery.</p>
          <p className="project-showcase__support">This project is being developed as a systems-focused case study and will be added to the portfolio when complete.</p>
          <span className="project-cta project-cta--disabled" aria-disabled="true">Case study in progress</span>
        </div>
        <div className="project-showcase__visual ai-system-visual" aria-label="AI interaction pattern system">
          <div className="ai-system-orbit" aria-hidden="true" />
          {[
            ['AI Response', 'Generated output'],
            ['Sources', 'Grounding & evidence'],
            ['Confidence', 'Calibrated trust'],
            ['Regenerate', 'User control'],
            ['Confirm', 'Explicit action'],
            ['Error & Recovery', 'Safe fallback'],
          ].map(([title, note], index) => (
            <motion.div
              key={title}
              className={`ai-pattern-card ai-pattern-card--${index + 1}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: index % 2 ? 2 : -2 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ duration: .48, delay: index * .06 }}
            >
              <span>{title}</span>
              <strong>{note}</strong>
              <i><b/></i>
            </motion.div>
          ))}
          <div className="ai-system-foundations">
            <small>FOUNDATIONS</small><span>Color</span><span>Type</span><span>Spacing</span><span>States</span>
          </div>
        </div>
      </section>

      <section id="process" className="process-section" aria-labelledby="process-title">
        <div className="section-shell">
          <div className="process-heading">
            <div>
              <p className="section-kicker">PROCESS</p>
              <h2 id="process-title">From ambiguity to product decisions.</h2>
            </div>
            <p className="process-heading__note">
              Methods depend on the problem. Evidence informs decisions — these stages are a way of thinking, not a rigid methodology.
            </p>
          </div>

          <div className="process-path" aria-label="Product design process">
            {[
              ['01', 'Understand', 'Research · Business context · User needs', 'research'],
              ['02', 'Frame', 'Problem · Constraints · Opportunity', 'frame'],
              ['03', 'Explore', 'Flows · Sketches · Concepts', 'explore'],
              ['04', 'Decide', 'Trade-offs · Prioritisation · Validation', 'decide'],
              ['05', 'Build', 'Interaction · UI · Prototype · System', 'build'],
              ['06', 'Learn', 'Testing · Metrics · Iteration', 'learn'],
            ].map(([num, title, detail, kind], index) => (
              <motion.article
                key={title}
                className="process-step"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .55 }}
                transition={{ duration: .45, delay: index * .055 }}
              >
                <div className="process-step__node">{num}</div>
                <div className={`process-artifact process-artifact--${kind}`} aria-hidden="true">
                  <i/><i/><i/><i/>
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="section-shell">
          <p className="section-kicker">CAPABILITIES</p>
          <h2 id="capabilities-title">What I bring to product teams.</h2>
          <div className="capability-grid">
            {[
              ['PRODUCT', ['Problem framing', 'Product discovery', 'UX strategy', 'Prioritisation', 'Business alignment']],
              ['EXPERIENCE', ['Interaction design', 'Information architecture', 'UI design', 'Prototyping', 'Complex workflows']],
              ['AI & SYSTEMS', ['Human–AI interaction', 'Conversational UX', 'Generative AI / LLM', 'Design systems', 'Accessibility']],
              ['VALIDATION', ['User research', 'Usability testing', 'Product metrics', 'Experimentation', 'Iteration']],
            ].map(([title, items], index) => (
              <motion.div
                key={title as string}
                className="capability-column"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .55 }}
                transition={{ duration: .42, delay: index * .07 }}
              >
                <h3>{title as string}</h3>
                <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
              </motion.div>
            ))}
          </div>
          <div className="tools-line">
            <span>TOOLS & TECHNOLOGY</span>
            <p>Figma · FigJam · Axure RP · Jira · Miro · HTML/CSS · After Effects · Design-to-Code & No-Code Web Builders: Webflow / WordPress / Framer · Cursor AI · Google Analytics · Maze · GitHub Copilot / Claude Design / ChatGPT</p>
          </div>
        </div>
      </section>

      <section id="about" className="about-home" aria-labelledby="about-home-title">
        <div className="section-shell about-home__grid">
          <div className="about-home__copy">
            <p className="section-kicker">ABOUT</p>
            <h2 id="about-home-title">Designing between people, business and technology.</h2>
            <p>
              I'm a Product Designer working across complex digital products, from global banking and e-commerce to AI-powered experiences and automotive interfaces.
            </p>
            <p>
              I work across the product design process — understanding problems, exploring solutions, making design decisions, validating ideas and collaborating toward implementation.
            </p>
            <div className="about-exploring">
              <span>CURRENTLY EXPLORING</span>
              <ul>
                <li>AI Product Design</li>
                <li>Design Systems</li>
                <li>Accessibility</li>
                <li>Design Engineering</li>
              </ul>
            </div>
          </div>
          <motion.div
            className="about-portrait"
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: .985 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: .35 }}
            transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-portrait__field" aria-hidden="true">
              <span className="about-node about-node--ai">AI</span>
              <span className="about-node about-node--research">RESEARCH</span>
              <span className="about-node about-node--systems">SYSTEMS</span>
              <span className="about-node about-node--interaction">INTERACTION</span>
            </div>
            <img src={mariaPortrait} alt="Sketch portrait of Maria Szczudło" />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="section-shell">
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="section-kicker">HAVE A PRODUCT PROBLEM?</p>
              <h2 id="contact-title">Let's make complexity <span>feel simple.</span></h2>
              <p>Have a project, opportunity or product problem in mind? I'd be happy to hear about it.</p>
              <div className="contact-links">
                <div>
                  <span>EMAIL</span>
                  <a href="mailto:marysia.szczudlo1994@gmail.com"><Mail size={17}/> marysia.szczudlo1994@gmail.com</a>
                  <button
                    type="button"
                    className="copy-email"
                    aria-live="polite"
                    onClick={async () => {
                      await navigator.clipboard?.writeText('marysia.szczudlo1994@gmail.com');
                      setEmailCopied(true);
                      window.setTimeout(() => setEmailCopied(false), 1800);
                    }}
                  >
                    {emailCopied ? <Check size={15}/> : <Copy size={15}/>}
                    {emailCopied ? 'Copied!' : 'Copy email'}
                  </button>
                </div>
                <div>
                  <span>LINKEDIN</span>
                  <a href="https://www.linkedin.com/in/maria-szczudlo/" target="_blank" rel="noreferrer"><Linkedin size={17}/> Open LinkedIn <ArrowUpRight size={15}/></a>
                </div>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const name = String(data.get('name') || '');
                const email = String(data.get('email') || '');
                const message = String(data.get('message') || '');
                const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'website visitor'}`);
                const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
                window.location.href = `mailto:marysia.szczudlo1994@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <p className="contact-form__label">SEND A MESSAGE</p>
              <label>
                <span>Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={6} required />
              </label>
              <button type="submit">Send message <ArrowRight size={17}/></button>
            </form>
          </div>

          <div className="home-footer">
            <span>Maria Szczudło · Product Designer · 2026</span>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUpRight className="home-footer__arrow" size={17}/>
              Back to top
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
