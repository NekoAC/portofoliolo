import { ArrowRight } from "lucide-react";
import { Lightning, Globe, ShieldCheck, Code } from "@phosphor-icons/react";
import AnimatedButton from "@/components/AnimatedButton";
import cardIllustration1 from "@/assets/card-illustration-1.png";
import cardIllustration2 from "@/assets/card-illustration-2.png";
import cardIllustration3 from "@/assets/card-illustration-3.png";
import heroIllustration from "@/assets/hero-illustration.png";

const cardImages = [cardIllustration1, cardIllustration2, cardIllustration3];

const infoCards = [
  {
    title: "Quick Launch",
    description:
      "Zero-code platforms allow us to design, build, and deploy high-quality websites and digital products in a fraction of the time.",
  },
  {
    title: "Built for flexibility",
    description:
      "Your team can update content, adjust pages, and improve workflows without relying on developers for every change.",
  },
  {
    title: "Continuous Optimization",
    description:
      "We monitor, test, and refine your digital presence to maximize conversions and user engagement.",
  },
];

const ZeroCodeSection = () => {
  return (
    <section className="flex flex-col items-start gap-[13px]">
      {/* Hero Card */}
      <div className="relative w-full rounded-[10px] bg-surface overflow-hidden min-h-[350px] md:min-h-[475px]">
        <div className="relative z-10 flex flex-col items-start gap-[10px] p-6 md:p-10 lg:py-0 lg:pl-[60px] xl:pl-[91px] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] xl:w-[50%] md:max-w-[60%]">
          <div className="flex items-center gap-[10px]">
            <Code size={30} weight="fill" className="text-primary" />
            <span className="font-satoshi text-base md:text-[20px] leading-[27px] font-normal text-[hsl(0,0%,12%)]">
              Build faster. Launch smarter.
            </span>
          </div>
          <h2 className="font-satoshi font-medium text-3xl md:text-[48px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] text-[hsl(0,0%,12%)] self-stretch">
            The Zero-Code Solution
          </h2>
          <p className="font-satoshi font-normal text-sm md:text-[20px] leading-[22px] md:leading-[27px] text-[hsl(0,0%,12%)] self-stretch">
            Instead of spending months building custom code, we use modern zero-code platforms to design, launch, and iterate faster.
          </p>
        </div>
        <div className="hidden md:flex absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] lg:w-[360px] lg:h-[360px] items-center justify-center">
          <img src={heroIllustration} alt="Hello illustration" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Info Cards Row - horizontal scroll on mobile/tablet, 3 columns on desktop */}
      <div className="flex gap-3 w-full overflow-x-auto pb-2 xl:pb-0 snap-x snap-mandatory xl:snap-none scrollbar-hide">
        {infoCards.map((card, i) => (
          <div
            key={card.title}
            className="relative min-w-[280px] md:min-w-[340px] xl:min-w-0 xl:flex-1 rounded-[10px] bg-surface overflow-hidden snap-start flex flex-col"
            style={{ minHeight: "488px" }}
          >
            {i < 2 ? (
              <>
                <div className="flex-1 flex items-center justify-center p-6">
                  <img src={cardImages[i]} alt={card.title} className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain" />
                </div>
                <div className="p-6 md:px-[37px] md:pb-[40px] flex flex-col gap-[10px]">
                  <h3 className="font-satoshi font-medium text-2xl md:text-[40px] md:leading-[40px] text-[hsl(0,0%,12%)]">
                    {card.title}
                  </h3>
                  <p className="font-satoshi font-normal text-sm md:text-[20px] leading-[22px] md:leading-[27px] text-[hsl(0,0%,12%)]">
                    {card.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 md:px-[37px] md:pt-[40px] flex flex-col gap-[10px]">
                  <h3 className="font-satoshi font-medium text-2xl md:text-[40px] md:leading-[40px] text-[hsl(0,0%,12%)]">
                    {card.title}
                  </h3>
                  <p className="font-satoshi font-normal text-sm md:text-[20px] leading-[22px] md:leading-[27px] text-[hsl(0,0%,12%)]">
                    {card.description}
                  </p>
                </div>
                <div className="mt-auto p-6 md:px-[37px] md:pb-[40px] flex items-start">
                  <AnimatedButton variant="accent" className="h-[50px] md:h-[65px] text-base md:text-[20px] leading-[27px]">
                    Let's Start Building
                  </AnimatedButton>
                  <AnimatedButton variant="accent" iconOnly className="w-[50px] h-[50px] md:w-[64px] md:h-[65px]">
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                  </AnimatedButton>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZeroCodeSection;
