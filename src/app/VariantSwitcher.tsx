import { useState } from 'react';
import App from './App'; // Original cosmic purple
import AppVariant1 from './AppVariant1'; // Minimalist green
import AppVariant2 from './AppVariant2'; // Warm sunset orange
import AppVariant3 from './AppVariant3'; // Cool ocean blue

export default function VariantSwitcher() {
  const [currentVariant, setCurrentVariant] = useState(0);

  const variants = [
    { name: 'Cosmic Purple (Original)', component: App },
    { name: 'Minimalist Green Tech', component: AppVariant1 },
    { name: 'Warm Sunset Orange', component: AppVariant2 },
    { name: 'Cool Ocean Blue', component: AppVariant3 }
  ];

  const CurrentComponent = variants[currentVariant].component;

  return (
    <>
      {/* Floating Variant Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl p-4 border border-slate-200">
          <p className="text-xs text-slate-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Style Variants:</p>
          <div className="flex flex-col gap-2">
            {variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setCurrentVariant(index)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  currentVariant === index
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Current Variant */}
      <CurrentComponent />
    </>
  );
}
