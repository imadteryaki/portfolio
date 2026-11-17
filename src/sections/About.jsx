import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function About() {
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
      {/* Background Glow */}

      <div
        className="
          absolute
          left-20
          top-20
          h-72
          w-72
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div
        className="
          mx-auto
          grid
          max-w-6xl
          items-center
          gap-12
          px-6
          md:grid-cols-3
        "
      >
        {/* Profile Image */}

        <motion.div
          initial={{
            opacity: 0,
            x: isArabic ? 50 : -50,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex justify-center"
        >
          {/* Orange Glow */}

          <div
            className="
              absolute
              h-[27rem]
              w-[27rem]
              rounded-full
              bg-orange-500/20
              blur-3xl
            "
          />

          {/* Blue Glow */}

          <div
            className="
              absolute
              -bottom-10
              -right-6
              h-78
              w-78
              rounded-full
              bg-blue-500/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              rounded-[2rem]
              border
              border-white/10
              bg-white/5
              p-3
              backdrop-blur-xl
            "
          >
            <motion.img
              src="/images/profile.png"
              alt="Imad Teryaki"
              whileHover={{
                scale: 1.04,
                rotate: isArabic ? 1 : -1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                h-[30rem]
                w-96
                rounded-3xl
                border
                border-orange-500/20
                object-cover
                object-top
                shadow-2xl
                shadow-orange-500/20
                ring-1
                ring-white/10
              "
            />
          </div>
        </motion.div>

        {/* Text + Approach */}

        <motion.div
          initial={{
            opacity: 0,
            x: isArabic ? -50 : 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="md:col-span-2"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p
            className="
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
            "
          >
            {t("about_label")}
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
            {t("about_title")}
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-white/60
            "
          >
            {t("about_description")}
          </p>

          {/* Approach Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -4,
            }}
            className="
              mt-10
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-7
              backdrop-blur-xl
              transition-colors
              duration-300
              hover:border-orange-500/20
            "
          >
            <h3 className="text-2xl font-bold text-white">
              {t("approach_title")}
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-semibold text-orange-400">
                  {t("approach_one_title")}
                </h4>

                <p className="mt-1 text-white/60">
                  {t("approach_one_text")}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400">
                  {t("approach_two_title")}
                </h4>

                <p className="mt-1 text-white/60">
                  {t("approach_two_text")}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400">
                  {t("approach_three_title")}
                </h4>

                <p className="mt-1 text-white/60">
                  {t("approach_three_text")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;