import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fabricationPricing } from './pricingData';

const fabricationOptions = [
  {
    id: 'hole',
    name: 'Hole',
    description: 'Drilled holes for hardware',
    pricePerUnit: fabricationPricing.hole.price,
    icon: '◉',
    gradient: 'from-slate-100 to-gray-200'
  },
  {
    id: 'hinge_notch',
    name: 'Hinge Notch',
    description: 'Cut-outs for hinges',
    pricePerUnit: fabricationPricing.hinge_notch.price,
    icon: '⌐',
    gradient: 'from-sky-50 to-blue-100'
  },
  {
    id: 'corner_notch',
    name: 'Corner Notch',
    description: 'L-shaped corner cuts',
    pricePerUnit: fabricationPricing.corner_notch.price,
    icon: '⌙',
    gradient: 'from-amber-50 to-orange-100'
  },
  {
    id: 'u_notch',
    name: 'U Notch',
    description: 'U-shaped notch cuts',
    pricePerUnit: fabricationPricing.u_notch.price,
    icon: '⊔',
    gradient: 'from-indigo-50 to-blue-100'
  },
  {
    id: 'clipped_corner',
    name: 'Clipped Corner',
    description: 'Angled corner clips',
    pricePerUnit: fabricationPricing.clipped_corner.price,
    icon: '◸',
    gradient: 'from-rose-50 to-pink-100'
  },
  {
    id: 'custom_countersink',
    name: 'Custom Countersink',
    description: 'Recessed hole finishing',
    pricePerUnit: fabricationPricing.custom_countersink.price,
    icon: '⊙',
    gradient: 'from-teal-50 to-cyan-100'
  },
  {
    id: 'polished_edge',
    name: 'Polished Edge',
    description: 'Smooth polished edges',
    pricePerUnit: fabricationPricing.polished_edge.price,
    priceType: 'perLinearFoot',
    icon: '▬',
    gradient: 'from-blue-50 to-indigo-100'
  },
  {
    id: 'shape_polish',
    name: 'Shape Polish',
    description: 'Custom shape polishing',
    pricePerUnit: fabricationPricing.shape_polish.price,
    priceType: 'perLinearFoot',
    icon: '◇',
    gradient: 'from-purple-50 to-violet-100'
  },
  {
    id: 'miter_edge',
    name: 'Miter Edge',
    description: 'Angled edge mitering',
    pricePerUnit: fabricationPricing.miter_edge.price,
    priceType: 'perLinearFoot',
    icon: '◢',
    gradient: 'from-orange-50 to-amber-100'
  },
  {
    id: 'bevel_edge_1',
    name: 'Bevel Edge - 1"',
    description: '1 inch beveled edge',
    pricePerUnit: fabricationPricing.bevel_edge_1.price,
    priceType: 'perLinearFoot',
    icon: '◣',
    gradient: 'from-emerald-50 to-green-100'
  },
  {
    id: 'bevel_edge_1_25',
    name: 'Bevel Edge - 1-1/4"',
    description: '1.25 inch beveled edge',
    pricePerUnit: fabricationPricing.bevel_edge_1_25.price,
    priceType: 'perLinearFoot',
    icon: '◤',
    gradient: 'from-lime-50 to-emerald-100'
  },
  {
    id: 'bevel_edge_1_5',
    name: 'Bevel Edge - 1-1/2"',
    description: '1.5 inch beveled edge',
    pricePerUnit: fabricationPricing.bevel_edge_1_5.price,
    priceType: 'perLinearFoot',
    icon: '◥',
    gradient: 'from-green-50 to-teal-100'
  },
  {
    id: 'radius_edge',
    name: 'Radius Edge',
    description: 'Rounded edge finish',
    pricePerUnit: fabricationPricing.radius_edge.price,
    icon: '◜',
    gradient: 'from-cyan-50 to-sky-100'
  },
  {
    id: 'interior_cut_small',
    name: 'Interior Cut (Small)',
    description: 'Small interior cutout',
    pricePerUnit: fabricationPricing.interior_cut_small.price,
    icon: '◻',
    gradient: 'from-fuchsia-50 to-purple-100'
  },
  {
    id: 'interior_cut_large',
    name: 'Interior Cut (Large)',
    description: 'Large interior cutout',
    pricePerUnit: fabricationPricing.interior_cut_large.price,
    icon: '◼',
    gradient: 'from-pink-50 to-rose-100'
  },
  {
    id: 'custom_pattern',
    name: 'Custom Pattern',
    description: 'Custom shapes & patterns',
    pricePerUnit: fabricationPricing.custom_pattern.price,
    icon: '✦',
    gradient: 'from-violet-50 to-purple-100'
  },
  {
    id: 'out_of_square',
    name: 'Out of Square',
    description: 'Non-rectangular shapes',
    pricePerUnit: fabricationPricing.out_of_square.price,
    icon: '⬡',
    gradient: 'from-slate-50 to-gray-100'
  }
];

export default function FabricationSelector({ selected = [], onSelect }) {
  const handleToggle = (option) => {
    const isSelected = selected.some(s => s.id === option.id);
    if (isSelected) {
      onSelect(selected.filter(s => s.id !== option.id));
    } else {
      onSelect([...selected, { ...option, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta, e) => {
    e.stopPropagation();
    const updated = selected.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    onSelect(updated);
  };

  const needsQuantity = (id) => ['hole', 'hinge_notch', 'corner_notch', 'u_notch', 'clipped_corner', 'custom_countersink'].includes(id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fabricationOptions.map((option, index) => {
        const selectedItem = selected.find(s => s.id === option.id);
        const isSelected = !!selectedItem;
        const quantity = selectedItem?.quantity || 1;
        
        return (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => handleToggle(option)}
            className={cn(
              "relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02]",
              isSelected
                ? "border-[#1e3a5f] bg-gradient-to-br shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
            
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4",
              `bg-gradient-to-br ${option.gradient}`
            )}>
              {option.icon}
            </div>
            
            <h3 className="font-semibold text-lg text-slate-800 mb-1">
              {option.name}
            </h3>
            <p className="text-sm text-slate-500 mb-3">
              {option.description}
            </p>
            <p className="text-[#1e3a5f] font-medium">
              {option.pricePerUnit > 0 ? (
                option.priceType === 'perLinearFoot' ? `$${option.pricePerUnit}/ln ft` : `$${option.pricePerUnit}/each`
              ) : 'No charge'}
            </p>

            {isSelected && needsQuantity(option.id) && (
              <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={(e) => updateQuantity(option.id, -1, e)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-semibold text-slate-700 min-w-[3ch] text-center">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={(e) => updateQuantity(option.id, 1, e)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export { fabricationOptions };