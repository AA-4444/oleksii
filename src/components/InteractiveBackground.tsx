import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const InteractiveBackground = () => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, hsl(var(--gradient-end)) 0%, transparent 50%)
          `,
        }}
      />

      {/* Rotating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96"
        style={{
          rotate,
          scale,
          x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          y: useTransform(scrollYProgress, [0, 1], [-50, 150]),
        }}
      >
        <div className="w-full h-full border-2 border-primary/10 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [0, -180]),
          x: useTransform(scrollYProgress, [0, 1], [100, -100]),
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
        }}
      >
        <div className="w-full h-full border-2 border-primary/10" />
      </motion.div>

      {/* Animated lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            width: "200%",
            top: `${20 + i * 20}%`,
            left: "-50%",
            x: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
            opacity: useTransform(
              scrollYProgress,
              [i * 0.2, i * 0.2 + 0.3, i * 0.2 + 0.6],
              [0, 0.5, 0]
            ),
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Grid overlay that moves with scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          y: backgroundY,
        }}
      />

      {/* Pulsing gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
          x: useTransform(scrollYProgress, [0, 1], [0, 400]),
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--gradient-end) / 0.15) 0%, transparent 70%)`,
          x: useTransform(scrollYProgress, [0, 1], [0, -300]),
          y: useTransform(scrollYProgress, [0, 1], [0, 200]),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
