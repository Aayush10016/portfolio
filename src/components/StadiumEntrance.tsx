"use client";

import { ChevronRight, Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function StadiumEntrance() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const [activeWord, setActiveWord] = useState(-1);
  const [showTrophyToast, setShowTrophyToast] = useState(false);
  const timers = useRef<number[]>([]);
  const sequence = ["JAVA", "SPRING BOOT", "SYSTEM DESIGN", "HIPHOPHUB", "JANADESH", "SWAT COIN", "OPEN SOURCE"];
  const trophyStorageKey = "extra-time-trophies";

  const awardEntryTrophy = () => {
    const entryTrophy = "stadium-entry";
    try {
      const stored = window.localStorage.getItem(trophyStorageKey);
      const trophies = stored ? (JSON.parse(stored) as string[]) : [];
      if (!trophies.includes(entryTrophy)) {
        window.localStorage.setItem(trophyStorageKey, JSON.stringify([...trophies, entryTrophy]));
      }
    } catch {
      // The entrance should continue even if localStorage is unavailable.
    }
    setShowTrophyToast(true);
  };

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const enterArena = () => {
    if (transitioning) {
      return;
    }
    awardEntryTrophy();
    setTransitioning(true);
    timers.current.push(
      window.setTimeout(() => setActiveWord(0), 950),
      ...sequence.slice(1).map((_, index) =>
        window.setTimeout(() => setActiveWord(index + 1), 950 + (index + 1) * 620)
      ),
      window.setTimeout(() => router.push("/arena"), 950 + sequence.length * 620 + 260)
    );
  };

  return (
    <main className="stadium-entrance-page" aria-label="Aayush Tiwari Arena entrance">
      <Image
        src="/stadium-exterior-board.png"
        alt="A football stadium exterior at night"
        fill
        priority
        sizes="100vw"
        className="stadium-entrance-image"
      />
      <div className="entrance-atmosphere" aria-hidden="true" />
      <section className="entrance-signage">
        <p>Build Season</p>
        <h1>AAYUSH TIWARI ARENA</h1>
      </section>
      <button className="stadium-entry-cta" type="button" onClick={enterArena}>
        ENTER THE STADIUM
        <ChevronRight size={21} />
      </button>
      {showTrophyToast ? (
        <div className="entrance-trophy-toast" role="status" aria-live="polite">
          <Trophy size={17} />
          <span>Trophy Unlocked</span>
          <strong>First Match Attended</strong>
        </div>
      ) : null}
      <div className={transitioning ? "stadium-transition-overlay active" : "stadium-transition-overlay"} aria-hidden={!transitioning}>
        {activeWord >= 0 ? <span className="transition-word" key={sequence[activeWord]}>{sequence[activeWord]}</span> : null}
      </div>
    </main>
  );
}
