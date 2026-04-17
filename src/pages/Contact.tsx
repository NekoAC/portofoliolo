import { SmileySticker, PaperPlaneTilt, Cursor, Flower, Star, Lightning, Heart, DiamondsFour, WhatsappLogo, DiscordLogo, EnvelopeSimple } from "@phosphor-icons/react";
import AnimatedButton from "@/components/AnimatedButton";
import communityBg from "@/assets/community-bg.png";
import zairieAvatar from "@/assets/zairie-avatar.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { toast } from "sonner";

const Contact = () => {
  const clusterRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cluster = clusterRef.current;
    const img = imgRef.current;
    if (!cluster || !img) return;

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="px-3 md:px-[20px] pt-32 pb-16">
        <section className="flex flex-col md:flex-row items-start gap-10 lg:gap-16 max-w-[1200px] mx-auto">
          {/* Left: Contact Info */}
          <div className="flex flex-col items-start gap-4 flex-1">
            <ScrollReveal>
              <div className="flex items-center gap-2.5">
                <SmileySticker size={20} weight="fill" className="text-primary" />
                <span className="font-satoshi text-sm md:text-base text-foreground">Contact Zairie</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="font-satoshi text-sm md:text-base text-foreground/70">
                Want to know more about me or Grab a Coffee Together ?
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-satoshi font-medium text-[44px] leading-[48px] sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[80px] text-foreground">
                Let's Talk
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-satoshi text-sm md:text-base text-foreground/70">
                Want to know how Zero-code works ? Or Need a Website ?
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <SmileySticker size={20} weight="fill" className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-satoshi font-bold text-sm md:text-base text-foreground">Mohammad Izz Qhuzairie</p>
                  <p className="font-satoshi text-sm text-foreground/60">Keiroggwp@gmail.com</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="font-satoshi text-sm text-foreground/70 mt-4">
                Or You can contact me through these platform (whichever you're comfortable)
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-stretch">
                  <AnimatedButton
                    variant="primary"
                    magnetic
                    shine
                    fillSweep
                    onClick={() => window.open("https://api.whatsapp.com/send?phone=601135500134", "_blank", "noopener,noreferrer")}
                    className="px-5 h-[50px] text-base rounded-[10px] !bg-[#25D366] text-white"
                  >
                    WhatsApp
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    iconOnly
                    magnetic
                    onClick={() => window.open("https://api.whatsapp.com/send?phone=601135500134", "_blank", "noopener,noreferrer")}
                    className="w-[50px] h-[50px] rounded-[10px] !bg-[#25D366] text-white"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                  </AnimatedButton>
                </div>
                <div className="flex items-stretch">
                  <AnimatedButton
                    variant="primary"
                    magnetic
                    shine
                    fillSweep
                    onClick={() => {
                      navigator.clipboard.writeText("meowac");
                      toast.success("Discord username copied!", { description: "meowac — paste it in Discord to add me." });
                    }}
                    className="px-5 h-[50px] text-base rounded-[10px] !bg-[#5865F2] text-white"
                  >
                    Discord
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    iconOnly
                    magnetic
                    onClick={() => {
                      navigator.clipboard.writeText("meowac");
                      toast.success("Discord username copied!", { description: "meowac — paste it in Discord to add me." });
                    }}
                    className="w-[50px] h-[50px] rounded-[10px] !bg-[#5865F2] text-white"
                  >
                    <DiscordLogo size={20} weight="fill" />
                  </AnimatedButton>
                </div>
                <div className="flex items-stretch">
                  <AnimatedButton
                    variant="primary"
                    magnetic
                    shine
                    fillSweep
                    onClick={() => { window.location.href = "mailto:Keiroggwp@gmail.com"; }}
                    className="px-5 h-[50px] text-base rounded-[10px] !bg-[#FF7A1A] text-white"
                  >
                    Email
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    iconOnly
                    magnetic
                    onClick={() => { window.location.href = "mailto:Keiroggwp@gmail.com"; }}
                    className="w-[50px] h-[50px] rounded-[10px] !bg-[#FF7A1A] text-white"
                  >
                    <EnvelopeSimple size={20} weight="fill" />
                  </AnimatedButton>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Image cluster (reused from CommunitySection) */}
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
              <div className="font-satoshi text-base leading-[22px] text-foreground">
                <p>Zairie</p>
                <p className="font-bold">Product Designer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
