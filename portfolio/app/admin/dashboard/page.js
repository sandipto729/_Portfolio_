'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'projects'
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: '',
    imageUrl: '',
    tags: '',
    content: '',
  });
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    techStack: '',
    github: '',
    demo: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/project');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...blogFormData,
        tags: blogFormData.tags.split(',').map(tag => tag.trim()),
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Blog created successfully!');
        setShowBlogForm(false);
        setBlogFormData({
          title: '',
          excerpt: '',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: '',
          imageUrl: '',
          tags: '',
          content: '',
        });
        fetchBlogs();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error creating blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...projectFormData,
        techStack: projectFormData.techStack.split(',').map(tech => tech.trim()),
        demo: projectFormData.demo || null,
      };

      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Project created successfully!');
        setShowProjectForm(false);
        setProjectFormData({
          title: '',
          category: '',
          description: '',
          imageUrl: '',
          techStack: '',
          github: '',
          demo: '',
        });
        fetchProjects();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error creating project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/project?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Project deleted successfully!');
        fetchProjects();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <button
            onClick={() => {
              setActiveTab('blogs');
              setShowBlogForm(false);
              setShowProjectForm(false);
            }}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'blogs'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('projects');
              setShowBlogForm(false);
              setShowProjectForm(false);
            }}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'projects'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            Projects ({projects.length})
          </button>
        </div>

        {/* Blogs Section */}
        {activeTab === 'blogs' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Blog Management</h2>
              <button
                onClick={() => setShowBlogForm(!showBlogForm)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {showBlogForm ? 'Cancel' : 'Add New Blog'}
              </button>
            </div>

            {showBlogForm && (
              <form onSubmit={handleBlogSubmit} className="mb-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">Create New Blog Post</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Read Time</label>
                    <input
                      type="text"
                      required
                      value={blogFormData.readTime}
                      onChange={(e) => setBlogFormData({...blogFormData, readTime: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="5 min read"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Date</label>
                    <input
                      type="text"
                      required
                      value={blogFormData.date}
                      onChange={(e) => setBlogFormData({...blogFormData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="January 31, 2026"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="Blog title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Excerpt</label>
                    <textarea
                      required
                      value={blogFormData.excerpt}
                      onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      rows="2"
                      placeholder="Short excerpt"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Image URL</label>
                    <input
                      type="url"
                      required
                      value={blogFormData.imageUrl}
                      onChange={(e) => setBlogFormData({...blogFormData, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={blogFormData.tags}
                      onChange={(e) => setBlogFormData({...blogFormData, tags: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="Tech, Programming, AI"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Content (HTML)</label>
                    <textarea
                      required
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600 font-mono text-sm"
                      rows="15"
                      placeholder="<p>Blog content in HTML...</p>"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Blog...' : 'Create Blog Post'}
                </button>
              </form>
            )}

            <div>
              <h3 className="text-xl font-bold mb-6">All Blog Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
                    <p className="text-zinc-400 text-sm mb-4">{blog.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-zinc-800 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {blog.date} • {blog.readTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Project Management</h2>
              <button
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {showProjectForm ? 'Cancel' : 'Add New Project'}
              </button>
            </div>

            {showProjectForm && (
              <form onSubmit={handleProjectSubmit} className="mb-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">Create New Project</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.title}
                      onChange={(e) => setProjectFormData({...projectFormData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="School Management System"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.category}
                      onChange={(e) => setProjectFormData({...projectFormData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="Full-Stack / Production"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                    <textarea
                      required
                      value={projectFormData.description}
                      onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      rows="4"
                      placeholder="Detailed project description"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Image URL</label>
                    <input
                      type="url"
                      required
                      value={projectFormData.imageUrl}
                      onChange={(e) => setProjectFormData({...projectFormData, imageUrl: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.techStack}
                      onChange={(e) => setProjectFormData({...projectFormData, techStack: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="React.js, Node.js, MongoDB, Redis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      required
                      value={projectFormData.github}
                      onChange={(e) => setProjectFormData({...projectFormData, github: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Demo URL (optional)</label>
                    <input
                      type="url"
                      value={projectFormData.demo}
                      onChange={(e) => setProjectFormData({...projectFormData, demo: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-600"
                      placeholder="https://demo.com (optional)"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Project...' : 'Create Project'}
                </button>
              </form>
            )}

            <div>
              <h3 className="text-xl font-bold mb-6">All Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold flex-1">{project.title}</h4>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-zinc-500 text-xs mb-3">{project.category}</p>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-zinc-800 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs px-2 py-1 text-zinc-500">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 text-xs">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        GitHub
                      </a>
                      {project.demo && (
                        <>
                          <span className="text-zinc-600">•</span>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            Demo
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
