'use client';
import { useEffect, useRef, useState } from 'react';

export default function Breather() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            let progress = 1 - (rect.top / (vh * 0.8));
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            setScrollOffset(progress);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const words = ['Built For', 'Clarity.', 'Built For', 'Scale.'];

    // Translate from -150px (hidden up) to 0 (revealed down) precisely mirroring ProblemOutcome
    const titleTranslateY = -150 + (scrollOffset * 150);
    const titleOpacity = scrollOffset;

    return (
        <section
            ref={sectionRef}
            className="font-rethink-semi"
            style={{
                background: '#F9FAFB', // Base canvas color
                padding: '64px 24px 40px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    marginBottom: '32px'
                }}>
                    <span style={{ color: '#0A1628', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Philosophy</span>
                </div>

                {/* Overflow hidden container cleanly clips the text just like ProblemOutcome */}
                <div style={{ overflow: 'hidden', paddingBottom: '20px' }}>
                    <h2 style={{
                        margin: 0,
                        transform: `translateY(${titleTranslateY}px)`,
                        opacity: titleOpacity,
                    }}>
                        {words.map((word, i) => (
                            <span
                                key={i}
                                style={{
                                    display: word === '.' ? 'inline' : 'inline-block',
                                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    marginRight: word === 'For' ? '0.3em' : '0.15em',
                                    color: '#0A1628', // Constant dark text color
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Horizontal line divider */}
                <div style={{
                    width: '140px',
                    height: '2px',
                    background: '#0A1628',
                    margin: '52px auto 0',
                    opacity: 0.15
                }} />
            </div>
        </section>
    );
}
