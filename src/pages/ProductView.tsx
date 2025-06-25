
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";

const ProductView = () => {
  const { id } = useParams();

  // Mock data - в реальном приложении данные приходили бы из API
  const product = {
    id: 1,
    name: "Дубовый обеденный стол",
    price: 89900,
    category: "Столы",
    description: "Элегантный обеденный стол из массива дуба ручной работы. Изготовлен с применением традиционных столярных техник и покрыт натуральным маслом для дерева. Стол рассчитан на 6-8 человек и идеально подходит для семейных ужинов и торжественных мероприятий.",
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop",
    status: "Активный",
    stock: 5,
    dimensions: "180 x 90 x 75 см",
    material: "Массив дуба",
    weight: "45 кг",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15"
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к админке
                </Button>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Просмотр товара</h1>
            </div>
            <Link to={`/admin/product/${id}/edit`}>
              <Button className="btn-primary">
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-serif">{product.name}</CardTitle>
                  <Badge className={product.status === 'Активный' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {product.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Основная информация</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">ID:</span>
                      <span className="ml-2">{product.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Категория:</span>
                      <span className="ml-2">{product.category}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Цена:</span>
                      <span className="ml-2 font-semibold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Остаток:</span>
                      <span className="ml-2">{product.stock} шт.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Характеристики</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Размеры:</span>
                      <span className="ml-2">{product.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Материал:</span>
                      <span className="ml-2">{product.material}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="ml-2">{product.weight}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Даты</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Создан:</span>
                      <span className="ml-2">
                        {new Date(product.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Обновлен:</span>
                      <span className="ml-2">
                        {new Date(product.updatedAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
