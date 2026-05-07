'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

// Using monochromatic colors instead of rainbow accents
const THEME_ACCENT = '#FFFFFF';
const THEME_DIM = '#52525B';

const steps = [
    {
        number: '01',
        title: 'Free Audit',
        description: 'We conduct a comprehensive review of your existing financial records, systems, and processes — identifying gaps, risks, and inefficiencies. A full picture, no cost, no commitment.',
        visual: (active: boolean) => (
            <svg width="100%" height="100%" viewBox="0 0 340 220" fill="none">
                <rect x="20" y="20" width="300" height="180" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {[
                    { label: 'Bank Statements', done: true, y: 50 },
                    { label: 'GST Returns FY24', done: true, y: 82 },
                    { label: 'P&L Statements', done: false, y: 114 },
                    { label: 'Vendor Ledgers', done: false, y: 146 },
                    { label: 'TDS Compliance', done: false, y: 178 },
                ].map((row) => (
                    <g key={row.y} style={{ opacity: active || !row.done ? 0.9 : 0.4 }}>
                        <circle cx="48" cy={row.y} r="9" fill={row.done ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'} stroke={row.done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
                        {row.done && <path d={`M ${48 - 4},${row.y} l3 3 5-5`} stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />}
                        <rect x="66" y={row.y - 6} width={active ? 160 : 100} height="12" rx="4" fill={row.done ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'} style={{ transition: 'width 0.6s ease' }} />
                        <text x="70" y={row.y + 4} fill={row.done ? '#FFFFFF' : '#71717A'} fontSize="9" fontWeight="500">{row.label}</text>
                    </g>
                ))}
            </svg>
        ),
    },
    {
        number: '02',
        title: 'System Setup',
        description: 'We design and implement your entire accounting infrastructure — Chart of Accounts, software configuration, document workflows, automation rules, and team onboarding. Everything built for your business, not a template.',
        visual: (active: boolean) => (
            <svg width="100%" height="100%" viewBox="0 0 340 220" fill="none">
                <rect x="20" y="20" width="300" height="180" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <rect x="130" y="38" width="80" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="170" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">Chart of Accounts</text>
                <line x1="170" y1="70" x2="80" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="170" y1="70" x2="170" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="170" y1="70" x2="260" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {[
                    { x: 40, label: 'Banking' },
                    { x: 130, label: 'Payroll' },
                    { x: 220, label: 'Tax' },
                ].map(n => (
                    <g key={n.label}>
                        <rect x={n.x} y={100} width="70" height="28" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <text x={n.x + 35} y={118} textAnchor="middle" fill="#A1A1AA" fontSize="8">{n.label}</text>
                    </g>
                ))}
                <rect x="40" y="148" width="260" height="36" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="58" cy="166" r="5" fill="rgba(255,255,255,0.2)" />
                <circle cx="58" cy="166" r="3" fill="#FFFFFF" />
                <text x="70" y="170" fill="#FFFFFF" fontSize="9" fontWeight="600">System ready for Go-Live</text>
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Live Operations',
        description: 'Your financial operations run on autopilot. Monthly bookkeeping, timely GST and TDS filings, payroll processing, vendor reconciliation, and MIS reports — delivered on schedule, every time, with 99.7% accuracy.',
        visual: (active: boolean) => (
            <svg width="100%" height="100%" viewBox="0 0 340 220" fill="none">
                <rect x="20" y="20" width="300" height="180" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {['Apr', 'May', 'Jun', 'Jul'].map((m, mi) => {
                    const x = 34 + mi * 72;
                    const done = mi < (active ? 3 : 1);
                    return (
                        <g key={m}>
                            <rect x={x} y="36" width="60" height="70" rx="10" fill={done ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'} stroke={done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)'} strokeWidth="1" />
                            <text x={x + 30} y="54" textAnchor="middle" fill={done ? '#FFFFFF' : '#52525B'} fontSize="9" fontWeight="700">{m}</text>
                            {done && <path d={`M ${x + 18},75 l8 8 14-14`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />}
                            {!done && <text x={x + 30} y="80" textAnchor="middle" fill="#52525B" fontSize="18">·</text>}
                        </g>
                    );
                })}
                {[
                    { label: 'Bookkeeping Updated', t: '2d ago' },
                    { label: 'GST GSTR-3B Filed', t: '12d ago' },
                    { label: 'Payroll Processed', t: 'Today' },
                    { label: 'TDS Return Pending', t: 'Due 30 Apr' },
                ].map((row, ri) => (
                    <g key={ri}>
                        <circle cx="38" cy={128 + ri * 20} r="4" fill="#FFFFFF" opacity={ri === 3 ? 0.3 : 0.8} />
                        <text x="50" y={133 + ri * 20} fill="#A1A1AA" fontSize="8.5">{row.label}</text>
                        <text x="300" y={133 + ri * 20} textAnchor="end" fill={ri === 3 ? '#A1A1AA' : '#FFFFFF'} fontSize="8" fontWeight="600">{row.t}</text>
                    </g>
                ))}
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Optimization',
        description: 'Quarterly reviews, strategic tax planning, financial forecasting, and business advisory. As your business grows, we proactively optimize your systems, identify savings opportunities, and provide the financial intelligence needed to make bold decisions.',
        visual: (active: boolean) => (
            <svg width="100%" height="100%" viewBox="0 0 340 220" fill="none">
                <defs>
                    <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <rect x="20" y="20" width="300" height="180" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <path d="M40,160 C80,140 100,120 140,100 C180,80 210,55 300,30 L300,170 L40,170 Z" fill="url(#optGrad)" />
                <path d="M40,160 C80,140 100,120 140,100 C180,80 210,55 300,30" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
                {[[40, 160], [140, 100], [220, 58], [300, 30]].map(([x, y], i) => (
                    <g key={i}>
                        <circle cx={x} cy={y} r="5" fill="#FFFFFF" opacity={active ? 1 : 0.3} />
                        <circle cx={x} cy={y} r="9" fill="#FFFFFF" opacity="0.1" />
                    </g>
                ))}
                {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => (
                    <text key={q} x={40 + i * 87} y="185" textAnchor="middle" fill="#71717A" fontSize="8">{q}</text>
                ))}
                <rect x="220" y="32" width="90" height="34" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <text x="265" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">₹8.2M</text>
                <text x="265" y="60" textAnchor="middle" fill="#A1A1AA" fontSize="7">Projected ARR</text>
            </svg>
        ),
    }
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lineProgress, setLineProgress] = useState(0);

    const calculateProgress = useCallback((progress: number) => {
        const segSize = 1 / steps.length;
        const newActiveIndex = Math.min(steps.length - 1, Math.floor(progress / segSize));
        const segmentProgress = Math.max(0, Math.min(1, (progress - newActiveIndex * segSize) / segSize));
        return { newActiveIndex, segmentProgress };
    }, []);

    useEffect(() => {
        let rafId: number;
        let cleanup: (() => void) | undefined;

        async function init() {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            if (!containerRef.current) return;

            const st = ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top 10px',
                end: () => `+=${steps.length * window.innerHeight * 0.8}`,
                pin: true,
                pinSpacing: true,
                scrub: 0,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame(() => {
                        const { newActiveIndex, segmentProgress } = calculateProgress(self.progress);
                        setActiveIndex(newActiveIndex);
                        setLineProgress(segmentProgress);
                    });
                },
            });

            cleanup = () => {
                if (rafId) cancelAnimationFrame(rafId);
                st.kill();
            };
        }

        init();
        return () => { cleanup?.(); };
    }, [calculateProgress]);

    const activeVisual = steps[activeIndex];

    return (
        <section style={{ background: '#F9FAFB', padding: '0 0 0 5px' }}>
            <div
                id="process"
                ref={containerRef}
                style={{
                    height: 'calc(100vh - 10px)',
                    width: '100%',
                    background: '#111111',
                    borderRadius: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0 -20px 40px rgba(0,0,0,0.05)',

                }}
            >
                <div style={{
                    width: '100%',
                    maxWidth: '1300px',
                    margin: '0 auto',
                    padding: '0 8%',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ marginBottom: '60px', paddingTop: '40px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                            fontWeight: 500,
                            color: '#FFFFFF',
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            margin: 0
                        }}>
                            A Transparent, <br />
                            <span style={{ color: '#71717A' }}>Efficiency-Driven System</span>
                        </h2>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '600px' }}>
                            {steps.map((step, index) => {
                                const isActive = index === activeIndex;
                                const isPast = index < activeIndex;

                                return (
                                    <div key={step.number} style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '80px',
                                            flexShrink: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '6px'
                                        }}>
                                            <div style={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                fontFamily: 'Inter, sans-serif',
                                                color: isActive || isPast ? '#FFFFFF' : '#3F3F46',
                                                transition: 'color 0.4s ease',
                                            }}>
                                                {step.number}
                                            </div>

                                            <div style={{
                                                maxHeight: isActive ? '180px' : '0px',
                                                opacity: isActive ? 1 : 0,
                                                overflow: 'hidden',
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}>
                                                <div style={{
                                                    width: '2px',
                                                    height: '110px',
                                                    background: '#27272A',
                                                    borderRadius: '2px',
                                                    marginLeft: '8px',
                                                    marginTop: '16px',
                                                    marginBottom: '16px',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0, left: 0,
                                                        width: '100%',
                                                        height: `${lineProgress * 100}%`,
                                                        background: '#FFFFFF',
                                                        willChange: 'transform, height',
                                                    }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            flex: 1,
                                            paddingBottom: isActive ? '0px' : '32px'
                                        }}>
                                            <h3 style={{
                                                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                                                fontWeight: 500,
                                                color: isActive ? '#FFFFFF' : isPast ? '#FFFFFF' : '#52525B',
                                                margin: '0 0 12px 0',
                                                transition: 'color 0.4s ease',
                                                lineHeight: 1.2,
                                                letterSpacing: '-0.02em',
                                            }}>
                                                {step.title}
                                            </h3>

                                            <div style={{
                                                maxHeight: isActive ? '300px' : '0px',
                                                opacity: isActive ? 1 : 0,
                                                transform: isActive ? 'translateY(0)' : 'translateY(-10px)',
                                                overflow: 'hidden',
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}>
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    lineHeight: 1.6,
                                                    color: '#A1A1AA',
                                                    margin: 0,
                                                    paddingBottom: '24px',
                                                    fontWeight: 300,
                                                    maxWidth: '500px'
                                                }}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{
                            width: '450px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            opacity: 1,
                            transition: 'all 0.6s ease'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '320px',
                                borderRadius: '24px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                overflow: 'hidden',
                                marginLeft: '20%',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px'
                            }}>
                                {activeVisual && activeVisual.visual(true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
