'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiDatabase, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Staggered Timeline Scroll Trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center+=200',
        end: 'bottom center',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    tl.fromTo('.about-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.about-card', { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out' }, '-=0.4')
      .fromTo('.about-terminal', { opacity: 0, x: 50, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'expo.out' }, '-=0.8')
      .fromTo('.about-highlight', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)', stagger: 0.15 }, '-=0.4')
      .fromTo('.about-button', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    // 2. 3D Hover Tilt Effects
    const setupTilt = (element: HTMLDivElement) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // max tilt -8deg
        const rotateY = ((x - centerX) / centerX) * 8;  // max tilt 8deg
        
        gsap.to(element, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.3,
          overwrite: 'auto',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.5,
          overwrite: 'auto',
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    let cleanCardTilt: (() => void) | undefined;
    let cleanTerminalTilt: (() => void) | undefined;

    if (cardRef.current) {
      cleanCardTilt = setupTilt(cardRef.current);
    }
    if (terminalRef.current) {
      cleanTerminalTilt = setupTilt(terminalRef.current);
    }

    // 3. Drifting Orbs Animation
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');
    let orbTween1: gsap.core.Tween | undefined;
    let orbTween2: gsap.core.Tween | undefined;

    if (orb1) {
      orbTween1 = gsap.to(orb1, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        duration: 'random(7, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    if (orb2) {
      orbTween2 = gsap.to(orb2, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        duration: 'random(7, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (cleanCardTilt) cleanCardTilt();
      if (cleanTerminalTilt) cleanTerminalTilt();
      if (orbTween1) orbTween1.kill();
      if (orbTween2) orbTween2.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 px-6 md:px-12 text-white overflow-hidden flex items-center"
      style={{ perspective: '1000px' }}
    >
      {/* Drifting Ambient Background Glow Orbs */}
      <div 
        id="orb-1" 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"
      ></div>
      <div 
        id="orb-2" 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"
      ></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="about-title mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium backdrop-blur-sm">
              About Me
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text">
            Who I Am
          </h2>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            <div
              ref={cardRef}
              className="about-card glass glass-hover p-8 md:p-10 rounded-2xl border border-white/5 transition-all duration-300 shadow-2xl relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Inner glowing accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6" style={{ transform: 'translateZ(20px)' }}>
                Hi, I'm <span className="font-bold text-white">Binit</span> — a <span className="text-blue-400 font-semibold">B.Tech Computer Science student</span> and a passionate <span className="text-purple-400 font-semibold">MERN Stack Developer</span>.
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
                I enjoy building <span className="text-green-400 font-semibold">fast, scalable, and interactive web applications</span> using modern technologies. With a strong foundation in full-stack development, I focus on creating seamless user experiences combined with robust backend systems.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Highlight 1 */}
              <div
                ref={(el) => {
                  if (el) highlightsRef.current[0] = el;
                }}
                className="about-highlight glass p-6 rounded-xl text-center hover:from-blue-500/20 hover:to-blue-500/10 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-blue-500/10 border border-white/5 hover:border-blue-500/30"
              >
                <div className="mx-auto w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  <FiDatabase size={24} />
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-1">MERN</h3>
                <p className="text-xs text-gray-400">Full-Stack Development</p>
              </div>

              {/* Highlight 2 */}
              <div
                ref={(el) => {
                  if (el) highlightsRef.current[1] = el;
                }}
                className="about-highlight glass p-6 rounded-xl text-center hover:from-purple-500/20 hover:to-purple-500/10 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-purple-500/10 border border-white/5 hover:border-purple-500/30"
              >
                <div className="mx-auto w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <FiCpu size={24} />
                </div>
                <h3 className="text-xl font-bold text-purple-400 mb-1">Modern</h3>
                <p className="text-xs text-gray-400">Latest Technologies</p>
              </div>

              {/* Highlight 3 */}
              <div
                ref={(el) => {
                  if (el) highlightsRef.current[2] = el;
                }}
                className="about-highlight glass p-6 rounded-xl text-center hover:from-green-500/20 hover:to-green-500/10 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-green-500/10 border border-white/5 hover:border-green-500/30"
              >
                <div className="mx-auto w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
                  <FiTrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-1">Scalable</h3>
                <p className="text-xs text-gray-400">Performant Solutions</p>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Code IDE Terminal */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div
              ref={terminalRef}
              className="about-terminal w-full rounded-2xl overflow-hidden border border-white/10 bg-[#070b22]/90 backdrop-blur-md shadow-2xl flex flex-col font-mono text-xs text-gray-300 relative group transition-all duration-300 hover:shadow-purple-500/5"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Window Header */}
              <div className="bg-[#0c102a] px-4 py-3.5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] text-gray-500 select-none">binit_dev.ts — Visual Studio Code</div>
                <div className="w-12"></div>
              </div>

              {/* Files tab bar */}
              <div className="bg-[#090d21] px-4 py-2 border-b border-white/5 flex gap-4 text-[10px] text-gray-400 select-none">
                <div className="flex items-center gap-1.5 text-blue-400 border-b border-blue-500 pb-1.5 px-1 -mb-2">
                  <span className="text-[#3178c6] font-bold">TS</span> binit_dev.ts
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-[#e34c26] font-bold">HTML</span> index.html
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-[#f1e05a] font-bold">JS</span> tailwind.config.js
                </div>
              </div>

              {/* Editor Code Content */}
              <div className="p-6 overflow-x-auto flex-1 leading-relaxed select-none bg-[#070919] min-h-[300px]">
                <div className="flex gap-4">
                  
                  {/* Line numbers */}
                  <div className="text-gray-600 text-right select-none pr-3 border-r border-white/5 space-y-1">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                  </div>

                  {/* Syntax Highlighted Code block */}
                  <div className="flex-1 whitespace-pre space-y-1 text-[11px] md:text-xs">
                    <div>
                      <span className="text-pink-500">import</span> &#123; <span className="text-blue-400">Developer</span> &#125; <span className="text-pink-500">from</span> <span className="text-emerald-300">'creative-coder'</span>;
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-pink-500">const</span> <span className="text-purple-400">binit</span> = <span className="text-pink-500">new</span> <span className="text-blue-400">Developer</span>(&#123;
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">name:</span> <span className="text-emerald-300">'Binit'</span>,
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">role:</span> <span className="text-emerald-300">'MERN Stack Developer'</span>,
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">education:</span> <span className="text-emerald-300">'B.Tech in CSE'</span>,
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">cgpa:</span> <span className="text-amber-400">8.09</span>,
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">location:</span> <span className="text-emerald-300">'India'</span>
                    </div>
                    <div>
                      &#125;);
                    </div>
                    <div>&nbsp;</div>
                    <div>
                      <span className="text-purple-400">binit</span>.<span className="text-yellow-400">build</span>(&#123;
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">frontend:</span> [<span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'Next.js'</span>, <span className="text-emerald-300">'Tailwind'</span>],
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">backend:</span> [<span className="text-emerald-300">'Node.js'</span>, <span className="text-emerald-300">'Express'</span>, <span className="text-emerald-300">'MongoDB'</span>],
                    </div>
                    <div>
                      &nbsp;&nbsp;<span className="text-gray-400">animations:</span> [<span className="text-emerald-300">'GSAP'</span>, <span className="text-emerald-300">'FramerMotion'</span>]
                    </div>
                    <div>
                      &#125;);<span className="w-1.5 h-3.5 bg-blue-500 inline-block ml-1 animate-pulse vertical-align-middle"></span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Download Resume Button */}
        <div ref={buttonRef} className="about-button mt-16 flex justify-center lg:justify-start">
          <a
            href="/resume.pdf"
            download="Binit_Resume.pdf"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            }}
          >
            {/* Hover sliding bg glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
        </div>

      </div>
    </section>
  );
}
