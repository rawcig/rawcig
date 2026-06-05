'use client';

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const THEME = {
  accent1: '#a78bfa',
  accent2: '#38bdf8',
  accent3: '#f472b6',
  glass: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.12)',
  glassHover: 'rgba(255,255,255,0.10)',
};

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
    body { background: #050508; color: #e2e8f0; font-family: var(--font-body); overflow-x: hidden; }
    .glass { background: var(--glass); border: 1px solid var(--glass-border); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); }
    .glass:hover { background: var(--glass-hover); border-color: rgba(211,196,255,0.3); }
    .grad-text { background: linear-gradient(135deg, var(--accent1), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: #0a0a0f; }
    ::-webkit-scrollbar-thumb { background: var(--accent1); border-radius: 2px; }
    section { padding: 7rem 1.5rem; }
    [id] { scroll-margin-top: 80px; }
  `}</style>
);

const Background = () => (
  <>
    <style>{`
      .bg-orb { position: fixed; border-radius: 50%; filter: blur(120px); opacity: 0.18; pointer-events: none; z-index: 0; animation: drift 18s ease-in-out infinite alternate; }
      @keyframes drift { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } 100% { transform: translate(-20px,20px) scale(0.95); } }
      .grain { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
    `}</style>
    <div className="bg-orb" style={{ width:700, height:700, background:THEME.accent1, top:'-15%', left:'-10%', animationDelay:'0s' }} />
    <div className="bg-orb" style={{ width:500, height:500, background:THEME.accent2, top:'40%', right:'-5%', animationDelay:'-6s' }} />
    <div className="bg-orb" style={{ width:400, height:400, background:THEME.accent3, bottom:'10%', left:'30%', animationDelay:'-12s' }} />
    <div className="grain" />
  </>
);

export const ScrollReveal = ({ children, delay=0, direction='up', once=false, className='' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount:0.25 });
  const offsets = { up:{y:30}, left:{x:-30}, right:{x:30} };
  const hidden = { opacity:0, ...offsets[direction] };
  const visible = { opacity:1, y:0, x:0 };
  return (
    <motion.div ref={ref} initial={hidden} animate={isInView ? visible : hidden} transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }} className={className}>
      {children}
    </motion.div>
  );
};

export const GlassCard = ({ children, className='', hover=true, onClick, style={} }) => (
  <motion.div
    className={`glass rounded-2xl ${className}`}
    style={{ position:'relative', overflow:'hidden', ...style }}
    whileHover={hover ? { y:-6, scale:1.01, borderColor:'rgba(167,139,250,0.4)' } : {}}
    transition={{ duration:0.1, ease:'easeInOut' }}
    onClick={onClick}
  >
    <div style={{ position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none', background:'radial-gradient(circle at 30% 20%, rgba(167,139,250,0.08) 0%, transparent 60%)' }} />
    {children}
  </motion.div>
);

export const Tag = ({ label }) => (
  <span style={{ padding:'4px 12px', fontSize:'0.7rem', fontFamily:'var(--font-body)', background:'rgba(167,139,250,0.12)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:999, color:'#c4b5fd', letterSpacing:'0.05em', backdropFilter:'blur(8px)' }}>
    {label}
  </span>
);

export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <ScrollReveal>
    <div style={{ marginBottom:'4rem' }}>
      {eyebrow && <p style={{ fontSize:'0.75rem', letterSpacing:'0.2em', textTransform:'uppercase', color:THEME.accent1, marginBottom:'0.75rem' }}>— {eyebrow}</p>}
      <h2 className="grad-text" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 6vw, 4rem)', fontWeight:800, lineHeight:1.1, marginBottom:'1rem' }}>{title}</h2>
      {subtitle && <p style={{ color:'#94a3b8', maxWidth:480, lineHeight:1.7 }}>{subtitle}</p>}
    </div>
  </ScrollReveal>
);

export const ProjectCard = ({ title, description, tags=[], demo, github, image }) => (
  <GlassCard style={{ cursor:'default', height:420, display:'flex', flexDirection:'column', padding:0, overflow:'hidden' }}>
    {image && (
      <div style={{ height:180, flexShrink:0, overflow:'hidden', margin:'12px 12px 0', borderRadius:10 }}>
        <motion.img src={image} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} whileHover={{ scale:1.05 }} transition={{ duration:0.4 }} />
      </div>
    )}
    <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'1.25rem 1.5rem 1.5rem', gap:'0.5rem', overflow:'hidden' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.75rem' }}>
        <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'#f1f5f9', lineHeight:1.3 }}>{title}</h3>
        <div style={{ display:'flex', gap:6, flexShrink:0 }}>
          {github && <motion.a href={github} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.72rem', color:'#94a3b8', textDecoration:'none', padding:'5px 10px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, whiteSpace:'nowrap' }} whileHover={{ color:'#f1f5f9', borderColor:'rgba(255,255,255,0.3)' }}>GitHub ↗</motion.a>}
          {demo && <motion.a href={demo} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.72rem', color:THEME.accent1, textDecoration:'none', padding:'5px 10px', border:`1px solid ${THEME.accent1}40`, borderRadius:8, whiteSpace:'nowrap', background:'rgba(167,139,250,0)' }} whileHover={{ background:'rgba(167,139,250,0.12)' }}>Demo ↗</motion.a>}
        </div>
      </div>
      <p style={{ color:'#94a3b8', fontSize:'0.85rem', lineHeight:1.7, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{description}</p>
      <div style={{ marginTop:'auto', paddingTop:'0.5rem', display:'flex', flexWrap:'wrap', gap:6 }}>
        {tags.map(t => <Tag key={t} label={t} />)}
      </div>
    </div>
  </GlassCard>
);

export const PictureCard = ({ src, alt, caption, aspectRatio='4/3' }) => (
  <GlassCard className="overflow-hidden" style={{ padding:0 }}>
    <div style={{ aspectRatio, overflow:'hidden' }}>
      <motion.img src={src} alt={alt} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} whileHover={{ scale:1.05 }} transition={{ duration:0.5, ease:'easeOut' }} />
    </div>
    {caption && <div style={{ padding:'0.75rem 1rem' }}><p style={{ fontSize:'0.8rem', color:'#64748b' }}>{caption}</p></div>}
  </GlassCard>
);

export const BlogCard = ({ title, excerpt, date, readTime, tags=[], href='#', coverImage }) => (
  <GlassCard className="p-0 overflow-hidden" style={{ cursor:'pointer' }} onClick={() => window.open(href,'_blank')}>
    {coverImage && <div style={{ height:180, overflow:'hidden' }}><motion.img src={coverImage} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover' }} whileHover={{ scale:1.04 }} transition={{ duration:0.4 }} /></div>}
    <div style={{ padding:'1.5rem' }}>
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:'0.75rem' }}>{tags.map(t => <Tag key={t} label={t} />)}</div>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'#f1f5f9', marginBottom:'0.5rem', lineHeight:1.4 }}>{title}</h3>
      <p style={{ color:'#64748b', fontSize:'0.85rem', lineHeight:1.6, marginBottom:'1rem' }}>{excerpt}</p>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'#475569' }}><span>{date}</span><span>{readTime}</span></div>
    </div>
  </GlassCard>
);

const SkillOrb = ({ name, icon }) => (
  <div className="glass skill-orb" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'10px 20px', borderRadius:999, whiteSpace:'nowrap', flexShrink:0, cursor:'default' }}>
    <span style={{ fontSize:'1.2rem' }}>{icon}</span>
    <span style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'#cbd5e1' }}>{name}</span>
  </div>
);

export const SkillsTicker = ({ skills, direction='left', speed=30 }) => {
  const items = [...skills,...skills,...skills,...skills];
  const animName = direction === 'right' ? 'ticker-right' : 'ticker-left';
  return (
    <>
      <style>{`
        @keyframes ticker-left  { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes ticker-right { from { transform: translateX(-25%); } to { transform: translateX(0); } }
        .ticker-track { display: flex; gap: 12px; width: max-content; will-change: transform; }
        .ticker-track:hover { animation-play-state: paused; }
        .skill-orb { transition: transform 0.2s ease, border-color 0.2s ease; }
        .skill-orb:hover { transform: scale(1.1) translateY(-4px); border-color: rgba(167,139,250,0.8) !important; }
      `}</style>
      <div style={{ position:'relative', width:'100%', overflowX:'clip', overflowY:'visible' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:140, zIndex:2, background:'linear-gradient(to right, #050508, transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:140, zIndex:2, background:'linear-gradient(to left, #050508, transparent)', pointerEvents:'none' }} />
        <div style={{ paddingTop:12, paddingBottom:12 }}>
          <div className="ticker-track" style={{ animation:`${animName} ${speed}s linear infinite` }}>
            {items.map((skill,i) => <SkillOrb key={i} {...skill} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export const EducationCard = ({ school, degree, period, description }) => (
  <GlassCard style={{ padding:'1.5rem 1.75rem' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'0.5rem', marginBottom:'0.45rem' }}>
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'#f1f5f9' }}>{school}</h3>
      <span style={{ fontSize:'0.75rem', color:'#475569', background:'rgba(255,255,255,0.05)', padding:'3px 10px', borderRadius:999, flexShrink:0 }}>{period}</span>
    </div>
    <p style={{ color:THEME.accent1, fontSize:'0.88rem', marginBottom:description ? '0.55rem' : 0 }}>{degree}</p>
    {description && <p style={{ color:'#64748b', fontSize:'0.82rem', lineHeight:1.7 }}>{description}</p>}
  </GlassCard>
);

export const ContactButton = ({ label, href, icon }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer" className="glass"
    style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:12, color:'#e2e8f0', textDecoration:'none', fontFamily:'var(--font-body)', fontSize:'0.9rem' }}
    whileHover={{ scale:1.05, borderColor:THEME.accent1, color:THEME.accent1 }} whileTap={{ scale:0.97 }}>
    {icon && <span style={{ fontSize:'1.1rem' }}>{icon}</span>}
    {label}
  </motion.a>
);

const ParallaxText = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0,600], [0,-80]);
  const springY = useSpring(y, { stiffness:80, damping:20 });
  return (
    <motion.div style={{ y:springY }}>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#475569', marginBottom:'1.5rem' }}>— available for projects ✦</p>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem, 9vw, 7rem)', fontWeight:800, lineHeight:1.0, marginBottom:'1.5rem' }}>
        Hey, I'm{' '}<span className="grad-text">Your<br />Name</span>
      </h1>
    </motion.div>
  );
};

const PROJECTS = [
  { title:'Project Alpha', description:'A cutting-edge web application showcasing modern full-stack development practices with exceptional user experience design.', tags:['Next.js','TypeScript','PostgreSQL'], demo:'#', github:'#', image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80' },
  { title:'Project Beta', description:'Full-stack e-commerce platform with real-time inventory management, payment processing, and analytics.', tags:['React','Node.js','Stripe'], demo:'#', github:'#', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { title:'Project Gamma', description:'Collaborative project management tool with real-time updates and task automation.', tags:['Next.js','WebSocket','Firebase'], demo:'#', github:'#', image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
];

const SKILLS = [
  { name:'JavaScript', icon:'✨' }, { name:'React', icon:'⚛️' }, { name:'Next.js', icon:'▲' },
  { name:'TypeScript', icon:'🔷' }, { name:'Node.js', icon:'🟢' }, { name:'PostgreSQL', icon:'🗄️' },
  { name:'MongoDB', icon:'🍃' }, { name:'Tailwind CSS', icon:'🎨' }, { name:'Figma', icon:'🖌️' }, { name:'Docker', icon:'🐳' },
];

const PICTURES = [
  { src:'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80', alt:'coding setup', caption:'My workspace' },
  { src:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80', alt:'laptop code', caption:'Late night sessions' },
  { src:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt:'macbook code', caption:'Building things' },
];

const BLOGS = [
  { title:'Why I switched from CRA to Next.js and never looked back', excerpt:'A deep dive into the performance gains, DX improvements, and the few gotchas I hit along the way.', date:'May 2025', readTime:'5 min read', tags:['Next.js','React'], coverImage:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80' },
  { title:'Liquid Glass UI: building the effect from scratch', excerpt:'How to use backdrop-filter, CSS variables, and layered gradients to create a truly glass-like interface.', date:'Apr 2025', readTime:'8 min read', tags:['CSS','Design'], coverImage:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { title:'TypeScript patterns I use every single day', excerpt:'Utility types, discriminated unions, and template literal types — the patterns that actually matter.', date:'Mar 2025', readTime:'6 min read', tags:['TypeScript'], coverImage:'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80' },
];

const EDUCATION = [
  { school:'Your University', degree:'BSc Computer Science', period:'2020 – 2024', description:'Focus on distributed systems and human-computer interaction.' },
  { school:'Coding Bootcamp', degree:'Full Stack Web Development', period:'2023', description:'Intensive 12-week program covering modern web stack.' },
];

// ============================================================
// NAVIGATION — iOS dark mode solid dock, SVG icons
// ============================================================

// SF-style SVG icons: each returns a 20×20 SVG
const Icons = {
  projects: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor"/>
    </svg>
  ),
  skills: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2L12.39 7.26L18 8.09L14 12L14.95 17.59L10 15.05L5.05 17.59L6 12L2 8.09L7.61 7.26L10 2Z" fill="currentColor"/>
    </svg>
  ),
  photos: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="12" rx="2" fill="currentColor" opacity="0.9"/>
      <circle cx="10" cy="10" r="3" fill="#1c1c1e"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="5.5" r="1" fill="#1c1c1e"/>
    </svg>
  ),
  blog: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" fill="currentColor" opacity="0.9"/>
      <path d="M6 7.5h8M6 10h8M6 12.5h5" stroke="#1c1c1e" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  contact: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5.5A1.5 1.5 0 014.5 4h11A1.5 1.5 0 0117 5.5v9a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 14.5v-9z" fill="currentColor" opacity="0.9"/>
      <path d="M3.5 5.5L10 11l6.5-5.5" stroke="#1c1c1e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { id:'projects', label:'Projects' },
  { id:'skills',   label:'Skills'   },
  { id:'photos',   label:'Photos'   },
  { id:'blog',     label:'Blog'     },
  { id:'contact',  label:'Contact'  },
];

const Nav = () => {
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Outer bar — iOS tab bar feel: solid dark, no blur */
        .dock-pill {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 8px;
          border-radius: 999px;
          background: #1c1c1e;
          border: 1px solid #3a3a3c;
          box-shadow: 0 4px 24px rgba(0,0,0,0.7);
        }

        /* Each pill button */
        .dock-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          background: #2c2c2e;
          border: none;
          overflow: hidden;
          padding: 0;
          transition:
            width 0.38s cubic-bezier(0.34,1.15,0.64,1),
            background 0.18s ease;
        }

        .dock-item:hover {
          width: 116px;
          background: #3a3a3c;
        }

        /* Active: solid accent fill */
        .dock-item.is-active {
          background: #a78bfa;
        }

        .dock-item.is-active:hover {
          background: #b8a4fb;
        }

        /* Icon wrapper — always 40×40, perfectly centered */
        .dock-icon-wrap {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dock-icon-wrap svg {
          color: #8e8e93;
          transition: color 0.18s ease, transform 0.22s cubic-bezier(0.34,1.4,0.64,1);
        }

        .dock-item:hover .dock-icon-wrap svg {
          color: #ffffff;
          transform: scale(1.1);
        }

        /* Active state: white icon */
        .dock-item.is-active .dock-icon-wrap svg {
          color: #ffffff;
        }

        /* Label */
        .dock-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          max-width: 0;
          opacity: 0;
          padding-right: 0;
          transition:
            max-width 0.38s cubic-bezier(0.34,1.15,0.64,1),
            opacity   0.16s ease 0.1s,
            padding-right 0.38s ease;
        }

        .dock-item:hover .dock-label {
          max-width: 76px;
          opacity: 1;
          padding-right: 14px;
        }

        /* Active dot below */
        .dock-dot {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #a78bfa;
        }
      `}</style>

      <motion.div
        className="dock-pill"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`dock-item${active === id ? ' is-active' : ''}`}
            aria-label={label}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="dock-icon-wrap">
              {Icons[id]}
            </div>
            <span className="dock-label">{label}</span>
            {active === id && <span className="dock-dot" />}
          </a>
        ))}
      </motion.div>
    </>
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

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'8rem', position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr auto', gap:'4rem', alignItems:'center' }}>
          <div>
            <ParallaxText />
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}
              style={{ color:'#94a3b8', fontSize:'1.1rem', lineHeight:1.8, maxWidth:500, marginBottom:'2.5rem' }}>
              I build beautiful, fast web applications. Student developer exploring the intersection of design and engineering.
            </motion.p>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.8 }}
              style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <motion.a href="#projects"
                style={{ padding:'13px 28px', borderRadius:12, fontFamily:'var(--font-body)', fontWeight:500, fontSize:'0.9rem', background:`linear-gradient(135deg, ${THEME.accent1}, ${THEME.accent2})`, color:'#fff', textDecoration:'none', border:'none', cursor:'pointer' }}
                whileHover={{ scale:1.04, opacity:0.92 }} whileTap={{ scale:0.97 }}>
                View My Work
              </motion.a>
              <motion.a href="#contact" className="glass"
                style={{ padding:'13px 28px', borderRadius:12, fontFamily:'var(--font-body)', fontSize:'0.9rem', color:'#e2e8f0', textDecoration:'none' }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity:0, scale:0.9, rotate:-4 }} animate={{ opacity:1, scale:1, rotate:0 }}
            transition={{ delay:0.5, duration:1, ease:[0.22,1,0.36,1] }} style={{ display:'none' }} className="md-show">
            <GlassCard style={{ width:280, height:320, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'1rem' }} hover={false}>
              <div style={{ width:100, height:100, borderRadius:'50%', background:`linear-gradient(135deg, ${THEME.accent1}40, ${THEME.accent2}40)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem', border:`1px solid ${THEME.accent1}30` }}>👨‍💻</div>
              <p style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1rem' }}>Your Name</p>
              <Tag label="Open to work" />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeader eyebrow="projects" title="Projects" subtitle="Things I've built." />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:'1.5rem' }}>
            {PROJECTS.map((p,i) => <ScrollReveal key={i} delay={i*0.1}><ProjectCard {...p} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position:'relative', zIndex:2, paddingLeft:0, paddingRight:0 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', paddingLeft:'1.5rem', paddingRight:'1.5rem' }}>
          <SectionHeader eyebrow="toolbox" title="Skills & Tech" subtitle="Technologies I reach for day-to-day." />
        </div>
        <ScrollReveal><SkillsTicker skills={SKILLS} direction="left" speed={30} /></ScrollReveal>
        <ScrollReveal delay={0.1}><SkillsTicker skills={[...SKILLS].reverse()} direction="right" speed={38} /></ScrollReveal>
      </section>

      {/* PHOTOS */}
      <section id="photos" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeader eyebrow="life outside code" title="Photos" subtitle="A few frames from my world." />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'1rem' }}>
            {PICTURES.map((pic,i) => <ScrollReveal key={i} delay={i*0.08}><PictureCard {...pic} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeader eyebrow="writing" title="Blog" subtitle="Thoughts on code, design, and building things." />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}>
            {BLOGS.map((b,i) => <ScrollReveal key={i} delay={i*0.1}><BlogCard {...b} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeader eyebrow="background" title="Education" subtitle="Where I've been learning." />
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {EDUCATION.map((e,i) => <ScrollReveal key={i} delay={i*0.1}><EducationCard {...e} /></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <ScrollReveal>
            <p style={{ fontSize:'0.75rem', letterSpacing:'0.2em', textTransform:'uppercase', color:THEME.accent1, marginBottom:'1rem' }}>— say hello</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 6vw, 4rem)', fontWeight:800, lineHeight:1.1, marginBottom:'1.25rem' }}>
              Let's build<br /><span className="grad-text">something great.</span>
            </h2>
            <p style={{ color:'#64748b', lineHeight:1.8, marginBottom:'2.5rem' }}>Open to freelance projects, collaborations, and full-time opportunities.</p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'0.75rem' }}>
              <ContactButton label="Email" href="mailto:you@example.com" icon="✉️" />
              <ContactButton label="GitHub" href="https://github.com" icon="🐙" />
              <ContactButton label="LinkedIn" href="https://linkedin.com" icon="💼" />
              <ContactButton label="Twitter" href="https://twitter.com" icon="🐦" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding:'2rem 1.5rem', textAlign:'center', position:'relative', zIndex:2 }}>
        <p style={{ color:'#334155', fontSize:'0.8rem', fontFamily:'var(--font-body)' }}>© 2025 rawh · Built with Next.js, Framer Motion & too much ☕</p>
      </footer>
    </>
  );
}