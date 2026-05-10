"use client";
import Link from "next/link";

export default function CtaButton() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-3"
      style={{
        border: "1px solid rgba(0,0,0,0.18)",
        borderRadius: "9999px",
        padding: "0.9rem 2rem",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        color: "#111",
        textDecoration: "none",
        transition: "background 0.25s ease, color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#111";
        (e.currentTarget as HTMLElement).style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "#111";
      }}
    >
      Get in touch <span>→</span>
    </Link>
  );
}
