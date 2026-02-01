
'use client';

import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/project');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">Technical Works.</h1>
          <p className="text-zinc-400 max-w-xl text-lg">
            A showcase of algorithmic complexity and software systems I've developed.
          </p>
        </header>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className="group relative glass border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-600/40 transition-all duration-500 shadow-2xl hover:shadow-red-900/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Left side - Content */}
                <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-red-600 text-xs font-bold uppercase tracking-widest mb-3">
                          {project.category}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 group-hover:text-red-500 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="text-zinc-800 text-4xl font-serif font-bold">0{index + 1}</div>
                    </div>
                    
                    <p className="text-zinc-400 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:border-red-600/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-6 border-t border-zinc-800/50">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 hover:border-red-600 transition-all"
                    >
                      <span>→</span> Github
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 border border-red-600 text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all"
                      >
                        <span>→</span> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right side - Image (upper portion) */}
                <div className="lg:col-span-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 lg:bg-gradient-to-r lg:from-[#080808] lg:to-transparent z-10"></div>
                  <div className="h-64 lg:h-full w-full overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
