
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  const addItem = (item: FavoriteItem) => {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isInFavorites = (id: string) => {
    return items.some(item => item.id === id);
  };

  const clearFavorites = () => {
    setItems([]);
  };

  return (
    <FavoritesContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInFavorites,
      clearFavorites
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
