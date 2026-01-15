import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            const options = {
                method: 'GET',
                url: 'https://api.freeapi.app/api/v1/public/quotes/quote/random',
                headers: { accept: 'application/json' }
            };

            try {
                const { data } = await axios.request(options);
                if (data && data.data) {
                    setQuote(data.data.content);
                    setAuthor(data.data.author);
                }
            } catch (error) {
                console.error('Error fetching quote:', error);
                setQuote("The only way to do great work is to love what you do.");
                setAuthor("Steve Jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    if (loading) return null;

    return (
        <section className="section" style={{ padding: '4rem 0', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <div style={{
                    backgroundColor: 'var(--bg-card)', // Dark card background
                    borderRadius: '16px',
                    padding: '3rem',
                    position: 'relative',
                    border: '1px solid var(--border-color)',
                    maxWidth: '900px', // Limit width for better readability
                    margin: '0 auto', // Center
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>
                    <FaQuoteLeft style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '2rem',
                        fontSize: '4rem',
                        color: 'rgba(255, 255, 255, 0.1)', // Subtle quote icon
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, paddingLeft: '2rem' }}>
                        <p style={{
                            fontSize: '1.5rem',
                            fontStyle: 'italic',
                            fontWeight: '300',
                            color: 'var(--text-primary)', // Light text
                            lineHeight: '1.6',
                            marginBottom: '1.5rem',
                            fontFamily: 'serif' // Give it a quote-like feel
                        }}>
                            "{quote}"
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)', // Slightly dimmer author
                            textAlign: 'right',
                            fontWeight: '500'
                        }}>
                            — {author}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quote;
