
export const PAGE_DESCRIPTIONS = [
  {
    title: "Projects",
    path: "/projects",
    description: "Algorithmic solutions and technical experiments developed during my journey at NIT Durgapur.",
    icon: "💻"
  },
  {
    title: "Journal",
    path: "/blog",
    description: "Insights on software engineering, DSA, and the road to Goldman Sachs.",
    icon: "📜"
  },
  {
    title: "Gallery",
    path: "/media",
    description: "Visual stories from life at NIT Durgapur, Durga Puja celebrations, and college fests.",
    icon: "📷"
  },
  {
    title: "About Me",
    path: "/about",
    description: "The story of my academic and professional journey as a CSE student.",
    icon: "🚀"
  }
];

export const PROJECTS = [
  {
    id: "1",
    title: "Distributed Task Scheduler",
    category: "Backend / Node.js",
    description: "A high-concurrency task scheduling system leveraging Redis for low-latency job queues. Supports priority-based execution and real-time monitoring.",
    imageUrl: "https://www.csm.tech/storage/uploads/news/665d96c93496f1717409481Thumb.jpg",
    techStack: ["Node.js", "Redis", "Docker", "WebSocket"],
    github: "https://github.com/sandiptoroy/task-scheduler",
    demo: "https://task-scheduler-demo.vercel.app"
  },
  {
    id: "2",
    title: "Algorithm Visualizer",
    category: "React / Algorithms",
    description: "Interactive platform to visualize complex graph and sorting algorithms. Real-time animation with step-by-step breakdown and complexity analysis.",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
    techStack: ["React", "TypeScript", "TailwindCSS", "D3.js"],
    github: "https://github.com/sandiptoroy/algo-visualizer",
    demo: "https://algo-viz.vercel.app"
  },
  {
    id: "3",
    title: "High-Freq Engine",
    category: "C++ / Systems",
    description: "Exploration of low-latency communication patterns for financial order matching engines. Implements lock-free data structures and memory pools.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    techStack: ["C++20", "Boost", "gRPC", "CMake"],
    github: "https://github.com/sandiptoroy/hft-engine",
    demo: null
  }
];

