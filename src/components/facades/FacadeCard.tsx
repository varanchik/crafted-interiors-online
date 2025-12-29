import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Facade } from '@/types/facade';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';

interface FacadeCardProps {
  facade: Facade;
  viewMode?: 'grid' | 'list';
}

export const FacadeCard = ({ facade, viewMode = 'grid' }: FacadeCardProps) => {
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isInFavorites } = useFavorites();
  const { toast } = useToast();
  const isFavorite = isInFavorites(facade.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(facade.id);
      toast({
        title: "Удалено из избранного",
        description: `${facade.name} удален из избранного.`,
      });
    } else {
      addToFavorites({
        id: facade.id,
        name: facade.name,
        price: facade.pricePerSquareMeter,
        image: facade.images[0],
      });
      toast({
        title: "Добавлено в избранное",
        description: `${facade.name} добавлен в избранное.`,
      });
    }
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          {facade.featured && (
            <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
              Популярный
            </Badge>
          )}
          {!facade.inStock && (
            <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-muted text-muted-foreground">
              Нет в наличии
            </Badge>
          )}
          
          <Link to={`/facades/${facade.id}`}>
            <img
              src={facade.images[0]}
              alt={facade.name}
              className="w-full h-48 object-cover"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        <div className="p-4">
          <Link to={`/facades/${facade.id}`}>
            <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
              {facade.name}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {facade.description}
          </p>
          
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.floor(facade.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({facade.reviews})
            </span>
          </div>
          
          {/* Material and Coatings */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {facade.material}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {facade.thickness} мм
            </Badge>
          </div>
          
          {/* Color Swatches */}
          <div className="flex items-center gap-1 mb-3">
            {facade.colors.slice(0, 6).map((color) => (
              <div
                key={color.id}
                className="w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {facade.colors.length > 6 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{facade.colors.length - 6}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold">
                {facade.pricePerSquareMeter.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-sm text-muted-foreground">/м²</span>
            </div>
          </div>
          
          <Link to={`/facades/${facade.id}`}>
            <Button 
              className="w-full"
              disabled={!facade.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {facade.inStock ? 'Рассчитать стоимость' : 'Нет в наличии'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
