import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CommunitySection from "@/components/CommunitySection";
import AnimatedButton from "@/components/AnimatedButton";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { ArrowLeft, ArrowRight, Briefcase, CaretLeft, CaretRight, Hammer, RocketLaunch, SmileySticker } from "@phosphor-icons/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import personaSme from "@/assets/projects/persona-sme.png";
import personaInvestor from "@/assets/projects/persona-investor.png";
import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import mykapitalInvestor1 from "@/assets/projects/mykapital-investor-1.png";
import mykapitalInvestor2 from "@/assets/projects/mykapital-investor-2.png";
import mykapitalIssuer from "@/assets/projects/mykapital-issuer.png";
import maswalletSide1 from "@/assets/projects/maswallet-side1.png";
import maswalletSide2 from "@/assets/projects/maswallet-side2.png";
import webflowLogo from "@/assets/logos/webflow.svg";
import framerLogo from "@/assets/logos/framer.svg";
import notionLogo from "@/assets/logos/notion.svg";
import n8nLogo from "@/assets/logos/n8n.svg";
import zapierLogo from "@/assets/logos/zapier.svg";
import jitterLogo from "@/assets/logos/jitter.svg";
import affinityLogo from "@/assets/logos/affinity.svg";
import foundationSlide1 from "@/assets/projects/mykapital-foundation-slide-1.png";
import foundationSlide2 from "@/assets/projects/mykapital-foundation-slide-2.png";
import foundationSlide3 from "@/assets/projects/mykapital-foundation-slide-3.png";
import decision1Before from "@/assets/projects/decision1-before.png";
import decision1After from "@/assets/projects/decision1-after.png";
import decision2Before from "@/assets/projects/decision2-before.png";
import decision2After from "@/assets/projects/decision2-after.png";
import decision3Before from "@/assets/projects/decision3-before.png";
import decision3After from "@/assets/projects/decision3-after.png";
import toolImg1 from "@/assets/projects/tool-1.png";
import toolImg2 from "@/assets/projects/tool-2.png";
import toolImg3 from "@/assets/projects/tool-3.png";
import toolImg4 from "@/assets/projects/tool-4.png";
import toolImg5 from "@/assets/projects/tool-5.png";
import backButtonImg from "@/assets/back-button.png";

const personaImages: Record<string, string> = {
  "/persona-sme": personaSme,
  "/persona-investor": personaInvestor,
};

const foundationImages: Record<string, string> = {
  "/mykapital-issuer": mykapitalIssuer,
  "/mykapital-investor-1": mykapitalInvestor1,
  "/mykapital-investor-2": mykapitalInvestor2,
  "/decision1-before": decision1Before,
  "/decision1-after": decision1After,
  "/decision2-before": decision2Before,
  "/decision2-after": decision2After,
  "/decision3-before": decision3Before,
  "/decision3-after": decision3After,
  "/blockchaincert-decision1-1": "/images/blockchaincert-decision1-1.png",
  "/blockchaincert-decision1-2": "/images/blockchaincert-decision1-2.png",
  "/blockchaincert-decision2-1": "/images/blockchaincert-decision2-1.png",
  "/blockchaincert-decision2-2": "/images/blockchaincert-decision2-2.png",
  "/blockchaincert-decision2-3": "/images/blockchaincert-decision2-3.png",
  "/blockchaincert-decision3-1": "/images/blockchaincert-decision3-1.png",
  "/blockchaincert-decision3-2": "/images/blockchaincert-decision3-2.png",
  "/maswallet-decision1": "/images/maswallet-decision1.png",
  "/maswallet-decision2": "/images/maswallet-decision2.png",
  "/maswallet-decision3": "/images/maswallet-decision3.png",
};

const caseStudyMarqueeItems: MarqueeItemData[] = [
  {
    icon: <Hammer size={30} weight="fill" />,
    before: "Now",
    bold: "designing",
    after: "a scalable fintech dashboard"
  },
  {
    before: "",
    bold: "Launching",
    after: "a conversion-focused product website",
    icon: <RocketLaunch size={30} weight="fill" />
  },
  {
    before: "",
    bold: "Building",
    after: "a high-performance marketing site",
    icon: <SmileySticker size={30} weight="fill" />
  }
];

