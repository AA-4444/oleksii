import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

const NotFound = () => {
  const location = useLocation();

  // для интерактива от мышки
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const circle1X = useTransform(mouseX, (v) => v * 0.03);
  const circle1Y = useTransform(mouseY, (v) => v * 0.03);
  const circle2X = useTransform(mouseX, (v) => v * -0.02);
  const circle2Y = useTransform(mouseY, (v) => v * 0.04);
  const circle3X = useTransform(mouseX, (v) => v * 0.015);
  const circle3Y = useTransform(mouseY, (v) => v * -0.03);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // обработчик движения мышки
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 cursor-auto"
      onMouseMove={handleMouseMove}
    >
      {/* фон как на hero: грид + свечения */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.20),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* интерактивные геометрические фигуры */}
      <motion.div
        className="pointer-events-none absolute -left-40 -top-10 w-80 h-80 border border-primary/25 rounded-full"
        style={{ x: circle1X, y: circle1Y }}
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-48 bottom-0 w-96 h-96 border border-primary/20 rounded-[3rem]"
        style={{ x: circle2X, y: circle2Y }}
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/4 w-72 h-72 border border-primary/15 rounded-full"
        style={{ x: circle3X, y: circle3Y }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* scrolling background text */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="font-display font-black text-[18vw] whitespace-nowrap"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          404 • NOT FOUND • LOST •
        </motion.div>
      </motion.div>

      {/* main content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* big 404 */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="inline-block"
        >
          <motion.h1
            className="font-display font-black text-7xl md:text-9xl tracking-tighter leading-none"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
          >
            {"404".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 80,
                    rotateX: -90,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="mt-4 text-xl md:text-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            You&apos;ve ventured into uncharted territory.
          </motion.div>
        </motion.div>

        {/* route info */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          The page{" "}
          <span className="font-mono text-foreground">
            {location.pathname}
          </span>{" "}
          does not exist.
        </motion.p>

        {/* buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <MagneticButton>
            <Link to="/">
              <motion.button
                className="relative px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Back to Home</span>
              </motion.button>
            </Link>
          </MagneticButton>

          <Link
            to="/contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Or get in touch about this glitch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;