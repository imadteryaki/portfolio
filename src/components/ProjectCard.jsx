import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function ProjectCard({
  title,
  description,
  technologies = [],
  status = "planned",
  image,
  github,
  liveDemo,
}) {
  const { t } = useTranslation();

  const statusLabels = {
    planned: t("project.statuses.planned"),
    "in-development": t("project.statuses.inDevelopment"),
    completed: t("project.statuses.completed"),
  };

  const statusIcons = {
    planned: "📋",
    "in-development": "🚧",
    completed: "✅",
  };

  const statusStyles = {
    planned: "border-blue-400/20 bg-blue-400/10 text-blue-300",
    "in-development":
      "border-orange-400/20 bg-orange-400/10 text-orange-300",
    completed: "border-green-400/20 bg-green-400/10 text-green-300",
  };

  const currentStatus = statusLabels[status] || status;

  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-colors
        duration-300
        hover:border-orange-500/30
        hover:bg-white/[0.07]
      "
    >
      {/* Project Image */}

      <div className="relative h-40 overflow-hidden sm:h-44">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-950
              via-blue-900
              to-orange-950
            "
          >
            <span className="text-4xl">
              {statusIcons[status] || "📁"}
            </span>

            <span className="mt-2 text-sm font-medium text-white/70">
              {currentStatus}
            </span>
          </div>
        )}

        {/* Links Overlay */}

        {(github || liveDemo) && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              gap-3
              bg-black/60
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub`}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  p-2.5
                  text-white
                  backdrop-blur-md
                  transition
                  hover:border-orange-500
                  hover:bg-orange-500
                "
              >
                <FiGithub size={18} />
              </a>
            )}

            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} Live Demo`}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  p-2.5
                  text-white
                  backdrop-blur-md
                  transition
                  hover:border-orange-500
                  hover:bg-orange-500
                "
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Project Content */}

      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3
            className="
              min-w-0
              flex-1
              text-xl
              font-bold
              leading-snug
              text-white
            "
          >
            {title}
          </h3>

          <span
            className={`
              shrink-0
              whitespace-nowrap
              rounded-full
              border
              px-2.5
              py-1
              text-[11px]
              font-semibold
              ${statusStyles[status] || statusStyles.planned}
            `}
          >
            {currentStatus}
          </span>
        </div>

        <p
          className="
            mt-3
            whitespace-pre-line
            text-sm
            leading-6
            text-white/60
          "
        >
          {description}
        </p>

        {/* Technologies */}

        {technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="
                  rounded-md
                  border
                  border-white/10
                  bg-white/5
                  px-2.5
                  py-1
                  text-xs
                  text-white/70
                "
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;