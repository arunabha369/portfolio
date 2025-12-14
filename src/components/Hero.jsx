import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const words = ["Developer", "AI/ML Enthusiast", "Problem Solver"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    const handleMouseMove = (e) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        setMousePos({ x, y });
    };

    return (
        <section
            id="home"
            className="section"
            onMouseMove={handleMouseMove}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '80px',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--bg-primary)'
            }}
        >
            {/* Ambient Pulse Background (Soothing continuously moving element) */}
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(100, 108, 255, 0.07) 0%, transparent 70%)',
                animation: 'pulse 15s infinite ease-in-out alternate',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)',
                animation: 'pulse 20s infinite ease-in-out alternate-reverse',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Interactive Mouse Gradient (Ripple-like spotlight) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 108, 255, 0.12), transparent 40%)`,
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'opacity 0.3s ease',
                mixBlendMode: 'screen'
            }} />

            {/* Texture Grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>

                {/* Top Line */}
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    letterSpacing: '1px'
                }}>
                    Hello, I am <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Arunabha Banerjee</span>
                </p>

                {/* Dynamic Text with Typewriter */}
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2
                }}>
                    <span style={{
                        backgroundImage: 'linear-gradient(45deg, #4facfe, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {text}
                    </span>
                    <span style={{ borderRight: '3px solid var(--accent-primary)', marginLeft: '5px', animation: 'blink 0.7s infinite' }}>&nbsp;</span>
                </h2>

                {/* Main Headline */}
                <h1 style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    maxWidth: '800px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    Transforming raw data into <span style={{
                        background: 'linear-gradient(120deg, #a78bfa, #818cf8, #2dd4bf)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800,
                        filter: 'drop-shadow(0 0 15px rgba(129, 140, 248, 0.3))'
                    }}>intelligent user experiences</span>.
                </h1>

                {/* Sub-headline */}
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.6
                }}>
                    Full-Stack Developer & AI Enthusiast focused on building impactful solutions for the real world.
                </p>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="#projects" className="btn btn-primary">View Projects</a>
                    <a href="#contact" className="btn btn-outline">Contact Me</a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'bounce 2s infinite',
                zIndex: 2
            }}>
                <div style={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid var(--text-secondary)',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '10px'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: 'var(--text-secondary)',
                        borderRadius: '2px'
                    }} />
                </div>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
                    40% { transform: translateY(-10px) translateX(-50%); }
                    60% { transform: translateY(-5px) translateX(-50%); }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.2); opacity: 0.8; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
