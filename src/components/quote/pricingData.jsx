// Clarity Glass Wholesalers Pricing Data
// Effective: 7/7/25

export const glassPricing = {
  clear: {
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
  tinted_bronze: {
    name: 'Tinted Glass - Bronze',
    prices: {
      '1/4"': { annealed: 3.34, tempered: 4.19 },
      '3/8"': { annealed: 10.68, tempered: 17.05 }
    }
  },
  tinted_grey: {
    name: 'Tinted Glass - Grey',
    prices: {
      '1/4"': { annealed: 3.34, tempered: 4.19 },
      '3/8"': { annealed: 10.68, tempered: 17.05 }
    }
  },
  tinted_solex: {
    name: 'Tinted Glass - Solex',
    prices: {
      '1/4"': { annealed: 3.34, tempered: 4.19 },
      '3/8"': { annealed: 10.68, tempered: 17.05 }
    }
  },
  showerguard: {
    name: 'ShowerGuard',
    prices: {
      '3/8"': { annealed: 13.20, tempered: 13.73 },
      '1/2"': { annealed: 16.50, tempered: 17.12 }
    }
  },
  ultraclear_showerguard: {
    name: 'UltraClear ShowerGuard',
    prices: {
      '3/8"': { annealed: 22.88, tempered: 23.38 },
      '1/2"': { annealed: 28.60, tempered: 29.15 }
    }
  },
  low_iron_starphire: {
    name: 'Low Iron/Starphire',
    prices: {
      '1/4"': { annealed: 7.70, tempered: 8.80 },
      '3/8"': { annealed: 12.10, tempered: 13.20 },
      '1/2"': { annealed: 16.70, tempered: 18.29 },
      '3/4"': { annealed: 73.18, tempered: 96.05 }
    }
  },
  pattern_rain: {
    name: 'Pattern Glass - Rain',
    prices: {
      '3/16"': { annealed: 7.15, tempered: 8.17 },
      '3/8"': { annealed: 20.35, tempered: 21.38 }
    }
  },
  pattern_pattern62: {
    name: 'Pattern Glass - Pattern 62',
    prices: {
      '3/16"': { annealed: 7.15, tempered: 8.17 },
      '3/8"': { annealed: 20.35, tempered: 21.38 }
    }
  },
  pattern_aquatex: {
    name: 'Pattern Glass - Aquatex',
    prices: {
      '3/16"': { annealed: 7.15, tempered: 8.17 },
      '3/8"': { annealed: 20.35, tempered: 21.38 }
    }
  },
  frosted_satin: {
    name: 'Frosted Glass - Satin',
    prices: {
      '1/4"': { annealed: 16.50, tempered: 19.42 },
      '3/8"': { annealed: 22.00, tempered: 26.75 },
      '1/2"': { annealed: 26.40, tempered: 29.52 }
    }
  },
  frosted_satin_double: {
    name: 'Frosted Glass - Satin Double Sided',
    prices: {
      '3/8"': { annealed: 18.29, tempered: 25.30 },
      '1/2"': { annealed: 22.88, tempered: 35.20 }
    }
  },
  frosted_satin_low_iron: {
    name: 'Frosted Glass - Satin Low Iron',
    prices: {
      '1/4"': { annealed: 19.80, tempered: 23.10 },
      '3/8"': { annealed: 33.00, tempered: 37.57 },
      '1/2"': { annealed: 37.40, tempered: 40.70 }
    }
  },
  mirror: {
    name: 'Mirror',
    prices: {
      '1/4"': { annealed: 4.07, tempered: 5.28 }
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
  hole: {
    label: 'Hole',
    description: 'Drilled holes for hardware',
    price: 8.50
  },
  hinge_notch: {
    label: 'Hinge Notch',
    description: 'Cut-outs for hinges',
    price: 13.25
  },
  corner_notch: {
    label: 'Corner Notch',
    description: 'L-shaped corner cuts',
    price: 17.00
  },
  u_notch: {
    label: 'U Notch',
    description: 'U-shaped notch cuts',
    price: 10.00
  },
  clipped_corner: {
    label: 'Clipped Corner',
    description: 'Angled corner clips',
    price: 10.00
  },
  custom_countersink: {
    label: 'Custom Countersink',
    description: 'Recessed hole finishing',
    price: 8.50
  },
  polished_edge: {
    label: 'Polished Edge',
    description: 'Smooth polished edges',
    price: 0.12,
    priceType: 'perLinearFoot'
  },
  shape_polish: {
    label: 'Shape Polish',
    description: 'Custom shape polishing',
    price: 0.50,
    priceType: 'perLinearFoot'
  },
  miter_edge: {
    label: 'Miter Edge',
    description: 'Angled edge mitering',
    price: 0.45,
    priceType: 'perLinearFoot'
  },
  bevel_edge_1: {
    label: 'Bevel Edge - 1"',
    description: '1 inch beveled edge',
    price: 0.48,
    priceType: 'perLinearFoot'
  },
  bevel_edge_1_25: {
    label: 'Bevel Edge - 1-1/4"',
    description: '1.25 inch beveled edge',
    price: 0.58,
    priceType: 'perLinearFoot'
  },
  bevel_edge_1_5: {
    label: 'Bevel Edge - 1-1/2"',
    description: '1.5 inch beveled edge',
    price: 0.75,
    priceType: 'perLinearFoot'
  },
  radius_edge: {
    label: 'Radius Edge',
    description: 'Rounded edge finish',
    price: 22.00
  },
  interior_cut_small: {
    label: 'Interior Cut (Small)',
    description: 'Small interior cutout',
    price: 20.00
  },
  interior_cut_large: {
    label: 'Interior Cut (Large)',
    description: 'Large interior cutout',
    price: 40.00
  },
  custom_pattern: {
    label: 'Custom Pattern',
    description: 'Custom shapes & patterns',
    price: 40.00
  },
  out_of_square: {
    label: 'Out of Square',
    description: 'Non-rectangular shapes',
    price: 0
  }
};

export const ENERGY_SURCHARGE = 0.115; // 11.5%
export const MINIMUM_SQ_FT = 3;
export const OVERSIZE_THRESHOLD = 50; // sq ft
export const OVERSIZE_CHARGE = 0.30; // 30%