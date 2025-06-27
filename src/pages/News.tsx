import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Eye, ArrowRight } from "lucide-react";

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

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'trends', label: 'Тренды' },
    { value: 'tips', label: 'Советы' },
    { value: 'company', label: 'О компании' },
    { value: 'reviews', label: 'Обзоры' }
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: "Тренды мебели 2024: Что будет популярно в новом году",
      excerpt: "Разбираем основные тенденции в мире мебели и дизайна интерьера на 2024 год",
      content: "Полное содержание статьи...",
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
      content: "Полное содержание статьи...",
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
      content: "Полное содержание статьи...",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=400&fit=crop",
      category: "company",
      author: "МебельКрафт",
      publishDate: "2024-01-05",
      views: 756,
      featured: true
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Новости и статьи
            </h1>
            <p className="text-lg text-muted-foreground">
              Последние новости, тренды и полезные советы от экспертов МебельКрафт
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск статей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Рекомендуемые статьи</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="border-0 shadow-soft card-hover overflow-hidden">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary text-white">
                        Рекомендуем
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <Badge variant="secondary">
                          {getCategoryLabel(article.category)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                        <Button variant="ghost" size="sm">
                          Читать <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Все статьи</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="border-0 shadow-soft card-hover overflow-hidden">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <Badge variant="secondary">
                        {getCategoryLabel(article.category)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(article.publishDate)}
                      </div>
                      <Link to={`/news/${article.id}`}>
                        <Button variant="ghost" size="sm">
                          Читать <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Статьи не найдены
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
