import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { useRef } from "react";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const firstName = "Oleksii";
  const lastName = "Zarytskyi";
  const subtitle = "Crafting Digital Experiences";

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center px-6">
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-7xl w-full"
      >
        <motion.div className="space-y-8">
          {/* Animated background text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="font-display font-black text-[20vw] whitespace-nowrap"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              CREATIVE • DEVELOPER • DESIGNER •
            </motion.div>
          </motion.div>

          {/* Main title with stagger effect */}
          <div className="relative z-10">
            <motion.h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none">
              {/* First name */}
              {firstName.split("").map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.8,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                  className="inline-block"
                  style={{
                    transformOrigin: "bottom",
                  }}
                >
                  {char}
                </motion.span>
              ))}

              {/* Перенос между именем и фамилией:
                  на мобиле -> новая строка (block)
                  на md+ -> в той же строке (inline) */}
              <span
                className="block md:inline"
                aria-hidden="true"
              >
                {" "}
              </span>

              {/* Last name — без разрыва на мобиле */}
              <span className="inline-block whitespace-nowrap md:whitespace-normal">
                {lastName.split("").map((char, i) => (
                  <motion.span
                    key={`last-${i}`}
                    initial={{ opacity: 0, y: 100, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      // продолжаем задержку после имени
                      delay: (firstName.length + i) * 0.05,
                      duration: 0.8,
                      ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                    className="inline-block"
                    style={{
                      transformOrigin: "bottom",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>

          {/* Subtitle with split effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative"
          >
            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground font-light tracking-wide"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 1.2, duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              {subtitle}
            </motion.p>
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Get in Touch button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex gap-6 pt-8"
          >
            <MagneticButton>
              <motion.button
                className="relative px-8 py-4 bg-surface-elevated text-foreground rounded-xl font-semibold border border-border overflow-hidden group"
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get in Touch</span>
              </motion.button>
            </MagneticButton>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -right-20 top-1/2 w-64 h-64 border border-primary/20 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>

        {/* Scroll indicator with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              Scroll to Explore
            </span>
            <motion.div
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1 h-2 bg-primary rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};