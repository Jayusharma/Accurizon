import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Footer from "@/components/Footer";
import FixedContactButton from "@/components/FixedContactButton";
import "./globals.css";

const rethink1 = localFont({ src: "../public/fonts/rethink.ttf", variable: "--font-rethink1", display: "swap" });
const rethink2 = localFont({ src: "../public/fonts/Rethink2.ttf", variable: "--font-rethink2", display: "swap" });
const rethink3 = localFont({ src: "../public/fonts/Rethink3.ttf", variable: "--font-rethink3", display: "swap" });
const rethinkSemi = localFont({ src: "../public/fonts/RethinkSans-SemiBold.ttf", variable: "--font-rethink-semi", display: "swap" });
const mont = localFont({ src: "../public/fonts/mont.ttf", variable: "--font-mont", display: "swap" });
const montEx = localFont({ src: "../public/fonts/mont-ex.ttf", variable: "--font-mont-ex", display: "swap" });
const mayur = localFont({ src: "../public/fonts/mayur.ttf", variable: "--font-mayur", display: "swap" });
const mayur2 = localFont({ src: "../public/fonts/Mayur2.ttf", variable: "--font-mayur2", display: "swap" });



export const metadata: Metadata = {
  title: "Accurizon | One Stop Financial Operations System",
  description:
    "Accurizon is a bookkeeping and financial operations company. We Assure The Trust You Seek. Complete financial systems - bookkeeping, compliance, reporting, and back-office support.",
  keywords: [
    "bookkeeping",
    "accounting",
    "GST filing",
    "compliance",
    "financial operations",
    "Accurizon",
  ],
  openGraph: {
    title: "Accurizon | One Stop Financial Operations System",
    description:
      "We Assure The Trust You Seek. Complete financial systems for business.",
    url: "https://www.accurizon.com",
    siteName: "Accurizon",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rethink1.variable} ${rethink2.variable} ${rethink3.variable} ${rethinkSemi.variable} ${mont.variable} ${montEx.variable}`}>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-rethink1), sans-serif",
        }}
      >
        <SmoothScrollProvider>
          {children}
          <FixedContactButton />
        </SmoothScrollProvider>
        <Footer />
      </body>
    </html>
  );
}
