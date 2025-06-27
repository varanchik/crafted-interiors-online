
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Percent, Calendar, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  productIds: string[];
  categoryIds: string[];
  startDate: string;
  endDate: string;
  active: boolean;
  minOrderAmount?: number;
}

const DiscountManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: "1",
      name: "Новогодняя скидка",
      type: 'percentage',
      value: 15,
      productIds: ["1", "2"],
      categoryIds: [],
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      active: true,
      minOrderAmount: 50000
    },
    {
      id: "2",
      name: "Скидка на столы",
      type: 'percentage',
      value: 20,
      productIds: [],
      categoryIds: ["tables"],
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      active: true
    }
  ]);

  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({
    name: '',
    type: 'percentage',
    value: 0,
    productIds: [],
    categoryIds: [],
    startDate: '',
    endDate: '',
    active: true
  });

  const products = [
    { id: "1", name: "Дубовый обеденный стол" },
    { id: "2", name: "Кожаное кресло" },
    { id: "3", name: "Современный шкаф" }
  ];

  const categories = [
    { id: "tables", name: "Столы" },
    { id: "chairs", name: "Стулья" },
    { id: "storage", name: "Хранение" }
  ];

  const filteredDiscounts = discounts.filter(discount =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDiscount = () => {
    if (!newDiscount.name || !newDiscount.value || !newDiscount.startDate || !newDiscount.endDate) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }

    const discount: Discount = {
      id: Date.now().toString(),
      name: newDiscount.name!,
      type: newDiscount.type!,
      value: newDiscount.value!,
      productIds: newDiscount.productIds || [],
      categoryIds: newDiscount.categoryIds || [],
      startDate: newDiscount.startDate!,
      endDate: newDiscount.endDate!,
      active: newDiscount.active!,
      minOrderAmount: newDiscount.minOrderAmount
    };

    setDiscounts([...discounts, discount]);
    setNewDiscount({
      name: '',
      type: 'percentage',
      value: 0,
      productIds: [],
      categoryIds: [],
      startDate: '',
      endDate: '',
      active: true
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Скидка создана",
      description: "Новая скидка успешно добавлена.",
    });
  };

  const handleDeleteDiscount = (id: string) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
    toast({
      title: "Скидка удалена",
      description: "Скидка была успешно удалена.",
    });
  };

  const handleToggleActive = (id: string) => {
    setDiscounts(discounts.map(discount => 
      discount.id === id 
        ? { ...discount, active: !discount.active }
        : discount
    ));
    toast({
      title: "Статус изменен",
      description: "Статус активности скидки изменен.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const formatDiscountValue = (discount: Discount) => {
    return discount.type === 'percentage' 
      ? `${discount.value}%` 
      : `${discount.value.toLocaleString('ru-RU')} ₽`;
  };

  const getDiscountScope = (discount: Discount) => {
    if (discount.productIds.length > 0) {
      return `${discount.productIds.length} товар(ов)`;
    }
    if (discount.categoryIds.length > 0) {
      return `${discount.categoryIds.length} категори(й)`;
    }
    return "Все товары";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                Управление скидками
              </h1>
              <p className="text-lg text-muted-foreground">
                Создавайте и управляйте скидками для товаров
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать скидку
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Создать новую скидку</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Название скидки *</Label>
                    <Input
                      id="name"
                      value={newDiscount.name || ''}
                      onChange={(e) => setNewDiscount({...newDiscount, name: e.target.value})}
                      placeholder="Введите название скидки"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Тип скидки</Label>
                      <Select value={newDiscount.type || 'percentage'} onValueChange={(value) => setNewDiscount({...newDiscount, type: value as 'percentage' | 'fixed'})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Процент (%)</SelectItem>
                          <SelectItem value="fixed">Фиксированная сумма (₽)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value">Размер скидки *</Label>
                      <Input
                        id="value"
                        type="number"
                        value={newDiscount.value || ''}
                        onChange={(e) => setNewDiscount({...newDiscount, value: Number(e.target.value)})}
                        placeholder={newDiscount.type === 'percentage' ? "15" : "5000"}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Дата начала *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newDiscount.startDate || ''}
                        onChange={(e) => setNewDiscount({...newDiscount, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Дата окончания *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newDiscount.endDate || ''}
                        onChange={(e) => setNewDiscount({...newDiscount, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="minOrderAmount">Минимальная сумма заказа</Label>
                    <Input
                      id="minOrderAmount"
                      type="number"
                      value={newDiscount.minOrderAmount || ''}
                      onChange={(e) => setNewDiscount({...newDiscount, minOrderAmount: Number(e.target.value)})}
                      placeholder="50000"
                    />
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleCreateDiscount} className="flex-1">
                      Создать скидку
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                      Отменить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего скидок</p>
                    <p className="text-2xl font-bold text-foreground">{discounts.length}</p>
                  </div>
                  <Percent className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Активные скидки</p>
                    <p className="text-2xl font-bold text-foreground">{discounts.filter(d => d.active).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Средняя скидка</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(discounts.filter(d => d.type === 'percentage').reduce((sum, d) => sum + d.value, 0) / discounts.filter(d => d.type === 'percentage').length || 0)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Истекающие скоро</p>
                    <p className="text-2xl font-bold text-foreground">
                      {discounts.filter(d => {
                        const endDate = new Date(d.endDate);
                        const today = new Date();
                        const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        return diffDays <= 7 && diffDays > 0;
                      }).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск скидок..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Discounts Table */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Размер</TableHead>
                    <TableHead>Область применения</TableHead>
                    <TableHead>Период действия</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiscounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{discount.name}</div>
                          {discount.minOrderAmount && (
                            <div className="text-sm text-muted-foreground">
                              Мин. сумма: {discount.minOrderAmount.toLocaleString('ru-RU')} ₽
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          {formatDiscountValue(discount)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getDiscountScope(discount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(discount.startDate)} - {formatDate(discount.endDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={discount.active ? "default" : "secondary"}>
                          {discount.active ? "Активна" : "Неактивна"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(discount.id)}
                          >
                            {discount.active ? "Деактивировать" : "Активировать"}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteDiscount(discount.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscountManagement;
