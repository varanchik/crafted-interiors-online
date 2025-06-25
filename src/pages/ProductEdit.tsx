
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - в реальном приложении данные приходили бы из API
  const [product, setProduct] = useState({
    name: "Дубовый обеденный стол",
    price: "89900",
    category: "tables",
    description: "Элегантный обеденный стол из массива дуба ручной работы. Изготовлен с применением традиционных столярных техник и покрыт натуральным маслом для дерева.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop",
    stock: "5",
    dimensions: "180 x 90 x 75 см",
    material: "Массив дуба",
    weight: "45"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Товар обновлен",
      description: "Изменения успешно сохранены.",
    });
    navigate(`/admin/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to={`/admin/product/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к товару
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold">Редактирование товара</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Image Preview */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Изображение товара</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        value={product.image}
                        onChange={(e) => setProduct(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Details Form */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Информация о товаре</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Название товара *</Label>
                    <Input
                      id="name"
                      value={product.name}
                      onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Цена (₽) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Количество на складе</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={product.stock}
                        onChange={(e) => setProduct(prev => ({ ...prev, stock: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Категория *</Label>
                    <Select value={product.category} onValueChange={(value) => setProduct(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tables">Столы</SelectItem>
                        <SelectItem value="chairs">Стулья</SelectItem>
                        <SelectItem value="storage">Хранение</SelectItem>
                        <SelectItem value="wardrobes">Шкафы</SelectItem>
                        <SelectItem value="beds">Кровати</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                      id="description"
                      value={product.description}
                      onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Details */}
            <Card className="border-0 shadow-soft mt-8">
              <CardHeader>
                <CardTitle>Дополнительные характеристики</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dimensions">Размеры</Label>
                    <Input
                      id="dimensions"
                      value={product.dimensions}
                      onChange={(e) => setProduct(prev => ({ ...prev, dimensions: e.target.value }))}
                      placeholder="180 x 90 x 75 см"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material">Материал</Label>
                    <Input
                      id="material"
                      value={product.material}
                      onChange={(e) => setProduct(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="Массив дуба"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={product.weight}
                      onChange={(e) => setProduct(prev => ({ ...prev, weight: e.target.value }))}
                      placeholder="45"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Link to={`/admin/product/${id}`}>
                    <Button variant="outline">
                      Отменить
                    </Button>
                  </Link>
                  <Button type="submit" className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
