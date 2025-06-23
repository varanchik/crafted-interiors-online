
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Package, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (495) 123-45-67",
    address: "ул. Тверская, д. 12, кв. 34, Москва, 125009"
  });

  const [newOrder, setNewOrder] = useState({
    type: '',
    description: '',
    dimensions: { width: '', height: '', depth: '' },
    material: '',
    budget: ''
  });

  const orders = [
    {
      id: "ЗАК-001",
      date: "2024-01-15",
      status: "В производстве",
      items: [
        { name: "Дубовый обеденный стол", quantity: 1, price: 89900 }
      ],
      total: 89900,
      estimatedDelivery: "2024-02-28"
    },
    {
      id: "ЗАК-002", 
      date: "2023-12-10",
      status: "Доставлен",
      items: [
        { name: "Кожаное кресло", quantity: 2, price: 62900 }
      ],
      total: 125800,
      deliveredDate: "2024-01-05"
    },
    {
      id: "ЗАК-003",
      date: "2023-11-20",
      status: "Завершен",
      items: [
        { name: "Ореховый журнальный столик", quantity: 1, price: 48900 },
        { name: "Прикроватная тумба", quantity: 2, price: 20500 }
      ],
      total: 89900,
      deliveredDate: "2023-12-15"
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Профиль обновлен",
      description: "Информация вашего профиля успешно сохранена.",
    });
  };

  const handleNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заказ отправлен",
      description: "Ваш запрос на изготовление отправлен. Мы свяжемся с вами в течение 24 часов.",
    });
    setNewOrder({
      type: '',
      description: '',
      dimensions: { width: '', height: '', depth: '' },
      material: '',
      budget: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В производстве':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Доставлен':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Завершен':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
              Личный кабинет
            </h1>
            <p className="text-lg text-muted-foreground">
              Управляйте профилем, заказами и запросами на изготовление мебели
            </p>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Заказы</span>
              </TabsTrigger>
              <TabsTrigger value="new-order" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Новый заказ</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Профиль</span>
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-semibold">История заказов</h2>
                  <Badge variant="secondary">
                    Всего заказов: {orders.length}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                              <h3 className="font-semibold text-lg">Заказ {order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <p key={index} className="text-sm text-muted-foreground">
                                  {item.quantity}x {item.name} - {item.price.toLocaleString('ru-RU')} ₽
                                </p>
                              ))}
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              <p>Дата заказа: {new Date(order.date).toLocaleDateString('ru-RU')}</p>
                              {order.status === 'В производстве' && order.estimatedDelivery && (
                                <p>Ожидаемая доставка: {new Date(order.estimatedDelivery).toLocaleDateString('ru-RU')}</p>
                              )}
                              {order.deliveredDate && (
                                <p>Доставлен: {new Date(order.deliveredDate).toLocaleDateString('ru-RU')}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary mb-2">
                              {order.total.toLocaleString('ru-RU')} ₽
                            </div>
                            <Button variant="outline" size="sm">
                              Подробности
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* New Order Tab */}
            <TabsContent value="new-order" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>Заказать изготовление мебели</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewOrderSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="order-type">Тип мебели *</Label>
                        <Select value={newOrder.type} onValueChange={(value) => setNewOrder(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип мебели" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="table">Стол</SelectItem>
                            <SelectItem value="chair">Стул/Кресло</SelectItem>
                            <SelectItem value="wardrobe">Шкаф/Хранение</SelectItem>
                            <SelectItem value="bookshelf">Книжный шкаф</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="material">Предпочитаемый материал</Label>
                        <Select value={newOrder.material} onValueChange={(value) => setNewOrder(prev => ({ ...prev, material: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите материал" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oak">Дуб</SelectItem>
                            <SelectItem value="walnut">Орех</SelectItem>
                            <SelectItem value="cherry">Вишня</SelectItem>
                            <SelectItem value="maple">Клен</SelectItem>
                            <SelectItem value="mahogany">Красное дерево</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Описание проекта *</Label>
                      <Textarea
                        id="description"
                        value={newOrder.description}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Опишите ваше видение, стилевые предпочтения и особые требования..."
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Индивидуальные размеры</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="width" className="text-sm">Ширина (см)</Label>
                          <Input
                            id="width"
                            placeholder="180"
                            value={newOrder.dimensions.width}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, width: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="height" className="text-sm">Высота (см)</Label>
                          <Input
                            id="height"
                            placeholder="76"
                            value={newOrder.dimensions.height}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, height: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="depth" className="text-sm">Глубина (см)</Label>
                          <Input
                            id="depth"
                            placeholder="90"
                            value={newOrder.dimensions.depth}
                            onChange={(e) => setNewOrder(prev => ({ 
                              ...prev, 
                              dimensions: { ...prev.dimensions, depth: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">Бюджет</Label>
                      <Select value={newOrder.budget} onValueChange={(value) => setNewOrder(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите диапазон бюджета" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-30000">До 30 000 ₽</SelectItem>
                          <SelectItem value="30000-70000">30 000 - 70 000 ₽</SelectItem>
                          <SelectItem value="70000-140000">70 000 - 140 000 ₽</SelectItem>
                          <SelectItem value="140000-350000">140 000 - 350 000 ₽</SelectItem>
                          <SelectItem value="over-350000">Свыше 350 000 ₽</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="btn-primary w-full">
                      Отправить запрос на изготовление
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Информация профиля</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Полное имя</Label>
                        <Input
                          id="profile-name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-email">Email адрес</Label>
                        <Input
                          id="profile-email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-phone">Номер тел

ефона</Label>
                        <Input
                          id="profile-phone"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profile-address">Адрес</Label>
                        <Textarea
                          id="profile-address"
                          value={profile.address}
                          onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      
                      <Button type="submit" className="btn-primary w-full">
                        Обновить профиль
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <span>Настройки аккаунта</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Пароль</h4>
                      <Button variant="outline" className="w-full">
                        Изменить пароль
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Уведомления</h4>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span>Обновления заказов по email</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span>Анонсы новых товаров</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>Рекламные предложения</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Действия с аккаунтом</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Скачать мои данные
                        </Button>
                        <Button variant="destructive" className="w-full">
                          Удалить аккаунт
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
