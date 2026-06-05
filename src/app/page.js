'use client';

import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
/**
 * Portfolio — iOS-style minimal solid card design
 * Playful & approachable tone
 *
 * ─────────────────────────────────────────────
 *  EDIT YOUR CONTENT HERE ↓
 * ─────────────────────────────────────────────
 */

// ── 1. SITE CONFIG ──────────────────────────────────────────────────────────
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

// ── 2. PROJECTS ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Project Alpha",
    description:
      "A full-stack web app with real-time collaboration, role-based auth, and a focus on great UX design patterns.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    tagColors: ["purple", "teal", "gray"],
    github: "#",
    demo: "#",
    icon: "fa-solid fa-layer-group",
    accent: "#7F77DD",
    accentBg: "#EEEDFE",
  },
  {
    title: "Project Beta",
    description:
      "E-commerce platform with real-time inventory management, Stripe payments, and an analytics dashboard.",
    tags: ["React", "Node.js", "Stripe"],
    tagColors: ["coral", "teal", "green"],
    github: "#",
    demo: "#",
    icon: "fa-solid fa-cart-shopping",
    accent: "#1D9E75",
    accentBg: "#E1F5EE",
  },
  {
    title: "Project Gamma",
    description:
      "Collaborative project management tool with real-time updates, kanban boards, and task automation.",
    tags: ["Next.js", "WebSocket", "Firebase"],
    tagColors: ["purple", "amber", "coral"],
    github: "#",
    demo: "#",
    icon: "fa-solid fa-diagram-project",
    accent: "#BA7517",
    accentBg: "#FAEEDA",
  },
];

// ── 3. SKILLS ─────────────────────────────────────────────────────────────────
// icon: Font Awesome class  |  color: hex for the icon circle bg
const SKILLS_ROW1 = [
  { name: "JavaScript", icon: "fa-brands fa-js",           color: "#FAEEDA", iconColor: "#BA7517" },
  { name: "React",      icon: "fa-brands fa-react",        color: "#E6F1FB", iconColor: "#185FA5" },
  { name: "Next.js",    icon: "fa-solid fa-n",             color: "#F1EFE8", iconColor: "#5F5E5A" },
  { name: "TypeScript", icon: "fa-solid fa-code",          color: "#EEEDFE", iconColor: "#534AB7" },
  { name: "Node.js",    icon: "fa-brands fa-node-js",      color: "#EAF3DE", iconColor: "#3B6D11" },
  { name: "PostgreSQL", icon: "fa-solid fa-database",      color: "#E1F5EE", iconColor: "#0F6E56" },
  { name: "MongoDB",    icon: "fa-solid fa-leaf",          color: "#EAF3DE", iconColor: "#3B6D11" },
  { name: "Docker",     icon: "fa-brands fa-docker",       color: "#E6F1FB", iconColor: "#185FA5" },
];

const SKILLS_ROW2 = [
  { name: "Figma",      icon: "fa-brands fa-figma",        color: "#FBEAF0", iconColor: "#993556" },
  { name: "Git",        icon: "fa-brands fa-git-alt",      color: "#FAECE7", iconColor: "#993C1D" },
  { name: "AWS",        icon: "fa-brands fa-aws",          color: "#FAEEDA", iconColor: "#854F0B" },
  { name: "Tailwind",   icon: "fa-solid fa-wind",          color: "#E6F1FB", iconColor: "#185FA5" },
  { name: "GraphQL",    icon: "fa-solid fa-circle-nodes",  color: "#FBEAF0", iconColor: "#993556" },
  { name: "Python",     icon: "fa-brands fa-python",       color: "#EEEDFE", iconColor: "#534AB7" },
  { name: "Linux",      icon: "fa-brands fa-linux",        color: "#F1EFE8", iconColor: "#444441" },
  { name: "Vercel",     icon: "fa-solid fa-rocket",        color: "#F1EFE8", iconColor: "#444441" },
];

// ── 4. PHOTOS ─────────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80", alt: "My workspace", caption: "The setup" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80", alt: "Late night sessions", caption: "3am energy" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", alt: "Building things", caption: "Building things" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", alt: "Code close up", caption: "In the zone" },
];

