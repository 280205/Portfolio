"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { services } from "@/lib/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className="section-padding border-t border-border relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="section-label">What I Do</p>
          <h2 className="section-title">
            Services &amp; Focus Areas
          </h2>
          <p className="mt-4 text-muted text-sm md:text-base leading-relaxed">
            I build intelligent solutions across AI, full-stack development and product engineering.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:w-[85%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative rounded-lg border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-surface/60 hover:shadow-lg hover:shadow-accent/10 backdrop-blur-sm"
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-mono text-sm font-bold">{service.num}</span>
              </div>
              <h3 className="mb-3 font-display text-lg font-bold text-text">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pointing Image positioned absolutely on the right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:block absolute bottom-0 -right-10 z-0 pointer-events-none"
        style={{ width: '700px', height: '850px' }}
      >
        <Image
          src="/pointing.png"
          alt="Nitin Pointing"
          fill
          className="object-contain object-bottom pointer-events-none drop-shadow-2xl"
          sizes="700px"
          quality={100}
          priority
        />
      </motion.div>
    </section>
  );
}
