import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TokenInputModalProps {
  isOpen: boolean;
  onConfirm: (token: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TokenInputModal: React.FC<TokenInputModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  isSubmitting = false,
}) => {
  const { t } = useTranslation();
  const [segments, setSegments] = useState<[string, string, string, string]>(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  React.useEffect(() => {
    if (!isOpen) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setSegments(['', '', '', '']);
      setTimeout(() => inputRefs[0].current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const limited = upper.slice(0, 4);

    const next = [...segments] as [string, string, string, string];
    next[index] = limited;
    setSegments(next);

    if (limited.length === 4 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && segments[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const raw = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const next: [string, string, string, string] = [
      raw.slice(0, 4),
      raw.slice(4, 8),
      raw.slice(8, 12),
      raw.slice(12, 16),
    ];
    setSegments(next);
    const filledCount = next.filter(s => s.length === 4).length;
    const focusIndex = Math.min(filledCount, 3);
    inputRefs[focusIndex].current?.focus();
  };

  const isFilled = segments.every(s => s.length === 4);
  const token = segments.join('-');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-6 w-full max-w-md mx-2 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">トークンを入力</h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-2xl text-gray-500 hover:text-gray-700 disabled:text-gray-300 transition"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            16文字のトークンを入力してください
          </p>
          <div className="flex items-center justify-center gap-2">
            {segments.map((seg, i) => (
              <React.Fragment key={i}>
                <input
                  ref={inputRefs[i]}
                  type="text"
                  value={seg}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  maxLength={4}
                  disabled={isSubmitting}
                  className="w-16 h-12 text-center text-lg font-mono font-semibold tracking-widest rounded-xl border-2 border-gray-300 focus:border-[#FF69B4] focus:outline-none bg-white/80 text-gray-800 uppercase disabled:bg-gray-100 disabled:text-gray-400 transition"
                  style={{ letterSpacing: '0.15em' }}
                />
                {i < 3 && (
                  <span className="text-gray-400 font-bold text-xl select-none">-</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {isFilled && (
            <p className="text-xs text-center text-gray-400 mt-2">{token}</p>
          )}
        </div>

        <div className="flex gap-3 justify-center mt-2">
          <button
            type="button"
            onClick={() => onConfirm(segments.join(''))}
            disabled={!isFilled || isSubmitting}
            className="rounded-full px-6 py-2 font-semibold shadow transition bg-[#FF69B4] text-white hover:brightness-105 disabled:bg-gray-400"
          >
            {isSubmitting ? t('submitting') : '確認'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenInputModal;
