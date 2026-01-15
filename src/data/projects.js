import hrSphereImg from '../assets/hrsphere.png';
import pujaParikramaImg from '../assets/puja_parikrama.jpg';
import codemateImg from '../assets/codemate.png';

export const projects = [
    {
        title: "HRSphere",
        slug: "hrsphere",
        description: "A scalable Human Resource Management System that streamlines core HR processes — from employee records and attendance to recruitment, payroll, and performance.",
        fullDescription: "HRSphere is a comprehensive Human Resource Management System designed to modernize workforce management. It offers a centralized platform for handling employee data, tracking attendance with geolocation, automating payroll calculations, and streamlining the recruitment process. The system includes role-based access control, insightful analytics dashboards, and a responsive design ensures accessibility across devices.",
        tags: ["React", "Node.js", "MongoDB", "Express", "Vite", "Tailwind CSS"],
        status: "In Progress",
        image: hrSphereImg,
        links: {
            demo: "https://hr-sphere-beta.vercel.app/",
            code: "https://github.com/arunabha369/HRSphere"
        }
    },
    {
        title: "Puja Parikrama Planner",
        slug: "puja-parikrama",
        description: "An interactive web app to plan and optimize your Durga Puja pandal-hopping journey with smart routes, maps, and personalized itineraries.",
        fullDescription: "Puja Parikrama Planner is your ultimate companion for the Durga Puja festival. It helps users discover pandals, plan efficient routes to avoid traffic, and create personalized itineraries. Features include interactive maps, real-time crowd updates (planned), and a curated list of must-visit pandals based on user ratings and location.",
        tags: ["JavaScript", "Leaflet.js", "Maps", "Netlify"],
        status: "All Systems Operational",
        image: pujaParikramaImg,
        links: {
            demo: "https://pujaparikrama.online",
            code: "https://github.com/arunabha369/puja-parikrama"
        }
    },
    {
        title: "CodeMate",
        slug: "codemate",
        description: "A MERN-based developer matchmaking platform that helps programmers discover collaborators though swipe-based matching.",
        fullDescription: "CodeMate revolutionizes how developers find collaboration partners. Think of it as 'Tinder for Developers'. Users can create detailed profiles showcasing their tech stack and interests. The platform uses a smart matching algorithm to suggest potential collaborators. Features include real-time chat, project showcases, and a swipe-based interface for connecting with other developers.",
        tags: [
            "React",
            "Tailwind CSS",
            "shadcn/ui",
            "Node.js",
            "Express",
            "MongoDB",
            "Socket.io",
            "JWT Auth",
            "Framer Motion"
        ],
        status: "In Progress",
        image: codemateImg,
        links: {
            demo: "https://code-mate-gamma.vercel.app/",
            code: "https://github.com/arunabha369/CodeMate"
        }
    },
    {
        title: "Bharat-Darshan",
        slug: "bharat-darshan",
        description: "A comprehensive travel platform showcasing the diverse cultural and natural heritage of India.",
        fullDescription: "Bharat-Darshan is an immersive travel platform dedicated to promoting tourism in India. It showcases the rich cultural heritage, historical monuments, and breathtaking natural, landscapes of the country. Users can explore virtual tours, read detailed guides, and plan their trips with integrated booking options. The platform aims to provide a seamless and enriching travel planning experience.",
        tags: ["React", "HTML/CSS", "JavaScript"],
        status: "In Progress",
        image: null, 
        links: {
            demo: "#", 
            code: "https://github.com/arunabha369/Bharat-Darshan"
        }
    }
];
