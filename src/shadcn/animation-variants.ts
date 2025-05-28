// This file is designed for shadcn/ui installation
// Copy this file to your lib/animation-variants.ts

import { Variants } from 'framer-motion';

export const animationVariants: Record<string, Variants> = {
  // ATTENTION SEEKERS
  bounce: {
    initial: { y: 0, scaleY: 1 },
    animate: {
      y: [0, -30, 0, -15, 0, -4, 0],
      scaleY: [1, 1.1, 1, 1.05, 0.95, 1.02, 1],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.43, 0.53, 0.7, 0.8, 0.9, 1],
        ease: [0.215, 0.61, 0.355, 1],
        transformOrigin: "center bottom"
      }
    }
  },

  flash: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0, 1, 0, 1],
      transition: {
        duration: 1,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "linear"
      }
    }
  },

  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  },

  // ... Add all other variants here (truncated for brevity)
  // Copy the full variants from src/lib/variants.ts
};