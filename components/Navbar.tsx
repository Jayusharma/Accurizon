'use client';

import { useEffect, useState, useRef } from 'react';

const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Why Us', href: '#why-choose', id: 'why-choose' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Industries', href: '#industries', id: 'industries' },
    { label: 'Results', href: '#proof', id: 'proof' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 24);

            if (currentScrollY > lastScrollY.current && currentScrollY > 60 && !menuOpen) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY.current || currentScrollY <= 60) {
                setHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };
        onScroll();

        const observers = navLinks
            .map((link) => {
                const element = document.getElementById(link.id);
                if (!element) return null;

                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveSection(link.id);
                        }
                    },
                    {
                        threshold: 0.45,
                        rootMargin: '-25% 0px -40% 0px',
                    }
                );

                observer.observe(element);
                return observer;
            })
            .filter(Boolean) as IntersectionObserver[];

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) return;

        const closeOnResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', closeOnResize);

        return () => window.removeEventListener('resize', closeOnResize);
    }, [menuOpen]);

    return (
        <nav
            style={{
                position: 'fixed',
                inset: '0 0 auto 0',
                zIndex: 1000,
                padding: '14px 16px 0',
                pointerEvents: 'none',
                transform: hidden ? 'translateY(-120%)' : 'translateY(0)',
                transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
        >
            <div
                className="container-xl"
                style={{
                    pointerEvents: 'auto',
                    borderRadius: '22px',
                    border: scrolled
                        ? '1px solid rgba(203, 213, 225, 0.92)'
                        : '1px solid rgba(148, 163, 184, 0.18)',
                    background: scrolled
                        ? 'rgba(255,255,255,0.92)'
                        : 'rgba(10,22,40,0.62)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    boxShadow: scrolled
                        ? '0 12px 34px rgba(15,23,42,0.08)'
                        : '0 12px 34px rgba(2,6,23,0.18)',
                    transition: 'background 260ms ease, border-color 260ms ease, box-shadow 260ms ease',
                }}
            >
                <div
                    style={{
                        minHeight: '72px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                        padding: '0 18px 0 20px',
                    }}
                >
                    <a
                        href="#"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            textDecoration: 'none',
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'linear-gradient(180deg, #163153 0%, #0A1628 100%)',
                                border: '1px solid rgba(148,163,184,0.18)',
                                display: 'grid',
                                placeItems: 'center',
                                color: '#DBEAFE',
                                fontWeight: 800,
                                fontSize: '1rem',
                                letterSpacing: '-0.04em',
                            }}
                        >
                            A
                        </div>
                        <div style={{ display: 'grid', gap: '2px' }}>
                            <span
                                style={{
                                    color: scrolled ? '#0A1628' : '#FFFFFF',
                                    fontSize: '1.08rem',
                                    fontWeight: 700,
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                Accurizon
                            </span>
                            <span
                                style={{
                                    color: scrolled ? '#64748B' : 'rgba(203,213,225,0.78)',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Financial Operations
                            </span>
                        </div>
                    </a>

                    <div
                        className="navbar-desktop"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px',
                            borderRadius: '999px',
                            background: scrolled ? 'rgba(248,250,252,0.9)' : 'rgba(255,255,255,0.04)',
                            border: scrolled
                                ? '1px solid rgba(203,213,225,0.92)'
                                : '1px solid rgba(148,163,184,0.12)',
                        }}
                    >
                        {navLinks.map((link) => {
                            const active = activeSection === link.id;
                            return (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    style={{
                                        position: 'relative',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '40px',
                                        padding: '0 16px',
                                        borderRadius: '999px',
                                        color: active
                                            ? scrolled ? '#0A1628' : '#FFFFFF'
                                            : scrolled ? '#475569' : '#CBD5E1',
                                        textDecoration: 'none',
                                        fontSize: '0.92rem',
                                        fontWeight: active ? 600 : 500,
                                        background: active
                                            ? scrolled
                                                ? 'rgba(219,234,254,0.82)'
                                                : 'rgba(255,255,255,0.08)'
                                            : 'transparent',
                                        transition: 'all 220ms ease',
                                    }}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <a
                            href="#contact"
                            className="btn-primary navbar-cta"
                            style={{
                                minHeight: '46px',
                                padding: '0 22px',
                                fontSize: '0.92rem',
                            }}
                        >
                            Get Free Audit
                        </a>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((value) => !value)}
                            className="navbar-toggle"
                            aria-label="Toggle navigation"
                            aria-expanded={menuOpen}
                            style={{
                                display: 'none',
                                width: '46px',
                                height: '46px',
                                borderRadius: '14px',
                                border: scrolled
                                    ? '1px solid rgba(203,213,225,0.92)'
                                    : '1px solid rgba(148,163,184,0.18)',
                                background: scrolled ? '#FFFFFF' : 'rgba(255,255,255,0.05)',
                                color: scrolled ? '#0A1628' : '#FFFFFF',
                                cursor: 'pointer',
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {menuOpen ? (
                                    <>
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M4 7h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 17h16" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div
                        style={{
                            padding: '0 16px 16px',
                            display: 'grid',
                            gap: '10px',
                        }}
                    >
                        <div
                            style={{
                                borderTop: '1px solid rgba(203,213,225,0.75)',
                                paddingTop: '14px',
                                display: 'grid',
                                gap: '8px',
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        minHeight: '50px',
                                        padding: '0 16px',
                                        borderRadius: '14px',
                                        background: activeSection === link.id
                                            ? 'rgba(219,234,254,0.82)'
                                            : 'rgba(248,250,252,0.88)',
                                        color: '#0A1628',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    <span>{link.label}</span>
                                    <span style={{ color: '#2563EB' }}>01</span>
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="btn-primary"
                                style={{ marginTop: '6px' }}
                                onClick={() => setMenuOpen(false)}
                            >
                                Get Free Audit
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @media (max-width: 980px) {
                    .navbar-desktop,
                    .navbar-cta {
                        display: none !important;
                    }

                    .navbar-toggle {
                        display: inline-grid !important;
                        place-items: center !important;
                    }
                }
            `}</style>
        </nav>
    );
}
