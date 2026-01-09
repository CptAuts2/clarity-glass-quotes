import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { glassPricing } from './pricingData';

const glassTypes = [
  {
    id: 'clear',
    name: 'Clear Glass',
    description: 'Strong, safety glass ideal for doors & windows',
    icon: '◇',
    gradient: 'from-sky-50 to-blue-100'
  },
  {
    id: 'tinted',
    name: 'Tinted Glass',
    description: 'Reduce glare & UV with sophisticated color',
    icon: '◆',
    gradient: 'from-amber-50 to-orange-100',
    hasSubtypes: true,
    subtypes: [
      { id: 'tinted_bronze', name: 'Bronze' },
      { id: 'tinted_grey', name: 'Grey' },
      { id: 'tinted_solex', name: 'Solex' }
    ]
  },
  {
    id: 'showerguard',
    name: 'ShowerGuard',
    description: 'Protected glass that resists water spots',
    icon: '◈',
    gradient: 'from-blue-50 to-indigo-100'
  },
  {
    id: 'ultraclear_showerguard',
    name: 'UltraClear ShowerGuard',
    description: 'Premium protection with clarity',
    icon: '◊',
    gradient: 'from-cyan-50 to-teal-100'
  },
  {
    id: 'low_iron_starphire',
    name: 'Low Iron/Starphire',
    description: 'Crystal clear low-iron glass',
    icon: '◊',
    gradient: 'from-emerald-50 to-green-100'
  },
  {
    id: 'pattern',
    name: 'Pattern Glass',
    description: 'Textured glass with decorative patterns',
    icon: '◈',
    gradient: 'from-rose-50 to-pink-100',
    hasSubtypes: true,
    subtypes: [
      { id: 'pattern_rain', name: 'Rain' },
      { id: 'pattern_pattern62', name: 'Pattern 62' },
      { id: 'pattern_aquatex', name: 'Aquatex' }
    ]
  },
  {
    id: 'frosted',
    name: 'Frosted Glass',
    description: 'Elegant privacy with diffused light',
    icon: '◈',
    gradient: 'from-slate-100 to-gray-200',
    hasSubtypes: true,
    subtypes: [
      { id: 'frosted_satin', name: 'Satin' },
      { id: 'frosted_satin_double', name: 'Satin - Double Sided' },
      { id: 'frosted_satin_low_iron', name: 'Satin - Low Iron' }
    ]
  },
  {
    id: 'mirror',
    name: 'Mirror',
    description: 'High-quality reflective mirror glass',
    icon: '◐',
    gradient: 'from-slate-50 to-zinc-100'
  },
  {
    id: 'laminated',
    name: 'Laminated Glass',
    description: 'Maximum safety with sound reduction',
    icon: '▣',
    gradient: 'from-violet-50 to-purple-100'
  }
];

export default function GlassTypeCard({ selected, onSelect, subtype, onSubtypeChange }) {
  const [localSubtypes, setLocalSubtypes] = useState({});

  const handleSelect = (type) => {
    if (type.hasSubtypes) {
      const defaultSubtype = type.subtypes[0].id;
      setLocalSubtypes({ ...localSubtypes, [type.id]: defaultSubtype });
      onSelect({ ...type, subtypeId: defaultSubtype });
      if (onSubtypeChange) onSubtypeChange(defaultSubtype);
    } else {
      onSelect(type);
    }
  };

  const handleSubtypeChange = (typeId, subtypeId, e) => {
    e.stopPropagation();
    setLocalSubtypes({ ...localSubtypes, [typeId]: subtypeId });
    const type = glassTypes.find(t => t.id === typeId);
    onSelect({ ...type, subtypeId });
    if (onSubtypeChange) onSubtypeChange(subtypeId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {glassTypes.map((type, index) => {
        const isSelected = selected?.id === type.id || selected?.subtypeId?.startsWith(type.id);
        const currentSubtype = localSubtypes[type.id] || (type.hasSubtypes ? type.subtypes[0].id : null);
        
        return (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => handleSelect(type)}
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

            {type.hasSubtypes && isSelected && (
              <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                <Select
                  value={currentSubtype}
                  onValueChange={(value) => handleSubtypeChange(type.id, value, { stopPropagation: () => {} })}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {type.subtypes.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <p className="text-[#1e3a5f] font-medium text-sm mt-3">
              Pricing varies by thickness
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export { glassTypes };