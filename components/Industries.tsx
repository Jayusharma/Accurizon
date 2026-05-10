'use client';
import { useEffect, useRef, useState } from 'react';

const industries = [
    {
        title: 'Startups & Tech',
        subtitle: 'Zero to Fundable',
        desc: 'We architect financial foundations that attract investors, manage burn rates with precision, and scale without operational chaos.',
        highlights: ['Investor-Ready Financials', 'Burn Rate Monitoring', 'Cap Table Management'],
        stats: { val: '80+', label: 'Venture-Backed' },
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: 'E-Commerce & D2C',
        subtitle: 'Omnichannel Scale',
        desc: 'Mastering multi-channel revenue, optimizing inventory turns, and providing crystal-clear visibility into customer acquisition costs.',
        highlights: ['Platform Reconciliation', 'Inventory Forecasting', 'CAC/LTV Analysis'],
        stats: { val: '50+', label: 'Brands Scaled' },
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
        ),
    },
    {
        title: 'Mid-Market SMEs',
        subtitle: 'Scale Without Friction',
        desc: 'Sophisticated financial systems without enterprise bloat. We build highly scalable solutions that evolve seamlessly with your growth.',
        highlights: ['Multi-Entity Accounting', 'Comprehensive GST', 'Cash Flow Architecture'],
        stats: { val: '120+', label: 'SMEs Scaled' },
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        title: 'Agencies & Services',
        subtitle: 'Margin Maximization',
        desc: 'Unlocking project-level profitability, streamlining utilization rates, and eliminating cash flow bottlenecks for service businesses.',
        highlights: ['Project Profitability', 'Utilization Tracking', 'Cash Flow Forecasting'],
        stats: { val: '60+', label: 'Agencies Optimized' },
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Consumer & F&B',
        subtitle: 'Margin Protection',
        desc: 'Deep industry expertise to manage complex supply chains, multi-location revenue, and precise unit economics.',
        highlights: ['Revenue Reconciliation', 'Inventory Costing', 'Unit Economics'],
        stats: { val: '40+', label: 'Brands Managed' },
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
];

