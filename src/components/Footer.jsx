import React from 'react';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            backgroundColor: 'var(--bg-secondary)'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <VisitorCounter />
                <p>Design & Developed by Arunabha Banerjee &copy; {new Date().getFullYear()}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
