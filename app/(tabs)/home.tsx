import React, { useEffect } from "react";

import { Text, View } from "react-native";

import { useFavoriteStore } from "@/stores/favoriteStore";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductList from "@/components/home/product-list";
import SearchInput from "@/components/home/search-input";
import SelectBrandList from "@/components/home/select-brand-list";

export default function Home() {
  const { loadFavorites } = useFavoriteStore();
  useEffect(() => {
    loadFavorites();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="mb-4">
        <Text className="text-gray-500">Welcome to </Text>
        <Text className="font-psemibold text-3xl">ArtVibe</Text>
      </View>

      {/* Search bar placeholder */}
      <SearchInput initQuery="" />

      <View className="mt-4">
        <SelectBrandList />
      </View>

      {/* Product List Section */}
      <ProductList />
    </SafeAreaView>
  );
}
