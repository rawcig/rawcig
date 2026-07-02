'use client';

import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
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

// ── 1b. ABOUT ────────────────────────────────────────────────────────────────
const ABOUT = {
  bio: "I'm an MIS student at SETEC institute who likes building things end-to-end — from backend logic to the frontend they run on, almost called myself a fullstack? Most of my time goes into web apps, and now I start learning Spring boot, API to improve my backend skills.",
  facts: [
    { icon: "fa-solid fa-graduation-cap", label: "Studying", value: "Management Information Systems" },
    { icon: "fa-solid fa-location-dot",   label: "Based in", value: "Phnom Penh, Cambodia" },
    { icon: "fa-solid fa-code-branch",    label: "Focused on", value: "Full-stack dev" },
    { icon: "fa-solid fa-language",       label: "Languages", value: "Khmer & English" },
  ],
};

// ── 2. PROJECTS ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Event Management System",
    description:
      "A school web project — an event management system built with Laravel, handling registration and event data. Deployed on Render with Docker, including fixes for ephemeral storage so uploaded images persist across deploys.",
    tags: ["PHP", "Laravel", "Docker", "Bootstrap"],
    tagColors: ["purple"],
    github: "https://github.com/rawcig/event-mgt.git",
    demo: "https://wp-laravel-midterm.onrender.com/",
    icon: "fa-solid fa-cart-shopping",
    accent: "var(--accent)",
    accentBg: "var(--accent-bg)",
  },
  {
    title: "Self-Hosting Setup",
    description:
      "Repurposed an old laptop into a home server running Ubuntu Server, with Nginx as a reverse proxy. Currently solving a CGNAT issue from my ISP by setting up Cloudflare Tunnel so sokdara.xyz stays reachable without port forwarding.",
    tags: ["Ubuntu Server", "Nginx", "Linux"],
    tagColors: ["purple"],
    github: "#",
    demo: "#",
    icon: "fa-solid fa-server",
    accent: "var(--accent)",
    accentBg: "var(--accent-bg)",
  },
  {
    title: "This Portfolio",
    description:
      "This website built with Next.js, iOS inspired card design with a floating dock nav, entrance animations, all iterated and debugged from scratch.",
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
  title: "Self-hosting Web",
  description:
    "Documenting my self-hosting journey — Ubuntu Server setup on AWS EC2, reverse proxying with Nginx, Docker deployments, and working around my school project.",
  videoCount: 6,
};

// ── 3. SKILLS ─────────────────────────────────────────────────────────────────
// icon: Font Awesome class  |  color: hex for the icon circle bg
const SKILLS_ROW1 = [
  { name: "JavaScript", icon: "fa-brands fa-js",           color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "React",      icon: "fa-brands fa-react",        color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Next.js",    icon: "fa-solid fa-n",             color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "PHP",        icon: "fa-brands fa-php",          color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Laravel",    icon: "fa-brands fa-laravel",      color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Java",       icon: "fa-brands fa-java",         color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Spring Boot",icon: "fa-solid fa-leaf",          color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Dart",       icon: "fa-solid fa-code",          color: "var(--bg)", iconColor: "var(--text-2)" },
];

const SKILLS_ROW2 = [
  { name: "Docker",     icon: "fa-brands fa-docker",       color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Git",        icon: "fa-brands fa-git-alt",      color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Nginx",      icon: "fa-solid fa-server",        color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Linux",      icon: "fa-brands fa-linux",        color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MySQL",      icon: "fa-solid fa-database",      color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "MikroTik",   icon: "fa-solid fa-network-wired", color: "var(--bg)", iconColor: "var(--text-2)" },
  // { name: "Cloudflare", icon: "fa-brands fa-cloudflare",   color: "var(--bg)", iconColor: "var(--text-2)" },
  { name: "Tailwind",   icon: "fa-solid fa-wind",          color: "var(--bg)", iconColor: "var(--text-2)" },
];

// ── 4. PHOTOS ─────────────────────────────────────────────────────────────────


// ── 5. NOW LEARNING ────────────────────────────────────────────────────────
const NOW_LEARNING = [
  {
    title: "Spring Boot & REST APIs",
    excerpt: "Working through backend fundamentals, controllers, service layers, and REST API annotations.",
    date: "In progress",
    readTime: "School",
    tags: ["Java", "Spring Boot"],
    tagColors: ["teal"],
    href: "#",
  },
  {
    title: "Dart & OOP fundamentals",
    excerpt: "Learning Dart's type system, null safety, and OOP patterns.",
    date: "In progress",
    readTime: "School",
    tags: ["Dart", "OOP"],
    tagColors: ["teal"],
    href: "#",
  },
  {
    title: "Flutter Self-learning",
    excerpt: "Part of a school project, learning how Flutter UI works, mapping from data.",
    date: "In progress",
    readTime: "Self-learn",
    tags: ["Networking", "School"],
    tagColors: ["amber", "gray"],
    href: "#",
  },
];

// ── 6. EDUCATION ──────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    school: "Setec Institute",
    degree: "Management Information System",
    period: "2023 — Present",
    description: "Bachelor's Degree in Management Information Systems.",
  },
  {
    school: "Setec Institute",
    degree: "Design",
    period: "2021-2022",
    description: "Foundation Year of Bachelor's Degree in Design",
  },
  {
    school: "Hunsen Borey 100 Khnorng High School",
    degree: "High School Diploma",
    period: "2018 — 2021",
    description: "Graduated with honors, rank C in overall grade.",
  },
  {
    school: "Sovannaphumi School",
    degree: "GEP",
    period: "2015 — 2019",
    description: "Completed General English Program Level 7",
  },
];

