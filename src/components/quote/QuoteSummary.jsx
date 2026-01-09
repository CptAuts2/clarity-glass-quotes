import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Mail, 
  Phone, 
  User,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function QuoteSummary({ 
  glassType, 
  dimensions, 
  options, 
  pricing 
}) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    setIsSubmitting(true);
    
    await base44.entities.Quote.create({
      customer_name: contact.name,
      customer_email: contact.email,
      customer_phone: contact.phone,
      glass_type: glassType?.id,
      width: dimensions.width,
      height: dimensions.height,
      thickness: dimensions.thickness,
      edge_finish: options.edgeFinish,
      quantity: dimensions.quantity || 1,
      includes_installation: options.installation,
      includes_delivery: options.delivery,
      subtotal: pricing.subtotal,
      total_price: pricing.total,
      status: 'sent',
      notes: contact.notes
    });

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Quote request submitted successfully!');
  };

  if (!glassType || !dimensions.width || !dimensions.height) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-600">Your Quote</h3>
        <p className="text-sm text-slate-400 mt-2">
          Select glass type and enter dimensions to see pricing
        </p>
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-slate-800">Quote Submitted!</h3>
        <p className="text-slate-600 mt-3 max-w-sm mx-auto">
          Thank you, {contact.name}! We'll review your request and get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setShowContactForm(false);
            setContact({ name: '', email: '', phone: '', notes: '' });
          }}
          variant="outline"
          className="mt-6"
        >
          Get Another Quote
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium opacity-90">Instant Quote</span>
        </div>
        <div className="text-4xl font-bold">${pricing.total.toFixed(2)}</div>
      </div>

      {/* Breakdown */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">{glassType.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {dimensions.width}" × {dimensions.height}" × {dimensions.quantity || 1} pc
            </span>
            <span className="text-slate-400">{pricing.sqFt} sq ft</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Glass @ ${pricing.pricePerSqFt}/sq ft</span>
            <span className="font-medium">${pricing.glassPrice.toFixed(2)}</span>
          </div>
          {pricing.edgePrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Edge Finishing</span>
              <span className="font-medium">${pricing.edgePrice.toFixed(2)}</span>
            </div>
          )}
          {pricing.fabricationPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Fabrication</span>
              <span className="font-medium">${pricing.fabricationPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
        </div>

        {pricing.energySurcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Energy Surcharge (11.5%)</span>
            <span className="font-medium">${pricing.energySurcharge.toFixed(2)}</span>
          </div>
        )}
        {pricing.oversizeCharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Oversize Charge (30%)</span>
            <span className="font-medium">${pricing.oversizeCharge.toFixed(2)}</span>
          </div>
        )}

        <div className="h-px bg-slate-200" />

        <div className="flex justify-between">
          <span className="font-semibold text-slate-800">Total</span>
          <span className="text-xl font-bold text-[#1e3a5f]">${pricing.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Contact Form */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <User className="w-4 h-4" />
                  Your Name *
                </Label>
                <Input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="John Smith"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="john@email.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-700">Additional Notes</Label>
                <Textarea
                  value={contact.notes}
                  onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                  placeholder="Any special requirements or questions..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <div className="p-6 pt-0">
        {!showContactForm ? (
          <Button
            onClick={() => setShowContactForm(true)}
            className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white rounded-xl font-medium"
          >
            Get This Quote
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Quote Request
                <Check className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}