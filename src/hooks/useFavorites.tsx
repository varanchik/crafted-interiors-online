
import { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
  moveToCart: (id: number) => void;
  moveAllToCart: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  const addToFavorites = (product: FavoriteItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromFavorites = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearFavorites = () => {
    setItems([]);
  };

  const isFavorite = (id: number) => {
    return items.some(item => item.id === id);
  };

  const moveToCart = (id: number) => {
    // Логика перемещения в корзину будет добавлена через useCart
    console.log('Moving to cart:', id);
  };

  const moveAllToCart = () => {
    // Логика перемещения всех товаров в корзину
    console.log('Moving all to cart');
  };

  return (
    <FavoritesContext.Provider value={{
      items,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      isFavorite,
      moveToCart,
      moveAllToCart
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
