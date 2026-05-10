"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const narrativeSections = [
  {
    label: "Our Story",
    index: "01",
    title:
      "The idea started with a familiar frustration: businesses were working hard, but their financial picture was still arriving too late.",
    body: "Accurizon grew out of that gap. Founders were building, hiring, selling, and expanding, yet the systems behind the numbers often remained scattered, delayed, and difficult to trust. We chose to build something steadier — not just a service that records activity, but a financial operating rhythm that helps leaders understand what is happening, what needs attention, and where they can move next with confidence.",
  },
  {
    label: "Our Mission",
    index: "02",
    title:
      "We exist to turn financial operations into a source of clarity rather than pressure.",
    body: "That means bringing order to the details without losing sight of the people behind the business. The goal is not simply accuracy on paper. The goal is helping decision-makers feel calmer, faster, and more in control because the numbers beneath the business are finally structured in a way that supports movement.",
  },
  {
    label: "Our Vision",
    index: "03",
    title:
      "We are building for a world where businesses operate across borders without losing operational clarity.",
    body: "The future of finance support is not local-only and it is not generic. It has to understand precision at ground level while supporting ambition at a wider scale. We want Accurizon to be the kind of partner that remains dependable whether a business is managing one geography or expanding into several.",
  },
  {
    label: "Our Approach",
    index: "04",
    title:
      "We listen first, simplify second, and then build systems strong enough to stay useful as the company grows.",
    body: "Every business has its own pace, its own friction points, and its own reporting habits. Our work begins by understanding how the operation really behaves. From there we remove confusion, tighten the flow, and create dependable financial routines that feel clear to leadership and sustainable for the long term.",
  },
];

const principles = [
  "Clear books, clear reporting, clear direction.",
  "Founder-minded communication, not finance jargon for its own sake.",
  "Processes designed to scale across teams, timelines, and regions.",
];

