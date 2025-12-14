import React from 'react';
import { FaDownload } from 'react-icons/fa';
import profileImg from '../assets/arunabha-profile.jpg';

const About = () => {
    return (
        <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    {/* Image Container with Hover Effect */}
                    <div
                        className="about-image-container"
                        style={{
                            position: 'relative',
                            aspectRatio: '1/1',
                            width: '100%',
                            maxWidth: '400px',
                            margin: '0 auto',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Decorative Back Border */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            border: '4px solid var(--accent-primary)',
                            borderRadius: '20px',
                            transform: 'translate(15px, 15px)',
                            zIndex: 0,
                            transition: 'transform 0.3s ease',
                        }} className="about-border" />

                        {/* Image Wrapper */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: '#2a2a2a',
                            borderRadius: '20px',
                            zIndex: 1,
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                        }} className="about-img-wrapper">
                            <img
                                src={profileImg}
                                alt="Arunabha Banerjee"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }}
                                className="about-img"
                            />

                            {/* Overlay Gradient (Soothing Effect) */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(100, 108, 255, 0.2), transparent)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }} className="about-overlay" />
                        </div>

                        <style>{`
                            .about-image-container:hover .about-border {
                                transform: translate(10px, 10px);
                            }
                            .about-image-container:hover .about-img-wrapper {
                                transform: translateY(-5px);
                                box-shadow: 0 20px 40px rgba(100, 108, 255, 0.2);
                            }
                            .about-image-container:hover .about-img {
                                transform: scale(1.05);
                            }
                            .about-image-container:hover .about-overlay {
                                opacity: 1;
                            }
                        `}</style>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                            Engineering with a Business Mindset.
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            I am a B.Tech student specializing in Computer Science and Business Systems (CSBS).
                            This unique curriculum has equipped me with a strong foundation in modern technology
                            alongside a deep understanding of business strategies and financial management.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            My goal is not just to write code, but to solve real-world business problems through
                            innovative technical solutions. I thrive in environments where technology meets strategy.
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>3+</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Years Coding</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>10+</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Projects</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>8.3</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>CGPA</p>
                            </div>
                        </div>

                        <a href="/src/assets/cv.pdf" download target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                            Download CV <FaDownload />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
