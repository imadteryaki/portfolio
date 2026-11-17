import { useTranslation } from "react-i18next";
import { useState } from "react";

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const languages = [
        { code: "en", label: "EN" },
        { code: "de", label: "DE" },
        { code: "ar", label: "AR" },
    ];

    const current =
        languages.find((lang) => lang.code === i18n.language) || languages[0];

    function changeLanguage(code) {
        i18n.changeLanguage(code);

        document.documentElement.dir =
            code === "ar" ? "rtl" : "ltr";

        setOpen(false);
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition"
            >
                {current.label}
            </button>

            {open && (
                <div className={`absolute mt-3 w-28 bg-[#050816] border border-white/10 rounded-xl p-2`}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full text-white py-2 rounded-lg hover:bg-white/10"
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;