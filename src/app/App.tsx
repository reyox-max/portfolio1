import { useState, useEffect, useRef, Fragment } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import imgMyPhoto from "../imports/WireFrame1/4bee8ea707911a7c5ddabec7459e8419332649a6.png";
import imgImage26 from "../imports/WireFrame1/2d5f6859772646b5d6fe391e16fb095f148bdb9f.png";
import imgAvatar from "../imports/WireFrame1/29adb11435ba6cee5696c0600ef5388fcfe91004.png";

// ─── Background Glows ────────────────────────────────────────────────────────

function GlowBlob({
  className,
  color,
  blur,
  size,
}: {
  className: string;
  color: string;
  blur: number;
  size: number;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity: 0.85,
      }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const links = ["Home", "About", "Works", "Journey", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#0a1024]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* logo */}
          <a
            href="#home"
            onClick={() => setActive("home")}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#7f7cff]">
              <img src={imgAvatar} alt="RG" className="w-full h-full object-cover" />
            </div>
            <span
              className="text-[#f4f4ff] font-bold hidden sm:block"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              ROSHAN<span className="text-[#7f7cff]">.</span>
            </span>
          </a>

          {/* desktop links — centered pill */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-2 py-1.5 gap-1">
            {links.map((l) => {
              const id = l.toLowerCase();
              const isActive = active === id;
              return (
                <a
                  key={l}
                  href={`#${id}`}
                  onClick={() => setActive(id)}
                  className={`relative px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 font-['Montserrat',sans-serif] ${
                    isActive
                      ? "bg-[#7f7cff] text-white shadow-md shadow-[#7f7cff]/30"
                      : "text-[#f4f4ff]/70 hover:text-[#f4f4ff]"
                  }`}
                >
                  {l}
                </a>
              );
            })}
          </div>

          {/* right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => setActive("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#7f7cff] hover:bg-[#6a67ee] text-white font-['Montserrat',sans-serif] font-semibold text-sm rounded-full px-5 py-2 transition-colors shadow-md shadow-[#7f7cff]/25"
            >
              Hire Me
            </a>
            {/* mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md"
              aria-label="Toggle menu"
            >
              <span className={`block w-4 h-0.5 bg-[#f4f4ff] rounded-full transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-4 h-0.5 bg-[#f4f4ff] rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 bg-[#f4f4ff] rounded-full transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mt-2 mb-1 bg-[#0a1024]/90 backdrop-blur-xl border border-white/10 rounded-2xl py-3 flex flex-col">
            {links.map((l) => {
              const id = l.toLowerCase();
              return (
                <a
                  key={l}
                  href={`#${id}`}
                  onClick={() => { setActive(id); setMobileOpen(false); }}
                  className={`px-5 py-3 font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${
                    active === id ? "text-[#7f7cff]" : "text-[#f4f4ff]/70 hover:text-[#f4f4ff]"
                  }`}
                >
                  {l}
                </a>
              );
            })}
            <div className="px-4 pt-2">
              <a
                href="#contact"
                onClick={() => { setActive("contact"); setMobileOpen(false); }}
                className="block text-center bg-[#7f7cff] text-white font-['Montserrat',sans-serif] font-semibold text-sm rounded-full py-2.5 hover:bg-[#6a67ee] transition-colors"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0a1024] overflow-hidden flex flex-col"
    >
      {/* ── layer 0: glow blobs ── */}
      <GlowBlob className="-left-24 -top-24 sm:-left-40 sm:-top-32" color="#2F2E5B" blur={120} size={500} />
      <GlowBlob className="left-1/2 -translate-x-1/2 top-1/4" color="#310B60" blur={90} size={700} />
      <GlowBlob className="right-0 top-[-10%]" color="#2F2E5B" blur={80} size={400} />

      {/* ── layer 0: decorative faint pattern image ── */}
      <div className="absolute right-[-5%] top-[-5%] w-[40vw] max-w-[420px] opacity-10 pointer-events-none rotate-12 hidden sm:block">
        <img src={imgImage26} alt="" className="w-full h-full object-cover" />
      </div>

      {/* ── layer 1: BIG text — sits BEHIND the photo (z-0) ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
        style={{ paddingTop: "4rem" }}
      >
        <p
          className="text-[#f4f4ff] leading-none text-center"
          style={{
            fontFamily: "'Kaushan Script', cursive",
            fontSize: "clamp(3rem, 12vw, 12rem)",
            marginBottom: "clamp(-0.5rem, -2vw, -3rem)",
          }}
        >
          Roshan Giri
        </p>
        <p
          className="text-[#f4f4ff] font-bold leading-none text-center"
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: "clamp(2.5rem, 13vw, 14rem)",
          }}
        >
          PORTFOLIO
        </p>
      </div>

      {/* ── layer 2: photo + flanking cards — on top of text (z-10) ── */}
      <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-end justify-center gap-5 sm:gap-6 px-4 pt-28 sm:pt-32 pb-10 max-w-6xl mx-auto w-full">

        {/* intro card — left */}
        <div className="order-2 sm:order-1 w-full sm:w-64 lg:w-72 shrink-0 self-end sm:mb-6">
          <div className="bg-[#f4f4ff] rounded-2xl p-5 flex flex-col gap-4 shadow-xl shadow-black/30">
            <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm leading-relaxed">
              A passionate creative developer and designer crafting engaging
              digital experiences that blend clean code with thoughtful design.
            </p>
            <div className="flex gap-3">
              <a
                href="#contact"
                className="bg-[#7f7cff] text-white font-['Montserrat',sans-serif] font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-[#6a67ee] transition-colors shadow-md shadow-[#7f7cff]/30"
              >
                Hire Me
              </a>
              <a
                href="#works"
                className="border border-[#0a1024] text-[#0a1024] font-['Montserrat',sans-serif] font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-[#0a1024] hover:text-white transition-colors"
              >
                Works
              </a>
            </div>
          </div>
        </div>

        {/* photo — center, tallest, on top of the text */}
        <div className="order-1 sm:order-2 shrink-0 w-[220px] sm:w-[300px] lg:w-[380px]">
          <img
            src={imgMyPhoto}
            alt="Roshan Giri"
            className="w-full rounded-2xl object-cover object-top shadow-2xl shadow-black/50"
            style={{ maxHeight: "520px" }}
          />
        </div>

        {/* decorative stacked card — right */}
        <div className="order-3 hidden sm:block w-64 lg:w-72 shrink-0 self-end sm:mb-6">
          <div className="relative h-44">
            <div className="absolute inset-0 translate-y-3 translate-x-3 bg-[#e6e6ea] rounded-2xl opacity-20" />
            <div className="absolute inset-0 translate-y-1.5 translate-x-1.5 bg-[#e6e6ea] rounded-2xl opacity-60" />
            <div className="absolute inset-0 bg-[#f4f4ff] rounded-2xl shadow-xl shadow-black/20 flex flex-col items-center justify-center gap-2">
              <span className="text-[#7f7cff] font-bold text-2xl" style={{ fontFamily: "'Unbounded', sans-serif" }}>3+</span>
              <span className="text-[#0a1024]/60 font-['Montserrat',sans-serif] text-xs font-medium uppercase tracking-wider">Years of Experience</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── About / Introduction Section ─────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="bg-[#f4f4ff] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 rounded-t-[2rem] sm:rounded-t-[3rem]">
      <div className="max-w-5xl mx-auto">
        {/* heading */}
        <div className="mb-10">
          <h2
            className="text-[#0a1024] font-bold leading-tight"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
            }}
          >
            Introduction
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span
              className="text-[#0a1024] font-bold"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              }}
            >
              About Me
            </span>
            <div className="h-2.5 bg-[#7f7cff] rounded-full flex-1 max-w-[180px]" />
          </div>
        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {/* purple card placeholder */}
          <div className="bg-[#bbbbf6] rounded-2xl h-64 sm:h-80 lg:h-96 w-full" />

          {/* bio text */}
          <div className="flex flex-col gap-5">
            <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm sm:text-base leading-relaxed">
              Hi there! I&apos;m <strong>Roshan Giri</strong>, a passionate
              creative developer and designer based in Nepal. I craft engaging
              digital experiences that blend clean code with thoughtful design.
            </p>
            <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm sm:text-base leading-relaxed opacity-80">
              With a keen eye for aesthetics and a love for problem-solving, I
              specialize in building modern websites and interactive interfaces.
              My workflow bridges the gap between design and development —
              turning wireframes into pixel-perfect, responsive realities.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { label: "Projects", value: "20+" },
                { label: "Experience", value: "3 Yrs" },
                { label: "Clients", value: "15+" },
                { label: "Awards", value: "5" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
                  <p
                    className="text-[#7f7cff] font-bold"
                    style={{
                      fontFamily: "'Unbounded', sans-serif",
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm opacity-70 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Works Section ────────────────────────────────────────────────────────────

function Works() {
  const projects = [
    { title: "Brand Identity", tag: "Design", bg: "#bbbbf6" },
    { title: "E-Commerce UI", tag: "Development", bg: "#c8c7ff" },
    { title: "Mobile App", tag: "Design & Dev", bg: "#b0aff5" },
  ];
  return (
    <section id="works" className="bg-[#0a1024] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 relative overflow-hidden">
      <GlowBlob className="right-0 bottom-0" color="#310B60" blur={100} size={500} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <h2
            className="text-[#f4f4ff] font-bold leading-tight"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
            }}
          >
            My Works
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span
              className="text-[#f4f4ff] font-bold"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              }}
            >
              Selected Projects
            </span>
            <div className="h-2.5 bg-[#7f7cff] rounded-full flex-1 max-w-[180px]" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: p.bg }}
            >
              <div className="h-48 sm:h-56" />
              <div className="bg-[#f4f4ff] p-4 flex items-center justify-between">
                <div>
                  <p
                    className="text-[#0a1024] font-bold text-sm"
                    style={{ fontFamily: "'Unbounded', sans-serif" }}
                  >
                    {p.title}
                  </p>
                  <p className="text-[#7f7cff] font-['Montserrat',sans-serif] text-xs mt-0.5">
                    {p.tag}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#7f7cff] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Journey Section ──────────────────────────────────────────────────────────

