
import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import hrSphereImg from '../assets/hrsphere.png';

const Projects = () => {
    const projects = [
        {
            title: "HRSphere",
            description: "A comprehensive HR management system for tracking employees, payroll, and performance.",
            tags: ["React", "Netlify", "Management"],
            image: hrSphereImg,
            links: { demo: "https://hrsphere.netlify.app/", code: "https://github.com/arunabha369/HRSphere" }
        },
        {
            title: "Puja Parikrama Planner",
            description: "A guide for pandal hopping during Durga Puja, featuring maps and routes.",
            tags: ["React", "Maps", "Event"],
            links: { demo: "https://pujaparikrama.online", code: "https://github.com/arunabha369/puja-parikrama" }
        },
        {
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing products, orders, and analytics. Built with React and Recharts.",
            tags: ["React", "Node.js", "MongoDB", "Data Viz"],
            links: { demo: "#", code: "#" }
        },
        {
            title: "Financial Tracker",
            description: "Personal finance application to track income, expenses, and savings goals with visual reports.",
            tags: ["JavaScript", "Firebase", "Chart.js"],
            links: { demo: "#", code: "#" }
        },
        {
            title: "AI Study Assistant",
            description: "An intelligent study planner that adapts to your learning pace and schedule using basic ML algorithms.",
            tags: ["Python", "Flask", "React", "OpenAI API"],
            links: { demo: "#", code: "#" }
        }
    ];

    return (
        <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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

                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{project.title}</h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1.5rem',
                                    flex: 1,
                                    lineHeight: '1.6'
                                }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} style={{
                                            fontSize: '0.85rem',
                                            padding: '0.3rem 0.8rem',
                                            backgroundColor: 'rgba(100, 108, 255, 0.1)',
                                            color: 'var(--accent-primary)',
                                            borderRadius: '20px'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={project.links.code} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        <FaGithub /> Code
                                    </a>
                                    <a href={project.links.demo} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
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
