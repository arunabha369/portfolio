import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';
import VisitorCounter from './VisitorCounter';

const Quote = () => {
    const quotes = [
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
        { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { content: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { content: "Make it work, make it right, make it fast.", author: "Kent Beck" }
    ];

    const [quoteData, setQuoteData] = useState(quotes[0]);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuoteData(randomQuote);
    }, []);

    // No loading state needed


    return (
        <section className="section" style={{ padding: '4rem 0 0', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Quote Card */}
                <div style={{
                    backgroundColor: '#050505', // Very dark bg
                    borderRadius: '20px',
                    padding: '3rem 5rem 3rem 8rem',
                    position: 'relative',
                    border: '1px solid #222',
                    maxWidth: '850px',
                    width: '100%',
                    marginBottom: '3rem'
                }}>
                    <FaQuoteLeft style={{
                        position: 'absolute',
                        top: '3rem',
                        left: '3rem',
                        fontSize: '6rem',
                        color: 'rgba(255, 255, 255, 0.1)',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{
                            fontSize: '1.4rem',
                            fontStyle: 'italic',
                            fontWeight: '300',
                            color: '#ccc',
                            lineHeight: '1.6',
                            marginBottom: '2rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            "{quoteData.content}"
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: '#fff',
                            textAlign: 'right',
                            fontWeight: '400',
                            fontStyle: 'italic'
                        }}>
                            — {quoteData.author}
                        </p>
                    </div>
                </div>

                {/* Visitor Counter */}
                <VisitorCounter />
            </div>
        </section>
    );
};

export default Quote;
