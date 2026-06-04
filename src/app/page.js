'use client';

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// ============================================================
// DESIGN TOKENS — edit these to retheme the whole portfolio
// ============================================================
const THEME = {
  accent1: '#a78bfa',   // purple
  accent2: '#38bdf8',   // sky blue
  accent3: '#f472b6',   // pink
  glass: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.12)',
  glassHover: 'rgba(255,255,255,0.10)',
};

// ============================================================
// GLOBAL STYLES (inject once)
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --accent1: ${THEME.accent1};
      --accent2: ${THEME.accent2};
      --accent3: ${THEME.accent3};
      --glass: ${THEME.glass};
      --glass-border: ${THEME.glassBorder};
      --glass-hover: ${THEME.glassHover};
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: #050508;
      color: #e2e8f0;
      font-family: var(--font-body);
      overflow-x: hidden;
    }

    /* Liquid glass utility */
    .glass {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
    }

    .glass:hover {
      background: var(--glass-hover);
      border-color: rgba(167,139,250,0.3);
    }

    /* Gradient text utility */
    .grad-text {
      background: linear-gradient(135deg, var(--accent1), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0a0a0f; }
    ::-webkit-scrollbar-thumb { background: var(--accent1); border-radius: 2px; }

    /* Section spacing */
    section { padding: 7rem 1.5rem; }

    /* Smooth anchor offset */
    [id] { scroll-margin-top: 80px; }
  `}</style>
);

// ============================================================
// BACKGROUND — animated orbs + noise grain
// ============================================================
const Background = () => (
  <>
    <style>{`
      .bg-orb {
        position: fixed;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.18;
        pointer-events: none;
        z-index: 0;
        animation: drift 18s ease-in-out infinite alternate;
      }
      @keyframes drift {
        0%   { transform: translate(0, 0) scale(1); }
        50%  { transform: translate(40px, -30px) scale(1.1); }
        100% { transform: translate(-20px, 20px) scale(0.95); }
      }
      .grain {
        position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 200px;
      }
    `}</style>
    <div className="bg-orb" style={{ width: 700, height: 700, background: THEME.accent1, top: '-15%', left: '-10%', animationDelay: '0s' }} />
    <div className="bg-orb" style={{ width: 500, height: 500, background: THEME.accent2, top: '40%', right: '-5%', animationDelay: '-6s' }} />
    <div className="bg-orb" style={{ width: 400, height: 400, background: THEME.accent3, bottom: '10%', left: '30%', animationDelay: '-12s' }} />
    <div className="grain" />
  </>
);

// ============================================================
// REUSABLE: ScrollReveal — wraps any content with fade+slide
// Props: delay (seconds), direction ('up'|'left'|'right'), once (bool)
// ============================================================
export const ScrollReveal = ({ children, delay = 0, direction = 'up', once = false, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.25 });
  const offsets = { up: { y: 30 }, left: { x: -30 }, right: { x: 30 } };
  const hidden = { opacity: 0, ...offsets[direction] };
  const visible = { opacity: 1, y: 0, x: 0 };
  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================
// REUSABLE: GlassCard — liquid glass container
// Props: children, className, hover (bool), onClick
// ============================================================
export const GlassCard = ({ children, className = '', hover = true, onClick, style = {} }) => (
  <motion.div
    className={`glass rounded-2xl ${className}`}
    style={{ position: 'relative', overflow: 'hidden', ...style }}
    whileHover={hover ? { y: -6, scale: 1.01, borderColor: 'rgba(167,139,250,0.4)' } : {}}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    onClick={onClick}
  >
    {/* inner glow */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
      background: 'radial-gradient(circle at 30% 20%, rgba(167,139,250,0.08) 0%, transparent 60%)',
    }} />
    {children}
  </motion.div>
);

// ============================================================
// REUSABLE: Tag / Badge
// ============================================================
export const Tag = ({ label }) => (
  <span style={{
    padding: '4px 12px', fontSize: '0.7rem', fontFamily: 'var(--font-body)',
    background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)',
    borderRadius: 999, color: '#c4b5fd', letterSpacing: '0.05em',
    backdropFilter: 'blur(8px)',
  }}>
    {label}
  </span>
);

// ============================================================
// REUSABLE: SectionHeader
// ============================================================
export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <ScrollReveal>
    <div style={{ marginBottom: '4rem' }}>
      {eyebrow && (
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: THEME.accent1, marginBottom: '0.75rem' }}>
          — {eyebrow}
        </p>
      )}
      <h2 className="grad-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#94a3b8', maxWidth: 480, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  </ScrollReveal>
);

// ============================================================
// REUSABLE: ProjectCard
// ============================================================
export const ProjectCard = ({ title, description, tags = [], demo, github, image }) => (
  <GlassCard style={{
    cursor: 'default', height: 420,
    display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden',
  }}>
    {/* Image — inset with margin so it never bleeds into the border */}
    {image && (
      <div style={{ height: 180, flexShrink: 0, overflow: 'hidden', margin: '12px 12px 0', borderRadius: 10 }}>
        <motion.img
          src={image} alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    )}
    {/* Content area — flex column so tags always pin to bottom */}
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding: '1.25rem 1.5rem 1.5rem', gap: '0.5rem', overflow: 'hidden',
    }}>
      {/* Title + link buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>
          {title}
        </h3>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {github && (
            <motion.a href={github} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: '#94a3b8', textDecoration: 'none', padding: '5px 10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, whiteSpace: 'nowrap' }}
              whileHover={{ color: '#f1f5f9', borderColor: 'rgba(255,255,255,0.3)' }}>
              GitHub ↗
            </motion.a>
          )}
          {demo && (
            <motion.a href={demo} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: THEME.accent1, textDecoration: 'none', padding: '5px 10px', border: `1px solid ${THEME.accent1}40`, borderRadius: 8, whiteSpace: 'nowrap', background: 'rgba(167,139,250,0)' }}
              whileHover={{ background: 'rgba(167,139,250,0.12)' }}>
              Demo ↗
            </motion.a>
          )}
        </div>
      </div>
      {/* Description — clamps to 3 lines so all cards stay same height */}
      <p style={{
        color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7,
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {description}
      </p>
      {/* Tags — pushed to the bottom via marginTop auto */}
      <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tags.map(t => <Tag key={t} label={t} />)}
      </div>
    </div>
  </GlassCard>
);

// ============================================================
// REUSABLE: PictureCard — for photo / image galleries
// ============================================================
export const PictureCard = ({ src, alt, caption, aspectRatio = '4/3' }) => (
  <GlassCard className="overflow-hidden" style={{ padding: 0 }}>
    <div style={{ aspectRatio, overflow: 'hidden' }}>
      <motion.img
        src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
    {caption && (
      <div style={{ padding: '0.75rem 1rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{caption}</p>
      </div>
    )}
  </GlassCard>
);

// ============================================================
// REUSABLE: BlogCard
// ============================================================
export const BlogCard = ({ title, excerpt, date, readTime, tags = [], href = '#', coverImage }) => (
  <GlassCard className="p-0 overflow-hidden" style={{ cursor: 'pointer' }} onClick={() => window.open(href, '_blank')}>
    {coverImage && (
      <div style={{ height: 180, overflow: 'hidden' }}>
        <motion.img src={coverImage} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} />
      </div>
    )}
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {tags.map(t => <Tag key={t} label={t} />)}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem', lineHeight: 1.4 }}>
        {title}
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{excerpt}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
        <span>{date}</span>
        <span>{readTime}</span>
      </div>
    </div>
  </GlassCard>
);

// ============================================================
// REUSABLE: SkillOrb — scrolling ticker skill icon
// ============================================================
const SkillOrb = ({ name, icon }) => (
  <motion.div
    className="glass"
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 20px', borderRadius: 999,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}
    whileHover={{ scale: 1.08, borderColor: THEME.accent1 }}
    transition={{ duration: 0.2 }}
  >
    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#cbd5e1' }}>{name}</span>
  </motion.div>
);

// ============================================================
// REUSABLE: SkillsTicker — horizontal infinite scroll ticker
// ============================================================
export const SkillsTicker = ({ skills }) => {
  const doubled = [...skills, ...skills];
  return (
    /* Outer: clips horizontally only, leaves vertical room for hover lift */
    <div style={{ position: 'relative', width: '100%', overflowX: 'clip', overflowY: 'visible' }}>
      {/* fade edge — left */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: 'linear-gradient(to right, #050508, transparent)',
        pointerEvents: 'none',
      }} />
      {/* fade edge — right */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: 'linear-gradient(to left, #050508, transparent)',
        pointerEvents: 'none',
      }} />
      {/* Extra vertical padding so scale(1.08) never gets clipped on top */}
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <motion.div
          style={{ display: 'flex', gap: 12 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((skill, i) => <SkillOrb key={i} {...skill} />)}
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// REUSABLE: EducationCard
// ============================================================
export const EducationCard = ({ school, degree, period, description }) => (
  <GlassCard style={{ padding: '1.5rem 1.75rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9' }}>{school}</h3>
      <span style={{ fontSize: '0.75rem', color: '#475569', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 999, flexShrink: 0 }}>{period}</span>
    </div>
    <p style={{ color: THEME.accent1, fontSize: '0.88rem', marginBottom: description ? '0.55rem' : 0 }}>{degree}</p>
    {description && <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.7 }}>{description}</p>}
  </GlassCard>
);

// ============================================================
// REUSABLE: ContactButton
// ============================================================
export const ContactButton = ({ label, href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="glass"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '12px 24px', borderRadius: 12,
      color: '#e2e8f0', textDecoration: 'none',
      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    }}
    whileHover={{ scale: 1.05, borderColor: THEME.accent1, color: THEME.accent1 }}
    whileTap={{ scale: 0.97 }}
  >
    {icon && <span style={{ fontSize: '1.1rem' }}>{icon}</span>}
    {label}
  </motion.a>
);

// ============================================================
// HERO PARALLAX TEXT
// ============================================================
const ParallaxText = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  return (
    <motion.div style={{ y: springY }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#475569', marginBottom: '1.5rem' }}>
        — available for projects ✦
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 800, lineHeight: 1.0, marginBottom: '1.5rem' }}>
        Hey, I'm{''}
        <span className="grad-text">Neang<br/>Sokdara</span>
      </h1>
    </motion.div>
  );
};

// ============================================================
// DATA — edit these arrays freely
// ============================================================
const PROJECTS = [
  {
    title: 'Project Alpha',
    description: 'A cutting-edge web application showcasing modern full-stack development practices with exceptional user experience design.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    demo: '#', github: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    title: 'Project Beta',
    description: 'Full-stack e-commerce platform with real-time inventory management, payment processing, and analytics.',
    tags: ['React', 'Node.js', 'Stripe'],
    demo: '#', github: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    title: 'Project Gamma',
    description: 'Collaborative project management tool with real-time updates and task automation.',
    tags: ['Next.js', 'WebSocket', 'Firebase'],
    demo: '#', github: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
];

const SKILLS = [
  { name: 'JavaScript', icon: '✨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🗄️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Figma', icon: '🖌️' },
  { name: 'Docker', icon: '🐳' },
];

const PICTURES = [
  { src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80', alt: 'coding setup', caption: 'My workspace' },
  { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80', alt: 'laptop code', caption: 'Late night sessions' },
  { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt: 'macbook code', caption: 'Building things' },
];

const BLOGS = [
  {
    title: 'Why I switched from CRA to Next.js and never looked back',
    excerpt: 'A deep dive into the performance gains, DX improvements, and the few gotchas I hit along the way.',
    date: 'May 2025', readTime: '5 min read',
    tags: ['Next.js', 'React'],
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  },
  {
    title: 'Liquid Glass UI: building the effect from scratch',
    excerpt: 'How to use backdrop-filter, CSS variables, and layered gradients to create a truly glass-like interface.',
    date: 'Apr 2025', readTime: '8 min read',
    tags: ['CSS', 'Design'],
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    title: 'TypeScript patterns I use every single day',
    excerpt: 'Utility types, discriminated unions, and template literal types — the patterns that actually matter.',
    date: 'Mar 2025', readTime: '6 min read',
    tags: ['TypeScript'],
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80',
  },
];

const EDUCATION = [
  { school: 'Your University', degree: 'BSc Computer Science', period: '2020 – 2024', description: 'Focus on distributed systems and human-computer interaction.' },
  { school: 'Coding Bootcamp', degree: 'Full Stack Web Development', period: '2023', description: 'Intensive 12-week program covering modern web stack.' },
];

// ============================================================
// NAVIGATION
// ============================================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(5,5,8,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.span
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, cursor: 'pointer' }}
          className="grad-text"
          whileHover={{ scale: 1.06 }}
        >
          rawh
        </motion.span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['projects', 'skills', 'photos', 'blog', 'contact'].map(id => (
            <motion.a
              key={id}
              href={`#${id}`}
              style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'capitalize' }}
              whileHover={{ color: '#f1f5f9', y: -1 }}
              transition={{ duration: 0.15 }}
            >
              {id}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// ============================================================
