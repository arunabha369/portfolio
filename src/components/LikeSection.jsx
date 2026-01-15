import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

const LikeSection = ({ blogId }) => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikes = async () => {
            // 1. Get Visitor ID
            let visitorId = localStorage.getItem('visitor_id');
            if (!visitorId) {
                visitorId = crypto.randomUUID();
                localStorage.setItem('visitor_id', visitorId);
            }

            // 2. Fetch total likes
            const { count, error: countError } = await supabase
                .from('blog_likes')
                .select('*', { count: 'exact', head: true })
                .eq('blog_id', blogId);

            if (!countError) {
                setLikes(count || 0);
            }

            // 3. Check if user already liked
            const { data: userLike, error: likeError } = await supabase
                .from('blog_likes')
                .select('*')
                .eq('blog_id', blogId)
                .eq('visitor_id', visitorId)
                .maybeSingle();

            if (!likeError && userLike) {
                setHasLiked(true);
            }
            setLoading(false);
        };

        if (blogId) {
            fetchLikes();
        }
    }, [blogId]);

    const handleLike = async () => {
        const visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) return;

        // Optimistic update
        const previousLiked = hasLiked;
        const previousCount = likes;

        setHasLiked(!hasLiked);
        setLikes(prev => hasLiked ? prev - 1 : prev + 1);

        try {
            if (previousLiked) {
                // Unlike
                const { error } = await supabase
                    .from('blog_likes')
                    .delete()
                    .eq('blog_id', blogId)
                    .eq('visitor_id', visitorId);

                if (error) throw error;
            } else {
                // Like
                const { error } = await supabase
                    .from('blog_likes')
                    .insert({ blog_id: blogId, visitor_id: visitorId });

                if (error) throw error;
            }
        } catch (error) {
            // Revert on error
            console.error('Error toggling like:', error);
            setHasLiked(previousLiked);
            setLikes(previousCount);
        }
    };

    if (loading) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem 0' }}>
            <button
                onClick={handleLike}
                style={{
                    backgroundColor: '#111',
                    border: `1px solid ${hasLiked ? '#ef4444' : '#333'}`,
                    borderRadius: '50px',
                    padding: '0.8rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: hasLiked ? '#ef4444' : '#ccc'
                }}
                onMouseOver={(e) => !hasLiked && (e.currentTarget.style.borderColor = '#666')}
                onMouseLeave={(e) => !hasLiked && (e.currentTarget.style.borderColor = '#333')}
            >
                {hasLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                <span style={{ fontSize: '1rem', fontWeight: '500' }}>{likes}</span>
            </button>
        </div>
    );
};

export default LikeSection;
