import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

function Projects() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

          const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || t("dashboard.loadFailed")
          );
        }

        const projectsData = Array.isArray(data.projects)
          ? data.projects
          : Array.isArray(data)
            ? data
            : [];

        setProjects(projectsData);
      } catch (error) {
        setError(
          error.message || t("dashboard.loadFailed")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [t]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.97,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050816]
        pt-24
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          -left-32
          top-24
          h-80
          w-80
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
          h-80
          w-80
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div
        className="relative mx-auto max-w-6xl px-6"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <Reveal direction="up" distance={40}>
          <div className="text-center">
            <p
              className="
                font-semibold
                uppercase
                tracking-wider
                text-orange-500
              "
            >
              {t("portfolio")}
            </p>

            <h2
              className="
                mt-3
                text-4xl
                font-bold
                text-white
                md:text-5xl
              "
            >
              {t("featured_projects")}
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                leading-relaxed
                text-white/60
              "
            >
              {t("projects_description")}
            </p>
          </div>
        </Reveal>

        {loading && (
          <div className="mt-16 text-center text-white/60">
            {t("dashboard.loading")}
          </div>
        )}

        {error && (
          <div className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-16 text-center text-white/60">
            {t("dashboard.noProjects")}
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <Reveal
            direction="up"
            distance={45}
            delay={0.12}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="
  mt-12
  grid
  items-start
  gap-6
  md:grid-cols-2
  xl:grid-cols-3
"
            >
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className="self-start"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Projects;