import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Coffee, MessageCircle } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { formatINR } from '../utils/cafeLogic';

interface CoffeeRitualFinderProps {
  onSelectRecommendedItem: (item: MenuItem) => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const CoffeeRitualFinder: React.FC<CoffeeRitualFinderProps> = ({
  onSelectRecommendedItem,
  onOpenWhatsApp,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mood, setMood] = useState<string>('');
  const [prepPreference, setPrepPreference] = useState<string>('');
  const [recommendation, setRecommendation] = useState<MenuItem | null>(null);

  const moods = [
    { id: 'quiet', label: 'Quiet & Contemplative', desc: 'Slow, lingering sipping' },
    { id: 'focus', label: 'Deep Focus & Clarity', desc: 'Clean, bold notes' },
    { id: 'comfort', label: 'Cozy Morning Hug', desc: 'Warm, soothing sweetness' },
    { id: 'refresh', label: 'Crisp & Uplifting', desc: 'Cooling, energetic boost' },
  ];

  const preferences = [
    { id: 'black', label: 'Black & Nuanced', desc: 'Single-origin espresso or pure leaf' },
    { id: 'milky', label: 'Silky Textured Milk', desc: 'Micro-foamed latte or cappuccino' },
    { id: 'iced', label: 'Chilled & Refreshing', desc: 'Over ice spheres or blended' },
    { id: 'spiced', label: 'Traditional & Spiced', desc: 'Slow-simmered aromatic notes' },
  ];

  const handleCalculateRecommendation = (selectedPref: string) => {
    setPrepPreference(selectedPref);

    let matchId = 'cappuccino';
    if (selectedPref === 'black') {
      matchId = mood === 'focus' ? 'espresso' : 'americano';
    } else if (selectedPref === 'milky') {
      matchId = mood === 'comfort' ? 'mocha' : 'cafe-latte';
    } else if (selectedPref === 'iced') {
      matchId = mood === 'comfort' ? 'cold-coffee' : 'iced-latte';
    } else if (selectedPref === 'spiced') {
      matchId = 'masala-chai';
    }

    const found = MENU_ITEMS.find((item) => item.id === matchId) || MENU_ITEMS[2];
    setRecommendation(found);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setMood('');
    setPrepPreference('');
    setRecommendation(null);
  };

  return (
    <section className="py-16 bg-[#FAF6F0] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#E8DFD5] shadow-lg relative overflow-hidden">
          
          <div className="relative z-10">
            {/* Widget Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DFD5] text-xs font-semibold uppercase tracking-wider text-[#7E8B76] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Morning Ritual Guide</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#281C15]">
                Find Your Perfect Slow Brew
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6259] mt-2">
                Answer two gentle questions and let our baristas suggest the brew tailored to your morning state of mind.
              </p>
            </div>

            {/* Step 1: Mood */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-xs font-bold uppercase tracking-widest text-[#503A2D] text-center mb-4">
                  Step 1 of 2: What is your morning rhythm today?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setMood(m.id);
                        setStep(2);
                      }}
                      className="p-4 rounded-2xl bg-white border border-[#E8DFD5] text-left hover:border-[#7E8B76] hover:bg-[#FAF6F0] transition-all shadow-sm group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7E8B76]"
                    >
                      <span className="font-serif text-base font-semibold text-[#281C15] group-hover:text-[#503A2D] block">
                        {m.label}
                      </span>
                      <span className="text-xs text-[#8A7D73] mt-0.5 block">
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Preference */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between max-w-2xl mx-auto mb-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#7E8B76] hover:underline font-medium cursor-pointer"
                  >
                    ← Back to mood
                  </button>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#503A2D]">
                    Step 2 of 2: How do you prefer your cup?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {preferences.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleCalculateRecommendation(p.id)}
                      className="p-4 rounded-2xl bg-white border border-[#E8DFD5] text-left hover:border-[#7E8B76] hover:bg-[#FAF6F0] transition-all shadow-sm group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7E8B76]"
                    >
                      <span className="font-serif text-base font-semibold text-[#281C15] group-hover:text-[#503A2D] block">
                        {p.label}
                      </span>
                      <span className="text-xs text-[#8A7D73] mt-0.5 block">
                        {p.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Result */}
            {step === 3 && recommendation && (
              <div className="animate-fadeIn max-w-xl mx-auto bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-[#E8DFD5]">
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7E8B76] block mb-1">
                      Your Morning Match
                    </span>
                    <div className="flex items-center justify-center sm:justify-between gap-2">
                      <h4 className="font-serif text-2xl font-bold text-[#281C15]">
                        {recommendation.name}
                      </h4>
                      <span className="font-bold text-base text-[#281C15]">
                        {formatINR(recommendation.price)}
                      </span>
                    </div>

                    <p className="text-xs text-[#6E6259] mt-2 leading-relaxed">
                      {recommendation.description}
                    </p>

                    {recommendation.tastingNotes && (
                      <p className="text-[11px] text-[#7E8B76] italic mt-2">
                        Notes: {recommendation.tastingNotes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8A7D73] hover:text-[#281C15] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try another match</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenWhatsApp(
                          `Hello Slow Mornings Cafe! I tried your Morning Ritual Guide and got matched with ${recommendation.name} (${formatINR(
                            recommendation.price
                          )}). I'd love to try it when visiting!`
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E8B76] hover:bg-[#687660] text-white text-xs font-semibold shadow transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
