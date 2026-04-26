import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={inter.variable}>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-inter), Inter, -apple-system, sans-serif",
        }}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
