import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CommunitySection from "@/components/CommunitySection";
import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import { SmileySticker, Hammer, RocketLaunch, FastForward, CassetteTape, Coffee } from "@phosphor-icons/react";
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
            AGENZ helps ambitious teams design, launch, and scale digital experiences by combining strategy, UX, and automation into one growth ready system.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <Link
                to={`/projects/${project.slug}`}
                key={index}
                className="flex flex-col items-start p-2.5 gap-2.5 rounded-[10px] cursor-none group transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden"
                style={{
                  background: "hsl(var(--muted))",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const cursor = card.querySelector('.view-case-cursor') as HTMLElement;
                  if (cursor) {
                    const rect = card.getBoundingClientRect();
                    // Magnetic snap: start at card center, then animate toward mouse
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    cursor.style.transition = 'none';
                    cursor.style.left = `${centerX}px`;
                    cursor.style.top = `${centerY}px`;
                    cursor.dataset.currentX = String(centerX);
                    cursor.dataset.currentY = String(centerY);
                    cursor.dataset.targetX = String(mouseX);
                    cursor.dataset.targetY = String(mouseY);
                    // Kick off the lerp loop immediately
                    if (!cursor.dataset.animating) {
                      cursor.dataset.animating = 'true';
                      const animate = () => {
                        const currentX = parseFloat(cursor.dataset.currentX || '0');
                        const currentY = parseFloat(cursor.dataset.currentY || '0');
                        const targetX = parseFloat(cursor.dataset.targetX || '0');
                        const targetY = parseFloat(cursor.dataset.targetY || '0');
                        const newX = currentX + (targetX - currentX) * 0.12;
                        const newY = currentY + (targetY - currentY) * 0.12;
                        cursor.dataset.currentX = String(newX);
                        cursor.dataset.currentY = String(newY);
                        cursor.style.left = `${newX}px`;
                        cursor.style.top = `${newY}px`;
                        if (Math.abs(targetX - newX) > 0.5 || Math.abs(targetY - newY) > 0.5) {
                          requestAnimationFrame(animate);
                        } else {
                          delete cursor.dataset.animating;
                        }
                      };
                      requestAnimationFrame(animate);
                    }
                  }
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const cursor = card.querySelector('.view-case-cursor') as HTMLElement;
                  if (cursor) {
                    const rect = card.getBoundingClientRect();
                    cursor.dataset.targetX = String(e.clientX - rect.left);
                    cursor.dataset.targetY = String(e.clientY - rect.top);
                    
                    if (!cursor.dataset.animating) {
                      cursor.dataset.animating = 'true';
                      const animate = () => {
                        const currentX = parseFloat(cursor.dataset.currentX || '0');
                        const currentY = parseFloat(cursor.dataset.currentY || '0');
                        const targetX = parseFloat(cursor.dataset.targetX || '0');
                        const targetY = parseFloat(cursor.dataset.targetY || '0');
                        const newX = currentX + (targetX - currentX) * 0.12;
                        const newY = currentY + (targetY - currentY) * 0.12;
                        cursor.dataset.currentX = String(newX);
                        cursor.dataset.currentY = String(newY);
                        cursor.style.left = `${newX}px`;
                        cursor.style.top = `${newY}px`;
                        if (Math.abs(targetX - newX) > 0.5 || Math.abs(targetY - newY) > 0.5) {
                          requestAnimationFrame(animate);
                        } else {
                          delete cursor.dataset.animating;
                        }
                      };
                      requestAnimationFrame(animate);
                    }
                  }
                }}
              >
                {/* Custom "View Case" cursor — magnetic snap + lerp */}
                <div
                  className="view-case-cursor pointer-events-none absolute z-20 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "50%", top: "50%" }}
                >
                  <div
                    className="flex flex-col justify-center items-center rounded-full font-satoshi font-medium text-xl text-white text-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "rgba(51, 51, 51, 0.7)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    View Case
                  </div>
                </div>

                {/* Project Image with hover overlay */}
                <div
                  className="w-full rounded-lg bg-cover bg-center flex-none relative overflow-hidden h-[360px] sm:h-[440px] md:h-[500px]"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: "hsl(var(--background))",
                  }}
                >
                  {/* Hover tools overlay — slide-up + fade */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                    <div
                      className="flex flex-col items-start p-4 gap-2.5 rounded-[10px]"
                      style={{ background: "rgba(51, 51, 51, 0.8)" }}
                    >
                      <span className="font-satoshi font-bold text-sm leading-[19px] text-white">
                        Used Tools
                      </span>
                      <div className="flex flex-row flex-wrap gap-0.5">
                        {project.tools.map((tool, toolIndex) => (
                          <span
                            key={tool}
                            className="font-satoshi text-xs leading-4 text-white px-2 py-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                            style={{
                              background: "#000000",
                              transitionDelay: `${150 + toolIndex * 75}ms`,
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Title & Description */}
                <div className="w-full flex flex-col gap-1.5 p-1">
                  <h3 className="font-satoshi font-bold text-xl leading-[27px] text-foreground">
                    {project.title}
                  </h3>
                  <p className="font-satoshi text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
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
