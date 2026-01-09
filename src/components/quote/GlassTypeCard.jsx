import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const glassTypes = [
  {
    id: 'clear_tempered',
    name: 'Clear Glass',
    description: 'Strong, safety glass ideal for doors & windows',
    pricePerSqFt: 12,
    icon: '◇',
    gradient: 'from-sky-50 to-blue-100'
  },
  {
    id: 'frosted',
    name: 'Frosted Glass',
    description: 'Elegant privacy with diffused light',
    pricePerSqFt: 15,
    icon: '◈',
    gradient: 'from-slate-100 to-gray-200'
  },
  {
    id: 'tinted',
    name: 'Tinted Glass',
    description: 'Reduce glare & UV with sophisticated color',
    pricePerSqFt: 14,
    icon: '◆',
    gradient: 'from-amber-50 to-orange-100'
  },
  {
    id: 'laminated',
    name: 'Laminated Glass',
    description: 'Maximum safety with sound reduction',
    pricePerSqFt: 22,
    icon: '▣',
    gradient: 'from-violet-50 to-purple-100'
  },
  {
    id: 'ultraclear_starphire',
    name: 'UltraClear Starphire Glass',
    description: 'Crystal clear low-iron glass',
    pricePerSqFt: 20,
    icon: '◊',
    gradient: 'from-cyan-50 to-teal-100'
  },
  {
    id: 'mirror',
    name: 'Mirror',
    description: 'High-quality reflective mirror glass',
    pricePerSqFt: 18,
    icon: '◐',
    gradient: 'from-slate-50 to-zinc-100'
  },
  {
    id: 'showerguard',
    name: 'ShowerGuard Glass',
    description: 'Protected glass that resists water spots',
    pricePerSqFt: 28,
    icon: '◈',
    gradient: 'from-blue-50 to-indigo-100'
  },
  {
    id: 'pattern',
    name: 'Pattern Glass',
    description: 'Textured glass with decorative patterns',
    pricePerSqFt: 16,
    icon: '◈',
    gradient: 'from-rose-50 to-pink-100'
  }
];

export default function GlassTypeCard({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {glassTypes.map((type, index) => (
        <motion.div
          key={type.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          onClick={() => onSelect(type)}
          className={cn(
            "relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300",
            "hover:shadow-lg hover:scale-[1.02]",
            selected?.id === type.id
              ? "border-[#1e3a5f] bg-gradient-to-br shadow-md"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          {selected?.id === type.id && (
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
            `bg-gradient-to-br ${type.gradient}`
          )}>
            {type.icon}
          </div>
          
          <h3 className="font-semibold text-lg text-slate-800 mb-1">
            {type.name}
          </h3>
          <p className="text-sm text-slate-500 mb-3">
            {type.description}
          </p>
          <p className="text-[#1e3a5f] font-medium">
            ${type.pricePerSqFt}/sq ft
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export { glassTypes };