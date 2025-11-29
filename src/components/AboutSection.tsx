import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AboutSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  const skills = [
    { name: "React & TypeScript", level: 95 },
    { name: "Framer Motion", level: 90 },
    { name: "Three.js", level: 85 },
    { name: "GSAP", level: 88 },
    { name: "WebGL", level: 80 },
    { name: "UI/UX Design", level: 92 },
  ];

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Morphing background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left column - Text */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <div className="overflow-hidden">
                <motion.h2
                  className="font-display text-6xl md:text-8xl font-bold"
                  initial={{ y: 100 }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                >
                  About
                </motion.h2>
              </div>

              <motion.div
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {[
                  "I'm a creative developer passionate about crafting immersive digital experiences that push the boundaries of web interaction.",
                  "With expertise in modern web technologies and a keen eye for design, I transform ideas into award-winning digital products that engage and inspire.",
                  "My work combines technical precision with creative vision, resulting in unique experiences that leave lasting impressions.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    className="relative pl-6 border-l-2 border-primary/30"
                    whileHover={{ x: 10, borderColor: "hsl(var(--primary))" }}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-4xl font-bold mb-12"
            >
              Skills & Expertise
            </motion.h3>

            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-xl font-medium group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      whileHover={{ scaleY: 1.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative 3D element */}
            <motion.div
              className="mt-20 relative h-64"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.5, delay: 1.5 }}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl"
                animate={{
                  rotateY: [0, 10, 0],
                  rotateX: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateY: 15, rotateX: 10 }}
              >
                <div className="absolute inset-4 border-2 border-primary/50 rounded-xl" />
                <div className="absolute inset-8 border border-primary/30 rounded-lg" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
