'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/**
Portfolio — iOS-style minimal solid card design
Playful & approachable tone
─────────────────────────────────────────────
EDIT YOUR CONTENT HERE ↓
─────────────────────────────────────────────
*/
const rawh = {
  name: "Neang Sokdara",
  tagline: "I build beautiful, fast web apps — where design meets engineering.",
  availableForWork: true,
  email: "sokdara.work@gmail.com",
  github: "https://github.com/rawcig",
  linkedin: "https://www.linkedin.com/in/sokdara-neang-b69817406/",
  telegram: "https://telegram.me/rawcig",
  facebook: "https://www.facebook.com/rawcig",
  footerYear: 2026,
};

const ABOUT = {
  bio: "I'm an MIS student at SETEC institute who likes building things end-to-end — from backend logic to the frontend they run on, almost called myself a fullstack? Most of my time goes into web apps, and now I start learning Spring boot, API to improve my backend skills.",
  facts: [
    { icon: "fa-solid fa-graduation-cap", label: "Studying", value: "Management Information Systems" },
    { icon: "fa-solid fa-location-dot", label: "Based in", value: "Phnom Penh, Cambodia" },
    { icon: "fa-solid fa-code-branch", label: "Focused on", value: "Full-stack dev" },
    { icon: "fa-solid fa-language", label: "Languages", value: "Khmer & English" },
  ],
};

const PROJECTS = [
  {
    title: "Event Management System",
    description: "A school web project — an event management system built with Laravel, handling registration and event data. Deployed on Render with Docker, including fixes for ephemeral storage so uploaded images persist across deploys.",
    tags: ["PHP", "Laravel", "Docker", "Bootstrap"],
    tagColors: ["purple"],
    github: "https://github.com/rawcig/event-mgt.git",
    demo: "https://wp-laravel-midterm.onrender.com/",
    icon: "fa-solid fa-cart-shopping",
    accent: "var(--accent)",
    accentBg: "var(--accent-bg)",
  },
  {
    title: "Web-hosting on AWS EC2",
    description: "Hosting my static web page on AWS EC2 with Ubuntu Server.",
    tags: ["Ubuntu Server", "Nginx", "Linux"],
    tagColors: ["purple"],
    github: "https://www.youtube.com/watch?v=5DNk6uGO6rI&list=PLTvEyjZNgG4w",
    link: "youtube",
    demo: "http://www.sokdara.xyz",
    icon: "fa-solid fa-server",
    accent: "var(--accent)",
    accentBg: "var(--accent-bg)",
  },
  {
    title: "This Portfolio",
    description: "This website built with Next.js, iOS inspired card design with a floating dock nav, entrance animations, all iterated and debugged from scratch.",
    tags: ["Next.js", "React", "Framer Motion"],
    tagColors: ["purple"],
    github: "https://github.com/rawcig",
    demo: "#",
    icon: "fa-solid fa-layer-group",
    accent: "var(--accent)",
    accentBg: "var(--accent-bg)",
  },
];

const LINUX = {
  playlistId: "PLTvEyjZNgG4w",
  playlistUrl: "https://www.youtube.com/playlist?list=PLTvEyjZNgG4w",
  title: "Web-hosting on AWS EC2",
  description: "Documenting my self-hosting journey — Ubuntu Server setup on AWS EC2, reverse proxying with Nginx, Docker deployments, and working around my school project.",
  videoCount: 6,
};

const EXTRA = [
  {
    title: "ADOBE fundamentals",
    excerpt: "Working through photoshop, illustrator, and after effects to learn the basics of design.",
    date: "finished",
    readTime: "School",
    tags: ["ADOBE", "Design"],
    tagColors: ["teal"],
    href: "#",
    status: "check",
  },
  {
    title: "System Analysis",
    excerpt: "Learning fundamentals of system analysis and design. Making use case diagrams, ERD diagrams and simplifying.",
    date: "finished",
    readTime: "School",
    tags: ["DATA"],
    tagColors: ["teal"],
    href: "#",
    status: "check",
  },
  {
    title: "PHP & Laravel fundamentals",
    excerpt: "Part of a school program, learning how to use PHP and Laravel integrate with database. Click me to check it out!.",
    date: "finished",
    readTime: "School",
    tags: ["PHP", "Laravel", "Bootstrap"],
    tagColors: ["amber"],
    href: "https://wp-laravel-midterm.onrender.com/",
    status: "check",
  },
];