// ── 5. BLOG POSTS ─────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    title: "Why I switched from CRA to Next.js and never looked back",
    excerpt: "Performance gains, DX improvements, and the gotchas I hit along the way.",
    date: "May 2025",
    readTime: "5 min",
    tags: ["Next.js", "React"],
    tagColors: ["purple", "coral"],
    href: "#",
  },
  {
    title: "Liquid Glass UI: building the effect from scratch",
    excerpt: "backdrop-filter, CSS variables, and layered gradients to create a truly glass-like interface.",
    date: "Apr 2025",
    readTime: "8 min",
    tags: ["CSS", "Design"],
    tagColors: ["teal", "pink"],
    href: "#",
  },
  {
    title: "TypeScript patterns I use every single day",
    excerpt: "Utility types, discriminated unions, and template literal types — the ones that actually matter.",
    date: "Mar 2025",
    readTime: "6 min",
    tags: ["TypeScript"],
    tagColors: ["purple"],
    href: "#",
  },
];

// ── 6. EDUCATION ──────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    school: "Your University",
    degree: "BSc Computer Science",
    period: "2020 – 2024",
    description: "Focus on distributed systems and human-computer interaction.",
  },
  {
    school: "Coding Bootcamp",
    degree: "Full Stack Web Development",
    period: "2023",
    description: "Intensive 12-week program covering the modern web stack.",
  },
];

// ─────────────────────────────────────────────
//  THEME — edit colors here
// ─────────────────────────────────────────────
const CHIP_COLORS = {
  purple: { bg: "#EEEDFE", color: "#3C3489", border: "#AFA9EC" },
  teal:   { bg: "#E1F5EE", color: "#085041", border: "#5DCAA5" },
  coral:  { bg: "#FAECE7", color: "#712B13", border: "#F0997B" },
  pink:   { bg: "#FBEAF0", color: "#72243E", border: "#ED93B1" },
  amber:  { bg: "#FAEEDA", color: "#633806", border: "#EF9F27" },
  green:  { bg: "#EAF3DE", color: "#27500A", border: "#97C459" },
  gray:   { bg: "#F1EFE8", color: "#444441", border: "#B4B2A9" },
};

// ─────────────────────────────────────────────
//  DO NOT EDIT BELOW — Components & Layout
// ─────────────────────────────────────────────

// import { useState, useEffect, useRef } from "react";

