import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import BlogCard from './BlogCard';

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch latest 3 published blogs
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

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

    if (loading || blogs.length === 0) {
        return null; // Don't show section if loading or empty
    }

    return (
        <section id="blogs" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <h2 className="section-title">Latest Blogs</h2>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem'
                }}>
                    {blogs.map((blog) => (
                        <div key={blog.id} style={{ width: '100%', maxWidth: '400px' }}>
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/blog" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        Read more blogs <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
