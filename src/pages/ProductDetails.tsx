
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { ProductReviews } from "@/components/ProductReviews";
import { CustomOrderForm } from "@/components/CustomOrderForm";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isInFavorites } = useFavorites();
  const { addItem: addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would come from API
  const product = {
    id: id || '1',
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
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в вашу корзину.`,
    });
  };

  const handleToggleFavorite = () => {
    if (isInFavorites(product.id)) {
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
        image: product.images[0]
      });
      toast({
        title: "Добавлено в избранное",
        description: `${product.name} добавлен в избранное.`,
      });
    }
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
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            customizable={product.customizable}
          />

          <ProductInfo
            product={product}
            isFavorite={isInFavorites(product.id)}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
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
              <CustomOrderForm />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <ProductReviews reviews={reviews} onReviewsUpdate={setReviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
