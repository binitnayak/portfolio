'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  gradient?: string;
  accent: string;
  images?: {
    img1: string;
    img2: string;
    img3: string;
  };
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'AI / GenAI Web App',
    name: 'AI Content Generator',
    description:
      'AI-powered platform generating high-quality content like blogs, social media captions, emails, and product descriptions using OpenAI API with secure authentication and cloud database.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Clerk Auth', 'Neon PostgreSQL', 'Tailwind CSS'],
    repoUrl: 'https://github.com/binitnayak/Ai-powered-content-generator',
    accent: 'text-purple-300',
    images: {
      img1: '/projects/ai-content-1.png',
      img2: '/projects/ai-content-2.png',
      img3: '/projects/ai-content-3.png',
    },
  },
  {
    number: '02',
    category: 'MERN Full-Stack',
    name: 'FinTrack Dashboard',
    description:
      'Modern finance management dashboard for tracking income, expenses, and savings with beautiful analytics, daily/weekly/monthly reports, and responsive design.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Recharts'],
    repoUrl: 'https://github.com/binitnayak/Expense-tracker-dashboard',
    accent: 'text-emerald-300',
    images: {
      img1: '/projects/fintrack-1.png',
      img2: '/projects/fintrack-2.png',
      img3: '/projects/fintrack-3.png',
    },
  },
  {
    number: '03',
    category: 'Travel Landing Page',
    name: 'Japan Tour',
    description:
      'Immersive travel landing page showcasing Japan with smooth animations, premium design, responsive layout, and engaging hero sections with booking CTAs.',
    techStack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'CSS Animations'],
    repoUrl: 'https://github.com/binitnayak/japan-tour',
    accent: 'text-blue-300',
    images: {
      img1: '/projects/japan-1.png',
      img2: '/projects/japan-2.png',
      img3: '/projects/japan-3.png',
    },
  },
  {
    number: '04',
    category: 'MERN Full-Stack',
    name: 'Hospital Management System',
    description:
      'Healthcare platform with patient and admin portals featuring appointment booking, doctor management, role-based authentication, and complete patient-doctor workflow.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
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

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const hasImages = project.images && Object.values(project.images).every(img => img);

  return (
    <div
      ref={cardRef}
      className="sticky top-20 md:top-28 h-[78vh] w-full"
      style={{ top: `${88 + index * 24}px` }}
    >
      <motion.article
        style={{ scale, filter: useTransform(brightness, (b) => `brightness(${b})`) }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-6 md:gap-8 rounded-[2.5rem] md:rounded-[3rem] border border-white/20 bg-gradient-to-br from-[#0f1729] via-[#1a2a4a] to-[#0a0e27] p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl hover:border-white/30 transition-all duration-300"
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
                className={`font-bold uppercase tracking-widest ${project.accent} opacity-90`}
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-black text-white leading-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.08] text-gray-200 font-medium hover:bg-white/15 hover:border-white/30 transition-all duration-200"
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
                className="flex-1 sm:flex-none text-center px-6 py-3 rounded-full bg-gradient-to-r from-white to-gray-100 text-[#0a0e27] font-semibold text-sm hover:from-gray-50 hover:to-white hover:shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Live Demo →
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none text-center px-6 py-3 rounded-full border-2 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                project.liveUrl 
                  ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-lg' 
                  : 'bg-gradient-to-r from-white to-gray-100 text-[#0a0e27] border-0 hover:from-gray-50 hover:to-white hover:shadow-lg'
              }`}
            >
              View Code →
            </a>
          </div>
        </div>

        {/* Bottom: Real images or placeholder art panel */}
        {hasImages ? (
          <div className="grid grid-cols-[38%_62%] gap-4 md:gap-5 flex-1 min-h-0">
            <div className="flex flex-col gap-4 md:gap-5 min-h-0">
              <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-gray-800 to-gray-900 h-[clamp(110px,_16vw,_200px)] shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group p-1" style={{backgroundImage: 'linear-gradient(#0a0e27, #0a0e27), linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0))', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box'}}>
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden bg-gray-900">
                  <Image
                    src={project.images.img1}
                    alt={`${project.name} screenshot 1`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 38vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-gray-800 to-gray-900 flex-1 min-h-0 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group p-1" style={{backgroundImage: 'linear-gradient(#0a0e27, #0a0e27), linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0))', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box'}}>
                <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden bg-gray-900">
                  <Image
                    src={project.images.img2}
                    alt={`${project.name} screenshot 2`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 38vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-gray-800 to-gray-900 min-h-0 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group p-1" style={{backgroundImage: 'linear-gradient(#0a0e27, #0a0e27), linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(255,255,255,0))', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box'}}>
              <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden bg-gray-900">
                <Image
                  src={project.images.img3}
                  alt={`${project.name} screenshot 3`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 62vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        ) : (
          // Placeholder gradient for projects without images
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
        )}
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects-section"
      className="relative z-20 bg-gradient-to-b from-[#0a0e27] via-[#1a2a4a] to-[#0a0e27] pt-24 px-6 md:px-12 text-white"
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
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent uppercase">
            Selected Work
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl font-medium">
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