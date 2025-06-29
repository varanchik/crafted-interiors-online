
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
                  Политика конфиденциальности
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
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях сайта МебельКрафт (далее — «Сайт»), получаемой Администрацией Сайта.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Целью настоящей Политики конфиденциальности является обеспечение надлежащей защиты информации о пользователях, включая их персональные данные, от несанкционированного доступа и разглашения.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Какую информацию мы собираем</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  При использовании нашего сайта мы можем собирать следующую информацию:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Имя, фамилия и контактные данные (телефон, email)</li>
                  <li>Адрес доставки</li>
                  <li>Информация о заказах и покупках</li>
                  <li>Данные об использовании сайта (cookies, IP-адрес)</li>
                  <li>Предпочтения и интересы пользователя</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Как мы используем информацию</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Собранная информация используется для:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Обработки и выполнения заказов</li>
                  <li>Связи с клиентами по вопросам заказов</li>
                  <li>Улучшения качества обслуживания</li>
                  <li>Информирования о новых товарах и услугах</li>
                  <li>Анализа и улучшения работы сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Защита персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы принимаем все необходимые меры для защиты персональных данных пользователей:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Использование современных методов шифрования</li>
                  <li>Ограничение доступа к персональным данным</li>
                  <li>Регулярное обновление систем безопасности</li>
                  <li>Обучение сотрудников правилам обработки персональных данных</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Права пользователей</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Пользователи имеют право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Получать информацию о собранных о них данных</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления своих персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Подать жалобу в надзорный орган</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Наш сайт использует файлы cookies для улучшения пользовательского опыта. Cookies помогают нам запомнить ваши предпочтения и обеспечить корректную работу сайта. Вы можете отключить cookies в настройках браузера, однако это может повлиять на функциональность сайта.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Контактная информация</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  По вопросам, связанным с настоящей Политикой конфиденциальности, вы можете обратиться к нам:
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

export default PrivacyPolicy;
