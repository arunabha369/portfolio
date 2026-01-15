import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const AllProjects = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'working', 'building'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Calculate counts
    const workingCount = projects.filter(p => p.status === "All Systems Operational" || p.status === "Completed").length;
    const buildingCount = projects.filter(p => p.status === "In Progress").length;

    // Filter projects
    const filteredProjects = projects.filter(p => {
        if (filter === 'working') return p.status === "All Systems Operational" || p.status === "Completed";
        if (filter === 'building') return p.status === "In Progress";
        return true;
    });

    const filterBtnStyle = (isActive) => ({
        padding: '0.6rem 1.2rem',
        borderRadius: '50px',
        border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
        backgroundColor: isActive ? 'rgba(100, 108, 255, 0.1)' : 'transparent',
        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.3s ease'
    });

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <Link to="/#projects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '2rem', fontWeight: 500 }}>
                    <FaArrowLeft /> Back to Home
                </Link>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>All Projects</h1>

                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setFilter('all')}
                            style={filterBtnStyle(filter === 'all')}
                        >
                            Clear filter
                        </button>
                        <button
                            onClick={() => setFilter('working')}
                            style={filterBtnStyle(filter === 'working')}
                        >
                            working ({workingCount})
                        </button>
                        <button
                            onClick={() => setFilter('building')}
                            style={filterBtnStyle(filter === 'building')}
                        >
                            building ({buildingCount})
                        </button>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                    {filteredProjects.length === 0 && (
                        <div style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProjects;
