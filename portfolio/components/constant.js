
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







// export const BLOG_POSTS = [
//   {
//     id: "1",
//     title: "Cracking the Goldman Sachs Internship",
//     excerpt: "My step-by-step experience navigating the Engineering Campus Hiring Program.",
//     date: "April 20, 2024",
//     readTime: "7 min read",
//     imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
//     tags: ["Career", "Interview", "Goldman Sachs"],
//     content: `<p>Landing an internship at Goldman Sachs was one of the most challenging yet rewarding experiences of my academic journey. Here's how I navigated through the rigorous Engineering Campus Hiring Program.</p>

// <h2>The Application Process</h2>
// <p>Goldman Sachs visited our campus in September 2023. The entire process was divided into multiple rounds, each designed to test different aspects of technical and problem-solving skills.</p>

// <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" alt="Interview preparation" />

// <h2>Round 1: Online Assessment</h2>
// <p>The first round consisted of:</p>
// <ul>
//   <li><strong>2 DSA Problems</strong> - Medium to Hard difficulty on HackerRank</li>
//   <li><strong>Time Limit:</strong> 90 minutes</li>
//   <li><strong>Topics:</strong> Dynamic Programming, Graph Algorithms, and Greedy Approaches</li>
// </ul>
// <p>I focused heavily on understanding the problem constraints and optimizing my solutions. Practice on Codeforces and LeetCode really paid off here.</p>

// <h2>Round 2: Technical Interview</h2>
// <p>The technical round lasted about 60 minutes and covered:</p>
// <ul>
//   <li>In-depth discussion on data structures (Trees, Graphs, Heaps)</li>
//   <li>System design question about designing a URL shortener</li>
//   <li>Code optimization and complexity analysis</li>
// </ul>

// <blockquote>"The interviewer was more interested in my thought process than the final solution."</blockquote>

// <h2>Round 3: HR Interview</h2>
// <p>This was more conversational, focusing on:</p>
// <ul>
//   <li>My motivation for joining Goldman Sachs</li>
//   <li>Past projects and technical challenges</li>
//   <li>Team collaboration experiences</li>
// </ul>

// <h2>Key Takeaways</h2>
// <p>Here are my top tips for anyone preparing for similar interviews:</p>
// <ol>
//   <li><strong>Master the fundamentals:</strong> Strong grasp of DSA is non-negotiable</li>
//   <li><strong>Practice explaining your code:</strong> Communication is as important as coding</li>
//   <li><strong>Understand trade-offs:</strong> Be ready to discuss time-space complexity</li>
//   <li><strong>Stay calm:</strong> Interviewers appreciate candidates who can think under pressure</li>
// </ol>

// <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" alt="Goldman Sachs office" />

// <p>The entire journey taught me that persistence and preparation are the keys to success. If you're aiming for top-tier firms, start early, practice consistently, and never stop learning.</p>`
//   },
//   {
//     id: "2",
//     title: "Why C++ is King for Competitive Programming",
//     excerpt: "Exploring memory management and speed advantages in algorithmic contests.",
//     date: "March 12, 2024",
//     readTime: "5 min read",
//     imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
//     tags: ["C++", "Competitive Programming", "DSA"],
//     content: `<p>After solving over 1000+ problems across various competitive programming platforms, I can confidently say that C++ remains the undisputed champion for algorithmic contests. Here's why.</p>

// <h2>Speed is Everything</h2>
// <p>In competitive programming, every millisecond counts. C++ offers:</p>
// <ul>
//   <li>Compile-time optimizations</li>
//   <li>Direct memory access</li>
//   <li>Minimal runtime overhead</li>
// </ul>

// <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop" alt="Coding on laptop" />

// <h2>STL: The Secret Weapon</h2>
// <p>The Standard Template Library (STL) is a game-changer:</p>
// <pre><code>vector&lt;int&gt; v;
// priority_queue&lt;int&gt; pq;
// map&lt;string, int&gt; mp;
// set&lt;int&gt; s;</code></pre>

// <p>These data structures are optimized and battle-tested. No need to reinvent the wheel.</p>

// <h2>Memory Control</h2>
// <p>Understanding pointers and memory allocation gives you fine-grained control:</p>
// <ul>
//   <li>Stack vs Heap allocation</li>
//   <li>Custom memory pools for optimization</li>
//   <li>Avoiding unnecessary copies with references</li>
// </ul>

// <blockquote>"Learning C++ made me a better programmer, even beyond competitive coding."</blockquote>

