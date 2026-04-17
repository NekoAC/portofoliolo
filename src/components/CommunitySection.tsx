import { SmileySticker, PaperPlaneTilt, Cursor, Flower, PuzzlePiece, Star, Lightning, Heart, DiamondsFour, MusicNote } from "@phosphor-icons/react";
import AnimatedButton from "@/components/AnimatedButton";
import communityBg from "@/assets/community-bg.png";
import zairieAvatar from "@/assets/zairie-avatar.png";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const CommunitySection = () => {
  const clusterRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cluster = clusterRef.current;
    const img = imgRef.current;
    if (!cluster || !img) return;

    // Animate floating icons
    const iconTweens = iconsRef.current.map((el, i) => {
      if (!el) return null;
      return gsap.to(el, {
        y: `random(-12, 12)`,
        x: `random(-6, 6)`,
        rotation: `random(-15, 15)`,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    const floatTween = gsap.to(img, {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cluster.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      gsap.to(img, {
        x: dx * 8,
        rotateY: dx * 4,
        rotateX: -dy * 4,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(img, {
        x: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    cluster.addEventListener("mousemove", handleMouseMove);
    cluster.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      floatTween.kill();
      iconTweens.forEach(t => t?.kill());
      cluster.removeEventListener("mousemove", handleMouseMove);
      cluster.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-6 md:p-8 lg:p-[50px] gap-8 md:gap-10 lg:gap-16 xl:gap-24 rounded-[20px] bg-[#222222] md:min-h-screen overflow-hidden">
      {/* Left: Text Content */}
      <div className="flex flex-col items-start gap-2.5 flex-1 max-w-[692px]">
        <div className="flex items-center gap-2.5">
          <SmileySticker size={20} weight="fill" className="text-primary" />
          <span className="font-satoshi text-sm md:text-base text-white">Meet Zairie</span>
        </div>

        <h2 className="font-satoshi font-medium text-2xl md:text-4xl lg:text-[48px] lg:leading-[50px] text-white">
          Get To Know Me Better
        </h2>

        <p className="font-satoshi text-xs md:text-sm lg:text-base leading-[20px] md:leading-[24px] text-white/80">
          I'm a UI/UX Designer based in Malaysia with 3 years of experience designing and shipping live blockchain and fintech products. I work independently across the full design process, from brand identity and design systems to user research and frontend delivery. Outside of work, I'm passionate about making complex technology feel simple and human for the people who use it every day.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-stretch gap-3 mt-4">
          <div className="flex items-stretch">
            <Link to="/about">
              <AnimatedButton variant="primary" magnetic shine fillSweep className="px-5 h-[50px] md:h-[55px] text-base md:text-lg rounded-[10px]">
                Start A Project With Me
              </AnimatedButton>
            </Link>
            <AnimatedButton variant="primary" iconOnly magnetic className="w-[50px] h-[50px] md:w-[55px] md:h-[55px] rounded-[10px]">
              <PaperPlaneTilt size={20} weight="fill" />
            </AnimatedButton>
          </div>
          <Link to="/projects">
            <AnimatedButton variant="accent" magnetic shine fillSweep className="px-5 h-[50px] md:h-[55px] text-base md:text-lg rounded-[10px]">
              View My Work
            </AnimatedButton>
          </Link>
        </div>
      </div>

      {/* Right: Image cluster */}
      <div ref={clusterRef} className="relative w-full md:w-[320px] lg:w-[420px] h-[280px] md:h-[340px] lg:h-[420px] flex-shrink-0" style={{ perspective: 800 }}>
        <img src={communityBg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[10px]" />

        {/* Floating decorative icons */}
        <div ref={el => { iconsRef.current[0] = el; }} className="absolute" style={{ right: -8, top: 10 }}>
          <SmileySticker size={32} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[1] = el; }} className="absolute" style={{ left: 15, bottom: 90, transform: "rotate(-10deg)" }}>
          <Flower size={36} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[2] = el; }} className="absolute" style={{ right: 40, bottom: 70, transform: "rotate(-36deg)" }}>
          <Cursor size={28} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[3] = el; }} className="absolute" style={{ right: 5, bottom: 25 }}>
          <Star size={26} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[4] = el; }} className="absolute" style={{ left: 40, top: 30, transform: "rotate(20deg)" }}>
          <Lightning size={28} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[5] = el; }} className="absolute" style={{ right: 60, top: 50, transform: "rotate(-15deg)" }}>
          <Heart size={24} weight="fill" className="text-primary" />
        </div>
        <div ref={el => { iconsRef.current[6] = el; }} className="absolute" style={{ left: -5, top: 160, transform: "rotate(12deg)" }}>
          <DiamondsFour size={30} weight="fill" className="text-primary" />
        </div>

        {/* Main image card */}
        <div ref={imgRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start gap-2" style={{ willChange: "transform" }}>
          <div className="p-2 rounded-[10px]" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            <img src={zairieAvatar} alt="Zairie - Product Designer" className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-[10px] object-cover" />
          </div>
          <div className="font-satoshi text-base leading-[22px] text-white">
            <p>Zairie</p>
            <p className="font-bold">Product Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
