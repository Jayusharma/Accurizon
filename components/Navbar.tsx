'use client';

import { useEffect, useState, useRef } from 'react';

const navLinks = [
    { label: 'DASHBOARD', href: '#' },
    { label: 'ASSETS', href: '#' },
    { label: 'ANALYTICS', href: '#' },
    { label: 'MARKETS', href: '#' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 24);
            
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down & past top threshold -> hide
                setHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up -> show
                setHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '20px 40px',
                transition: 'all 300ms ease',
                background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
            }}
        >
            <div
                style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Logo */}
                <a
                    href="#"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#000',
                        fontWeight: 800,
                        fontSize: '1.5rem',
                        letterSpacing: '-0.05em',
                    }}
                >
                    Accurizon
                </a>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={{
                                textDecoration: 'none',
                                color: '#111827',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                transition: 'color 200ms ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#6B7280')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side: Language and CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4B5563' }}>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            <path d="M2 12h20" />
                        </svg>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>English</span>
                    </div>

                    <a
                        href="#"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#000',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '10px 24px',
                            borderRadius: '999px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'transform 200ms ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        Launch app
                    </a>
                </div>
            </div>
        </nav>
    );
}
