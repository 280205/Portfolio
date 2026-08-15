"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding border-t border-border">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Featured Projects</p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="section-title">Selected Works</h2>
            <a
              href="#"
              className="text-accent font-mono text-xs uppercase tracking-wider hover:text-accent/80 transition-colors mb-2"
            >
              Explore All Projects →
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-surface/40 to-surface/20 p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Project Image */}
              {p.image && (
                <div className="relative -mx-6 -mt-6 mb-6 h-56 overflow-hidden bg-surface-alt border-b border-border">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay for better text contrast if needed, or just let image shine */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge inside image */}
                  {p.url && (
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 border border-accent/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
                      Live
                    </span>
                  )}
                </div>
              )}

              {/* Status Badge if no image */}
              {!p.image && p.url && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
                  Live
                </span>
              )}

              {/* Category */}
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {p.category}
              </p>

              {/* Title */}
              <h3 className="mt-3 font-display text-2xl font-bold text-text">
                {p.name}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border-light px-2.5 py-1 font-mono text-[10px] text-muted-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 flex items-center gap-4">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-accent"
                  >
                    Live Demo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    GitHub
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
