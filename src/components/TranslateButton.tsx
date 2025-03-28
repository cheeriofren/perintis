import { useState, useEffect } from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (options: any, element: string) => void;
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export default function TranslateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.translate-button-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const translate = (targetLang: string) => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'id',
          includedLanguages: targetLang,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    setCurrentLang(targetLang);
    setIsOpen(false);
  };

  return (
    <div className="relative translate-button-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 ease-in-out"
      >
        <LanguageIcon className="h-5 w-5 mr-2 text-gray-500" />
        <span className="mr-2">{languages.find(lang => lang.code === currentLang)?.flag}</span>
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === currentLang)?.name || 'Terjemahkan'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transform transition-all duration-200 ease-in-out">
          <div className="py-1" role="menu">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => translate(language.code)}
                className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-150 ease-in-out ${
                  currentLang === language.code
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                <span className="mr-3 text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 