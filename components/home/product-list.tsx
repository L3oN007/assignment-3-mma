import React from "react";

import { FlatList, ScrollView, Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IProduct } from "@/types/product.interface";

import {
  ProductItem,
  ProductItemSkeleton,
} from "@/components/home/product-item";

export default function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get<IProduct[]>(
        "https://648867740e2469c038fda6cc.mockapi.io/api/v1/products"
      );
      return data;
    },
  });

  if (isLoading) {
    return (
      <View className="mt-4 flex-1 bg-white">
        <ScrollView className="flex-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <View className="mb-5 flex-1" key={i}>
              <ProductItemSkeleton />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (isError || !products) {
    return <Text>Error</Text>;
  }
  return (
    <View className="my-4 flex-1 bg-white">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="flex-1">
            <ProductItem product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
