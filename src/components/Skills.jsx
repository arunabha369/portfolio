import React from 'react';
import { FaCode, FaDatabase, FaTools, FaBriefcase } from 'react-icons/fa';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: <FaCode />,
            skills: ["React.js", "JavaScript (ES6+)", "HTML5 & CSS3", "Tailwind CSS", "Redux"]
        },
        {
            title: "Backend & Database",
            icon: <FaDatabase />,
            skills: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs"]
        },
        {
            title: "Tools & DevOps",
            icon: <FaTools />,
            skills: ["Git & GitHub", "VS Code", "Postman", "Vite"]
        },
        {
            title: "Business & Soft Skills",
            icon: <FaBriefcase />,
            skills: ["Project Management", "Data Analysis", "Financial Accounting", "Communication", "Agile Methodology"]
        }
    ];

    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="section-title">My Skills</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {skillCategories.map((category, index) => (
                        <div key={index} style={{
                            backgroundColor: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            transition: 'transform var(--transition-normal)',
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
                            <div style={{
                                fontSize: '2.5rem',
                                color: 'var(--accent-primary)',
                                marginBottom: '1.5rem'
                            }}>
                                {category.icon}
                            </div>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{category.title}</h3>
                            <ul style={{ listStyle: 'none' }}>
                                {category.skills.map((skill, idx) => (
                                    <li key={idx} style={{
                                        marginBottom: '0.8rem',
                                        color: 'var(--text-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{
                                            width: '6px',
                                            height: '6px',
                                            backgroundColor: 'var(--accent-secondary)',
                                            borderRadius: '50%'
                                        }} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
