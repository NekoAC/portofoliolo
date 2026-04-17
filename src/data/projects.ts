import mykapitalImg from "@/assets/projects/mykapital.png";
import mykapitalHeroImg from "@/assets/mykapital-hero.png";

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  heroImage?: string;
  tools: string[];
  heroTitle: string;
  role: string;
  services?: string;
  timeline: string;
  overview: string;
  researchObjectives: { title: string; description: string }[];
  researchMethods?: string[];
  targetUsers: {
    name: string;
    description: string;
    image?: string;
    subtitle?: string;
    quote?: string;
    bio?: string;
    relevantApps?: string[];
    motivations?: string[];
    frustrations?: string[];
    needs?: string[];
  }[];
  discovery?: {
    headline: string;
    problems: { title: string; description: string }[];
  };
  designDecisions: {
    title: string;
    blocks: ({ type: "text"; content: string } | { type: "images"; keys: string[] })[];
  };
  foundation?: {
    title: string;
    body: string;
    heroImage: string;
    sideBySideImages: [string, string];
  };
  results?: {
    description: string;
    metrics: { label: string; text: string }[];
    ctaLabel?: string;
    ctaLink?: string;
  };
  reflection: string;
  reflectionQuote?: string;
}

export const projects: ProjectData[] = [
  {
    slug: "mykapital",
    title: "MyKapital",
    category: "Project & Case",
    description:
      "Built from zero with no existing guidelines — brand, design system, landing page, and full dashboard UI for a live blockchain-backed SME financing platform serving investors and business owners.",
    image: mykapitalImg,
    heroImage: mykapitalHeroImg,
    tools: ["Brand Identity", "Design System", "Zero-Code Solution", "Frontend (Webflow)"],
    heroTitle: "Making Blockchain-Backed Financing Feel Human",
    role: "UI / UX Development",
    timeline: "3 Months",
    overview:
      "When I joined MyKapital, there was no visual identity, no design system, and no documented brand. The product was a blockchain-backed financing platform complex enough for investors, but needing to be accessible to SME owners with no crypto background.\n\nThe challenge wasn't just making it look good. It was making a technically complex financial product feel trustworthy, navigable, and human for two completely different user types at the same time.",
    researchObjectives: [
      { title: "Objective 1", description: "Understand how SME owners mentally model financing applications what builds trust, what creates friction, what makes them abandon a flow." },
      { title: "Objective 2", description: "Benchmark competitor fintech and blockchain platforms in Malaysia and regionally identify visual conventions, interaction patterns, and gaps we could own." },
      { title: "Objective 3", description: "Define the brand territory what does a blockchain fintech platform need to look and feel like to be taken seriously by both investors and small business owners?" },
    ],
    researchMethods: [
      "Competitive analysis across 6+ fintech and investment platforms",
      "Stakeholder interviews to extract product vision and user expectations",
      "Heuristic evaluation of early wireframe concepts",
      "Ongoing feedback loops with the product and engineering team post-launch",
    ],
    targetUsers: [
      {
        name: "Ahmad Fariz",
        subtitle: "SME Owner, 42 Location: Shah Alam, Selangor",
        description: "A Malaysian small business owner, typically 30–50 years old, looking for alternative financing. Not crypto-native. Needs the platform to feel legitimate, simple to navigate, and clear about what they need to do next. Gets easily lost in complex dashboards. Trusts platforms that feel professional and locally relevant.",
        image: "/persona-sme",
        quote: "I just want to know if I qualify and how much I can get. **Don't make me read three pages** to find out.",
        bio: "Fariz runs a mid-sized food manufacturing business and has been looking for alternative financing to expand his production line. He's heard about MyKapital through a business associate but has never used a blockchain-based platform before. He's comfortable with basic banking apps but gets frustrated when digital products use technical language he doesn't understand.",
        relevantApps: ["Pitch-In", "Ata Plus", "Kapital DX"],
        motivations: [
          "Secure financing without going through a traditional bank's long approval process",
          "Understand his application status at any point without calling anyone",
          "Feel confident the platform is legitimate and his documents are safe",
        ],
        frustrations: [
          "Financial platforms that hide key information behind jargon or complicated flows.",
          "Not knowing where he is in a process or how many steps remain.",
          "Having to re-enter the same information multiple times",
        ],
        needs: [
          "A clear, step-by-step application flow with plain language throughout",
          "Real-time status updates on his financing application",
          "Trust signals that make the platform feel credible and secure",
        ],
      },
      {
        name: "Danial Harith",
        subtitle: "Private Investor, 34 Location: Kuala Lumpur",
        description: "A financially literate individual or institution evaluating SME investment opportunities. Needs data visibility, portfolio tracking, payout transparency, and confidence in the platform's credibility. Expects analytical tools and clean information hierarchy.",
        image: "/persona-investor",
        quote: "If **I can't see my returns clearly in under 10 seconds**, I'm already losing confidence in the platform.",
        bio: "Danial is a financially literate professional who actively diversifies his portfolio through alternative investment platforms. He's comfortable with crypto and fintech products and evaluates opportunities based on data, returns, and platform transparency. He manages multiple investments simultaneously and values efficiency above everything else.",
        relevantApps: ["Luno", "Pitch-In", "Bloomberg"],
        motivations: [
          "Track payout interest and returns across his MyKapital investments in one clear view",
          "Make informed investment decisions quickly without digging through multiple screens",
          "Trust that the platform's data is accurate and up to date in real time",
        ],
        frustrations: [
          "Dashboards that bury key financial data under unnecessary UI elements",
          "Payout information that requires mental calculation rather than being displayed clearly",
          "Platforms that look good but sacrifice data density for aesthetics",
        ],
        needs: [
          "A data-rich dashboard with clear portfolio performance at a glance",
          "Filterable tables that let him drill into specific investments without noise",
          "Transparent payout history with timestamps and interest breakdowns",
        ],
      },
    ],
    designDecisions: {
      title: "Key Design Decisions",
      blocks: [
        { type: "text", content: "Decision 1 Dashboard Redesign\n\n**Before:** Static cards with no visual hierarchy. Users landed on the dashboard and had no sense of priority, status, or what action to take next. It felt like a spreadsheet pretending to be a product.\nThe problem: A dashboard that doesn't communicate state — what's active, what needs attention, what's performing — is useless regardless of how clean it looks.\n\n**What I changed:** Introduced a dynamic welcome state that contextualised the user's portfolio at a glance. Added status indicators, progress bars for active financing applications, and a clear action hierarchy — the most important thing to do is always the most visible thing on screen. Visual weight guides the eye, not just layout.\nResult: The dashboard became the product's first impression of competence. Stakeholders used it in every client demo and pitch session." },
        { type: "images", keys: ["/decision1-before", "/decision1-after"] },
        { type: "text", content: "Decision 2 Payout Interest Flow Redesign\n\n**Before:** Payout interest information was displayed as a raw data dump — numbers without context, no clear flow for how a user would understand or act on the information.\nThe problem: For SME owners especially, seeing interest figures without narrative context is confusing and anxiety-inducing. For investors, it was hard to compare across investments.\n\n**What I changed:** Redesigned payout interest from a static display into a guided flow. Users move through their interest breakdown step by step — what they earned, when it was calculated, when it pays out, and what they need to do (if anything). Added visual progress indicators and contextual tooltips that explain financial terms without requiring users to leave the screen.\nResult: A flow users could follow independently, reducing reliance on support for basic financial queries." },
        { type: "images", keys: ["/decision2-before", "/decision2-after"] },
        { type: "text", content: "Decision 3 Table Layout & Filtration System\n\n**Before:** Financial tables with dense rows, no visual differentiation between data types, and no way to filter or focus. Users reported getting lost in the data — unable to find specific transactions or compare across entries.\nThe problem: Tables are the hardest UI pattern to get right in fintech. Too much information reads as noise. Too little reads as incomplete. The interaction model needed to do the work.\n\n**What I changed:** Introduced a hover state that surfaces the key information for each row without requiring the user to click through. Added a filtration system that dynamically reshapes the table — users select only the columns and data types they want to see, hiding everything else. The table adapts to the user's intent rather than forcing the user to adapt to the table.\n\n**Result:** Significantly faster data navigation for both user types. Investors could filter to their specific portfolio view. SME owners could focus on their own transaction history without being overwhelmed by platform-wide data." },
        { type: "images", keys: ["/decision3-before", "/decision3-after"] },
      ],
    },
    foundation: {
      title: "Laying Out The Foundation",
      body: "With no existing design system, brand guidelines, or visual precedent, the first step was building the foundation from scratch. I started by defining the core visual language — a color palette rooted in trust (deep teals and navy blues), a typography scale that balanced professionalism with readability, and a spacing system that could flex across dashboard-dense screens and marketing-light pages.\n\nThe component library was built modularly — every button, input, card, and table was designed as a reusable token-based element. This wasn't just about consistency; it was about speed. A fintech product in active development needs a design system that can keep up with engineering without sacrificing quality.\n\nThe information architecture was mapped around the two core user journeys: the SME owner applying for financing, and the investor reviewing portfolio performance. Each flow was wireframed independently, then stress-tested against edge cases — what happens when there's no data? When there are 50+ assets? When a payout fails? The foundation wasn't just visual. It was structural.",
      heroImage: "/mykapital-issuer",
      sideBySideImages: ["/mykapital-investor-1", "/mykapital-investor-2"],
    },
    results: {
      description: "A live product that stakeholders trust enough to put in front of clients.",
      metrics: [
        { label: "Metric 1", text: "Platform is live and actively used" },
        { label: "Metric 2", text: "Design used in client pitches and investor demos product secured real partnerships" },
        { label: "Metric 3", text: "Design system adopted by the engineering team no repeated design clarification requests after handoff" },
        { label: "Metric 4", text: "Rising Star Employee 2023 awarded in part due to quality of design contributions across this product" },
      ],
      ctaLabel: "Visit MyKapital.my",
      ctaLink: "https://mykapital.my",
    },
    reflection:
      "I built the brand without a formal approval structure, which meant some early decisions had to be revisited as stakeholders saw things in context for the first time. In hindsight, I'd establish a lightweight brand review checkpoint earlier not to slow down the process, but to surface misalignments before they become rework. I'd also push harder for user testing with real SME owners before the dashboard shipped, rather than relying on stakeholder feedback as a proxy for user feedback.",
    reflectionQuote: "Design System Is Important, Do Not Skip It",
  },
  {
    slug: "blockchaincert",
    title: "BlockchainCert.my",
    category: "Blockchain · Credentialing · Design System · Multi-user · UX Redesign",
    description:
      "A ground-up redesign of a blockchain credential platform turning a system that required internal team intervention for 4 in 5 users into one that anyone can use independently.",
    image: "/images/3a963058-aa49-45d8-af88-49c0e221eafe.png",
    tools: ["Figma", "Design System", "UX Research", "Multi-role Flows"],
    heroTitle: "When 80% of users can't self-serve, the design is the problem.",
    role: "UI / UX Designer , Web-Developer (Zero-Code)",
    services: "UI/UX Designer",
    timeline: "2023 – Present",
    overview:
      "BlockchainCert.my is a blockchain-backed credential verification platform institutions issue certificates, recipients receive and share them, and anyone can verify their authenticity on-chain.\n\nThe platform was built and launched. The problem emerged quickly: 80% of the time, clients could not onboard or complete core tasks without asking the internal team to do it for them.\n\nThis wasn't a feature problem. It was a design problem.\n\nThe system had been designed from a technical perspective it did what it needed to do, but it didn't communicate what users needed to know. Blockchain verification is already a foreign concept to most users. Add a confusing interface on top of that, and every step becomes a barrier.\n\nThe brief I gave myself: Redesign this system so that any user regardless of technical background can complete their task independently on the first try.",
    researchObjectives: [
      { title: "Objective 1", description: "Map the full journey for each user type and identify every step where a user would reasonably get confused, hesitate, or abandon." },
      { title: "Objective 2", description: "Understand what \"blockchain verification\" means to a non-technical user and what language, visual cues, and interaction patterns would make it feel safe and trustworthy rather than opaque and technical." },
      { title: "Objective 3", description: "Establish a design system that could serve four distinct user types issuers, recipients, public verifiers, and internal admins without fragmenting the experience or creating four separate products." },
    ],
    researchMethods: [
      "Stakeholder interviews understanding what the internal team was being asked to help with most often",
      "Task flow analysis mapping every step a user takes from landing to completion",
      "Heuristic evaluation identifying usability violations in the original interface",
      "Mental model research how do non-crypto users understand \"verification\" and \"credentials\"?",
    ],
    targetUsers: [
      {
        name: "The Institution (Issuer)",
        description: "A university, company, or training provider issuing certificates to recipients. Needs a straightforward bulk or individual issuance flow. Not necessarily tech-savvy. Needs confidence that certificates are being issued correctly and that recipients will be able to access them.",
      },
      {
        name: "The Certificate Recipient",
        description: "A graduate, employee, or course completionist receiving a blockchain-verified credential. Has no crypto knowledge. Needs to understand what they've received, why it's valuable, and how to share or present it without needing to understand the blockchain infrastructure behind it.",
      },
      {
        name: "The Public Verifier",
        description: "An employer, institution, or individual checking the authenticity of a certificate. Arrives with a link or QR code. Needs to know in seconds whether the certificate is real. No account, no technical knowledge, no patience for complexity.",
      },
      {
        name: "The Internal Admin",
        description: "MasChain team managing platform operations. Needs oversight tools, user management, and the ability to troubleshoot issues. Higher technical literacy. Needs efficiency over hand-holding.",
      },
    ],
    discovery: {
      headline: "Five compounding problems that made the platform unusable for most people.",
      problems: [
        { title: "Too many steps in the issuance flow", description: "The certificate issuance process had unnecessary friction at every stage. Steps that could be combined were separated. Required fields weren't clearly marked. Users didn't know where they were in the process or how many steps remained." },
        { title: "Verification page designed for engineers, not humans", description: "The verification result page displayed raw blockchain data hashes, contract addresses, timestamps in UTC with no translation for a normal user. An employer checking a certificate had no idea what they were looking at." },
        { title: "Blockchain concepts with no explanation", description: "Terms like \"on-chain verification,\" \"smart contract,\" and \"token-gated access\" appeared throughout the UI with no context. For a non-crypto user, these terms create doubt rather than confidence." },
        { title: "Role confusion - who does what?", description: "The navigation didn't clearly distinguish between what an issuer does and what a recipient does. Users landed in the wrong flows, got confused, and called for help." },
        { title: "No visual hierarchy - nothing told users what to do next", description: "Across every screen, all elements had roughly equal visual weight. There was no clear primary action, no obvious next step, no sense of progress. Users froze." },
      ],
    },
    designDecisions: {
      title: "Key Design Decisions",
      blocks: [
        { type: "text", content: "Decision 1 Separated Role-Based Entry Points\n\n**What I did:** Created a clear role selector at entry Issuer, Recipient, Verifier with plain language descriptions of what each role does. Users are routed into a flow designed specifically for their context from the first screen.\n\n**Why it mattered:** The original platform assumed users knew what role they were. Most didn't, especially recipients who had never used the platform before." },
        { type: "images", keys: ["/blockchaincert-decision1-1", "/blockchaincert-decision1-2"] },
        { type: "text", content: "Decision 2 Simplified Issuance Flow\n\n**What I did:** Reduced the issuance flow from a multi-page form into a stepped process with a visible progress indicator. Combined related fields. Removed unnecessary steps. Added inline validation so errors surface immediately rather than at submission.\n\n**Why it mattered:** Issuers often admin staff at universities needed to complete this task efficiently and repeatedly. Every unnecessary step was a compounding cost." },
        { type: "images", keys: ["/blockchaincert-decision2-1", "/blockchaincert-decision2-2", "/blockchaincert-decision2-3"] },
        { type: "text", content: "Decision 3 Human-Readable Verification Page\n\n**What I did:** Redesigned the verification result page to lead with a clear visual confirmation valid or invalid in plain language. Technical blockchain data is still accessible but collapsed by default under a \"View details\" toggle for users who want it.\n\n**Why it mattered:** A public verifier an employer checking a job applicant's certificate needs one answer: is this real? They don't need a blockchain transaction hash. Leading with the human answer and hiding the technical detail served both audiences without removing either." },
        { type: "images", keys: ["/blockchaincert-decision3-1", "/blockchaincert-decision3-2"] },
        { type: "text", content: "Decision 4 Contextual Language Throughout\n\n**What I did:** Audited every instance of technical blockchain terminology in the UI and replaced or supplemented it with plain language equivalents. Added tooltips and inline explainers for concepts that couldn't be simplified without losing meaning.\n\n**Why it mattered:** Trust in a verification platform is built through clarity. If a user doesn't understand what they're seeing, they don't trust it even if it's working perfectly." },
        { type: "text", content: "Decision 5 Visual Hierarchy Overhaul\n\n**What I did:** Established a clear visual hierarchy across every screen one primary action per screen, supporting information at reduced weight, status and progress indicators consistent throughout. Users always know what to do next.\n\n**Why it mattered:** This was the single biggest contributor to the 80% drop-off. Without a clear primary action, users stall. Visual hierarchy is the most basic form of user guidance and it was missing entirely." },
      ],
    },
    results: {
      description: "From \"call us for help\" to a system users navigate on their own.",
      metrics: [
        { label: "Metric 1", text: "Platform is live and actively used by institutions across Malaysia" },
        { label: "Metric 2", text: "Internal team intervention requests dropped significantly after redesign" },
        { label: "Metric 3", text: "Design system established consistent across 4 user roles and all platform states" },
        { label: "Metric 4", text: "Verification flow redesigned to be self-explanatory for zero-knowledge users" },
      ],
      ctaLabel: "Visit BlockchainCert.my",
      ctaLink: "https://blockchaincert.my",
    },
    reflection:
      "I would have pushed for a formal usability test with real recipients and verifiers before the first version shipped. The 80% drop-off was discovered through real usage which meant real users had a bad experience before we caught it. A moderated usability session with 5 representative users per role would have surfaced most of these issues before launch. The lesson: stakeholder sign-off is not a substitute for user testing, even when timeline pressure is high.",
    reflectionQuote: "Stakeholder sign-off is not a substitute for user testing.",
  },
  {
    slug: "maswallet",
    title: "MasWallet",
    category: "Crypto Wallet · Mobile · Web3 · Concept Work · Product Design",
    description:
      "A concept-to-handoff product design for MasChain's native cryptocurrency wallet — web and mobile — built ahead of engineering engagement to establish product vision, user flows, and interface direction.",
    image: "/images/e84efcbf-9128-44ba-8b54-4e51e221a1e6.png",
    tools: ["Crypto Wallet", "Mobile", "Web3", "Concept Work", "Product Design"],
    heroTitle: "MOST CRYPTO WALLETS ARE BUILT FOR PEOPLE WHO ALREADY UNDERSTAND CRYPTO. MASWALLET COULDN'T BE.",
    role: "UI / UX DESIGN · Concept · System Architecture · Web & Mobile UI",
    services: "UI / UX DESIGN",
    timeline: "2024 · Concept / Pre-engineering",
    overview:
      "MasChain's ecosystem products MyKapital, BlockchainCert, E-Wakalah all touch the blockchain. A native wallet was the missing infrastructure piece that would connect a user's activity across the entire platform.\n\nThe problem: MasChain's users are not crypto-native. They are SME owners, graduates, professionals people who interact with blockchain-backed products without necessarily knowing or caring about the underlying technology.\n\nA wallet designed like MetaMask or Trust Wallet would fail this audience immediately. The design brief was essentially: build a wallet that feels as familiar as a banking app, while being capable of everything a blockchain wallet needs to do.\n\n\n\n\n",
    researchObjectives: [
      { title: "Question 1", description: "How do you present a wallet address without making users feel like they're doing something technical?" },
      { title: "Question 2", description: "How do you communicate transaction status on a blockchain without using blockchain language?" },
      { title: "Question 3", description: "How do you handle the irreversibility of blockchain transactions in a UI without creating anxiety?" },
    ],
    targetUsers: [
      {
        name: "MasChain Ecosystem Participant",
        description: "Someone already using MyKapital, BlockchainCert, or another MasChain product who needs a wallet to complete transactions within that ecosystem. Not crypto-native. SME owners, graduates, professionals who interact with blockchain-backed products without necessarily knowing or caring about the underlying technology.",
      },
      {
        name: "Mental Model: Banking, Not Crypto",
        description: "They expect to see a balance, send money, receive money, and see their transaction history. They do not expect to manage gas fees, import seed phrases, or understand token standards. The design implication: every pattern borrowed from familiar banking UX where possible — blockchain-specific concepts introduced only when unavoidable, always with plain-language framing.",
      },
    ],
    discovery: {
      headline: "Most crypto wallets are built for people who already understand crypto. MasWallet couldn't be.",
      problems: [
        { title: "Wallet addresses feel technical", description: "Long hexadecimal strings make users feel like they're operating infrastructure, not using a product. The design needed to surface addresses only when necessary, and frame them as something familiar — like an account number." },
        { title: "Blockchain transaction states don't match expectations", description: "Pending, confirmed, failed — these states are foreign to anyone whose mental model is a banking app. Users expect 'Sending,' 'Sent,' or 'Failed — tap to retry,' not block confirmations and gas estimates." },
        { title: "Irreversibility creates anxiety", description: "Send the wrong amount or wrong address on a blockchain and it's gone. The UI had to create deliberate friction at the right moments without making the entire flow feel hostile or scary." },
      ],
    },
    designDecisions: {
      title: "Key Design Decisions",
      blocks: [
        { type: "text", content: "Decision 1 Familiar balance-first layout\n\nThe home screen leads with total balance in Malaysian Ringgit equivalent — not token amounts. Users see what they have in a currency they understand. Token details are accessible but secondary." },
        { type: "images", keys: ["/maswallet-decision1"] },
        { type: "text", content: "Decision 2 Send and Receive as primary actions\n\nTwo actions dominate the home screen: Send and Receive. Everything else is secondary. Mirrors the mental model of every banking app users already know." },
        { type: "images", keys: ["/maswallet-decision2"] },
        { type: "text", content: "Decision 3 Transaction status in plain language\n\nBlockchain transactions have states — pending, confirmed, failed — that don't map neatly to what users expect. I designed status indicators using plain language (\"Sending,\" \"Sent,\" \"Failed — tap to retry\") with no technical blockchain terminology visible by default." },
        { type: "images", keys: ["/maswallet-decision3"] },
        { type: "text", content: "Decision 4 Cross-platform consistency\n\nWeb and mobile versions share the same design system and component library. Users moving between devices encounter the same visual language, interactions, and information hierarchy." },
      ],
    },
    results: {
      description: "A full product design foundation delivered before engineering began — giving the development team a clear interface direction, user flow documentation, and component library to build from.",
      metrics: [
        { label: "Deliverable", text: "Full design foundation with user flows and component library" },
        { label: "Platform Coverage", text: "Web and mobile designs with a shared design system" },
        { label: "Approach", text: "Banking-familiar UX validated against conventional crypto wallet patterns" },
        { label: "Status", text: "Concept / Pre-engineering — ready for development handoff" },
      ],
      ctaLabel: "Coming Soon",
      ctaLink: "#",
    },
    reflection:
      "Design questions I had to answer:\n\n\nHow do you present a wallet address without making users feel like they're doing something technical?\nHow do you communicate transaction status on a blockchain without using blockchain language?\nHow do you handle the irreversibility of blockchain transactions in a UI without creating anxiety?",
    reflectionQuote: "Make crypto feel like banking, not the other way around.",
  },
];
