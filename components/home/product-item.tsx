import React, { useEffect, useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useFavoriteStore } from "@/stores/favoriteStore";
import Icons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import { IProduct } from "@/types/product.interface";

import { calculateAverageRating } from "@/lib/utils";

type Props = {
  product: IProduct;
};

function ProductItem({ product }: Props) {
  const { addFavorite, removeFavorite, favorites, isInFavoriteList } =
    useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavoriteList(product.id));
  }, [favorites, product.id, isFavorite]);

  const avgRating = calculateAverageRating(product.feedbacks);
  const isLimitTimeDeal = product.limitedTimeDeal !== 0;
  const newPrice = isLimitTimeDeal
    ? product.price * (1 - product.limitedTimeDeal)
    : product.price;
  const discountPercentage = isLimitTimeDeal
    ? Math.round(product.limitedTimeDeal * 100)
    : 0;

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(product.id);
      setIsFavorite(false);
    } else {
      addFavorite(product);
      setIsFavorite(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.card}
      className="rounded-xl border border-gray-100"
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <View className="flex-row items-center justify-between">
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.brand}>
            {avgRating.toFixed(1)} ★ ({product.feedbacks.length})
          </Text>
        </View>
        <Text style={styles.artName}>{product.artName}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View className="mb-2 flex-row items-center justify-between"></View>

        <View style={styles.footer}>
          <View>
            {isLimitTimeDeal && (
              <View className="flex-col">
                <Text
                  style={[
                    styles.price,
                    {
                      textDecorationLine: "line-through",
                      color: "#888",
                      fontSize: 15,
                    },
                  ]}
                >
                  ${product.price}
                </Text>
                <View className="flex-row items-center">
                  <Text style={[styles.price]}>${newPrice.toFixed(2)}</Text>
                  {discountPercentage > 0 && (
                    <View className="mx-2 rounded-md bg-pink-100 px-2.5 py-0.5">
                      <Text className="text-xs font-medium text-pink-800">
                        - {discountPercentage}% Off
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            {!isLimitTimeDeal && (
              <Text style={styles.price}>${product.price}</Text>
            )}
          </View>
          <View className="-bottom-2 right-1">
            <TouchableOpacity
              className=""
              onPress={handleFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icons
                size={26}
                name={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ProductItemSkeleton() {
  return (
    <View className="rounded-xl border border-gray-100 bg-white shadow-md">
      <View className="h-44 animate-pulse rounded-t-xl bg-gray-200"></View>
      <View className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="h-4 w-24 animate-pulse rounded bg-gray-200"></View>
          <View className="h-4 w-12 animate-pulse rounded bg-gray-200"></View>
        </View>
        <View className="mt-2 h-5 w-[70%] animate-pulse rounded bg-gray-200"></View>
        <View className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200"></View>
        <View className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200"></View>
        <View className="mt-4 flex flex-row items-center justify-between">
          <View className="h-6 w-20 animate-pulse rounded bg-gray-200"></View>
          <Icons size={24} name="heart-outline" color="gray" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 5,
    overflow: "hidden",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  brand: {
    color: "#888",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  artName: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  deal: {
    backgroundColor: "#ff3b30",
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "600",
  },
  favoriteButtonWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export { ProductItem, ProductItemSkeleton };
