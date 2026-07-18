// 'use client';

// import { motion } from 'framer-motion';

// const projects = [
//   { title: 'Project One', category: 'WebGL Experience', description: 'Interactive 3D visualization with smooth animations' },
//   { title: 'Project Two', category: 'E-commerce Platform', description: 'Full-stack solution with real-time updates' },
//   { title: 'Project Three', category: 'Brand Identity', description: 'Modern design system and component library' },
//   { title: 'Project Four', category: 'Mobile App', description: 'Cross-platform mobile application' },
// ];

// export default function Projects() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   return (
//     <section 
//       id="projects-section"
//       className="relative z-20 bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 px-6 md:px-12 text-white overflow-hidden"
//     >
//       {/* Background elements */}
//       <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -z-10"></div>
      
//       <div className="max-w-6xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <div className="inline-block mb-4">
//             <span className="px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium backdrop-blur-sm">
//               Portfolio
//             </span>
//           </div>
//           <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">Selected Work</h2>
//           <p className="text-lg text-gray-300 max-w-2xl">
//             A collection of recent projects showcasing my expertise in full-stack development and modern web technologies.
//           </p>
//         </motion.div>
        
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           {projects.map((proj, idx) => (
//             <motion.div
//               key={idx}
//               variants={itemVariants}
//               className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
//             >
//               {/* Premium glass background */}
//               <div className="absolute inset-0 glass" />
              
//               {/* Gradient overlay on hover */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/15 group-hover:to-purple-500/15 transition-all duration-700" />
              
//               {/* Animated gradient border on hover */}
//               <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
//                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
//                 padding: '1px'
//               }} />
              
//               {/* Content */}
//               <div className="relative z-10 h-full flex flex-col justify-between p-8 transition-all duration-500">
//                 <div>
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 0.1 }}
//                     viewport={{ once: true }}
//                     className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3 group-hover:text-blue-300 transition-colors"
//                   >
//                     {proj.category}
//                   </motion.p>
//                   <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
//                     {proj.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 mt-4">
//                     {proj.description}
//                   </p>
//                 </div>
                
//                 {/* Arrow icon */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   viewport={{ once: true }}
//                   className="flex items-center gap-2 text-gray-400 group-hover:text-blue-300 transition-colors duration-300"
//                 >
//                   <span className="text-sm font-medium">View Project</span>
//                   <motion.div
//                     whileHover={{ x: 4, y: -4 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M7 17L17 7" />
//                     </svg>
//                   </motion.div>
//                 </motion.div>
//               </div>
              
//               {/* Top accent line */}
//               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl?: string;
  gradient: string; // tailwind gradient classes for the placeholder art panel
  accent: string; // tailwind text color for accents
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'WebGL Experience',
    name: 'Project One',
    description: 'Interactive 3D visualization with smooth animations.',
    gradient: 'from-blue-500/25 to-cyan-500/10',
    accent: 'text-blue-300',
  },
  {
    number: '02',
    category: 'E-commerce Platform',
    name: 'Project Two',
    description: 'Full-stack solution with real-time updates.',
    gradient: 'from-purple-500/25 to-fuchsia-500/10',
    accent: 'text-purple-300',
  },
  {
    number: '03',
    category: 'Brand Identity',
    name: 'Project Three',
    description: 'Modern design system and component library.',
    gradient: 'from-pink-500/25 to-rose-500/10',
    accent: 'text-pink-300',
  },
  {
    number: '04',
    category: 'Mobile App',
    name: 'Project Four',
    description: 'Cross-platform mobile application.',
    gradient: 'from-emerald-500/25 to-teal-500/10',
    accent: 'text-emerald-300',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll progress for THIS card relative to its own scroll range.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards further down the stack stay full-size; earlier cards scale DOWN
  // as later cards stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <div
      ref={cardRef}
      className="sticky top-20 md:top-28 h-[78vh] w-full"
      style={{ top: `${88 + index * 24}px` }}
    >
      <motion.article
        style={{ scale, filter: useTransform(brightness, (b) => `brightness(${b})`) }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-6 md:gap-8 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 bg-[#080b1f] p-6 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6 shrink-0">
          <div className="flex flex-row items-start gap-4 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-white/70 to-white/10"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className={`font-medium uppercase tracking-widest ${project.accent}`}
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-md">{project.description}</p>
            </div>
          </div>

          <a
            href={project.liveUrl ?? '#'}
            target={project.liveUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="shrink-0 self-start sm:self-auto w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-[#0a0e27] font-semibold text-sm hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
          >
            View Project →
          </a>
        </div>

        {/* Bottom: placeholder art panel (swap for real screenshots via project.image1/2/3) */}
        <div className="grid grid-cols-[38%_62%] gap-4 md:gap-5 flex-1 min-h-0">
          <div className="flex flex-col gap-4 md:gap-5 min-h-0">
            <div
              className={`relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border border-white/10 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              style={{ height: 'clamp(110px, 16vw, 200px)' }}
            >
              <span className="text-5xl md:text-6xl font-black text-white/10 select-none">
                {project.name.charAt(project.name.length - 1)}
              </span>
            </div>
            <div
              className={`relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border border-white/10 bg-gradient-to-br ${project.gradient} flex-1 min-h-0 flex items-center justify-center`}
            >
              <span className="text-4xl md:text-5xl font-black text-white/10 select-none">
                {project.name.split(' ')[0]}
              </span>
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border border-white/10 bg-gradient-to-br ${project.gradient} min-h-0 flex items-center justify-center`}
          >
            <span
              className="font-black text-white/[0.08] select-none leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
            >
              {project.number}
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects-section"
      className="relative z-20 bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] pt-24 px-6 md:px-12 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium backdrop-blur-sm">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 gradient-text uppercase">
            Selected Work
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            A collection of recent projects showcasing my expertise in full-stack development and modern web
            technologies.
          </p>
        </motion.div>

        <div className="pb-24">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}