import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const PhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 relative"
      style={{ opacity }}
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left side - Animated title */}
          <motion.div 
            className="space-y-8"
            style={{ x: useTransform(x, (val) => val * 0.5) }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 w-32 bg-primary origin-left"
            />
            
            <motion.h2 
              className="text-6xl md:text-8xl font-display leading-[0.9]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              DESIGN IS{" "}
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                INTELLIGENCE
              </motion.span>{" "}
              MADE VISIBLE
            </motion.h2>
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            className="space-y-10"
            style={{ x: useTransform(x, (val) => -val * 0.3) }}
          >
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I believe in creating digital experiences that are not just
              functional, but <span className="text-primary font-medium">memorable</span>. Every pixel, every interaction,
              every animation tells a story.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "15+", label: "Clients" },
                { number: "5+", label: "Years" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-5xl md:text-6xl font-display text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                  <motion.div
                    className="h-px bg-primary mt-3 mx-auto"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
