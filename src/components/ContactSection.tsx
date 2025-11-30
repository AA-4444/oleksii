import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-16"
        >
          {/* Main CTA */}
          <div className="space-y-8">
            <motion.h2 
              className="text-[10vw] md:text-[8vw] font-display leading-[0.9]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LET'S CREATE
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                SOMETHING
              </motion.span>
              AMAZING
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
            >
              Have a project in mind? Let's collaborate and bring your vision to life.
            </motion.p>
          </div>

          {/* Enhanced GET IN TOUCH button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="group relative px-16 py-8 font-mono text-xl font-bold overflow-hidden cursor-pointer"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsButtonHovered(true)}
              onHoverEnd={() => setIsButtonHovered(false)}
            >
              {/* Main border */}
              <motion.div 
                className="absolute inset-0 border-2 border-primary"
                variants={{
                  hover: {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }
                }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Animated stripes background */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-y-0 bg-primary"
                    style={{
                      left: `${i * 12.5}%`,
                      width: "12.5%",
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    variants={{
                      hover: { scaleX: 1 }
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: i * 0.03,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Outer glow rings */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 0 0 hsl(var(--primary) / 0.7)",
                    "0 0 0 20px hsl(var(--primary) / 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Corner accents */}
              <motion.div
                className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary"
                variants={{
                  hover: { scale: 1.3, x: -6, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"
                variants={{
                  hover: { scale: 1.3, x: 6, y: -6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"
                variants={{
                  hover: { scale: 1.3, x: -6, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary"
                variants={{
                  hover: { scale: 1.3, x: 6, y: 6 }
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Glitch effect */}
              {isButtonHovered && (
                <>
                  <motion.div
                    className="absolute inset-0 border-2 border-primary"
                    animate={{
                      x: [-3, 3, -3, 0],
                      y: [2, -2, 2, 0],
                      opacity: [0.5, 1, 0.5, 0],
                    }}
                    transition={{ duration: 0.4, times: [0, 0.3, 0.6, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-primary"
                    animate={{
                      x: [3, -3, 3, 0],
                      y: [-2, 2, -2, 0],
                      opacity: [0.5, 1, 0.5, 0],
                    }}
                    transition={{ duration: 0.4, delay: 0.1, times: [0, 0.3, 0.6, 1] }}
                  />
                </>
              )}
              
              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-primary/50"
                variants={{
                  hover: {
                    top: ["0%", "100%"],
                  }
                }}
                transition={{ duration: 0.6, ease: "linear" }}
              />
              
              {/* Text */}
              <span className="relative z-10 flex items-center gap-4 text-foreground group-hover:text-background transition-colors duration-300">
                <motion.span
                  variants={{
                    hover: {
                      x: [-2, 2, -2, 0],
                    }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  GET IN TOUCH
                </motion.span>
                <motion.span
                  animate={isButtonHovered ? { 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.2, 1]
                  } : {
                    rotate: [0, 90, 0]
                  }}
                  transition={{ 
                    duration: isButtonHovered ? 0.6 : 2,
                    repeat: isButtonHovered ? 0 : Infinity,
                    repeatDelay: 1
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 pt-8 font-mono text-muted-foreground"
          >
            <motion.a
              href="mailto:hello@example.com"
              className="flex items-center gap-3 hover:text-primary transition-colors group"
              whileHover={{ x: 5 }}
            >
              <motion.span 
                className="text-primary"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              hello@example.com
            </motion.a>
            
            <span className="hidden md:block w-px h-8 bg-primary/30" />
            
            <motion.a
              href="tel:+1234567890"
              className="flex items-center gap-3 hover:text-primary transition-colors group"
              whileHover={{ x: 5 }}
            >
              <motion.span 
                className="text-primary"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              +1 (234) 567-890
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
