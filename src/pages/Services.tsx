import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import CommunitySection from "@/components/CommunitySection";
import AnimatedButton from "@/components/AnimatedButton";
import {
  Palette,
  Layout,
  Atom,
  Sparkle,
  Handshake,
  ChartLineUp,
  Globe,
} from "@phosphor-icons/react";
import ProcessCarousel from "@/components/ProcessCarousel";

import webflowLogo from "@/assets/logos/webflow.svg";
import framerLogo from "@/assets/logos/framer.svg";
import zapierLogo from "@/assets/logos/zapier.svg";
import jitterLogo from "@/assets/logos/jitter.svg";
import n8nLogo from "@/assets/logos/n8n.svg";
import affinityLogo from "@/assets/logos/affinity.svg";
import notionLogo from "@/assets/logos/notion.svg";

const marqueeItems: MarqueeItemData[] = [
  { icon: <Palette size={30} weight="fill" />, before: "Branding", bold: "Design", after: "that resonates" },
  { icon: <Layout size={30} weight="fill" />, before: "Pixel-perfect", bold: "Interfaces", after: "for growth" },
  { icon: <Atom size={30} weight="fill" />, before: "Smart", bold: "Automation", after: "that scales" },
];

const toolLogos = [
  { name: "Webflow", src: webflowLogo },
  { name: "Framer", src: framerLogo },
  { name: "Zapier", src: zapierLogo },
  { name: "Notion", src: notionLogo },
  { name: "n8n", src: n8nLogo },
  { name: "Jitter", src: jitterLogo },
  { name: "Affinity", src: affinityLogo },
];

