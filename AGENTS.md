<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

ACCURIZON - Website Design System
Brand Identity
Accurizon is a bookkeeping and financial operations company. Tagline: "We Assure The Trust You Seek." Core positioning: One stop solution for business financial systems - from bookkeeping to compliance to reporting, everything handled in one structured system.

Color Theme
Table
Token	Hex	Usage
Canvas	#F7F5F2	Primary page background, default section base
Surface	#FFFFFF	Cards, testimonials, elevated light surfaces
Navy 900	#0A1628	Primary brand dark, hero, footer, selective CTA sections
Navy 800	#0F1D32	Dark cards, dark elevated surfaces
Slate 800	#1F2937	Primary text on light backgrounds, headings, icons
Slate 600	#475569	Body text, supporting copy, metadata
Slate 300	#CBD5E1	Soft borders, dividers, light UI lines
Blue 500	#2563EB	Primary accent, CTA fill, links, active states
Blue 400	#3B82F6	Hover states, subtle emphasis, focused highlights
Blue 100	#DBEAFE	Soft blue backgrounds, chips, quiet accents
Success	#10B981	Positive metrics, checkmarks, proof indicators only
Warning	#F59E0B	Deadlines, pending states, caution indicators only
Danger	#DC2626	Risk, error, and compliance issue indicators only

Section Pattern
Default page rhythm: light-first. Most sections should use Canvas or Surface backgrounds with dark text.
Dark sections: use sparingly for Hero, one strategic mid-page band, and Final CTA only.
Blue is an accent, not the base identity. Do not build full sections around saturated blue gradients.
Purple, orange, and green must not be used as brand accents. They are utility/status colors only.
Prefer navy/slate structure with restrained blue emphasis to signal trust, order, and financial clarity.

Typography
Font: Inter (Google Fonts)
Hero headline: 72px / 4.5rem, weight 700, line-height 1.1, letter-spacing -0.02em
Section heading: 48px / 3rem, weight 700, line-height 1.2
Card title: 24px / 1.5rem, weight 600
Body: 16px / 1rem, weight 400, line-height 1.6
Label: 12px / 0.75rem, weight 600, uppercase, letter-spacing 0.05em

Spacing
Section padding: 120px vertical (space-2xl)
Between major elements: 80px (space-xl)
Card padding: 24px to 48px (space-md to space-lg)
Component gaps: 16px to 24px (space-sm to space-md)

Border Radius
Cards: 16px to 24px (radius-lg to radius-xl)
Buttons: 9999px (pill shape, radius-full)
Small elements: 8px to 12px (radius-sm to radius-md)

Shadows
Cards on light: 0 10px 30px rgba(15, 23, 42, 0.08)
Cards on dark: solid dark surfaces preferred over glass; use background rgba(10, 22, 40, 0.92), border 1px solid rgba(148, 163, 184, 0.12)
Glow on active: use very sparingly; prefer border emphasis or subtle shadow before glow
Avoid heavy glassmorphism, neon bloom, and multi-color gradients unless used in a tightly controlled hero detail

Content Sections (9 Total)
Hero - "One Stop Solution For Your Business" - dark background, headline + subheadline + CTA button "Get Free Financial Audit" + dashboard preview image with restrained depth
Problem to Outcome - "Is Your Financial Foundation Cracking?" - 4 problem cards that flip on scroll to reveal 4 outcome cards
Why Choose - "Your Trusted Financial Partner" - 3 metric counters (99.7% Accuracy, 200+ Clients, 98% On-Time) + 4 differentiator cards
Services - "A Complete Financial Engine" - 4 service cards in horizontal scroll: Accounting System Setup, Financial Operations, Compliance & Tax, Back Office Support
Breather - "Built For Clarity. Built For Scale." - minimal reset section with subtle tonal contrast, not a loud gradient showpiece
Process - "A Transparent, Efficiency-Driven System" - 4 pinned timeline steps: Audit, Setup, Operations, Optimization
Industries - "Industries We Specialize In" - 3 cards: Startups, SMEs/Growing Businesses, Hotels & Consumer Goods
Proof/Results - "Real Results. Real Impact." - 4 testimonials + 4 results metrics ($47M+ Reconciled, 15K+ Invoices, 99.7% Accuracy, 200+ Clients)
Final CTA - "Get Your Financial System Reviewed" - CTA button + contact info (info@accurizon.com, www.accurizon.com, +919828812307)

Animation Summary
Hero: Grid draw-in, headline word stagger, blur-to-focus subheadline, CTA emphasis, dashboard assemble with restrained 3D tilt
Problem/Outcome: Card flip on scroll (rotateY 180deg), SVG line draw
Why Choose: Count-up numbers, icon float, checkmark draw
Services: Horizontal pin scroll with progress bar, active card emphasis, restrained pointer response
Breather: Clip-path text reveal, subtle tonal shift background
Process: Pinned section, timeline line draw, step-by-step reveal with restrained emphasis, dim inactive steps
Industries: Scatter-to-grid animation, image parallax, hover lift
Proof: Masonry stagger, elastic quote marks, photo circle reveal, metric count-up
Final CTA: Radial pulse background, character reveal, magnetic button, contact info stagger

Contact Information
Email: info@accurizon.com
Website: www.accurizon.com
Phone: +919828812307
<!-- END:nextjs-agent-rules -->
