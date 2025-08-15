import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingMode } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  style: ShoppingMode;
  category: string;
  size: string;
  color: string;
  description: string;
  thumbnail: string;
  viewedAt: number;
}

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Omit<Product, 'viewedAt'>) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENT_ITEMS = 20;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse recently viewed items:', error);
      }
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Omit<Product, 'viewedAt'>) => {
    const productWithTimestamp: Product = {
      ...product,
      viewedAt: Date.now(),
    };

    setRecentlyViewed(prev => {
      // Remove existing item if it exists
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add new item to the beginning
      const updated = [productWithTimestamp, ...filtered];
      
      // Keep only the most recent MAX_RECENT_ITEMS
      return updated.slice(0, MAX_RECENT_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
