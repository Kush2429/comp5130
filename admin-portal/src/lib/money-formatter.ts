const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatUSD(value: number): string {
  return USDollar.format(value);
}
