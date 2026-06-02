'use client';

import { motion } from 'framer-motion';

const projects = [
  { title: 'Project One', category: 'WebGL Experience', description: 'Interactive 3D visualization with smooth animations' },
  { title: 'Project Two', category: 'E-commerce Platform', description: 'Full-stack solution with real-time updates' },
  { title: 'Project Three', category: 'Brand Identity', description: 'Modern design system and component library' },
  { title: 'Project Four', category: 'Mobile App', description: 'Cross-platform mobile application' },
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section 
      id="projects-section"
      className="relative z-20 bg-gradient-to-b from-[#0a0e27] via-[#111a3d] to-[#0a0e27] py-24 px-6 md:px-12 text-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 gradient-text">Selected Work</h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            A collection of recent projects showcasing my expertise in full-stack development and modern web technologies.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Premium glass background */}
              <div className="absolute inset-0 glass" />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/15 group-hover:to-purple-500/15 transition-all duration-700" />
              
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                padding: '1px'
              }} />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 transition-all duration-500">
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3 group-hover:text-blue-300 transition-colors"
                  >
                    {proj.category}
                  </motion.p>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 mt-4">
                    {proj.description}
                  </p>
                </div>
                
                {/* Arrow icon */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-gray-400 group-hover:text-blue-300 transition-colors duration-300"
                >
                  <span className="text-sm font-medium">View Project</span>
                  <motion.div
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M7 17L17 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
