import React from "react";

import { Pressable, ScrollView, Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router, usePathname } from "expo-router";

import { IProduct } from "@/types/product.interface";

import { cn } from "@/lib/utils";

export default function SelectBrandList() {
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
      <ScrollView horizontal={true}>
        <View className="flex-row flex-wrap" style={{ gap: 8 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <BrandItemSkeleton key={i} />
          ))}
        </View>
      </ScrollView>
    );
  }

  if (isError || !products) {
    return <Text>Error</Text>;
  }

  const brands = () => {
    const brands = products.map((product) => product.brand);
    return [...new Set(brands)];
  };

  return (
    <ScrollView horizontal={true}>
      <View className="flex-row flex-wrap">
        {brands().map((brand) => (
          <BrandItem brand={brand} key={brand} />
        ))}
      </View>
    </ScrollView>
  );
}

const BrandItem = ({ brand }: { brand: string }) => {
  const pathname = usePathname();
  const encodedBrand = encodeURIComponent(brand);

  return (
    <Pressable
      onPress={() => {
        if (pathname.startsWith(`/search`))
          router.setParams({ query: encodedBrand });
        else router.push(`/search/${encodedBrand}`);
      }}
      className="mr-4 flex-col items-center gap-4 rounded-xl"
    >
      <View
        className={cn(
          "flex-row items-center rounded-lg bg-blue-100 px-2 py-1",
          pathname.startsWith(`/search/${encodedBrand}`)
            ? "border border-blue-400"
            : "border border-gray-100 bg-white"
        )}
      >
        <Text
          className={cn(
            "font-pregular",
            pathname.startsWith(`/search/${encodedBrand}`)
              ? "font-pmedium text-blue-600"
              : "text-gray-700"
          )}
        >
          {brand}
        </Text>
      </View>
    </Pressable>
  );
};

const BrandItemSkeleton = () => {
  return <View className="h-8 w-24 animate-pulse rounded bg-gray-200" />;
};

