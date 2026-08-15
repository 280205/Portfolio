"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { FiMail, FiInstagram, FiGithub, FiLinkedin, FiMessageCircle, FiMapPin } from "react-icons/fi";

const contactItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Side - Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              LET&apos;S<br />
              <span className="text-accent">BUILD</span><br />
              TOGETHER
            </h2>
            <p className="text-base leading-relaxed text-muted mb-8 max-w-lg">
              Open for full-stack web development roles, Next.js / React projects, AI & IoT solutions, robotics workshops, and student tech event collaborations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-accent text-accent font-mono text-sm uppercase tracking-wider transition-all hover:bg-accent hover:text-ink"
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div
            className="space-y-6 lg:pl-16 xl:pl-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Email */}
            <motion.a
              href={`mailto:${profile.email}`}
              variants={contactItemVariants}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <FiMail className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">Email</p>
                <p className="text-text-secondary break-all group-hover:text-accent transition-colors">
                  {profile.email}
                </p>
              </div>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/nintendo_exe/"
              target="_blank"
              rel="noopener noreferrer"
              variants={contactItemVariants}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <FiInstagram className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">Instagram</p>
                <p className="text-text-secondary group-hover:text-accent transition-colors">
                  @nintendo_exe
                </p>
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={contactItemVariants}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <FiGithub className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">GitHub</p>
                <p className="text-text-secondary group-hover:text-accent transition-colors">
                  github.com/280205
                </p>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={contactItemVariants}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <FiLinkedin className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">LinkedIn</p>
                <p className="text-text-secondary group-hover:text-accent transition-colors">
                  linkedin.com/in/nitin-pandey
                </p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/918733015997"
              target="_blank"
              rel="noopener noreferrer"
              variants={contactItemVariants}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <FiMessageCircle className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">WhatsApp</p>
                <p className="text-text-secondary group-hover:text-accent transition-colors">
                  +91 8733015997
                </p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              variants={contactItemVariants}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center">
                <FiMapPin className="text-accent text-xl" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-dark">Location</p>
                <p className="text-text-secondary">
                  {profile.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 border-t border-border pt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-between"
        >
          <div>
            <p className="font-display text-sm font-medium text-text">
              {profile.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-dark">
              {profile.role}
            </p>
          </div>
          <p className="font-mono text-[10px] text-muted-dark">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
