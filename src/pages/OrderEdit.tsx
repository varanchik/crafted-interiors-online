
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Package, User, Phone, Mail, MapPin, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock данные заказа - в реальном приложении загружались бы из API
  const [order, setOrder] = useState({
    id: "ЗАК-001",
    customer: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (900) 123-45-67",
    address: "г. Москва, ул. Тверская, д. 10, кв. 5",
    total: 89900,
    status: "В производстве",
    date: "2024-01-15",
    deliveryDate: "2024-01-25",
    paymentMethod: "Карта",
    deliveryMethod: "Курьер",
    notes: "Позвонить за час до доставки",
    items: [
      {
        id: 1,
        name: "Дубовый обеденный стол",
        quantity: 1,
        price: 89900,
        image: "/placeholder.svg"
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Имитация сохранения
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Заказ обновлен",
        description: `Заказ ${order.id} успешно сохранен.`,
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В производстве':
        return 'bg-blue-100 text-blue-800';
      case 'Отправлен':
        return 'bg-purple-100 text-purple-800';
      case 'Завершен':
        return 'bg-green-100 text-green-800';
      case 'Ожидает':
        return 'bg-white-100 text-white-800';
      case 'Отменен':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin/orders">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к заказам
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold">Редактирование заказа</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg font-medium">{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Основная информация */}
            <div className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Информация о клиенте</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customer">Имя клиента</Label>
                    <Input
                      id="customer"
                      value={order.customer}
                      onChange={(e) => setOrder({...order, customer: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={order.email}
                      onChange={(e) => setOrder({...order, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={order.phone}
                      onChange={(e) => setOrder({...order, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Textarea
                      id="address"
                      value={order.address}
                      onChange={(e) => setOrder({...order, address: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Детали заказа</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Статус заказа</Label>
                    <Select value={order.status} onValueChange={(value) => setOrder({...order, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ожидает">Ожидает</SelectItem>
                        <SelectItem value="В производстве">В производстве</SelectItem>
                        <SelectItem value="Отправлен">Отправлен</SelectItem>
                        <SelectItem value="Завершен">Завершен</SelectItem>
                        <SelectItem value="Отменен">Отменен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deliveryDate">Дата доставки</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={order.deliveryDate}
                      onChange={(e) => setOrder({...order, deliveryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryMethod">Способ доставки</Label>
                    <Select value={order.deliveryMethod} onValueChange={(value) => setOrder({...order, deliveryMethod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Курьер">Курьер</SelectItem>
                        <SelectItem value="Самовывоз">Самовывоз</SelectItem>
                        <SelectItem value="Почта">Почта России</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Способ оплаты</Label>
                    <Select value={order.paymentMethod} onValueChange={(value) => setOrder({...order, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Карта">Банковская карта</SelectItem>
                        <SelectItem value="Наличные">Наличные</SelectItem>
                        <SelectItem value="Перевод">Банковский перевод</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Примечания</Label>
                    <Textarea
                      id="notes"
                      value={order.notes}
                      onChange={(e) => setOrder({...order, notes: e.target.value})}
                      rows={3}
                      placeholder="Дополнительные примечания к заказу..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Товары и итоги */}
            <div className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Товары в заказе</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Количество: {item.quantity} шт.
                          </p>
                          <p className="font-semibold text-primary">
                            {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Итого по заказу</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Товары:</span>
                    <span className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span className="font-semibold">Бесплатно</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{order.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Информация о заказе</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Создан: {new Date(order.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Оплата: {order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Доставка: {order.deliveryMethod}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
