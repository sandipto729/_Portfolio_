'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BlogPost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      fetchBlog();
      fetchSimilarBlogs();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (data.success) {
        const foundPost = data.data.find((p) => p.id === id);
        setPost(foundPost);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarBlogs = async () => {
    try {
      const response = await fetch('/api/blogSimilarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blog_id: id }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSimilarBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching similar blogs:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading blog...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-red-600 hover:text-red-500">
            ← Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors mb-8 text-sm uppercase tracking-widest font-bold"
        >
          <span>←</span> Back to Journal
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-red-600 mb-6">
            <span>{post.date}</span>
            <span className="w-8 h-[1px] bg-red-900/40"></span>
            <span className="text-zinc-500">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-2 bg-red-950/20 border border-red-900/30 text-red-500 text-xs font-bold uppercase tracking-wider rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Featured Image */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/50 mb-12">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Blog Content */}
        <article 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Similar Blogs */}
        {similarBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-zinc-800/50">
            <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <span className="text-red-600">↳</span> Similar Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarBlogs.map((similar) => (
                similar.blog && (
                  <Link
                    key={similar.id}
                    href={`/blog/${similar.id}`}
                    className="group block bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 hover:border-red-600/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-bold text-red-600">
                        {similar.percentage_similarity.toFixed(0)}% match
                      </span>
                      <span className="text-xs text-zinc-500">{similar.blog.readTime}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                      {similar.blog.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                      {similar.blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {similar.blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-zinc-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-16 pt-12 border-t border-zinc-800/50">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white hover:text-red-600 transition-colors text-sm uppercase tracking-widest font-bold"
          >
            <span>←</span> View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
