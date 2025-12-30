import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { FaArrowLeft } from 'react-icons/fa';

const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2>Blog not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Home</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/#blogs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '2rem', fontWeight: 500 }}>
                    <FaArrowLeft /> Back to Home
                </Link>

                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{blog.date}</span>
                <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 2rem', lineHeight: 1.2 }}>{blog.title}</h1>

                <div
                    style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-secondary)' }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </div>
    );
};

export default BlogDetail;