export const BLOG_POSTS = [
  {
    id: "1",
    title: "Cracking the Goldman Sachs Internship",
    excerpt: "My step-by-step experience navigating the Engineering Campus Hiring Program.",
    date: "April 20, 2024",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    tags: ["Career", "Interview", "Goldman Sachs"],
    content: `<p>Landing an internship at Goldman Sachs was one of the most challenging yet rewarding experiences of my academic journey. Here's how I navigated through the rigorous Engineering Campus Hiring Program.</p>

<h2>The Application Process</h2>
<p>Goldman Sachs visited our campus in September 2023. The entire process was divided into multiple rounds, each designed to test different aspects of technical and problem-solving skills.</p>

<img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" alt="Interview preparation" />

<h2>Round 1: Online Assessment</h2>
<p>The first round consisted of:</p>
<ul>
  <li><strong>2 DSA Problems</strong> - Medium to Hard difficulty on HackerRank</li>
  <li><strong>Time Limit:</strong> 90 minutes</li>
  <li><strong>Topics:</strong> Dynamic Programming, Graph Algorithms, and Greedy Approaches</li>
</ul>
<p>I focused heavily on understanding the problem constraints and optimizing my solutions. Practice on Codeforces and LeetCode really paid off here.</p>

<h2>Round 2: Technical Interview</h2>
<p>The technical round lasted about 60 minutes and covered:</p>
<ul>
  <li>In-depth discussion on data structures (Trees, Graphs, Heaps)</li>
  <li>System design question about designing a URL shortener</li>
  <li>Code optimization and complexity analysis</li>
</ul>

<blockquote>"The interviewer was more interested in my thought process than the final solution."</blockquote>

<h2>Round 3: HR Interview</h2>
<p>This was more conversational, focusing on:</p>
<ul>
  <li>My motivation for joining Goldman Sachs</li>
  <li>Past projects and technical challenges</li>
  <li>Team collaboration experiences</li>
</ul>

<h2>Key Takeaways</h2>
<p>Here are my top tips for anyone preparing for similar interviews:</p>
<ol>
  <li><strong>Master the fundamentals:</strong> Strong grasp of DSA is non-negotiable</li>
  <li><strong>Practice explaining your code:</strong> Communication is as important as coding</li>
  <li><strong>Understand trade-offs:</strong> Be ready to discuss time-space complexity</li>
  <li><strong>Stay calm:</strong> Interviewers appreciate candidates who can think under pressure</li>
</ol>

<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" alt="Goldman Sachs office" />

<p>The entire journey taught me that persistence and preparation are the keys to success. If you're aiming for top-tier firms, start early, practice consistently, and never stop learning.</p>`
  },
  {
    id: "2",
    title: "Why C++ is King for Competitive Programming",
    excerpt: "Exploring memory management and speed advantages in algorithmic contests.",
    date: "March 12, 2024",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    tags: ["C++", "Competitive Programming", "DSA"],
    content: `<p>After solving over 1000+ problems across various competitive programming platforms, I can confidently say that C++ remains the undisputed champion for algorithmic contests. Here's why.</p>

<h2>Speed is Everything</h2>
<p>In competitive programming, every millisecond counts. C++ offers:</p>
<ul>
  <li>Compile-time optimizations</li>
  <li>Direct memory access</li>
  <li>Minimal runtime overhead</li>
</ul>

<img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop" alt="Coding on laptop" />

<h2>STL: The Secret Weapon</h2>
<p>The Standard Template Library (STL) is a game-changer:</p>
<pre><code>vector&lt;int&gt; v;
priority_queue&lt;int&gt; pq;
map&lt;string, int&gt; mp;
set&lt;int&gt; s;</code></pre>

<p>These data structures are optimized and battle-tested. No need to reinvent the wheel.</p>

<h2>Memory Control</h2>
<p>Understanding pointers and memory allocation gives you fine-grained control:</p>
<ul>
  <li>Stack vs Heap allocation</li>
  <li>Custom memory pools for optimization</li>
  <li>Avoiding unnecessary copies with references</li>
</ul>

<blockquote>"Learning C++ made me a better programmer, even beyond competitive coding."</blockquote>

<h2>Platform Support</h2>
<p>Every major competitive programming platform supports C++:</p>
<ul>
  <li>Codeforces</li>
  <li>CodeChef</li>
  <li>AtCoder</li>
  <li>LeetCode</li>
</ul>

<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop" alt="Programming contest" />

<h2>The Learning Curve</h2>
<p>Yes, C++ has a steeper learning curve than Python or Java. But once you master it, the payoff is immense. You'll understand:</p>
<ol>
  <li>How computers really work at a lower level</li>
  <li>Time and space complexity in practice</li>
  <li>Optimization techniques that matter</li>
</ol>

<p>If you're serious about competitive programming, invest time in learning C++. Your future self will thank you.</p>`
  }
];

export const MEDIA_SECTIONS = [
  {
    title: "Durga Puja",
    description: "The heart of Bengali culture brought to our campus life. Lights, rituals, and unforgettable pandals.",
    photos: [
      { id: "dp1", url: "/own-photo/profile.jpeg", caption: "Evening Aarti" },
      { id: "dp2", url: "/own-photo/profile2.jpg", caption: "The Pandal Architecture" },
      { id: "dp3", url: "/own-photo/559279038_18081197398949141_4748463674277130264_n.jpeg", caption: "Traditional Rhythms" }
    ]
  },
  {
    title: "College Fest (Aarohan / Recstacy)",
    description: "Moments of high energy, technical innovation, and cultural fusion at NIT Durgapur.",
    photos: [
      { id: "cf1", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop", caption: "Main Stage Concert" },
      { id: "cf2", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", caption: "Hackathon 24-Hour Sprint" },
      { id: "cf3", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop", caption: "The Vibrant Crowd" }
    ]
  }
];
