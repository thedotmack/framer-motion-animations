import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BaseAnimationProps } from '../types';
import { animationVariants } from '../lib/variants';

interface BaseAnimationComponentProps extends BaseAnimationProps {
  variant: keyof typeof animationVariants;
}

export const BaseAnimation = forwardRef<HTMLDivElement, BaseAnimationComponentProps>(
  ({
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
    infinite = false,
    ...props
  }, ref) => {
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
        ref={ref}
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
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

BaseAnimation.displayName = 'BaseAnimation';

// Helper function to create individual animation components
export const createAnimationComponent = (variant: keyof typeof animationVariants) => {
  return forwardRef<HTMLDivElement, BaseAnimationProps>((props, ref) => (
    <BaseAnimation ref={ref} variant={variant} {...props} />
  ));
};