import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X, Settings, RotateCcw, Github, Package, BookOpen } from 'lucide-react';

// Base Animation Component Types
interface BaseAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  repeat?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
  onAnimationComplete?: () => void;
  // Utility modifiers
  faster?: boolean;
  fast?: boolean;
  slow?: boolean;
  slower?: boolean;
  infinite?: boolean;
}

// Animation variants - Complete implementation of all animate.css animations
const animationVariants = {
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

  rubberBand: {
    initial: { scaleX: 1, scaleY: 1 },
    animate: {
      scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
      transition: {
        duration: 1,
        times: [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1]
      }
    }
  },

  shakeX: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -10, 10, -10, 10, -10, 10, 0],
      transition: {
        duration: 1,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    }
  },

  shakeY: {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 10, -10, 10, -10, 10, -10, 10, 0],
      transition: {
        duration: 1,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    }
  },

  headShake: {
    initial: { x: 0, rotateY: 0 },
    animate: {
      x: [0, -6, 5, -3, 2, 0],
      rotateY: [0, -9, 7, -5, 3, 0],
      transition: {
        duration: 1,
        times: [0, 0.065, 0.185, 0.315, 0.435, 0.5, 1],
        ease: "easeInOut"
      }
    }
  },

  swing: {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 15, -10, 5, -5, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        transformOrigin: "top center"
      }
    }
  },

  tada: {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0],
      transition: {
        duration: 1,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    }
  },

  wobble: {
    initial: { x: 0, rotate: 0 },
    animate: {
      x: [0, "-25%", "20%", "-15%", "10%", "-5%", 0],
      rotate: [0, -5, 3, -3, 2, -1, 0],
      transition: {
        duration: 1,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
      }
    }
  },

  jello: {
    initial: { skewX: 0, skewY: 0 },
    animate: {
      skewX: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625, -0.1953125, 0],
      skewY: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625, -0.1953125, 0],
      transition: {
        duration: 1,
        times: [0, 0.111, 0.222, 0.333, 0.444, 0.555, 0.666, 0.777, 0.888, 1],
        transformOrigin: "center"
      }
    }
  },

  heartBeat: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.3, 1, 1.3, 1],
      transition: {
        duration: 1.3,
        times: [0, 0.14, 0.28, 0.42, 0.7, 1],
        ease: "easeInOut"
      }
    }
  },

  // BACK ENTRANCES
  backInDown: {
    initial: { y: -1200, scale: 0.7, opacity: 0.7 },
    animate: {
      y: [0, 0],
      scale: [0.7, 1],
      opacity: [0.7, 1],
      transition: {
        duration: 1,
        times: [0, 0.8, 1]
      }
    }
  },

  backInLeft: {
    initial: { x: -2000, scale: 0.7, opacity: 0.7 },
    animate: {
      x: [0, 0],
      scale: [0.7, 1],
      opacity: [0.7, 1],
      transition: {
        duration: 1,
        times: [0, 0.8, 1]
      }
    }
  },

  backInRight: {
    initial: { x: 2000, scale: 0.7, opacity: 0.7 },
    animate: {
      x: [0, 0],
      scale: [0.7, 1],
      opacity: [0.7, 1],
      transition: {
        duration: 1,
        times: [0, 0.8, 1]
      }
    }
  },

  backInUp: {
    initial: { y: 1200, scale: 0.7, opacity: 0.7 },
    animate: {
      y: [0, 0],
      scale: [0.7, 1],
      opacity: [0.7, 1],
      transition: {
        duration: 1,
        times: [0, 0.8, 1]
      }
    }
  },

  // BACK EXITS
  backOutDown: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      y: [0, 0, 700],
      scale: [1, 0.7, 0.7],
      opacity: [1, 0.7, 0.7],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  backOutLeft: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      x: [0, 0, -2000],
      scale: [1, 0.7, 0.7],
      opacity: [1, 0.7, 0.7],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  backOutRight: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      x: [0, 0, 2000],
      scale: [1, 0.7, 0.7],
      opacity: [1, 0.7, 0.7],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  backOutUp: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      y: [0, 0, -700],
      scale: [1, 0.7, 0.7],
      opacity: [1, 0.7, 0.7],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  // BOUNCING ENTRANCES
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: [0, 0, 0, 1, 1, 1],
      scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
      transition: {
        duration: 0.75,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  },

  bounceInDown: {
    initial: { opacity: 0, y: -3000, scaleY: 3 },
    animate: {
      opacity: [0, 1, 1, 1, 1],
      y: [-3000, 25, -10, 5, 0],
      scaleY: [3, 0.9, 0.95, 0.985, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.75, 0.9, 1],
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  },

  bounceInLeft: {
    initial: { opacity: 0, x: -3000, scaleX: 3 },
    animate: {
      opacity: [0, 1, 1, 1, 1],
      x: [-3000, 25, -10, 5, 0],
      scaleX: [3, 1, 0.98, 0.995, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.75, 0.9, 1],
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  },

  bounceInRight: {
    initial: { opacity: 0, x: 3000, scaleX: 3 },
    animate: {
      opacity: [0, 1, 1, 1, 1],
      x: [3000, -25, 10, -5, 0],
      scaleX: [3, 1, 0.98, 0.995, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.75, 0.9, 1],
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  },

  bounceInUp: {
    initial: { opacity: 0, y: 3000, scaleY: 5 },
    animate: {
      opacity: [0, 1, 1, 1, 1],
      y: [3000, -20, 10, -5, 0],
      scaleY: [5, 0.9, 0.95, 0.985, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.75, 0.9, 1],
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  },

  // BOUNCING EXITS
  bounceOut: {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 0.9, 1.1, 1.1, 0.3],
      opacity: [1, 1, 1, 1, 0],
      transition: {
        duration: 0.75,
        times: [0, 0.2, 0.5, 0.55, 1]
      }
    }
  },

  bounceOutDown: {
    initial: { y: 0, scaleY: 1, opacity: 1 },
    animate: {
      y: [0, 10, -20, 2000],
      scaleY: [1, 0.985, 0.9, 3],
      opacity: [1, 1, 1, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.45, 1]
      }
    }
  },

  bounceOutLeft: {
    initial: { x: 0, scaleX: 1, opacity: 1 },
    animate: {
      x: [0, 20, -2000],
      scaleX: [1, 0.9, 2],
      opacity: [1, 1, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  bounceOutRight: {
    initial: { x: 0, scaleX: 1, opacity: 1 },
    animate: {
      x: [0, -20, 2000],
      scaleX: [1, 0.9, 2],
      opacity: [1, 1, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 1]
      }
    }
  },

  bounceOutUp: {
    initial: { y: 0, scaleY: 1, opacity: 1 },
    animate: {
      y: [0, -10, 20, -2000],
      scaleY: [1, 0.985, 0.9, 3],
      opacity: [1, 1, 1, 0],
      transition: {
        duration: 1,
        times: [0, 0.2, 0.4, 0.45, 1]
      }
    }
  },

  // FADING ENTRANCES
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },

  fadeInDown: {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0 }
  },

  fadeInDownBig: {
    initial: { opacity: 0, y: -2000 },
    animate: { opacity: 1, y: 0 }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 }
  },

  fadeInLeftBig: {
    initial: { opacity: 0, x: -2000 },
    animate: { opacity: 1, x: 0 }
  },

  fadeInRight: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 }
  },

  fadeInRightBig: {
    initial: { opacity: 0, x: 2000 },
    animate: { opacity: 1, x: 0 }
  },

  fadeInUp: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 }
  },

  fadeInUpBig: {
    initial: { opacity: 0, y: 2000 },
    animate: { opacity: 1, y: 0 }
  },

  fadeInTopLeft: {
    initial: { opacity: 0, x: "-100%", y: "-100%" },
    animate: { opacity: 1, x: 0, y: 0 }
  },

  fadeInTopRight: {
    initial: { opacity: 0, x: "100%", y: "-100%" },
    animate: { opacity: 1, x: 0, y: 0 }
  },

  fadeInBottomLeft: {
    initial: { opacity: 0, x: "-100%", y: "100%" },
    animate: { opacity: 1, x: 0, y: 0 }
  },

  fadeInBottomRight: {
    initial: { opacity: 0, x: "100%", y: "100%" },
    animate: { opacity: 1, x: 0, y: 0 }
  },

  // FADING EXITS
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 }
  },

  fadeOutDown: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: "100%" }
  },

  fadeOutDownBig: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: 2000 }
  },

  fadeOutLeft: {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: "-100%" }
  },

  fadeOutLeftBig: {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: -2000 }
  },

  fadeOutRight: {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: "100%" }
  },

  fadeOutRightBig: {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: 2000 }
  },

  fadeOutUp: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: "-100%" }
  },

  fadeOutUpBig: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: -2000 }
  },

  fadeOutTopLeft: {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: { opacity: 0, x: "-100%", y: "-100%" }
  },

  fadeOutTopRight: {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: { opacity: 0, x: "100%", y: "-100%" }
  },

  fadeOutBottomLeft: {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: { opacity: 0, x: "-100%", y: "100%" }
  },

  fadeOutBottomRight: {
    initial: { opacity: 1, x: 0, y: 0 },
    animate: { opacity: 0, x: "100%", y: "100%" }
  },

  // FLIPPERS
  flip: {
    initial: { rotateY: -360, scale: 1 },
    animate: {
      rotateY: [-360, -190, -170, 0, 0],
      scale: [1, 1, 1, 0.95, 1],
      z: [0, 150, 150, 0, 0],
      transition: {
        duration: 1,
        times: [0, 0.4, 0.5, 0.8, 1],
        ease: ["easeOut", "easeOut", "easeIn", "easeIn", "easeIn"]
      }
    }
  },

  flipInX: {
    initial: { rotateX: 90, opacity: 0, perspective: 400 },
    animate: {
      rotateX: [90, -20, 10, -5, 0],
      opacity: [0, 0, 1, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.4, 0.6, 0.8, 1],
        ease: ["easeIn", "easeIn", "linear", "linear", "linear"]
      }
    }
  },

  flipInY: {
    initial: { rotateY: 90, opacity: 0, perspective: 400 },
    animate: {
      rotateY: [90, -20, 10, -5, 0],
      opacity: [0, 0, 1, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.4, 0.6, 0.8, 1],
        ease: ["easeIn", "easeIn", "linear", "linear", "linear"]
      }
    }
  },

  flipOutX: {
    initial: { rotateX: 0, opacity: 1, perspective: 400 },
    animate: {
      rotateX: [0, -20, 90],
      opacity: [1, 1, 0],
      transition: {
        duration: 0.75,
        times: [0, 0.3, 1]
      }
    }
  },

  flipOutY: {
    initial: { rotateY: 0, opacity: 1, perspective: 400 },
    animate: {
      rotateY: [0, -15, 90],
      opacity: [1, 1, 0],
      transition: {
        duration: 0.75,
        times: [0, 0.3, 1]
      }
    }
  },

  // LIGHTSPEED
  lightSpeedInLeft: {
    initial: { x: "-100%", skewX: 30, opacity: 0 },
    animate: {
      x: ["-100%", 0, 0, 0],
      skewX: [30, -20, 5, 0],
      opacity: [0, 1, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.8, 1],
        ease: "easeOut"
      }
    }
  },

  lightSpeedInRight: {
    initial: { x: "100%", skewX: -30, opacity: 0 },
    animate: {
      x: ["100%", 0, 0, 0],
      skewX: [-30, 20, -5, 0],
      opacity: [0, 1, 1, 1],
      transition: {
        duration: 1,
        times: [0, 0.6, 0.8, 1],
        ease: "easeOut"
      }
    }
  },

  lightSpeedOutLeft: {
    initial: { opacity: 1, x: 0, skewX: 0 },
    animate: {
      x: "-100%",
      skewX: -30,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    }
  },

  lightSpeedOutRight: {
    initial: { opacity: 1, x: 0, skewX: 0 },
    animate: {
      x: "100%",
      skewX: 30,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeIn"
      }
    }
  },

  // ROTATING ENTRANCES
  rotateIn: {
    initial: { rotate: -200, opacity: 0 },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: { transformOrigin: "center" }
    }
  },

  rotateInDownLeft: {
    initial: { rotate: -45, opacity: 0 },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: { transformOrigin: "left bottom" }
    }
  },

  rotateInDownRight: {
    initial: { rotate: 45, opacity: 0 },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: { transformOrigin: "right bottom" }
    }
  },

  rotateInUpLeft: {
    initial: { rotate: 45, opacity: 0 },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: { transformOrigin: "left bottom" }
    }
  },

  rotateInUpRight: {
    initial: { rotate: -90, opacity: 0 },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: { transformOrigin: "right bottom" }
    }
  },

  // ROTATING EXITS
  rotateOut: {
    initial: { opacity: 1, rotate: 0 },
    animate: {
      rotate: 200,
      opacity: 0,
      transition: { transformOrigin: "center" }
    }
  },

  rotateOutDownLeft: {
    initial: { opacity: 1, rotate: 0 },
    animate: {
      rotate: 45,
      opacity: 0,
      transition: { transformOrigin: "left bottom" }
    }
  },

  rotateOutDownRight: {
    initial: { opacity: 1, rotate: 0 },
    animate: {
      rotate: -45,
      opacity: 0,
      transition: { transformOrigin: "right bottom" }
    }
  },

  rotateOutUpLeft: {
    initial: { opacity: 1, rotate: 0 },
    animate: {
      rotate: -45,
      opacity: 0,
      transition: { transformOrigin: "left bottom" }
    }
  },

  rotateOutUpRight: {
    initial: { opacity: 1, rotate: 0 },
    animate: {
      rotate: 90,
      opacity: 0,
      transition: { transformOrigin: "right bottom" }
    }
  },

  // SPECIALS
  hinge: {
    initial: { rotate: 0, opacity: 1 },
    animate: {
      rotate: [0, 80, 60, 80, 60, 0],
      y: [0, 0, 0, 0, 0, 700],
      opacity: [1, 1, 1, 1, 1, 0],
      transition: {
        duration: 2,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut",
        transformOrigin: "top left"
      }
    }
  },

  jackInTheBox: {
    initial: { opacity: 0, scale: 0.1, rotate: 30 },
    animate: {
      opacity: [0, 0, 0, 1],
      scale: [0.1, 0.1, 0.1, 1],
      rotate: [30, -10, 3, 0],
      transition: {
        duration: 1,
        times: [0, 0.5, 0.7, 1],
        transformOrigin: "center bottom"
      }
    }
  },

  rollIn: {
    initial: { opacity: 0, x: "-100%", rotate: -120 },
    animate: {
      opacity: 1,
      x: 0,
      rotate: 0
    }
  },

  rollOut: {
    initial: { opacity: 1, x: 0, rotate: 0 },
    animate: {
      opacity: 0,
      x: "100%",
      rotate: 120
    }
  },

  // ZOOMING ENTRANCES
  zoomIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: [0, 1],
      scale: [0.3, 1],
      transition: {
        times: [0, 0.5, 1]
      }
    }
  },

  zoomInDown: {
    initial: { opacity: 0, scale: 0.1, y: -1000 },
    animate: {
      opacity: [0, 1],
      scale: [0.1, 0.475, 1],
      y: [-1000, 60, 0],
      transition: {
        duration: 1,
        times: [0, 0.6, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]]
      }
    }
  },

  zoomInLeft: {
    initial: { opacity: 0, scale: 0.1, x: -1000 },
    animate: {
      opacity: [0, 1],
      scale: [0.1, 0.475, 1],
      x: [-1000, 10, 0],
      transition: {
        duration: 1,
        times: [0, 0.6, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]]
      }
    }
  },

  zoomInRight: {
    initial: { opacity: 0, scale: 0.1, x: 1000 },
    animate: {
      opacity: [0, 1],
      scale: [0.1, 0.475, 1],
      x: [1000, -10, 0],
      transition: {
        duration: 1,
        times: [0, 0.6, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]]
      }
    }
  },

  zoomInUp: {
    initial: { opacity: 0, scale: 0.1, y: 1000 },
    animate: {
      opacity: [0, 1],
      scale: [0.1, 0.475, 1],
      y: [1000, -60, 0],
      transition: {
        duration: 1,
        times: [0, 0.6, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]]
      }
    }
  },

  // ZOOMING EXITS
  zoomOut: {
    initial: { opacity: 1, scale: 1 },
    animate: {
      opacity: [1, 0, 0],
      scale: [1, 0.3, 0.3],
      transition: {
        times: [0, 0.5, 1]
      }
    }
  },

  zoomOutDown: {
    initial: { opacity: 1, scale: 1, y: 0 },
    animate: {
      opacity: [1, 1, 0],
      scale: [1, 0.475, 0.1],
      y: [0, -60, 2000],
      transition: {
        duration: 1,
        times: [0, 0.4, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]],
        transformOrigin: "center bottom"
      }
    }
  },

  zoomOutLeft: {
    initial: { opacity: 1, scale: 1, x: 0 },
    animate: {
      opacity: [1, 1, 0],
      scale: [1, 0.475, 0.1],
      x: [0, 42, -2000],
      transition: {
        duration: 1,
        times: [0, 0.4, 1],
        transformOrigin: "left center"
      }
    }
  },

  zoomOutRight: {
    initial: { opacity: 1, scale: 1, x: 0 },
    animate: {
      opacity: [1, 1, 0],
      scale: [1, 0.475, 0.1],
      x: [0, -42, 2000],
      transition: {
        duration: 1,
        times: [0, 0.4, 1],
        transformOrigin: "right center"
      }
    }
  },

  zoomOutUp: {
    initial: { opacity: 1, scale: 1, y: 0 },
    animate: {
      opacity: [1, 1, 0],
      scale: [1, 0.475, 0.1],
      y: [0, 60, -2000],
      transition: {
        duration: 1,
        times: [0, 0.4, 1],
        ease: [[0.55, 0.055, 0.675, 0.19], [0.175, 0.885, 0.32, 1]],
        transformOrigin: "center bottom"
      }
    }
  },

  // SLIDING ENTRANCES
  slideInDown: {
    initial: { y: "-100%" },
    animate: { y: 0 }
  },

  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 }
  },

  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 }
  },

  slideInUp: {
    initial: { y: "100%" },
    animate: { y: 0 }
  },

  // SLIDING EXITS
  slideOutDown: {
    initial: { y: 0 },
    animate: { y: "100%" }
  },

  slideOutLeft: {
    initial: { x: 0 },
    animate: { x: "-100%" }
  },

  slideOutRight: {
    initial: { x: 0 },
    animate: { x: "100%" }
  },

  slideOutUp: {
    initial: { y: 0 },
    animate: { y: "-100%" }
  }
};

