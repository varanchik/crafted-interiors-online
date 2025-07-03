
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Heart, ShoppingCart, Grid, List, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { CatalogFilters } from "@/components/CatalogFilters";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  subcategory?: string;
  discount?: number;
  inStock: boolean;
  material?: string;
  color?: string;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  sortBy: string;
}

const Catalog = () => {
  const { toast } = useToast();
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isInFavorites } = useFavorites();
  const { addItem: addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200000],
    categories: [],
    materials: [],
    colors: [],
    inStock: false,
    featured: false,
    sortBy: 'popular'
  });

  const products: Product[] = [
    {
      id: "1",
      name: "Дубовый обеденный стол",
      price: 89900,
      originalPrice: 109900,
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 24,
      category: "tables",
      subcategory: "dining-tables",
      discount: 18,
      inStock: true,
      material: "Дуб",
      color: "Коричневый"
    },
    {
      id: "2",
      name: "Кожаное кресло",
      price: 62900,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 18,
      category: "chairs",
      subcategory: "armchairs",
      inStock: true,
      material: "Кожа",
      color: "Черный"
    },
    {
      id: "3",
      name: "Современный шкаф",
      price: 45900,
      originalPrice: 55900,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 12,
      category: "storage",
      subcategory: "wardrobes",
      discount: 18,
      inStock: true,
      material: "МДФ",
      color: "Белый"
    },
    {
      id: "4",
      name: "Офисное кресло",
      price: 28900,
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 8,
      category: "chairs",
      subcategory: "armchairs",
      inStock: false,
      material: "Ткань",
      color: "Серый"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesMaterial = filters.materials.length === 0 || (product.material && filters.materials.includes(product.material));
    const matchesColor = filters.colors.length === 0 || (product.color && filters.colors.includes(product.color));
    const matchesStock = !filters.inStock || product.inStock;
    
    return matchesSearch && matchesPrice && matchesMaterial && matchesColor && matchesStock;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в корзину.`,
    });
  };

  const handleToggleFavorite = (product: Product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Удалено из избранного",
        description: `${product.name} удален из избранного.`,
      });
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      toast({
        title: "Добавлено в избранное",
        description: `${product.name} добавлен в избранное.`,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                  Каталог мебели
                </h1>
                <p className="text-muted-foreground">
                  Найдено {filteredProducts.length} товаров
                </p>
              </div>
              
              {/* Search and View Controls */}
              <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск товаров..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Фильтры
                  </Button>
                  
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="hidden lg:block">
              <CatalogFilters
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={true}
                onToggle={() => {}}
              />
            </div>

            {/* Mobile Filters */}
            <CatalogFilters
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 z-10 bg-red-500">
                          -{product.discount}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="absolute top-2 right-2 z-10 bg-gray-500">
                          Нет в наличии
                        </Badge>
                      )}
                      
                      <CardContent className="p-0">
                        <div className="relative">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                            />
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={() => handleToggleFavorite(product)}
                          >
                            <Heart className={`h-4 w-4 ${isInFavorites(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                        </div>
                        
                        <div className="p-4">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-semibold mb-2 hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i <= Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>
                          
                          {/* Material and Color */}
                          <div className="flex items-center gap-2 mb-3">
                            {product.material && (
                              <Badge variant="secondary" className="text-xs">
                                {product.material}
                              </Badge>
                            )}
                            {product.color && (
                              <Badge variant="outline" className="text-xs">
                                {product.color}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-xl font-bold">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {product.originalPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            )}
                          </div>
                          
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? 'В корзину' : 'Нет в наличии'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground mb-6">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        priceRange: [0, 200000],
                        categories: [],
                        materials: [],
                        colors: [],
                        inStock: false,
                        featured: false,
                        sortBy: 'popular'
                      });
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
