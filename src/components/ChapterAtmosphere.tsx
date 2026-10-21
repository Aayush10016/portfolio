"use client";

type Scene = "landing" | "player" | "work" | "play" | "contact";

/** Decorative chapter scenery stays outside the reading and interaction layers. */
export default function ChapterAtmosphere({scene}:{scene:Scene}) {
  return <div className="chapter-atmosphere" data-scene={scene} aria-hidden="true">
    <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs><linearGradient id="mineral-metal" x1="200" y1="0" x2="1200" y2="900" gradientUnits="userSpaceOnUse"><stop stopColor="#f1e4cb"/><stop offset=".35" stopColor="#a97650"/><stop offset=".62" stopColor="#ead5b7"/><stop offset="1" stopColor="#624e42"/></linearGradient></defs>
      <g className="atmosphere-scene scenery-landing" stroke="url(#mineral-metal)">{Array.from({length:15},(_,i)=><path key={i} d={`M${-100+i*14} 1000 C${250+i*25} ${100-i*10},${850-i*20} ${1100-i*22},${1450+i*15} -100`} strokeWidth={i%4===0?3:1}/>)}</g>
      <g className="atmosphere-scene scenery-player" stroke="url(#mineral-metal)">{Array.from({length:7},(_,i)=><g key={i} transform={`translate(${i*23} ${i*28})`}><path d="m650 130 330 80 190 270-330-80z"/><path d="m650 130 190 270v90l330 80v-90M840 490 650 220v-90"/></g>)}</g>
      <g className="atmosphere-scene scenery-work" stroke="url(#mineral-metal)">{Array.from({length:21},(_,i)=><path key={i} d={`M${100+i*14} 1050 C${180+i*10} ${100+i*8},${1150-i*12} ${950-i*12},${1250+i*9} -100`} strokeWidth={i%5===0?2.5:.8}/>)}</g>
      <g className="atmosphere-scene scenery-play" stroke="url(#mineral-metal)">{Array.from({length:45},(_,i)=>{const x=650+(i%9)*65,y=200+Math.floor(i/9)*110;return <g key={i}><circle cx={x} cy={y} r={i%3===0?9:3} fill={i%3===0?"none":"#b89771"}/>{i<36&&<path d={`M${x} ${y+10}l${i%2?65:-65} 90`}/>}</g>;})}</g>
      <g className="atmosphere-scene scenery-contact" stroke="url(#mineral-metal)">{Array.from({length:12},(_,i)=><ellipse key={i} cx="1000" cy="560" rx={170+i*21} ry={90+i*24} transform={`rotate(${-40+i*3} 1000 560)`}/>)}</g>
    </svg>
  </div>;
}
