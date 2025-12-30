export const blogs = [
    {
        id: 1,
        title: "Getting Started with React and Vite",
        summary: "A comprehensive guide to setting up a blazing fast React development environment using Vite.",
        date: "Dec 28, 2025",
        content: `
            <p>React is one of the most popular libraries for building user interfaces, and Vite has revolutionized the way we bootstrap and develop these applications. In this guide, we'll walk through setting up a React project with Vite and explore why it's a superior choice compared to Create React App.</p>
            
            <h3>Why Vite?</h3>
            <p>Vite (French for "quick") is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:</p>
            <ul>
                <li>A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).</li>
                <li>A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.</li>
            </ul>

            <h3>Setting Up Your First Project</h3>
            <p>To get started, simply run the following command in your terminal:</p>
            <pre>npm create vite@latest my-react-app -- --template react</pre>
            <p>This will scaffold a new project with React and basic configuration ready to go.</p>
            
            <h3>Conclusion</h3>
            <p>With Vite, you spend less time waiting for your server to start and more time coding. Give it a try for your next project!</p>
        `
    },
    {
        id: 2,
        title: "Mastering CSS Grid and Flexbox",
        summary: "Learn how to build complex layouts with ease using modern CSS techniques.",
        date: "Dec 15, 2025",
        content: `
            <p>CSS Grid and Flexbox are the two pillars of modern web layout. While they can be used individually, they work best when used together. Flexbox is designed for one-dimensional layouts (rows or columns), while Grid is designed for two-dimensional layouts.</p>
            
            <h3>When to use Flexbox?</h3>
            <p>Use Flexbox when you want to arrange items in a single row or column, such as a navbar, a list of items, or centering a modal content.</p>

            <h3>When to use Grid?</h3>
            <p>Use Grid when you need precise control over both rows and columns, such as a photo gallery, a dashboard layout, or a complex page structure.</p>

            <h3>Combining Them</h3>
            <p>A common pattern is to use Grid for the main page layout (header, sidebar, main content, footer) and Flexbox for the internal components within those grid areas.</p>
        `
    },
    {
        id: 3,
        title: "The Future of Web Development with AI",
        summary: "Exploring how Artificial Intelligence is transforming the way we build and interact with the web.",
        date: "Nov 30, 2025",
        content: `
            <p>Artificial Intelligence is no longer just a buzzword; it's actively reshaping the landscape of web development. From code generation tools like GitHub Copilot to personalized user experiences powered by machine learning algorithms, AI is everywhere.</p>
            
            <h3>AI in Coding</h3>
            <p>Developers are now using AI assistants to write boilerplate code, debug complex issues, and even refactor entire codebases. This allows developers to focus more on architecture and business logic rather than syntax.</p>

            <h3>AI for User Experience</h3>
            <p>Websites are becoming smarter. Chatbots are more conversational, recommendation engines are more accurate, and accessibility tools are becoming more robust, all thanks to AI.</p>
            
            <h3>The Ethical Considerations</h3>
            <p>As we integrate more AI, we must also consider the ethical implications, such as data privacy, bias in algorithms, and the potential displacement of jobs. It's an exciting but critical time to be a developer.</p>
        `
    }
];
