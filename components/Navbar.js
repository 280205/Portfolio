"use client";

import { useState, useEffect } from "react";
import { nav } from "@/lib/data";
import { useActiveSection } from "@/lib/useActiveSection";
import AudioPlayer from "./AudioPlayer";

export default function Navbar() {
  const active = useActiveSection(nav.map((n) => n.id));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    // Small delay so menu closes before scroll fires (needed when GSAP pin is active)
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      // Temporarily kill GSAP pin scroll-locks by scrolling to element's offsetTop
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-8 rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-ink/60 px-6 py-2 shadow-xl backdrop-blur-md"
            : "border-transparent bg-transparent px-2 py-2"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => go("hero")}
          className={`group flex items-center gap-3 transition-all duration-500 ${scrolled ? "mr-4" : "mr-8"}`}
        >
          <span className="font-display text-sm font-bold tracking-wide text-text">
            NITIN PANDEY
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted sm:inline">
            Software Engineer
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                active === item.id
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-muted hover:bg-white/5 hover:text-text"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="ml-2 pl-2 border-l border-white/10">
            <AudioPlayer />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-4 bg-text transition-all duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-text transition-all duration-300 ${
              menuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {nav.map((item, i) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className={`rounded-full px-8 py-3 font-display text-2xl font-medium transition-all ${
              active === item.id
                ? "bg-white/10 text-white"
                : "text-muted hover:bg-white/5 hover:text-text"
            }`}
            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
