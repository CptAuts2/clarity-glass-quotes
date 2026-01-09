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
    description: 'Drilled holes for handles or hardware',
    pricePerUnit: fabricationPricing.hole.price,
    icon: '◉',
    gradient: 'from-slate-100 to-gray-200'
  },
  {
    id: 'hinge_notch',
    name: 'Hinge Notch',
    description: 'Cut-outs for hinge installation',
    pricePerUnit: fabricationPricing.hinge_notch.price,
    icon: '⌐',
    gradient: 'from-sky-50 to-blue-100'
  },
  {
    id: 'corner_notch',
    name: 'Corner Notch',
    description: 'L-shaped corner cut-outs',
    pricePerUnit: fabricationPricing.corner_notch.price,
    icon: '⌙',
    gradient: 'from-amber-50 to-orange-100'
  },
  {
    id: 'custom_pattern',
    name: 'Custom Pattern',
    description: 'Custom shapes and patterns',
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
    gradient: 'from-emerald-50 to-green-100'
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

  const needsQuantity = (id) => id === 'hole' || id === 'hinge_notch';

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
              ${option.pricePerUnit}/each
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