
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const didMountRef = useRef(false);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [popularGlobal, setPopularGlobal] = useState([]);
  const [allTagsGlobal, setAllTagsGlobal] = useState([]);

  // Read initial page and tag from URL on mount and fetch that page
  useEffect(() => {
    const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const p = Math.max(1, parseInt(sp.get('page') || '1', 10));
    const tagFromUrl = sp.get('tag') || '';
    const qFromUrl = sp.get('q') || '';

    setCurrentPage(p);
    setSelectedTag(tagFromUrl);
    setQuery(qFromUrl);
    setSearchInput(qFromUrl);
    fetchBlogs(p, tagFromUrl);
    // fetch global meta (latest 5 and total)
    fetchGlobalMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL and fetch when page or tag changes after mount
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // update URL
    try {
      const params = new URLSearchParams();
      if (currentPage && currentPage > 1) params.set('page', String(currentPage));
      if (selectedTag) params.set('tag', selectedTag);
      if (query) params.set('q', query);

      const pathname = typeof window !== 'undefined' ? window.location.pathname : '/blog';
      const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(url);
    } catch (e) {
      // ignore
    }

    fetchBlogs(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedTag]);

  useEffect(() => {
    // when query changes, reset to first page and fetch
    if (!didMountRef.current) return;
    setCurrentPage(1);
    fetchBlogs(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchBlogs = async (page = 1, tagParam = null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      const tagToUse = tagParam !== null ? tagParam : selectedTag;
      if (query) params.set('q', query);
      if (tagToUse) params.set('tag', tagToUse);

      const response = await fetch(`/api/blog?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data || []);
        setPopularBlogs((data.data || []).slice(0, 5));
        setCurrentPage(data.page || page);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags || []))).slice(0, 12);

  const fetchGlobalMeta = async () => {
    try {
      // fetch latest 5 blogs (global)
      const resp = await fetch('/api/blog?page=1&limit=5');
      const d = await resp.json();
      if (d.success) {
        setPopularGlobal(d.data || []);
        // derive tags from latest 5
        const tags = Array.from(new Set((d.data || []).flatMap((b) => b.tags || []))).slice(0, 12);
        setAllTagsGlobal(tags);
        setTotalGlobal(d.total || 0);
      }
    } catch (err) {
      console.error('Error fetching global meta:', err);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              setQuery(searchInput);
            }}
            className="mt-6 flex items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="search"
              value={typeof searchInput !== 'undefined' ? searchInput : ''}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search posts"
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Search
            </button>
          </form>
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
                      <div className="aspect-4/3 rounded-2xl overflow-hidden bg-zinc-900">
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
                          <span className="w-8 h-px bg-red-900/40"></span>
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

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-zinc-400">
                    Showing <span className="font-bold text-white">{blogs.length}</span> of <span className="font-bold text-white">{total}</span> articles
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className={`px-3 py-2 rounded-lg text-sm font-bold ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'bg-zinc-900/50 hover:bg-zinc-900'}`}
                    >
                      Prev
                    </button>
                    <div className="text-sm text-zinc-400">Page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span></div>
                    <button
                      type="button"
                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className={`px-3 py-2 rounded-lg text-sm font-bold ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-zinc-900/50 hover:bg-zinc-900'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
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
                  {popularGlobal.map((blog, index) => (
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
                  {allTagsGlobal.map((tag) => {
                    const isActive = selectedTag === tag;

                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setCurrentPage(1);
                          setSelectedTag(tag);
                        }}
                        className={`px-3 py-1 border text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isActive
                            ? 'bg-red-600/20 border-red-600/50 text-red-400'
                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-red-600/40 hover:text-red-500'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                {selectedTag && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(1);
                      setSelectedTag('');
                    }}
                    className="mt-4 text-sm text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    Clear filter
                  </button>
                )}
              </div>

              {/* Stats Card */}
              <div className="glass border border-zinc-800/50 rounded-3xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-red-600 mb-2">
                    {totalGlobal}
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
