import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEng from "../translations/en/translation.json";
import translationRus from "../translations/rus/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "rus"],
    fallbackLng: "rus",
    debug: false,
    detection: {
      order: ["cookie", "htmlTag", "path"],
      cookieMinutes: 10,
      caches: ["cookie"],
    },
    resources: {
      en: { translation: translationEng },
      rus: { translation: translationRus },
    },
    react: {
      useSuspense: false,
    },
  });
