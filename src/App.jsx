import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FeaturedBlogs from './components/FeaturedBlogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './components/AdminDashboard';
import BlogEditor from './components/BlogEditor';
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
              <FeaturedBlogs />
              <Quote />
            </main>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/create" element={
            <AdminRoute>
              <BlogEditor />
            </AdminRoute>
          } />
          <Route path="/admin/edit/:id" element={
            <AdminRoute>
              <BlogEditor />
            </AdminRoute>
          } />

          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
