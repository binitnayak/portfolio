// // 'use client';

// // import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
// // import { useRef } from 'react';
// // import {
// //   FaHtml5,
// //   FaCss3Alt,
// //   FaJs,
// //   FaReact,
// //   FaNode,
// //   FaGit,
// // } from 'react-icons/fa';
// // import { SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';

// // const skills = [
// //   { name: 'HTML', category: 'Frontend', icon: FaHtml5, color: '#f97316', lightColor: 'text-orange-400' },
// //   { name: 'CSS', category: 'Frontend', icon: FaCss3Alt, color: '#0ea5e9', lightColor: 'text-blue-400' },
// //   { name: 'JavaScript', category: 'Frontend', icon: FaJs, color: '#eab308', lightColor: 'text-yellow-400' },
// //   { name: 'React', category: 'Frontend', icon: FaReact, color: '#06b6d4', lightColor: 'text-cyan-400' },
// //   { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: '#9ca3af', lightColor: 'text-gray-300' },
// //   { name: 'Node.js', category: 'Backend', icon: FaNode, color: '#10b981', lightColor: 'text-green-400' },
// //   { name: 'Express', category: 'Backend', icon: SiExpress, color: '#6b7280', lightColor: 'text-gray-400' },
// //   { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#059669', lightColor: 'text-green-500' },
// //   { name: 'Git', category: 'Tools', icon: FaGit, color: '#ef4444', lightColor: 'text-red-400' },
// // ];

// // function SkillCard({ 
// //   skill, 
// //   idx, 
// //   smoothProgress 
// // }: { 
// //   skill: typeof skills[0]; 
// //   idx: number; 
// //   smoothProgress: MotionValue<number>;
// // }) {
// //   const yOffset = (idx % 3 === 1) ? -120 : 120; 
// //   const yTransform = useTransform(smoothProgress, [0, 1], [yOffset, -yOffset]);
// //   const IconComponent = skill.icon;
  
// //   const marginTop = (idx % 3 === 1) ? 'mt-0 lg:mt-24' : 'mt-0';

// //   return (
// //     <motion.div
// //       style={{ y: yTransform }}
// //       className={`group relative flex flex-col items-center p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:shadow-2xl z-10 hover:z-20 ${marginTop}`}
// //     >
// //       <div 
// //         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
// //         style={{
// //           background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${skill.color}15, transparent 40%)`,
// //         }}
// //       />
      
// //       <div 
// //         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl z-20"
// //         style={{
// //           padding: '1px',
// //           background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${skill.color}80, transparent 40%)`,
// //           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
// //           WebkitMaskComposite: 'xor',
// //           maskComposite: 'exclude',
// //         }}
// //       />

// //       <motion.div
// //         animate={{ y: [-8, 8, -8] }}
// //         transition={{ 
// //           duration: 4 + (idx % 3),
// //           repeat: Infinity, 
// //           ease: "easeInOut",
// //           delay: idx * 0.2
// //         }}
// //         className={`relative z-30 mb-8 p-6 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] drop-shadow-2xl ${skill.lightColor} group-hover:scale-110 transition-transform duration-500 ease-out`}
// //       >
// //         <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" style={{ backgroundColor: skill.color }} />
// //         <IconComponent size={64} className="relative z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
// //       </motion.div>
      
// //       <div className="relative z-30 text-center">
// //         <h3 className="text-2xl font-bold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
// //           {skill.name}
// //         </h3>
// //         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
// //           <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: skill.color, color: skill.color }} />
// //           <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest group-hover:text-gray-300 transition-colors duration-300">
// //             {skill.category}
// //           </p>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // export default function Skills() {
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
// //     if (!containerRef.current) return;
// //     const rect = containerRef.current.getBoundingClientRect();
// //     const x = e.clientX - rect.left;
// //     const y = e.clientY - rect.top;
// //     containerRef.current.style.setProperty('--mouse-x', `${x}px`);
// //     containerRef.current.style.setProperty('--mouse-y', `${y}px`);
// //   };

// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ['start end', 'end start'],
// //   });

// //   const smoothProgress = useSpring(scrollYProgress, {
// //     stiffness: 100,
// //     damping: 30,
// //     restDelta: 0.001
// //   });

// //   return (
// //     <section 
// //       className="relative z-20 min-h-[150vh] bg-[#050714] py-32 px-6 md:px-12 text-white overflow-hidden flex flex-col justify-center"
// //       onMouseMove={handleMouseMove}
// //       ref={containerRef}
// //     >
// //       <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

