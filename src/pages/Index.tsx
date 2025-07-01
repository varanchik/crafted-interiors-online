
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Truck, Shield, Users } from "lucide-react";

const Index = () => {
  const categories = [
    {
      name: "Столы",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      count: "25+ товаров"
    },
    {
      name: "Стулья",
      image: "https://images.unsplash.com/photo-1587993844043-c8f2f12b8b5c?w=800&h=600&fit=crop",
      count: "30+ товаров"
    },
    {
      name: "Шкафы",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
      count: "15+ товаров"
    }
  ];

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Быстрая доставка",
      description: "Бесплатная доставка в течение 7-14 дней"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Гарантия 5 лет",
      description: "Гарантия качества на все изделия"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Индивидуальный дизайн",
      description: "Создаем по вашим точным требованиям"
    }
  ];

  const testimonials = [
    {
      name: "Анна Петрова",
      rating: 5,
      text: "Великолепный обеденный стол на заказ! Качество исключительное, идеально подошел к нашему интерьеру.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Михаил Сидоров",
      rating: 5,
      text: "Профессиональный сервис от начала до конца. Команда учла все наши пожелания и превзошла ожидания.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Елена Козлова",
      rating: 5,
      text: "Шкаф на заказ преобразил нашу спальню. Качественные материалы и прекрасная отделка.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-beige-light to-beige-default py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  ✨ Мебель на заказ
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  Создайте идеальное
                  <span className="text-primary block">пространство</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Преобразите ваш дом с помощью нашей эксклюзивной мебели. Каждое изделие тщательно изготавливается по вашим точным требованиям из премиальных материалов с использованием традиционных техник.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/catalog">
                  <Button size="lg" className="btn-primary group">
                    Смотреть каталог
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="btn-secondary">
                    Заказать расчет
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
                alt="Красивая мебель на заказ в современной гостиной"
                className="rounded-2xl shadow-soft-lg w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-soft">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-primary rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">500+ довольных клиентов</p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 fill-white-400 text-white-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Популярные категории
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Откройте нашу тщательно подобранную коллекцию мебели на заказ, созданную для улучшения вашего жилого пространства.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to="/catalog" className="group">
                <Card className="overflow-hidden border-0 shadow-soft card-hover bg-white">
                  <div className="relative h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-serif font-semibold text-2xl mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Отзывы наших клиентов
            </h2>
            <p className="text-lg text-muted-foreground">
              Реальные истории довольных клиентов, которые любят свою мебель на заказ
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-white-400 text-white-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">Проверенный клиент</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold">
              Готовы создать мебель своей мечты?
            </h2>
            <p className="text-lg opacity-90">
              Позвольте нашим опытным мастерам воплотить ваше видение в жизнь с помощью мебели на заказ, которая идеально подходит вашему пространству и стилю.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Бесплатная консультация
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Смотреть коллекцию
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
