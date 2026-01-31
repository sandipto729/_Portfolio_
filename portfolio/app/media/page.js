
import React from 'react';
import Image from 'next/image';
import { MEDIA_SECTIONS } from '@/components/constant';

const Media = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Visual Journey.</h1>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg italic font-serif">
            "Moments that defined my time at NIT Durgapur."
          </p>
        </header>

        {MEDIA_SECTIONS.map((section, sIdx) => (
          <div key={sIdx} className="mb-32">
            <div className="mb-12 border-l-4 border-red-600 pl-8">
              <h2 className="text-4xl font-serif font-bold text-white mb-4">{section.title}</h2>
              <p className="text-zinc-500 text-lg max-w-3xl leading-relaxed">{section.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.photos.map((photo) => (
                <div key={photo.id} className="relative group overflow-hidden rounded-2xl aspect-square bg-zinc-900 border border-zinc-800">
                  <Image 
                    src={photo.url} 
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-xs uppercase tracking-widest text-red-500 font-bold border-l-2 border-red-600 pl-3">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
