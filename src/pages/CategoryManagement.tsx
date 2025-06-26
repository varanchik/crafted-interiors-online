
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Edit, Trash2, FolderPlus, Folder, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productsCount: number;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  categoryId: number;
  productsCount: number;
}

const CategoryManagement = () => {
  const { toast } = useToast();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    description: '',
    categoryId: 0
  });

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Столы",
      slug: "tables",
      description: "Обеденные столы, журнальные столики, рабочие столы",
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
      productsCount: 15,
      subcategories: [
        { id: 1, name: "Обеденные столы", slug: "dining-tables", description: "Столы для столовой", categoryId: 1, productsCount: 8 },
        { id: 2, name: "Журнальные столы", slug: "coffee-tables", description: "Небольшие столики", categoryId: 1, productsCount: 4 },
        { id: 3, name: "Рабочие столы", slug: "desk-tables", description: "Столы для работы", categoryId: 1, productsCount: 3 }
      ]
    },
    {
      id: 2,
      name: "Стулья",
      slug: "chairs",
      description: "Обеденные стулья, кресла, барные стулья",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
      productsCount: 18,
      subcategories: [
        { id: 4, name: "Обеденные стулья", slug: "dining-chairs", description: "Стулья для столовой", categoryId: 2, productsCount: 12 },
        { id: 5, name: "Кресла", slug: "armchairs", description: "Удобные кресла", categoryId: 2, productsCount: 6 }
      ]
    },
    {
      id: 3,
      name: "Хранение",
      slug: "storage",
      description: "Шкафы, комоды, полки для хранения",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      productsCount: 12,
      subcategories: [
        { id: 6, name: "Шкафы", slug: "wardrobes", description: "Шкафы для одежды", categoryId: 3, productsCount: 5 },
        { id: 7, name: "Комоды", slug: "chests", description: "Комоды и тумбы", categoryId: 3, productsCount: 4 },
        { id: 8, name: "Полки", slug: "shelves", description: "Настенные и напольные полки", categoryId: 3, productsCount: 3 }
      ]
    }
  ]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const category: Category = {
      id: Date.now(),
      name: newCategory.name,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      description: newCategory.description,
      image: newCategory.image,
      productsCount: 0,
      subcategories: []
    };
    
    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '', image: '' });
    setIsAddCategoryOpen(false);
    toast({
      title: "Категория добавлена",
      description: `Категория "${category.name}" успешно создана.`,
    });
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    const subcategory: Subcategory = {
      id: Date.now(),
      name: newSubcategory.name,
      slug: newSubcategory.name.toLowerCase().replace(/\s+/g, '-'),
      description: newSubcategory.description,
      categoryId: newSubcategory.categoryId,
      productsCount: 0
    };

    setCategories(categories.map(cat => 
      cat.id === newSubcategory.categoryId 
        ? { ...cat, subcategories: [...(cat.subcategories || []), subcategory] }
        : cat
    ));

    setNewSubcategory({ name: '', description: '', categoryId: 0 });
    setIsAddSubcategoryOpen(false);
    toast({
      title: "Подкатегория добавлена",
      description: `Подкатегория "${subcategory.name}" успешно создана.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Категория удалена",
      description: "Категория успешно удалена.",
    });
  };

  const handleDeleteSubcategory = (categoryId: number, subcategoryId: number) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subcategories: cat.subcategories?.filter(sub => sub.id !== subcategoryId) }
        : cat
    ));
    toast({
      title: "Подкатегория удалена",
      description: "Подкатегория успешно удалена.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к админке
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold">Управление категориями</h1>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего категорий</p>
                    <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                  </div>
                  <Folder className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего подкатегорий</p>
                    <p className="text-2xl font-bold text-foreground">
                      {categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0)}
                    </p>
                  </div>
                  <Tag className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего товаров</p>
                    <p className="text-2xl font-bold text-foreground">
                      {categories.reduce((acc, cat) => acc + cat.productsCount, 0)}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="categories">Категории</TabsTrigger>
              <TabsTrigger value="subcategories">Подкатегории</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Основные категории</CardTitle>
                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button className="btn-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить категорию
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Новая категория</DialogTitle>
                        <DialogDescription>
                          Создайте новую категорию товаров
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                        <div>
                          <Label htmlFor="category-name">Название категории *</Label>
                          <Input
                            id="category-name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Название категории"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-description">Описание</Label>
                          <Textarea
                            id="category-description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Описание категории"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-image">URL изображения</Label>
                          <Input
                            id="category-image"
                            value={newCategory.image}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="flex-1">Создать</Button>
                          <Button type="button" variant="outline" onClick={() => setIsAddCategoryOpen(false)} className="flex-1">
                            Отмена
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <Card key={category.id} className="border-2">
                        <CardContent className="p-0">
                          {category.image && (
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                          )}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{category.name}</h3>
                              <Badge variant="secondary">{category.productsCount} товаров</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                            <div className="text-sm text-muted-foreground mb-4">
                              Подкатегорий: {category.subcategories?.length || 0}
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="h-4 w-4 mr-1" />
                                Изменить
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteCategory(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subcategories" className="mt-8">
              <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Подкатегории</CardTitle>
                  <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
                    <DialogTrigger asChild>
                      <Button className="btn-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить подкатегорию
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Новая подкатегория</DialogTitle>
                        <DialogDescription>
                          Создайте новую подкатегорию
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddSubcategory} className="space-y-4">
                        <div>
                          <Label htmlFor="parent-category">Родительская категория *</Label>
                          <select
                            id="parent-category"
                            value={newSubcategory.categoryId}
                            onChange={(e) => setNewSubcategory(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value={0}>Выберите категорию</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="subcategory-name">Название подкатегории *</Label>
                          <Input
                            id="subcategory-name"
                            value={newSubcategory.name}
                            onChange={(e) => setNewSubcategory(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Название подкатегории"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="subcategory-description">Описание</Label>
                          <Textarea
                            id="subcategory-description"
                            value={newSubcategory.description}
                            onChange={(e) => setNewSubcategory(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Описание подкатегории"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="flex-1">Создать</Button>
                          <Button type="button" variant="outline" onClick={() => setIsAddSubcategoryOpen(false)} className="flex-1">
                            Отмена
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Подкатегория</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead>Товаров</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map(category => 
                        category.subcategories?.map(subcategory => (
                          <TableRow key={subcategory.id}>
                            <TableCell className="font-medium">{subcategory.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{category.name}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{subcategory.description}</TableCell>
                            <TableCell>{subcategory.productsCount}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
