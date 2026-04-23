import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedButton from "@/components/AnimatedButton";
import { Hammer, RocketLaunch, SmileySticker, FastForward, CassetteTape, Coffee, CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import aboutHero from "@/assets/about-hero-new.png";
import chessPiece from "@/assets/chesspiece.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Tool logos
import figmaLogo from "@/assets/logos/figma.png";
import webflowLogo from "@/assets/logos/webflow.svg";
import framerLogo from "@/assets/logos/framer.svg";
import lovableLogo from "@/assets/logos/lovable.svg";
import canvaLogo from "@/assets/logos/canva.svg";
import notionLogo from "@/assets/logos/notion.svg";
import affinityLogo from "@/assets/logos/affinity.svg";
import jitterLogo from "@/assets/logos/jitter.svg";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems: MarqueeItemData[] = [
  { icon: <Hammer size={30} weight="fill" />, before: "Now", bold: "designing", after: "a scalable fintech dashboard" },
  { before: "", bold: "Launching", after: "a conversion-focused product website", icon: <RocketLaunch size={30} weight="fill" /> },
  { before: "", bold: "Building", after: "an automated workflow system", icon: <FastForward size={30} weight="fill" /> },
  { before: "", bold: "Crafting", after: "a zero-code SaaS platform", icon: <CassetteTape size={30} weight="fill" /> },
  { before: "", bold: "Brewing", after: "fresh ideas over coffee", icon: <Coffee size={30} weight="fill" /> },
];

const valueCards = [
  {
    number: "01",
    title: "Clarity over complexity",
    description: "Every project starts with understanding the problem, not jumping to solutions. Clear thinking leads to better design, every time.",
    bg: "bg-primary",
  },
  {
    number: "02",
    title: "Design that ships",
    description: "Beautiful screens that never get built are useless. Everything I design is built with developers and real constraints in mind.",
    bg: "bg-accent",
  },
  {
    number: "03",
    title: "Speed without shortcuts",
    description: "AI-assisted workflows and pre-built component systems mean faster delivery without cutting corners on quality or craft.",
    bg: "bg-secondary",
  },
  {
    number: "04",
    title: "Built to grow with you",
    description: "I design systems, not just screens. What I build today should still be working for you two years from now.",
    bg: "bg-muted",
  },
];

const toolLogos = [
  { name: "Figma", src: figmaLogo },
  { name: "Webflow", src: webflowLogo },
  { name: "Framer", src: framerLogo },
  { name: "Lovable", src: lovableLogo },
  { name: "Canva", src: canvaLogo },
  { name: "Notion", src: notionLogo },
  { name: "Affinity", src: affinityLogo },
  { name: "Jitter", src: jitterLogo },
];

const brandStatement = "I got tired of seeing great ideas die in Figma. Too many businesses had the vision but got stuck between design and development. So I built a way of working that connects both. Strategy, design, and the tools to actually build it, all from one person who genuinely cares about the outcome.";
const brandChars = brandStatement.split("");

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const chessPieceRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const brandRef = useRef<HTMLElement>(null);

  // Typewriter scroll reveal for brand statement
  useEffect(() => {
    const section = brandRef.current;
    if (!section) return;

    const totalChars = brandChars.length;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "center 30%",
      scrub: 1,
      onUpdate: (self) => {
        const count = Math.round(self.progress * totalChars);
        setRevealedCount(count);
      },
    });

    return () => st.kill();
  }, []);

  // Chess piece floating animation
  useEffect(() => {
    const el = chessPieceRef.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { y: -15, rotateZ: 3, rotateY: 5, duration: 3, ease: "sine.inOut" })
      .to(el, { y: 10, rotateZ: -2, rotateY: -3, duration: 2.5, ease: "sine.inOut" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      gsap.to(el, { rotateY: dx * 20, rotateX: -dy * 15, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const handleMouseLeave = () => tl.play();

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const goToCard = (index: number) => {
    if (index < 0 || index >= valueCards.length) return;
    setActiveCard(index);
  };

  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll(".value-card");
    cards.forEach((card, i) => {
      const offset = (i - activeCard) * 114;
      const zIndex = valueCards.length - Math.abs(i - activeCard);
      gsap.to(card, {
        x: offset,
        zIndex,
        opacity: i >= activeCard ? 1 : 0.3,
        scale: i === activeCard ? 1 : 0.95,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  }, [activeCard]);

  return (
    <div className="min-h-screen bg-background font-satoshi">
      {/* Top Marquee */}
      <div className="border-b py-2 border-[#383838]/0 border-0 border-none bg-[#1f1f1f]/0">
        <Marquee items={marqueeItems} />
      </div>

      <Navbar />

      <div className="px-3 md:px-5 pt-2">
        {/* Section 1: Hero */}
        <ScrollReveal variant="fade-up" duration={0.8}>
          <section className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 min-h-[80vh] lg:h-[940px] py-12 md:py-16 lg:py-0">
            <div className="flex flex-col items-start gap-2.5 max-w-[721px] lg:-mr-[116px] z-10">
              <div className="flex items-center gap-2.5">
                <SmileySticker size={24} weight="fill" className="text-primary md:w-[30px] md:h-[30px]" />
                <span className="font-satoshi text-base md:text-xl text-foreground">Meet Zairie</span>
              </div>
              <h1 className="font-satoshi font-medium text-[36px] leading-[40px] md:text-5xl md:leading-[52px] lg:text-[80px] lg:leading-[80px] text-foreground">
                A Designer Who Builds, Not Just Designs.
              </h1>
              <p className="font-satoshi text-sm md:text-base lg:text-xl leading-[22px] md:leading-[27px] text-foreground max-w-[721px]">
                Born from curiosity and built through real-world projects, I help businesses design and launch digital products that actually perform. I don't just hand over mockups. I stay until it ships.
              </p>
              <div className="flex flex-wrap items-stretch gap-3 mt-2">
                <div className="flex items-stretch">
                  <Link to="/contact">
                    <AnimatedButton variant="primary" className="h-[50px] md:h-[65px] text-sm md:text-[20px] leading-[27px]">
                      Start A Project With Me
                    </AnimatedButton>
                  </Link>
                  <Link to="/contact">
                    <AnimatedButton variant="primary" iconOnly className="w-[50px] h-[50px] md:w-[64px] md:h-[65px]">
                      <Hammer size={24} weight="fill" className="md:w-8 md:h-8" />
                    </AnimatedButton>
                  </Link>
                </div>
                <Link to="/projects">
                  <AnimatedButton variant="accent" className="h-[50px] md:h-[65px] text-sm md:text-[20px] leading-[27px]">
                    View My Work
                  </AnimatedButton>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-[10px] overflow-hidden flex-shrink-0">
              <img src={aboutHero} alt="Zairie working on design" className="w-full h-full object-cover" width={1200} height={1200} />
            </div>
          </section>
        </ScrollReveal>

        {/* Section 2: Brand Statement - Scroll reveal typewriter */}
        <section
          ref={brandRef}
          className="max-w-[1400px] mx-auto rounded-[20px] bg-[#000000] px-6 sm:px-10 md:px-[100px] lg:px-[200px] py-16 md:py-20 flex flex-col justify-center items-start gap-8 min-h-[480px] md:min-h-[600px] lg:min-h-[940px]"
        >
          <h2 className="font-satoshi font-bold text-2xl sm:text-3xl md:text-[40px] md:leading-[56px] lg:text-[50px] lg:leading-[68px] max-w-[1020px] relative">
            <span className="text-foreground">
              {brandStatement.slice(0, revealedCount)}
            </span>
            {revealedCount > 0 && revealedCount < brandChars.length && (
              <span className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-[2px] animate-[pulse_1s_steps(1)_infinite]" />
            )}
            <span className="text-foreground/15">
              {brandStatement.slice(revealedCount)}
            </span>
          </h2>
          <Link to="/contact" className="inline-flex items-stretch">
            <AnimatedButton variant="primary" className="px-5 h-[50px] md:h-[65px] text-base md:text-xl leading-[27px] rounded-[10px]">
              Let's Talk
            </AnimatedButton>
            <AnimatedButton variant="primary" iconOnly className="w-[50px] h-[50px] md:w-16 md:h-[65px] rounded-[10px]">
              <Hammer size={24} weight="fill" />
            </AnimatedButton>
          </Link>
        </section>

        {/* Section 3: Mission */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <section className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-[73px] py-16 md:py-20 min-h-[480px] md:min-h-[600px]">
            {/* Left: Chess piece */}
            <div ref={chessPieceRef} className="w-[220px] h-[260px] sm:w-[280px] sm:h-[320px] lg:w-[342px] lg:h-[386px] flex items-center justify-center flex-shrink-0" style={{ perspective: "600px" }}>
              <img src={chessPiece} alt="Chess piece illustration" className="w-full h-full object-contain" />
            </div>

            {/* Right: Mission text */}
            <div className="flex flex-col items-start lg:items-end gap-2.5 max-w-[721px]">
              <div className="flex items-center gap-2.5 lg:justify-end">
                <SmileySticker size={24} weight="fill" className="text-primary md:w-[30px] md:h-[30px]" />
                <span className="font-satoshi text-base md:text-xl text-foreground">Why I Do This</span>
              </div>
              <h2 className="font-satoshi font-medium text-[36px] leading-[40px] md:text-5xl md:leading-[52px] lg:text-[80px] lg:leading-[80px] text-foreground lg:text-right w-full">
                My Mission
              </h2>
              <p className="font-satoshi text-sm md:text-base lg:text-xl leading-[22px] md:leading-[27px] text-foreground lg:text-right">
                To help businesses and teams build digital products that are clear, fast, and built to grow. I simplify the gap between idea and execution by combining user research, design systems, and AI-powered workflows into one seamless process. Because good design should never be the bottleneck.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 4: How I Work - Value Cards */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <section className="max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-8 py-16 md:py-20 min-h-[700px] md:min-h-[800px] lg:min-h-[1200px]">
            <div className="w-full max-w-[1136px] flex flex-col items-start gap-8">
              <h3 className="font-satoshi font-medium text-[36px] leading-[40px] md:text-5xl md:leading-[52px] lg:text-[80px] lg:leading-[80px] text-foreground">
                How I Work
              </h3>

              <div className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
                {/* Mobile: simple stacked card showing only active card */}
                <div className="lg:hidden w-full">
                  {(() => {
                    const card = valueCards[activeCard];
                    return (
                      <div className={`flex flex-col items-start p-6 gap-4 w-full min-h-[360px] rounded-[10px] ${card.bg}`}>
                        <span className="font-satoshi text-[48px] leading-[56px] text-foreground">{card.number}</span>
                        <span className="font-satoshi text-2xl leading-[32px] text-foreground">{card.title}</span>
                        <p className="font-satoshi text-base leading-[24px] text-foreground">{card.description}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Desktop: GSAP-animated stacked deck */}
                <div ref={cardsContainerRef} className="hidden lg:block relative w-full h-[439px] overflow-hidden">
                  {valueCards.map((card, i) => (
                    <div
                      key={i}
                      className={`value-card absolute top-0 left-0 flex flex-col items-start p-[30px] gap-[18px] w-full max-w-[473px] h-[439px] rounded-[10px] ${card.bg}`}
                      style={{ zIndex: valueCards.length - i }}
                    >
                      <span className="font-satoshi text-[64px] leading-[86px] text-foreground">{card.number}</span>
                      <span className="font-satoshi text-[30px] leading-[40px] text-foreground">{card.title}</span>
                      <p className="font-satoshi text-xl leading-[27px] text-foreground">{card.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => goToCard(activeCard - 1)}
                    disabled={activeCard === 0}
                    className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-foreground/10 transition-colors"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>
                  <span className="font-satoshi text-sm text-foreground/60 lg:hidden">
                    {activeCard + 1} / {valueCards.length}
                  </span>
                  <button
                    onClick={() => goToCard(activeCard + 1)}
                    disabled={activeCard === valueCards.length - 1}
                    className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground disabled:opacity-30 hover:bg-foreground/10 transition-colors"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 5: Tools / My Stack */}
        <ScrollReveal variant="fade-up">
          <section className="max-w-[1400px] mx-auto mb-16">
            <div className="relative flex flex-col justify-center items-center p-6 md:p-10 lg:p-[50px] bg-black rounded-[20px] overflow-hidden min-h-[640px] md:min-h-[800px] lg:min-h-[940px]">
              {/* Floating tool cards - hidden on mobile to keep layout clean */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                {(() => {
                  const toolCards = [
                    { logo: webflowLogo, name: "Webflow", desc: "Web design & development" },
                    { logo: framerLogo, name: "Framer", desc: "Interactive prototyping" },
                    { logo: notionLogo, name: "Notion", desc: "Project management" },
                    { logo: figmaLogo, name: "Figma", desc: "UI/UX design" },
                    { logo: affinityLogo, name: "Affinity", desc: "Design suite" },
                    { logo: jitterLogo, name: "Canva", desc: "Slides & Quick Design" },
                    { logo: lovableLogo, name: "Lovable", desc: "AI development" },
                  ];
                  const positions: React.CSSProperties[] = [
                    { top: "15%", left: "12%" },
                    { top: "12%", left: "42%" },
                    { top: "18%", right: "12%" },
                    { bottom: "22%", left: "16%" },
                    { bottom: "18%", right: "30%" },
                    { bottom: "24%", right: "12%" },
                    { top: "22%", right: "32%" },
                  ];
                  const delays = [0, 0.15, 0.3, 0.1, 0.25, 0.4, 0.2];
                  return toolCards.map((tool, i) => (
                    <div
                      key={tool.name}
                      className="absolute z-[1] flex flex-col items-start gap-1.5 animate-[float_6s_ease-in-out_infinite]"
                      style={{ ...positions[i], animationDelay: `${delays[i]}s` }}
                    >
                      <img src={tool.logo} alt={tool.name} className="h-8 w-auto brightness-0 invert" />
                      <span className="font-satoshi text-sm text-white/60 leading-[20px]">{tool.desc}</span>
                    </div>
                  ));
                })()}
              </div>

              {/* Mobile-only logo grid */}
              <div className="md:hidden grid grid-cols-4 gap-4 mb-8 w-full">
                {[webflowLogo, framerLogo, notionLogo, figmaLogo, affinityLogo, jitterLogo, lovableLogo].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <img src={logo} alt="" className="h-7 w-auto brightness-0 invert opacity-70" />
                  </div>
                ))}
              </div>

              {/* Center content */}
              <div className="relative z-10 flex flex-col items-start gap-2.5 max-w-[692px]">
                <div className="flex items-center gap-2.5">
                  <SmileySticker size={24} weight="fill" className="text-primary md:w-[30px] md:h-[30px]" />
                  <span className="font-satoshi text-base md:text-xl text-white leading-[27px]">
                    Amazing Tools To Share With You
                  </span>
                </div>
                <h2 className="font-satoshi font-medium text-[36px] leading-[40px] md:text-5xl md:leading-[52px] lg:text-[60px] lg:leading-[60px] text-white">
                  Tools I've Used
                </h2>
                <p className="font-satoshi text-sm md:text-base lg:text-xl text-white leading-[22px] md:leading-[27px]">
                  I've tried and used a lot of tools (Like a lot), and I love sharing them with you.
                </p>
                <TooltipProvider>
                  <div className="flex items-stretch mt-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <AnimatedButton magnetic shine fillSweep className="px-5 h-[50px] md:h-[65px] text-base md:text-xl rounded-[10px] cursor-default bg-neutral-700 text-white/70">
                            Coming Soon
                          </AnimatedButton>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="font-satoshi text-sm">
                        I'm working on this page, where I showcase all the tools that I've used.
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <AnimatedButton iconOnly magnetic className="w-[50px] h-[50px] md:w-16 md:h-[65px] rounded-[10px] cursor-default bg-neutral-700 text-white/70">
                            <ArrowRight size={24} weight="bold" />
                          </AnimatedButton>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="font-satoshi text-sm">
                        I'm working on this page, where I showcase all the tools that I've used.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" delay={0.1} className="p-3 md:p-5">
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default About;
