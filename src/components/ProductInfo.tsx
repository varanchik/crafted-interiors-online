
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, Ruler, Truck, Shield } from "lucide-react";

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    description: string;
    features: string[];
    rating: number;
    reviews: number;
    customizable: boolean;
  };
  isFavorite: boolean;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
}

export const ProductInfo = ({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
          {product.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i <= Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews} отзывов)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-primary">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Ключевые особенности</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button onClick={onAddToCart} className="btn-primary flex-1">
            В корзину - {product.price.toLocaleString('ru-RU')} ₽
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onToggleFavorite}
            className={isFavorite ? 'text-red-500' : ''}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {product.customizable && (
          <Button variant="outline" className="w-full">
            <Ruler className="h-4 w-4 mr-2" />
            Заказать с индивидуальными размерами
          </Button>
        )}
      </div>

      {/* Shipping Info */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <Truck className="h-5 w-5 text-primary" />
          <span className="text-sm">Бесплатная доставка в течение 7-14 рабочих дней</span>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm">Гарантия 5 лет включена</span>
        </div>
      </div>
    </div>
  );
};
