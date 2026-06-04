'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollInView = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};



export default function Home() {
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

  const projects = [
    {
      title: 'Project Alpha',
      description: 'A cutting-edge web application showcasing modern full-stack development practices with exceptional user experience design.',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      demo: '#',
      github: '#',
    },
    {
      title: 'Project Beta',
      description: 'Full-stack e-commerce platform with real-time inventory management, payment processing, and advanced analytics dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      demo: '#',
      github: '#',
    },
    {
      title: 'Project Gamma',
      description: 'Collaborative project management tool with real-time updates, team communication, and task automation features.',
      tags: ['Next.js', 'WebSocket', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      demo: '#',
      github: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed w-full top-0 z-50 backdrop-blur-md bg-black/80 border-b border-zinc-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h2
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            {'<'}YourName{'>'}
          </motion.h2>
          <div className="flex gap-8">
            <motion.a href="#projects" className="hover:text-zinc-400" whileHover={{ scale: 1.1 }}>
              Projects
            </motion.a>
            <motion.a href="#skills" className="hover:text-zinc-400" whileHover={{ scale: 1.1 }}>
              Skills
            </motion.a>
            <motion.a href="#contact" className="hover:text-zinc-400" whileHover={{ scale: 1.1 }}>
              Contact
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <p className="text-zinc-500 text-sm mb-4">— npm install -g coffee@latest ☕</p>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Your Name</span>
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  I'm a full-stack developer passionate about building modern web applications. I love exploring new technologies and creating exceptional user experiences.
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="#projects"
                    className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.a>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="w-full aspect-square bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <ScrollInView>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
            <p className="text-zinc-400 mb-16">Here are some of my recent works</p>
          </ScrollInView>
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group p-8 bg-black border border-zinc-800 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-400 mb-4">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
                      className="text-zinc-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      whileHover={{ scale: 1.2 }}
                    >
                      Demo
                    </motion.a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollInView>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-zinc-400 mb-16">Tools and technologies I work with</p>
          </ScrollInView>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              { name: 'JavaScript', icon: '✨' },
              { name: 'React', icon: '⚛️' },
              { name: 'Next.js', icon: '▲' },
              { name: 'TypeScript', icon: '🔷' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'PostgreSQL', icon: '🗄️' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'Tailwind CSS', icon: '🎨' },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-cyan-500/50 text-center group hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{skill.icon}</div>
                <p className="font-semibold group-hover:text-cyan-400 transition-colors">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <ScrollInView>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
            <p className="text-zinc-400 mb-16">My learning journey</p>
          </ScrollInView>
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {[
              {
                school: 'Your University',
                degree: 'Bachelor of Science in Computer Science',
                period: '2020 - 2024',
              },
              {
                school: 'Coding Bootcamp',
                degree: 'Full Stack Web Development',
                period: '2023 - 2023',
              },
              {
                school: 'Online Courses',
                degree: 'Advanced React & Next.js',
                period: '2022 - Present',
              },
            ].map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-black border border-zinc-800 rounded-lg hover:border-cyan-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{edu.school}</h3>
                  <span className="text-zinc-500 text-sm">{edu.period}</span>
                </div>
                <p className="text-cyan-400">{edu.degree}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollInView>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </ScrollInView>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {[
              { label: 'Email', href: 'mailto:your-email@example.com' },
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Twitter', href: 'https://twitter.com' },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-8 px-6 border-t border-zinc-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-zinc-500 text-sm">
            © 2024 Your Name. Built with Next.js, Tailwind CSS, and Framer Motion. ☕
          </p>
          <p className="text-center text-zinc-600 text-xs mt-2">
            Inspired by modern design aesthetics and clean code principles
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
