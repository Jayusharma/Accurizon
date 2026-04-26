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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [cardsVisible, setCardsVisible] = useState<boolean[]>(new Array(industries.length).fill(false));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target === sectionRef.current && entry.isIntersecting) setVisible(true);

                    const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (idx !== -1 && entry.isIntersecting) {
                        setTimeout(() => {
                            setCardsVisible(prev => { const n = [...prev]; n[idx] = true; return n; });
                        }, idx * 150);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        cardRefs.current.forEach(r => { if (r) observer.observe(r); });
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="industries"
            style={{
                background: '#F7F5F2',
                padding: '160px 0',
                position: 'relative',
                zIndex: 10
            }}
        >
            <div ref={sectionRef} style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 5%' }}>

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

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 500,
                        color: '#0A1628',
                        letterSpacing: '-0.04em',
                        lineHeight: 1.1,
                        margin: '0',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        Deep Domain <span style={{ color: '#64748B' }}>Expertise</span>
                    </h2>

                    <p style={{
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
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px',
                }}>
                    {industries.map((ind, i) => (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el; }}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                opacity: cardsVisible[i] ? 1 : 0,
                                transform: cardsVisible[i] ? 'translateY(0)' : 'translateY(40px)',
                                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                                padding: '40px',
                                border: '1px solid rgba(10, 22, 40, 0.04)',
                                boxShadow: '0 20px 40px rgba(10, 22, 40, 0.04)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = 'translateY(-8px)';
                                el.style.boxShadow = '0 30px 60px rgba(10, 22, 40, 0.08)';
                                el.style.borderColor = 'rgba(10, 22, 40, 0.1)';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = 'translateY(0)';
                                el.style.boxShadow = '0 20px 40px rgba(10, 22, 40, 0.04)';
                                el.style.borderColor = 'rgba(10, 22, 40, 0.04)';
                            }}
                        >
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#F1F5F9',
                                    color: '#0A1628',
                                    marginBottom: '24px'
                                }}>
                                    {ind.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 600,
                                    color: '#0A1628',
                                    letterSpacing: '-0.02em',
                                    margin: '0 0 8px 0'
                                }}>
                                    {ind.title}
                                </h3>
                                <div style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#64748B',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {ind.subtitle}
                                </div>
                            </div>

                            <p style={{
                                color: '#475569',
                                lineHeight: 1.6,
                                fontSize: '1.05rem',
                                margin: '0 0 32px 0',
                                flex: 1
                            }}>
                                {ind.desc}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                                {ind.highlights.map(h => (
                                    <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <div style={{
                                            color: '#0A1628',
                                            marginTop: '3px'
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span style={{ color: '#0A1628', fontSize: '0.95rem', fontWeight: 500 }}>{h}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                paddingTop: '24px',
                                borderTop: '1px solid rgba(10, 22, 40, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0A1628', lineHeight: 1 }}>
                                        {ind.stats.val}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '6px' }}>
                                        {ind.stats.label}
                                    </div>
                                </div>

                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(10, 22, 40, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#0A1628',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
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
