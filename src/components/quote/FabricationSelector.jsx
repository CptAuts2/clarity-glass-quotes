import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const fabricationOptions = [
  {
    id: 'hole',
    name: 'Hole',
    description: 'Drilled holes for handles or hardware',
    pricePerUnit: 15,
    icon: '◉',
    gradient: 'from-slate-100 to-gray-200'
  },
  {
    id: 'hinge_notch',
    name: 'Hinge Notch',
    description: 'Cut-outs for hinge installation',
    pricePerUnit: 25,
    icon: '⌐',
    gradient: 'from-sky-50 to-blue-100'
  },
  {
    id: 'corner_notch',
    name: 'Corner Notch',
    description: 'L-shaped corner cut-outs',
    pricePerUnit: 20,
    icon: '⌙',
    gradient: 'from-amber-50 to-orange-100'
  },
  {
    id: 'custom_pattern',
    name: 'Custom Pattern',
    description: 'Custom shapes and patterns',
    pricePerUnit: 50,
    icon: '✦',
    gradient: 'from-violet-50 to-purple-100'
  },
  {
    id: 'out_of_square',
    name: 'Out of Square',
    description: 'Non-rectangular shapes',
    pricePerUnit: 30,
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
      onSelect([...selected, option]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fabricationOptions.map((option, index) => {
        const isSelected = selected.some(s => s.id === option.id);
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
          </motion.div>
        );
      })}
    </div>
  );
}

export { fabricationOptions };