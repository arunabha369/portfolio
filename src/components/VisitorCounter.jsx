import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                let visitorId = localStorage.getItem('visitor_id');

                if (!visitorId) {
                    visitorId = crypto.randomUUID();
                    localStorage.setItem('visitor_id', visitorId);

                    // Insert visitor
                    // We catch error here in case RLS or duplicate ID prevents it, but we still proceed to try incrementing
                    const { error: insertError } = await supabase.from('visitors').insert([{ id: visitorId }]);
                    if (insertError) {
                        console.warn("Visitor existing or insert error:", insertError);
                    } else {
                        // Only increment if it's truly a new visitor (successful insert)
                        // Or following the guid: "Count increases only once per device" (which implies once per localStorage set)
                        await supabase.rpc('increment_counter');
                    }
                }

                // Fetch current count
                const { data, error } = await supabase
                    .from('counter')
                    .select('count')
                    .eq('id', 'main')
                    .single();

                if (data) {
                    setCount(data.count);
                }
            } catch (err) {
                console.error("Error tracking visitor:", err);
            } finally {
                setLoading(false);
            }
        };

        trackVisitor();
    }, []);

    if (loading) return null;

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem 1.2rem',
            borderRadius: '50px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            backdropFilter: 'blur(10px)',
            marginTop: '2rem'
        }}>
            <FaEye style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }} />
            <span>
                You are the <strong style={{ color: '#fff' }}>{count.toLocaleString()}<sup>{getOrdinalSuffix(count)}</sup></strong> visitor
            </span>
        </div>
    );
};

// Helper for ordinal suffix (st, nd, rd, th)
const getOrdinalSuffix = (i) => {
    const j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
};

export default VisitorCounter;
