import React from 'react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 0 2rem',
            borderTop: '1px solid #222',
            backgroundColor: '#050505',
            color: '#888',
            fontSize: '0.9rem'
        }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                {/* Brand & Building */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>Arunabha Banerjee</h3>
                    <p style={{ lineHeight: 1.6 }}>Building digital experiences with code and creativity.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                            <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: '#22c55e', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
                            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', backgroundColor: '#22c55e' }}></span>
                        </span>
                        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>All Systems Operational</span>
                    </div>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Explore</h4>
                    <a href="#home" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>Home</a>
                    <a href="#about" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>About</a>
                    <a href="#projects" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>Projects</a>
                    <a href="/blog" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>Blog</a>
                </div>

                {/* Visitor Counter & Socials */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Analytics</h4>
                    <VisitorCounter />
                    <p style={{ fontSize: '0.85rem' }}>Capturing moments, one visitor at a time.</p>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '2rem', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <p>&copy; {new Date().getFullYear()} Arunabha Banerjee. All rights reserved.</p>
                <p style={{ fontSize: '0.85rem' }}>Designed with <span style={{ color: '#ef4444' }}>❤</span></p>
            </div>

            <style>{`
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