// <h2>Platform Support</h2>
// <p>Every major competitive programming platform supports C++:</p>
// <ul>
//   <li>Codeforces</li>
//   <li>CodeChef</li>
//   <li>AtCoder</li>
//   <li>LeetCode</li>
// </ul>

// <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop" alt="Programming contest" />

// <h2>The Learning Curve</h2>
// <p>Yes, C++ has a steeper learning curve than Python or Java. But once you master it, the payoff is immense. You'll understand:</p>
// <ol>
//   <li>How computers really work at a lower level</li>
//   <li>Time and space complexity in practice</li>
//   <li>Optimization techniques that matter</li>
// </ol>

// <p>If you're serious about competitive programming, invest time in learning C++. Your future self will thank you.</p>`
//   },
//   {
//     id: "3",
//     title: "My Journey Through JEE Main Preparation",
//     excerpt: "Strategic preparation techniques that helped me crack JEE Main and secure admission to NIT Durgapur.",
//     date: "January 15, 2024",
//     readTime: "8 min read",
//     imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
//     tags: ["JEE", "Preparation", "Engineering"],
//     content: `<p>Preparing for JEE Main was one of the most transformative experiences of my life. It taught me discipline, time management, and the power of consistent effort. Here's my complete journey and the strategies that worked for me.</p>

// <h2>Understanding the Exam Pattern</h2>
// <p>JEE Main tests three subjects equally:</p>
// <ul>
//   <li><strong>Physics:</strong> Conceptual understanding and application-based problems</li>
//   <li><strong>Chemistry:</strong> Balance between Physical, Organic, and Inorganic Chemistry</li>
//   <li><strong>Mathematics:</strong> High-level problem-solving and calculation speed</li>
// </ul>

// <h2>My Preparation Strategy</h2>
// <p>I started my serious preparation in Class 11th, dedicating 6-7 hours daily alongside school:</p>
// <ul>
//   <li>Morning: 2 hours before school for Mathematics practice</li>
//   <li>Evening: 3-4 hours for Physics and Chemistry concepts</li>
//   <li>Night: 1 hour for revision and solving previous year questions</li>
// </ul>

// <blockquote>"Consistency beats intensity. Daily 6 hours is better than weekend marathons."</blockquote>

// <h2>Subject-Wise Approach</h2>
// <h3>Physics</h3>
// <p>Focus on understanding concepts deeply rather than memorizing formulas. I practiced problems from HC Verma and DC Pandey, ensuring I could derive formulas when needed.</p>

// <h3>Chemistry</h3>
// <p>Created detailed notes for Organic Chemistry reactions and mechanisms. For Inorganic Chemistry, I used mnemonics and visual aids. Physical Chemistry required strong mathematical skills and practice.</p>

// <h3>Mathematics</h3>
// <p>Solved RD Sharma and Cengage books extensively. Mathematics demands speed and accuracy, which only comes through consistent practice.</p>

// <h2>Mock Tests and Analysis</h2>
// <p>I took 50+ full-length mock tests in the last 4 months. After each test:</p>
// <ol>
//   <li>Analyzed every wrong answer thoroughly</li>
//   <li>Identified weak topics and revised them immediately</li>
//   <li>Tracked my progress with a performance journal</li>
//   <li>Worked on time management for each section</li>
// </ol>

// <h2>Key Resources</h2>
// <ul>
//   <li>NCERT textbooks for fundamental concepts</li>
//   <li>Online coaching platform for structured learning</li>
//   <li>Previous 15 years question papers</li>
//   <li>YouTube channels for quick concept revision</li>
// </ul>

// <h2>Final Result</h2>
// <p>My hard work paid off with a good percentile that secured my seat in Computer Science Engineering at NIT Durgapur. The journey taught me that success in JEE Main is not about genius, but about strategy, consistency, and perseverance.</p>

// <blockquote>"The journey to NIT Durgapur began with a single decision - to give my absolute best every single day."</blockquote>

// <p>If you're preparing for JEE Main, remember that every aspirant faces doubts and setbacks. What matters is getting back up and continuing the journey with renewed determination.</p>`
//   },
//   {
//     id: "4",
//     title: "Conquering JEE Advanced: The Ultimate Challenge",
//     excerpt: "Advanced strategies and mental preparation for clearing one of India's toughest engineering entrance exams.",
//     date: "February 8, 2024",
//     readTime: "10 min read",
//     imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop",
//     tags: ["JEE Advanced", "IIT", "Engineering"],
//     content: `<p>JEE Advanced stands apart from JEE Main - it's not just about knowledge, but about problem-solving creativity, speed, and mental endurance. Here's how I approached this formidable challenge.</p>

