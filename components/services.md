"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import NetworkDiagram from "@/components/NetworkDiagram";
import CtaButton from "@/components/CtaButton";

/* ─────────────────────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────────────────────── */
const BOOKKEEPING_ITEMS = [
  { name: "Accounts Payable", desc: "Efficient invoice processing, vendor management, and timely payments." },
  { name: "Accounts Receivable", desc: "Accurate invoicing, tracking, and follow-ups to maintain healthy cash flow." },
  { name: "Payroll Processing", desc: "Smooth and compliant payroll management with attention to accuracy and timelines." },
  { name: "Bank Reconciliation", desc: "Ensure all bank and credit card transactions are recorded and discrepancies are identified quickly." },
  { name: "Financial Reporting", desc: "Clear and actionable financial reports to support better decision-making." },
  { name: "Data Cleanup & Migration", desc: "Cleaning, organizing, and transferring data across systems with accuracy and consistency." },
];

const BACK_OFFICE_ITEMS = [
  { name: "Data Entry & Data Management", desc: "Accurate and structured data entry to ensure all records are complete, organized, and easily accessible." },
  { name: "Document Management & Organization", desc: "Systematic handling, categorization, and storage of business documents for quick retrieval and compliance." },
  { name: "Spreadsheet & Reporting Support", desc: "Organizing, cleaning, and maintaining data in spreadsheets for better visibility and internal tracking." },
  { name: "Administrative & Operational Support", desc: "Handling routine back-office tasks to keep daily operations smooth and efficient." },
];

const SUPPORT_CHANNELS = [
  { id: "email", icon: "✉", name: "Email Support", desc: "Professional handling of customer queries via email with clear, timely, and accurate responses." },
  { id: "chat", icon: "◈", name: "Chat Support", desc: "Real-time assistance through live chat to resolve customer concerns quickly and efficiently." },
  { id: "voice", icon: "◉", name: "Voice Support", desc: "Dedicated phone support to manage customer interactions with clarity, professionalism, and empathy." },
  { id: "ticket", icon: "▣", name: "Ticket Management", desc: "Organized tracking and resolution of customer issues using structured ticketing systems." },
  { id: "query", icon: "◎", name: "Query Resolution", desc: "Efficient handling of inquiries, complaints, and follow-ups to ensure customer satisfaction." },
  { id: "multi", icon: "⊕", name: "Multi-Channel Support", desc: "Seamless support across email, chat, and voice channels for a consistent customer experience." },
];

