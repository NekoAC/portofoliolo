import React, { useRef, useCallback } from "react";
import gsap from "gsap";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "inverse";
  magnetic?: boolean;
  shine?: boolean;
  fillSweep?: boolean;
  iconOnly?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  inverse: "bg-primary-foreground text-primary",
};

const AnimatedButton = ({
  children,
  variant = "primary",
  magnetic = true,
  shine = true,
  fillSweep = true,
  iconOnly = false,
  className = "",
  ...props
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Spring scale
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });

    // Icon wiggle/shake for iconOnly buttons
    if (iconOnly) {
      const icon = btn.querySelector(".icon-content");
      if (icon) {
        gsap.fromTo(
          icon,
          { rotation: 0 },
          {
            rotation: 12,
            duration: 0.08,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut",
            onComplete: () => gsap.set(icon, { rotation: 0 }),
          }
        );
      }
    }

    // Shine sweep
    if (shine && shineRef.current) {
      gsap.fromTo(
        shineRef.current,
        { x: "-100%", opacity: 0.6 },
        { x: "200%", opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // Fill sweep
    if (fillSweep && fillRef.current) {
      gsap.to(fillRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [shine, fillSweep, iconOnly]);

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    // Reset scale
    gsap.to(btn, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });

    // Reset fill
    if (fillSweep && fillRef.current) {
      gsap.to(fillRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [fillSweep]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;

      const btn = buttonRef.current;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [magnetic]
  );

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-[10px] font-satoshi font-bold transition-shadow duration-300 hover:shadow-lg ${variantClasses[variant]} ${
        iconOnly ? "" : "px-5"
      } ${className}`}
      style={{ willChange: "transform" }}
      {...props}
    >
      {/* Fill sweep overlay */}
      {fillSweep && (
        <span
          ref={fillRef}
          className="absolute inset-0 origin-left pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
            transform: "scaleX(0)",
          }}
        />
      )}

      {/* Shine sweep */}
      {shine && (
        <span
          ref={shineRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
            transform: "translateX(-100%)",
          }}
        />
      )}

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 ${iconOnly ? "icon-content" : ""}`}>
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
