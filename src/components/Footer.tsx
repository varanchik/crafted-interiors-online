
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">МК</span>
              </div>
              <span className="font-serif font-bold text-xl">МебельКрафт</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создаем уникальную мебель на заказ с 2009 года. Качество, стиль и индивидуальный подход в каждом изделии.
            </p>
            <div className="flex space-x-3">
              <a href="https://t.me/mebelkraft" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.45 3.61-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.05-.74 4.11-1.8 6.85-2.99 8.23-3.57 3.93-1.64 4.75-1.92 5.28-1.93.12 0 .38.03.55.18.14.12.18.28.2.39.02.08.03.29.01.45z"/>
                </svg>
              </a>
              <a href="https://vk.com/mebelkraft" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.189c.136-.144.131-.414.131-.414s-.019-1.266.57-1.454c.583-.186 1.33.122 1.33 1.221 0 0 .908-.028 1.386-.364.603-.425.469-1.133.469-1.133s-2.321-1.402-2.321-3.516c0-1.838 1.321-3.325 1.321-3.325s-.752.233-1.707.233c-1.125 0-1.707-.233-1.707-.233s1.321 1.487 1.321 3.325c0 2.114-2.321 3.516-2.321 3.516s-.134.708.469 1.133c.478.336 1.386.364 1.386.364s.747-1.035 1.33-1.221c.589.188.57 1.454.57 1.454s-.005.27.131.414c.148.157.436.189.436.189h1.084c.553 0 1-.448 1-1v-8c0-1.657-1.343-3-3-3H8c-1.657 0-3 1.343-3 3v8c0 .552.447 1 1 1h6.785z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Меню</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/catalog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                О нас
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Категории</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Столы
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Стулья
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Шкафы
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Системы хранения
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@mebelkraft.ru</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  г. Москва, ул. Мебельная, д. 123
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 МебельКрафт. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
