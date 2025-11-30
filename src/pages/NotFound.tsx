import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-10 grid-rows-6">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="border border-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.01, duration: 0.3 }}
          />
        ))}
      </div>

      {/* Floating red squares */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-primary/20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-6">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1 
            className="font-display text-[20vw] md:text-[15vw] leading-none"
            animate={{
              textShadow: [
                "0 0 20px hsl(var(--primary))",
                "0 0 40px hsl(var(--primary))",
                "0 0 20px hsl(var(--primary))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white">4</span>
            <span className="text-primary">0</span>
            <span className="text-white">4</span>
          </motion.h1>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-display text-3xl md:text-5xl text-white">
            PAGE NOT FOUND
          </h2>
          <p className="font-mono text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Return button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/">
            <motion.button
              className="group relative px-8 py-4 font-mono text-base font-bold overflow-hidden border-2 border-primary"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Corner accents */}
              <motion.div
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"
                variants={{
                  hover: { scale: 1.5, x: -4, y: -4 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"
                variants={{
                  hover: { scale: 1.5, x: 4, y: 4 }
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Text */}
              <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-background transition-colors duration-300">
                <motion.span
                  animate={{ rotate: [0, -180, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  ←
                </motion.span>
                BACK TO HOME
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Glitch effect text */}
        <motion.p
          className="font-mono text-xs text-primary/60"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ERROR_CODE: PAGE_NOT_FOUND
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
