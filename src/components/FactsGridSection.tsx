import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const facts = [
  { text: "10+ Years\nCoding", position: 2 },
  { text: "500K+ Lines\nof Code", position: 5 },
  { text: "TypeScript\nEnthusiast", position: 8 },
  { text: "Open Source\nContributor", position: 11 },
  { text: "Performance\nObsessed", position: 14 },
  { text: "Clean Code\nAdvocate", position: 18 },
  { text: "React\nExpert", position: 21 },
  { text: "50+ Projects\nShipped", position: 25 },
  { text: "API Design\nSpecialist", position: 28 },
  { text: "Continuous\nLearner", position: 32 },
];

const totalCells = 36; // 6x6 grid

export const FactsGridSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getFactForCell = (index: number) => {
    return facts.find((fact) => fact.position === index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-8xl mb-12 md:mb-20 text-center"
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            FACTS & FIGURES
          </span>
        </motion.h2>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 max-w-6xl mx-auto">
          {Array.from({ length: totalCells }).map((_, index) => {
            const fact = getFactForCell(index);
            const isHovered = hoveredCell === index;
            
            // Calculate distance from mouse for ripple effect
            const cellElement = document.getElementById(`cell-${index}`);
            let distance = 1;
            if (cellElement && mousePos.x && mousePos.y) {
              const cellRect = cellElement.getBoundingClientRect();
              const cellCenterX = cellRect.left + cellRect.width / 2;
              const cellCenterY = cellRect.top + cellRect.height / 2;
              const dx = mousePos.x - (cellCenterX - (sectionRef.current?.getBoundingClientRect().left || 0));
              const dy = mousePos.y - (cellCenterY - (sectionRef.current?.getBoundingClientRect().top || 0));
              distance = Math.sqrt(dx * dx + dy * dy);
            }

            const proximity = Math.max(0, 1 - distance / 300);

            return (
              <motion.div
                key={index}
                id={`cell-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCell(index)}
                onMouseLeave={() => setHoveredCell(null)}
                className="relative aspect-square group cursor-pointer"
                style={{
                  transform: `scale(${1 + proximity * 0.1})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Cell background */}
                <div
                  className={`absolute inset-0 border transition-all duration-300 ${
                    fact
                      ? "border-primary/30 bg-background/5"
                      : "border-border/20 bg-background/0"
                  }`}
                  style={{
                    boxShadow: isHovered && fact
                      ? `0 0 30px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(255, 0, 0, 0.2)`
                      : proximity > 0.3
                      ? `0 0 ${proximity * 20}px rgba(255, 0, 0, ${proximity * 0.3})`
                      : "none",
                  }}
                />

                {/* Corner decorations for fact cells */}
                {fact && (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"
                      animate={{
                        opacity: isHovered ? 1 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"
                      animate={{
                        opacity: isHovered ? 1 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"
                      animate={{
                        opacity: isHovered ? 1 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"
                      animate={{
                        opacity: isHovered ? 1 : 0.3,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}

                {/* Fact content */}
                {fact && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-2 md:p-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <motion.p
                        className="font-mono text-[0.65rem] md:text-xs lg:text-sm font-bold leading-tight whitespace-pre-line"
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          color: isHovered ? "rgb(255, 0, 0)" : "rgb(255, 255, 255)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {fact.text}
                      </motion.p>
                      
                      {/* Animated underline on hover */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Hover particles */}
                {isHovered && fact && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        animate={{
                          x: `${50 + Math.cos((i / 8) * Math.PI * 2) * 100}%`,
                          y: `${50 + Math.sin((i / 8) * Math.PI * 2) * 100}%`,
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Background glow effect that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePos.x - 192,
          y: mousePos.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </section>
  );
};
