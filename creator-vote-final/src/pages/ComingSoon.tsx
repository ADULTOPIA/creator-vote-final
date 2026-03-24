import React from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages, languageNames } from '../i18n';
import analytics from '../services/analytics';

const ComingSoon: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);
  const langMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [showLanguageMenu]);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/adultopia/hero.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/50 shadow-lg backdrop-blur"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="fixed inset-x-0 top-0 z-20 border-b border-gray-200 bg-white/70 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={`${process.env.PUBLIC_URL}/adultopia/logoYoko.png`}
                alt="Creator Vote Final"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative" ref={langMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 hover:bg-gray-400 transition shadow flex-shrink-0"
                  title="言語選択"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <ellipse cx="12" cy="12" rx="4" ry="10" />
                    <line x1="2" y1="9" x2="22" y2="9" />
                    <line x1="2" y1="15" x2="22" y2="15" />
                  </svg>
                </button>

                {showLanguageMenu && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-lg bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-lg z-50 overflow-hidden"
                    style={{ backdropFilter: 'saturate(120%) blur(6px)' }}
                  >
                    <div className="py-2 bg-gradient-to-b from-white/40 to-white/20">
                      <div className="px-4 py-2">
                        <p className="text-xs font-semibold text-gray-600 mb-2">{t('language')}</p>
                        <div className="space-y-1">
                          {availableLanguages.map(lang => (
                            <button
                              key={lang}
                              type="button"
                              onClick={async () => {
                                analytics.event('language_changed', { language_code: lang });
                                await i18n.changeLanguage(lang);
                                setShowLanguageMenu(false);
                              }}
                              className={`block w-full text-left px-3 py-2 text-sm rounded transition-colors duration-150 ${
                                i18n.language === lang
                                  ? 'bg-pink-50 text-pink-600 font-semibold'
                                  : 'text-gray-700 hover:bg-white/30'
                              }`}
                            >
                              {languageNames[lang]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#EC4899] mb-4 md:text-4xl leading-snug">
              大人国 x RedBull<br />年度コスプレ人気投票
            </h1>
            <p className="text-lg font-medium text-gray-700 mb-8 md:text-xl">
              {t('waitingForEvent', '開始するまでお待ちください')}
            </p>
            <div
              className="mx-auto"
              style={{
                border: '4px solid rgba(236, 72, 153, 0.2)',
                borderTop: '4px solid #EC4899',
                borderRadius: '50%',
                width: 60,
                height: 60,
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
        </main>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
