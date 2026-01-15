import React from 'react';


const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            borderTop: '1px solid #222',
            backgroundColor: '#050505',
            color: '#888',
            fontSize: '0.9rem',
            textAlign: 'center'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <p>Design & Developed by Arunabha Banerjee &copy; {new Date().getFullYear()}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
