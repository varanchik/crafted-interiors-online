import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Plus, Edit, Trash2, Eye, Package, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = [
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

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    image: '',
    inStock: true
  });

  const products = [
    { id: 1, name: "Дубовый обеденный стол", price: 89900, category: "Столы", subcategory: "Обеденные столы", stock: 5, status: "Активный", sales: 12, rating: 4.8 },
    { id: 2, name: "Кожаное кресло", price: 62900, category: "Стулья", subcategory: "Кресла", stock: 8, status: "Активный", sales: 24, rating: 4.6 },
    { id: 3, name: "Современный шкаф", price: 129900, category: "Хранение", subcategory: "Шкафы", stock: 3, status: "Активный", sales: 8, rating: 4.9 },
    { id: 4, name: "Ореховый журнальный столик", price: 48900, category: "Столы", subcategory: "Журнальные столы", stock: 0, status: "Нет в наличии", sales: 15, rating: 4.7 },
    { id: 5, name: "Набор обеденных стульев", price: 31900, category: "Стулья", subcategory: "Обеденные стулья", stock: 12, status: "Активный", sales: 31, rating: 4.5 }
  ];

  const selectedCategoryData = categories.find(cat => cat.name === categoryFilter);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSubcategory = subcategoryFilter === 'all' || product.subcategory.toLowerCase() === subcategoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesSubcategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активный':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Нет в наличии':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Товар добавлен",
      description: `${newProduct.name} добавлен в каталог.`,
    });
    setNewProduct({
      name: '',
      price: '',
      category: '',
      subcategory: '',
      description: '',
      image: '',
      inStock: true
    });
  };

  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Товар удален",
      description: "Товар успешно удален из каталога.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к админке
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold">Управление товарами</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего товаров</p>
                    <p className="text-2xl font-bold text-foreground">{products.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">+3 в этом месяце</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">В наличии</p>
                    <p className="text-2xl font-bold text-foreground">{products.filter(p => p.status === 'Активный').length}</p>
                    <p className="text-xs text-green-600 mt-1">90% от общего</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Нет в наличии</p>
                    <p className="text-2xl font-bold text-foreground">{products.filter(p => p.status === 'Нет в наличии').length}</p>
                    <p className="text-xs text-red-600 mt-1">Требует внимания</p>
                  </div>
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Средний рейтинг</p>
                    <p className="text-2xl font-bold text-foreground">4.7</p>
                    <p className="text-xs text-green-600 mt-1">★★★★★</p>
                  </div>
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Список товаров</TabsTrigger>
              <TabsTrigger value="categories">Категории</TabsTrigger>
              <TabsTrigger value="add-product">Добавить товар</TabsTrigger>
            </TabsList>

            {/* Products List */}
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
                    <Select value={categoryFilter} onValueChange={(value) => {
                      setCategoryFilter(value);
                      setSubcategoryFilter('all');
                    }}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={subcategoryFilter} 
                      onValueChange={setSubcategoryFilter}
                      disabled={categoryFilter === 'all'}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Подкатегория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все подкатегории</SelectItem>
                        {selectedCategoryData?.subcategories?.map(sub => (
                          <SelectItem key={sub.id} value={sub.name}>
                            {sub.name}
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
                        <SelectItem value="активный">Активные</SelectItem>
                        <SelectItem value="нет в наличии">Нет в наличии</SelectItem>
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
                          <TableHead>Подкатегория</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Остаток</TableHead>
                          <TableHead>Продажи</TableHead>
                          <TableHead>Рейтинг</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.subcategory}</TableCell>
                            <TableCell className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell className="text-center">{product.sales}</TableCell>
                            <TableCell>★ {product.rating}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(product.status)}>
                                {product.status}
                              </Badge>
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
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteProduct(product.id)}
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

            {/* Categories */}
            <TabsContent value="categories" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Категории товаров</CardTitle>
                  <Link to="/admin/categories">
                    <Button className="btn-primary">
                      Управление категориями
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                      <Card key={index} className="border-2">
                        <CardContent className="p-6 text-center">
                          <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
                          <p className="text-2xl font-bold text-primary mb-1">
                            {category.subcategories?.length || 0}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">подкатегорий</p>
                          <div className="space-y-1">
                            {category.subcategories?.slice(0, 3).map(sub => (
                              <Badge key={sub.id} variant="outline" className="text-xs">
                                {sub.name}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Product */}
            <TabsContent value="add-product" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>Добавить новый товар</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-name">Название товара *</Label>
                        <Input
                          id="product-name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Введите название товара"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="product-price">Цена *</Label>
                        <Input
                          id="product-price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-category">Категория *</Label>
                        <Select value={newProduct.category} onValueChange={(value) => {
                          setNewProduct(prev => ({ ...prev, category: value, subcategory: '' }));
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.slug}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="product-subcategory">Подкатегория</Label>
                        <Select 
                          value={newProduct.subcategory} 
                          onValueChange={(value) => setNewProduct(prev => ({ ...prev, subcategory: value }))}
                          disabled={!newProduct.category}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите подкатегорию" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.find(cat => cat.slug === newProduct.category)?.subcategories?.map(subcategory => (
                              <SelectItem key={subcategory.id} value={subcategory.slug}>
                                {subcategory.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="product-description">Описание *</Label>
                      <Textarea
                        id="product-description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Введите описание товара..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="in-stock"
                        checked={newProduct.inStock}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="in-stock">В наличии</Label>
                    </div>

                    <Button type="submit" className="btn-primary w-full">
                      Добавить товар
                    </Button>
                  </form>
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
