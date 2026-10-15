import React, { useState, useEffect } from 'react';
import { MessageCircle, Copy, Check, ExternalLink, X, AlertTriangle, Sparkles } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafeConfig';
import { buildWhatsAppUrl } from '../utils/cafeLogic';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  customMessage,
}) => {
  const [message, setMessage] = useState(customMessage || CAFE_CONFIG.whatsapp.defaultMessage);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (customMessage) {
      setMessage(customMessage);
    } else {
      setMessage(CAFE_CONFIG.whatsapp.defaultMessage);
    }
  }, [customMessage, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { url, isPlaceholder } = buildWhatsAppUrl(CAFE_CONFIG.whatsapp.phoneNumber, message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="WhatsApp Enquiry Dialog"
    >
      <div
        className="bg-[#FAF6F0] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD5] relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E8DFD5] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7E8B76] text-white flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#281C15]">
                WhatsApp Enquiry
              </h3>
              <p className="text-xs text-[#7E8B76] font-medium">
                Concept Demo Contact Action
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A7D73] hover:text-[#281C15] hover:bg-[#E8DFD5] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Placeholder Warning Notice */}
        <div className="mb-5 p-4 rounded-xl bg-[#E8DFD5] border border-[#D8CCC0] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
          <div className="text-xs text-[#503A2D] leading-relaxed">
            <strong className="font-semibold block text-[#281C15] mb-0.5">
              Unconfigured Demo Placeholder (+91 00000 00000)
            </strong>
            This website is an illustrative portfolio concept created by <strong>Weblith Studio</strong>. The WhatsApp number is intentionally configured as a dummy placeholder so you do not reach unintended personal recipients.
          </div>
        </div>

        {/* Message Preview & Editor */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#503A2D] uppercase tracking-wider mb-2">
            Prefilled Message Preview:
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-[#D8CCC0] text-sm text-[#281C15] focus:outline-none focus:ring-2 focus:ring-[#7E8B76] resize-none shadow-inner"
          />

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[11px] text-[#8A7D73]">Presets:</span>
            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Hello Slow Mornings Cafe! I'd like to check table availability for this weekend."
                )
              }
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#EFE8DF] hover:bg-[#E0D5C9] text-[#503A2D] transition-colors"
            >
              Table Booking
            </button>
            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Hi! Are your sourdough morning croissants baked fresh daily on-site?"
                )
              }
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#EFE8DF] hover:bg-[#E0D5C9] text-[#503A2D] transition-colors"
            >
              Bakery Query
            </button>
          </div>
        </div>

        {/* Actions: Copy vs Open Link */}
        <div className="space-y-3 pt-2 border-t border-[#E8DFD5]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FAF6F0] hover:bg-[#E8DFD5] border border-[#D8CCC0] text-xs font-semibold text-[#281C15] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#7E8B76]" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#7E8B76] hover:bg-[#687660] text-white text-xs font-semibold shadow transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-[#8A7D73] leading-normal">
            To configure a live number for your business, edit the single setting in <code className="bg-[#E8DFD5] px-1 py-0.5 rounded text-[#281C15]">src/config/cafeConfig.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
