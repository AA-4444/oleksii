import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  rotation: number;
  type: "circle" | "square" | "triangle";
}

export const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    // Generate random floating shapes
    const newShapes: FloatingShape[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 50,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      rotation: Math.random() * 360,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as FloatingShape["type"],
    }));
    setShapes(newShapes);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient meshes */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${useSpring(useTransform(mouseX, [-1, 1], ["20%", "80%"]))}% ${useSpring(useTransform(mouseY, [-1, 1], ["20%", "80%"]))}%, hsl(var(--primary) / 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          shape={shape}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, transparent 0%, hsl(var(--primary) / 0.03) 50%, transparent 100%)",
        }}
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

interface FloatingShapeProps {
  shape: FloatingShape;
  mouseX: any;
  mouseY: any;
}

const FloatingShape = ({ shape, mouseX, mouseY }: FloatingShapeProps) => {
  const springConfig = { stiffness: 50, damping: 20 };
  
  const x = useSpring(
    useTransform(mouseX, [-1, 1], [-shape.size * 2, shape.size * 2]),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, [-1, 1], [-shape.size * 2, shape.size * 2]),
    springConfig
  );
  const rotate = useSpring(
    useTransform(mouseX, [-1, 1], [shape.rotation - 45, shape.rotation + 45]),
    springConfig
  );

  const renderShape = () => {
    const className = "absolute opacity-5 mix-blend-screen";
    const style = {
      width: shape.size,
      height: shape.size,
      left: `${shape.initialX}%`,
      top: `${shape.initialY}%`,
      x,
      y,
      rotate,
    };

    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            className={`${className} rounded-full border-2 border-primary`}
            style={style}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      case "square":
        return (
          <motion.div
            className={`${className} border-2 border-accent`}
            style={style}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      case "triangle":
        return (
          <motion.div
            className={`${className}`}
            style={{
              ...style,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid hsl(var(--glow) / 0.2)`,
              width: 0,
              height: 0,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation - 360],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
    }
  };

  return renderShape();
};
