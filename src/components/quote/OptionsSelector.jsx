import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Truck, Wrench, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

const edgeFinishes = [
  { value: 'seamed', label: 'Seamed Edge', description: 'Basic safety edge', price: 0 },
  { value: 'flat_polished', label: 'Flat Polished', description: 'Smooth, shiny finish', price: 3 },
  { value: 'pencil', label: 'Pencil Edge', description: 'Rounded, elegant look', price: 4 },
  { value: 'beveled', label: 'Beveled Edge', description: 'Angled, premium finish', price: 6 }
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
                <p className="text-xs text-[#1e3a5f] mt-2">+${edge.price}/ln ft</p>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Installation */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            "bg-white rounded-2xl border-2 p-6 transition-all cursor-pointer",
            options.installation
              ? "border-[#1e3a5f] bg-gradient-to-br from-white to-[#e8f4fc]"
              : "border-slate-200"
          )}
          onClick={() => handleChange('installation', !options.installation)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                options.installation ? "bg-[#1e3a5f]" : "bg-slate-100"
              )}>
                <Wrench className={cn(
                  "w-6 h-6",
                  options.installation ? "text-white" : "text-slate-400"
                )} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Professional Installation</h3>
                <p className="text-sm text-slate-500 mt-1">Expert installation by certified technicians</p>
                <p className="text-[#1e3a5f] font-medium mt-2">+$85 flat rate</p>
              </div>
            </div>
            <Switch
              checked={options.installation}
              onCheckedChange={(checked) => handleChange('installation', checked)}
            />
          </div>
        </motion.div>

        {/* Delivery */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            "bg-white rounded-2xl border-2 p-6 transition-all cursor-pointer",
            options.delivery
              ? "border-[#1e3a5f] bg-gradient-to-br from-white to-[#e8f4fc]"
              : "border-slate-200"
          )}
          onClick={() => handleChange('delivery', !options.delivery)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                options.delivery ? "bg-[#1e3a5f]" : "bg-slate-100"
              )}>
                <Truck className={cn(
                  "w-6 h-6",
                  options.delivery ? "text-white" : "text-slate-400"
                )} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Delivery Service</h3>
                <p className="text-sm text-slate-500 mt-1">Safe delivery to your location</p>
                <p className="text-[#1e3a5f] font-medium mt-2">+$45 flat rate</p>
              </div>
            </div>
            <Switch
              checked={options.delivery}
              onCheckedChange={(checked) => handleChange('delivery', checked)}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export { edgeFinishes };