
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, DollarSign, TrendingUp, ShoppingCart, BarChart3, Settings, Eye } from "lucide-react";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

const Admin = () => {
  // Mock data для дашборда
  const stats = [
    { title: "Всего товаров", value: "48", icon: <Package className="h-5 w-5" />, change: "+3 в этом месяце", link: "/admin/products" },
    { title: "Активные заказы", value: "24", icon: <ShoppingCart className="h-5 w-5" />, change: "+8 на этой неделе", link: "/admin/orders" },
    { title: "Выручка за месяц", value: "3 215 600 ₽", icon: <DollarSign className="h-5 w-5" />, change: "+12% к прошлому месяцу", link: "/admin/analytics" },
    { title: "Всего пользователей", value: "1,247", icon: <Users className="h-5 w-5" />, change: "+24 за неделю", link: "/admin/users" }
  ];

  const salesData = [
    { day: 'Пн', sales: 45000, orders: 12 },
    { day: 'Вт', sales: 52000, orders: 15 },
    { day: 'Ср', sales: 38000, orders: 9 },
    { day: 'Чт', sales: 67000, orders: 18 },
    { day: 'Пт', sales: 89000, orders: 24 },
    { day: 'Сб', sales: 94000, orders: 28 },
    { day: 'Вс', sales: 71000, orders: 19 }
  ];

  const recentOrders = [
    { id: "ЗАК-001", customer: "Иван Петров", total: 89900, status: "В производстве", time: "2 часа назад" },
    { id: "ЗАК-002", customer: "Анна Сидорова", total: 123800, status: "Отправлен", time: "4 часа назад" },
    { id: "ЗАК-003", customer: "Михаил Иванов", total: 62900, status: "Завершен", time: "6 часов назад" }
  ];

  const lowStockProducts = [
    { name: "Ореховый журнальный столик", stock: 0, status: "Нет в наличии" },
    { name: "Современный шкаф", stock: 3, status: "Мало" },
    { name: "Дубовый обеденный стол", stock: 5, status: "Мало" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В производстве':
        return 'bg-blue-100 text-blue-800';
      case 'Отправлен':
        return 'bg-purple-100 text-purple-800';
      case 'Завершен':
        return 'bg-green-100 text-green-800';
      case 'Нет в наличии':
        return 'bg-red-100 text-red-800';
      case 'Мало':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const chartConfig = {
    sales: {
      label: "Продажи",
      color: "#8b5cf6",
    },
    orders: {
      label: "Заказы", 
      color: "#06b6d4",
    },
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
              Управление мебельным магазином - главная статистика и быстрые действия
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Link key={index} to={stat.link}>
                <Card className="border-0 shadow-soft card-hover cursor-pointer">
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
              </Link>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Sales Chart */}
            <Card className="lg:col-span-2 border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Продажи за неделю</CardTitle>
                <Link to="/admin/analytics">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Подробнее
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Последние заказы</CardTitle>
                <Link to="/admin/orders">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Все заказы
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{order.total.toLocaleString('ru-RU')} ₽</p>
                        <Badge className={getStatusColor(order.status)} variant="secondary">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Alerts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/admin/products">
                    <Button className="w-full btn-primary justify-start" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Управление товарами
                    </Button>
                  </Link>
                  <Link to="/admin/orders">
                    <Button className="w-full btn-primary justify-start" variant="outline">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Управление заказами
                    </Button>
                  </Link>
                  <Link to="/admin/users">
                    <Button className="w-full btn-primary justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Пользователи
                    </Button>
                  </Link>
                  <Link to="/admin/analytics">
                    <Button className="w-full btn-primary justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Аналитика
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-red-600">Внимание: мало товара</CardTitle>
                <Link to="/admin/products">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Посмотреть все
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Остаток: {product.stock} шт.</p>
                      </div>
                      <Badge className={getStatusColor(product.status)} variant="secondary">
                        {product.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Состояние системы</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Сайт</p>
                  <p className="text-xs text-muted-foreground">Работает нормально</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">База данных</p>
                  <p className="text-xs text-muted-foreground">Работает нормально</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Платежи</p>
                  <p className="text-xs text-muted-foreground">Небольшие задержки</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">Работает нормально</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
