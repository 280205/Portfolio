"use client";

import { motion } from "framer-motion";

export default function SectionShell({ id, command, file, children }) {
  return (
    <section id={id} className="relative scroll-mt-16 border-b border-border px-6 py-24 lg:px-16">
      {/* diff-wipe: two colored panels sweep away to reveal the section */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 origin-left bg-teal"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 origin-left bg-magenta"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 origin-left bg-ink"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="relative z-30 mx-auto max-w-4xl">
        {command && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-3 font-mono text-xs text-muted"
          >
            <span className="text-teal">nitin@vitap</span>
            <span className="text-muted">:~$ </span>
            <span className="text-text">{command}</span>
            <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-teal align-middle" />
          </motion.p>
        )}
        {file && (
          <p className="mb-8 font-mono text-[11px] uppercase tracking-widest text-magenta">// {file}</p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
