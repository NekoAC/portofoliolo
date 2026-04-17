import { projects } from "@/data/projects";
import { Briefcase, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState, useRef, useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";

const HowWeHelp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setCurrentIndex(clamped);
    if (trackRef.current) {
      const card = trackRef.current.children[clamped] as HTMLElement;
      if (card) {
        trackRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section
      className="overflow-hidden rounded-[10px] px-4 py-10 md:px-6 md:py-[50px] lg:px-10"
      style={{
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, #000000 99.99%)",
      }}
    >
      <div className="flex flex-col gap-8 md:gap-[37px] w-full">
        {/* Header */}
        <div className="flex flex-col items-start gap-2.5">
          <div className="flex items-center gap-2.5">
            <Briefcase size={30} weight="fill" className="text-primary" />
            <span className="font-satoshi text-base md:text-xl text-foreground">
              Projects
            </span>
          </div>

          <h2 className="font-satoshi font-medium text-3xl md:text-5xl lg:text-[60px] lg:leading-[60px] text-foreground">
            Selected work and case studies
          </h2>

          <p className="font-satoshi text-sm md:text-base lg:text-xl leading-[22px] md:leading-[27px] text-foreground/80 max-w-5xl">
            Real projects, real outcomes. Here's a look at the work I've done across product design, branding, and development.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 md:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                className="w-[220px] min-w-[220px] md:w-auto md:min-w-[340px] lg:min-w-[420px] lg:max-w-[420px] flex-shrink-0 snap-start"
                imageClassName="aspect-[4/5] md:aspect-[411/500]"
              />
            ))}
          </div>

          {/* Navigation - hidden while only one project exists */}
          {projects.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scrollToIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity hover:bg-muted/80"
              >
                <CaretLeft size={20} weight="bold" />
              </button>

              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollToIndex(currentIndex + 1)}
                disabled={currentIndex === projects.length - 1}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-30 transition-opacity hover:bg-muted/80"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;
