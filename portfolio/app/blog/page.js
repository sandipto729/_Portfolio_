
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
        // Set the first 3-5 blogs as popular/recommended
        setPopularBlogs(data.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Journal.</h1>
          <p className="text-zinc-400 text-lg">
            Engineering thoughts and interview deep-dives.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Blog List - Left Side (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {blogs.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group block"
                >
                  <article className="grid grid-cols-1 md:grid-cols-3 gap-6 glass border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-600/40 transition-all duration-500 p-6">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
                          <span>{post.date}</span>
                          <span className="w-8 h-[1px] bg-red-900/40"></span>
                          <span className="text-zinc-500">{post.readTime}</span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 group-hover:text-red-500 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
            ))}
          </div>

          {/* Sidebar - Right Side (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Popular/Recommended Articles */}
              <div className="glass border border-zinc-800/50 rounded-3xl p-6">
                <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <span className="text-red-600">★</span>
                  Popular Articles
                </h3>
                <div className="space-y-4">
                  {popularBlogs.map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.id}`}
                      className="group block pb-4 border-b border-zinc-800/50 last:border-0 last:pb-0 hover:border-red-600/40 transition-all"
                    >
                      <div className="flex gap-3">
                        <span className="text-2xl font-serif font-bold text-red-600/30 group-hover:text-red-600 transition-colors">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold mb-2 group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="glass border border-zinc-800/50 rounded-3xl p-6">
                <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                  <span className="text-red-600">#</span>
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogs.flatMap(blog => blog.tags))).slice(0, 12).map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg hover:border-red-600/40 hover:text-red-500 transition-all cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="glass border border-zinc-800/50 rounded-3xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-red-600 mb-2">
                    {blogs.length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-widest">
                    Total Articles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
