'use client';
import { useEffect, useRef, useState } from 'react';

const ALL_TESTIMONIALS = [
    { text: "Accurizon transformed our financial chaos into a clean, audit-ready system.", author: "Rajesh M.", role: "Founder, TechSpark" },
    { text: "The MIS dashboards are real-time, accurate, and beautifully structured.", author: "Arjun K.", role: "MD, Heritage Hotels" },
    { text: "Investor-grade financials fast. Our Series A went smoothly.", author: "Nidhi J.", role: "CEO, Dataloop AI" },
    { text: "Completely stress-free compliance. Haven't had a single penalty.", author: "Priya S.", role: "CFO, Bloom Retail" },
    { text: "They helped us understand our unit economics like never before.", author: "Vikram R.", role: "Founder, FreshBites" },
    { text: "Seamless multi-entity accounting. Best firm we've worked with.", author: "Anita P.", role: "Director, GlobalTech" },
    { text: "Their strategic advisory saved us thousands in tax leaks.", author: "Sunil D.", role: "VP Finance, Nexus" },
    { text: "Extremely professional, proactive, and deeply knowledgeable.", author: "Rahul B.", role: "Founder, Elevate App" },
    { text: "Scale without friction. Accurizon is our true growth partner.", author: "Sonia M.", role: "COO, NextGen Retail" },
];

export default function Testimonials() {
    const [activeCards, setActiveCards] = useState<any[]>([]);
    const activeCardsRef = useRef<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const idCounter = useRef(0);

    useEffect(() => {
        let isMounted = true;
        
        const spawnCard = () => {
            if (!isMounted) return;
            const index = Math.floor(Math.random() * ALL_TESTIMONIALS.length);
            const data = ALL_TESTIMONIALS[index];
            
            const currentCards = activeCardsRef.current;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            
            let bestLeft = 0;
            let bestTop = 0;
            let maxMinDist = -1;

            // Try 15 random positions, pick the one furthest from existing cards
            for (let i = 0; i < 15; i++) {
                // On mobile, keep cards roughly centered (5-15% left). On desktop, use full width (5-70%)
                const leftRange = isMobile ? 10 : 65;
                const l = 5 + Math.random() * leftRange; 
                const t = 15 + Math.random() * 60; // Keep slightly away from absolute top/bottom
                
                let minDist = 9999;
                for (const c of currentCards) {
                    const dist = Math.sqrt(Math.pow(c.left - l, 2) + Math.pow(c.top - t, 2));
                    if (dist < minDist) minDist = dist;
                }
                
                if (currentCards.length === 0 || minDist > maxMinDist) {
                    maxMinDist = currentCards.length === 0 ? 9999 : minDist;
                    bestLeft = l;
                    bestTop = t;
                }
            }

            const left = bestLeft;
            const top = bestTop;
            const scale = 0.7 + Math.random() * 0.4; // 0.7 to 1.1
            
            const newCard = {
                id: idCounter.current++,
                data,
                left,
                top,
                scale,
            };
            
            setActiveCards(prev => {
                // Keep max 5 cards to not clutter
                const updated = prev.length > 4 ? [...prev.slice(1), newCard] : [...prev, newCard];
                activeCardsRef.current = updated;
                return updated;
            });
            
            // Card removes itself after animation completes
            setTimeout(() => {
                if (isMounted) {
                    setActiveCards(prev => {
                        const updated = prev.filter(c => c.id !== newCard.id);
                        activeCardsRef.current = updated;
                        return updated;
                    });
                }
            }, 12000); // Matches animation duration
        };

        // Initial spawn
        spawnCard();
        setTimeout(spawnCard, 2000);
        setTimeout(spawnCard, 4000);

        const interval = setInterval(spawnCard, 4000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <section id="testimonials" style={{
            position: 'relative',
            background: '#F8FAFC',
            padding: '10vh 0 0 0', // padding top to push content down from absolute top
            height: '75vh',
            minHeight: '600px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start' // Start from top
        }}>
            <style>{`
                @keyframes floatUpAndFade {
                    0% {
                        opacity: 0;
                        transform: translateY(40px) scale(var(--scale));
                    }
                    15% {
                        opacity: 1;
                        transform: translateY(0px) scale(var(--scale));
                    }
                    85% {
                        opacity: 1;
                        transform: translateY(-40px) scale(var(--scale));
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-80px) scale(var(--scale));
                    }
                }
                .floating-card {
                    position: absolute;
                    width: 340px;
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 0 20px 40px rgba(10, 22, 40, 0.05);
                    border-radius: 24px;
                    padding: 32px;
                    animation: floatUpAndFade 12s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    will-change: transform, opacity;
                }
                
                @media (max-width: 768px) {
                    .floating-card {
                        width: 280px;
                        padding: 24px;
                    }
                }
            `}</style>
            
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                textAlign: 'center', 
                pointerEvents: 'none',
                marginTop: '18vh' // push slightly down from the padding top
            }}>
                <h2 
                className='font-rethink-semi '
               style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 500,
                    color: '#0A1628',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    margin: '0',
                    padding: '8px 24px',
                    background: 'rgba(248, 250, 252, 0.7)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    display: 'inline-block'
                }}>
                    What our partners say about us
                </h2>
            </div>

            <div ref={containerRef} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
            }}>
                {activeCards.map(card => (
                    <div 
                        key={card.id}
                        className="floating-card"
                        style={{
                            left: `${card.left}%`,
                            top: `${card.top}%`,
                            '--scale': card.scale,
                        } as any}
                    >
                        <div style={{ color: '#2563EB', fontSize: '2.5rem', lineHeight: 1, marginBottom: '16px', opacity: 0.15, fontFamily: 'Georgia, serif' }}>&ldquo;</div>
                        <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px', fontWeight: 500 }}>
                            {card.data.text}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.9rem', fontWeight: 700, color: '#0A1628',
                                border: '1px solid #E2E8F0'
                            }}>
                                {card.data.author.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#0A1628', fontSize: '0.9rem' }}>{card.data.author}</div>
                                <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{card.data.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
