import { motion } from "framer-motion";
import { useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Trigger onComplete after animation finishes
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // 4.5 seconds total

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden" style={{ backgroundColor: '#F7F9F7' }}>
      <div className="relative w-full h-full flex items-center justify-center">     

        {/* VoteRiders text - appears stable after box fades */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0, 1, 1],
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.6, 0.8, 1],
            ease: "easeOut"
          }}
          className="absolute flex flex-col items-center"
        >
          <div className="relative">
            <h1 className="heading-primary tracking-tight" style={{ 
              color: '#191919',
              fontSize: '6rem'
            }}>
              VoteRiders
            </h1>
            
            {/* Underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 0, 0, 1] }}
              transition={{ 
                duration: 3, 
                times: [0, 0.65, 0.75, 1], 
                ease: "easeOut" 
              }}
              className="h-2 mt-4 origin-left rounded-full"
              style={{ backgroundColor: '#191919' }}
            />
          </div>
        </motion.div>

        {/* Entire screen fade out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 0, 1] }}
          transition={{ duration: 4.5, times: [0, 0.75, 0.85, 0.9, 1] }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: '#F7F9F7' }}
        />
      </div>
    </div>
  );
}