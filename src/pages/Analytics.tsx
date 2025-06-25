
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, PieChart, Users, Package } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell } from "recharts";

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  const salesData = [
    { month: 'Янв', sales: 245000, orders: 18 },
    { month: 'Фев', sales: 298000, orders: 22 },
    { month: 'Мар', sales: 187000, orders: 14 },
    { month: 'Апр', sales: 421000, orders: 28 },
    { month: 'Май', sales: 356000, orders: 25 },
    { month: 'Июн', sales: 489000, orders: 32 }
  ];

  const categoryData = [
    { name: 'Столы', value: 35, color: '#8b5cf6' },
    { name: 'Стулья', value: 28, color: '#06b6d4' },
    { name: 'Хранение', value: 22, color: '#10b981' },
    { name: 'Кровати', value: 15, color: '#f59e0b' }
  ];

  const topProducts = [
    { name: 'Дубовый обеденный стол', sales: 24, revenue: 2157600 },
    { name: 'Кожаное кресло', sales: 18, revenue: 1132200 },
    { name: 'Современный шкаф', sales: 12, revenue: 1558800 },
    { name: 'Набор обеденных стульев', sales: 31, revenue: 988900 },
    { name: 'Ореховый журнальный столик', sales: 15, revenue: 733500 }
  ];

  const recentActivity = [
    { type: 'order', message: 'Новый заказ ЗАК-105 на сумму 89,900 ₽', time: '5 мин назад' },
    { type: 'product', message: 'Товар "Кожаное кресло" закончился на складе', time: '15 мин назад' },
    { type: 'user', message: 'Новый пользователь: Михаил Петров', time: '1 час назад' },
    { type: 'order', message: 'Заказ ЗАК-104 отправлен клиенту', time: '2 часа назад' },
    { type: 'review', message: 'Новый отзыв (5 звезд) на "Дубовый стол"', time: '3 часа назад' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'product':
        return <BarChart3 className="h-4 w-4 text-orange-500" />;
      case 'user':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'review':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default:
        return <PieChart className="h-4 w-4 text-gray-500" />;
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к админке
                </Button>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Аналитика и отчеты</h1>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Последняя неделя</SelectItem>
                <SelectItem value="month">Последний месяц</SelectItem>
                <SelectItem value="quarter">Последний квартал</SelectItem>
                <SelectItem value="year">Последний год</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="sales">Продажи</TabsTrigger>
              <TabsTrigger value="products">Товары</TabsTrigger>
              <TabsTrigger value="customers">Клиенты</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-8 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Выручка за месяц</p>
                        <p className="text-2xl font-bold">2,156,600 ₽</p>
                        <div className="flex items-center mt-1 text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">+12%</span>
                        </div>
                      </div>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Заказы за месяц</p>
                        <p className="text-2xl font-bold">139</p>
                        <div className="flex items-center mt-1 text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">+8%</span>
                        </div>
                      </div>
                      <Package className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Новые клиенты</p>
                        <p className="text-2xl font-bold">24</p>
                        <div className="flex items-center mt-1 text-red-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          <span className="text-xs">-3%</span>
                        </div>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Средний чек</p>
                        <p className="text-2xl font-bold">15,515 ₽</p>
                        <div className="flex items-center mt-1 text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="text-xs">+5%</span>
                        </div>
                      </div>
                      <PieChart className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <Card className="lg:col-span-2 border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Динамика продаж</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="sales" fill="var(--color-sales)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Последняя активность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="mt-1">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sales Analytics */}
            <TabsContent value="sales" className="mt-8 space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Продажи по месяцам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="sales" 
                            stroke="var(--color-sales)" 
                            strokeWidth={3} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Продажи по категориям</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <RechartsPieChart.Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart.Pie>
                          <ChartTooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {categoryData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}: {item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products Analytics */}
            <TabsContent value="products" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Топ-5 товаров по продажам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.sales} продаж</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{product.revenue.toLocaleString('ru-RU')} ₽</p>
                          <p className="text-sm text-muted-foreground">выручка</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Analytics */}
            <TabsContent value="customers" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Статистика клиентов</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span>Всего клиентов</span>
                      <span className="font-bold text-2xl">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Активные клиенты</span>
                      <span className="font-bold text-2xl text-green-600">892</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Постоянные клиенты</span>
                      <span className="font-bold text-2xl text-blue-600">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Средние покупки на клиента</span>
                      <span className="font-bold text-2xl">2.3</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>География продаж</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { city: 'Москва', orders: 45, percentage: 35 },
                      { city: 'Санкт-Петербург', orders: 32, percentage: 25 },
                      { city: 'Екатеринбург', orders: 18, percentage: 14 },
                      { city: 'Новосибирск', orders: 12, percentage: 9 },
                      { city: 'Другие города', orders: 22, percentage: 17 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{item.city}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{item.orders}</span>
                        </div>
                      </div>
                    ))}
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

export default Analytics;
