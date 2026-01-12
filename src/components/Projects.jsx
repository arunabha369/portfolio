// Updated imports for react-icons
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaTasks, FaMapMarkedAlt, FaCalendarAlt, FaLayerGroup, FaLock } from 'react-icons/fa';
import { SiNetlify, SiTailwindcss, SiExpress, SiMongodb, SiSocketdotio, SiFramer, SiJsonwebtokens } from 'react-icons/si';
import hrSphereImg from '../assets/hrsphere.png';
import pujaParikramaImg from '../assets/puja_parikrama.jpg';
import codemateImg from '../assets/codemate.png';

const TechIconWithTooltip = ({ icon: Icon, label }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div style={{
                padding: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(100, 108, 255, 0.1)';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                <Icon size={20} />
            </div>
            {showTooltip && (
                <div style={{
                    position: 'absolute',
                    bottom: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#222',
                    color: '#fff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    border: '1px solid #333'
                }}>
                    {label}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderWidth: '5px',
                        borderStyle: 'solid',
                        borderColor: '#222 transparent transparent transparent'
                    }}></div>
                </div>
            )}
        </div>
    );
};

const Projects = () => {
    const techIcons = {
        "React": FaReact,
        "Netlify": SiNetlify,
        "Management": FaTasks,
        "Maps": FaMapMarkedAlt,
        "Event": FaCalendarAlt,
        "Tailwind CSS": SiTailwindcss,
        "shadcn/ui": FaLayerGroup, // Using a generic layer group icon for shadcn/ui as it might not be in the set
        "Node.js": FaNodeJs,
        "Express": SiExpress,
        "MongoDB": SiMongodb,
        "Socket.io": SiSocketdotio,
        "JWT Auth": SiJsonwebtokens, // Using custom if available, else lock
        "Framer Motion": SiFramer
    };

    // Fallback icon if not found
    const getIcon = (tag) => techIcons[tag] || FaLayerGroup;

    const projects = [
        {
            title: "HRSphere",
            description: "A scalable Human Resource Management System that streamlines core HR processes — from employee records and attendance to recruitment, payroll, and performance — built with a modern full-stack stack.",
            tags: ["React", "Node.js", "MongoDB", "Express", "Vite", "Tailwind CSS"],
            image: hrSphereImg,
            links: {
                demo: "https://hr-sphere-beta.vercel.app/",
                code: "https://github.com/arunabha369/HRSphere"
            }
        },

        {
            title: "Puja Parikrama Planner",
            description: "An interactive web app to plan and optimize your Durga Puja pandal-hopping journey with smart routes, maps, and personalized itineraries.",
            tags: ["JavaScript", "Leaflet.js", "Maps", "Netlify"],
            image: pujaParikramaImg,
            links: {
                demo: "https://pujaparikrama.online",
                code: "https://github.com/arunabha369/puja-parikrama"
            }
        },

        {
            title: "CodeMate",
            description: "A MERN-based developer matchmaking platform that helps programmers discover collaborators through swipe-based matching, real-time chat, and smart developer feeds — Tinder for developers.",
            tags: [
                "React",
                "Tailwind CSS",
                "shadcn/ui",
                "Node.js",
                "Express",
                "MongoDB",
                "Socket.io",
                "JWT Auth",
                "Framer Motion"
            ],
            image: codemateImg,
            links: {
                demo: "https://code-mate-gamma.vercel.app/",
                code: "https://github.com/arunabha369/CodeMate"
            }
        }
    ];

    return (
        <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '0' }}>
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <div key={index} style={{
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform var(--transition-normal), border-color var(--transition-normal)',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                            }}
                        >
                            {/* Project Image */}
                            <div style={{
                                height: '200px',
                                backgroundColor: '#2a2a2a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)',
                                overflow: 'hidden'
                            }}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span>[Project Preview]</span>
                                )}
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{project.title}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1rem',
                                    flex: 1,
                                    lineHeight: '1.6',
                                    fontSize: '0.9rem'
                                }}>
                                    {project.description}
                                </p>

                                <div style={{
                                    marginBottom: '1.5rem'
                                }}>
                                    <h4 style={{
                                        color: '#fff',
                                        fontSize: '1rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600'
                                    }}>Tech Used</h4>
                                    <div style={{
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: '#333',
                                        marginBottom: '0.8rem'
                                    }}></div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                        {project.tags.map((tag, idx) => (
                                            <TechIconWithTooltip
                                                key={idx}
                                                icon={getIcon(tag)}
                                                label={tag}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        <FaGithub /> Code
                                    </a>
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
