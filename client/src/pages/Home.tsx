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
  
  // Pre-fetch the wish so it's instantly ready when we hit the celebrate phase
  const { data: randomWish } = useRandomWish(phase !== "input");

  // Format name to uppercase for aesthetic and matching
  const cleanName = name.trim().toUpperCase();

  // Handle Phase: Countdown
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

  // Handle Phase: Letter Reveal
  useEffect(() => {
    if (phase === "reveal") {
      if (revealedLetters >= cleanName.length) {
        // Wait 1 extra second after the last letter is shown before celebrating
        const timer = setTimeout(() => setPhase("celebrate"), 1500);
        return () => clearTimeout(timer);
      }
      
      // Total reveal time is 5 seconds. Divide by length of name.
      // E.g., 5 letters = 1000ms per letter.
      const intervalTime = 5000 / Math.max(cleanName.length, 1);
      const timer = setTimeout(() => setRevealedLetters((r) => r + 1), intervalTime);
      return () => clearTimeout(timer);
    }
  }, [phase, revealedLetters, cleanName.length]);

  // Safe fallback for quotes if backend is empty or letter isn't found
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
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      
      {/* PHASE 1: INPUT */}
      <AnimatePresence mode="wait">
        {phase === "input" && (
          <motion.div
            key="input-phase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-lg flex flex-col items-center gap-12"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Gift className="w-20 h-20 mx-auto text-primary mb-6" />
              </motion.div>
              <h1 className="text-5xl sm:text-6xl text-primary drop-shadow-sm font-display text-glow">
                Who's celebrating?
              </h1>
              <p className="text-xl text-foreground/80 font-body font-semibold">
                Enter your name for a special surprise!
              </p>
            </div>

            <div className="w-full relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your wonderful name..."
                className="w-full px-8 py-5 rounded-3xl text-2xl text-center font-display
                           bg-white/80 backdrop-blur-sm border-4 border-white
                           shadow-xl text-foreground placeholder:text-muted-foreground/50
                           focus:outline-none focus:border-primary focus:ring-8 focus:ring-primary/20
                           transition-all duration-300"
              />
            </div>

            <div className="h-32 flex items-center justify-center w-full">
              <RunawayButton 
                isDisabled={cleanName.length === 0} 
                onClick={handleStart}
              >
                Surprise Me!
              </RunawayButton>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: COUNTDOWN */}
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
                className="text-[15rem] sm:text-[20rem] font-display font-black text-primary text-glow leading-none"
              >
                {count > 0 ? count : "0"}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* PHASE 3: LETTER REVEAL */}
        {phase === "reveal" && (
          <motion.div
            key="reveal-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl flex flex-col items-center justify-center gap-16"
          >
            {/* The accumulating name */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
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
                    className={`
                      text-5xl sm:text-7xl md:text-8xl font-black font-display
                      ${isVisible ? 'text-primary text-glow drop-shadow-xl' : 'text-transparent'}
                    `}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.div>
                );
              })}
            </div>

            {/* The active quote card */}
            <AnimatePresence mode="wait">
              {revealedLetters > 0 && revealedLetters <= cleanName.length && cleanName[revealedLetters - 1] !== " " && (
                <motion.div
                  key={`quote-${revealedLetters}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 sm:p-12 w-full max-w-2xl text-center relative overflow-hidden"
                >
                  <Sparkles className="absolute top-4 left-4 text-secondary w-8 h-8 animate-pulse" />
                  <Star className="absolute bottom-4 right-4 text-accent w-8 h-8 animate-pulse delay-150" />
                  
                  <div className="text-3xl sm:text-4xl font-black text-secondary mb-4 font-display">
                    {cleanName[revealedLetters - 1]} is for...
                  </div>
                  <p className="text-2xl sm:text-3xl text-foreground font-semibold font-body leading-relaxed">
                    "{getQuote(cleanName[revealedLetters - 1])}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* PHASE 4: FINAL CELEBRATION */}
        {phase === "celebrate" && (
          <motion.div
            key="celebrate-phase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-full max-w-5xl flex flex-col items-center justify-center gap-10 text-center z-10"
          >
            <Confetti
              width={width}
              height={height}
              recycle={true}
              numberOfPieces={400}
              gravity={0.15}
              colors={['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1']}
            />

            <motion.div
              initial={{ y: -50 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-6xl sm:text-8xl md:text-9xl font-black font-display text-primary text-glow drop-shadow-2xl leading-tight"
            >
              Happy<br />Birthday<br />
              <span className="text-secondary inline-block mt-4">{cleanName}!</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-card p-8 sm:p-12 mt-8 relative max-w-3xl"
            >
              <Heart className="absolute -top-6 -right-6 text-primary w-16 h-16 fill-primary animate-bounce" />
              <div className="text-2xl sm:text-3xl font-body font-bold text-foreground leading-relaxed">
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
              className="mt-8 px-6 py-3 rounded-full bg-white/50 hover:bg-white border-2 border-primary/20 
                         text-primary font-bold transition-all duration-300 backdrop-blur-md font-display"
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
