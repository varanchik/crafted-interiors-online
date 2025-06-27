
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, X } from "lucide-react";
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

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = [
    { value: 'trends', label: 'Тренды' },
    { value: 'tips', label: 'Советы' },
    { value: 'company', label: 'О компании' },
    { value: 'reviews', label: 'Обзоры' }
  ];

  // Mock data - in real app this would come from API
  const mockArticles: Article[] = [
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
  ];

  useEffect(() => {
    if (id) {
      const foundArticle = mockArticles.find(a => a.id === id);
      if (foundArticle) {
        setArticle(foundArticle);
        setImagePreview(foundArticle.image);
      }
    }
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (article) {
      setArticle({ ...article, image: '' });
    }
  };

  const handleSave = () => {
    if (!article) return;

    if (!article.title || !article.excerpt || !article.content) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }

    // In real app, save to API
    toast({
      title: "Статья сохранена",
      description: "Изменения успешно сохранены.",
    });

    navigate('/admin/news');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
            <Link to="/admin/news">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Вернуться к управлению новостями
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin/news">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Редактирование статьи
                </h1>
                <p className="text-muted-foreground">
                  Редактируйте содержимое статьи
                </p>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-primary text-white">
              Сохранить изменения
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    value={article.title}
                    onChange={(e) => setArticle({...article, title: e.target.value})}
                    placeholder="Введите заголовок статьи"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Краткое описание *</Label>
                  <Textarea
                    id="excerpt"
                    value={article.excerpt}
                    onChange={(e) => setArticle({...article, excerpt: e.target.value})}
                    placeholder="Краткое описание статьи"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Содержание *</Label>
                  <Textarea
                    id="content"
                    value={article.content}
                    onChange={(e) => setArticle({...article, content: e.target.value})}
                    placeholder="Полное содержание статьи"
                    className="min-h-48"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Изображение статьи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Нажмите для загрузки изображения</p>
                      <p className="text-sm text-gray-500">PNG, JPG до 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {imagePreview ? 'Изменить изображение' : 'Загрузить изображение'}
                      </span>
                    </Button>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select value={article.category} onValueChange={(value) => setArticle({...article, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
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
                <div>
                  <Label htmlFor="author">Автор</Label>
                  <Input
                    id="author"
                    value={article.author}
                    onChange={(e) => setArticle({...article, author: e.target.value})}
                    placeholder="Имя автора"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={article.featured}
                    onCheckedChange={(checked) => setArticle({...article, featured: checked})}
                  />
                  <Label>Рекомендуемая статья</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={article.published}
                    onCheckedChange={(checked) => setArticle({...article, published: checked})}
                  />
                  <Label>Опубликовать</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEdit;
