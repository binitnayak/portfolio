import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      {/* Hero / Scrollytelling Section */}
      <section className="relative">
        <ScrollyCanvas />
        <Overlay />
      </section>
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Work Grid */}
      <Projects />
      
      {/* Contact Section */}
      <Contact />
    </main>
  );
}