// <h2>What Makes JEE Advanced Different</h2>
// <p>Unlike JEE Main's straightforward questions, JEE Advanced presents:</p>
// <ul>
//   <li>Multi-concept integration in single questions</li>
//   <li>Tricky wording designed to test deep understanding</li>
//   <li>Time pressure - 3 hours for 54 complex questions</li>
//   <li>Negative marking that punishes guesswork</li>
// </ul>

// <h2>The Preparation Roadmap</h2>
// <p>After qualifying JEE Main, I had approximately 2 months for focused JEE Advanced preparation:</p>

// <h3>Phase 1: Conceptual Mastery (3 weeks)</h3>
// <ul>
//   <li>Revisited all fundamental concepts</li>
//   <li>Focused on derivations and proofs</li>
//   <li>Created mind maps linking related topics</li>
//   <li>Practiced problems from IIT lectures and advanced books</li>
// </ul>

// <h3>Phase 2: Problem-Solving Techniques (3 weeks)</h3>
// <ul>
//   <li>Solved previous 20 years JEE Advanced papers</li>
//   <li>Identified common problem patterns</li>
//   <li>Learned elimination techniques for multiple-choice questions</li>
//   <li>Practiced numerical answer-type questions extensively</li>
// </ul>

// <h3>Phase 3: Mock Tests and Refinement (2 weeks)</h3>
// <ul>
//   <li>Took full-length tests every alternate day</li>
//   <li>Analyzed time spent per question</li>
//   <li>Developed strategy for attempting paper (easy to hard)</li>
//   <li>Worked on maintaining composure under pressure</li>
// </ul>

// <blockquote>"JEE Advanced is 40% preparation, 30% strategy, and 30% mental strength."</blockquote>

// <h2>Subject-Specific Insights</h2>

// <h3>Physics</h3>
// <p>JEE Advanced Physics demands exceptional conceptual clarity. Topics like Mechanics, Electromagnetism, and Modern Physics require:</p>
// <ul>
//   <li>Ability to visualize complex scenarios</li>
//   <li>Strong mathematical foundation</li>
//   <li>Quick problem-solving approaches</li>
// </ul>

// <h3>Chemistry</h3>
// <p>Organic Chemistry in JEE Advanced can be a game-changer:</p>
// <ul>
//   <li>Mechanism-based problem-solving</li>
//   <li>Reaction prediction and product identification</li>
//   <li>Integration of Physical Chemistry concepts</li>
// </ul>

// <h3>Mathematics</h3>
// <p>The most scoring yet challenging section:</p>
// <ul>
//   <li>Calculus and Algebra dominate</li>
//   <li>Requires creative problem-solving</li>
//   <li>Multiple approaches to same problem</li>
// </ul>

// <h2>Test Day Strategy</h2>
// <p>On exam day, I followed a strict strategy:</p>
// <ol>
//   <li>First 15 minutes: Quickly scan all questions</li>
//   <li>Start with confidence-boosting easy questions</li>
//   <li>Mark difficult questions for later review</li>
//   <li>Avoid getting stuck on any single question beyond 5 minutes</li>
//   <li>Last 30 minutes: Review marked questions and make calculated attempts</li>
// </ol>

// <h2>The Mental Battle</h2>
// <p>Perhaps the most underrated aspect of JEE Advanced is mental preparation:</p>
// <ul>
//   <li>Stayed calm when questions seemed impossible</li>
//   <li>Didn't let one tough paper affect the next one</li>
//   <li>Maintained consistent sleep schedule before exam</li>
//   <li>Practiced meditation for focus and stress management</li>
// </ul>

// <blockquote>"In JEE Advanced, the candidate who manages pressure better often outperforms the one with more knowledge."</blockquote>

// <h2>Lessons Learned</h2>
// <p>My JEE Advanced journey taught me invaluable lessons:</p>
// <ol>
//   <li>Smart work complements hard work</li>
//   <li>Learning from mistakes is more important than avoiding them</li>
//   <li>Time management can make or break your score</li>
//   <li>Mental resilience is as important as academic preparation</li>
// </ol>

