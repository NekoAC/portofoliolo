import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChatCircleDots, PencilSimple, Code, GearSix } from "@phosphor-icons/react";
import Lottie from "lottie-react";

const processSteps = [
  {
    step: "01",
    icon: ChatCircleDots,
    title: "Define",
    subtitle: "Understand your business, users, and goals",
    description:
      "We start by aligning on what matters most. Clear direction removes guesswork and sets the foundation for everything that follows. We dive deep into your market, competitors, and users to build a strategy that drives results.",
  },
  {
    step: "02",
    icon: PencilSimple,
    title: "Design",
    subtitle: "Create experiences that convert",
    description:
      "We translate strategy into high-fidelity designs and interactive prototypes, iterating with your feedback until every detail is perfect. Every pixel serves a purpose — guiding users toward action.",
  },
  {
    step: "03",
    icon: Code,
    title: "Build",
    subtitle: "Develop with precision and speed",
    description:
      "We develop your product using modern tools and zero-code platforms, ensuring fast delivery without compromising quality or scalability. Clean, responsive, and performance-optimized from day one.",
  },
  {
    step: "04",
    icon: GearSix,
    title: "Scale",
    subtitle: "Optimize, automate, and grow",
    description:
      "Post-launch, we monitor performance, implement automation, and continuously optimize to support your growth trajectory. We stay with you to iterate, improve, and scale what works.",
  },
];

const ProcessCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/animations/process-illustration.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, []);

  const goNext = () => setCurrent((prev) => (prev + 1) % processSteps.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + processSteps.length) % processSteps.length);

  const step = processSteps[current];
  const StepIcon = step.icon;

  return (
    <div
      className="w-full rounded-[10px] overflow-hidden relative flex"
      style={{
        background: "linear-gradient(0deg, hsl(var(--surface)), hsl(var(--surface)))",
        minHeight: "clamp(520px, 80vh, 940px)",
      }}
    >
      {/* Lottie animation - right center */}
      {animationData && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] md:w-[45%] h-[70%] pointer-events-none hidden md:flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
      )}

      {/* Content - left side */}
      <div className="relative z-10 flex flex-col items-start p-6 md:p-[72px_67px] gap-[10px] h-full justify-center w-full md:max-w-[60%]">
        {/* Step indicator + icon row */}
        <div className="flex items-center gap-[10px]">
          <StepIcon size={28} weight="fill" className="text-primary md:w-[30px] md:h-[30px]" />
          <span className="font-satoshi font-normal text-sm md:text-[20px] leading-[27px] text-[#1E1E1E]">
            Step {step.step} — Our Process
          </span>
        </div>

        {/* Title */}
        <h2 className="font-satoshi font-medium text-[32px] leading-[40px] md:text-[60px] md:leading-[60px] text-[#1E1E1E] max-w-[646px]">
          {step.title}
        </h2>

        {/* Subtitle */}
        <p className="font-satoshi font-medium text-[20px] leading-[28px] md:text-[32px] md:leading-[40px] text-[#1E1E1E] max-w-[646px]">
          {step.subtitle}
        </p>

        {/* Description */}
        <p className="font-satoshi font-normal text-[14px] leading-[22px] md:text-[20px] md:leading-[27px] text-[#1E1E1E]/80 max-w-[646px]">
          {step.description}
        </p>

        {/* Navigation arrows - bottom left */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border border-[#1E1E1E]/20 flex items-center justify-center hover:bg-[#1E1E1E]/5 transition-colors"
          >
            <ArrowLeft size={20} className="text-[#1E1E1E]" />
          </button>
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border border-[#1E1E1E]/20 flex items-center justify-center hover:bg-[#1E1E1E]/5 transition-colors"
          >
            <ArrowRight size={20} className="text-[#1E1E1E]" />
          </button>
          <span className="font-satoshi text-sm text-[#1E1E1E]/50 ml-2">
            {current + 1} / {processSteps.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessCarousel;
