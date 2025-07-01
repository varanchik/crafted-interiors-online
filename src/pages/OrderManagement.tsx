
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Eye, Edit, Package, Truck, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const orders = [
    { 
      id: "ЗАК-001", 
      customer: "Иван Петров", 
      email: "ivan@example.com", 
      phone: "+7 (900) 123-45-67",
      total: 89900, 
      status: "В производстве", 
      date: "2024-01-15",
      deliveryDate: "2024-01-25",
      paymentMethod: "Карта",
      deliveryMethod: "Курьер",
      items: 2
    },
    { 
      id: "ЗАК-002", 
      customer: "Анна Сидорова", 
      email: "anna@example.com", 
      phone: "+7 (900) 234-56-78",
      total: 123800, 
      status: "Отправлен", 
      date: "2024-01-14",
      deliveryDate: "2024-01-22",
      paymentMethod: "Наличные",
      deliveryMethod: "Самовывоз",
      items: 1
    },
    { 
      id: "ЗАК-003", 
      customer: "Михаил Иванов", 
      email: "mikhail@example.com", 
      phone: "+7 (900) 345-67-89",
      total: 62900, 
      status: "Завершен", 
      date: "2024-01-13",
      deliveryDate: "2024-01-20",
      paymentMethod: "Карта",
      deliveryMethod: "Курьер",
      items: 3
    },
    { 
      id: "ЗАК-004", 
      customer: "Елена Козлова", 
      email: "elena@example.com", 
      phone: "+7 (900) 456-78-90",
      total: 89500, 
      status: "Ожидает", 
      date: "2024-01-12",
      deliveryDate: "2024-01-28",
      paymentMethod: "Карта",
      deliveryMethod: "Курьер",
      items: 1
    }
  ];

  const orderStats = [
    { title: "Всего заказов", value: orders.length, icon: <Package className="h-5 w-5" />, change: "+8 на этой неделе" },
    { title: "В обработке", value: orders.filter(o => o.status === "В производстве" || o.status === "Ожидает").length, icon: <Clock className="h-5 w-5" />, change: "Требует внимания" },
    { title: "Выручка", value: `${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('ru-RU')} ₽`, icon: <DollarSign className="h-5 w-5" />, change: "+15% к прошлой неделе" },
    { title: "Средний чек", value: `${Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toLocaleString('ru-RU')} ₽`, icon: <Truck className="h-5 w-5" />, change: "+5% к прошлому месяцу" }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В производстве':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Отправлен':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Завершен':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Ожидает':
        return 'bg-white-100 text-white-800 hover:bg-white-200';
      case 'Отменен':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Статус заказа изменен",
      description: `Заказ ${orderId} переведен в статус "${newStatus}".`,
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
            <h1 className="text-3xl font-serif font-bold">Управление заказами</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {orderStats.map((stat, index) => (
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

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Все заказы</TabsTrigger>
              <TabsTrigger value="pending">В обработке</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>

            {/* All Orders */}
            <TabsContent value="orders" className="mt-8">
              {/* Filters */}
              <Card className="border-0 shadow-soft mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Поиск по номеру заказа, клиенту или email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="ожидает">Ожидает</SelectItem>
                        <SelectItem value="в производстве">В производстве</SelectItem>
                        <SelectItem value="отправлен">Отправлен</SelectItem>
                        <SelectItem value="завершен">Завершен</SelectItem>
                        <SelectItem value="отменен">Отменен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Заказы</span>
                    <Badge variant="secondary">{filteredOrders.length} заказов</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>№ заказа</TableHead>
                          <TableHead>Клиент</TableHead>
                          <TableHead>Контакты</TableHead>
                          <TableHead>Сумма</TableHead>
                          <TableHead>Товары</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Дата заказа</TableHead>
                          <TableHead>Доставка</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customer}</div>
                                <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{order.email}</div>
                                <div className="text-muted-foreground">{order.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</TableCell>
                            <TableCell className="text-center">{order.items} шт.</TableCell>
                            <TableCell>
                              <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                                <SelectTrigger className="w-auto">
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Ожидает">Ожидает</SelectItem>
                                  <SelectItem value="В производстве">В производстве</SelectItem>
                                  <SelectItem value="Отправлен">Отправлен</SelectItem>
                                  <SelectItem value="Завершен">Завершен</SelectItem>
                                  <SelectItem value="Отменен">Отменен</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(order.date).toLocaleDateString('ru-RU')}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{order.deliveryMethod}</div>
                                <div className="text-muted-foreground">
                                  {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Link to={`/admin/order/${order.id}/edit`}>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
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

            {/* Pending Orders */}
            <TabsContent value="pending" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Заказы в обработке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.filter(order => order.status === "В производстве" || order.status === "Ожидает").map((order) => (
                      <Card key={order.id} className="border-2 border-white-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="font-semibold">{order.id}</h3>
                                <p className="text-sm text-muted-foreground">{order.customer}</p>
                              </div>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{order.total.toLocaleString('ru-RU')} ₽</p>
                              <p className="text-sm text-muted-foreground">
                                Доставка: {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Статистика по статусам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Ожидает', 'В производстве', 'Отправлен', 'Завершен'].map((status) => {
                        const count = orders.filter(order => order.status === status).length;
                        const percentage = (count / orders.length) * 100;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Badge className={getStatusColor(status)}>{status}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Способы доставки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Курьер', 'Самовывоз'].map((method) => {
                        const count = orders.filter(order => order.deliveryMethod === method).length;
                        const percentage = (count / orders.length) * 100;
                        return (
                          <div key={method} className="flex items-center justify-between">
                            <span className="font-medium">{method}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          </div>
                        );
                      })}
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

export default OrderManagement;