// //       <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
// //       <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>

// //       <div className="max-w-6xl mx-auto relative z-10 w-full">
        
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //           viewport={{ once: true, margin: "-100px" }}
// //           className="mb-32 text-center flex flex-col items-center"
// //         >
// //           <div className="inline-block mb-6">
// //             <span className="px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
// //               Technical Arsenal
// //             </span>
// //           </div>
// //           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-sm">
// //             Skills & Expertise
// //           </h2>
// //           <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
// //             Crafting seamless digital experiences with modern web technologies. Every tool is selected for performance and scalability.
// //           </p>
// //         </motion.div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative">
// //           {skills.map((skill, idx) => (
// //             <SkillCard key={skill.name} skill={skill} idx={idx} smoothProgress={smoothProgress} />
// //           ))}
// //         </div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 40 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 1, delay: 0.4 }}
// //           viewport={{ once: true }}
// //           className="mt-40 text-center relative"
// //         >
// //           <div className="absolute left-1/2 -top-20 w-px h-16 bg-gradient-to-b from-transparent to-blue-500/50 transform -translate-x-1/2"></div>
// //           <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
// //             Continuously pushing the boundaries of what&apos;s possible on the web. 
// //             <span className="text-blue-400 font-medium block mt-3">Driven by performance, obsessed with design.</span>
// //           </p>
// //         </motion.div>

// //       </div>
// //     </section>
// //   );
// // }
// 'use client';

// import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
// import { useRef, useState } from 'react';
// import {
//   FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaGit, FaFolder, FaFolderOpen,
// } from 'react-icons/fa';
// import { SiNextdotjs, SiExpress, SiMongodb, SiTypescript } from 'react-icons/si';
// import { VscCircleFilled } from 'react-icons/vsc';

// // ── Data ─────────────────────────────────────────────
// const tabs = [
//   {
//     file: 'frontend.config.ts',
//     label: 'Frontend',
//     skills: [
//       { name: 'HTML', icon: FaHtml5, color: '#f97316', level: 92 },
//       { name: 'CSS', icon: FaCss3Alt, color: '#0ea5e9', level: 88 },
//       { name: 'JavaScript', icon: FaJs, color: '#eab308', level: 90 },
//       { name: 'React', icon: FaReact, color: '#06b6d4', level: 85 },
//     ],
//   },
//   {
//     file: 'backend.config.ts',
//     label: 'Backend',
//     skills: [
//       { name: 'NextJs', icon: SiNextdotjs, color: '#e5e7eb', level: 82 },
//       { name: 'NodeJs', icon: FaNode, color: '#10b981', level: 80 },
//       { name: 'Express', icon: SiExpress, color: '#9ca3af', level: 78 },
//     ],
//   },
//   {
//     file: 'tools.config.ts',
//     label: 'Tools & Database',
//     skills: [
//       { name: 'MongoDB', icon: SiMongodb, color: '#059669', level: 75 },
//       { name: 'Git', icon: FaGit, color: '#ef4444', level: 88 },
//     ],
//   },
// ];

// function LevelBar({ level, color }: { level: number; color: string }) {
//   const filled = Math.round(level / 10);
//   return (
//     <span className="font-mono text-[13px] tracking-tighter" style={{ color }}>
//       {'█'.repeat(filled)}
//       <span className="text-white/10">{'░'.repeat(10 - filled)}</span>
//     </span>
//   );
// }

// function SkillLine({
//   skill,
//   lineNo,
// }: {
//   skill: (typeof tabs)[0]['skills'][0];
//   lineNo: number;
// }) {
//   const Icon = skill.icon;
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -12 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.35, delay: lineNo * 0.06, ease: [0.22, 1, 0.36, 1] }}
//       className="group flex items-center gap-3 sm:gap-5 px-4 sm:px-10 py-4 hover:bg-white/[0.03] rounded-lg transition-colors"
//     >
//       <span className="w-6 text-right text-white/20 text-xs font-mono select-none shrink-0">
//         {lineNo}
//       </span>
//       <span className="text-purple-400/70 font-mono text-sm sm:text-base shrink-0">const</span>
//       <span className="flex items-center gap-2.5 font-mono text-sm sm:text-base shrink-0 min-w-[120px] sm:min-w-[160px]">
//         <Icon size={18} style={{ color: skill.color }} className="shrink-0" />
//         <span className="text-white/90">{skill.name}</span>
//       </span>
//       <span className="text-white/30 font-mono text-sm sm:text-base shrink-0">=</span>
//       <span className="hidden sm:inline-block shrink-0">
//         <LevelBar level={skill.level} color={skill.color} />
//       </span>
//       <span className="text-white/40 font-mono text-xs sm:text-sm ml-auto shrink-0">
//         {skill.level}%
//       </span>
//     </motion.div>
//   );
// }

