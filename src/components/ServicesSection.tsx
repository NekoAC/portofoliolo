import { ArrowRight } from "lucide-react";
import { Palette, Layout, Globe, Atom } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import AnimatedButton from "@/components/AnimatedButton";

import webflowLogo from "@/assets/logos/webflow.svg";
import framerLogo from "@/assets/logos/framer.svg";
import zapierLogo from "@/assets/logos/zapier.svg";
import jitterLogo from "@/assets/logos/jitter.svg";
import n8nLogo from "@/assets/logos/n8n.svg";
import affinityLogo from "@/assets/logos/affinity.svg";
import notionLogo from "@/assets/logos/notion.svg";

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
    description:
      "We help define your product positioning, website structure, and user journey so every design and development decision has clear direction.",
    cta: "Let's Talk",
    colorClass: "bg-accent text-accent-foreground",
    iconColor: "text-accent",
  },
  {
    icon: Layout,
    title: "Website Design & Development",
    description:
      "We design and build modern websites that are fast, scalable, and easy to manage, ensuring your platform performs as your business grows.",
    cta: "Build Your Site Now",
    colorClass: "bg-secondary text-secondary-foreground",
    iconColor: "text-secondary",
  },
  {
    icon: Globe,
    title: "Product UI/UX Design",
    description:
      "We design clear, intuitive digital experiences that help users understand your product and take action with confidence.",
    cta: "Let's Build Something",
    colorClass: "bg-primary text-primary-foreground",
    iconColor: "text-primary",
  },
];

const ServicesSection = () => {
  return (
    <section className="flex flex-col items-start px-4 py-10 md:p-[50px] gap-8 md:gap-[54px]">
      {/* Tools Marquee */}
      <div className="w-full flex flex-col items-center gap-4 mb-2">
        <span className="text-muted-foreground text-sm md:text-base font-medium tracking-wide">
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
                  className="shrink-0 h-6 md:h-8 w-auto opacity-50 hover:opacity-75 transition-opacity px-4 md:px-7"
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Header Text */}
      <div className="flex flex-col items-start gap-[10px] max-w-[692px]">
        <div className="flex items-center gap-[10px]">
          <Atom size={32} weight="fill" className="text-secondary" />
          <span className="font-satoshi font-normal text-base md:text-[20px] leading-[27px] text-foreground">
            Full-service digital solutions
          </span>
        </div>

        <h2 className="font-satoshi font-medium text-3xl md:text-[48px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] text-foreground">
          Everything your product needs to{" "}
          <span className="text-white">grow online</span>
        </h2>

        <p className="font-satoshi font-normal text-sm md:text-[20px] leading-[22px] md:leading-[27px] text-foreground/70">
          From brand strategy to full-stack development, we handle every piece of
          your digital presence.
        </p>
      </div>

      {/* Feature Cards + CTA */}
      <div className="flex flex-col items-start gap-8 md:gap-[40px] w-full">
        {/* Cards - horizontal scroll on mobile, row on desktop */}
        <div className="flex gap-4 md:gap-[40px] w-full overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col items-start p-[10px] gap-[10px] min-w-[280px] md:min-w-0 md:flex-1 min-h-[223px] rounded-[10px] border border-white/[0.08] snap-start"
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
              <Link to="/contact" className={`${service.colorClass} font-satoshi font-bold text-[16px] leading-[22px] text-center px-5 py-3.5 rounded-[10px] mt-auto`}>
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/services" className="inline-flex items-stretch">
          <AnimatedButton variant="secondary" className="h-[50px] md:h-[65px] text-base md:text-[20px] leading-[27px]">
            Explore Services
          </AnimatedButton>
          <AnimatedButton variant="secondary" iconOnly className="w-[50px] h-[50px] md:w-[64px] md:h-[65px]">
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
          </AnimatedButton>
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
