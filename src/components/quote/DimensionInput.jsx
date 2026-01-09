import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, Maximize2, Layers, Hash } from 'lucide-react';

const thicknessOptions = [
  { value: '1/8"', label: '1/8" (3mm)', multiplier: 0.7 },
  { value: '3/16"', label: '3/16" (5mm)', multiplier: 0.85 },
  { value: '1/4"', label: '1/4" (6mm)', multiplier: 1 },
  { value: '3/8"', label: '3/8" (10mm)', multiplier: 1.3 },
  { value: '1/2"', label: '1/2" (12mm)', multiplier: 1.6 },
  { value: '5/8"', label: '5/8" (16mm)', multiplier: 1.9 },
  { value: '3/4"', label: '3/4" (19mm)', multiplier: 2.2 }
];

export default function DimensionInput({ dimensions, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...dimensions, [field]: value });
  };

  const sqFt = dimensions.width && dimensions.height 
    ? ((dimensions.width * dimensions.height) / 144).toFixed(2)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Width */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-700">
            <Ruler className="w-4 h-4 text-[#1e3a5f]" />
            Width (inches)
          </Label>
          <Input
            type="number"
            placeholder="Enter width"
            value={dimensions.width || ''}
            onChange={(e) => handleChange('width', parseFloat(e.target.value) || 0)}
            className="h-12 text-lg border-slate-200 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]/20"
          />
        </div>

        {/* Height */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-700">
            <Maximize2 className="w-4 h-4 text-[#1e3a5f]" />
            Height (inches)
          </Label>
          <Input
            type="number"
            placeholder="Enter height"
            value={dimensions.height || ''}
            onChange={(e) => handleChange('height', parseFloat(e.target.value) || 0)}
            className="h-12 text-lg border-slate-200 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]/20"
          />
        </div>

        {/* Thickness */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-700">
            <Layers className="w-4 h-4 text-[#1e3a5f]" />
            Thickness
          </Label>
          <Select
            value={dimensions.thickness}
            onValueChange={(value) => handleChange('thickness', value)}
          >
            <SelectTrigger className="h-12 text-lg border-slate-200">
              <SelectValue placeholder="Select thickness" />
            </SelectTrigger>
            <SelectContent>
              {thicknessOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-slate-700">
            <Hash className="w-4 h-4 text-[#1e3a5f]" />
            Quantity
          </Label>
          <Input
            type="number"
            min="1"
            placeholder="1"
            value={dimensions.quantity || 1}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
            className="h-12 text-lg border-slate-200 focus:border-[#1e3a5f] focus:ring-[#1e3a5f]/20"
          />
        </div>
      </div>

      {/* Square Footage Display */}
      {sqFt > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-[#e8f4fc] to-sky-50 rounded-xl p-4 flex items-center justify-between"
        >
          <span className="text-slate-600">Total Area per piece</span>
          <span className="text-xl font-semibold text-[#1e3a5f]">{sqFt} sq ft</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export { thicknessOptions };