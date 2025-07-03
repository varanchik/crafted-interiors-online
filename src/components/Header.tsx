
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, User, Heart, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Каталог", href: "/catalog" },
    { name: "Новости", href: "/news" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-modern group-hover:shadow-lg transition-all duration-200">
              <span className="text-white font-bold text-lg">МК</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-2xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                МебельКрафт
              </span>
              <p className="text-xs text-muted-foreground font-medium">Премиальная мебель</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 hover:bg-accent ${
                  isActive(item.href) 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="lg" className="relative h-12 w-12 rounded-xl">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/favorites">
              <Button variant="ghost" size="lg" className="relative h-12 w-12 rounded-xl">
                <Heart className="h-5 w-5" />
                {favoriteItems.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs bg-primary hover:bg-primary"
                  >
                    {favoriteItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="lg" className="relative h-12 w-12 rounded-xl">
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs bg-primary hover:bg-primary"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="lg" className="h-12 w-12 rounded-xl">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="lg" className="h-12 w-12 rounded-xl">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">МК</span>
                    </div>
                    <span className="font-serif font-bold text-xl">МебельКрафт</span>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive(item.href) 
                            ? "bg-primary/10 text-primary" 
                            : "text-foreground/80 hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t space-y-3">
                  <Link
                    to="/favorites"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5" />
                      <span>Избранное</span>
                    </div>
                    {favoriteItems.length > 0 && (
                      <Badge className="bg-primary hover:bg-primary">
                        {favoriteItems.length}
                      </Badge>
                    )}
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="h-5 w-5" />
                      <span>Корзина</span>
                    </div>
                    {getTotalItems() > 0 && (
                      <Badge className="bg-primary hover:bg-primary">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span>Аккаунт</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