/* ── Font Awesome + Google Fonts loader ── */
function FontLoader() {
  useEffect(() => {
    const links = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      },
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

/* ── Global Styles ── */
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg:       #F5F5F7;
        --surface:  #FFFFFF;
        --border:   rgba(0,0,0,0.08);
        --border-md:rgba(0,0,0,0.13);
        --text:     #1C1C1E;
        --text-2:   #3C3C43;
        --text-3:   #8A8A8E;
        --accent:   #7F77DD;
        --accent-bg:#EEEDFE;
        --radius-sm:  8px;
        --radius-md:  12px;
        --radius-lg:  18px;
        --radius-xl:  24px;
        --font: 'Plus Jakarta Sans', -apple-system, sans-serif;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg:       #1C1C1E;
          --surface:  #2C2C2E;
          --border:   rgba(255,255,255,0.09);
          --border-md:rgba(255,255,255,0.15);
          --text:     #F2F2F7;
          --text-2:   #AEAEB2;
          --text-3:   #636366;
          --accent-bg:#2D2956;
        }
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--bg);
        color: var(--text);
        font-family: var(--font);
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* scrollbar */
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

      [id] { scroll-margin-top: 88px; }

      /* ── Hero entrance keyframes ── */
      @keyframes hero-up {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes hero-pop {
        0%   { opacity: 0; transform: scale(0.82); }
        60%  { transform: scale(1.06); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes hero-fade {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      /* Staggered delay classes — each hero child uses one */
      .h-card    { animation: hero-fade 0.4s ease 0s both; }
      .h-avatar  { animation: hero-pop  0.55s cubic-bezier(.34,1.4,.64,1) 0.08s both; }
      .h-badge   { animation: hero-up   0.5s  cubic-bezier(.22,1,.36,1)   0.2s  both; }
      .h-name    { animation: hero-up   0.6s  cubic-bezier(.22,1,.36,1)   0.3s  both; }
      .h-tagline { animation: hero-up   0.6s  cubic-bezier(.22,1,.36,1)   0.42s both; }
      .h-btns    { animation: hero-up   0.6s  cubic-bezier(.22,1,.36,1)   0.54s both; }

      /* reveal animation */
      .reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1);
      }
      .reveal.visible { opacity: 1; transform: none; }

      /* project card hover */
      .proj-card { transition: transform .18s ease, box-shadow .18s ease; }
      .proj-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.08); }

      /* blog card hover */
      .blog-card { transition: transform .18s ease; cursor: pointer; }
      .blog-card:hover { transform: translateY(-3px); }

      /* contact btn hover */
      .contact-btn { transition: transform .15s ease, border-color .15s ease; }
      .contact-btn:hover { transform: translateY(-2px); border-color: var(--accent) !important; }

      /* skill pill hover */
      .skill-pill-item { transition: transform .15s ease; cursor: pointer; borderRadius:999px; }
      .skill-pill-item:hover { transform: scale(1.06) translateY(-2px); }

      /* ticker */
      @keyframes ticker-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes ticker-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      .ticker-track { display: flex; width: max-content; will-change: transform; }
      .ticker-track:hover { animation-play-state: paused !important; }

      /* dock — pill expand */
      .dock-btn {
        overflow: hidden;
        width: 38px;
        transition: width .32s cubic-bezier(.34,1.15,.64,1), background .15s ease, color .15s ease;
      }
      .dock-btn:hover, .dock-btn.dock-active {
        width: auto;
      }
      .dock-btn .dock-label {
        overflow: hidden;
        white-space: nowrap;
        max-width: 0;
        opacity: 0;
        transition: max-width .28s cubic-bezier(.34,1.15,.64,1), opacity .14s ease .1s;
      }
      .dock-btn:hover .dock-label, .dock-btn.dock-active .dock-label {
        max-width: 60px;
        opacity: 1;
      }

      /* photo grid */
      .photo-card-wrap { cursor: zoom-in; }
      .photo-img { transition: transform .45s ease; }
      .photo-img:hover { transform: scale(1.04); }

      /* lightbox */
      @keyframes lb-in  { from { opacity: 0; } to { opacity: 1; } }
      @keyframes lb-img { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: scale(1); } }
      .lb-overlay {
        position: fixed; inset: 0; z-index: 1000;
        background: rgba(0,0,0,.88);
        display: flex; align-items: center; justify-content: center;
        animation: lb-in .18s ease both;
      }
      .lb-img-wrap {
        position: relative; max-width: 92vw; max-height: 86vh;
        animation: lb-img .22s cubic-bezier(.22,1,.36,1) both;
      }
      .lb-img-wrap img {
        display: block; max-width: 92vw; max-height: 80vh;
        width: auto; height: auto;
        border-radius: 12px; object-fit: contain;
      }
      .lb-btn {
        position: fixed; top: 50%; transform: translateY(-50%);
        width: 48px; height: 48px; border-radius: 50%;
        background: rgba(255,255,255,.12); border: 0.5px solid rgba(255,255,255,.2);
        color: #fff; font-size: 18px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background .15s ease;
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      }
      .lb-btn:hover { background: rgba(255,255,255,.22); }
      .lb-btn.prev { left: 20px; }
      .lb-btn.next { right: 20px; }
      .lb-close {
        position: fixed; top: 20px; right: 20px;
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,.12); border: 0.5px solid rgba(255,255,255,.2);
        color: #fff; font-size: 16px;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background .15s ease;
        backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      }
      .lb-close:hover { background: rgba(255,255,255,.22); }
      .lb-caption {
        position: absolute; bottom: -32px; left: 0; right: 0;
        text-align: center; font-size: 13px; font-weight: 500; color: rgba(255,255,255,.6);
      }
      .lb-counter {
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        font-size: 12px; font-weight: 600; color: rgba(255,255,255,.5);
        letter-spacing: .06em;
      }
      @media (max-width: 480px) {
        .lb-btn { width: 40px; height: 40px; font-size: 15px; }
        .lb-btn.prev { left: 10px; }
        .lb-btn.next { right: 10px; }
        .proj-card { height: auto !important; min-height: 0 !important; }
        .h-card { padding: 1.5rem !important; }
        .page-wrap { padding: 0 .875rem calc(env(safe-area-inset-bottom, 0px) + 5rem); }
        nav[aria-label="Section navigation"] {
              bottom: calc(env(safe-area-inset-bottom, 0px) + 12px) !important;
            }
      }
      @media (max-width: 480px) {
        nav[aria-label="Section navigation"] {
          bottom: calc(env(safe-area-inset-bottom, 0px) + 12px) !important;
        }
      }

      /* RESPONSIVE LAYOUT */

      .page-wrap {
        max-width: 860px;
        margin: 0 auto;
        padding: 0 1.25rem 6rem;
      }

      /* Projects: default 2-col grid */
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: .75rem;
      }

      /* Photos: default 4-col */
      .photos-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: .75rem;
      }

      /* Blog: default 3-col */
      .blog-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: .75rem;
      }

      /* Education: 2-col */
      .edu-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: .75rem;
      }

      /* Contact: 4-col */
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: .75rem;
      }

      /* ── Tablet ── */
      @media (max-width: 700px) {
        .projects-grid { grid-template-columns: 1fr; }
        .blog-grid     { grid-template-columns: repeat(2, 1fr); }
        .photos-grid   { grid-template-columns: repeat(2, 1fr); }
        .edu-grid      { grid-template-columns: 1fr; }
        .contact-grid  { grid-template-columns: repeat(2, 1fr); }
        .hero-section  { flex-direction: column; text-align: center; }
        .hero-btns     { justify-content: center !important; }
      }

      /* ── Phone ── */
      @media (max-width: 480px) {
        .page-wrap { padding: 0 .875rem calc(env(safe-area-inset-bottom, 0px) + 5rem); }
        .projects-grid { grid-template-columns: 1fr; }
        .photos-grid   { grid-template-columns: repeat(2, 1fr); }
        .blog-grid     { grid-template-columns: 1fr; }
        .contact-grid  { grid-template-columns: repeat(2, 1fr); }
        .section-title { font-size: 22px !important; }
        .hero-name     { font-size: 30px !important; }

        /* Project on mobile: row layout */
        .proj-card-inner { flex-direction: row !important; align-items: flex-start !important; }
        .proj-icon-wrap  { flex-shrink: 0; }
        .proj-body       { flex: 1; min-width: 0; }

        /* Dock on mobile: shrink padding */
        .dock-pill       { gap: 2px; padding: 5px 8px; }
        .dock-btn        { padding-left: 9px !important; }
      }
    `}</style>
  );
}

/* ── Reveal on scroll hook ── */
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

/* ── Chip ── */
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

/* ── Section Header ── */
function SectionHeader({ eyebrow, title }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 6 }}>
        — {eyebrow}
      </p>
      <h2 className="section-title" style={{ fontSize: 28, fontWeight: 700, color: "var(--text)" }}>{title}</h2>
    </div>
  );
}

/* ── Card wrapper ── */
function Card({ children, style = {}, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Nav ── */
const NAV_ITEMS = [
  { id: "projects", label: "Projects", icon: "fa-brands fa-jira" },
  { id: "skills",   label: "Skills",   icon: "fa-solid fa-star" },
  { id: "photos",   label: "Photos",   icon: "fa-solid fa-camera" },
  { id: "blog",     label: "Blog",     icon: "fa-solid fa-pen-nib" },
  { id: "contact",  label: "Contact",  icon: "fa-solid fa-envelope" },
];

function Nav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

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
      {NAV_ITEMS.map(({ id, label, icon }) => {
        return (
          <a
            key={id}
            href={`#${id}`}
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
        );
      })}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={{ padding: "5rem 0 3rem" }}>
      <Card className="h-card" style={{ padding: "2.5rem", overflow: "hidden", position: "relative" }}>
        {/* decorative blobs */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "#EEEDFE", opacity: .6, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "#E1F5EE", opacity: .5, pointerEvents: "none" }} />

        <div className="hero-section" style={{ display: "flex", alignItems: "center", gap: "2.5rem", position: "relative", zIndex: 1 }}>
          {/* avatar */}
          <div className="h-avatar" style={{ flexShrink: 0 }}>
            <div style={{
              width: 88, height: 88, borderRadius: "50%",
              background: "linear-gradient(135deg, #EEEDFE 0%, #E1F5EE 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "3px solid var(--surface)",
              boxShadow: "0 0 0 1px var(--border-md)",
            }}>
              <i className="fa-solid fa-laptop-code" style={{ fontSize: 32, color: "var(--accent)" }} aria-hidden="true" />
            </div>
          </div>

          {/* text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {rawh.availableForWork && (
              <div className="h-badge" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 12, fontWeight: 600, padding: "4px 12px",
                borderRadius: 999, background: "#E1F5EE", color: "#085041",
                border: "0.5px solid #5DCAA5", marginBottom: 14,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
                Open to work
              </div>
            )}

            <h1 className="hero-name h-name" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 10 }}>
              Hey, I'm{" "}
              <span style={{ color: "var(--accent)" }}>{rawh.name}</span> 
            </h1>

            <p className="h-tagline" style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 420, marginBottom: 22 }}>
              {rawh.tagline}
            </p>

            <div className="hero-btns h-btns" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#projects"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", borderRadius: 12,
                  background: "var(--accent)", color: "#fff",
                  fontSize: 14, fontWeight: 600, textDecoration: "none", border: "none",
                }}>
                <i className="fa-solid fa-eye" aria-hidden="true" />
                View my work
              </a>
              <a href="#contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", borderRadius: 12,
                  background: "transparent", color: "var(--text)",
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

/* ── Project Card ── */
function ProjectCard({ project, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <Card className="proj-card" style={{ padding: "1.25rem", height: 260, display: "flex", flexDirection: "column" }}>
        {/* proj-card-inner becomes row on mobile via CSS */}
        <div className="proj-card-inner" style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minHeight: 0 }}>
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
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{project.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {project.tags.map((t, i) => <Chip key={t} label={t} colorKey={project.tagColors[i] || "gray"} />)}
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 12, fontWeight: 600, padding: "5px 12px",
                    borderRadius: 8, border: "0.5px solid var(--border-md)",
                    color: "var(--text-2)", textDecoration: "none", background: "transparent",
                  }}>
                  <i className="fa-brands fa-github" style={{ fontSize: 13 }} aria-hidden="true" />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 12, fontWeight: 600, padding: "5px 12px",
                    borderRadius: 8, border: `0.5px solid ${project.accentBg}`,
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
    </div>
  );
}

