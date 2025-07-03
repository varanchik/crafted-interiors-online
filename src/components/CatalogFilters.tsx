
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, RotateCcw } from "lucide-react";

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  sortBy: string;
}

interface CatalogFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const materials = [
  "Дуб", "Береза", "Сосна", "Орех", "Кожа", "Ткань", "Металл", "Стекло"
];

const colors = [
  "Белый", "Черный", "Коричневый", "Серый", "Бежевый", "Синий", "Зеленый", "Красный"
];

export const CatalogFilters = ({ filters, onFiltersChange, isOpen, onToggle }: CatalogFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'categories' | 'materials' | 'colors', value: string) => {
    const currentArray = localFilters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 200000],
      categories: [],
      materials: [],
      colors: [],
      inStock: false,
      featured: false,
      sortBy: 'popular'
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.categories.length > 0) count++;
    if (localFilters.materials.length > 0) count++;
    if (localFilters.colors.length > 0) count++;
    if (localFilters.inStock) count++;
    if (localFilters.featured) count++;
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 200000) count++;
    return count;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="fixed top-24 left-4 z-40 h-12 px-4 rounded-xl shadow-lg bg-background/90 backdrop-blur-sm border-border/50 lg:hidden"
      >
        <Filter className="h-4 w-4 mr-2" />
        Фильтры
        {getActiveFiltersCount() > 0 && (
          <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {getActiveFiltersCount()}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:w-80 lg:flex-shrink-0">
      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm lg:hidden" onClick={onToggle} />
      
      {/* Filter Panel */}
      <div className="absolute left-0 top-0 h-full w-80 bg-background border-r border-border overflow-y-auto lg:relative lg:w-full">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Фильтры</h3>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-8 px-2"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0 lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Range */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Цена</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                value={localFilters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={200000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{localFilters.priceRange[0].toLocaleString()} ₽</span>
                <span>—</span>
                <span>{localFilters.priceRange[1].toLocaleString()} ₽</span>
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Материал</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={localFilters.materials.includes(material)}
                    onCheckedChange={() => toggleArrayFilter('materials', material)}
                  />
                  <Label htmlFor={material} className="text-sm font-medium">
                    {material}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Colors */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Цвет</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={color}
                    checked={localFilters.colors.includes(color)}
                    onCheckedChange={() => toggleArrayFilter('colors', color)}
                  />
                  <Label htmlFor={color} className="text-sm font-medium">
                    {color}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Filters */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Дополнительно</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={localFilters.inStock}
                  onCheckedChange={(checked) => updateFilter('inStock', checked)}
                />
                <Label htmlFor="inStock" className="text-sm font-medium">
                  В наличии
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={localFilters.featured}
                  onCheckedChange={(checked) => updateFilter('featured', checked)}
                />
                <Label htmlFor="featured" className="text-sm font-medium">
                  Рекомендуемые
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Sort */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Сортировка</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={localFilters.sortBy}
                onValueChange={(value) => updateFilter('sortBy', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="newest">Новинки</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
