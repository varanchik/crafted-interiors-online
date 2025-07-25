import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, Eye, Phone, Mail, MapPin, Globe, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
  
  // Legal documents
  privacyPolicy: {
    lastUpdated: string;
    content: {
      generalProvisions: string;
      dataCollection: string;
      dataUsage: string;
      dataProtection: string;
      userRights: string;
      cookies: string;
      contactInfo: string;
    };
  };
  termsOfService: {
    lastUpdated: string;
    content: {
      generalProvisions: string;
      subjectOfAgreement: string;
      userRightsObligations: string;
      adminRightsObligations: string;
      orderPaymentConditions: string;
      deliveryReturn: string;
      liability: string;
      finalProvisions: string;
      contactInfo: string;
    };
  };
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
    ],
    
    // Legal documents
    privacyPolicy: {
      lastUpdated: "29 июня 2025 г.",
      content: {
        generalProvisions: "Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях сайта МебельКрафт (далее — «Сайт»), получаемой Администрацией Сайта.\n\nЦелью настоящей Политики конфиденциальности является обеспечение надлежащей защиты информации о пользователях, включая их персональные данные, от несанкционированного доступа и разглашения.",
        dataCollection: "При использовании нашего сайта мы можем собирать следующую информацию:\n• Имя, фамилия и контактные данные (телефон, email)\n• Адрес доставки\n• Информация о заказах и покупках\n• Данные об использовании сайта (cookies, IP-адрес)\n• Предпочтения и интересы пользователя",
        dataUsage: "Собранная информация используется для:\n• Обработки и выполнения заказов\n• Связи с клиентами по вопросам заказов\n• Улучшения качества обслуживания\n• Информирования о новых товарах и услугах\n• Анализа и улучшения работы сайта",
        dataProtection: "Мы принимаем все необходимые меры для защиты персональных данных пользователей:\n• Использование современных методов шифрования\n• Ограничение доступа к персональным данным\n• Регулярное обновление систем безопасности\n• Обучение сотрудников правилам обработки персональных данных",
        userRights: "Пользователи имеют право:\n• Получать информацию о собранных о них данных\n• Требовать исправления неточных данных\n• Требовать удаления своих персональных данных\n• Отозвать согласие на обработку персональных данных\n• Подать жалобу в надзорный орган",
        cookies: "Наш сайт использует файлы cookies для улучшения пользовательского опыта. Cookies помогают нам запомнить ваши предпочтения и обеспечить корректную работу сайта. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.",
        contactInfo: "По вопросам, связанным с настоящей Политикой конфиденциальности, вы можете обратиться к нам:\nEmail: info@mebelkraft.ru\nТелефон: +7 (495) 123-45-67\nАдрес: г. Москва, ул. Мебельная, д. 123"
      }
    },
    termsOfService: {
      lastUpdated: "29 июня 2025 г.",
      content: {
        generalProvisions: "Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между администрацией интернет-сайта МебельКрафт (далее — «Администрация») и пользователями сайта.\n\nИспользование сайта означает безоговорочное согласие пользователя с настоящим Соглашением и указанными в нем условиями.",
        subjectOfAgreement: "Предметом настоящего Соглашения является предоставление пользователю доступа к содержащимся на сайте информационным ресурсам и сервисам.\n\nСайт предоставляет пользователю следующие виды сервисов:\n• Доступ к каталогу мебели и товаров для дома\n• Возможность оформления заказов\n• Консультации по выбору товаров\n• Информационная поддержка",
        userRightsObligations: "Пользователь имеет право:\n• Использовать все возможности сайта\n• Получать информацию о товарах и услугах\n• Оформлять заказы на товары\n• Получать консультации по товарам\n\nПользователь обязуется:\n• Предоставлять достоверную информацию при регистрации\n• Не нарушать работоспособность сайта\n• Не использовать сайт в противоправных целях\n• Соблюдать права других пользователей",
        adminRightsObligations: "Администрация имеет право:\n• Изменять содержание сайта\n• Изменять или дополнять предлагаемые сервисы\n• Удалять аккаунты пользователей\n• Ограничивать доступ к сайту\n\nАдминистрация обязуется:\n• Поддерживать работоспособность сайта\n• Обеспечивать безопасность персональных данных\n• Предоставлять качественные товары и услуги\n• Своевременно обрабатывать заказы пользователей",
        orderPaymentConditions: "При оформлении заказа пользователь:\n• Подтверждает достоверность предоставленной информации\n• Соглашается с ценами на товары\n• Принимает условия доставки\n• Выбирает удобный способ оплаты\n\nЦены на товары могут изменяться без предварительного уведомления. Окончательная стоимость заказа фиксируется в момент его подтверждения.",
        deliveryReturn: "Доставка товаров осуществляется в соответствии с условиями, указанными на сайте. Сроки доставки могут варьироваться в зависимости от региона и выбранного способа доставки.\n\nВозврат товаров возможен в соответствии с действующим законодательством РФ. Качественный товар может быть возвращен в течение 14 дней с момента покупки при сохранении товарного вида.",
        liability: "Администрация не несет ответственности за:\n• Временные сбои в работе сайта\n• Действия третьих лиц\n• Неправильное использование товаров пользователем\n• Ущерб, возникший в результате использования сайта",
        finalProvisions: "Настоящее Соглашение может быть изменено администрацией без предварительного уведомления пользователей. Новая редакция Соглашения вступает в силу с момента ее размещения на сайте.\n\nВсе споры и разногласия решаются путем переговоров. При невозможности достижения соглашения споры решаются в судебном порядке в соответствии с действующим законодательством РФ.",
        contactInfo: "По всем вопросам, касающимся настоящего Соглашения, обращайтесь:\nEmail: info@mebelkraft.ru\nТелефон: +7 (495) 123-45-67\nАдрес: г. Москва, ул. Мебельная, д. 123"
      }
    }
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

  const updatePrivacyPolicy = (field: keyof typeof settings.privacyPolicy.content, value: string) => {
    setSettings({
      ...settings,
      privacyPolicy: {
        ...settings.privacyPolicy,
        content: {
          ...settings.privacyPolicy.content,
          [field]: value
        }
      }
    });
  };

  const updateTermsOfService = (field: keyof typeof settings.termsOfService.content, value: string) => {
    setSettings({
      ...settings,
      termsOfService: {
        ...settings.termsOfService,
        content: {
          ...settings.termsOfService.content,
          [field]: value
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                  Настройки сайта
                </h1>
                <p className="text-lg text-muted-foreground">
                  Управляйте содержимым и настройками сайта
                </p>
              </div>
            </div>
            <Button onClick={handleSaveSettings} className="bg-primary text-white hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
          </div>

          <Tabs defaultValue="header" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="navigation">Навигация</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="legal">Документы</TabsTrigger>
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

            {/* Legal Documents Settings */}
            <TabsContent value="legal">
              <div className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Политика конфиденциальности
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="privacyLastUpdated">Дата последнего обновления</Label>
                      <Input
                        id="privacyLastUpdated"
                        value={settings.privacyPolicy.lastUpdated}
                        onChange={(e) => setSettings({
                          ...settings,
                          privacyPolicy: { ...settings.privacyPolicy, lastUpdated: e.target.value }
                        })}
                        placeholder="29 июня 2025 г."
                      />
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="generalProvisions">1. Общие положения</Label>
                        <Textarea
                          id="generalProvisions"
                          value={settings.privacyPolicy.content.generalProvisions}
                          onChange={(e) => updatePrivacyPolicy('generalProvisions', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dataCollection">2. Какую информацию мы собираем</Label>
                        <Textarea
                          id="dataCollection"
                          value={settings.privacyPolicy.content.dataCollection}
                          onChange={(e) => updatePrivacyPolicy('dataCollection', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dataUsage">3. Как мы используем информацию</Label>
                        <Textarea
                          id="dataUsage"
                          value={settings.privacyPolicy.content.dataUsage}
                          onChange={(e) => updatePrivacyPolicy('dataUsage', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dataProtection">4. Защита персональных данных</Label>
                        <Textarea
                          id="dataProtection"
                          value={settings.privacyPolicy.content.dataProtection}
                          onChange={(e) => updatePrivacyPolicy('dataProtection', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="userRights">5. Права пользователей</Label>
                        <Textarea
                          id="userRights"
                          value={settings.privacyPolicy.content.userRights}
                          onChange={(e) => updatePrivacyPolicy('userRights', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cookies">6. Cookies</Label>
                        <Textarea
                          id="cookies"
                          value={settings.privacyPolicy.content.cookies}
                          onChange={(e) => updatePrivacyPolicy('cookies', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="privacyContactInfo">7. Контактная информация</Label>
                        <Textarea
                          id="privacyContactInfo"
                          value={settings.privacyPolicy.content.contactInfo}
                          onChange={(e) => updatePrivacyPolicy('contactInfo', e.target.value)}
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Пользовательское соглашение
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="termsLastUpdated">Дата последнего обновления</Label>
                      <Input
                        id="termsLastUpdated"
                        value={settings.termsOfService.lastUpdated}
                        onChange={(e) => setSettings({
                          ...settings,
                          termsOfService: { ...settings.termsOfService, lastUpdated: e.target.value }
                        })}
                        placeholder="29 июня 2025 г."
                      />
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="termsGeneralProvisions">1. Общие положения</Label>
                        <Textarea
                          id="termsGeneralProvisions"
                          value={settings.termsOfService.content.generalProvisions}
                          onChange={(e) => updateTermsOfService('generalProvisions', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="subjectOfAgreement">2. Предмет соглашения</Label>
                        <Textarea
                          id="subjectOfAgreement"
                          value={settings.termsOfService.content.subjectOfAgreement}
                          onChange={(e) => updateTermsOfService('subjectOfAgreement', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="userRightsObligations">3. Права и обязанности пользователя</Label>
                        <Textarea
                          id="userRightsObligations"
                          value={settings.termsOfService.content.userRightsObligations}
                          onChange={(e) => updateTermsOfService('userRightsObligations', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="adminRightsObligations">4. Права и обязанности администрации</Label>
                        <Textarea
                          id="adminRightsObligations"
                          value={settings.termsOfService.content.adminRightsObligations}
                          onChange={(e) => updateTermsOfService('adminRightsObligations', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="orderPaymentConditions">5. Условия заказа и оплаты</Label>
                        <Textarea
                          id="orderPaymentConditions"
                          value={settings.termsOfService.content.orderPaymentConditions}
                          onChange={(e) => updateTermsOfService('orderPaymentConditions', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="deliveryReturn">6. Доставка и возврат</Label>
                        <Textarea
                          id="deliveryReturn"
                          value={settings.termsOfService.content.deliveryReturn}
                          onChange={(e) => updateTermsOfService('deliveryReturn', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="liability">7. Ответственность</Label>
                        <Textarea
                          id="liability"
                          value={settings.termsOfService.content.liability}
                          onChange={(e) => updateTermsOfService('liability', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="finalProvisions">8. Заключительные положения</Label>
                        <Textarea
                          id="finalProvisions"
                          value={settings.termsOfService.content.finalProvisions}
                          onChange={(e) => updateTermsOfService('finalProvisions', e.target.value)}
                          className="min-h-24"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="termsContactInfo">9. Контактная информация</Label>
                        <Textarea
                          id="termsContactInfo"
                          value={settings.termsOfService.content.contactInfo}
                          onChange={(e) => updateTermsOfService('contactInfo', e.target.value)}
                          className="min-h-20"
                        />
                      </div>
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
