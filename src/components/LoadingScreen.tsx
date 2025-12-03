import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-8 grid-rows-6">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.div
            key={i}
            className="border border-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.01, duration: 0.3 }}
          />
        ))}
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center space-y-8">

       {/* Animated logo/text */}
       <motion.div
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
       >
         <motion.h1 className="font-display text-5xl md:text-7xl text-white">
           {["O", "N", "E", " ", "M", "O", "M", "E", "N", "T"].map((letter, i) => (
             <motion.span
               key={i}
               className="inline-block"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 + i * 0.04, duration: 0.35 }}
             >
               {letter}
             </motion.span>
           ))}
         </motion.h1>
       
         <motion.h2 className="font-display text-5xl md:text-7xl text-primary mt-2">
           {["L", "O", "A", "D", "I", "N", "G", ".", ".", "."].map((letter, i) => (
             <motion.span
               key={i}
               className="inline-block"
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 + i * 0.03, duration: 0.35 }}
             >
               {letter}
             </motion.span>
           ))}
         </motion.h2>
       </motion.div>
          

        {/* Progress bar */}
        <motion.div
          className="w-64 md:w-96 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative h-1 bg-primary/20 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Progress percentage */}
          <motion.p className="text-primary font-mono text-sm mt-4">
            {progress}%
          </motion.p>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
