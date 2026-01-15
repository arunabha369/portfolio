import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'Blogs', href: '/blog' },
    { name: 'Projects', href: '/projects' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { scrollYProgress } = useScroll();
    const navigate = useNavigate();
    const location = useLocation();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
        }, { rootMargin: '-40% 0px -40% 0px' });

        // Use a small timeout to ensure DOM is fully ready, especially for dynamically added sections during dev HMR
        setTimeout(() => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => observer.observe(section));
        }, 100);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    // Handle hash scrolling on route change
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const targetId = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (e, link) => {
        e.preventDefault();

        if (link.href.startsWith('#')) {
            const targetId = link.href.substring(1);
            if (location.pathname === '/') {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to home then scroll
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            // Standard navigation
            navigate(link.href);
            window.scrollTo(0, 0);
        }
        setIsOpen(false);
    };

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
                            onClick={(e) => handleNavClick(e, link)}
                            style={{
                                fontWeight: 500,
                                color: (activeSection === link.href.substring(1) && link.href.startsWith('#')) || location.pathname === link.href ? 'var(--accent-primary)' : 'inherit',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {link.name}
                            {((activeSection === link.href.substring(1) && link.href.startsWith('#')) || location.pathname === link.href) && (
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
                    <div className="btn btn-primary" onClick={() => navigate('/contact')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Hire Me</div>
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
                            onClick={(e) => handleNavClick(e, link)}
                            style={{
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                color: (activeSection === link.href.substring(1) && link.href.startsWith('#')) || location.pathname === link.href ? 'var(--accent-primary)' : 'inherit'
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}

            {/* Scroll Progress Bar */}
            <motion.div
                className="progress-bar"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: 'var(--accent-primary)', // Using backgroundColor instead of background to be safe
                    transformOrigin: '0%',
                    scaleX
                }}
            />

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
