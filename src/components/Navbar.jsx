import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
            transition: 'all var(--transition-normal)',
            padding: isScrolled ? '1rem 0' : '1.5rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                    Portfolio.
                </a>

                {/* Desktop Menu */}
                <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                fontWeight: 500,
                                color: activeSection === link.href.substring(1) ? 'var(--accent-primary)' : 'inherit',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'var(--accent-primary)',
                                    borderRadius: '1px'
                                }} />
                            )}
                        </a>
                    ))}
                    <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Hire Me</a>
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn" style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    animation: 'slideDown 0.3s ease'
                }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                color: activeSection === link.href.substring(1) ? 'var(--accent-primary)' : 'inherit'
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
