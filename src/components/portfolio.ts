export type AchievementId =
  | "stadium-entry"
  | "explorer"
  | "architect"
  | "algorithm"
  | "bug-slayer"
  | "music"
  | "hiphophub-open"
  | "extra-time"
  | "open-source"
  | "lore"
  | "hidden-chant"
  | "backend-builder"
  | "community-scout"
  | "contact-reached"
  | "completionist";

export type ModalId = "trophy" | "builder-notes" | "scout-report" | null;

export type Toast = {
  label: string;
  title: string;
};

export type Discovery = {
  key: string;
  title: string;
  body: string;
  achievement?: AchievementId;
};

export type ProjectNode = {
  id: string;
  title: string;
  detail: string;
  x: number;
  y: number;
};

export const portfolioLinks = {
  email: "aayushtiwari1001@gmail.com",
  github: "https://github.com/Aayush10016",
  linkedin: "https://www.linkedin.com/in/aayush-tiwari-048558347/",
  hiphophub: "https://hip-hop-hub.vercel.app/",
  resume: "/resume.pdf"
};

export const trophyStorageKey = "extra-time-trophies";

export const profileSummary = {
  name: "Aayush Tiwari",
  education: "B.Tech, Computer Science & Engineering · Vellore Institute of Technology · 2023–2027",
  coreSkills: ["Java Backend Engineering", "Secure APIs", "System Design", "AI & RAG", "Automated Testing"],
  projects: ["HipHopHub", "Waymark", "Pact"]
};

export const coreLineup = ["Java", "Spring Boot", "PostgreSQL", "TypeScript", "Spring Security", "Docker", "JUnit", "REST APIs", "RAG / pgvector", "Redis / BullMQ", "Python", "DSA"];

export const projectBriefs = {
  hiphophub: {
    name: "HipHopHub",
    purpose: "Music discovery platform for exploring artists, songs, relationships, and communities.",
    stack: "Java, Spring Boot, React, TypeScript, SQL, Spring Security, JWT, Docker",
    features: "61 API endpoints, Last.fm and iTunes integration, Guess the Song, quizzes, leaderboard, achievements",
    live: "https://hip-hop-hub.vercel.app/"
  },

};

export const achievements: Record<AchievementId, { title: string; detail: string; requirement: string }> = {
  "stadium-entry": {
    title: "First Match Attended",
    detail: "Entered Aayush Tiwari Arena and began the build season.",
    requirement: "Explore a section from the opening page."
  },
  explorer: {
    title: "Explorer",
    detail: "Entered the world instead of skimming the page.",
    requirement: "Open the arena experience and start exploring the portfolio."
  },
  architect: {
    title: "Architect",
    detail: "Built a working system formation under pressure.",
    requirement: "Complete either System Design Puzzle with the correct architecture order."
  },
  algorithm: {
    title: "Algorithm Hunter",
    detail: "Read movement like match footage.",
    requirement: "Answer any Guess The Algorithm challenge correctly."
  },
  "bug-slayer": {
    title: "Bug Slayer",
    detail: "Found the small mistakes that change the score.",
    requirement: "Solve every visible Bug Hunt scenario in the active category."
  },
  music: {
    title: "Music Curator",
    detail: "Opened the listening room and followed the rhythm.",
    requirement: "Open a music discovery, HipHopHub note, or music-related hidden chant."
  },
  "hiphophub-open": {
    title: "Listening Room Visitor",
    detail: "Opened HipHopHub from the portfolio and followed the project beyond the arena.",
    requirement: "Open HipHopHub from Selected work or the liner notes."
  },
  "extra-time": {
    title: "Extra Time Survivor",
    detail: "Chose one more attempt after 90 minutes.",
    requirement: "Discover the extra-time hidden chant or enter the after-hours story layer."
  },
  "open-source": {
    title: "Open Source Spirit",
    detail: "Found the open-source thread.",
    requirement: "Reveal or type the open-source hidden chant."
  },
  lore: {
    title: "Developer Lore",
    detail: "Found a story hidden off the main route.",
    requirement: "Reveal any hidden discovery tied to a personal story."
  },
  "hidden-chant": {
    title: "Hidden Chant Finder",
    detail: "Discovered one of the words the site listens for.",
    requirement: "Type a hidden chant or select one from the Hidden Discoveries archive."
  },
  "backend-builder": {
    title: "Backend Builder",
    detail: "Tracked the systems thinking behind APIs, caches, queues, and trust.",
    requirement: "Solve backend-oriented content in Bug Hunt or System Design Puzzle."
  },
  "community-scout": {
    title: "Community Scout",
    detail: "Found the part of the story that belongs to people, not just code.",
    requirement: "Open a community or open-source hidden discovery."
  },
  "contact-reached": {
    title: "Transfer Window",
    detail: "Reached Full Time and opened the collaboration lane.",
    requirement: "Visit the Contact section."
  },
  completionist: {
    title: "Completionist",
    detail: "Collected every trophy in the room.",
    requirement: "Unlock every other trophy listed in the Trophy Room."
  }
};

