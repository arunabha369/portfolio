import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaHandsClapping } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const BlogInteractionBar = ({ blog, visitorId }) => {
    const [likes, setLikes] = useState(0);
    const [celebrates, setCelebrates] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);

    // User states
    const [hasLiked, setHasLiked] = useState(false);
    const [hasCelebrated, setHasCelebrated] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!blog?.id) return;

            // 1. Fetch Like Counts
            const { count: likeCount } = await supabase
                .from('blog_likes')
                .select('*', { count: 'exact', head: true })
                .eq('blog_id', blog.id)
                .eq('reaction_type', 'like');

            // 2. Fetch Celebrate Counts
            const { count: celebrateCount } = await supabase
                .from('blog_likes')
                .select('*', { count: 'exact', head: true })
                .eq('blog_id', blog.id)
                .eq('reaction_type', 'celebrate');

            // 3. Fetch Comment Counts
            const { count: commentCount } = await supabase
                .from('blog_comments')
                .select('*', { count: 'exact', head: true })
                .eq('blog_id', blog.id);

            setLikes(likeCount || 0);
            setCelebrates(celebrateCount || 0);
            setCommentsCount(commentCount || 0);

            // 4. Check User Reactions
            if (visitorId) {
                const { data: reactions } = await supabase
                    .from('blog_likes')
                    .select('reaction_type')
                    .eq('blog_id', blog.id)
                    .eq('visitor_id', visitorId);

                if (reactions) {
                    reactions.forEach(r => {
                        if (r.reaction_type === 'like') setHasLiked(true);
                        if (r.reaction_type === 'celebrate') setHasCelebrated(true);
                    });
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [blog?.id, visitorId]);

    const handleReaction = async (type, e) => {
        if (!visitorId) return;

        const isLike = type === 'like';
        const hasReacted = isLike ? hasLiked : hasCelebrated;
        const setReacted = isLike ? setHasLiked : setHasCelebrated;
        const setCount = isLike ? setLikes : setCelebrates;

        // ANIMATION LOGIC
        if (!hasReacted) {
            if (type === 'celebrate') {
                // Trigger Confetti
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { x, y },
                    colors: ['#eab308', '#ca8a04', '#fde047'], // Gold/Yellow shades
                    disableForReducedMotion: true
                });
            }
        }

        // Optimistic Update
        setReacted(!hasReacted);
        setCount(prev => hasReacted ? prev - 1 : prev + 1);

        try {
            if (hasReacted) {
                // Remove reaction
                await supabase
                    .from('blog_likes')
                    .delete()
                    .eq('blog_id', blog.id)
                    .eq('visitor_id', visitorId)
                    .eq('reaction_type', type);
            } else {
                // Add reaction
                await supabase
                    .from('blog_likes')
                    .insert({
                        blog_id: blog.id,
                        visitor_id: visitorId,
                        reaction_type: type
                    });
            }
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.description,
                    url: url,
                });
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(url);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    const scrollToComments = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    if (loading) return null;

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#111',
        border: '1px solid #333',
        padding: '0.5rem 1rem',
        borderRadius: '50px',
        color: '#888',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        outline: 'none',
        position: 'relative',
        overflow: 'hidden'
    };

    const activeStyle = {
        ...buttonStyle,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        color: '#6366f1'
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderTop: '1px solid #222',
            borderBottom: '1px solid #222',
            margin: '2rem 0',
            position: 'relative' // For toast positioning relative to bar if needed, though toast usually fixed
        }}>
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: 'absolute',
                            top: '-40px',
                            right: '0',
                            backgroundColor: '#333',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            pointerEvents: 'none',
                            zIndex: 10
                        }}
                    >
                        Copied to clipboard!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left: Date */}
            <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>
                {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
                {/* Like */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleReaction('like', e)}
                    style={hasLiked ? activeStyle : buttonStyle}
                    onMouseOver={e => !hasLiked && (e.currentTarget.style.borderColor = '#555')}
                    onMouseLeave={e => !hasLiked && (e.currentTarget.style.borderColor = '#333')}
                >
                    <AnimatePresence mode="wait">
                        {hasLiked ? (
                            <motion.div
                                key="liked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                            >
                                <FaHeart />
                            </motion.div>
                        ) : (
                            <motion.div key="unliked" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <FaRegHeart />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <span>{likes}</span>
                </motion.button>

                {/* Celebrate */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleReaction('celebrate', e)}
                    style={hasCelebrated ? { ...activeStyle, borderColor: '#eab308', color: '#eab308', backgroundColor: 'rgba(234, 179, 8, 0.1)' } : buttonStyle}
                    onMouseOver={e => !hasCelebrated && (e.currentTarget.style.borderColor = '#555')}
                    onMouseLeave={e => !hasCelebrated && (e.currentTarget.style.borderColor = '#333')}
                >
                    <AnimatePresence>
                        {hasCelebrated && (
                            <motion.span
                                initial={{ scale: 0.8, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                style={{ display: 'inline-block' }}
                            >
                                <FaHandsClapping />
                            </motion.span>
                        )}
                        {!hasCelebrated && <FaHandsClapping />}
                    </AnimatePresence>
                    <span>{celebrates}</span>
                </motion.button>

                {/* Comment */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToComments}
                    style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#555'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
                >
                    <FaRegComment />
                    <span>{commentsCount}</span>
                </motion.button>

                {/* Share */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#555'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
                >
                    <FaShare />
                    <span>Share</span>
                </motion.button>
            </div>
        </div>
    );
};

export default BlogInteractionBar;