const VIDEO_EDITING = {
  title: "Video Editing & Motion Design",
  description: "Editing work across Adobe Premiere Pro, After Effects, Photoshop, and Illustrator — from cutting and color grading to transitions, effects, and motion graphics.",
  tools: ["Premiere Pro", "After Effects", "Photoshop", "Illustrator"],
  videos: [
    {
      title: "Pizza Ads",
      description: "A short promotional ad edit — pacing, sound design, and punchy cuts to sell the product fast.",
      videoId: "SvXAySXNEFU",
    },
    {
      title: "Drift Car Show",
      description: "A long-form drift car show edit focused on creative transitions and effects work throughout.",
      videoId: "f_TTP9QD0V4",
      embeddable: false, // audio Content ID claim blocks embedded playback — links out to YouTube instead
    },
  ],
};

const SKILLS_ROW1 = [
  { name: "JavaScript", icon: "fa-brands fa-js", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "React", icon: "fa-brands fa-react", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Next.js", icon: "fa-brands fa-node-js", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "PHP", icon: "fa-brands fa-php", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Laravel", icon: "fa-brands fa-laravel", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Java", icon: "fa-brands fa-java", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Spring Boot", icon: "fa-solid fa-leaf", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Dart", icon: "fa-solid fa-code", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Docker", icon: "fa-brands fa-docker", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Git", icon: "fa-brands fa-git-alt", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Nginx", icon: "fa-solid fa-server", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Linux", icon: "fa-brands fa-linux", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MySQL", icon: "fa-solid fa-database", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MikroTik", icon: "fa-solid fa-network-wired", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Tailwind", icon: "fa-solid fa-wind", color: "var(--bg)", iconColor: "var(--text-2)" },
];

