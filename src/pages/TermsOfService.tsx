
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                  Пользовательское соглашение
                </h1>
                <p className="text-lg text-muted-foreground">
                  Дата последнего обновления: 29 июня 2025 г.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="bg-card p-6 rounded-lg border space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между администрацией интернет-сайта МебельКрафт (далее — «Администрация») и пользователями сайта.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Использование сайта означает безоговорочное согласие пользователя с настоящим Соглашением и указанными в нем условиями.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Предмет соглашения</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Предметом настоящего Соглашения является предоставление пользователю доступа к содержащимся на сайте информационным ресурсам и сервисам.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Сайт предоставляет пользователю следующие виды сервисов:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>Доступ к каталогу мебели и товаров для дома</li>
                  <li>Возможность оформления заказов</li>
                  <li>Консультации по выбору товаров</li>
                  <li>Информационная поддержка</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Права и обязанности пользователя</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Пользователь имеет право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Использовать все возможности сайта</li>
                  <li>Получать информацию о товарах и услугах</li>
                  <li>Оформлять заказы на товары</li>
                  <li>Получать консультации по товарам</li>
                </ul>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Пользователь обязуется:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Предоставлять достоверную информацию при регистрации</li>
                  <li>Не нарушать работоспособность сайта</li>
                  <li>Не использовать сайт в противоправных целях</li>
                  <li>Соблюдать права других пользователей</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Права и обязанности администрации</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Администрация имеет право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Изменять содержание сайта</li>
                  <li>Изменять или дополнять предлагаемые сервисы</li>
                  <li>Удалять аккаунты пользователей</li>
                  <li>Ограничивать доступ к сайту</li>
                </ul>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Администрация обязуется:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Поддерживать работоспособность сайта</li>
                  <li>Обеспечивать безопасность персональных данных</li>
                  <li>Предоставлять качественные товары и услуги</li>
                  <li>Своевременно обрабатывать заказы пользователей</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Условия заказа и оплаты</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  При оформлении заказа пользователь:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>Подтверждает достоверность предоставленной информации</li>
                  <li>Соглашается с ценами на товары</li>
                  <li>Принимает условия доставки</li>
                  <li>Выбирает удобный способ оплаты</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Цены на товары могут изменяться без предварительного уведомления. Окончательная стоимость заказа фиксируется в момент его подтверждения.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Доставка и возврат</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Доставка товаров осуществляется в соответствии с условиями, указанными на сайте. Сроки доставки могут варьироваться в зависимости от региона и выбранного способа доставки.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Возврат товаров возможен в соответствии с действующим законодательством РФ. Качественный товар может быть возвращен в течение 14 дней с момента покупки при сохранении товарного вида.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Ответственность</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Администрация не несет ответственности за:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Временные сбои в работе сайта</li>
                  <li>Действия третьих лиц</li>
                  <li>Неправильное использование товаров пользователем</li>
                  <li>Ущерб, возникший в результате использования сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Заключительные положения</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Настоящее Соглашение может быть изменено администрацией без предварительного уведомления пользователей. Новая редакция Соглашения вступает в силу с момента ее размещения на сайте.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Все споры и разногласия решаются путем переговоров. При невозможности достижения соглашения споры решаются в судебном порядке в соответствии с действующим законодательством РФ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Контактная информация</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  По всем вопросам, касающимся настоящего Соглашения, обращайтесь:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: info@mebelkraft.ru</p>
                  <p>Телефон: +7 (495) 123-45-67</p>
                  <p>Адрес: г. Москва, ул. Мебельная, д. 123</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
