'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    const [tilt, setTilt] = useState({ x: 5, y: -20 });

    useEffect(() => {
        const timer = window.setTimeout(() => setReady(true), 80);

        const handleMouseMove = (event: MouseEvent) => {
            if (!dashboardRef.current) return;
            const rect = dashboardRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (event.clientX - cx) / (rect.width * 0.84);
            const dy = (event.clientY - cy) / (rect.height * 0.84);
            setTilt({ x: dy * -9, y: dx * 11 });
        };

        const resetTilt = () => setTilt({ x: 0, y: 0 });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    window.addEventListener('mousemove', handleMouseMove);
                } else {
                    window.removeEventListener('mousemove', handleMouseMove);
                    resetTilt();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            window.clearTimeout(timer);
            observer.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                minHeight: '100svh',
                paddingTop: '108px',
                paddingBottom: '44px',
                overflow: 'hidden',
                background:
                    'radial-gradient(circle at 76% 28%, rgba(37,99,235,0.16), transparent 24%), linear-gradient(180deg, #0A1628 0%, #0F1D32 100%)',
            }}
        >
            <div
                className="grid-pattern"
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.18,
                    maskImage: 'linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0.38))',
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0.38))',
                }}
            />

            <div
                className="container-xl hero-grid-minimal"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: 'calc(100svh - 152px)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 0.94fr) minmax(0, 1.06fr)',
                    gap: '48px',
                    alignItems: 'center',
                }}
            >
                <div style={{ maxWidth: '540px' }}>
                    <h1
                        className="text-hero"
                        style={{
                            color: '#FFFFFF',
                            margin: '0 0 20px',
                            maxWidth: '10ch',
                            opacity: ready ? 1 : 0,
                            transform: ready ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'all 760ms cubic-bezier(0.22,1,0.36,1)',
                        }}
                    >
                        One Stop Solution For Your Business
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            maxWidth: '31rem',
                            color: '#CBD5E1',
                            fontSize: '1.02rem',
                            lineHeight: 1.72,
                            opacity: ready ? 1 : 0,
                            transform: ready ? 'translateY(0)' : 'translateY(18px)',
                            transition: 'all 760ms cubic-bezier(0.22,1,0.36,1) 120ms',
                        }}
                    >
                        From bookkeeping to compliance to reporting, Accurizon builds the structured financial system serious businesses need to operate with clarity.
                    </p>
                </div>

                <div
                    ref={dashboardRef}
                    style={{
                        opacity: ready ? 1 : 0,
                        transform: ready ? 'translateY(0)' : 'translateY(28px)',
                        transition: 'all 900ms cubic-bezier(0.22,1,0.36,1) 120ms',
                        perspective: '1400px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 220ms ease-out',
                            willChange: 'transform',
                        }}
                    >
                        <DashboardVisual />
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .hero-grid-minimal {
                        grid-template-columns: 1fr !important;
                        gap: 34px !important;
                    }
                }
            `}</style>
        </section>
    );
}

function DashboardVisual() {
    return (
        <div
            style={{
                width: '520px',
                maxWidth: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(10,22,40,0.94)',
                border: '1px solid rgba(148,163,184,0.16)',
                boxShadow: '0 34px 82px rgba(2,6,23,0.44)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: '12px 14px',
                    borderBottom: '1px solid rgba(148,163,184,0.1)',
                    background: 'rgba(255,255,255,0.02)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {['#EF4444', '#F59E0B', '#10B981'].map((color) => (
                        <span
                            key={color}
                            style={{
                                width: '9px',
                                height: '9px',
                                borderRadius: '999px',
                                background: color,
                                display: 'inline-block',
                            }}
                        />
                    ))}
                </div>
                <div
                    style={{
                        minWidth: '172px',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#93C5FD',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textAlign: 'center',
                    }}
                >
                    accurizon.com / ops-board
                </div>
            </div>

            <div style={{ padding: '14px', display: 'grid', gap: '12px' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: '10px',
                    }}
                >
                    {[
                        { label: 'Close Status', value: '92%', detail: 'Apr cycle', tone: '#3B82F6' },
                        { label: 'GST', value: 'Filed', detail: 'On schedule', tone: '#10B981' },
                        { label: 'TDS', value: '30 Apr', detail: 'Next due', tone: '#F59E0B' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            style={{
                                padding: '12px',
                                borderRadius: '14px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(148,163,184,0.1)',
                            }}
                        >
                            <div style={{ color: '#94A3B8', fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {item.label}
                            </div>
                            <div style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginTop: '8px' }}>
                                {item.value}
                            </div>
                            <div style={{ color: item.tone, fontSize: '0.72rem', fontWeight: 600, marginTop: '5px' }}>
                                {item.detail}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="dashboard-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1.04fr 0.96fr',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            borderRadius: '18px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(148,163,184,0.1)',
                            padding: '14px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem' }}>
                                Reconciliation Health
                            </div>
                            <div style={{ color: '#60A5FA', fontSize: '0.7rem', fontWeight: 700 }}>
                                Last 30 days
                            </div>
                        </div>
                        <svg width="100%" height="126" viewBox="0 0 280 126" fill="none">
                            <defs>
                                <linearGradient id="hero-finance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {[22, 48, 74, 100].map((y) => (
                                <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(148,163,184,0.08)" />
                            ))}
                            <path d="M0 90C30 86 56 56 92 58C122 60 152 82 190 68C220 58 250 26 280 18V126H0V90Z" fill="url(#hero-finance)" />
                            <path d="M0 90C30 86 56 56 92 58C122 60 152 82 190 68C220 58 250 26 280 18" stroke="#60A5FA" strokeWidth="2" />
                            {[
                                [92, 58],
                                [190, 68],
                                [250, 26],
                            ].map(([x, y]) => (
                                <g key={`${x}-${y}`}>
                                    <circle cx={x} cy={y} r="4" fill="#DBEAFE" />
                                    <circle cx={x} cy={y} r="8" fill="rgba(219,234,254,0.1)" />
                                </g>
                            ))}
                        </svg>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                                gap: '8px',
                                marginTop: '10px',
                            }}
                        >
                            {[
                                ['Matched', '94%'],
                                ['Exceptions', '06'],
                                ['Escalated', '01'],
                            ].map(([label, value]) => (
                                <div key={label} style={{ padding: '8px 10px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                    <div style={{ color: '#94A3B8', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                                        {label}
                                    </div>
                                    <div style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 700, marginTop: '4px' }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '12px' }}>
                        <div
                            style={{
                                borderRadius: '18px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(148,163,184,0.1)',
                                padding: '14px',
                            }}
                        >
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', marginBottom: '10px' }}>
                                Compliance Queue
                            </div>
                            {[
                                ['GSTR-3B', 'Filed', '#10B981'],
                                ['TDS Payment', 'Pending', '#F59E0B'],
                                ['Payroll Review', 'Ready', '#3B82F6'],
                            ].map(([label, value, tone]) => (
                                <div
                                    key={label}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '8px 0',
                                        borderTop: label === 'GSTR-3B' ? 'none' : '1px solid rgba(148,163,184,0.08)',
                                    }}
                                >
                                    <span style={{ color: '#CBD5E1', fontSize: '0.76rem', fontWeight: 500 }}>{label}</span>
                                    <span style={{ color: tone, fontSize: '0.72rem', fontWeight: 700 }}>{value}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                borderRadius: '18px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(148,163,184,0.1)',
                                padding: '14px',
                            }}
                        >
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', marginBottom: '10px' }}>
                                Management Pack
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                {[
                                    ['P&L Summary', 'Ready'],
                                    ['Cash Flow', 'Ready'],
                                    ['Variance Note', 'Draft'],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '8px',
                                            padding: '9px 10px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.03)',
                                        }}
                                    >
                                        <span style={{ color: '#CBD5E1', fontSize: '0.74rem', fontWeight: 500 }}>{label}</span>
                                        <span style={{ color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700 }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
