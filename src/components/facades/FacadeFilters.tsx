import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, X } from 'lucide-react';
import { FacadeFilterState, FACADE_MATERIALS, FACADE_COATINGS, STANDARD_COLORS, FacadeMaterial, FacadeCoating } from '@/types/facade';

interface FacadeFiltersProps {
  filters: FacadeFilterState;
  onFiltersChange: (filters: FacadeFilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FacadeFilters = ({ filters, onFiltersChange, isOpen, onToggle }: FacadeFiltersProps) => {
  const updateFilter = <K extends keyof FacadeFilterState>(key: K, value: FacadeFilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleMaterial = (material: FacadeMaterial) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material];
    updateFilter('materials', newMaterials);
  };

  const toggleCoating = (coating: FacadeCoating) => {
    const newCoatings = filters.coatings.includes(coating)
      ? filters.coatings.filter(c => c !== coating)
      : [...filters.coatings, coating];
    updateFilter('coatings', newCoatings);
  };

  const toggleColor = (colorId: string) => {
    const newColors = filters.colors.includes(colorId)
      ? filters.colors.filter(c => c !== colorId)
      : [...filters.colors, colorId];
    updateFilter('colors', newColors);
  };

  const resetFilters = () => {
    onFiltersChange({
      priceRange: [0, 15000],
      materials: [],
      coatings: [],
      colors: [],
      inStock: false,
      featured: false,
      sortBy: 'popular',
    });
  };

  const hasActiveFilters = 
    filters.materials.length > 0 ||
    filters.coatings.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStock ||
    filters.featured ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 15000;

  // Mobile toggle button
  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="lg:hidden w-full mb-4"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Фильтры
        {hasActiveFilters && (
          <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
            Активны
          </span>
        )}
      </Button>
    );
  }

  return (
    <Card className="w-full lg:w-72 border-0 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Фильтры</CardTitle>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Сбросить
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Цена за м²: {filters.priceRange[0].toLocaleString('ru-RU')} - {filters.priceRange[1].toLocaleString('ru-RU')} ₽
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            min={0}
            max={15000}
            step={500}
            className="mt-2"
          />
        </div>

        {/* Materials */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Материал</Label>
          <div className="space-y-2">
            {FACADE_MATERIALS.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={filters.materials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                />
                <label
                  htmlFor={`material-${material}`}
                  className="text-sm cursor-pointer"
                >
                  {material}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Coatings */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Тип покрытия</Label>
          <div className="space-y-2">
            {FACADE_COATINGS.map((coating) => (
              <div key={coating} className="flex items-center space-x-2">
                <Checkbox
                  id={`coating-${coating}`}
                  checked={filters.coatings.includes(coating)}
                  onCheckedChange={() => toggleCoating(coating)}
                />
                <label
                  htmlFor={`coating-${coating}`}
                  className="text-sm cursor-pointer"
                >
                  {coating}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Цвета</Label>
          <div className="flex flex-wrap gap-2">
            {STANDARD_COLORS.slice(0, 12).map((color) => (
              <button
                key={color.id}
                onClick={() => toggleColor(color.id)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.id) 
                    ? 'border-primary ring-2 ring-primary ring-offset-2' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', !!checked)}
            />
            <label htmlFor="inStock" className="text-sm cursor-pointer">
              Только в наличии
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) => updateFilter('featured', !!checked)}
            />
            <label htmlFor="featured" className="text-sm cursor-pointer">
              Популярные
            </label>
          </div>
        </div>

        {/* Sort */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Сортировка</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter('sortBy', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">По популярности</SelectItem>
              <SelectItem value="price-asc">Сначала дешевле</SelectItem>
              <SelectItem value="price-desc">Сначала дороже</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="name">По названию</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
