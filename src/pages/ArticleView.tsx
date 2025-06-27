
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye, User } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  views: number;
  featured: boolean;
}

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  const categories = [
    { value: 'trends', label: 'Тренды' },
    { value: 'tips', label: 'Советы' },
    { value: 'company', label: 'О компании' },
    { value: 'reviews', label: 'Обзоры' }
  ];

  // Mock data - in real app this would come from API
  const articles: Article[] = [
    {
      id: "1",
      title: "Тренды мебели 2024: Что будет популярно в новом году",
      excerpt: "Разбираем основные тенденции в мире мебели и дизайна интерьера на 2024 год",
      content: `<p>2024 год обещает стать революционным в мире мебели и дизайна интерьера. Мы проанализировали основные тенденции, которые будут определять облик наших домов в ближайшие месяцы.</p>

<h2>Экологичность и устойчивость</h2>
<p>Основным трендом 2024 года становится экологическая осознанность. Потребители все чаще выбирают мебель из переработанных материалов, натурального дерева с сертификацией FSC и других экологически чистых компонентов.</p>

<h2>Мультифункциональность</h2>
<p>В условиях уменьшающихся жилых площадей особую популярность приобретает мебель-трансформер. Столы, которые превращаются в рабочие места, диваны с дополнительными местами для хранения, кровати с встроенными шкафами - все это позволяет максимально эффективно использовать пространство.</p>

<h2>Натуральные материалы</h2>
<p>Дерево, камень, металл и другие природные материалы остаются в тренде. Особенно популярны необработанные текстуры, которые подчеркивают естественную красоту материала.</p>

<h2>Цветовые решения</h2>
<p>В 2024 году доминируют теплые, земляные тона: терракотовый, оливковый, песочный. Эти цвета создают ощущение уюта и гармонии с природой.</p>`,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: "trends",
      author: "Анна Дизайнова",
      publishDate: "2024-01-15",
      views: 1245,
      featured: true
    },
    {
      id: "2",
      title: "Как выбрать идеальный обеденный стол",
      excerpt: "Подробное руководство по выбору стола для вашей кухни или столовой",
      content: `<p>Выбор обеденного стола - это важное решение, которое влияет на функциональность и атмосферу вашего дома. Правильно подобранный стол станет центром семейных трапез и встреч с друзьями на долгие годы.</p>

<h2>Определение размера</h2>
<p>Первое, что нужно учесть - это размер помещения и количество людей, которые будут регулярно пользоваться столом. Стандартная ширина стола составляет 80-100 см, а длина зависит от количества посадочных мест.</p>

<h2>Выбор материала</h2>
<p>Массив дерева остается классическим и наиболее популярным выбором. Дубовые столы отличаются особой прочностью и красотой текстуры. Также популярны столы из ореха, ясеня и березы.</p>

<h2>Форма стола</h2>
<p>Прямоугольные столы подходят для больших семей и просторных помещений. Круглые столы создают более интимную атмосферу и подходят для небольших компаний. Овальные столы сочетают преимущества обеих форм.</p>`,
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=400&fit=crop",
      category: "tips",
      author: "Михаил Столяров",
      publishDate: "2024-01-10",
      views: 987,
      featured: false
    },
    {
      id: "3",
      title: "Наша новая коллекция мебели из массива дуба",
      excerpt: "Представляем эксклюзивную коллекцию мебели ручной работы из натурального дуба",
      content: `<p>С гордостью представляем нашу новую коллекцию мебели из массива дуба - результат многомесячной работы наших лучших мастеров и дизайнеров.</p>

<h2>О коллекции</h2>
<p>Коллекция включает в себя обеденные столы, стулья, комоды, шкафы и другие предметы мебели, выполненные в едином стиле. Каждое изделие создается вручную из отборного дубового массива возрастом не менее 80 лет.</p>

<h2>Особенности производства</h2>
<p>Все изделия проходят специальную обработку, которая подчеркивает естественную красоту древесины и обеспечивает долговечность мебели. Используются только экологически чистые лаки и пропитки.</p>

<h2>Гарантия качества</h2>
<p>На всю мебель из новой коллекции предоставляется расширенная гарантия 10 лет. Мы уверены в качестве наших изделий и готовы нести за них полную ответственность.</p>`,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
      category: "company",
      author: "МебельКрафт",
      publishDate: "2024-01-05",
      views: 756,
      featured: true
    }
  ];

  useEffect(() => {
    const foundArticle = articles.find(a => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      // Increment views in real app
    }
  }, [id]);

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
            <Link to="/news">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к новостям
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
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/news">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к новостям
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline">{getCategoryLabel(article.category)}</Badge>
              {article.featured && (
                <Badge className="bg-primary text-white">Рекомендуем</Badge>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{article.views} просмотров</span>
              </div>
            </div>
          </div>

          {/* Article Image */}
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          {/* Back to News */}
          <div className="mt-8 text-center">
            <Link to="/news">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к новостям
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
