
import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/components/constant';

const Blog = () => {
  // console.log(BLOG_POSTS);
  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Journal.</h1>
          <p className="text-zinc-400 text-lg">
            Engineering thoughts and interview deep-dives.
          </p>
        </header>

        <div className="space-y-12">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group block"
            >
              <article className="grid grid-cols-1 md:grid-cols-3 gap-8 glass border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-red-600/40 transition-all duration-500 p-6">
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
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
                      <span>{post.date}</span>
                      <span className="w-8 h-[1px] bg-red-900/40"></span>
                      <span className="text-zinc-500">{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-red-500 transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-red-600 pb-1 group-hover:border-white transition-colors w-fit">
                    Read More <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
