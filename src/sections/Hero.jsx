import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiFileText } from "react-icons/fi";

import Reveal from "../components/Reveal";

function Hero({ onOpenCV }) {
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language.startsWith("ar");

    return (
        <section
            className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-[#050816]
        pt-24
      "
        >
            {/* Background Effects */}

            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
            >
                {/* Grid */}

                <div
                    className="
            absolute
            inset-0
            animate-grid
            bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
                />

                {/* Orange Glow */}

                <div
                    className="
            absolute
            left-20
            top-20
            h-72
            w-72
            animate-pulse
            rounded-full
            bg-orange-500/20
            blur-3xl
          "
                />

                {/* Blue Glow */}

                <div
                    className="
            absolute
            bottom-20
            right-20
            h-96
            w-96
            animate-pulse
            rounded-full
            bg-blue-400/20
            blur-3xl
          "
                />
            </div>

            <div
                className="
          relative
          z-10
          mx-auto
          grid
          max-w-6xl
          items-center
          gap-12
          px-6
          md:grid-cols-2
        "
                dir={isArabic ? "rtl" : "ltr"}
            >
                {/* Hero Text */}

                <Reveal
                    direction={isArabic ? "left" : "right"}
                    distance={50}
                    duration={0.8}
                >
                    <div>
                        <p className="mb-4 text-lg text-orange-400">
                            {t("hero_greeting")}
                        </p>

                        <h1
                            className="
                text-5xl
                font-bold
                tracking-tight
                text-white
                md:text-7xl
              "
                        >
                            {t("hero_title")}
                        </h1>

                        <p
                            className="
                mt-6
                text-lg
                leading-relaxed
                text-white/70
              "
                        >
                            {t("hero_description")}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {/* Download CV */}

                            <motion.button
                                type="button"
                                onClick={onOpenCV}
                                whileHover={{
                                    y: -3,
                                    scale: 1.02,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className="
    inline-flex
    items-center
    gap-2
    rounded-full
    bg-[#EA580C]
    px-7
    py-3
    font-semibold
    text-white
    shadow-lg
    shadow-orange-500/20
    transition-colors
    duration-300
    hover:bg-[#C2410C]
  "
                            >
                                <FiFileText size={18} />
                                <span>{t("view_cv")}</span>
                            </motion.button>
                            {/* Projects */}

                            <motion.a
                                href="#projects"
                                whileHover={{
                                    y: -3,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  px-7
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-orange-500/40
                  hover:bg-white/10
                  hover:text-orange-400
                "
                            >
                                {t("projects")}
                            </motion.a>
                        </div>
                    </div>
                </Reveal>

                {/* Code Area */}

                <Reveal
                    direction={isArabic ? "right" : "left"}
                    distance={50}
                    delay={0.15}
                    duration={0.8}
                >
                    <div
                        className="relative"
                        style={{
                            perspective: "1000px",
                        }}
                    >
                        {/* 3D Gradient Orb */}

                        <motion.div
                            aria-hidden="true"
                            animate={{
                                scale: [1, 1.15, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                absolute
                -inset-20
                rounded-full
                bg-gradient-to-r
                from-orange-500/30
                via-blue-400/30
                to-purple-500/30
                opacity-70
                blur-3xl
              "
                        />

                        {/* React Badge */}

                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute
                -top-4
                right-10
                z-20
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-white
                backdrop-blur-md
              "
                        >
                            React
                        </motion.div>

                        {/* Node Badge */}

                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute
                -right-6
                top-16
                z-20
                rounded-full
                border
                border-orange-400/30
                bg-orange-500/20
                px-4
                py-2
                text-white
                backdrop-blur-md
              "
                        >
                            Node.js
                        </motion.div>

                        {/* Python Badge */}

                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute
                bottom-20
                right-8
                z-20
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-white
                backdrop-blur-md
              "
                        >
                            Python
                        </motion.div>

                        {/* SQL Badge */}

                        <motion.div
                            animate={{
                                y: [0, 12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                absolute
                bottom-5
                right-10
                z-20
                rounded-full
                border
                border-orange-400/30
                bg-orange-500/20
                px-4
                py-2
                text-white
                backdrop-blur-md
              "
                        >
                            SQL
                        </motion.div>

                        {/* Code Card */}

                        <motion.div
                            whileHover={{
                                rotateY: isArabic ? -8 : 8,
                                rotateX: -5,
                                scale: 1.03,
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                            className="
                relative
                z-10
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-6
                shadow-2xl
                shadow-black/30
                backdrop-blur-xl
              "
                        >
                            <div className="mb-5 flex gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-500" />
                                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                                <span className="h-3 w-3 rounded-full bg-green-500" />
                            </div>

                            <pre
                                dir="ltr"
                                className="
                  overflow-x-auto
                  text-left
                  text-sm
                  leading-relaxed
                  text-white/80
                "
                            >
                                {`const developer = {
  name: "Imad Teryaki",
  role: "Full Stack Developer",
  stack: [
    "React",
    "Node.js",
    "Python",
    "SQL"
  ],
  mindset: "Always learning"
};`}
                            </pre>
                        </motion.div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Hero;