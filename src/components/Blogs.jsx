import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Blogs = () => {
    const blogs = [
        {
            id: 1,
            title: "Getting Started with React and Vite",
            summary: "A comprehensive guide to setting up a blazing fast React development environment using Vite.",
            date: "Dec 28, 2024",
            link: "#"
        },
        {
            id: 2,
            title: "Mastering CSS Grid and Flexbox",
            summary: "Learn how to build complex layouts with ease using modern CSS techniques.",
            date: "Dec 15, 2024",
            link: "#"
        },
        {
            id: 3,
            title: "The Future of Web Development with AI",
            summary: "Exploring how Artificial Intelligence is transforming the way we build and interact with the web.",
            date: "Nov 30, 2024",
            link: "#"
        }
    ];

    return (
        <section id="blogs" className="section">
            <div className="container">
                <h2 className="section-title">Latest Blogs</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {blogs.map((blog) => (
                        <div key={blog.id} style={{
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '16px',
                            padding: '2rem',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transition: 'transform var(--transition-normal), border-color var(--transition-normal)',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                            }}
                        >
                            <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 500 }}>
                                {blog.date}
                            </span>
                            <h3 style={{ fontSize: '1.5rem', lineHeight: 1.3 }}>{blog.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', flex: 1, lineHeight: 1.6 }}>
                                {blog.summary}
                            </p>
                            <a href={blog.link} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--accent-primary)',
                                fontWeight: 600,
                                marginTop: '1rem'
                            }}>
                                Read More <FaArrowRight />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
