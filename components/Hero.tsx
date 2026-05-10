'use client';

import { useEffect, useState } from 'react';
import { 
    Search, LayoutDashboard, PieChart, Bookmark, Target, FileText, 
    ChevronDown, ChevronUp, User, Calendar, Settings, ArrowUpRight, ArrowDownRight,
    TrendingUp, Activity, CheckCircle, Zap
} from 'lucide-react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [balance, setBalance] = useState(340000.00); // Starting number for animation

    useEffect(() => {
        setMounted(true);
        
        // Number counting animation
        let start: number | null = null;
        const duration = 2000;
        const finalValue = 345398.34;
        const initialValue = 340000.00;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setBalance(initialValue + (finalValue - initialValue) * easeProgress);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, []);

    if (!mounted) return null;

    return (
        <section
            style={{
                position: 'relative',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                background: '#F9FAFB',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '80px',
            }}
        >
            {/* Header Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '2vh', marginBottom: '20px', maxWidth: '800px', flexShrink: 0 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: '10px', textTransform: 'uppercase' }}>
                    FINANCE REIMAGINED
                </div>
        <h1  style={{ fontSize: '3.6rem', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '30px' }}>
                    <span className="font-mont"style={{ color: '#9CA3AF' }}>A New Standard</span><br />
                    <span className="font-rethink-semi" style={{ color: '#111827' }}>in Wealth Management</span>
                </h1>
                {/* <p style={{ fontSize: '0.9rem', color: '#9CA3AF', maxWidth: '460px', margin: '0 auto', lineHeight: 1.4, fontWeight: 400 }}>
                    Take full control of your assets with a unified platform for investing, tracking, and growing your portfolio in real time.
                </p> */}
            </div>

            {/* Dashboard Container */}
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                width: '100%', 
                flex: '1 1 auto', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-start',
                paddingBottom: '48px',
            }}>
                {/* Scale wrapper — fits full dashboard at 85-90% of remaining height */}
                <div style={{ 
                    position: 'relative', 
                    width: '940px', 
                    height: '560px',
                    transform: 'scale(var(--dash-scale, 1))',
                    transformOrigin: 'top center',
                }}
                ref={(el) => {
                    if (!el) return;
                    const updateScale = () => {
                        // Available height = viewport - navbar(80px) - header(~145px) - scroll-indicator(48px)
                        const availH = window.innerHeight - 80 - 145 - 48;
                        // Available width = viewport with some side padding
                        const availW = window.innerWidth * 0.92;
                        const scaleH = availH / 560;
                        const scaleW = availW / 940;
                        const scale = Math.min(scaleH, scaleW, 1);
                        el.style.setProperty('--dash-scale', String(scale));
                        el.style.transform = `scale(${scale})`;
                    };
                    updateScale();
                    window.addEventListener('resize', updateScale);
                }}
                >
                    
                    {/* --- MAIN DASHBOARD (Exact 1:1 Replica) --- */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            boxShadow: '0 40px 80px -12px rgba(0,0,0,0.15), 0 20px 40px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
                            display: 'flex',
                            overflow: 'hidden',
                            position: 'relative',
                            zIndex: 10,
                        }}
                    >
                        {/* Sidebar (Dark Translucent Look) */}
                        <div style={{ 
                            width: '220px', 
                            background: 'linear-gradient(160deg, rgba(70,70,75,0.95), rgba(40,40,45,0.98))', 
                            color: '#FFFFFF',
                            padding: '24px 16px', 
                            display: 'flex', 
                            flexDirection: 'column',
                            boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingLeft: '8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#111827' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFF', lineHeight: 1.2 }}>Analitica</div>
                                    <div style={{ fontSize: '0.6rem', color: '#9CA3AF' }}>Top Making Assets</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '24px' }}>
                                <Search size={14} color="#9CA3AF" />
                                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', flex: 1, fontWeight: 500 }}>SEARCH</span>
                                <div style={{ fontSize: '0.55rem', color: '#9CA3AF', background: 'rgba(0,0,0,0.2)', padding: '2px 4px', borderRadius: '4px' }}>ctrl / k</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <LayoutDashboard size={14} color="#FFF" />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#FFF' }}>Dashboard</span>
                                    </div>
                                    <span style={{ fontSize: '0.65rem', color: '#FFF', fontWeight: 600 }}>2</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px' }}>
                                    <PieChart size={14} color="#9CA3AF" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#9CA3AF' }}>Analytics Subsections</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px' }}>
                                    <Bookmark size={14} color="#9CA3AF" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#9CA3AF' }}>Saves List</span>
                                </div>
                                
                                <div style={{ marginTop: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Target size={14} color="#FFF" />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#FFF' }}>Goals</span>
                                        </div>
                                        <ChevronUp size={14} color="#9CA3AF" />
                                    </div>
                                    <div style={{ paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Monthly Targets</div>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Quarterly Goals</div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: '#FFF', fontWeight: 500, marginBottom: '6px' }}>
                                                Yearly Projections <ChevronUp size={12} color="#9CA3AF" />
                                            </div>
                                            <div style={{ paddingLeft: '8px', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                <div style={{ fontSize: '0.65rem', color: '#9CA3AF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    Annual Revenue <span style={{ fontSize: '0.55rem', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px', color: '#FFF' }}>4</span>
                                                </div>
                                                <div style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>Company Growth</div>
                                                <div style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>Innovative Projects</div>
                                                <div style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>Strategic Initiatives</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FileText size={14} color="#9CA3AF" />
                                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#9CA3AF' }}>My Reports</span>
                                        </div>
                                        <ChevronUp size={14} color="#9CA3AF" />
                                    </div>
                                    <div style={{ paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>New Reports</div>
                                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Previous Reports</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area (White) */}
                        <div style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E5E7EB', overflow: 'hidden' }}>
                                        <img src="https://i.pravatar.cc/100?img=33" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.55rem', color: '#6B7280' }}>@Ronald33</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827', lineHeight: 1 }}>Ronald Richards</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {/* Toggle switch mock */}
                                        <div style={{ width: '28px', height: '16px', background: '#111827', borderRadius: '8px', position: 'relative' }}>
                                            <div style={{ width: '12px', height: '12px', background: '#FFF', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
                                        </div>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 500, color: '#111827' }}>Timeframe</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', fontWeight: 600, color: '#111827', cursor: 'pointer' }}>
                                        Oct 1 - Nov 30, 2026 <ChevronDown size={12} color="#111827" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', fontWeight: 600, color: '#111827' }}>
                                        <Calendar size={12} color="#111827" /> Sat, 19 June
                                    </div>
                                    <Settings size={14} color="#111827" />
                                </div>
                            </div>

                            {/* Main Metrics Title */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: 600, color: '#6B7280', letterSpacing: '0.05em' }}>
                                    <Zap size={12} color="#6B7280" /> CAPITAL UNDER CONTROL
                                </div>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '0.65rem', fontWeight: 600, color: '#9CA3AF' }}>
                                    <span>H</span><span>D</span><span>W</span><span>M</span><span style={{ color: '#111827' }}>All</span>
                                </div>
                            </div>

                            {/* Main Metrics Values */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111827', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
                                        $ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <span style={{ background: '#DDF4C7', color: '#4D7C0F', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: '12px' }}>+9.8%</span>
                                        <span style={{ background: '#E5E7EB', color: '#4B5563', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: '12px' }}>$368,348.00</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.6rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    vs previous period $345,398.34 • fab-mar 2026 <ChevronDown size={10} />
                                </div>
                            </div>

                            {/* Crypto Cards row (Text based) */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', gap: '40px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>⟠</div>
                                        <div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>$28,500 <span style={{ fontSize: '0.6rem', color: '#9CA3AF', fontWeight: 400 }}>Ethereum</span></div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', background: '#111827', color: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>₿</div>
                                        <div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>$35,200 <span style={{ fontSize: '0.6rem', color: '#9CA3AF', fontWeight: 400 }}>Bitcoin</span></div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>₮</div>
                                        <div>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>$24,300 <span style={{ fontSize: '0.6rem', color: '#9CA3AF', fontWeight: 400 }}>Tether</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.55rem', fontWeight: 600, color: '#111827' }}>
                                    24h delta +2.48% <span style={{ color: '#9CA3AF', marginLeft: '4px' }}>14d return +6.8%</span>
                                </div>
                            </div>

                            {/* Massive Chart Area */}
                            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '16px' }}>
                                {/* Horizontal Grid Lines */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                                    <div style={{ borderTop: '1px dashed #E5E7EB', width: '100%' }} />
                                    <div style={{ borderTop: '1px dashed #E5E7EB', width: '100%' }} />
                                    <div style={{ borderTop: '1px dashed #E5E7EB', width: '100%' }} />
                                    <div style={{ borderTop: '1px dashed #111827', width: '100%' }} />
                                </div>
                                
                                {/* Vertical Bars */}
                                <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                                    {Array.from({ length: 120 }).map((_, i) => {
                                        // Create a wave pattern
                                        const height = 30 + Math.sin(i / 10) * 20 + Math.random() * 10;
                                        return (
                                            <div key={i} style={{ 
                                                flex: 1, 
                                                background: '#E5E7EB', 
                                                height: `${height}%`,
                                                transformOrigin: 'bottom',
                                                animation: `growUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                                animationDelay: `${i * 0.015}s`,
                                                transform: 'scaleY(0)', // Start hidden for animation
                                            }} />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom Table Area */}
                            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '0.55rem', color: '#9CA3AF', marginBottom: '8px' }}>
                                    <span>Monday, Dec 1 2025</span>
                                    <span>TUESDAY, DEC 1 2025</span>
                                    <span>Wednesday, Dec 2 2025</span>
                                    <span>FRIDAY, DEC 4 2025</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '0.65rem', fontWeight: 600, color: '#111827' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Position Entry</span> <span>$28.00</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9CA3AF' }}>Gross Fees</span> <span>$45.00</span></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Position Entry</span> <span>$6.00</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9CA3AF' }}>Gross Fees</span> <span>$67.00</span></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Position Entry</span> <span>$24.00</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9CA3AF' }}>Gross Fees</span> <span>$45.00</span></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Position Entry</span> <span>$6.00</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9CA3AF' }}>Gross Fees</span> <span>$56.00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- FLOATING BOOKKEEPING CARDS --- */}
                    
                    {/* Top Left - Pending Invoices */}
                    <div style={{ 
                        position: 'absolute', top: '10%', left: '-80px', width: '200px', 
                        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '16px', 
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', 
                        zIndex: 20,
                        animation: 'floatCard 6s ease-in-out infinite',
                        animationDelay: '0s'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4B5563' }}>Pending Invoices</div>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} />
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>$42,800</div>
                        <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>14 awaiting payment</div>
                    </div>

                    {/* Bottom Left - Expenses Breakdown */}
                    <div style={{ 
                        position: 'absolute', bottom: '15%', left: '-60px', width: '180px', 
                        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '16px', 
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', 
                        zIndex: 20,
                        animation: 'floatCard 6.5s ease-in-out infinite',
                        animationDelay: '1s'
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4B5563', marginBottom: '12px' }}>Expenses</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', background: 'conic-gradient(#111827 0% 55%, #9CA3AF 55% 80%, #E5E7EB 80% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '28px', height: '28px', background: '#FAFAFA', borderRadius: '50%' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.6rem', color: '#4B5563', fontWeight: 500 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#111827' }} /> Payroll</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9CA3AF' }} /> Software</div>
                            </div>
                        </div>
                    </div>

                    {/* Top Right - Health Score */}
                    <div style={{ 
                        position: 'absolute', top: '15%', right: '-80px', width: '180px', 
                        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '16px', 
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', 
                        zIndex: 20,
                        animation: 'floatCard 5.5s ease-in-out infinite',
                        animationDelay: '0.5s'
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>Health Score</div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 500, color: '#111827', lineHeight: 1 }}>94</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#65A30D', paddingBottom: '2px' }}>EXCELLENT</div>
                        </div>
                    </div>

                    {/* Bottom Right - Cash Flow */}
                    <div style={{ 
                        position: 'absolute', bottom: '10%', right: '-100px', width: '200px', 
                        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.7)', borderRadius: '20px', padding: '16px', 
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', 
                        zIndex: 20,
                        animation: 'floatCard 7s ease-in-out infinite',
                        animationDelay: '1.5s'
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>Net Cash Flow</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>+$18,450</div>
                        <svg width="100%" height="24" viewBox="0 0 160 24" fill="none">
                            <path d="M0 20 L40 10 L80 15 L120 5 L160 10" stroke="#111827" strokeWidth="2" fill="none" />
                            <circle cx="160" cy="10" r="3" fill="#111827" />
                        </svg>
                    </div>

                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#9CA3AF' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280' }}>Scroll to explore</div>
                <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, #9CA3AF, transparent)' }} />
            </div>

            {/* Animations defined globally for the hero */}
            <style jsx global>{`
                @keyframes growUp {
                    0% {
                        transform: scaleY(0);
                    }
                    100% {
                        transform: scaleY(1);
                    }
                }
                @keyframes floatCard {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>
        </section>
    );
}
