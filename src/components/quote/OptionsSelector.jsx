import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { edgePricing } from './pricingData';

const edgeFinishes = [
  { value: 'seamed', label: 'Seamed Edge', price: 0, description: 'Basic safety edge' },
  { value: 'flat_polished', label: 'Flat Polished', price: 0.12, description: 'Smooth, shiny finish' },
  { value: 'pencil', label: 'Pencil Polish', price: 0.25, description: 'Rounded, elegant look' },
  { value: 'miter_edge', label: 'Miter Edge', price: 0.45, description: 'Angled edge mitering' },
  { value: 'bevel_edge_1_25', label: 'Bevel Edge - 1-1/4"', price: 0.58, description: '1.25 inch beveled edge' },
  { value: 'bevel_edge_1_5', label: 'Bevel Edge - 1-1/2"', price: 0.75, description: '1.5 inch beveled edge' }
];

export default function OptionsSelector({ options, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...options, [field]: value });
  };

  const selectedEdge = edgeFinishes.find(e => e.value === options.edgeFinish) || edgeFinishes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Edge Finish */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <Label className="flex items-center gap-2 text-slate-700 text-base">
          <Scissors className="w-4 h-4 text-[#1e3a5f]" />
          Edge Finish
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {edgeFinishes.map((edge) => (
            <motion.button
              key={edge.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChange('edgeFinish', edge.value)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                options.edgeFinish === edge.value
                  ? "border-[#1e3a5f] bg-[#e8f4fc]"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <p className="font-medium text-slate-800 text-sm">{edge.label}</p>
              <p className="text-xs text-slate-500 mt-1">{edge.description}</p>
              {edge.price > 0 && (
                <p className="text-xs text-[#1e3a5f] mt-2">+${edge.price.toFixed(2)}/ln ft</p>
              )}
            </motion.button>
          ))}
        </div>
      </div>


    </motion.div>
  );
}

export { edgeFinishes };