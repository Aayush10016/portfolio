"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const plays = [
  { label: "Build from the back", title: "A dependable foundation.", body: "On the pitch, the next move starts with a solid shape. In my work, it starts with Java, data models, and APIs I can test and reason about.", proof: "Accumet / Java + PostgreSQL / 300+ meters", cta: "See my backend work", project: "hiphophub", path: "M100 218 L100 160 L175 112 L140 48", nodes: [[100,218],[100,160],[175,112],[140,48]] },
  { label: "Read the game", title: "Know the boundaries.", body: "Good decisions need context. Waymark brings project memory and deterministic rules into AI-assisted development, with explicit approval before changes are applied.", proof: "Waymark / Project context + guarded changes", cta: "Explore Waymark", project: "waymark", path: "M60 218 L60 150 L140 110 L220 150 L220 48", nodes: [[60,218],[60,150],[140,110],[220,150],[220,48]] },
  { label: "Create the opening", title: "Make room for discovery.", body: "Structure leaves room to experiment. HipHopHub connects music discovery with quizzes, games, and community features—backed by authenticated APIs.", proof: "HipHopHub / Music discovery / 61 endpoints", cta: "Explore HipHopHub", project: "hiphophub", path: "M210 218 L210 160 L80 110 L140 48", nodes: [[210,218],[210,160],[80,110],[140,48]] }
];

export default function TacticsBoard({ onProject }: { onProject: (project: string) => void }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const play = plays[selected];
  return <section className="tactics-board" aria-labelledby="tactics-title">
    <div className="tactics-heading"><p>THE TACTICS BOARD / HOW I THINK</p><h2 id="tactics-title">Different field.<br/>Same approach.</h2><span>Football is the language. Engineering is the work.</span></div>
    <div className="tactics-selection" role="group" aria-label="Explore my engineering approach">
      {plays.map((item, index) => <button key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={14}/>{selected === index && <motion.i layoutId="tactics-selected" transition={{duration: reduced ? 0 : .3}}/>}</button>)}
    </div>
    <div className="tactics-pitch" aria-hidden="true"><span>BUILD-UP / 0{selected + 1}</span><svg viewBox="0 0 280 270" fill="none"><g className="pitch-ink"><rect x="20" y="20" width="240" height="230" rx="2"/><path d="M20 135H260M95 20V55H185V20M95 250V215H185V250M120 20V35H160V20M120 250V235H160V250"/><circle cx="140" cy="135" r="27"/></g><motion.path key={`route-${selected}`} d={play.path} className="tactics-route" initial={{pathLength:reduced?1:0}} animate={{pathLength:1}} transition={{duration:reduced?0:.85,ease:"easeInOut"}}/>{play.nodes.map(([x,y],i)=><motion.g key={`${selected}-${i}`} initial={{opacity:reduced?1:0}} animate={{opacity:1}} transition={{delay:reduced?0:i*.16}}><circle cx={x} cy={y} r={i===play.nodes.length-1?10:7} fill={i===play.nodes.length-1?"#eab69a":"#f2f0df"}/><circle cx={x} cy={y} r="2" fill="#274739"/></motion.g>)}</svg><span>CONTEXT → DECISION → EXECUTION</span></div>
    <div className="tactics-story" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={selected} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-6}} transition={{duration:reduced?0:.2}}><p className="tactics-kicker">THE PLAY / 0{selected + 1}</p><h3>{play.title}</h3><p>{play.body}</p><small>{play.proof}</small><button onClick={()=>onProject(play.project)}>{play.cta}<ArrowUpRight size={16}/></button></motion.div></AnimatePresence></div>
  </section>;
}
