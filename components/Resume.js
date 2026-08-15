"use client";

import { motion } from "framer-motion";
import { experience, education, certifications, honors, awards } from "@/lib/data";
import CertificationsCarousel from "./CertificationsCarousel";

export default function Resume() {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve worked</h2>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mt-12 space-y-0">
          {experience.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative border-l border-border pl-8 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink transition-colors group-hover:bg-accent" />

              <p className="font-mono text-xs text-muted-dark">{e.period}</p>
              <h3 className="mt-1.5 font-display text-xl font-medium text-text">
                {e.role}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-accent">{e.org}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {e.detail}
              </p>
              {e.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <p className="section-label">Education</p>
        </motion.div>

        <div className="mt-6 space-y-0">
          {education.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative border-l border-border pl-8 pb-8 last:pb-0"
            >
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink transition-colors group-hover:bg-accent" />
              <p className="font-mono text-xs text-muted-dark">{e.period}</p>
              <h3 className="mt-1.5 font-display text-lg font-medium text-text">
                {e.school}
                {e.meta && <span className="ml-2 font-mono text-sm text-accent">{e.meta}</span>}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{e.detail}</p>
            </motion.div>
          ))}
        </div>


        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-28"
        >
          <p className="section-label">Certifications</p>
        </motion.div>

        <CertificationsCarousel />
      </div>
    </section>
  );
}
