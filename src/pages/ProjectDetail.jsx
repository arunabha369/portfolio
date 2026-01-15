import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaGithub, FaGlobe, FaArrowRight, FaArrowLeft, FaStar, FaCodeBranch, FaClock } from 'react-icons/fa';
import ProjectCard from '../components/ProjectCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the current project
    const projectIndex = projects.findIndex(p => p.slug === slug);
    const project = projects[projectIndex];

    // State for GitHub Data
    const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0, lastUpdated: '', rawUrlBase: '' });
    const [readmeContent, setReadmeContent] = useState('');
    const [loadingGitHub, setLoadingGitHub] = useState(true);

    // Scroll to top on slug change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Fetch GitHub Data
    useEffect(() => {
        const fetchGitHubData = async () => {
            if (!project?.links?.code?.includes('github.com')) {
                setLoadingGitHub(false);
                return;
            }

            try {
                setLoadingGitHub(true);
                // Extract owner and repo from URL
                // Format: https://github.com/owner/repo
                const urlParts = project.links.code.split('/');
                const owner = urlParts[urlParts.length - 2];
                const repo = urlParts[urlParts.length - 1];

                if (!owner || !repo) return;

                // 1. Fetch Repo Details (Stars, Forks, Default Branch)
                const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                const repoData = await repoRes.json();

                if (repoData && !repoData.message) {
                    const branch = repoData.default_branch || 'main'; // Ensure we capture the correct default branch (e.g. master)

                    setRepoStats({
                        stars: repoData.stargazers_count,
                        forks: repoData.forks_count,
                        lastUpdated: new Date(repoData.updated_at).toLocaleDateString(),
                        rawUrlBase: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`
                    });

                    // 2. Fetch README (using default branch)
                    const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`);
                    if (readmeRes.ok) {
                        const text = await readmeRes.text();
                        setReadmeContent(text);
                    }
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoadingGitHub(false);
            }
        };

        if (project) {
            fetchGitHubData();
        }
    }, [project]);

    if (!project) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center', color: '#fff' }}>
                <h2>Project Not Found</h2>
                <Link to="/projects" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Back to All Projects
                </Link>
            </div>
        );
    }

    // Logic for "Next Project"
    const nextIndex = (projectIndex + 1) % projects.length;
    const nextProject = projects[nextIndex];

    // Logic for "Related Projects" (Just pick 2 random ones that aren't the current one)
    const relatedProjects = projects
        .filter(p => p.slug !== slug)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    return (
        <div style={{ paddingBottom: '4rem', color: '#e5e5e5' }}>
            {/* Header / Hero Section (Image Only) */}
            <div style={{
                height: '40vh',
                maxHeight: '350px',
                position: 'relative',
                width: '100%',
                backgroundColor: '#111',
                marginTop: '60px'
            }}>
                {project.image && (
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                    />
                )}
            </div>

            <div className="container" style={{ padding: '0 2rem 4rem', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                {/* Main Content - Centered Single Column */}
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    <Link to="/projects" style={{ color: '#aaa', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                        <FaArrowLeft /> Back to Projects
                    </Link>

                    {/* 1. Title */}
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: '800', margin: '0 0 1rem', color: '#fff', lineHeight: '1.1' }}>{project.title}</h1>

                    {/* 2. Short Description */}
                    <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#ccc', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '90%' }}>
                        {project.description}
                    </p>

                    {/* 3. Metadata Grid */}
                    <div style={{
                        backgroundColor: '#111',
                        border: '1px solid #222',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem',
                        alignItems: 'start'
                    }}>
                        <style>{`
                            @media (max-width: 640px) {
                                .meta-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
                            }
                        `}</style>
                        <div className="meta-grid" style={{ display: 'contents' }}>
                            <div>
                                <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timeline</div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{project.timeline || 'TBD'}</div>
                            </div>
                            <div>
                                <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{project.role || 'Full Stack'}</div>
                            </div>
                            <div>
                                <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Team</div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{project.team || 'Solo'}</div>
                            </div>
                            <div>
                                <div style={{ color: '#888', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
                                <div style={{
                                    display: 'inline-block',
                                    backgroundColor: project.status === 'Completed' || project.status === 'All Systems Operational' ? '#fff' : '#222',
                                    color: project.status === 'Completed' || project.status === 'All Systems Operational' ? '#000' : '#fff',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    border: '1px solid #333'
                                }}>
                                    {project.status === 'All Systems Operational' ? 'Live' : project.status}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
                        {project.links.demo && project.links.demo !== '#' && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.9rem 2rem',
                                backgroundColor: '#fff',
                                color: '#000',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                border: 'none',
                                textDecoration: 'none',
                                transition: 'transform 0.2s'
                            }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <FaGlobe /> Live Demo
                            </a>
                        )}
                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.9rem 2rem',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '1rem',
                            textDecoration: 'none',
                            transition: 'background-color 0.2s'
                        }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <FaGithub /> Source Code
                        </a>
                    </div>



                    {/* 6. Overview & Content */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Overview</h3>
                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#ccc', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                            {project.fullDescription || project.description}
                        </p>

                        {/* Tags as simple chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {project.tags.map((tag, idx) => (
                                <span key={idx} style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    color: '#888',
                                    border: '1px solid #222'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* GitHub Stats Bar */}
                    {repoStats.stars > 0 && (
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', padding: '1rem', backgroundColor: '#161616', borderRadius: '12px', border: '1px solid #222' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#eab308' }}>
                                <FaStar /> <span style={{ fontWeight: 'bold' }}>{repoStats.stars}</span> Stars
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888' }}>
                                <FaCodeBranch /> <span style={{ fontWeight: 'bold' }}>{repoStats.forks}</span> Forks
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888' }}>
                                <FaClock /> updated {repoStats.lastUpdated}
                            </div>
                        </div>
                    )}

                    {/* Rendering README */}
                    {loadingGitHub ? (
                        <div style={{ color: '#666' }}>Loading documentation from GitHub...</div>
                    ) : readmeContent ? (
                        <div className="markdown-content" style={{ color: '#ccc', lineHeight: '1.7' }}>
                            <style>{`
                                .markdown-content h1 { font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; color: #fff; border-bottom: 1px solid #333; padding-bottom: 0.5rem; }
                                .markdown-content h2 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: #fff; }
                                .markdown-content h3 { font-size: 1.2rem; margin-top: 1.5rem; margin-bottom: 0.8rem; color: #fff; }
                                .markdown-content p { margin-bottom: 1rem; }
                                .markdown-content ul, .markdown-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
                                .markdown-content li { margin-bottom: 0.5rem; }
                                .markdown-content pre { background: #111; padding: 1rem; borderRadius: 8px; overflow-x: auto; border: 1px solid #333; margin-bottom: 1.5rem; }
                                .markdown-content code { color: #facc15; font-family: monospace; background: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; }
                                .markdown-content pre code { color: inherit; background: none; padding: 0; }
                                .markdown-content img { max-width: 100%; border-radius: 8px; margin: 1rem 0; border: 1px solid #333; }
                                .markdown-content blockquote { border-left: 4px solid #4f46e5; padding-left: 1rem; color: #888; margin: 1.5rem 0; }
                            `}</style>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                urlTransform={(uri) => {
                                    if (uri.startsWith('http') || uri.startsWith('data:')) return uri;
                                    // Construct absolute GitHub raw URL
                                    // We need owner, repo, and branch. 
                                    // We have them in the scope! 
                                    // But wait, 'branch' variable is inside the effect.
                                    // We need to store branch in state or derived it.
                                    // Let's store it in repoStats to be safe.
                                    return `${repoStats.rawUrlBase}/${uri}`;
                                }}
                            >
                                {readmeContent}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        // Fallback if no README
                        <>
                            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Key Features</h2>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#ccc', lineHeight: '1.8' }}>
                                <li>Real-time data processing and analytics.</li>
                                <li>Responsive and intuitive user interface.</li>
                                <li>Secure authentication and role-based access.</li>
                                <li>Scalable architecture using modern tech stack.</li>
                            </ul>
                        </>
                    )}
                </div>

                {/* Next Project Section */}
                <div style={{ margin: '6rem 0' }}>
                    <Link to={`/project/${nextProject.slug}`} style={{ textDecoration: 'none' }}>
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
                            <span style={{ color: '#666', fontSize: '0.9rem' }}>Next Project</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>{nextProject.title}</span>
                                <FaArrowRight style={{ color: '#fff' }} />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Related Projects */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem', color: '#fff' }}>Related Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {relatedProjects.map(p => (
                            <ProjectCard key={p.slug} project={p} />
                        ))}
                    </div>
                </div>

                {/* View All Projects Button - Centered at bottom */}
                <div style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid #222', paddingTop: '4rem' }}>
                    <Link to="/projects" className="btn btn-primary" style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: '600'
                    }}>
                        View All Projects
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProjectDetail;
