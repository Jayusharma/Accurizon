'use client';

import { useEffect, useRef, useState } from 'react';

const differentiators = [
    {
        num: '[ 1 ]',
        title: 'Total asset visibility',
        desc: 'Every position, every movement — clearly structured in one system. Get a unified view of your entire portfolio across all assets and accounts.',
        // Midnight Slate Theme
        bgContainer: '#0F172A',
        blobs: [
            { color: '#1E293B', top: '-10%', left: '-10%', size: '150px' },
            { color: '#0A1628', bottom: '-20%', right: '-20%', size: '250px' },
            { color: '#334155', top: '30%', left: '20%', size: '200px' }
        ],
        glassBg: 'linear-gradient(160deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)',
        glassBorder: '1px solid rgba(255, 255, 255, 0.12)',
        glassBoxShadow: '0 30px 60px rgba(10, 22, 40, 0.2)',
        type: 'blue',
        // Card positioning: Uniformly aligned
        cardWidth: '85%',
        cardHeight: '380px',
        cardLeft: '7.5%',
        cardTop: '20%'
    },
    {
        num: '[ 2 ]',
        title: 'Precision performance tracking',
        desc: 'Advanced analytics to monitor growth, volatility, and efficiency. Analyze performance with deeper insights across timeframes.',
        // Midnight Slate Theme
        bgContainer: '#0A1628',
        blobs: [
            { color: '#1E293B', top: '-20%', left: '0%', size: '200px' },
            { color: '#081220', bottom: '-10%', right: '-10%', size: '300px' },
            { color: '#0F172A', top: '20%', right: '10%', size: '150px' }
        ],
        glassBg: 'linear-gradient(160deg, rgba(15, 23, 42, 0.4) 0%, rgba(10, 22, 40, 0.8) 100%)',
        glassBorder: '1px solid rgba(255, 255, 255, 0.12)',
        glassBoxShadow: '0 30px 60px rgba(10, 22, 40, 0.2)',
        type: 'green',
        // Card positioning: Uniformly aligned
        cardWidth: '85%',
        cardHeight: '380px',
        cardLeft: '7.5%',
        cardTop: '20%'
    },
    {
        num: '[ 3 ]',
        title: 'Global allocation intelligence',
        desc: 'Real-time global capital distribution and opportunity mapping. Track flows, regional exposure, and emerging opportunities — all in one structured view.',
        // Midnight Slate Theme
        bgContainer: '#081220',
        blobs: [
            { color: '#0A1628', top: '-10%', left: '-10%', size: '250px' },
            { color: '#040914', bottom: '-20%', left: '20%', size: '200px' },
            { color: '#1E293B', top: '20%', right: '-10%', size: '250px' }
        ],
        glassBg: 'linear-gradient(160deg, rgba(10, 22, 40, 0.4) 0%, rgba(4, 9, 20, 0.8) 100%)',
        glassBorder: '1px solid rgba(255, 255, 255, 0.12)',
        glassBoxShadow: '0 30px 60px rgba(10, 22, 40, 0.2)',
        type: 'brown',
        // Card positioning: Uniformly aligned
        cardWidth: '85%',
        cardHeight: '380px',
        cardLeft: '7.5%',
        cardTop: '20%'
    }
];

