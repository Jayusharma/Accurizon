'use client';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
    {
        quote: 'Accurizon transformed our financial chaos into a clean, audit-ready system. We went from 3 months behind to real-time reporting within weeks.',
        name: 'Rajesh Mehta',
        role: 'Founder, TechSpark Solutions',
        initials: 'RM',
        color: '#2563EB',
    },
    {
        quote: "Their GST and compliance team is exceptional. We haven't had a single penalty since we started working with Accurizon. Completely stress-free.",
        name: 'Priya Sharma',
        role: 'CFO, Bloom Retail Group',
        initials: 'PS',
        color: '#7C3AED',
    },
    {
        quote: 'The MIS dashboards they built for us are better than what our previous Big 4 firm delivered. Real-time, accurate, and beautifully structured.',
        name: 'Arjun Kapoor',
        role: 'MD, Heritage Hotels & Resorts',
        initials: 'AK',
        color: '#10B981',
    },
    {
        quote: 'As a fast-growing SaaS startup, we needed investor-grade financials fast. Accurizon delivered in 2 weeks. Our Series A went smoothly thanks to them.',
        name: 'Nidhi Joshi',
        role: 'CEO, Dataloop AI',
        initials: 'NJ',
        color: '#F59E0B',
    },
];

const results = [
    { value: '$47M+', label: 'Total Reconciled', sublabel: 'Across all clients' },
    { value: '15K+', label: 'Invoices Processed', sublabel: 'Monthly average' },
    { value: '99.7%', label: 'Accuracy Rate', sublabel: 'Zero-error promise' },
    { value: '200+', label: 'Clients Served', sublabel: 'And growing' },
];

export default function Proof() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="proof" style={{ background: '#FFFFFF', padding: '120px 0' }}>
            <div ref={sectionRef} style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                    <div className="text-label" style={{ color: '#2563EB', marginBottom: '16px' }}>
                        Proof & Results
                    </div>
                    <h2 className="text-section" style={{
                        color: '#0A1628',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(30px)',
                        transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                        Real Results.{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            Real Impact.
                        </span>
                    </h2>
                </div>

                {/* Results metrics */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px',
                    marginBottom: '72px',
                }}>
                    {results.map((r, i) => (
                        <div
                            key={i}
                            style={{
                                background: '#0A1628',
                                borderRadius: '20px',
                                padding: '32px 24px',
                                textAlign: 'center',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                            }}
                        >
                            <div style={{
                                fontSize: '2.25rem', fontWeight: 800,
                                background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                marginBottom: '8px',
                            }}>
                                {r.value}
                            </div>
                            <div style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{r.label}</div>
                            <div style={{ color: '#60A5FA', fontSize: '0.8rem' }}>{r.sublabel}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                }}>
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                background: '#fff',
                                borderRadius: '20px',
                                padding: '32px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(37,99,235,0.06)',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.12}s`,
                                position: 'relative',
                            }}
                        >
                            {/* Quote mark */}
                            <div style={{
                                position: 'absolute', top: '20px', right: '24px',
                                fontSize: '5rem', lineHeight: 1, color: t.color,
                                opacity: 0.1, fontFamily: 'Georgia, serif', fontWeight: 900,
                            }}>
                                &ldquo;
                            </div>

                            {/* Stars */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={t.color}>
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            <p style={{ color: '#374151', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px', fontStyle: 'italic' }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${t.color}33, ${t.color}88)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: '0.95rem', color: t.color,
                                    border: `2px solid ${t.color}44`,
                                    flexShrink: 0,
                                }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#0A1628', fontSize: '0.95rem' }}>{t.name}</div>
                                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust badges */}
                <div style={{
                    display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px',
                    marginTop: '64px',
                    opacity: visible ? 1 : 0,
                    transition: 'all 0.7s ease 0.6s',
                }}>
                    {['ISO-Ready Processes', 'CA-Supervised Work', 'Bank-Grade Security', 'GDPR Compliant', '100% Transparent Billing'].map(badge => (
                        <div
                            key={badge}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px',
                                background: '#fff',
                                borderRadius: '9999px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(37,99,235,0.1)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>{badge}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
