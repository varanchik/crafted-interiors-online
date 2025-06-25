
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Truck, Package, CreditCard, Banknote } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  paymentMethod: z.enum(["card", "cash"]),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  comment: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      deliveryMethod: "delivery",
      paymentMethod: "card",
      address: "",
      city: "",
      postalCode: "",
      comment: "",
    },
  });

  const watchDeliveryMethod = form.watch("deliveryMethod");
  const watchPaymentMethod = form.watch("paymentMethod");

  const deliveryPrice = watchDeliveryMethod === "delivery" ? 500 : 0;
  const totalPrice = getTotalPrice() + deliveryPrice;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Здесь будет интеграция с платёжным сервисом
      console.log("Данные заказа:", {
        ...data,
        items,
        totalPrice,
        deliveryPrice,
      });

      // Имитация обработки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (data.paymentMethod === "card") {
        // Здесь будет перенаправление на страницу оплаты
        toast({
          title: "Перенаправление на оплату",
          description: "Сейчас вы будете перенаправлены на страницу оплаты",
        });
        
        // Временно просто показываем успешное сообщение
        setTimeout(() => {
          toast({
            title: "Заказ оформлен",
            description: "Спасибо за покупку! Мы свяжемся с вами для подтверждения.",
          });
          clearCart();
          navigate("/");
        }, 1000);
      } else {
        toast({
          title: "Заказ оформлен",
          description: "Спасибо за заказ! Мы свяжемся с вами для подтверждения и согласования оплаты наличными.",
        });
        clearCart();
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-serif font-bold mb-4">Корзина пуста</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Button onClick={() => navigate("/catalog")} className="btn-primary">
              Перейти в каталог
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Оформление заказа
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Контактная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Имя *</FormLabel>
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
                              <FormLabel>Фамилия *</FormLabel>
                              <FormControl>
                                <Input placeholder="Введите фамилию" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" type="email" {...field} />
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
                              <FormLabel>Телефон *</FormLabel>
                              <FormControl>
                                <Input placeholder="+7 (999) 123-45-67" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Delivery Method */}
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Способ получения</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="deliveryMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-4"
                              >
                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                  <RadioGroupItem value="delivery" id="delivery" />
                                  <div className="flex-1">
                                    <label htmlFor="delivery" className="flex items-center cursor-pointer">
                                      <Truck className="h-5 w-5 mr-3" />
                                      <div>
                                        <div className="font-semibold">Доставка курьером</div>
                                        <div className="text-sm text-muted-foreground">
                                          Доставка по указанному адресу - 500 ₽
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                  <RadioGroupItem value="pickup" id="pickup" />
                                  <div className="flex-1">
                                    <label htmlFor="pickup" className="flex items-center cursor-pointer">
                                      <Package className="h-5 w-5 mr-3" />
                                      <div>
                                        <div className="font-semibold">Самовывоз</div>
                                        <div className="text-sm text-muted-foreground">
                                          Забрать из нашего шоурума - бесплатно
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Delivery Address */}
                  {watchDeliveryMethod === "delivery" && (
                    <Card className="border-0 shadow-soft">
                      <CardHeader>
                        <CardTitle>Адрес доставки</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Адрес *</FormLabel>
                              <FormControl>
                                <Input placeholder="Улица, дом, квартира" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Город *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Город" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Индекс</FormLabel>
                                <FormControl>
                                  <Input placeholder="123456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Payment Method */}
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Способ оплаты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="space-y-4"
                              >
                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                  <RadioGroupItem value="card" id="card" />
                                  <div className="flex-1">
                                    <label htmlFor="card" className="flex items-center cursor-pointer">
                                      <CreditCard className="h-5 w-5 mr-3" />
                                      <div>
                                        <div className="font-semibold">Онлайн оплата картой</div>
                                        <div className="text-sm text-muted-foreground">
                                          Visa, MasterCard, МИР
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                                  <RadioGroupItem value="cash" id="cash" />
                                  <div className="flex-1">
                                    <label htmlFor="cash" className="flex items-center cursor-pointer">
                                      <Banknote className="h-5 w-5 mr-3" />
                                      <div>
                                        <div className="font-semibold">Наличными при получении</div>
                                        <div className="text-sm text-muted-foreground">
                                          Оплата курьеру или в пункте выдачи
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Additional Comments */}
                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle>Дополнительная информация</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Комментарий к заказу</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Укажите дополнительные пожелания к заказу..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? "Оформление заказа..." 
                      : watchPaymentMethod === "card" 
                        ? "Перейти к оплате" 
                        : "Оформить заказ"
                    }
                  </Button>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-soft sticky top-8">
                <CardHeader>
                  <CardTitle>Ваш заказ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} шт. × {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <span className="font-medium">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Товары</span>
                      <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>
                        {deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice.toLocaleString('ru-RU')} ₽`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Итого</span>
                    <span className="text-primary">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
