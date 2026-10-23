export type CostInput = { ingredients: number; packaging: number; variableExtras: number; labor: number; yield: number; paymentFeePercent: number; marginPercent: number };
export function priceEstimate(input: CostInput) {
  const units = Math.max(1, input.yield);
  const costPerUnit = (input.ingredients + input.packaging + input.variableExtras + input.labor) / units;
  const fee = Math.min(99.99, Math.max(0, input.paymentFeePercent)) / 100;
  const margin = Math.min(99.99, Math.max(0, input.marginPercent)) / 100;
  const denominator = 1 - fee - margin;
  const suggestedPrice = denominator > 0 ? costPerUnit / denominator : null;
  const selectedPrice = suggestedPrice ?? 0;
  return { costPerUnit, suggestedPrice, contribution: selectedPrice * (1 - fee) - costPerUnit, profitAtSuggestedPrice: selectedPrice - selectedPrice * fee - costPerUnit };
}

export type SalesInput = { price: number; unitCost: number; unitsPerDay: number; days: number; fixedCosts: number; feePercent: number };
export function salesEstimate(input: SalesInput) {
  const units = Math.max(0, input.unitsPerDay) * Math.max(0, input.days);
  const revenue = units * Math.max(0, input.price);
  const variable = units * Math.max(0, input.unitCost);
  const fees = revenue * Math.max(0, Math.min(100, input.feePercent)) / 100;
  const fixed = Math.max(0, input.fixedCosts);
  const contribution = revenue - variable - fees;
  const operatingResult = contribution - fixed;
  const unitContribution = input.price * (1 - Math.max(0, Math.min(100, input.feePercent)) / 100) - input.unitCost;
  return { units, revenue, variable, fees, fixed, contribution, operatingResult, breakEvenUnits: unitContribution > 0 ? Math.ceil(fixed / unitContribution) : null };
}

export function aggregateIngredients(items: { name: string; amount: number; unit: string; multiplier: number }[]) {
  const totals = new Map<string, { name: string; amount: number; unit: string }>();
  for (const item of items) {
    const key = `${item.name.toLocaleLowerCase('pt-BR')}|${item.unit}`;
    const current = totals.get(key);
    if (current) current.amount += item.amount * item.multiplier;
    else totals.set(key, { name: item.name, unit: item.unit, amount: item.amount * item.multiplier });
  }
  return [...totals.values()].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
