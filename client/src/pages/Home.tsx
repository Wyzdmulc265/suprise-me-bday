import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Gift, Heart, Sparkles, Star } from "lucide-react";
import { RunawayButton } from "@/components/RunawayButton";
import { useQuoteMap, useRandomWish } from "@/hooks/use-birthday";
import { useWindowSize } from "@/hooks/use-window-size";

type Phase = "input" | "countdown" | "reveal" | "celebrate";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("input");
  const [name, setName] = useState("");
  const [count, setCount] = useState(3);
  const [revealedLetters, setRevealedLetters] = useState(0);
  
  const { width, height } = useWindowSize();
  const { quoteMap } = useQuoteMap();
  
  const randomWishHook = useRandomWish(phase !== "input");
  const randomWish = randomWishHook.data;

  const cleanName = name.trim().toUpperCase();

  useEffect(() => {
    if (phase === "countdown") {
      if (count < 0) {
        setPhase("reveal");
        return;
      }
      const timer = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, count]);

  useEffect(() => {
    if (phase === "reveal") {
      if (revealedLetters >= cleanName.length) {
        const timer = setTimeout(() => setPhase("celebrate"), 1500);
        return () => clearTimeout(timer);
      }
      
      const intervalTime = 5000;
      const timer = setTimeout(() => setRevealedLetters((r) => r + 1), intervalTime);
      return () => clearTimeout(timer);
    }
  }, [phase, revealedLetters, cleanName.length]);

  const getQuote = (letter: string) => {
    if (!letter || letter === " ") return "You make the world brighter!";
    return quoteMap.get(letter) || `Joyful and wonderful, just like you!`;
  };

  const handleStart = () => {
    if (cleanName) {
      setPhase("countdown");
    }
  };

  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 overflow-auto">
      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div
            key="input-phase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-xs sm:max-w-lg flex flex-col items-center gap-8 sm:gap-12"
          >
            <div className="text-center space-y-2 sm:space-y-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Gift className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-primary mb-4 sm:mb-6" />
              </motion.div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl text-primary drop-shadow-sm font-display text-glow leading-tight">
                Who's celebrating?
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 font-body font-semibold text-center px-4">
                Enter your name for a special surprise!
              </p>
            </div>

            <div className="w-full max-w-xs sm:max-w-sm relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your wonderful name..."
                className="w-full px-4 sm:px-8 py-3 sm:py-5 rounded-3xl text-lg sm:text-xl md:text-2xl text-center font-display bg-white/80 backdrop-blur-sm border-4 border-white shadow-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-4 sm:ring-8 focus:ring-primary/20 transition-all duration-300"
              />
            </div>

            <div className="h-24 sm:h-32 flex items-center justify-center w-full">
              <RunawayButton 
                isDisabled={cleanName.length === 0} 
                onClick={handleStart}
              >
                Surprise Me!
              </RunawayButton>
            </div>
          </motion.div>
        )}

        {phase === "countdown" && (
          <motion.div
            key="countdown-phase"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 15, filter: "blur(20px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                className="text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] max-w-full max-h-[70vh] flex items-center justify-center font-display font-black text-primary text-glow leading-none overflow-hidden"
              >
                {count > 0 ? count : "0"}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 sm:gap-16 px-2"
          >
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 px-2 sm:px-4 w-full">
              {cleanName.split("").map((letter, i) => {
                const isVisible = i < revealedLetters;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -50, scale: 0.5, rotateX: 90 }}
                    animate={
                      isVisible
                        ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                        : { opacity: 0, y: -50, scale: 0.5, rotateX: 90 }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display flex items-center justify-center min-h-[1.5em] ${isVisible ? 'text-primary text-glow drop-shadow-xl' : 'text-transparent'}`}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {revealedLetters > 0 && revealedLetters <= cleanName.length && cleanName[revealedLetters - 1] !== " " && (
                <motion.div
                  key={`quote-${revealedLetters}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-4 sm:p-8 md:p-12 w-full max-w-lg sm:max-w-xl md:max-w-2xl text-center relative overflow-hidden"
                >
                  <Sparkles className="absolute top-2 left-2 sm:top-4 sm:left-4 text-secondary w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                  <Star className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-accent w-6 h-6 sm:w-8 sm:h-8 animate-pulse delay-150" />
                  
                  <div className="text-xl sm:text-3xl md:text-4xl font-black text-secondary mb-2 sm:mb-4 font-display">
                    {cleanName[revealedLetters - 1]} is for...
                  </div>
                  <p className="text-lg sm:text-2xl md:text-3xl text-foreground font-semibold font-body leading-relaxed px-2">
                    "{getQuote(cleanName[revealedLetters - 1])}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "celebrate" && (
          <motion.div
            key="celebrate-phase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-screen h-screen flex flex-col items-center justify-center gap-6 sm:gap-10 text-center z-10 p-4"
          >
            <Confetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={200}
              gravity={0.15}
              colors={['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1']}
            />

            <motion.div
              initial={{ y: -50 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display text-primary text-glow drop-shadow-2xl leading-tight max-w-full px-4 flex flex-col items-center"
            >
              Happy
              <br />
              Birthday
              <br />
              <span className="text-secondary inline-block mt-2 sm:mt-4">{cleanName}!</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-card p-4 sm:p-8 md:p-12 mt-4 sm:mt-8 relative max-w-lg sm:max-w-2xl md:max-w-3xl mx-4 w-full"
            >
              <Heart className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-primary w-12 h-12 sm:w-16 sm:h-16 fill-primary animate-bounce" />
              <div className="text-lg sm:text-2xl md:text-3xl font-body font-bold text-foreground leading-relaxed px-2">
                {randomWish?.content || "Wishing you the most spectacular, wonderful, and absolutely amazing day! You deserve all the happiness in the world."}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => {
                setPhase("input");
                setName("");
                setCount(3);
                setRevealedLetters(0);
              }}
              className="mt-4 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/50 hover:bg-white border-2 border-primary/20 
                         text-primary font-bold transition-all duration-300 backdrop-blur-md font-display text-sm sm:text-base w-full max-w-xs"
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
