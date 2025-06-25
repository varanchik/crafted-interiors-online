import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Users, DollarSign, TrendingUp, Edit, Trash2, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Admin = () => {
  const { toast } = useToast();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    inStock: true
  });

  // Mock data - in real app, this would come from API
  const stats = [
    { title: "Всего товаров", value: "48", icon: <Package className="h-5 w-5" />, change: "+3 в этом месяце" },
    { title: "Активные заказы", value: "24", icon: <Users className="h-5 w-5" />, change: "+8 на этой неделе" },
    { title: "Выручка за месяц", value: "3 215 600 ₽", icon: <DollarSign className="h-5 w-5" />, change: "+12% к прошлому месяцу" },
    { title: "Средний чек", value: "133 900 ₽", icon: <TrendingUp className="h-5 w-5" />, change: "+5% к прошлому месяцу" }
  ];

  const products = [
    { id: 1, name: "Дубовый обеденный стол", price: 89900, category: "Столы", stock: 5, status: "Активный" },
    { id: 2, name: "Кожаное кресло", price: 62900, category: "Стулья", stock: 8, status: "Активный" },
    { id: 3, name: "Современный шкаф", price: 129900, category: "Хранение", stock: 3, status: "Активный" },
    { id: 4, name: "Ореховый журнальный столик", price: 48900, category: "Столы", stock: 0, status: "Нет в наличии" },
    { id: 5, name: "Набор обеденных стульев", price: 31900, category: "Стулья", stock: 12, status: "Активный" }
  ];

  const orders = [
    { id: "ЗАК-001", customer: "Иван Петров", email: "ivan@example.com", total: 89900, status: "В производстве", date: "2024-01-15" },
    { id: "ЗАК-002", customer: "Анна Сидорова", email: "anna@example.com", total: 123800, status: "Отправлен", date: "2024-01-14" },
    { id: "ЗАК-003", customer: "Михаил Иванов", email: "mikhail@example.com", total: 62900, status: "Завершен", date: "2024-01-13" },
    { id: "ЗАК-004", customer: "Елена Козлова", email: "elena@example.com", total: 89500, status: "Ожидает", date: "2024-01-12" }
  ];

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
      description: '',
      image: '',
      inStock: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активный':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Нет в наличии':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'В производстве':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Отправлен':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Завершен':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Ожидает':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
              Панель администратора
            </h1>
            <p className="text-lg text-muted-foreground">
              Управление товарами и заказами мебельного магазина
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Товары</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="users">Пользователи</TabsTrigger>
              <TabsTrigger value="add-product">Добавить товар</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Управление товарами</span>
                    <Badge variant="secondary">{products.length} товаров</Badge>
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
                          <TableHead>Остаток</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                            <TableCell>{product.stock}</TableCell>
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
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Управление заказами</span>
                    <Badge variant="secondary">{orders.length} заказов</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>№ заказа</TableHead>
                          <TableHead>Клиент</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Сумма</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Дата</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{order.email}</TableCell>
                            <TableCell className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(order.date).toLocaleDateString('ru-RU')}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
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

            {/* Users Tab */}
            <TabsContent value="users" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Пользователи системы</span>
                    <Link to="/admin/users">
                      <Button className="btn-primary">
                        Управление пользователями
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Управление пользователями</h3>
                    <p className="text-muted-foreground mb-4">
                      Просматривайте, редактируйте и управляйте пользователями системы
                    </p>
                    <Link to="/admin/users">
                      <Button className="btn-primary">
                        Перейти к управлению
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Product Tab */}
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
                        <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tables">Столы</SelectItem>
                            <SelectItem value="chairs">Стулья</SelectItem>
                            <SelectItem value="storage">Хранение</SelectItem>
                            <SelectItem value="beds">Кровати</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="product-image">URL изображения</Label>
                        <Input
                          id="product-image"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                        />
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

export default Admin;
