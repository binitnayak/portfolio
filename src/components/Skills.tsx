'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGit,
} from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const skills = [
    { name: 'HTML', category: 'Frontend', icon: FaHtml5, color: 'from-orange-500 to-red-600', lightColor: 'text-orange-400' },
    { name: 'CSS', category: 'Frontend', icon: FaCss3Alt, color: 'from-blue-500 to-cyan-600', lightColor: 'text-blue-400' },
    { name: 'JavaScript', category: 'Frontend', icon: FaJs, color: 'from-yellow-400 to-yellow-600', lightColor: 'text-yellow-400' },
    { name: 'React', category: 'Frontend', icon: FaReact, color: 'from-cyan-400 to-blue-500', lightColor: 'text-cyan-400' },
    { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: 'from-gray-400 to-gray-600', lightColor: 'text-gray-300' },
    { name: 'Node.js', category: 'Backend', icon: FaNode, color: 'from-green-500 to-emerald-600', lightColor: 'text-green-400' },
    { name: 'Express', category: 'Backend', icon: SiExpress, color: 'from-gray-500 to-gray-700', lightColor: 'text-gray-400' },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: 'from-green-600 to-emerald-700', lightColor: 'text-green-500' },
    { name: 'Git', category: 'Tools', icon: FaGit, color: 'from-red-500 to-orange-600', lightColor: 'text-red-400' },
  ];

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    // Set initial state for cards
    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    // Create stagger animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'top center-=150',
        scrub: false,
        toggleActions: 'play none none reverse',
        once: true, // Play animation only once
      },
    });

    // Stagger animation for each card with premium feel
    tl.to(
      cardsRef.current,
      {
        duration: 0.7,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'expo.out',
        stagger: {
          amount: 0.5,
          ease: 'power2.inOut',
        },
        delay: 0.15, // Delay before animation starts for dramatic entry
      },
      0 // Start time in timeline
    );

    // Parallax effect - subtle individual card movement on scroll
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const parallaxAmount = (index % 3) * -8; // Vary parallax by card position
      
      gsap.to(card, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5, // Smooth parallax
          markers: false,
        },
        y: parallaxAmount,
        ease: 'none',
      });
    });

    return () => {
      tl.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Subtle Hover Effect
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLDivElement;
      const idx = cardsRef.current.indexOf(card);
      if (idx === -1) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate very subtle rotation based on cursor (max 4 degrees)
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      const rotateX = (y / (rect.height / 2)) * -4;
      const rotateY = (x / (rect.width / 2)) * 4;

      // Apply subtle transforms
      gsap.to(card, {
        scale: 1.04,
        y: -8,
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Subtle glow on hover
      const glowElement = glowRef.current[idx];
      if (glowElement) {
        gsap.to(glowElement, {
          opacity: 0.4,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLDivElement;
      const idx = cardsRef.current.indexOf(card);
      if (idx === -1) return;

      // Reset transforms smoothly
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Fade out glow
      const glowElement = glowRef.current[idx];
      if (glowElement) {
        gsap.to(glowElement, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    // Add listeners to each card
    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener('mouseenter', handleMouseEnter as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 px-6 md:px-12 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-sm">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            I leverage modern technologies and best practices to create exceptional digital experiences. Here's what I work with.
          </p>
        </motion.div>

        {/* Skills Grid - GSAP Animated */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16"
          style={{
            perspective: '800px',
          }}
        >
          {skills.map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className="group relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center',
                }}
              >
                {/* Animated card background */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{
                  background: `linear-gradient(135deg, ${skill.color})`
                }} />
                
                {/* 3D Glow effect */}
                <div
                  ref={(el) => {
                    if (el) glowRef.current[idx] = el;
                  }}
                  className="absolute inset-0 rounded-2xl opacity-0 blur-xl -z-10 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`,
                  }}
                />
                
                {/* Main card container */}
                <div className="relative z-10 h-full transition-all duration-300" style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}>
                  {/* Premium glass card */}
                  <div className="absolute inset-0 glass rounded-2xl group-hover:from-white/15 group-hover:to-white/5 transition-all duration-300 group-hover:border group-hover:border-white/20" style={{
                    boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.08)',
                  }} />
                  
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Content */}
                  <div className="relative z-20 h-40 flex flex-col justify-center items-center p-4 text-center">
                    {/* Icon with animation */}
                    <motion.div
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className={`mb-3 ${skill.lightColor} group-hover:drop-shadow-lg transition-all duration-300`}
                    >
                      <IconComponent size={48} />
                    </motion.div>
                    
                    {/* Skill name */}
                    <h3 className="text-sm md:text-base font-bold mb-1 group-hover:text-white transition-colors duration-300 tracking-tight">
                      {skill.name}
                    </h3>
                    
                    {/* Category badge */}
                    <motion.p
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                      className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 uppercase tracking-widest font-medium"
                    >
                      {skill.category}
                    </motion.p>
                  </div>
                  
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                  
                  {/* Bottom accent on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-b-2xl origin-left"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="section-divider mb-16"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="glass glass-hover p-8 rounded-2xl"
        >
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
            I'm constantly learning and exploring new technologies to stay at the forefront of web development. 
            Whether it's frontend frameworks, backend systems, or database design, I'm passionate about building 
            scalable, performant, and user-friendly applications. Let's build something amazing together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
