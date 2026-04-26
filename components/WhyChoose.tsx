'use client';

import { useEffect, useRef, useState } from 'react';

const lines = [
    { text: 'WHY ACCURIZON', direction: 1 },

];

export default function WhyChoose() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            if (sectionRef.current && textRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const pixelsVisible = window.innerHeight - rect.top;
                const progress = pixelsVisible > 0 ? pixelsVisible : 0;

                const positionX = -(progress * 0.4);

                rafId = requestAnimationFrame(() => {
                    if (textRef.current) {
                        textRef.current.style.transform = `translate3d(${positionX}px, 0, 0)`;
                    }
                });
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="why-choose"
            className="section-shell"
            style={{
                background: '#F7F5F2', // Match Canvas
                overflow: 'hidden',
                paddingTop: '64px',
                paddingBottom: '160px',

            }}
        >
            {/* The scrolling text marquee */}
            <div style={{ display: 'grid', gap: '18px', marginBottom: '100px' }}>
                {lines.map((line, index) => {
                    return (
                        <div
                            key={`${line.text}-${index}`}
                            ref={textRef}
                            style={{
                                whiteSpace: 'nowrap',
                                willChange: 'transform',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '32px',
                                    paddingRight: '32px',
                                    color: '#0A1628', // Solid Black as requested
                                    fontSize: 'clamp(4rem, 12vw, 11rem)',
                                    fontWeight: 650,
                                    lineHeight: 0.92,
                                    letterSpacing: '-0.06em',
                                }}
                            >
                                {Array.from({ length: 6 }).map((_, repeatIndex) => (
                                    <span key={repeatIndex} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px' }}>
                                        <span>{line.text}</span>
                                        <span style={{ color: '#0A1628' }}>?*</span>
                                    </span>
                                ))}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* The Ultra-Premium Minimalist Grid */}
            <div className="container-lg" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px' }}>

                <div style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '16px' }}>
                            Our Unique Value Proposition
                        </div>
                        <h3 style={{ color: '#0A1628', fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                            The Accurizon Differentiators
                        </h3>
                    </div>
                    <div style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '340px' }}>
                        We don’t just record history. We engineer financial clarity that drives enterprise growth.
                    </div>
                </div>

                <div
                    className="why-choose-bento"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '24px',
                    }}
                >
                    {[
                        {
                            num: '01',
                            title: 'Proven Financial Accuracy',
                            desc: 'We ensure your books are always clean, compliant, and tax-ready, eliminating costly rework.'
                        },
                        {
                            num: '02',
                            title: 'Client-Centric Focus',
                            desc: 'Clear communication and dedicated attention tailored to the exact nuances of your operations.'
                        },
                        {
                            num: '03',
                            title: 'Reliable & On-Time',
                            desc: 'Relentlessly committed to meeting deadlines with accurate, audit-ready financials every single time.'
                        },
                        {
                            num: '04',
                            title: 'Growth-Driven Logic',
                            desc: 'Beyond bookkeeping — we provide architectural insights that actively improve profitability.'
                        }
                    ].map((feature, i) => (
                        <div
                            key={feature.title}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                background: '#FFFFFF',
                                padding: '48px',
                                borderRadius: '2px', // Sharp corners for premium B2B look
                                border: '1px solid rgba(203,213,225,0.4)',
                                boxShadow: '0 4px 24px rgba(15,23,42,0.02)',
                                transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                                cursor: 'default',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 32px 64px rgba(15,23,42,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                                const dot = e.currentTarget.querySelector('.bento-dot') as HTMLElement;
                                if (dot) dot.style.transform = 'scale(1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 24px rgba(15,23,42,0.02)';
                                e.currentTarget.style.borderColor = 'rgba(203,213,225,0.4)';
                                const dot = e.currentTarget.querySelector('.bento-dot') as HTMLElement;
                                if (dot) dot.style.transform = 'scale(0)';
                            }}
                        >
                            {/* Accent Dot on Hover */}
                            <div
                                className="bento-dot"
                                style={{
                                    position: 'absolute',
                                    top: '48px',
                                    right: '48px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#2563EB',
                                    transform: 'scale(0)',
                                    transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            />

                            <div style={{
                                color: 'rgba(10,22,40,0.06)',
                                fontSize: '4.8rem',
                                fontWeight: 800,
                                lineHeight: 0.8,
                                letterSpacing: '-0.04em',
                                marginBottom: '40px',
                                fontFamily: 'var(--font-mono, monospace)'
                            }}>
                                {feature.num}
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ color: '#0A1628', fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                                    {feature.title}
                                </div>
                                <div style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
                                    {feature.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 860px) {
                    .why-choose-bento {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
