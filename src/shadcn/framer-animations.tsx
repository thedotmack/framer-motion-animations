// This file is designed for shadcn/ui installation
// Copy this file to your components/ui/framer-animations.tsx

"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { animationVariants } from "@/lib/animation-variants"

export interface BaseAnimationProps extends Omit<HTMLMotionProps<"div">, "animate" | "initial" | "transition"> {
  children: React.ReactNode
  duration?: number
  delay?: number
  repeat?: number | boolean
  className?: string
  style?: React.CSSProperties
  onAnimationComplete?: () => void
  faster?: boolean
  fast?: boolean
  slow?: boolean
  slower?: boolean
  infinite?: boolean
}

interface BaseAnimationComponentProps extends BaseAnimationProps {
  variant: keyof typeof animationVariants
}

const BaseAnimation = React.forwardRef<HTMLDivElement, BaseAnimationComponentProps>(
  (
    {
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
    },
    ref
  ) => {
    const animation = animationVariants[variant]

    // Calculate duration modifiers (matching animate.css behavior)
    let adjustedDuration = duration
    if (faster) adjustedDuration = duration / 2
    else if (fast) adjustedDuration = duration * 0.8
    else if (slow) adjustedDuration = duration * 2
    else if (slower) adjustedDuration = duration * 3

    // Handle repeat logic
    let repeatCount = repeat
    if (infinite) repeatCount = Infinity

    // Check for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false

    if (prefersReducedMotion) {
      adjustedDuration = 0.001
      repeatCount = 1
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
          repeat: repeatCount === true ? Infinity : repeatCount,
        }}
        className={className}
        style={{
          ...style,
          willChange: "transform, opacity",
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering
          WebkitBackfaceVisibility: "hidden",
        }}
        onAnimationComplete={onAnimationComplete}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

BaseAnimation.displayName = "BaseAnimation"

// Helper function to create individual animation components
const createAnimationComponent = (variant: keyof typeof animationVariants) => {
  return React.forwardRef<HTMLDivElement, BaseAnimationProps>((props, ref) => (
    <BaseAnimation ref={ref} variant={variant} {...props} />
  ))
}

// Attention Seekers
export const Bounce = createAnimationComponent("bounce")
export const Flash = createAnimationComponent("flash")
export const Pulse = createAnimationComponent("pulse")
export const RubberBand = createAnimationComponent("rubberBand")
export const ShakeX = createAnimationComponent("shakeX")
export const ShakeY = createAnimationComponent("shakeY")
export const HeadShake = createAnimationComponent("headShake")
export const Swing = createAnimationComponent("swing")
export const Tada = createAnimationComponent("tada")
export const Wobble = createAnimationComponent("wobble")
export const Jello = createAnimationComponent("jello")
export const HeartBeat = createAnimationComponent("heartBeat")

// Back Entrances
export const BackInDown = createAnimationComponent("backInDown")
export const BackInLeft = createAnimationComponent("backInLeft")
export const BackInRight = createAnimationComponent("backInRight")
export const BackInUp = createAnimationComponent("backInUp")

// Back Exits
export const BackOutDown = createAnimationComponent("backOutDown")
export const BackOutLeft = createAnimationComponent("backOutLeft")
export const BackOutRight = createAnimationComponent("backOutRight")
export const BackOutUp = createAnimationComponent("backOutUp")

// Bouncing Entrances
export const BounceIn = createAnimationComponent("bounceIn")
export const BounceInDown = createAnimationComponent("bounceInDown")
export const BounceInLeft = createAnimationComponent("bounceInLeft")
export const BounceInRight = createAnimationComponent("bounceInRight")
export const BounceInUp = createAnimationComponent("bounceInUp")

// Bouncing Exits
export const BounceOut = createAnimationComponent("bounceOut")
export const BounceOutDown = createAnimationComponent("bounceOutDown")
export const BounceOutLeft = createAnimationComponent("bounceOutLeft")
export const BounceOutRight = createAnimationComponent("bounceOutRight")
export const BounceOutUp = createAnimationComponent("bounceOutUp")

// Fading Entrances
export const FadeIn = createAnimationComponent("fadeIn")
export const FadeInDown = createAnimationComponent("fadeInDown")
export const FadeInDownBig = createAnimationComponent("fadeInDownBig")
export const FadeInLeft = createAnimationComponent("fadeInLeft")
export const FadeInLeftBig = createAnimationComponent("fadeInLeftBig")
export const FadeInRight = createAnimationComponent("fadeInRight")
export const FadeInRightBig = createAnimationComponent("fadeInRightBig")
export const FadeInUp = createAnimationComponent("fadeInUp")
export const FadeInUpBig = createAnimationComponent("fadeInUpBig")
export const FadeInTopLeft = createAnimationComponent("fadeInTopLeft")
export const FadeInTopRight = createAnimationComponent("fadeInTopRight")
export const FadeInBottomLeft = createAnimationComponent("fadeInBottomLeft")
export const FadeInBottomRight = createAnimationComponent("fadeInBottomRight")

// Fading Exits
export const FadeOut = createAnimationComponent("fadeOut")
export const FadeOutDown = createAnimationComponent("fadeOutDown")
export const FadeOutDownBig = createAnimationComponent("fadeOutDownBig")
export const FadeOutLeft = createAnimationComponent("fadeOutLeft")
export const FadeOutLeftBig = createAnimationComponent("fadeOutLeftBig")
export const FadeOutRight = createAnimationComponent("fadeOutRight")
export const FadeOutRightBig = createAnimationComponent("fadeOutRightBig")
export const FadeOutUp = createAnimationComponent("fadeOutUp")
export const FadeOutUpBig = createAnimationComponent("fadeOutUpBig")
export const FadeOutTopLeft = createAnimationComponent("fadeOutTopLeft")
export const FadeOutTopRight = createAnimationComponent("fadeOutTopRight")
export const FadeOutBottomLeft = createAnimationComponent("fadeOutBottomLeft")
export const FadeOutBottomRight = createAnimationComponent("fadeOutBottomRight")

// Flippers
export const Flip = createAnimationComponent("flip")
export const FlipInX = createAnimationComponent("flipInX")
export const FlipInY = createAnimationComponent("flipInY")
export const FlipOutX = createAnimationComponent("flipOutX")
export const FlipOutY = createAnimationComponent("flipOutY")

// Lightspeed
export const LightSpeedInLeft = createAnimationComponent("lightSpeedInLeft")
export const LightSpeedInRight = createAnimationComponent("lightSpeedInRight")
export const LightSpeedOutLeft = createAnimationComponent("lightSpeedOutLeft")
export const LightSpeedOutRight = createAnimationComponent("lightSpeedOutRight")

// Rotating Entrances
export const RotateIn = createAnimationComponent("rotateIn")
export const RotateInDownLeft = createAnimationComponent("rotateInDownLeft")
export const RotateInDownRight = createAnimationComponent("rotateInDownRight")
export const RotateInUpLeft = createAnimationComponent("rotateInUpLeft")
export const RotateInUpRight = createAnimationComponent("rotateInUpRight")

// Rotating Exits
export const RotateOut = createAnimationComponent("rotateOut")
export const RotateOutDownLeft = createAnimationComponent("rotateOutDownLeft")
export const RotateOutDownRight = createAnimationComponent("rotateOutDownRight")
export const RotateOutUpLeft = createAnimationComponent("rotateOutUpLeft")
export const RotateOutUpRight = createAnimationComponent("rotateOutUpRight")

// Specials
export const Hinge = createAnimationComponent("hinge")
export const JackInTheBox = createAnimationComponent("jackInTheBox")
export const RollIn = createAnimationComponent("rollIn")
export const RollOut = createAnimationComponent("rollOut")

// Zooming Entrances
export const ZoomIn = createAnimationComponent("zoomIn")
export const ZoomInDown = createAnimationComponent("zoomInDown")
export const ZoomInLeft = createAnimationComponent("zoomInLeft")
export const ZoomInRight = createAnimationComponent("zoomInRight")
export const ZoomInUp = createAnimationComponent("zoomInUp")

// Zooming Exits
export const ZoomOut = createAnimationComponent("zoomOut")
export const ZoomOutDown = createAnimationComponent("zoomOutDown")
export const ZoomOutLeft = createAnimationComponent("zoomOutLeft")
export const ZoomOutRight = createAnimationComponent("zoomOutRight")
export const ZoomOutUp = createAnimationComponent("zoomOutUp")

// Sliding Entrances
export const SlideInDown = createAnimationComponent("slideInDown")
export const SlideInLeft = createAnimationComponent("slideInLeft")
export const SlideInRight = createAnimationComponent("slideInRight")
export const SlideInUp = createAnimationComponent("slideInUp")

// Sliding Exits
export const SlideOutDown = createAnimationComponent("slideOutDown")
export const SlideOutLeft = createAnimationComponent("slideOutLeft")
export const SlideOutRight = createAnimationComponent("slideOutRight")
export const SlideOutUp = createAnimationComponent("slideOutUp")