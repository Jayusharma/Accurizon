'use client';

import { useEffect, useRef, useState } from 'react';

const factors = [
    {
        problemTitle: 'Scattered Books',
        problemSubtitle: 'Data is fragmented & delayed',
        solutionTitle: 'Single Source of Truth',
        solutionSubtitle: 'Real-time financial clarity'
    },
    {
        problemTitle: 'Deadline Anxiety',
        problemSubtitle: 'Compliance relies on panic',
        solutionTitle: 'Automated Workflows',
        solutionSubtitle: 'Zero penalties, total control'
    },
    {
        problemTitle: 'Decision Lag',
        problemSubtitle: 'Seeing the picture too late',
        solutionTitle: 'Actionable Reporting',
        solutionSubtitle: 'Insights delivered precisely on time'
    }
];

export default function ProblemOutcome() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            // Calculate how far the section is into the viewport
            // When rect.top == vh, it's just entering (progress = 0)
            // When rect.top == vh/2, it's half way in (progress = 0.5)
            // We want it to completely reveal quickly.
            let progress = 1 - (rect.top / (vh * 0.8));
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            setScrollOffset(progress);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Translate from -150px (hidden up) to 0 (revealed down)
    const titleTranslateY = -150 + (scrollOffset * 150);
    const titleOpacity = scrollOffset;

    return (
        <section
            id="why-choose"
            ref={sectionRef}
            className="section-shell"
            style={{
                background: '#F9FAFB', // Reverted to base color
                color: '#0A1628',
                paddingTop: '160px',
                paddingBottom: '160px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ position: 'relative', zIndex: 1, paddingLeft: '8%', paddingRight: '8%' }}>

                {/* Scroll Reveal Headline */}
                <div style={{ marginBottom: '100px' }}>
                    {/* Overflow hidden container to cleanly clip the text as it slides up */}
                    <div style={{ overflow: 'hidden', paddingBottom: '20px' }}>
                        <h2  className='font-mont '
                            style={{
                                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                fontWeight: 500,
                                lineHeight: 1.05,
                                letterSpacing: '-0.04em',
                                margin: 0,
                                maxWidth: '18ch',
                                transform: `translateY(${titleTranslateY}px)`,
                                opacity: titleOpacity,
                                // we don't use CSS transition for transform here because it's tied strictly to scroll progress
                            }}
                        >
                            Why do great systems fail?
                        </h2>
                    </div>
                </div>

                {/* 1-Column List Layout (Right Para Removed) */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        maxWidth: '1200px'
                    }}
                >
                    <div 
                    className='font-serif'
                    style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#64748B',
                        marginBottom: '16px'
                    }}>
                        Financial architecture has varying levels of friction:
                    </div>

                    {factors.map((factor, index) => (
                        <div
                            key={index}
                            className="problem-row font-rethink2"
                            style={{
                                position: 'relative',
                                paddingBottom: '24px',
                                borderBottom: '1px solid rgba(10,22,40,0.15)',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Problem State (Default View) */}
                            <div
                                className="problem-content"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    gap: '24px',
                                    transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            >
                                <div style={{
                                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                    fontWeight: 500,
                                    color: '#0A1628',
                                }}>
                                    {factor.problemTitle}
                                </div>
                                <div style={{
                                    fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                                    color: '#64748B',
                                    textAlign: 'right',
                                }}>
                                    {factor.problemSubtitle}
                                </div>
                            </div>

                            {/* Solution State (Slide in from left on hover) */}
                            <div
                                className="solution-content"
                                style={{
                                    position: 'absolute',
                                    inset: '0 0 24px 0',
                                    background: '#F9FAFB', // Matches section bg to hide problem text completely
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    gap: '24px',
                                    transform: 'translateX(-101%)',
                                    transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                            >
                                <div style={{
                                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                    fontWeight: 700,
                                    color: '#2563EB', // Blue accent for solution
                                }}>
                                    {factor.solutionTitle}
                                </div>
                                <div style={{
                                    fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                                    color: '#2563EB',
                                    textAlign: 'right',
                                }}>
                                    {factor.solutionSubtitle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
                .problem-row:hover .solution-content {
                    transform: translateX(0) !important;
                }
                .problem-row:hover .problem-content {
                    transform: translateX(20px);
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