const SKILLS_ROW2 = [
  { name: "Tailwind", icon: "fa-solid fa-wind", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MikroTik", icon: "fa-solid fa-network-wired", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MySQL", icon: "fa-solid fa-database", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Linux", icon: "fa-brands fa-linux", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Nginx", icon: "fa-solid fa-server", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Git", icon: "fa-brands fa-git-alt", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Docker", icon: "fa-brands fa-docker", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Dart", icon: "fa-solid fa-code", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Spring Boot", icon: "fa-solid fa-leaf", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Java", icon: "fa-brands fa-java", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Laravel", icon: "fa-brands fa-laravel", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "PHP", icon: "fa-brands fa-php", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Next.js", icon: "fa-brands fa-node-js", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "React", icon: "fa-brands fa-react", color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "JavaScript", icon: "fa-brands fa-js", color: "var(--bg)", iconColor: "var(--text-2)" },
];

const NOW_LEARNING = [
  {
    title: "Spring Boot & REST APIs",
    excerpt: "Working through backend fundamentals, controllers, service layers, and REST API annotations.",
    date: "In progress",
    readTime: "School",
    tags: ["Java", "Spring Boot"],
    tagColors: ["teal"],
    href: "#",
    status: "clock",
  },
  {
    title: "Dart & OOP fundamentals",
    excerpt: "Learning Dart's type system, null safety, and OOP patterns.",
    date: "In progress",
    readTime: "School",
    tags: ["Dart", "OOP"],
    tagColors: ["teal"],
    href: "#",
    status: "clock",
  },
  {
    title: "Flutter Self-learning",
    excerpt: "Part of a school project, learning how Flutter UI works, mapping from data.",
    date: "In progress",
    readTime: "Self-learn",
    tags: ["Networking", "School"],
    tagColors: ["amber", "gray"],
    href: "#",
    status: "clock",
  },
];

const EDUCATION = [
  { school: "Setec Institute", degree: "Management Information System", period: "2023 — Present", description: "Bachelor's Degree in Management Information Systems." },
  { school: "Setec Institute", degree: "Design", period: "2021-2022", description: "Foundation Year of Bachelor's Degree in Design" },
  { school: "Hunsen Borey 100 Khnorng High School", degree: "High School Diploma", period: "2018 — 2021", description: "Graduated with honors, rank C in overall grade." },
  { school: "Sovannaphumi School", degree: "GEP", period: "2015 — 2019", description: "Completed General English Program Level 7" },
];

const CHIP_COLORS = {
  purple: { bg: "var(--accent-bg)", color: "var(--accent)", border: "transparent" },
  pink: { bg: "var(--accent-bg)", color: "var(--accent)", border: "transparent" },
  teal: { bg: "transparent", color: "var(--text-2)", border: "var(--border-md)" },
  amber: { bg: "transparent", color: "var(--text-2)", border: "var(--border-md)" },
  green: { bg: "transparent", color: "var(--text-2)", border: "var(--border-md)" },
  coral: { bg: "var(--bg)", color: "var(--text-3)", border: "transparent" },
  gray: { bg: "var(--bg)", color: "var(--text-3)", border: "transparent" },
};

function FontLoader() {
  useEffect(() => {
    const links = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" },
    ];
    links.forEach((attrs) => {
      if (document.querySelector(`link[href="${attrs.href}"]`)) return;
      const el = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => (el[k] = v));
      document.head.appendChild(el);
    });
  }, []);
  return null;
}
function ThemeToggle() {
  const [theme, setTheme] = useState(null); // null until mounted — avoids hydration mismatch

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = stored || system;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  if (!theme) return <div style={{ width: 40, height: 40 }} />; // placeholder, prevents layout shift

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="ios-card"
      style={{
        position: "fixed", top: 20, right: 20, zIndex: 100,
        width: 40, height: 40, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "0.5px solid var(--border-md)",
        cursor: "pointer",
      }}
    >
      <i
        className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"}
        style={{ fontSize: 15, color: "var(--text-2)" }}
        aria-hidden="true"
      />
    </button>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── FIX: PopCard with throttled mouse events to prevent spam-click freeze ──
function PopCard({ children, delay = 0, tilt = true, style = {}, className = "" }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });
  const rafRef = useRef(null);
  const lastMoveRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!tilt || !cardRef.current) return;
    // Throttle to ~60fps max (16ms)
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 8);
      rotateX.set(-py * 8);
    });
  }, [tilt, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ height: "100%", ...style }}
      initial={{ opacity: 0, scale: 0.86, y: 26 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 260, damping: 19, delay: delay / 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ height: "100%", rotateX: springX, rotateY: springY, willChange: "transform", backfaceVisibility: "hidden" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Chip({ label, colorKey = "gray" }) {
  const c = CHIP_COLORS[colorKey] || CHIP_COLORS.gray;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: 11, fontWeight: 600, letterSpacing: ".02em",
      padding: "3px 10px", borderRadius: 999,
      background: c.bg, color: c.color, border: `0.5px solid ${c.border}`,
      margin: "0 4px 4px 0",
    }}>{label}</span>
  );
}

function SectionHeader({ eyebrow, title, desc }) {
  const ref = useReveal();
  const sentinelRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-15px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ height: 1 }} />
      <p
        className="section-eyebrow"
        style={{
          position: "sticky", top: 14, zIndex: 3, alignSelf: "flex-start",
          display: "inline-flex", alignItems: "center", width: "fit-content",
          fontFamily: "var(--font)",
          fontSize: stuck ? 11 : 13,
          fontWeight: stuck ? 700 : 600,
          letterSpacing: stuck ? ".14em" : "0",
          textTransform: stuck ? "uppercase" : "none",
          color: stuck ? "var(--accent)" : "var(--text-2)",
          marginBottom: 6,
          background: stuck ? "var(--glass-surface)" : "transparent",
          border: stuck ? "0.5px solid var(--border)" : "0.5px solid transparent",
          padding: stuck ? "8px 12px" : "0px",
          borderRadius: 999,
          // ADD THESE LINES FOR BLUR EFFECT ↓
          backdropFilter: stuck ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: stuck ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
          // ADD THESE LINES FOR BLUR EFFECT ↑
          transition: "font-size .25s ease, color .25s ease, background .25s ease, border-color .25s ease, padding .25s ease, letter-spacing .25s ease, backdrop-filter .25s ease",
        }}
      >
        {eyebrow}
      </p>
      <div ref={ref} className="reveal" style={{ marginBottom: "1.5rem" }}>
        <h2 className="section-title" style={{ fontSize: 28, fontWeight: 700, color: "var(--text)" }}>{title}</h2>
        {desc && <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.6 }}>{desc}</p>}
      </div>
    </>
  );
}

