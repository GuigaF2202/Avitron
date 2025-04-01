import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "EN", country: "US" },
  { code: "pt", label: "PT", country: "BR" },
  { code: "es", label: "ES", country: "ES" }
];

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = async (lng) => {
    try {
      await changeLanguage(lng);
    } catch (error) {
      console.error(t('language.errors.changing'), error);
    }
  };

  const getLanguageLabel = (code) => {
    switch (code) {
      case 'en': return 'English';
      case 'pt': return 'Português';
      case 'es': return 'Español';
      default: return code.toUpperCase();
    }
  };

  return (
    <div className="flex space-x-2" role="group" aria-label={t('language.selector', 'Seletor de idiomas')}>
      {LANGUAGE_OPTIONS.map(({ code, label, country }) => (
        <button
          key={code}
          onClick={() => handleLanguageChange(code)}
          className={`
            p-2 rounded-md flex items-center space-x-1 transition-colors
            ${language === code 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }
          `}
          aria-pressed={language === code}
          title={t('language.change', 'Mudar para {{lang}}', { lang: getLanguageLabel(code) })}
        >
          <ReactCountryFlag
            countryCode={country}
            svg
            aria-hidden="true"
            style={{
              width: '1.25em',
              height: '1.25em'
            }}
          />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
