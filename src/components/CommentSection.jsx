import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaGoogle, FaPaperPlane, FaUserCircle, FaRegComment } from 'react-icons/fa';

const CommentSection = ({ blogId }) => {
    const [session, setSession] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check Auth Session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // 2. Fetch Comments
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('blog_comments')
                .select(`
                    id,
                    content,
                    created_at,
                    user_id,
                    profiles ( full_name, avatar_url )
                `)
                .eq('blog_id', blogId)
                .order('created_at', { ascending: false });

            if (!error) {
                setComments(data || []);
            }
            setLoading(false);
        };

        if (blogId) {
            fetchComments();
        }

        return () => subscription.unsubscribe();
    }, [blogId]);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}${window.location.pathname}`
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !session) return;

        const { error } = await supabase
            .from('blog_comments')
            .insert({
                blog_id: blogId,
                user_id: session.user.id,
                content: newComment.trim()
            });

        if (!error) {
            setNewComment('');
            // Refetch to update list
            const { data } = await supabase
                .from('blog_comments')
                .select(`
                    id,
                    content,
                    created_at,
                    user_id,
                    profiles ( full_name, avatar_url )
                `)
                .eq('blog_id', blogId)
                .order('created_at', { ascending: false });

            setComments(data || []);
        } else {
            console.error(error);
        }
    };

    // Helper to format "time ago"
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div style={{ marginTop: '4rem', color: '#fff' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.5rem', marginBottom: '2rem' }}>
                <FaRegComment /> Comments ({comments.length})
            </h3>

            {/* Comment Logic Area */}
            {!session ? (
                // Sign In Prompt (Matching dark card API style)
                <div style={{
                    backgroundColor: '#111',
                    borderRadius: '16px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    border: '1px solid #222',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <FaUserCircle size={48} style={{ color: '#444' }} />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Sign in to comment</h4>
                    <p style={{ color: '#888', marginBottom: '2rem' }}>Join the conversation by signing in with your Google account</p>

                    <button
                        onClick={handleLogin}
                        style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            border: 'none',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <FaGoogle /> Sign in with Google
                    </button>
                </div>
            ) : (
                // Input Form
                <div style={{ marginBottom: '3rem' }}>
                    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            {/* User Avatar */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid #333',
                                flexShrink: 0
                            }}>
                                <img
                                    src={session.user.user_metadata.avatar_url}
                                    alt={session.user.user_metadata.full_name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add to the discussion..."
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        backgroundColor: '#111',
                                        border: '1px solid #333',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
                                    <button
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            border: 'none',
                                            padding: '0.6rem 1.5rem',
                                            borderRadius: '50px',
                                            fontWeight: '600',
                                            cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                                            opacity: newComment.trim() ? 1 : 0.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        Post <FaPaperPlane size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
                {comments.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                        <FaRegComment size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No comments yet. Be the first to comment!</p>
                    </div>
                )}

                {comments.map((comment) => (
                    <div key={comment.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #222', paddingBottom: '2rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#222',
                            flexShrink: 0
                        }}>
                            {comment.profiles?.avatar_url ? (
                                <img
                                    src={comment.profiles.avatar_url}
                                    alt={comment.profiles.full_name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    {comment.profiles?.full_name?.charAt(0) || '?'}
                                </div>
                            )}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                                <span style={{ fontWeight: '600', color: '#fff' }}>
                                    {comment.profiles?.full_name || 'Anonymous'}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {timeAgo(comment.created_at)}
                                </span>
                            </div>
                            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {comment.content}
                            </p>

                            <div style={{ marginTop: '0.8rem', display: 'flex', gap: '1rem' }}>
                                {/* Helper actions like Reply/Like comment could go here */}
                                {session && session.user.id === comment.user_id && (
                                    <button
                                        onClick={async () => {
                                            if (confirm('Delete comment?')) {
                                                await supabase.from('blog_comments').delete().eq('id', comment.id);
                                                setComments(prev => prev.filter(c => c.id !== comment.id));
                                            }
                                        }}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
