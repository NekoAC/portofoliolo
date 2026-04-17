import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import avatarImg from "@/assets/avatar-character.png";


interface LanyardCardProps {
  onComplete: () => void;
}

const character = { avatar: avatarImg, role: "Product Designer", name: "Takafumi Kei", brand: "Zairie" };

const ANCHOR_X_PERCENT = 50;

const getCardWidth = () => window.innerWidth < 400 ? 240 : window.innerWidth < 768 ? 270 : 300;
const getCardHeightApprox = () => window.innerWidth < 400 ? 340 : window.innerWidth < 768 ? 380 : 420;

const LanyardCard = ({ onComplete }: LanyardCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const [char] = useState(character);
  const [showBubble, setShowBubble] = useState(false);
  const dismissed = useRef(false);

  // Card position state (top-center of card)
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    offsetX: 0,
    offsetY: 0,
    velX: 0,
    velY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const getAnchorX = useCallback(() => {
    return window.innerWidth * (ANCHOR_X_PERCENT / 100);
  }, []);

  const getRestY = useCallback(() => {
    return (window.innerHeight - getCardHeightApprox()) / 2;
  }, []);

  const updateVisuals = useCallback(() => {
    const card = cardRef.current;
    const line = lineRef.current;
    if (!card || !line) return;

    const anchorX = getAnchorX();
    const anchorY = 0;
    const cardTopCenterX = pos.current.x;
    const cardTopCenterY = pos.current.y;

    // Update SVG line from anchor to card top center
    line.setAttribute("x1", String(anchorX));
    line.setAttribute("y1", String(anchorY));
    line.setAttribute("x2", String(cardTopCenterX));
    line.setAttribute("y2", String(cardTopCenterY));

    // Position card (top-center anchor)
    card.style.transform = `translate(${cardTopCenterX - getCardWidth() / 2}px, ${cardTopCenterY}px)`;
  }, [getAnchorX]);

  // Initialize position and idle sway
  useEffect(() => {
    const anchorX = getAnchorX();
    pos.current = { x: anchorX, y: getRestY() };

    // Entrance animation
    const card = cardRef.current;
    if (!card) return;

    // Start from above
    pos.current.y = -500;
    updateVisuals();

    const obj = { y: -500 };
    gsap.to(obj, {
      y: getRestY(),
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2,
      onUpdate: () => {
        pos.current.y = obj.y;
        pos.current.x = getAnchorX();
        updateVisuals();
      },
      onComplete: () => {
        if (dismissed.current) return;
        startIdleSway();
      },
    });

    // Hint bounce
    const hint = hintRef.current;
    if (hint) {
      gsap.to(hint, { y: 8, repeat: -1, yoyo: true, duration: 1, ease: "sine.inOut" });
    }
  }, [getAnchorX, getRestY, updateVisuals]);

  const idleTween = useRef<gsap.core.Tween | null>(null);
  const springTween = useRef<gsap.core.Tween | null>(null);

  const startIdleSway = useCallback(() => {
    if (dismissed.current) return;
    const anchorX = getAnchorX();
    const swayObj = { offset: 0 };
    idleTween.current = gsap.to(swayObj, {
      offset: 12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        if (drag.current.active || dismissed.current) return;
        pos.current.x = anchorX + swayObj.offset;
        updateVisuals();
      },
    });
  }, [getAnchorX, updateVisuals]);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    if (idleTween.current) idleTween.current.kill();

    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    // Animate card shooting up and away
    const obj = { x: pos.current.x, y: pos.current.y };
    gsap.to(obj, {
      y: -window.innerHeight - 600,
      duration: 0.7,
      ease: "back.in(1.5)",
      onUpdate: () => {
        pos.current.x = obj.x;
        pos.current.y = obj.y;
        updateVisuals();
      },
    });

    gsap.to(container, {
      opacity: 0,
      duration: 0.4,
      delay: 0.4,
      onComplete: () => {
        setShow(false);
        onComplete();
      },
    });
  }, [onComplete, updateVisuals]);

  // Drag handlers
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const d = drag.current;

    const onDown = (e: PointerEvent) => {
      if (dismissed.current) return;
      e.preventDefault();
      d.active = true;
      if (idleTween.current) idleTween.current.kill();
      if (springTween.current) springTween.current.kill();
      setShowBubble(false);
      // offset from card top-center to pointer
      d.offsetX = e.clientX - pos.current.x;
      d.offsetY = e.clientY - pos.current.y;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.lastTime = Date.now();
      d.velX = 0;
      d.velY = 0;

      card.setPointerCapture(e.pointerId);
      card.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (!d.active || dismissed.current) return;

      const newX = e.clientX - d.offsetX;
      const newY = e.clientY - d.offsetY;

      // Track velocity
      const now = Date.now();
      const dt = now - d.lastTime;
      if (dt > 0) {
        d.velX = (e.clientX - d.lastX) / dt;
        d.velY = (e.clientY - d.lastY) / dt;
      }
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.lastTime = now;

      pos.current.x = newX;
      pos.current.y = newY;
      updateVisuals();
    };

    const onUp = () => {
      if (!d.active || dismissed.current) return;
      d.active = false;
      card.style.cursor = "grab";

      // Dismiss if dragged down enough
      if (pos.current.y > getRestY() + 150 || d.velY > 0.6) {
        dismiss();
        return;
      }

      // Spring back to rest position
      const anchorX = getAnchorX();
      const obj = { x: pos.current.x, y: pos.current.y };
      springTween.current = gsap.to(obj, {
        x: anchorX,
        y: getRestY(),
        duration: 1.6,
        ease: "elastic.out(1, 0.28)",
        onUpdate: () => {
          pos.current.x = obj.x;
          pos.current.y = obj.y;
          updateVisuals();
        },
        onComplete: () => {
          springTween.current = null;
          if (!dismissed.current) startIdleSway();
        },
      });
    };

    card.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      card.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dismiss, getAnchorX, getRestY, updateVisuals, startIdleSway]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)", touchAction: "none" }}
    >
      {/* SVG layer for the lanyard line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(341, 100%, 56%)" />
            <stop offset="100%" stopColor="hsl(341, 100%, 40%)" />
          </linearGradient>
        </defs>
        <line
          ref={lineRef}
          stroke="url(#strapGrad)"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>

      {/* Card element */}
      <div
        ref={cardRef}
        className="absolute top-0 left-0 cursor-grab select-none"
        style={{ width: getCardWidth(), zIndex: 2, willChange: "transform" }}
      >
        {/* Metal clip */}
        <div className="flex flex-col items-center mx-auto" style={{ width: 20 }}>
          <div
            className="w-5 h-6 rounded-b-md"
            style={{
              background: "linear-gradient(180deg, #aaa 0%, #666 100%)",
              border: "1px solid #888",
            }}
          />
          <div
            className="w-3 h-3 rounded-full -mt-0.5"
            style={{
              background: "linear-gradient(180deg, #999 0%, #444 100%)",
              border: "1.5px solid #777",
            }}
          />
        </div>

        {/* Card body */}
        <div className="mt-1 relative">
          {/* Shadow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(0,0,0,0.6)",
              filter: "blur(35px)",
              transform: "translateY(20px) scale(0.93)",
            }}
          />
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, hsl(0 0% 16%) 0%, hsl(0 0% 11%) 100%)",
              boxShadow:
                "0 30px 70px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 sm:pb-3">
              <span className="font-chillax font-bold text-lg sm:text-xl text-foreground tracking-wide">
                ZAIRIE
              </span>
              <svg width="24" height="24" className="sm:w-[30px] sm:h-[30px]" viewBox="0 0 50 55" fill="none">
                <path
                  d="M22.3955 2.68973C28.0446 1.99684 33.763 3.21353 38.6404 6.14635C43.5181 9.0792 47.2741 13.5597 49.3112 18.8741C51.348 24.1886 51.5482 30.0317 49.8803 35.4731C49.7863 35.7799 49.6184 36.059 49.3917 36.286L33.7896 51.8903C33.5628 52.1171 33.2837 52.2852 32.9769 52.3792C27.5358 54.0479 21.6924 53.8486 16.3777 51.8125C11.0629 49.7767 6.58209 46.0209 3.64849 41.144C0.714908 36.2668 -0.502784 30.5486 0.18925 24.8993C0.881309 19.2502 3.44319 13.9948 7.46725 9.97013C11.4913 5.94542 16.7464 3.38265 22.3955 2.68973ZM36.2755 32.1652C35.337 31.6223 34.1359 31.9429 33.593 32.8816C31.8529 35.8901 29.0341 37.7914 25.4752 37.7914C21.9165 37.7914 19.0977 35.8899 17.3577 32.8816C16.8148 31.9429 15.6137 31.6223 14.675 32.1652C13.7364 32.7081 13.4157 33.9092 13.9586 34.8478C16.2927 38.8831 20.3116 41.7183 25.4752 41.7183C30.639 41.7183 34.6579 38.8831 36.9919 34.8478C37.5348 33.9092 37.214 32.7081 36.2755 32.1652ZM16.6399 20.1207C15.0133 20.1207 13.6947 21.4393 13.6947 23.0657C13.6948 24.6924 15.0134 26.0109 16.6399 26.0109C18.2664 26.0109 19.5849 24.6924 19.5849 23.0657C19.5849 21.4393 18.2664 20.1207 16.6399 20.1207ZM34.3106 20.1207C32.6841 20.1207 31.3655 21.4393 31.3655 23.0657C31.3657 24.6924 32.6841 26.0109 34.3106 26.0109C35.9373 26.0109 37.2557 24.6924 37.2557 23.0657C37.2557 21.4393 35.9373 20.1207 34.3106 20.1207Z"
                  fill="hsl(341, 100%, 56%)"
                />
              </svg>
            </div>

            {/* Avatar */}
            <div className="px-3 sm:px-5 pb-2">
              <div
                className="w-full aspect-[4/3] rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, hsl(0 0% 20%) 0%, hsl(0 0% 14%) 100%)",
                }}
              >
                <img
                  src={char.avatar}
                  alt={`${char.name} Avatar`}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </div>
            </div>

            {/* Info */}
            <div className="px-4 sm:px-6 pb-1 sm:pb-2 pt-1 sm:pt-2">
              <h2 className="font-chillax font-bold text-lg sm:text-xl text-foreground">{char.role}</h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{char.name}</p>
            </div>
            <div className="px-4 sm:px-6 pb-3 sm:pb-4">
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                I Design and Develop an amazing website or product for you.
              </p>
            </div>
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 flex justify-end">
              <span className="font-chillax font-semibold text-xs sm:text-sm text-foreground">Agenzy.studio</span>
            </div>
        </div>

        </div>
      </div>

      {/* Drag hint */}
      <div
        ref={hintRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        style={{ zIndex: 3 }}
      >
        <span className="text-sm font-satoshi">Drag the Card Down</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5" />
          <path d="M7 7l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
};

export default LanyardCard;
