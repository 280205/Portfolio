// ─── Profile ────────────────────────────────────────────
export const profile = {
  name: "Nitin Pandey",
  firstName: "NITIN",
  lastName: "PANDEY",
  role: "Software Engineer",
  tagline:
    "I build intelligent applications, scalable web experiences, and AI-powered products.",
  bio: `I'm a Computer Science and Business Systems graduate from VIT-AP University, focused on building practical software products across AI, backend systems and modern web development. I enjoy working at the intersection of intelligent systems and clean, performant code.`,
  email: "nitinpandey280204@gmail.com",
  phone: "8733015997",
  birthday: "February 28, 2005",
  location: "Gujarat, India",
  cgpa: "8.70",
  university: "VIT-AP University",
  degree: "B.Tech — CS & Business Systems",
  github: "https://github.com/280205",
  linkedin: "https://www.linkedin.com/in/nitin-pandey-7ba7412a4/",
};

// ─── Navigation ─────────────────────────────────────────
export const nav = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// ─── Services / Focus Areas ─────────────────────────────
export const services = [
  {
    id: "ai-engineering",
    num: "01",
    title: "AI Engineering",
    description:
      "Building intelligent applications with Generative AI, RAG pipelines, and NLP systems.",
  },
  {
    id: "fullstack-dev",
    num: "02",
    title: "Full Stack Development",
    description:
      "End-to-end web applications with React, Node.js, Express, and MongoDB.",
  },
  {
    id: "gen-ai",
    num: "03",
    title: "Generative AI",
    description:
      "LLM integration, prompt engineering, and AI-powered product features.",
  },
  {
    id: "product-building",
    num: "04",
    title: "Product Building",
    description:
      "From concept to deployment — shipping real products that solve real problems.",
  },
];

// ─── Education ──────────────────────────────────────────
export const education = [
  {
    id: "vitap",
    school: "VIT-AP University",
    meta: "CGPA: 8.70",
    period: "September 2022 — June 2026",
    detail:
      "Bachelor of Technology in Computer Science and Business Systems.",
  },
  {
    id: "kv",
    school: "Kendriya Vidyalaya No-1 Gandhinagar",
    meta: "XII (PCM) - 70%, X - 90%",
    period: "April 2019 — April 2022",
    detail:
      "Completed secondary and higher secondary education with a focus on science and mathematics.",
  },
];

// ─── Experience ─────────────────────────────────────────
export const experience = [
  {
    id: "unified-mentor",
    role: "Fullstack Web Development Intern",
    org: "Unified Mentor Pvt. Ltd.",
    period: "April 2025 — June 2025",
    detail:
      "Architected Pocket Gym and established Feast Flow, building full-stack MERN applications.",
    bullets: [
      "Architected Pocket Gym, a full-stack gym management app using MERN stack with admin dashboard, improving administrative efficiency by 40%",
      "Established Feast Flow, a MERN stack catering platform connecting 50+ rural caterers to broader markets with JWT authentication and Stripe payments, boosting revenue by 30%",
    ],
  },
  {
    id: "comedyclub",
    role: "Editing Head",
    org: "Comedy Club, VIT-AP University",
    period: "2023 — 2024",
    detail:
      "Blended creativity with precision to craft the perfect punchline.",
    bullets: [
      "Edited comedy scripts, reducing length by 15% while maintaining 8/10 audience ratings.",
    ],
  },
  {
    id: "nextgen",
    role: "Creative Co-Lead",
    org: "Next Gen Club, VIT-AP University",
    period: "2022 — 2023",
    detail:
      "Drove innovation and collaborated on dynamic projects.",
    bullets: [
      "Led a mentorship program for 20+ students, achieving 90% improvement in career clarity.",
    ],
  },
];

// ─── Skills (grouped) ───────────────────────────────────
export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "C", "C++", "Java", "SQL"],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    items: ["Scikit-Learn", "PyTorch/TensorFlow", "Pandas", "NumPy", "Hugging Face", "LangChain"],
  },
  {
    id: "databases",
    label: "DBs & Vector Search",
    items: ["MongoDB", "PostgreSQL", "ChromaDB"],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    items: ["AWS", "Azure", "Git", "GitHub", "Docker", "CI/CD"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: ["Node.js", "Express.js", "React.js", "Next.js"],
  },
  {
    id: "core",
    label: "Core Concepts",
    items: ["Machine Learning", "RAG Pipelines", "DSA", "DBMS", "SDLC Models", "OOP"],
  },
];

