"use client";

import { ArrowRight, ArrowUpRight, Command, Layers, Music2, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useExperience } from "./ExperienceShell";

const chapters = [
  {number:"01",title:"The engineer",detail:"Experience & approach",hash:"first-half",phase:"FIRST HALF"},
  {number:"02",title:"Selected work",detail:"Three builds, in depth",hash:"second-half",phase:"SECOND HALF"},
  {number:"03",title:"Halftime",detail:"Algorithms, bugs & systems",hash:"halftime",phase:"TAKE A BREAK"},
  {number:"04",title:"Let’s talk",detail:"Contact & resume",hash:"full-time",phase:"FULL TIME"}
];

export default function StadiumEntrance() {
  const {navigate,setView}=useExperience();
  const router=useRouter();
  const reduced=useReducedMotion();
  useEffect(()=>{setView("landing");router.prefetch("/arena");},[router,setView]);
  function open(href:string){
    try{
      const raw:unknown=JSON.parse(localStorage.getItem("extra-time-trophies")||"[]");
      const ids=Array.isArray(raw)?raw.filter(x=>typeof x==="string"):[];
      localStorage.setItem("extra-time-trophies",JSON.stringify([...new Set([...ids,"stadium-entry"])]));
    }catch{/* Navigation also works without storage. */}
    navigate(href);
  }
  function follow(event:React.MouseEvent<HTMLAnchorElement>,href:string){
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();open(href);
  }
  return <main className="landing-shell">
    <a className="skip-link" href="#landing-experience">Skip to the experience</a>
    <header className="site-header landing-header"><Link className="identity" href="/" aria-label="Aayush Tiwari home"><span className="identity-symbol">AT</span><span>AAYUSH TIWARI<small>EXTRA TIME / PORTFOLIO</small></span></Link><nav aria-label="Portfolio navigation">{[{title:"About",hash:"first-half"},{title:"Work",hash:"second-half"},{title:"Play",hash:"halftime"},{title:"Contact",hash:"full-time"}].map(item=><a key={item.hash} href={`/arena#${item.hash}`} onClick={e=>follow(e,`/arena#${item.hash}`)}>{item.title}</a>)}</nav><a className="header-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Resume<ArrowUpRight size={15}/></a></header>
    <section className="landing-stage" aria-labelledby="landing-title">
      <div className="landing-meta"><span><i/>COMPUTER SCIENCE · VIT ’27</span><span className="landing-score">EXTRA TIME <b>90 <i>+01</i></b></span></div>
      <div className="landing-composition">
        <motion.a className="landing-project landing-music" href="/arena#hiphophub" onClick={e=>follow(e,'/arena#hiphophub')} animate={reduced?{}:{y:[0,-7,0],rotate:[-4,-2,-4]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}} whileHover={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}} whileFocus={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}}><div className="landing-project-top"><Music2 size={14}/><span>MY PROJECT</span><ArrowUpRight size={13}/></div><div className="mini-wave" aria-hidden="true">{[14,29,42,23,52,35,19,43,31,55,24,39,16,27,45,21].map((h,i)=><i key={i} style={{height:h,animationDelay:`${i*-.19}s`}}/>)}</div><div className="landing-project-caption"><strong>HipHopHub</strong><span>61 endpoints. One music platform.</span><small className="landing-project-cue">View project<ArrowUpRight size={10} aria-hidden="true"/></small></div></motion.a>
        <motion.div className="landing-intro" initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.55,ease:[.2,.8,.2,1]}}><p className="landing-role">JAVA BACKEND & SOFTWARE ENGINEERING</p><h1 id="landing-title">Aayush <em>Tiwari.</em></h1><p className="landing-description">I build secure systems, thoughtful developer tools,<br className="landing-wide-break"/> and the occasional reason to stay for extra time.</p><div className="landing-actions"><a className="button-primary" href="/arena#first-half" onClick={e=>follow(e,'/arena#first-half')}>Enter the experience<ArrowRight size={17}/></a><a className="button-text" href="/arena#first-half" onClick={e=>follow(e,'/arena#first-half')}>Meet the engineer<ArrowUpRight size={15}/></a></div><span className="landing-personal">ENGINEERING MIND <i>×</i> MATCHDAY HEART</span></motion.div>
        <div className="landing-right-projects"><motion.a className="landing-project landing-waymark" href="/arena#waymark" onClick={e=>follow(e,'/arena#waymark')} animate={reduced?{}:{y:[0,6,0],rotate:[3,1,3]}} transition={{duration:11,repeat:Infinity,ease:"easeInOut"}} whileHover={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}} whileFocus={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}}><div className="landing-project-top"><Command size={14}/><span>MY PROJECT</span><ArrowUpRight size={13}/></div><div className="landing-guardian" aria-hidden="true"><svg className="guardian-diagram" viewBox="0 0 180 68"><rect className="guardian-context" x="8" y="20" width="49" height="28" rx="4"/><text x="32.5" y="37">CONTEXT</text><path className="guardian-track" d="M57 34H109"/><path className="guardian-trace" d="M57 34H109"/><circle className="guardian-packet" cx="57" cy="34" r="2"/><text x="83" y="23">RULES</text><ShieldCheck className="guardian-shield" x={116} y={17} width={34} height={34}/><text x="133" y="63">REVIEW</text></svg></div><div className="landing-project-caption"><strong>Waymark</strong><span>Keep the context. Guard the change.</span><small className="landing-project-cue">View project<ArrowUpRight size={10} aria-hidden="true"/></small></div></motion.a><motion.a className="landing-project landing-pact" href="/arena#pact" onClick={e=>follow(e,'/arena#pact')} animate={reduced?{}:{y:[0,-5,0],rotate:[-3,-1,-3]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut"}} whileHover={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}} whileFocus={{scale:1.035,rotate:0,y:-3,transition:{type:"spring",stiffness:210,damping:22}}}><div className="landing-project-top"><Layers size={14}/><span>MY PROJECT</span><ArrowUpRight size={13}/></div><div className="landing-evidence" aria-hidden="true"><span>EVIDENCE</span><i/><span>APPROVAL</span><i/><span>AUDIT</span></div><div className="landing-project-caption"><strong>Pact</strong><span>Trust, with explicit boundaries.</span><small className="landing-project-cue">View project<ArrowUpRight size={10} aria-hidden="true"/></small></div></motion.a></div>
      </div>
    </section>
    <section className="landing-experience" id="landing-experience" aria-labelledby="experience-title"><div className="landing-experience-heading"><p>THE EXPERIENCE</p><h2 id="experience-title">Choose your<br/> <em>next play.</em></h2></div><div className="landing-chapters">{chapters.map(chapter=><a key={chapter.number} href={`/arena#${chapter.hash}`} onClick={e=>follow(e,`/arena#${chapter.hash}`)}><span className="landing-chapter-number"><small>{chapter.phase}</small><ArrowUpRight size={14}/></span><h3>{chapter.title}</h3><p>{chapter.detail}</p></a>)}</div></section>
    <footer className="landing-footer"><span>CODE. CULTURE. ONE MORE ATTEMPT.</span><a href="https://github.com/Aayush10016" target="_blank" rel="noreferrer">GITHUB<ArrowUpRight size={11}/></a><span>AAYUSH TIWARI / 2026</span></footer>
  </main>;
}
