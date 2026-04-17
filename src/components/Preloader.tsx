import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!overlayRef.current || !lettersRef.current || !smileyRef.current) return;

    const letters = lettersRef.current.querySelectorAll(".preload-letter");
    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        onComplete();
      },
    });

    // Initial state
    gsap.set(letters, { y: 60, opacity: 0 });
    gsap.set(smileyRef.current, { scale: 0, rotation: -45, opacity: 0 });

    // Smiley enters
    tl.to(smileyRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.2,
    });

    // Letters cascade in
    tl.to(
      letters,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power4.out",
      },
      "-=0.2"
    );

    // Hold
    tl.to({}, { duration: 0.6 });

    // Letters cascade out upward
    tl.to(letters, {
      y: -60,
      opacity: 0,
      duration: 0.3,
      stagger: 0.03,
      ease: "power3.in",
    });

    // Smiley exits
    tl.to(
      smileyRef.current,
      {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      },
      "-=0.2"
    );

    // Overlay slides up
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power4.inOut",
    });
  }, [onComplete]);

  if (!show) return null;

  const logoLetters = "AGENZY".split("");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #282828 0%, #000000 100%)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Smiley icon */}
        <div ref={smileyRef}>
          <svg width="56" height="56" viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.3955 2.68973C28.0446 1.99684 33.763 3.21353 38.6404 6.14635C43.5181 9.0792 47.2741 13.5597 49.3112 18.8741C51.348 24.1886 51.5482 30.0317 49.8803 35.4731C49.7863 35.7799 49.6184 36.059 49.3917 36.286L33.7896 51.8903C33.5628 52.1171 33.2837 52.2852 32.9769 52.3792C27.5358 54.0479 21.6924 53.8486 16.3777 51.8125C11.0629 49.7767 6.58209 46.0209 3.64849 41.144C0.714908 36.2668 -0.502784 30.5486 0.18925 24.8993C0.881309 19.2502 3.44319 13.9948 7.46725 9.97013C11.4913 5.94542 16.7464 3.38265 22.3955 2.68973ZM36.2755 32.1652C35.337 31.6223 34.1359 31.9429 33.593 32.8816C31.8529 35.8901 29.0341 37.7914 25.4752 37.7914C21.9165 37.7914 19.0977 35.8899 17.3577 32.8816C16.8148 31.9429 15.6137 31.6223 14.675 32.1652C13.7364 32.7081 13.4157 33.9092 13.9586 34.8478C16.2927 38.8831 20.3116 41.7183 25.4752 41.7183C30.639 41.7183 34.6579 38.8831 36.9919 34.8478C37.5348 33.9092 37.214 32.7081 36.2755 32.1652ZM16.6399 20.1207C15.0133 20.1207 13.6947 21.4393 13.6947 23.0657C13.6948 24.6924 15.0134 26.0109 16.6399 26.0109C18.2664 26.0109 19.5849 24.6924 19.5849 23.0657C19.5849 21.4393 18.2664 20.1207 16.6399 20.1207ZM34.3106 20.1207C32.6841 20.1207 31.3655 21.4393 31.3655 23.0657C31.3657 24.6924 32.6841 26.0109 34.3106 26.0109C35.9373 26.0109 37.2557 24.6924 37.2557 23.0657C37.2557 21.4393 35.9373 20.1207 34.3106 20.1207Z" fill="#FF206E"/>
          </svg>
        </div>

        {/* Letters */}
        <div ref={lettersRef} className="flex overflow-hidden">
          {logoLetters.map((letter, i) => (
            <span
              key={i}
              className="preload-letter font-chillax font-bold text-[72px] leading-none text-foreground inline-block"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
