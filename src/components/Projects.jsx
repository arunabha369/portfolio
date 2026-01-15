import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
    // Show only first 3 projects
    const visibleProjects = projects.slice(0, 3);

    return (
        <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingTop: '0' }}>
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>

                <div
                    className="projects-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                    }}
                >
                    {visibleProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            className={`project-card-${index}`}
                        />
                    ))}
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/projects" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        See more projects <FaArrowRight />
                    </Link>
                </div>

                {/* CSS to handle mobile display limit (show 1, hide others) */}
                <style>{`
                    @media (max-width: 768px) {
                        .project-card-1, .project-card-2 {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default Projects;
