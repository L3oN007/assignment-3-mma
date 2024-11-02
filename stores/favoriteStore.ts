import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { IProduct } from "@/types/product.interface";

interface FavoriteStore {
  favorites: IProduct[];
  addFavorite: (product: IProduct) => void;
  removeFavorite: (productId: string) => void;
  removeAllFavorites: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  isInFavoriteList: (productId: string) => boolean;
}

const FAVORITES_STORAGE_KEY = "favorite_products";

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  addFavorite: async (product: IProduct) => {
    const currentFavorites = get().favorites;
    const newFavorites = [...currentFavorites, product];

    set({ favorites: newFavorites });
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(newFavorites)
    );
  },

  removeFavorite: async (productId: string) => {
    const currentFavorites = get().favorites;
    const updatedFavorites = currentFavorites.filter(
      (item) => item.id !== productId
    );

    set({ favorites: updatedFavorites });
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  },

  removeAllFavorites: async () => {
    set({ favorites: [] });
    await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
  },

  loadFavorites: async () => {
    const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },

  isInFavoriteList: (productId: string) => {
    const favorites = get().favorites;
    return favorites.some((item) => item.id === productId);
  },
}));

