# Framer Motion Animations

A comprehensive collection of 90+ ready-to-use animations for React using Framer Motion. Inspired by animate.css, built for modern React applications.

[![npm version](https://img.shields.io/npm/v/framer-motion-animations.svg)](https://www.npmjs.com/package/framer-motion-animations)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🎭 **90+ animations** - All your favorite animate.css animations, implemented with Framer Motion
- 🎯 **Pixel-perfect** - Accurately recreated timing, easing, and keyframes from animate.css
- 📱 **Mobile optimized** - Hardware-accelerated animations with automatic reduced motion support
- 🎨 **Fully customizable** - Control duration, delay, repeat, and speed modifiers
- 🔧 **TypeScript ready** - Full type definitions included
- 🌲 **Tree-shakeable** - Import only the animations you need
- ♿ **Accessible** - Respects `prefers-reduced-motion` automatically

## 📦 Installation

### NPM Package

```bash
npm install framer-motion-animations framer-motion
```

```bash
yarn add framer-motion-animations framer-motion
```

```bash
pnpm add framer-motion-animations framer-motion
```

### Shadcn/ui Style Installation

If you're using shadcn/ui or prefer to have the source code in your project:

1. Copy the animation variants to your project:
```bash
# Create the necessary directories
mkdir -p lib components/ui

# Copy the files
curl -o lib/animation-variants.ts https://raw.githubusercontent.com/thedotmack/framer-motion-animations/main/src/shadcn/animation-variants.ts
curl -o components/ui/framer-animations.tsx https://raw.githubusercontent.com/thedotmack/framer-motion-animations/main/src/shadcn/framer-animations.tsx
```

2. Install the required dependency:
```bash
npm install framer-motion
```

## 🚀 Quick Start

### Using NPM Package

```tsx
import { BounceIn, FadeOut, Pulse } from 'framer-motion-animations';

function MyComponent() {
  return (
    <BounceIn>
      <div className="bg-blue-500 p-4 rounded">
        I will bounce in!
      </div>
    </BounceIn>
  );
}
```

### Using Shadcn/ui Style

```tsx
import { BounceIn, FadeOut, Pulse } from '@/components/ui/framer-animations';

function MyComponent() {
  return (
    <BounceIn>
      <div className="bg-blue-500 p-4 rounded">
        I will bounce in!
      </div>
    </BounceIn>
  );
}
```

## 📖 API Reference

### Animation Props

All animation components accept these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `1` | Animation duration in seconds |
| `delay` | `number` | `0` | Delay before animation starts in seconds |
| `repeat` | `number \| boolean` | `0` | Number of times to repeat. Use `true` for infinite |
| `faster` | `boolean` | `false` | 2x speed (0.5s duration) |
| `fast` | `boolean` | `false` | 1.25x speed (0.8s duration) |
| `slow` | `boolean` | `false` | 0.5x speed (2s duration) |
| `slower` | `boolean` | `false` | 0.33x speed (3s duration) |
| `infinite` | `boolean` | `false` | Repeat animation infinitely |
| `className` | `string` | - | CSS classes to apply |
| `style` | `CSSProperties` | - | Inline styles |
| `onAnimationComplete` | `() => void` | - | Callback when animation completes |

### Usage Examples

#### Basic Animation
```tsx
<FadeIn>
  <h1>Welcome!</h1>
</FadeIn>
```

#### With Duration and Delay
```tsx
<SlideInLeft duration={2} delay={0.5}>
  <Card>Sliding in from left</Card>
</SlideInLeft>
```

#### Speed Modifiers
```tsx
<BounceIn faster>
  <Button>Fast Bounce</Button>
</BounceIn>

<ZoomOut slower>
  <div>Slow zoom out</div>
</ZoomOut>
```

#### Infinite Loop
```tsx
<Pulse infinite>
  <Badge>New</Badge>
</Pulse>
```

#### With Callback
```tsx
<FadeOut 
  duration={1} 
  onAnimationComplete={() => console.log('Faded out!')}
>
  <Alert>This will fade out</Alert>
</FadeOut>
```

#### Chaining Animations
```tsx
const [key, setKey] = useState(0);

<BounceIn 
  key={key}
  onAnimationComplete={() => setKey(k => k + 1)}
>
  <div>Bounces on every key change</div>
</BounceIn>
```

## 🎨 Available Animations

### Attention Seekers
- `Bounce`, `Flash`, `Pulse`, `RubberBand`, `ShakeX`, `ShakeY`, `HeadShake`, `Swing`, `Tada`, `Wobble`, `Jello`, `HeartBeat`

### Back Entrances & Exits
- `BackInDown`, `BackInLeft`, `BackInRight`, `BackInUp`
- `BackOutDown`, `BackOutLeft`, `BackOutRight`, `BackOutUp`

### Bouncing Entrances & Exits
- `BounceIn`, `BounceInDown`, `BounceInLeft`, `BounceInRight`, `BounceInUp`
- `BounceOut`, `BounceOutDown`, `BounceOutLeft`, `BounceOutRight`, `BounceOutUp`

### Fading Entrances & Exits
- `FadeIn`, `FadeInDown`, `FadeInDownBig`, `FadeInLeft`, `FadeInLeftBig`, `FadeInRight`, `FadeInRightBig`, `FadeInUp`, `FadeInUpBig`, `FadeInTopLeft`, `FadeInTopRight`, `FadeInBottomLeft`, `FadeInBottomRight`
- `FadeOut`, `FadeOutDown`, `FadeOutDownBig`, `FadeOutLeft`, `FadeOutLeftBig`, `FadeOutRight`, `FadeOutRightBig`, `FadeOutUp`, `FadeOutUpBig`, `FadeOutTopLeft`, `FadeOutTopRight`, `FadeOutBottomLeft`, `FadeOutBottomRight`

### Flippers
- `Flip`, `FlipInX`, `FlipInY`, `FlipOutX`, `FlipOutY`

### Lightspeed
- `LightSpeedInLeft`, `LightSpeedInRight`, `LightSpeedOutLeft`, `LightSpeedOutRight`

### Rotating Entrances & Exits
- `RotateIn`, `RotateInDownLeft`, `RotateInDownRight`, `RotateInUpLeft`, `RotateInUpRight`
- `RotateOut`, `RotateOutDownLeft`, `RotateOutDownRight`, `RotateOutUpLeft`, `RotateOutUpRight`

### Specials
- `Hinge`, `JackInTheBox`, `RollIn`, `RollOut`

### Zooming Entrances & Exits
- `ZoomIn`, `ZoomInDown`, `ZoomInLeft`, `ZoomInRight`, `ZoomInUp`
- `ZoomOut`, `ZoomOutDown`, `ZoomOutLeft`, `ZoomOutRight`, `ZoomOutUp`

### Sliding Entrances & Exits
- `SlideInDown`, `SlideInLeft`, `SlideInRight`, `SlideInUp`
- `SlideOutDown`, `SlideOutLeft`, `SlideOutRight`, `SlideOutUp`

## 🛠️ Advanced Usage

### Custom Animation Component

You can create your own animation components using the provided utilities:

```tsx
import { createAnimationComponent, animationVariants } from 'framer-motion-animations';

// Use an existing variant with custom defaults
const CustomBounce = createAnimationComponent('bounce');

// Or access variants directly for more control
import { motion } from 'framer-motion';
import { animationVariants } from 'framer-motion-animations';

function CustomAnimation({ children }) {
  return (
    <motion.div
      initial={animationVariants.bounceIn.initial}
      animate={animationVariants.bounceIn.animate}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
}
```

### With AnimatePresence

For exit animations, use Framer Motion's `AnimatePresence`:

```tsx
import { AnimatePresence } from 'framer-motion';
import { FadeOut } from 'framer-motion-animations';

function MyComponent({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <FadeOut>
          <div>This will fade out when removed</div>
        </FadeOut>
      )}
    </AnimatePresence>
  );
}
```

## 🎯 Performance Considerations

- All animations use CSS transforms and opacity for optimal performance
- Hardware acceleration is enabled by default
- Animations automatically pause when the tab is not visible
- Tree-shaking ensures you only bundle the animations you use

## ♿ Accessibility

The library automatically respects the user's motion preferences:

- When `prefers-reduced-motion: reduce` is set, animations will complete instantly
- Animation duration is set to 0.001s to maintain completion callbacks
- Users can still interact with all animated content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Alex Newman](https://github.com/thedotmack)

## 🙏 Credits

This library is inspired by [animate.css](https://animate.style/) by Daniel Eden. All animations have been carefully recreated using Framer Motion to provide the same visual effects with modern React patterns.