/* ─────────────────────────────────────────────────────────────
   SECTION 02 — Dark Back Office Block
   Counter counts up when in viewport
───────────────────────────────────────────────────────────── */
function BackOfficeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "#0d0d0d",
        borderRadius: "2.4rem",
        margin: "0 clamp(1rem, 3vw, 2.5rem)",
      }}
    >
      {/* Top strip */}
      <div className="flex items-center justify-between px-10 pt-10 pb-0">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-white/30">02 / 03</p>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-white/20">Back Office Support</p>
      </div>

      {/* Main grid: text left, image right */}
      <div className="grid md:grid-cols-[1fr_0.85fr]" style={{ minHeight: 520 }}>
        {/* LEFT — category + items */}
        <div className="flex flex-col justify-between px-10 pt-8 pb-10">
          {/* Large heading */}
          <div>
            <h2
              className="leading-[0.88] tracking-[-0.06em]"
              style={{
                fontFamily: "var(--font-mont-ex)",
                fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Back
              <br />
              <span style={{ fontFamily: "var(--font-rethink3)", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>
                Office
              </span>
              <br />
              Support
            </h2>
            <p className="mt-5 text-[0.82rem] leading-[1.7] text-white/36" style={{ maxWidth: 320 }}>
              Operational precision behind every client-facing moment.
            </p>
          </div>

          {/* Item list — staggered fade in */}
          <ul className="mt-10 space-y-0">
            {BACK_OFFICE_ITEMS.map((item, i) => (
              <li
                key={item.name}
                className="group flex items-start gap-5 py-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity 0.55s ease ${i * 100 + 200}ms, transform 0.55s ease ${i * 100 + 200}ms`,
                }}
              >
                <span className="mt-0.5 shrink-0 text-[0.56rem] font-bold tabular-nums text-white/20 tracking-wide">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[0.88rem] font-semibold text-white/80 tracking-[-0.01em]">{item.name}</p>
                  <p className="mt-1 text-[0.76rem] leading-[1.65] text-white/32">{item.desc}</p>
                </div>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(255,255,255,0.07)", height: 0 }} />
          </ul>
        </div>

        {/* RIGHT — editorial photo */}
        <div className="relative hidden md:block">
          <Image
            src="/backoffice.png"
            alt="Back office operations"
            fill
            className="object-cover"
            style={{ opacity: 0.55, filter: "saturate(0.3) brightness(0.85)" }}
          />
          {/* Gradient left fade so image blends into dark bg */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #0d0d0d 0%, transparent 40%)" }}
          />
        </div>
      </div>

      {/* Bottom row — stat chips */}
      <div
        className="flex flex-wrap gap-8 px-10 pb-10 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[["4", "Core services"], ["100%", "Remote delivery"], ["24/7", "Availability"]].map(([num, label]) => (
          <div key={label} className="flex flex-col">
            <span className="text-[1.8rem] font-[var(--font-mont-ex)] leading-none tracking-[-0.06em] text-white/75">{num}</span>
            <span className="mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-white/28">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 03 — Customer Support Magazine Spread
───────────────────────────────────────────────────────────── */
function CustomerSupportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-6 md:px-12" style={{ paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)" }}>

      {/* Top row: 03/03 label + large heading + image */}
      <div className="grid md:grid-cols-[1fr_0.9fr] gap-12 items-end mb-16">

        {/* Left: category heading */}
        <div>
          <p className="mb-5 text-[0.6rem] font-bold uppercase tracking-[0.32em] text-black/28">03 / 03</p>
          <h2
            className="leading-[0.9] tracking-[-0.055em]"
            style={{
              fontFamily: "var(--font-mont-ex)",
              fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
              color: "#0d0d0d",
            }}
          >
            Customer
            <br />
            <span style={{ fontFamily: "var(--font-rethink3)", fontStyle: "italic", fontWeight: 300, color: "rgba(0,0,0,0.45)" }}>
              Support
            </span>
          </h2>
          <p className="mt-6 text-[0.85rem] leading-[1.7] text-black/42" style={{ maxWidth: 360 }}>
            Every interaction handled with clarity and care. Six channels, one standard of excellence.
          </p>
        </div>

        {/* Right: image with corner brackets */}
        <div
          className="relative overflow-hidden"
          style={{ height: "clamp(240px, 30vw, 380px)", borderRadius: "1.6rem" }}
        >
          <Image src="/customer-support.png" alt="Customer support" fill className="object-cover" />
          {/* Corner brackets overlay */}
          {[["top-3 left-3", "border-t border-l"], ["top-3 right-3", "border-t border-r"],
            ["bottom-3 left-3", "border-b border-l"], ["bottom-3 right-3", "border-b border-r"]].map(([pos, border], i) => (
            <span key={i} className={`absolute ${pos} w-6 h-6 ${border} border-white/40`} />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }} />
        </div>
      </div>

      {/* Channel grid — 2×3 interactive hover */}
      <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(3, 1fr)", background: "rgba(0,0,0,0.07)", borderRadius: "1.4rem", overflow: "hidden" }}>
        {SUPPORT_CHANNELS.map((ch, i) => (
          <div
            key={ch.id}
            onMouseEnter={() => setActive(ch.id)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: "clamp(1.4rem, 2.5vw, 2rem)",
              background: active === ch.id ? "#111111" : "#f9fafb",
              transition: "background 0.3s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "background, opacity, transform",
              transitionDuration: `0.3s, 0.5s, 0.5s`,
              transitionDelay: `0s, ${i * 80}ms, ${i * 80}ms`,
              cursor: "default",
            }}
          >
            {/* Icon */}
            <div
              className="mb-4 text-[1.4rem] leading-none"
              style={{ color: active === ch.id ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.18)" }}
            >
              {ch.icon}
            </div>
            {/* Name */}
            <p
              className="font-semibold tracking-[-0.01em] leading-tight mb-2"
              style={{
                fontSize: "clamp(0.82rem, 1.1vw, 0.94rem)",
                color: active === ch.id ? "rgba(255,255,255,0.9)" : "#111",
              }}
            >
              {ch.name}
            </p>
            {/* Desc — fades in on hover */}
            <p
              className="text-[0.72rem] leading-[1.65]"
              style={{
                color: active === ch.id ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
                maxHeight: active === ch.id ? "4rem" : "2.8rem",
                overflow: "hidden",
                transition: "max-height 0.3s ease, color 0.3s ease",
              }}
            >
              {ch.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: "var(--color-canvas)", color: "#111" }}>
      <Navbar />

      {/* ── HERO + NETWORK DIAGRAM ── */}
      <section className="pt-28 pb-0">
        <div className="px-6 pb-4 md:px-12">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(0,0,0,0.36)" }}>
            • Services
          </p>
          <h1
            className="leading-[0.94] tracking-[-0.055em]"
            style={{ fontFamily: "var(--font-mont-ex)", fontSize: "clamp(2.4rem, 5vw, 5.2rem)", color: "#0d0d0d" }}
          >
            One financial partner.
            <br />
            <span style={{ fontFamily: "var(--font-rethink3)", fontStyle: "italic", fontWeight: 400, fontSize: "0.88em" }}>
              Multiple clarity layers.
            </span>
          </h1>
        </div>
        <NetworkDiagram />
      </section>

      {/* ── SECTION DIVIDER ── */}
      <div className="px-6 md:px-12" style={{ paddingTop: "clamp(3rem, 5vw, 5rem)" }}>
        <div className="flex items-center gap-5" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "clamp(2rem, 4vw, 3.5rem)" }}>
          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em]" style={{ color: "rgba(0,0,0,0.28)" }}>
            What We Do
          </span>
          <span className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.07)" }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 01 — BOOKKEEPING
          Design: Editorial two-column split. Ghost index number.
          Numbered typographic list on the right.
      ══════════════════════════════════════════════════════════ */}
      <div
        className="grid gap-x-16 gap-y-10 px-6 md:px-12"
        style={{
          gridTemplateColumns: "1fr 1.6fr",
          paddingTop: "clamp(3rem, 5vw, 5rem)",
          paddingBottom: "clamp(3rem, 5vw, 5rem)",
        }}
      >
        {/* Left */}
        <div className="relative">
          <span
            className="absolute select-none leading-none"
            style={{
              top: "-0.18em", left: "-0.04em",
              fontSize: "clamp(6rem, 12vw, 11rem)",
              fontFamily: "var(--font-mont-ex)",
              color: "rgba(0,0,0,0.04)",
              letterSpacing: "-0.07em",
              userSelect: "none",
            }}
          >01</span>
          <div className="relative z-10 pt-2">
            <p className="mb-5 text-[0.6rem] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(0,0,0,0.28)" }}>01 / 03</p>
            <h2
              className="leading-[1.0] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-mont-ex)", fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)", color: "#0d0d0d" }}
            >
              Bookkeeping
            </h2>
            <p className="mt-5 leading-[1.65] text-black/42" style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.96rem)", maxWidth: 340 }}>
              The backbone of every financial decision.
            </p>
            <div className="mt-8 flex gap-1.5">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="rounded-full" style={{ width: 4, height: 4, background: `rgba(0,0,0,${0.12 - i * 0.025})` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right — numbered list */}
        <div className="flex flex-col justify-center">
          <ul className="space-y-0">
            {BOOKKEEPING_ITEMS.map((item, ii) => (
              <li key={item.name} className="flex items-start gap-6 py-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <span className="mt-0.5 shrink-0 text-[0.58rem] font-semibold tabular-nums text-black/22 tracking-wide" style={{ minWidth: "1.4rem" }}>
                  {String(ii + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="mb-1.5 font-semibold tracking-[-0.01em]" style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "#111" }}>
                    {item.name}
                  </p>
                  <p className="leading-[1.7] text-black/40" style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.85rem)" }}>
                    {item.desc}
                  </p>
                </div>
                <span className="mt-1 shrink-0 text-[0.65rem] text-black/14">→</span>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(0,0,0,0.06)", height: 0 }} />
          </ul>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 02 — BACK OFFICE SUPPORT
          Design: Dark rounded card, editorial photo, staggered list.
      ══════════════════════════════════════════════════════════ */}
      <BackOfficeSection />

      {/* ══════════════════════════════════════════════════════════
          SECTION 03 — CUSTOMER SUPPORT
          Design: Light, magazine-spread heading + image + 2×3 hover grid.
      ══════════════════════════════════════════════════════════ */}
      <CustomerSupportSection />

      {/* ── CTA FOOTER ── */}
      <div
        className="px-6 md:px-12"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          paddingTop: "clamp(4rem, 6vw, 6rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
        }}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between" style={{ maxWidth: 1200 }}>
          <div>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-black/28">Ready to begin?</p>
            <h2
              className="leading-[1.0] tracking-[-0.045em]"
              style={{ fontFamily: "var(--font-mont-ex)", fontSize: "clamp(2rem, 4vw, 3.8rem)", color: "#0d0d0d" }}
            >
              Let's build your financial
              <br />
              <span style={{ fontFamily: "var(--font-rethink3)", fontStyle: "italic", fontWeight: 400 }}>
                operating system.
              </span>
            </h2>
          </div>
          <div><CtaButton /></div>
        </div>
      </div>
    </main>
  );
}
