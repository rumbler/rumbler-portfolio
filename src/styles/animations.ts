// Definições de classes para animações e transformações
export const animations = {
  // Hover Scales
  hoverScale: {
    sm: 'transform transition-all duration-300 ease-out hover:scale-102',
    md: 'transform transition-all duration-300 ease-out hover:scale-103',
    lg: 'transform transition-all duration-300 ease-out hover:scale-104',
  },

  // Icon Animations
  iconHover: {
    rotate: 'transform transition-transform duration-300 ease-out group-hover:rotate-6',
    bounce: 'transform transition-transform duration-300 ease-out group-hover:-translate-y-1',
    pulse: 'animate-pulse',
  },

  // Image Hover Effects
  imageHover: {
    zoom: 'transform transition-transform duration-300 ease-out group-hover:scale-105',
    brightness: 'transition-all duration-300 ease-out group-hover:brightness-110',
    blur: 'transition-all duration-300 ease-out group-hover:blur-sm',
  },

  // Text Hover Effects
  textHover: {
    underline: 'relative after:content-[""] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full',
    color: 'transition-colors duration-300 ease-out group-hover:text-primary',
    scale: 'transform transition-transform duration-300 ease-out group-hover:scale-102',
  },

  // Card Hover Effects
  cardHover: {
    lift: 'transform transition-all duration-700 ease-in-out hover:scale-105',
    glow: 'transition-all duration-700 ease-in-out hover:shadow-lg hover:shadow-primary/20',
    border: 'border border-transparent transition-colors duration-700 ease-in-out hover:border-primary',
  },

  // Transition Base
  transition: {
    base: 'transition-all duration-300 ease-out',
    fast: 'transition-all duration-150 ease-out',
    slow: 'transition-all duration-500 ease-out',
  },
};