export default function WhyChoose() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Numbers
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    const [val3, setVal3] = useState(0);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime: number;
        const duration = 2000;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setVal1(Math.floor(easeProgress * 35200));
            setVal2(Number((easeProgress * 27.4).toFixed(1)));
            setVal3(Math.floor(easeProgress * 52480000));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            id="why-choose"
            style={{
                // background: '#F7F5F2', 
                paddingTop: '64px',
                paddingBottom: '240px', // Extra bottom padding for overlapping cards
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ display: 'grid', gap: '18px', marginBottom: '80px' }}>
                <div ref={textRef} style={{ whiteSpace: 'nowrap', willChange: 'transform' }}>
                    <span 
                    className="font-mont"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        paddingRight: '32px',
                        color: '#0A1628', 
                        fontSize: 'clamp(5rem, 8vw, 9rem)',
                        // fontWeight: 900,
                        lineHeight: 0.92,
                       transform: `scaleY(1.2)`,
                        // letterSpacing: '0.06em',
                    }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px' }}>
                                <span>WHY ACCURIZON</span>
                                <span style={{ color: '#0A1628' }}>?*</span>
                            </span>
                        ))}
                    </span>
                </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {differentiators.map((item, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ 
                                opacity: isVisible ? 1 : 0, 
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                            }}>
                                <div style={{ fontFamily: 'var(--font-mono, monospace)', color: '#64748B', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '16px' }}>
                                    {item.num}
                                </div>
                                <h3 className="font-rethink-semi" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0A1628', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6 }}>
                                    {item.desc}
                                </p>
                            </div>

                            {/* Parent Container - Fixed Height, visible overflow so child drops out */}
                            <div style={{
                                height: '360px',
                                borderRadius: '12px',
                                background: item.bgContainer,
                                position: 'relative',
                                // ** CRITICAL FIX: Overflow visible so cards can drop down **
                                overflow: 'visible',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + (index * 0.1)}s`
                            }}>
                                {/* Blobs Container with hidden overflow to keep blobs inside */}
                                <div style={{
                                    position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '12px'
                                }}>
                                    {item.blobs.map((blob, i) => (
                                        <div key={i} style={{
                                            position: 'absolute',
                                            width: blob.size,
                                            height: blob.size,
                                            background: blob.color,
                                            filter: 'blur(50px)',
                                            borderRadius: '50%',
                                            top: blob.top,
                                            left: blob.left,
                                            right: blob.right,
                                            bottom: blob.bottom,
                                            opacity: 0.8
                                        }} />
                                    ))}
                                </div>

                                {/* The Floating Glass Card */}
                                <div style={{
                                    position: 'absolute',
                                    left: item.cardLeft,
                                    top: item.cardTop,
                                    width: item.cardWidth,
                                    height: item.cardHeight,
                                    background: item.glassBg,
                                    backdropFilter: 'blur(30px)',
                                    WebkitBackdropFilter: 'blur(30px)',
                                    borderRadius: '16px',
                                    border: item.glassBorder,
                                    boxShadow: item.glassBoxShadow,
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    zIndex: 10,
                                }}>
                                    {/* CARD 1 (BLUE) */}
                                    {item.type === 'blue' && (
                                        <div style={{ color: '#FFF', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500 }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="18" y="3" width="3" height="18"/><rect x="10" y="8" width="3" height="13"/><rect x="2" y="13" width="3" height="8"/></svg>
                                                    Portfolio Overview
                                                </div>
                                                <div style={{ opacity: 0.8 }}>•••</div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', opacity: 0.6, marginBottom: '4px' }}>Total Value</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>${val1.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', opacity: 0.6, marginBottom: '4px' }}>Portfolio CHANGE</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>+3,567.99</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', opacity: 0.6, marginBottom: '4px' }}>Total Accounts</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>28</div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ flex: 1, position: 'relative', margin: '16px 0', display: 'flex', alignItems: 'flex-end', gap: '2px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px' }}>
                                                {[60, 40, 50, 80].map((h, i) => (
                                                    <div key={i} style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <div style={{ width: '100%', height: `${h}%`, background: i === 0 ? 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' : 'rgba(255,255,255,0.15)' }} />
                                                        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.4)', position: 'absolute', bottom: '-16px' }} />
                                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FFF', position: 'absolute', bottom: '-18px' }} />
                                                        <div style={{ fontSize: '0.5rem', opacity: 0.5, position: 'absolute', bottom: '-30px' }}>{[260, 4990, 7938, 8394][i]}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {[['Stock', '$105.00'], ['Crypto', '$53.00'], ['Cash', '$23.00']].map((row, i) => (
                                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', fontSize: '0.8rem' }}>
                                                        <span style={{ opacity: 0.9 }}>{row[0]}</span>
                                                        <span style={{ opacity: 0.9, textAlign: 'right' }}>{row[1]} <span style={{ opacity: 0.5, marginLeft: '4px' }}>Usd</span></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CARD 2 (GREEN) */}
                                    {item.type === 'green' && (
                                        <div style={{ color: '#FFF', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500 }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                                    Performance
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>Last Wek ▾</div>
                                                    <div style={{ fontSize: '0.9rem', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%' }}>⋮</div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <div style={{ fontSize: '4.8rem', fontWeight: 600, lineHeight: 1, display: 'flex', alignItems: 'baseline', letterSpacing: '-0.04em' }}>
                                                    {val2.toFixed(1)}% 
                                                    <svg style={{ marginLeft: '8px', color: '#FFFFFF', opacity: 0.8 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px' }}>Precision Data Insights</div>
                                                <div style={{ fontSize: '0.75rem', opacity: 0.6, lineHeight: 1.5, maxWidth: '95%' }}>
                                                    Evaluate market volatility and performance drivers with deep-dive analytics across any selected period.
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '20px', paddingBottom: '8px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '4px' }}>Growth</div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>+12% <span style={{ color: '#FFF', opacity: 0.6 }}>↗</span></div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '4px' }}>Volatility Index</div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>-3.1 <span style={{ color: '#FFF', opacity: 0.6 }}>↘</span></div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '4px' }}>Efficiency Ratio</div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>+8% <span style={{ color: '#FFF', opacity: 0.6 }}>↗</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* CARD 3 (BROWN) */}
                                    {item.type === 'brown' && (
                                        <div style={{ color: '#FFF', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 500 }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                                    Global capital flow
                                                </div>
                                                <div style={{ opacity: 0.8 }}>•••</div>
                                            </div>
                                            
                                            <div style={{ fontSize: '2.6rem', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                                                $ {val3.toLocaleString()}
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '24px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF', opacity: 0.8 }} />
                                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Total allocated capital</span>
                                            </div>

                                            {/* Fix for map image overflowing */}
                                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                <img 
                                                    src="/map.png" 
                                                    alt="Global Capital Flow Map" 
                                                    style={{ 
                                                        width: '100%', 
                                                        maxHeight: '250px', // Increased constraint
                                                        objectFit: 'contain',
                                                        opacity: 0.9 
                                                    }} 
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}