// <p>While I chose NIT Durgapur ultimately, the JEE Advanced preparation phase made me a better problem solver and taught me to handle extreme pressure - skills that continue to serve me in competitive programming and tech interviews.</p>`
//   },
//   {
//     id: "5",
//     title: "Amazon ML Summer School: An Immersive Experience",
//     excerpt: "Deep diving into machine learning fundamentals with industry experts at Amazon's flagship ML program.",
//     date: "July 22, 2024",
//     readTime: "9 min read",
//     imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
//     tags: ["Machine Learning", "Amazon", "AI"],
//     content: `<p>Getting selected for the Amazon ML Summer School was a dream come true. This intensive program brought together the brightest minds passionate about machine learning and provided unparalleled exposure to real-world ML applications.</p>

// <h2>The Selection Process</h2>
// <p>Amazon ML Summer School is highly competitive, attracting thousands of applicants:</p>
// <ul>
//   <li><strong>Application:</strong> Required academic transcripts and statement of purpose</li>
//   <li><strong>Technical Assessment:</strong> Questions on mathematics, statistics, and basic ML concepts</li>
//   <li><strong>Selection:</strong> Only top 4000 students selected from across the country</li>
// </ul>

// <h2>Program Structure</h2>
// <p>The program was structured over 6 weeks with a perfect blend of theory and practical application:</p>

// <h3>Week 1-2: Foundations</h3>
// <ul>
//   <li>Linear algebra and probability for ML</li>
//   <li>Introduction to supervised learning</li>
//   <li>Regression and classification fundamentals</li>
//   <li>Hands-on labs with scikit-learn</li>
// </ul>

// <h3>Week 3-4: Advanced Concepts</h3>
// <ul>
//   <li>Deep learning fundamentals</li>
//   <li>Neural networks architecture and training</li>
//   <li>CNNs for computer vision</li>
//   <li>RNNs and sequence modeling</li>
//   <li>Practical projects using TensorFlow and PyTorch</li>
// </ul>

// <h3>Week 5-6: Specialized Topics</h3>
// <ul>
//   <li>Natural Language Processing</li>
//   <li>Reinforcement Learning basics</li>
//   <li>ML system design at scale</li>
//   <li>Ethics in AI and responsible ML</li>
// </ul>

// <blockquote>"Amazon's ML experts didn't just teach algorithms - they shared real production challenges and solutions."</blockquote>

// <h2>Highlights of the Experience</h2>

// <h3>Industry Expert Sessions</h3>
// <p>Learning directly from Amazon's ML scientists and engineers was invaluable:</p>
// <ul>
//   <li>Guest lectures from senior ML researchers</li>
//   <li>Case studies from Amazon's recommendation systems</li>
//   <li>Insights into Alexa's NLP pipeline</li>
//   <li>Computer vision applications in Amazon Go stores</li>
// </ul>

// <h3>Hands-On Projects</h3>
// <p>We worked on real-world datasets and problems:</p>
// <ul>
//   <li>Built an image classification model with 95% accuracy</li>
//   <li>Developed a sentiment analysis system for product reviews</li>
//   <li>Created a recommendation engine using collaborative filtering</li>
//   <li>Implemented a basic reinforcement learning agent</li>
// </ul>

// <h2>Key Learnings</h2>

// <h3>Technical Skills</h3>
// <ul>
//   <li>Mastered PyTorch and TensorFlow frameworks</li>
//   <li>Learned data preprocessing and feature engineering techniques</li>
//   <li>Understanding of model evaluation and hyperparameter tuning</li>
//   <li>Exposure to MLOps and model deployment</li>
// </ul>

// <h3>Industry Insights</h3>
// <ul>
//   <li>ML in production is vastly different from academic settings</li>
//   <li>Data quality matters more than model complexity</li>
//   <li>Scalability and latency are critical considerations</li>
//   <li>Continuous learning and model monitoring are essential</li>
// </ul>

// <blockquote>"The best ML engineers aren't just algorithm experts - they understand the entire ML lifecycle from data to deployment."</blockquote>

// <h2>Networking and Collaboration</h2>
// <p>One of the most valuable aspects was connecting with peers:</p>
// <ul>
//   <li>Collaborated with students from IITs, NITs, and top universities</li>
//   <li>Formed study groups for discussing complex concepts</li>
//   <li>Built lasting connections with like-minded ML enthusiasts</li>
//   <li>Gained exposure to diverse perspectives and approaches</li>
// </ul>

