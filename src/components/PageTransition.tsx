import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Personality-driven copy per route
const ROUTE_STORY: Record<string, { word: string; tagline: string }> = {
  "/": { word: "HOME.", tagline: "Welcome back — let's start from the top" },
  "/services": { word: "SERVICES.", tagline: "Let's talk about what I do" },
  "/projects": { word: "PROJECTS.", tagline: "A peek at what I've shipped" },
  "/about": { word: "ABOUT.", tagline: "The story behind the pixels" },
  "/contact": { word: "CONTACT.", tagline: "Let's build something together" },
};

const getStory = (pathname: string) => {
  if (ROUTE_STORY[pathname]) return ROUTE_STORY[pathname];
  if (pathname.startsWith("/projects/")) {
    return { word: "CASE STUDY.", tagline: "Stepping into the work" };
  }
  const slug = pathname.replace(/^\//, "").split("/")[0] || "page";
  return { word: `${slug.toUpperCase()}.`, tagline: "Hold tight — taking you there" };
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const slamRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(null);
  const [story, setStory] = useState(() => getStory(location.pathname));
  const isAnimating = useRef(false);
  const prevPathRef = useRef(location.pathname);

  // Pre-split word into letters and tagline into words for stagger animation
  const wordLetters = useMemo(() => Array.from(story.word), [story.word]);
  const taglineWords = useMemo(() => story.tagline.split(" "), [story.tagline]);

  const animate = useCallback(() => {
    if (!containerRef.current || !slamRef.current || isAnimating.current) return;
    isAnimating.current = true;

    const slam = slamRef.current;
    const word = wordRef.current;
    const tagline = taglineRef.current;
    const accent = accentRef.current;
    const container = containerRef.current;
    const oldPage = container.querySelector(".page-old") as HTMLElement;
    const newPage = container.querySelector(".page-new") as HTMLElement;

    if (!oldPage || !newPage || !word || !tagline || !accent) {
      isAnimating.current = false;
      setPrevChildren(null);
      return;
    }

    const letters = word.querySelectorAll(".slam-letter");
    const taglineWordEls = tagline.querySelectorAll(".slam-tagline-word");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        isAnimating.current = false;
        setPrevChildren(null);
        gsap.set(slam, { display: "none", clipPath: "none" });
      },
    });

    tl
      // ---- Reset states ----
      .set(slam, {
        display: "flex",
        xPercent: 0,
        opacity: 1,
        clipPath: "inset(0% 100% 0% 0%)",
      })
      .set(accent, { scaleY: 0, transformOrigin: "top center" })
      .set(letters, { yPercent: 110, opacity: 0, rotateX: -55, transformOrigin: "50% 100%" })
      .set(taglineWordEls, { yPercent: 100, opacity: 0 })
      .set(oldPage, { scale: 1, filter: "brightness(1) blur(0px)" })
      .set(newPage, { opacity: 0, scale: 1.04, filter: "blur(8px)" })

      // ---- ENTRANCE: panel wipes in from the left ----
      .to(oldPage, {
        scale: 0.92,
        filter: "brightness(0.25) blur(4px)",
        duration: 0.7,
        ease: "power2.inOut",
      }, 0)
      .to(slam, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.65,
        ease: "expo.out",
      }, 0)

      // Accent slash drops in
      .to(accent, {
        scaleY: 1,
        duration: 0.5,
        ease: "expo.out",
      }, 0.25)

      // Letters cascade up with overshoot
      .to(letters, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: 0.04,
      }, 0.35)

      // Tagline words rise in
      .to(taglineWordEls, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.05,
      }, 0.7)

      // ---- HOLD ----
      .to({}, { duration: 0.5 })

      // ---- EXIT: new page fades up underneath, then panel wipes out ----
      .to(newPage, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }, ">-0.1")
      .to([letters, taglineWordEls, accent], {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power2.in",
        stagger: 0.015,
      }, "<")
      .to(slam, {
        clipPath: "inset(0% 0% 0% 100%)",
        duration: 0.75,
        ease: "expo.inOut",
      }, "<0.1");
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
        style={{ display: "none", background: "hsl(var(--primary))", perspective: "1200px" }}
        aria-hidden="true"
      >
        {/* Accent vertical slash */}
        <div
          ref={accentRef}
          className="absolute left-0 top-0 h-full w-[6px] md:w-[10px] bg-primary-foreground/90"
          style={{ willChange: "transform" }}
        />

        <span
          ref={wordRef}
          className="font-chillax font-bold text-primary-foreground leading-[0.85] tracking-tight whitespace-nowrap block"
          style={{ fontSize: "clamp(72px, 18vw, 280px)" }}
        >
          {wordLetters.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="slam-letter inline-block align-top"
              style={{ willChange: "transform, opacity" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>

        <span
          ref={taglineRef}
          className="font-satoshi font-medium text-primary-foreground/90 mt-4 md:mt-6 flex flex-wrap overflow-hidden"
          style={{ fontSize: "clamp(14px, 1.6vw, 24px)" }}
        >
          {taglineWords.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="slam-tagline-word inline-block mr-[0.3em]"
              style={{ willChange: "transform, opacity" }}
            >
              {w}
            </span>
          ))}
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
                transformOrigin: "center center",
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
