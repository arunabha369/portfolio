import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './BlogCard.css';

const BlogCard = ({ blog, isPinned = false }) => {
    const getCleanDescription = (content) => {
        if (!content) return "";
        // Remove markdown/HTML tags if present in description
        return content.replace(/<[^>]*>/g, "").slice(0, 160) + (content.length > 160 ? "..." : "");
    };

    const category = blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Article';

    return (
        <Link to={`/blog/${blog.slug}`} className="blog-card">
            {/* Image Section */}
            <div className="blog-card-image-wrapper">
                <img
                    src={blog.cover_image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
                    alt={blog.title}
                    className="blog-card-image"
                />
                <div className="blog-card-overlay" />

                {isPinned && (
                    <div className="blog-card-pinned">
                        <span>Featured</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="blog-card-content">
                <div className="blog-card-category-wrapper">
                    <span className="blog-card-category">
                        {category}
                    </span>
                </div>

                <h2 className="blog-card-title">
                    {blog.title}
                </h2>

                <p className="blog-card-description">
                    {getCleanDescription(blog.description)}
                </p>

                {/* Footer */}
                <div className="blog-card-footer">
                    <div className="blog-card-author">
                        <div className="blog-card-author-avatar">
                            K
                        </div>
                        <span className="blog-card-author-name">Kishlay Kumar</span>
                    </div>
                    <div className="blog-card-link">
                        Read Article
                        <FaArrowRight className="blog-card-arrow" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