// <h2>Capstone Project</h2>
// <p>The program culminated in a capstone project where we had to:</p>
// <ul>
//   <li>Identify a real-world problem</li>
//   <li>Design an ML solution end-to-end</li>
//   <li>Implement and evaluate the model</li>
//   <li>Present findings to Amazon mentors</li>
// </ul>

// <p>My project focused on predicting student performance using educational data, achieving significant accuracy improvements over baseline models.</p>

// <h2>Impact on My Journey</h2>
// <p>The Amazon ML Summer School transformed my understanding of machine learning:</p>
// <ol>
//   <li>Shifted from theoretical knowledge to practical application</li>
//   <li>Gained confidence in tackling real-world ML problems</li>
//   <li>Developed a strong foundation for advanced ML research</li>
//   <li>Opened doors to ML-focused career opportunities</li>
// </ol>

// <p>This experience reinforced my passion for AI/ML and provided the skills and knowledge to pursue cutting-edge projects in this domain. It's one of those transformative experiences that shapes your career trajectory.</p>

// <blockquote>"Amazon ML Summer School didn't just teach me machine learning - it showed me how to think like an ML engineer."</blockquote>`
//   },
//   {
//     id: "6",
//     title: "IIT Bombay Summer Research Fellowship: A Transformative Experience",
//     excerpt: "My journey as a summer research fellow at IIT Bombay under the prestigious IAS-INSA-NASI program.",
//     date: "September 5, 2024",
//     readTime: "12 min read",
//     imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
//     tags: ["Research", "IIT Bombay", "Fellowship"],
//     content: `<p>Securing the IAS-INSA-NASI Summer Research Fellowship at IIT Bombay was a defining moment in my academic journey. This prestigious program, supported by the Indian Academy of Sciences, Indian National Science Academy, and the National Academy of Sciences, offered me a glimpse into cutting-edge research and academic excellence.</p>

// <h2>The Fellowship Selection</h2>
// <p>The selection process for this fellowship is highly competitive:</p>
// <ul>
//   <li><strong>Eligibility:</strong> Top-performing students from recognized institutes</li>
//   <li><strong>Application:</strong> Detailed academic records, research interests, and recommendations</li>
//   <li><strong>Selection Rate:</strong> Less than 10% of applicants are selected</li>
//   <li><strong>Duration:</strong> 8-week intensive research program</li>
// </ul>

// <blockquote>"Being selected among the top 1% of applicants validated my passion for research and exploration."</blockquote>

// <h2>Research Project Overview</h2>
// <p>I worked in the Computer Science and Engineering department under the guidance of a renowned professor specializing in artificial intelligence and systems.</p>

// <h3>Project Focus</h3>
// <p>My research centered on optimizing machine learning models for resource-constrained environments:</p>
// <ul>
//   <li>Model compression techniques for edge devices</li>
//   <li>Trade-offs between accuracy and computational efficiency</li>
//   <li>Real-time inference optimization</li>
//   <li>Practical deployment considerations</li>
// </ul>

// <h2>The Research Process</h2>

// <h3>Week 1-2: Literature Review and Problem Formulation</h3>
// <ul>
//   <li>Extensive reading of recent papers in model optimization</li>
//   <li>Understanding state-of-the-art techniques</li>
//   <li>Identifying gaps in existing research</li>
//   <li>Formulating research questions and hypotheses</li>
// </ul>

// <h3>Week 3-5: Experimentation and Implementation</h3>
// <ul>
//   <li>Designed and implemented novel compression algorithms</li>
//   <li>Conducted extensive experiments on benchmark datasets</li>
//   <li>Analyzed results and refined approaches</li>
//   <li>Debugged complex implementation issues</li>
// </ul>

// <h3>Week 6-7: Analysis and Optimization</h3>
// <ul>
//   <li>Performed statistical analysis of experimental results</li>
//   <li>Optimized hyperparameters and model architecture</li>
//   <li>Compared with existing baseline methods</li>
//   <li>Validated findings through rigorous testing</li>
// </ul>

// <h3>Week 8: Documentation and Presentation</h3>
// <ul>
//   <li>Prepared comprehensive research report</li>
//   <li>Created presentation for final symposium</li>
//   <li>Documented code and experimental setup</li>
//   <li>Received feedback from faculty and peers</li>
// </ul>

// <blockquote>"Research taught me that failure is not the opposite of success - it's a stepping stone to discovery."</blockquote>

// <h2>Life at IIT Bombay</h2>

