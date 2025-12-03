import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import sping from "../assets/sping.png";
import nike from "../assets/nike.mp4";
import wengy from "../assets/wengy.png";
import ava from "../assets/ava.png";
import project2 from "../assets/project2.png";

const projects = [
  {
    title: "Dev Agency",
    category: "Web Development",
    year: "2025",
    description: "modern website of software developer company",
    mediaType: "image",
    src: sping,
  },
  {
    title: "Air1000",
    category: "Web Development",
    year: "2025",
    description: "Website inspired by nike air max 1000",
    mediaType: "video",
    src: nike,
  },
  {
    title: "Wengy",
    category: "Web Development",
    year: "2025",
    description: "Marketing Agency website",
    mediaType: "image",
    src: wengy,
  },
  {
    title: "Ava100",
    category: "Web Development",
    year: "2024",
    description: "Website of Real Estate Agency",
    mediaType: "image",
    src: ava,
  },
  {
    title: "City-Wall",
    category: "Web Development",
    year: "2025",
    description: "Website of cleaning company",
    mediaType: "image",
    src: project2,
  },
];

export const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      className="min-h-screen py-32 relative"
      style={{ opacity }}
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-[8vw] md:text-[6vw] font-display leading-none mb-6">
            SELECTED{" "}
            <motion.span 
              className="text-primary inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              WORK
            </motion.span>
          </h2>
          <motion.p 
            className="text-xl font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            [ Transforming ideas into digital reality ]
          </motion.p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-32">
          {projects.map((project, index) => {
            const projectRef = useRef<HTMLDivElement>(null);
            const projectInView = useInView(projectRef, { once: false, amount: 0.5 });

            return (
              <motion.div
                key={index}
                ref={projectRef}
                className="group cursor-pointer"
                initial={{ opacity: 0 }}
                animate={projectInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* Project Visual */}
                  <motion.div
                    className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={projectInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div 
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Media */}
                      {project.mediaType === "video" ? (
                        <motion.video
                          src={project.src}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          initial={{ scale: 1.05 }}
                          animate={projectInView ? { scale: 1 } : { scale: 1.05 }}
                          transition={{ duration: 0.8 }}
                        />
                      ) : (
                        <motion.img
                          src={project.src}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.05 }}
                          animate={projectInView ? { scale: 1 } : { scale: 1.05 }}
                          transition={{ duration: 0.8 }}
                        />
                      )}

                      {/* Лёгкий градиент сверху медиа */}
                      <motion.div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary/10"
                        initial={{ opacity: 0.4 }}
                        whileHover={{ opacity: 0.25 }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Project number поверх медиа */}
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-[18vw] md:text-[10vw] font-display text-primary/15 leading-none"
                          initial={{ scale: 0 }}
                          animate={projectInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          {(index + 1).toString().padStart(2, "0")}
                        </motion.span>
                      </div>

                      {/* Animated border */}
                      <motion.div
                        className="pointer-events-none absolute inset-0 border border-primary/60"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Project Info */}
                  <motion.div
                    className={`space-y-6 order-1 ${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                    initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                    animate={projectInView ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="space-y-2">
                      <motion.span
                        className="inline-block text-primary text-sm font-mono uppercase tracking-[0.3em]"
                        whileHover={{ x: 10 }}
                      >
                        [{project.category}]
                      </motion.span>
                      <motion.div className="text-xs font-mono text-muted-foreground">
                        {project.year}
                      </motion.div>
                    </div>
                    
                    <motion.h3
                      className="text-5xl md:text-6xl font-display leading-none group-hover:text-primary transition-colors duration-300"
                      whileHover={{ x: 10 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="text-lg text-muted-foreground font-light">
                      {project.description}
                    </p>

                    <motion.div
                      className="flex items-center gap-4 text-foreground font-mono text-sm pt-4 group-hover:text-primary transition-colors"
                      whileHover={{ x: 10 }}
                    >
                      <span>VIEW PROJECT</span>
                      <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};