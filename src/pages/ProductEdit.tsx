
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductImageManager, ProductMedia } from "@/components/ProductImageManager";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

const ProductEdit = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "Дубовый обеденный стол",
    description: "Элегантный обеденный стол из натурального дуба...",
    price: 89900,
    originalPrice: 109900,
    category: "tables",
    subcategory: "dining-tables",
    inStock: true,
    featured: false,
    specifications: "Материал: дуб\nРазмеры: 180x90x75 см\nВес: 45 кг",
    tags: "дуб, стол, обеденный"
  });

  const [media, setMedia] = useState<ProductMedia[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop',
      isPreview: true,
      order: 0,
      alt: 'Дубовый стол'
    }
  ]);

  const categories: Category[] = [
    {
      id: 1,
      name: "Столы",
      slug: "tables",
      subcategories: [
        { id: 1, name: "Обеденные столы", slug: "dining-tables" },
        { id: 2, name: "Журнальные столы", slug: "coffee-tables" },
        { id: 3, name: "Рабочие столы", slug: "desk-tables" }
      ]
    },
    {
      id: 2,
      name: "Стулья",
      slug: "chairs",
      subcategories: [
        { id: 4, name: "Обеденные стулья", slug: "dining-chairs" },
        { id: 5, name: "Кресла", slug: "armchairs" }
      ]
    },
    {
      id: 3,
      name: "Хранение",
      slug: "storage",
      subcategories: [
        { id: 6, name: "Шкафы", slug: "wardrobes" },
        { id: 7, name: "Комоды", slug: "chests" },
        { id: 8, name: "Полки", slug: "shelves" }
      ]
    }
  ];

  const selectedCategory = categories.find(cat => cat.slug === formData.category);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Сохранение товара:', { ...formData, media });
    
    toast({
      title: "Товар обновлен",
      description: "Изменения успешно сохранены.",
    });
  };

  const handleMediaChange = (newMedia: ProductMedia[]) => {
    setMedia(newMedia);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/admin/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                К товарам
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold">
              {id === 'new' ? 'Добавить товар' : 'Редактировать товар'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Название товара</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Теги (через запятую)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="дуб, стол, мебель"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="specifications">Характеристики</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => handleInputChange('specifications', e.target.value)}
                    rows={3}
                    placeholder="Материал: дуб&#10;Размеры: 180x90x75 см&#10;Вес: 45 кг"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Категоризация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Категория</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => {
                        handleInputChange('category', value);
                        handleInputChange('subcategory', '');
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Подкатегория</Label>
                    <Select 
                      value={formData.subcategory} 
                      onValueChange={(value) => handleInputChange('subcategory', value)}
                      disabled={!selectedCategory?.subcategories}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите подкатегорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory?.subcategories?.map(subcategory => (
                          <SelectItem key={subcategory.id} value={subcategory.slug}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Цены и скидки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Цена (₽)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Первоначальная цена (₽)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', Number(e.target.value))}
                      placeholder="Оставьте пустым, если нет скидки"
                    />
                  </div>
                </div>
                {formData.originalPrice && formData.originalPrice > formData.price && (
                  <div className="text-sm text-green-600">
                    Скидка: {Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}%
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Media Management */}
            <ProductImageManager media={media} onChange={handleMediaChange} />

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="inStock">В наличии</Label>
                    <p className="text-sm text-muted-foreground">
                      Товар доступен для заказа
                    </p>
                  </div>
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Рекомендуемый товар</Label>
                    <p className="text-sm text-muted-foreground">
                      Показывать в разделе "Рекомендуем"
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link to="/admin/products">
                <Button variant="outline">Отмена</Button>
              </Link>
              <Button type="submit" className="bg-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                Сохранить товар
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
