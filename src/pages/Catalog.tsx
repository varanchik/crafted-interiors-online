import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Heart, ShoppingCart, Filter, Grid, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";

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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

const Catalog = () => {
  const { toast } = useToast();
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isInFavorites } = useFavorites();
  const { addItem: addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: Category[] = [
    {
      id: 1,
      name: "Столы",
      slug: "tables",
      subcategories: [
        { id: 1, name: "Обеденные столы", slug: "dining-tables" },
        { id: 2, name: "Журнальные столы", slug: "coffee-tables" },
        { id: 3, name: "Рабочие столы", slug: "desk-tables" }
      ]
    },
    {
      id: 2,
      name: "Стулья",
      slug: "chairs",
      subcategories: [
        { id: 4, name: "Обеденные стулья", slug: "dining-chairs" },
        { id: 5, name: "Кресла", slug: "armchairs" }
      ]
    },
    {
      id: 3,
      name: "Хранение",
      slug: "storage",
      subcategories: [
        { id: 6, name: "Шкафы", slug: "wardrobes" },
        { id: 7, name: "Комоды", slug: "chests" },
        { id: 8, name: "Полки", slug: "shelves" }
      ]
    }
  ];

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
      inStock: true
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
      inStock: true
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
      inStock: true
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
      inStock: false
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Каталог мебели
            </h1>
            
            {/* Search and Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedSubcategory('all');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={selectedSubcategory} 
                onValueChange={setSelectedSubcategory}
                disabled={selectedCategory === 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Подкатегория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все подкатегории</SelectItem>
                  {selectedCategoryData?.subcategories?.map(subcategory => (
                    <SelectItem key={subcategory.id} value={subcategory.slug}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="newest">Новинки</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Найдено {filteredProducts.length} товаров
              </p>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-0 shadow-soft card-hover relative overflow-hidden">
                {product.discount && (
                  <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-2 right-2 z-10 bg-gray-500 text-white">
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
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
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
                      <span className="text-sm text-muted-foreground ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-primary">
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
                      className="w-full btn-primary"
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Товары не найдены
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSubcategory('all');
              }}>
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