// export default function Skills() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [manualOverride, setManualOverride] = useState(false);
//   const active = tabs[activeTab];

//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end end'],
//   });

//   // Direct transform, no spring — 1:1 with scroll, zero lag.
//   useMotionValueEvent(scrollYProgress, 'change', (v) => {
//     if (manualOverride) return;
//     if (v < 0.38) setActiveTab(0);
//     else if (v < 0.7) setActiveTab(1);
//     else setActiveTab(2);
//   });

//   const handleTabClick = (i: number) => {
//     setActiveTab(i);
//     setManualOverride(true);
//   };

//   const opacityHeading = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0]);
//   const yHeading = useTransform(scrollYProgress, [0, 0.12], [0, -40]);
//   const opacityWindow = useTransform(scrollYProgress, [0.04, 0.12], [0, 1]);

//   return (
//     <section ref={containerRef} className="relative h-[280vh] w-full bg-[#050714] text-white">
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
//       <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

//       <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12">
//         <div className="max-w-6xl w-full mx-auto relative z-10">
//           <motion.div
//             style={{ opacity: opacityHeading, y: yHeading }}
//             className="mb-10 text-center"
//           >
//             <span className="inline-block px-5 py-2 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
//               Technical Arsenal
//             </span>
//             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
//               <span className="gradient-text">Skills &amp; Expertise</span>
//             </h2>
//             <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
//               Crafting seamless digital experiences with modern web technologies.
//             </p>
//           </motion.div>

//           {/* Full IDE window — signature element, wide enough to own the section, tabs driven by scroll */}
//           <motion.div
//             style={{ opacity: opacityWindow }}
//             className="rounded-xl border border-white/10 bg-[#0a0d18]/95 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
//           >
//           {/* title bar */}
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
//             <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
//             <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
//             <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
//             <span className="mx-auto text-xs text-white/30 font-mono">~/binit-nayak/portfolio/skills</span>
//           </div>

//           <div className="flex flex-col sm:flex-row">
//             {/* file explorer sidebar — fills the horizontal space */}
//             <div className="sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-white/5 bg-white/[0.015] py-4">
//               <div className="flex items-center gap-2 px-4 pb-3 text-xs font-mono text-white/40 uppercase tracking-wider">
//                 <FaFolderOpen size={12} />
//                 skills
//               </div>
//               <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible">
//                 {tabs.map((tab, i) => (
//                   <button
//                     key={tab.file}
//                     onClick={() => handleTabClick(i)}
//                     className={`flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-mono whitespace-nowrap text-left transition-colors border-l-2 ${
//                       activeTab === i
//                         ? 'bg-blue-500/10 border-l-blue-400 text-white'
//                         : 'border-l-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
//                     }`}
//                   >
//                     <SiTypescript size={13} className={activeTab === i ? 'text-blue-400' : 'text-white/25'} />
//                     {tab.file}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* code area */}
//             <div className="flex-1 min-w-0">
//               {/* open tab strip */}
//               <div className="flex border-b border-white/5">
//                 <div className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono bg-[#0a0d18] text-white/80 border-t-2 border-t-blue-400">
//                   <SiTypescript size={12} className="text-blue-400" />
//                   {active.file}
//                 </div>
//               </div>

//               <div className="py-6 min-h-[360px]">
//                 <div className="px-4 sm:px-10 pb-2 text-white/30 font-mono text-xs sm:text-sm">
//                   {'// '}
//                   {active.label} stack
//                 </div>
//                 {active.skills.map((skill, i) => (
//                   <SkillLine key={skill.name} skill={skill} lineNo={i + 1} />
//                 ))}
//                 <div className="flex items-center gap-2 px-4 sm:px-10 pt-3">
//                   <span className="w-6 text-right text-white/20 text-xs font-mono shrink-0">
//                     {active.skills.length + 1}
//                   </span>
//                   <motion.span
//                     animate={{ opacity: [1, 0, 1] }}
//                     transition={{ duration: 1, repeat: Infinity }}
//                     className="w-[7px] h-[16px] bg-blue-400/70"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* status bar — real VS Code detail, fills the bottom edge nicely */}
//           <div className="flex items-center justify-between px-4 py-1.5 bg-blue-600/90 text-[11px] font-mono text-white/90">
//             <div className="flex items-center gap-4">
//               <span className="flex items-center gap-1">
//                 <VscCircleFilled size={8} className="text-green-300" />
//                 main
//               </span>
//               <span>{active.skills.length} skills loaded</span>
//             </div>
//             <div className="hidden sm:flex items-center gap-4">
//               <span>TypeScript</span>
//               <span>UTF-8</span>
//               <span>Ln {active.skills.length + 1}, Col 1</span>
//             </div>
//           </div>
//           </motion.div>

