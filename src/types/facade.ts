export type FacadeMaterial = 'МДФ' | 'ПВХ' | 'Шпон' | 'Пластик' | 'Эмаль';
export type FacadeCoating = 'Глянец' | 'Мат' | 'Супермат';

export interface FacadeColor {
  id: string;
  name: string;
  hex: string;
}

export interface Facade {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  material: FacadeMaterial;
  coatings: FacadeCoating[];
  colors: FacadeColor[];
  thickness: number; // мм
  edgeOptions: string[];
  pricePerSquareMeter: number; // базовая цена за м²
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  featured: boolean;
}

export interface FacadeCartItem {
  facadeId: string;
  facade: Facade;
  width: number; // мм
  height: number; // мм
  quantity: number;
  selectedCoating: FacadeCoating;
  selectedColor: FacadeColor;
  calculatedPrice: number;
}

export interface FacadeFilterState {
  priceRange: [number, number];
  materials: FacadeMaterial[];
  coatings: FacadeCoating[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  sortBy: string;
}

// Размерные пресеты
export interface SizePreset {
  name: string;
  width: number;
  height: number;
}

export const SIZE_PRESETS: SizePreset[] = [
  { name: 'Малый (300×400)', width: 300, height: 400 },
  { name: 'Средний (400×600)', width: 400, height: 600 },
  { name: 'Стандартный (500×700)', width: 500, height: 700 },
  { name: 'Большой (600×800)', width: 600, height: 800 },
  { name: 'Высокий (400×900)', width: 400, height: 900 },
  { name: 'Широкий (800×600)', width: 800, height: 600 },
];

// Все доступные материалы
export const FACADE_MATERIALS: FacadeMaterial[] = ['МДФ', 'ПВХ', 'Шпон', 'Пластик', 'Эмаль'];

// Все доступные покрытия
export const FACADE_COATINGS: FacadeCoating[] = ['Глянец', 'Мат', 'Супермат'];

// Стандартная палитра цветов
export const STANDARD_COLORS: FacadeColor[] = [
  { id: 'white', name: 'Белый', hex: '#FFFFFF' },
  { id: 'ivory', name: 'Слоновая кость', hex: '#FFFFF0' },
  { id: 'beige', name: 'Бежевый', hex: '#F5F5DC' },
  { id: 'gray', name: 'Серый', hex: '#808080' },
  { id: 'anthracite', name: 'Антрацит', hex: '#293133' },
  { id: 'black', name: 'Черный', hex: '#1A1A1A' },
  { id: 'oak', name: 'Дуб натуральный', hex: '#C19A6B' },
  { id: 'walnut', name: 'Орех', hex: '#5D432C' },
  { id: 'wenge', name: 'Венге', hex: '#3D2B1F' },
  { id: 'red', name: 'Красный', hex: '#C41E3A' },
  { id: 'green', name: 'Зеленый', hex: '#228B22' },
  { id: 'blue', name: 'Синий', hex: '#0047AB' },
  { id: 'cappuccino', name: 'Капучино', hex: '#8B7355' },
  { id: 'cream', name: 'Кремовый', hex: '#FFFDD0' },
  { id: 'graphite', name: 'Графит', hex: '#474747' },
];
