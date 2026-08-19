"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/data";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Lightweight Particles ─────────────────────────────── */
function initParticles(canvas, count) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { update: () => { }, resize: () => { }, destroy: () => { } };

  let w, h, particles = [], animId = null, scrollProg = 0;

  function seed() {
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * (w || 1),
      y: Math.random() * (h || 1),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.15 - 0.05,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.35 + 0.08,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const spread = 1 + scrollProg * 1.5;
    const fade = 1 - scrollProg * 0.7;
    for (const p of particles) {
      p.x += p.vx * spread;
      p.y += p.vy * spread;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80, 180, 255, ${p.a * fade})`;
      ctx.fill();
    }
    animId = requestAnimationFrame(draw);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    seed();
  }

  resize();
  draw();

  return {
    update(p) { scrollProg = p; },
    resize,
    destroy() { if (animId) cancelAnimationFrame(animId); },
  };
}

/* ── Hero Component ────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const bgTextRef = useRef(null);
  const cardRef = useRef(null);
  const infoRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollHintRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const h = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", h);
    return () => {
      window.removeEventListener("resize", check);
      mq.removeEventListener("change", h);
    };
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // On mobile: NO pin — just a simple fade-out as user scrolls away.
        // The pin caused all nav section links to stop working on mobile.
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              particlesRef.current?.update(self.progress);
            },
          },
        })
          .to(contentRef.current, { opacity: 0, ease: "none" }, 0)
          .to(portraitRef.current, { opacity: 0, ease: "none" }, 0);
        return;
      }

      // Desktop: full cinematic parallax + pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            particlesRef.current?.update(self.progress);
          },
        },
      });

      // Portrait: scale + shift right + fade
      tl.to(portraitRef.current, {
        scale: 1.25, x: 220, opacity: 0, ease: "none",
      }, 0);

      // Content: shift left + fade
      tl.to(contentRef.current, {
        x: -80, opacity: 0, ease: "none",
      }, 0);

      // Background: counter-shift
      tl.to(bgRef.current, {
        x: -40, scale: 1.08, ease: "none",
      }, 0);

      // Background text: move opposite
      if (bgTextRef.current) {
        tl.to(bgTextRef.current, {
          x: 150, opacity: 0, ease: "none",
        }, 0);
      }

      // Profile card: rotate + drift away
      if (cardRef.current) {
        tl.to(cardRef.current, {
          x: 100, y: -60, rotationY: -20, opacity: 0, ease: "none",
        }, 0);
      }

      // Info blocks: fade
      if (infoRef.current) {
        tl.to(infoRef.current, {
          y: 40, opacity: 0, ease: "none", duration: 0.5,
        }, 0);
      }

      // Socials: fade
      if (socialsRef.current) {
        tl.to(socialsRef.current, {
          y: 30, opacity: 0, ease: "none", duration: 0.4,
        }, 0);
      }

      // Scroll hint: fade fast
      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current, {
          opacity: 0, y: -20, ease: "none", duration: 0.15,
        }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReduced]);

  // Particles
  useEffect(() => {
    if (prefersReduced || !canvasRef.current) return;
    const sys = initParticles(canvasRef.current, isMobile ? 12 : 35);
    particlesRef.current = sys;
    const onR = () => sys.resize();
    window.addEventListener("resize", onR);
    return () => { sys.destroy(); window.removeEventListener("resize", onR); };
  }, [isMobile, prefersReduced]);

  // Mouse parallax
  const handleMouse = useCallback((e) => {
    if (isMobile || prefersReduced) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseTarget.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    };
  }, [isMobile, prefersReduced]);

  useEffect(() => {
    if (isMobile || prefersReduced) return;
    function tick() {
      const l = 0.06;
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * l;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * l;
      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      if (portraitRef.current) {
        portraitRef.current.style.translate = `${mx * 15}px ${my * 10}px`;
      }
      if (bgRef.current) {
        bgRef.current.style.translate = `${mx * -6}px ${my * -4}px`;
      }
      if (cardRef.current) {
        cardRef.current.style.translate = `${mx * 25}px ${my * 18}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [isMobile, prefersReduced]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" ref={sectionRef} className="hero" onMouseMove={handleMouse}>
      <div className="hero-inner">
        {/* Background */}
        <div ref={bgRef} className="hero-bg">
          <div className="hero-bg__gradient" />
          <div className="hero-bg__gradient-2" />
          <div className="hero-bg__vignette" />
        </div>

        {/* Background Typography */}
        <div ref={bgTextRef} className="hero-bg-text" aria-hidden="true">
          {profile.firstName}
        </div>

        {/* Particles */}
        <canvas ref={canvasRef} className="hero-particles" />

        {/* Portrait */}
        <div ref={portraitRef} className="hero-portrait-wrap">
          <div className="hero-portrait-glow" />
          <img
            src="/nitin-transparent.png"
            alt={`${profile.name} — ${profile.role}`}
            className="hero-portrait-img"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
          <div className="hero-portrait-rim" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="hero-content">
          <p className="hero-greeting">Hello, I&apos;m</p>

          <h1 className="hero-name">
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </h1>
          {/* Subtitle / Role */}
          <p className="hero-subtitle">
            <span className="hero-subtitle__dash" />
            Software Engineer
          </p>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-ctas">
            <button className="hero-btn hero-btn--primary" onClick={() => go("portfolio")} aria-label="View Projects">
              View Projects
            </button>
            <button className="hero-btn hero-btn--secondary" onClick={() => go("contact")} aria-label="Contact Me">
              Contact Me
            </button>
            <a href="https://drive.google.com/file/d/1t16p-GCzNery2ftuYf1LSU6X1TP2oYJJ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--secondary" aria-label="Download Resume">
              Resume
            </a>
          </div>
        </div>

        {/* Profile Card (desktop) */}
        {!isMobile && (
          <div ref={cardRef} className="hero-profile-card">
            <img
              src="/nitin-transparent.png"
              alt="Nitin Pandey"
              className="hero-profile-card__img"
            />
            <p className="hero-profile-card__name">Nitin Pandey</p>
            <p className="hero-profile-card__role">Software Engineer</p>
            <p className="hero-profile-card__meta">
              VIT-AP University<br />
              CS &amp; Business Systems
            </p>
            <span className="hero-profile-card__badge">Developer</span>
          </div>
        )}

        {/* Info Blocks */}
        <div ref={infoRef} className="hero-info-blocks">
          <div className="hero-info-block">
            <span className="hero-info-block__num">8.70</span>
            <span className="hero-info-block__label">CGPA</span>
          </div>
          <div className="hero-info-block">
            <span className="hero-info-block__num">7+</span>
            <span className="hero-info-block__label">Major Projects</span>
          </div>
          <div className="hero-info-block">
            <span className="hero-info-block__num">2025</span>
            <span className="hero-info-block__label">Intern</span>
          </div>
          <div className="hero-info-block">
            <span className="hero-info-block__num">AI + Web</span>
            <span className="hero-info-block__label">Focus</span>
          </div>
        </div>

        {/* Social Links */}
        {!isMobile && (
          <div ref={socialsRef} className="hero-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href={`mailto:${profile.email}`} className="hero-social-link" aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
