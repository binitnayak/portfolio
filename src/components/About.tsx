'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

const BIO =
  "I enjoy building fast, scalable, and interactive web applications — blending clean UI with robust backend systems, and integrating AI/ML to make products smarter, from GenAI-powered features to data-driven tools.";

const QUICK_FACTS: { label: string; value: string }[] = [
  { label: 'Role', value: 'MERN Stack Developer' },
  { label: 'Focus', value: 'AI/ML Web Apps' },
  { label: 'Education', value: 'B.Tech, CSE' },
  { label: 'CGPA', value: '8.09' },
  { label: 'Location', value: 'India' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Panel 1: eyebrow + "Who I Am" heading
  const op1 = useTransform(scrollYProgress, [0, 0.06, 0.22, 0.28], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [40, -60]);

  // Panel 2: bio line
  const op2 = useTransform(scrollYProgress, [0.22, 0.28, 0.5, 0.56], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.56], [60, -60]);

  // Panel 3: quick facts
  const op3 = useTransform(scrollYProgress, [0.5, 0.56, 0.76, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.82], [60, -60]);

  // Panel 4: signature code line + download CV (stays visible to the end)
  const op4 = useTransform(scrollYProgress, [0.76, 0.84, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.76, 1], [60, 0]);

  return (
    <section id="about-section" className="relative z-20">
      <div ref={containerRef} className="relative h-[320vh] bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27]">
        <div className="sticky top-0 h-screen w-full overflow-hidden text-white">
          {/* Ambient drifting glow orbs */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[8%] w-96 h-96 bg-purple-500/10 rounded-full blur-[110px] -z-10 pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -35, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/4 right-[8%] w-96 h-96 bg-blue-500/10 rounded-full blur-[110px] -z-10 pointer-events-none"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-pink-500/5 rounded-full blur-[130px] -z-10" />

          {/* Faint grid texture, consistent with Skills/Projects */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Panel 1: Heading */}
          <motion.div
            style={{ opacity: op1, y: y1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <span className="inline-block mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium backdrop-blur-sm">
              About Me
            </span>
            <h2
              className="font-black uppercase tracking-tight gradient-text leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
            >
              Who I Am
            </h2>
          </motion.div>

          {/* Panel 2: Bio */}
          <motion.div
            style={{ opacity: op2, y: y2 }}
            className="absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none"
          >
            <p className="max-w-3xl text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-gray-100">
              Hi, I&apos;m <span className="gradient-text font-bold">Binit</span> — a{' '}
              <span className="text-blue-400 font-semibold">B.Tech CSE student</span>, a{' '}
              <span className="text-purple-400 font-semibold">MERN Stack Developer</span>, and I build{' '}
              <span className="text-emerald-400 font-semibold">AI/ML-powered web apps</span>.
            </p>
          </motion.div>

          {/* Panel 3: Bio detail + Quick facts */}
          <motion.div
            style={{ opacity: op3, y: y3 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-center px-6 pointer-events-none"
          >
            <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed">{BIO}</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {QUICK_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5"
                >
                  <span className="text-[11px] uppercase tracking-widest text-gray-500">{fact.label}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span className="text-sm font-semibold text-gray-200">{fact.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Panel 4: Signature snippet + Download CV */}
          <motion.div
            style={{ opacity: op4, y: y4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
          >
            <div className="w-full max-w-xl rounded-2xl overflow-hidden border border-white/10 bg-[#080b1f]/80 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1230]/90 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="flex-1 text-center text-[11px] text-gray-500 font-mono">binit.ts</span>
                <div className="w-10" />
              </div>
              <div className="px-5 py-4 font-mono text-xs md:text-sm text-left overflow-x-auto">
                <div>
                  <span className="text-violet-400">const</span> <span className="text-purple-300">binit</span> = {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">stack:</span> <span className="text-emerald-300">&quot;MERN + AI/ML&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">tools:</span> [<span className="text-emerald-300">&quot;OpenAI&quot;</span>,{' '}
                  <span className="text-emerald-300">&quot;Gemini&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">mindset:</span>{' '}
                  <span className="text-emerald-300">&quot;ship fast, ship clean&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">open_to:</span> <span className="text-emerald-300">&quot;opportunities&quot;</span>
                </div>
                <div>
                  {'}'}
                  <span className="w-1.5 h-3.5 bg-blue-400 inline-block ml-1 cursor-blink align-middle" />
                </div>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download="Binit_Resume.pdf"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-2">
                <span className="group-hover:rotate-[-20deg] group-hover:-translate-y-0.5 transition-transform duration-300">
                  <FiDownload size={20} />
                </span>
                <span>Download CV</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  <FiArrowRight size={16} />
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}