/* ── Skills Ticker ── */
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
        width: 28, height: 28, borderRadius: 8,
        background: skill.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, borderRadius: 999,
      }}>
        <i className={skill.icon} style={{ fontSize: 14, color: skill.iconColor }} aria-hidden="true" />
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>{skill.name}</span>
    </div>
  );
}

function SkillsTicker({ skills, direction = "left", speed = 28 }) {
  // quadruple for seamless loop
  const items = [...skills, ...skills, ...skills, ...skills];
  const animName = direction === "right" ? "ticker-right" : "ticker-left";
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", padding: "8px 0" }}>
      {/* fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />
      <div
        className="ticker-track"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {items.map((s, i) => <SkillPill key={i} skill={s} />)}
      </div>
    </div>
  );
}

/* ── Photo Card ── */
function PhotoCard({ photo, index, onOpen, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal photo-card-wrap" style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onOpen(index)}
      role="button" tabIndex={0} aria-label={`Open photo: ${photo.alt}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(index); }}
    >
      <Card style={{ overflow: "hidden", padding: 0 }}>
        <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
          <img
            className="photo-img"
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {photo.caption && (
          <div style={{ padding: "8px 12px" }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--text-3)" }}>{photo.caption}</p>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  // keyboard nav + lock body scroll
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const photo = photos[index];

  return (
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Photo lightbox">
      {/* stop click-through on image area */}
      <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} />
        {photo.caption && <p className="lb-caption">{photo.caption}</p>}
      </div>

      {/* close */}
      <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>

      {/* prev */}
      {photos.length > 1 && (
        <button className="lb-btn prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous photo">
          <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>
      )}

      {/* next */}
      {photos.length > 1 && (
        <button className="lb-btn next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next photo">
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>
      )}

      {/* counter */}
      {photos.length > 1 && (
        <p className="lb-counter">{index + 1} / {photos.length}</p>
      )}
    </div>
  );
}

/* ── Blog Card ── */
function BlogCard({ post, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <Card className="blog-card" style={{ padding: "1.25rem", height: "100%", display: "flex", flexDirection: "column" }}
        onClick={() => window.open(post.href, "_blank")}>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 8 }}>
          {post.tags.map((t, i) => <Chip key={t} label={t} colorKey={post.tagColors[i] || "gray"} />)}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 6, flex: 1 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 12 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>{post.date}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>
            <i className="fa-solid fa-clock" style={{ fontSize: 10 }} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </Card>
    </div>
  );
}

/* ── Education Card ── */
function EduCard({ edu, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
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
    </div>
  );
}

/* ── Contact Button ── */
function ContactBtn({ label, href, icon, bgColor, iconColor }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-btn"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        padding: "1.1rem 1rem", borderRadius: "var(--radius-lg)",
        background: "var(--surface)", border: "0.5px solid var(--border)",
        textDecoration: "none",
      }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <i className={icon} style={{ fontSize: 18, color: iconColor }} aria-hidden="true" />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
    </a>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ borderTop: "0.5px solid var(--border)", padding: "2rem 1.25rem", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>
        © {rawh.footerYear} {rawh.name} · Built with Next.js &amp; ☕
      </p>
    </footer>
  );
}

/* ── Main Page ── */
export default function Portfolio() {
  const [lbIndex, setLbIndex] = useState(null);
  const openLb  = (i) => setLbIndex(i);
  const closeLb = ()  => setLbIndex(null);
  const prevLb  = ()  => setLbIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const nextLb  = ()  => setLbIndex((i) => (i + 1) % PHOTOS.length);
  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <Nav />

      <main className="page-wrap">

        {/* HERO */}
        <Hero />

        {/* PROJECTS */}
        <section id="projects" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="projects" title="Things I've built" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ marginBottom: "3.5rem" }}>
          <div style={{ paddingLeft: 0, paddingRight: 0 }}>
            <SectionHeader eyebrow="toolbox" title="Skills & tech" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 -1.25rem" }}>
            <SkillsTicker skills={SKILLS_ROW1} direction="left"  speed={26} />
            <SkillsTicker skills={SKILLS_ROW2} direction="right" speed={32} />
          </div>
        </section>

        {/* PHOTOS */}
        <section id="photos" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="life outside code" title="Photos" />
          <div className="photos-grid">
            {PHOTOS.map((photo, i) => (
              <PhotoCard key={photo.src} photo={photo} index={i} onOpen={openLb} delay={i * 60} />
            ))}
          </div>
        </section>

        {lbIndex !== null && (
          <Lightbox photos={PHOTOS} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
        )}

        {/* BLOG */}
        <section id="blog" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="writing" title="Blog" />
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={post.title} post={post} delay={i * 80} />
            ))}
          </div>
        </section>
        {/* EDUCATION */}
        <section id="education" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="background" title="Education" />
          <div className="edu-grid">
            {EDUCATION.map((edu, i) => (
              <EduCard key={edu.school} edu={edu} delay={i * 80} />
            ))}
          </div>
        </section>
        {/* CONTACT */}
        <section id="contact" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="say hello" title="Let's build something great" />
          <div className="contact-grid">
            <ContactBtn label="Email"    href={`mailto:${rawh.email}`} icon="fa-solid fa-envelope"    bgColor="#EEEDFE" iconColor="#534AB7" />
            <ContactBtn label="GitHub"   href={rawh.github}           icon="fa-brands fa-github"      bgColor="#F1EFE8" iconColor="#444441" />
            <ContactBtn label="LinkedIn" href={rawh.linkedin}         icon="fa-brands fa-linkedin"    bgColor="#E6F1FB" iconColor="#185FA5" />
            <ContactBtn label="Telegram"  href={rawh.telegram}          icon="fa-brands fa-telegram"   bgColor="#F1EFE8" iconColor="#444441" />
            <ContactBtn label="Facebook"  href={rawh.facebook}           icon="fa-brands fa-facebook"    bgColor="#E6F1FB" iconColor="#1DA1F2" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}