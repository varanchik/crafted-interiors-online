
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, Share2, Ruler, Truck, Shield, ArrowLeft, Reply, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [customDimensions, setCustomDimensions] = useState({
    width: '',
    height: '',
    depth: ''
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id || '1'),
    name: "Дубовый обеденный стол",
    price: 89900,
    originalPrice: 109900,
    category: "Столы",
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
    ],
    description: "Этот обеденный стол ручной работы из массива дуба представляет собой идеальное сочетание традиционного мастерства и современного дизайна. Каждое изделие тщательно изготавливается из экологически чистого дуба, демонстрируя красивые естественные узоры древесины, которые делают каждый стол уникальным.",
    features: [
      "Конструкция из массива дуба",
      "Натуральное масляное покрытие",
      "Рассчитан на 6-8 человек",
      "Ручная работа опытных мастеров",
      "Экологически чистые материалы",
      "Гарантия 5 лет"
    ],
    specifications: {
      material: "Массив дуба",
      dimensions: "198 см Д x 91 см Ш x 76 см В",
      weight: "54 кг",
      finish: "Натуральное масляное покрытие",
      assembly: "Минимальная сборка"
    },
    rating: 4.8,
    reviews: 24,
    inStock: true,
    customizable: true
  };

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Анна Иванова",
      rating: 5,
      date: "2024-01-15",
      comment: "Абсолютно восхищена этим столом! Качество исключительное и он идеально подходит для нашей столовой. Дуб красивый, а мастерство на высшем уровне.",
      verified: true,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      replies: [
        {
          id: 101,
          name: "Администратор",
          comment: "Спасибо за отзыв! Рады, что наш стол вам понравился.",
          date: "2024-01-16"
        }
      ]
    },
    {
      id: 2,
      name: "Михаил Петров",
      rating: 5,
      date: "2024-01-10",
      comment: "Выдающееся качество и сервис. Команда очень помогла с настройкой размеров под наше пространство.",
      verified: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      replies: []
    },
    {
      id: 3,
      name: "Елена Сидорова",
      rating: 4,
      date: "2024-01-05",
      comment: "Красивый стол с отличной отделкой. Доставка была быстрой, а упаковка очень надежной.",
      verified: true,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      replies: []
    }
  ]);

  const handleAddToCart = () => {
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину.`,
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Удалено из избранного",
        description: `${product.name} удален из избранного.`,
      });
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
      toast({
        title: "Добавлено в избранное",
        description: `${product.name} добавлен в избранное.`,
      });
    }
  };

  const handleCustomOrder = () => {
    if (!customDimensions.width || !customDimensions.height || !customDimensions.depth) {
      toast({
        title: "Не указаны размеры",
        description: "Пожалуйста, укажите все размеры.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Заказ на изготовление отправлен",
      description: "Мы свяжемся с вами в течение 24 часов с предложением.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast({
        title: "Файл прикреплен",
        description: `Файл ${file.name} успешно прикреплен.`,
      });
    }
  };

  const handleReply = (reviewId: number) => {
    if (!replyText.trim()) return;

    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? {
            ...review,
            replies: [...review.replies, {
              id: Date.now(),
              name: "Гость",
              comment: replyText,
              date: new Date().toISOString().split('T')[0]
            }]
          }
        : review
    ));

    setReplyText("");
    setReplyingTo(null);
    toast({
      title: "Ответ отправлен",
      description: "Ваш ответ добавлен к комментарию.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/catalog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Назад к каталогу</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-soft"
              />
              {product.customizable && (
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Под заказ
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i <= Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} отзывов)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Ключевые особенности</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button onClick={handleAddToCart} className="btn-primary flex-1">
                  В корзину - {product.price.toLocaleString('ru-RU')} ₽
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={isFavorite(product.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {product.customizable && (
                <Button variant="outline" className="w-full">
                  <Ruler className="h-4 w-4 mr-2" />
                  Заказать с индивидуальными размерами
                </Button>
              )}
            </div>

            {/* Shipping Info */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Бесплатная доставка в течение 7-14 рабочих дней</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Гарантия 5 лет включена</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="custom-order">Индивидуальный заказ</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium">{key === 'material' ? 'Материал' : key === 'dimensions' ? 'Размеры' : key === 'weight' ? 'Вес' : key === 'finish' ? 'Отделка' : 'Сборка'}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="custom-order" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Заказать индивидуальные размеры</h3>
                      <p className="text-muted-foreground mb-6">
                        Мы можем изготовить это изделие под ваши точные требования. Пожалуйста, укажите желаемые размеры ниже.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="width">Ширина (см)</Label>
                        <Input
                          id="width"
                          placeholder="198"
                          value={customDimensions.width}
                          onChange={(e) => setCustomDimensions(prev => ({ ...prev, width: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Высота (см)</Label>
                        <Input
                          id="height"
                          placeholder="76"
                          value={customDimensions.height}
                          onChange={(e) => setCustomDimensions(prev => ({ ...prev, height: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="depth">Глубина (см)</Label>
                        <Input
                          id="depth"
                          placeholder="91"
                          value={customDimensions.depth}
                          onChange={(e) => setCustomDimensions(prev => ({ ...prev, depth: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Дополнительные пожелания</Label>
                      <Textarea
                        id="notes"
                        placeholder="Любые особые требования или предпочтения..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="attachment">Прикрепить файл</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Input
                          id="attachment"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </div>
                      {attachedFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Прикреплен: {attachedFile.name}
                        </p>
                      )}
                    </div>
                    
                    <Button onClick={handleCustomOrder} className="btn-primary">
                      Отправить запрос на изготовление
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i <= review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Проверенная покупка
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{review.comment}</p>

                          {/* Replies */}
                          {review.replies.length > 0 && (
                            <div className="ml-4 space-y-3 mb-3">
                              {review.replies.map((reply) => (
                                <div key={reply.id} className="bg-muted p-3 rounded-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm">{reply.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(reply.date).toLocaleDateString('ru-RU')}
                                    </span>
                                  </div>
                                  <p className="text-sm">{reply.comment}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Form */}
                          {replyingTo === review.id ? (
                            <div className="ml-4 space-y-3">
                              <Textarea
                                placeholder="Ваш ответ..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-20"
                              />
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleReply(review.id)}
                                  className="btn-primary"
                                >
                                  Отправить
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                  }}
                                >
                                  Отмена
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setReplyingTo(review.id)}
                              className="ml-4"
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Ответить
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
