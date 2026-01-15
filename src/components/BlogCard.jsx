import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
    return (
        <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: '#111', // Dark card bg
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #222', // Subtle border
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                height: '100%',
                position: 'relative',
                cursor: 'pointer'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = '#333';
                    e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#222';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* Cover Image */}
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    {blog.cover_image ? (
                        <img
                            src={blog.cover_image}
                            alt={blog.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                            No Image
                        </div>
                    )}
                    {/* Overlay for subtle depth */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, #111, transparent)' }}></div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '0.8rem',
                        lineHeight: 1.3
                    }}>
                        {blog.title}
                    </h3>

                    <p style={{
                        color: '#999',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {blog.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {blog.tags && blog.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} style={{
                                backgroundColor: '#222',
                                color: '#ccc',
                                fontSize: '0.75rem',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '50px',
                                border: '1px solid #333'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer: Date & Read More */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid #222'
                    }}>
                        <span style={{ color: '#666', fontSize: '0.85rem' }}>
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#888',
                            fontSize: '0.9rem',
                            transition: 'color 0.2s',
                            fontWeight: '500'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                            Read More <FaArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
