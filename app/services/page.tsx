"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import NetworkDiagram from "@/components/NetworkDiagram";
import CtaButton from "@/components/CtaButton";

const BOOKKEEPING_ITEMS = [
  {
    name: "Accounts Payable",
    desc: "Efficient invoice processing, vendor management, and timely payments.",
  },
  {
    name: "Accounts Receivable",
    desc: "Accurate invoicing, tracking, and follow-ups to maintain healthy cash flow.",
  },
  {
    name: "Payroll Processing",
    desc: "Smooth and compliant payroll management with attention to accuracy and timelines.",
  },
  {
    name: "Bank Reconciliation",
    desc: "Ensure all bank and credit card transactions are recorded and discrepancies are identified quickly.",
  },
  {
    name: "Financial Reporting",
    desc: "Clear and actionable financial reports to support better decision-making.",
  },
  {
    name: "Data Cleanup & Migration",
    desc: "Cleaning, organizing, and transferring data across systems with accuracy and consistency.",
  },
];

const BACK_OFFICE_ITEMS = [
  {
    name: "Data Entry & Data Management",
    desc: "Accurate and structured data entry to ensure all records are complete, organized, and easily accessible.",
  },
  {
    name: "Document Management & Organization",
    desc: "Systematic handling, categorization, and storage of business documents for quick retrieval and compliance.",
  },
  {
    name: "Spreadsheet & Reporting Support",
    desc: "Organizing, cleaning, and maintaining data in spreadsheets for better visibility and internal tracking.",
  },
  {
    name: "Administrative & Operational Support",
    desc: "Handling routine back-office tasks to keep daily operations smooth and efficient.",
  },
];

