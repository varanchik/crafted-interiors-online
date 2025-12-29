import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, Star, Share2, Check } from 'lucide-react';
import { getFacadeById } from '@/data/facades';
import { FacadeCalculator } from '@/components/facades/FacadeCalculator';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';

const FacadeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isInFavorites } = useFavorites();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  const facade = getFacadeById(id || '');

  if (!facade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Фасад не найден</h1>
          <Link to="/facades">
            <Button>Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = isInFavorites(facade.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(facade.id);
      toast({
        title: "Удалено из избранного",
        description: `${facade.name} удален из избранного.`,
      });
    } else {
      addToFavorites({
        id: facade.id,
        name: facade.name,
        price: facade.pricePerSquareMeter,
        image: facade.images[0],
      });
      toast({
        title: "Добавлено в избранное",
        description: `${facade.name} добавлен в избранное.`,
      });
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: facade.name,
        text: facade.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на фасад скопирована в буфер обмена.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/facades">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад в каталог
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                {!facade.inStock && (
                  <Badge className="absolute top-4 left-4 z-10 bg-muted text-muted-foreground">
                    Нет в наличии
                  </Badge>
                )}
                {facade.featured && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground">
                    Популярный
                  </Badge>
                )}
                <img
                  src={facade.images[selectedImage]}
                  alt={facade.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {facade.images.length > 1 && (
                <div className="flex gap-2">
                  {facade.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-muted-foreground'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${facade.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info & Calculator */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-serif font-bold text-foreground">
                    {facade.name}
                  </h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i <= Math.floor(facade.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-muted-foreground">
                      {facade.rating} ({facade.reviews} отзывов)
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {facade.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{facade.material}</Badge>
                  <Badge variant="outline">Толщина: {facade.thickness} мм</Badge>
                  {facade.coatings.map((coating) => (
                    <Badge key={coating} variant="outline">{coating}</Badge>
                  ))}
                </div>

                <div className="text-2xl font-bold text-primary mb-2">
                  от {facade.pricePerSquareMeter.toLocaleString('ru-RU')} ₽/м²
                </div>
              </div>

              {/* Calculator */}
              <FacadeCalculator facade={facade} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="colors">Палитра цветов</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Материал</span>
                        <span className="font-medium">{facade.material}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Толщина</span>
                        <span className="font-medium">{facade.thickness} мм</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Покрытия</span>
                        <span className="font-medium">{facade.coatings.join(', ')}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Варианты кромки</span>
                        <span className="font-medium">{facade.edgeOptions.join(', ')}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Количество цветов</span>
                        <span className="font-medium">{facade.colors.length}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Наличие</span>
                        <span className={`font-medium ${facade.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {facade.inStock ? 'В наличии' : 'Под заказ'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="description" className="mt-6">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">
                    {facade.fullDescription}
                  </p>
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Высокое качество материалов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Индивидуальный раскрой по размерам</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Гарантия от производителя</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Доставка по всей России</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="colors" className="mt-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Доступные цвета ({facade.colors.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {facade.colors.map((color) => (
                      <div key={color.id} className="text-center">
                        <div
                          className="w-12 h-12 mx-auto rounded-full border-2 border-border shadow-sm mb-2"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FacadeDetails;
