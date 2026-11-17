import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";

import {
  SiExpress,
  SiFlask,
  SiGooglebigquery,
  SiJavascript,
  SiMongodb,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

import { TbSql } from "react-icons/tb";

import Reveal from "../components/Reveal";

const technologyGroups = [
  {
    titleKey: "tech_frontend",
    technologies: [
      {
        name: "HTML5",
        icon: FaHtml5,
        color: "#E34F26",
      },
      {
        name: "CSS3",
        icon: FaCss3Alt,
        color: "#1572B6",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#F7DF1E",
      },
      {
        name: "React",
        icon: FaReact,
        color: "#61DAFB",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#38BDF8",
      },
      {
        name: "Vite",
        icon: SiVite,
        color: "#646CFF",
      },
    ],
  },
  {
    titleKey: "tech_backend",
    technologies: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "#5FA04E",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#FFFFFF",
      },
      {
        name: "Python",
        icon: FaPython,
        color: "#3776AB",
      },
      {
        name: "Flask",
        icon: SiFlask,
        color: "#FFFFFF",
      },
    ],
  },
  {
    titleKey: "tech_databases",
    technologies: [
      {
        name: "SQL",
        icon: TbSql,
        color: "#F29111",
      },
      {
        name: "Google BigQuery",
        icon: SiGooglebigquery,
        color: "#4285F4",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
      },
    ],
  },
  {
    titleKey: "tech_tools",
    technologies: [
      {
        name: "Git",
        icon: FaGitAlt,
        color: "#F05032",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        color: "#FFFFFF",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function TechnologyCard({ technology }) {
  const Icon = technology.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-5
        backdrop-blur-xl
        transition-colors
        duration-300
        hover:border-orange-500/40
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background: `radial-gradient(
            circle at center,
            ${technology.color}18,
            transparent 70%
          )`,
        }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/5
          "
        >
          <Icon
            size={30}
            style={{
              color: technology.color,
            }}
            className="
              transition-transform
              duration-300
              group-hover:scale-110
              group-hover:rotate-3
            "
          />
        </div>

        <span className="font-semibold text-white">
          {technology.name}
        </span>
      </div>
    </motion.div>
  );
}

function Technologies() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050816]
        pt-24
      "
    >
      {/* Background Decorations */}

      <div
        aria-hidden="true"
        className="
          absolute
          -left-32
          top-1/3
          h-72
          w-72
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -right-32
          bottom-20
          h-72
          w-72
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div
        className="relative mx-auto max-w-7xl px-6"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Section Heading */}

        <Reveal
          direction={isArabic ? "left" : "right"}
          distance={40}
        >
          <div className="max-w-3xl">
            <p
              className="
                font-semibold
                uppercase
                tracking-[0.2em]
                text-orange-500
              "
            >
              {t("tech_label")}
            </p>

            <h2
              className="
                mt-4
                text-4xl
                font-bold
                leading-tight
                text-white
                md:text-5xl
              "
            >
              {t("tech_title")}
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-white/60
              "
            >
              {t("tech_description")}
            </p>
          </div>
        </Reveal>

        {/* Technology Groups */}

        <div className="mt-16 space-y-14">
          {technologyGroups.map((group, groupIndex) => (
            <Reveal
              key={group.titleKey}
              direction="up"
              distance={35}
              delay={groupIndex * 0.08}
            >
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <h3
                    className="
                      whitespace-nowrap
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {t(group.titleKey)}
                  </h3>

                  <div className="h-px w-full bg-white/10" />
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  className="
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                  "
                >
                  {group.technologies.map((technology) => (
                    <TechnologyCard
                      key={technology.name}
                      technology={technology}
                    />
                  ))}
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;