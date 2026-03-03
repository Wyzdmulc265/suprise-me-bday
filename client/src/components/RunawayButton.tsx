import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Sparkles } from "lucide-react";

interface RunawayButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function RunawayButton({ isDisabled, onClick, children }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Reset position smoothly when the user types their name
  useEffect(() => {
    if (!isDisabled) {
      setPosition({ x: 0, y: 0 });
      controls.start({ x: 0, y: 0, scale: 1 });
    }
  }, [isDisabled, controls]);

  const handleHover = () => {
    if (isDisabled) {
      // Calculate a random distance away from the current cursor/button center
      // Keeps it evasive but within a bound so it doesn't leave the screen entirely
      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 150; // Jump between 150px and 300px
      
      const newX = position.x + Math.cos(angle) * distance;
      const newY = position.y + Math.sin(angle) * distance;
      
      // Keep it somewhat bounded (simple bounding box relative to its original center)
      const boundedX = Math.max(-300, Math.min(300, newX));
      const boundedY = Math.max(-300, Math.min(300, newY));

      setPosition({ x: boundedX, y: boundedY });
      controls.start({ 
        x: boundedX, 
        y: boundedY,
        transition: { type: "spring", stiffness: 400, damping: 20 }
      });
    }
  };

  return (
    <motion.div
      animate={controls}
      onMouseEnter={handleHover}
      onFocus={handleHover} // Also run away from keyboard focus!
      className="relative z-50 inline-block"
      whileHover={!isDisabled ? { scale: 1.05 } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
    >
      <button
        onClick={() => {
          if (!isDisabled) onClick();
        }}
        className={`
          px-8 py-4 rounded-full font-display text-xl font-bold
          flex items-center gap-2 transition-colors duration-300
          ${isDisabled 
            ? 'bg-muted text-muted-foreground border-2 border-border/50 cursor-not-allowed shadow-none' 
            : 'bg-gradient-to-r from-primary to-accent text-white border-2 border-white/50 shadow-[0_0_30px_rgba(255,100,150,0.4)] cursor-pointer'
          }
        `}
        style={{
          fontFamily: "var(--font-display)"
        }}
      >
        <Sparkles className={`w-6 h-6 ${isDisabled ? 'opacity-50' : 'animate-pulse'}`} />
        {children}
      </button>
    </motion.div>
  );
}
