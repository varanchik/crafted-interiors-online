
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  const { items, removeItem: removeFromFavorites, clearFavorites } = useFavorites();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleMoveToCart = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      addToCart(item);
      removeFromFavorites(id);
      toast({
        title: "Товар перемещен",
        description: `${item.name} добавлен в корзину.`,
      });
    }
  };

  const handleMoveSelectedToCart = () => {
    selectedItems.forEach(id => {
      const item = items.find(item => item.id === id);
      if (item) {
        addToCart(item);
        removeFromFavorites(id);
      }
    });
    toast({
      title: "Товары перемещены",
      description: `${selectedItems.length} товаров добавлено в корзину.`,
    });
    setSelectedItems([]);
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      addToCart(item);
      removeFromFavorites(item.id);
    });
    toast({
      title: "Все товары перемещены",
      description: "Все товары из избранного добавлены в корзину.",
    });
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(id => removeFromFavorites(id));
    setSelectedItems([]);
    toast({
      title: "Товары удалены",
      description: `${selectedItems.length} товаров удалено из избранного.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/catalog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8">
              <ArrowLeft className="h-4 w-4" />
              <span>Вернуться к каталогу</span>
            </Link>
            
            <div className="py-16">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-serif font-bold mb-4">Избранное пусто</h1>
              <p className="text-muted-foreground mb-8">
                Добавляйте понравившиеся товары в избранное, чтобы не потерять их
              </p>
              <Link to="/catalog">
                <Button className="btn-primary">
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/catalog" className="text-primary hover:text-primary/80">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-3xl font-serif font-bold">Избранное</h1>
              <Badge variant="secondary">{items.length} товаров</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleSelectAll}
                className="text-sm"
              >
                {selectedItems.length === items.length ? 'Снять выделение' : 'Выбрать все'}
              </Button>
              
              {selectedItems.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleMoveSelectedToCart}
                    className="text-sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    В корзину ({selectedItems.length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemoveSelected}
                    className="text-sm text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить ({selectedItems.length})
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                onClick={handleMoveAllToCart}
                className="text-sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Все в корзину
              </Button>
              
              <Button
                variant="outline"
                onClick={clearFavorites}
                className="text-sm text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Очистить избранное
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="border-0 shadow-soft card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    
                    <h3 className="font-serif font-semibold mb-2 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    
                    <p className="text-xl font-bold text-primary mb-4">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </Link>
                  
                  <Button
                    onClick={() => handleMoveToCart(item.id)}
                    className="w-full btn-primary"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
