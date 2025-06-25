
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-serif font-bold mb-4">Ваша корзина пуста</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Добавьте товары из нашего каталога, чтобы оформить заказ
            </p>
            <Link to="/catalog">
              <Button className="btn-primary">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-8">
            Корзина
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold text-xl">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-lg w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-soft sticky top-8">
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                    <span className="font-semibold">
                      {getTotalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Доставка</span>
                    <span className="font-semibold">Рассчитается при заказе</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold">
                    <span>К оплате</span>
                    <span className="text-primary">
                      {getTotalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full btn-primary">
                      Оформить заказ
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={clearCart}
                  >
                    Очистить корзину
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
