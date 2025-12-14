import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem' }}>Built with React & Vite</p>
            </div>
        </footer>
    );
};

export default Footer;