const journeyMilestones = [
  {
    year: "2019",
    side: "left" as const,
    title: "First Line of Code",
    desc: "Started with HTML & CSS, building simple pages and discovering a deep passion for crafting digital experiences from scratch.",
    icon: "💻",
  },
  {
    year: "2020",
    side: "right" as const,
    title: "First Freelance Project",
    desc: "Landed a real client, delivered a full business website, and learned what it truly means to create for people, not just for practice.",
    icon: "🚀",
  },
  {
    year: "2021",
    side: "left" as const,
    title: "UI / UX Deep Dive",
    desc: "Fell in love with Figma and design systems. Started seeing every screen as a conversation between the user and the interface.",
    icon: "🎨",
  },
  {
    year: "2022",
    side: "right" as const,
    title: "Full-Stack Development",
    desc: "Pushed beyond the frontend — Node.js, databases, REST APIs. Became the bridge between design vision and backend reality.",
    icon: "⚙️",
  },
  {
    year: "2023",
    side: "left" as const,
    title: "Agency Collaboration",
    desc: "Partnered with leading design studios on large-scale projects, sharpening craft across fintech, e-commerce, and SaaS.",
    icon: "🏢",
  },
  {
    year: "2024",
    side: "right" as const,
    title: "Going Independent",
    desc: "Launched as a freelance creative developer, building bespoke digital products for clients across Nepal and beyond.",
    icon: "🌏",
  },
];

