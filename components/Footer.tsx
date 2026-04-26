export default function Footer() {
    return (
        <footer style={{
            background: '#0A1628',
            borderTop: '1px solid rgba(37,99,235,0.1)',
            padding: '48px 24px 32px',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px',
                    marginBottom: '48px',
                    flexWrap: 'wrap',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: '36px', height: '36px',
                                background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800, fontSize: '18px', color: '#fff',
                            }}>A</div>
                            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
                                Accuri<span style={{ color: '#3B82F6' }}>zon</span>
                            </span>
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px' }}>
                            One stop solution for business financial systems. We Assure The Trust You Seek.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                { id: 'LI', href: 'https://linkedin.com' },
                                { id: 'TW', href: 'https://twitter.com' },
                                { id: 'FB', href: 'https://facebook.com' },
                            ].map(s => (
                                <a
                                    key={s.id}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: '34px', height: '34px',
                                        background: 'rgba(37,99,235,0.1)',
                                        border: '1px solid rgba(59,130,246,0.15)',
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#60A5FA', fontSize: '0.7rem', fontWeight: 700,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {s.id}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <div style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.9rem' }}>Services</div>
                        {['Accounting Setup', 'Financial Ops', 'Tax & Compliance', 'Back Office'].map(s => (
                            <a key={s} href="#services" style={{ display: 'block', color: '#64748B', fontSize: '0.875rem', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#60A5FA')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                            >
                                {s}
                            </a>
                        ))}
                    </div>

                    {/* Industries */}
                    <div>
                        <div style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.9rem' }}>Industries</div>
                        {['Startups', 'SMEs', 'Hotels & Hospitality', 'Consumer Goods'].map(s => (
                            <a key={s} href="#industries" style={{ display: 'block', color: '#64748B', fontSize: '0.875rem', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#60A5FA')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                            >
                                {s}
                            </a>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <div style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.9rem' }}>Contact</div>
                        {[
                            { label: 'info@accurizon.com', href: 'mailto:info@accurizon.com' },
                            { label: '+91 98288 12307', href: 'tel:+919828812307' },
                            { label: 'www.accurizon.com', href: 'https://www.accurizon.com' },
                        ].map(c => (
                            <a key={c.label} href={c.href} style={{ display: 'block', color: '#64748B', fontSize: '0.875rem', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#60A5FA')}
                                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
                            >
                                {c.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: '16px',
                }}>
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>
                        © {new Date().getFullYear()} Accurizon. All rights reserved.
                    </span>
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>
                        We Assure The Trust You Seek.
                    </span>
                </div>
            </div>
        </footer>
    );
}
