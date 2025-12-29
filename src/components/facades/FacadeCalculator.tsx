import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Facade, FacadeCoating, FacadeColor, SIZE_PRESETS } from '@/types/facade';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface FacadeCalculatorProps {
  facade: Facade;
}

export const FacadeCalculator = ({ facade }: FacadeCalculatorProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(700);
  const [quantity, setQuantity] = useState(1);
  const [selectedCoating, setSelectedCoating] = useState<FacadeCoating>(facade.coatings[0]);
  const [selectedColor, setSelectedColor] = useState<FacadeColor>(facade.colors[0]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  // Calculate price
  const calculatePrice = () => {
    const areaInSquareMeters = (width / 1000) * (height / 1000);
    let pricePerUnit = facade.pricePerSquareMeter * areaInSquareMeters;
    
    // Coating multipliers
    if (selectedCoating === 'Глянец') {
      pricePerUnit *= 1.15;
    } else if (selectedCoating === 'Супермат') {
      pricePerUnit *= 1.1;
    }
    
    return Math.round(pricePerUnit * quantity);
  };

  const pricePerUnit = calculatePrice() / quantity;
  const totalPrice = calculatePrice();

  // Handle preset selection
  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    const preset = SIZE_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setWidth(preset.width);
      setHeight(preset.height);
    }
  };

  // Handle dimension changes
  const handleWidthChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setWidth(Math.min(Math.max(numValue, 100), 2500));
    setSelectedPreset('');
  };

  const handleHeightChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setHeight(Math.min(Math.max(numValue, 100), 2500));
    setSelectedPreset('');
  };

  // Add to cart
  const handleAddToCart = () => {
    // Create unique ID for this configuration
    const configId = `${facade.id}-${width}x${height}-${selectedCoating}-${selectedColor.id}`;
    
    addItem({
      id: configId,
      name: `${facade.name} (${width}×${height} мм, ${selectedCoating}, ${selectedColor.name})`,
      price: pricePerUnit,
      image: facade.images[0],
    });
    
    // Add remaining items if quantity > 1
    for (let i = 1; i < quantity; i++) {
      addItem({
        id: configId,
        name: `${facade.name} (${width}×${height} мм, ${selectedCoating}, ${selectedColor.name})`,
        price: pricePerUnit,
        image: facade.images[0],
      });
    }
    
    toast({
      title: "Добавлено в корзину",
      description: `${facade.name} (${quantity} шт.) добавлен в корзину.`,
    });
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Калькулятор стоимости
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Size Presets */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Готовые размеры</Label>
          <Select value={selectedPreset} onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите размер или введите свой" />
            </SelectTrigger>
            <SelectContent>
              {SIZE_PRESETS.map((preset) => (
                <SelectItem key={preset.name} value={preset.name}>
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Ширина (мм)</Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              min={100}
              max={2500}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Высота (мм)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              min={100}
              max={2500}
            />
          </div>
        </div>

        {/* Coating Selection */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Тип покрытия</Label>
          <Select 
            value={selectedCoating} 
            onValueChange={(value) => setSelectedCoating(value as FacadeCoating)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {facade.coatings.map((coating) => (
                <SelectItem key={coating} value={coating}>
                  {coating}
                  {coating === 'Глянец' && ' (+15%)'}
                  {coating === 'Супермат' && ' (+10%)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Selection */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Цвет: {selectedColor.name}</Label>
          <div className="flex flex-wrap gap-2">
            {facade.colors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor.id === color.id 
                    ? 'border-primary ring-2 ring-primary ring-offset-2' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Количество</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Размер:</span>
            <span>{width} × {height} мм ({((width / 1000) * (height / 1000)).toFixed(3)} м²)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Цена за 1 шт.:</span>
            <span>{Math.round(pricePerUnit).toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Количество:</span>
            <span>{quantity} шт.</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between text-lg font-bold">
            <span>Итого:</span>
            <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleAddToCart}
          disabled={!facade.inStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {facade.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
        </Button>
      </CardContent>
    </Card>
  );
};
