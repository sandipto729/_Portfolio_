
import React from 'react';
import Link from 'next/link';
import { PAGE_DESCRIPTIONS } from '@/components/constant';

const Home = () => {
  return (
    <div className="relative">
      <section className="min-h-[85vh] flex flex-col justify-center px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-bold mb-6">
              CSE Undergrad @ NIT Durgapur
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-none mb-8 tracking-tighter">
              SANDIPTO <br />
              <span className="text-red-600">ROY.</span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed mb-12 font-light">
              Competitive Programmer and Software Engineer. Incoming Summer Intern at <span className="text-white border-b border-red-600">Goldman Sachs</span>. Building the future through efficient code and architectural elegance.
            </p>
            <div className="flex gap-4">
              <Link href="/about" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all hover:pr-12 group">
                About My Journey <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="aspect-[3/4] max-w-sm ml-auto bg-zinc-900 rounded-3xl overflow-hidden red-glow border border-red-900/20 shadow-2xl">
              <img 
                src="/own-photo/profile2.jpg" 
                alt="Sandipto Roy"
                className="w-full h-full object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PAGE_DESCRIPTIONS.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="group relative p-8 glass rounded-2xl hover:bg-zinc-900/50 transition-all duration-500 border border-zinc-800 hover:border-red-600/40"
              >
                <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{page.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-red-500 transition-colors">
                  {page.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {page.description}
                </p>
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 font-bold">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
