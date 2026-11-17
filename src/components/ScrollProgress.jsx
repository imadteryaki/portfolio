import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="
        fixed
        left-0
        top-0
        z-[100]
        h-[3px]
        w-full
        origin-left
        bg-gradient-to-r
        from-orange-600
        via-orange-500
        to-blue-500
        shadow-[0_0_12px_rgba(234,88,12,0.7)]
      "
    />
  );
}

export default ScrollProgress;