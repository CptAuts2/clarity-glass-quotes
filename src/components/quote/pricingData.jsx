// Clarity Glass Wholesalers Pricing Data
// Effective: 7/7/25

export const glassPricing = {
  clear_tempered: {
    name: 'Clear Glass',
    prices: {
      '1/8"': { annealed: 2.40, tempered: 2.56 },
      '3/16"': { annealed: 2.42, tempered: 3.18 },
      '1/4"': { annealed: 2.46, tempered: 3.37 },
      '3/8"': { annealed: 5.81, tempered: 6.16 },
      '1/2"': { annealed: 8.80, tempered: 9.08 },
      '5/8"': { annealed: 33.54, tempered: 44.83 },
      '3/4"': { annealed: 40.66, tempered: 51.83 }
    }
  },
  frosted: {
    name: 'Frosted Glass',
    prices: {
      '1/4"': { annealed: 16.50, tempered: 19.42 },
      '3/8"': { annealed: 22.00, tempered: 26.75 },
      '1/2"': { annealed: 26.40, tempered: 29.52 }
    }
  },
  tinted: {
    name: 'Tinted Glass',
    prices: {
      '1/4"': { annealed: 3.34, tempered: 4.19 },
      '3/8"': { annealed: 10.68, tempered: 17.05 }
    }
  },
  laminated: {
    name: 'Laminated Glass',
    prices: {
      '1/4"': { annealed: 6.52, tempered: null },
      '3/8"': { annealed: 9.57, tempered: null },
      '1/2"': { annealed: 13.20, tempered: null },
      '3/4"': { annealed: 26.99, tempered: null }
    }
  },
  ultraclear_starphire: {
    name: 'UltraClear Starphire Glass',
    prices: {
      '1/4"': { annealed: 7.70, tempered: 8.80 },
      '3/8"': { annealed: 12.10, tempered: 13.20 },
      '1/2"': { annealed: 16.70, tempered: 18.29 },
      '3/4"': { annealed: 73.18, tempered: 96.05 }
    }
  },
  mirror: {
    name: 'Mirror',
    prices: {
      '1/4"': { annealed: 4.07, tempered: 5.28 }
    }
  },
  showerguard: {
    name: 'ShowerGuard Glass',
    prices: {
      '3/8"': { annealed: 13.20, tempered: 13.73 },
      '1/2"': { annealed: 16.50, tempered: 17.12 }
    }
  },
  pattern: {
    name: 'Pattern Glass',
    prices: {
      '3/16"': { annealed: 7.15, tempered: 8.17 },
      '3/8"': { annealed: 20.35, tempered: 21.38 }
    }
  },
  other: {
    name: 'Other Glass',
    prices: {
      '1/4"': { annealed: 5.00, tempered: 6.00 }
    }
  }
};

export const edgePricing = {
  seamed: { label: 'Seamed Edge', price: 0, description: 'Basic safety edge' },
  flat_polished: { label: 'Flat Polished', price: 0.12, description: 'Smooth, shiny finish' },
  pencil: { label: 'Pencil Polish', price: 0.25, description: 'Rounded, elegant look' },
  beveled: { label: 'Beveled Edge - 1"', price: 0.48, description: 'Angled, premium finish' },
  shape_polish: { label: 'Shape Polish', price: 0.50, description: 'Custom shaped & polished edge' }
};

export const fabricationPricing = {
  hole: { name: 'Hole', price: 8.50, unit: 'each' },
  hinge_notch: { name: 'Hinge Notch', price: 13.25, unit: 'each' },
  corner_notch: { name: 'Corner Notch', price: 17.00, unit: 'each' },
  custom_pattern: { name: 'Custom Pattern', price: 40.00, unit: 'each' },
  out_of_square: { name: 'Out of Square', price: 0, unit: 'each' }
};

export const ENERGY_SURCHARGE = 0.115; // 11.5%
export const MINIMUM_SQ_FT = 3;
export const OVERSIZE_THRESHOLD = 50; // sq ft
export const OVERSIZE_CHARGE = 0.30; // 30%