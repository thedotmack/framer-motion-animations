import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

export interface BaseAnimationProps extends Omit<HTMLMotionProps<'div'>, 'animate' | 'initial' | 'transition'> {
  children: ReactNode;
  duration?: number;
  delay?: number;
  repeat?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
  onAnimationComplete?: () => void;
  faster?: boolean;
  fast?: boolean;
  slow?: boolean;
  slower?: boolean;
  infinite?: boolean;
}

export type AnimationVariant = {
  initial: any;
  animate: any;
};