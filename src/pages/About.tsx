
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Мастерство",
      description: "Каждое изделие создается вручную с вниманием к деталям и страстью к совершенству"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Экологичность",
      description: "Мы используем только экологически чистые материалы и безопасные технологии"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Клиентоориентированность",
      description: "Ваше видение и удовлетворение - основа всего, что мы создаем"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Качество",
      description: "Премиальные материалы и традиционные техники обеспечивают долговечную красоту"
    }
  ];

  const team = [
    {
      name: "Дмитрий Волков",
      role: "Мастер-краснодеревщик и основатель",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "С более чем 25-летним опытом работы с деревом, Дмитрий основал МебельКрафт, чтобы поделиться своей страстью к созданию красивых, функциональных изделий."
    },
    {
      name: "Анна Соколова",
      role: "Главный дизайнер",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Анна привносит современную эстетику в традиционное мастерство, обеспечивая идеальный баланс формы и функции в каждом изделии."
    },
    {
      name: "Михаил Петров",
      role: "Руководитель производства",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Михаил контролирует производственный процесс, обеспечивая соответствие каждого изделия нашим строгим стандартам качества."
    }
  ];

  const stats = [
    { number: "15+", label: "Лет опыта" },
    { number: "500+", label: "Довольных клиентов" },
    { number: "1000+", label: "Изготовленных изделий" },
    { number: "98%", label: "Удовлетворенность клиентов" }
  ];

  const processes = [
    {
      step: "01",
      title: "Дизайн-консультация",
      description: "Мы тесно работаем с вами, чтобы понять ваше видение и требования"
    },
    {
      step: "02",
      title: "Выбор материалов",
      description: "Выберите из нашего премиального ассортимента экологически чистой древесины"
    },
    {
      step: "03",
      title: "Процесс изготовления",
      description: "Наши опытные мастера создают ваше изделие вручную, используя традиционные техники"
    },
    {
      step: "04",
      title: "Контроль качества",
      description: "Каждое изделие проходит строгую проверку качества перед доставкой"
    },
    {
      step: "05",
      title: "Доставка и установка",
      description: "Мы бережно доставляем и можем помочь с установкой вашей новой мебели"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-beige-light to-beige-default">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Наша история
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Создаем красивую мебель
              <span className="text-primary block">с 2009 года</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              То, что началось как небольшая мастерская в гараже, выросло в команду увлеченных мастеров, посвятивших себя созданию мебели, которая рассказывает вашу историю и выдерживает испытание временем.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Наш путь
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  МебельКрафт родился из простого убеждения: мебель должна быть не просто функциональной — она должна быть личной, красивой и созданной на века. Основанная мастером-краснодеревщиком Дмитрием Волковым в 2009 году, наша компания начала с единственной миссии: создавать мебель на заказ, отражающую уникальную индивидуальность и потребности каждого клиента.
                </p>
                <p>
                  За прошедшие годы мы выросли из мастерской одного человека в команду преданных своему делу мастеров, дизайнеров и краснодеревщиков. Несмотря на рост, мы никогда не теряли из виду наши основные ценности: исключительное мастерство, устойчивые практики и персонализированное обслуживание.
                </p>
                <p>
                  Сегодня мы гордимся тем, что создали более 1000 изделий на заказ для семей по всей стране, каждое из которых является свидетельством непреходящей красоты мебели ручной работы.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
                alt="Наша мастерская"
                className="rounded-2xl shadow-soft-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-soft">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Лет совершенства</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Наши ценности
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Эти основные принципы направляют все, что мы делаем, от выбора материалов до доставки готового изделия.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="font-serif font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Познакомьтесь с нашей командой
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Увлеченные мастера, стоящие за каждым красивым изделием, которое мы создаем.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-soft bg-white">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-serif font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Наш процесс
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От первичной консультации до финальной доставки - вот как мы воплощаем ваше видение в жизнь.
            </p>
          </div>
          <div className="space-y-8">
            {processes.map((process, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {process.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-xl mb-2">{process.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold">
              Готовы создать что-то прекрасное?
            </h2>
            <p className="text-lg opacity-90">
              Давайте обсудим ваше видение и создадим индивидуальное изделие, которое идеально впишется в ваше пространство и стиль.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  Начать проект
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Посмотреть наши работы
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
