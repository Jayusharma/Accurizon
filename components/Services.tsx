'use client';
import { useEffect, useRef, useState } from 'react';

/* ─── Keyframe injection ─── */
const STYLES = `
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
@keyframes bar-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes fade-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
`;

/* ─── Service data ─── */
const services = [
    {
        number: '01',
        title: 'Accounting System Setup',
        tagline: 'Build your financial backbone — right from day one.',
        desc: 'We architect a complete accounting infrastructure tailored to your business. Chart of Accounts, software configuration, automation workflows, and month-end close processes.',
        features: ['Chart of Accounts Design', 'Tally / Zoho / QuickBooks Setup', 'Automated Bank Reconciliation', 'Month-End Close Automation'],
        widgetType: 'setup',
    },
    {
        number: '02',
        title: 'Financial Operations',
        tagline: 'The daily engine that keeps your cash machine running.',
        desc: 'Day-to-day financial management with zero friction. Accounts payable & receivable, invoice processing, payroll management, and real-time cash flow monitoring.',
        features: ['Accounts Payable & Receivable', 'Invoice Processing & Tracking', 'Payroll Management', 'Cash Flow Monitoring'],
        widgetType: 'cashflow',
    },
    {
        number: '03',
        title: 'Compliance & Tax',
        tagline: 'Zero penalties. Zero surprises. Total peace of mind.',
        desc: 'End-to-end tax and regulatory management — GST filing, TDS compliance, advance tax planning, ROC filings, income tax returns, and all government compliance.',
        features: ['GST Filing (Monthly & Quarterly)', 'TDS Compliance & Returns', 'Income Tax Return Filing', 'ROC & MCA Compliance'],
        widgetType: 'compliance',
    },
    {
        number: '04',
        title: 'Back Office Support',
        tagline: 'Strategic intelligence. Delivered on demand.',
        desc: 'Beyond bookkeeping — comprehensive financial intelligence. MIS reporting, management dashboards, budgeting & forecasting, financial analysis, audit support.',
        features: ['MIS Reporting & Dashboards', 'Budgeting & Forecasting', 'Audit Preparation & Support', 'Financial Analysis & Advisory'],
        widgetType: 'mis',
    },
];

const GOLD = '#C8A96E';
const GOLD_DIM = 'rgba(200,169,110,0.15)';
const GLASS_BG = 'rgba(255,255,255,0.04)';
const GLASS_BORDER = '1px solid rgba(255,255,255,0.08)';

/* ─── Widgets ─── */
function SetupWidget({ active }: { active: boolean }) {
    const steps = [
        { label: 'Chart of Accounts', pct: 100 },
        { label: 'Software Config', pct: 100 },
        { label: 'Bank Reconciliation', pct: 88 },
        { label: 'Automation Flows', pct: 72 },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Setup Progress</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Q1 2025</span>
            </div>
            {steps.map((s, i) => (
                <div key={i} style={{ opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(8px)', transition: `all 0.5s ease ${i * 0.1}s` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                        <span style={{ fontSize: '0.72rem', color: s.pct === 100 ? GOLD : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: active ? `${s.pct}%` : '0%', background: s.pct === 100 ? GOLD : 'rgba(200,169,110,0.5)', borderRadius: '99px', transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s` }} />
                    </div>
                </div>
            ))}
            <div style={{ marginTop: '14px', padding: '10px 14px', background: GOLD_DIM, borderRadius: '10px', border: `1px solid rgba(200,169,110,0.2)`, display: 'flex', justifyContent: 'space-between' }}>
                <div><div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginBottom: '3px' }}>Avg. Setup Time</div><div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>4.2 days</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginBottom: '3px' }}>Accuracy</div><div style={{ fontSize: '1rem', fontWeight: 600, color: GOLD }}>99.8%</div></div>
            </div>
        </div>
    );
}

