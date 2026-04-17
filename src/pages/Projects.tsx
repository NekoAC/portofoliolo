import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CommunitySection from "@/components/CommunitySection";
import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import { SuitcaseSimple, Hammer, RocketLaunch, FastForward, CassetteTape, Coffee } from "@phosphor-icons/react";
import { projects } from "@/data/projects";

const marqueeItems: MarqueeItemData[] = [
  { icon: <Hammer size={30} weight="fill" />, before: "Now", bold: "designing", after: "a scalable fintech dashboard" },
  { before: "", bold: "Launching", after: "a conversion-focused product website", icon: <RocketLaunch size={30} weight="fill" /> },
  { before: "", bold: "Building", after: "an automated workflow system", icon: <FastForward size={30} weight="fill" /> },
  { before: "", bold: "Crafting", after: "a zero-code SaaS platform", icon: <CassetteTape size={30} weight="fill" /> },
  { before: "", bold: "Brewing", after: "fresh ideas over coffee", icon: <Coffee size={30} weight="fill" /> },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Marquee */}
      <div className="py-2">
        <Marquee items={marqueeItems} />
      </div>

      <Navbar />

      <main className="max-w-[1300px] mx-auto px-3 md:px-6 pt-10 pb-20">
        <ScrollReveal variant="fade-up" className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <SmileySticker size={24} weight="fill" className="text-primary" />
            <span className="font-satoshi text-sm text-muted-foreground">Check Out Our Stuffffffss, Please</span>
          </div>
          <h1 className="font-satoshi font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
            Project & Use Case
          </h1>
          <p className="font-satoshi text-sm md:text-lg text-muted-foreground max-w-[600px] mt-4">
            A curated selection of my work. There's more in the archive, but these are the projects with proper documentation worth sharing.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-20">
          <ScrollReveal variant="fade-up" delay={0.1} className="w-full">
            <CommunitySection />
          </ScrollReveal>
        </div>
      </main>

      <div className="px-3 md:px-5">
        <Footer />
      </div>
    </div>
  );
};

export default Projects;
