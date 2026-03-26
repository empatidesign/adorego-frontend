
export interface PriceQuote {
  service: string;
  price: number;
  currency: string;
  deliveryTime: string;
  type: 'cheapest' | 'fastest' | 'safest';
}

export enum ShippingType {
  INTERNATIONAL = 'INTERNATIONAL',
  DOMESTIC = 'DOMESTIC'
}

export interface CalculatorState {
  type: ShippingType;
  country: string;
  weight: number;
}