function CashflowWidget({ active }: { active: boolean }) {
    const bars = [42, 68, 55, 80, 63, 91, 74];
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start: number;
        const run = (t: number) => { if (!start) start = t; const p = Math.min((t - start) / 1500, 1); setCount(Math.floor(p * 12480)); if (p < 1) requestAnimationFrame(run); };
        requestAnimationFrame(run);
    }, [active]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Cash Flow</span>
                <span style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>7 months</span>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.03em' }}>₹{count.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Net inflow this quarter</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '6px' }}>
                {bars.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '100%', position: 'relative', height: '80px', display: 'flex', alignItems: 'flex-end' }}>
                            <div style={{ width: '100%', height: active ? `${h}%` : '0%', background: i === 6 ? GOLD : 'rgba(200,169,110,0.25)', borderRadius: '4px 4px 0 0', transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s` }} />
                        </div>
                        <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)' }}>{months[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ComplianceWidget({ active }: { active: boolean }) {
    const items = [
        { label: 'GST Returns', status: 'Filed', count: '12/12', ok: true },
        { label: 'TDS Payments', status: 'On Time', count: '4/4', ok: true },
        { label: 'Income Tax', status: 'Filed', count: '1/1', ok: true },
        { label: 'ROC Filings', status: 'Pending', count: '0/1', ok: false },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Compliance Tracker</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>FY 2024–25</span>
            </div>
            {items.map((it, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: GLASS_BG, borderRadius: '10px', border: GLASS_BORDER, opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(8px)', transition: `all 0.5s ease ${i * 0.1}s` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: it.ok ? GOLD : 'rgba(255,255,255,0.2)', animation: it.ok ? 'pulse-dot 2s ease-in-out infinite' : 'none', animationDelay: `${i * 0.4}s` }} />
                        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>{it.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>{it.count}</span>
                        <span style={{ fontSize: '0.65rem', color: it.ok ? GOLD : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{it.status}</span>
                    </div>
                </div>
            ))}
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, padding: '10px', background: GOLD_DIM, borderRadius: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: GOLD }}>₹0</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Penalties</div>
                </div>
                <div style={{ flex: 1, padding: '10px', background: GLASS_BG, borderRadius: '10px', border: GLASS_BORDER, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>100%</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>On-time Rate</div>
                </div>
            </div>
        </div>
    );
}

function MISWidget({ active }: { active: boolean }) {
    const metrics = [
        { label: 'Revenue', value: '₹84.2L', change: '+12.4%', up: true },
        { label: 'Expenses', value: '₹31.6L', change: '-3.1%', up: false },
        { label: 'EBITDA', value: '₹52.6L', change: '+18.7%', up: true },
    ];
    const sparkline = [30, 45, 38, 60, 52, 74, 68, 88];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>MIS Dashboard</span>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>Apr 2025</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '48px', marginBottom: '4px' }}>
                {sparkline.map((h, i) => (
                    <div key={i} style={{ flex: 1, height: active ? `${h}%` : '0%', background: i === sparkline.length - 1 ? GOLD : `rgba(200,169,110,${0.15 + i * 0.04})`, borderRadius: '3px 3px 0 0', transition: `height 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s` }} />
                ))}
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '4px' }} />
            {metrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: GLASS_BG, borderRadius: '9px', border: GLASS_BORDER, opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(6px)', transition: `all 0.5s ease ${0.2 + i * 0.1}s` }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{m.value}</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: m.up ? GOLD : 'rgba(255,255,255,0.35)' }}>{m.change}</span>
                </div>
            ))}
        </div>
    );
}

/* ─── Card ─── */
function ServiceCard({ service: s, index }: { service: typeof services[0]; index: number }) {
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    const widget = s.widgetType === 'setup' ? <SetupWidget active={active} />
        : s.widgetType === 'cashflow' ? <CashflowWidget active={active} />
        : s.widgetType === 'compliance' ? <ComplianceWidget active={active} />
        : <MISWidget active={active} />;

    return (
        <div
            ref={ref}
            style={{
                width: '860px', height: '520px', flexShrink: 0,
                borderRadius: '22px',
                background: 'linear-gradient(145deg, #1c1c1c 0%, #141414 100%)',
                padding: '40px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
            }}
        >
            {/* Watermark number */}
            <div style={{ position: 'absolute', top: '-8%', right: '-2%', fontSize: '50vh', fontWeight: 800, color: 'rgba(255,255,255,0.018)', lineHeight: 1, pointerEvents: 'none', letterSpacing: '-0.05em' }}>{s.number}</div>

            {/* Gold top-edge accent line */}
            <div style={{ position: 'absolute', top: 0, left: '10%', width: '30%', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

            {/* LEFT — text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                        <span style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Phase {s.number}</span>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GOLD, animation: 'pulse-dot 2.5s ease-in-out infinite', animationDelay: `${index * 0.3}s` }} />
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: '0' }}>{s.tagline}</p>
                </div>

                <div>
                    <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, marginBottom: '24px' }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {s.features.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD, opacity: 0.7, flexShrink: 0 }} />
                                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT — glassmorphic data widget */}
            <div style={{
                position: 'relative', zIndex: 1,
                background: '#242424',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '22px',
                display: 'flex', flexDirection: 'column',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px rgba(200,169,110,0.04)`,
                overflow: 'hidden',
                transform: 'translateZ(0)',
            }}>
                {/* inner subtle gold glow */}
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '160px', height: '160px', background: `radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
                {widget}
            </div>

            {/* Bottom gradient fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(10,10,10,0.4), transparent)', pointerEvents: 'none', borderRadius: '0 0 22px 22px' }} />
        </div>
    );
}

/* ─── Main ─── */
export default function Services() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = STYLES;
        document.head.appendChild(styleEl);
        return () => { document.head.removeChild(styleEl); };
    }, []);

    useEffect(() => {
        async function init() {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const wrapper = wrapperRef.current;
            const track = trackRef.current;
            if (!wrapper || !track) return;

            const PADDING_RIGHT = 60;
            const getTotal = () => track.scrollWidth - PADDING_RIGHT - window.innerWidth;

            // Set the outer wrapper tall enough to accommodate the full horizontal scroll
            const updateHeight = () => {
                wrapper.style.height = `calc(${getTotal()}px + 100vh)`;
            };

            // Promote track to GPU layer
            gsap.set(track, { force3D: true, z: 0 });

            // Wait one frame for layout, then measure and set up
            requestAnimationFrame(() => {
                updateHeight();
                ScrollTrigger.refresh();

                // GSAP only drives the x — CSS sticky handles the pinning (no jump)
                const st = ScrollTrigger.create({
                    trigger: wrapper,
                    start: 'top top',
                    end: () => `+=${getTotal()}`,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        gsap.set(track, { x: -getTotal() * self.progress });
                    },
                });

                const onResize = () => { updateHeight(); ScrollTrigger.refresh(); };
                window.addEventListener('resize', onResize);

                // Return cleanup inside rAF scope via a module-level ref trick
                (wrapper as any).__cleanup = () => {
                    st.kill();
                    window.removeEventListener('resize', onResize);
                };
            });
        }

        init();
        return () => {
            const wrapper = wrapperRef.current;
            if (wrapper && (wrapper as any).__cleanup) (wrapper as any).__cleanup();
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            });
        };
    }, []);

    return (
        // Outer wrapper: tall enough for the full horizontal scroll distance
        <div ref={wrapperRef} id="services" style={{ position: 'relative' }}>
            {/* Inner sticky container: browser handles "pin" natively — zero jump */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    background: '#F9FAFB',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '40px 60px 0', zIndex: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <div className="text-label" style={{ color: '#0A1628', marginBottom: '8px' }}>Our Playbook</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 500, color: '#0A1628', letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>The Engine of Scale</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748B', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '4px' }}>
                        <span>Scroll to explore</span>
                        <svg width="28" height="16" viewBox="0 0 28 16" fill="none"><path d="M0 8h24M18 2l6 6-6 6" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </div>

                {/* Track */}
                <div
                    ref={trackRef}
                    style={{ display: 'flex', alignItems: 'center', height: '100vh', paddingTop: '110px', paddingBottom: '24px', paddingLeft: '60px', paddingRight: '60px', gap: '20px', width: 'max-content', willChange: 'transform', transform: 'translateZ(0)' }}
                >
                    {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
                </div>
            </div>
        </div>
    );
}