// ─────────────────────────────────────────────
//  THEME — edit colors here
// ─────────────────────────────────────────────
const CHIP_COLORS = {
  // strong — accent fill, used for the "primary" tag
  purple: { bg: "var(--accent-bg)", color: "var(--accent)",  border: "transparent" },
  pink:   { bg: "var(--accent-bg)", color: "var(--accent)",  border: "transparent" },
  // medium — outlined, no fill
  teal:   { bg: "transparent",      color: "var(--text-2)",  border: "var(--border-md)" },
  amber:  { bg: "transparent",      color: "var(--text-2)",  border: "var(--border-md)" },
  green:  { bg: "transparent",      color: "var(--text-2)",  border: "var(--border-md)" },
  // subtle — soft neutral fill, lowest emphasis
  coral:  { bg: "var(--bg)",        color: "var(--text-3)",  border: "transparent" },
  gray:   { bg: "var(--bg)",        color: "var(--text-3)",  border: "transparent" },
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
// function GlobalStyles() {
//   return (
    
//   );
// }

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

/* ── Pop Card: bouncy scroll entrance + cursor tilt ── */
function PopCard({ children, delay = 0, tilt = true, style = {}, className = "" }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  };
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ height: "100%", ...style }}
      initial={{ opacity: 0, scale: 0.86, y: 26 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 260, damping: 19, delay: delay / 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ height: "100%", rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}>
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

/* ── Section Header ── */
function SectionHeader({ eyebrow, title, desc }) {
  const ref = useReveal();
  return (
    <>
      <p className="section-eyebrow" style={{
        position: "sticky", top: 14, zIndex: 3, alignSelf: "flex-start",
        display: "inline-flex", alignItems: "center", width: "fit-content",
        fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
        color: "var(--accent)", marginBottom: 6,
        background: "var(--surface)", border: "0.5px solid var(--border)",
        padding: "8px 12px", borderRadius: 999,
      }}>
        {eyebrow}
      </p>
      <div ref={ref} className="reveal" style={{ marginBottom: "1.5rem" }}>
        <h2 className="section-title" style={{ fontSize: 28, fontWeight: 700, color: "var(--text)" }}>{title}</h2>
        {desc && <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.6 }}>{desc}</p>}
      </div>
    </>
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
  { id: "about",    label: "About",    icon: "fa-solid fa-user" },
  { id: "projects", label: "Projects", icon: "fa-brands fa-jira" },
  { id: "skills",   label: "Skills",   icon: "fa-solid fa-star" },
  { id: "linux",    label: "Linux",    icon: "fa-brands fa-linux" },
  // { id: "photos",   label: "Photos",   icon: "fa-solid fa-camera" },
  { id: "blog",     label: "Learning", icon: "fa-solid fa-graduation-cap" },
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
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 700], [0, 130]);
  const blob1X = useTransform(scrollY, [0, 700], [0, -28]);
  const blob2Y = useTransform(scrollY, [0, 700], [0, -85]);
  const blob2X = useTransform(scrollY, [0, 700], [0, 36]);

  return (
    <section style={{ padding: "5rem 0 3rem" }}>
      <Card className="h-card" style={{ padding: "2.5rem", overflow: "hidden", position: "relative" }}>
        {/* decorative blobs — drift on scroll for a subtle parallax feel */}
        <motion.div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "#3d3b5d", opacity: .6, pointerEvents: "none", y: blob1Y, x: blob1X }} />
        <motion.div style={{ position: "absolute", bottom: -40, left: -40, width: 150, height: 150, borderRadius: "50%", background: "#1a1148", opacity: .5, pointerEvents: "none", y: blob2Y, x: blob2X }} />

        <div className="hero-section" style={{ display: "flex", alignItems: "center", gap: "2.5rem", position: "relative", zIndex: 1 }}>
          {/* avatar */}
          <div className="h-avatar" style={{ flexShrink:0 , border:'10px solid var(--surface)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: 164, height: 164, borderRadius: 999,
              background: "linear-gradient(135deg, #EEEDFE 0%, #E1F5EE 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",              
              border: "0px solid var(--surface)",
              boxShadow: "0 0 0 1px var(--border-md)",
            }}>
              {/* <i className="fa-solid fa-laptop-code" style={{ fontSize: 32, color: "var(--accent)" }} aria-hidden="true" /> */}
              {/* <Image loading="eager" src='/img/rawh.jpg' alt="Sokdara" width={164} height={164} style={{ borderRadius: 999, objectFit: "cover", alignSelf: 'center', objectPosition: "center top" }} /> */}
              <Image src="/img/rawh.jpg" alt="Sokdara" width={164} height={164} style={{ borderRadius: 999, objectFit: "cover", alignSelf: 'center', objectPosition: "center top" }} />
            </div>
          </div>
              {/* github profile link: https://avatars.githubusercontent.com/u/157391106?v=4  */}
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
              <a href="#projects" className="contact-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 24px", borderRadius: 999,
                  background: "var(--accent)", color: "#fff",
                  fontSize: 14, fontWeight: 600, textDecoration: "none", border: "none",
                }}>
                <i className="fa-solid fa-eye" aria-hidden="true" />
                View my work
              </a>
              <a href="#contact" className="contact-btn"
                style={{
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

/* ── About Section ── */
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
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}>
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

/* ── Project Card ── */
function ProjectCard({ project, delay }) {
  return (
    <PopCard delay={delay}>
      <Card className="proj-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column" }}>
        {/* proj-card-inner becomes row on mobile via CSS */}
        <div className="proj-card-inner" style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minHeight:0 }}>
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
            <p style={{height: 'auto' ,  fontSize: 13, color: "var(--text-2)", lineHeight: 1.65, flex: 1, overflow:'clip', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{project.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {project.tags.map((t, i) => <Chip key={t} label={t} colorKey={project.tagColors[i] || "gray"} />)}
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="contact-btn"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 12, fontWeight: 600, padding: "6px 14px",
                    borderRadius: 999, border: "0.5px solid var(--border-md)",
                    color: "var(--text-2)", textDecoration: "none", background: "var(--surface)",
                  }}>
                  <i className="fa-brands fa-github" style={{ fontSize: 13 }} aria-hidden="true" />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="contact-btn"
                  style={{
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

/* ── Linux Section ── */
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
 
          {/* embedded playlist player */}
          <div className="video-embed-wrap">
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${LINUX.playlistId}`}
              title={LINUX.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
 
          {/* footer row: count + link out */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-3)" }}>
              <i className="fa-solid fa-list" style={{ fontSize: 11 }} aria-hidden="true" />
              {LINUX.videoCount} videos
            </span>
            <a href={LINUX.playlistUrl} target="_blank" rel="noopener noreferrer" className="contact-btn"
              style={{
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
  return (
    <PopCard delay={delay}>
      <Card className="blog-card" style={{ padding: "1.25rem", height: "100%", display: "flex", flexDirection: "column" }}
        onClick={() => { if (post.href && post.href !== "#") window.open(post.href, "_blank"); }}>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 8 }}>
          {post.tags.map((t, i) => <Chip key={t} label={t} colorKey={post.tagColors[i] || "gray"} />)}
        </div>
        <h3 style={{ height:21, fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 6, flex: 2 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, marginBottom: 12 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>{post.date}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>
            <i className="fa-solid fa-clock" style={{ fontSize: 10 }} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
      </Card>
    </PopCard>
  );
}

/* ── Education Card ── */
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

/* ── Contact Button ── */
function ContactBtn({ label, href, icon, bgColor, iconColor }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-btn"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        padding: "0.5rem 0.5rem", borderRadius: "var(--radius-lg)",
        background: "var(--surface)", border: "0.5px solid var(--border)",
        textDecoration: "none",
      }}>
      <div style={{
        width: 26, height: 26, borderRadius: 10,
        background: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <i className={icon} style={{ fontSize: 12, color: iconColor }} aria-hidden="true" />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
    </a>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{
      borderTop: "0.5px solid var(--border)",
      padding: "2rem 1.25rem calc(env(safe-area-inset-bottom, 0px) + 5.5rem)",
      textAlign: "center",
    }}>
      <p style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 500 }}>
        © {rawh.footerYear} {rawh.name} · Built with Next.js &amp; ☕
      </p>
    </footer>
  );
}

/* ── Main Page ── */
export default function hehe() {
  const [lbIndex, setLbIndex] = useState(null);
  const openLb  = (i) => setLbIndex(i);
  const closeLb = ()  => setLbIndex(null);
  const prevLb  = ()  => setLbIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const nextLb  = ()  => setLbIndex((i) => (i + 1) % PHOTOS.length);
  return (
    <>
      <FontLoader />
      {/* <GlobalStyles /> */}
      <Nav />

      <main className="page-wrap">

        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <AboutSection />

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
          <SectionHeader eyebrow="toolbox" title="Skills & tech" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 -1.25rem" }}>
            <SkillsTicker skills={SKILLS_ROW1} direction="left"  speed={26} />
            <SkillsTicker skills={SKILLS_ROW2} direction="right" speed={32} />
          </div>
        </section>
          <LinuxSection />
 
        {/* PHOTOS */}
        {/* <section id="photos" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="life outside code" title="Photos" />
          <div className="photos-grid">
            {PHOTOS.map((photo, i) => (
              <PhotoCard key={photo.src} photo={photo} index={i} onOpen={openLb} delay={i * 60} />
            ))}
          </div>
        </section>
 
        {lbIndex !== null && (
          <Lightbox photos={PHOTOS} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
        )} */}

        {/* PHOTOS */}
        {/* <section id="photos" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="life outside code" title="Photos" desc="Productiviies and stuff" />
          <div className="photos-grid">
            {PHOTOS.map((photo, i) => (
              <PhotoCard key={photo.src} photo={photo} index={i} onOpen={openLb} delay={i * 60} />
            ))}
          </div>
        </section>

        {lbIndex !== null && (
          <Lightbox photos={PHOTOS} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
        )} */}

        {/* NOW LEARNING */}
        <section id="blog" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="currently" title="Now learning" desc="What I'm actively working through right now." />
          <div className="blog-grid">
            {NOW_LEARNING.map((post, i) => (
              <BlogCard key={post.title} post={post} delay={i * 80} />
            ))}
          </div>
        </section>
        {/* EDUCATION */}
        <section id="education" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="background" title="Education" desc="My academic journey and qualifications." />
          <div className="edu-grid">
            {EDUCATION.map((edu, i) => (
              <EduCard key={`${edu.school}-${i}`} edu={edu} delay={i * 80} />
            ))}
          </div>
        </section>
        {/* CONTACT */}
        <section id="contact" style={{ marginBottom: "3.5rem" }}>
          <SectionHeader eyebrow="say hello" title="Let's build something great" />
          <div className="contact-grid">
            <ContactBtn href={`mailto:${rawh.email}`} icon="fa-solid fa-envelope"    bgColor="#EEEDFE" iconColor="#534AB7" />
            <ContactBtn href={rawh.github} icon="fa-brands fa-github"      bgColor="#F1EFE8" iconColor="#444441" />
            <ContactBtn href={rawh.linkedin} icon="fa-brands fa-linkedin"    bgColor="#E6F1FB" iconColor="#185FA5" />
            <ContactBtn href={rawh.telegram} icon="fa-brands fa-telegram"   bgColor="#F1EFE8" iconColor="#444441" />
            <ContactBtn href={rawh.facebook} icon="fa-brands fa-facebook"    bgColor="#E6F1FB" iconColor="#1DA1F2" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}