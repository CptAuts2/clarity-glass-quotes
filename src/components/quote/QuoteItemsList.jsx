import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuoteItemsList({ items, onRemove, onEdit, pricing }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Quote Items ({items.length})</h3>
      <div className="space-y-3">
        <AnimatePresence>
          {items.map((item, index) => {
            const itemPrice = pricing.items?.[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-800">
                      {item.glassType.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded">
                      {item.glassStrength}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <div>{item.dimensions.width}" × {item.dimensions.height}" × {item.dimensions.thickness}</div>
                    <div>Qty: {item.dimensions.quantity} | Edge: {item.options.edgeFinish}</div>
                    {item.fabrications.length > 0 && (
                      <div className="text-slate-500">
                        Fabrication: {item.fabrications.map(f => f.name).join(', ')}
                      </div>
                    )}
                  </div>
                  {itemPrice && (
                    <div className="mt-2 text-sm font-semibold text-[#1e3a5f]">
                      ${itemPrice.total.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit(index)}
                    className="h-8 w-8 text-slate-600 hover:text-[#1e3a5f]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onRemove(index)}
                    className="h-8 w-8 text-slate-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}