const services = [
  {
    icon: Palette,
    title: "Branding & Graphic Design",
    description: "We help define your product positioning, website structure, and user journey so every design and development decision has clear direction.",
    colorClass: "bg-accent text-accent-foreground",
    iconColor: "text-accent",
    cta: "Let's Talk",
  },
  {
    icon: Layout,
    title: "Website Design & Development",
    description: "We design and build modern websites that are fast, scalable, and easy to manage, ensuring your platform performs as your business grows.",
    colorClass: "bg-secondary text-secondary-foreground",
    iconColor: "text-secondary",
    cta: "Build Your Site Now",
  },
  {
    icon: Globe,
    title: "Product UI/UX Design",
    description: "We design clear, intuitive digital experiences that help users understand your product and take action with confidence.",
    colorClass: "bg-primary text-primary-foreground",
    iconColor: "text-primary",
    cta: "Let's Build Something",
  },
  {
    icon: Atom,
    title: "AI & Automation",
    description: "Implementing AI tools and automation workflows that help businesses work smarter and scale faster.",
    colorClass: "bg-accent text-accent-foreground",
    iconColor: "text-accent",
    cta: "Start Automating",
  },
  {
    icon: ChartLineUp,
    title: "SEO, CRO, AEO & Growth",
    description: "We optimise your digital presence to improve visibility, increase conversions, and drive sustainable growth through data and continuous iteration.",
    colorClass: "bg-secondary text-secondary-foreground",
    iconColor: "text-secondary",
    cta: "Talk to a Specialist",
  },
  {
    icon: Handshake,
    title: "Long-Term Relationship",
    description: "We partner with you beyond launch, providing ongoing support, improvements, and strategic guidance to help your product evolve over time.",
    colorClass: "bg-primary text-primary-foreground",
    iconColor: "text-primary",
    cta: "Let's Connect",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background font-satoshi">
      {/* Top Marquee */}
      <div className="border-b py-2 rounded-none border-transparent border-0 border-none my-0">
        <Marquee items={marqueeItems} />
      </div>

      <Navbar />

      <div className="flex flex-col items-center px-3 md:px-[50px] pt-2 gap-10 md:gap-[50px] max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <ScrollReveal variant="fade-up" duration={0.8}>
          <section className="flex flex-col items-center justify-center text-center gap-[10px] max-w-[900px] mx-auto py-12 md:py-20">
            <div className="flex items-center gap-[10px]">
              <Sparkle size={24} weight="fill" className="text-primary md:w-[30px] md:h-[30px]" />
              <span className="font-satoshi text-sm md:text-[20px] leading-[27px] text-foreground">
                Helping you transform your website
              </span>
            </div>

            <h1 className="font-satoshi font-medium text-[32px] leading-[36px] sm:text-[40px] sm:leading-[44px] md:text-[60px] md:leading-[64px] lg:text-[80px] lg:leading-[80px] text-foreground">
              Transform Your Brand
              <br />
              with a Better Website
            </h1>
          </section>
        </ScrollReveal>

        {/* Tools Marquee */}
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="w-full flex flex-col items-center gap-[30px]">
            <span className="text-foreground text-base md:text-[20px] leading-[27px] font-normal">
              Tools We've Mastered
            </span>
            <div className="w-full overflow-hidden">
              <div className="inline-flex items-center animate-marquee-slow">
                {[0, 1].map((pass) =>
                  toolLogos.map((tool, i) => (
                    <img
                      key={`${pass}-${i}`}
                      src={tool.src}
                      alt={tool.name}
                      className="shrink-0 h-6 md:h-8 w-auto opacity-60 hover:opacity-90 transition-opacity px-5 md:px-[27px]"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Service Cards Grid - 3x2 */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <section className="w-full flex flex-col gap-[22px]">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
              {services.slice(0, 3).map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col items-start p-[10px] gap-[10px] flex-1 min-h-[223px] rounded-[10px] border border-white/[0.08]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <service.icon size={30} weight="fill" className={service.iconColor} />
                  <h3 className="font-satoshi font-medium text-[20px] leading-[27px] text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-satoshi font-normal text-[16px] leading-[22px] text-foreground/70 self-stretch flex-1">
                    {service.description}
                  </p>
                  <Link to="/contact">
                    <AnimatedButton variant={service.colorClass.includes("accent") ? "accent" : service.colorClass.includes("secondary") ? "secondary" : "primary"} magnetic shine fillSweep className="px-5 py-3.5 text-[16px] rounded-[10px]">
                      {service.cta}
                    </AnimatedButton>
                  </Link>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
              {services.slice(3, 6).map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col items-start p-[10px] gap-[10px] flex-1 min-h-[223px] rounded-[10px] border border-white/[0.08]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    backdropFilter: "blur(2px)",
                    WebkitBackdropFilter: "blur(2px)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <service.icon size={30} weight="fill" className={service.iconColor} />
                  <h3 className="font-satoshi font-medium text-[20px] leading-[27px] text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-satoshi font-normal text-[16px] leading-[22px] text-foreground/70 self-stretch flex-1">
                    {service.description}
                  </p>
                  <Link to="/contact">
                    <AnimatedButton variant={service.colorClass.includes("accent") ? "accent" : service.colorClass.includes("secondary") ? "secondary" : "primary"} magnetic shine fillSweep className="px-5 py-3.5 text-[16px] rounded-[10px]">
                      {service.cta}
                    </AnimatedButton>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Video Section */}
        <ScrollReveal variant="fade-up" delay={0.1} className="w-full">
          <div
            className="w-full rounded-[10px] overflow-hidden relative border border-white/[0.08]"
            style={{
              height: "clamp(300px, 50vw, 650px)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/4NpUPggv3oU?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=4NpUPggv3oU&modestbranding=1&disablekb=1"
              className="absolute inset-0 w-full h-full"
              style={{ border: "none", pointerEvents: "none" }}
              allow="autoplay; encrypted-media"
              title="Services showcase video"
            />
          </div>
        </ScrollReveal>

        {/* Process Carousel */}
        <ScrollReveal variant="fade-up" delay={0.1} className="w-full">
          <ProcessCarousel />
        </ScrollReveal>

        {/* Community Section */}
        <ScrollReveal variant="fade-up" delay={0.1} className="w-full">
          <CommunitySection />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" delay={0.1} className="p-5">
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Services;
