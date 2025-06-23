
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

const Catalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      name: "Дубовый обеденный стол",
      price: 89900,
      category: "tables",
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop",
      description: "Ручная работа из массива дуба с натуральным покрытием",
      rating: 4.8,
      reviews: 24,
      customizable: true
    },
    {
      id: 2,
      name: "Кожаное кресло",
      price: 62900,
      category: "chairs",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      description: "Премиальная кожа с каркасом из массива дерева",
      rating: 4.9,
      reviews: 18,
      customizable: true
    },
    {
      id: 3,
      name: "Современный шкаф",
      price: 129900,
      category: "wardrobes",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
      description: "Современный шкаф с раздвижными дверцами и индивидуальным дизайном",
      rating: 4.7,
      reviews: 12,
      customizable: true
    },
    {
      id: 4,
      name: "Ореховый журнальный столик",
      price: 48900,
      category: "tables",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      description: "Элегантный журнальный столик из ореха с металлическими акцентами",
      rating: 4.6,
      reviews: 31,
      customizable: false
    },
    {
      id: 5,
      name: "Набор обеденных стульев",
      price: 31900,
      category: "chairs",
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop",
      description: "Набор из 4-х обеденных стульев с мягкой обивкой",
      rating: 4.8,
      reviews: 27,
      customizable: true
    },
    {
      id: 6,
      name: "Встроенный книжный шкаф",
      price: 89900,
      category: "storage",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      description: "Встроенный книжный шкаф с регулируемыми полками",
      rating: 4.9,
      reviews: 15,
      customizable: true
    }
  ];

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'tables', label: 'Столы' },
    { value: 'chairs', label: 'Стулья' },
    { value: 'wardrobes', label: 'Шкафы' },
    { value: 'storage', label: 'Хранение' }
  ];

  const sortOptions = [
    { value: 'name', label: 'По названию А-Я' },
    { value: 'price-low', label: 'Цена: по возрастанию' },
    { value: 'price-high', label: 'Цена: по убыванию' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Коллекция мебели
          </h1>
          <p className="text-lg text-muted-foreground">
            Откройте для себя нашу премиальную коллекцию мебели ручной работы
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Показано {filteredProducts.length} из {products.length} товаров
          </p>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-soft card-hover bg-white">
              <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-64'}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.customizable && (
                    <Badge className="absolute top-3 left-3 bg-primary text-white">
                      Под заказ
                    </Badge>
                  )}
                </div>
                <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-serif font-semibold text-xl mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i <= Math.floor(product.rating)
                                ? 'bg-yellow-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} отзывов)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Link to={`/product/${product.id}`}>
                        <Button className="btn-primary">
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Товары не найдены</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить критерии поиска или просмотрите все категории
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}>
                Очистить фильтры
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
