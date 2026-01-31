import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/components/constant';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);
  
  if (!post) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${post.title} | Sandipto Roy`,
    description: post.excerpt,
  };
}

const BlogPost = async ({ params }) => {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    notFound();
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

        {/* Navigation */}
        <div className="mt-20 pt-12 border-t border-zinc-800/50">
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
