"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";

const chapters = [
  {word:"Build.",label:"BUILD FROM THE BACK",title:"Start with a system that holds.",body:"Java, APIs, and data models. The foundations that let the next move happen with confidence.",proof:"ACCUMET / JAVA + POSTGRESQL / 300+ METERS",link:"hiphophub"},
  {word:"Read.",label:"READ THE GAME",title:"Context before the next move.",body:"Waymark brings project memory, deterministic rules, and explicit approval to AI-assisted development.",proof:"WAYMARK / 24 COMMANDS / 420 JUNIT TESTS",link:"waymark"},
  {word:"Repeat.",label:"PLAY THE LONG GAME",title:"Keep improving after the whistle.",body:"From music discovery to guarded changes and evidence-led agreements, each build is a chance to make the next one more considered.",proof:"HIPHOPHUB / WAYMARK / PACT",link:"pact"}
];

function subscribeCompact(callback:()=>void){const media=window.matchMedia("(max-width: 900px)");media.addEventListener("change",callback);return()=>media.removeEventListener("change",callback);}
function getCompact(){return window.matchMedia("(max-width: 900px)").matches;}

function Artifact({index}:{index:number}){
  return <div className={`story-artifact artifact-${index}`} aria-hidden="true">
    {index===0?<><div className="artifact-bar"><span>THE ENGINEERING / MATCH FILE</span><i/><i/><i/></div><div className="artifact-code"><span className="code-comment">{'// build the shape before the play'}</span><span><b>class</b> ReliableSystem {'{'}</span><span>  context.read();</span><span>  boundary.verify();</span><span>  change.test();</span><span>{'}'}</span></div><div className="artifact-validation"><span><Check size={13}/> VALIDATION</span><strong>300<span>+</span></strong><small>meters in daily testing</small></div><span className="artifact-caption">JAVA / POSTGRESQL / ACCUMET</span></>:index===1?<><div className="artifact-bar"><span>WAYMARK / GUARDIAN</span><ShieldCheck size={15}/></div><div className="artifact-steps">{["Project memory","Deterministic rules","Explicit approval"].map(step=><div key={step}><strong>{step}</strong><Check size={14}/></div>)}</div><div className="artifact-stamp"><span>CONTEXT PRESERVED</span><b>Change guarded.</b></div><span className="artifact-caption">CONTEXT → VERIFY → APPROVE</span></>:<><div className="artifact-bar"><span>PACT / PHASE 1</span><span>FOUNDATION</span></div><div className="artifact-records"><div><span>EVIDENCE</span><b>Keep the source.</b></div><div><span>APPROVAL</span><b>Make consent explicit.</b></div><div><span>AUDIT</span><b>Leave a clear trail.</b></div></div><span className="artifact-caption">PAYMENT EXECUTION DISABLED / 403</span></>}
  </div>;
}

function sample(value:number,input:number[],output:number[]){
  if(value<=input[0])return output[0];
  for(let i=1;i<input.length;i++){if(value<=input[i]){const ratio=(value-input[i-1])/(input[i]-input[i-1]);return output[i-1]+(output[i]-output[i-1])*ratio;}}
  return output[output.length-1];
}

function StoryPhase({index,progress,staticMode,active}:{index:number;progress:MotionValue<number>;staticMode:boolean;active:number}){
  const start=index/3;
  const bound=(value:number)=>Math.max(0,Math.min(1,value));
  const opacity=useTransform(()=>sample(progress.get(),[bound(start-.07),bound(start+.025),bound(start+.265),bound(start+.345)],[index===0?1:0,1,1,index===2?1:0]));
  const y=useTransform(()=>sample(progress.get(),[bound(start-.07),bound(start+.025),bound(start+.265),bound(start+.345)],[30,0,0,-25]));
  const rotate=useTransform(()=>sample(progress.get(),[bound(start-.07),bound(start+.12),bound(start+.345)],[index===1?2:-2,0,index===1?-1:1]));
  const scale=useTransform(()=>sample(progress.get(),[bound(start-.07),bound(start+.1),bound(start+.345)],[.94,1,.98]));
  const chapter=chapters[index];
  return <motion.article className={`story-phase story-phase-${index}`} aria-hidden={!staticMode&&active!==index} style={staticMode?undefined:{opacity,y,pointerEvents:active===index?"auto":"none"}}>
    <div className="story-copy"><p>{chapter.label}</p><h3>{chapter.word}</h3><h4>{chapter.title}</h4><p className="story-description">{chapter.body}</p><small>{chapter.proof}</small></div>
    <motion.div className="story-artifact-wrap" style={staticMode?undefined:{rotate,scale}}><Artifact index={index}/></motion.div>
  </motion.article>;
}

export default function ScrollMatchStory(){
  const target=useRef<HTMLElement>(null);
  const compact=useSyncExternalStore(subscribeCompact,getCompact,()=>true);
  const reduced=useReducedMotion();
  const staticMode=!!reduced||compact;
  const {scrollYProgress}=useScroll({target,offset:["start start","end end"]});
  const [active,setActive]=useState(0);
  useMotionValueEvent(scrollYProgress,"change",value=>setActive(Math.min(2,Math.max(0,Math.floor(value*3)))));
  const lineScale=useTransform(scrollYProgress,[0,1],[0,1]);
  function go(index:number){const element=target.current;if(!element)return;const distance=element.offsetHeight-innerHeight;window.scrollTo({top:element.getBoundingClientRect().top+scrollY+distance*(index/3+.09),behavior:reduced?"instant":"smooth"});}
  return <section ref={target} className="match-story" data-static={staticMode} aria-labelledby="match-story-title">
    <div className="match-story-stage"><div className="story-header"><h2 id="match-story-title">The mindset behind the work.</h2><span>SCROLL TO FOLLOW THE PLAY <ArrowDown size={12}/></span></div>
      <div className="story-scenes">{chapters.map((chapter,index)=><StoryPhase key={chapter.word} index={index} progress={scrollYProgress} staticMode={staticMode} active={active}/>)}</div>
      {!staticMode&&<div className="story-timeline"><div className="story-timeline-track"><motion.i style={{scaleX:lineScale}}/></div>{chapters.map((chapter,index)=><button key={chapter.word} onClick={()=>go(index)} aria-current={active===index?"step":undefined}>{chapter.word}<ArrowUpRight size={12}/></button>)}</div>}
    </div>
  </section>;
}
