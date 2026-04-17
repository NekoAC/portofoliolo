import Marquee, { type MarqueeItemData } from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ZeroCodeSection from "@/components/ZeroCodeSection";
import FeatureCards from "@/components/FeatureCards";
import HowWeHelp from "@/components/HowWeHelp";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import LanyardCard from "@/components/LanyardCard";
import { useState } from "react";
import { Hammer, RocketLaunch, SmileySticker, FastForward, CassetteTape, Coffee } from "@phosphor-icons/react";

const marqueeItems: MarqueeItemData[] = [
{
  icon: <Hammer size={30} weight="fill" />,
  before: "Now",
  bold: "designing",
  after: "a scalable fintech dashboard"
},
{
  before: "",
  bold: "Launching",
  after: "a conversion-focused product website",
  icon: <RocketLaunch size={30} weight="fill" />
},
{
  before: "",
  bold: "Building",
  after: "a high-performance marketing site",
  icon: <SmileySticker size={30} weight="fill" />
}];


const zeroCodeMarqueeItems: MarqueeItemData[] = [
{ before: "Less coding. More building.", bold: "", after: "", icon: <FastForward size={30} weight="fill" /> },
{ before: "Ideas should not wait for development cycles.", bold: "", after: "", icon: <CassetteTape size={30} weight="fill" /> },
{ before: "Speed is the real advantage of zero-code.", bold: "", after: "", icon: <Coffee size={30} weight="fill" /> }];


const bottomMarqueeItems: MarqueeItemData[] = [
{ before: "Let's Build Something Great", bold: "", after: "", icon: <Hammer size={30} weight="fill" /> },
{ before: "Get In Touch", bold: "", after: "", icon: <RocketLaunch size={30} weight="fill" /> },
{ before: "Start Your Project", bold: "", after: "", icon: <SmileySticker size={30} weight="fill" /> },
{ before: "Book a Call", bold: "", after: "", icon: <Hammer size={30} weight="fill" /> }];


const Index = () => {
  const hasSeenPreloader = sessionStorage.getItem("preloaderSeen") === "true";
  const [loaded, setLoaded] = useState(hasSeenPreloader);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("preloaderSeen", "true");
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <LanyardCard onComplete={handlePreloaderComplete} />}
      <div className={`min-h-screen bg-background font-satoshi ${!loaded ? "overflow-hidden h-screen" : ""}`}>
      {/* Top Marquee */}
      <div className="border-b py-2 rounded-none border-[#383838]/0 border-0 border-none bg-[#1f1f1f]/0 my-0">
        <Marquee items={marqueeItems} />
      </div>

      <Navbar />

      <div className="px-3 md:px-5 pt-2">
        <ScrollReveal variant="fade-up" duration={0.8}>
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <ZeroCodeSection />
        </ScrollReveal>

        {/* Zero-Code Marquee */}
        <ScrollReveal variant="fade" className="py-3 -mx-3 md:-mx-5">
          <Marquee items={zeroCodeMarqueeItems} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <FeatureCards />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <HowWeHelp />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <CommunitySection />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" delay={0.1} className="p-3 md:p-5">
        <Footer />
      </ScrollReveal>
    </div>
    </>);

};

export default Index;