// <h3>World-Class Infrastructure</h3>
// <p>The facilities at IIT Bombay were exceptional:</p>
// <ul>
//   <li>Access to high-performance computing clusters</li>
//   <li>State-of-the-art research laboratories</li>
//   <li>Extensive digital library with journal subscriptions</li>
//   <li>Collaborative workspaces and seminar halls</li>
// </ul>

// <h3>Academic Environment</h3>
// <ul>
//   <li>Weekly seminars by visiting researchers and faculty</li>
//   <li>Peer discussions with fellow research scholars</li>
//   <li>Access to advanced coursework and workshops</li>
//   <li>Mentorship from PhD students and postdocs</li>
// </ul>

// <h2>Key Learnings</h2>

// <h3>Research Skills</h3>
// <ul>
//   <li>How to formulate meaningful research questions</li>
//   <li>Design rigorous experiments and validate hypotheses</li>
//   <li>Critical analysis of existing literature</li>
//   <li>Scientific writing and documentation</li>
//   <li>Presentation and communication of technical ideas</li>
// </ul>

// <h3>Technical Expertise</h3>
// <ul>
//   <li>Deep understanding of ML model optimization</li>
//   <li>Proficiency in PyTorch and TensorFlow</li>
//   <li>Experience with distributed computing frameworks</li>
//   <li>Statistical analysis and visualization techniques</li>
// </ul>

// <h3>Soft Skills</h3>
// <ul>
//   <li>Time management in an unstructured environment</li>
//   <li>Perseverance when experiments don't yield expected results</li>
//   <li>Collaboration with diverse research teams</li>
//   <li>Effective communication of complex concepts</li>
// </ul>

// <blockquote>"Research is not just about finding answers - it's about asking the right questions."</blockquote>

// <h2>Memorable Moments</h2>

// <h3>Breakthrough Discoveries</h3>
// <p>After weeks of experiments, achieving a significant improvement in model compression while maintaining accuracy was exhilarating. Those eureka moments make all the challenges worthwhile.</p>

// <h3>Interactions with Experts</h3>
// <p>Weekly meetings with my advisor provided invaluable insights. Learning how experienced researchers think about problems transformed my approach to technical challenges.</p>

// <h3>Final Symposium</h3>
// <p>Presenting my work to an audience of professors, researchers, and fellow fellows was nerve-wracking yet rewarding. The questions and feedback pushed me to think deeper about my research.</p>

// <h2>Research Outcomes</h2>
// <ul>
//   <li>Developed a novel model compression technique showing 30% size reduction with minimal accuracy loss</li>
//   <li>Comprehensive research report submitted to the fellowship committee</li>
//   <li>Groundwork laid for potential publication in a conference</li>
//   <li>Strong recommendation from advisor for future research opportunities</li>
// </ul>

// <h2>Impact on My Career</h2>
// <p>This fellowship experience was transformative:</p>
// <ol>
//   <li>Confirmed my interest in research and higher studies</li>
//   <li>Provided hands-on experience with cutting-edge ML research</li>
//   <li>Built a strong foundation for graduate-level research</li>
//   <li>Expanded my professional network in academia</li>
//   <li>Enhanced my profile for future opportunities</li>
// </ol>

// <blockquote>"The IIT Bombay fellowship didn't just teach me research methods - it showed me how to think like a researcher."</blockquote>

// <h2>Advice for Aspiring Fellows</h2>
// <p>If you're considering applying for research fellowships:</p>
// <ul>
//   <li>Start early with your application and research interests</li>
//   <li>Demonstrate genuine curiosity and passion in your SOP</li>
//   <li>Maintain strong academic records and seek research exposure</li>
//   <li>Be prepared for intense, challenging work during the fellowship</li>
//   <li>Embrace failures as learning opportunities</li>
//   <li>Network with peers and faculty - connections matter</li>
// </ul>

// <h2>Conclusion</h2>
// <p>The IAS-INSA-NASI Summer Research Fellowship at IIT Bombay was more than an internship - it was a transformative journey that shaped my understanding of research, deepened my technical expertise, and clarified my career aspirations. The experience of working alongside brilliant minds in one of India's premier institutes has left an indelible mark on my academic and professional trajectory.</p>

// <p>This fellowship reinforced my belief that the pursuit of knowledge through research is one of the most rewarding paths one can take. It's not just about the results you achieve, but about the journey of discovery, the lessons learned from failures, and the satisfaction of contributing, however small, to the advancement of human knowledge.</p>`
//   }
// ];