
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userFormSchema = z.object({
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Некорректный email адрес"),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 символов"),
  status: z.enum(["Активный", "Заблокирован"]),
  role: z.enum(["Клиент", "Администратор"]),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data - в реальном приложении данные приходили бы из API
  const mockUsers = [
    {
      id: 1,
      firstName: "Иван",
      lastName: "Петров",
      email: "ivan.petrov@example.com",
      phone: "+7 (900) 123-45-67",
      status: "Активный",
      role: "Клиент",
      registeredAt: "2024-01-15",
      lastLogin: "2024-01-20",
      orders: 3,
      totalSpent: 245700
    },
    {
      id: 2,
      firstName: "Анна",
      lastName: "Сидорова",
      email: "anna.sidorova@example.com",
      phone: "+7 (900) 234-56-78",
      status: "Активный",
      role: "Клиент",
      registeredAt: "2024-01-10",
      lastLogin: "2024-01-19",
      orders: 1,
      totalSpent: 89900
    },
    {
      id: 3,
      firstName: "Михаил",
      lastName: "Иванов",
      email: "mikhail.ivanov@example.com",
      phone: "+7 (900) 345-67-89",
      status: "Заблокирован",
      role: "Клиент",
      registeredAt: "2024-01-08",
      lastLogin: "2024-01-18",
      orders: 2,
      totalSpent: 156800
    },
    {
      id: 4,
      firstName: "Елена",
      lastName: "Козлова",
      email: "elena.kozlova@example.com",
      phone: "+7 (900) 456-78-90",
      status: "Активный",
      role: "Администратор",
      registeredAt: "2023-12-01",
      lastLogin: "2024-01-21",
      orders: 0,
      totalSpent: 0
    }
  ];

  const user = mockUsers.find(u => u.id === parseInt(id || "0"));

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "Активный",
      role: "Клиент",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        status: user.status as "Активный" | "Заблокирован",
        role: user.role as "Клиент" | "Администратор",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    
    try {
      // Здесь был бы API вызов для обновления пользователя
      console.log("Обновление пользователя:", data);
      
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Пользователь обновлен",
        description: "Данные пользователя успешно обновлены.",
      });
      
      navigate("/admin/users");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при обновлении пользователя.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Пользователь не найден</h1>
              <Link to="/admin/users">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Вернуться к пользователям
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/admin/users">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к пользователям
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold">Редактирование пользователя</h1>
          </div>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Информация о пользователе</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите имя" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите фамилию" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (900) 000-00-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Статус</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите статус" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Активный">Активный</SelectItem>
                              <SelectItem value="Заблокирован">Заблокирован</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Роль</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите роль" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Клиент">Клиент</SelectItem>
                              <SelectItem value="Администратор">Администратор</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Информация о пользователе */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Дополнительная информация</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">ID пользователя</Label>
                        <p className="font-medium">{user.id}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Дата регистрации</Label>
                        <p className="font-medium">{new Date(user.registeredAt).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Последний вход</Label>
                        <p className="font-medium">{new Date(user.lastLogin).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Количество заказов</Label>
                        <p className="font-medium">{user.orders}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Общая сумма покупок</Label>
                        <p className="font-medium">{user.totalSpent.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Link to="/admin/users">
                      <Button variant="outline" type="button">
                        Отмена
                      </Button>
                    </Link>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>Сохранение...</>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Сохранить изменения
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
