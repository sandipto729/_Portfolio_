
import React from 'react';

const About = () => {
  const platforms = [
    { name: 'Codeforces', score: 'Specialist (1400+)', link: 'https://codeforces.com' },
    { name: 'CodeChef', score: '4 Star', link: 'https://codechef.com' },
    { name: 'LeetCode', score: 'Knight', link: 'https://leetcode.com' },
  ];

  const skills = ['C++', 'Python', 'JavaScript', 'React.js', 'Node.js', 'Competitive Programming', 'System Design', 'Redis'];
  const hobbies = ['Travel Photography', 'Classical Music', 'Football', 'Chess'];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden red-glow border border-red-900/20 shadow-2xl">
              <img 
                src="/own-photo/profile.jpeg" 
                alt="Sandipto Roy Portrait"
                className="w-full h-full object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-8 rounded-2xl hidden md:block border border-red-600/20">
              <div className="text-red-600 font-serif text-3xl font-bold mb-1">Incoming Intern</div>
              <div className="text-white uppercase tracking-widest text-sm font-bold">Goldman Sachs '24</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8">Sandipto Roy.</h1>
            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed font-light">
              <p>
                Currently a third-year Computer Science and Engineering student at <span className="text-white font-medium">NIT Durgapur</span>. I am driven by the intersection of computational efficiency and sophisticated design.
              </p>
              <p>
                My journey in tech began with a curiosity for how systems communicate. Today, I am a dedicated competitive programmer and an incoming intern at <span className="text-red-600 font-bold italic">Goldman Sachs</span>, looking to scale high-performance financial systems.
              </p>

              <div className="pt-8">
                <h4 className="text-red-600 font-bold uppercase tracking-widest text-xs mb-6">Programming Platforms</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {platforms.map((p) => (
                    <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-red-600/50 transition-colors group">
                      <div className="text-white font-serif font-bold text-xl mb-1 group-hover:text-red-500">{p.name}</div>
                      <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{p.score}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Journey */}
        <section className="mb-32">
          <h2 className="text-4xl font-serif font-bold mb-12 border-b border-red-900/10 pb-6 text-red-600">The Journey</h2>
          <div className="space-y-12">
            <div className="relative pl-10 border-l-2 border-red-600/30">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_#dc2626]"></div>
              <h3 className="text-2xl font-serif font-bold text-white">Incoming Software Engineering Intern | Goldman Sachs</h3>
              <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-3">Spring 2024 - Present</p>
              <p className="text-zinc-400 max-w-3xl leading-relaxed">Secured an internship through the competitive Engineering Campus Hiring Program. Excited to work with the Global Markets division on low-latency systems.</p>
            </div>
            <div className="relative pl-10 border-l-2 border-zinc-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-800"></div>
              <h3 className="text-2xl font-serif font-bold text-white">B.Tech in CSE | National Institute of Technology Durgapur</h3>
              <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-3">2021 - Present</p>
              <p className="text-zinc-400 max-w-3xl leading-relaxed">Deepening expertise in Distributed Systems, Operating Systems, and Advanced Algorithms. Actively leading sessions for the competitive coding community on campus.</p>
            </div>
          </div>
        </section>

        {/* Skills & Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="glass p-10 rounded-3xl border border-zinc-800/50">
            <h2 className="text-3xl font-serif font-bold mb-8 text-red-600">Technical Arsenal</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span key={skill} className="px-5 py-2 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-widest rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="glass p-10 rounded-3xl border border-zinc-800/50">
            <h2 className="text-3xl font-serif font-bold mb-8 text-red-600">Interests & Hobbies</h2>
            <div className="flex flex-wrap gap-3">
              {hobbies.map(hobby => (
                <span key={hobby} className="px-5 py-2 bg-red-950/20 border border-red-900/30 text-red-500 text-xs font-bold uppercase tracking-widest rounded-lg">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
