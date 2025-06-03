
import { SkipData } from '../types/skip';

export const calculateFinalPrice = (skip: SkipData): number => {
  const priceWithVat = skip.price_before_vat * (1 + skip.vat / 100);
  return Math.round(priceWithVat);
};

export const formatHirePeriod = (days: number): string => {
  return `${days} day hire period`;
};
