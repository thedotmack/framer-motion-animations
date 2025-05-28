# Contributing to Framer Motion Animations

First off, thank you for considering contributing to Framer Motion Animations! It's people like you that make this library better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Code samples if applicable
- Your environment (React version, Framer Motion version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- A clear and descriptive title
- A detailed description of the proposed feature
- Why this enhancement would be useful
- Code examples of how it might work

### Adding New Animations

To add a new animation:

1. Add the animation variant to `src/lib/variants.ts`
2. Export the component from `src/components/index.ts`
3. Update the README.md with the new animation
4. Ensure the animation follows animate.css naming conventions
5. Test the animation thoroughly

Example:
```typescript
// In src/lib/variants.ts
myNewAnimation: {
  initial: { /* initial state */ },
  animate: {
    /* animation properties */
    transition: {
      duration: 1,
      /* other transition properties */
    }
  }
}

// In src/components/index.ts
export const MyNewAnimation = createAnimationComponent('myNewAnimation');
```

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Run `npm install` to install dependencies
3. Make your changes
4. Ensure your code follows the existing style
5. Run `npm run type-check` to ensure no TypeScript errors
6. Update documentation if needed
7. Create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/framer-motion-animations.git
cd framer-motion-animations

# Install dependencies
npm install

# Run development build with watch mode
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build
```

## Style Guide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep animations performant (use transforms and opacity when possible)

## Animation Guidelines

When creating or modifying animations:

1. **Match animate.css behavior**: Animations should closely match their animate.css counterparts
2. **Performance first**: Use CSS transforms and opacity for best performance
3. **Accessibility**: Ensure animations respect `prefers-reduced-motion`
4. **Timing**: Default duration should be 1 second unless the animation requires different timing
5. **Naming**: Follow animate.css naming conventions (camelCase in code, matching the original names)

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