import { Hammer, List, X } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedButton from "@/components/AnimatedButton";
import gsap from "gsap";

const SmileyIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.3955 2.68973C28.0446 1.99684 33.763 3.21353 38.6404 6.14635C43.5181 9.0792 47.2741 13.5597 49.3112 18.8741C51.348 24.1886 51.5482 30.0317 49.8803 35.4731C49.7863 35.7799 49.6184 36.059 49.3917 36.286L33.7896 51.8903C33.5628 52.1171 33.2837 52.2852 32.9769 52.3792C27.5358 54.0479 21.6924 53.8486 16.3777 51.8125C11.0629 49.7767 6.58209 46.0209 3.64849 41.144C0.714908 36.2668 -0.502784 30.5486 0.18925 24.8993C0.881309 19.2502 3.44319 13.9948 7.46725 9.97013C11.4913 5.94542 16.7464 3.38265 22.3955 2.68973ZM36.2755 32.1652C35.337 31.6223 34.1359 31.9429 33.593 32.8816C31.8529 35.8901 29.0341 37.7914 25.4752 37.7914C21.9165 37.7914 19.0977 35.8899 17.3577 32.8816C16.8148 31.9429 15.6137 31.6223 14.675 32.1652C13.7364 32.7081 13.4157 33.9092 13.9586 34.8478C16.2927 38.8831 20.3116 41.7183 25.4752 41.7183C30.639 41.7183 34.6579 38.8831 36.9919 34.8478C37.5348 33.9092 37.214 32.7081 36.2755 32.1652ZM16.6399 20.1207C15.0133 20.1207 13.6947 21.4393 13.6947 23.0657C13.6948 24.6924 15.0134 26.0109 16.6399 26.0109C18.2664 26.0109 19.5849 24.6924 19.5849 23.0657C19.5849 21.4393 18.2664 20.1207 16.6399 20.1207ZM34.3106 20.1207C32.6841 20.1207 31.3655 21.4393 31.3655 23.0657C31.3657 24.6924 32.6841 26.0109 34.3106 26.0109C35.9373 26.0109 37.2557 24.6924 37.2557 23.0657C37.2557 21.4393 35.9373 20.1207 34.3106 20.1207Z" fill="#FF206E"/>
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
];

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);
  const manualExpandTimeout = useRef<NodeJS.Timeout | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smileyRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);
  const currentCollapsed = useRef(false);

  // GSAP-driven collapse/expand
  useEffect(() => {
    if (!navBarRef.current) return;
    if (currentCollapsed.current === isCollapsed) return;
    currentCollapsed.current = isCollapsed;

    if (isAnimating.current) {
      gsap.killTweensOf(navBarRef.current);
      if (contentRef.current) gsap.killTweensOf(contentRef.current);
      if (smileyRef.current) gsap.killTweensOf(smileyRef.current);
    }

    isAnimating.current = true;

    if (isCollapsed) {
      // Collapse: fade out content, shrink, fade in smiley
      const tl = gsap.timeline({
        onComplete: () => { isAnimating.current = false; },
      });
      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
      }
      tl.to(navBarRef.current, { width: 60, padding: "10px", duration: 0.4, ease: "power3.inOut" }, 0.1);
      if (smileyRef.current) {
        tl.fromTo(smileyRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }, 0.3);
      }
    } else {
      // Expand: fade out smiley, grow, fade in content
      const tl = gsap.timeline({
        onComplete: () => { isAnimating.current = false; },
      });
      if (smileyRef.current) {
        tl.to(smileyRef.current, { opacity: 0, scale: 0.5, duration: 0.15, ease: "power2.in" }, 0);
      }
      tl.to(navBarRef.current, { width: "100%", padding: "12px 20px", duration: 0.4, ease: "power3.inOut" }, 0.05);
      if (contentRef.current) {
        tl.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.25);
      }
    }
  }, [isCollapsed]);

  // Scroll handler with debounce
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const heroThreshold = 400;
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const currentScrollY = window.scrollY;
        if (mobileMenuOpen) return;

        if (manualExpand) {
          if (currentScrollY > lastScrollY + 10) {
            setManualExpand(false);
            setIsCollapsed(true);
          }
        } else if (currentScrollY > heroThreshold && currentScrollY > lastScrollY + 10) {
          setIsCollapsed(true);
        } else if (currentScrollY < lastScrollY - 10) {
          setIsCollapsed(false);
        }

        lastScrollY = currentScrollY;
      }, 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [manualExpand, mobileMenuOpen]);

  // Init navbar ref dimensions
  useEffect(() => {
    if (navBarRef.current && !isCollapsed) {
      gsap.set(navBarRef.current, { width: "100%", padding: "12px 20px" });
    }
  }, []);

  // GSAP animate mobile menu
  useEffect(() => {
    if (!overlayRef.current || !menuLinksRef.current) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      const links = menuLinksRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(links, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power3.out", delay: 0.15 });
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleSmileyClick = () => {
    setManualExpand(true);
    setIsCollapsed(false);
    if (manualExpandTimeout.current) clearTimeout(manualExpandTimeout.current);
    manualExpandTimeout.current = setTimeout(() => {
      setManualExpand(false);
      setIsCollapsed(true);
    }, 4000);
  };

  const closeMobileMenu = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setMobileMenuOpen(false),
      });
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 px-3 md:px-5 pt-3 md:pt-4">
        <div className="w-full flex justify-end">
          <div
            ref={navBarRef}
            className="flex items-center rounded-[10px] overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #282828 0%, #000000 100%)",
              width: "100%",
              padding: "12px 20px",
              justifyContent: isCollapsed ? "center" : "space-between",
            }}
           >
            {/* Expanded content */}
            <div
              ref={contentRef}
              className="flex items-center justify-between w-full"
              style={{
                display: isCollapsed ? "none" : "flex",
                pointerEvents: isCollapsed ? "none" : "auto",
              }}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center shrink-0">
                <svg className="w-[120px] h-[30px] md:w-[168px] md:h-[42px]" viewBox="0 0 224 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.3955 2.68973C28.0446 1.99684 33.763 3.21353 38.6404 6.14635C43.5181 9.0792 47.2741 13.5597 49.3112 18.8741C51.348 24.1886 51.5482 30.0317 49.8803 35.4731C49.7863 35.7799 49.6184 36.059 49.3917 36.286L33.7896 51.8903C33.5628 52.1171 33.2837 52.2852 32.9769 52.3792C27.5358 54.0479 21.6924 53.8486 16.3777 51.8125C11.0629 49.7767 6.58209 46.0209 3.64849 41.144C0.714908 36.2668 -0.502784 30.5486 0.18925 24.8993C0.881309 19.2502 3.44319 13.9948 7.46725 9.97013C11.4913 5.94542 16.7464 3.38265 22.3955 2.68973ZM36.2755 32.1652C35.337 31.6223 34.1359 31.9429 33.593 32.8816C31.8529 35.8901 29.0341 37.7914 25.4752 37.7914C21.9165 37.7914 19.0977 35.8899 17.3577 32.8816C16.8148 31.9429 15.6137 31.6223 14.675 32.1652C13.7364 32.7081 13.4157 33.9092 13.9586 34.8478C16.2927 38.8831 20.3116 41.7183 25.4752 41.7183C30.639 41.7183 34.6579 38.8831 36.9919 34.8478C37.5348 33.9092 37.214 32.7081 36.2755 32.1652ZM16.6399 20.1207C15.0133 20.1207 13.6947 21.4393 13.6947 23.0657C13.6948 24.6924 15.0134 26.0109 16.6399 26.0109C18.2664 26.0109 19.5849 24.6924 19.5849 23.0657C19.5849 21.4393 18.2664 20.1207 16.6399 20.1207ZM34.3106 20.1207C32.6841 20.1207 31.3655 21.4393 31.3655 23.0657C31.3657 24.6924 32.6841 26.0109 34.3106 26.0109C35.9373 26.0109 37.2557 24.6924 37.2557 23.0657C37.2557 21.4393 35.9373 20.1207 34.3106 20.1207Z" fill="#FF206E"/>
                  <path d="M60.6 41L67.56 18.28C68.56 14.96 71.36 13.4 74.16 13.4C76.96 13.4 79.76 14.96 80.76 18.28L87.72 41H80.16L78.92 36.44H69.44L68.16 41H60.6ZM73.88 20.44L71.28 29.84H77.08L74.52 20.44C74.44 20.16 74.36 20.04 74.2 20.04C74.04 20.04 73.96 20.16 73.88 20.44ZM102.979 41.6C94.8991 41.6 88.7391 35.4 88.7391 27.52C88.7391 19.64 94.8191 13.44 102.979 13.44C107.779 13.44 112.499 15.92 114.459 20.44L108.419 23.8C107.299 21.76 105.779 20.4 102.659 20.4C98.8591 20.4 96.3391 23.4 96.3391 27.64C96.3391 32.08 98.8991 34.92 102.979 34.92C105.139 34.92 106.499 34.72 107.659 33.68L107.619 28.12H114.819V36.12C112.739 39.32 108.419 41.6 102.979 41.6ZM139.646 41H125.606C121.046 41 119.206 38.6 119.206 34.8V20.2C119.206 16.4 121.046 14 125.606 14H139.446V20.6H126.606V24.2H138.526V30.8H126.606V34.4H139.646V41ZM151.641 41H144.641V17.96C144.641 15.08 146.881 13.36 149.241 13.36C151.121 13.36 152.761 14 153.721 15.52L163.241 30.6V14H170.241V37.04C170.241 39.92 168.001 41.6 165.641 41.6C163.801 41.6 162.121 40.96 161.161 39.44L151.641 24.36V41ZM195.042 34.2V41H180.922C176.682 41 174.842 38.24 174.842 35.36C174.842 33.68 175.482 31.92 176.722 30.68L186.482 20.8H175.522V14H189.322C193.402 14 195.602 16.6 195.602 19.52C195.602 21.12 194.922 22.88 193.482 24.32L183.762 34.2H195.042ZM203.948 29.36L197.388 14H205.348L210.588 27.12L215.748 14H223.708L217.148 29.36C216.468 30.92 215.468 32.12 214.308 32.92V41H206.908V33C205.708 32.2 204.668 31 203.948 29.36Z" fill="white"/>
                </svg>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-4">
                {navLinks.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link key={link.href} to={link.href} className="font-satoshi leading-[28px] text-foreground hover:text-primary transition-colors text-base whitespace-nowrap">
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href} className="font-satoshi leading-[28px] text-foreground hover:text-primary transition-colors text-base whitespace-nowrap">
                      {link.label}
                    </a>
                  )
                )}
              </div>

              {/* Desktop CTA */}
              <Link to="/contact" className="hidden lg:flex items-center gap-0 shrink-0">
                <AnimatedButton variant="primary" className="px-4 py-3 text-base leading-[22px]">
                  Let's Talk
                </AnimatedButton>
                <AnimatedButton variant="primary" iconOnly className="w-12 h-[46px]">
                  <Hammer size={20} weight="fill" />
                </AnimatedButton>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
                onClick={() => setMobileMenuOpen(true)}
              >
                <List size={28} weight="bold" />
              </button>
            </div>

            {/* Collapsed smiley */}
            <button
              ref={smileyRef}
              onClick={handleSmileyClick}
              className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{
                display: isCollapsed ? "flex" : "none",
                pointerEvents: isCollapsed ? "auto" : "none",
              }}
            >
              <SmileyIcon size={40} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {mobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(180deg, #282828 0%, #000000 100%)" }}
        >
          {/* Close button */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-5 right-5 text-foreground w-12 h-12 flex items-center justify-center"
          >
            <X size={32} weight="bold" />
          </button>

          {/* Logo */}
          <div className="mb-12">
            <SmileyIcon size={60} />
          </div>

          {/* Links */}
          <div ref={menuLinksRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="mobile-link font-satoshi font-medium text-3xl md:text-4xl text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="mobile-link font-satoshi font-medium text-3xl md:text-4xl text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            <Link to="/contact" className="mobile-link mt-4" onClick={closeMobileMenu}>
              <AnimatedButton variant="primary" className="px-8 py-4 text-xl">
                Let's Talk
              </AnimatedButton>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
