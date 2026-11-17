import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";

import Reveal from "../components/Reveal";

const contactItems = [
  {
    labelKey: "contact_email",
    value: "teryaki.imad@gmail.com",
    href: "mailto:teryaki.imad@gmail.com",
    icon: FiMail,
  },
  {
    labelKey: "contact_location",
    value: "Germany",
    href: null,
    icon: FiMapPin,
  },
  {
    labelKey: "contact_linkedin",
    value: "Imad Teryaki",
    href: "https://www.linkedin.com/in/imad-teryaki-0b7b98270/",
    icon: FiLinkedin,
  },
  {
    labelKey: "contact_github",
    value: "@imadteryaki",
    href: "https://github.com/imadteryaki",
    icon: FiGithub,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Contact() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      toast.success("Your message was sent successfully!", {
        id: loadingToast,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong.", {
        id: loadingToast,
      });
    }
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
      {/* Background Glows */}

      <div
        aria-hidden="true"
        className="
          absolute
          -left-32
          top-32
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
        className="relative mx-auto max-w-7xl px-6"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Section Heading */}

        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="
                font-semibold
                uppercase
                tracking-[0.2em]
                text-orange-500
              "
            >
              {t("contact_label")}
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
              {t("contact_title")}
            </h2>

            <p
              className="
                mt-6
                text-lg
                leading-relaxed
                text-white/60
              "
            >
              {t("contact_description")}
            </p>
          </div>
        </Reveal>

        {/* Contact Content */}

        <div
          className="
            mt-16
            grid
            gap-8
            lg:grid-cols-[0.85fr_1.15fr]
          "
        >
          {/* Contact Information */}

          <Reveal
            direction={isArabic ? "left" : "right"}
            distance={50}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="
                h-full
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-7
                backdrop-blur-xl
                md:p-9
              "
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-white">
                  {t("contact_info_title")}
                </h3>

                <p className="mt-3 leading-relaxed text-white/60">
                  {t("contact_info_description")}
                </p>
              </motion.div>

              <div className="mt-8 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <>
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-orange-500/20
                          bg-orange-500/10
                          text-orange-400
                          transition-all
                          duration-300
                          group-hover:scale-110
                          group-hover:bg-orange-500
                          group-hover:text-white
                        "
                      >
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm text-white/40">
                          {t(item.labelKey)}
                        </p>

                        <p
                          className="
                            mt-1
                            truncate
                            font-medium
                            text-white
                          "
                        >
                          {item.value}
                        </p>
                      </div>

                      {item.href && (
                        <FiArrowRight
                          className={`
                            ms-auto
                            shrink-0
                            text-white/30
                            transition-all
                            duration-300
                            group-hover:text-orange-400
                            ${isArabic
                              ? "rotate-180 group-hover:-translate-x-1"
                              : "group-hover:translate-x-1"
                            }
                          `}
                        />
                      )}
                    </>
                  );

                  return (
                    <motion.div
                      key={item.labelKey}
                      variants={itemVariants}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-orange-500/30
                            hover:bg-white/[0.06]
                          "
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-4
                          "
                        >
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Availability */}

              <motion.div
                variants={itemVariants}
                className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  p-4
                "
              >
                <span
                  className="
                    h-3
                    w-3
                    shrink-0
                    rounded-full
                    bg-green-400
                    shadow-[0_0_15px_rgba(74,222,128,0.8)]
                  "
                />

                <span className="font-medium text-green-300">
                  {t("contact_available")}
                </span>
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Contact Form */}

          <Reveal
            direction={isArabic ? "right" : "left"}
            distance={50}
            delay={0.12}
          >
            <form
              onSubmit={handleSubmit}
              className="
                h-full
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-7
                backdrop-blur-xl
                md:p-9
              "
            >
              <h3 className="text-2xl font-bold text-white">
                {t("contact_form_title")}
              </h3>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-white/70
                    "
                  >
                    {t("contact_name")}
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t("contact_name_placeholder")}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3.5
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/25
                      focus:border-orange-500/60
                      focus:ring-2
                      focus:ring-orange-500/10
                    "
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-white/70
                    "
                  >
                    {t("contact_email")}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("contact_email_placeholder")}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3.5
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/25
                      focus:border-orange-500/60
                      focus:ring-2
                      focus:ring-orange-500/10
                    "
                  />
                </div>

                {/* Subject */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="subject"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-white/70
                    "
                  >
                    {t("contact_subject")}
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder={t("contact_subject_placeholder")}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3.5
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/25
                      focus:border-orange-500/60
                      focus:ring-2
                      focus:ring-orange-500/10
                    "
                  />
                </div>

                {/* Message */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-white/70
                    "
                  >
                    {t("contact_message")}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={t("contact_message_placeholder")}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3.5
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/25
                      focus:border-orange-500/60
                      focus:ring-2
                      focus:ring-orange-500/10
                    "
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  mt-7
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#EA580C]
                  px-6
                  py-4
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-orange-500/20
                  transition-colors
                  duration-300
                  hover:bg-[#C2410C]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-500
                  focus:ring-offset-2
                  focus:ring-offset-[#050816]
                "
              >
                <FiSend
                  className={`
                    transition-transform
                    duration-300
                    ${isArabic
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                    }
                  `}
                />

                {t("contact_send")}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;