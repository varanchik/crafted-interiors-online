import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/contexts/CartContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Index from '@/pages/Index';
import Catalog from '@/pages/Catalog';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';
import Favorites from '@/pages/Favorites';
import Checkout from '@/pages/Checkout';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import News from '@/pages/News';
import ArticleView from '@/pages/ArticleView';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import Admin from '@/pages/Admin';
import ProductManagement from '@/pages/ProductManagement';
import CategoryManagement from '@/pages/CategoryManagement';
import ProductEdit from '@/pages/ProductEdit';
import ProductView from '@/pages/ProductView';
import OrderManagement from '@/pages/OrderManagement';
import OrderEdit from '@/pages/OrderEdit';
import UserManagement from '@/pages/UserManagement';
import Analytics from '@/pages/Analytics';
import CommentManagement from '@/pages/CommentManagement';
import NewsManagement from '@/pages/NewsManagement';
import NewsEdit from '@/pages/NewsEdit';
import DiscountManagement from '@/pages/DiscountManagement';
import DiscountEdit from '@/pages/DiscountEdit';
import SiteSettings from '@/pages/SiteSettings';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<ArticleView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/categories" element={<CategoryManagement />} />
                <Route path="/admin/product/:id" element={<ProductView />} />
                <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
                <Route path="/admin/orders" element={<OrderManagement />} />
                <Route path="/admin/order/:id/edit" element={<OrderEdit />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/comments" element={<CommentManagement />} />
                <Route path="/admin/news" element={<NewsManagement />} />
                <Route path="/admin/news/:id/edit" element={<NewsEdit />} />
                <Route path="/admin/discounts" element={<DiscountManagement />} />
                <Route path="/admin/discounts/:id/edit" element={<DiscountEdit />} />
                <Route path="/admin/settings" element={<SiteSettings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
