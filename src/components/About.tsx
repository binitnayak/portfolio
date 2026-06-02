'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Scroll-triggered animations for content card
    if (contentCardRef.current) {
      gsap.fromTo(
        contentCardRef.current,
        {
          opacity: 0,
          y: 50,
          rotateX: -10,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentCardRef.current,
            start: 'top center+=100',
            end: 'top center-=100',
            scrub: 0.5,
            once: true,
          },
        }
      );

      // Parallax effect for content card
      gsap.to(contentCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
        y: -40,
        ease: 'none',
      });
    }

    // Stagger animation for highlight cards
    if (highlightsRef.current.length > 0) {
      gsap.fromTo(
        highlightsRef.current.filter((el) => el !== null),
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out',
          stagger: {
            amount: 0.4,
            ease: 'power2.inOut',
          },
          scrollTrigger: {
            trigger: highlightsRef.current[0],
            start: 'top center+=50',
            end: 'top center-=100',
            scrub: false,
            once: true,
          },
        }
      );

      // Parallax for each highlight card with variation
      highlightsRef.current.forEach((card, idx) => {
        if (!card) return;
        const parallaxAmount = (idx % 3) * -15;

        gsap.to(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,
          },
          y: parallaxAmount,
          ease: 'none',
        });
      });
    }

    // Button scroll animation
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top center+=100',
            end: 'top center-=100',
            scrub: false,
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section 
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 px-6 md:px-12 text-white overflow-hidden flex items-center"
      style={{ perspective: '1000px' }}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium backdrop-blur-sm">
              About Me
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text">
            Who I Am
          </h2>
        </motion.div>

        {/* About Content */}
        <motion.div
          ref={contentCardRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass glass-hover p-8 md:p-12 rounded-2xl border border-white/5"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
            Hi, I'm <span className="font-bold text-white">Binit</span> — a <span className="text-blue-400 font-semibold">B.Tech Computer Science student</span> and a passionate <span className="text-purple-400 font-semibold">MERN Stack Developer</span>.
          </p>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            I enjoy building <span className="text-green-400 font-semibold">fast, scalable, and interactive web applications</span> using modern technologies. With a strong foundation in full-stack development, I focus on creating seamless user experiences combined with robust backend systems.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        >
          <div
            ref={(el) => {
              if (el) highlightsRef.current[0] = el;
            }}
            className="glass p-6 rounded-lg text-center hover:from-blue-500/20 hover:to-blue-500/10 transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">MERN</h3>
            <p className="text-sm text-gray-400">Full-Stack Development</p>
          </div>
          <div
            ref={(el) => {
              if (el) highlightsRef.current[1] = el;
            }}
            className="glass p-6 rounded-lg text-center hover:from-purple-500/20 hover:to-purple-500/10 transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">Modern</h3>
            <p className="text-sm text-gray-400">Latest Technologies</p>
          </div>
          <div
            ref={(el) => {
              if (el) highlightsRef.current[2] = el;
            }}
            className="glass p-6 rounded-lg text-center hover:from-green-500/20 hover:to-green-500/10 transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">Scalable</h3>
            <p className="text-sm text-gray-400">Performant Solutions</p>
          </div>
        </motion.div>

        {/* Download CV Button */}
        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center md:justify-start"
        >
          <motion.a
            href="/resume.pdf"
            download="Binit_Resume.pdf"
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
            }}
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
            />

            {/* Button content */}
            <div className="relative z-10 flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: -20, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <FiDownload size={20} />
              </motion.div>
              <span>Download CV</span>
              
              {/* Arrow icon with animation */}
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <FiArrowRight size={16} />
              </motion.div>
            </div>

            {/* Animated border on hover */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                borderImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5)) 1',
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
