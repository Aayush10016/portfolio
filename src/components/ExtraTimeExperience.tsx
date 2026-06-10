"use client";

import {
  Activity,
  BadgeCheck,
  Blocks,
  Bug,
  ChevronRight,
  Code2,
  ClipboardCheck,
  Database,
  Eye,
  ExternalLink,
  Flame,
  Gauge,
  Headphones,
  LockKeyhole,
  Mail,
  Music2,
  Network,
  Radar,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  X,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type AchievementId =
  | "stadium-entry"
  | "explorer"
  | "architect"
  | "algorithm"
  | "bug-slayer"
  | "music"
  | "hiphophub-open"
  | "swat-risk-reader"
  | "extra-time"
  | "open-source"
  | "vault"
  | "control-room"
  | "janadesh-architecture"
  | "lore"
  | "hidden-chant"
  | "operator"
  | "backend-builder"
  | "community-scout"
  | "contact-reached"
  | "completionist";

type ModalId = "trophy" | "swat-risk" | "builder-notes" | "operator-log" | "scout-report" | null;

type Toast = {
  label: string;
  title: string;
};

type Discovery = {
  key: string;
  title: string;
  body: string;
  achievement?: AchievementId;
};

type ProjectNode = {
  id: string;
  title: string;
  detail: string;
  x: number;
  y: number;
};

const portfolioLinks = {
  email: "aayushtiwari1001@gmail.com",
  github: "https://github.com/Aayush10016",
  linkedin: "https://www.linkedin.com/in/aayush-tiwari-048558347/",
  hiphophub: "https://hip-hop-hub.vercel.app/"
};

const trophyStorageKey = "extra-time-trophies";

const profileSummary = {
  name: "Aayush Tiwari",
  education: "Engineering learning track focused on backend systems, DSA, and blockchain.",
  coreSkills: ["Backend Engineering", "System Design", "DSA", "Blockchain", "Product Thinking"],
  projects: ["HipHopHub", "Janadesh", "SWAT Coin"]
};

const coreLineup = [
  "Java",
  "Spring Boot",
  "SQL",
  "DSA",
  "Blockchain",
  "Solidity",
  "Git",
  "GitHub",
  "REST APIs",
  "System Design"
];

const projectBriefs = {
  hiphophub: {
    name: "HipHopHub",
    purpose: "Music discovery platform for exploring artists, songs, relationships, and communities.",
    stack: "Next.js, TypeScript, graph-style discovery UI, music data modeling",
    features: "Artist universe exploration, relationship graph, listening-room notes, live project link",
    live: "https://hip-hop-hub.vercel.app/"
  },
  janadesh: {
    name: "Janadesh",
    purpose: "Voting infrastructure concept for secure institutional elections and audit-ready workflows.",
    stack: "Authentication, OTP verification, election engine, blockchain validation, audit trails",
    features: "Clickable architecture layers, operator log, admin controls, tamper-evident flow",
    live: "Interactive control room in this portfolio"
  },
  swat: {
    name: "SWAT Coin",
    purpose: "Educational stablecoin engineering study focused on reserves, supply, and token health.",
    stack: "Blockchain concepts, token economics, reserve simulation, systems modeling",
    features: "Mint, burn, reserve controls, stability core, risk note, live metric feedback",
    live: "Interactive reserve vault in this portfolio"
  }
};

const achievements: Record<AchievementId, { title: string; detail: string; requirement: string }> = {
  "stadium-entry": {
    title: "First Match Attended",
    detail: "Entered Aayush Tiwari Arena and began the build season.",
    requirement: "Click ENTER THE STADIUM on the entrance page."
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
    requirement: "Click Open HipHopHub in The Listening Room."
  },
  "swat-risk-reader": {
    title: "Risk Analyst",
    detail: "Read the SWAT Coin risk note before touching the reserve controls.",
    requirement: "Open the SWAT Coin Risk Analysis modal."
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
  vault: {
    title: "Reserve Keeper",
    detail: "Balanced supply, reserves, and confidence.",
    requirement: "Use the SWAT Coin simulation until market confidence rises above 72."
  },
  "control-room": {
    title: "Election Operator",
    detail: "Inspected the voting infrastructure.",
    requirement: "Interact with any Janadesh architecture layer or open the operator log."
  },
  "janadesh-architecture": {
    title: "Architecture Inspector",
    detail: "Reviewed how identity, ballots, audits, and validation fit together.",
    requirement: "Click any Janadesh architecture layer in The Control Room."
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
  operator: {
    title: "Operator",
    detail: "Opened the mission log and followed the build chronology.",
    requirement: "Open the Janadesh Operator Log."
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
    requirement: "Scroll to the Full Time contact section."
  },
  completionist: {
    title: "Completionist",
    detail: "Collected every trophy in the room.",
    requirement: "Unlock every other trophy listed in the Trophy Room."
  }
};

const discoveries: Discovery[] = [
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
    key: "solidity",
    title: "Smart Contract Caution",
    body: "Solidity made every assumption feel heavier because deployed code asks for discipline before it asks for confidence.",
    achievement: "vault"
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
    key: "blockchain",
    title: "Trust Experiments",
    body: "Blockchain work made trust visible: ledgers, constraints, signatures, costs, and the danger of pretending risk is simple.",
    achievement: "vault"
  },
  {
    key: "community",
    title: "People Around Products",
    body: "Products feel alive when people gather around them. Community is not decoration; it is part of the architecture.",
    achievement: "community-scout"
  }
];

const firstHalfEvents = [
  {
    minute: 12,
    title: "Discovered Java",
    call: "A disciplined first touch. Types, classes, loops, and the first feeling that software can be trained like a skill.",
    stat: "Composure +8"
  },
  {
    minute: 21,
    title: "Started 100 Days Of Code",
    call: "The crowd quiets down. Repetition begins to do the real work. Small daily wins become match fitness.",
    stat: "Consistency +18"
  },
  {
    minute: 28,
    title: "Solved A Major DSA Challenge",
    call: "A clean through ball: patterns start appearing in arrays, trees, queues, and graphs.",
    stat: "Pattern Vision +14"
  },
  {
    minute: 37,
    title: "Late-Night Builds",
    call: "Everyone else has left the stadium, but the floodlights stay on. The craft starts becoming personal.",
    stat: "Persistence +20"
  },
  {
    minute: 44,
    title: "First Open Source Contribution",
    call: "A brave run into shared code. Hacktoberfest turns learning into collaboration.",
    stat: "Team Play +16"
  }
];

const ratings = [
  ["Java", 84],
  ["DSA", 81],
  ["Backend", 78],
  ["Blockchain", 75],
  ["Systems", 74],
  ["Curiosity", 99]
];

const listeningNodes: ProjectNode[] = [
  {
    id: "core",
    title: "HipHopHub",
    detail: "A music discovery universe built around artists, songs, influence, and communities.",
    x: 50,
    y: 48
  },
  {
    id: "artists",
    title: "Artists",
    detail: "Profiles become rooms instead of rows, so identity and catalog can be explored together.",
    x: 19,
    y: 24
  },
  {
    id: "songs",
    title: "Songs",
    detail: "Tracks act like playable clues that connect scenes, moods, and listener memory.",
    x: 80,
    y: 24
  },
  {
    id: "relations",
    title: "Relationships",
    detail: "Graph links reveal collaborations, influence, and neighborhoods inside the genre.",
    x: 22,
    y: 75
  },
  {
    id: "communities",
    title: "Communities",
    detail: "Discovery is strongest when it shows the crowd around the sound, not only the sound itself.",
    x: 79,
    y: 75
  }
];

const controlLayers = [
  {
    title: "Authentication Layer",
    shortTitle: "Auth Layer",
    icon: LockKeyhole,
    body: "Voter identity is guarded before anything reaches the election engine."
  },
  {
    title: "OTP Verification",
    shortTitle: "OTP",
    icon: ShieldCheck,
    body: "A short-lived verification ritual reduces impersonation and keeps the flow human."
  },
  {
    title: "Election Engine",
    shortTitle: "Election",
    icon: Gauge,
    body: "Ballots move through deterministic rules, eligibility checks, and protected counting."
  },
  {
    title: "Blockchain Layer",
    shortTitle: "Blockchain",
    icon: Blocks,
    body: "Important events become tamper-evident records instead of private promises."
  },
  {
    title: "Audit Trails",
    shortTitle: "Audit",
    icon: Radar,
    body: "Every sensitive action leaves a trail so trust can be inspected after the match."
  },
  {
    title: "Admin Controls",
    shortTitle: "Admin",
    icon: Database,
    body: "Operators can manage elections without bypassing the rules that protect voters."
  }
];

const algorithmRounds = [
  {
    answer: "Merge Sort",
    clue: "The formation keeps splitting, then recombining into calm order.",
    insight: "Aayush likes algorithms that make chaos explainable through structure."
  },
  {
    answer: "Bubble Sort",
    clue: "Neighbors keep swapping after tiny collisions until the whole line calms down.",
    insight: "Even inefficient ideas teach the cost of repeated work."
  },
  {
    answer: "Selection Sort",
    clue: "One scout searches the whole pitch for the smallest option, then locks it into place.",
    insight: "Selection thinking is useful when the next best choice matters more than speed."
  },
  {
    answer: "Insertion Sort",
    clue: "Each new player steps into the correct pocket inside an already organized line.",
    insight: "Aayush notices when local order can avoid a full rebuild."
  },
  {
    answer: "BFS",
    clue: "The search expands level by level, like defenders stepping up together.",
    insight: "Breadth-first thinking shows up in debugging: inspect the nearest causes first."
  },
  {
    answer: "Quick Sort",
    clue: "A pivot takes command and the rest of the squad rearranges around it.",
    insight: "Good systems often start by choosing the right boundary."
  },
  {
    answer: "DFS",
    clue: "The run goes deep down one channel before returning to try the next.",
    insight: "Depth-first thinking is useful when one path needs full commitment before comparison."
  },
  {
    answer: "Binary Search",
    clue: "The field is already ordered, so the search cuts the remaining space in half.",
    insight: "Good assumptions are powerful when they are true and dangerous when they are not."
  },
  {
    answer: "Two Pointers",
    clue: "Two players move from opposite lanes, closing space until the target appears.",
    insight: "Some problems become simpler when pressure comes from both sides."
  },
  {
    answer: "Sliding Window",
    clue: "A moving frame keeps the useful streak and drops what no longer helps.",
    insight: "Aayush likes windows because they turn brute force into rhythm."
  }
] as const;

const algorithmChoices = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "BFS",
  "DFS",
  "Binary Search",
  "Two Pointers",
  "Sliding Window"
];

const systemPuzzles = [
  {
    title: "Voting Platform",
    clue: "Identity, entry, speed, async work, storage, accountability.",
    correct: ["Authentication", "API", "Cache", "Queue", "Database", "Audit"]
  },
  {
    title: "Music Discovery Platform",
    clue: "Identity, entry, personalization, memory, speed, insight.",
    correct: ["Authentication", "API", "Recommendation Engine", "Database", "Cache", "Analytics"]
  }
];

function formatMatchTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatWholeNumber(value: number) {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function normalizeAchievementIds(values: unknown): AchievementId[] {
  if (!Array.isArray(values)) {
    return [];
  }
  const validIds = Object.keys(achievements) as AchievementId[];
  return values.filter((value, index) => (
    typeof value === "string" &&
    validIds.includes(value as AchievementId) &&
    values.indexOf(value) === index
  )) as AchievementId[];
}

function withCompletionist(ids: AchievementId[]): AchievementId[] {
  const allIds = Object.keys(achievements) as AchievementId[];
  const withoutCompletionist = ids.filter((id) => id !== "completionist");
  if (withoutCompletionist.length >= allIds.length - 1) {
    return [...withoutCompletionist, "completionist"];
  }
  return withoutCompletionist;
}

export default function ExtraTimeExperience() {
  const [time, setTime] = useState(90 * 60);
  const [achievementIds, setAchievementIds] = useState<AchievementId[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [activeDiscovery, setActiveDiscovery] = useState<Discovery | null>(null);
  const [hudLifted, setHudLifted] = useState(true);

  const unlock = useCallback((id: AchievementId, silent = false) => {
    setAchievementIds((current) => {
      if (current.includes(id)) {
        return current;
      }
      const next = withCompletionist([...current, id]);
      try {
        window.localStorage.setItem(trophyStorageKey, JSON.stringify(next));
      } catch {
        // Trophy progress remains in memory when browser storage is unavailable.
      }
      if (!silent) {
        setToast({ label: "Trophy Unlocked", title: achievements[id].title });
        window.setTimeout(() => setToast(null), 2600);
      }
      return next;
    });
  }, []);

  const notify = useCallback((title: string, label = "Match update") => {
    setToast({ label, title });
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(trophyStorageKey);
        const storedIds = normalizeAchievementIds(stored ? JSON.parse(stored) : []);
        const next = withCompletionist(storedIds.includes("explorer") ? storedIds : [...storedIds, "explorer"]);
        setAchievementIds(next);
        window.localStorage.setItem(trophyStorageKey, JSON.stringify(next));
        if (!storedIds.includes("explorer")) {
          setToast({ label: "Trophy Unlocked", title: achievements.explorer.title });
          window.setTimeout(() => setToast(null), 2600);
        }
      } catch {
        unlock("explorer", true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [unlock]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHudLifted(window.scrollY < window.innerHeight * 0.72);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let buffer = "";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.length !== 1) {
        return;
      }
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-24);
      const match = discoveries.find((item) => buffer.endsWith(item.key));
      if (match) {
        setActiveDiscovery(match);
        unlock(match.achievement ?? "lore");
        unlock("hidden-chant");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [unlock]);

  const earned = achievementIds.map((id) => achievements[id]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-midnight text-cream">
      <MatchHud
        time={time}
        achievements={achievementIds.length}
        onTrophies={() => setActiveModal("trophy")}
        onScoutReport={() => setActiveModal("scout-report")}
        lifted={hudLifted}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="experience"
      >
        <FirstHalf openScoutReport={() => setActiveModal("scout-report")} />
        <Halftime unlock={unlock} />
        <SecondHalf unlock={unlock} setDiscovery={setActiveDiscovery} openModal={setActiveModal} />
        <SecretDiscoveries
          found={activeDiscovery}
          onSelect={(discovery) => {
            setActiveDiscovery(discovery);
            unlock(discovery.achievement ?? "lore");
            unlock("hidden-chant");
          }}
        />
        <FullTime earned={earned} notify={notify} unlock={unlock} />
      </motion.div>

      <ModalLayer
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        trophyIds={achievementIds}
      />

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="achievement-toast"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
          >
            <Trophy size={18} />
            <span>{toast.label}</span>
            <strong>{toast.title}</strong>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function MatchHud({
  time,
  achievements,
  onTrophies,
  onScoutReport,
  lifted
}: {
  time: number;
  achievements: number;
  onTrophies: () => void;
  onScoutReport: () => void;
  lifted: boolean;
}) {
  return (
    <header className={clsx("match-hud", lifted && "match-hud-lifted")} aria-label="Match navigation">
      <a className="brand-mark" href="#first-half" aria-label="Back to first half">
        <Image src="/at-crest.svg" alt="" width={18} height={18} aria-hidden="true" />
        <span>EXTRA TIME</span>
      </a>
      <nav className="phase-nav" aria-label="Match phases">
        <a href="#first-half">First Half</a>
        <a href="#halftime">Halftime</a>
        <a href="#second-half">Second Half</a>
        <a href="#full-time">Full Time</a>
      </nav>
      <div className="hud-actions">
        <span className="time-chip">+{formatMatchTime(time - 90 * 60)}</span>
        <button
          className="trophy-chip scout-button"
          type="button"
          onClick={onScoutReport}
          data-tooltip="Open recruiter quick view"
        >
          <Eye size={14} />
          Scout
        </button>
        <button
          className="trophy-chip trophy-button"
          type="button"
          onClick={onTrophies}
          data-tooltip="Open trophy room"
          aria-label="Open trophy room"
        >
          <Trophy size={14} />
          {achievements}
        </button>
      </div>
    </header>
  );
}

function FirstHalf({ openScoutReport }: { openScoutReport: () => void }) {
  return (
    <section id="first-half" className="phase first-half">
      <div className="phase-kicker">
        <span>Phase 1</span>
        <strong>First Half</strong>
      </div>
      <div className="editorial-grid">
        <div className="commentary-panel">
          <p className="eyebrow">Live commentary</p>
          <h2>The beginning was not a clean highlight reel.</h2>
          <p>
            It was training: Java syntax, DSA frustration, Hacktoberfest nerves,
            and the private decision to keep returning to the pitch.
          </p>
        </div>
        <div className="timeline-pitch" aria-label="Career timeline as football commentary">
          {firstHalfEvents.map((event) => (
            <motion.article
              className="minute-card"
              key={event.minute}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5 }}
            >
              <div className="minute-badge">
                {event.minute}
                <span aria-hidden="true">&apos;</span>
              </div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.call}</p>
                <span>{event.stat}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <CoreLineup openScoutReport={openScoutReport} />
      <div className="match-stats-band">
        <div>
          <p className="eyebrow">Player ratings</p>
          <h3>Skills</h3>
        </div>
        <div className="ratings-grid">
          {ratings.map(([label, value]) => (
            <div className="rating-tile gsap-float" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <div className="rating-bar">
                <i style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreLineup({ openScoutReport }: { openScoutReport: () => void }) {
  return (
    <div className="core-lineup" aria-label="Core technical lineup">
      <div className="lineup-copy">
        <p className="eyebrow">Core Lineup</p>
        <h3>Matchday squad for the build.</h3>
        <p>
          The creative surface is the stadium. Under it is a practical backend
          stack built around Java, systems thinking, data, APIs, and blockchain.
        </p>
        <button type="button" className="artifact-button" onClick={openScoutReport}>
          <Eye size={18} />
          Open Scout Report
        </button>
      </div>
      <div className="lineup-pitch">
        {coreLineup.map((item, index) => (
          <span key={item} style={{ "--lineup-delay": `${index * 34}ms` } as React.CSSProperties}>
            <ShieldCheck size={15} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Halftime({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [tab, setTab] = useState<"algorithm" | "bug" | "system">("algorithm");

  return (
    <section id="halftime" className="phase halftime">
      <div className="phase-kicker">
        <span>Phase 2</span>
        <strong>Halftime</strong>
      </div>
      <div className="halftime-header">
        <h2>Do not scroll. Play the break.</h2>
        <p>
          Halftime is where the visitor becomes part of the story: identify motion,
          catch mistakes, and arrange systems like a formation.
        </p>
      </div>
      <div className="game-shell">
        <div className="tab-row" role="tablist" aria-label="Halftime games">
          <button type="button" className={clsx(tab === "algorithm" && "active")} onClick={() => setTab("algorithm")}>
            <Activity size={17} />
            Guess The Algorithm
          </button>
          <button type="button" className={clsx(tab === "bug" && "active")} onClick={() => setTab("bug")}>
            <Bug size={17} />
            Bug Hunt
          </button>
          <button type="button" className={clsx(tab === "system" && "active")} onClick={() => setTab("system")}>
            <Network size={17} />
            System Puzzle
          </button>
        </div>
        <AnimatePresence mode="wait">
          {tab === "algorithm" ? <AlgorithmGame key="algorithm" unlock={unlock} /> : null}
          {tab === "bug" ? <BugHunt key="bug" unlock={unlock} /> : null}
          {tab === "system" ? <SystemPuzzle key="system" unlock={unlock} /> : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function AlgorithmGame({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);
  const [message, setMessage] = useState("Watch the movement, then call the play.");
  const active = algorithmRounds[round];
  const completed = Math.round((answered.length / algorithmRounds.length) * 100);

  const choose = (choice: string) => {
    if (choice === active.answer) {
      setMessage(active.insight);
      setAnswered((current) => (current.includes(active.answer) ? current : [...current, active.answer]));
      setScore((current) => (answered.includes(active.answer) ? current : current + 10));
      unlock("algorithm");
    } else {
      setMessage(`Wrong call. ${active.answer} was hiding in the movement. Reset your eyes and try the next replay.`);
    }
  };

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Mini Game 1</p>
        <h3>Guess The Algorithm</h3>
        <p>{active.clue}</p>
        <strong className="insight-line">{message}</strong>
        <div className="game-progress" aria-label="Algorithm game progress">
          <span>Score {score}</span>
          <span>{completed}% complete</span>
          <div>
            <i style={{ width: `${completed}%` }} />
          </div>
        </div>
      </div>
      <AlgorithmVisual name={active.answer} round={round} />
      <div className="choice-grid">
        {algorithmChoices.map((choice) => (
          <button type="button" key={choice} onClick={() => choose(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <button
        className="small-action"
        type="button"
        onClick={() => {
          setRound((value) => (value + 1) % algorithmRounds.length);
          setMessage("Watch the movement, then call the play.");
        }}
      >
        Next visualization
      </button>
    </motion.div>
  );
}

function AlgorithmVisual({ name, round }: { name: string; round: number }) {
  const bars = [38, 72, 24, 88, 55, 43, 96, 62, 31, 79];
  const graphOrder = name === "DFS" ? [0, 2, 4, 5, 1, 3] : [0, 1, 2, 3, 4, 5];

  if (name === "BFS" || name === "DFS") {
    return (
      <div className="graph-visual" aria-label={`${name} graph visualization`}>
        {graphOrder.map((node, index) => (
          <motion.span
            key={`${round}-${node}`}
            className="graph-node"
            style={{ left: `${18 + ((node * 17) % 64)}%`, top: `${22 + ((node * 29) % 50)}%` }}
            animate={{ scale: [0.85, 1.15, 1], opacity: [0.5, 1, 0.85] }}
            transition={{ duration: 0.7, delay: index * 0.22, repeat: Infinity, repeatDelay: 2.2 }}
          >
            {node + 1}
          </motion.span>
        ))}
        <i className="graph-line one" />
        <i className="graph-line two" />
        <i className="graph-line three" />
      </div>
    );
  }

  if (name === "Binary Search" || name === "Two Pointers" || name === "Sliding Window") {
    return (
      <div className="search-visual" aria-label={`${name} visualization`}>
        {bars.map((height, index) => {
          const activeIndex = name === "Binary Search" ? index === 4 || index === 5 : name === "Two Pointers" ? index === 1 || index === 8 : index >= 3 && index <= 6;
          return (
            <motion.i
              key={`${round}-${name}-${index}`}
              className={clsx(activeIndex && "active")}
              animate={{ y: activeIndex ? [0, -12, 0] : [0, 0, 0], opacity: activeIndex ? [0.72, 1, 0.72] : 0.42 }}
              transition={{ duration: 1.1, repeat: Infinity, delay: index * 0.05 }}
            >
              {height}
            </motion.i>
          );
        })}
      </div>
    );
  }

  return (
    <div className="sort-visual" aria-label={`${name} sorting visualization`}>
      {bars.map((height, index) => (
        <motion.i
          key={`${round}-${height}-${index}`}
          style={{ height: `${height}%` }}
          animate={{
            height:
              name === "Merge Sort"
                ? [`${height}%`, `${[24, 31, 38, 43, 55, 62, 72, 79, 88, 96][index]}%`]
                : [`${height}%`, `${bars[(index + 3) % bars.length]}%`, `${[24, 31, 38, 43, 55, 62, 72, 79, 88, 96][index]}%`]
          }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.9, delay: index * 0.04 }}
        />
      ))}
    </div>
  );
}

function BugHunt({ unlock }: { unlock: (id: AchievementId) => void }) {
  const categoryBank = useMemo(
    () => [
      {
        title: "Runtime Bugs",
        scenarios: [
          {
            id: "null",
            title: "Null Pointer Exception",
            hint: "The player may not exist before the name is read.",
            target: "player.name",
            fix: "Guard player before accessing player.name.",
            lines: ["function greet(player) {", "  return player.name.toUpperCase();", "}"]
          },
          {
            id: "loop",
            title: "Infinite Loop",
            hint: "The counter never moves toward the whistle.",
            target: "console.log(i);",
            fix: "Increment i inside the loop.",
            lines: ["let i = 0;", "while (i < 10) {", "  console.log(i);", "}"]
          },
          {
            id: "array",
            title: "Array Index Bug",
            hint: "The final index is already one less than the length.",
            target: "i <= scores.length",
            fix: "Use i < scores.length.",
            lines: ["for (let i = 0; i <= scores.length; i++) {", "  total += scores[i];", "}"]
          },
          {
            id: "missing-await",
            title: "Missing Await",
            hint: "The database result is still a promise when the next line reads it.",
            target: "db.getUser(id)",
            fix: "Await the async database call before reading the user.",
            lines: ["async function loadUser(id) {", "  const user = db.getUser(id);", "  return user.email;", "}"]
          },
          {
            id: "timeout",
            title: "Missing Timeout",
            hint: "This API call can hang forever under bad network conditions.",
            target: "fetch(url)",
            fix: "Add a timeout or AbortController.",
            lines: ["const res = await fetch(url);", "return res.json();"]
          }
        ]
      },
      {
        title: "Security Bugs",
        scenarios: [
          {
            id: "auth",
            title: "Authentication Bug",
            hint: "A token's existence is not the same as permission.",
            target: "if (token)",
            fix: "Verify token signature and role claims.",
            lines: ["if (token) {", "  return openAdminPanel();", "}"]
          },
          {
            id: "password-log",
            title: "Sensitive Log Leak",
            hint: "One line writes something that should never leave memory.",
            target: "password",
            fix: "Never log passwords or secrets.",
            lines: ["logger.info('login attempt', { email, password });", "return auth.login(email, password);"]
          },
          {
            id: "jwt-expiry",
            title: "JWT Expiry Bug",
            hint: "The token is decoded, but not actually verified.",
            target: "jwt.decode(token)",
            fix: "Use jwt.verify and validate expiry/signature.",
            lines: ["const claims = jwt.decode(token);", "return claims.role === 'admin';"]
          },
          {
            id: "cors-wide",
            title: "CORS Misconfiguration",
            hint: "This backend trusts every origin.",
            target: "'*'",
            fix: "Restrict CORS to known trusted origins.",
            lines: ["app.use(cors({ origin: '*' }));", "app.post('/admin', handler);"]
          },
          {
            id: "env-secret",
            title: "Environment Secret Bug",
            hint: "A fallback secret makes every deployment weaker.",
            target: "'dev-secret'",
            fix: "Fail startup when required secrets are missing.",
            lines: ["const secret = process.env.JWT_SECRET || 'dev-secret';", "signToken(payload, secret);"]
          }
        ]
      },
      {
        title: "Data Bugs",
        scenarios: [
          {
            id: "sql",
            title: "SQL Query Bug",
            hint: "String-built queries invite unsafe input.",
            target: "${userId}",
            fix: "Use parameterized queries.",
            lines: ["const q = `SELECT * FROM users WHERE id = ${userId}`;", "return db.query(q);"]
          },
          {
            id: "pagination",
            title: "Pagination Bug",
            hint: "Page two repeats page one.",
            target: "page * limit",
            fix: "Use (page - 1) * limit for the offset.",
            lines: ["const offset = page * limit;", "return db.posts.findMany({ skip: offset, take: limit });"]
          },
          {
            id: "transaction",
            title: "Transaction Bug",
            hint: "Money moves in two separate promises.",
            target: "await credit(to, amount)",
            fix: "Wrap debit and credit in one database transaction.",
            lines: ["await debit(from, amount);", "await credit(to, amount);"]
          },
          {
            id: "input-trust",
            title: "Input Validation Bug",
            hint: "The request body goes straight into persistence.",
            target: "req.body",
            fix: "Validate and sanitize the body before saving.",
            lines: ["await db.user.update({ data: req.body });", "return Response.json({ ok: true });"]
          },
          {
            id: "status-code",
            title: "HTTP Status Bug",
            hint: "The server says success even when auth fails.",
            target: "status: 200",
            fix: "Return 401 or 403 for authentication failures.",
            lines: ["if (!session) return Response.json({ error: 'login' }, { status: 200 });"]
          }
        ]
      },
      {
        title: "Reliability Bugs",
        scenarios: [
          {
            id: "cache-key",
            title: "Cache Key Collision",
            hint: "Two users can accidentally share the same cached response.",
            target: "`profile:${role}`",
            fix: "Include the user id in the cache key.",
            lines: ["const key = `profile:${role}`;", "cache.set(key, profile);"]
          },
          {
            id: "rate-limit",
            title: "Rate Limit Bypass",
            hint: "The limiter is keyed too broadly.",
            target: "req.path",
            fix: "Rate-limit by user id or IP plus route.",
            lines: ["const bucket = limiter.get(req.path);", "bucket.consume();"]
          },
          {
            id: "queue-ack",
            title: "Queue Acknowledgement Bug",
            hint: "The job is marked done before the work is safe.",
            target: "job.ack()",
            fix: "Acknowledge only after processing succeeds.",
            lines: ["job.ack();", "await sendReceipt(job.data);"]
          },
          {
            id: "n-plus-one",
            title: "N+1 Query Bug",
            hint: "A loop quietly turns one request into many database hits.",
            target: "await db.artist.findUnique",
            fix: "Batch or include related records in one query.",
            lines: ["for (const song of songs) {", "  song.artist = await db.artist.findUnique({ where: { id: song.artistId } });", "}"]
          },
          {
            id: "stale-cache",
            title: "Stale Cache Bug",
            hint: "The database changes, but the cache keeps lying.",
            target: "return updated",
            fix: "Invalidate or update the cache after mutation.",
            lines: ["const updated = await db.profile.update(data);", "return updated;"]
          }
        ]
      },
      {
        title: "Integration Bugs",
        scenarios: [
          {
            id: "id-check",
            title: "Authorization Boundary Bug",
            hint: "Authentication exists, but ownership is missing.",
            target: "req.user",
            fix: "Check that the requested resource belongs to the user.",
            lines: ["if (req.user) {", "  return db.invoice.findUnique({ where: { id } });", "}"]
          },
          {
            id: "webhook",
            title: "Webhook Verification Bug",
            hint: "The handler trusts the sender without checking the signature.",
            target: "JSON.parse(body)",
            fix: "Verify the webhook signature before parsing and processing.",
            lines: ["const event = JSON.parse(body);", "await processPayment(event);"]
          },
          {
            id: "double-submit",
            title: "Double Submit Bug",
            hint: "A fast second click can create the same order twice.",
            target: "createOrder(cart)",
            fix: "Use an idempotency key for order creation.",
            lines: ["const order = await createOrder(cart);", "return Response.json(order);"]
          },
          {
            id: "sort-param",
            title: "Unsafe Sort Parameter",
            hint: "The client controls a database field name directly.",
            target: "sortBy",
            fix: "Whitelist sortable fields before building the query.",
            lines: ["return db.posts.findMany({ orderBy: { [sortBy]: 'desc' } });"]
          },
          {
            id: "retry-storm",
            title: "Retry Storm Bug",
            hint: "Every failed request immediately creates more pressure on the same service.",
            target: "retry()",
            fix: "Add backoff and a retry limit before calling the external service again.",
            lines: ["catch (error) {", "  return retry();", "}"]
          }
        ]
      }
    ],
    []
  );
  const maxAttempts = 3;
  const [categories, setCategories] = useState(categoryBank);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [solved, setSolved] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState("You have 3 chances. Click the risky fragment, or reveal the bug if you are stuck.");
  const activeCategory = categories[categoryIndex];
  const scenarios = activeCategory.scenarios;
  const active = scenarios[scenarioIndex];
  const activeSolved = solved.includes(active.id);
  const activeRevealed = revealed.includes(active.id);
  const attemptsUsed = attempts[active.id] ?? 0;
  const chancesLeft = Math.max(0, maxAttempts - attemptsUsed);
  const canGuess = !activeSolved && !activeRevealed && chancesLeft > 0;
  const tutorialHighlight = categoryIndex === 0 && scenarioIndex === 0 && !activeSolved && !activeRevealed;
  const solvedInCategory = scenarios.filter((scenario) => solved.includes(scenario.id)).length;
  const allSolved = solvedInCategory === scenarios.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCategories(
        [...categoryBank]
          .map((category) => ({
            ...category,
            scenarios: [...category.scenarios].sort(() => Math.random() - 0.5).slice(0, 5)
          }))
          .sort(() => Math.random() - 0.5)
      );
      setCategoryIndex(0);
      setScenarioIndex(0);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [categoryBank]);

  useEffect(() => {
    if (allSolved) {
      unlock("bug-slayer");
      unlock("backend-builder");
    }
  }, [allSolved, unlock]);

  const mark = (correct: boolean) => {
    if (!canGuess) {
      setFeedback(activeSolved ? "Already fixed. Pick another bug scenario." : "No chances left. Use Show Bug to reveal the answer.");
      return;
    }
    if (!correct) {
      const nextAttempts = attemptsUsed + 1;
      setAttempts((current) => ({ ...current, [active.id]: nextAttempts }));
      const nextLeft = Math.max(0, maxAttempts - nextAttempts);
      setFeedback(
        nextLeft
          ? `False alarm. ${nextLeft} ${nextLeft === 1 ? "chance" : "chances"} left for this bug.`
          : "No chances left for this scenario. Use Show Bug to reveal the answer."
      );
      return;
    }
    setSolved((current) => (current.includes(active.id) ? current : [...current, active.id]));
    setFeedback(`Correct. ${active.fix} Trophy progress updated.`);
  };

  const showBug = () => {
    setRevealed((current) => (current.includes(active.id) ? current : [...current, active.id]));
    setFeedback(`Bug revealed: ${active.target}. Fix: ${active.fix}`);
  };

  const resetScenario = () => {
    setRevealed((current) => current.filter((id) => id !== active.id));
    setAttempts((current) => ({ ...current, [active.id]: 0 }));
    setFeedback("Scenario reset. You have 3 chances again.");
  };

  const selectCategory = (index: number) => {
    setCategoryIndex(index);
    setScenarioIndex(0);
    setFeedback("New backend category loaded. You only see up to 5 bugs in this round.");
  };

  return (
    <motion.div className="game-panel bug-game" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Mini Game 2</p>
        <h3>Bug Hunt</h3>
        <p>{activeCategory.title}: {active.title}. Click the risky fragment. Hint: {active.hint}</p>
        <strong className="insight-line">
          {allSolved ? "Category clean. Move to the next backend category." : `${solvedInCategory}/${scenarios.length} bugs fixed in this category. ${feedback}`}
        </strong>
        <div className="bug-category-row" aria-label="Bug categories">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category.title}
              className={clsx(index === categoryIndex && "active")}
              onClick={() => selectCategory(index)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="bug-status" aria-label="Bug hunt status">
          <span className={clsx(chancesLeft === 1 && "warning", chancesLeft === 0 && !activeSolved && "danger")}>
            Chances left: {activeSolved ? "Fixed" : activeRevealed ? "Revealed" : `${chancesLeft}/${maxAttempts}`}
          </span>
          <span>Round {scenarioIndex + 1} of {scenarios.length}</span>
        </div>
        <div className="bug-actions">
          <button type="button" onClick={showBug} disabled={activeSolved || activeRevealed}>
            <Eye size={15} />
            Show Bug
          </button>
          <button type="button" onClick={resetScenario}>
            <RotateCcw size={15} />
            Reset Scenario
          </button>
          <button type="button" onClick={() => selectCategory((categoryIndex + 1) % categories.length)}>
            <ChevronRight size={15} />
            Next Category
          </button>
        </div>
        <div className="game-progress">
          <span>Category progress</span>
          <span>{Math.round((solvedInCategory / scenarios.length) * 100)}%</span>
          <div>
            <i style={{ width: `${(solvedInCategory / scenarios.length) * 100}%` }} />
          </div>
        </div>
      </div>
      <pre className={clsx("code-board", activeSolved && "success", activeRevealed && "revealed")} aria-label="Bug hunt code snippet">
        <code>
          {active.lines.map((line) => (
            <span key={line}>
              {line.includes(active.target) ? (
                <>
                  {line.split(active.target)[0]}
                  <button
                    type="button"
                    onClick={() => mark(true)}
                    disabled={!canGuess}
                    className={clsx(
                      "bug-target",
                      tutorialHighlight && "tutorial",
                      (activeSolved || activeRevealed) && "found",
                      activeRevealed && "revealed"
                    )}
                    aria-label={`Bug target: ${active.target}`}
                  >
                    {active.target}
                  </button>
                  {line.split(active.target)[1]}
                </>
              ) : (
                <button type="button" className="plain-code" disabled={!canGuess} onClick={() => mark(false)}>
                  {line}
                </button>
              )}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <div className="fix-list">
        {scenarios.map((scenario, index) => (
          <button
            type="button"
            key={scenario.id}
            className={clsx(solved.includes(scenario.id) && "done", scenarioIndex === index && "active")}
            onClick={() => {
              setScenarioIndex(index);
              setFeedback("You have 3 chances. Click the risky fragment, or reveal the bug if you are stuck.");
            }}
          >
            {solved.includes(scenario.id) ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            {scenario.title}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function SystemPuzzle({ unlock }: { unlock: (id: AchievementId) => void }) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [formation, setFormation] = useState<string[]>([]);
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const activePuzzle = systemPuzzles[puzzleIndex];
  const solved = formation.length === activePuzzle.correct.length && formation.every((item, index) => item === activePuzzle.correct[index]);
  const remaining = activePuzzle.correct.filter((item) => !formation.includes(item));

  useEffect(() => {
    if (result === "correct") {
      unlock("architect");
      unlock("backend-builder");
    }
  }, [result, unlock]);

  const submit = () => {
    if (solved) {
      setResult("correct");
      setScore((value) => value + 50);
    } else {
      setResult("wrong");
    }
  };

  return (
    <motion.div className={clsx("game-panel system-game", result)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
      <div className="game-copy">
        <p className="eyebrow">Mini Game 3</p>
        <h3>System Design Puzzle</h3>
        <p>{activePuzzle.title}. Arrange the architecture like a build-up play: {activePuzzle.clue}</p>
        <strong className="insight-line">
          {result === "correct"
            ? "Formation locked. Backend thinking is sequencing plus tradeoffs."
            : result === "wrong"
              ? "Wrong formation. Reset the shape and try again."
              : "Submit when the formation feels right."}
        </strong>
        <div className="puzzle-switcher" aria-label="System puzzle selector">
          {systemPuzzles.map((puzzle, index) => (
            <button
              type="button"
              key={puzzle.title}
              className={clsx(index === puzzleIndex && "active")}
              onClick={() => {
                setPuzzleIndex(index);
                setFormation([]);
                setResult("idle");
              }}
            >
              {puzzle.title}
            </button>
          ))}
        </div>
        <div className="system-score-box">
          <span className="score-chip">System score {score}</span>
          <div className="system-actions">
            <button type="button" onClick={submit}>
              Submit formation
            </button>
            <button
              type="button"
              onClick={() => {
                setFormation([]);
                setResult("idle");
              }}
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="formation-board">
        {activePuzzle.correct.map((_, index) => (
          <button
            type="button"
            className="formation-slot"
            key={index}
            onClick={() => {
              setFormation((current) => current.slice(0, index));
              setResult("idle");
            }}
          >
            <span>{index + 1}</span>
            <strong>{formation[index] ?? "Open role"}</strong>
          </button>
        ))}
      </div>
      <div className="bench-row">
        {remaining.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => {
              setFormation((current) => [...current, item]);
              setResult("idle");
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function SecondHalf({
  unlock,
  setDiscovery,
  openModal
}: {
  unlock: (id: AchievementId) => void;
  setDiscovery: (discovery: Discovery) => void;
  openModal: (modal: ModalId) => void;
}) {
  return (
    <section id="second-half" className="phase second-half">
      <div className="phase-kicker">
        <span>Phase 3</span>
        <strong>Second Half</strong>
      </div>
      <div className="halftime-header">
        <h2>Projects become worlds.</h2>
        <p>
          No static cards. Each build gets a room, a formation, a toy, and a reason
          to keep touching the interface.
        </p>
      </div>
      <ListeningRoom unlock={unlock} openModal={openModal} />
      <ControlRoom unlock={unlock} openModal={openModal} />
      <ReserveVault unlock={unlock} setDiscovery={setDiscovery} openModal={openModal} />
    </section>
  );
}

function ListeningRoom({
  unlock,
  openModal
}: {
  unlock: (id: AchievementId) => void;
  openModal: (modal: ModalId) => void;
}) {
  const [active, setActive] = useState(listeningNodes[0]);
  return (
    <article className="world listening-room">
      <div className="world-copy">
        <p className="eyebrow">Project 1</p>
        <h3>The Listening Room</h3>
        <p>
          HipHopHub is treated like a record store after midnight: the point is not
          only to search, but to follow relationships until discovery feels earned.
        </p>
        <ProjectBrief brief={projectBriefs.hiphophub} />
        <button
          className="artifact-button"
          type="button"
          onClick={() => {
            unlock("music");
            openModal("builder-notes");
          }}
        >
          <Headphones size={18} />
          Unlock the HipHopHub liner note
        </button>
        <a
          className="artifact-button"
          href={portfolioLinks.hiphophub}
          target="_blank"
          rel="noreferrer"
          onClick={() => unlock("hiphophub-open")}
        >
          <ExternalLink size={18} />
          Open HipHopHub
        </a>
      </div>
      <div className="listening-stage">
        <div className="vinyl">
          <div className="vinyl-label">
            <Music2 size={20} />
            <span>HIPHOPHUB</span>
          </div>
        </div>
        <div className="waveform" aria-hidden="true">
          {Array.from({ length: 34 }).map((_, index) => (
            <i key={index} style={{ height: `${24 + ((index * 17) % 58)}%` }} />
          ))}
        </div>
        <div className="network-map">
          {listeningNodes.map((node) => (
            <button
              type="button"
              key={node.id}
              className={clsx("music-node", active.id === node.id && "active")}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActive(node)}
            >
              {node.title}
            </button>
          ))}
          <i className="music-line l1" />
          <i className="music-line l2" />
          <i className="music-line l3" />
        </div>
        <aside className="node-caption">
          <strong>{active.title}</strong>
          <p>{active.detail}</p>
        </aside>
      </div>
    </article>
  );
}

function ProjectBrief({
  brief
}: {
  brief: {
    name: string;
    purpose: string;
    stack: string;
    features: string;
    live: string;
  };
}) {
  return (
    <dl className="project-brief" aria-label={`${brief.name} project summary`}>
      <div>
        <dt>Project Name</dt>
        <dd>{brief.name}</dd>
      </div>
      <div>
        <dt>Purpose</dt>
        <dd>{brief.purpose}</dd>
      </div>
      <div>
        <dt>Tech Stack</dt>
        <dd>{brief.stack}</dd>
      </div>
      <div>
        <dt>Key Features</dt>
        <dd>{brief.features}</dd>
      </div>
      <div>
        <dt>Live Link</dt>
        <dd>
          {brief.live.startsWith("https://") ? (
            <a href={brief.live} target="_blank" rel="noreferrer">
              Open live project
            </a>
          ) : (
            brief.live
          )}
        </dd>
      </div>
    </dl>
  );
}

function ControlRoom({
  unlock,
  openModal
}: {
  unlock: (id: AchievementId) => void;
  openModal: (modal: ModalId) => void;
}) {
  const [active, setActive] = useState(controlLayers[0]);
  const ActiveIcon = active.icon;

  return (
    <article className="world control-room">
      <div className="world-copy">
        <p className="eyebrow">Project 2</p>
        <h3>The Control Room</h3>
        <p>
          Janadesh turns voting infrastructure into a room of switches, checks, and
          audit trails. Click every layer to inspect how trust moves.
        </p>
        <ProjectBrief brief={projectBriefs.janadesh} />
        <button
          className="artifact-button"
          type="button"
          onClick={() => {
            unlock("control-room");
            unlock("operator");
            openModal("operator-log");
          }}
        >
          <Radio size={18} />
          Open Janadesh operator log
        </button>
      </div>
      <div className="control-console">
        <div className="console-readout">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              className="console-readout-inner"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <ActiveIcon size={32} />
              <strong>{active.title}</strong>
              <p>{active.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="architecture-formation">
          {controlLayers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <button
                type="button"
                key={layer.title}
                className={clsx(active.title === layer.title && "active")}
                onClick={() => {
                  setActive(layer);
                  unlock("control-room");
                  unlock("janadesh-architecture");
                }}
                style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <Icon size={18} />
                <span>{layer.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function ReserveVault({
  unlock,
  setDiscovery,
  openModal
}: {
  unlock: (id: AchievementId) => void;
  setDiscovery: (discovery: Discovery) => void;
  openModal: (modal: ModalId) => void;
}) {
  const [supply, setSupply] = useState(100000);
  const [reserve, setReserve] = useState(62);
  const [burned, setBurned] = useState(0);
  const [pulse, setPulse] = useState<"mint" | "burn" | "reserve" | null>(null);
  const minted = Math.max(0, supply - 100000);
  const inflationRisk = Math.min(100, Math.max(8, minted / 1800 + (70 - reserve)));
  const stability = Math.max(0, Math.min(100, reserve - inflationRisk / 3 + burned / 2500));
  const confidence = Math.max(0, Math.min(100, stability * 0.72 + reserve * 0.28));
  const tokenHealth = Math.round((stability + (100 - inflationRisk) + reserve + confidence) / 4);

  const feedback = (kind: "mint" | "burn" | "reserve") => {
    setPulse(kind);
    window.setTimeout(() => setPulse(null), 700);
  };

  useEffect(() => {
    if (confidence > 72) {
      unlock("vault");
    }
  }, [confidence, unlock]);

  return (
    <article className="world reserve-vault">
      <div className="world-copy">
        <p className="eyebrow">Project 3</p>
        <h3>The Reserve Vault</h3>
        <p>
          SWAT Coin becomes a live token mechanics simulator. Minting, burning, and
          reserve policy visibly change stability, inflation risk, reserve health,
          and market confidence.
        </p>
        <ProjectBrief brief={projectBriefs.swat} />
        <button
          className="artifact-button"
          type="button"
          onClick={() => {
            unlock("vault");
            unlock("swat-risk-reader");
            setDiscovery(discoveries.find((item) => item.key === "swat")!);
            openModal("swat-risk");
          }}
        >
          <Flame size={18} />
          Read the SWAT Coin risk note
        </button>
      </div>
      <div className={clsx("vault-sim", pulse && `pulse-${pulse}`)}>
        <ReserveThree stability={stability} confidence={confidence} />
        <div className="vault-controls">
          <div className="vault-stat">
            <span>Supply</span>
            <strong>{formatWholeNumber(supply)} SWAT</strong>
          </div>
          <div className="vault-health">
            <span>Token health</span>
            <strong>{tokenHealth}%</strong>
            <div className="stability-core" style={{ "--health": `${tokenHealth}%` } as React.CSSProperties}>
              <i />
            </div>
          </div>
          <div className="control-cluster">
            <button
              type="button"
              onClick={() => {
                setSupply((value) => value + 5000);
                feedback("mint");
              }}
            >
              Mint 5,000
            </button>
            <button
              type="button"
              onClick={() => {
                setSupply((value) => Math.max(50000, value - 4000));
                setBurned((value) => value + 4000);
                feedback("burn");
              }}
            >
              Burn 4,000
            </button>
            <button
              type="button"
              onClick={() => {
                setReserve((value) => Math.min(95, value + 5));
                feedback("reserve");
              }}
            >
              Increase Reserve
            </button>
            <button
              type="button"
              onClick={() => {
                setReserve((value) => Math.max(30, value - 5));
                feedback("reserve");
              }}
            >
              Decrease Reserve
            </button>
          </div>
          <label className="slider-label">
            <span>Reserve ratio: {reserve}%</span>
            <input
              type="range"
              min="30"
              max="95"
              value={reserve}
              onChange={(event) => {
                setReserve(Number(event.target.value));
                feedback("reserve");
              }}
            />
          </label>
          <div className="reserve-dashboard" aria-label="Interactive reserve dashboard">
            {[reserve, supply / 1600, stability, 100 - inflationRisk, confidence].map((value, index) => (
              <i key={index} style={{ height: `${Math.max(12, Math.min(100, value))}%` }} />
            ))}
          </div>
          <Metric label="Reserve Ratio" value={reserve} />
          <Metric label="Supply Pressure" value={Math.min(100, supply / 1600)} invert />
          <Metric label="Stability" value={stability} />
          <Metric label="Inflation risk" value={inflationRisk} invert />
          <Metric label="Reserve health" value={reserve} />
          <Metric label="Market confidence" value={confidence} />
        </div>
      </div>
    </article>
  );
}

function ReserveThree({ stability, confidence }: { stability: number; confidence: number }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const stabilityRef = useRef(stability);
  const confidenceRef = useRef(confidence);
  const visibleRef = useRef(true);

  useEffect(() => {
    stabilityRef.current = stability;
    confidenceRef.current = confidence;
  }, [stability, confidence]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("three").then((THREE) => {
      if (cancelled || !mount.isConnected) {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.1));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.TorusKnotGeometry(1, 0.26, 64, 10);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C59A4A"),
        metalness: 0.82,
        roughness: 0.26,
        emissive: new THREE.Color("#153D30"),
        emissiveIntensity: 0.28
      });
      const coin = new THREE.Mesh(geometry, material);
      group.add(coin);

      const ringGeometry = new THREE.TorusGeometry(1.72, 0.018, 10, 72);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: "#F5F1E8", transparent: true, opacity: 0.25 });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      group.add(ring);

      const key = new THREE.PointLight("#F5F1E8", 2.2, 10);
      key.position.set(2.4, 2.2, 3);
      scene.add(key);
      const fill = new THREE.PointLight("#5B1720", 1.1, 10);
      fill.position.set(-2.5, -1.5, 2);
      scene.add(fill);

      let frame = 0;
      let resizeFrame = 0;

      const renderFrame = () => {
        if (!visibleRef.current) {
          renderer.render(scene, camera);
          return;
        }
        const liveStability = stabilityRef.current;
        const liveConfidence = confidenceRef.current;
        coin.rotation.x += 0.004 + liveStability / 22000;
        coin.rotation.y += 0.007 + liveConfidence / 21000;
        ring.rotation.z -= 0.004;
        material.emissiveIntensity += (0.16 + liveConfidence / 260 - material.emissiveIntensity) * 0.06;
        renderer.render(scene, camera);
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (visibleRef.current) {
          renderFrame();
        }
      };
      animate();

      const resize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          if (!mount.clientWidth || !mount.clientHeight) {
            return;
          }
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
          renderer.render(scene, camera);
        });
      };
      window.addEventListener("resize", resize, { passive: true });

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            renderFrame();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(frame);
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", resize);
        observer.disconnect();
        geometry.dispose();
        material.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div className="reserve-canvas" ref={mountRef} aria-label="Animated SWAT Coin reserve simulation" />;
}

function Metric({ label, value, invert = false }: { label: string; value: number; invert?: boolean }) {
  const shown = Math.round(value);
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{shown}%</strong>
      <div>
        <i style={{ width: `${shown}%` }} className={invert ? "risk" : ""} />
      </div>
    </div>
  );
}

function SecretDiscoveries({
  found,
  onSelect
}: {
  found: Discovery | null;
  onSelect: (discovery: Discovery) => void;
}) {
  const [archiveRevealed, setArchiveRevealed] = useState(false);
  const visible = useMemo(
    () =>
      archiveRevealed
        ? discoveries
        : discoveries.filter((item) =>
            ["football", "music", "builder", "dream", "system", "curiosity", "community"].includes(item.key)
          ),
    [archiveRevealed]
  );

  return (
    <section className="phase secret-phase" aria-label="Secret discoveries">
      <div className="phase-kicker">
        <span>Phase 4</span>
        <strong>Secret Discoveries</strong>
      </div>
      <div className="secret-grid">
        <div>
          <h2>The site listens for hidden chants.</h2>
          <p>
            Type words anywhere: football, music, hiphop, backend, java, solidity,
            dream, late-night, builder, system, open-source, extra-time, curiosity,
            engineer, stadium, season, vinyl, algorithm, blockchain, community.
          </p>
          <div className="hidden-object-row">
            {visible.map((item) => (
              <button type="button" key={item.key} onClick={() => onSelect(item)}>
                <Eye size={16} />
                {item.key}
              </button>
            ))}
            <button type="button" onClick={() => setArchiveRevealed((value) => !value)}>
              <Sparkles size={16} />
              {archiveRevealed ? "Hide Archive" : "Reveal Archive"}
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.aside
            key={found?.key ?? "empty"}
            className="discovery-card"
            initial={{ opacity: 0, rotate: -1.5, y: 20 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, rotate: 1.5, y: -20 }}
          >
            {found ? (
              <>
                <Sparkles size={24} />
                <span>Hidden discovery</span>
                <h3>{found.title}</h3>
                <p>{found.body}</p>
              </>
            ) : (
              <>
                <Sparkles size={24} />
                <span>Waiting for a chant</span>
                <h3>Try typing one of the secret words.</h3>
                <p>The page will react without a search box. The hidden layer is part of the match.</p>
              </>
            )}
          </motion.aside>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ModalLayer({
  activeModal,
  onClose,
  trophyIds
}: {
  activeModal: ModalId;
  onClose: () => void;
  trophyIds: AchievementId[];
}) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const trophyEntries = Object.entries(achievements) as Array<[AchievementId, (typeof achievements)[AchievementId]]>;
  const collected = trophyIds.length;
  const total = trophyEntries.length;
  const percent = Math.round((collected / total) * 100);

  return (
    <AnimatePresence>
      {activeModal ? (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio modal"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>

            {activeModal === "trophy" ? (
              <>
                <p className="eyebrow">Trophy Room</p>
                <h2>Trophy Room</h2>
                <p className="trophy-progress-line">
                  {collected} / {total} trophies unlocked
                </p>
                <div className="trophy-summary">
                  <span>Total trophies: {total}</span>
                  <span>Earned: {collected}</span>
                  <span>Locked: {Math.max(0, total - collected)}</span>
                  <strong>{percent}% complete</strong>
                  <div>
                    <i style={{ width: `${percent}%` }} />
                  </div>
                </div>
                <div className="trophy-grid">
                  {trophyEntries.map(([id, trophy]) => {
                    const unlocked = trophyIds.includes(id);
                    return (
                      <article key={id} className={clsx(unlocked && "unlocked")}>
                        {unlocked ? <Trophy size={18} /> : <LockKeyhole size={18} />}
                        <h3>{trophy.title}</h3>
                        <p>{trophy.detail}</p>
                        <strong>Status: {unlocked ? "Unlocked" : "Locked"}</strong>
                        <span>How to unlock: {trophy.requirement}</span>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : null}

            {activeModal === "scout-report" ? (
              <>
                <p className="eyebrow">Scout Report</p>
                <h2>Recruiter Quick View</h2>
                <div className="scout-report">
                  <article>
                    <span>Name</span>
                    <strong>{profileSummary.name}</strong>
                  </article>
                  <article>
                    <span>Email</span>
                    <a href={`mailto:${portfolioLinks.email}`}>{portfolioLinks.email}</a>
                  </article>
                  <article>
                    <span>LinkedIn</span>
                    <a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer">
                      Open profile
                    </a>
                  </article>
                  <article>
                    <span>GitHub</span>
                    <a href={portfolioLinks.github} target="_blank" rel="noreferrer">
                      View code
                    </a>
                  </article>
                  <article className="wide">
                    <span>Education</span>
                    <p>{profileSummary.education}</p>
                  </article>
                  <article className="wide">
                    <span>Core Skills</span>
                    <p>{profileSummary.coreSkills.join(" / ")}</p>
                  </article>
                  <article className="wide">
                    <span>Projects</span>
                    <p>{profileSummary.projects.join(" / ")}</p>
                  </article>
                  <article className="wide">
                    <span>Tech Stack</span>
                    <p>{coreLineup.join(" / ")}</p>
                  </article>
                </div>
              </>
            ) : null}

            {activeModal === "swat-risk" ? (
              <>
                <p className="eyebrow">Reserve Vault</p>
                <h2>SWAT Coin Risk Analysis</h2>
                <p>
                  This project explores stablecoin mechanics as an educational blockchain
                  engineering study.
                </p>
                <div className="modal-list">
                  <span>Reserve-backed stability</span>
                  <span>Inflation pressure</span>
                  <span>Supply management</span>
                  <span>Smart-contract constraints</span>
                  <span>Gas optimization</span>
                  <span>Token economics</span>
                </div>
                <div className="modal-warning">
                  <Flame size={18} />
                  <p>
                    Important: This is not a real financial product. It exists purely
                    as a systems-design and blockchain-learning experiment.
                  </p>
                </div>
              </>
            ) : null}

            {activeModal === "builder-notes" ? (
              <>
                <p className="eyebrow">Listening Room</p>
                <h2>HipHopHub Liner Notes</h2>
                <div className="note-stack">
                  <article>
                    <h3>1. Why HipHopHub Exists</h3>
                    <p>HipHopHub began as a way to make music discovery feel less like a search bar and more like entering a scene, following artists, tracks, and influence until the culture starts to map itself.</p>
                  </article>
                  <article>
                    <h3>2. Underground Discovery</h3>
                    <p>The project is built around the feeling of finding an artist before they are everywhere. Discovery should reward curiosity, not only popularity.</p>
                  </article>
                  <article>
                    <h3>3. Artist Relationship Mapping</h3>
                    <p>Artists are not isolated cards. They belong to collaborations, eras, sounds, communities, and scenes, so HipHopHub treats relationships as part of the product.</p>
                  </article>
                  <article>
                    <h3>4. Release Tracking Philosophy</h3>
                    <p>New drops matter because they change momentum. The interface was shaped around helping listeners notice movement: singles, albums, features, and the trail around them.</p>
                  </article>
                  <article>
                    <h3>5. Culture-First Product Decisions</h3>
                    <p>The goal was not to build another music database. It was to build a listening room where recommendations, graph links, and community signals help people feel the world behind the songs.</p>
                  </article>
                </div>
              </>
            ) : null}

            {activeModal === "operator-log" ? (
              <>
                <p className="eyebrow">Control Room</p>
                <h2>Janadesh Operator Log</h2>
                <div className="operator-log">
                  {[
                    "Voting requirements gathered and institutional constraints documented.",
                    "Voter identity workflow mapped for controlled election access.",
                    "Authentication layer introduced to separate eligible voters from administrative operators.",
                    "OTP verification integrated to reduce impersonation and replay vectors.",
                    "Election engine architecture finalized with deterministic ballot processing rules.",
                    "Candidate management lifecycle completed across nomination, approval, activation, and closure.",
                    "Administrative controls secured with restricted election setup and result-management actions.",
                    "Audit-trail system connected to record sensitive election events and operator activity.",
                    "Blockchain verification layer integrated for tamper-evident vote integrity checkpoints.",
                    "Vote validation testing completed across duplicate ballot, mutation, and eligibility paths.",
                    "System ready for deployment. Janadesh entered secure election operations mode."
                  ].map((line, index) => (
                    <article key={line}>
                      <Terminal size={16} />
                      <span>[LOG {(index + 1).toString().padStart(2, "0")}]</span>
                      <p>{line}</p>
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FullTime({
  earned,
  notify,
  unlock
}: {
  earned: { title: string; detail: string }[];
  notify: (title: string, label?: string) => void;
  unlock: (id: AchievementId) => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stats = [
    ["Ideas Built", "Always counting"],
    ["Projects Completed", "HipHopHub, Janadesh, SWAT Coin"],
    ["Technologies Learned", "Java, DSA, Blockchain, APIs, Web3"],
    ["Open Source Contributions", "Hacktoberfest and beyond"],
    ["Hours Practiced", "100 Days plus late nights"],
    ["Curiosity Level", "Still rising"]
  ];
  const mailBody = encodeURIComponent(
    "Hi Aayush,\n\nI explored your portfolio and would love to connect regarding opportunities and collaboration.\n\nBest Regards"
  );
  const introMessage = "Hi Aayush,\n\nI explored your portfolio and would love to connect and discuss opportunities.";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          unlock("contact-reached");
          observer.disconnect();
        }
      },
      { threshold: 0.42 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [unlock]);

  return (
    <section id="full-time" className="phase full-time" ref={sectionRef}>
      <div className="full-scoreboard">
        <div className="broadcast-strip">
          <span>Full Time</span>
          <span>Season continues</span>
        </div>
        <h2>WANT TO BUILD THE NEXT SEASON TOGETHER?</h2>
        <div className="final-stats">
          {stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="earned-strip">
          {earned.length ? (
            earned.map((item) => (
              <span key={item.title}>
                <BadgeCheck size={15} />
                {item.title}
              </span>
            ))
          ) : (
            <span>
              <Trophy size={15} />
              Achievements unlock as you explore
            </span>
          )}
        </div>
        <div className="contact-actions">
          <a
            href={`mailto:${portfolioLinks.email}?subject=${encodeURIComponent("Match Invitation")}&body=${mailBody}`}
            data-tooltip="Open email client"
          >
            <Mail size={18} />
            Send match invite
          </a>
          <a href={portfolioLinks.github} target="_blank" rel="noreferrer" data-tooltip="Enter the code tunnel">
            <Code2 size={18} />
            Visit code tunnel
          </a>
          <a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer" data-tooltip="Open LinkedIn profile">
            <ExternalLink size={18} />
            LinkedIn
          </a>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(introMessage).catch(() => undefined);
              notify("Introduction copied successfully.", "Copied");
            }}
            data-tooltip="Copy intro message"
          >
            <ClipboardCheck size={18} />
            Copy Intro Message
          </button>
        </div>
        <p className="copy-helper">Copies a ready-to-send introduction message.</p>
      </div>
      <footer className="site-footer">
        <span>EXTRA TIME</span>
        <span>Built as a match, a mixtape, and a memory.</span>
      </footer>
    </section>
  );
}
