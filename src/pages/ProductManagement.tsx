import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Plus, Eye, Edit, Trash2, Package, DollarSign, TrendingUp, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  inStock: boolean;
  featured: boolean;
  sales: number;
  rating: number;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

const ProductManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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
      id: 1,
      name: "Дубовый обеденный стол",
      price: 89900,
      originalPrice: 109900,
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
      category: "tables",
      subcategory: "dining-tables",
      inStock: true,
      featured: true,
      sales: 24,
      rating: 4.8,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Кожаное кресло",
      price: 62900,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
      category: "chairs",
      subcategory: "armchairs",
      inStock: true,
      featured: false,
      sales: 18,
      rating: 4.6,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Современный шкаф",
      price: 156700,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "storage",
      subcategory: "wardrobes",
      inStock: false,
      featured: false,
      sales: 12,
      rating: 4.4,
      createdAt: "2024-01-08"
    }
  ];

  const stats = [
    { title: "Всего товаров", value: products.length, icon: <Package className="h-5 w-5" />, change: "+3 в этом месяце" },
    { title: "В наличии", value: products.filter(p => p.inStock).length, icon: <TrendingUp className="h-5 w-5" />, change: "85% от общего числа" },
    { title: "Рекомендуемые", value: products.filter(p => p.featured).length, icon: <Star className="h-5 w-5" />, change: "Популярные товары" },
    { title: "Средняя цена", value: `${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString('ru-RU')} ₽`, icon: <DollarSign className="h-5 w-5" />, change: "По всем товарам" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'in-stock' && product.inStock) ||
                         (statusFilter === 'out-of-stock' && product.inStock) ||
                         (statusFilter === 'featured' && product.featured);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryName = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    return category?.name || slug;
  };

  const getSubcategoryName = (categorySlug: string, subcategorySlug?: string) => {
    if (!subcategorySlug) return '';
    const category = categories.find(cat => cat.slug === categorySlug);
    const subcategory = category?.subcategories?.find(sub => sub.slug === subcategorySlug);
    return subcategory?.name || subcategorySlug;
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Вы уверены, что хотите удалить товар "${name}"?`)) {
      toast({
        title: "Товар удален",
        description: `"${name}" был удален из каталога.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к админке
                </Button>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Управление товарами</h1>
            </div>
            <Link to="/admin/product/new/edit">
              <Button className="bg-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                Добавить товар
              </Button>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Все товары</TabsTrigger>
              <TabsTrigger value="featured">Рекомендуемые</TabsTrigger>
              <TabsTrigger value="out-of-stock">Нет в наличии</TabsTrigger>
            </TabsList>

            {/* All Products */}
            <TabsContent value="products" className="mt-8">
              {/* Filters */}
              <Card className="border-0 shadow-soft mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Поиск товаров..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full md:w-48">
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
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="in-stock">В наличии</SelectItem>
                        <SelectItem value="out-of-stock">Нет в наличии</SelectItem>
                        <SelectItem value="featured">Рекомендуемые</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Товары</span>
                    <Badge variant="secondary">{filteredProducts.length} товаров</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Товар</TableHead>
                          <TableHead>Категория</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Продажи</TableHead>
                          <TableHead>Рейтинг</TableHead>
                          <TableHead>Создан</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  {product.featured && (
                                    <Badge className="mt-1" variant="secondary">
                                      <Star className="h-3 w-3 mr-1" />
                                      Рекомендуем
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{getCategoryName(product.category)}</div>
                                {product.subcategory && (
                                  <div className="text-muted-foreground">
                                    {getSubcategoryName(product.category, product.subcategory)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</div>
                                {product.originalPrice && (
                                  <div className="text-muted-foreground line-through">
                                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {product.inStock ? 'В наличии' : 'Нет в наличии'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">{product.sales}</TableCell>
                            <TableCell className="text-center">{product.rating}</TableCell>
                            <TableCell className="text-sm">
                              {new Date(product.createdAt).toLocaleDateString('ru-RU')}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Link to={`/admin/product/${product.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Link to={`/admin/product/${product.id}/edit`}>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(product.id, product.name)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Featured Products */}
            <TabsContent value="featured" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Рекомендуемые товары</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.featured).map((product) => (
                      <Card key={product.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {getCategoryName(product.category)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</p>
                              <Badge className="mt-1" variant="secondary">
                                <Star className="h-3 w-3 mr-1" />
                                Рекомендуем
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Out of Stock */}
            <TabsContent value="out-of-stock" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Товары, которых нет в наличии</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => !p.inStock).map((product) => (
                      <Card key={product.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {getCategoryName(product.category)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</p>
                              <Badge className="mt-1 bg-red-100 text-red-800">
                                Нет в наличии
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
