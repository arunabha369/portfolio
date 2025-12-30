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
                <p>Design & Developed by Arunabha Banerjee &copy; {new Date().getFullYear()}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
