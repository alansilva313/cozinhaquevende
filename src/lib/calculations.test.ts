import { describe, expect, it } from 'vitest';
import { aggregateIngredients, priceEstimate, salesEstimate } from './calculations';

describe('calculadoras de negócio', () => {
  it('calcula preço sugerido considerando taxa e margem sobre a venda', () => {
    const result = priceEstimate({ ingredients: 50, packaging: 10, variableExtras: 4, labor: 16, yield: 10, paymentFeePercent: 5, marginPercent: 35 });
    expect(result.costPerUnit).toBe(8);
    expect(result.suggestedPrice).toBeCloseTo(13.333333, 5);
    expect(result.contribution).toBeCloseTo(4.666666, 5);
  });
  it('recusa uma combinação de taxa e margem sem denominador positivo', () => {
    expect(priceEstimate({ ingredients: 10, packaging: 0, variableExtras: 0, labor: 0, yield: 1, paymentFeePercent: 60, marginPercent: 40 }).suggestedPrice).toBeNull();
  });
  it('separa faturamento, custos, margem de contribuição e resultado operacional', () => {
    const result = salesEstimate({ price: 8, unitCost: 3.5, unitsPerDay: 10, days: 20, fixedCosts: 300, feePercent: 5 });
    expect(result.revenue).toBe(1600);
    expect(result.contribution).toBe(820);
    expect(result.operatingResult).toBe(520);
    expect(result.breakEvenUnits).toBe(74);
  });
  it('agrega ingredientes iguais e mantém unidades diferentes separadas', () => {
    expect(aggregateIngredients([{ name: 'Banana', amount: 2, unit: 'un', multiplier: 1 }, { name: 'banana', amount: 3, unit: 'un', multiplier: 2 }, { name: 'Banana', amount: 200, unit: 'g', multiplier: 1 }])).toEqual([{ name: 'Banana', amount: 8, unit: 'un' }, { name: 'Banana', amount: 200, unit: 'g' }]);
  });
});