// keep old export for backward compat
export const skills = [
  { id: "webdesign", label: "Web design", value: 80 },
  { id: "prog", label: "Programming (C++ / Python)", value: 80 },
  { id: "dsa", label: "Algorithms & Data Structures", value: 75 },
  { id: "db", label: "Database Management (MongoDB / Django)", value: 80 },
];

// ─── Certifications ─────────────────────────────────────
export const certifications = [
  {
    id: "mongodb",
    title: "Associate Database Administrator Certification",
    issuer: "MongoDB University",
    date: "July 2025",
    url: "https://drive.google.com/file/d/1E0M4HXg-0WNCMh4C4wQoLIw8E0BmAv0b/view?usp=sharing",
  },
  {
    id: "oracle-genai",
    title: "Generative AI Professional Certification",
    issuer: "Oracle University",
    date: "July 2025",
    url: "https://drive.google.com/file/d/1u2Y0VQe-hvzZ4AahLOhCYT7Y7jrdS9Rd/view?usp=sharing",
  },
  {
    id: "oracle-devops",
    title: "DevOps Professional Certification",
    issuer: "Oracle University",
    date: "July 2025",
    url: "https://drive.google.com/file/d/1uEzP11fS4krGfE7rMOY-KmLXhWd0Orvu/view?usp=sharing",
  },
  {
    id: "cisco-python",
    title: "Python Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    date: "November 2023",
    url: "https://drive.google.com/file/d/1uF8dA3nMmxhHHKNIMtmh_P2DNVmBs5QY/view?usp=sharing",
  },
  {
    id: "udemy-java",
    title: "Java Programming",
    issuer: "Udemy",
    date: "November 2023",
    url: "https://drive.google.com/file/d/1VYrrNRnhklJqeNAApiwE4xsG3ytbefQE/view?usp=sharing",
  },
];

// ─── Projects ───────────────────────────────────────────
export const projects = [
  {
    id: "qa-agent",
    name: "Autonomous QA Agent",
    category: "AI Applications",
    description:
      "Engineered an end-to-end autonomous QA testing agent that parses multi-format specifications using RAG to generate test scenarios with zero LLM hallucinations.",
    stack: ["FastAPI", "Streamlit", "RAG", "ChromaDB", "Selenium", "Groq/LLMs"],
    image: "/projects/qa-agent.png",
    url: null,
    github: "https://github.com/280205/Autonomous-QA-Agent-.git",
  },
  {
    id: "feastflo",
    name: "Feast Flow",
    category: "Web Applications",
    description:
      "Catalyzed 30% increase in order fulfillment efficiency for rural Indian caterers. Implemented Stripe API endpoints processing over 500 daily transactions with 99.99% uptime.",
    stack: ["MongoDB", "ReactJS", "Express", "NodeJS", "Stripe", "JWT", "Tailwind CSS"],
    image: "/projects/feastflo.png",
    url: "https://food-delivery-main-jvdw.onrender.com/",
    github: "https://github.com/280205/FeastFloRepo.git",
  },
  {
    id: "realtime-chat-app",
    name: "Realtime Chat App",
    category: "Web Applications",
    description:
      "A real-time messaging platform enabling seamless communication with instant message delivery and live presence updates.",
    stack: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/projects/realtime-chat-app.png",
    url: "https://realtime-chat-app-2-irb6.onrender.com",
    github: "https://github.com/280205/Realtime-chat-app.git",
  },
  {
    id: "career-guide",
    name: "CareerGuide.ai",
    category: "AI Applications",
    description:
      "Devised an innovative mentorship matching system using machine learning, connecting 200+ users. Designed a personalized user profiling system leading to 30% improvement in accuracy.",
    stack: ["React.js", "Node.js", "Flask", "Generative AI", "MongoDB"],
    image: "/projects/career-guide.png",
    url: "https://carrierguide-frontend.onrender.com",
    github: "https://github.com/280205/CarrierGuide.ai_new.git",
  },
  {
    id: "preptalk",
    name: "Preptalk",
    category: "AI Applications",
    description:
      "An AI-powered interview preparation platform providing real-time feedback and personalized technical mock interviews.",
    stack: ["React.js", "Generative AI", "Node.js"],
    image: "/projects/preptalk.png",
    url: "https://preptalk-frontend1.onrender.com",
    github: "https://github.com/280205/Prep-Talk.git",
  },
];

// ─── Honors & Leadership ────────────────────────────────
export const honors = [];
export const awards = [];

// ─── Skills with Icons ──────────────────────────────────
export const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "C++", icon: "⚙️" },
  { name: "Java", icon: "☕" },
  { name: "React.js", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "LangChain", icon: "🦜" },
];
