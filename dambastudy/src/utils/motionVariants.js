/**
 * Framer Motion Animation Variants
 * Reusable animation configurations for consistent UI animations
 */

// Page transition variants - Fade + Slide up
export const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

// Card hover variants - Scale + Shadow boost
export const cardVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
        },
    },
};

// Hero section fade-in
export const heroVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Stagger children for container
export const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Individual child fade-up
export const itemVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

// Button variants - Soft opacity
export const buttonVariants = {
    initial: {
        opacity: 0.9,
    },
    animate: {
        opacity: 1,
    },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    tap: {
        scale: 0.98,
        opacity: 0.9,
        transition: {
            duration: 0.1,
        },
    },
};

// Fade variants
export const fadeVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};

// Slide variants
export const slideUpVariants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

// Scale fade variants
export const scaleFadeVariants = {
    initial: {
        opacity: 0,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
};