//           {/* scroll-synced progress dots — visual cue that scrolling drives the tabs */}
//           <div className="flex items-center justify-center gap-2 mt-6">
//             {tabs.map((tab, i) => (
//               <div
//                 key={tab.file}
//                 className={`h-1 rounded-full transition-all duration-500 ${
//                   activeTab === i ? 'w-8 bg-blue-400' : 'w-1.5 bg-white/15'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGit,
} from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';
import type { IconType } from 'react-icons';

interface Chip {
  name: string;
  icon: IconType;
  iconColor: string;
}

const CHIPS: Chip[] = [
  { name: 'HTML', icon: FaHtml5, iconColor: 'text-orange-400' },
  { name: 'CSS', icon: FaCss3Alt, iconColor: 'text-sky-400' },
  { name: 'JavaScript', icon: FaJs, iconColor: 'text-yellow-400' },
  { name: 'React', icon: FaReact, iconColor: 'text-cyan-400' },
  { name: 'Next.js', icon: SiNextdotjs, iconColor: 'text-slate-200' },
  { name: 'Node.js', icon: FaNode, iconColor: 'text-green-400' },
  { name: 'Express', icon: SiExpress, iconColor: 'text-slate-300' },
  { name: 'MongoDB', icon: SiMongodb, iconColor: 'text-green-500' },
  { name: 'Git', icon: FaGit, iconColor: 'text-red-400' },
];

const ROW_ONE = [...CHIPS, ...CHIPS];
const ROW_TWO = [...CHIPS.slice().reverse(), ...CHIPS.slice().reverse()];

const CATEGORY_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['HTML', 'CSS', 'JavaScript'] },
  { label: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Node.js', 'Express'] },
  { label: 'Tools & Database', items: ['MongoDB', 'Git'] },
];

function MarqueeChip({ chip }: { chip: Chip }) {
  const Icon = chip.icon;
  return (
    <div className="flex items-center gap-2.5 shrink-0 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 hover:border-white/25 hover:bg-white/[0.06] transition-colors duration-300">
      <Icon className={chip.iconColor} size={20} />
      <span className="font-medium text-sm md:text-base text-gray-200 whitespace-nowrap">
        {chip.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewRaw = useTransform(scrollVelocity, [-3000, 0, 3000], [-8, 0, 8], { clamp: true });
  const skew = useSpring(skewRaw, { damping: 40, stiffness: 200 });

  return (
    <section
      id="skills-section"
      className="relative z-20 bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 text-white overflow-hidden"
    >
      {/* Ambient background glows - matches rest of portfolio */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-pink-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-sm">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 gradient-text uppercase">
            Skills
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto md:mx-0">
            The technologies I reach for to turn ideas into fast, polished, real-world products.
          </p>
        </motion.div>
      </div>

      {/* Scroll-reactive marquee - skews with scroll velocity */}
      <motion.div style={{ skewX: skew }} className="mb-16 md:mb-20">
        <div className="overflow-hidden py-1.5 group">
          <div className="flex gap-4 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
            {ROW_ONE.map((chip, i) => (
              <MarqueeChip key={`row1-${i}`} chip={chip} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden py-1.5 mt-4 group">
          <div className="flex gap-4 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
            {ROW_TWO.map((chip, i) => (
              <MarqueeChip key={`row2-${i}`} chip={chip} />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass glass-hover rounded-2xl p-8 md:p-10"
        >
          <div className="flex flex-col gap-6">
            {CATEGORY_GROUPS.map((group) => (
              <div
                key={group.label}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
              >
                <span className="text-xs uppercase tracking-widest text-gray-500 sm:w-52 sm:shrink-0 sm:text-right">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-gray-300 hover:border-purple-400/40 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}