const SUPPORT_CHANNELS = [
  {
    id: "email",
    icon: "E",
    name: "Email Support",
    desc: "Professional handling of customer queries via email with clear, timely, and accurate responses.",
  },
  {
    id: "chat",
    icon: "C",
    name: "Chat Support",
    desc: "Real-time assistance through live chat to resolve customer concerns quickly and efficiently.",
  },
  {
    id: "voice",
    icon: "V",
    name: "Voice Support",
    desc: "Dedicated phone support to manage customer interactions with clarity, professionalism, and empathy.",
  },
  {
    id: "ticket",
    icon: "T",
    name: "Ticket Management",
    desc: "Organized tracking and resolution of customer issues using structured ticketing systems.",
  },
  {
    id: "query",
    icon: "Q",
    name: "Query Resolution",
    desc: "Efficient handling of inquiries, complaints, and follow-ups to ensure customer satisfaction.",
  },
  {
    id: "multi",
    icon: "M",
    name: "Multi-Channel Support",
    desc: "Seamless support across email, chat, and voice channels for a consistent customer experience.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function OperationsTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    cardWidth: 0,
    startX: 0,
    endX: 0,
    cardTop: 96,
  });

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const total = Math.max(section.offsetHeight - viewportHeight, 1);
      const nextProgress = clamp(-rect.top / total, 0, 1);
      const cardWidth = Math.min(viewportWidth * 0.42, 544);
      const sidePadding = clamp(viewportWidth * 0.055, 24, 72);
      const cardTop = clamp(viewportHeight * 0.14, 80, 132);
      const availableShift = Math.max(viewportWidth - sidePadding * 2 - cardWidth, 0);

      setProgress(nextProgress);
      setMetrics({
        cardWidth,
        startX: sidePadding,
        endX: sidePadding + availableShift,
        cardTop,
      });
    };

    update();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const cardX = metrics.startX + (metrics.endX - metrics.startX) * progress;
  const rotateY = progress * 180;
  const imageScale = 1 + progress * 0.06;
  const frontOpacity = 1 - clamp((progress - 0.35) / 0.3, 0, 1);
  const backOpacity = clamp((progress - 0.45) / 0.3, 0, 1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--color-canvas)",
        paddingTop: "clamp(3rem, 5vw, 5rem)",
        paddingBottom: "clamp(4rem, 7vw, 6rem)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <div
          className="sticky h-screen"
          style={{
            top: 0,
            perspective: "1800px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: metrics.cardTop,
              width: metrics.cardWidth || 520,
              height: "min(70vh, 34rem)",
              transform: `translateX(${cardX}px)`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "1.8rem",
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotateY}deg) rotateZ(${(progress - 0.5) * 2.5}deg)`,
                transition: "transform 120ms linear",
                boxShadow: "0 24px 70px rgba(15, 23, 42, 0.16)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  borderRadius: "1.8rem",
                  backfaceVisibility: "hidden",
                  border: "1px solid rgba(148, 163, 184, 0.22)",
                  background: "#d9e4f4",
                }}
              >
                <Image
                  src="/images.jpeg"
                  alt="Bookkeeping"
                  fill
                  className="object-cover"
                  style={{
                    transform: `scale(${imageScale})`,
                    filter: "saturate(0.92) contrast(1.02)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,22,40,0.04) 0%, rgba(10,22,40,0.16) 100%)",
                    opacity: frontOpacity,
                  }}
                />
                <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/55 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#0a1628] backdrop-blur-sm">
                  Bookkeeping
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  borderRadius: "1.8rem",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  border: "1px solid rgba(148, 163, 184, 0.22)",
                  background: "#d9e4f4",
                }}
              >
                <Image
                  src="/backoffice.png"
                  alt="Back office support"
                  fill
                  className="object-cover"
                  style={{
                    transform: `scale(${1.02 + (1 - progress) * 0.04})`,
                    filter: "saturate(0.72) brightness(0.96)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,22,40,0.08) 0%, rgba(10,22,40,0.24) 100%)",
                    opacity: backOpacity,
                  }}
                />
                <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-[#0a1628]/55 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  Back Office
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-[1.8rem]"
                style={{
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-6 md:px-12">
        <div
          className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{ minHeight: "max(44rem, 100vh)" }}
        >
          <div className="hidden md:block" />
          <div className="flex flex-col justify-center pt-6 md:pt-24">
            <div className="relative">
              <span
                className="absolute -left-2 -top-8 select-none leading-none"
                style={{
                  fontSize: "clamp(6rem, 12vw, 11rem)",
                  fontFamily: "var(--font-mont-ex)",
                  color: "rgba(10,22,40,0.05)",
                  letterSpacing: "-0.07em",
                }}
              >
                01
              </span>
              <div className="relative z-10">
                <p className="mb-5 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-black/28">
                  01 / 03
                </p>
                <h2
                  className="leading-[0.95] tracking-[-0.05em]"
                  style={{
                    fontFamily: "var(--font-mont-ex)",
                    fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
                    color: "#0d0d0d",
                  }}
                >
                  Bookkeeping
                </h2>
                <p
                  className="mt-5 text-black/44"
                  style={{
                    fontSize: "clamp(0.85rem, 1.1vw, 0.98rem)",
                    lineHeight: 1.7,
                    maxWidth: 420,
                  }}
                >
                  The backbone of every financial decision. Every ledger, entry, and monthly close stays clean while the shared card begins its move into operations support.
                </p>
              </div>
            </div>

            <ul className="mt-10 space-y-0 rounded-[1.6rem] border border-black/6 bg-white/55 px-5 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm md:px-7">
              {BOOKKEEPING_ITEMS.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-start gap-6 py-5"
                  style={{ borderTop: index === 0 ? "none" : "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span
                    className="mt-0.5 shrink-0 text-[0.58rem] font-semibold tabular-nums text-black/24 tracking-wide"
                    style={{ minWidth: "1.4rem" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p
                      className="mb-1.5 font-semibold tracking-[-0.01em]"
                      style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)", color: "#111" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-black/42"
                      style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.86rem)", lineHeight: 1.7 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-[0.65rem] text-black/14">&rarr;</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Daily", "transaction accuracy"],
                ["Weekly", "cash position visibility"],
                ["Monthly", "close discipline"],
              ].map(([num, label]) => (
                <div
                  key={label}
                  className="rounded-[1.2rem] border border-black/6 bg-white/50 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-[1.5rem] leading-none tracking-[-0.05em] text-[#0a1628]">{num}</p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-black/35">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{ minHeight: "max(42rem, 92vh)", paddingTop: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div className="flex flex-col justify-center pb-6 md:pb-16">
            <p className="mb-5 text-[0.6rem] font-bold uppercase tracking-[0.32em] text-black/28">
              02 / 03
            </p>
            <h2
              className="leading-[0.88] tracking-[-0.06em]"
              style={{
                fontFamily: "var(--font-mont-ex)",
                fontSize: "clamp(2.8rem, 5.5vw, 6rem)",
                color: "#0d0d0d",
              }}
            >
              Back
              <br />
              <span
                style={{
                  fontFamily: "var(--font-rethink3)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(10,22,40,0.48)",
                }}
              >
                Office
              </span>
              <br />
              Support
            </h2>
            <p className="mt-5 text-[0.84rem] leading-[1.7] text-black/42" style={{ maxWidth: 380 }}>
              Operational precision behind every client-facing moment. As the card completes its rotation, bookkeeping becomes structured back-office support.
            </p>

            <ul className="mt-10 space-y-0 rounded-[1.8rem] border border-black/6 bg-white/58 px-5 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm md:px-7">
              {BACK_OFFICE_ITEMS.map((item, index) => (
                <li
                  key={item.name}
                  className="flex items-start gap-5 py-5"
                  style={{ borderTop: index === 0 ? "none" : "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span className="mt-0.5 shrink-0 text-[0.56rem] font-bold tabular-nums text-black/22 tracking-wide">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-semibold tracking-[-0.01em] text-black/82">{item.name}</p>
                    <p className="mt-1 text-[0.77rem] leading-[1.68] text-black/38">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-8 border-t border-black/7 pt-5">
              {[
                ["4", "core services"],
                ["100%", "remote delivery"],
                ["24/7", "availability"],
              ].map(([num, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[1.8rem] leading-none tracking-[-0.06em] text-[#0a1628]">{num}</span>
                  <span className="mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-black/28">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      <div className="px-6 md:hidden">
        <div className="relative mt-2 h-[18rem] overflow-hidden rounded-[1.6rem] border border-black/8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <Image src="/images.jpeg" alt="Bookkeeping" fill className="object-cover" />
          <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/60 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#0a1628] backdrop-blur-sm">
            Bookkeeping to Back Office
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomerSupportSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="px-6 md:px-12"
      style={{
        paddingTop: "clamp(4rem, 7vw, 7rem)",
        paddingBottom: "clamp(4rem, 7vw, 7rem)",
      }}
    >
      <div className="mb-16 grid items-end gap-12 md:grid-cols-[1fr_0.9fr]">
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
            <span
              style={{
                fontFamily: "var(--font-rethink3)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(0,0,0,0.45)",
              }}
            >
              Support
            </span>
          </h2>
          <p className="mt-6 text-[0.85rem] leading-[1.7] text-black/42" style={{ maxWidth: 360 }}>
            Every interaction handled with clarity and care. Six channels, one standard of excellence.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-[1.6rem]"
          style={{ height: "clamp(240px, 30vw, 380px)" }}
        >
          <Image src="/customer-support.png" alt="Customer support" fill className="object-cover" />
          {[
            "top-3 left-3 border-t border-l",
            "top-3 right-3 border-t border-r",
            "bottom-3 left-3 border-b border-l",
            "bottom-3 right-3 border-b border-r",
          ].map((classes, index) => (
            <span key={index} className={`absolute h-6 w-6 border-white/40 ${classes}`} />
          ))}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }}
          />
        </div>
      </div>

      <div
        className="grid gap-px overflow-hidden rounded-[1.4rem]"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          background: "rgba(0,0,0,0.07)",
        }}
      >
        {SUPPORT_CHANNELS.map((channel, index) => (
          <div
            key={channel.id}
            onMouseEnter={() => setActive(channel.id)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: "clamp(1.4rem, 2.5vw, 2rem)",
              background: active === channel.id ? "#111111" : "#f9fafb",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "background, opacity, transform",
              transitionDuration: "0.3s, 0.5s, 0.5s",
              transitionDelay: `0s, ${index * 80}ms, ${index * 80}ms`,
              cursor: "default",
            }}
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-[0.9rem] font-semibold leading-none"
              style={{
                borderColor: active === channel.id ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
                color: active === channel.id ? "rgba(255,255,255,0.74)" : "rgba(0,0,0,0.32)",
              }}
            >
              {channel.icon}
            </div>
            <p
              className="mb-2 font-semibold leading-tight tracking-[-0.01em]"
              style={{
                fontSize: "clamp(0.82rem, 1.1vw, 0.94rem)",
                color: active === channel.id ? "rgba(255,255,255,0.9)" : "#111",
              }}
            >
              {channel.name}
            </p>
            <p
              className="text-[0.72rem] leading-[1.65]"
              style={{
                color: active === channel.id ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
                maxHeight: active === channel.id ? "4rem" : "2.8rem",
                overflow: "hidden",
                transition: "max-height 0.3s ease, color 0.3s ease",
              }}
            >
              {channel.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden" style={{ background: "var(--color-canvas)", color: "#111" }}>
      <Navbar />

      <section className="pt-28 pb-0">
        <div className="px-6 pb-4 md:px-12">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-black/36">
            Services
          </p>
          <h1
            className="leading-[0.94] tracking-[-0.055em]"
            style={{
              fontFamily: "var(--font-mont-ex)",
              fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
              color: "#0d0d0d",
            }}
          >
            One financial partner.
            <br />
            <span
              style={{
                fontFamily: "var(--font-rethink3)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "0.88em",
              }}
            >
              Multiple clarity layers.
            </span>
          </h1>
        </div>
        <NetworkDiagram />
      </section>

      <div className="px-6 md:px-12" style={{ paddingTop: "clamp(3rem, 5vw, 5rem)" }}>
        <div
          className="flex items-center gap-5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-black/28">
            What We Do
          </span>
          <span className="h-px flex-1 bg-black/7" />
        </div>
      </div>

      <OperationsTransitionSection />
      <CustomerSupportSection />

      <div
        className="px-6 md:px-12"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          paddingTop: "clamp(4rem, 6vw, 6rem)",
          paddingBottom: "clamp(5rem, 8vw, 8rem)",
        }}
      >
        <div className="flex max-w-[1200px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-black/28">
              Ready to begin?
            </p>
            <h2
              className="leading-[1] tracking-[-0.045em]"
              style={{
                fontFamily: "var(--font-mont-ex)",
                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                color: "#0d0d0d",
              }}
            >
              Let&apos;s build your financial
              <br />
              <span style={{ fontFamily: "var(--font-rethink3)", fontStyle: "italic", fontWeight: 400 }}>
                operating system.
              </span>
            </h2>
          </div>
          <div>
            <CtaButton />
          </div>
        </div>
      </div>
    </main>
  );
}
