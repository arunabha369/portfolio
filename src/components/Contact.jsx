import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const socialLinkStyle = {
        width: '45px',
        height: '45px',
        border: '1px solid var(--border-color)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        transition: 'all var(--transition-normal)',
        color: 'inherit'
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
        e.currentTarget.style.color = 'white';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.color = 'inherit';
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:arunabhabanerjee5@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem'
                }}>
                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Let's Talk</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            I'm currently looking for internships and full-time opportunities.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <a href="mailto:arunabhabanerjee5@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'rgba(100, 108, 255, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent-primary)',
                                    fontSize: '1.5rem'
                                }}>
                                    <FaEnvelope />
                                </div>
                                arunabhabanerjee5@gmail.com
                            </a>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <a
                                    href="https://www.linkedin.com/in/arunabha369/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={socialLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    href="https://github.com/arunabha369"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={socialLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="https://x.com/arunabha_369"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={socialLinkStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        backgroundColor: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)',
                        transition: 'transform var(--transition-normal), border-color var(--transition-normal)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                        }}
                        onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                style={{
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                style={{
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Your message here..."
                                style={{
                                    padding: '1rem',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
