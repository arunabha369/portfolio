import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import BlogCard from '../components/BlogCard';
import BlogInteractionBar from '../components/BlogInteractionBar';
import CommentSection from '../components/CommentSection';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [sections, setSections] = useState([]);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [nextBlog, setNextBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogAndSections = async () => {
            try {
                // 1. Fetch Blog by Slug
                const { data: blogData, error: blogError } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (blogError) throw blogError;
                setBlog(blogData);

                // 2. Fetch Sections using blog_id
                if (blogData) {
                    const { data: sectionsData, error: sectionsError } = await supabase
                        .from('blog_sections')
                        .select('*')
                        .eq('blog_id', blogData.id)
                        .order('order', { ascending: true });

                    if (sectionsError) throw sectionsError;
                    setSections(sectionsData || []);

                    // 3. Fetch all other blogs for Next/Related logic
                    // In a real large app, you'd be more specific, but fetching all for a portfolio is fine
                    const { data: allBlogs } = await supabase
                        .from('blogs')
                        .select('id, title, slug, cover_image, tags, description, created_at')
                        .eq('is_published', true)
                        .order('created_at', { ascending: false });

                    if (allBlogs) {
                        // Current index
                        const currentIndex = allBlogs.findIndex(b => b.id === blogData.id);

                        // Next Blog (cycling)
                        const nextIndex = (currentIndex + 1) % allBlogs.length;
                        setNextBlog(allBlogs[nextIndex]);

                        // Related Blogs (exclude current)
                        // Simple logic: random for now, or matching tags could be better
                        const others = allBlogs.filter(b => b.id !== blogData.id);
                        setRelatedBlogs(others.sort(() => 0.5 - Math.random()).slice(0, 2));
                    }
                }

            } catch (error) {
                console.error('Error fetching blog details:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndSections();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Loading...</h2>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Blog not found</h2>
                <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem', color: 'var(--accent-primary)' }}>Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '2rem', fontWeight: 500 }}>
                    <FaArrowLeft /> Back to Blogs
                </Link>

                {blog.cover_image && (
                    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
                        <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {blog.tags && blog.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.85rem', padding: '0.2rem 0.6rem', backgroundColor: 'rgba(var(--accent-primary-rgb), 0.1)', borderRadius: '20px', color: 'var(--accent-primary)' }}>#{tag}</span>
                    ))}
                </div>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2, color: 'var(--text-primary)' }}>{blog.title}</h1>

                {/* Interaction Bar */}
                <BlogInteractionBar blog={blog} visitorId={localStorage.getItem('visitor_id')} />

                <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    {/* Render Sections */}
                    {sections.map((section) => (
                        <div key={section.id} style={{ marginBottom: '2rem' }}>
                            {section.heading && (
                                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>{section.heading}</h2>
                            )}

                            {section.content && (
                                <div style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{section.content}</div>
                            )}

                            {section.image && section.image.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: section.image.length > 1 ? '1fr 1fr' : '1fr', gap: '1rem', margin: '1.5rem 0' }}>
                                    {section.image.map((imgUrl, idx) => (
                                        <img key={idx} src={imgUrl} alt={`Section image ${idx + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                                    ))}
                                </div>
                            )}

                            {section.code && section.code.length > 0 && (
                                <div style={{ margin: '1.5rem 0' }}>
                                    {section.code.map((codeBlock, idx) => (
                                        <div key={idx} style={{ position: 'relative', marginBottom: '1rem' }}>
                                            {section.code_language && section.code_language[idx] && (
                                                <span style={{ position: 'absolute', top: '0', right: '0', background: '#333', color: '#fff', padding: '0.2rem 0.5rem', fontSize: '0.7rem', borderBottomLeftRadius: '4px' }}>
                                                    {section.code_language[idx]}
                                                </span>
                                            )}
                                            <pre style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto' }}>
                                                <code>{codeBlock}</code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Interaction Bar */}
                <div style={{ marginTop: '3rem', marginBottom: '1rem' }}>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>Enjoyed this post? Give it some love!</p>
                    <BlogInteractionBar blog={blog} visitorId={localStorage.getItem('visitor_id')} />
                </div>

                {/* Comment Section using blog ID */}
                <CommentSection blogId={blog.id} />

                {/* Next Blog Section */}
                {nextBlog && (
                    <div style={{ margin: '6rem 0' }}>
                        <Link to={`/blog/${nextBlog.slug}`} style={{ textDecoration: 'none' }}>
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
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>Next Blog</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>{nextBlog.title}</span>
                                    <FaArrowRight style={{ color: '#fff' }} />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Related Blogs */}
                {relatedBlogs.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#fff' }}>Related Blogs</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {relatedBlogs.map(b => (
                                <BlogCard key={b.id} blog={b} />
                            ))}
                        </div>
                    </div>
                )}

                {/* View All Button */}
                <div style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid #222', paddingTop: '4rem' }}>
                    <Link to="/blog" className="btn btn-primary" style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: '600'
                    }}>
                        View All Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
