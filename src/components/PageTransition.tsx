import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(null);
  const isAnimating = useRef(false);
  const prevPathRef = useRef(location.pathname);

  const animate = useCallback(() => {
    if (!containerRef.current || !overlayRef.current || isAnimating.current) return;
    isAnimating.current = true;

    const container = containerRef.current;
    const overlay = overlayRef.current;
    const oldPage = container.querySelector(".page-old") as HTMLElement;
    const newPage = container.querySelector(".page-new") as HTMLElement;

    if (!oldPage || !newPage) {
      isAnimating.current = false;
      setPrevChildren(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setPrevChildren(null);
      },
    });

    // Clip-path circle reveal from center
    // Start with 0% circle, expand to cover full viewport
    // Diagonal of viewport ≈ 150% to ensure full coverage
    tl.set(overlay, { display: "block", opacity: 1 })
      .set(newPage, { opacity: 1, clipPath: "circle(0% at 50% 50%)" })
      .set(oldPage, { scale: 1, filter: "brightness(1)" })

      // Old page subtly darkens and scales down
      .to(oldPage, {
        scale: 0.95,
        filter: "brightness(0.5)",
        duration: 1.2,
        ease: "power2.inOut",
      }, 0)

      // New page clip-path expands from center circle
      .to(newPage, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.4,
        ease: "power3.inOut",
      }, 0.15)

      // Hide overlay
      .set(overlay, { display: "none" }, 1.6)
      // Reset new page clip
      .set(newPage, { clipPath: "none" }, 1.6);
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setPrevChildren(displayChildren);
      setDisplayChildren(children);
      prevPathRef.current = location.pathname;
      window.scrollTo(0, 0);
    }
  }, [location.pathname, children]);

  useEffect(() => {
    if (prevChildren) {
      requestAnimationFrame(() => animate());
    }
  }, [prevChildren, animate]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: "100vh" }}>
      {/* Dark overlay for depth */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[95] pointer-events-none"
        style={{ display: "none", background: "hsl(0 0% 6%)" }}
      />

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
