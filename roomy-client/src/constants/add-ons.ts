export const addOns = {
  online: {
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  storage: {
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  customizableProfile: {
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
} as const;

export const defaultValues = {
  online: false,
  storage: false,
  customizableProfile: false,
} as const;

export type SelectedAddOns = typeof defaultValues;