export const discoveries: Discovery[] = [
  {
    key: "football",
    title: "Favorite Matches",
    body: "The best matches are the ones that look finished and then suddenly become alive again. That is the whole idea of EXTRA TIME.",
    achievement: "hidden-chant"
  },
  {
    key: "music",
    title: "Favorite Albums",
    body: "Albums taught the site its pacing: intros, drops, bridges, quiet tracks, and the final track that stays with you.",
    achievement: "music"
  },
  {
    key: "hiphop",
    title: "Underground Listening",
    body: "Hip-hop shaped the portfolio's rhythm: samples, loops, references, scenes, and the joy of following influence.",
    achievement: "music"
  },
  {
    key: "backend",
    title: "Backend Instinct",
    body: "The backend is where promises become enforceable: validation, persistence, queues, caches, and failure paths.",
    achievement: "backend-builder"
  },
  {
    key: "java",
    title: "First Language Energy",
    body: "Java became the training ground: strict enough to build discipline, practical enough to ship real features.",
    achievement: "hidden-chant"
  },
  {
    key: "testing",
    title: "Testing the boundaries",
    body: "Tests make assumptions visible. The most useful ones exercise failure paths, permissions, and the boundaries people actually rely on.",
    achievement: "backend-builder"
  },
  {
    key: "dream",
    title: "Private North Star",
    body: "The dream is to build things that feel useful, memorable, and human enough for people to return to.",
    achievement: "lore"
  },
  {
    key: "late-night",
    title: "After Hours",
    body: "A lot of growth happened after the normal day ended, with a dim screen, cold tea, and one more build.",
    achievement: "extra-time"
  },
  {
    key: "builder",
    title: "Builder Mode",
    body: "Building changed the question from 'Can I learn this?' to 'Can I make this useful for someone else?'",
    achievement: "backend-builder"
  },
  {
    key: "system",
    title: "Systems View",
    body: "A system is a formation. Every component has a role, and the gaps matter as much as the passes.",
    achievement: "architect"
  },
  {
    key: "open-source",
    title: "Contribution Mindset",
    body: "Open source made the pitch bigger. The code had teammates now.",
    achievement: "open-source"
  },
  {
    key: "extra-time",
    title: "Site Thesis",
    body: "Extra time is not extra comfort. It is the difficult minute when persistence gets one last chance to become visible.",
    achievement: "extra-time"
  },
  {
    key: "curiosity",
    title: "Why Keep Going",
    body: "Curiosity is the engine that turns one tutorial into a project, then turns that project into a better question.",
    achievement: "lore"
  },
  {
    key: "engineer",
    title: "Engineering Temperament",
    body: "Engineering is patience with details: edge cases, latency, readability, and the humility to test the obvious.",
    achievement: "backend-builder"
  },
  {
    key: "stadium",
    title: "The Stadium Metaphor",
    body: "The stadium is a place for pressure. This portfolio uses it because growth also happens under lights.",
    achievement: "hidden-chant"
  },
  {
    key: "season",
    title: "Season Arc",
    body: "Every learning phase is a season: training, mistakes, fixtures, fatigue, form, and the next kickoff.",
    achievement: "lore"
  },
  {
    key: "vinyl",
    title: "Why The Record Spins",
    body: "A vinyl record is a loop with tiny imperfections. The site borrows that: repetition, texture, rhythm, memory.",
    achievement: "music"
  },
  {
    key: "algorithm",
    title: "Pattern Vision",
    body: "Algorithms turned confusion into shapes: queues, stacks, graphs, windows, and the calm of recognizing a pattern.",
    achievement: "algorithm"
  },
  {
    key: "ai",
    title: "AI with guardrails",
    body: "AI-assisted development needs context and verification. Waymark explores project memory, deterministic checks, and approval before a suggested change becomes an edit.",
    achievement: "backend-builder"
  },
  {
    key: "community",
    title: "People Around Products",
    body: "Products feel alive when people gather around them. Community is not decoration; it is part of the architecture.",
    achievement: "community-scout"
  }
];


