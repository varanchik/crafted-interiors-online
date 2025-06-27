
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  published: boolean;
}

const NewsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'trends', label: 'Тренды' },
    { value: 'tips', label: 'Советы' },
    { value: 'company', label: 'О компании' },
    { value: 'reviews', label: 'Обзоры' }
  ];

  const [articles, setArticles] = useState<Article[]>([
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
      featured: true,
      published: true
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
      featured: false,
      published: true
    }
  ]);

  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'tips',
    author: '',
    featured: false,
    published: false
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateArticle = () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.content) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }

    const article: Article = {
      id: Date.now().toString(),
      title: newArticle.title!,
      excerpt: newArticle.excerpt!,
      content: newArticle.content!,
      image: newArticle.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      category: newArticle.category!,
      author: newArticle.author || "Администратор",
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      featured: newArticle.featured!,
      published: newArticle.published!
    };

    setArticles([...articles, article]);
    setNewArticle({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      category: 'tips',
      author: '',
      featured: false,
      published: false
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Статья создана",
      description: "Новая статья успешно добавлена.",
    });
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Статья удалена",
      description: "Статья была успешно удалена.",
    });
  };

  const handleTogglePublished = (id: string) => {
    setArticles(articles.map(article => 
      article.id === id 
        ? { ...article, published: !article.published }
        : article
    ));
    toast({
      title: "Статус изменен",
      description: "Статус публикации статьи изменен.",
    });
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                Управление новостями
              </h1>
              <p className="text-lg text-muted-foreground">
                Создавайте и редактируйте статьи и новости
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать статью
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Создать новую статью</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заголовок *</Label>
                    <Input
                      id="title"
                      value={newArticle.title || ''}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      placeholder="Введите заголовок статьи"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Краткое описание *</Label>
                    <Textarea
                      id="excerpt"
                      value={newArticle.excerpt || ''}
                      onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                      placeholder="Краткое описание статьи"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Содержание *</Label>
                    <Textarea
                      id="content"
                      value={newArticle.content || ''}
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      placeholder="Полное содержание статьи"
                      className="min-h-32"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">URL изображения</Label>
                    <Input
                      id="image"
                      value={newArticle.image || ''}
                      onChange={(e) => setNewArticle({...newArticle, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Категория</Label>
                    <Select value={newArticle.category || 'tips'} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat.value !== 'all').map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="author">Автор</Label>
                    <Input
                      id="author"
                      value={newArticle.author || ''}
                      onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                      placeholder="Имя автора"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newArticle.featured || false}
                      onCheckedChange={(checked) => setNewArticle({...newArticle, featured: checked})}
                    />
                    <Label>Рекомендуемая статья</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newArticle.published || false}
                      onCheckedChange={(checked) => setNewArticle({...newArticle, published: checked})}
                    />
                    <Label>Опубликовать</Label>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleCreateArticle} className="flex-1">
                      Создать статью
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                      Отменить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего статей</p>
                    <p className="text-2xl font-bold text-foreground">{articles.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Опубликованные</p>
                    <p className="text-2xl font-bold text-foreground">{articles.filter(a => a.published).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Рекомендуемые</p>
                    <p className="text-2xl font-bold text-foreground">{articles.filter(a => a.featured).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего просмотров</p>
                    <p className="text-2xl font-bold text-foreground">{articles.reduce((sum, a) => sum + a.views, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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

          {/* Articles Table */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Статья</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Просмотры</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{article.title}</div>
                            <div className="text-sm text-muted-foreground">{article.excerpt.substring(0, 50)}...</div>
                            {article.featured && (
                              <Badge variant="secondary" className="mt-1">Рекомендуемая</Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getCategoryLabel(article.category)}</Badge>
                      </TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.published ? "default" : "secondary"}>
                          {article.published ? "Опубликована" : "Черновик"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTogglePublished(article.id)}
                          >
                            {article.published ? "Скрыть" : "Опубликовать"}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;