export default function Industries() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="industries"
            style={{
                background: '#F8FAFC',
                padding: '160px 0 120px 0',
                position: 'relative',
                zIndex: 10
            }}
        >

            <style>{`
                .industry-card {
                    transition: all 0.8s cubic-bezier(0.4, 0.8, 0.6, 1);
                    cursor: pointer;
                    border-radius: 0px;
                    background: #FFFFFF;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(10, 22, 40, 0.08);
                }
                .industry-card[data-active="true"] {
                    background: #FFFFFF;
                    box-shadow: 0 30px 60px rgba(10, 22, 40, 0.1);
                    z-index: 10;
                    height: 500px;
                }
                .industry-card[data-active="false"] {
                    background: #F1F5F9;
                    box-shadow: inset 0 0 20px rgba(10, 22, 40, 0.02);
                    height: 480px;
                }
                .industry-card[data-active="false"]:hover {
                    background: #E2E8F0;
                }

                @media (max-width: 1024px) {
                    .industries-container {
                        flex-direction: column !important;
                        height: 700px !important;
                        perspective: none !important;
                        align-items: stretch !important;
                    }
                    .industry-card {
                        transform: none !important;
                        width: 100% !important;
                    }
                    .industry-card[data-active="false"] {
                        flex: 0 0 72px !important;
                        height: 72px !important;
                    }
                    .industry-card[data-active="true"] {
                        flex: 1 1 400px !important;
                        height: auto !important;
                    }
                    .inactive-content {
                        flex-direction: row !important;
                        padding: 0 20px !important;
                        align-items: center !important;
                    }
                    .inactive-text {
                        writing-mode: horizontal-tb !important;
                        transform: none !important;
                        margin-top: 0 !important;
                        margin-left: 20px !important;
                    }
                    .active-content {
                        min-width: 0 !important;
                        padding: 24px 20px !important;
                    }
                    .active-bottom-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 20px !important;
                    }
                    .active-stats-container {
                        text-align: left !important;
                    }
                }
            `}</style>

            <div ref={sectionRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 8%', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        marginBottom: '24px'
                    }}>
                        <span style={{
                            color: '#0A1628',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                            Sector Applications
                        </span>
                    </div>

                    <h2 
                    className='font-rethink-semi '
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 500,
                        color: '#0A1628',
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        Are you the <span style={{ color: '#64748B' }}>perfect fit ?</span>
                    </h2>

                    {/* <p style={{
                        color: '#64748B',
                        marginTop: '24px',
                        fontSize: '1.25rem',
                        maxWidth: '600px',
                        margin: '24px auto 0',
                        lineHeight: 1.6,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                    }}>
                        We don't build generic systems. Our infrastructure is meticulously tailored to the operational realities of your industry.
                    </p> */}
                </div>

                <div 
                    className="industries-container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        // gap: '1px',
                        height: '500px',
                        width: '100%',
                        perspective: '1500px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                    }}
                >
                    {industries.map((ind, i) => {
                        const isActive = activeIndex === i;
                        
                        // Calculate visual position (from -1 to 1) dynamically so the curve NEVER breaks
                        let currentTotal = 0;
                        let cardCenter = 0;
                        for (let j = 0; j <= i; j++) {
                            const flex = j === activeIndex ? 8 : 1;
                            if (j === i) cardCenter = currentTotal + flex / 2;
                            currentTotal += flex;
                        }
                        const xPos = (cardCenter / 12) * 2 - 1; // Map to -1 (left) to 1 (right)

                        // Quadratic arc projection: perfect circle from above
                        const translateZ = Math.pow(Math.abs(xPos), 2) * 180; // Smooth inward depth
                        const rotate = xPos * -35; // Perfectly tangent rotations

                        return (
                            <div
                                key={i}
                                className="industry-card"
                                data-active={isActive}
                                onClick={() => setActiveIndex(i)}
                                style={{
                                    flex: isActive ? '6' : '1', // Increased ratio to make side cards thinner stripes
                                    transform: `translateZ(${translateZ}px) rotateY(${rotate}deg)`,
                                     
                                }}
                            >
                                {/* Inactive Content */}
                                <div 
                                    className="inactive-content"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '28px 0',
                                        opacity: isActive ? 0 : 1,
                                        transition: `opacity 0.4s ease ${isActive ? '0s' : '0.4s'}`,
                                    }}
                                >
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', flexShrink: 0 }}>
                                        {ind.icon}
                                    </div>
                                    <div className="inactive-text" style={{
                                        writingMode: 'vertical-rl',
                                        transform: 'rotate(180deg)',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: '#0A1628',
                                        letterSpacing: '0.05em',
                                        whiteSpace: 'nowrap',
                                        marginTop: '20px'
                                    }}>
                                        {ind.title}
                                    </div>
                                </div>

                                {/* Active Content */}
                                <div 
                                    className="active-content"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        padding: '40px',
                                        opacity: isActive ? 1 : 0,
                                        transition: `opacity 0.5s ease ${isActive ? '0.4s' : '0s'}`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minWidth: '400px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                        <div style={{
                                            width: '60px', height: '60px', borderRadius: '16px',
                                            background: 'linear-gradient(135deg, #0A1628 0%, #1E293B 100%)',
                                            boxShadow: '0 10px 20px rgba(3, 7, 18, 0.2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#FFFFFF',
                                            flexShrink: 0
                                        }}>
                                            {ind.icon}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 600, color: '#0A1628', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>{ind.title}</h3>
                                            <div style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{ind.subtitle}</div>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.5, marginBottom: '24px', maxWidth: '100%' }}>
                                        {ind.desc}
                                    </p>

                                    <div className="active-bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {ind.highlights.map(h => (
                                                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', flexShrink: 0 }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0A1628' }}>{h}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="active-stats-container" style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: '#0A1628', lineHeight: 1, letterSpacing: '-0.03em' }}>{ind.stats.val}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>{ind.stats.label}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
