import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Project Alpha",
    category: "Web Design",
    year: "2024",
    color: "189 94% 58%",
  },
  {
    title: "Project Beta",
    category: "Brand Identity",
    year: "2024",
    color: "280 100% 70%",
  },
  {
    title: "Project Gamma",
    category: "Interactive",
    year: "2023",
    color: "340 82% 52%",
  },
];

export const WorkSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="min-h-screen py-32 px-6 relative"
    >
      {/* Section transition effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background -z-10"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <motion.h2
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold relative inline-block"
            whileHover={{ x: 20 }}
            transition={{ duration: 0.3 }}
          >
            Selected Work
            <motion.div
              className="absolute -bottom-4 left-0 h-2 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

interface ProjectCardProps {
  project: { title: string; category: string; year: string; color: string };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, rotate }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="group relative"
    >
      {/* 3D Card Effect */}
      <motion.div
        className="relative h-96 rounded-3xl overflow-hidden cursor-pointer"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background with project color */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ background: `hsl(${project.color})` }}
          whileHover={{ scale: 1.1, opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(${project.color}) 1px, transparent 1px),
              linear-gradient(90deg, hsl(${project.color}) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-12">
          <div>
            <motion.p
              className="text-muted-foreground text-lg mb-4 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              {project.category}
            </motion.p>
            <motion.h3
              className="font-display text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2 }}
              whileHover={{ x: 20, color: `hsl(${project.color})` }}
            >
              {project.title}
            </motion.h3>
          </div>

          <div className="flex justify-between items-end">
            <motion.span
              className="text-2xl font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              {project.year}
            </motion.span>

            <motion.div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `hsl(${project.color})` }}
              whileHover={{ scale: 1.3, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: `hsl(${project.color})` }}
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(${project.color} / 0.2) 0%, transparent 50%)`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -right-8 -top-8 w-32 h-32 border-2 rounded-full opacity-20"
        style={{ borderColor: `hsl(${project.color})` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};
