'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const PROCESS_STYLES = `
@keyframes shape-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes slow-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes ccw-spin    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes scan-sweep  { from{transform:rotate(-20deg)} to{transform:rotate(340deg)} }
@keyframes line-in     { from{stroke-dashoffset:160} to{stroke-dashoffset:0} }
@keyframes node-in     { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
@keyframes live-blink  { 0%,49%{opacity:1} 50%,100%{opacity:0.2} }
@keyframes orbit-1     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes orbit-2     { from{transform:rotate(120deg)} to{transform:rotate(480deg)} }
@keyframes orbit-3     { from{transform:rotate(240deg)} to{transform:rotate(600deg)} }
@keyframes num-pulse   { 0%,100%{opacity:1} 50%{opacity:0.55} }
`;

const GOLD = 'rgba(59,130,246,';

const steps = [
    {
        number: '01',
        title: 'Free Audit',
        description: 'We conduct a comprehensive review of your existing financial records, systems, and processes — identifying gaps, risks, and inefficiencies. A full picture, no cost, no commitment.',
        visual: () => (
            <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none" overflow="visible">
                {Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>(
                    <circle key={`${r}-${c}`} cx={20+c*44} cy={20+r*44} r="1" fill="rgba(255,255,255,0.05)" />
                )))}
                <g style={{transformOrigin:'130px 130px', animation:'slow-spin 22s linear infinite'}}>
                    <circle cx="130" cy="130" r="110" stroke={`${GOLD}0.28)`} strokeWidth="1" strokeDasharray="6 5" fill="none"/>
                </g>
                <g style={{transformOrigin:'130px 130px', animation:'ccw-spin 14s linear infinite'}}>
                    <circle cx="130" cy="130" r="88" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="2 8" fill="none"/>
                </g>
                <g style={{transformOrigin:'130px 130px', animation:'scan-sweep 3s linear infinite'}}>
                    <line x1="130" y1="130" x2="130" y2="44" stroke={`${GOLD}0.9)`} strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="130" cy="44" r="4" fill={`${GOLD}1)`}/>
                    {[5,10,15,20,25].map(a=>(
                        <line key={a} x1="130" y1="130" 
                            x2={Number((130+86*Math.sin(a*Math.PI/180)).toFixed(2))} 
                            y2={Number((130-86*Math.cos(a*Math.PI/180)).toFixed(2))}
                            stroke={`${GOLD}${(0.14-a*0.024).toFixed(2)})`} strokeWidth="1"/>
                    ))}
                </g>
                <circle cx="130" cy="130" r="22" fill="rgba(0,0,0,0.4)" stroke={`${GOLD}0.2)`} strokeWidth="1"/>
                <text x="130" y="126" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontWeight="700" letterSpacing="0.15em">SCANNING</text>
                <text x="130" y="138" textAnchor="middle" fill={`${GOLD}0.9)`} fontSize="8" fontWeight="800">AUDIT</text>
                {[
                    {label:'Bank Records',  angle:-60, done:true},
                    {label:'GST Returns',   angle:12,  done:true},
                    {label:'P&L Sheets',    angle:84,  done:false},
                    {label:'Vendor Data',   angle:156, done:false},
                    {label:'TDS History',   angle:228, done:false},
                ].map(({label,angle,done})=>{
                    const rad=(angle-90)*Math.PI/180;
                    const x=Number((130+100*Math.cos(rad)).toFixed(2));
                    const y=Number((130+100*Math.sin(rad)).toFixed(2));
                    return (
                        <g key={label}>
                            <circle cx={x} cy={y} r="17" fill={done?`${GOLD}0.12)`:'rgba(255,255,255,0.03)'} stroke={done?`${GOLD}0.4)`:'rgba(255,255,255,0.08)'} strokeWidth="1"/>
                            {done && <path d={`M${x-5},${y} l3.5 3.5 6-6`} stroke={`${GOLD}1)`} strokeWidth="1.5" strokeLinecap="round"/>}
                            {!done && <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.12)"/>}
                        </g>
                    );
                })}
            </svg>
        ),
    },
    {
        number: '02',
        title: 'System Setup',
        description: 'We design and implement your entire accounting infrastructure — Chart of Accounts, software configuration, automation rules, and team onboarding. Built for your business, not a template.',
        visual: () => (
            <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none">
                <circle cx="130" cy="110" r="26" fill={`${GOLD}0.12)`} stroke={`${GOLD}0.5)`} strokeWidth="1.5"/>
                <text x="130" y="106" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="6.5" fontWeight="800" letterSpacing="0.06em">CHART OF</text>
                <text x="130" y="118" textAnchor="middle" fill={`${GOLD}1)`} fontSize="6.5" fontWeight="800" letterSpacing="0.06em">ACCOUNTS</text>
                {[
                    {label:'Banking',   x:52,  y:52},
                    {label:'Payroll',   x:208, y:52},
                    {label:'Tax',       x:215, y:168},
                    {label:'Vendors',   x:45,  y:168},
                    {label:'Reporting', x:130, y:215},
                    {label:'Compliance',x:130, y:18},
                ].map(({label,x,y},i)=>{
                    const len=Math.sqrt((x-130)**2+(y-110)**2);
                    return (
                        <g key={label}>
                            <line x1="130" y1="110" x2={x} y2={y}
                                stroke={`${GOLD}0.22)`} strokeWidth="1"
                                strokeDasharray="160" strokeDashoffset="160"
                                style={{animation:`line-in 0.7s ${i*0.18}s ease forwards`}}/>
                            <circle cx={x} cy={y} r="21"
                                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
                                style={{opacity:0, transformOrigin:`${x}px ${y}px`, animation:`node-in 0.35s ${0.35+i*0.18}s ease forwards`}}/>
                            <text x={x} y={y+4} textAnchor="middle" fill={`${GOLD}0.8)`} fontSize="7" fontWeight="700"
                                style={{opacity:0, animation:`node-in 0.35s ${0.45+i*0.18}s ease forwards`}}>
                                {label}
                            </text>
                        </g>
                    );
                })}
                <rect x="88" y="232" width="84" height="20" rx="10" fill={`${GOLD}0.14)`} stroke={`${GOLD}0.3)`} strokeWidth="1"/>
                <text x="130" y="246" textAnchor="middle" fill={`${GOLD}1)`} fontSize="7.5" fontWeight="700" letterSpacing="0.1em">GO-LIVE READY</text>
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Live Operations',
        description: 'Your financial operations run on autopilot. Monthly bookkeeping, timely GST and TDS filings, payroll processing, and MIS reports — delivered on schedule, every time.',
        visual: () => (
            <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none">
                <circle cx="126" cy="32" r="5" fill="#4ADE80" style={{animation:'live-blink 1.2s ease-in-out infinite'}}/>
                <text x="138" y="37" fill="#4ADE80" fontSize="8" fontWeight="800" letterSpacing="0.12em" style={{animation:'live-blink 1.2s ease-in-out infinite'}}>LIVE</text>
                {/* TOP — Revenue */}
                <rect x="90" y="46" width="80" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                <text x="130" y="64" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="7" letterSpacing="0.1em">REVENUE</text>
                <text x="130" y="82" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="16" fontWeight="800">₹2.4M</text>
                <text x="130" y="95" textAnchor="middle" fill="#4ADE80" fontSize="7.5" fontWeight="600">↑ 18% MoM</text>
                {/* RIGHT — GST */}
                <rect x="168" y="103" width="74" height="54" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                <text x="205" y="121" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="7" letterSpacing="0.1em">GST</text>
                <text x="205" y="137" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="800">FILED</text>
                <circle cx="205" cy="148" r="5" fill="#4ADE80" style={{animation:'live-blink 1.8s ease-in-out infinite'}}/>
                {/* LEFT — TDS */}
                <rect x="18" y="103" width="74" height="54" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                <text x="55" y="121" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="7" letterSpacing="0.1em">TDS</text>
                <text x="55" y="137" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="800">ON-TIME</text>
                <circle cx="55" cy="148" r="5" fill="#4ADE80" style={{animation:'live-blink 2.4s ease-in-out infinite'}}/>
                {/* BOTTOM — Payroll */}
                <rect x="90" y="158" width="80" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>
                <text x="130" y="176" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="7" letterSpacing="0.1em">PAYROLL</text>
                <text x="130" y="195" textAnchor="middle" fill="#4ADE80" fontSize="18" fontWeight="800">✓</text>
                <text x="130" y="207" textAnchor="middle" fill={`${GOLD}0.8)`} fontSize="7" fontWeight="600">PROCESSED</text>
                {/* Center */}
                <circle cx="130" cy="130" r="10" fill={`${GOLD}0.18)`} stroke={`${GOLD}0.5)`} strokeWidth="1.5"/>
                <circle cx="130" cy="130" r="4" fill={`${GOLD}1)`} style={{animation:'num-pulse 2s ease-in-out infinite'}}/>
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Optimization',
        description: 'Quarterly reviews, strategic tax planning, financial forecasting, and business advisory. We proactively optimize your systems and identify savings opportunities.',
        visual: () => (
            <svg width="100%" height="100%" viewBox="0 0 260 260" fill="none">
                <circle cx="130" cy="130" r="104" stroke={`${GOLD}0.1)`} strokeWidth="1" strokeDasharray="3 7" fill="none"/>
                <g style={{transformOrigin:'130px 130px', animation:'orbit-1 20s linear infinite'}}>
                    <circle cx="234" cy="130" r="11" fill={`${GOLD}0.14)`} stroke={`${GOLD}0.45)`} strokeWidth="1"/>
                    <text x="234" y="134" textAnchor="middle" fill={`${GOLD}0.9)`} fontSize="6" fontWeight="700">TAX</text>
                </g>
                <circle cx="130" cy="130" r="70" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none"/>
                <g style={{transformOrigin:'130px 130px', animation:'orbit-2 13s linear infinite'}}>
                    <circle cx="200" cy="130" r="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
                    <text x="200" y="134" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="6" fontWeight="700">P&L</text>
                </g>
                <circle cx="130" cy="130" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none"/>
                <g style={{transformOrigin:'130px 130px', animation:'orbit-3 8s linear infinite'}}>
                    <circle cx="172" cy="130" r="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                    <text x="172" y="134" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="5.5" fontWeight="700">ROI</text>
                </g>
                <circle cx="130" cy="130" r="30" fill={`${GOLD}0.07)`} stroke={`${GOLD}0.28)`} strokeWidth="1.5"/>
                <circle cx="130" cy="130" r="18" fill={`${GOLD}0.12)`}/>
                <text x="130" y="127" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="11" fontWeight="900" style={{animation:'num-pulse 3s ease-in-out infinite'}}>₹8.2M</text>
                <text x="130" y="141" textAnchor="middle" fill={`${GOLD}0.65)`} fontSize="6" letterSpacing="0.08em">PROJECTED ARR</text>
                <text x="130" y="14" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="6.5" letterSpacing="0.14em">FORECAST HORIZON</text>
            </svg>
        ),
    },
];



// 16-point shapes — same vertex count for smooth CSS clip-path morphing
const STEP_SHAPES_16 = [
    // 01: Hexagon padded to 16 pts
    'polygon(30% 0%, 50% 0%, 70% 0%, 95% 25%, 100% 42%, 100% 60%, 75% 95%, 50% 100%, 25% 95%, 0% 60%, 0% 42%, 5% 25%, 30% 0%, 30% 0%, 30% 0%, 30% 0%)',
    // 02: Chamfered rectangle padded to 16 pts
    'polygon(10% 0%, 50% 0%, 90% 0%, 100% 10%, 100% 50%, 100% 90%, 90% 100%, 50% 100%, 10% 100%, 0% 90%, 0% 50%, 0% 10%, 10% 0%, 10% 0%, 10% 0%, 10% 0%)',
    // 03: Plus / Cross — 16 unique pts (most distinct shape in the series)
    'polygon(35% 0%, 50% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 50%, 100% 65%, 65% 65%, 65% 100%, 50% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 50%, 0% 35%, 35% 35%)',
    // 04: Perfect circle — 16 pts
    'polygon(50% 0%, 69% 5%, 85% 15%, 95% 30%, 100% 50%, 95% 70%, 85% 85%, 69% 95%, 50% 100%, 31% 95%, 15% 85%, 5% 70%, 0% 50%, 5% 30%, 15% 15%, 31% 5%)',
];



/* ── Shape panel ── */
function MorphingPanel({ activeIndex, lineProgress }: { activeIndex: number; lineProgress: number }) {
    const [displayIndex, setDisplayIndex] = useState(activeIndex);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (activeIndex === displayIndex) return;
        setFading(true);
        const t = setTimeout(() => { setDisplayIndex(activeIndex); setFading(false); }, 320);
        return () => clearTimeout(t);
    }, [activeIndex]);

    return (
        <div style={{
            position: 'relative', width: '400px', height: '400px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // transform: 'translate(-2vw, -6vh)' // Shifted up and left
        }}>
            {/* Ambient deep space glow behind the shape */}
            <div style={{
                position: 'absolute', width: '280px', height: '280px',
                background: 'rgba(255,255,255,0.06)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                animation: 'shape-float 8s ease-in-out infinite reverse'
            }} />

            {/* The shape — clip-path changes per step, CSS transitions it smoothly */}
            <div style={{
                width: '320px', height: '320px',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
                clipPath: STEP_SHAPES_16[activeIndex],
                transition: 'clip-path 1.2s cubic-bezier(0.8, 0, 0.2, 1)',
                animation: 'shape-float 6s ease-in-out infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 0 60px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}>
                {/* Simulated specular highlight (inner top reflection) */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%)',
                    pointerEvents: 'none',
                }} />

                {/* Ghost step number */}
                <div style={{
                    position: 'absolute',
                    fontSize: '150px', fontWeight: 900,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1, userSelect: 'none',
                    letterSpacing: '-0.06em',
                }}>
                    {steps[displayIndex].number}
                </div>

                {/* SVG visual — fades between steps */}
                <div style={{
                    width: '84%', height: '84%',
                    opacity: fading ? 0 : 1,
                    transform: fading ? 'scale(0.85) rotate(-4deg)' : 'scale(1) rotate(0deg)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative', zIndex: 1,
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.3))', // Glowing data visuals
                }}>
                    {steps[displayIndex].visual()}
                </div>

                {/* Progress scan overlay */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: `${lineProgress * 100}%`,
                    background: 'linear-gradient(to top, rgba(255,255,255,0.05), transparent)',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Step label pill */}
            <div style={{
                position: 'absolute', bottom: '-10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '99px', padding: '6px 18px',
                display: 'flex', alignItems: 'center', gap: '8px',
                backdropFilter: 'blur(8px)',
            }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {steps[displayIndex].title}
                </span>
            </div>
        </div>
    );
}


/* ── Main ── */
export default function Process() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lineProgress, setLineProgress] = useState(0);

    // Inject keyframes
    useEffect(() => {
        const el = document.createElement('style');
        el.textContent = PROCESS_STYLES;
        document.head.appendChild(el);
        return () => { document.head.removeChild(el); };
    }, []);



    const calculateProgress = useCallback((progress: number) => {
        const segSize = 1 / steps.length;
        const newActiveIndex = Math.min(steps.length - 1, Math.floor(progress / segSize));
        const segmentProgress = Math.max(0, Math.min(1, (progress - newActiveIndex * segSize) / segSize));
        return { newActiveIndex, segmentProgress };
    }, []);

    useEffect(() => {
        async function init() {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const STEPS_SCROLL = steps.length * window.innerHeight * 0.85;
            // outer wrapper height = 1 viewport (slide-up scroll) + steps scroll
            wrapper.style.height = `calc(${STEPS_SCROLL}px + 100vh)`;

            let rafId: number;

            // Phase 1: card slides UP from below the screen (pure Y, no opacity change)
            gsap.fromTo(cardRef.current,
                { y: '100%' },
                {
                    y: '0%', ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top bottom',   // wrapper bottom enters viewport
                        end: 'top top',        // wrapper top reaches viewport top
                        scrub: 1.2,
                    },
                }
            );

            // Phase 2: step progression (CSS sticky handles pin — no jump)
            const st = ScrollTrigger.create({
                trigger: wrapper,
                start: 'top top',
                end: () => `+=${STEPS_SCROLL}`,
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

            const onResize = () => {
                const S = steps.length * window.innerHeight * 0.85;
                wrapper.style.height = `calc(${S}px + 100vh)`;
                ScrollTrigger.refresh();
            };
            window.addEventListener('resize', onResize);

            return () => {
                if (rafId) cancelAnimationFrame(rafId);
                st.kill();
                window.removeEventListener('resize', onResize);
            };
        }

        const p = init();
        return () => { p.then(fn => fn && fn()); };
    }, [calculateProgress]);

    return (
        <section style={{ background: '#F9FAFB', padding: 0 }}>
            {/* Outer wrapper: tall enough for slide-up + steps scroll */}
            <div ref={wrapperRef} style={{ position: 'relative' }}>
                {/* CSS sticky — browser handles pin, zero jump */}
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
                    {/* The dark card */}
                    <div
                        ref={cardRef}
                        id="process"
                        style={{
                            position: 'absolute', inset: 0,
                            background: '#111111',
                            borderRadius: 0,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 -20px 60px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div style={{
                            width: '100%', height: '100%',
                            padding: '10vh 5vw 8vh 5vw',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            {/* Heading */}
                            <div>
                                <h2 className="font-mont" style={{
                                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                                    fontWeight: 600, color: '#FFFFFF',
                                    lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0,
                                    textTransform: 'uppercase',
                                }}>
                                    A Transparent,<br />
                                    <span style={{ color: '#52525B' }}>Efficiency-Driven System</span>
                                </h2>
                            </div>

                            {/* Steps + Blob */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
                                {/* LEFT — step list */}
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: '600px' }}>
                                    {steps.map((step, index) => {
                                        const isActive = index === activeIndex;
                                        const isPast = index < activeIndex;
                                        return (
                                            <div key={step.number} style={{ display: 'flex', alignItems: 'flex-start', gap: '4vw' }}>
                                                {/* Number + line */}
                                                <div style={{ width: '40px', flexShrink: 0, display: 'flex', flexDirection: 'column', marginTop: '4px', alignItems: 'center' }}>
                                                    <div style={{
                                                        fontSize: '1rem', fontWeight: 600,
                                                        color: isActive || isPast ? '#FFFFFF' : '#3F3F46',
                                                        transition: 'color 0.4s ease',
                                                    }}>
                                                        {step.number}
                                                    </div>
                                                    <div style={{
                                                        maxHeight: isActive ? '160px' : '0px',
                                                        opacity: isActive ? 1 : 0,
                                                        overflow: 'hidden',
                                                        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                                                    }}>
                                                        <div style={{
                                                            width: '2px', height: '100px',
                                                            background: '#27272A', borderRadius: '2px',
                                                            marginTop: '14px', marginBottom: '14px',
                                                            position: 'relative', overflow: 'hidden',
                                                        }}>
                                                            <div style={{
                                                                position: 'absolute', top: 0, left: 0,
                                                                width: '100%', height: `${lineProgress * 100}%`,
                                                                background: '#FFFFFF', willChange: 'height',
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Text */}
                                                <div style={{ flex: 1, paddingBottom: isActive ? '0' : '28px' }}>
                                                    <h3 className="font-rethink-semi" style={{
                                                        fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                                                        fontWeight: 500,
                                                        color: isActive ? '#FFFFFF' : isPast ? '#FFFFFF' : '#52525B',
                                                        margin: '0 0 10px 0',
                                                        transition: 'color 0.4s ease',
                                                        lineHeight: 1.2, letterSpacing: '-0.02em',
                                                    }}>
                                                        {step.title}
                                                    </h3>
                                                    <div style={{
                                                        maxHeight: isActive ? '200px' : '0px',
                                                        opacity: isActive ? 1 : 0,
                                                        transform: isActive ? 'translateY(0)' : 'translateY(-8px)',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                                                    }}>
                                                        <p style={{
                                                            fontSize: '0.98rem', lineHeight: 1.65,
                                                            color: '#A1A1AA', margin: 0,
                                                            paddingBottom: '20px', fontWeight: 300,
                                                            maxWidth: '460px',
                                                        }}>
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* RIGHT — morphing blob */}
                                <MorphingPanel activeIndex={activeIndex} lineProgress={lineProgress} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