// Base Animation Component
const BaseAnimation: React.FC<BaseAnimationProps & { variant: keyof typeof animationVariants }> = ({
  children,
  variant,
  duration = 1,
  delay = 0,
  repeat = 0,
  className,
  style,
  onAnimationComplete,
  faster = false,
  fast = false,
  slow = false,
  slower = false,
  infinite = false
}) => {
  const animation = animationVariants[variant];
  
  // Calculate duration modifiers (matching animate.css behavior)
  let adjustedDuration = duration;
  if (faster) adjustedDuration = duration / 2;
  else if (fast) adjustedDuration = duration * 0.8;
  else if (slow) adjustedDuration = duration * 2;
  else if (slower) adjustedDuration = duration * 3;

  // Handle repeat logic
  let repeatCount = repeat;
  if (infinite) repeatCount = Infinity;

  // Check for reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion) {
    adjustedDuration = 0.001;
    repeatCount = 1;
  }

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={{
        ...animation.animate.transition,
        duration: animation.animate.transition?.duration || adjustedDuration,
        delay,
        repeat: repeatCount === true ? Infinity : repeatCount
      }}
      className={className}
      style={{
        ...style,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)', // Force hardware acceleration
        backfaceVisibility: 'hidden', // Prevent flickering
        WebkitBackfaceVisibility: 'hidden'
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

// Create all individual animation components
const createAnimationComponent = (variant: keyof typeof animationVariants) => {
  return React.forwardRef<HTMLDivElement, BaseAnimationProps>((props, ref) => (
    <BaseAnimation variant={variant} {...props} />
  ));
};

// Attention Seekers
const Bounce = createAnimationComponent('bounce');
const Flash = createAnimationComponent('flash');
const Pulse = createAnimationComponent('pulse');
const RubberBand = createAnimationComponent('rubberBand');
const ShakeX = createAnimationComponent('shakeX');
const ShakeY = createAnimationComponent('shakeY');
const HeadShake = createAnimationComponent('headShake');
const Swing = createAnimationComponent('swing');
const Tada = createAnimationComponent('tada');
const Wobble = createAnimationComponent('wobble');
const Jello = createAnimationComponent('jello');
const HeartBeat = createAnimationComponent('heartBeat');

// Back Entrances
const BackInDown = createAnimationComponent('backInDown');
const BackInLeft = createAnimationComponent('backInLeft');
const BackInRight = createAnimationComponent('backInRight');
const BackInUp = createAnimationComponent('backInUp');

// Back Exits
const BackOutDown = createAnimationComponent('backOutDown');
const BackOutLeft = createAnimationComponent('backOutLeft');
const BackOutRight = createAnimationComponent('backOutRight');
const BackOutUp = createAnimationComponent('backOutUp');

// Bouncing Entrances
const BounceIn = createAnimationComponent('bounceIn');
const BounceInDown = createAnimationComponent('bounceInDown');
const BounceInLeft = createAnimationComponent('bounceInLeft');
const BounceInRight = createAnimationComponent('bounceInRight');
const BounceInUp = createAnimationComponent('bounceInUp');

// Bouncing Exits
const BounceOut = createAnimationComponent('bounceOut');
const BounceOutDown = createAnimationComponent('bounceOutDown');
const BounceOutLeft = createAnimationComponent('bounceOutLeft');
const BounceOutRight = createAnimationComponent('bounceOutRight');
const BounceOutUp = createAnimationComponent('bounceOutUp');

// Fading Entrances
const FadeIn = createAnimationComponent('fadeIn');
const FadeInDown = createAnimationComponent('fadeInDown');
const FadeInDownBig = createAnimationComponent('fadeInDownBig');
const FadeInLeft = createAnimationComponent('fadeInLeft');
const FadeInLeftBig = createAnimationComponent('fadeInLeftBig');
const FadeInRight = createAnimationComponent('fadeInRight');
const FadeInRightBig = createAnimationComponent('fadeInRightBig');
const FadeInUp = createAnimationComponent('fadeInUp');
const FadeInUpBig = createAnimationComponent('fadeInUpBig');
const FadeInTopLeft = createAnimationComponent('fadeInTopLeft');
const FadeInTopRight = createAnimationComponent('fadeInTopRight');
const FadeInBottomLeft = createAnimationComponent('fadeInBottomLeft');
const FadeInBottomRight = createAnimationComponent('fadeInBottomRight');

// Fading Exits
const FadeOut = createAnimationComponent('fadeOut');
const FadeOutDown = createAnimationComponent('fadeOutDown');
const FadeOutDownBig = createAnimationComponent('fadeOutDownBig');
const FadeOutLeft = createAnimationComponent('fadeOutLeft');
const FadeOutLeftBig = createAnimationComponent('fadeOutLeftBig');
const FadeOutRight = createAnimationComponent('fadeOutRight');
const FadeOutRightBig = createAnimationComponent('fadeOutRightBig');
const FadeOutUp = createAnimationComponent('fadeOutUp');
const FadeOutUpBig = createAnimationComponent('fadeOutUpBig');
const FadeOutTopLeft = createAnimationComponent('fadeOutTopLeft');
const FadeOutTopRight = createAnimationComponent('fadeOutTopRight');
const FadeOutBottomLeft = createAnimationComponent('fadeOutBottomLeft');
const FadeOutBottomRight = createAnimationComponent('fadeOutBottomRight');

// Flippers
const Flip = createAnimationComponent('flip');
const FlipInX = createAnimationComponent('flipInX');
const FlipInY = createAnimationComponent('flipInY');
const FlipOutX = createAnimationComponent('flipOutX');
const FlipOutY = createAnimationComponent('flipOutY');

// Lightspeed
const LightSpeedInLeft = createAnimationComponent('lightSpeedInLeft');
const LightSpeedInRight = createAnimationComponent('lightSpeedInRight');
const LightSpeedOutLeft = createAnimationComponent('lightSpeedOutLeft');
const LightSpeedOutRight = createAnimationComponent('lightSpeedOutRight');

// Rotating Entrances
const RotateIn = createAnimationComponent('rotateIn');
const RotateInDownLeft = createAnimationComponent('rotateInDownLeft');
const RotateInDownRight = createAnimationComponent('rotateInDownRight');
const RotateInUpLeft = createAnimationComponent('rotateInUpLeft');
const RotateInUpRight = createAnimationComponent('rotateInUpRight');

// Rotating Exits
const RotateOut = createAnimationComponent('rotateOut');
const RotateOutDownLeft = createAnimationComponent('rotateOutDownLeft');
const RotateOutDownRight = createAnimationComponent('rotateOutDownRight');
const RotateOutUpLeft = createAnimationComponent('rotateOutUpLeft');
const RotateOutUpRight = createAnimationComponent('rotateOutUpRight');

// Specials
const Hinge = createAnimationComponent('hinge');
const JackInTheBox = createAnimationComponent('jackInTheBox');
const RollIn = createAnimationComponent('rollIn');
const RollOut = createAnimationComponent('rollOut');

// Zooming Entrances
const ZoomIn = createAnimationComponent('zoomIn');
const ZoomInDown = createAnimationComponent('zoomInDown');
const ZoomInLeft = createAnimationComponent('zoomInLeft');
const ZoomInRight = createAnimationComponent('zoomInRight');
const ZoomInUp = createAnimationComponent('zoomInUp');

// Zooming Exits
const ZoomOut = createAnimationComponent('zoomOut');
const ZoomOutDown = createAnimationComponent('zoomOutDown');
const ZoomOutLeft = createAnimationComponent('zoomOutLeft');
const ZoomOutRight = createAnimationComponent('zoomOutRight');
const ZoomOutUp = createAnimationComponent('zoomOutUp');

// Sliding Entrances
const SlideInDown = createAnimationComponent('slideInDown');
const SlideInLeft = createAnimationComponent('slideInLeft');
const SlideInRight = createAnimationComponent('slideInRight');
const SlideInUp = createAnimationComponent('slideInUp');

// Sliding Exits
const SlideOutDown = createAnimationComponent('slideOutDown');
const SlideOutLeft = createAnimationComponent('slideOutLeft');
const SlideOutRight = createAnimationComponent('slideOutRight');
const SlideOutUp = createAnimationComponent('slideOutUp');

// Demo Component
const AnimationDemo: React.FC = () => {
  const [selectedAnimation, setSelectedAnimation] = useState<string>('bounceIn');
  const [key, setKey] = useState(0);
  const [showUtilities, setShowUtilities] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Attention Seekers': true
  });
  const [animationProps, setAnimationProps] = useState({
    duration: 1,
    delay: 0,
    faster: false,
    fast: false,
    slow: false,
    slower: false,
    infinite: false
  });

  const animationComponents = {
    // Attention Seekers
    bounce: Bounce, flash: Flash, pulse: Pulse, rubberBand: RubberBand,
    shakeX: ShakeX, shakeY: ShakeY, headShake: HeadShake, swing: Swing,
    tada: Tada, wobble: Wobble, jello: Jello, heartBeat: HeartBeat,
    
    // Back Entrances & Exits
    backInDown: BackInDown, backInLeft: BackInLeft, backInRight: BackInRight, backInUp: BackInUp,
    backOutDown: BackOutDown, backOutLeft: BackOutLeft, backOutRight: BackOutRight, backOutUp: BackOutUp,
    
    // Bouncing Entrances & Exits
    bounceIn: BounceIn, bounceInDown: BounceInDown, bounceInLeft: BounceInLeft, 
    bounceInRight: BounceInRight, bounceInUp: BounceInUp,
    bounceOut: BounceOut, bounceOutDown: BounceOutDown, bounceOutLeft: BounceOutLeft,
    bounceOutRight: BounceOutRight, bounceOutUp: BounceOutUp,
    
    // Fading Entrances & Exits
    fadeIn: FadeIn, fadeInDown: FadeInDown, fadeInDownBig: FadeInDownBig,
    fadeInLeft: FadeInLeft, fadeInLeftBig: FadeInLeftBig, fadeInRight: FadeInRight,
    fadeInRightBig: FadeInRightBig, fadeInUp: FadeInUp, fadeInUpBig: FadeInUpBig,
    fadeInTopLeft: FadeInTopLeft, fadeInTopRight: FadeInTopRight,
    fadeInBottomLeft: FadeInBottomLeft, fadeInBottomRight: FadeInBottomRight,
    fadeOut: FadeOut, fadeOutDown: FadeOutDown, fadeOutDownBig: FadeOutDownBig,
    fadeOutLeft: FadeOutLeft, fadeOutLeftBig: FadeOutLeftBig, fadeOutRight: FadeOutRight,
    fadeOutRightBig: FadeOutRightBig, fadeOutUp: FadeOutUp, fadeOutUpBig: FadeOutUpBig,
    fadeOutTopLeft: FadeOutTopLeft, fadeOutTopRight: FadeOutTopRight,
    fadeOutBottomLeft: FadeOutBottomLeft, fadeOutBottomRight: FadeOutBottomRight,
    
    // Flippers
    flip: Flip, flipInX: FlipInX, flipInY: FlipInY, flipOutX: FlipOutX, flipOutY: FlipOutY,
    
    // Lightspeed
    lightSpeedInLeft: LightSpeedInLeft, lightSpeedInRight: LightSpeedInRight,
    lightSpeedOutLeft: LightSpeedOutLeft, lightSpeedOutRight: LightSpeedOutRight,
    
    // Rotating Entrances & Exits
    rotateIn: RotateIn, rotateInDownLeft: RotateInDownLeft, rotateInDownRight: RotateInDownRight,
    rotateInUpLeft: RotateInUpLeft, rotateInUpRight: RotateInUpRight,
    rotateOut: RotateOut, rotateOutDownLeft: RotateOutDownLeft, rotateOutDownRight: RotateOutDownRight,
    rotateOutUpLeft: RotateOutUpLeft, rotateOutUpRight: RotateOutUpRight,
    
    // Specials
    hinge: Hinge, jackInTheBox: JackInTheBox, rollIn: RollIn, rollOut: RollOut,
    
    // Zooming Entrances & Exits
    zoomIn: ZoomIn, zoomInDown: ZoomInDown, zoomInLeft: ZoomInLeft,
    zoomInRight: ZoomInRight, zoomInUp: ZoomInUp,
    zoomOut: ZoomOut, zoomOutDown: ZoomOutDown, zoomOutLeft: ZoomOutLeft,
    zoomOutRight: ZoomOutRight, zoomOutUp: ZoomOutUp,
    
    // Sliding Entrances & Exits
    slideInDown: SlideInDown, slideInLeft: SlideInLeft, slideInRight: SlideInRight, slideInUp: SlideInUp,
    slideOutDown: SlideOutDown, slideOutLeft: SlideOutLeft, slideOutRight: SlideOutRight, slideOutUp: SlideOutUp
  };

  const categories = {
    'Attention Seekers': ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'],
    'Back Entrances': ['backInDown', 'backInLeft', 'backInRight', 'backInUp'],
    'Back Exits': ['backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp'],
    'Bouncing Entrances': ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
    'Bouncing Exits': ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'],
    'Fading Entrances': ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight'],
    'Fading Exits': ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomLeft', 'fadeOutBottomRight'],
    'Flippers': ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'],
    'Lightspeed': ['lightSpeedInLeft', 'lightSpeedInRight', 'lightSpeedOutLeft', 'lightSpeedOutRight'],
    'Rotating Entrances': ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
    'Rotating Exits': ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'],
    'Specials': ['hinge', 'jackInTheBox', 'rollIn', 'rollOut'],
    'Zooming Entrances': ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'],
    'Zooming Exits': ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'],
    'Sliding Entrances': ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
    'Sliding Exits': ['slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp']
  };

  const AnimationComponent = animationComponents[selectedAnimation as keyof typeof animationComponents];

  const restartAnimation = () => {
    setKey(prev => prev + 1);
  };

  const resetUtilities = () => {
    setAnimationProps({
      duration: 1,
      delay: 0,
      faster: false,
      fast: false,
      slow: false,
      slower: false,
      infinite: false
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const selectAnimation = (animation: string) => {
    setSelectedAnimation(animation);
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  🎭 Framer Motion Animations
                </h1>
                <p className="text-xs sm:text-sm text-purple-200 hidden sm:block">
                  {Object.keys(animationComponents).length} animations • TypeScript ready • npm install framer-motion-animations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a href="https://github.com/thedotmack/framer-motion-animations" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                <Github size={16} />
                <span className="text-sm">GitHub</span>
              </a>
              <a href="https://www.npmjs.com/package/framer-motion-animations" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                <Package size={16} />
                <span className="text-sm">NPM</span>
              </a>
              <a href="https://github.com/thedotmack/framer-motion-animations#readme" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                <BookOpen size={16} />
                <span className="text-sm">Docs</span>
              </a>
              <div className="hidden sm:flex text-xs text-purple-300 space-x-4">
                <span>✅ Mobile Optimized</span>
                <span>✅ Accessibility</span>
                <span>✅ Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-lg z-30 lg:hidden"
                onClick={() => setShowMobileMenu(false)}
                style={{ willChange: 'opacity' }}
              />
            )}
          </AnimatePresence>

          {/* Animation Categories Sidebar */}
          <div className={`
            ${showMobileMenu ? 'fixed' : 'hidden lg:block'}
            lg:relative inset-y-0 left-0 z-30 w-80 lg:w-72 xl:w-80
            bg-white/10 backdrop-blur-xl rounded-xl lg:rounded-xl
            ${showMobileMenu ? 'm-4 mt-20' : ''}
            lg:sticky lg:top-24 lg:self-start
          `}>
            <motion.div
              initial={showMobileMenu ? { x: -300, opacity: 0 } : false}
              animate={showMobileMenu ? { x: 0, opacity: 1 } : {}}
              exit={showMobileMenu ? { x: -300, opacity: 0 } : {}}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="h-full max-h-[calc(100vh-6rem)] lg:max-h-[calc(100vh-8rem)] flex flex-col"
              style={{ 
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            >
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">Choose Animation</h2>
                <p className="text-sm text-purple-200">Tap to preview</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {Object.entries(categories).map(([category, animations]) => (
                  <div key={category} className="space-y-2">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-sm font-semibold text-purple-200">{category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                          {animations.length}
                        </span>
                        {expandedCategories[category] ? 
                          <ChevronDown size={16} className="text-purple-200" /> : 
                          <ChevronRight size={16} className="text-purple-200" />
                        }
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedCategories[category] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          className="overflow-hidden space-y-1 pl-2"
                          style={{ 
                            willChange: 'height, opacity',
                            transform: 'translateZ(0)'
                          }}
                        >
                          {animations.map((animation) => (
                            <button
                              key={animation}
                              onClick={() => selectAnimation(animation)}
                              className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
                                selectedAnimation === animation
                                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                  : 'text-purple-100 hover:bg-white/10 active:bg-white/20'
                              }`}
                            >
                              {animation}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 lg:space-y-6">
            {/* Animation Preview */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6">
              {/* Header with Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white">
                    {selectedAnimation}
                  </h2>
                  <p className="text-sm text-purple-200 mt-1">
                    Preview and customize your animation
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowUtilities(!showUtilities)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 ${
                      showUtilities ? 'bg-purple-600 text-white' : 'bg-white/20 text-purple-200 hover:bg-white/30'
                    }`}
                  >
                    <Settings size={16} />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    onClick={restartAnimation}
                    className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <RotateCcw size={16} />
                    <span className="text-sm">Restart</span>
                  </button>
                </div>
              </div>

              {/* Utilities Panel */}
              <AnimatePresence>
                {showUtilities && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="mb-6 p-4 bg-black/20 rounded-lg overflow-hidden"
                    style={{ 
                      willChange: 'height, opacity',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-white">Animation Settings</h3>
                      <button
                        onClick={resetUtilities}
                        className="text-sm px-3 py-1 bg-red-500/20 text-red-200 rounded hover:bg-red-500/30 transition-colors w-fit"
                      >
                        Reset All
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm text-purple-200">Duration (seconds)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="5"
                          value={animationProps.duration}
                          onChange={(e) => setAnimationProps(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 bg-white/10 text-white rounded-lg text-sm border border-white/20 focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm text-purple-200">Delay (seconds)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={animationProps.delay}
                          onChange={(e) => setAnimationProps(prev => ({ ...prev, delay: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 bg-white/10 text-white rounded-lg text-sm border border-white/20 focus:border-purple-400 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm text-purple-200 mb-2">Speed Modifiers</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                          {['faster', 'fast', 'slow', 'slower', 'infinite'].map((prop) => (
                            <label key={prop} className="flex items-center space-x-2 text-sm text-purple-200">
                              <input
                                type="checkbox"
                                checked={animationProps[prop as keyof typeof animationProps] as boolean}
                                onChange={(e) => setAnimationProps(prev => ({ ...prev, [prop]: e.target.checked }))}
                                className="rounded text-purple-500 focus:ring-purple-400 focus:ring-offset-0"
                              />
                              <span className="capitalize">{prop}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animation Preview Area */}
              <div className="min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl border border-white/10 p-6 sm:p-8 lg:p-12"
                   style={{ transform: 'translateZ(0)' }}>
                <AnimatePresence mode="wait">
                  <AnimationComponent key={key} {...animationProps}>
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-4 sm:p-6 shadow-2xl max-w-xs w-full">
                      <div className="text-white text-center">
                        <div className="text-3xl sm:text-4xl mb-3">🎭</div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">Animation Demo</h3>
                        <p className="text-purple-100 text-sm opacity-90">
                          {selectedAnimation}
                        </p>
                      </div>
                    </div>
                  </AnimationComponent>
                </AnimatePresence>
              </div>
            </div>

            {/* Usage Example & Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
              {/* Usage Example */}
              <div className="xl:col-span-2 bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-4">Usage Example</h3>
                <div className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm leading-relaxed">
{`import { ${selectedAnimation.charAt(0).toUpperCase() + selectedAnimation.slice(1)} } from 'framer-motion-animations';

function MyComponent() {
  return (
    <${selectedAnimation.charAt(0).toUpperCase() + selectedAnimation.slice(1)}${
      animationProps.duration !== 1 ? `\n      duration={${animationProps.duration}}` : ''
    }${
      animationProps.delay !== 0 ? `\n      delay={${animationProps.delay}}` : ''
    }${
      animationProps.faster ? `\n      faster` : ''
    }${
      animationProps.fast ? `\n      fast` : ''
    }${
      animationProps.slow ? `\n      slow` : ''
    }${
      animationProps.slower ? `\n      slower` : ''
    }${
      animationProps.infinite ? `\n      infinite` : ''
    }
    >
      <div>Your content here</div>
    </${selectedAnimation.charAt(0).toUpperCase() + selectedAnimation.slice(1)}>
  );
}`}
                  </pre>
                </div>
              </div>

              {/* Stats & Features */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Library Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Total Animations:</span>
                      <span className="text-white font-semibold bg-purple-500/20 px-2 py-1 rounded">
                        {Object.keys(animationComponents).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Categories:</span>
                      <span className="text-white font-semibold bg-blue-500/20 px-2 py-1 rounded">
                        {Object.keys(categories).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Current:</span>
                      <span className="text-white font-semibold text-sm bg-green-500/20 px-2 py-1 rounded truncate max-w-24">
                        {selectedAnimation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4">
                  <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { icon: '⚡', text: 'Framer Motion powered' },
                      { icon: '📱', text: 'Mobile optimized' },
                      { icon: '🎯', text: 'Pixel-perfect CSS conversion' },
                      { icon: '⏱️', text: 'Full timing control' },
                      { icon: '♿', text: 'Accessibility support' },
                      { icon: '📦', text: 'TypeScript ready' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-purple-200">
                        <span className="mr-3 text-base">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Installation & Quick Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-4">🚀 Installation</h3>
                <div className="bg-gray-900/80 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm leading-relaxed">
{`# Install via npm
npm install framer-motion-animations framer-motion

# Install via yarn  
yarn add framer-motion-animations framer-motion

# Install via pnpm
pnpm add framer-motion-animations framer-motion`}
                  </pre>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold text-white mb-4">💡 Quick Tips</h3>
                <div className="grid grid-cols-1 gap-3 text-sm text-purple-200">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Use <code className="bg-black/30 px-1 rounded text-purple-300">faster</code> for 2x speed</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Use <code className="bg-black/30 px-1 rounded text-purple-300">slower</code> for 3x slower</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Set <code className="bg-black/30 px-1 rounded text-purple-300">infinite</code> for loops</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Control <code className="bg-black/30 px-1 rounded text-purple-300">delay</code> timing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Respects reduced motion preferences</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Touch-friendly mobile interface</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo;