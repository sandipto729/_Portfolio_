'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsError(true);
        setMessage(data.error || 'Subscription failed');
        return;
      }

      setMessage(data.message || 'Subscribed successfully');
      setEmail('');
    } catch (error) {
      setIsError(true);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative py-20 px-6 bg-linear-to-b from-[#080808] to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-600 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
            <span className="text-white">"Stay Hungry. </span>
            <span className="text-red-600">Stay Foolish."</span>
          </blockquote>
          <p className="text-zinc-500 text-sm uppercase tracking-widest">— Steve Jobs</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Join the Newsletter</h3>
          <p className="text-zinc-400 text-sm mb-5">
            Get updates on new blogs, projects, and engineering notes.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-bold disabled:opacity-60"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${isError ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-red-900/30 to-transparent mb-12"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-500 mb-2">© 2024 Sandipto Roy</p>
            <p className="text-xs text-zinc-600">NIT Durgapur • Computer Science & Engineering</p>
          </div>

          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/sandipto-roy-675600277/" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:-translate-y-0.5">LinkedIn</a>
            <a href="https://github.com/sandipto729" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:-translate-y-0.5">Github</a>
            <a href="/login" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:-translate-y-0.5">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