// PAGE
// ============================================================
export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Background />
      <Nav />

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>
          <div>
            <ParallaxText />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 500, marginBottom: '2.5rem' }}
            >
              I love building beautiful, fast web applications. A year 4 student at Setec Institute pursuing a degree in Management Information Systems. Currently open to new opportunities and collaborations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <motion.a href="#projects"
                style={{
                  padding: '13px 28px', borderRadius: 12, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9rem',
                  background: `linear-gradient(135deg, ${THEME.accent1}, ${THEME.accent2})`,
                  color: '#fff', textDecoration: 'none', border: 'none', cursor: 'pointer',
                }}
                whileHover={{ scale: 1.04, opacity: 0.92 }} whileTap={{ scale: 0.97 }}>
                View My Work
              </motion.a>
              <motion.a href="#contact"
                className="glass"
                style={{ padding: '13px 28px', borderRadius: 12, fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#e2e8f0', textDecoration: 'none' }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Get In Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Hero card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'none' }}
            className="md-show"
          >
            <GlassCard style={{ width: 280, height: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }} hover={false}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: `linear-gradient(135deg, ${THEME.accent1}40, ${THEME.accent2}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: `1px solid ${THEME.accent1}30` }}>
                👨‍💻
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Your Name</p>
              <Tag label="Open to work" />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader eyebrow="selected work" title="Projects" subtitle="Things I've built and shipped." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <ProjectCard {...p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS TICKER ── */}
      <section id="skills" style={{ position: 'relative', zIndex: 2, paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <SectionHeader eyebrow="toolbox" title="Skills & Tech" subtitle="Technologies I reach for day-to-day." />
        </div>
        <ScrollReveal>
          <SkillsTicker skills={SKILLS} />
        </ScrollReveal>
        <div style={{ marginTop: '1.5rem' }}>
          <ScrollReveal delay={0.1}>
            <SkillsTicker skills={[...SKILLS].reverse()} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader eyebrow="life outside code" title="Photos" subtitle="A few frames from my world." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {PICTURES.map((pic, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <PictureCard {...pic} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader eyebrow="writing" title="Blog" subtitle="Thoughts on code, design, and building things." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {BLOGS.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <BlogCard {...b} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader eyebrow="background" title="Education" subtitle="Where I've been learning." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {EDUCATION.map((e, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <EducationCard {...e} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: THEME.accent1, marginBottom: '1rem' }}>— say hello</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Let's build<br /><span className="grad-text">something great.</span>
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Open to freelance projects, collaborations, and full-time opportunities.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
              <ContactButton label="Email" href="mailto:you@example.com" icon="✉️" />
              <ContactButton label="GitHub" href="https://github.com" icon="🐙" />
              <ContactButton label="LinkedIn" href="https://linkedin.com" icon="💼" />
              <ContactButton label="Twitter" href="https://twitter.com" icon="🐦" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p style={{ color: '#334155', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
          © 2025 Your Name · Built with Next.js, Framer Motion & too much ☕
        </p>
      </footer>
    </>
  );
}