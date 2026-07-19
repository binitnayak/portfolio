'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  gradient: string; // tailwind gradient classes for the placeholder art panel
  accent: string; // tailwind text color for accents
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'AI / GenAI Web App',
    name: 'AI Content Generator',
    description:
      'A full-stack app that generates blogs, captions, emails, and product copy using the OpenAI API, with secure auth and content history.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Clerk', 'Neon PostgreSQL'],
    repoUrl: 'https://github.com/binitnayak/Ai-powered-content-generator',
    gradient: 'from-purple-500/25 to-fuchsia-500/10',
    accent: 'text-purple-300',
  },
  {
    number: '02',
    category: 'Full-Stack Dashboard',
    name: 'Expense Tracker Dashboard',
    description:
      'A personal finance dashboard for logging income and expenses, with transaction history, filters, and spend analytics.',
    techStack: ['React', 'Vite', 'Node.js', 'Neon PostgreSQL', 'Tailwind CSS'],
    repoUrl: 'https://github.com/binitnayak/Expense-tracker-dashboard',
    gradient: 'from-emerald-500/25 to-teal-500/10',
    accent: 'text-emerald-300',
  },
  {
    number: '03',
    category: 'Landing Page / UI',
    name: 'Japan Tour',
    description:
      'A visually rich travel landing page with smooth GSAP-powered animations and a fully responsive, modern layout.',
    techStack: ['React', 'Vite', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    repoUrl: 'https://github.com/binitnayak/japan-tour',
    gradient: 'from-blue-500/25 to-cyan-500/10',
    accent: 'text-blue-300',
  },
  {
    number: '04',
    category: 'MERN Full-Stack',
    name: 'Hospital Management System',
    description:
      'A hospital management platform with separate patient and admin portals — appointment booking, doctor management, and role-based auth.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    repoUrl: 'https://github.com/binitnayak/Hospital-Management-System',
    gradient: 'from-pink-500/25 to-rose-500/10',
    accent: 'text-pink-300',
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
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full bg-white text-[#0a0e27] font-semibold text-sm hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
              >
                Live Demo →
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none text-center px-6 py-3 rounded-full border border-white/15 font-semibold text-sm hover:bg-white/10 transition-colors duration-300 whitespace-nowrap ${
                project.liveUrl ? 'text-white' : 'bg-white text-[#0a0e27] hover:bg-gray-200'
              }`}
            >
              View Code →
            </a>
          </div>
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