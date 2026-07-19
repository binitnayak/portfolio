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
import { SiNextdotjs, SiExpress, SiMongodb, SiPython, SiOpenai, SiGooglegemini } from 'react-icons/si';
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
  { name: 'Python', icon: SiPython, iconColor: 'text-yellow-300' },
  { name: 'OpenAI', icon: SiOpenai, iconColor: 'text-emerald-300' },
  { name: 'Gemini', icon: SiGooglegemini, iconColor: 'text-blue-300' },
];

const ROW_ONE = [...CHIPS, ...CHIPS];
const ROW_TWO = [...CHIPS.slice().reverse(), ...CHIPS.slice().reverse()];

const CATEGORY_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'Python'] },
  { label: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Node.js', 'Express'] },
  { label: 'Tools & Database', items: ['MongoDB', 'Git'] },
  { label: 'AI & GenAI', items: ['OpenAI API', 'Gemini API', 'Prompt Engineering'] },
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
            The technologies I reach for to build fast, full-stack products — and the AI/ML tools I use to make them smarter.
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