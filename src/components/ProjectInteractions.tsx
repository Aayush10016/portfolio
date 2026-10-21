"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const musicNodes = [
  {name:"Artists",x:65,y:45,description:"Artist profiles connect the catalogue."},
  {name:"Discovery",x:240,y:110,description:"Last.fm and iTunes power exploration."},
  {name:"Tracks",x:410,y:45,description:"Songs and releases keep the music in context."},
  {name:"Community",x:65,y:180,description:"Leaderboards and achievements reward participation."},
  {name:"Games",x:410,y:180,description:"Guess the Song and quizzes turn listening into play."}
] as const;
export type MusicNode = typeof musicNodes[number]["name"];

export function MusicMap({selected,onSelect}:{selected:MusicNode;onSelect:(node:MusicNode)=>void}) {
  const reduced=useReducedMotion();
  const active=musicNodes.find(node=>node.name===selected)!;
  const connections=musicNodes.filter(node=>node.name!=="Discovery"&&(selected==="Discovery"||node.name===selected));
  return <><div className="music-map"><svg viewBox="0 0 480 220" aria-hidden="true"><path d="M240 110L65 45M240 110L410 45M240 110L65 180M240 110L410 180"/>{connections.map((node,index)=><g key={`${selected}-${node.name}`}><motion.path className="music-connection" d={`M240 110L${node.x} ${node.y}`} initial={{pathLength:reduced?1:0,opacity:reduced?1:0}} animate={{pathLength:1,opacity:1}} transition={{duration:reduced?0:.55,delay:reduced?0:index*.06}}/>{!reduced&&<motion.circle className="music-signal" r="2.5" initial={{cx:240,cy:110,opacity:0}} animate={{cx:node.x,cy:node.y,opacity:[0,1,0]}} transition={{duration:.65,delay:index*.06}}/>}</g>)}</svg>{musicNodes.map((node,index)=><button key={node.name} className={`music-node node-${index} ${selected===node.name?'selected':''}`} aria-pressed={selected===node.name} onClick={()=>onSelect(node.name)}>{node.name}</button>)}</div><div className="map-caption" role="status"><AnimatePresence mode="wait" initial={false}><motion.p key={selected} initial={{opacity:0,y:reduced?0:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.16}}>{active.description}</motion.p></AnimatePresence></div></>;
}

const flows={
  waymark:[
    {title:"Project context",summary:"Memory + architecture decisions",detail:"Project memory and retrieval supply relevant context, including the rules and architecture decisions that should guide a change."},
    {title:"Deterministic checks",summary:"Rules + bounded Git operations",detail:"Guardian checks proposed work against explicit rules. Bounded Git operations keep the scope of a change constrained."},
    {title:"Explicit approval",summary:"SHA-256 + stale-state recheck",detail:"Approval is tied to a SHA-256 fingerprint. Stale-state checks require the proposed change to be reviewed again when its inputs have changed."}
  ],
  pact:[
    {title:"Evidence",summary:"Inputs need an explicit source",detail:"Evidence is represented in the Phase 1 schema. Unknown AI evidence is rejected instead of being treated as a valid source."},
    {title:"Validation",summary:"Fail-closed checks",detail:"Authentication and Zod validation reject invalid requests before they can proceed through the agreement workflow."},
    {title:"Approval",summary:"An explicit decision boundary",detail:"The foundation models approvals separately from evidence. Payment execution remains disabled with HTTP 403; integrations are planned for Phase 2."},
    {title:"Audit trail",summary:"Keep decisions accountable",detail:"Audit records are part of the 16-table foundation, alongside evidence, approvals, and payment webhook structures."}
  ]
};

export function ProjectFlow({project}:{project:keyof typeof flows}) {
  const [active,setActive]=useState(0);
  const reduced=useReducedMotion();
  const steps=flows[project];
  return <div className="project-flow"><p className="flow-hint">Explore the flow <span>Choose a step</span></p><div className="flow-steps" role="group" aria-label={`${project==='waymark'?'Waymark':'Pact'} engineering flow`}><i className="flow-baseline" aria-hidden="true"/><motion.i className="flow-route" aria-hidden="true" initial={false} animate={{scaleY:active/(steps.length-1)}} transition={{duration:reduced?0:.4}}/>{steps.map((step,index)=><button key={step.title} className="flow-step" aria-pressed={index===active} onClick={()=>setActive(index)}>{index===active&&<motion.i className="flow-selection" layoutId={`flow-selection-${project}`} transition={{duration:reduced?0:.25,ease:[.2,.8,.2,1]}} aria-hidden="true"/>}<span className="flow-index" aria-hidden="true">{index===active?'✓':''}</span><span className="flow-step-copy"><b>{step.title}</b><small>{step.summary}</small></span></button>)}</div><div className="flow-description" role="status"><AnimatePresence mode="wait" initial={false}><motion.p key={active} initial={{opacity:0,y:reduced?0:5}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.16}}>{steps[active].detail}</motion.p></AnimatePresence></div></div>;
}
