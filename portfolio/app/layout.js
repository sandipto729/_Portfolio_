import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sandipto Roy - Portfolio",
  description: "Competitive Programmer and Software Engineer. CSE Undergrad @ NIT Durgapur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#050505] text-white selection:bg-red-600 selection:text-white`}
      >
        <SessionWrapper>
          <Navigation />
          <main className="flex-grow pt-20">
            {children}
          </main>
        <footer className="relative py-20 px-6 bg-gradient-to-b from-[#080808] to-black overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
                <span className="text-white">"Stay Hungry. </span>
                <span className="text-red-600">Stay Foolish."</span>
              </blockquote>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">— Steve Jobs</p>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent mb-12"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-zinc-500 mb-2">© 2024 Sandipto Roy</p>
                <p className="text-xs text-zinc-600">NIT Durgapur • Computer Science & Engineering</p>
              </div>
              
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/sandipto-roy-675600277/" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:translate-y-[-2px]">LinkedIn</a>
                <a href="https://github.com/sandipto729" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:translate-y-[-2px]">Github</a>
                <a href="/login" className="text-zinc-500 hover:text-red-600 transition-all text-sm font-bold uppercase tracking-widest hover:translate-y-[-2px]">Admin</a>
              </div>
            </div>
          </div>
        </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}
