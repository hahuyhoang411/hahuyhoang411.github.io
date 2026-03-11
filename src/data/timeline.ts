export interface TimelineEntry {
  id: number;
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  image: string;
  achievements: string[];
}

export const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: "May 2025",
    title: "DeepMed Project",
    company: "Meddies",
    location: "Worldwide",
    description: "Leveraging my background in AI research and self-taught fullstack development skills, I'm building an agentic AI workflow system that helps GPs access and synthesize medical information more efficiently. The system integrates multiple trusted medical sources and provides evidence-based insights.",
    technologies: ["Agentic Workflows", "Generative AI", "Fullstack Development", "Cloud Infrastructure", "Docker", "API Integration", "Medical Knowledge Graphs"],
    image: "/assets/timeline/deepmed.webp",
    achievements: [
      "Developed a multi-agent system that autonomously gathers and cross-references information from trusted medical sources",
      "Built scalable cloud infrastructure with containerized microservices for reliable deployment",
      "Created an intuitive frontend interface for GPs to interact with the AI system",
      "Implemented secure API integrations with medical databases and research repositories"
    ]
  },
  {
    id: 2,
    year: "March 2025",
    title: "Meddies Founder",
    company: "Meddies",
    location: "Worldwide",
    description: "In my free time, I continue working on the project I've been passionate about and always wanted to pursue: applying AI to create practical healthcare solutions.",
    technologies: ["Agentic Workflows", "Generative AI", "Decision Support Systems", "API Integration"],
    image: "/assets/timeline/meddies.webp",
    achievements: [
      "Developing 'Open Medical Research Assistant' using agentic workflows.",
      "The tool aims to create decision-making support reports for healthcare providers."
    ]
  },
  {
    id: 3,
    year: "February 2025",
    title: "Master Internship",
    company: "LIGLAB",
    location: "France",
    description: "Developed MedMeta, a novel benchmark for evaluating LLMs' ability to generate conclusions from medical meta-analyses using reference abstracts. The benchmark includes 81 samples across 24 medical topics from 2018-2025.",
    technologies: ["LLM", "RAG", "Benchmarking", "Medical AI", "Human Evaluation"],
    image: "/assets/timeline/liglab.webp",
    achievements: [
      "Created MedMeta benchmark with 81 samples spanning 24 medical topics from PubMed",
      "Evaluated various LLMs (8B-27B parameters) across different RAG strategies",
      "Developed a crowdsourcing platform for human evaluation comparison with automated metrics",
      "Developed a LLM Workflow to generate conclusions from medical meta-analyses using reference abstracts"
    ]
  },
  {
    id: 4,
    year: "February 2025",
    title: "LLM Researcher (Solo)",
    company: "Solo Research",
    location: "France",
    description: "Driven by my curiosity in the LLM field, I began several solo research projects to satisfy my thirst for knowledge.",
    technologies: ["LLM", "Multimodal Models", "AI Benchmarking", "Cross-lingual Models"],
    image: "/assets/timeline/pensez.webp",
    achievements: [
      "Authored Pensez – an efficient French-English Reasoning LLM for Limited Resources (TALN 2025).",
      "Founded OpenMedical – a project for creating benchmarks and multimodal models for healthcare.",
    ]
  },
  {
    id: 5,
    year: "Oct 2023 - Jan 2025",
    title: "LLM Researcher",
    company: "Menlo Research",
    location: "AI Startup",
    description: "After graduating, I was fortunate to be accepted as an LLM researcher at an AI startup — marking the next turning point in my career.",
    technologies: ["LLM", "Mixed-Modal AI", "Early-Fusion", "Real-time Voice Assistant", "LLM Optimization"],
    image: "/assets/timeline/menlo.webp",
    achievements: [
      "Authored Ichigo, a mixed-modal early-fusion real-time voice assistant",
      "Speaker at FOSDEM2025 on LLM application and inference optimization.",
      "Speaker at GOSIM2025 on LLMs in embodiment.",
      "Co-authored Speechless: Speech Instruction Training Without Speech for Low Resource Languages (InterSpeech 2025)."
    ]
  },
  {
    id: 6,
    year: "June 2024",
    title: "Vista Co-Author",
    company: "VietAI (Non-profit)",
    location: "Vietnam",
    description: "Co-authored the Vista family - the open-source Vietnamese Vision Language Model.",
    technologies: ["LLM", "VLM (Vision Language Model)", "AI Education", "PyTorch"],
    image: "/assets/timeline/vista.webp",
    achievements: [
      "Co-authored the Vista family - the open-source Vietnamese Vision Language Model.",
    ]
  },
  {
    id: 7,
    year: "June 2023 - Sep 2024",
    title: "TA & AI Researcher",
    company: "VietAI (Non-profit)",
    location: "Vietnam",
    description: "After completing my thesis, I focused on improving my AI skills, becoming a top student and eventually a TA and AI researcher for a nonprofit AI education organization.",
    technologies: ["LLM", "VLM (Vision Language Model)", "AI Education", "PyTorch"],
    image: "/assets/timeline/vietai.webp",
    achievements: [
      "Co-authored the Vista family - the open-source Vietnamese Vision Language Model.",
      "Assisted in teaching LLM across 4 courses to over 200 students from enterprises and universities.",
      "Contributed to a 700,000+ sample Vietnamese vision-language open-source dataset."
    ]
  },
  {
    id: 8,
    year: "April 2023",
    title: "MeptiC Founder",
    company: "MeptiC",
    location: "Ho Chi Minh City, Vietnam",
    description: "MeptiC is a startup that provides a platform for healthcare providers to assess patient prescription to reduce medication errors and workload.",
    technologies: ["LLM", "Healthcare AI", "Prescription Assessment", "Streamlit", "AI Agent"],
    image: "/assets/timeline/meptic.webp",
    achievements: [
      "Developed a platform for healthcare providers to assess patient prescription."
    ]
  },
  {
    id: 9,
    year: "January 2023",
    title: "BSc Thesis",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Understanding the trend of LLMs, I shifted my research focus to apply them in healthcare, embodying the spirit of 'What doesn't kill you makes you stronger'.",
    technologies: ["LLM", "Healthcare AI", "Prescription Assessment", "Streamlit"],
    image: "/assets/timeline/bscreport.webp",
    achievements: [
      "BSc thesis: Development of an Outpatient Medication Copilot for Prescription Assessment."
    ]
  },
  {
    id: 10,
    year: "Sep 2022 - Dec 2022",
    title: "First Internship",
    company: "Master Data",
    location: "Ho Chi Minh City, Vietnam",
    description: "This period was a quiet break, allowing me to gain practical experience in data management within a corporate environment.",
    technologies: ["ERP", "Inventory Management", "Data Maintenance"],
    image: "/assets/timeline/diag.webp",
    achievements: [
      "Maintained items and tests in ERP and Inventory Management software."
    ]
  },
  {
    id: 11,
    year: "June 2022",
    title: "AI Research",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Continued my research journey in applying AI to healthcare.",
    technologies: ["AI", "Virtual Health Assistant", "Community Care"],
    image: "/assets/timeline/dls.webp",
    achievements: [
      "Project: Development of a Virtual Health Assistant for Community Respiratory Care.",
      "Project: PharmAssist - A virtual health assistant for patient counseling of effective drug-taking advice.",
      "Project: MeptiC Copilot - A virtual health assistant for assessing outpatient prescription."
    ]
  },
  {
    id: 12,
    year: "June 2021",
    title: "First AI Research",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Meeting a senior passionate about bioinformatics inspired me to start studying AI. Although our project didn't go as planned, it motivated me to begin my own research journey.",
    technologies: ["Machine Learning", "AI", "Bioinformatics", "Clinical Pharmacy"],
    image: "/assets/timeline/firstai.webp",
    achievements: [
      "Project: Development of a Machine Learning model for Drug Recommendation in Coronary Syndrome ICU.",
      "Won Third Prize in a competition."
    ]
  },
  {
    id: 13,
    year: "September 2018",
    title: "BSc. Pharmacy",
    company: "University of Medicine and Pharmacy (UMP)",
    location: "Ho Chi Minh City, Vietnam",
    description: "After 11 years of studying physics, I made a major shift and chose health care as my life goal, starting my journey in pharmacy.",
    technologies: ["Pharmacy", "Health Care", "Physics"],
    image: "/assets/timeline/bsc.webp",
    achievements: [
      "Enrolled in the Faculty of Pharmacy to pursue a Bachelor of Science degree."
    ]
  },
];
