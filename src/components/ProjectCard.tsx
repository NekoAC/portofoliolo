import { Link } from "react-router-dom";
import type { ProjectData } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectData;
  /** Optional className applied to the root <Link> for layout/sizing overrides (width, height, snap, etc.). */
  className?: string;
  /** Optional class for the image container so callers can adjust height per layout. */
  imageClassName?: string;
}

const startLerp = (cursor: HTMLElement) => {
  if (cursor.dataset.animating) return;
  cursor.dataset.animating = "true";
  const tick = () => {
    const cx = parseFloat(cursor.dataset.currentX || "0");
    const cy = parseFloat(cursor.dataset.currentY || "0");
    const tx = parseFloat(cursor.dataset.targetX || "0");
    const ty = parseFloat(cursor.dataset.targetY || "0");
    const nx = cx + (tx - cx) * 0.12;
    const ny = cy + (ty - cy) * 0.12;
    cursor.dataset.currentX = String(nx);
    cursor.dataset.currentY = String(ny);
    cursor.style.left = `${nx}px`;
    cursor.style.top = `${ny}px`;
    if (Math.abs(tx - nx) > 0.5 || Math.abs(ty - ny) > 0.5) {
      requestAnimationFrame(tick);
    } else {
      delete cursor.dataset.animating;
    }
  };
  requestAnimationFrame(tick);
};

const ProjectCard = ({
  project,
  className = "",
  imageClassName = "h-[360px] sm:h-[440px] md:h-[500px]",
}: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`flex flex-col items-start p-2.5 gap-2.5 rounded-[10px] cursor-none group transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden ${className}`}
      style={{
        background: "hsl(var(--muted))",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const cursor = card.querySelector(".view-case-cursor") as HTMLElement | null;
        if (!cursor) return;
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        cursor.style.transition = "none";
        cursor.style.left = `${centerX}px`;
        cursor.style.top = `${centerY}px`;
        cursor.dataset.currentX = String(centerX);
        cursor.dataset.currentY = String(centerY);
        cursor.dataset.targetX = String(e.clientX - rect.left);
        cursor.dataset.targetY = String(e.clientY - rect.top);
        startLerp(cursor);
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const cursor = card.querySelector(".view-case-cursor") as HTMLElement | null;
        if (!cursor) return;
        const rect = card.getBoundingClientRect();
        cursor.dataset.targetX = String(e.clientX - rect.left);
        cursor.dataset.targetY = String(e.clientY - rect.top);
        startLerp(cursor);
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

      {/* Project Image with hover tools overlay */}
      <div
        className={`w-full rounded-lg bg-cover bg-center flex-none relative overflow-hidden ${imageClassName}`}
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundColor: "hsl(var(--background))",
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
          <div
            className="flex flex-col items-start p-4 gap-2.5 rounded-[10px]"
            style={{ background: "rgba(51, 51, 51, 0.8)" }}
          >
            <span className="font-satoshi font-bold text-sm leading-[19px] text-white">
              Skills & Tools
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

      {/* Title & Description */}
      <div className="w-full flex flex-col gap-1.5 p-1">
        <h3 className="font-satoshi font-bold text-base md:text-xl leading-snug md:leading-[27px] text-foreground">
          {project.title}
        </h3>
        <p className="font-satoshi text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