// S-curve path through a 60×720 viewBox.
// Nodes are at y = 60, 180, 300, 420, 540, 660 — each exactly 1/12 into each
// 120-unit row (rows span 0-120, 120-240 … 600-720).
// With preserveAspectRatio="xMidYMid none" and a grid where every row is
// min-h-[120px], the rendered height = 6 × 120 = 720 px which matches the
// viewBox 1:1 — so dots land exactly at row midpoints.
const JOURNEY_PATH = [
  "M 30 0",
  "C 30 30 15 48 15 60",       // → node 1 left  (y=60,  row 0 mid)
  "C 15 72 30 108 30 120",
  "C 30 150 45 168 45 180",    // → node 2 right (y=180, row 1 mid)
  "C 45 192 30 228 30 240",
  "C 30 270 15 288 15 300",    // → node 3 left  (y=300, row 2 mid)
  "C 15 312 30 348 30 360",
  "C 30 390 45 408 45 420",    // → node 4 right (y=420, row 3 mid)
  "C 45 432 30 468 30 480",
  "C 30 510 15 528 15 540",    // → node 5 left  (y=540, row 4 mid)
  "C 15 552 30 588 30 600",
  "C 30 630 45 648 45 660",    // → node 6 right (y=660, row 5 mid)
  "C 45 672 30 708 30 720",
].join(" ");

// [cx, cy] for each node, matching the path's S-curve turning points
const DOT_XY: [number, number][] = [
  [15, 60],
  [45, 180],
  [15, 300],
  [45, 420],
  [15, 540],
  [45, 660],
];

// scroll-progress thresholds at which each dot should pop in
const DOT_AT = [0.083, 0.25, 0.417, 0.583, 0.75, 0.917];

