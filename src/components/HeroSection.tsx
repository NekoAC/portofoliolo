import { SmileySticker, Hammer } from "@phosphor-icons/react";
import heroBg from "@/assets/hero-bg.png";
import AnimatedButton from "@/components/AnimatedButton";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const text = headingRef.current!.textContent || "";
      const words = text.split(" ");
      headingRef.current!.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="hero-word inline-block">${word}</span></span>`)
        .join(" ");

      const wordEls = headingRef.current!.querySelectorAll(".hero-word");

      gsap.set(wordEls, { y: "100%", opacity: 0 });
      gsap.set(announcementRef.current, { opacity: 0, y: 20 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(bottomRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(announcementRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(wordEls, { y: "0%", opacity: 1, duration: 0.6, stagger: 0.08, ease: "power4.out" }, "-=0.2")
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-[10px] flex flex-col"
      style={{
        minHeight: "clamp(500px, 80vh, 940px)",
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, #000000 99.99%), url(${heroBg}) center/cover no-repeat`,
      }}
    >
      {/* Hero Text */}
      <div className="flex-1 flex items-center px-6 md:px-[60px] lg:px-[91px] pt-8 md:pt-[60px] lg:pt-[91px]">
        <div className="flex flex-col items-start gap-[10px] max-w-[90%] md:max-w-[600px] lg:max-w-[721px]">
          <div ref={announcementRef} className="flex items-center gap-[10px]">
            <SmileySticker size={24} weight="fill" className="text-primary md:w-8 md:h-8" />
            <span className="font-satoshi text-sm md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[27px] font-normal text-foreground">
              Designer, builder, and creative technologist based in Malaysia.
            </span>
          </div>

          <h1
            ref={headingRef}
            className="w-full font-satoshi font-medium text-[36px] leading-[40px] md:text-[56px] md:leading-[60px] lg:text-[80px] lg:leading-[80px] text-foreground"
          >
            Design that thinks. Builds that ship. Work that lands.
          </h1>

          <p
            ref={descriptionRef}
            className="max-w-[554px] font-satoshi font-normal text-sm md:text-[18px] lg:text-[20px] leading-[20px] md:leading-[27px] text-foreground"
          >
            I design and build digital products across brand, UX, and frontend
            combining user research, design systems, and AI-powered workflows
            into work that's ready for the real world.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-stretch mt-2 gap-0">
            <AnimatedButton variant="primary" onClick={() => navigate("/contact")} className="h-[50px] md:h-[65px] text-sm md:text-[20px] leading-[27px]">
              Start A Project With Me
            </AnimatedButton>
            <AnimatedButton variant="primary" iconOnly onClick={() => navigate("/contact")} className="w-[50px] h-[50px] md:w-[64px] md:h-[65px]">
              <Hammer size={24} weight="fill" className="md:w-8 md:h-8" />
            </AnimatedButton>
            <AnimatedButton variant="accent" onClick={() => navigate("/contact")} className="h-[50px] md:h-[65px] text-sm md:text-[20px] leading-[27px]">
              View My Work
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Bottom Tagline Container */}
      <div ref={bottomRef} className="px-6 md:px-[60px] lg:px-[91px] pb-6 md:pb-[60px] lg:pb-[91px] pt-6 flex items-center gap-[21px]">
        <svg className="w-[120px] md:w-[189px]" viewBox="0 0 189 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_324_236)">
            <path fillRule="evenodd" clipRule="evenodd" d="M50.5061 0L34.3901 32.8226H19.2528L25.9973 19.2195H25.6947C20.1306 26.7446 11.8288 31.6985 0 32.8226V19.4077C0 19.4077 7.56716 18.942 12.0157 14.0695H0V0.000259257H13.5043V11.572L13.8074 11.5707L19.3258 0.000259257H29.5388V11.4986L29.8419 11.4981L35.5672 0H50.5061Z" fill="white"/>
            <path d="M138.387 29.3389H142.736V3.33044H138.387V29.3389Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M114.411 29.0736C115.356 29.4829 116.317 29.6877 117.294 29.6877C118.909 29.6877 120.353 29.2782 121.627 28.4594C122.902 27.6406 123.89 26.512 124.591 25.0735C125.292 23.624 125.642 21.9808 125.642 20.1439C125.642 18.3072 125.281 16.664 124.559 15.2145C123.837 13.765 122.833 12.6419 121.548 11.8452C120.263 11.0374 118.802 10.6391 117.167 10.6501C116.126 10.6501 115.128 10.8604 114.172 11.2808C113.216 11.7013 112.419 12.2988 111.782 13.0734C111.733 13.1324 111.685 13.1919 111.639 13.2521V3.34717H107.273V29.3391H111.607L111.598 26.9109C111.71 27.054 111.83 27.1941 111.957 27.3308C112.648 28.0721 113.465 28.653 114.411 29.0736ZM118.871 24.8744C118.16 25.328 117.347 25.5548 116.434 25.5548C115.531 25.5548 114.703 25.3225 113.949 24.8578C113.195 24.382 112.594 23.7347 112.148 22.9157C111.713 22.0969 111.495 21.1675 111.495 20.1273C111.485 19.0874 111.697 18.1578 112.132 17.339C112.579 16.5091 113.179 15.8673 113.933 15.4137C114.687 14.9489 115.52 14.7221 116.434 14.7332C117.347 14.7221 118.16 14.9434 118.871 15.3971C119.594 15.8397 120.146 16.4759 120.528 17.3058C120.921 18.1246 121.118 19.0651 121.118 20.1273C121.118 21.1897 120.921 22.1301 120.528 22.9491C120.146 23.7679 119.594 24.4097 118.871 24.8744Z" fill="white"/>
            <path d="M56.8086 4.90723H61.7791L66.2255 21.8248L70.9556 4.90723H75.0977L80.2276 21.4853L84.4971 4.90723H89.0534L82.3304 29.3389H78.0448L72.8286 13.1437L68.0401 29.3389H63.7067L56.8086 4.90723Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M96.3904 29.7705C94.6591 29.7816 93.098 29.3833 91.7065 28.5756C90.326 27.7568 89.2373 26.6226 88.4407 25.1729C87.6548 23.7235 87.2617 22.0693 87.2617 20.2104C87.2617 18.4067 87.6654 16.7746 88.4725 15.314C89.2796 13.8534 90.3737 12.7137 91.7543 11.8948C93.1351 11.076 94.6751 10.6666 96.3745 10.6666C98.2862 10.6666 99.959 11.1092 101.393 11.9944C102.837 12.8797 103.915 14.1355 104.627 15.7621C105.349 17.3776 105.609 19.2311 105.407 21.3223H91.7611C91.7993 22.1555 91.9988 22.9134 92.3598 23.5962C92.7634 24.3487 93.3263 24.935 94.0484 25.3556C94.7706 25.7761 95.5779 25.9863 96.47 25.9863C97.1497 25.9751 97.7817 25.8535 98.3658 25.6211C98.95 25.3777 99.4438 25.0513 99.8475 24.6418C100.262 24.2325 100.554 23.7678 100.724 23.2476H105.28C105.004 24.5202 104.452 25.6543 103.623 26.6501C102.795 27.635 101.754 28.404 100.501 28.9572C99.2473 29.5105 97.8772 29.7816 96.3904 29.7705ZM92.3757 16.758C92.1211 17.2204 91.9449 17.7183 91.8467 18.2517H100.892C100.827 17.5778 100.627 16.9637 100.293 16.4094C99.9112 15.7566 99.3908 15.2531 98.7323 14.899C98.0737 14.5339 97.3303 14.3513 96.5019 14.3513C95.6204 14.3513 94.8186 14.5616 94.0963 14.982C93.3741 15.4025 92.8005 15.9945 92.3757 16.758Z" fill="white"/>
            <path d="M128.843 11.0484C128.843 9.56565 129.167 8.2489 129.815 7.09813C130.463 5.93629 131.371 5.0345 132.539 4.39271C133.718 3.73988 135.093 3.40238 136.665 3.38025V7.41349C135.932 7.42455 135.306 7.585 134.785 7.89483C134.276 8.19358 133.883 8.63066 133.606 9.20604C133.352 9.73576 133.215 10.3499 133.195 11.0484H136.57V14.8824H133.192V29.339H128.843V14.8824H126.039V11.0484H128.843Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M153.791 29.7373C152.017 29.7373 150.429 29.3335 149.027 28.5258C147.636 27.7068 146.542 26.5782 145.745 25.1397C144.959 23.6903 144.566 22.047 144.566 20.2103C144.566 18.3623 144.959 16.7137 145.745 15.2642C146.542 13.8036 147.636 12.6694 149.027 11.8617C150.429 11.0539 152.017 10.65 153.791 10.65C155.575 10.65 157.168 11.0539 158.57 11.8617C159.983 12.6694 161.082 13.798 161.868 15.2476C162.654 16.6971 163.052 18.3514 163.063 20.2103C163.052 22.047 162.654 23.6903 161.868 25.1397C161.093 26.5782 159.999 27.7068 158.586 28.5258C157.173 29.3335 155.575 29.7373 153.791 29.7373ZM153.791 25.5713C154.725 25.5713 155.554 25.35 156.276 24.9075C156.998 24.4537 157.556 23.823 157.949 23.0153C158.342 22.1965 158.538 21.2614 158.538 20.2103C158.538 19.148 158.342 18.2075 157.949 17.3887C157.556 16.5699 156.998 15.9391 156.276 15.4965C155.554 15.0429 154.725 14.816 153.791 14.816C152.867 14.816 152.044 15.0429 151.321 15.4965C150.61 15.9391 150.057 16.5699 149.664 17.3887C149.271 18.2075 149.08 19.148 149.091 20.2103C149.091 21.2614 149.287 22.1965 149.68 23.0153C150.084 23.823 150.636 24.4537 151.337 24.9075C152.049 25.35 152.867 25.5713 153.791 25.5713Z" fill="white"/>
            <path d="M167.765 11.0485H162.922L168.163 29.339H172.401L175.848 17.6569L179.571 29.339H183.744L189.001 11.0485H184.621L181.639 22.4333L178.344 11.0485H174.106L170.826 22.684L167.765 11.0485Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_324_236">
              <rect width="189" height="33" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div className="flex items-center justify-center px-[10px] py-[10px] bg-foreground rounded-[10px]">
          <span className="font-satoshi font-bold text-sm md:text-[20px] leading-[27px] text-background">
            Specialist
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
