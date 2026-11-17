import { FiArrowUp, FiGithub, FiLinkedin } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-[#050816]
        py-10
      "
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -left-20
          bottom-0
          h-48
          w-48
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -right-20
          top-0
          h-48
          w-48
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-8
            md:flex-row
          "
        >
          {/* Brand */}

          <div className="text-center md:text-start">
            <a
              href="#home"
              className="
                text-2xl
                font-bold
                text-white
                transition-colors
                duration-300
                hover:text-orange-500
              "
            >
              Imad Teryaki
            </a>

            <p className="mt-2 text-sm text-white/50">
              {t("footer_role")}
            </p>
          </div>


          {/* Social Links */}

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/imadteryaki"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-orange-500/40
                hover:bg-orange-500/10
                hover:text-orange-400
              "
            >
              <FiGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/imad-teryaki-0b7b98270/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-orange-500/40
                hover:bg-orange-500/10
                hover:text-orange-400
              "
            >
              <FiLinkedin size={20} />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label={t("footer_back_to_top")}
              title={t("footer_back_to_top")}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#EA580C]
                text-white
                shadow-lg
                shadow-orange-500/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#C2410C]
              "
            >
              <FiArrowUp size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Line */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-white/10
            pt-6
            text-center
            text-sm
            text-white
            md:flex-row
          "
        >
          <p>
            © {currentYear} Imad Teryaki. {t("footer_rights")}
          </p>

          <p>{t("footer_built_with")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;