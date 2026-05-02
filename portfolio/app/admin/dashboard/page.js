'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const getCurrentDate = () =>
  new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const createBlogFormState = () => ({
  title: '',
  excerpt: '',
  date: getCurrentDate(),
  readTime: '',
  imageUrl: '',
  tags: '',
  content: '',
});

const createProjectFormState = () => ({
  title: '',
  category: '',
  description: '',
  imageUrl: '',
  techStack: '',
  github: '',
  demo: '',
});

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'projects'
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(createBlogFormState());
  const [projectFormData, setProjectFormData] = useState(createProjectFormState());
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
    fetchSubscribers();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog?fetchAll=true');
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

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const handleEditBlog = (blog) => {
    setActiveTab('blogs');
    setEditingBlogId(blog._id);
    setShowBlogForm(true);
    setShowProjectForm(false);
    setBlogFormData({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      date: blog.date || getCurrentDate(),
      readTime: blog.readTime || '',
      imageUrl: blog.imageUrl || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      content: blog.content || '',
    });
  };

  const handleEditProject = (project) => {
    setActiveTab('projects');
    setEditingProjectId(project._id);
    setShowProjectForm(true);
    setShowBlogForm(false);
    setProjectFormData({
      title: project.title || '',
      category: project.category || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      github: project.github || '',
      demo: project.demo || '',
    });
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Blog deleted successfully!');
        if (editingBlogId === id) {
          setEditingBlogId(null);
          setShowBlogForm(false);
          setBlogFormData(createBlogFormState());
        }
        fetchBlogs();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error deleting blog: ' + error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/project?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Project deleted successfully!');
        if (editingProjectId === id) {
          setEditingProjectId(null);
          setShowProjectForm(false);
          setProjectFormData(createProjectFormState());
        }
        fetchProjects();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...blogFormData,
        tags: blogFormData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const isEditing = Boolean(editingBlogId);

      const response = await fetch(isEditing ? `/api/blog?id=${editingBlogId}` : '/api/blog', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? 'Blog updated successfully!' : 'Blog created successfully!');
        setShowBlogForm(false);
        setEditingBlogId(null);
        setBlogFormData(createBlogFormState());
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
        techStack: projectFormData.techStack
          .split(',')
          .map((tech) => tech.trim())
          .filter(Boolean),
        demo: projectFormData.demo || null,
      };

      const isEditing = Boolean(editingProjectId);

      const response = await fetch(isEditing ? `/api/project?id=${editingProjectId}` : '/api/project', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? 'Project updated successfully!' : 'Project created successfully!');
        setShowProjectForm(false);
        setEditingProjectId(null);
        setProjectFormData(createProjectFormState());
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
          <button
            onClick={() => {
              setActiveTab('newsletter');
              setShowBlogForm(false);
              setShowProjectForm(false);
            }}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'newsletter'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            Newsletter ({subscribers.length})
          </button>
        </div>

        {/* Blogs Section */}
        {activeTab === 'blogs' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Blog Management</h2>
              <button
                onClick={() => {
                  if (showBlogForm) {
                    setShowBlogForm(false);
                    setEditingBlogId(null);
                    setBlogFormData(createBlogFormState());
                  } else {
                    setActiveTab('blogs');
                    setShowBlogForm(true);
                    setShowProjectForm(false);
                    setEditingBlogId(null);
                    setBlogFormData(createBlogFormState());
                  }
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {showBlogForm ? 'Cancel' : 'Add New Blog'}
              </button>
            </div>

            {showBlogForm && (
              <form onSubmit={handleBlogSubmit} className="mb-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">
                  {editingBlogId ? 'Update Blog Post' : 'Create New Blog Post'}
                </h3>
                
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
                  {loading
                    ? editingBlogId
                      ? 'Updating Blog...'
                      : 'Creating Blog...'
                    : editingBlogId
                      ? 'Update Blog Post'
                      : 'Create Blog Post'}
                </button>
              </form>
            )}

            <div>
              <h3 className="text-xl font-bold mb-6">All Blog Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h4 className="text-lg font-bold flex-1">{blog.title}</h4>
                      <div className="flex gap-3 text-sm shrink-0">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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
                onClick={() => {
                  if (showProjectForm) {
                    setShowProjectForm(false);
                    setEditingProjectId(null);
                    setProjectFormData(createProjectFormState());
                  } else {
                    setActiveTab('projects');
                    setShowProjectForm(true);
                    setShowBlogForm(false);
                    setEditingProjectId(null);
                    setProjectFormData(createProjectFormState());
                  }
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {showProjectForm ? 'Cancel' : 'Add New Project'}
              </button>
            </div>

            {showProjectForm && (
              <form onSubmit={handleProjectSubmit} className="mb-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6">
                  {editingProjectId ? 'Update Project' : 'Create New Project'}
                </h3>
                
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
                  {loading
                    ? editingProjectId
                      ? 'Updating Project...'
                      : 'Creating Project...'
                    : editingProjectId
                      ? 'Update Project'
                      : 'Create Project'}
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
                      <div className="flex gap-3 text-sm shrink-0">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
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

        {/* Newsletter Section */}
        {activeTab === 'newsletter' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Newsletter Subscribers</h2>
              {subscribers.length === 0 ? (
                <div className="text-center py-12 bg-zinc-900 rounded-lg">
                  <p className="text-zinc-500">No subscribers yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="px-6 py-3 text-zinc-400 font-semibold">Email</th>
                        <th className="px-6 py-3 text-zinc-400 font-semibold">Subscribed Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr
                          key={subscriber._id}
                          className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <a
                              href={`mailto:${subscriber.email}`}
                              className="text-blue-400 hover:underline break-all"
                            >
                              {subscriber.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-zinc-500 text-sm">
                            {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-6 p-4 bg-zinc-900 rounded-lg">
                <p className="text-zinc-400 text-sm">
                  Total Subscribers: <span className="font-bold text-white">{subscribers.length}</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
