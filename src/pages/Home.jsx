import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import GlassTypeCard, { glassTypes } from '@/components/quote/GlassTypeCard';
import DimensionInput, { thicknessOptions } from '@/components/quote/DimensionInput';
import OptionsSelector, { edgeFinishes } from '@/components/quote/OptionsSelector';
import FabricationSelector, { fabricationOptions } from '@/components/quote/FabricationSelector';
import QuoteSummary from '@/components/quote/QuoteSummary';
import QuoteItemsList from '@/components/quote/QuoteItemsList';
import { glassPricing, edgePricing, fabricationPricing, ENERGY_SURCHARGE, MINIMUM_SQ_FT, OVERSIZE_THRESHOLD, OVERSIZE_CHARGE } from '@/components/quote/pricingData';

export default function Home() {
  const [quoteItems, setQuoteItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [glassStrength, setGlassStrength] = useState('');
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    thickness: '1/4"',
    quantity: 1
  });
  const [options, setOptions] = useState({
    edgeFinish: 'seamed'
  });
  const [fabrications, setFabrications] = useState([]);
  const [drawings, setDrawings] = useState([]);

  const calculateItemPrice = (item) => {
    if (!item.glassType || !item.dimensions.width || !item.dimensions.height || !item.glassStrength) {
      return { total: 0, subtotal: 0, glassPrice: 0, edgePrice: 0, fabricationPrice: 0, energySurcharge: 0, oversizeCharge: 0, sqFt: 0 };
    }

    const sqFt = (item.dimensions.width * item.dimensions.height) / 144;
    const quantity = item.dimensions.quantity || 1;
    let billableSqFt = Math.max(sqFt, MINIMUM_SQ_FT);
    const totalSqFt = billableSqFt * quantity;

    const glassData = glassPricing[item.glassType.id];
    const thicknessPrice = glassData?.prices[item.dimensions.thickness];
    const pricePerSqFt = thicknessPrice?.[item.glassStrength] || 0;
    const glassPrice = totalSqFt * pricePerSqFt;

    const edgeData = edgePricing[item.options.edgeFinish];
    const perimeter = 2 * (item.dimensions.width + item.dimensions.height) / 12;
    const edgePrice = (edgeData?.price || 0) * perimeter * quantity;

    const fabricationPrice = item.fabrications.reduce((sum, fab) => {
      const fabData = fabricationPricing[fab.id];
      return sum + (fabData?.price || 0) * quantity;
    }, 0);

    const subtotal = glassPrice + edgePrice + fabricationPrice;
    const energySurcharge = subtotal * ENERGY_SURCHARGE;
    const oversizeCharge = sqFt >= OVERSIZE_THRESHOLD ? subtotal * OVERSIZE_CHARGE : 0;
    const total = subtotal + energySurcharge + oversizeCharge;

    return { total, subtotal, glassPrice, edgePrice, fabricationPrice, energySurcharge, oversizeCharge, sqFt: totalSqFt.toFixed(2), pricePerSqFt };
  };

  const pricing = useMemo(() => {
    const items = quoteItems.map(item => calculateItemPrice(item));
    const total = items.reduce((sum, item) => sum + item.total, 0);
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    return { total, subtotal, items };
  }, [quoteItems]);

  const currentItemValid = selectedGlass && dimensions.width && dimensions.height && glassStrength;

  const addToQuote = () => {
    if (!currentItemValid) return;
    
    const newItem = {
      glassType: selectedGlass,
      glassStrength,
      dimensions: { ...dimensions },
      options: { ...options },
      fabrications: [...fabrications]
    };

    if (editingIndex !== null) {
      const updated = [...quoteItems];
      updated[editingIndex] = newItem;
      setQuoteItems(updated);
      setEditingIndex(null);
    } else {
      setQuoteItems([...quoteItems, newItem]);
    }

    // Reset form
    setSelectedGlass(null);
    setGlassStrength('');
    setDimensions({ width: '', height: '', thickness: '1/4"', quantity: 1 });
    setOptions({ edgeFinish: 'seamed' });
    setFabrications([]);
  };

  const removeItem = (index) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    const item = quoteItems[index];
    setSelectedGlass(item.glassType);
    setGlassStrength(item.glassStrength);
    setDimensions(item.dimensions);
    setOptions(item.options);
    setFabrications(item.fabrications);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            {/* Quote Items List */}
            {quoteItems.length > 0 && (
              <QuoteItemsList 
                items={quoteItems}
                onRemove={removeItem}
                onEdit={editItem}
                pricing={pricing}
              />
            )}
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

                {/* Tempered or Annealed Selection */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 mt-6"
                >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-500 text-lg">*</span>
                  <h3 className="font-semibold text-slate-800">Glass Strength (Required)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGlassStrength('tempered')}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      glassStrength === 'tempered'
                        ? "border-[#1e3a5f] bg-[#e8f4fc]"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <p className="font-semibold text-slate-800">Tempered</p>
                    <p className="text-sm text-slate-500 mt-1">Heat-treated for safety</p>
                  </button>
                  <button
                    onClick={() => setGlassStrength('annealed')}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      glassStrength === 'annealed'
                        ? "border-[#1e3a5f] bg-[#e8f4fc]"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <p className="font-semibold text-slate-800">Annealed</p>
                    <p className="text-sm text-slate-500 mt-1">Standard glass</p>
                  </button>
                </div>
                </motion.div>
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

                {/* Step 4: Fabrication */}
                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <span className="w-8 h-8 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                      4
                    </span>
                    <h2 className="text-xl font-semibold text-slate-800">Fabrication</h2>
                  </motion.div>
                  <FabricationSelector selected={fabrications} onSelect={setFabrications} />
                </section>

                {/* Step 5: Submit Drawing */}
                <section>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <span className="w-8 h-8 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                      5
                    </span>
                    <h2 className="text-xl font-semibold text-slate-800">Submit Drawing</h2>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6"
                  >
                    <p className="text-sm text-slate-500 mb-4">
                      Upload technical drawings, sketches, or reference images (optional)
                    </p>
                    
                    <div className="space-y-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        <span className="text-sm text-slate-600">Click to upload files</span>
                        <span className="text-xs text-slate-400 mt-1">PDF, PNG, JPG (max 10MB)</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          multiple
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            for (const file of files) {
                              try {
                                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                                setDrawings(prev => [...prev, { name: file.name, url: file_url }]);
                              } catch (error) {
                                console.error('Upload failed:', error);
                              }
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>

                      {drawings.length > 0 && (
                        <div className="space-y-2">
                          {drawings.map((drawing, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-slate-50 rounded-lg p-3"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#1e3a5f]" />
                                <span className="text-sm text-slate-700">{drawing.name}</span>
                              </div>
                              <button
                                onClick={() => setDrawings(prev => prev.filter((_, i) => i !== index))}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </section>

                {/* Add to Quote Button */}
                <section>
                  <Button
                    onClick={addToQuote}
                    disabled={!currentItemValid}
                    className="w-full h-14 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white rounded-xl font-semibold text-lg"
                  >
                    {editingIndex !== null ? 'Update Item' : 'Add to Quote'}
                  </Button>
                  {editingIndex !== null && (
                    <Button
                      onClick={() => {
                        setEditingIndex(null);
                        setSelectedGlass(null);
                        setGlassStrength('');
                        setDimensions({ width: '', height: '', thickness: '1/4"', quantity: 1 });
                        setOptions({ edgeFinish: 'seamed' });
                        setFabrications([]);
                      }}
                      variant="outline"
                      className="w-full mt-2"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </section>
                </div>

                {/* Quote Summary - Sticky Sidebar */}
                <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8">
                <QuoteSummary
                quoteItems={quoteItems}
                pricing={pricing}
                drawings={drawings}
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