import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TypingText } from "./TypingText";

const gridTexts = [
  "Creative",
  "Portfolio",
  "2025",
  "Design",
  "Development",
  "Interactive",
  "Code",
  "Experience",
  "Digital",
  "Studio"
];

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  // Generate random cells with text - spread out, no adjacent cells
  const getTextForCell = (index: number) => {
    // Positions spread across grid to avoid clustering
    const textCells = [1, 7, 15, 21, 29, 34, 41, 47];
    const cellIndex = textCells.indexOf(index);
    return cellIndex !== -1 ? gridTexts[cellIndex] : null;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / 50,
          y: (e.clientY - centerY) / 50,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-rows-6 md:grid-rows-6 lg:grid-rows-6">
        {Array.from({ length: 48 }).map((_, index) => {
          const text = getTextForCell(index);
          const isHovered = hoveredCell === index;
          
          return (
            <motion.div
              key={index}
              className="relative border border-primary/20 flex items-center justify-center p-3 md:p-4"
              onHoverStart={() => setHoveredCell(index)}
              onHoverEnd={() => setHoveredCell(null)}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundColor: text 
                  ? "hsl(var(--primary))"
                  : isHovered 
                    ? "hsl(var(--primary) / 0.1)" 
                    : "transparent",
                borderColor: isHovered
                  ? "hsl(var(--primary) / 0.6)"
                  : "hsl(var(--primary) / 0.2)"
              }}
              transition={{ 
                opacity: { delay: index * 0.005, duration: 0.3 },
                backgroundColor: { duration: 0.2 },
                borderColor: { duration: 0.2 }
              }}
            >
              {text && (
                <motion.span
                  className="font-mono text-[0.55rem] md:text-xs text-black font-bold select-none break-words text-center leading-tight"
                  animate={{
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {text}
                </motion.span>
              )}
              
              {/* Hover glow effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-primary/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Layered on Top */}
      <div className="container mx-auto px-6 z-20 relative">
        <motion.div
          style={{ scale, y }}
          className="text-center space-y-12"
        >
          {/* Interactive main heading */}
          <div className="space-y-4 cursor-default">
            <motion.h1 
              className="text-[18vw] md:text-[14vw] font-display leading-none tracking-tight select-none text-white"
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
            >
              <motion.div
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ transformPerspective: 1000 }}
              >
                {["O", "L", "E", "K", "S", "I", "I"].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + i * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: "hsl(var(--primary))",
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </motion.h1>
            
            <motion.h1 
              className="text-[18vw] md:text-[14vw] font-display leading-none tracking-tight text-white select-none"
              style={{
                x: -mousePosition.x * 0.5,
                y: -mousePosition.y * 0.5,
              }}
            >
              <motion.div
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ transformPerspective: 1000 }}
              >
                {["Z", "A", "R", "Y", "T", "S", "K", "Y", "I"].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.7 + i * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      y: -10,
                      rotate: [0, 15, -15, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </motion.h1>
          </div>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-center gap-6 text-2xl md:text-3xl font-light min-h-[3rem]"
          >
            <span className="text-muted-foreground font-mono">
              <TypingText
                text="Crafting Digital Experiences"
                delay={0.2}     
                speed={0.02}    
               />
            </span>
          </motion.div>

          {/* Enhanced EXPLORE WORK button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="pt-8"
          >
            <motion.button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-12 py-6 font-mono text-lg font-bold overflow-hidden cursor-pointer"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
...
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
