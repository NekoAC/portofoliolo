import { ReactNode } from "react";

interface MarqueeItemData {
  before: string;
  bold: string;
  after: string;
  icon: ReactNode;
}

interface MarqueeProps {
  items: MarqueeItemData[];
  speed?: "normal" | "slow";
  className?: string;
}

const textStyle = { fontSize: "18px", lineHeight: "25px" } as const;

const MarqueeItem = ({ item }: {item: MarqueeItemData;}) =>
<div className="flex shrink-0 items-center gap-2.5 px-[9px]">
    <span className="text-primary">{item.icon}</span>
    {item.before &&
  <span className="whitespace-nowrap text-foreground font-light" style={textStyle}>
        {item.before}
      </span>
  }
    {item.bold &&
  <span className="whitespace-nowrap text-foreground font-bold" style={textStyle}>
        {item.bold}
      </span>
  }
    {item.after &&
  <span className="whitespace-nowrap text-foreground font-light" style={textStyle}>
        {item.after}
      </span>
  }
  </div>;


const Marquee = ({ items, speed = "normal", className = "" }: MarqueeProps) => {
  const animClass = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`inline-flex items-center ${animClass}`}>
        {[0, 1].map((pass) =>
        items.map((item, i) =>
        <MarqueeItem key={`${pass}-${i}`} item={item} />
        )
        )}
      </div>
    </div>);

};

export default Marquee;
export type { MarqueeItemData };