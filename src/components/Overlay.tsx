'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 45%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 55% to 75%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-[500vh] w-full pointer-events-none z-10 text-white">
      {/* Container for sticky positioning of text */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium backdrop-blur-sm">Welcome to my portfolio</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
            <span className="text-white">Hi, I&apos;m Binit</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-blue-300 font-semibold mb-4 tracking-wide">MERN Stack Developer</p>
          
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed mb-8">
            I build fast, scalable, and interactive web applications with modern technologies.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 flex-wrap justify-center pointer-events-auto"
          >
            <button 
              onClick={() => {
                const projectsSection = document.getElementById('projects-section');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              View My Work
            </button>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact-section');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-lg border border-gray-500 hover:border-white bg-transparent hover:bg-white/5 text-white font-semibold transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-white/20"
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
            <span className="gradient-text">I build</span> digital experiences that matter.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
            Focusing on fluid animations, high performance, and memorable user interactions. Every pixel crafted with precision.
          </p>
          <motion.div className="mt-8 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <p className="text-sm text-gray-400">Specializing in React, Next.js & Full Stack Development</p>
          </motion.div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
            <span className="gradient-text">Bridging design and engineering.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg ml-auto leading-relaxed">
            Where creative vision meets technical excellence. I transform ideas into beautiful, functional, and scalable solutions.
          </p>
          <motion.div className="mt-8 flex gap-2 justify-end">
            <p className="text-sm text-gray-400">Passionate about Clean Code & User Experience</p>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
