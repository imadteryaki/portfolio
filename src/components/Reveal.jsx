import { motion, useReducedMotion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 40,
  className = "",
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: {
      x: 0,
      y: distance,
    },
    down: {
      x: 0,
      y: -distance,
    },
    left: {
      x: distance,
      y: 0,
    },
    right: {
      x: -distance,
      y: 0,
    },
    none: {
      x: 0,
      y: 0,
    },
  };

  const hiddenPosition = directions[direction] || directions.up;

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.98,
              ...hiddenPosition,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;