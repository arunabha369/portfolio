import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import Quote from './components/Quote';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
              <Quote />
            </main>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