function Card({ children, style = {}, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`ios-card ${className}`.trim()}
      style={{
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "About", icon: "fa-solid fa-user" },
  { id: "projects", label: "Projects", icon: "fa-solid fa-diagram-project" },
  { id: "skills", label: "Skills", icon: "fa-solid fa-star" },
  { id: "linux", label: "Linux", icon: "fa-brands fa-linux" },
  { id: "blog", label: "Learning", icon: "fa-solid fa-graduation-cap" },
  { id: "extra", label: "Extra", icon: "fa-solid fa-plus" },
  { id: "contact", label: "Contact", icon: "fa-solid fa-envelope" },
];

function Nav() {
  const [active, setActive] = useState("");
  const tickingRef = useRef(false);
  const clickLockRef = useRef(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const updateActive = () => {
      tickingRef.current = false;
      if (clickLockRef.current) return;
      const probeY = window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "";
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= probeY) current = sec.id;
      }
      setActive((prev) => (prev !== current ? current : prev));
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    clickLockRef.current = true;
    window.clearTimeout(handleNavClick._t);
    handleNavClick._t = window.setTimeout(() => { clickLockRef.current = false; }, 700);
  };

  return (
    <nav
      className="dock-pill"
      aria-label="Section navigation"
      style={{
        position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", alignItems: "center",
        background: "var(--surface)", border: "0.5px solid var(--border-md)",
        borderRadius: 999, padding: "6px 8px", gap: 4,
        boxShadow: "0 4px 28px rgba(0,0,0,.14)",
      }}
    >
      {NAV_ITEMS.map(({ id, label, icon }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={() => handleNavClick(id)}
          className={`dock-btn${active === id ? " dock-active" : ""}`}
          aria-label={label}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 0 9px 11px", borderRadius: 999,
            fontSize: 12, fontWeight: 600, fontFamily: "var(--font)",
            textDecoration: "none",
            background: active === id ? "var(--accent-bg)" : "transparent",
            color: active === id ? "var(--accent)" : "var(--text-3)",
            border: "none", flexShrink: 0,
          }}
        >
          <i className={icon} style={{ fontSize: 15, flexShrink: 0 }} aria-hidden="true" />
          <span className="dock-label" style={{ paddingRight: 12, borderRadius: 999 }}>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 700], [0, 130]);
  const blob1X = useTransform(scrollY, [0, 700], [0, -28]);
  const blob2Y = useTransform(scrollY, [0, 700], [0, -85]);
  const blob2X = useTransform(scrollY, [0, 700], [0, 36]);

  return (
    <section style={{ padding: "5rem 0 3rem" }}>
      <Card className="h-card" style={{ padding: "2.5rem", overflow: "hidden", position: "relative" }}>
        <motion.div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "#3d3b5d", opacity: .6, pointerEvents: "none", y: blob1Y, x: blob1X }} />
        <motion.div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "#1a1148", opacity: .5, pointerEvents: "none", y: blob2Y, x: blob2X }} />
        <div className="hero-section" style={{ display: "flex", alignItems: "center", gap: "2.5rem", position: "relative", zIndex: 1 }}>
          <div className="h-avatar" style={{ flexShrink: 0, border: '10px solid var(--surface)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: 164, height: 164, borderRadius: 999,
              background: "linear-gradient(135deg, #EEEDFE 0%, #E1F5EE 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "0px solid var(--surface)",
              boxShadow: "0 0 0 1px var(--border-md)",
            }}>
              <Image src="/img/rawh (3).JPG" alt="Sokdara" width={164} height={164} style={{ borderRadius: 999, objectFit: "cover", alignSelf: 'center', objectPosition: "center top" }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {rawh.availableForWork && (
              <div className="h-badge" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 12, fontWeight: 600, padding: "4px 12px",
                borderRadius: 999,
                background: "#E1F5EE",
                color: "#0F9D58",
                border: "0.5px solid rgba(15, 157, 88, 0.35)", marginBottom: 14,
              }}>
                <span className="h-badge-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#0F9D58", flexShrink: 0 }} />
                Open to work
              </div>
            )}
            <h1 className="hero-name h-name" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 10 }}>
              Hey, I'm <span style={{ color: "var(--accent)" }}>{rawh.name}</span>
            </h1>
            <p className="h-tagline" style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 420, marginBottom: 22 }}>
              {rawh.tagline}
            </p>
            <div className="hero-btns h-btns" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#projects" className="contact-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 24px", borderRadius: 999,
                background: "var(--accent)", color: "#fff",
                fontSize: 14, fontWeight: 600, textDecoration: "none", border: "none",
              }}>
                <i className="fa-solid fa-eye" aria-hidden="true" />
                View my work
              </a>
              <a href="#contact" className="contact-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "11px 24px", borderRadius: 999,
                background: "var(--surface)", color: "var(--text)",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                border: "0.5px solid var(--border-md)",
              }}>
                <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function AboutSection() {
  const ref = useReveal();
  return (
    <section id="about" style={{ marginBottom: "3.5rem" }}>
      <SectionHeader eyebrow="quick intro" title="About me" />
      <div ref={ref} className="reveal">
        <Card style={{ padding: "1.75rem" }}>
          <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 20 }}>
            {ABOUT.bio}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {ABOUT.facts.map((f) => (
              <div key={f.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: "var(--radius-md)",
                background: "var(--bg)", border: "0.5px solid var(--border)",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                  background: "var(--accent-bg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className={f.icon} style={{ fontSize: 13, color: "var(--accent)" }} aria-hidden="true" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 1 }}>
                    {f.label}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
                    {f.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  return (
    <PopCard delay={delay}>
      <Card className="proj-card" style={{ padding: "1.25rem", display: "flex", minHeight: "100%", flexDirection: "column" }}>
        <div className="proj-card-inner" style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minHeight: 0 }}>
          <div className="proj-icon-wrap" style={{
            width: 44, height: 44, borderRadius: 12,
            background: project.accentBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <i className={project.icon} style={{ fontSize: 20, color: project.accent }} aria-hidden="true" />
          </div>
          <div className="proj-body" style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minHeight: 0 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{project.title}</h3>
            <p style={{ height: 'auto', fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, flex: 1, overflow: 'clip', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {project.tags.map((t, i) => <Chip key={t} label={t} colorKey={project.tagColors[i] || "gray"} />)}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 600, padding: "6px 14px",
                  borderRadius: 999, border: "0.5px solid var(--border-md)",
                  color: "var(--text-2)", textDecoration: "none", background: "var(--surface)",
                }}>
                  <i className={`fa-brands fa-${project.link || "github"}`} style={{ fontSize: 13 }} aria-hidden="true" />
                  {project.link === "youtube" ? "Youtube" : "GitHub"}
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 12, fontWeight: 600, padding: "6px 14px",
                  borderRadius: 999, border: `0.5px solid ${project.accentBg}`,
                  color: project.accent, textDecoration: "none",
                  background: project.accentBg,
                }}>
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 12 }} aria-hidden="true" />
                  Live demo
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </PopCard>
  );
}

