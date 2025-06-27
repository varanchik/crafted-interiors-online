
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, Eye, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  // Header settings
  siteName: string;
  logo: string;
  showSearch: boolean;
  showFavorites: boolean;
  showCart: boolean;
  showAccount: boolean;
  
  // Footer settings
  companyDescription: string;
  phone: string;
  email: string;
  address: string;
  telegramUrl: string;
  vkUrl: string;
  showSocialLinks: boolean;
  copyrightText: string;
  
  // Navigation
  navigationItems: { name: string; href: string; visible: boolean }[];
  footerCategories: { name: string; href: string; visible: boolean }[];
}

const SiteSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SiteSettings>({
    // Header settings
    siteName: "МебельКрафт",
    logo: "",
    showSearch: true,
    showFavorites: true,
    showCart: true,
    showAccount: true,
    
    // Footer settings
    companyDescription: "Создаем уникальную мебель на заказ с 2009 года. Качество, стиль и индивидуальный подход в каждом изделии.",
    phone: "+7 (495) 123-45-67",
    email: "info@mebelkraft.ru",
    address: "г. Москва, ул. Мебельная, д. 123",
    telegramUrl: "https://t.me/mebelkraft",
    vkUrl: "https://vk.com/mebelkraft",
    showSocialLinks: true,
    copyrightText: "© 2024 МебельКрафт. Все права защищены.",
    
    // Navigation
    navigationItems: [
      { name: "Главная", href: "/", visible: true },
      { name: "Каталог", href: "/catalog", visible: true },
      { name: "О нас", href: "/about", visible: true },
      { name: "Контакты", href: "/contact", visible: true },
    ],
    footerCategories: [
      { name: "Столы", href: "#", visible: true },
      { name: "Стулья", href: "#", visible: true },
      { name: "Шкафы", href: "#", visible: true },
      { name: "Системы хранения", href: "#", visible: true },
    ]
  });

  const handleSaveSettings = () => {
    // Здесь будет логика сохранения настроек
    console.log("Saving settings:", settings);
    
    toast({
      title: "Настройки сохранены",
      description: "Настройки сайта успешно обновлены.",
    });
  };

  const updateNavItem = (index: number, field: keyof typeof settings.navigationItems[0], value: any) => {
    const newItems = [...settings.navigationItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSettings({ ...settings, navigationItems: newItems });
  };

  const updateFooterCategory = (index: number, field: keyof typeof settings.footerCategories[0], value: any) => {
    const newItems = [...settings.footerCategories];
    newItems[index] = { ...newItems[index], [field]: value };
    setSettings({ ...settings, footerCategories: newItems });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                Настройки сайта
              </h1>
              <p className="text-lg text-muted-foreground">
                Управляйте настройками header, footer и общими параметрами сайта
              </p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-primary text-white hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
          </div>

          <Tabs defaultValue="header" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="navigation">Навигация</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="general">Общие</TabsTrigger>
            </TabsList>

            {/* Header Settings */}
            <TabsContent value="header">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Настройки Header
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="siteName">Название сайта</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                        placeholder="МебельКрафт"
                      />
                    </div>
                    <div>
                      <Label htmlFor="logo">URL логотипа</Label>
                      <Input
                        id="logo"
                        value={settings.logo}
                        onChange={(e) => setSettings({...settings, logo: e.target.value})}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Отображаемые элементы</Label>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Поиск</Label>
                          <p className="text-sm text-muted-foreground">Показывать поле поиска в header</p>
                        </div>
                        <Switch
                          checked={settings.showSearch}
                          onCheckedChange={(checked) => setSettings({...settings, showSearch: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Избранное</Label>
                          <p className="text-sm text-muted-foreground">Показывать кнопку избранного</p>
                        </div>
                        <Switch
                          checked={settings.showFavorites}
                          onCheckedChange={(checked) => setSettings({...settings, showFavorites: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Корзина</Label>
                          <p className="text-sm text-muted-foreground">Показывать кнопку корзины</p>
                        </div>
                        <Switch
                          checked={settings.showCart}
                          onCheckedChange={(checked) => setSettings({...settings, showCart: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Аккаунт</Label>
                          <p className="text-sm text-muted-foreground">Показывать кнопку входа в аккаунт</p>
                        </div>
                        <Switch
                          checked={settings.showAccount}
                          onCheckedChange={(checked) => setSettings({...settings, showAccount: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Navigation Settings */}
            <TabsContent value="navigation">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Настройки навигации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Пункты меню</Label>
                    {settings.navigationItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <Input
                            value={item.name}
                            onChange={(e) => updateNavItem(index, 'name', e.target.value)}
                            placeholder="Название"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={item.href}
                            onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                            placeholder="Ссылка"
                          />
                        </div>
                        <Switch
                          checked={item.visible}
                          onCheckedChange={(checked) => updateNavItem(index, 'visible', checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Footer Settings */}
            <TabsContent value="footer">
              <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Информация о компании</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="description">Описание компании</Label>
                      <Textarea
                        id="description"
                        value={settings.companyDescription}
                        onChange={(e) => setSettings({...settings, companyDescription: e.target.value})}
                        placeholder="Краткое описание вашей компании"
                        className="min-h-20"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={settings.phone}
                            onChange={(e) => setSettings({...settings, phone: e.target.value})}
                            placeholder="+7 (495) 123-45-67"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            value={settings.email}
                            onChange={(e) => setSettings({...settings, email: e.target.value})}
                            placeholder="info@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Адрес</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="address"
                            value={settings.address}
                            onChange={(e) => setSettings({...settings, address: e.target.value})}
                            placeholder="г. Москва, ул. Примерная, д. 123"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Социальные сети</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Показывать ссылки на социальные сети</Label>
                      <Switch
                        checked={settings.showSocialLinks}
                        onCheckedChange={(checked) => setSettings({...settings, showSocialLinks: checked})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="telegram">Telegram</Label>
                        <Input
                          id="telegram"
                          value={settings.telegramUrl}
                          onChange={(e) => setSettings({...settings, telegramUrl: e.target.value})}
                          placeholder="https://t.me/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vk">VKontakte</Label>
                        <Input
                          id="vk"
                          value={settings.vkUrl}
                          onChange={(e) => setSettings({...settings, vkUrl: e.target.value})}
                          placeholder="https://vk.com/username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Категории в футере</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.footerCategories.map((category, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <Input
                              value={category.name}
                              onChange={(e) => updateFooterCategory(index, 'name', e.target.value)}
                              placeholder="Название категории"
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              value={category.href}
                              onChange={(e) => updateFooterCategory(index, 'href', e.target.value)}
                              placeholder="Ссылка"
                            />
                          </div>
                          <Switch
                            checked={category.visible}
                            onCheckedChange={(checked) => updateFooterCategory(index, 'visible', checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* General Settings */}
            <TabsContent value="general">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Общие настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="copyright">Текст копирайта</Label>
                    <Input
                      id="copyright"
                      value={settings.copyrightText}
                      onChange={(e) => setSettings({...settings, copyrightText: e.target.value})}
                      placeholder="© 2024 Ваша компания. Все права защищены."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Предварительный просмотр</Label>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Header:</p>
                      <p className="font-medium">{settings.siteName}</p>
                      <p className="text-sm text-muted-foreground mt-2 mb-2">Footer:</p>
                      <p className="text-sm">{settings.companyDescription}</p>
                      <p className="text-sm mt-1">{settings.phone} | {settings.email}</p>
                      <p className="text-sm">{settings.copyrightText}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;
