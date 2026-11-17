import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";

const NAVBAR_OFFSET = 20;

const navigationLinks = [
    {
        id: "about",
        translationKey: "about",
    },
    {
        id: "technologies",
        translationKey: "technologies",
    },
    {
        id: "projects",
        translationKey: "projects",
    },
    {
        id: "contact",
        translationKey: "contact",
    },
];

function Navbar() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const { t, i18n } = useTranslation();

    const isArabic = i18n.language.startsWith("ar");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setIsScrolled(scrollY > 10);

            const sections = navigationLinks
                .map((link) => document.getElementById(link.id))
                .filter(Boolean);

            if (sections.length === 0) {
                return;
            }

            const viewportBottom = scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (viewportBottom >= documentHeight - 4) {
                setActiveSection(sections[sections.length - 1].id);
                return;
            }

            const activationPoint = scrollY + NAVBAR_OFFSET + 40;

            let currentSection = "";

            sections.forEach((section) => {
                if (section.offsetTop <= activationPoint) {
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleNavigation = (event, sectionId) => {
        event.preventDefault();

        const targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            console.warn(`Section with id "${sectionId}" was not found.`);
            return;
        }

        setActiveSection(sectionId);
        setOpen(false);

        const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.scrollY -
            NAVBAR_OFFSET;

        window.history.replaceState(null, "", window.location.pathname);
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth",
        });
    };

    const handleHomeNavigation = (event) => {
        event.preventDefault();

        setOpen(false);
        setActiveSection("");

        window.history.replaceState(null, "", window.location.pathname); window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const desktopLinkClass = (sectionId) => {
        const isActive = activeSection === sectionId;

        return `
      relative
      py-2
      text-sm
      font-medium
      transition-colors
      duration-300
      after:absolute
      after:-bottom-1
      after:h-[2px]
      after:rounded-full
      after:bg-orange-500
      after:transition-all
      after:duration-300
      ${isArabic ? "after:right-0" : "after:left-0"}
      ${isActive
                ? "text-orange-400 after:w-full"
                : "text-gray-300 after:w-0 hover:text-orange-400 hover:after:w-full"
            }
    `;
    };

    const mobileLinkClass = (sectionId) => {
        const isActive = activeSection === sectionId;

        return `
      rounded-xl
      border
      px-4
      py-3
      text-lg
      font-medium
      transition-all
      duration-300
      ${isActive
                ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                : "border-transparent text-white hover:border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-400"
            }
    `;
    };

    return (
        <motion.nav
            initial={{
                y: -50,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        border-b
        transition-colors
        duration-300
        ${isScrolled
                    ? "border-white/10 bg-[#050816]/75 shadow-2xl shadow-black/30 backdrop-blur-xl"
                    : "border-transparent bg-[#050816]/30 backdrop-blur-md"
                }
      `}
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div
                className="
          mx-auto
          flex
          max-w-6xl
          items-center
          justify-between
          px-6
          py-5
        "
            >
                <a
                    href="#home"
                    onClick={handleHomeNavigation}
                    aria-label="Go to homepage"
                    className="
            text-3xl
            font-bold
            tracking-tight
            transition-transform
            duration-300
            hover:scale-[1.02]
          "
                >
                    <span className="text-white">Teryaki</span>
                    <span className="text-orange-500">.dev</span>
                </a>

                <div className="hidden items-center gap-12 text-white md:flex">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(event) => handleNavigation(event, link.id)}
                            className={desktopLinkClass(link.id)}
                        >
                            {t(link.translationKey)}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center md:flex">
                    <LanguageSwitcher />
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((previousState) => !previousState)}
                    aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
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
            text-2xl
            text-white
            transition-all
            duration-300
            hover:border-orange-500/30
            hover:bg-orange-500/10
            hover:text-orange-400
            md:hidden
          "
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            onClick={() => setOpen(false)}
                            className="
                fixed
                inset-0
                z-40
                h-[100dvh]
                bg-[#050816]/80
                backdrop-blur-md
                md:hidden
              "
                        />

                        <motion.aside
                            id="mobile-navigation"
                            initial={{
                                x: isArabic ? "-100%" : "100%",
                            }}
                            animate={{
                                x: 0,
                            }}
                            exit={{
                                x: isArabic ? "-100%" : "100%",
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={`
                fixed
                top-0
                z-50
                flex
                h-[100dvh]
                w-[min(82vw,320px)]
                flex-col
                overflow-y-auto
                border-white/10
                bg-[#050816]
                px-7
                pt-7
                pb-10
                text-white
                shadow-2xl
                shadow-black/50
                md:hidden
                ${isArabic ? "left-0 border-r" : "right-0 border-l"}
              `}
                            style={{
                                backgroundColor: "#050816",
                                paddingBottom:
                                    "max(40px, env(safe-area-inset-bottom))",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <a
                                    href="#home"
                                    onClick={handleHomeNavigation}
                                    className="text-2xl font-bold"
                                >
                                    <span className="text-white">Teryaki</span>
                                    <span className="text-orange-500">.dev</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close navigation menu"
                                    className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    text-2xl
                    text-white
                    transition-all
                    duration-300
                    hover:border-orange-500/30
                    hover:bg-orange-500/10
                    hover:text-orange-400
                  "
                                >
                                    <FiX />
                                </button>
                            </div>

                            <div className="mt-12 flex flex-col gap-3 text-white">
                                {navigationLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        onClick={(event) =>
                                            handleNavigation(event, link.id)
                                        }
                                        className={mobileLinkClass(link.id)}
                                    >
                                        {t(link.translationKey)}
                                    </a>
                                ))}
                            </div>

                            <div className="mt-auto border-t border-white/10 pt-5">
                                <LanguageSwitcher />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;