import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaArrowRight, FaReact, FaNodeJs, FaTasks, FaMapMarkedAlt, FaCalendarAlt, FaLayerGroup, FaLock, FaGlobe } from 'react-icons/fa';
import { SiNetlify, SiTailwindcss, SiExpress, SiMongodb, SiSocketdotio, SiFramer, SiJsonwebtokens, SiTypescript, SiHtml5, SiJavascript } from 'react-icons/si';

// Icon mapping
const techIcons = {
    "React": FaReact,
    "Netlify": SiNetlify,
    "Management": FaTasks,
    "Maps": FaMapMarkedAlt,
    "Event": FaCalendarAlt,
    "Tailwind CSS": SiTailwindcss,
    "shadcn/ui": FaLayerGroup,
    "Node.js": FaNodeJs,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "Socket.io": SiSocketdotio,
    "JWT Auth": SiJsonwebtokens,
    "Framer Motion": SiFramer,
    "TypeScript": SiTypescript,
    "HTML/CSS": SiHtml5,
    "JavaScript": SiJavascript,
    "Leaflet.js": FaMapMarkedAlt
};

const getIcon = (tag) => techIcons[tag] || FaLayerGroup;

const ProjectCard = ({ project, className }) => {
    const isOperational = project.status === "All Systems Operational";
    const isCompleted = project.status === "Completed";
    const isInProgress = project.status === "In Progress";
    const isPlanned = project.status === "Planned";

    const getStatusColor = () => {
        if (isOperational) return '#22c55e'; // Green
        if (isCompleted) return '#3b82f6';   // Blue
        if (isInProgress) return '#eab308';  // Yellow
        return '#9ca3af'; // Gray
    };

    return (
        <div className={className} style={{
            backgroundColor: '#0a0a0a', // Deep dark bg
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #222',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            height: '100%',
            position: 'relative'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#444';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* Project Image - Top Half */}
            <div style={{
                height: '220px',
                width: '100%',
                backgroundColor: '#1a1a1a',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444'
                    }}>
                        [No Image Available]
                    </div>
                )}
                {/* Overlay Gradient */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: 'linear-gradient(to top, #0a0a0a, transparent)'
                }}></div>
            </div>

            {/* Content - Bottom Half */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Title Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#fff',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        {project.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        {project.links.demo && project.links.demo !== '#' && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#999', fontSize: '1.2rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#999'}>
                                <FaGlobe />
                            </a>
                        )}
                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" style={{ color: '#999', fontSize: '1.2rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = '#999'}>
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Description */}
                <p style={{
                    color: '#888',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    flex: 1
                }}>
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        color: '#666',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        marginBottom: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>Technologies</div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {project.tags.slice(0, 5).map((tag, idx) => {
                            const Icon = getIcon(tag);
                            return (
                                <div key={idx} style={{ position: 'relative' }} title={tag}>
                                    <Icon size={22} style={{ color: '#ccc' }} />
                                </div>
                            );
                        })}
                        {project.tags.length > 5 && (
                            <span style={{ color: '#666', fontSize: '0.9rem', alignSelf: 'center' }}>+{project.tags.length - 5}</span>
                        )}
                    </div>
                </div>

                {/* Footer Row: Status & Link */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #222',
                    paddingTop: '1rem',
                    marginTop: 'auto'
                }}>
                    {/* Status Badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#bbb'
                    }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(),
                            boxShadow: `0 0 8px ${getStatusColor()}`
                        }}></span>
                        {project.status || 'Planned'}
                    </div>

                    {/* View Details Link */}
                    <Link to={`/project/${project.slug}`} style={{
                        color: '#888',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s'
                    }}
                        onMouseOver={e => e.target.style.color = '#fff'}
                        onMouseOut={e => e.target.style.color = '#888'}
                    >
                        View Details <FaArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
