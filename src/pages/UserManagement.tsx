
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, UserCheck, UserX, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  // Mock data - в реальном приложении данные приходили бы из API
  const users = [
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активный':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Заблокирован':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Администратор':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Клиент':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    toast({
      title: "Статус изменен",
      description: `Статус пользователя изменен на "${newStatus}".`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Пользователь удален",
      description: "Пользователь успешно удален из системы.",
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
            <h1 className="text-3xl font-serif font-bold">Управление пользователями</h1>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-soft mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск по имени или email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="активный">Активные</SelectItem>
                    <SelectItem value="заблокирован">Заблокированные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Пользователи системы</span>
                <Badge variant="secondary">
                  {filteredUsers.length} пользователей
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Контакты</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Заказы</TableHead>
                      <TableHead>Потрачено</TableHead>
                      <TableHead>Регистрация</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {user.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">{user.orders}</div>
                            <div className="text-xs text-muted-foreground">заказов</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            {user.totalSpent.toLocaleString('ru-RU')} ₽
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Посл. вход: {new Date(user.lastLogin).toLocaleDateString('ru-RU')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {user.status === 'Активный' ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(user.id, 'Заблокирован')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(user.id, 'Активный')}
                                className="text-green-600 hover:text-green-700"
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
