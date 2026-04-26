'use client';
import { useEffect, useRef } from 'react';

/* ─── Service data ──────────────────────────────────────────────── */
const services = [
    {
        number: '01',
        title: 'Accounting System Setup',
        tagline: 'Build your financial backbone — right from day one.',
        desc: 'We architect a complete accounting infrastructure tailored to your business. Chart of Accounts, software configuration, automation workflows, bank reconciliation protocols, and month-end close processes.',
        features: [
            'Chart of Accounts Design',
            'Tally / Zoho / QuickBooks Setup',
            'Automated Bank Reconciliation',
            'Month-End Close Automation',
        ],
        accent: '#E2E8F0', // Unified sleek silver/off-white
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Financial Operations',
        tagline: 'The daily engine that keeps your cash machine running.',
        desc: 'Day-to-day financial management with zero friction. Accounts payable & receivable, invoice processing, payroll management, vendor payments, and real-time cash flow monitoring.',
        features: [
            'Accounts Payable & Receivable',
            'Invoice Processing & Tracking',
            'Payroll Management',
            'Cash Flow Monitoring',
        ],
        accent: '#E2E8F0', // Unified sleek silver/off-white
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Compliance & Tax',
        tagline: 'Zero penalties. Zero surprises. Total peace of mind.',
        desc: 'End-to-end tax and regulatory management — GST filing, TDS compliance, advance tax planning, ROC filings, income tax returns, and all government compliance.',
        features: [
            'GST Filing (Monthly & Quarterly)',
            'TDS Compliance & Returns',
            'Income Tax Return Filing',
            'ROC & MCA Compliance',
        ],
        accent: '#E2E8F0', // Unified sleek silver/off-white
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Back Office Support',
        tagline: 'Strategic intelligence. Delivered on demand.',
        desc: 'Beyond bookkeeping — comprehensive financial intelligence. MIS reporting, management dashboards, budgeting & forecasting, financial analysis, audit support, and strategic advisory.',
        features: [
            'MIS Reporting & Dashboards',
            'Budgeting & Forecasting',
            'Audit Preparation & Support',
            'Financial Analysis & Advisory',
        ],
        accent: '#E2E8F0', // Unified sleek silver/off-white
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

/* ─── Main component ────────────────────────────────────────────── */
export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let gsapInstance: typeof import('gsap').gsap | null = null;
        let scrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

        async function initGSAP() {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);
            gsapInstance = gsap;
            scrollTriggerInstance = ScrollTrigger;

            // Wait for robust DOM layout calculating height (images/fonts loading fix early pinning)
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

            const section = sectionRef.current;
            const track = trackRef.current;

            if (!section || !track) return;

            // This perfectly calculates the distance so the absolute right-edge of the track is flush with the screen's right edge
            const totalScroll = track.scrollWidth - window.innerWidth;

            const tl = gsap.to(track, {
                x: () => -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }

        const cleanup = initGSAP();

        return () => {
            cleanup.then(fn => fn && fn());
        };
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            style={{
                background: '#F7F5F2', // Base Canvas color matches the site flow perfectly
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* ── Header (always visible, stays fixed during pin) ── */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '40px 60px 0',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div
                        className="text-label"
                        style={{ color: '#0A1628', marginBottom: '8px' }} // Adjusted to solid brand colors
                    >
                        Our Playbook
                    </div>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 3vw, 3rem)',
                            fontWeight: 500, // Reduced weight for ultra premium feel
                            color: '#0A1628',
                            letterSpacing: '-0.04em',
                            lineHeight: 1.1,
                            margin: 0,
                        }}
                    >
                        The Engine of Scale
                    </h2>
                </div>

                {/* Scroll hint */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#64748B',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        paddingBottom: '4px',
                    }}
                >
                    <span>Scroll to explore</span>
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                        <path d="M0 8h24M18 2l6 6-6 6" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>



            {/* ── Horizontal track ── */}
            <div
                ref={trackRef}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100vh',
                    paddingTop: '110px',    // below header
                    paddingBottom: '24px',
                    paddingLeft: '16px',
                    paddingRight: '16px',   // Removes the huge empty gap to lock the right edge tightly
                    gap: '16px',
                    width: 'max-content',
                }}
            >
                {services.map((s, i) => (
                    <ServiceCard key={i} service={s} index={i} />
                ))}
            </div>
        </section>
    );
}

/* ─── Individual service card (Premium Aesthetic Re-design) ────────────────────────────────────── */
function ServiceCard({ service: s, index }: { service: typeof services[0]; index: number }) {
    return (
        <div
            style={{
                width: '60vw',          // Reduced width
                height: '70vh',
                minWidth: '600px',     // Smaller min-width
                flexShrink: 0,
                borderRadius: '20px',
                background: '#171717', // Elegant neutral dark grey
                padding: '48px',       // Reduced internal padding
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.03)',
            }}
        >
            {/* Massive typography watermark spanning the background */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                fontSize: '55vh',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.02)',
                lineHeight: 1,
                pointerEvents: 'none',
                letterSpacing: '-0.05em'
            }}>
                {s.number}
            </div>

            {/* Top row: Icon and Phase Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px', // Squircle instead of exact circle for modern feel
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.accent,
                    boxShadow: `0 0 30px ${s.accent}15` // Extremely subtle aura
                }}>
                    {s.icon}
                </div>
                <div style={{
                    color: s.accent,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    opacity: 0.9
                }}>
                    Phase {s.number}
                </div>
            </div>

            {/* Bottom Row: Content Split */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                position: 'relative',
                zIndex: 1,
                marginTop: 'auto'
            }}>
                {/* Left: Text Descriptor */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                        color: '#FFFFFF',
                        fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                        fontWeight: 500,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.05,
                        marginBottom: '16px'
                    }}>
                        {s.title}
                    </h3>
                    <p style={{
                        color: '#A1A1AA', // Neutral light grey
                        fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                        lineHeight: 1.6,
                        maxWidth: '95%',
                        margin: 0
                    }}>
                        {s.desc}
                    </p>
                </div>

                {/* Right: Feature Lines */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {s.features.map((f, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '5px',
                                    height: '5px',
                                    background: '#FFFFFF',
                                    borderRadius: '50%',
                                    opacity: 0.4
                                }} />
                                <span style={{
                                    color: '#E4E4E7',
                                    fontSize: '0.95rem',
                                    fontWeight: 400,
                                }}>
                                    {f}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Gradient Overlays for Depth */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: `radial-gradient(ellipse at bottom left, ${s.accent}08 0%, transparent 70%)`,
                pointerEvents: 'none'
            }} />
        </div>
    );
}
