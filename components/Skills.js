"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import { 
  SiPython, 
  SiCplusplus, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiDocker, 
  SiTensorflow
} from "react-icons/si";
import { FaLink, FaJava, FaAws } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";

const iconMap = {
  "Python": <SiPython className="text-[#3776AB]" />,
  "C++": <SiCplusplus className="text-[#00599C]" />,
  "Java": <FaJava className="text-[#007396]" />,
  "React.js": <SiReact className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="text-text" />,
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "PostgreSQL": <SiPostgresql className="text-[#4169E1]" />,
  "AWS": <FaAws className="text-[#FF9900]" />,
  "Docker": <SiDocker className="text-[#2496ED]" />,
  "TensorFlow": <SiTensorflow className="text-[#FF6F00]" />,
  "LangChain": <FaLink className="text-[#000000] dark:text-white" />
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding border-t border-border">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Skills Grid */}
          <div>
            <p className="section-label">Skills</p>
            <h2 className="section-title">Skills & Tech Stack</h2>
            
            <motion.div
              className="mt-8 grid grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={gridContainerVariants}
            >
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={gridItemVariants}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-surface/40 p-4 transition-all hover:border-accent hover:bg-surface/60 group"
                >
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                    {iconMap[tech.name] || <span className="text-2xl">{tech.icon}</span>}
                  </span>
                  <span className="text-center font-mono text-xs font-medium text-text-secondary">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Philosophy & Career Objective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-lg border border-border bg-surface/40 p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Philosophy & Career Objective</p>
            <p className="text-lg leading-relaxed text-text-secondary">
              To become a skilled software engineer developing innovative and impactful technology solutions in web engineering, AI, and robotics.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <FiChevronRight className="text-accent mt-[2px] text-lg flex-shrink-0" />
                <p className="text-sm text-muted">Building intelligent web applications with clean, scalable code</p>
              </div>
              <div className="flex items-start gap-3">
                <FiChevronRight className="text-accent mt-[2px] text-lg flex-shrink-0" />
                <p className="text-sm text-muted">Exploring AI/ML solutions that solve real-world problems</p>
              </div>
              <div className="flex items-start gap-3">
                <FiChevronRight className="text-accent mt-[2px] text-lg flex-shrink-0" />
                <p className="text-sm text-muted">Bridging the gap between innovation and practical implementation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