function SkillPill({ skill }) {
  return (
    <div className="skill-pill-item" style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 16px 8px 10px",
      borderRadius: 999,
      background: "var(--surface)",
      border: "0.5px solid var(--border)",
      marginRight: 10, flexShrink: 0,
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: 999,
        background: skill.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <i className={skill.icon} style={{ fontSize: 14, color: skill.iconColor }} aria-hidden="true" />
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>{skill.name}</span>
    </div>
  );
}

// ── FIX: SkillsTicker with proper rAF cleanup to prevent stacking loops ──
function SkillsTicker({ skills, direction = "left", speed = 28 }) {
  const items = [...skills, ...skills, ...skills, ...skills];
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const draggingRef = useRef(false);
  const hoverPausedRef = useRef(false);
  const dirSign = direction === "right" ? 1 : -1;
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // Calculate width once (or on resize, but static is fine for loop)
    const setWidth = () => track.scrollWidth / 4;
    const pxPerSecond = setWidth() / speed;
    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;
      
      if (!draggingRef.current && !hoverPausedRef.current) {
        const w = setWidth();
        let next = x.get() + dirSign * pxPerSecond * dt;
        if (next <= -w) next += w;
        if (next > 0) next -= w;
        x.set(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    
    rafRef.current = requestAnimationFrame(tick);

    // Cleanup: Cancel loop on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // FIX: Removed 'x' from dependencies to prevent loop restarting
  }, [direction, speed, skills]); 

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    const track = trackRef.current;
    if (track) {
      track.setPointerCapture(e.pointerId);
      track.dataset.startX = e.clientX;
      track.dataset.startVal = x.get();
      track.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    
    const startX = parseFloat(track.dataset.startX);
    const startVal = parseFloat(track.dataset.startVal);
    const w = track.scrollWidth / 4;
    let next = startVal + (e.clientX - startX);
    
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  };

  const endDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const track = trackRef.current;
    if (track) {
      track.style.cursor = "grab";
      try { track.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden", padding: "8px 0" }}
      onMouseEnter={() => { hoverPausedRef.current = true; }}
      onMouseLeave={() => { hoverPausedRef.current = false; }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
      
      <motion.div
        ref={trackRef}
        className="ticker-track"
        style={{ x, cursor: "grab", touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag} /* FIX: Handles mobile scroll interrupts */
        onPointerLeave={endDrag}  /* FIX: Handles finger sliding off track */
      >
        {items.map((s, i) => <SkillPill key={i} skill={s} />)}
      </motion.div>
    </div>
  );
}

function LinuxSection() {
  const ref = useReveal();
  return (
    <section id="linux" style={{ marginBottom: "3.5rem" }}>
      <SectionHeader eyebrow="self-hosting" title={LINUX.title} />
      <div ref={ref} className="reveal">
        <Card style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 16, maxWidth: 560 }}>
            {LINUX.description}
          </p>
          <div className="video-embed-wrap">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/videoseries?list=${LINUX.playlistId}`}
              title={LINUX.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-3)" }}>
              <i className="fa-solid fa-list" style={{ fontSize: 11 }} aria-hidden="true" />
              {LINUX.videoCount} videos
            </span>
            <a href={LINUX.playlistUrl} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{
              borderRadius: 999,
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, padding: "6px 14px",
              border: "0.5px solid var(--border-md)",
              color: "var(--text-2)", background: "var(--surface)", textDecoration: "none",
            }}>
              <i className="fa-brands fa-youtube" aria-hidden="true" />
              Watch on YouTube
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}

function VideoEditingCard() {
  return (
    <Card style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: "var(--accent-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <i className="fa-solid fa-clapperboard" style={{ fontSize: 15, color: "var(--accent)" }} aria-hidden="true" />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{VIDEO_EDITING.title}</h3>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 12, maxWidth: 640 }}>
        {VIDEO_EDITING.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18 }}>
        {VIDEO_EDITING.tools.map((t) => <Chip key={t} label={t} colorKey="purple" />)}
      </div>
      <div className="video-pair-grid">
        {VIDEO_EDITING.videos.map((v) => (
          <div key={v.videoId}>
            {v.embeddable === false ? (
              <a
                href={`https://youtu.be/${v.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-embed-wrap video-fallback"
                style={{
                  display: "block",
                  backgroundImage: `url(https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg)`,
                  backgroundSize: "cover", backgroundPosition: "center",
                }}
                aria-label={`Watch ${v.title} on YouTube`}
              >
                <span className="video-fallback-play">
                  <i className="fa-solid fa-play" aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div className="video-embed-wrap">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.videoId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginTop: 10, marginBottom: 4 }}>{v.title}</h4>
            <p style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.6 }}>{v.description}</p>
            {v.embeddable === false && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-3)", fontWeight: 500, marginTop: 2 }}>
                <i className="fa-brands fa-youtube" aria-hidden="true" />
                Opens on YouTube
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function BlogCard({ post, delay }) {
  return (
    <PopCard delay={delay}>
      <Card className="blog-card" style={{ padding: "1.25rem", height: "100%", display: "flex", flexDirection: "column" }}
        onClick={() => { if (post.href && post.href !== "#") window.open(post.href, "_blank"); }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 8 }}>
          {post.tags.map((t, i) => <Chip key={t} label={t} colorKey={post.tagColors[i] || "gray"} />)}
        </div>
        <h3 style={{ height: 21, fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 6, flex: 2 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 12 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>{post.date}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>
            <i className={`fa-solid fa-${post.status}`} style={{ fontSize: 10 }} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </Card>
    </PopCard>
  );
}

function EduCard({ edu, delay }) {
  return (
    <PopCard delay={delay}>
      <Card style={{ padding: "1.25rem", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{edu.school}</h3>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px",
            borderRadius: 999, background: "var(--bg)",
            border: "0.5px solid var(--border-md)", color: "var(--text-3)",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{edu.period}</span>
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: 6 }}>{edu.degree}</p>
        {edu.description && <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{edu.description}</p>}
      </Card>
    </PopCard>
  );
}

function ContactBtn({ label, href, icon, bgColor, iconColor }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-btn hover" style={{
      width: 44, height: 44,
      display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2,
      padding: "0.5rem 0.5rem", borderRadius: "100%",
      background: "var(--footer)", border: "0.5px solid var(--border)",
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '100%',
        background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <i className={icon} style={{ width: 26, height: 26, fontSize: 26, color: iconColor }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "0.5px solid var(--border)",
      padding: "2rem 1.25rem calc(env(safe-area-inset-bottom, 0px) + 5.5rem)",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>
        © {rawh.footerYear} {rawh.name} · Built with Next.js & ☕
      </p>
    </footer>
  );
}

export default function hehe() {
  return (
    <>
      <FontLoader />
      <ThemeToggle />
      <Nav />
      
      <main className="page-wrap">
        <Hero />
        <AboutSection />
        <section id="education" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="background" title="Education" desc="My academic journey and qualifications." />
          <div className="edu-grid">
            {EDUCATION.map((edu, i) => (
              <EduCard key={`${edu.school}-${i}`} edu={edu} delay={i * 80} />
            ))}
          </div>
        </section>
        <section id="projects" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="projects" title="Things I've built" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i * 80} />
            ))}
          </div>
        </section>
        <section id="skills" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="toolbox" title="Skills & tech" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 -1.25rem" }}>
            <SkillsTicker skills={SKILLS_ROW1} direction="left" speed={26} />
            <SkillsTicker skills={SKILLS_ROW2} direction="right" speed={32} />
          </div>
        </section>
        <LinuxSection />
        <section id="blog" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="currently" title="Now learning" desc="What I'm actively working through right now." />
          <div className="blog-grid">
            {NOW_LEARNING.map((post, i) => (
              <BlogCard key={post.title} post={post} delay={i * 80} />
            ))}
          </div>
        </section>
        <section id="extra" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="extra" title="Extra stuff" desc="Some additional things I want to share that i've learned from school." />
          <VideoEditingCard />
          <div className="blog-grid">
            {EXTRA.map((post, i) => (
              <BlogCard key={post.title} post={post} delay={i * 80} />
            ))}
          </div>
        </section>
        <section id="contact" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="say hello" title="Let's build something great" />
          <div className="contact-grid">
            <ContactBtn href={`mailto:${rawh.email}`} icon="fa-solid fa-envelope" bgColor="var(--footer)" iconColor="var(--text)" />
            <ContactBtn href={rawh.github} icon="fa-brands fa-github" bgColor="var(--footer)" iconColor="#ffffff" />
            <ContactBtn href={rawh.linkedin} icon="fa-brands fa-linkedin" bgColor="var(--footer)" iconColor="#0077B5" />
            <ContactBtn href={rawh.telegram} icon="fa-brands fa-telegram" bgColor="var(--footer)" iconColor="#0088CC" />
            <ContactBtn href={rawh.facebook} icon="fa-brands fa-facebook" bgColor="var(--footer)" iconColor="#1DA1F2" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}