const mapMarkers = [
  { cx: 185, cy: 268, label: "North America" },
  { cx: 558, cy: 286, label: "Middle East" },
  { cx: 745, cy: 342, label: "APAC" },
  { cx: 275, cy: 408, label: "South America" },
  { cx: 792, cy: 450, label: "Australia" },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="bg-[var(--color-canvas)] text-[#111111]">
      <Navbar />

      {/* ── HERO / FOUNDER SECTION ── */}
      <section className="px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* top small label */}
          <div className="mb-10">
            <p className="text-[22px] text-black/40">• Team</p>
          </div>

          {/* heading */}
          <div className="w-[90vw]">
            <h1 className="font-[var(--font-rethink3)] italic text-[3.5rem] leading-[0.94] tracking-[-0.065em] text-[#111]">
              <span className="block pl-[30vw]">
                Our team of financial professionals
              </span>
              <span className="block">
                is committed to helping businesses build organized,
                <span className="block font-normal">
                  reliable financial operations.
                </span>
              </span>
            </h1>
          </div>

          {/* lower layout — Founder block */}
          <div className="mt-28 grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1fr_0.7fr] lg:items-start">
            {/* left */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="font-[var(--font-rethink3)] text-[4rem] leading-[0.82] tracking-[-0.06em] text-[#111]">
                  <span className="font-serif italic font-normal text-[3.2rem]">
                    Founder
                  </span>
                  <br />
                  Ujjwal
                </h2>
                <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.12em] text-black/45">
                  Founder &amp; Financial Systems Strategist
                </p>
              </div>
              <div className="mt-24">
                <p className="text-[11px] uppercase tracking-[0.18em] text-black/35">
                  (Focus Areas)
                </p>
                <div className="mt-4 flex flex-wrap gap-6 text-[13px] text-black/55">
                  <span>Bookkeeping</span>
                  <span>Financial Reporting</span>
                  <span>Operational Clarity</span>
                </div>
              </div>
            </div>

            {/* center image */}
            <div className="flex justify-center">
              <div className="relative h-[520px] w-full max-w-[430px] overflow-hidden rounded-[2rem] bg-[#e9e5dd]">
                <Image
                  src="/images.jpeg"
                  alt="Founder Ujjwal"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* right */}
            <div className="flex h-full flex-col justify-between">
              <div className="max-w-[260px]">
                <p className="text-[15px] leading-[1.7] text-black/55">
                  Ujjwal focuses on building structured financial systems that
                  help businesses stay organized, informed, and ready for
                  growth. His approach combines operational clarity with
                  dependable reporting designed for modern businesses.
                </p>
              </div>
              <div className="mt-24 flex items-center justify-between">
                <span className="text-sm text-black/40">1/5</span>
                <button className="flex h-[88px] w-[88px] items-center justify-center rounded-full border border-black/20 transition-all duration-300 hover:bg-black hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NARRATIVE SECTIONS — editorial grid ── */}
      <section className="px-6 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1320px]">

          {/* Header row */}
          <div className="mb-12 flex items-center justify-between border-b border-black/8 pb-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/36">
              What Guides Us
            </p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-black/22">
              04 Principles
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-0">
            {narrativeSections.map((section, index) => (
              <div
                key={section.label}
                className="group relative grid border-b border-black/8 py-12 transition-colors duration-300 hover:bg-black/[0.015] lg:grid-cols-[0.38fr_0.62fr]"
              >
                {/* Left col — label + number */}
                <div className="flex flex-col justify-between pr-10 mb-8 lg:mb-0">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-blue-500)]">
                      {section.label}
                    </p>
                    {/* Large ghost number */}
                    <p
                      className="mt-4 select-none font-[var(--font-mont-ex)] text-[6rem] leading-none tracking-[-0.08em] transition-colors duration-300"
                      style={{ color: "rgba(0,0,0,0.04)" }}
                    >
                      {section.index}
                    </p>
                  </div>

                  {/* Accent line that grows on hover */}
                  <div className="mt-6 h-px w-0 bg-[var(--color-blue-500)] transition-all duration-500 group-hover:w-16" />
                </div>

                {/* Right col — title + body */}
                <div>
                  <h2 className="font-[var(--font-mont-ex)] text-[clamp(1.75rem,3vw,3.2rem)] leading-[1.02] tracking-[-0.05em] text-[#0d0d0d]">
                    {section.title}
                  </h2>
                  <p className="mt-6 max-w-[580px] text-[1.02rem] leading-[1.9] text-black/52">
                    {section.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES + VISUAL BREAK ── */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            {/* Left */}
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/38">
                How It Feels In Practice
              </p>
              <h2 className="mt-6 max-w-2xl font-[var(--font-mont-ex)] text-[clamp(2rem,3.8vw,4rem)] leading-[0.95] tracking-[-0.055em] text-[#101010]">
                Less noise. Better rhythm. More confidence.
              </h2>
              <div className="mt-10 space-y-5">
                {principles.map((point) => (
                  <p
                    key={point}
                    className="max-w-xl text-[1.02rem] leading-[1.85] text-black/58 flex items-start gap-3"
                  >
                    <span className="mt-2.5 block h-1 w-4 shrink-0 rounded-full bg-[var(--color-blue-500)]" />
                    {point}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — editorial visual card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[#f5f3ef] min-h-[400px]">
              {/* Subtle dot grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-blue-50/40" />

              {/* Floating stat cards */}
              <div className="relative flex h-full min-h-[400px] flex-col items-center justify-center gap-6 p-10">
                {[
                  { value: "100%", label: "Remote-first delivery" },
                  { value: "48h", label: "Average first-report turnaround" },
                  { value: "5+", label: "Years of operational experience" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="w-full max-w-[340px] rounded-2xl border border-black/6 bg-white/80 px-6 py-5 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.05)] flex items-center justify-between"
                  >
                    <p className="text-[0.78rem] leading-[1.5] text-black/52 max-w-[180px]">
                      {stat.label}
                    </p>
                    <p className="font-[var(--font-mont-ex)] text-[2.4rem] leading-none tracking-[-0.05em] text-[#0d0d0d]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION — 80vw × 70vh centered card ── */}
      <section className="flex justify-center py-16 md:py-24">
        <div className="relative w-[80vw] h-[70vh] rounded-[2.6rem] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.32)] overflow-hidden">

          {/* Map image — padded, fills naturally */}
          <div className="absolute inset-3 rounded-[1.8rem] overflow-hidden">
            <Image
              src="/map.png"
              alt="Global map"
              fill
              className="object-cover object-center"
              style={{ opacity: 0.34, filter: "saturate(0) brightness(1.2)" }}
            />

            {/* SVG overlay — aligned with object-cover */}
            <svg
              viewBox="0 0 1000 620"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="routeGlowMap" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(96,165,250,0)" />
                  <stop offset="50%" stopColor="rgba(147,197,253,0.9)" />
                  <stop offset="100%" stopColor="rgba(96,165,250,0)" />
                </linearGradient>
                <filter id="glowMap">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Arc: North America → Middle East */}
              <path id="mapArc1" d="M185 268 C 310 140, 450 140, 558 286"
                fill="none" stroke="url(#routeGlowMap)" strokeWidth="2.2"
                strokeDasharray="14 10" opacity="0.85" filter="url(#glowMap)">
                <animate attributeName="stroke-dashoffset" from="160" to="0" dur="4.2s" repeatCount="indefinite" />
              </path>
              {/* Arc: Middle East → APAC */}
              <path id="mapArc2" d="M558 286 C 640 230, 710 250, 745 342"
                fill="none" stroke="url(#routeGlowMap)" strokeWidth="2.2"
                strokeDasharray="14 10" opacity="0.85" filter="url(#glowMap)">
                <animate attributeName="stroke-dashoffset" from="160" to="0" dur="4.9s" repeatCount="indefinite" />
              </path>
              {/* Arc: APAC → Australia */}
              <path id="mapArc3" d="M745 342 C 770 390, 788 418, 792 450"
                fill="none" stroke="url(#routeGlowMap)" strokeWidth="2.2"
                strokeDasharray="14 10" opacity="0.8" filter="url(#glowMap)">
                <animate attributeName="stroke-dashoffset" from="160" to="0" dur="5.6s" repeatCount="indefinite" />
              </path>
              {/* Arc: North America → South America */}
              <path id="mapArc4" d="M185 268 C 210 330, 250 370, 275 408"
                fill="none" stroke="url(#routeGlowMap)" strokeWidth="2.2"
                strokeDasharray="14 10" opacity="0.7" filter="url(#glowMap)">
                <animate attributeName="stroke-dashoffset" from="160" to="0" dur="6.2s" repeatCount="indefinite" />
              </path>

              {/* Markers */}
              {mapMarkers.map((m) => (
                <g key={m.label}>
                  <circle cx={m.cx} cy={m.cy} r="22" fill="#2563eb" opacity="0">
                    <animate attributeName="r" values="10;28;10" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.22;0;0.22" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={m.cx} cy={m.cy} r="9" fill="#1d4ed8" opacity="0.25" />
                  <circle cx={m.cx} cy={m.cy} r="5" fill="#93c5fd" filter="url(#glowMap)" />
                  <text x={m.cx} y={m.cy - 15} textAnchor="middle" fontSize="11"
                    fill="rgba(255,255,255,0.46)" fontFamily="Inter, sans-serif"
                    fontWeight="500" letterSpacing="0.04em">
                    {m.label}
                  </text>
                </g>
              ))}

              {/* Moving travel points */}
              <circle r="5" fill="#ffffff" filter="url(#glowMap)">
                <animateMotion dur="6.8s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#mapArc1" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#ffffff" filter="url(#glowMap)">
                <animateMotion dur="7.6s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#mapArc2" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#ffffff" filter="url(#glowMap)">
                <animateMotion dur="8.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#mapArc3" />
                </animateMotion>
              </circle>
              <circle r="5" fill="#ffffff" filter="url(#glowMap)">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#mapArc4" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          {/* Edge vignette fades into the dark card */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24 pt-4 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1320px] border-t border-black/8 pt-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/38">
                Moving Forward
              </p>
              <h2 className="mt-6 max-w-4xl font-[var(--font-mont-ex)] text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] tracking-[-0.055em] text-[#101010]">
                We want financial operations to feel like an advantage, not a
                weight businesses keep dragging behind them.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
