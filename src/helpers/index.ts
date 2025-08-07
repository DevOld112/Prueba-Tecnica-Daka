import { Category, type DolarBCV, type Monitor } from "@/types";

type TranslationDictionary = {
  [key in Category]: string;
};

const translations: TranslationDictionary = {
  [Category.Electronics]: "Electrónica",
  [Category.Jewelery]: "Joyería",
  [Category.MenSClothing]: "Ropa de Hombre",
  [Category.WomenSClothing]: "Ropa de Mujer",
};

export function translateCategory(category: string | Category): string {
  return translations[category as Category] || category;
}


export function getTranslatedCategories(): { value: string; label: string }[] {
  return Object.entries(translations).map(([value, label]) => ({
    value,
    label,
  }));
}

export async function exchangeRate(): Promise<DolarBCV> {
  const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial')

  const data = await response.json()

  return data;
}

export async function testExchange(): Promise<Monitor> {
  const response = await fetch('https://pydolarve.org/api/v2/tipo-cambio')

  const data = await response.json()

  return data.monitors.usd;
}


export const formatPrice = (
  value: number | string,
  currency: string = 'BsF',
  decimalPlaces: number = 2
): string => {

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) {
    return `${currency} 0.00`;
  }

 
  const formattedValue = numericValue.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });

  return `${currency} ${formattedValue}`;
};