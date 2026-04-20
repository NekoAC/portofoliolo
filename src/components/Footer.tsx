import { SmileySticker, Clock, CalendarBlank } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedButton from "@/components/AnimatedButton";

const Footer = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kuala_Lumpur"
      });
      setTime(`${formatter.format(now)} (GMT+8)`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative">
      {/* Pink icon accent */}
      <div className="absolute left-6 md:left-[123px] -top-[44px] z-10 rotate-45">
        <SmileySticker size={55} weight="fill" className="text-primary" />
      </div>

      {/* Pink wrapper */}
      <div className="bg-primary rounded-[10px] md:rounded-[20px] p-3 md:p-5 pt-[60px] md:pt-[80px] flex flex-col items-center gap-2.5">
        {/* Scrolling banner */}
        <div className="w-full overflow-hidden mb-4">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center shrink-0">
                <span className="font-satoshi text-2xl md:text-[48px] leading-[36px] md:leading-[65px] text-primary-foreground font-light pr-[26px]">
                  Design better. <span className="font-black">Build</span> smarter. <span className="font-black">Scale</span> faster.
                </span>
                <div className="flex items-center gap-0 pr-[26px]">
                  <AnimatedButton variant="inverse" onClick={() => navigate("/contact")} className="px-5 h-[55px] text-xl leading-[27px]">
                    Let's Get Started
                  </AnimatedButton>
                  <AnimatedButton variant="inverse" iconOnly onClick={() => navigate("/contact")} className="w-[55px] h-[55px]">
                    <CalendarBlank size={24} weight="fill" />
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main footer content - dark box */}
        <div className="relative w-full rounded-[10px] overflow-hidden" style={{ background: "#222222", minHeight: "450px" }}>
          {/* Top section with links */}
          <div className="px-6 md:px-9 pt-8 md:pt-[66px] pb-10 flex flex-col gap-10 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              {/* Brand column */}
              <div className="flex flex-col items-start gap-[7px] max-w-[530px] w-full">
                <div className="flex items-center">
                  <svg className="w-[200px] md:w-[323px]" viewBox="0 0 323 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_346_42" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="7" width="70" height="70">
                      <path d="M70 7H0V77H70V7Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_346_42)">
                      <path d="M31.6702 13.9311C37.9639 13.1591 44.335 14.5147 49.769 17.7822C55.2033 21.0498 59.388 26.0416 61.6575 31.9625C63.9268 37.8834 64.1499 44.3934 62.2916 50.4558C62.1869 50.7976 61.9999 51.1085 61.7472 51.3614L44.3645 68.7466C44.1118 68.9992 43.8009 69.1865 43.4592 69.2913C37.397 71.1504 30.8868 70.9283 24.9655 68.6599C19.0442 66.3917 14.052 62.2073 10.7836 56.7738C7.51525 51.3401 6.15859 44.9693 6.9296 38.6753C7.70064 32.3815 10.5549 26.5264 15.0382 22.0424C19.5215 17.5583 25.3764 14.7031 31.6702 13.9311ZM47.1342 46.7704C46.0885 46.1656 44.7503 46.5227 44.1455 47.5686C42.2068 50.9204 39.0664 53.0387 35.1013 53.0387C31.1364 53.0387 27.996 50.9201 26.0574 47.5686C25.4525 46.5227 24.1143 46.1656 23.0685 46.7704C22.0229 47.3753 21.6655 48.7135 22.2704 49.7591C24.8708 54.2549 29.3484 57.4137 35.1013 57.4137C40.8544 57.4137 45.3319 54.2549 47.9323 49.7591C48.5372 48.7135 48.1798 47.3753 47.1342 46.7704ZM25.2577 33.3513C23.4455 33.3513 21.9764 34.8204 21.9764 36.6324C21.9765 38.4448 23.4455 39.9137 25.2577 39.9137C27.0697 39.9137 28.5388 38.4448 28.5388 36.6324C28.5388 34.8204 27.0698 33.3514 25.2577 33.3513ZM44.945 33.3513C43.1329 33.3513 41.6638 34.8204 41.6638 36.6324C41.664 38.4448 43.1329 39.9137 44.945 39.9137C46.7574 39.9137 48.2263 38.4448 48.2263 36.6324C48.2263 34.8204 46.7574 33.3514 44.945 33.3513Z" fill="white"/>
                    </g>
                    <path d="M77.9 62L88.34 27.92C89.84 22.94 94.04 20.6 98.24 20.6C102.44 20.6 106.64 22.94 108.14 27.92L118.58 62H107.24L105.38 55.16H91.16L89.24 62H77.9ZM97.82 31.16L93.92 45.26H102.62L98.78 31.16C98.66 30.74 98.54 30.56 98.3 30.56C98.06 30.56 97.94 30.74 97.82 31.16ZM141.469 62.9C129.349 62.9 120.109 53.6 120.109 41.78C120.109 29.96 129.229 20.66 141.469 20.66C148.669 20.66 155.749 24.38 158.689 31.16L149.629 36.2C147.949 33.14 145.669 31.1 140.989 31.1C135.289 31.1 131.509 35.6 131.509 41.96C131.509 48.62 135.349 52.88 141.469 52.88C144.709 52.88 146.749 52.58 148.489 51.02L148.429 42.68H159.229V54.68C156.109 59.48 149.629 62.9 141.469 62.9ZM196.469 62H175.409C168.569 62 165.809 58.4 165.809 52.7V30.8C165.809 25.1 168.569 21.5 175.409 21.5H196.169V31.4H176.909V36.8H194.789V46.7H176.909V52.1H196.469V62ZM214.461 62H203.961V27.44C203.961 23.12 207.321 20.54 210.861 20.54C213.681 20.54 216.141 21.5 217.581 23.78L231.861 46.4V21.5H242.361V56.06C242.361 60.38 239.001 62.9 235.461 62.9C232.701 62.9 230.181 61.94 228.741 59.66L214.461 37.04V62ZM279.563 51.8V62H258.383C252.023 62 249.263 57.86 249.263 53.54C249.263 51.02 250.223 48.38 252.083 46.52L266.723 31.7H250.283V21.5H270.983C277.103 21.5 280.403 25.4 280.403 29.78C280.403 32.18 279.383 34.82 277.223 36.98L262.643 51.8H279.563ZM292.921 44.54L283.081 21.5H295.021L302.881 41.18L310.621 21.5H322.561L312.721 44.54C311.701 46.88 310.201 48.68 308.461 49.88V62H297.361V50C295.561 48.8 294.001 47 292.921 44.54Z" fill="white"/>
                  </svg>
                </div>
                <p className="text-base leading-[22px] text-primary-foreground font-medium">
                  Building modern digital platforms through strategy, design, automation, and zero-code solutions. We help businesses launch faster, operate smarter, and grow online.
                </p>
              </div>

              {/* Links columns */}
              <div className="grid grid-cols-2 gap-6 md:gap-2.5">
                {/* Main Pages */}
                <div className="flex flex-col items-start gap-2.5">
                  <h4 className="font-bold text-xl leading-[27px] text-primary-foreground">Main Pages</h4>
                  {[
                    { label: "Home", to: "/" },
                    { label: "Services", to: "/services" },
                    { label: "Projects", to: "/projects" },
                    { label: "About", to: "/about" },
                    { label: "Contact", to: "/contact" },
                  ].map((link) =>
                  <Link key={link.label} to={link.to} className="text-base leading-[22px] text-primary-foreground font-medium hover:opacity-80 transition-opacity">
                      {link.label}
                    </Link>
                  )}
                </div>

                {/* Contact Us */}
                <div className="flex flex-col items-start gap-2.5">
                  <h4 className="font-bold text-xl leading-[27px] text-primary-foreground">Contact Us</h4>
                  <a href="mailto:keiroggwp@gmail.com" className="text-base leading-[22px] text-primary-foreground font-medium hover:opacity-80 transition-opacity">
                    keiroggwp@gmail.com
                  </a>
                  <span className="text-base leading-[22px] text-primary-foreground font-medium">
                    Kuala Lumpur, Malaysia<br />(Office Coming Soon)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Large AGENZY watermark */}
          <div className="relative z-[1] px-[5px] -mt-4 md:-mt-16 select-none overflow-hidden">
            <span className="font-chillax font-bold text-[80px] sm:text-[120px] md:text-[200px] lg:text-[330px] leading-[80px] sm:leading-[140px] md:leading-[280px] lg:leading-[462px] whitespace-nowrap block" style={{ color: "#3B3B3B" }}>
              AGENZY
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full rounded-[10px] px-4 md:px-9 py-6 md:py-10 flex items-center" style={{ background: "#222222" }}>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-base leading-[22px] text-primary-foreground font-medium">
              © 2026 AGENZ. All rights reserved.
            </span>
            <Clock size={25} weight="fill" className="text-primary-foreground" />
            <span className="text-base leading-[22px] text-primary-foreground font-medium">
              {time}
            </span>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;