function JourneyCard({
  milestone,
}: {
  milestone: (typeof journeyMilestones)[0];
}) {
  const isLeft = milestone.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isLeft ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`relative bg-white/5 border border-white/10 rounded-2xl p-5 w-full max-w-[300px] ${
          isLeft ? "mr-5" : "ml-5"
        }`}
      >
        {/* year badge */}
        <span
          className="inline-block bg-[#7f7cff]/20 text-[#7f7cff] text-[0.65rem] font-bold tracking-[0.15em] uppercase rounded-full px-3 py-1 mb-3"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          {milestone.year}
        </span>
        <div className="flex items-start gap-2.5">
          <span className="text-lg mt-0.5 shrink-0">{milestone.icon}</span>
          <div>
            <h3
              className="text-[#f4f4ff] font-bold mb-1.5 leading-snug"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.8rem" }}
            >
              {milestone.title}
            </h3>
            <p className="text-[#f4f4ff]/55 font-['Montserrat',sans-serif] text-[0.8rem] leading-relaxed">
              {milestone.desc}
            </p>
          </div>
        </div>
        {/* connector pip facing the path */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#7f7cff] ring-2 ring-[#7f7cff]/30 ${
            isLeft ? "-right-[1.625rem]" : "-left-[1.625rem]"
          }`}
        />
      </div>
    </motion.div>
  );
}

function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.15"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // dot opacities — one useTransform per dot (hooks can't be in a loop)
  const d0 = useTransform(pathLength, [DOT_AT[0] - 0.04, DOT_AT[0] + 0.04], [0, 1]);
  const d1 = useTransform(pathLength, [DOT_AT[1] - 0.04, DOT_AT[1] + 0.04], [0, 1]);
  const d2 = useTransform(pathLength, [DOT_AT[2] - 0.04, DOT_AT[2] + 0.04], [0, 1]);
  const d3 = useTransform(pathLength, [DOT_AT[3] - 0.04, DOT_AT[3] + 0.04], [0, 1]);
  const d4 = useTransform(pathLength, [DOT_AT[4] - 0.04, DOT_AT[4] + 0.04], [0, 1]);
  const d5 = useTransform(pathLength, [DOT_AT[5] - 0.04, DOT_AT[5] + 0.04], [0, 1]);
  const dotOpacities = [d0, d1, d2, d3, d4, d5];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden px-4 sm:px-8 lg:px-16 py-16 sm:py-24"
      style={{ background: "linear-gradient(180deg, #0d1230 0%, #0a1024 100%)" }}
    >
      {/* top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7f7cff]/40 to-transparent" />
      <GlowBlob className="left-0 top-1/3" color="#2F2E5B" blur={110} size={600} />
      <GlowBlob className="right-0 bottom-1/4" color="#310B60" blur={100} size={500} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* heading */}
        <div className="mb-12 sm:mb-16">
          <h2
            className="text-[#f4f4ff] font-bold leading-tight"
            style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            My Journey
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span
              className="text-[#f4f4ff] font-bold"
              style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)" }}
            >
              Timeline
            </span>
            <div className="h-2.5 bg-[#7f7cff] rounded-full flex-1 max-w-[180px]" />
          </div>
        </div>

        {/* ── Desktop timeline (sm+) ── */}
        <div className="hidden sm:block relative">
          {/* SVG path — absolute overlay in the center 56 px column */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-14 pointer-events-none">
            <svg
              viewBox="0 0 60 720"
              preserveAspectRatio="xMidYMid none"
              className="w-full h-full"
              fill="none"
            >
              {/* ghost trail */}
              <path d={JOURNEY_PATH} stroke="#7f7cff" strokeWidth="1.5" strokeOpacity="0.12" />
              {/* animated draw */}
              <motion.path
                d={JOURNEY_PATH}
                stroke="url(#pathGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              {/* glow duplicate */}
              <motion.path
                d={JOURNEY_PATH}
                stroke="#7f7cff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeOpacity="0.15"
                style={{ pathLength }}
              />
              {/* dot rings + fills */}
              {DOT_XY.map(([cx, cy], i) => (
                <Fragment key={i}>
                  <motion.circle cx={cx} cy={cy} r="11" fill="none" stroke="#7f7cff" strokeWidth="1" strokeOpacity="0.4" style={{ opacity: dotOpacities[i] }} />
                  <motion.circle cx={cx} cy={cy} r="6" fill="#7f7cff" style={{ opacity: dotOpacities[i] }} />
                  <motion.circle cx={cx} cy={cy} r="3" fill="#f4f4ff" style={{ opacity: dotOpacities[i] }} />
                </Fragment>
              ))}
              {/* gradient definition */}
              <defs>
                <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bbbbf6" />
                  <stop offset="100%" stopColor="#7f7cff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Grid rows — 3 cols: [left-cards] [56px center] [right-cards] */}
          <div className="grid grid-cols-[1fr_56px_1fr]">
            {journeyMilestones.map((m, i) => (
              <Fragment key={i}>
                {/* left cell */}
                <div className="min-h-[120px] flex items-center">
                  {m.side === "left" && <JourneyCard milestone={m} />}
                </div>
                {/* center spacer — path SVG is the absolute overlay */}
                <div className="min-h-[120px]" />
                {/* right cell */}
                <div className="min-h-[120px] flex items-center">
                  {m.side === "right" && <JourneyCard milestone={m} />}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* ── Mobile timeline (single column) ── */}
        <div className="sm:hidden flex flex-col gap-5 relative pl-8">
          {/* vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#7f7cff]/20 rounded-full" />
          {journeyMilestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* dot on line */}
              <div className="absolute -left-[1.6rem] top-5 w-3 h-3 rounded-full bg-[#7f7cff] ring-2 ring-[#7f7cff]/30" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <span
                  className="inline-block bg-[#7f7cff]/20 text-[#7f7cff] text-[0.65rem] font-bold tracking-[0.15em] uppercase rounded-full px-3 py-1 mb-3"
                  style={{ fontFamily: "'Unbounded', sans-serif" }}
                >
                  {m.year}
                </span>
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5 shrink-0">{m.icon}</span>
                  <div>
                    <h3
                      className="text-[#f4f4ff] font-bold mb-1.5 leading-snug"
                      style={{ fontFamily: "'Unbounded', sans-serif", fontSize: "0.8rem" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-[#f4f4ff]/55 font-['Montserrat',sans-serif] text-[0.8rem] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="bg-[#f4f4ff] px-4 sm:px-8 lg:px-16 py-16 sm:py-24 rounded-t-[2rem] sm:rounded-t-[3rem]">
      <div className="max-w-5xl mx-auto">
        {/* heading */}
        <div className="mb-10">
          <h2
            className="text-[#0a1024] font-bold leading-tight"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
            }}
          >
            Contact
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span
              className="text-[#0a1024] font-bold"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
              }}
            >
              Get In Touch
            </span>
            <div className="h-2.5 bg-[#7f7cff] rounded-full flex-1 max-w-[180px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* left — info */}
          <div className="flex flex-col gap-6">
            <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm sm:text-base leading-relaxed opacity-80">
              Have a project in mind or just want to say hello? Feel free to
              reach out — I&apos;m always open to new opportunities and
              collaborations.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "✉", label: "Email", value: "roshan@example.com" },
                { icon: "📍", label: "Location", value: "Kathmandu, Nepal" },
                { icon: "📞", label: "Phone", value: "+977 98XXXXXXXX" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="text-[#7f7cff] font-['Montserrat',sans-serif] font-semibold text-xs uppercase tracking-wide">
                      {c.label}
                    </p>
                    <p className="text-[#0a1024] font-['Montserrat',sans-serif] text-sm mt-0.5">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-white border border-[#bbbbf6] rounded-xl px-5 py-3.5 text-[#0a1024] font-['Montserrat',sans-serif] text-sm placeholder:text-[#0a1024]/40 focus:outline-none focus:ring-2 focus:ring-[#7f7cff] transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-white border border-[#bbbbf6] rounded-xl px-5 py-3.5 text-[#0a1024] font-['Montserrat',sans-serif] text-sm placeholder:text-[#0a1024]/40 focus:outline-none focus:ring-2 focus:ring-[#7f7cff] transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="bg-white border border-[#bbbbf6] rounded-xl px-5 py-3.5 text-[#0a1024] font-['Montserrat',sans-serif] text-sm placeholder:text-[#0a1024]/40 focus:outline-none focus:ring-2 focus:ring-[#7f7cff] transition-all resize-none"
            />
            <button
              type="submit"
              className="bg-[#7f7cff] text-white font-['Montserrat',sans-serif] font-semibold text-sm rounded-full py-3.5 hover:bg-[#6a67ee] transition-colors"
            >
              {sent ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0a1024] py-8 px-4 text-center">
      <p
        className="text-[#f4f4ff]/40 font-['Montserrat',sans-serif] text-xs"
      >
        © {new Date().getFullYear()} Roshan Giri. All rights reserved.
      </p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
}
