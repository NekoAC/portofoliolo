import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Personality-driven copy per route
const ROUTE_STORY: Record<string, { word: string; tagline: string }> = {
  "/": { word: "HOME.", tagline: "Welcome back — let's start from the top →" },
  "/services": { word: "SERVICES.", tagline: "Let's talk about what I do →" },
  "/projects": { word: "PROJECTS.", tagline: "A peek at what I've shipped →" },
  "/about": { word: "ABOUT.", tagline: "The story behind the pixels →" },
  "/contact": { word: "CONTACT.", tagline: "Let's build something together →" },
};

const getStory = (pathname: string) => {
  if (ROUTE_STORY[pathname]) return ROUTE_STORY[pathname];
  // Fallback for case study / dynamic routes
  if (pathname.startsWith("/projects/")) {
    return { word: "CASE STUDY.", tagline: "Stepping into the work →" };
  }
  const slug = pathname.replace(/^\//, "").split("/")[0] || "page";
  return { word: `${slug.toUpperCase()}.`, tagline: "Hold tight — taking you there →" };
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const slamRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(null);
  const [story, setStory] = useState(() => getStory(location.pathname));
  const isAnimating = useRef(false);
  const prevPathRef = useRef(location.pathname);

  const animate = useCallback(() => {
    if (!containerRef.current || !slamRef.current || isAnimating.current) return;
    isAnimating.current = true;

    const slam = slamRef.current;
    const word = wordRef.current;
    const tagline = taglineRef.current;
    const container = containerRef.current;
    const oldPage = container.querySelector(".page-old") as HTMLElement;
    const newPage = container.querySelector(".page-new") as HTMLElement;

    if (!oldPage || !newPage || !word || !tagline) {
      isAnimating.current = false;
      setPrevChildren(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setPrevChildren(null);
        gsap.set(slam, { display: "none" });
      },
    });

    tl
      // Reset
      .set(slam, { display: "flex", xPercent: 0, opacity: 1 })
      .set(word, { xPercent: -120, opacity: 0, skewX: -8 })
      .set(tagline, { xPercent: -120, opacity: 0 })
      .set(oldPage, { scale: 1, filter: "brightness(1)" })
      .set(newPage, { opacity: 0 })

      // Old page recedes
      .to(oldPage, {
        scale: 0.94,
        filter: "brightness(0.35)",
        duration: 0.6,
        ease: "power2.in",
      }, 0)

      // SLAM in from the left
      .to(word, {
        xPercent: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.55,
        ease: "expo.out",
      }, 0.1)
      .to(tagline, {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "expo.out",
      }, 0.25)

      // Hold for the story to land
      .to({}, { duration: 0.55 })

      // Bring the new page in underneath, then slam panel off to the right
      .set(newPage, { opacity: 1 }, ">")
      .to(slam, {
        xPercent: 110,
        duration: 0.7,
        ease: "expo.inOut",
      }, ">-0.1");
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setStory(getStory(location.pathname));
      setPrevChildren(displayChildren);
      setDisplayChildren(children);
      prevPathRef.current = location.pathname;
      window.scrollTo(0, 0);
    }
  }, [location.pathname, children, displayChildren]);

  useEffect(() => {
    if (prevChildren) {
      requestAnimationFrame(() => animate());
    }
  }, [prevChildren, animate]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: "100vh" }}>
      {/* Word Slam overlay */}
      <div
        ref={slamRef}
        className="fixed inset-0 z-[120] pointer-events-none flex flex-col justify-center items-start overflow-hidden px-6 md:px-12 lg:px-20"
        style={{ display: "none", background: "hsl(var(--primary))" }}
        aria-hidden="true"
      >
        <span
          ref={wordRef}
          className="font-chillax font-bold text-primary-foreground leading-[0.85] tracking-tight whitespace-nowrap"
          style={{ fontSize: "clamp(72px, 18vw, 280px)", willChange: "transform, opacity" }}
        >
          {story.word}
        </span>
        <span
          ref={taglineRef}
          className="font-satoshi font-medium text-primary-foreground/90 mt-4 md:mt-6"
          style={{ fontSize: "clamp(14px, 1.6vw, 24px)", willChange: "transform, opacity" }}
        >
          {story.tagline}
        </span>
      </div>

      {/* Old page (exiting) */}
      {prevChildren && (
        <div
          className="page-old fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "hsl(var(--background))", transformOrigin: "center center" }}
        >
          {prevChildren}
        </div>
      )}

      {/* New page (entering) */}
      <div
        className="page-new relative z-[110]"
        style={
          prevChildren
            ? {
                position: "fixed",
                inset: 0,
                overflow: "hidden",
                background: "hsl(var(--background))",
              }
            : {}
        }
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;