const foundationSlides = [foundationSlide1, foundationSlide2, foundationSlide3];

const FoundationSlider = ({ foundation, foundationImages }: { foundation: any; foundationImages: Record<string, string> }) => {
  const [current, setCurrent] = useState(0);
  const total = foundationSlides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="mb-16 flex flex-col gap-[50px]">
      <h2 className="font-manrope font-semibold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E]">
        {foundation.title}
      </h2>
      <div className="flex flex-col gap-5">
        {foundation.body.split("\n\n").map((paragraph: string, i: number) => (
          <p key={i} className="font-manrope font-medium text-lg md:text-xl leading-[27px] text-[#1E1E1E]">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Slider */}
      <div className="relative w-full rounded-[10px] overflow-hidden bg-black/5" style={{ aspectRatio: "1231/700" }}>
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ width: `${total * 100}%`, transform: `translateX(-${current * (100 / total)}%)` }}
        >
          {foundationSlides.map((slide, i) => (
            <div key={i} className="h-full flex items-center justify-center" style={{ width: `${100 / total}%` }}>
              <img src={slide} alt={`Foundation slide ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1E]/70 hover:bg-[#1E1E1E]/90 text-white flex items-center justify-center transition-colors"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1E]/70 hover:bg-[#1E1E1E]/90 text-white flex items-center justify-center transition-colors"
        >
          <CaretRight size={20} weight="bold" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {foundationSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-[#1E1E1E]/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-[#1E1E1E] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-satoshi font-bold text-4xl mb-4">Project not found</h1>
          <Link to="/projects" className="text-primary underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E]">
      {/* Light-mode project marquee */}
      <div className="border-b border-[#D9D9D9] py-2">
        <Marquee
          items={caseStudyMarqueeItems}
          speed="slow"
          className="[&_span]:!text-[#1E1E1E] [&_.text-primary]:!text-primary"
        />
      </div>

      <Navbar />

      <main className="max-w-[1231px] mx-auto px-5 pt-10 pb-20">
        {/* Announcement + Hero Title */}
        <ScrollReveal variant="fade-up" delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <Link to="/projects" aria-label="Back to projects">
              <AnimatedButton variant="primary" iconOnly magnetic className="w-[50px] h-[50px] rounded-[10px]">
                <ArrowLeft size={20} weight="bold" />
              </AnimatedButton>
            </Link>
            <Briefcase size={24} weight="fill" className="text-primary" />
            <span className="font-satoshi text-base md:text-xl text-[#1E1E1E]">
              Project Details
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <h1 className="font-satoshi font-medium text-4xl md:text-6xl lg:text-[80px] lg:leading-[80px] mb-8">
            {project.heroTitle}
          </h1>
        </ScrollReveal>

        {/* Hero Image / Video Section */}
        <ScrollReveal variant="fade-up" delay={0.15}>
          <div
            className="w-full rounded-[10px] overflow-hidden mb-8 bg-black/10"
            style={{ aspectRatio: "1231/650" }}
          >
            <img
              src={project.heroImage || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Metadata Row */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            {/* Left: Services + Role */}
            <div className="flex flex-col gap-2">
              <span className="font-manrope font-bold text-sm text-[#1E1E1E]">
                Services
              </span>
              <span className="font-manrope font-bold text-2xl md:text-[40px] md:leading-[55px] text-[#1E1E1E]">
                {project.services || project.role}
              </span>
            </div>

            {/* Right: Bullet items in 2-col grid */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {project.tools.map((tool) => (
                <span key={tool} className="font-manrope font-medium text-base text-[#1E1E1E] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E1E1E] shrink-0" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <ScrollReveal variant="fade-up" delay={0.25}>
          <div className="w-full h-px bg-[#D9D9D9] rounded-[10px] mb-16" />
        </ScrollReveal>

        {/* Project Overview - Two Column */}
        <ScrollReveal variant="fade-up">
          <section className="mb-16 flex flex-col md:flex-row justify-between items-start gap-[50px]">
            {/* Left: Sticky metadata */}
            <div className="md:sticky md:top-28 flex flex-col gap-5 w-full md:w-[512px] shrink-0">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                  <span className="font-manrope font-medium text-base text-[#1E1E1E]">
                    Role
                  </span>
                  <span className="font-manrope font-bold text-base text-[#1E1E1E]">
                    {project.role}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-manrope font-medium text-base text-[#1E1E1E]">
                    Industry
                  </span>
                  <span className="font-manrope font-bold text-base text-[#1E1E1E]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              {(() => {
                const liveLinks: Record<string, { label: string; url: string }> = {
                  mykapital: { label: "Live Site", url: "https://mykapital.my" },
                  blockchaincert: { label: "Live Site", url: "https://blockchaincert.my" },
                  maswallet: { label: "Coming Soon", url: "" },
                };
                const cta = liveLinks[project.slug] ?? { label: "Live Site", url: "" };
                const isComingSoon = !cta.url;
                const handleClick = () => {
                  if (!isComingSoon) window.open(cta.url, "_blank", "noopener,noreferrer");
                };
                return (
                  <div className="flex items-start gap-0">
                    <AnimatedButton
                      variant="primary"
                      magnetic
                      shine
                      fillSweep
                      onClick={handleClick}
                      disabled={isComingSoon}
                      className={`px-5 h-[65px] text-xl rounded-[10px] ${isComingSoon ? "cursor-not-allowed opacity-80" : ""}`}
                    >
                      {cta.label}
                    </AnimatedButton>
                    <AnimatedButton
                      variant="primary"
                      iconOnly
                      magnetic
                      onClick={handleClick}
                      disabled={isComingSoon}
                      className={`w-16 h-[65px] rounded-[10px] ${isComingSoon ? "cursor-not-allowed opacity-80" : ""}`}
                    >
                      <ArrowRight size={24} weight="bold" />
                    </AnimatedButton>
                  </div>
                );
              })()}
            </div>

            {/* Right: Content */}
            <div className="flex flex-col gap-5 flex-1">
              <h2 className="font-manrope font-bold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E]">
                {project.heroTitle}
              </h2>
              {project.overview.split("\n\n").map((paragraph, i) => (
                <p key={i} className="font-manrope font-medium text-lg md:text-xl leading-[27px] text-[#1E1E1E]">
                  {paragraph}
                </p>
              ))}
              <div
                className="w-full rounded-[10px] overflow-hidden bg-black/10"
                style={{ aspectRatio: "719/381" }}
              >
                <img
                  src={project.slug === "mykapital" ? mykapitalIssuer : project.slug === "blockchaincert" ? "/images/ca721ac4-0076-41e2-a802-e3aefa4e5705.png" : project.slug === "maswallet" ? "/images/maswallet-phases.png" : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {(() => {
                const lines = project.reflection.split("\n").map(l => l.trim()).filter(Boolean);
                const intro = lines[0];
                const bullets = lines.slice(1);
                return (
                  <>
                    {intro && (
                      <p className="font-manrope font-medium text-lg md:text-xl leading-[27px] text-[#1E1E1E]">
                        {intro}
                      </p>
                    )}
                    {bullets.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2 font-manrope font-medium text-lg md:text-xl leading-[27px] text-[#1E1E1E]">
                        {bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </>
                );
              })()}
            </div>
          </section>
        </ScrollReveal>

        {/* Side by Side Images */}
        <ScrollReveal variant="fade-up">
          {(() => {
            const sideImages: Record<string, [string, string]> = {
              blockchaincert: ["/images/blockchaincert-side1.png", "/images/blockchaincert-side2.png"],
              maswallet: [maswalletSide1, maswalletSide2],
            };
            const [side1, side2] = sideImages[project.slug] ?? [mykapitalInvestor1, mykapitalInvestor2];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                <div className="rounded-[10px] overflow-hidden">
                  <img src={side1} alt={`${project.title} View 1`} className="w-full h-full object-cover" />
                </div>
                <div className="rounded-[10px] overflow-hidden">
                  <img src={side2} alt={`${project.title} View 2`} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })()}
        </ScrollReveal>

        {/* Research Objectives */}
        <ScrollReveal variant="fade-up">
          <section className="mb-16">
            <h2 className="font-manrope font-bold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E] mb-8">
              Research Objectives
            </h2>
            <div className="flex flex-col gap-6 mb-10">
              {project.researchObjectives.map((obj, i) => (
                <div key={i}>
                  <h3 className="font-manrope font-bold text-base text-[#1E1E1E] mb-1">
                    {obj.title}
                  </h3>
                  <p className="font-manrope font-medium text-base text-[#1E1E1E]/80 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>

            {project.researchMethods && project.researchMethods.length > 0 && (
              <>
                <p className="font-manrope font-bold text-base text-[#1E1E1E] mb-4">
                  Research Method Used :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {project.researchMethods.map((method, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-[10px] bg-primary/15 text-[#1E1E1E] font-manrope font-medium text-sm leading-relaxed"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </ScrollReveal>

        {/* Target Users */}
        <ScrollReveal variant="fade-up">
          <section className="mb-16">
            <h2 className="font-manrope font-bold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E] mb-8">
              Target Users
            </h2>

            {project.targetUsers.length > 0 && project.targetUsers[0].image ? (
              <div className="flex flex-col gap-8">
                {project.targetUsers.map((user, i) => (
                  <div key={i}>
                    <h3 className="font-manrope font-bold text-base text-[#1E1E1E] mb-1">
                      User Type {i + 1} ({i === 0 ? "SME Owner" : "The Investor"})
                    </h3>
                    <p className="font-manrope font-medium text-base text-[#1E1E1E]/80 leading-relaxed mb-4">
                      {user.description}
                    </p>
                    <div className="rounded-[10px] overflow-hidden">
                      <img
                        src={personaImages[user.image!]}
                        alt={user.name}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
                <p className="font-manrope font-medium text-base text-[#1E1E1E]/80 leading-relaxed">
                  The design implication: Every screen had to serve both users without alienating either. The information architecture had to feel simple to the SME owner while giving the investor the depth they needed without building two separate products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.targetUsers.map((user, i) => (
                  <div key={i} className="p-6 rounded-xl bg-[#F5F5F5] flex flex-col gap-2">
                    <h3 className="font-satoshi font-bold text-lg text-[#1E1E1E]">{user.name}</h3>
                    <p className="font-satoshi text-sm text-[#1E1E1E]/60 leading-relaxed">{user.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* Discovery */}
        {project.discovery && (
          <ScrollReveal variant="fade-up">
            <section className="mb-16">
              <h2 className="font-manrope font-bold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E] mb-4">
                Discovery
              </h2>
              <p className="font-manrope font-medium text-base md:text-lg text-[#1E1E1E]/80 leading-relaxed mb-8">
                {project.discovery.headline}
              </p>
              <div className="flex flex-col gap-6">
                {project.discovery.problems.map((problem, i) => (
                  <div key={i} className="p-6 rounded-xl bg-[#F5F5F5] flex flex-col gap-2">
                    <h3 className="font-manrope font-bold text-lg text-[#1E1E1E]">
                      Problem {i + 1}: {problem.title}
                    </h3>
                    <p className="font-manrope font-medium text-base text-[#1E1E1E]/80 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Laying Out The Foundation */}
        {project.foundation && (
          <ScrollReveal variant="fade-up">
            <FoundationSlider foundation={project.foundation} foundationImages={foundationImages} />
          </ScrollReveal>
        )}

        {/* Key Design Decisions */}
        <ScrollReveal variant="fade-up">
          <section className="mb-16 flex flex-col gap-[50px]">
            <h2 className="font-manrope font-semibold text-2xl md:text-[40px] md:leading-[100%] uppercase text-[#1E1E1E]">
              {project.designDecisions.title}
            </h2>
            {project.designDecisions.blocks.map((block, i) =>
              block.type === "text" ? (
                <div key={i} className="flex flex-col gap-5">
                  {block.content.split("\n\n").map((p, j) => {
                    // First line of each decision = title
                    const isDecisionTitle = /^Decision \d/.test(p);
                    if (isDecisionTitle) {
                      return (
                        <h3 key={j} className="font-manrope font-bold text-xl md:text-2xl text-[#1E1E1E]">
                          {p}
                        </h3>
                      );
                    }
                    // Handle **bold** markers
                    const parts = p.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={j} className="font-manrope font-medium text-base md:text-lg leading-[27px] text-[#1E1E1E]/80">
                        {parts.map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k} className="font-bold text-[#1E1E1E]">{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div key={i} className={`grid grid-cols-1 ${block.keys.length === 3 ? 'md:grid-cols-3' : block.keys.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-5`}>
                  {block.keys.map((imgKey, j) => (
                    <div key={j} className="rounded-[10px] overflow-hidden">
                      <img
                        src={foundationImages[imgKey]}
                        alt={`Design decision ${i + 1} - ${j + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </section>
        </ScrollReveal>

        {/* Tools We Used */}
        <ScrollReveal variant="fade-up">
          <section className="mb-16">
            <div className="relative flex flex-col justify-center items-center p-[50px] bg-black rounded-[20px] overflow-hidden" style={{ minHeight: 940 }}>
              {/* Floating tool cards */}
              {(() => {
                const toolCards = [
                  { logo: webflowLogo, name: "Webflow", desc: "Web design & development" },
                  { logo: framerLogo, name: "Framer", desc: "Interactive prototyping" },
                  { logo: notionLogo, name: "Notion", desc: "Project management" },
                  { logo: n8nLogo, name: "n8n", desc: "Workflow automation" },
                  { logo: zapierLogo, name: "Zapier", desc: "App integrations" },
                  { logo: affinityLogo, name: "Affinity", desc: "Design suite" },
                ];
                const positions: React.CSSProperties[] = [
                  { top: "15%", left: "12%" },
                  { top: "12%", left: "42%" },
                  { top: "18%", right: "12%" },
                  { bottom: "22%", left: "16%" },
                  { bottom: "18%", right: "30%" },
                  { bottom: "24%", right: "12%" },
                ];
                const delays = [0, 0.15, 0.3, 0.1, 0.25, 0.4];
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

              {/* Center content */}
              <div className="relative z-10 flex flex-col items-start gap-2.5 max-w-[692px]">
                <div className="flex items-center gap-2.5">
                  <SmileySticker size={30} weight="fill" className="text-primary" />
                  <span className="font-satoshi text-xl text-white leading-[27px]">
                    Amazing Tools To Share With You
                  </span>
                </div>
                <h2 className="font-satoshi font-medium text-[60px] leading-[60px] text-white">
                  Tools I've Used
                </h2>
                <p className="font-satoshi text-xl text-white leading-[27px]">
                  I've tried and used a lot of tools (Like a lot), and I love sharing them with you.
                </p>
                <TooltipProvider>
                  <div className="flex items-start mt-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <AnimatedButton magnetic shine fillSweep className="px-5 h-[65px] text-xl rounded-[10px] cursor-default bg-neutral-700 text-white/70">
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
                          <AnimatedButton iconOnly magnetic className="w-16 h-[65px] rounded-[10px] cursor-default bg-neutral-700 text-white/70">
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

        {/* Project Video */}
        {(project.slug === "blockchaincert" || project.slug === "maswallet") && (
          <ScrollReveal variant="fade-up">
            <section className="mb-16">
              <div className="rounded-[10px] overflow-hidden">
                <video
                  src={project.slug === "maswallet" ? "/videos/maswallet-demo.mp4" : "/videos/blockchaincert-portfolio.mp4"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* The Results */}
        {project.results && (
          <ScrollReveal variant="fade-up">
            <section className="mb-16">
              <div className="flex flex-col md:flex-row items-start gap-[50px]">
                <h2 className="font-manrope font-semibold text-2xl md:text-[40px] md:leading-[100%] text-[#1E1E1E] flex-1">
                  The Results
                </h2>
                <div className="flex flex-col gap-[50px] flex-1">
                  <div className="flex flex-col gap-4">
                    <p className="font-manrope font-medium text-xl leading-[27px] text-[#1E1E1E]">
                      {project.results.description}
                    </p>
                    {project.results.metrics.map((m, i) => (
                      <p key={i} className="font-manrope font-medium text-xl leading-[27px] text-[#1E1E1E]">
                        <span className="font-bold">{m.label}:</span> {m.text}
                      </p>
                    ))}
                  </div>
                  {project.results.ctaLabel && (
                    <div className="flex items-start">
                      {project.results.ctaLabel.toLowerCase().includes("coming soon") ? (
                        <>
                          <AnimatedButton variant="primary" className="px-5 h-[65px] text-xl rounded-[10px] opacity-60 cursor-not-allowed">
                            {project.results.ctaLabel}
                          </AnimatedButton>
                          <AnimatedButton variant="primary" iconOnly className="w-16 h-[65px] rounded-[10px] opacity-60 cursor-not-allowed">
                            <ArrowRight size={24} weight="bold" />
                          </AnimatedButton>
                        </>
                      ) : (
                        <>
                          <a href={project.results.ctaLink || "#"} target="_blank" rel="noopener noreferrer">
                            <AnimatedButton variant="primary" magnetic shine fillSweep className="px-5 h-[65px] text-xl rounded-[10px]">
                              {project.results.ctaLabel}
                            </AnimatedButton>
                          </a>
                          <a href={project.results.ctaLink || "#"} target="_blank" rel="noopener noreferrer">
                            <AnimatedButton variant="primary" iconOnly magnetic className="w-16 h-[65px] rounded-[10px]">
                              <ArrowRight size={24} weight="bold" />
                            </AnimatedButton>
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Self-Reflection */}
        <ScrollReveal variant="fade-up">
          <section className="mb-20">
            <div className="flex flex-row justify-center items-center p-[50px] rounded-[20px] bg-[#222222]" style={{ minHeight: 600 }}>
              <div className="flex flex-col items-start gap-[30px] max-w-[692px]">
                <h2 className="font-satoshi font-medium text-[60px] leading-[60px] text-white">
                  Self-Reflection
                </h2>
                <p className="font-satoshi font-normal text-xl leading-[27px] text-white">
                  {project.reflection}
                </p>
                {project.reflectionQuote && (
                  <p className="font-satoshi font-bold text-2xl leading-8 text-white">
                    "{project.reflectionQuote}"
                  </p>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Community */}
        {/* View Other Project Cases */}
        {(() => {
          const others = projects.filter((p) => p.slug !== project.slug);
          if (others.length === 0) return null;
          return (
            <ScrollReveal variant="fade-up">
              <section className="mb-20">
                <div className="flex flex-col items-start gap-2.5 mb-8">
                  <h2 className="font-satoshi font-medium text-3xl md:text-5xl lg:text-[60px] lg:leading-[60px] text-[#1E1E1E]">
                    View Other Project Cases
                  </h2>
                  <p className="font-satoshi text-sm md:text-base lg:text-xl leading-[22px] md:leading-[27px] text-[#1E1E1E]/70 max-w-3xl">
                    Keep exploring, here are more case studies worth a look.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {others.map((p) => (
                    <ProjectCard key={p.slug} project={p} imageClassName="aspect-[4/5]" />
                  ))}
                </div>
              </section>
            </ScrollReveal>
          );
        })()}

        <ScrollReveal variant="fade-up">
          <CommunitySection />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
