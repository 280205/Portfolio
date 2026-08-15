"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-6 lg:px-10 py-8"
    >
      <div className="relative h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-left" />
    </motion.div>
  );
}
