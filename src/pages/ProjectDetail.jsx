import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaGithub, FaGlobe, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the current project
    const projectIndex = projects.findIndex(p => p.slug === slug);
    const project = projects[projectIndex];

    // Scroll to top on slug change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center', color: '#fff' }}>
                <h2>Project Not Found</h2>
                <Link to="/projects" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Back to All Projects
                </Link>
            </div>
        );
    }

    // Logic for "Next Project"
    const nextIndex = (projectIndex + 1) % projects.length;
    const nextProject = projects[nextIndex];

    // Logic for "Related Projects" (Just pick 2 random ones that aren't the current one)
    const relatedProjects = projects
        .filter(p => p.slug !== slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    return (
        <div style={{ paddingBottom: '4rem', color: '#e5e5e5' }}>
            {/* Header / Hero Section */}
            <div style={{
                height: '50vh',
                maxHeight: '400px',
                position: 'relative',
                width: '100%',
                backgroundColor: '#111',
                marginTop: '60px' // Offset for fixed navbar
            }}>
                {project.image && (
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                )}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, #0a0a0a, transparent)'
                }}></div>
                <div className="container" style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '0 2rem'
                }}>
                    <Link to="/projects" style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <FaArrowLeft /> Back to Projects
                    </Link>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: 0, color: '#fff' }}>{project.title}</h1>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                {/* Main Content */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem' }}>
                    {/* Left Column: Description */}
                    <div>
                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Overview</h2>
                        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#ccc', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                            {project.fullDescription || project.description}
                        </p>

                        <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Features</h2>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#ccc', lineHeight: '1.8' }}>
                            <li>Real-time data processing and analytics.</li>
                            <li>Responsive and intuitive user interface.</li>
                            <li>Secure authentication and role-based access.</li>
                            <li>Scalable architecture using modern tech stack.</li>
                        </ul>
                    </div>

                    {/* Right Column: Meta Info */}
                    <div>
                        <div style={{
                            backgroundColor: '#111',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid #222'
                        }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>Links</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {project.links.demo && project.links.demo !== '#' && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                                            <FaGlobe /> Live Demo
                                        </a>
                                    )}
                                    <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                                        <FaGithub /> View Source
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>Technologies</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} style={{
                                            backgroundColor: 'rgba(255,255,255,0.05)',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.85rem',
                                            color: '#bbb',
                                            border: '1px solid #333'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Project Section */}
                <div style={{ margin: '6rem 0' }}>
                    <Link to={`/project/${nextProject.slug}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                            backgroundColor: '#111',
                            border: '1px solid #333',
                            borderRadius: '12px',
                            padding: '1.5rem 2rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#555';
                                e.currentTarget.style.backgroundColor = '#161616';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#333';
                                e.currentTarget.style.backgroundColor = '#111';
                            }}
                        >
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>Next Project</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>{nextProject.title}</span>
                                <FaArrowRight style={{ color: '#fff' }} />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Related Projects */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#fff' }}>Related Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {relatedProjects.map(p => (
                            <ProjectCard key={p.slug} project={p} />
                        ))}
                    </div>
                </div>

                {/* View All Projects Button - Centered at bottom */}
                <div style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid #222', paddingTop: '4rem' }}>
                    <Link to="/projects" className="btn btn-primary" style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: '600'
                    }}>
                        View All Projects
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetail;
