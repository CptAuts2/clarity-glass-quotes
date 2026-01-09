import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassTypeCard, { glassTypes } from '@/components/quote/GlassTypeCard';
import DimensionInput, { thicknessOptions } from '@/components/quote/DimensionInput';
import OptionsSelector, { edgeFinishes } from '@/components/quote/OptionsSelector';
import QuoteSummary from '@/components/quote/QuoteSummary';

export default function Home() {
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    thickness: '1/4"',
    quantity: 1
  });
  const [options, setOptions] = useState({
    edgeFinish: 'seamed'
  });

  const pricing = useMemo(() => {
    if (!selectedGlass || !dimensions.width || !dimensions.height) {
      return { total: 0, subtotal: 0, glassPrice: 0, edgePrice: 0, thicknessUpcharge: 0, sqFt: 0 };
    }

    const sqFt = (dimensions.width * dimensions.height) / 144;
    const quantity = dimensions.quantity || 1;
    const totalSqFt = sqFt * quantity;

    // Base glass price
    const glassPrice = totalSqFt * selectedGlass.pricePerSqFt;

    // Thickness multiplier
    const thicknessOpt = thicknessOptions.find(t => t.value === dimensions.thickness);
    const thicknessMultiplier = thicknessOpt?.multiplier || 1;
    const thicknessUpcharge = glassPrice * (thicknessMultiplier - 1);

    // Edge finish price (per linear foot)
    const edgeOpt = edgeFinishes.find(e => e.value === options.edgeFinish);
    const perimeter = 2 * (dimensions.width + dimensions.height) / 12; // convert to feet
    const edgePrice = (edgeOpt?.price || 0) * perimeter * quantity;

    // Subtotal
    const subtotal = glassPrice + thicknessUpcharge + edgePrice;

    const total = subtotal;

    return {
      total,
      subtotal,
      glassPrice,
      thicknessUpcharge,
      edgePrice,
      sqFt: (totalSqFt).toFixed(2)
    };
  }, [selectedGlass, dimensions, options]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/5 to-transparent" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600">Instant Pricing Available</span>
            </div>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696079d1047918ddfc8fbb16/899316b24_ClarityLogo_Vector_compressedfordocsv2_noglass.jpg" 
              alt="Clarity Glass Wholesalers" 
              className="h-24 md:h-32 object-contain mx-auto"
            />
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Follow the steps below for an instant quote. For further assistance, contact our office at{' '}
              <a href="tel:713-849-2300" className="text-[#1e3a5f] font-medium hover:underline">713-849-2300</a> or at{' '}
              <a href="mailto:info@clarityhouston.com" className="text-[#1e3a5f] font-medium hover:underline">info@clarityhouston.com</a>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Glass Type */}
            <section>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-8 h-8 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <h2 className="text-xl font-semibold text-slate-800">Choose Your Glass Type</h2>
              </motion.div>
              <GlassTypeCard selected={selectedGlass} onSelect={setSelectedGlass} />
            </section>

            {/* Step 2: Dimensions */}
            <section>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-8 h-8 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <h2 className="text-xl font-semibold text-slate-800">Enter Dimensions</h2>
              </motion.div>
              <DimensionInput dimensions={dimensions} onChange={setDimensions} />
            </section>

            {/* Step 3: Options */}
            <section>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-8 h-8 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <h2 className="text-xl font-semibold text-slate-800">Edgework</h2>
              </motion.div>
              <OptionsSelector options={options} onChange={setOptions} />
            </section>
          </div>

          {/* Quote Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <QuoteSummary
                glassType={selectedGlass}
                dimensions={dimensions}
                options={options}
                pricing={pricing}
              />

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 grid grid-cols-3 gap-3"
              >
                {[
                  { icon: '🛡️', label: 'Quality Guaranteed' },
                  { icon: '⚡', label: 'Fast Turnaround' },
                  { icon: '🏆', label: '15+ Years Exp.' }
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-slate-100"
                  >
                    <span className="text-xl">{badge.icon}</span>
                    <p className="text-xs text-slate-500 mt-1">{badge.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">
            © 2024 Clarity Glass Wholesalers. All prices are estimates and may vary based on final specifications.
          </p>
        </div>
      </footer>
    </div>
  );
}