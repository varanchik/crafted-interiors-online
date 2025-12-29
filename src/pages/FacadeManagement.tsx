import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { mockFacades } from '@/data/facades';

const FacadeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const facades = mockFacades.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold">Управление фасадами</h1>
              <p className="text-muted-foreground">Всего фасадов: {facades.length}</p>
            </div>
          </div>

          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Все фасады</CardTitle>
              <div className="flex gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Поиск..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button><Plus className="h-4 w-4 mr-2" />Добавить фасад</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Фото</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Материал</TableHead>
                    <TableHead>Цена/м²</TableHead>
                    <TableHead>Наличие</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facades.map((facade) => (
                    <TableRow key={facade.id}>
                      <TableCell>
                        <img src={facade.images[0]} alt={facade.name} className="w-12 h-12 object-cover rounded" />
                      </TableCell>
                      <TableCell className="font-medium">{facade.name}</TableCell>
                      <TableCell><Badge variant="secondary">{facade.material}</Badge></TableCell>
                      <TableCell>{facade.pricePerSquareMeter.toLocaleString('ru-RU')} ₽</TableCell>
                      <TableCell>
                        <Badge variant={facade.inStock ? 'default' : 'destructive'}>
                          {facade.inStock ? 'В наличии' : 'Нет'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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

export default FacadeManagement;
