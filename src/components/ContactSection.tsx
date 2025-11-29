import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export const ContactSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <motion.section
      ref={containerRef}
      style={{ scale, rotate }}
      className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden"
    >
      {/* Radial gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={textRef} className="max-w-6xl w-full text-center relative">
        {/* Floating decorative circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-primary/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: 360,
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}

        {/* Main heading with split reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            className="font-display text-6xl md:text-8xl lg:text-[12rem] font-black leading-none"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            LET'S
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h2
            className="font-display text-6xl md:text-8xl lg:text-[12rem] font-black leading-none"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.span
              className="inline-block"
              animate={{
                color: [
                  "hsl(var(--primary))",
                  "hsl(var(--accent))",
                  "hsl(var(--primary))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              COLLABORATE
            </motion.span>
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto"
        >
          Have a project in mind? Let's create something extraordinary together.
        </motion.p>

        {/* Email button with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <MagneticButton>
            <motion.a
              href="mailto:hello@example.com"
              className="group relative inline-block px-12 py-6 bg-primary text-primary-foreground rounded-full font-semibold text-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.span
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Text with glitch effect */}
              <span className="relative z-10 block">
                hello@example.com
              </span>
              
              {/* Glitch layers */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100"
                style={{ clipPath: "inset(0 0 50% 0)" }}
                animate={{
                  x: [-2, 2, -2],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                }}
              >
                hello@example.com
              </motion.span>
              
              {/* Shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex gap-12 justify-center"
        >
          {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              className="relative text-muted-foreground hover:text-primary transition-colors duration-300 text-lg group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {social}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Decorative animated line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 2, delay: 1.2 }}
        />
      </div>
    </motion.section>
  );
};
