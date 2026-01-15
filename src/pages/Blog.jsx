import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import BlogCard from '../components/BlogCard';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                setBlogs(data || []);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Loading blogs...</h2>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '2rem', fontWeight: 500 }}>
                    <FaArrowLeft /> Back to Home
                </Link>

                <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>Latest Blogs</h1>

                {blogs.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No blogs found.</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
