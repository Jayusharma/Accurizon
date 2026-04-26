'use client';
import { useEffect, useRef, useState } from 'react';

export default function FinalCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.25 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        setMagnetPos({ x, y });
    };

    const handleBtnMouseLeave = () => setMagnetPos({ x: 0, y: 0 });

    const chars = 'Get Your Financial System Reviewed'.split('');

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                background: '#0A1628',
                padding: '120px 24px',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
            }}
        >
            {/* Radial pulse background */}
            {visible && (
                <>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }} />
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: `${200 + i * 120}px`,
                                height: `${200 + i * 120}px`,
                                border: '1px solid rgba(37,99,235,0.12)',
                                borderRadius: '50%',
                                animation: `radial-pulse ${2.5 + i * 0.8}s ease-out infinite`,
                                animationDelay: `${i * 0.6}s`,
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                </>
            )}

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                {/* Label */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(37,99,235,0.12)',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: '9999px', padding: '6px 20px',
                    marginBottom: '40px',
                    opacity: visible ? 1 : 0,
                    transition: 'all 0.5s ease',
                }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981', animation: 'float 2s infinite' }} />
                    <span className="text-label" style={{ color: '#60A5FA' }}>Free — No Obligation</span>
                </div>

                {/* Headline with char reveal */}
                <h2 style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                }}>
                    {chars.map((char, i) => (
                        <span
                            key={i}
                            style={{
                                display: char === ' ' ? 'inline' : 'inline-block',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.02}s`,
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h2>

                <p style={{
                    color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.7,
                    maxWidth: '520px', margin: '0 auto 48px',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.6s ease 0.4s',
                }}>
                    Book a free 30-minute consultation. We&apos;ll review your current financial state and give you a clear roadmap — completely free.
                </p>

                {/* Magnetic CTA button */}
                <a
                    ref={btnRef}
                    href="mailto:info@accurizon.com"
                    className="btn-primary"
                    style={{
                        fontSize: '1.1rem',
                        padding: '18px 40px',
                        transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)`,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                        display: 'inline-flex',
                        opacity: visible ? 1 : 0,
                        transitionDelay: '0.5s',
                        boxShadow: '0 0 40px rgba(37,99,235,0.4)',
                    }}
                    onMouseMove={handleBtnMouseMove}
                    onMouseLeave={handleBtnMouseLeave}
                >
                    Book Free Consultation
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                {/* Contact info */}
                <div style={{
                    display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px',
                    marginTop: '64px',
                    opacity: visible ? 1 : 0,
                    transition: 'all 0.6s ease 0.65s',
                }}>
                    {[
                        {
                            icon: (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            ),
                            label: 'Email',
                            value: 'info@accurizon.com',
                            href: 'mailto:info@accurizon.com',
                        },
                        {
                            icon: (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            ),
                            label: 'Phone',
                            value: '+91 98288 12307',
                            href: 'tel:+919828812307',
                        },
                        {
                            icon: (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                                </svg>
                            ),
                            label: 'Website',
                            value: 'www.accurizon.com',
                            href: 'https://www.accurizon.com',
                        },
                    ].map((contact, i) => (
                        <a
                            key={i}
                            href={contact.href}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                        >
                            <div style={{
                                width: '40px', height: '40px',
                                background: 'rgba(37,99,235,0.12)',
                                border: '1px solid rgba(59,130,246,0.2)',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#60A5FA',
                            }}>
                                {contact.icon}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.7rem', color: '#60A5FA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{contact.label}</div>
                                <div style={{ color: '#CBD5E1', fontSize: '0.9rem', fontWeight: 500 }}>{contact.value}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
