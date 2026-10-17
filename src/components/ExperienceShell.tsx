"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import FlowField from "./FlowField";

type View = "landing" | "player" | "work" | "play" | "contact";
type Entry = { path: string; url: string; label: string; phase: string; started: number };
const Context = createContext<{ view: View; setView: (v: View) => void; navigate: (url: string) => void }>({ view: "landing", setView: () => {}, navigate: () => {} });
export const useExperience = () => useContext(Context);

function destination(url: string) {
  if (url === "/") return {label:"The opening",phase:"BACK TO KICKOFF"};
  const hash = url.split("#")[1];
  if (["second-half","hiphophub","waymark","pact"].includes(hash)) return {label:hash === "waymark" ? "Waymark" : hash === "pact" ? "Pact" : hash === "hiphophub" ? "HipHopHub" : "Selected work",phase:"SECOND HALF / THE BUILDS"};
  if (hash === "halftime") return {label:"The halftime break",phase:"READ. DEBUG. BUILD."};
  if (hash === "full-time") return {label:"The next conversation",phase:"FULL TIME / CONTACT"};
  return {label:"Meet the engineer",phase:"FIRST HALF / THE STORY"};
}

export default function ExperienceShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [view, setView] = useState<View>(path === "/" ? "landing" : "player");
  const [entry, setEntry] = useState<Entry|null>(null);
  const [slow, setSlow] = useState(false);
  const inFlight = useRef(false);
  const focusTarget = useRef<HTMLDivElement>(null);

  const finish = useCallback(()=>{inFlight.current=false;setEntry(null);setSlow(false);},[]);
  const navigate = useCallback((url: string) => {
    if(inFlight.current) return;
    const target = url.split("#")[0];
    if(target === path){router.push(url);return;}
    inFlight.current=true;
    setEntry({path:target,url,...destination(url),started:performance.now()});
    setSlow(false);
    // Begin loading immediately. The panel stays until the destination commits.
    router.push(url);
  },[path,router]);

  useEffect(()=>{
    if(!entry)return;
    const timer=setTimeout(()=>setSlow(true),7000);
    return()=>clearTimeout(timer);
  },[entry]);
  useEffect(()=>{
    if(!entry || path!==entry.path)return;
    // A short readable beat, with no artificial delay before navigation starts.
    const remaining=Math.max(0,(reduced?0:520)-(performance.now()-entry.started));
    const timer=setTimeout(()=>{finish();requestAnimationFrame(()=>{
      const title=document.querySelector<HTMLElement>("main h1");
      if(title){title.setAttribute("tabindex","-1");title.focus({preventScroll:true});}
    });},remaining+80);
    return()=>clearTimeout(timer);
  },[path,entry,reduced,finish]);
  useEffect(()=>{if(entry)focusTarget.current?.focus({preventScroll:true});},[entry]);
  const moving=!!entry;
  return <Context.Provider value={{view,setView,navigate}}><MotionConfig reducedMotion="user">
    <div className={`experience-root ${moving ? "is-navigating" : ""}`} data-view={view}>
      <FlowField view={view} transitioning={moving}/><div className="scene-shade" aria-hidden="true"/><div className="scene-grain" aria-hidden="true"/>
      <motion.div key={path} className="route-content" inert={moving} aria-busy={moving} initial={{opacity:0,y:reduced?0:10}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.28}}>{children}</motion.div>
      <AnimatePresence>{entry&&<motion.div className="match-entry" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.22}}>
        <div className="entry-curtain" aria-hidden="true"/><div className="entry-window" ref={focusTarget} tabIndex={-1} role="status" aria-live="polite" aria-label={`Opening ${entry.label}`}>
          <div className="entry-ticket-top"><span>EXTRA TIME</span><span>ADMIT ONE / AAYUSH TIWARI</span></div>
          <div className="entry-ticket-body"><span className="entry-added-time" aria-hidden="true">+01<span>ONE MORE PLAY</span></span><div><p>{entry.phase}</p><h2>{entry.label}</h2><span className="entry-status">{slow?"Still loading the next page…":"Taking the field"}<i aria-hidden="true"/></span></div></div>
          <div className="entry-track" aria-hidden="true"><i/></div><div className="entry-ticket-bottom"><span>CODE · CULTURE · MATCHDAY</span><span>{slow?"THANK YOU FOR YOUR PATIENCE":"THE NEXT PLAY STARTS HERE"}</span></div>
          {slow&&<div className="entry-recovery"><a href={entry.url}>Open page directly ↗</a><button onClick={finish}>Dismiss</button></div>}
        </div>
      </motion.div>}</AnimatePresence>
    </div>
  </MotionConfig></Context.Provider>;
}
