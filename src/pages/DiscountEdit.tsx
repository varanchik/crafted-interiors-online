
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
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

const DiscountEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [discount, setDiscount] = useState<Discount | null>(null);

  // Mock data - in real app this would come from API
  const mockDiscounts: Discount[] = [
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
  ];

  useEffect(() => {
    if (id) {
      const foundDiscount = mockDiscounts.find(d => d.id === id);
      if (foundDiscount) {
        setDiscount(foundDiscount);
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!discount) return;

    if (!discount.name || !discount.value || !discount.startDate || !discount.endDate) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }

    // In real app, save to API
    toast({
      title: "Скидка сохранена",
      description: "Изменения успешно сохранены.",
    });

    navigate('/admin/discounts');
  };

  if (!discount) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Скидка не найдена</h1>
            <Link to="/admin/discounts">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к управлению скидками
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin/discounts">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Редактирование скидки
                </h1>
                <p className="text-muted-foreground">
                  Редактируйте параметры скидки
                </p>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-primary text-white">
              Сохранить изменения
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Название скидки *</Label>
                  <Input
                    id="name"
                    value={discount.name}
                    onChange={(e) => setDiscount({...discount, name: e.target.value})}
                    placeholder="Введите название скидки"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Тип скидки</Label>
                    <Select value={discount.type} onValueChange={(value) => setDiscount({...discount, type: value as 'percentage' | 'fixed'})}>
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
                      value={discount.value}
                      onChange={(e) => setDiscount({...discount, value: Number(e.target.value)})}
                      placeholder={discount.type === 'percentage' ? "15" : "5000"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Period */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Период действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Дата начала *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={discount.startDate}
                      onChange={(e) => setDiscount({...discount, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Дата окончания *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={discount.endDate}
                      onChange={(e) => setDiscount({...discount, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="minOrderAmount">Минимальная сумма заказа</Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={discount.minOrderAmount || ''}
                    onChange={(e) => setDiscount({...discount, minOrderAmount: Number(e.target.value)})}
                    placeholder="50000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={discount.active}
                    onCheckedChange={(checked) => setDiscount({...discount, active: checked})}
                  />
                  <Label>Активная скидка</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountEdit;
