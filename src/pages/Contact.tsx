
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Сообщение отправлено",
      description: "Спасибо за ваш запрос. Мы свяжемся с вами в течение 24 часов.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      projectType: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Телефон",
      info: "+7 (495) 123-45-67",
      description: "Пн-Пт, 9:00 - 18:00"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      info: "info@mebelkraft.ru",
      description: "Отвечаем в течение 24 часов"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Посетите наш шоурум",
      info: "г. Москва, ул. Мебельная, д. 123",
      description: "Только по предварительной записи"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Часы работы",
      info: "Пн-Пт: 9:00 - 18:00",
      description: "Сб: 10:00 - 16:00, Вс: выходной"
    }
  ];

  const faqs = [
    {
      question: "Сколько времени занимает изготовление мебели на заказ?",
      answer: "Большинство изделий на заказ изготавливается за 4-8 недель, в зависимости от сложности и текущей загрузки. Мы предоставим подробный график во время консультации."
    },
    {
      question: "Предоставляете ли вы доставку и установку?",
      answer: "Да, мы предлагаем бесплатную доставку в пределах 50 км и можем помочь с установкой за дополнительную плату. На большие расстояния организуем транспортировку."
    },
    {
      question: "С какими видами древесины вы работаете?",
      answer: "Мы работаем с различными экологически чистыми твердыми породами дерева, включая дуб, орех, вишню, клен и красное дерево. Также можем найти специальные породы по запросу."
    },
    {
      question: "Можете ли вы подобрать цвет под существующую мебель?",
      answer: "Конечно! Мы можем подобрать морилки, покрытия и стили, чтобы дополнить вашу существующую мебель."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-beige-light to-beige-default">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Свяжитесь с нами
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Давайте создадим что-то
              <span className="text-primary block">прекрасное вместе</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Готовы преобразить ваше пространство мебелью на заказ? Мы будем рады услышать о вашем проекте и помочь воплотить ваше видение в жизнь.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-soft-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                        Отправьте нам сообщение
                      </h2>
                      <p className="text-muted-foreground">
                        Расскажите нам о вашем проекте, и мы вернемся к вам с подробным предложением.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Полное имя *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Иван Иванов"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email адрес *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="ivan@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Номер телефона</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+7 (495) 123-45-67"
                          />
                        </div>
                        <div>
                          <Label htmlFor="projectType">Тип проекта</Label>
                          <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип проекта" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="table">Стол</SelectItem>
                              <SelectItem value="chair">Стулья и кресла</SelectItem>
                              <SelectItem value="wardrobe">Шкафы и системы хранения</SelectItem>
                              <SelectItem value="multiple">Несколько изделий</SelectItem>
                              <SelectItem value="other">Другое</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Тема *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Запрос на изготовление обеденного стола"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Детали проекта *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Расскажите нам о вашем проекте, включая размеры, стилевые предпочтения, сроки и бюджет..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="btn-primary w-full">
                        Отправить сообщение
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-6">Контактная информация</h3>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-foreground text-sm mb-1">{item.info}</p>
                          <p className="text-muted-foreground text-xs">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-4">Следите за нами</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-4">Записаться на консультацию</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Запланируйте бесплатную консультацию для детального обсуждения вашего проекта.
                  </p>
                  <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 w-full">
                    Записаться сейчас
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-soft overflow-hidden">
            <div className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <h3 className="font-semibold text-lg">Посетите наш шоурум</h3>
                <p className="text-muted-foreground">г. Москва, ул. Мебельная, д. 123</p>
                <p className="text-sm text-muted-foreground">Только по предварительной записи</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
                Часто задаваемые вопросы
              </h2>
              <p className="text-lg text-muted-foreground">
                Популярные вопросы о процессе изготовления мебели на заказ
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-soft bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
