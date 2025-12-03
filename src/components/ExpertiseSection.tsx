import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const tools = [
  "React", "TypeScript", "Next.js", "Tailwind CSS",
  "Framer Motion", "Three.js", "Node.js", "Swift",
  "SwiftUI", "JavaScript", "Python", "Docker",
  "Firebase", "MonogoDB", "Figma", "Git"
];

export const ExpertiseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center py-32 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-[8vw] md:text-[6vw] font-display leading-none mb-4">
            <span className="text-primary">EXPERTISE</span>
          </h2>
          <p className="text-xl font-mono text-muted-foreground">
            [ Tools & Technologies ]
          </p>
        </motion.div>

        {/* Animated Grid */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/20 p-px border-2 border-primary/30">
            {tools.map((tool, index) => {
              const isActive = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  className="relative aspect-square bg-background flex items-center justify-center cursor-pointer overflow-hidden group"
                  
                  // Desktop hover
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  
                  // Mobile tap -> activate hover
                  onTap={() =>
                    setHoveredIndex(prev => (prev === index ? null : index))
                  }

                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isActive
                        ? { scale: 1, opacity: 0.1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />

                  {/* Grid lines */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />

                  {/* Tool name */}
                  <motion.span
                    className="relative z-10 text-center font-mono font-bold text-foreground group-hover:text-primary transition-colors px-4"
                    animate={
                      isActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {tool}
                  </motion.span>

                  {/* Particle explosion */}
                  {isActive && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-primary rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            opacity: 1,
                          }}
                          animate={{
                            x: `${50 + Math.cos((i * Math.PI * 2) / 8) * 100}%`,
                            y: `${50 + Math.sin((i * Math.PI * 2) / 8) * 100}%`,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Glowing border */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 60px 0 hsl(var(--primary) / 0.2)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          className="text-center text-muted-foreground font-mono text-sm mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          [ Hover / Tap to interact ]
        </motion.p>
      </div>
    </motion.section>
  );
};
