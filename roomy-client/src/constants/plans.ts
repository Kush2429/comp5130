export const plans = {
  arcade: {
    icon: '/icon-arcade.svg',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  advanced: {
    icon: '/icon-advanced.svg',
    name: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  pro: {
    icon: '/icon-pro.svg',
    name: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
} as const;

export type Plan = keyof typeof plans;
